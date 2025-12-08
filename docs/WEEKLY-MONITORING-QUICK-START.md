# Weekly Organic Traffic Monitor - Quick Reference

## What We Built

A complete automated weekly monitoring system that:

- ✅ Fetches GA4 data every Monday at 9 AM UTC
- ✅ Compares current week vs previous week traffic
- ✅ Sends HTML email reports to your team
- ✅ Stores JSON reports for historical tracking
- ✅ Provides automatic insights and recommendations

## Key Metrics Tracked

```
Sessions:           Total unique website visits
Users:              Unique visitors
Pageviews:          Total pages viewed
Avg Sessions/Day:   Daily average (Sessions ÷ 7)

Week-over-Week:     Current week % vs previous week
Month-over-Month:   Current week % vs 4 weeks ago
Trend:              UP / DOWN / STABLE
```

## One-Click Deployment (AWS)

```bash
# From project root - deploys Lambda + EventBridge automatically
./infrastructure/serverless/analytics-monitoring/deploy.sh staging
```

This does everything:

- ✅ Creates AWS IAM role with permissions
- ✅ Deploys Lambda function with GA4 credentials
- ✅ Sets up EventBridge schedule (Monday 9 AM UTC)
- ✅ Configures SES for email sending
- ✅ Grants all necessary permissions

## Local Testing

```bash
# Generate report immediately (no wait for Monday)
npm run analytics:weekly-report

# Check daily traffic any time
npm run analytics:daily-check

# View saved reports
ls -la logs/organic-traffic-reports/
```

## Email Reports Include

**Current Metrics**

- Sessions this week
- Users this week
- Pageviews this week

**Comparison**

- Week-over-week % change
- Month-over-month % change

**Analysis**

- Trend detection (📈 UP, 📉 DOWN, ➡️ STABLE)
- Growth insights
- Action recommendations

## Schedule

| Day        | Time     | Action                                         |
| ---------- | -------- | ---------------------------------------------- |
| Monday     | 9 AM UTC | Organic Traffic Report sent via email          |
| Other days | Anytime  | Run locally: `npm run analytics:weekly-report` |

## Files Created

### Local Scripts

- `scripts/analytics/weekly-organic-monitor.js` - Main monitoring script
- `scripts/analytics/organic-traffic-report.js` - Daily check utility

### AWS Lambda

- `infrastructure/serverless/analytics-monitoring/handler.js` - Lambda function
- `infrastructure/serverless/analytics-monitoring/deploy.sh` - Deployment script
- `infrastructure/serverless/analytics-monitoring/eventbridge-config.json` - Cron config

### Documentation

- `docs/WEEKLY-ANALYTICS-MONITORING-SETUP.md` - Complete setup guide
- `infrastructure/serverless/analytics-monitoring/README.md` - Technical reference

## What Happens Automatically (After Deployment)

**Every Monday at 9 AM UTC:**

1. EventBridge triggers Lambda function
2. Lambda queries GA4 API for last 7 days + previous 7 days
3. Calculates week-over-week % changes
4. Generates insights and recommendations
5. Creates beautiful HTML email
6. Sends via SES to your team
7. Saves JSON report to CloudWatch Logs

## Customization

**Change Schedule**

```bash
# Deploy for different time (e.g., 8 AM UTC instead of 9 AM)
aws events put-rule \
  --name admi-weekly-organic-traffic-report-staging \
  --schedule-expression "cron(0 8 ? * MON *)"
```

**Change Email Recipients**

```bash
# Update Lambda environment variable
aws lambda update-function-configuration \
  --function-name admi-analytics-weekly-report-staging \
  --environment "Variables={ANALYTICS_REPORT_EMAILS=wilfred@admi.africa,team@admi.africa}"
```

**Add More Metrics**
Edit `scripts/analytics/weekly-organic-monitor.js` to add:

- Bounce rate
- Session duration
- Conversion rate
- Mobile vs desktop breakdown

## Troubleshooting

**Can't generate report locally?**

```bash
# Check GA service account file exists
ls -la ga-service-account.json

# Check it's valid JSON
jq . ga-service-account.json
```

**Email not arriving?**

```bash
# Check Lambda logs
aws logs tail /aws/lambda/admi-analytics-weekly-report-staging --follow

# Verify SES sender email is verified
aws ses list-verified-email-addresses
```

**EventBridge rule not triggering?**

```bash
# Check rule is enabled and configured
aws events describe-rule --name admi-weekly-organic-traffic-report-staging
aws events list-targets-by-rule --rule admi-weekly-organic-traffic-report-staging
```

## NPM Commands

```bash
# Run weekly report now
npm run analytics:weekly-report

# Check daily traffic now
npm run analytics:daily-check

# Deploy to AWS
./infrastructure/serverless/analytics-monitoring/deploy.sh staging
```

## Success Indicators

After deployment, you'll see:

- ✅ Email arrives in inbox every Monday ~9 AM UTC
- ✅ Report shows current organic traffic metrics
- ✅ Week-over-week comparison visible
- ✅ Historical reports saved in logs directory
- ✅ Insights match your SEO improvements

## Integration with Other Crons

Works alongside:

- **FAQ Generation** (Mon-Fri 2 AM) - Creates FAQ content
- **Blog Generation** (Sunday 1 AM) - Creates blog posts
- **Video Cache** (Daily 1 AM) - Refreshes YouTube videos
- **Organic Reports** (Monday 9 AM) - Sends analytics 📊

All results tracked for ROI calculation.

## Example Report Output

```
======================================================================
📊 WEEKLY ORGANIC TRAFFIC MONITOR
======================================================================

CURRENT WEEK METRICS (Last 7 Days)
Sessions:           4,381
Users:              3,201
Pageviews:          12,540
Avg Sessions/Day:   626

PREVIOUS WEEK (7-14 days ago)
Sessions:           1,582
Users:              1,101
Pageviews:          4,230
Avg Sessions/Day:   226

TREND ANALYSIS
📈 UP Week-over-Week Change: +176.9%
📈 UP Month-over-Month Change: +187.3%

INSIGHTS
✅ Strong growth this week - organic traffic is performing well!
✅ Monthly trend is positive (+187.3% vs 4 weeks ago).

ACTION ITEMS
• Monitor content performance in Google Search Console
• Review top landing pages and conversion rates
• Check for any Google algorithm updates
• Validate FAQ automation effectiveness
• Review paid traffic correlation
```

## Next Steps

1. **Deploy** - Run `./infrastructure/serverless/analytics-monitoring/deploy.sh staging`
2. **Test** - Wait for Monday 9 AM or run `npm run analytics:weekly-report` now
3. **Verify** - Check email inbox + CloudWatch logs
4. **Monitor** - Track reports weekly for 4 weeks
5. **Optimize** - Adjust based on traffic trends

## Support

For questions or issues:

- Check: `docs/WEEKLY-ANALYTICS-MONITORING-SETUP.md` for detailed setup
- View: `infrastructure/serverless/analytics-monitoring/README.md` for technical details
- Test: `npm run analytics:weekly-report` for immediate results
- Monitor: CloudWatch logs for Lambda execution details

---

**Status**: ✅ Complete and ready for deployment
**Date Created**: December 8, 2025
**Last Updated**: December 8, 2025
**Environment**: Production-ready
