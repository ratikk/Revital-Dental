#!/usr/bin/env bash
#
# Snapshots the production S3 bucket and reports what exists in production but
# not in this repository.
#
# Why this exists
# ---------------
# Several live pages were published outside version control. They exist only as
# built HTML in S3 - there is no source for them and no backup. If that bucket
# is emptied, or a deploy runs with `--delete`, they are gone permanently.
#
# This script is READ-ONLY against AWS. It downloads, it never writes or
# deletes. Run it before arming any deployment pipeline.
#
# Usage:  ./scripts/aws/snapshot-production.sh
# Needs:  awscli v2 with read access to the production bucket, node 20, npm.

set -euo pipefail

PROD_BUCKET="${PROD_S3_BUCKET:-revitaldentaltempletx-website-prod}"
OUT_DIR=".recovery"
SNAPSHOT="$OUT_DIR/prod-snapshot"
BUILD="$OUT_DIR/repo-build"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

green() { printf '  \033[32m✓\033[0m %s\n' "$1"; }
warn()  { printf '  \033[33m!\033[0m %s\n' "$1"; }
head_() { printf '\n\033[1m%s\033[0m\n' "$1"; }

command -v aws  >/dev/null || { echo "awscli not found."; exit 1; }
command -v node >/dev/null || { echo "node not found."; exit 1; }

mkdir -p "$SNAPSHOT" "$BUILD"

# ------------------------------------------------------- 1. snapshot S3 ----
head_ "1. Downloading s3://$PROD_BUCKET"
aws s3 sync "s3://$PROD_BUCKET" "$SNAPSHOT" --only-show-errors
count=$(find "$SNAPSHOT" -type f | wc -l | tr -d ' ')
green "$count files downloaded to $SNAPSHOT"

ARCHIVE="$OUT_DIR/prod-backup-$STAMP.tar.gz"
tar -czf "$ARCHIVE" -C "$SNAPSHOT" .
green "Backup archive: $ARCHIVE ($(du -h "$ARCHIVE" | cut -f1))"
warn "Copy this archive somewhere durable before doing anything else."

# ---------------------------------------------------- 2. build the repo ----
head_ "2. Building this repository for comparison"
if [ ! -d node_modules ]; then
  npm ci --silent
fi
SITE_URL="https://revitaldentaltempletx.com" \
PUBLIC_LAMBDA_ENDPOINT="https://example.invalid/placeholder" \
PUBLIC_RECAPTCHA_SITE_KEY="placeholder" \
  npm run build --silent
rm -rf "$BUILD"
cp -R dist "$BUILD"
green "Repo build produced $(find "$BUILD" -name '*.html' | wc -l | tr -d ' ') HTML pages"

# --------------------------------------------------------- 3. compare ------
head_ "3. Comparing production against the repository build"

( cd "$SNAPSHOT" && find . -name '*.html' | sed 's|^\./||' | sort ) > "$OUT_DIR/prod-pages.txt"
( cd "$BUILD"    && find . -name '*.html' | sed 's|^\./||' | sort ) > "$OUT_DIR/repo-pages.txt"

comm -23 "$OUT_DIR/prod-pages.txt" "$OUT_DIR/repo-pages.txt" > "$OUT_DIR/only-in-production.txt"
comm -13 "$OUT_DIR/prod-pages.txt" "$OUT_DIR/repo-pages.txt" > "$OUT_DIR/only-in-repo.txt"

only_prod=$(wc -l < "$OUT_DIR/only-in-production.txt" | tr -d ' ')
only_repo=$(wc -l < "$OUT_DIR/only-in-repo.txt" | tr -d ' ')

printf '\n  \033[1mLive but NOT in this repo (%s) - these need source written:\033[0m\n' "$only_prod"
sed 's/^/    /' "$OUT_DIR/only-in-production.txt" || true

printf '\n  \033[1mIn this repo but NOT live (%s) - stale, or never deployed:\033[0m\n' "$only_repo"
sed 's/^/    /' "$OUT_DIR/only-in-repo.txt" || true

# ------------------------------------------- 4. extract page content -------
head_ "4. Extracting content from the production-only pages"
node scripts/recover/extract-pages.mjs \
  "$SNAPSHOT" "$OUT_DIR/only-in-production.txt" "$OUT_DIR/extracted"
green "Extracted content written to $OUT_DIR/extracted/"

# ------------------------------------------------------------ summary ------
head_ "Next steps"
cat <<EOF
  1. Store $ARCHIVE somewhere durable (not just this machine).
  2. Read $OUT_DIR/extracted/SUMMARY.md - one entry per unmanaged live page.
  3. Author a .astro page under src/pages/ for each, using the extracted
     content as the source of truth for copy.
  4. Rebuild and diff against the snapshot until output matches.
  5. Only then re-enable --delete on the deploy sync.

  Note: two of the live pages are known to be defective and should be FIXED
  rather than faithfully reproduced -
    - locations/dentist-wells-branch  describes Austin, 60 miles away
    - locations/dentist-belton        contains a [Nearby Landmark if known]
                                      placeholder
EOF
