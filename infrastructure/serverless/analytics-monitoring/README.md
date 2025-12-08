# Analytics Monitoring - Weekly Organic Traffic Reports

Automated weekly GA4 reporting system that sends organic traffic analysis every Monday at 9 AM UTC.

## Files in This Directory

- **`weekly-organic-monitor.js`** - Local monitoring script (runs anywhere via npm)
- **`organic-traffic-report.js`** - Daily traffic check utility
- **`handler.js`** - AWS Lambda serverless function
- **`deploy.sh`** - Automated AWS deployment script
- **`eventbridge-config.json`** - EventBridge schedule configuration

## Quick Start (Local)

```bash
# From project root
npm run analytics:weekly-report

# Output saved to: logs/organic-traffic-reports/organic-traffic-YYYY-MM-DD.json
```

## AWS Deployment (One-Time Setup)

```bash
# From project root
./infrastructure/serverless/analytics-monitoring/deploy.sh staging
# or
./infrastructure/serverless/analytics-monitoring/deploy.sh production
```

This automatically:
- ✅ Creates IAM role with Lambda + SES permissions
- ✅ Deploys Lambda function with GA4 credentials
- ✅ Creates EventBridge rule for weekly schedule
- ✅ Configures permissions for automated invocation
- ✅ Verifies SES email configuration

## What Gets Reported

Each week's automated report includes:

### Metrics
- Sessions (unique visits)
- Users (unique visitors)
- Pageviews (total pages viewed)
- Average sessions per day

### Comparisons
- **Week-over-Week**: Current vs previous 7 days
- **Month-over-Month**: Current week vs 4 weeks ago

### Analysis
- Trend detection (UP/DOWN/STABLE)
- Growth insights (strong/moderate/declining)
- Monthly trend analysis
- Actionable recommendations

## Email Format

Reports are sent as HTML email with:
- Professional styling
- Color-coded metrics (green=good, red=declining)
- Direct link to Google Analytics
- Mobile-responsive design

## Troubleshooting

**Lambda function won't run?**
```bash
# Check CloudWatch logs
aws logs tail /aws/lambda/admi-analytics-weekly-report-staging --follow
```

**Test Lambda manually**
```bash
aws lambda invoke \
  --function-name admi-analytics-weekly-report-staging \
  /tmp/out.json \
  --region us-east-1

cat /tmp/out.json
```

**View EventBridge rule status**
```bash
aws events describe-rule --name admi-weekly-organic-traffic-report-staging
```

**SES email verification**
```bash
# If not in production access, verify email
aws ses verify-email-identity --email-address noreply@admi.africa --region us-east-1
```

## Manual Report Generation

Generate reports on-demand any time:

```bash
npm run analytics:weekly-report

# Save to specific location
npm run analytics:weekly-report > reports/traffic-report-manual.txt
```

## GA4 Integration

Uses Google Analytics 4 API:
- **Property ID**: 250948607 (ADMI Website)
- **Service Account**: `ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com`
- **Credentials**: `ga-service-account.json` (in project root)

## Environment Variables

### Local
- None required (reads `ga-service-account.json` automatically)

### Lambda
- `ANALYTICS_REPORT_EMAILS` - Comma-separated recipient addresses
- `REPORT_FROM_EMAIL` - Sender email address
- `GA_SERVICE_ACCOUNT_JSON` - Base64-encoded service account JSON

## Schedule

- **Frequency**: Weekly
- **Day**: Monday
- **Time**: 9 AM UTC
- **Cron Expression**: `cron(0 9 ? * MON *)`

To change schedule, update `handler.js` or edit EventBridge rule:
```bash
aws events put-rule \
  --name admi-weekly-organic-traffic-report-staging \
  --schedule-expression "cron(0 8 ? * MON *)"  # 8 AM UTC instead
```

## Historical Data

All weekly reports automatically saved to:
```
logs/organic-traffic-reports/
├── organic-traffic-2025-12-08.json
├── organic-traffic-2025-12-15.json
└── organic-traffic-2025-12-22.json
```

## Monitoring Success

After deployment, track these KPIs:

1. **Report Delivery**: Check email inbox every Monday ~9 AM UTC
2. **Lambda Execution**: Check CloudWatch logs for success
3. **Organic Traffic Trend**: Monitor week-over-week % changes
4. **Email Delivery**: Check SES bounce/complaint metrics

## Integration with Existing Systems

This complements:
- **FAQ Generation Cron**: Mon-Fri 2 AM (generates FAQ content)
- **Blog Generation Cron**: Sunday 1 AM (creates blog posts)
- **Video Cache Refresh**: Daily 1 AM (refreshes YouTube cache)
- **Organic Traffic Reports** (NEW): Monday 9 AM (sends GA4 analysis)

All logs stored in Amplify for historical tracking and audit trail.

## Support

For issues or questions:
1. Check CloudWatch logs: `/aws/lambda/admi-analytics-weekly-report-staging`
2. Test locally: `npm run analytics:weekly-report`
3. Review SES configuration for email delivery issues
4. Verify GA4 service account has API access
