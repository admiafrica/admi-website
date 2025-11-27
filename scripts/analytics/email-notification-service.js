#!/usr/bin/env node

/**
 * Email Notification Service using Brevo (SendinBlue)
 * Sends Google Ads performance reports via email
 */

const axios = require('axios')
require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_BASE_URL = 'https://api.brevo.com/v3'

class EmailNotificationService {
  constructor() {
    this.apiKey = BREVO_API_KEY
    this.fromEmail = process.env.BREVO_FROM_EMAIL || 'noreply@admi.africa'
    this.fromName = process.env.BREVO_FROM_NAME || 'ADMI Google Ads Monitor'
  }

  /**
   * Send performance report email
   */
  async sendPerformanceReport(report, recipients = ['wilfred@admi.africa']) {
    console.log(`\n📧 Sending performance report to ${recipients.join(', ')}`)

    try {
      const htmlContent = this.generatePerformanceReportHTML(report)
      const textContent = this.generatePerformanceReportText(report)

      const emailData = {
        sender: {
          email: this.fromEmail,
          name: this.fromName
        },
        to: recipients.map(email => ({ email })),
        subject: `📊 ADMI Google Ads Daily Report - ${new Date().toLocaleDateString()}`,
        htmlContent,
        textContent
      }

      const response = await axios.post(`${BREVO_BASE_URL}/smtp/email`, emailData, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      })

      console.log(`✅ Email sent successfully (Message ID: ${response.data.messageId})`)
      return response.data
    } catch (error) {
      console.error('❌ Failed to send email:', error.message)
      if (error.response) {
        console.error('   Response:', error.response.data)
      }
      throw error
    }
  }

  /**
   * Send sync status email
   */
  async sendSyncNotification(syncResult, recipients = ['wilfred@admi.africa']) {
    console.log(`\n📧 Sending sync notification to ${recipients.join(', ')}`)

    const status = syncResult.success ? '✅ Success' : '❌ Failed'
    const subject = `${status} - Brevo → Google Ads Sync - ${new Date().toLocaleDateString()}`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${syncResult.success ? '#4CAF50' : '#f44336'}; color: white; padding: 20px; border-radius: 5px; }
          .content { background: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 5px; }
          .stat { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #2196F3; }
          .footer { margin-top: 20px; padding: 20px; font-size: 12px; color: #666; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${status} Brevo → Google Ads Customer Match Sync</h1>
            <p>${new Date().toLocaleString()}</p>
          </div>
          
          <div class="content">
            ${syncResult.success ? `
              <h2>✅ Sync Completed Successfully</h2>
              <div class="stat">
                <strong>Customers Synced:</strong> ${syncResult.syncedCount.toLocaleString()}
              </div>
              <div class="stat">
                <strong>Total Synced (Lifetime):</strong> ${syncResult.totalSynced.toLocaleString()}
              </div>
              <div class="stat">
                <strong>Next Sync:</strong> Tomorrow at 2 AM UTC (5 AM EAT)
              </div>
              <p style="margin-top: 20px; padding: 15px; background: #E3F2FD; border-radius: 5px;">
                ⏳ <strong>Note:</strong> Google Ads will process these customers within 24-48 hours. 
                Check Audience Manager for match rate after processing completes.
              </p>
            ` : `
              <h2>❌ Sync Failed</h2>
              <div class="stat" style="border-left-color: #f44336;">
                <strong>Error:</strong> ${syncResult.error || 'Unknown error'}
              </div>
              <p style="margin-top: 20px; padding: 15px; background: #FFEBEE; border-radius: 5px;">
                🔧 <strong>Action Required:</strong> Please check CloudWatch logs or contact technical support.
              </p>
            `}
          </div>
          
          <div class="footer">
            <p>This is an automated notification from ADMI Google Ads Sync System.</p>
            <p>To modify notification settings, update your .env configuration.</p>
          </div>
        </div>
      </body>
      </html>
    `

    const textContent = `
${status} - Brevo → Google Ads Sync
${new Date().toLocaleString()}

${syncResult.success ? `
Sync Completed Successfully

Customers Synced: ${syncResult.syncedCount.toLocaleString()}
Total Synced (Lifetime): ${syncResult.totalSynced.toLocaleString()}
Next Sync: Tomorrow at 2 AM UTC (5 AM EAT)

Note: Google Ads will process these customers within 24-48 hours.
Check Audience Manager for match rate after processing completes.
` : `
Sync Failed

Error: ${syncResult.error || 'Unknown error'}

Action Required: Please check CloudWatch logs or contact technical support.
`}

---
This is an automated notification from ADMI Google Ads Sync System.
    `

    try {
      const emailData = {
        sender: {
          email: this.fromEmail,
          name: this.fromName
        },
        to: recipients.map(email => ({ email })),
        subject,
        htmlContent,
        textContent
      }

      const response = await axios.post(`${BREVO_BASE_URL}/smtp/email`, emailData, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      })

      console.log(`✅ Email sent successfully (Message ID: ${response.data.messageId})`)
      return response.data
    } catch (error) {
      console.error('❌ Failed to send email:', error.message)
      throw error
    }
  }

  /**
   * Generate HTML email for performance report
   */
  generatePerformanceReportHTML(report) {
    const criticalIssues = report.recommendations
      .flatMap(r => r.issues.filter(i => i.severity === 'CRITICAL'))
    
    const hasIssues = criticalIssues.length > 0 || report.alerts.length > 0

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; }
          .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
          .metric { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; }
          .metric-label { font-size: 12px; color: #666; text-transform: uppercase; }
          .metric-value { font-size: 28px; font-weight: bold; color: #333; margin: 10px 0; }
          .alert { padding: 15px; margin: 10px 0; border-radius: 5px; }
          .alert-critical { background: #ffebee; border-left: 4px solid #f44336; }
          .alert-warning { background: #fff3e0; border-left: 4px solid #ff9800; }
          .alert-success { background: #e8f5e9; border-left: 4px solid #4caf50; }
          .campaign { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .campaign-name { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; }
          .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
          .stat { padding: 10px; background: #f8f9fa; border-radius: 5px; }
          .stat-label { font-size: 11px; color: #666; }
          .stat-value { font-size: 16px; font-weight: bold; }
          .recommendations { background: #fff3e0; padding: 15px; border-radius: 5px; margin-top: 10px; }
          .footer { margin-top: 30px; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 2px solid #eee; }
          .badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
          .badge-good { background: #4caf50; color: white; }
          .badge-warning { background: #ff9800; color: white; }
          .badge-critical { background: #f44336; color: white; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📊 ADMI Google Ads Performance Report</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">Last 7 Days Performance Analysis</p>
          </div>

          ${hasIssues ? `
            <div class="alert alert-critical" style="margin-top: 20px;">
              <h3 style="margin: 0 0 10px 0;">🚨 Immediate Attention Required</h3>
              <p style="margin: 0;">${criticalIssues.length} critical issue(s) and ${report.alerts.length} alert(s) detected.</p>
            </div>
          ` : `
            <div class="alert alert-success" style="margin-top: 20px;">
              <h3 style="margin: 0 0 10px 0;">✅ All Campaigns Performing Well</h3>
              <p style="margin: 0;">No critical issues detected. Continue monitoring performance.</p>
            </div>
          `}

          <h2 style="margin: 30px 0 15px 0;">Overall Performance</h2>
          <div class="summary">
            <div class="metric">
              <div class="metric-label">Total Spend</div>
              <div class="metric-value">KES ${report.totals.cost.toLocaleString()}</div>
            </div>
            <div class="metric">
              <div class="metric-label">Impressions</div>
              <div class="metric-value">${report.totals.impressions.toLocaleString()}</div>
            </div>
            <div class="metric">
              <div class="metric-label">Clicks</div>
              <div class="metric-value">${report.totals.clicks.toLocaleString()}</div>
            </div>
            <div class="metric">
              <div class="metric-label">Conversions</div>
              <div class="metric-value">${report.totals.conversions}</div>
            </div>
          </div>

          <div class="summary">
            <div class="metric">
              <div class="metric-label">CTR</div>
              <div class="metric-value">${(report.totals.clicks / report.totals.impressions * 100).toFixed(2)}%</div>
              <span class="badge ${(report.totals.clicks / report.totals.impressions * 100) >= report.targets.ctr ? 'badge-good' : 'badge-warning'}">
                Target: ${report.targets.ctr}%
              </span>
            </div>
            <div class="metric">
              <div class="metric-label">Avg CPC</div>
              <div class="metric-value">KES ${(report.totals.cost / report.totals.clicks).toFixed(2)}</div>
              <span class="badge ${(report.totals.cost / report.totals.clicks) <= report.targets.cpc ? 'badge-good' : 'badge-warning'}">
                Target: ≤${report.targets.cpc}
              </span>
            </div>
            ${report.totals.conversions > 0 ? `
              <div class="metric">
                <div class="metric-label">CPA</div>
                <div class="metric-value">KES ${(report.totals.cost / report.totals.conversions).toFixed(2)}</div>
                <span class="badge ${(report.totals.cost / report.totals.conversions) <= report.targets.cpa ? 'badge-good' : 'badge-critical'}">
                  Target: ≤${report.targets.cpa}
                </span>
              </div>
              <div class="metric">
                <div class="metric-label">Conv. Rate</div>
                <div class="metric-value">${(report.totals.conversions / report.totals.clicks * 100).toFixed(2)}%</div>
                <span class="badge ${(report.totals.conversions / report.totals.clicks * 100) >= report.targets.conversionRate ? 'badge-good' : 'badge-warning'}">
                  Target: ${report.targets.conversionRate}%
                </span>
              </div>
            ` : ''}
          </div>

          ${criticalIssues.length > 0 ? `
            <h2 style="margin: 30px 0 15px 0;">🔴 Critical Issues</h2>
            ${criticalIssues.map(issue => `
              <div class="alert alert-critical">
                <strong>${issue.metric}:</strong> ${issue.current} (Target: ${issue.target})<br>
                <span style="color: #666;">→ ${issue.recommendation}</span>
              </div>
            `).join('')}
          ` : ''}

          ${report.alerts.length > 0 ? `
            <h2 style="margin: 30px 0 15px 0;">⚠️ Alerts</h2>
            ${report.alerts.map(alert => `
              <div class="alert alert-warning">
                <strong>${alert.type}:</strong> ${alert.campaign}<br>
                <span style="color: #666;">${alert.message}</span>
              </div>
            `).join('')}
          ` : ''}

          ${report.topAds && report.topAds.length > 0 ? `
            <h2 style="margin: 30px 0 15px 0;">🎨 Top Performing Ads</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Ad ID</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Campaign</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Clicks</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Conv.</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">CTR</th>
                </tr>
              </thead>
              <tbody>
                ${report.topAds.slice(0, 5).map((ad, i) => `
                  <tr style="background: ${i % 2 === 0 ? '#fff' : '#f8f9fa'};">
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${ad.adId}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${ad.campaignName}</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${ad.clicks.toLocaleString()}</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee; font-weight: bold; color: ${ad.conversions > 0 ? '#4caf50' : '#666'};">${ad.conversions}</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${ad.ctr.toFixed(2)}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p style="font-size: 12px; color: #666; margin-top: 10px;">
              💡 <strong>Tip:</strong> Use these Ad IDs in Google Ads to create similar high-performing ads.
            </p>
          ` : ''}

          ${report.topKeywords && report.topKeywords.length > 0 ? `
            <h2 style="margin: 30px 0 15px 0;">🔑 Top Performing Keywords</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Keyword</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Match</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Clicks</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Conv.</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Cost</th>
                </tr>
              </thead>
              <tbody>
                ${report.topKeywords.slice(0, 10).map((kw, i) => `
                  <tr style="background: ${i % 2 === 0 ? '#fff' : '#f8f9fa'};">
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">"${kw.keyword}"</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="padding: 2px 6px; background: #e3f2fd; border-radius: 3px; font-size: 11px;">${kw.matchType}</span></td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${kw.clicks.toLocaleString()}</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee; font-weight: bold; color: ${kw.conversions > 0 ? '#4caf50' : '#666'};">${kw.conversions}</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">KES ${kw.cost.toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p style="font-size: 12px; color: #666; margin-top: 10px;">
              💡 <strong>Tip:</strong> Keywords with high conversions but high cost may benefit from bid adjustments.
            </p>
          ` : ''}

          <h2 style="margin: 30px 0 15px 0;">Campaign Details</h2>
          ${report.campaigns.slice(0, 5).map(campaign => `
            <div class="campaign">
              <div class="campaign-name">${campaign.name}</div>
              <div class="stats-grid">
                <div class="stat">
                  <div class="stat-label">Spend</div>
                  <div class="stat-value">KES ${campaign.cost.toLocaleString()}</div>
                </div>
                <div class="stat">
                  <div class="stat-label">Impressions</div>
                  <div class="stat-value">${campaign.impressions.toLocaleString()}</div>
                </div>
                <div class="stat">
                  <div class="stat-label">Clicks</div>
                  <div class="stat-value">${campaign.clicks.toLocaleString()}</div>
                </div>
                <div class="stat">
                  <div class="stat-label">CTR</div>
                  <div class="stat-value">${campaign.ctr.toFixed(2)}%</div>
                </div>
                <div class="stat">
                  <div class="stat-label">CPC</div>
                  <div class="stat-value">KES ${campaign.avgCpc.toFixed(2)}</div>
                </div>
                <div class="stat">
                  <div class="stat-label">Conversions</div>
                  <div class="stat-value">${campaign.conversions}</div>
                </div>
              </div>
              ${report.recommendations.find(r => r.campaign === campaign.name) ? `
                <div class="recommendations">
                  <strong>💡 Recommendations:</strong>
                  ${report.recommendations.find(r => r.campaign === campaign.name).issues.map(issue => `
                    <div style="margin: 5px 0;">• ${issue.recommendation}</div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}

          ${report.campaigns.length > 5 ? `
            <div style="text-align: center; margin: 20px 0; color: #666;">
              Showing top 5 campaigns. ${report.campaigns.length - 5} more campaign(s) in detailed report.
            </div>
          ` : ''}

          <div class="footer">
            <p><strong>ADMI Google Ads Performance Monitor</strong></p>
            <p>Automated daily report • Generated at ${new Date().toLocaleString()}</p>
            <p style="margin-top: 10px;">
              <a href="https://ads.google.com" style="color: #667eea; text-decoration: none;">View in Google Ads →</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  /**
   * Generate plain text version of performance report
   */
  generatePerformanceReportText(report) {
    const criticalIssues = report.recommendations
      .flatMap(r => r.issues.filter(i => i.severity === 'CRITICAL'))

    return `
ADMI GOOGLE ADS PERFORMANCE REPORT
${new Date().toLocaleDateString()}
Last 7 Days Analysis

========================================

OVERALL PERFORMANCE:
- Total Spend: KES ${report.totals.cost.toLocaleString()}
- Impressions: ${report.totals.impressions.toLocaleString()}
- Clicks: ${report.totals.clicks.toLocaleString()}
- Conversions: ${report.totals.conversions}
- CTR: ${(report.totals.clicks / report.totals.impressions * 100).toFixed(2)}% (Target: ${report.targets.ctr}%)
- Avg CPC: KES ${(report.totals.cost / report.totals.clicks).toFixed(2)} (Target: ≤${report.targets.cpc})
${report.totals.conversions > 0 ? `- CPA: KES ${(report.totals.cost / report.totals.conversions).toFixed(2)} (Target: ≤${report.targets.cpa})
- Conversion Rate: ${(report.totals.conversions / report.totals.clicks * 100).toFixed(2)}% (Target: ${report.targets.conversionRate}%)` : ''}

========================================

${criticalIssues.length > 0 ? `
CRITICAL ISSUES:
${criticalIssues.map((issue, i) => `
${i + 1}. ${issue.metric}: ${issue.current} (Target: ${issue.target})
   → ${issue.recommendation}
`).join('')}
========================================
` : ''}

${report.alerts.length > 0 ? `
ALERTS:
${report.alerts.map((alert, i) => `${i + 1}. ${alert.type}: ${alert.campaign}
   ${alert.message}
`).join('')}
========================================
` : ''}

TOP CAMPAIGNS:
${report.campaigns.slice(0, 5).map((campaign, i) => `
${i + 1}. ${campaign.name}
   Spend: KES ${campaign.cost.toLocaleString()} | Clicks: ${campaign.clicks} | CTR: ${campaign.ctr.toFixed(2)}%
   Conversions: ${campaign.conversions} | CPC: KES ${campaign.avgCpc.toFixed(2)}
`).join('')}

========================================

Generated: ${new Date().toLocaleString()}
View full details: https://ads.google.com
    `.trim()
  }
}

module.exports = EmailNotificationService

// CLI usage
if (require.main === module) {
  const service = new EmailNotificationService()
  
  // Test email
  const testReport = {
    date: new Date().toISOString(),
    totals: {
      cost: 125000,
      impressions: 50000,
      clicks: 1000,
      conversions: 25
    },
    targets: {
      ctr: 2.0,
      cpc: 50,
      conversionRate: 5.0,
      cpa: 5000
    },
    campaigns: [],
    recommendations: [],
    alerts: []
  }

  service.sendPerformanceReport(testReport)
    .then(() => console.log('Test email sent!'))
    .catch(error => console.error('Failed:', error))
}
