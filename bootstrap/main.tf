###############################################################################
# BOOTSTRAP — run ONCE with admin/IAM-capable AWS CLI credentials.
# NOT runnable from an EC2 instance role that lacks IAM actions.
# Local state on purpose (nothing else depends on it).
#
# Mirrors ratikk/NextGen-Dental bootstrap/multienv-roles.tf for Revital.
#
# Creates:
#   - releases bucket  revitaldental-releases  (immutable artifacts, manifests,
#     pointers, pre-CI/CD backup; 180-day artifact retention)
#   - github-actions-revitaldental-deploy-dev  (GitHub environment `dev`)
#   - github-actions-revitaldental-deploy-prd  (GitHub environment `production`)
#
# Trust model: OIDC sub pinned to this repo + GitHub *environment*. Both
# name-casings of the repository are allowed because GitHub redirects between
# ratikk/Revital-Dental (canonical) and ratikk/revital-dental; the OIDC token
# carries the canonical form.
###############################################################################

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  # Local state — deliberate.
}

provider "aws" {
  region = "us-east-1"
}

variable "releases_bucket" {
  type    = string
  default = "revitaldental-releases"
}

variable "prod_bucket" {
  type    = string
  default = "revitaldentaltempletx-website-prod"
}

variable "dev_bucket" {
  type    = string
  default = "revitaldentaltempletx-website-dev"
}

variable "prd_distribution_id" {
  type    = string
  default = "E2T5A2K4W8YWK4"
}

# Unknown until infra/environments/dev is applied. "*" lets the first apply
# succeed; afterwards re-apply with
#   -var 'dev_distribution_id=<ID from the dev stack output>'
# to tighten the invalidation permission to that one distribution.
variable "dev_distribution_id" {
  type    = string
  default = "*"
}

data "aws_caller_identity" "current" {}

# The GitHub OIDC provider is expected to already exist in this account
# (NextGen's bootstrap created it). This fails loudly if it does not.
data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

locals {
  account_id   = data.aws_caller_identity.current.account_id
  oidc_arn     = data.aws_iam_openid_connect_provider.github.arn
  releases_arn = aws_s3_bucket.releases.arn
  dev_dist_arn = "arn:aws:cloudfront::${local.account_id}:distribution/${var.dev_distribution_id}"
  prd_dist_arn = "arn:aws:cloudfront::${local.account_id}:distribution/${var.prd_distribution_id}"
  repo_subs = {
    dev = [
      "repo:ratikk/Revital-Dental:environment:dev",
      "repo:ratikk/revital-dental:environment:dev",
    ]
    prd = [
      "repo:ratikk/Revital-Dental:environment:production",
      "repo:ratikk/revital-dental:environment:production",
    ]
  }
}

# --- Releases bucket ---------------------------------------------------------
resource "aws_s3_bucket" "releases" {
  bucket = var.releases_bucket
}

resource "aws_s3_bucket_versioning" "releases" {
  bucket = aws_s3_bucket.releases.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_public_access_block" "releases" {
  bucket                  = aws_s3_bucket.releases.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "releases" {
  bucket = aws_s3_bucket.releases.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

# Keep release artifacts 180 days (rollback window); pointers and the initial
# pre-CI/CD backup are kept indefinitely.
resource "aws_s3_bucket_lifecycle_configuration" "releases" {
  bucket = aws_s3_bucket.releases.id
  rule {
    id     = "expire-old-releases"
    status = "Enabled"
    filter { prefix = "releases/" }
    expiration { days = 180 }
  }
  rule {
    id     = "expire-noncurrent-versions"
    status = "Enabled"
    filter {}
    noncurrent_version_expiration { noncurrent_days = 30 }
  }
}

# --- Trust policies ----------------------------------------------------------
data "aws_iam_policy_document" "deploy_dev_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [local.oidc_arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = local.repo_subs.dev
    }
  }
}

data "aws_iam_policy_document" "deploy_prd_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [local.oidc_arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = local.repo_subs.prd
    }
  }
}

# --- deploy-dev permissions --------------------------------------------------
# Staging: RW dev bucket, write release artifacts, invalidate the dev
# distribution. NO access to the production bucket or distribution.
data "aws_iam_policy_document" "deploy_dev" {
  statement {
    sid       = "DevBucketList"
    effect    = "Allow"
    actions   = ["s3:ListBucket", "s3:GetBucketLocation"]
    resources = ["arn:aws:s3:::${var.dev_bucket}"]
  }
  statement {
    sid       = "DevBucketObjects"
    effect    = "Allow"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["arn:aws:s3:::${var.dev_bucket}/*"]
  }
  statement {
    sid       = "ReleasesList"
    effect    = "Allow"
    actions   = ["s3:ListBucket", "s3:GetBucketLocation"]
    resources = [local.releases_arn]
  }
  statement {
    sid       = "ReleasesWriteArtifacts"
    effect    = "Allow"
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["${local.releases_arn}/releases/*"]
  }
  statement {
    sid       = "DevInvalidation"
    effect    = "Allow"
    actions   = ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"]
    resources = [local.dev_dist_arn]
  }
}

# --- deploy-prd permissions --------------------------------------------------
# Production: read release artifacts, RW production bucket, write
# pointers/backups, invalidate ONLY the production distribution.
data "aws_iam_policy_document" "deploy_prd" {
  statement {
    sid       = "ProdBucketList"
    effect    = "Allow"
    actions   = ["s3:ListBucket", "s3:GetBucketLocation"]
    resources = ["arn:aws:s3:::${var.prod_bucket}"]
  }
  statement {
    sid       = "ProdBucketObjects"
    effect    = "Allow"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["arn:aws:s3:::${var.prod_bucket}/*"]
  }
  statement {
    sid       = "ReleasesList"
    effect    = "Allow"
    actions   = ["s3:ListBucket", "s3:GetBucketLocation"]
    resources = [local.releases_arn]
  }
  statement {
    sid       = "ReleasesRead"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${local.releases_arn}/releases/*", "${local.releases_arn}/backups/*"]
  }
  statement {
    sid       = "ReleasesWritePointersBackups"
    effect    = "Allow"
    actions   = ["s3:PutObject"]
    resources = ["${local.releases_arn}/pointers/*", "${local.releases_arn}/backups/*"]
  }
  statement {
    sid       = "ProdInvalidation"
    effect    = "Allow"
    actions   = ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"]
    resources = [local.prd_dist_arn]
  }
}

# --- Roles -------------------------------------------------------------------
resource "aws_iam_role" "deploy_dev" {
  name               = "github-actions-revitaldental-deploy-dev"
  assume_role_policy = data.aws_iam_policy_document.deploy_dev_trust.json
}

resource "aws_iam_role_policy" "deploy_dev" {
  name   = "deploy-dev"
  role   = aws_iam_role.deploy_dev.id
  policy = data.aws_iam_policy_document.deploy_dev.json
}

resource "aws_iam_role" "deploy_prd" {
  name               = "github-actions-revitaldental-deploy-prd"
  assume_role_policy = data.aws_iam_policy_document.deploy_prd_trust.json
}

resource "aws_iam_role_policy" "deploy_prd" {
  name   = "deploy-prd"
  role   = aws_iam_role.deploy_prd.id
  policy = data.aws_iam_policy_document.deploy_prd.json
}

output "deploy_dev_role_arn" { value = aws_iam_role.deploy_dev.arn }
output "deploy_prd_role_arn" { value = aws_iam_role.deploy_prd.arn }
output "releases_bucket"     { value = aws_s3_bucket.releases.bucket }
