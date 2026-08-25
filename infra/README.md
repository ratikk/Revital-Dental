# Infra runbook — turning the pipeline green

Terraform stacks mirroring `ratikk/NextGen-Dental`. Apply order matters.
Needs Terraform >= 1.5 and **admin/IAM-capable credentials** (the EC2
instance role cannot create IAM roles — use your own AWS profile).

State: no lock table is configured — do not run two applies at once.

```bash
# 0. One-time sanity check (read-only)
./scripts/aws/verify-infra.sh

# 1. Deploy roles + releases bucket (LOCAL state, run once)
cd bootstrap
terraform init && terraform apply
# note outputs: role ARNs must equal the ones in .github/workflows/deploy.yml

# 2. Wildcard certificate (requires Route53-hosted DNS for the domain)
cd ../infra/shared
terraform init && terraform apply
# note output: certificate_arn

# 3. Dev site stack (bucket, CloudFront + noindex header, DNS)
cd ../environments/dev
terraform init
terraform apply -var 'wildcard_certificate_arn=<ARN from step 2>'
# note output: distribution_id

# 4. Tighten the dev role to that one distribution
cd ../../../bootstrap
terraform apply -var 'dev_distribution_id=<ID from step 3>'
```

Then in GitHub (once):

1. **Settings → Environments** — create `dev` (no rules) and `production`
   (**Required reviewers: you**).
2. **Settings → Secrets and variables → Actions → Variables** — set
   `DEV_DISTRIBUTION_ID` (step 3 output), `PUBLIC_RECAPTCHA_SITE_KEY`,
   `PUBLIC_LAMBDA_ENDPOINT`, `PUBLIC_GOOGLE_REVIEWS_ENDPOINT`,
   `PUBLIC_GOOGLE_ADS_ID`.
   reCAPTCHA keys are domain-bound — add `dev.revitaldentaltempletx.com`
   to the key in the reCAPTCHA admin console or dev forms will silently fail.
3. Actions → re-run the latest `deploy` run (or push to `dev`).

Expected: build ✓ → staging ✓ (site visible at dev.revitaldentaltempletx.com,
served with `X-Robots-Tag: noindex`) → production **waiting for approval**.
Approving ships the identical artifact to production, records the release
pointer, and fast-forwards `main`.

After the first end-to-end success, delete `build_and_deploy_revital.sh`.
