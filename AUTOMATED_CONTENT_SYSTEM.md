# 🤖 ADMI Automated Content Generation System

**Complete documentation for automated blog generation and video cache refresh system**

---

## 📋 **System Overview**

The ADMI website features a fully automated content generation system that:

- ✅ **Generates blog articles daily** using AI (OpenAI GPT)
- ✅ **Refreshes YouTube video cache** automatically
- ✅ **Publishes to Contentful CMS** as drafts for review
- ✅ **Runs on AWS Lambda** for scalability and reliability
- ✅ **Tracks generation statistics** and handles errors gracefully

---

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AWS Lambda    │    │   Contentful    │    │    OpenAI       │
│   (Scheduler)   │ ──▶│      CMS        │    │     API         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  CloudWatch     │    │  YouTube API    │    │   Blog Topics   │
│   Monitoring    │    │  (Video Cache)  │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## ⚙️ **Components**

### **1. Blog Generation Engine**

- **Location**: `scripts/blog-generation/`
- **Main File**: `blog-scheduler.js`
- **Engine**: `seo-rocket-blog-generator.js`
- **Topics**: `blog-topics-database.js`

### **2. AWS Lambda Functions**

- **Location**: `infrastructure/serverless/blog-generation/`
- **Handlers**: `handlers/blogGeneration.js`
- **Config**: `serverless.yml`

### **3. Video Cache System**

- **Handler**: `handlers/videoCacheRefresh.js`
- **API Endpoint**: `/api/cron/refresh-video-cache`
- **Cache File**: `data/admi-videos-cache.json`

---

## 📅 **Automated Schedules**

| **Function**               | **Schedule**                | **Description**                       |
| -------------------------- | --------------------------- | ------------------------------------- |
| **Daily Blog Generation**  | `7:00 AM EAT` (5:00 AM UTC) | Generates 2 articles daily            |
| **Weekly Blog Generation** | `Sunday 10:00 AM UTC`       | Generates 7 articles weekly           |
| **Video Cache Refresh**    | `Midnight UTC`              | Refreshes YouTube video data          |
| **FAQ Optimization**       | `Monday 6:00 AM UTC`        | Updates FAQ content (separate system) |

---

## 🚀 **Quick Start Guide**

### **Prerequisites**

- AWS CLI configured with appropriate permissions
- Node.js 18+ installed
- Serverless Framework (`npm install -g serverless`)
- Environment variables configured

### **1. Local Development**

```bash
# Install dependencies
cd infrastructure/serverless/blog-generation
npm install

# Copy environment variables
cp ../../../.env .env

# Test locally
npm run test-blog-generation
```

### **2. Deploy to AWS Lambda**

```bash
# Deploy to production
cd infrastructure/serverless/blog-generation
npx serverless deploy --stage prod

# Deploy to development
npx serverless deploy --stage dev
```

### **3. Manual Testing**

```bash
# Test daily generation
npm run blog:daily

# Test weekly generation
npm run blog:weekly

# Check generation stats
npm run blog:stats
```

---

## 🔧 **Configuration**

### **Environment Variables**

```bash
# Contentful CMS
ADMI_CONTENTFUL_SPACE_ID=qtu3mga6n6gc
ADMI_CONTENTFUL_ACCESS_TOKEN=your_token_here
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
ADMI_CONTENTFUL_ENVIRONMENT=master

# OpenAI API
NEXT_OPENAI_API_KEY=sk-proj-your_key_here

# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_key
NEXT_PUBLIC_ADMI_YOUTUBE_CHANNEL_ID=UCqLmokG6Req2pHn2p7D8WZQ

# Application
APP_URL=https://main.d2yh9rjzagq5ao.amplifyapp.com
CRON_SECRET=admi-cron-secret-2025
```

### **AWS Lambda Configuration**

```yaml
# serverless.yml
functions:
  dailyBlogGeneration:
    handler: handlers/blogGeneration.daily
    events:
      - schedule:
          rate: cron(0 5 * * ? *) # 7:00 AM EAT
          enabled: true
    timeout: 900 # 15 minutes
    memorySize: 512
```

