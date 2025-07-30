# 🚀 AWS Lambda Blog Generation Deployment Guide

**Step-by-step guide to deploy the ADMI automated blog generation system to AWS Lambda**

---

## 📋 **Prerequisites**

### **Required Software**

- **Node.js 18+**: `node --version`
- **AWS CLI**: `aws --version`
- **Serverless Framework**: `npm install -g serverless`
- **Git**: For version control

### **Required Accounts & Credentials**

- **AWS Account** with programmatic access
- **Contentful CMS** space and management tokens
- **OpenAI API** key with GPT access
- **YouTube Data API** key (for video cache refresh)

---

## 🔧 **Environment Setup**

### **1. AWS Configuration**

```bash
# Configure AWS CLI with your credentials
aws configure

# Verify access
aws sts get-caller-identity
```

**Required AWS Permissions:**

- `lambda:*`
- `iam:*`
- `cloudformation:*`
- `s3:*`
- `logs:*`
- `events:*`

### **2. Environment Variables**

Create `.env` file in the serverless directory:

```bash
# Copy from project root
cp ../../../.env .env

# Or create manually with these values:
cat > .env << EOF
# Contentful CMS
ADMI_CONTENTFUL_SPACE_ID=your_space_id
ADMI_CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
ADMI_CONTENTFUL_ENVIRONMENT=master

# OpenAI API
NEXT_OPENAI_API_KEY=sk-proj-your_openai_key

# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_key
NEXT_PUBLIC_ADMI_YOUTUBE_CHANNEL_ID=UCqLmokG6Req2pHn2p7D8WZQ

# Application
APP_URL=https://your-domain.com
CRON_SECRET=your-secure-secret
EOF
```

---

## 📦 **Installation**

### **1. Install Dependencies**

```bash
# Navigate to serverless directory
cd infrastructure/serverless/blog-generation

# Install Node.js dependencies
npm install

# Install Serverless plugins globally (if needed)
npm install -g serverless-webpack serverless-dotenv-plugin serverless-offline
```

### **2. Verify Configuration**

```bash
# Test serverless configuration
npx serverless print --stage dev

# Validate environment variables
npx serverless invoke local --function testBlogGeneration
```

---

## 🎯 **Deployment Steps**

### **Development Deployment**

```bash
# Deploy to development stage
npx serverless deploy --stage dev

# Verify deployment
npx serverless info --stage dev

# Test function
npx serverless invoke --function dailyBlogGeneration --stage dev
```

### **Production Deployment**

```bash
# Deploy to production
npx serverless deploy --stage prod

# Verify deployment
npx serverless info --stage prod

# Test production function
npx serverless invoke --function dailyBlogGeneration --stage prod
```

### **Expected Output**

```
✅ Service Information
service: admi-blog-generation
stage: prod
region: us-east-1
stack: admi-blog-generation-prod
resources: 15
api keys: None
endpoints:
  POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/test-blog-generation
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/blog-stats
functions:
  dailyBlogGeneration: admi-blog-generation-prod-dailyBlogGeneration
  weeklyBlogGeneration: admi-blog-generation-prod-weeklyBlogGeneration
  testBlogGeneration: admi-blog-generation-prod-testBlogGeneration
  blogStats: admi-blog-generation-prod-blogStats
  videoCacheRefresh: admi-blog-generation-prod-videoCacheRefresh
layers: None
```

---

## ⚙️ **Configuration Details**

### **Lambda Function Settings**

```yaml
# serverless.yml configuration
functions:
  dailyBlogGeneration:
    handler: handlers/blogGeneration.daily
    timeout: 900 # 15 minutes
    memorySize: 512 # 512 MB
    reservedConcurrency: 1 # Prevent concurrent executions
    events:
      - schedule:
          rate: cron(0 5 * * ? *) # 7:00 AM EAT (5:00 AM UTC)
          enabled: true
```

### **Environment Variables (Lambda)**

Variables are automatically injected from your `.env` file:

- `ADMI_CONTENTFUL_SPACE_ID`
- `ADMI_CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_MANAGEMENT_TOKEN`
- `ADMI_CONTENTFUL_ENVIRONMENT`
- `OPENAI_API_KEY`
- `APP_URL`
- `CRON_SECRET`

### **IAM Permissions**

The deployment creates these resources:

- **Lambda Execution Role** with CloudWatch Logs access
- **EventBridge Rules** for scheduled execution
- **CloudWatch Log Groups** with 30-day retention

---

## 🧪 **Testing Deployment**

### **1. Manual Function Testing**

```bash
# Test daily blog generation
npx serverless invoke --function dailyBlogGeneration --stage prod

# Test weekly blog generation
npx serverless invoke --function weeklyBlogGeneration --stage prod

# Test video cache refresh
npx serverless invoke --function videoCacheRefresh --stage prod

# Get blog statistics
npx serverless invoke --function blogStats --stage prod
```

### **2. HTTP Endpoint Testing**

```bash
# Test blog generation endpoint
curl -X POST https://your-api-gateway-url/prod/test-blog-generation

# Get blog statistics
curl https://your-api-gateway-url/prod/blog-stats
```

### **3. CloudWatch Logs**

```bash
# View logs for daily generation
npx serverless logs --function dailyBlogGeneration --stage prod

# Follow logs in real-time
npx serverless logs --function dailyBlogGeneration --tail --stage prod

# View logs in AWS Console
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/admi-blog-generation"
```

---

## 📊 **Monitoring & Verification**

### **CloudWatch Metrics**

Monitor these key metrics:

