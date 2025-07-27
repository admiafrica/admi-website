# Analytics-Driven FAQ Optimization System

## Overview

The ADMI website now features a comprehensive analytics-driven FAQ optimization system that uses real Google Analytics data to continuously improve FAQ content based on user search behavior and engagement metrics.

## 🚀 Key Features

### 1. Analytics Integration

- **Secure Google Analytics Data API** integration without third-party packages
- Real-time FAQ performance metrics collection
- Search query analysis for content optimization
- Service account authentication with proper error handling

### 2. Three New Analytics API Endpoints

- **`/api/analytics/faq-metrics`** - FAQ page performance data (views, bounce rate, time on page)
- **`/api/analytics/search-queries`** - User search behavior analysis with top keywords
- **`/api/analytics/optimization-report`** - Comprehensive optimization insights and recommendations

### 3. AI-Powered Content Generation

- **OpenAI GPT-4** integration for search intent-driven FAQ generation
- Real user query analysis for content optimization
- Course-specific FAQ generation with industry context
- **100% FAQ coverage** across all 19 courses (diploma and certificate programs)

### 4. Automated Weekly Optimization

- Comprehensive cron job system with health monitoring
- Weekly analytics-based FAQ content updates
- Performance tracking and optimization reporting
- Automated error handling and logging

### 5. Enhanced Main FAQ Page

- Updated with search data-driven content
- Optimized for real user queries and search intent
- Improved SEO with search-query-based keywords
- Better conversion paths and user engagement

## 📊 System Architecture

```
Google Analytics Data API
          ↓
Analytics API Endpoints (/api/analytics/*)
          ↓
AI-Powered FAQ Optimizer (OpenAI GPT-4)
          ↓
Contentful CMS (FAQ Storage)
          ↓
Course Pages & Main FAQ Page
          ↓
Weekly Cron Job Automation
```

## 🛠️ Technical Implementation

### Analytics Endpoints

#### 1. FAQ Metrics API (`/api/analytics/faq-metrics`)

```typescript
GET /api/analytics/faq-metrics?refresh=false

Response:
{
  "success": true,
  "data": {
    "pageViews": 15420,
    "users": 8932,
    "averageSessionDuration": 342,
    "bounceRate": 34.2,
    "conversionFunnel": {
      "faqToCourseConversionRate": "42.3%",
      "faqToApplicationConversionRate": "8.7%"
    }
  }
}
```

#### 2. Search Queries API (`/api/analytics/search-queries`)

```typescript
GET /api/analytics/search-queries?limit=20&refresh=false

Response:
{
  "success": true,
  "data": {
    "searchQueries": [
      {
        "query": "music production course fees",
        "sessions": 245,
        "users": 198,
        "pagePath": "/frequently-asked-questions"
      }
    ],
    "topKeywords": ["fees", "requirements", "job", "salary", "duration"]
  }
}
```

#### 3. Optimization Report API (`/api/analytics/optimization-report`)

```typescript
GET /api/analytics/optimization-report

Response:
{
  "success": true,
  "data": {
    "overallScore": 78,
    "recommendations": [
      {
        "type": "content",
        "priority": "high",
        "issue": "High bounce rate on FAQ page",
        "recommendation": "Add more specific course information in FAQ answers"
      }
    ]
  }
}
```

### AI FAQ Generation Scripts

#### 1. Course-Specific FAQ Generator (`scripts/ai/generate-faqs.js`)

```bash
# Generate FAQs for a specific course
node scripts/ai/generate-faqs.js music-production-diploma

# Generate FAQs for all courses
node scripts/ai/generate-faqs.js --all
```

#### 2. Analytics-Driven Optimizer (`scripts/analytics/api-driven-faq-optimizer.js`)

```bash
# Optimize main FAQ page with API data
node scripts/analytics/api-driven-faq-optimizer.js optimize-main

# Generate optimization report
node scripts/analytics/api-driven-faq-optimizer.js report

# Test API connections
node scripts/analytics/api-driven-faq-optimizer.js test-api
```

#### 3. Performance Monitor (`scripts/analytics/faq-performance-monitor.js`)

```bash
# Run performance monitoring
node scripts/analytics/faq-performance-monitor.js monitor

# Setup performance alerts
node scripts/analytics/faq-performance-monitor.js alerts
```

### Cron Job Automation

#### Weekly Optimizer (`scripts/cron/weekly-faq-optimizer.sh`)

```bash
# Runs every Monday at 6:00 AM
0 6 * * 1 cd /Users/wilfred/admi-website && ./scripts/cron/weekly-faq-optimizer.sh
```

The cron job performs:

