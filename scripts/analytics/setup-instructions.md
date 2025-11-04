# Google Analytics API Setup Instructions
## ADMI Website Traffic Analysis

This guide will help you set up Google Analytics Data API access to retrieve traffic data for the ADMI website analysis.

## Prerequisites

- Google Cloud Console access
- Google Analytics admin access for admi.africa
- Node.js installed (already available in the project)

## Step-by-Step Setup

### 1. Google Cloud Console Setup

#### Create or Select Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID (you'll need this later)

#### Enable Google Analytics Data API
```bash
# Using gcloud CLI (if installed)
gcloud services enable analyticsdata.googleapis.com

# Or enable manually in the console:
# 1. Go to APIs & Services > Library
# 2. Search for "Google Analytics Data API"
# 3. Click "Enable"
```

#### Create Service Account
```bash
# Using gcloud CLI with your existing project
gcloud config set project admi-youtube-integration

gcloud iam service-accounts create ga-analytics-service \
  --display-name="ADMI Google Analytics Data API Service Account" \
  --description="Service account for ADMI website traffic analysis"

# Generate service account key
gcloud iam service-accounts keys create ga-service-account.json \
  --iam-account=ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com
```

**Manual Creation (if gcloud CLI not available):**
1. Go to IAM & Admin > Service Accounts
2. Click "Create Service Account"
3. Name: `ga-analytics-service`
4. Description: `ADMI Google Analytics Data API Service Account`
5. Click "Create and Continue"
6. Skip role assignment (we'll handle this in Google Analytics)
7. Click "Done"
8. Click on the created service account
9. Go to "Keys" tab
10. Click "Add Key" > "Create New Key"
11. Select "JSON" format
12. Download the file and rename it to `ga-service-account.json`

### 2. Google Analytics Configuration

#### Add Service Account to Google Analytics
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select the ADMI property (admi.africa)
3. Click "Admin" (gear icon in bottom left)
4. Under "Property" column, click "Property Access Management"
5. Click the "+" button to add users
6. Enter the service account email: `ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com`
7. Select "Viewer" role
8. Uncheck "Notify new users by email"
9. Click "Add"

#### Verify Property ID
1. In Google Analytics, go to Admin > Property Settings
2. Confirm the Property ID is: `250948607`
3. This should match the `GA4_PROPERTY_ID` in your `.env` file

### 3. Project Configuration

#### Place Credentials File
1. Move the downloaded `ga-service-account.json` file to the project root directory
2. Ensure the file is in the same directory as `package.json`

#### Verify Environment Variables
Check your `.env` file contains:
```bash
GA4_PROPERTY_ID=250948607
GOOGLE_ANALYTICS_PROPERTY_ID=250948607
GOOGLE_APPLICATION_CREDENTIALS=./ga-service-account.json
```

### 4. Test the Setup

#### Run Connection Test
```bash
# Test the analytics connection
node -e "
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const client = new BetaAnalyticsDataClient({
  keyFilename: './ga-service-account.json'
});
console.log('✅ Google Analytics API client initialized successfully');
"
```

#### Run Sample Query
```bash
# Test a simple query
node scripts/analytics/run-analysis.js
```

### 5. Generate Traffic Analysis Report

#### Run Complete Analysis
```bash
# This will:
# 1. Fetch all traffic data from GA4 API
# 2. Process and analyze the data
# 3. Generate comprehensive markdown report
node scripts/analytics/run-analysis.js
```

#### Expected Output Files
- `analytics-data-raw.json` - Raw data from Google Analytics
- `analytics-report-june-september-2024.md` - Comprehensive analysis report

## Troubleshooting

### Common Issues

#### "Service account credentials file not found"
- Ensure `ga-service-account.json` is in the project root directory
- Check file permissions (should be readable)
- Verify the file is valid JSON

#### "Permission denied" or "Access forbidden"
- Verify the service account email was added to Google Analytics
- Ensure "Viewer" role was assigned
- Wait 5-10 minutes for permissions to propagate

#### "Property not found"
- Verify the GA4_PROPERTY_ID in `.env` matches Google Analytics
- Ensure you're using GA4 property ID, not Universal Analytics

#### "API not enabled"
- Enable Google Analytics Data API in Google Cloud Console
- Wait a few minutes for the API to become available

### Verification Steps

1. **File Check**:
   ```bash
   ls -la ga-service-account.json
   # Should show the file exists and is readable
   ```

2. **JSON Validation**:
   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync('ga-service-account.json', 'utf8')).project_id)"
   # Should output your Google Cloud project ID
   ```

3. **Environment Check**:
   ```bash
   node -e "require('dotenv').config(); console.log('GA4 Property ID:', process.env.GA4_PROPERTY_ID)"
   # Should output: GA4 Property ID: 250948607
   ```

## Security Notes

- **Never commit** `ga-service-account.json` to version control
- The file is already in `.gitignore`
- Store credentials securely and rotate them periodically
- Use least-privilege access (Viewer role only)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all setup steps were completed
3. Test with a simple API call first
4. Review Google Cloud Console logs for detailed error messages

For additional help:
- Google Analytics Data API Documentation: https://developers.google.com/analytics/devguides/reporting/data/v1
- Google Cloud Service Accounts: https://cloud.google.com/iam/docs/service-accounts

---

Once setup is complete, you can run the analysis anytime with:
```bash
node scripts/analytics/run-analysis.js
```

This will generate a comprehensive traffic analysis report for the ADMI website covering the specified date range.
