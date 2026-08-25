# Deployment

This repository uses the **same pipeline as NextGen Dental**
(`ratikk/NextGen-Dental`), ported with Revital's buckets, distribution, and
domains. Keep the two in sync — when NextGen's workflows improve, port the
change here.

## The flow

```
push to dev
  └─ build       clean production build, immutable site.tar.gz + sha256
  │              + manifest.json + build-info.json. No AWS credentials.
  └─ staging     GitHub environment `dev`: store the artifact in the releases
  │              bucket, deploy to the dev bucket, invalidate dev CloudFront,
  │              smoke-test dev.revitaldentaltempletx.com, verify /version.json.
  └─ production  GitHub environment `production` (PROTECTED — manual approval):
                 promote the EXACT artifact tested in staging. Never rebuilds.
                 Manifest-validated sync, targeted invalidation, smoke tests,
                 /version.json verification, release pointer recorded.
  └─ sync-main   fast-forward `main` to the deployed commit, so main always
                 mirrors production.
```

Rollback: Actions → **rollback** → run with empty target (= previous release),
a specific commit SHA, or `initial` (the pre-CI/CD backup taken automatically
on the first pipeline deploy).

This replaces `build_and_deploy_revital.sh` (manual, laptop/EC2-credentialed,
no review step). Keep the script only until the pipeline's first successful
end-to-end deploy, then delete it.

## Resources this pipeline expects

Already existing (verified 2026-08-24):

| Resource | Value |
|---|---|
| Production bucket | `revitaldentaltempletx-website-prod` (us-east-1, versioning ON) |
| Production distribution | `E2T5A2K4W8YWK4` → revitaldentaltempletx.com |

To create — all defined as Terraform in this repo (see `infra/README.md`
for the apply order):

| Resource | Value |
|---|---|
| Releases bucket | `revitaldental-releases` (us-east-1, versioning ON, private) |
| Dev bucket | `revitaldentaltempletx-website-dev` (us-east-1, private + OAC) |
| Dev distribution | alias `dev.revitaldentaltempletx.com`, ACM cert in us-east-1, **X-Robots-Tag: noindex response header** (a previous Revital dev host was indexed by Google as an Austin dentist) |
| OIDC deploy roles | `github-actions-revitaldental-deploy-dev` / `-prd`, trust scoped to `repo:ratikk/revital-dental:environment:<env>`, permissions scoped to the three buckets + the two distributions |

GitHub setup (Settings → Environments / Variables):

- Environment `dev` — no protection rules.
- Environment `production` — **Required reviewers: the approver**. This gate is
  the entire review step.
- Repository variables: `DEV_DISTRIBUTION_ID`, `PUBLIC_RECAPTCHA_SITE_KEY`,
  `PUBLIC_LAMBDA_ENDPOINT`, `PUBLIC_GOOGLE_REVIEWS_ENDPOINT`,
  `PUBLIC_GOOGLE_ADS_ID`.
  (reCAPTCHA keys are domain-bound — add `dev.revitaldentaltempletx.com` to the
  key or issue a dev key, or forms will silently fail on dev.)

## Branch model

- **`dev`** — the working branch. All changes (direct pushes or merged PRs)
  land here; every push deploys to the dev site automatically.
- **`main`** — a record of production. Never push it by hand; the deploy
  workflow's `sync-main` job fast-forwards it to each commit that reaches
  production after approval.
- `master` was retired in Aug 2026 (its history is fully contained in the
  branches above).

Recommended repository settings: default branch `main`; branch protection on
`main` (no direct pushes except the Actions bot); PRs target `dev`.

Also note the GitHub name variants `revital-dental` / `Revital-Dental` are the
SAME repository (GitHub redirects between them) — not a fork.

## Verifying repo ↔ production drift

`scripts/aws/snapshot-production.sh` (read-only) downloads the production
bucket, builds this repo, and diffs the two page lists — use it to confirm
`master` actually produces what is live (e.g. to detect changes made on the
old EC2 after the last commit). `scripts/recover/extract-pages.mjs` turns any
production-only page into an authorable content brief.
