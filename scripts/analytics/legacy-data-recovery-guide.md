# ADMI Legacy Analytics Data Recovery Guide (2017-2024)

## 🚨 Critical Issue: Universal Analytics Sunset

**Important**: Google Universal Analytics (GA3) was officially sunset on **July 1, 2023**. This means:
- Legacy data from 2017-2024 may no longer be accessible via API
- Historical data might only be available through manual exports
- Some data may have been permanently lost

## 🔍 Current Findings

### API Access Attempt Results:
- **Google Analytics API**: Not enabled for current project
- **Service Account**: Has GA4 access but needs legacy permissions
- **Property Search**: Could not complete due to API restrictions

## 🛠️ Recovery Options

### Option 1: Enable Legacy Analytics API (Recommended First Step)

1. **Enable Google Analytics API v3**:
   ```bash
   # Visit this URL to enable the API:
   https://console.developers.google.com/apis/api/analytics.googleapis.com/overview?project=612336427380
   ```

2. **Add Required Permissions**:
   - Go to Google Cloud Console
   - Navigate to IAM & Admin > Service Accounts
   - Find your service account: `ga-mcp-service@admi-analytics-project.iam.gserviceaccount.com`
   - Add these roles:
     - Analytics Viewer
     - Analytics Editor (if needed)

3. **Re-run Legacy Finder**:
   ```bash
   node scripts/analytics/legacy-analytics-finder.js
   ```

### Option 2: Manual Data Export (If API Fails)

If you still have access to the old Google Analytics interface:

1. **Login to Legacy Analytics**:
   - Go to https://analytics.google.com
   - Look for any "Universal Analytics" properties
   - Switch to the legacy interface if available

2. **Export Historical Data**:
   - Navigate to Audience > Overview
   - Set date range: January 1, 2017 - December 31, 2024
   - Export data as CSV/Excel
   - Repeat for different report types:
     - Acquisition > All Traffic > Source/Medium
     - Behavior > Site Content > All Pages
     - Conversions > Goals > Overview

3. **Save Export Files**:
   ```
   exports/
   ├── admi-audience-2017-2024.csv
   ├── admi-acquisition-2017-2024.csv
   ├── admi-behavior-2017-2024.csv
   └── admi-conversions-2017-2024.csv
   ```

### Option 3: Google Analytics Intelligence API

Try using the newer Google Analytics Intelligence API:

1. **Enable Analytics Intelligence API**:
   ```bash
   gcloud services enable analyticsintelligence.googleapis.com
   ```

2. **Query Historical Data**:
   ```javascript
   // This might still have access to legacy data
   const intelligence = google.analyticsintelligence('v1beta')
   ```

### Option 4: Google Takeout (Data Liberation)

1. **Visit Google Takeout**:
   - Go to https://takeout.google.com
   - Select "Analytics"
   - Choose date range: 2017-2024
   - Download archive

2. **Extract Historical Data**:
   - Unzip the downloaded archive
   - Look for CSV files with historical data
   - Import into analysis scripts

## 🔧 Technical Implementation

### If Legacy API Access Works:

```javascript
// Enhanced legacy data extractor
class LegacyDataExtractor {
  async getHistoricalData(viewId, startDate, endDate) {
    const response = await this.analyticsReporting.reports.batchGet({
      requestBody: {
        reportRequests: [{
          viewId: viewId,
          dateRanges: [{ startDate, endDate }],
          metrics: [
            { expression: 'ga:sessions' },
            { expression: 'ga:users' },
            { expression: 'ga:pageviews' },
            { expression: 'ga:bounceRate' },
            { expression: 'ga:avgSessionDuration' },
            { expression: 'ga:organicSearches' }
          ],
          dimensions: [
            { name: 'ga:year' },
            { name: 'ga:month' },
            { name: 'ga:source' },
            { name: 'ga:medium' }
          ]
        }]
      }
    })
    return response.data
  }
}
```

### If Manual Export Required:

```javascript
// CSV parser for manual exports
class ManualDataParser {
  parseExportedCSV(filePath) {
    const csv = fs.readFileSync(filePath, 'utf8')
    const lines = csv.split('\n')
    const headers = lines[0].split(',')
    
    return lines.slice(1).map(line => {
      const values = line.split(',')
      const row = {}
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim()
      })
      return row
    })
  }
}
```

## 📊 Expected Legacy Data Structure

Based on typical ADMI analytics, we expect to find:

### 2017-2019 Data:
- **Sessions**: Likely 50K-200K per year
- **Organic Traffic**: Probably 20-40%
- **Direct Traffic**: 30-50%
- **Referral Traffic**: 10-20%
- **Social Traffic**: 5-15%

### 2020-2023 Data:
- **Sessions**: Likely 200K-500K per year (growth period)
- **Organic Traffic**: Probably 30-60%
- **Paid Traffic**: May include significant PPC campaigns
- **Mobile Traffic**: Increasing trend

### 2024 Data (Pre-GA4 Migration):
- **Sessions**: 537K+ (confirmed from current analysis)
- **Organic Traffic**: 6.54% (confirmed - very low)
- **Paid Traffic**: Likely 70-80% (high volume strategy)

## 🎯 Next Steps

### Immediate Actions:
1. **Enable Google Analytics API** (5 minutes)
2. **Run legacy finder script** (2 minutes)
3. **Check for manual export access** (10 minutes)
4. **Try Google Takeout** (30 minutes)

### If Data Found:
1. **Extract complete historical dataset**
2. **Generate comprehensive 2017-2025 comparison**
3. **Identify peak performance periods**
4. **Create detailed recovery strategy**

### If Data Lost:
1. **Document the data gap**
2. **Focus on 2024-2025 comparison**
3. **Use industry benchmarks for historical context**
4. **Implement robust tracking for future**

## ⚠️ Important Considerations

### Data Accuracy:
- Legacy data may have different tracking implementations
- Cookie policies and privacy changes affected data collection
- Mobile vs desktop tracking evolved significantly

### Business Context:
- ADMI went through significant changes 2017-2024
- Course offerings expanded
- Marketing strategies evolved
- Website redesigns affected tracking

### Recovery Limitations:
- Some data may be permanently lost due to UA sunset
- API access might be restricted
- Manual exports may be incomplete

## 🏆 Success Metrics

If we recover legacy data, we can:
- **Identify true peak performance years**
- **Understand successful strategies from high-growth periods**
- **Create accurate recovery targets**
- **Develop data-driven recommendations**

## 📞 Support Resources

If you need help:
1. **Google Analytics Support**: For API access issues
2. **Google Cloud Support**: For service account permissions
3. **ADMI IT Team**: For historical tracking knowledge
4. **Previous Marketing Team**: For context on legacy strategies

---

**Next Action**: Enable the Google Analytics API using the link above, then re-run the legacy finder script.
