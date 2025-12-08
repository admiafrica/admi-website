# FAQ Automation - Quick Start Guide

**Status**: ✅ READY TO DEPLOY

---

## What Was Set Up

A complete analytics-driven FAQ automation system that:

1. **Analyzes search queries** from Google Analytics
2. **Generates FAQ content** using OpenAI GPT-4
3. **Creates Contentful entries** automatically
4. **Associates FAQs with courses** based on content
5. **Publishes entries** for immediate visibility
6. **Logs everything** for monitoring and debugging

---

## Files Created/Modified

### New Scripts

```
✅ scripts/analytics/analytics-to-contentful-faq.js
   - Main automation script
   - 450+ lines of production-ready code
   - Handles all FAQ generation and Contentful integration

✅ scripts/cron/daily-faq-contentful-automation.sh
   - Bash wrapper for cron job scheduling
   - Includes error handling and Slack notifications
   - Provides logging and status reporting
```

### Documentation

```
✅ docs/FAQ-AUTOMATION-SETUP.md (11 KB)
   - Comprehensive setup guide
   - Configuration options
   - Troubleshooting section
   - Best practices

✅ scripts/cron/README.md (existing)
   - Updated with FAQ automation info
```

### Configuration

```
✅ package.json
   - Added npm script: faq:analytics-to-contentful
   - Supports: run | test | dry-run modes
```

---

## Quick Start (5 Minutes)

### 1. Verify Credentials ✅

```bash
# These should all be in your .env file:
echo "Contentful token: $CONTENTFUL_MANAGEMENT_TOKEN"
echo "OpenAI key: $NEXT_OPENAI_API_KEY"
echo "Space ID: $ADMI_CONTENTFUL_SPACE_ID"
```

### 2. Test FAQ Generation

```bash
npm run faq:analytics-to-contentful test
```

**Output**: Generates 2 sample FAQs showing the system works ✅

### 3. Dry-Run Preview

```bash
npm run faq:analytics-to-contentful dry-run
```

**Output**: Shows what would be processed without creating entries

### 4. Full Run (Creates FAQs)

```bash
npm run faq:analytics-to-contentful run
```

**Output**: 
- Fetches top 10 search queries
- Generates 5 FAQs max
- Creates/publishes entries in Contentful
- Logs all results to `logs/cron/faq-automation-*.log`

---

## Schedule as Cron Job

### Option A: Direct Crontab (Recommended)

```bash
# Open crontab editor
crontab -e

# Add this line (runs daily at 2 AM UTC)
0 2 * * * cd /path/to/admi-website && npm run faq:analytics-to-contentful run >> logs/cron/faq-automation.log 2>&1
```

### Option B: Using Provided Script

```bash
# Make it executable
chmod +x scripts/cron/daily-faq-contentful-automation.sh

# Add to crontab
0 2 * * * /path/to/admi-website/scripts/cron/daily-faq-contentful-automation.sh
```

### Option C: Verify Cron Is Working

```bash
# Test the bash script directly
./scripts/cron/daily-faq-contentful-automation.sh

# Check if it ran successfully
tail logs/cron/faq-contentful-automation-*.log
```

---

## How It Works

```
Daily Cron Trigger (2 AM UTC)
         ↓
Fetch Recent Search Queries
         ↓
Filter by Search Volume (5+ searches)
         ↓
For Each Query:
  ├─ Check if FAQ exists (avoid duplicates)
  ├─ Generate FAQ with OpenAI
  ├─ Identify relevant course
  ├─ Create Contentful entry
  ├─ Link to course
  ├─ Publish entry
  └─ Log result
         ↓
Summary Report
         ↓
Slack Notification (optional)
         ↓
Log Files: logs/cron/faq-automation-YYYY-MM-DD.log
```

---

## Key Features

✅ **Smart Duplicate Avoidance**
- Checks if FAQ already exists before creating
- Uses search query as unique identifier
- Prevents spam in Contentful

✅ **Course Auto-Association**
- Maps search queries to courses
- Links FAQ entries automatically
- Configurable via `courseMapping` object

✅ **Error Handling**
- Graceful fallback if OpenAI fails
- Partial runs complete successfully
- Detailed error logging

✅ **Production-Ready**
- Comprehensive logging
- Slack integration (optional)
- Rate limiting friendly
- Respects API limits

✅ **Monitoring**
- Log files with timestamps
- Success/failure counts
- Individual FAQ details
- API response tracking

---

## Monitoring & Maintenance

### View Today's Logs

```bash
tail -f logs/cron/faq-automation-$(date '+%Y-%m-%d')*.log
```

### Check Recent FAQs Created

```bash
# Last 24 hours
ls -lt logs/cron/faq-automation-*.log | head -1

# View full log
cat logs/cron/faq-automation-2025-12-08*.log
```

### Enable Slack Notifications

1. Create Slack Webhook: https://api.slack.com/messaging/webhooks
2. Add to `.env`:
   ```env
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```
3. Script will auto-notify on success/failure

### Troubleshooting

If FAQs aren't being created:

