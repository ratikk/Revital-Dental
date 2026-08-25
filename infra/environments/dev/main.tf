###############################################################################
# Environment: DEV  -> dev.revitaldentaltempletx.com
# NEW stack (no import). `terraform apply` creates: dev bucket + OAC +
# CloudFront distribution + Route53 aliases + a noindex response-headers
# policy. Mirrors ratikk/NextGen-Dental infra/environments/dev.
#
# Apply infra/shared (the wildcard cert) FIRST and pass its ARN:
#   terraform apply -var 'wildcard_certificate_arn=arn:aws:acm:us-east-1:...'
###############################################################################

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket  = "dentalplatform-tfstate-025037641706-us-east-2"
    key     = "clinics/revital/environments/dev/terraform.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}

# The production bucket lives in us-east-1; the dev stack stays in the same
# region for symmetry with the deploy workflow (AWS_REGION: us-east-1).
provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

variable "wildcard_certificate_arn" {
  type        = string
  description = "ARN of the *.revitaldentaltempletx.com cert from infra/shared output."
}

data "aws_route53_zone" "site" {
  name         = "revitaldentaltempletx.com."
  private_zone = false
}

locals {
  rewrite_function_code = <<-EOT
    function handler(event) {
      var request = event.request;
      var uri = request.uri;
      if (uri.endsWith('/')) {
        request.uri += 'index.html';
      } else if (!uri.includes('.')) {
        request.uri += '/index.html';
      }
      return request;
    }
  EOT
}

# Keep the dev site out of search engines at the HTTP layer. This is not
# optional hardening: a previous Revital dev host (devrevitaldentaltempletx.com)
# was indexed by Google under an Austin title. The deploy workflow additionally
# writes a disallow-all robots.txt and strips the sitemap on dev builds.
resource "aws_cloudfront_response_headers_policy" "noindex" {
  name    = "revitaldental-dev-noindex"
  comment = "X-Robots-Tag noindex for the dev site"

  custom_headers_config {
    items {
      header   = "X-Robots-Tag"
      value    = "noindex, nofollow"
      override = true
    }
  }
}

module "site" {
  source = "../../modules/static-site"
  providers = {
    aws           = aws
    aws.us_east_1 = aws.us_east_1
  }

  bucket_name                = "revitaldentaltempletx-website-dev"
  domain_names               = ["dev.revitaldentaltempletx.com"]
  acm_certificate_arn        = var.wildcard_certificate_arn
  hosted_zone_id             = data.aws_route53_zone.site.zone_id
  function_name              = "RewriteToIndexHtml-revital-dev"
  function_code              = local.rewrite_function_code
  comment                    = "revitaldentaltempletx-website-dev"
  response_headers_policy_id = aws_cloudfront_response_headers_policy.noindex.id
}

output "bucket_name"     { value = module.site.bucket_name }
output "distribution_id" { value = module.site.distribution_id }
