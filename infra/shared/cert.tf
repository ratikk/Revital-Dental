###############################################################################
# Shared: wildcard ACM certificate *.revitaldentaltempletx.com (us-east-1).
# Covers dev. (and any future subdomain). Does NOT cover the apex —
# production keeps its existing certificate on E2T5A2K4W8YWK4.
#
# Mirrors ratikk/NextGen-Dental infra/shared. Apply ONCE before
# infra/environments/dev, then feed the output ARN into that environment.
#
# State lives in the shared multi-clinic bucket. NOTE: no DynamoDB lock table
# is configured (none is known for this bucket) — single-operator repo; do not
# run two applies concurrently.
###############################################################################

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket  = "dentalplatform-tfstate-025037641706-us-east-2"
    key     = "clinics/revital/shared/cert.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}

# Certificates for CloudFront MUST be in us-east-1.
provider "aws" {
  region = "us-east-1"
}

# Discover the hosted zone rather than hardcoding its id. If DNS for
# revitaldentaltempletx.com is NOT hosted in Route53 in this account, this
# lookup fails — validate the CNAME manually at the registrar instead.
data "aws_route53_zone" "site" {
  name         = "revitaldentaltempletx.com."
  private_zone = false
}

resource "aws_acm_certificate" "wildcard" {
  domain_name       = "*.revitaldentaltempletx.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "validation" {
  # ACM reuses the same validation record name/value per domain per account;
  # overwriting is safe and required for a clean apply.
  allow_overwrite = true
  for_each = {
    for dvo in aws_acm_certificate.wildcard.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }
  zone_id = data.aws_route53_zone.site.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 300
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "wildcard" {
  certificate_arn         = aws_acm_certificate.wildcard.arn
  validation_record_fqdns = [for r in aws_route53_record.validation : r.fqdn]
}

output "certificate_arn" { value = aws_acm_certificate.wildcard.arn }
output "hosted_zone_id"  { value = data.aws_route53_zone.site.zone_id }
