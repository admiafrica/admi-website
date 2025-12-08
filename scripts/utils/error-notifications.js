#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Error Notification System for ADMI Automation
 *
 * Sends email alerts to system admin when automation fails
 * Uses Brevo (formerly Sendinblue) for transactional emails
 */

const axios = require('axios')
require('dotenv').config()

const CONFIG = {
  brevoApiKey: process.env.BREVO_API_KEY,
  adminEmail: process.env.ADMIN_EMAIL || process.env.ANALYTICS_REPORT_EMAILS || 'wilfred@admi.africa',
  fromEmail: process.env.REPORT_FROM_EMAIL || 'alerts@admi.africa',
  fromName: 'ADMI Automation System'
}

/**
 * Send error notification via email
 * @param {Object} options - Notification options
 * @param {string} options.subject - Email subject
 * @param {string} options.automationType - Type of automation (e.g., 'FAQ Generation', 'Blog Generation')
 * @param {string} options.error - Error message
 * @param {Object} options.context - Additional context (e.g., query, topic, timestamp)
 * @param {string} options.severity - Error severity: 'critical', 'high', 'medium', 'low'
 */
async function sendErrorNotification({ subject, automationType, error, context = {}, severity = 'high' }) {
  if (!CONFIG.brevoApiKey) {
    console.error('⚠️  BREVO_API_KEY not configured - cannot send error notification')
    return false
  }

  try {
    const timestamp = new Date().toISOString()
    const severityEmoji = {
      critical: '🚨',
      high: '⚠️',
      medium: '⚡',
      low: 'ℹ️'
    }

    // Build HTML email content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc3545; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .severity-critical { background: #dc3545; }
    .severity-high { background: #fd7e14; }
    .severity-medium { background: #ffc107; }
    .severity-low { background: #17a2b8; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 5px 5px; }
    .error-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #dc3545; }
    .context-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #17a2b8; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d; }
    code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
    pre { background: #e9ecef; padding: 10px; border-radius: 3px; overflow-x: auto; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header severity-${severity}">
      <h2>${severityEmoji[severity]} Automation Error Alert</h2>
      <p><strong>${automationType}</strong> failed at ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} EAT</p>
    </div>
    
    <div class="content">
      <div class="error-box">
        <h3>Error Details</h3>
        <p><strong>Type:</strong> ${automationType}</p>
        <p><strong>Severity:</strong> <code>${severity.toUpperCase()}</code></p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Error Message:</strong></p>
        <pre>${error}</pre>
      </div>

      ${
        Object.keys(context).length > 0
          ? `
      <div class="context-box">
        <h3>Additional Context</h3>
        ${Object.entries(context)
          .map(
            ([key, value]) => `
          <p><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</p>
        `
          )
          .join('')}
      </div>
      `
          : ''
      }

      <div class="footer">
        <p><strong>Recommended Actions:</strong></p>
        <ul>
          <li>Check log files in <code>logs/${automationType.toLowerCase().replace(/\s+/g, '-')}/</code></li>
          <li>Verify API credentials and rate limits</li>
          <li>Review recent code changes if this is a new issue</li>
          <li>Check external service status (Contentful, OpenAI, Perplexity, Google Analytics)</li>
        </ul>
        
        <p style="margin-top: 20px;">
          <em>This is an automated alert from ADMI Website Automation System</em><br>
          Server: ${process.env.APP_URL || 'Local Development'}<br>
          Environment: ${process.env.NODE_ENV || 'development'}
        </p>
      </div>
    </div>
  </div>
</body>
</html>
    `

    // Send via Brevo
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: CONFIG.fromName,
          email: CONFIG.fromEmail
        },
        to: [
          {
            email: CONFIG.adminEmail,
            name: 'System Administrator'
          }
        ],
        subject: `${severityEmoji[severity]} ${subject}`,
        htmlContent: htmlContent
      },
      {
        headers: {
          'api-key': CONFIG.brevoApiKey,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(`✅ Error notification sent to ${CONFIG.adminEmail}`)
    return true
  } catch (err) {
    console.error('❌ Failed to send error notification:', err.message)
    if (err.response) {
      console.error('Response:', err.response.data)
    }
    return false
  }
}

/**
 * Send success notification for automation runs
 */
async function sendSuccessNotification({ subject, automationType, summary, context = {} }) {
  if (!CONFIG.brevoApiKey) {
    return false
  }

  try {
    const timestamp = new Date().toISOString()

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #28a745; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 5px 5px; }
    .success-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #28a745; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>✅ Automation Success Report</h2>
      <p><strong>${automationType}</strong> completed at ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} EAT</p>
    </div>
    
    <div class="content">
      <div class="success-box">
        <h3>Summary</h3>
        <p>${summary}</p>
        ${
          Object.keys(context).length > 0
            ? `
          <h4>Details</h4>
          ${Object.entries(context)
            .map(
              ([key, value]) => `
            <p><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</p>
          `
            )
            .join('')}
        `
            : ''
        }
      </div>
      
      <div class="footer">
        <p><em>This is an automated report from ADMI Website Automation System</em></p>
      </div>
    </div>
  </div>
</body>
</html>
    `

    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: CONFIG.fromName,
          email: CONFIG.fromEmail
        },
        to: [{ email: CONFIG.adminEmail }],
        subject: `✅ ${subject}`,
        htmlContent: htmlContent
      },
      {
        headers: {
          'api-key': CONFIG.brevoApiKey,
          'Content-Type': 'application/json'
        }
      }
    )

    return true
  } catch (err) {
    console.error('Failed to send success notification:', err.message)
    return false
  }
}

module.exports = {
  sendErrorNotification,
  sendSuccessNotification
}