---

## 📝 **Blog Generation Process**

### **1. Topic Selection**

- Rotates through categories: `creativeEconomy`, `techEconomy`, `digitalMarketing`, `gaming`, `edtech`
- Uses curated topic database with keywords and difficulty levels
- Ensures balanced content distribution

### **2. Content Generation**

```javascript
// Process flow
const topic = getRandomTopic(category)
const seoInsights = await getSEOInsights(topic.keywords)
const content = await generateArticle(topic, seoInsights)
const entry = await publishToContentful(content)
```

### **3. Quality Assurance**

- **SEO Optimization**: Keyword research and optimization
- **Content Structure**: Proper headings, meta descriptions, tags
- **Draft Status**: All articles published as drafts for review
- **Error Handling**: Comprehensive logging and error recovery

### **4. Statistics Tracking**

```json
{
  "totalGenerated": 4,
  "lastRun": "2025-07-28T12:42:02.856Z",
  "generatedArticles": [...],
  "categoryStats": {
    "creativeEconomy": 1,
    "techEconomy": 1,
    "digitalMarketing": 1,
    "gaming": 1
  },
  "errors": []
}
```

---

## 🎬 **Video Cache System**

### **Process Flow**

1. **API Call**: Fetch latest videos from YouTube Data API
2. **Data Processing**: Format and optimize video metadata
3. **Cache Update**: Update `data/admi-videos-cache.json`
4. **Statistics**: Track cache refresh performance

### **Cache Structure**

```json
{
  "videos": [
    {
      "id": "video_id",
      "title": "Video Title",
      "description": "Video description...",
      "thumbnail": {...},
      "publishedAt": "2025-07-28T06:24:07Z",
      "duration": "10:42",
      "viewCount": "2",
      "tags": [...],
      "categoryId": "27"
    }
  ],
  "lastUpdated": "2025-07-28T11:30:28.495Z",
  "totalVideos": 440
}
```

---

## 🔍 **Monitoring & Maintenance**

### **CloudWatch Logs**

- **Log Group**: `/aws/lambda/admi-blog-generation-prod-*`
- **Retention**: 30 days
- **Monitoring**: Automatic error alerting

### **Health Checks**

```bash
# Check Lambda function status
aws lambda get-function --function-name admi-blog-generation-prod-dailyBlogGeneration

# View recent logs
aws logs tail /aws/lambda/admi-blog-generation-prod-dailyBlogGeneration --follow

# Test manual execution
aws lambda invoke --function-name admi-blog-generation-prod-dailyBlogGeneration response.json
```

### **Performance Metrics**

- **Execution Duration**: Typically 2-5 minutes per article
- **Memory Usage**: ~200-400MB during generation
- **Success Rate**: Target >95% successful generations
- **Cost**: ~$0.10-0.20 per day for all functions

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Blog Generation Failures**

```bash
# Check logs
aws logs tail /aws/lambda/admi-blog-generation-prod-dailyBlogGeneration

# Common causes:
# - OpenAI API rate limits
# - Contentful API errors
# - Network timeouts
# - Invalid environment variables
```

#### **2. Video Cache Issues**

```bash
# Test video cache refresh
curl -H "Authorization: Bearer admi-cron-secret-2025" \
     "https://your-domain.com/api/cron/refresh-video-cache"

# Common causes:
# - YouTube API quota exceeded
# - Invalid API keys
# - Channel ID changes
```

#### **3. Deployment Issues**

```bash
# Validate serverless configuration
npx serverless print --stage prod

# Check AWS credentials
aws sts get-caller-identity

# Redeploy function
npx serverless deploy function --function dailyBlogGeneration --stage prod
```

### **Error Recovery**

- **Automatic Retry**: Functions retry failed executions up to 3 times
- **Dead Letter Queue**: Failed executions logged for manual review
- **Alerting**: CloudWatch alarms notify of persistent failures

---

## 📊 **API Endpoints**

### **Production Endpoints**

