# ADMI Blog Generation - Deployment Guide

This guide walks you through deploying the automated blog generation service to AWS.

## 🎯 Quick Start

```bash
# 1. Navigate to the serverless directory
cd infrastructure/serverless/blog-generation

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. Deploy to development
./deploy.sh dev

# 5. Test the deployment
serverless invoke -f testBlogGeneration --stage dev
```

## 📋 Prerequisites Checklist

### AWS Setup

- [ ] AWS CLI installed and configured
- [ ] AWS account with sufficient permissions
- [ ] Access to create Lambda functions, EventBridge rules, and IAM roles

### API Keys

- [ ] Contentful Space ID
- [ ] Contentful Access Token
- [ ] Contentful Management Token
- [ ] OpenAI API Key

### Tools

- [ ] Node.js (v18+)
- [ ] Serverless Framework (`npm install -g serverless`)

## 🔐 Environment Configuration

### Development Environment

Create `.env`:

```env
ADMI_CONTENTFUL_SPACE_ID=your_space_id
ADMI_CONTENTFUL_ACCESS_TOKEN=your_access_token
ADMI_CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
ADMI_CONTENTFUL_ENVIRONMENT=master
OPENAI_API_KEY=your_openai_key
```

### Staging Environment

Create `.env.staging`:

```env
ADMI_CONTENTFUL_SPACE_ID=your_staging_space_id
ADMI_CONTENTFUL_ACCESS_TOKEN=your_staging_access_token
ADMI_CONTENTFUL_MANAGEMENT_TOKEN=your_staging_management_token
ADMI_CONTENTFUL_ENVIRONMENT=staging
OPENAI_API_KEY=your_openai_key
```

### Production Environment

Create `.env.prod`:

```env
ADMI_CONTENTFUL_SPACE_ID=your_prod_space_id
ADMI_CONTENTFUL_ACCESS_TOKEN=your_prod_access_token
ADMI_CONTENTFUL_MANAGEMENT_TOKEN=your_prod_management_token
ADMI_CONTENTFUL_ENVIRONMENT=master
OPENAI_API_KEY=your_openai_key
BLOG_GENERATION_WEBHOOK_URL=your_slack_webhook_url
```

## 🚀 Deployment Steps

### Step 1: Install Dependencies

```bash
cd infrastructure/serverless/blog-generation
npm install
```

### Step 2: Configure Environment

```bash
# Copy and edit environment file
cp .env.example .env
nano .env  # or use your preferred editor
```

### Step 3: Validate Configuration

```bash
# Test deployment (dry run)
./deploy.sh dev --dry-run
```

### Step 4: Deploy to Development

```bash
./deploy.sh dev
```

### Step 5: Test Functions

```bash
# Test daily generation
serverless invoke -f dailyBlogGeneration --stage dev

# Test weekly generation
serverless invoke -f weeklyBlogGeneration --stage dev

# Check statistics
serverless invoke -f blogStats --stage dev
```

### Step 6: Deploy to Staging

```bash
# Configure staging environment
cp .env .env.staging
# Edit .env.staging with staging credentials

# Deploy to staging
./deploy.sh staging
```

### Step 7: Deploy to Production

```bash
# Configure production environment
cp .env .env.prod
# Edit .env.prod with production credentials

# Deploy to production (requires confirmation)
./deploy.sh prod
```

## 📊 Monitoring Setup

### CloudWatch Dashboards

After deployment, set up monitoring:

1. Go to AWS CloudWatch Console
2. Create a new dashboard: "ADMI Blog Generation"
3. Add widgets for:
   - Lambda function invocations
   - Error rates
   - Duration metrics
   - Log insights

### Slack Notifications

Configure webhook notifications:

```bash
# Add to your .env.prod
BLOG_GENERATION_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## 🧪 Testing Guide

### Manual Testing

```bash
# Test with custom parameters
serverless invoke -f testBlogGeneration --stage dev --data '{
  "count": 1,
  "category": "digitalMarketing"
}'
```

### HTTP Testing

```bash
# Get API Gateway URL from deployment output
curl -X POST https://your-api-gateway-url/test-blog-generation \
  -H "Content-Type: application/json" \
  -d '{"count": 1}'
```

### Schedule Testing

```bash
# View scheduled events
aws events list-rules --name-prefix admi-blog-generation

# Check function logs
serverless logs -f dailyBlogGeneration --stage prod --tail
```

## 🛠️ Customization

### Modify Schedule

Edit `serverless.yml` to change timing:

```yaml
functions:
  dailyBlogGeneration:
    events:
      - schedule:
          rate: cron(0 9 * * ? *) # 9:00 AM UTC daily
          enabled: true
```

### Change Memory/Timeout

```yaml
provider:
  timeout: 900 # 15 minutes
  memorySize: 512 # 512 MB
```

### Add New Functions

1. Add function to `serverless.yml`
2. Create handler in `handlers/`
3. Deploy: `serverless deploy --stage dev`

## 🔧 Troubleshooting

### Common Issues

**1. Deployment Permission Errors**

```bash
# Check AWS credentials
aws sts get-caller-identity

# Verify permissions
aws iam list-attached-user-policies --user-name your-username
```

**2. Function Timeout**

```bash
# Increase timeout in serverless.yml
provider:
  timeout: 900  # 15 minutes
```

**3. Environment Variable Issues**

```bash
# Verify variables are loaded
serverless invoke -f testBlogGeneration --stage dev --log
```

**4. Contentful API Errors**

```bash
# Test Contentful connection
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries"
```

### Debug Mode

Enable detailed logging:

```bash
# Deploy with verbose output
serverless deploy --stage dev --verbose

# Function logs with debug info
serverless logs -f dailyBlogGeneration --stage dev --startTime 1h
```

## 🔄 Maintenance

### Update Dependencies

```bash
npm update
serverless deploy --stage prod
```

### Monitor Costs

- Review AWS billing dashboard monthly
- Set up billing alerts for unexpected charges
- Monitor Lambda invocation counts

### Backup Strategy

- Export Contentful content regularly
- Keep environment configurations in secure storage
- Document any custom modifications

## 📈 Scaling

### High-Volume Setup

For more frequent generation:

```yaml
functions:
  hourlyBlogGeneration:
    handler: handlers/blogGeneration.hourly
    events:
      - schedule:
          rate: cron(0 * * * ? *) # Every hour
```

### Multi-Region Setup

Deploy to multiple regions for redundancy:

```bash
# Deploy to different regions
serverless deploy --stage prod --region us-west-2
serverless deploy --stage prod --region eu-west-1
```

## 🛡️ Security Checklist

- [ ] Environment files are not committed to git
- [ ] API keys are rotated regularly
- [ ] IAM roles use least-privilege permissions
- [ ] CloudWatch logs retention is configured
- [ ] Webhook URLs are secured
- [ ] Function timeout limits are reasonable

## 📞 Support

For deployment issues:

1. Check function logs in CloudWatch
2. Verify environment configuration
3. Test functions manually
4. Review AWS permissions
5. Contact ADMI tech team

---

**Next Steps After Deployment:**

1. Monitor function execution for 24 hours
2. Verify blog articles are created in Contentful
3. Set up alerting for failures
4. Document any custom configurations
5. Schedule regular maintenance reviews
