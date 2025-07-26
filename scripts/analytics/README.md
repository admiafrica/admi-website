# ADMI Analytics-Driven FAQ Optimization System

This system uses search data and analytics to continuously optimize FAQ content based on what prospective students are actually searching for.

## 🎯 Features

### 1. **Search Data Analysis**
- Analyzes Google Search Console queries
- Identifies trending questions and concerns
- Maps search intent to FAQ content gaps

### 2. **AI-Powered FAQ Generation**
- Uses search patterns to generate relevant FAQs
- Optimizes content for search intent
- Ensures answers address real user questions

### 3. **Performance Tracking**
- Monitors FAQ engagement metrics
- Tracks conversion impact
- A/B tests different FAQ approaches

### 4. **Automated Optimization**
- Weekly analysis of new search queries
- Automatic FAQ updates for trending topics
- Course-specific FAQ optimization

## 🚀 Quick Start

### Generate Optimized Main FAQ Page
```bash
npm run faq:optimize-main
```

### Analyze Search Query Patterns
```bash
npm run faq:analyze-queries
```

## 📊 Analytics Integration Options

### Option 1: Google Analytics MCP Server
Perfect for automated, real-time data access:

```bash
# Install MCP servers
npm install @mcp/google-analytics @mcp/search-console

# Configure in your MCP settings
{
  "mcpServers": {
    "google-analytics": {
      "command": "node",
      "args": ["node_modules/@mcp/google-analytics/dist/index.js"],
      "env": {
        "GOOGLE_ANALYTICS_PROPERTY_ID": "your-ga4-property-id",
        "GOOGLE_SERVICE_ACCOUNT_KEY": "path/to/service-account.json"
      }
    }
  }
}
```

### Option 2: Manual Data Export
For periodic optimization without API setup:

1. **Export Search Console Data**
   - Go to Google Search Console
   - Navigate to Performance > Search Results
   - Filter by queries containing "admi", course names, etc.
   - Export CSV with queries, impressions, clicks, CTR

2. **Update Search Data**
   - Replace SAMPLE_SEARCH_QUERIES in the script
   - Run optimization script with real data

3. **Google Analytics Export**
   - Export page performance data
   - Identify high-traffic course pages
   - Focus optimization on popular content

## 🔍 Current Search Analysis

Based on sample data, the most searched topics are:

| Theme | Query Count | Priority |
|-------|-------------|----------|
| Job/Career | 8 queries | High |
| Fees/Cost | 6 queries | High |
| Requirements | 5 queries | High |
| Location | 3 queries | Medium |
| Duration | 3 queries | Medium |
| Accreditation | 2 queries | Medium |

## 📈 Implementation Workflow

### Weekly Optimization Process
1. **Data Collection**
   ```bash
   # Automated via MCP or manual export
   npm run faq:analyze-queries
   ```

2. **FAQ Generation**
   ```bash
   # Generate new FAQs based on search trends
   npm run faq:optimize-main
   ```

3. **Course-Specific Updates**
   ```bash
   # Update course FAQs based on search patterns
   npm run faq:generate-simple [course-slug] -- --update
   ```

4. **Performance Review**
   - Monitor FAQ page analytics
   - Track engagement improvements
   - Measure conversion impact

### Monthly Deep Analysis
1. **Trending Topic Identification**
   - Analyze new search queries
   - Identify emerging student concerns
   - Spot seasonal patterns (intake periods, etc.)

2. **Content Gap Analysis**
   - Compare FAQ coverage to search queries
   - Identify missing information
   - Prioritize new FAQ creation

3. **Conversion Optimization**
   - A/B test FAQ variations
   - Optimize for decision-making factors
   - Improve call-to-action placement

## 🎨 Advanced Features

### Search Intent Mapping
```javascript
const intentMapping = {
  informational: ['what is', 'how to', 'definition'],
  commercial: ['best', 'review', 'compare', 'vs'],
  transactional: ['apply', 'enroll', 'register', 'cost'],
  navigational: ['admi website', 'admi contact', 'admi location']
}
```

### Seasonal Optimization
- **January-March**: Focus on new intake FAQs
- **July-September**: Address mid-year admission queries
- **October-December**: Emphasize career transition questions

### Course Performance Tracking
Monitor which course FAQs have highest:
- View rates
- Engagement time
- Conversion to applications

## 🔧 Technical Implementation

### File Structure
```
scripts/analytics/
├── search-data-faq-optimizer.js    # Main optimization script
├── google-analytics-mcp-setup.md   # MCP integration guide
└── README.md                       # This guide

scripts/ai/
├── optimized-main-faq-page.tsx     # Generated optimized FAQ page
└── generated-faqs-*.json           # Course-specific FAQ data
```

### Environment Variables
```bash
NEXT_OPENAI_API_KEY=your_openai_key
GOOGLE_ANALYTICS_PROPERTY_ID=your_ga_property_id
GOOGLE_SERVICE_ACCOUNT_KEY=path/to/service-account.json
```

## 📊 Success Metrics

Track these KPIs to measure FAQ optimization success:

### Engagement Metrics
- FAQ page time on page
- FAQ expansion rate
- Scroll depth on FAQ sections

### Conversion Metrics
- FAQ to application conversion rate
- Course page visits from FAQ page
- Contact form submissions from FAQ page

### Search Performance
- Improved rankings for target keywords
- Higher click-through rates from search results
- Reduced bounce rate from organic traffic

## 🚀 Next Steps

1. **Set up Google Analytics MCP** for automated data access
2. **Schedule weekly optimization** runs
3. **Implement FAQ analytics** tracking
4. **Create A/B testing** framework for FAQ variations
5. **Monitor conversion impact** and iterate

This system ensures your FAQs stay relevant, helpful, and optimized for what prospective students are actually searching for!