1. Analytics data collection and analysis
2. AI-powered FAQ optimization based on search queries
3. Performance monitoring and reporting
4. Automated content updates to Contentful
5. Error logging and health checks

## 📈 Performance Impact

### Before Implementation

- **FAQ Coverage**: ~60% of courses had FAQs
- **Content Source**: Hardcoded static content
- **Optimization**: Manual, infrequent updates
- **Analytics**: No performance tracking

### After Implementation

- **FAQ Coverage**: 100% across all 19 courses
- **Content Source**: AI-generated, search intent-driven
- **Optimization**: Automated weekly updates based on real data
- **Analytics**: Comprehensive performance tracking and reporting

### Measurable Improvements

- **Course FAQ Coverage**: 60% → 100%
- **Search Intent Alignment**: Static → Real user query driven
- **Update Frequency**: Manual/quarterly → Automated weekly
- **Performance Monitoring**: None → Comprehensive analytics

## 🔧 Setup and Configuration

### Environment Variables Required

```bash
# OpenAI Configuration
NEXT_OPENAI_API_KEY=your_openai_api_key

# Contentful Configuration
CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token
ADMI_CONTENTFUL_SPACE_ID=your_space_id
ADMI_CONTENTFUL_ENVIRONMENT=master

# Google Analytics Configuration
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
GOOGLE_ANALYTICS_PROPERTY_ID=250948607
```

### Google Analytics Setup

1. Create a Google Cloud Project
2. Enable Google Analytics Data API
3. Create a service account with Analytics Viewer permissions
4. Download service account credentials JSON file
5. Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable

### Cron Job Setup

```bash
# Install cron job
chmod +x scripts/cron/setup-cron.sh
./scripts/cron/setup-cron.sh

# Check cron status
./scripts/cron/cron-health-check.sh
```

## 📚 Usage Examples

### Generate Course FAQs

```bash
# Generate FAQs for Music Production Diploma
node scripts/ai/generate-faqs.js music-production-diploma

# Generate FAQs for all missing courses
node scripts/ai/generate-faqs.js --generate-all-missing
```

### Optimize Main FAQ Page

```bash
# Update main FAQ page with analytics data
node scripts/analytics/api-driven-faq-optimizer.js optimize-main

# Generate performance report
node scripts/analytics/faq-performance-monitor.js monitor
```

### Test Analytics Integration

```bash
# Test all API endpoints
node scripts/analytics/api-driven-faq-optimizer.js test-api

# Test specific analytics data
curl http://localhost:3001/api/analytics/faq-metrics
```

## 🎯 Benefits

### For Students

- **More Relevant FAQs**: Content based on actual student questions
- **Better Information**: AI-generated answers with specific details
- **Improved UX**: Faster access to commonly searched information

### For ADMI

- **Higher Conversion**: Search-optimized content improves course page visits
- **Better SEO**: Content aligned with actual search queries
- **Automated Optimization**: Reduces manual content management effort
- **Data-Driven Insights**: Real performance metrics guide content strategy

### For Development Team

- **Automated Workflow**: Weekly optimization without manual intervention
- **Performance Monitoring**: Comprehensive analytics and alerting
- **Scalable System**: Easy to extend to other content types
- **Quality Assurance**: AI verification ensures content accuracy

## 🔮 Future Enhancements

### Phase 2 Features

1. **Multi-language Support**: Generate FAQs in Swahili and French
2. **A/B Testing**: Test different FAQ variations for optimization
3. **Voice Search Optimization**: Optimize for voice query patterns
4. **Student Feedback Integration**: Incorporate FAQ helpfulness ratings

### Advanced Analytics

1. **Conversion Attribution**: Track FAQ impact on course enrollments
2. **Cohort Analysis**: Understand FAQ performance by user segments
3. **Predictive Analytics**: Forecast FAQ needs based on trends
4. **Real-time Optimization**: Dynamic FAQ ordering based on performance

## 📞 Support and Maintenance

### Monitoring

- **Cron Job Health**: Weekly health checks with email alerts
- **API Performance**: Response time and error rate monitoring
- **Content Quality**: AI-generated content review process

### Troubleshooting

- **Logs Location**: `scripts/cron/logs/`
- **Error Handling**: Comprehensive error messages and fallbacks
- **Rollback Process**: Version control for all generated content

### Contact

- **Technical Issues**: Check GitHub Issues
- **Content Questions**: Review generated FAQ files in `scripts/ai/`
- **Analytics Setup**: Follow `ANALYTICS_SETUP.md` guide

---

_This system represents a significant advancement in ADMI's digital strategy, combining AI technology with real user data to create a continuously improving, user-focused FAQ experience._
