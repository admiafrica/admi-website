# Weekly Organic Traffic Monitoring Setup

## Overview

Created a complete weekly organic traffic monitoring system that automatically fetches GA4 data, generates reports, and sends email notifications every Monday at 9 AM UTC.

## Components

### 1. Local Monitoring Script

**File**: `scripts/analytics/weekly-organic-monitor.js`

Fetches organic traffic data from GA4 and generates HTML + plaintext reports with:

- Current week metrics (sessions, users, pageviews)
- Previous week comparison
- 4-week trend analysis
- Week-over-week and month-over-month percentage changes
- Automated insights and action items

**Usage**:

```bash
npm run analytics:weekly-report
```

**Output**:

- Saved to: `logs/organic-traffic-reports/organic-traffic-YYYY-MM-DD.json`
- Console output with formatted report

### 2. AWS Lambda Handler

**File**: `infrastructure/serverless/analytics-monitoring/handler.js`

Serverless function that:

- Fetches GA4 data via BetaAnalyticsDataClient
- Generates HTML email-ready reports
- Sends via AWS SES (Simple Email Service)
- Includes error handling and CloudWatch logging
- Supports DLQ (Dead Letter Queue) for failed reports

**Environment Variables**:

```env
ANALYTICS_REPORT_EMAILS=wilfred@admi.africa,team@admi.africa
REPORT_FROM_EMAIL=analytics@admi.africa
GA_SERVICE_ACCOUNT_JSON=<base64 encoded service account JSON>
```

### 3. EventBridge Schedule Configuration

**File**: `infrastructure/serverless/analytics-monitoring/eventbridge-config.json`

AWS EventBridge rule that triggers Lambda:

- **Schedule**: Every Monday at 9 AM UTC
- **Cron Expression**: `cron(0 9 ? * MON *)`
- **Retry Policy**: Up to 2 retries, max 1 hour age
- **DLQ Support**: Failed invocations sent to SQS queue

## Setup Instructions

### Step 1: Local Testing

```bash
# Ensure ga-service-account.json exists in project root
# Test the monitoring script locally
npm run analytics:weekly-report

# View the generated report
cat logs/organic-traffic-reports/organic-traffic-$(date +%Y-%m-%d).json
```

### Step 2: Deploy Lambda Function

```bash
# Package the Lambda function
cd infrastructure/serverless/analytics-monitoring
zip -r handler.zip handler.js node_modules/

# Deploy using AWS CLI
aws lambda create-function \
  --function-name admi-analytics-weekly-report \
  --runtime nodejs18.x \
  --role arn:aws:iam::ACCOUNT_ID:role/service-role/admi-analytics-lambda-role \
  --handler handler.handler \
  --zip-file fileb://handler.zip \
  --timeout 60 \
  --memory-size 256 \
  --environment "Variables={
    ANALYTICS_REPORT_EMAILS=wilfred@admi.africa,
    REPORT_FROM_EMAIL=noreply@admi.africa,
    GA_SERVICE_ACCOUNT_JSON=$(cat ../../ga-service-account.json | base64)
  }"
```

### Step 3: Create IAM Role

```bash
# Create the Lambda execution role with permissions for GA4, SES, and CloudWatch
aws iam create-role \
  --role-name admi-analytics-lambda-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "lambda.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# Attach policies
aws iam attach-role-policy \
  --role-name admi-analytics-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

aws iam put-role-policy \
  --role-name admi-analytics-lambda-role \
  --policy-name admi-analytics-policy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": ["ses:SendEmail", "ses:SendRawEmail"],
        "Resource": "*"
      }
    ]
  }'
```

### Step 4: Create EventBridge Rule

```bash
# Create the EventBridge rule (Monday 9 AM UTC)
aws events put-rule \
  --name admi-weekly-organic-traffic-report \
  --schedule-expression "cron(0 9 ? * MON *)" \
  --state ENABLED

# Add Lambda as target
aws events put-targets \
  --rule admi-weekly-organic-traffic-report \
  --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:ACCOUNT_ID:function:admi-analytics-weekly-report"

# Grant EventBridge permission to invoke Lambda
aws lambda add-permission \
  --function-name admi-analytics-weekly-report \
  --statement-id AllowEventBridgeInvoke \
  --action lambda:InvokeFunction \
  --principal events.amazonaws.com \
  --source-arn arn:aws:events:us-east-1:ACCOUNT_ID:rule/admi-weekly-organic-traffic-report
```

### Step 5: Verify SES Email Permissions