- **Function Duration**: Should be < 5 minutes per article
- **Error Rate**: Should be < 5%
- **Invocation Count**: Daily functions should run once per day
- **Memory Usage**: Should stay under 400MB

### **Contentful Verification**

1. **Login to Contentful**: Check your content space
2. **View Entries**: Look for new blog articles with today's date
3. **Check Status**: Articles should be in "Draft" status
4. **Review Content**: Verify article quality and structure

### **Success Indicators**

- ✅ Lambda functions deploy without errors
- ✅ Scheduled events trigger correctly
- ✅ Blog articles appear in Contentful as drafts
- ✅ CloudWatch logs show successful executions
- ✅ No error notifications in AWS

---

## 🔄 **Update Deployment**

### **Code Changes**

```bash
# After making code changes
git add .
git commit -m "Update blog generation logic"
git push origin main

# Redeploy
npx serverless deploy --stage prod
```

### **Individual Function Updates**

```bash
# Update only one function (faster)
npx serverless deploy function --function dailyBlogGeneration --stage prod

# Update configuration only
npx serverless deploy --stage prod --update-config
```

### **Environment Variable Updates**

```bash
# Update .env file
vim .env

# Redeploy to update environment variables
npx serverless deploy --stage prod
```

---

## 🚨 **Troubleshooting**

### **Common Deployment Issues**

#### **1. Permission Errors**

```bash
# Error: User is not authorized to perform: lambda:CreateFunction
# Solution: Ensure AWS user has sufficient permissions

# Check current permissions
aws iam get-user

# Attach required policies
aws iam attach-user-policy --user-name your-user --policy-arn arn:aws:iam::aws:policy/PowerUserAccess
```

#### **2. Environment Variable Errors**

```bash
# Error: Cannot resolve variable at "provider.environment.OPENAI_API_KEY"
# Solution: Check .env file exists and has correct variables

# Verify .env file
cat .env | grep OPENAI_API_KEY

# Check serverless configuration
npx serverless print --stage prod | grep -A 10 environment
```

#### **3. Timeout Errors**

```bash
# Error: Task timed out after 30.00 seconds
# Solution: Increase timeout in serverless.yml

# Update timeout
timeout: 900  # 15 minutes for blog generation
```

#### **4. Memory Errors**

```bash
# Error: Process exited before completing request
# Solution: Increase memory allocation

# Update memory
memorySize: 1024  # Increase from 512 to 1024 MB
```

### **Rollback Procedure**

```bash
# List deployments
npx serverless deploy list --stage prod

# Rollback to previous deployment
npx serverless rollback --timestamp timestamp --stage prod

# Or remove deployment completely
npx serverless remove --stage prod
```

---

## 🔐 **Security Considerations**

### **API Security**

- **No public endpoints**: All functions are scheduled or behind authentication
- **Environment variables**: Encrypted at rest in Lambda
- **IAM roles**: Minimal required permissions only

### **Content Security**

- **Draft status**: All generated content requires manual review
- **Content filtering**: Built into AI prompts
- **Audit logs**: All generations logged in CloudWatch

### **Cost Management**

- **Reserved concurrency**: Prevents runaway costs
- **Timeout limits**: Functions terminate after 15 minutes max
- **Log retention**: Logs automatically deleted after 30 days

---

## 💰 **Cost Estimation**

### **Monthly Costs (Approximate)**

```
Lambda Functions:
- Daily executions: 30 × $0.20 = $6.00
- Weekly executions: 4 × $0.50 = $2.00
- Total Lambda: ~$8.00/month

CloudWatch Logs:
- Log ingestion: ~$2.00/month
- Log storage: ~$1.00/month

Total Monthly Cost: ~$11.00
```

### **Cost Optimization Tips**

- Use reserved concurrency to prevent over-execution
- Set appropriate timeout limits
- Monitor CloudWatch logs retention
- Use development stage for testing

---

## 📞 **Support & Maintenance**

### **Regular Maintenance Tasks**

- **Weekly**: Review generated content quality
- **Monthly**: Check CloudWatch metrics and costs
- **Quarterly**: Update dependencies and review logs

### **Emergency Procedures**

```bash
# Disable scheduled functions immediately
aws events disable-rule --name admi-blog-generation-prod-dailyBlogGeneration-schedule

# Remove deployment completely
npx serverless remove --stage prod

# Check function status
aws lambda get-function --function-name admi-blog-generation-prod-dailyBlogGeneration
```

### **Getting Help**

- **AWS Support**: For Lambda and infrastructure issues
- **Serverless Docs**: https://www.serverless.com/framework/docs/
- **Project Repository**: Check GitHub issues and documentation

---

## ✅ **Deployment Checklist**

### **Pre-Deployment**

- [ ] AWS CLI configured with correct credentials
- [ ] Environment variables set in `.env` file
- [ ] Dependencies installed (`npm install`)
- [ ] Configuration validated (`serverless print`)

### **Deployment**

- [ ] Development deployment successful
- [ ] Development functions tested
- [ ] Production deployment successful
- [ ] Production functions tested

### **Post-Deployment**

- [ ] CloudWatch logs showing successful executions
- [ ] Blog articles appearing in Contentful
- [ ] Scheduled events configured correctly
- [ ] Monitoring and alerts set up

### **Documentation**

- [ ] Deployment details documented
- [ ] Team members trained on monitoring
- [ ] Emergency procedures communicated
- [ ] Success metrics defined and tracked

---

_Last Updated: July 30, 2025_  
_Deployment Guide Version: 1.0_  
_AWS Region: us-east-1_
