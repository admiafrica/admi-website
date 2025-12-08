# Analytics-Driven FAQ Automation Setup Guide

**Overview**: Automatically analyze Google Analytics search queries, generate AI-powered FAQs, and add them directly to Contentful CMS.

---

## How It Works

```
Google Analytics Queries (Daily)
         ↓
   Fetch Top Queries
         ↓
   Identify Relevant Courses
         ↓
   Generate FAQ with OpenAI
         ↓
   Check for Duplicates
         ↓
   Create Entry in Contentful
         ↓
   Associate with Course
         ↓
   Publish Entry
         ↓
   Log Results
```

---

## Setup Instructions

### Step 1: Install Dependencies

All required packages are already in `package.json`:
- `contentful-management` - Write FAQs to Contentful
- `openai` - Generate FAQ content
- `axios` - Fetch analytics data

### Step 2: Configure Environment Variables

Add these to your `.env.local`:

```env
# Contentful Management API
CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_api_token
ADMI_CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google Analytics (optional - uses API if available)
GA4_PROPERTY_ID=your_property_id
GOOGLE_ANALYTICS_API_KEY=your_ga_key

# API Base URL
API_BASE_URL=http://localhost:3000

# Slack Notifications (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Step 3: Verify Contentful Setup

1. **Content Type**: Ensure you have a `faq` content type in Contentful with these fields:
   - `question` (Short text, required)
   - `answer` (Rich text or Long text)
   - `searchQuery` (Short text)
   - `keywords` (Array of short texts)
   - `course` (Link to Course entries)
   - `displayOrder` (Number)

2. **Access Rights**: Your management token needs these permissions:
   - Create entries
   - Publish entries
   - Read entries

### Step 4: Test the Automation

```bash
# Test FAQ generation without creating entries
npm run faq:analytics-to-contentful test

# Dry-run mode - shows what would happen
npm run faq:analytics-to-contentful dry-run

# Full automation run
npm run faq:analytics-to-contentful run
```

---

## Running as a Cron Job

### Option A: Direct Cron Job (Recommended)

```bash
# Open crontab editor
crontab -e

# Add this line to run daily at 2 AM UTC
0 2 * * * cd /path/to/admi-website && npm run faq:analytics-to-contentful run >> logs/cron/faq-automation.log 2>&1

# Or use the provided bash script
0 2 * * * /path/to/admi-website/scripts/cron/daily-faq-contentful-automation.sh
```

### Option B: AWS Lambda Scheduled Event

```bash
cd infrastructure/aws-cron
# Create Lambda function for FAQ automation
./deploy.sh faq-automation staging
```

### Option C: GitHub Actions

Create `.github/workflows/daily-faq-automation.yml`:

```yaml
name: Daily FAQ Automation

on:
  schedule:
    # 2 AM UTC daily
    - cron: '0 2 * * *'