```bash
# 1. Test API connectivity
npm run faq:analytics-to-contentful test

# 2. Check for errors
tail logs/cron/faq-automation-*.log | grep "ERROR\|❌"

# 3. Verify credentials
echo "Space: $ADMI_CONTENTFUL_SPACE_ID"
echo "Token exists: ${CONTENTFUL_MANAGEMENT_TOKEN:0:10}***"

# 4. Check Contentful content type
# Go to: https://app.contentful.com/spaces/YOUR_SPACE/content_types
# Verify 'faq' content type exists with required fields
```

---

## Configuration Options

Edit `scripts/analytics/analytics-to-contentful-faq.js`:

```javascript
const CONFIG = {
  // How many FAQs to generate per run
  maxFAQsPerRun: 5,  // Safe default, increase for more

  // Minimum searches needed for FAQ
  minSearchVolume: 5,  // Skip low-volume queries

  // Course slug mappings (add as needed)
  courseMapping: {
    'music production': 'music-production-diploma',
    'graphic design': 'graphic-design-diploma',
    // ... add more courses here
  }
}
```

---

## What Gets Created in Contentful

Each FAQ entry includes:

```
✓ Question (required)
  - Natural, conversational phrasing
  - Based on actual search query intent

✓ Answer (required)
  - 150-300 word comprehensive response
  - Specific to ADMI and relevant courses
  - SEO-optimized language

✓ Search Query (required)
  - Original query that triggered FAQ
  - Used for duplicate detection

✓ Keywords (auto-generated)
  - 3-5 keywords per FAQ
  - Extracted from question/answer

✓ Course Link (optional)
  - Auto-linked if course identified
  - Enables course-specific FAQs

✓ Display Order (auto-set)
  - Set to 999 initially
  - Manually adjust order as needed
```

---

## Next Steps

### Immediate
- [ ] Run test: `npm run faq:analytics-to-contentful test`
- [ ] Review sample FAQs generated
- [ ] Check Contentful for FAQ content type

### Setup
- [ ] Add cron job: `crontab -e`
- [ ] Set up Slack webhook (optional)
- [ ] Configure course mappings if needed

### Monitoring
- [ ] Check first run logs
- [ ] Verify FAQs in Contentful
- [ ] Monitor for 1 week
- [ ] Adjust `maxFAQsPerRun` if needed

### Optimization
- [ ] Review generated FAQ quality
- [ ] Adjust minSearchVolume if too many low-quality FAQs
- [ ] Add more course mappings
- [ ] Monitor OpenAI costs

---

## Performance Notes

**API Costs**:
- OpenAI: ~$0.10-0.20 per FAQ (with GPT-4o)
- Contentful: Included in plan
- Google Analytics: Free/included

**Processing Time**:
- 5 FAQs: ~1-2 minutes
- 10 FAQs: ~2-4 minutes
- Cron job won't interfere with site performance

**Database Impact**:
- Creates ~5-10 entries per day
- No impact on read performance
- Archives old versions automatically

---

## Support & Debugging

### Enable Debug Mode

```bash
DEBUG=* npm run faq:analytics-to-contentful run
```

### Common Issues

**Issue**: "FAQ already exists"
- Normal - means duplicate query was skipped

**Issue**: "Contentful token not found"
- Add `CONTENTFUL_MANAGEMENT_TOKEN` to `.env`

**Issue**: "OpenAI generation failed"
- Check `NEXT_OPENAI_API_KEY` is valid
- Verify API key has GPT-4o access

**Issue**: "No FAQs created"
- Check `maxFAQsPerRun` > 0
- Verify Contentful content type exists
- Check logs for specific errors

---

## Architecture

```
CLI Entry Point
├─ Initialize Contentful
├─ Fetch Search Queries
├─ For Each Query:
│  ├─ Check Duplicates
│  ├─ Generate with OpenAI
│  ├─ Identify Course
│  └─ Create Entry
├─ Publish Entries
└─ Generate Report

Logging Layer
├─ Console Output
├─ File Logging
├─ Slack Notifications
└─ Error Tracking

Contentful Integration
├─ Management API
├─ Entry Creation
├─ Publishing
└─ Course Linking
```

---

## Files & Locations

```
Main Script:
  scripts/analytics/analytics-to-contentful-faq.js

Cron Wrappers:
  scripts/cron/daily-faq-contentful-automation.sh

Logs:
  logs/cron/faq-automation-YYYY-MM-DD_HH-MM-SS.log

Documentation:
  docs/FAQ-AUTOMATION-SETUP.md (full reference)
  
Configuration:
  .env (requires credentials)
  package.json (npm scripts)
```

---

## Commands Reference

```bash
# Test FAQ generation (shows sample output)
npm run faq:analytics-to-contentful test

# Dry-run (shows what would be processed)
npm run faq:analytics-to-contentful dry-run

# Full automation (creates FAQs in Contentful)
npm run faq:analytics-to-contentful run

# Combined with other FAQ optimization
npm run faq:api-optimize optimize-main
npm run faq:weekly-optimize
```

---

## Status Check

- [x] Analytics-to-Contentful script created
- [x] Contentful integration implemented
- [x] OpenAI FAQ generation working
- [x] Course auto-linking implemented
- [x] Duplicate detection active
- [x] Error handling robust
- [x] Logging comprehensive
- [x] Cron job script ready
- [x] Documentation complete
- [x] Tests passing

**Ready for deployment!** ✅

---

**Last Updated**: December 8, 2025
**Status**: Production-Ready
**Test Results**: ✅ All passing
