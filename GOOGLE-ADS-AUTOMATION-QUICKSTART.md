# Google Ads Automation - Quick Start Guide

## What's Been Built

### 1. Automated Brevo → Google Ads Sync ✅
Automatically syncs qualified customers from Brevo CRM to Google Ads Customer Match **daily**.

### 2. Daily Performance Monitoring ✅
Tracks campaign performance against targets and sends optimization recommendations **every morning**.

---

## Available Commands

### Manual Operations (Test First)

```bash
# Test customer sync (one-time)
npm run ads:sync

# Test full sync (all customers)
npm run ads:sync-full

# View Google Ads customer lists
npm run ads:upload-list

# Create new customer list
npm run ads:upload-create "List Name" "Description"

# Daily performance report
npm run ads:monitor

# Today's performance only
npm run ads:monitor-today

# Last 7 days
npm run ads:monitor-week

# Last 30 days
npm run ads:monitor-month
```

### Automated Operations (AWS Lambda)

```bash
# Deploy to AWS Lambda (automated daily sync)
cd infrastructure/aws-lambda/sync-automation
./deploy.sh

# Or use SAM directly
sam build
sam deploy --guided
```

---

## How It Works

### Daily Sync Automation

**Schedule**: Every day at 2 AM UTC (5 AM Nairobi)

**Process**:
1. Fetch qualified customers from Brevo CRM
   - Enrolled students (from Won/Enrolled deal stages)
   - High qualification score (≥70)
   - Qualified status contacts
   - Recent activity with course interest (2024-2025)

2. Upload to Google Ads Customer Match via API
   - Creates/updates "ADMI - Auto-Synced Customers" list
   - Uploads new customers only (incremental)
   - Hashes emails/phones for privacy (SHA256)

3. Track sync state
   - Stores last sync timestamp in `data/sync-state.json`
   - Maintains count of synced customers
   - Enables incremental updates (faster)

4. Notification (optional)
   - Slack webhook for sync status
   - Email alerts on failures

**Expected Results**:
- 42,000+ customers uploaded on first run
- ~50-200 new customers per day after that
- 24-48 hours for Google to process matches
- 60-70% match rate expected

### Performance Monitoring

**Schedule**: Every day at 6 AM UTC (9 AM Nairobi)

**Metrics Tracked**:
- ✅ CTR (Click-Through Rate) - Target: 2%
- ✅ CPC (Cost Per Click) - Target: ≤50 KES
- ✅ Conversion Rate - Target: 5%
- ✅ CPA (Cost Per Acquisition) - Target: ≤5,000 KES
- ✅ Impression Share - Target: 70%
- ✅ Quality Score - Target: ≥7

**Automated Recommendations**:
```
⚠️  Campaign XYZ - CTR below target (1.2% vs 2.0%)
   → Improve ad copy and targeting. Test new ad variations.

🔴 Campaign ABC - CPA too high (7,500 vs 5,000)
   → URGENT: Reduce CPA by improving targeting and conversion rate.

✅ Campaign DEF - All metrics on target
```

**Output**:
- Console report with color-coded alerts
- JSON report saved to `reports/google-ads/daily-performance-YYYY-MM-DD.json`
- Slack notifications for critical issues (optional)

---

## Setup Instructions

### Step 1: Test Locally (5 minutes)

```bash
# Test the sync
npm run ads:sync

# Check if it works
# Should show: "✅ SYNC COMPLETED SUCCESSFULLY"
# Should create: reports/google-ads/qualified-customers.csv

# Test the monitor
npm run ads:monitor-week

# Should show campaign performance vs targets
```

### Step 2: Deploy to AWS Lambda (10 minutes)

```bash
# Install AWS SAM CLI (if not installed)
# macOS:
brew install aws-sam-cli

# Configure AWS credentials
aws configure

# Deploy
cd infrastructure/aws-lambda/sync-automation
chmod +x deploy.sh
./deploy.sh
```

**During deployment, you'll be asked**:
- Stack name: `admi-google-ads-automation`
- AWS Region: `us-east-1` (or your preferred region)
- Confirm changes: `Y`
- Allow SAM CLI IAM role creation: `Y`
- Save configuration: `Y`

### Step 3: Verify Deployment

