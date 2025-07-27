# ADMI Blog Generation Serverless Service

Automated blog generation service using AWS Lambda and EventBridge for scheduled content creation.

## 🚀 Features

- **Automated Scheduling**: Daily (2 articles) and weekly (7 articles) blog generation
- **Serverless Architecture**: AWS Lambda functions with EventBridge triggers
- **Content Management**: Automatic publishing to Contentful CMS
- **Monitoring**: CloudWatch logs and optional webhook notifications
- **Testing**: HTTP endpoints for manual testing and statistics
- **Multi-Environment**: Support for dev, staging, and production deployments

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Serverless Framework](https://www.serverless.com/) (`npm install -g serverless`)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate permissions
- Contentful account with management API access
- OpenAI API key

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd infrastructure/serverless/blog-generation
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Contentful Configuration
ADMI_CONTENTFUL_SPACE_ID=your_contentful_space_id
ADMI_CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
ADMI_CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token
ADMI_CONTENTFUL_ENVIRONMENT=master

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Optional: Webhook for notifications
BLOG_GENERATION_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 3. AWS Permissions

Ensure your AWS credentials have the following permissions:

- Lambda function creation and management
- EventBridge rule creation
- CloudWatch logs access
- IAM role creation (for Lambda execution)

## 🚀 Deployment

### Quick Deploy

```bash
# Deploy to development
./deploy.sh dev

# Deploy to staging
./deploy.sh staging

# Deploy to production
./deploy.sh prod
```

### Manual Deployment

```bash
# Install serverless plugins
npm install

# Deploy to specific stage
serverless deploy --stage dev
serverless deploy --stage staging
serverless deploy --stage prod
```

### Environment-Specific Configuration

For staging and production, create separate environment files:

```bash
cp .env .env.staging
cp .env .env.prod
```

## 📅 Scheduled Functions

### Daily Blog Generation
- **Schedule**: Every day at 9:00 AM UTC
- **Articles**: 2 articles per day
- **Function**: `dailyBlogGeneration`

### Weekly Blog Generation
- **Schedule**: Every Sunday at 10:00 AM UTC
- **Articles**: 7 articles per batch
- **Function**: `weeklyBlogGeneration`

## 🧪 Testing

### Manual Function Invocation

```bash
# Test daily generation
serverless invoke -f dailyBlogGeneration --stage dev

# Test weekly generation
serverless invoke -f weeklyBlogGeneration --stage dev

# Test with custom parameters
serverless invoke -f testBlogGeneration --stage dev --data '{"count": 1, "category": "techEconomy"}'

# Get statistics
serverless invoke -f blogStats --stage dev
```

### HTTP Endpoints

After deployment, you can also test via HTTP:

```bash
# Test blog generation (POST)
curl -X POST https://your-api-gateway-url/test-blog-generation \
  -H "Content-Type: application/json" \
  -d '{"count": 1, "category": "digitalMarketing"}'

# Get statistics (GET)
curl https://your-api-gateway-url/blog-stats
```

## 📊 Monitoring

### View Logs

```bash
# Daily function logs
serverless logs -f dailyBlogGeneration --stage prod

# Weekly function logs
serverless logs -f weeklyBlogGeneration --stage prod

# Follow logs in real-time
serverless logs -f dailyBlogGeneration --stage prod --tail
```

### CloudWatch Dashboards

The deployment creates CloudWatch log groups:
- `/aws/lambda/admi-blog-generation-{stage}-dailyBlogGeneration`
- `/aws/lambda/admi-blog-generation-{stage}-weeklyBlogGeneration`

### Webhook Notifications

Configure `BLOG_GENERATION_WEBHOOK_URL` to receive notifications via:
- Slack
- Discord
- Microsoft Teams
- Custom webhook endpoints

## 🔧 Configuration

### Schedule Modification

To change the schedule, edit `serverless.yml`:

```yaml
functions:
  dailyBlogGeneration:
    events:
      - schedule:
          rate: cron(0 9 * * ? *)  # 9:00 AM UTC daily
```

### Function Timeout

Increase timeout for larger batch generations:

```yaml
provider:
  timeout: 900  # 15 minutes
```

### Memory Allocation

Adjust memory for better performance:

```yaml
provider:
  memorySize: 512  # MB
```

## 🛡️ Security

### Environment Variables

- Never commit `.env` files to version control
- Use AWS Systems Manager Parameter Store for sensitive data in production
- Rotate API keys regularly

### IAM Permissions

The service uses least-privilege IAM roles:
- Lambda execution permissions
- CloudWatch logs write access
- No unnecessary AWS service access

## 🔄 Maintenance

### Update Dependencies

```bash
npm update
serverless deploy --stage prod
```

### Remove Deployment

```bash
serverless remove --stage dev
```

### Backup Configuration

Before major updates, backup your environment files and Contentful data.

## 📝 Troubleshooting

### Common Issues

1. **Deployment Fails**
   - Check AWS credentials: `aws sts get-caller-identity`
   - Verify environment variables are set
   - Ensure Serverless Framework is installed

2. **Function Timeouts**
   - Increase timeout in `serverless.yml`
   - Check internet connectivity for API calls
   - Verify OpenAI API quota

3. **No Articles Generated**
   - Check Contentful credentials and permissions
   - Verify OpenAI API key is valid
   - Review function logs for errors

### Debug Mode

Enable verbose logging:

```bash
serverless deploy --stage dev --verbose
```

## 🤝 Contributing

1. Make changes in a feature branch
2. Test thoroughly in development environment
3. Deploy to staging for integration testing
4. Create pull request for production deployment

## 📄 License

MIT License - see project root for details.

## 📞 Support

For issues and questions:
- Check function logs in CloudWatch
- Review this documentation
- Contact the ADMI tech team