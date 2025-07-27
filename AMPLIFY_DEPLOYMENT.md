# ADMI Amplify Integrated Deployment

This project now supports **integrated deployment** where both the website and serverless functions deploy together with Amplify.

## 🚀 Automatic Deployment

When you push to any branch, Amplify will automatically:

1. **Deploy Frontend**: Next.js website
2. **Deploy Backend**: Lambda functions with EventBridge schedules  
3. **Configure Environment**: Based on branch (dev/staging/main)

## 📋 Environment Configuration

### AWS Systems Manager Parameters

Set these parameters in AWS Systems Manager Parameter Store:

```bash
# Required Parameters
/admi/openai/api-key (SecureString)
/admi/contentful/space-id (String)
/admi/contentful/access-token (SecureString)
/admi/contentful/management-token (SecureString)

# Optional Parameters  
/admi/webhook/blog-notifications (String) # Slack webhook URL
```

### Setup Parameters via AWS CLI

```bash
# OpenAI API Key
aws ssm put-parameter \
  --name "/admi/openai/api-key" \
  --value "your-openai-api-key" \
  --type "SecureString"

# Contentful Space ID
aws ssm put-parameter \
  --name "/admi/contentful/space-id" \
  --value "your-contentful-space-id" \
  --type "String"

# Contentful Access Token
aws ssm put-parameter \
  --name "/admi/contentful/access-token" \
  --value "your-contentful-access-token" \
  --type "SecureString"

# Contentful Management Token
aws ssm put-parameter \
  --name "/admi/contentful/management-token" \
  --value "your-contentful-management-token" \
  --type "SecureString"

# Optional: Webhook URL for notifications
aws ssm put-parameter \
  --name "/admi/webhook/blog-notifications" \
  --value "https://hooks.slack.com/services/YOUR/WEBHOOK/URL" \
  --type "String"
```

## 📅 Scheduled Functions

### Blog Generation
- **Daily**: Every day at 9:00 AM UTC (2 articles)
- **Weekly**: Every Sunday at 10:00 AM UTC (7 articles)

### Video Cache Refresh  
- **Daily**: Every day at 1:00 AM UTC

## 🏗️ Deployment Architecture

### Branch-Based Environments

| Branch | Environment | Lambda Suffix | Schedule |
|--------|------------|---------------|----------|
| `main` | Production | `-prod` | ✅ Enabled |
| `staging` | Staging | `-staging` | ✅ Enabled |
| `dev` | Development | `-dev` | ✅ Enabled |

### AWS Resources Created

1. **Lambda Functions**
   - `admiBlogGeneration-{env}`
   - `admiVideoCacheRefresh-{env}`

2. **EventBridge Rules**
   - `admi-daily-blog-{env}`
   - `admi-weekly-blog-{env}`
   - `admi-video-cache-{env}`

3. **IAM Roles**
   - `admiBlogGeneration-LambdaRole-{env}`

4. **CloudWatch Log Groups**
   - `/aws/lambda/admiBlogGeneration-{env}`

## 🔧 Manual Deployment Options

### Option 1: Amplify Console
1. Push to branch
2. Amplify automatically builds and deploys
3. Functions deploy with CloudFormation

### Option 2: Standalone Serverless
If you prefer separate deployment:

```bash
cd infrastructure/serverless/blog-generation
npm install
./deploy.sh dev
```

## 📊 Monitoring

### CloudWatch Logs
- Function execution logs
- Scheduled triggers
- Error tracking

### Amplify Console
- Build status
- Deployment history
- Function metrics

## 🧪 Testing

### Manual Function Testing

```bash
# Via AWS CLI
aws lambda invoke \
  --function-name admiBlogGeneration-dev \
  --payload '{"type":"daily","count":1}' \
  --cli-binary-format raw-in-base64-out \
  response.json

# Via Amplify CLI (if using amplify functions)
amplify invoke function admiBlogGeneration
```

### Local Testing

```bash
# Test blog generation locally
npm run blog:daily

# Test with specific category
npm run blog:generate -- category techEconomy 1
```

## 🛠️ Troubleshooting

### Common Issues

1. **Missing Parameters**
   - Check AWS Systems Manager Parameter Store
   - Verify parameter names match exactly

2. **Permission Errors**
   - Ensure Amplify service role has access to SSM
   - Check Lambda execution role permissions

3. **Function Timeouts**
   - Default timeout: 15 minutes
   - Increase in CloudFormation template if needed

### Debug Commands

```bash
# Check function logs
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/admiBlogGeneration"

# Test function directly
aws lambda invoke --function-name admiBlogGeneration-dev --payload '{}' output.json
```

## 🔒 Security

### Best Practices
- ✅ API keys stored in AWS Systems Manager (encrypted)
- ✅ IAM roles with least-privilege access
- ✅ CloudWatch logging enabled
- ✅ Function timeout limits set

### Parameter Security
- Use `SecureString` type for sensitive data
- Rotate API keys regularly
- Monitor parameter access in CloudTrail

## 📈 Scaling

### Function Concurrency
- Reserved concurrency: 1 (prevents overlapping executions)
- Adjust in CloudFormation template if needed

### Cost Optimization
- Functions only run when scheduled
- 15-minute timeout prevents runaway executions
- CloudWatch logs with 30-day retention

## 🚨 Alerts

### Recommended CloudWatch Alarms
1. Function failures
2. Function duration > 10 minutes
3. No recent executions (missed schedules)

### Setup Example

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "ADMI-Blog-Generation-Failures" \
  --alarm-description "Alert when blog generation fails" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 1 \
  --comparison-operator GreaterThanOrEqualToThreshold \
  --dimensions Name=FunctionName,Value=admiBlogGeneration-prod
```

---

## 🎯 Quick Start Checklist

- [ ] Set up AWS Systems Manager parameters
- [ ] Push code to trigger Amplify deployment  
- [ ] Verify functions deployed in AWS Console
- [ ] Check EventBridge rules are created
- [ ] Test manual function invocation
- [ ] Monitor first scheduled execution
- [ ] Set up CloudWatch alarms (optional)

The integrated deployment makes serverless functions part of your standard Amplify workflow!