jobs:
  faq-automation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run FAQ Automation
        env:
          CONTENTFUL_MANAGEMENT_TOKEN: ${{ secrets.CONTENTFUL_MANAGEMENT_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ADMI_CONTENTFUL_SPACE_ID: ${{ secrets.ADMI_CONTENTFUL_SPACE_ID }}
        run: npm run faq:analytics-to-contentful run
      
      - name: Upload logs
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: faq-automation-logs
          path: logs/cron/
```

---

## Monitoring & Troubleshooting

### View Logs

```bash
# Check today's logs
tail -f logs/cron/faq-automation-$(date '+%Y-%m-%d')*.log

# View all FAQ automation logs
ls -lh logs/cron/faq-automation-*.log

# Search for errors
grep "ERROR\|❌" logs/cron/faq-automation-*.log
```

### Common Issues

#### Issue: "CONTENTFUL_MANAGEMENT_TOKEN not set"

**Solution**: Check your `.env.local` file has the token:
```bash
echo $CONTENTFUL_MANAGEMENT_TOKEN
```

#### Issue: "OpenAI API key not configured"

**Solution**: Set your OpenAI key:
```bash
export OPENAI_API_KEY=sk-...
```

#### Issue: "FAQ already exists"

**Solution**: This is normal - duplicates are automatically skipped. Check logs for count.

#### Issue: "Failed to create FAQ in Contentful"

**Solution**:
1. Verify content type `faq` exists in Contentful
2. Check field names match exactly
3. Verify management token has create/publish permissions

### Debug Mode

Run with verbose logging:

```bash
DEBUG=* npm run faq:analytics-to-contentful run
```

---

## Configuration Options

Edit `scripts/analytics/analytics-to-contentful-faq.js`:

```javascript
const CONFIG = {
  // Maximum FAQs to generate per run
  maxFAQsPerRun: 5,  // Increase for more FAQs, reduce for faster runs

  // Minimum search volume threshold
  minSearchVolume: 5,  // Only generate FAQs for queries with 5+ searches

  // Course slug mapping
  courseMapping: {
    'music production': 'music-production-diploma',
    'graphic design': 'graphic-design-diploma',
    // Add more as needed
  }
}
```

---

## Performance Considerations

### API Rate Limits

- **OpenAI**: 3500 RPM, 90,000 TPM (adjust `maxFAQsPerRun` if hitting limits)
- **Contentful**: 55 RPS (usually fine with default settings)
- **Google Analytics**: 10k requests/day (should be fine)

### Cron Job Timing

- **Default**: 2 AM UTC (typically low traffic time)
- **Adjust** if you prefer different time:
  ```bash
  # Run at 6 PM UTC instead
  0 18 * * * /path/to/script
  ```

### Skipping Duplicates

The script automatically checks for existing FAQs:

```javascript
// Only processes if FAQ doesn't already exist
if (await faqExists(query, searchQuery)) {
  logger.info(`⏭️ FAQ already exists`)
  continue
}
```

---

## Slack Notifications

Enable automated Slack notifications:

1. Create Slack Incoming Webhook: https://api.slack.com/messaging/webhooks
2. Add to `.env.local`:
   ```env
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```
3. Script will automatically send status updates

### Notification Examples

**✅ Success**:
```
📊 ADMI FAQ Automation
SUCCESS
✅ FAQs generated and added to Contentful
Timestamp: 2025-12-08 02:00:00
```

**⚠️ Warning**:
```
📊 ADMI FAQ Automation
WARNING
⚠️ FAQ automation completed (check logs)
2 of 4 steps had issues
```

---

## Advanced Features

### Scheduling Different Run Modes

```bash
# Run 3 times a week (more FAQs)
0 2 * * 0,3,5 npm run faq:analytics-to-contentful run

# Run daily but limited to 3 FAQs max
# Edit CONFIG.maxFAQsPerRun = 3
0 2 * * * npm run faq:analytics-to-contentful run

# Run full optimization on Sundays
0 2 * * 0 npm run faq:analytics-to-contentful run && npm run faq:api-optimize optimize-main
```

### Batch Processing

For large FAQ generation runs:

```bash
# First run: Generate and check
npm run faq:analytics-to-contentful dry-run

# Review generated FAQs in logs
tail -100 logs/cron/faq-automation-*.log

# Full run
npm run faq:analytics-to-contentful run
```

---

## Verifying FAQs in Contentful

1. Log into Contentful: https://app.contentful.com
2. Navigate to your space
3. Go to **Content** → **FAQ** content type
4. Sort by **Updated** to see newly created entries
5. Verify:
   - Question is clear and natural
   - Answer is comprehensive
   - Course is linked (if relevant)
   - Display order is appropriate

### Bulk Update Display Order

If needed, adjust display order:

```bash
# FAQs from automation get displayOrder = 999
# Manually adjust in Contentful or use API
```

---

## API Reference

### Run Full Automation

```bash
npm run faq:analytics-to-contentful run
```

**What it does**:
1. Fetches top search queries (7 days)
2. Generates FAQs for each query
3. Creates entries in Contentful
4. Associates with courses
5. Publishes entries
6. Logs all results

**Output**: Creates/updates FAQs, logs to `logs/cron/`

### Test FAQ Generation

```bash
npm run faq:analytics-to-contentful test
```

**What it does**:
- Tests OpenAI connection
- Generates 2 sample FAQs
- Outputs JSON to console
- Does NOT create entries

**Output**: Sample FAQ JSON

### Dry-Run Preview

```bash
npm run faq:analytics-to-contentful dry-run
```

**What it does**:
- Fetches analytics queries
- Shows what would be processed
- Does NOT create entries
- Useful for preview before scheduling

**Output**: List of queries that would be processed

---

## Best Practices

✅ **Do**:
- Run during low-traffic hours (2-4 AM)
- Monitor Slack notifications for issues
- Review new FAQs in Contentful weekly
- Keep `maxFAQsPerRun ≤ 10` for safety
- Set up log rotation to manage disk space

❌ **Don't**:
- Run multiple times simultaneously
- Use production OpenAI key in staging
- Forget to configure Contentful management token
- Generate too many FAQs at once (API limits)
- Skip testing before scheduling

---

## Troubleshooting Script

Use this to verify setup:

```bash
#!/bin/bash
echo "Checking FAQ Automation Setup..."

echo "✓ Contentful Token:" $([ -n "$CONTENTFUL_MANAGEMENT_TOKEN" ] && echo "✅" || echo "❌")
echo "✓ OpenAI Key:" $([ -n "$OPENAI_API_KEY" ] && echo "✅" || echo "❌")
echo "✓ Space ID:" $([ -n "$ADMI_CONTENTFUL_SPACE_ID" ] && echo "✅" || echo "❌")
echo "✓ Script exists:" $([ -f "scripts/analytics/analytics-to-contentful-faq.js" ] && echo "✅" || echo "❌")
echo "✓ npm installed:" $(command -v npm > /dev/null && echo "✅" || echo "❌")

npm run faq:analytics-to-contentful test
```

---

## Support & Questions

- Review logs: `logs/cron/faq-automation-*.log`
- Check Contentful dashboard for created entries
- Test script: `npm run faq:analytics-to-contentful test`
- Slack notifications enabled for monitoring

---

**Last Updated**: December 8, 2025