```bash
# Test blog generation
POST https://your-lambda-url/test-blog-generation

# Get blog statistics
GET https://your-lambda-url/blog-stats

# Manual video cache refresh
POST https://admi.africa/api/cron/refresh-video-cache
Header: Authorization: Bearer admi-cron-secret-2025
```

### **Response Format**

```json
{
  "success": true,
  "type": "daily",
  "articlesGenerated": 2,
  "totalGenerated": 4,
  "timestamp": "2025-07-28T12:42:02.856Z",
  "articles": [
    {
      "title": "Article Title",
      "id": "contentful_entry_id",
      "category": "digitalMarketing"
    }
  ]
}
```

---

## 🔐 **Security**

### **API Security**

- **Authentication**: Bearer token authentication for cron endpoints
- **CORS**: Configured for production domains only
- **Rate Limiting**: Built-in AWS Lambda concurrency limits

### **Environment Security**

- **Secrets Management**: Environment variables encrypted at rest
- **IAM Roles**: Minimal required permissions only
- **Network**: VPC isolation for sensitive operations

### **Content Security**

- **Draft Status**: All generated content requires manual review
- **Content Filtering**: AI generation includes content guidelines
- **Audit Trail**: Complete generation history logged

---

## 📈 **Scaling & Performance**

### **Current Limits**

- **Daily Generation**: 2 articles (adjustable)
- **Weekly Generation**: 7 articles (adjustable)
- **OpenAI API**: Rate limited per plan
- **Contentful**: 7,000 API calls/hour limit

### **Scaling Options**

- **Increase Generation**: Modify `articlesPerBatch` in configuration
- **Multiple Regions**: Deploy Lambda functions in multiple AWS regions
- **Batch Processing**: Generate multiple articles in parallel
- **Caching**: Implement Redis for topic and content caching

---

## 🛠️ **Development Workflow**

### **Local Development**

1. **Environment Setup**: Copy `.env` file and install dependencies
2. **Code Changes**: Modify generators or handlers
3. **Local Testing**: Run `npm run blog:daily` to test
4. **Commit Changes**: Standard git workflow

### **Deployment Process**

1. **Code Review**: Ensure changes don't break existing functionality
2. **Staging Deploy**: `npx serverless deploy --stage dev`
3. **Testing**: Verify staging functions work correctly
4. **Production Deploy**: `npx serverless deploy --stage prod`
5. **Monitoring**: Watch CloudWatch logs for issues

### **Adding New Features**

1. **Blog Topics**: Add to `blog-topics-database.js`
2. **Content Types**: Modify generator templates
3. **Scheduling**: Update `serverless.yml` cron expressions
4. **Monitoring**: Add CloudWatch metrics and alarms

---

## 📞 **Support & Maintenance**

### **Regular Maintenance**

- **Monthly**: Review generation statistics and adjust topics
- **Quarterly**: Update OpenAI prompts and content quality
- **Annually**: Review AWS costs and optimize resource allocation

### **Emergency Contacts**

- **System Administrator**: Check deployment logs and AWS console
- **Content Team**: Review generated articles in Contentful
- **Development Team**: Code changes and system updates

### **Documentation Updates**

- Keep this documentation current with system changes
- Update configuration examples when settings change
- Maintain troubleshooting guides based on real issues

---

## 🎯 **Success Metrics**

### **Content Quality**

- **Article Approval Rate**: >80% of generated articles approved for publication
- **SEO Performance**: Articles ranking in top 50 for target keywords
- **User Engagement**: Average time on page >2 minutes

### **System Reliability**

- **Uptime**: >99.5% successful scheduled executions
- **Error Rate**: <5% failed generations
- **Response Time**: <5 minutes average generation time

### **Business Impact**

- **Content Volume**: Consistent daily content publication
- **SEO Traffic**: 20%+ increase in organic search traffic
- **Cost Efficiency**: <$50/month total automation costs

---

_Last Updated: July 28, 2025_  
_System Version: 2.0_  
_Documentation Maintainer: Development Team_
