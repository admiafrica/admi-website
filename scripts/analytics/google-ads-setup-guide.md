# Google Ads API Setup Guide for ADMI Analytics

## 🎯 Purpose

Access Google Ads historical data to understand:
- **2024 High-Volume Strategy**: What drove 537K sessions with 6.54% organic
- **2025 Minimal Paid Strategy**: Why paid traffic dropped to 2.37%
- **Campaign Performance**: Which campaigns, keywords, and ad groups worked
- **Cost Analysis**: Budget allocation and ROI from paid advertising
- **Recovery Strategy**: How to restart effective paid campaigns

## 🔧 Google Ads API Setup (Recommended)

### Step 1: Enable Google Ads API

1. **Go to Google Cloud Console**:
   ```
   https://console.developers.google.com/
   ```

2. **Select ADMI Project** (or create new one):
   - Project ID: `admi-analytics-project` (or similar)

3. **Enable Google Ads API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Ads API"
   - Click "Enable"

### Step 2: Create OAuth 2.0 Credentials

1. **Go to Credentials**:
   ```
   https://console.developers.google.com/apis/credentials
   ```

2. **Create OAuth 2.0 Client ID**:
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Application type: "Desktop application"
   - Name: "ADMI Google Ads Analytics"

3. **Download Credentials**:
   - Download the JSON file
   - Note the `client_id` and `client_secret`

### Step 3: Get Developer Token

1. **Access Google Ads Account**:
   - Go to https://ads.google.com
   - Navigate to "Tools & Settings" > "Setup" > "API Center"

2. **Apply for Developer Token**:
   - Fill out the application form
   - Explain: "Analytics and reporting for ADMI educational institution"
   - Wait for approval (usually 1-2 business days)

### Step 4: Generate Refresh Token

1. **Use OAuth 2.0 Playground**:
   ```
   https://developers.google.com/oauthplayground/
   ```

2. **Configure OAuth Settings**:
   - Click gear icon (⚙️) in top right
   - Check "Use your own OAuth credentials"
   - Enter your `client_id` and `client_secret`

3. **Authorize Google Ads API**:
   - In "Step 1", find "Google Ads API v14"
   - Select: `https://www.googleapis.com/auth/adwords`
   - Click "Authorize APIs"
   - Sign in with Google account that has access to ADMI Google Ads

4. **Exchange Authorization Code**:
   - Click "Exchange authorization code for tokens"
   - Copy the `refresh_token`

### Step 5: Add Credentials to .env

```bash
# Add these to your .env file:
GOOGLE_ADS_CLIENT_ID=your_client_id_here
GOOGLE_ADS_CLIENT_SECRET=your_client_secret_here
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token_here
GOOGLE_ADS_CUSTOMER_ID=your_customer_id_here (optional)
```

### Step 6: Run Analysis

```bash
node scripts/analytics/google-ads-integration-setup.js
```

## 🔍 Alternative Methods (If API Setup is Complex)

### Option 1: Google Ads Interface Export

1. **Login to Google Ads**:
   - Go to https://ads.google.com
   - Select ADMI account

2. **Export Campaign Data**:
   - Navigate to "Campaigns"
   - Set date range: January 1, 2024 - November 3, 2025
   - Click "Download" > "Export"
   - Choose format: CSV or Excel

3. **Export Reports**:
   - **Campaign Performance**: Campaigns > Download
   - **Keyword Performance**: Keywords > Download  
   - **Ad Group Performance**: Ad groups > Download
   - **Search Terms**: Search terms > Download

4. **Save Files**:
   ```
   exports/google-ads/
   ├── campaigns-2024-2025.csv
   ├── keywords-2024-2025.csv
   ├── ad-groups-2024-2025.csv
   └── search-terms-2024-2025.csv
   ```

### Option 2: Google Ads Scripts

1. **Access Google Ads Scripts**:
   - In Google Ads, go to "Tools & Settings" > "Bulk Actions" > "Scripts"