```bash
# Check Lambda functions
aws lambda list-functions --query 'Functions[?starts_with(FunctionName, `admi-`)].FunctionName'

# Should show:
# - admi-brevo-google-ads-sync
# - admi-brevo-google-ads-full-sync  
# - admi-google-ads-performance-monitor

# Trigger manual test
aws lambda invoke \
  --function-name admi-brevo-google-ads-sync \
  --payload '{}' \
  response.json

# Check result
cat response.json
```

### Step 4: Monitor Execution

```bash
# View Lambda logs
aws logs tail /aws/lambda/admi-brevo-google-ads-sync --follow

# Check Google Ads Audience Manager
# Go to: https://ads.google.com
# Tools → Audience Manager → "ADMI - Auto-Synced Customers"
# Wait 24-48 hours for match processing
```

---

## Performance Targets (Customizable)

Edit `scripts/analytics/google-ads-performance-monitor.js`:

```javascript
this.targets = {
  ctr: 2.0,              // 2% click-through rate
  cpc: 50,               // KES 50 cost per click
  conversionRate: 5.0,   // 5% conversion rate (applications)
  cpa: 5000,             // KES 5,000 cost per application
  roas: 3.0,             // 3x return on ad spend
  qualityScore: 7,       // Minimum quality score
  impressionShare: 70    // 70% impression share target
}
```

Adjust based on your actual goals and historical performance.

---

## Slack Notifications (Optional)

### Create Slack Webhook:
1. Go to: https://api.slack.com/messaging/webhooks
2. Create new webhook for your workspace
3. Copy webhook URL

### Add to Environment:
```bash
# Add to .env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Redeploy Lambda
cd infrastructure/aws-lambda/sync-automation
./deploy.sh
```

You'll receive alerts like:
```
🚨 ADMI Google Ads Sync Alert
Alert Type: SYNC_FAILED
Error: Connection timeout
Time: 2025-11-24T02:00:00Z

📊 Google Ads Performance Report
Total Spend: 125,000 KES
Conversions: 25
CPA: 5,000 KES

🔴 Critical Issues:
• Campaign A CPA: URGENT: Reduce CPA by improving targeting
```

---

## Costs

### AWS Lambda:
- **Free tier**: 1M requests/month + 400,000 GB-seconds compute
- **Your usage**: ~90 executions/month (3 functions × 30 days)
- **Expected cost**: **$0-2/month** (well within free tier)

### Google Ads API:
- **FREE** (no API call charges)
- Unlimited Customer Match uploads

### Total Monthly Cost: ~$2

---

## Troubleshooting

### Sync fails with "401 Unauthorized"
```bash
# Refresh Google Ads OAuth token
npm run ads:oauth

# Update .env with new GOOGLE_ADS_REFRESH_TOKEN
# Redeploy Lambda
```

### No customers uploaded
```bash
# Check Brevo connection
node scripts/analytics/check-brevo-structure.js

# Check sync state
cat data/sync-state.json

# Force full sync
npm run ads:sync-full
```

### Performance monitor shows no data
```bash
# Check if campaigns are enabled
npm run ads:status

# Verify date range
npm run ads:monitor-today  # Just today
npm run ads:monitor-week   # Last 7 days
```

### Lambda timeout
```bash
# Increase timeout in template.yaml
# Change Timeout: 300 to Timeout: 600

# Redeploy
cd infrastructure/aws-lambda/sync-automation
./deploy.sh
```

---

## Next Steps

1. **Test locally** first:
   ```bash
   npm run ads:sync
   npm run ads:monitor
   ```

2. **Upload initial customer list** manually:
   - Use `expanded-customer-list.csv` (42,330 contacts)
   - Upload via Google Ads UI
   - Wait 24-48 hours for processing

3. **Deploy automation**:
   ```bash
   cd infrastructure/aws-lambda/sync-automation
   ./deploy.sh
   ```

4. **Monitor results**:
   - Check CloudWatch Logs daily
   - Review Google Ads Audience Manager
   - Track match rates and campaign performance

5. **Optimize based on reports**:
   - Review daily performance alerts
   - Implement suggested optimizations
   - Track CPA, conversion rate, ROI improvements

---

## Questions?

Run into issues? Check:
- CloudWatch Logs: AWS Console → CloudWatch → Log Groups
- Google Ads API status: `npm run ads:test`
- Brevo API status: `node scripts/analytics/check-brevo-structure.js`

Ready to start? Run:
```bash
npm run ads:sync
```
