#!/usr/bin/env node

/**
 * AWS Lambda Handler for Brevo → Google Ads Sync
 */

const BrevoGoogleAdsSync = require('../../../scripts/analytics/sync-brevo-to-google-ads')
const GoogleAdsPerformanceMonitor = require('../../../scripts/analytics/google-ads-performance-monitor')

/**
 * Daily incremental sync handler
 */
exports.handler = async (event, context) => {
  console.log('Lambda invoked:', JSON.stringify(event))
  
  const sync = new BrevoGoogleAdsSync()
  
  try {
    const result = await sync.sync(false) // Incremental sync
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Sync completed successfully',
        syncedCount: result.syncedCount,
        totalSynced: result.totalSynced,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Sync failed:', error)
    
    // Send alert (implement SNS or Slack webhook)
    await sendAlert({
      type: 'SYNC_FAILED',
      error: error.message,
      timestamp: new Date().toISOString()
    })
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    }
  }
}

/**
 * Weekly full sync handler
 */
exports.handlerFullSync = async (event, context) => {
  console.log('Full sync Lambda invoked:', JSON.stringify(event))
  
  const sync = new BrevoGoogleAdsSync()
  
  try {
    const result = await sync.sync(true) // Full sync
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Full sync completed successfully',
        syncedCount: result.syncedCount,
        totalSynced: result.totalSynced,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Full sync failed:', error)
    
    await sendAlert({
      type: 'FULL_SYNC_FAILED',
      error: error.message,
      timestamp: new Date().toISOString()
    })
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    }
  }
}

/**
 * Performance monitor handler
 */
exports.monitorHandler = async (event, context) => {
  console.log('Performance monitor Lambda invoked:', JSON.stringify(event))
  
  const monitor = new GoogleAdsPerformanceMonitor()
  
  try {
    const report = await monitor.generateDailyReport(7)
    
    // Send report to Slack/email
    if (report.alerts.length > 0 || report.recommendations.length > 0) {
      await sendPerformanceAlert(report)
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Performance monitoring completed',
        alerts: report.alerts.length,
        recommendations: report.recommendations.length,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Performance monitoring failed:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    }
  }
}

/**
 * Send alert to Slack/SNS
 */
async function sendAlert(alert) {
  const slackWebhook = process.env.SLACK_WEBHOOK_URL
  
  if (!slackWebhook) {
    console.log('No Slack webhook configured, skipping alert')
    return
  }
  
  try {
    const axios = require('axios')
    await axios.post(slackWebhook, {
      text: `🚨 ADMI Google Ads Sync Alert`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Alert Type:* ${alert.type}\n*Error:* ${alert.error}\n*Time:* ${alert.timestamp}`
          }
        }
      ]
    })
  } catch (error) {
    console.error('Failed to send alert:', error)
  }
}

/**
 * Send performance report to Slack
 */
async function sendPerformanceAlert(report) {
  const slackWebhook = process.env.SLACK_WEBHOOK_URL
  
  if (!slackWebhook) {
    console.log('No Slack webhook configured, skipping performance alert')
    return
  }
  
  const criticalIssues = report.recommendations
    .flatMap(r => r.issues.filter(i => i.severity === 'CRITICAL'))
  
  const message = {
    text: '📊 ADMI Google Ads Daily Report',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📊 Google Ads Performance Report'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Total Spend:* ${report.totals.cost.toLocaleString()}\n*Conversions:* ${report.totals.conversions}\n*CPA:* ${report.totals.conversions > 0 ? (report.totals.cost / report.totals.conversions).toFixed(2) : 'N/A'}`
        }
      }
    ]
  }
  
  if (criticalIssues.length > 0) {
    message.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🔴 Critical Issues:*\n${criticalIssues.map(i => `• ${i.metric}: ${i.recommendation}`).join('\n')}`
      }
    })
  }
  
  if (report.alerts.length > 0) {
    message.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*⚠️ Alerts:*\n${report.alerts.map(a => `• ${a.campaign}: ${a.message}`).join('\n')}`
      }
    })
  }
  
  try {
    const axios = require('axios')
    await axios.post(slackWebhook, message)
  } catch (error) {
    console.error('Failed to send performance alert:', error)
  }
}