2. **Create Data Export Script**:
   ```javascript
   function main() {
     var campaigns = AdsApp.campaigns()
       .withCondition("Status = ENABLED")
       .forDateRange("20240101", "20251103")
       .get();
     
     var report = [];
     while (campaigns.hasNext()) {
       var campaign = campaigns.next();
       var stats = campaign.getStatsFor("20240101", "20251103");
       
       report.push({
         name: campaign.getName(),
         impressions: stats.getImpressions(),
         clicks: stats.getClicks(),
         cost: stats.getCost(),
         conversions: stats.getConversions()
       });
     }
     
     Logger.log(JSON.stringify(report));
   }
   ```

3. **Run and Export Results**

### Option 3: Google Analytics Integration

Since Google Ads data flows into Google Analytics, we can extract some paid advertising insights:

1. **Check GA4 for Paid Traffic**:
   - Source/Medium reports
   - Campaign data
   - Cost data (if linked)

2. **Run Enhanced Analytics Query**:
   ```bash
   node scripts/analytics/enhanced-ga4-paid-analysis.js
   ```

## 📊 Expected Google Ads Insights

### 2024 High-Volume Strategy Analysis:
- **Total Ad Spend**: Likely $50K-$200K annually
- **Campaign Types**: Search, Display, YouTube, Shopping
- **Top Keywords**: Course-related terms, "digital media Kenya", etc.
- **Geographic Targeting**: Kenya, East Africa, broader Africa
- **Cost Per Click**: Estimated $0.50-$2.00
- **Conversion Rate**: Estimated 2-5%

### 2025 Minimal Strategy Analysis:
- **Total Ad Spend**: Likely <$5K annually
- **Active Campaigns**: Minimal or paused
- **Performance Drop**: Correlates with 94.7% traffic decline
- **Opportunity**: Restart proven 2024 campaigns

## 🎯 Recovery Strategy Insights

Once we access Google Ads data, we can:

### 1. Identify Top Performing Campaigns
- Which campaigns drove the most conversions in 2024
- Best performing keywords and ad groups
- Optimal budget allocation

### 2. Understand Cost Structure
- Cost per acquisition in 2024
- Budget requirements for volume recovery
- ROI analysis for different campaign types

### 3. Restart Strategy
- Reactivate top-performing campaigns
- Adjust budgets for sustainable growth
- Target 30% paid traffic (vs 2.37% current)

## ⚠️ Important Considerations

### Data Access Limitations:
- Google Ads API requires approval (1-2 days)
- Historical data available for 2+ years
- Some metrics may have changed over time

### Budget Planning:
- 2024 strategy was likely unsustainable (6.54% organic)
- Target balanced approach: 50% organic, 30% paid, 20% other
- Start with $2,000-$5,000/month budget for recovery

### Quality vs Volume:
- Don't repeat 2024's volume-only approach
- Maintain 2025's quality improvements
- Focus on high-intent keywords and audiences

## 🚀 Next Steps

### Immediate (Today):
1. **Start Google Ads API setup** (Steps 1-5 above)
2. **Export manual data** as backup (Option 1)
3. **Check current Google Ads account status**

### This Week:
1. **Complete API setup and run analysis**
2. **Identify top-performing historical campaigns**
3. **Create restart strategy for proven campaigns**

### Next Week:
1. **Launch emergency paid campaigns** ($2K budget)
2. **Monitor performance and adjust**
3. **Scale successful campaigns gradually**

## 📞 Support Resources

- **Google Ads API Documentation**: https://developers.google.com/google-ads/api/
- **Google Ads Help Center**: https://support.google.com/google-ads/
- **OAuth 2.0 Playground**: https://developers.google.com/oauthplayground/

---

**The Google Ads data is crucial for understanding what drove ADMI's 2024 peak performance and how to recover from the 2025 decline. This setup will provide the missing piece of the analytics puzzle.**