```bash
# If not in SES Production Access, verify recipient email addresses
aws ses verify-email-identity --email-address wilfred@admi.africa
aws ses verify-email-identity --email-address team@admi.africa

# Check current sending limits
aws ses get-account-sending-enabled
```

## Metrics Tracked

### Current Week Metrics

- **Sessions**: Total unique sessions
- **Users**: Unique visitors
- **Pageviews**: Total pages viewed
- **Avg Sessions/Day**: Daily average

### Comparisons

- **Week-over-Week Change**: Current week vs previous week
- **Month-over-Month Change**: Current week vs same week 4 weeks ago
- **Trend**: UP/DOWN/STABLE

### Insights Generated

- Strong growth detection (>10% increase)
- Decline warning (<-10% decrease)
- Monthly trend analysis
- Actionable recommendations

## Reports Structure

### Plaintext Report

```
ORGANIC TRAFFIC WEEKLY REPORT
Generated: [timestamp]

CURRENT WEEK METRICS (Last 7 Days)
Sessions:         X,XXX
Users:            X,XXX
Pageviews:        X,XXX
Avg Sessions/Day: XXX

TREND ANALYSIS
📈 UP Week-over-Week Change: +XX.X%
📈 UP Month-over-Month Change: +XX.X%
```

### HTML Email Report

Professional formatted email with:

- Styled metrics display
- Color-coded trends (green for UP, red for DOWN)
- Responsive design for mobile/desktop
- Direct link to Google Analytics dashboard

## Troubleshooting

### Lambda Timeout

If reports take >60s to generate, increase Lambda timeout:

```bash
aws lambda update-function-configuration \
  --function-name admi-analytics-weekly-report \
  --timeout 120
```

### GA4 API Authentication Issues

- Verify `ga-service-account.json` is valid
- Check service account has GA4 API access
- Ensure property ID is correct: `250948607`

### SES Email Delivery Issues

- Verify sender email address is SES-verified
- Check recipient email addresses are whitelisted in SES Sandbox mode
- Review SES bounce/complaint logs in CloudWatch

### Manual Report Generation

```bash
# Generate report manually any time
npm run analytics:weekly-report

# Save to file
npm run analytics:weekly-report > reports/weekly-traffic-$(date +%Y-%m-%d).txt
```

## Monitoring

### View Lambda Logs

```bash
aws logs tail /aws/lambda/admi-analytics-weekly-report --follow
```

### Check EventBridge Rule Status

```bash
aws events describe-rule --name admi-weekly-organic-traffic-report
aws events list-targets-by-rule --rule admi-weekly-organic-traffic-report
```

### View Sent Emails in SES

```bash
aws ses list-verified-email-addresses
```

## Integration with Existing Crons

This complements existing ADMI cron jobs:

- **FAQ Generation**: Runs daily at 2 AM Mon-Fri
- **Blog Generation**: Runs weekly at 1 AM Sunday
- **Video Cache Refresh**: Runs daily at 1 AM UTC
- **Organic Traffic Report** (NEW): Runs weekly at 9 AM UTC Monday

All results can be stored in Amplify Logs for historical tracking.

## NPM Commands

```bash
# Run weekly report locally
npm run analytics:weekly-report

# Run daily traffic check
npm run analytics:daily-check

# Deploy Lambda function (when ready)
npm run deploy-analytics-monitor  # (add this script when Lambda is setup)
```

## Sample Output

```
======================================================================
📊 WEEKLY ORGANIC TRAFFIC MONITOR
======================================================================

Last 7 days (Dec 2-8):        4,381 sessions (626/day)
Previous 7 days (Nov 25-Dec 1): 1,582 sessions (226/day)

======================================================================

📈 UP Week-over-Week Change: +176.9%

✅ POSITIVE: Organic traffic is IMPROVING!
   The FAQ automation (Dec 8) and schema fixes (Nov 27) may be helping.

======================================================================
```

## Next Steps

1. ✅ Created monitoring script with GA4 API integration
2. ✅ Added npm commands for local testing
3. ✅ Created Lambda handler for AWS deployment
4. ⏳ Deploy Lambda to AWS (requires AWS CLI access)
5. ⏳ Create EventBridge schedule rule
6. ⏳ Configure SES for email delivery
7. ⏳ Test end-to-end report delivery
8. ⏳ Monitor weekly reports for 4 weeks to validate improvements

## Success Criteria

- ✅ Weekly reports generated automatically every Monday at 9 AM UTC
- ✅ Email delivered to team within 2 minutes
- ✅ Reports show accurate organic traffic trends
- ✅ Insights highlight positive/negative changes
- ✅ Historical reports stored in `logs/organic-traffic-reports/`
