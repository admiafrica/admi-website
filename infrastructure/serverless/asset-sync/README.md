# Contentful Asset Sync Lambda

Automatically syncs Contentful assets to S3/CloudFront when they are published.

## How It Works

```
Upload to Contentful
    ↓
Contentful fires webhook (on publish)
    ↓
Lambda function triggered
    ↓
Downloads asset from Contentful CDN
    ↓
Uploads to S3 (admi-contentful-assets)
    ↓
Available on CloudFront immediately ✅
```

## Deployment

```bash
cd infrastructure/serverless/asset-sync
./deploy.sh staging
```

Or for production:
```bash
./deploy.sh production
```

## Setting Up Contentful Webhook

After deployment, the Lambda will output a webhook URL like:
```
https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/staging/webhook/asset-sync
```

### Configure in Contentful:

1. Go to **Contentful** → **Settings** → **Webhooks**
2. Click **Add Webhook**
3. Configure:
   - **Name**: `S3 Asset Sync`
   - **URL**: `<your-webhook-url>`
   - **Triggers**: 
     - ✅ Asset → Publish
     - ✅ Asset → Unpublish (optional, for cleanup)
   - **Filters**: None (sync all assets)
   - **Headers** (optional):
     - `X-Contentful-Signature`: Add if using webhook secret
4. Click **Save**

### Optional: Webhook Secret

For security, set a webhook secret:

1. In Contentful webhook settings, add a secret
2. Add to Lambda environment variable:
   ```bash
   aws lambda update-function-configuration \
     --function-name admi-asset-sync-staging-assetSync \
     --environment "Variables={CONTENTFUL_WEBHOOK_SECRET=your-secret-here}"
   ```

## Testing

### Health Check
```bash
curl https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/staging/webhook/health
```

### Manual Trigger
Upload any image to Contentful and publish it. Check Lambda logs:
```bash
npm run logs
```

### Verify in S3
```bash
aws s3 ls s3://admi-contentful-assets/ --recursive | tail -5
```

## Monitoring

View logs:
```bash
cd infrastructure/serverless/asset-sync
npm run logs
```

Or in AWS Console:
- CloudWatch → Log Groups → `/aws/lambda/admi-asset-sync-staging-assetSync`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `S3_BUCKET` | Target S3 bucket | `admi-contentful-assets` |
| `CLOUDFRONT_DOMAIN` | CloudFront distribution domain | `dq7z35wn8dhiz.cloudfront.net` |
| `CONTENTFUL_WEBHOOK_SECRET` | Optional webhook signature secret | (none) |

## Troubleshooting

### Lambda timeout
If assets are very large, increase timeout in `serverless.yml`:
```yaml
timeout: 120  # 2 minutes
```

### Permission denied
Ensure Lambda IAM role has S3 permissions (already configured in serverless.yml).

### Assets not syncing
1. Check Contentful webhook delivery logs
2. Check Lambda CloudWatch logs
3. Verify webhook URL is correct
