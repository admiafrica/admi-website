# ADMI Video Cache Auto-Refresh - AWS Lambda Setup

This directory contains the AWS Lambda function and infrastructure to automatically refresh the ADMI video cache daily at 1 AM UTC.

## What This Does

- **Runs daily at 1 AM UTC** (adjust timezone as needed)
- **Calls your Amplify app's API** to refresh the video cache
- **Logs all activity** to CloudWatch for monitoring
- **Handles errors gracefully** with proper retry logic

## Prerequisites

1. **AWS CLI** installed and configured
2. **AWS SAM CLI** installed (`pip install aws-sam-cli`)
3. **AWS Account** with appropriate permissions

## Quick Setup

1. **Deploy the Lambda function:**
   ```bash
   cd infrastructure/aws-cron
   ./deploy.sh [YOUR_AMPLIFY_URL] [OPTIONAL_CRON_SECRET]
   ```

   Example:
   ```bash
   ./deploy.sh https://main.d2yh9rjzagq5ao.amplifyapp.com my-secret-key
   ```

2. **Set the cron secret in your app's environment variables:**
   - In Amplify Console → Environment Variables
   - Add: `CRON_SECRET=my-secret-key`

3. **Deploy your Amplify app** to pick up the new environment variable

## How It Works

1. **EventBridge Schedule** triggers the Lambda daily at 1 AM UTC
2. **Lambda function** makes an authenticated request to `/api/cron/refresh-video-cache`
3. **Your API endpoint** refreshes the video cache using the YouTube API
4. **Success/failure logs** are written to CloudWatch

## Monitoring

- **CloudWatch Logs**: `/aws/lambda/admi-video-cache-refresh`
- **Lambda Console**: Search for "admi-video-cache-refresh"
- **EventBridge**: Check the scheduled rule status

## Manual Testing

Test the function manually:
```bash
aws lambda invoke \
  --function-name admi-video-cache-refresh \
  --region us-east-1 \
  response.json

cat response.json
```

## Changing the Schedule

Edit `template.yaml` line 31 to change the schedule:
```yaml
Schedule: 'cron(0 1 * * ? *)'  # 1 AM daily UTC
```

Common schedules:
- `cron(0 0 * * ? *)` - Midnight UTC
- `cron(0 2 * * ? *)` - 2 AM UTC  
- `cron(0 22 * * ? *)` - 10 PM UTC (1 AM EAT)

Then redeploy:
```bash
./deploy.sh
```

## Troubleshooting

### Function fails with authentication error
- Check that `CRON_SECRET` environment variable is set in both Lambda and Amplify
- Verify the secret matches in both places

### Function times out
- Increase timeout in `template.yaml` (currently 300 seconds)
- Check if YouTube API is responding slowly

### Cache not refreshing
- Check CloudWatch logs for errors
- Verify the Amplify URL is correct
- Test the API endpoint manually: `curl -H "Authorization: Bearer YOUR_SECRET" https://your-app.com/api/cron/refresh-video-cache`

## Cost Estimate

- **Lambda**: ~$0.01/month (1 execution/day, 5-minute runtime)
- **CloudWatch Logs**: ~$0.50/month (30-day retention)
- **EventBridge**: Free (included in AWS Free Tier)

**Total**: ~$0.51/month

## Security

- Function uses IAM roles with minimal permissions
- API endpoint requires authentication via Bearer token
- Secrets are stored in AWS Parameter Store (not in code)

## Alternative: GitHub Actions (Simpler)

If you prefer a simpler solution, you can use GitHub Actions instead:

1. Add this to `.github/workflows/refresh-cache.yml`:
```yaml
name: Refresh Video Cache
on:
  schedule:
    - cron: '0 1 * * *'  # 1 AM daily
jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X GET \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            "${{ secrets.APP_URL }}/api/cron/refresh-video-cache"
```

2. Set repository secrets:
   - `APP_URL`: Your Amplify app URL
   - `CRON_SECRET`: Your authentication secret