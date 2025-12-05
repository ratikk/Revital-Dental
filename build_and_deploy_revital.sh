npm run build && \
aws s3 sync dist/ s3://revitaldentaltempletx-website-prod --delete --exclude "*.html" --cache-control "max-age=31536000,public,immutable" --profile revital && \
aws s3 sync dist/ s3://revitaldentaltempletx-website-prod --delete --exclude "*" --include "*.html" --cache-control "max-age=0,no-cache,no-store,must-revalidate" --profile revital && \
aws cloudfront create-invalidation --distribution-id E2T5A2K4W8YWK4 --paths "/*" --profile revital
