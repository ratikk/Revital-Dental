#!/usr/bin/env node
/**
 * Extracts the authorable content out of built HTML pages that exist in
 * production but have no source in this repository.
 *
 * The production bucket holds compiled output, so recovery cannot be a copy -
 * someone has to write a .astro page that produces equivalent HTML. This turns
 * each orphaned page into a readable brief (title, meta, headings, body copy,
 * links, images) so that authoring is transcription rather than archaeology.
 *
 * Dependency-free on purpose: it runs before `npm ci` has necessarily worked,
 * and pulling a DOM parser in for one-time recovery is not worth it. The
 * regexes are deliberately conservative and report what they cannot parse.
 *
 * Usage: node scripts/recover/extract-pages.mjs <snapshotDir> <listFile> <outDir>
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const [, , snapshotDir, listFile, outDir] = process.argv;

if (!snapshotDir || !listFile || !outDir) {
  console.error('Usage: extract-pages.mjs <snapshotDir> <listFile> <outDir>');
  process.exit(1);
}

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));

const stripTags = (html) =>
  decode(
    html
      .replace(/<(script|style|noscript|svg)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i'));
  return m ? decode(m[1]) : null;
};

const one = (html, re) => {
  const m = html.match(re);
  return m ? decode(stripTags(m[1])) : null;
};

const all = (html, re) => [...html.matchAll(re)];

function extract(html, relPath) {
  const headings = all(html, /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi).map((m) => ({
    level: m[1].toLowerCase(),
    text: stripTags(m[2]),
  }));

  const links = all(html, /<a\b([^>]*)>([\s\S]*?)<\/a>/gi)
    .map((m) => ({ href: attr(m[1], 'href'), text: stripTags(m[2]) }))
    .filter((l) => l.href && !l.href.startsWith('#'));

  const images = all(html, /<img\b([^>]*)>/gi).map((m) => ({
    src: attr(m[1], 'src'),
    alt: attr(m[1], 'alt'),
  }));

  const jsonLd = all(
    html,
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  ).map((m) => m[1].trim());

  // Body copy, with nav/header/footer removed so the brief is just the page.
  let body = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) body = bodyMatch[1];
  body = body
    .replace(/<header\b[\s\S]*?<\/header>/gi, ' ')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, ' ');

  const phones = [
    ...new Set(
      (stripTags(html).match(/\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}/g) || []).map((p) =>
        p.trim()
      )
    ),
  ];

  return {
    path: relPath,
    title: one(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: attr(
      (html.match(/<meta[^>]*name=["']description["'][^>]*>/i) || [''])[0],
      'content'
    ),
    canonical: attr(
      (html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i) || [''])[0],
      'href'
    ),
    headings,
    links,
    images,
    jsonLd,
    phones,
    wordCount: stripTags(body).split(/\s+/).filter(Boolean).length,
    text: stripTags(body),
  };
}

const list = readFileSync(listFile, 'utf8')
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean);

if (list.length === 0) {
  console.log('  Nothing to extract - production and repo agree.');
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });

const results = [];
for (const rel of list) {
  const file = join(snapshotDir, rel);
  if (!existsSync(file)) {
    console.warn(`  ! missing from snapshot: ${rel}`);
    continue;
  }
  const data = extract(readFileSync(file, 'utf8'), rel);
  results.push(data);

  const dest = join(outDir, rel.replace(/\.html$/, '') + '.md');
  mkdirSync(dirname(dest), { recursive: true });

  const h1 = data.headings.find((h) => h.level === 'h1');
  writeFileSync(
    dest,
    [
      `# ${h1 ? h1.text : rel}`,
      '',
      `- **Live path:** \`/${rel.replace(/index\.html$/, '').replace(/\.html$/, '')}\``,
      `- **Title:** ${data.title ?? '(none)'}`,
      `- **Meta description:** ${data.description ?? '(none)'}`,
      `- **Canonical:** ${data.canonical ?? '(none)'}`,
      `- **Word count:** ${data.wordCount}`,
      `- **Phone numbers found:** ${data.phones.join(', ') || '(none)'}`,
      `- **JSON-LD blocks:** ${data.jsonLd.length}`,
      '',
      '## Heading outline',
      '',
      ...data.headings.map((h) => `${'  '.repeat(+h.level[1] - 1)}- \`${h.level}\` ${h.text}`),
      '',
      '## Images',
      '',
      ...(data.images.length
        ? data.images.map((i) => `- \`${i.src}\` — alt: ${i.alt ? `"${i.alt}"` : '**MISSING**'}`)
        : ['(none)']),
      '',
      '## Outbound links',
      '',
      ...(data.links.length
        ? [...new Set(data.links.map((l) => `- [${l.text || '(no text)'}](${l.href})`))]
        : ['(none)']),
      '',
      '## Body copy',
      '',
      '```',
      data.text,
      '```',
      '',
      ...(data.jsonLd.length
        ? ['## JSON-LD', '', '```json', ...data.jsonLd, '```', '']
        : []),
    ].join('\n')
  );
}

// ------------------------------------------------------------- summary ----
const summary = [
  '# Unmanaged production pages',
  '',
  'These pages are live but have no source in this repository. Each needs a',
  '`.astro` page written under `src/pages/` before `--delete` can be re-enabled',
  'on the deploy sync.',
  '',
  '| Live path | Title | Words | Phones found | Schema |',
  '|---|---|---|---|---|',
  // Titles routinely contain '|', which would break the table.
  ...results.map((r) => {
    const cell = (s) => String(s).replace(/\|/g, '\\|');
    const path = r.path.replace(/index\.html$/, '').replace(/\.html$/, '');
    return `| \`/${cell(path)}\` | ${cell((r.title ?? '').slice(0, 70))} | ${
      r.wordCount
    } | ${cell(r.phones.join(' ') || '—')} | ${r.jsonLd.length ? 'yes' : 'no'} |`;
  }),
  '',
  '## Flags',
  '',
];

const flags = [];
for (const r of results) {
  const bad = r.phones.filter((p) => /^\(?(737|347)/.test(p));
  if (bad.length) flags.push(`- \`${r.path}\` contains non-Temple phone number(s): ${bad.join(', ')}`);
  if (/wells-branch/i.test(r.path))
    flags.push(`- \`${r.path}\` describes Austin, ~60 miles from the practice. **Do not reproduce — remove or rewrite.**`);
  if (/\[Nearby Landmark|\[TODO|\[PLACEHOLDER/i.test(r.text))
    flags.push(`- \`${r.path}\` contains an unfilled template placeholder. Fix while transcribing.`);
  if (r.jsonLd.some((b) => /aggregateRating/.test(b)))
    flags.push(`- \`${r.path}\` publishes **aggregateRating** schema. Verify it reflects real reviews before reproducing.`);
  const noAlt = r.images.filter((i) => !i.alt).length;
  if (noAlt) flags.push(`- \`${r.path}\` has ${noAlt} image(s) with no alt text.`);
}

summary.push(...(flags.length ? flags : ['(none)']));
writeFileSync(join(outDir, 'SUMMARY.md'), summary.join('\n') + '\n');

console.log(`  Extracted ${results.length} page(s).`);
if (flags.length) console.log(`  ${flags.length} flag(s) raised - see SUMMARY.md`);
