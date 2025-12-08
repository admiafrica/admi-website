# Error Notification System

## Overview

Automated email alerts are sent to system administrators when automation tasks fail. This ensures quick response to issues and maintains system reliability.

## Setup

### Required Environment Variables

```bash
# Brevo API (for sending emails)
BREVO_API_KEY=your_brevo_api_key

# Admin email (receives alerts)
ADMIN_EMAIL=admin@admi.africa
# Or fallback to analytics emails
ANALYTICS_REPORT_EMAILS=wilfred@admi.africa

# From email (sender)
REPORT_FROM_EMAIL=alerts@admi.africa
```

### Brevo Configuration

1. Create a Brevo account at https://brevo.com
2. Get your API key from Settings → API Keys
3. Add `BREVO_API_KEY` to your environment variables

## Features

### Error Notifications

Automatically sent when:

- **FAQ Generation** fails (local or Lambda)
- **Blog Generation** fails (local or Lambda)
- **Weekly FAQ Optimization** fails
- **Daily FAQ Generation** fails

### Notification Content

Each error notification includes:

- **Subject**: Clear description of failure
- **Automation Type**: FAQ Generation, Blog Generation, etc.
- **Severity Level**: Critical, High, Medium, Low
- **Error Message**: Full error details
- **Context**: Additional debugging information
  - Timestamp
  - Lambda function name (if applicable)
  - Event data
  - Stack trace
- **Recommended Actions**: Troubleshooting steps

### Severity Levels

| Severity    | Description                      | Example                              |
| ----------- | -------------------------------- | ------------------------------------ |
| 🚨 Critical | Complete system failure          | All blog articles failed to generate |
| ⚠️ High     | Significant functionality broken | FAQ generation crashed               |
| ⚡ Medium   | Partial failure                  | 2 out of 5 blog articles failed      |
| ℹ️ Low      | Minor issue or warning           | Rate limit approaching               |

## Usage

### In Scripts

```javascript
const { sendErrorNotification } = require('./scripts/utils/error-notifications')

try {
  // Your automation code
} catch (error) {
  await sendErrorNotification({
    subject: 'FAQ Generation Failed',
    automationType: 'FAQ Generation',
    error: error.message,
    context: {
      query: 'music production courses',
      timestamp: new Date().toISOString()
    },
    severity: 'high'
  })
}
```

### In Lambda Functions

Error notifications are automatically integrated in:

- `handlers/faqGeneration.js`
- `handlers/blogGeneration.js`

No additional code required - failures are caught and reported automatically.

## Email Template

### Error Alert Email

```
Subject: ⚠️ FAQ Generation Automation Failed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 Automation Error Alert
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FAQ Generation failed at 08 Dec 2025, 15:30 EAT

ERROR DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: FAQ Generation
Severity: HIGH
Timestamp: 2025-12-08T12:30:00.000Z
Error Message:
  Failed to connect to Contentful API

CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
lambdaFunction: dailyFaqGeneration
query: music production fees nairobi

RECOMMENDED ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Check log files in logs/faq-automation/
✓ Verify API credentials and rate limits
✓ Review recent code changes
✓ Check external service status
```

## Testing

### Test Error Notification

```bash
# Test the notification system
node -e "
const { sendErrorNotification } = require('./scripts/utils/error-notifications');
sendErrorNotification({
  subject: 'Test Notification',
  automationType: 'Test System',
  error: 'This is a test error',
  context: { test: true },
  severity: 'low'
}).then(() => console.log('✅ Test notification sent'))
"
```

### Verify Configuration

```bash
# Check environment variables
echo "BREVO_API_KEY: ${BREVO_API_KEY:0:10}..."
echo "ADMIN_EMAIL: $ADMIN_EMAIL"
```

## Monitoring

### Check Recent Notifications

Notifications are logged to console when sent:

```bash
✅ Error notification sent to admin@admi.africa
```

### Failed Notifications

If notification sending fails:

```bash
❌ Failed to send error notification: Invalid API key
```

This means the underlying automation error occurred AND the notification failed. Check:

1. Brevo API key is valid
2. Admin email is configured
3. Network connectivity

## Integration Points

### Current Integrations

1. **FAQ Generation Script**

   - File: `scripts/analytics/analytics-to-contentful-faq.js`
   - Triggers: Fatal errors in main execution

2. **Blog Scheduler**

   - File: `scripts/blog-generation/blog-scheduler.js`
   - Triggers: Batch generation failures, partial failures

3. **Lambda FAQ Handler**

   - File: `infrastructure/serverless/blog-generation/handlers/faqGeneration.js`
   - Triggers: Weekly optimization failures, daily generation failures

4. **Lambda Blog Handler**
   - File: `infrastructure/serverless/blog-generation/handlers/blogGeneration.js`
   - Triggers: Daily/weekly blog generation failures

### Future Integration Candidates

- Video cache refresh failures
- Analytics data fetch failures
- Contentful sync errors
- Google Ads API errors

## Troubleshooting

### Notifications Not Received

1. **Check Brevo API Key**

   ```bash
   curl -H "api-key: $BREVO_API_KEY" https://api.brevo.com/v3/account
   ```

2. **Check Email Spam Folder**

3. **Verify Admin Email**

   ```bash
   echo $ADMIN_EMAIL
   ```

4. **Check Brevo Dashboard**
   - Login to Brevo
   - Go to Transactional → Emails
   - Check delivery status

### Email Not Sending

- **Error 401**: Invalid API key
- **Error 400**: Invalid email format
- **No error logged**: BREVO_API_KEY not set

## Best Practices

1. **Set Appropriate Severity**

   - Critical: System completely down
   - High: Major functionality broken
   - Medium: Partial failures
   - Low: Warnings or minor issues

2. **Include Context**

   - Always include timestamp
   - Add relevant identifiers (query, topic, etc.)
   - Include error stack traces

3. **Don't Spam**

   - Only send on actual failures
   - Aggregate similar errors
   - Use severity to prioritize

4. **Monitor Regularly**
   - Check email inbox daily
   - Set up email filters for different severities
   - Review logs even when notifications work

## Security

- API keys stored in environment variables (not in code)
- Emails sent via HTTPS
- No sensitive data in email subjects
- Stack traces only in email body
- Production environment clearly identified

## Cost

Brevo Free Tier:

- 300 emails/day
- Sufficient for error notifications
- Upgrade if needed for success notifications

Current usage estimate: 1-5 emails/day (errors only)
