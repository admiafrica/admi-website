# ADMI Combined Serverless Services

Integrated automated services for blog generation and video cache management using AWS Lambda and EventBridge.

## 🚀 Services Overview

### Blog Generation Service
- **Daily Blog Generation**: 9:00 AM UTC (2 articles)
- **Weekly Blog Generation**: Sunday 10:00 AM UTC (7 articles)
- **HTTP Endpoints**: Manual testing and statistics
- **Content Management**: Automatic Contentful publishing

### Video Cache Refresh Service  
- **Daily Cache Refresh**: 1:00 AM UTC
- **Secure Authentication**: Bearer token protected
- **Auto-Renewal**: Keeps /videos page content fresh
- **Error Handling**: Comprehensive logging and notifications

## 📋 Deployment Options

### Option 1: Amplify Integrated Deployment (Recommended)

```bash
# 1. Set AWS Systems Manager parameters
aws ssm put-parameter --name "/admi/openai/api-key" --value "your-key" --type "SecureString"
aws ssm put-parameter --name "/admi/contentful/space-id" --value "your-space-id" --type "String"
aws ssm put-parameter --name "/admi/contentful/access-token" --value "your-token" --type "SecureString"
aws ssm put-parameter --name "/admi/contentful/management-token" --value "your-mgmt-token" --type "SecureString"

# 2. Optional: Webhook notifications
aws ssm put-parameter --name "/admi/webhook/blog-notifications" --value "https://hooks.slack.com/..." --type "String"

# 3. Deploy via Amplify (automatic on git push)
git push origin main
```

### Option 2: Standalone Serverless Deployment

```bash
# Navigate to serverless directory
cd infrastructure/serverless/blog-generation

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Deploy all services
./deploy.sh prod
```

## 🔧 Combined Service Configuration

### Environment Variables

Required for both services:

```env
# Blog Generation
ADMI_CONTENTFUL_SPACE_ID=your_contentful_space_id
ADMI_CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
ADMI_CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token
ADMI_CONTENTFUL_ENVIRONMENT=master
OPENAI_API_KEY=your_openai_api_key

# Video Cache Refresh
APP_URL=https://main.d2yh9rjzagq5ao.amplifyapp.com
CRON_SECRET=your-secure-cron-secret

# Optional: Notifications
BLOG_GENERATION_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Schedule Configuration

| Service | Schedule | Function | Description |
|---------|----------|----------|-------------|
| Video Cache | Daily 1:00 AM UTC | `videoCacheRefresh` | Refresh YouTube cache |
| Blog Daily | Daily 9:00 AM UTC | `dailyBlogGeneration` | Generate 2 articles |
| Blog Weekly | Sunday 10:00 AM UTC | `weeklyBlogGeneration` | Generate 7 articles |

## 🧪 Testing Combined Services

### Manual Function Testing

```bash
# Test video cache refresh
serverless invoke -f videoCacheRefresh --stage dev

# Test daily blog generation
serverless invoke -f dailyBlogGeneration --stage dev

# Test weekly blog generation
serverless invoke -f weeklyBlogGeneration --stage dev

# Get blog statistics
serverless invoke -f blogStats --stage dev
```

### HTTP Endpoint Testing

```bash
# Test blog generation via HTTP
curl -X POST https://your-api-gateway-url/test-blog-generation \
  -H "Content-Type: application/json" \
  -d '{"count": 1}'

# Get blog statistics via HTTP
curl https://your-api-gateway-url/blog-stats

# Test video cache refresh manually
curl -X POST https://main.d2yh9rjzagq5ao.amplifyapp.com/api/cron/refresh-video-cache \
  -H "Authorization: Bearer your-cron-secret"
```

## 📊 Monitoring & Notifications

### CloudWatch Logs

Each service has dedicated log groups:

```bash
# Blog generation logs
/aws/lambda/admi-blog-generation-{env}-dailyBlogGeneration
/aws/lambda/admi-blog-generation-{env}-weeklyBlogGeneration

# Video cache logs
/aws/lambda/admi-blog-generation-{env}-videoCacheRefresh
```

### Webhook Notifications

Both services send notifications to configured webhook URL:

**Blog Generation Notifications:**
- ✅ Daily/weekly generation complete
- ❌ Generation failures
- 📊 Articles created count

**Video Cache Notifications:**
- ✅ Cache refresh complete
- ❌ Cache refresh failures  
- 📹 Videos processed count

### Notification Payload Example

```json
{
  "text": "✅ Blog Generation Complete - daily",
  "attachments": [
    {
      "color": "good",
      "fields": [
        {
          "title": "Articles Generated",
          "value": "2",
          "short": true
        },
        {
          "title": "Total Generated", 
          "value": "145",
          "short": true
        }
      ]
    }
  ]
}
```

## 🔒 Security Features

### Authentication
- **Video Cache**: Bearer token authentication (`CRON_SECRET`)
- **Blog Generation**: API key authentication (OpenAI, Contentful)
- **AWS Resources**: IAM roles with least-privilege access

### Secrets Management
- **AWS Systems Manager**: Encrypted parameter storage
- **Environment Variables**: Secure injection into Lambda functions
- **No Hardcoded Secrets**: All sensitive data externalized

## 📈 Performance & Scaling

### Function Configuration
- **Memory**: 512 MB (sufficient for both services)
- **Timeout**: 15 minutes (blog generation), 10 minutes (video cache)
- **Concurrency**: Reserved concurrency of 1 (prevents overlaps)

### Cost Optimization
- **Event-Driven**: Functions only run when scheduled
- **Efficient Execution**: Optimized code with proper error handling
- **Log Retention**: 30-day CloudWatch log retention

## 🛠️ Troubleshooting

### Common Issues

1. **Video Cache Refresh Fails**
   ```bash
   # Check if endpoint is accessible
   curl -I https://main.d2yh9rjzagq5ao.amplifyapp.com/api/cron/refresh-video-cache
   
   # Verify CRON_SECRET matches
   echo $CRON_SECRET
   ```

2. **Blog Generation Fails**
   ```bash
   # Check Contentful connection
   curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     "https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries"
   
   # Verify OpenAI API key
   curl -H "Authorization: Bearer YOUR_OPENAI_KEY" \
     "https://api.openai.com/v1/models"
   ```

3. **Function Not Triggered**
   ```bash
   # Check EventBridge rules
   aws events list-rules --name-prefix admi-
   
   # Check function logs
   aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/admi-blog-generation"
   ```

### Debug Commands

```bash
# View function logs in real-time
serverless logs -f videoCacheRefresh --stage prod --tail

# Check function configuration
aws lambda get-function --function-name admi-blog-generation-prod-videoCacheRefresh

# Test function with custom payload
aws lambda invoke \
  --function-name admi-blog-generation-prod-videoCacheRefresh \
  --payload '{"test": true}' \
  --cli-binary-format raw-in-base64-out \
  response.json
```

## 🚀 Deployment Summary

The combined services provide:

- ✅ **Automated blog content generation** (daily & weekly)
- ✅ **Fresh video content** (daily cache refresh)  
- ✅ **Comprehensive monitoring** (logs & notifications)
- ✅ **Secure authentication** (bearer tokens & API keys)
- ✅ **Cost-effective operation** (event-driven execution)
- ✅ **Easy deployment** (single push to Amplify)

Both services work together to keep your ADMI website content fresh and engaging automatically!