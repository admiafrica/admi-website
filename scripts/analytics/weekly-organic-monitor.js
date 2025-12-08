#!/usr/bin/env node
// Weekly Organic Traffic Monitor - GA4 Real-time Analysis
// Fetches organic traffic metrics and sends weekly reports

const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')

const CONFIG = {
  property: 'properties/250948607',
  recipients: process.env.ANALYTICS_REPORT_EMAILS || 'wilfred@admi.africa',
  fromEmail: process.env.REPORT_FROM_EMAIL || 'analytics@admi.africa',
  logDir: 'logs/organic-traffic-reports'
}

if (!fs.existsSync(CONFIG.logDir)) {
  fs.mkdirSync(CONFIG.logDir, { recursive: true })
}

async function fetchOrganicData() {
  try {
    const credPath = 'ga-service-account.json'
    if (!fs.existsSync(credPath)) {
      throw new Error(`GA service account JSON not found at ${credPath}`)
    }

    const creds = JSON.parse(fs.readFileSync(credPath, 'utf8'))
    const client = new BetaAnalyticsDataClient({ credentials: creds })

    // Current week (last 7 days) - working format
    const [current] = await client.runReport({
      property: CONFIG.property,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'sessions' }, { name: 'users' }, { name: 'screenPageViews' }]
    })

    // Previous week (7-14 days ago)
    const [previous] = await client.runReport({
      property: CONFIG.property,
      dateRanges: [{ startDate: '14daysAgo', endDate: '8daysAgo' }],
      metrics: [{ name: 'sessions' }, { name: 'users' }, { name: 'screenPageViews' }]
    })

    // 4 weeks ago (28-35 days ago)
    const [fourWeeksAgo] = await client.runReport({
      property: CONFIG.property,
      dateRanges: [{ startDate: '35daysAgo', endDate: '29daysAgo' }],
      metrics: [{ name: 'sessions' }]
    })

    const curr = parseInt(current.rows[0].metricValues[0].value)
    const currUsers = parseInt(current.rows[0].metricValues[1].value)
    const currPageviews = parseInt(current.rows[0].metricValues[2].value)

    const prev = parseInt(previous.rows[0].metricValues[0].value)
    const prevUsers = parseInt(previous.rows[0].metricValues[1].value)
    const prevPageviews = parseInt(previous.rows[0].metricValues[2].value)

    const fourWeeks = parseInt(fourWeeksAgo.rows[0].metricValues[0].value)

    const weekChange = (((curr - prev) / prev) * 100).toFixed(1)
    const monthChange = (((curr - fourWeeks) / fourWeeks) * 100).toFixed(1)

    return {
      timestamp: new Date().toISOString(),
      currentWeek: {
        sessions: curr,
        users: currUsers,
        pageviews: currPageviews,
        avgSessionsPerDay: Math.round(curr / 7)
      },
      previousWeek: {
        sessions: prev,
        users: prevUsers,
        pageviews: prevPageviews,
        avgSessionsPerDay: Math.round(prev / 7)
      },
      fourWeeksAgo: {
        sessions: fourWeeks,
        avgSessionsPerDay: Math.round(fourWeeks / 7)
      },
      metrics: {
        weekChange: parseFloat(weekChange),
        monthChange: parseFloat(monthChange),
        trend: weekChange > 0 ? 'UP' : weekChange < 0 ? 'DOWN' : 'STABLE'
      }
    }
  } catch (error) {
    console.error('Error fetching GA data:', error.message)
    throw error
  }
}

function generateReport(data) {
  const weekTrend = data.metrics.weekChange > 0 ? '📈 UP' : data.metrics.weekChange < 0 ? '📉 DOWN' : '➡️ STABLE'
  const monthTrend = data.metrics.monthChange > 0 ? '📈 UP' : data.metrics.monthChange < 0 ? '📉 DOWN' : '➡️ STABLE'

  const analysis = []

  if (data.metrics.weekChange > 10) {
    analysis.push('✅ Strong growth this week - organic traffic is performing well!')
  } else if (data.metrics.weekChange > 0) {
    analysis.push('✅ Positive trend - organic traffic is improving.')
  } else if (data.metrics.weekChange < -10) {
    analysis.push('⚠️  Significant decline this week - investigate potential issues.')
  } else if (data.metrics.weekChange < 0) {
    analysis.push('⚠️  Slight decline this week - monitor for continued downward trend.')
  } else {
    analysis.push('➡️  Traffic is stable week-over-week.')
  }

  if (data.metrics.monthChange > 0) {
    analysis.push(`Monthly trend is positive (+${data.metrics.monthChange}% vs 4 weeks ago).`)
  } else {
    analysis.push(`Monthly trend shows decline (${data.metrics.monthChange}% vs 4 weeks ago).`)
  }

  const reportDate = new Date(data.timestamp).toUTCString()

  return {
    plaintext: `
ORGANIC TRAFFIC WEEKLY REPORT
Generated: ${reportDate}

═══════════════════════════════════════════════════════════════════

CURRENT WEEK METRICS (Last 7 Days)
───────────────────────────────────
Sessions:           ${data.currentWeek.sessions.toLocaleString()}
Users:              ${data.currentWeek.users.toLocaleString()}
Pageviews:          ${data.currentWeek.pageviews.toLocaleString()}
Avg Sessions/Day:   ${data.currentWeek.avgSessionsPerDay}

PREVIOUS WEEK (7-14 days ago)
───────────────────────────────────
Sessions:           ${data.previousWeek.sessions.toLocaleString()}
Users:              ${data.previousWeek.users.toLocaleString()}
Pageviews:          ${data.previousWeek.pageviews.toLocaleString()}
Avg Sessions/Day:   ${data.previousWeek.avgSessionsPerDay}

4 WEEKS AGO (29-35 days ago)
───────────────────────────────────
Sessions:           ${data.fourWeeksAgo.sessions.toLocaleString()}
Avg Sessions/Day:   ${data.fourWeeksAgo.avgSessionsPerDay}

═══════════════════════════════════════════════════════════════════

TREND ANALYSIS
───────────────────────────────────
${weekTrend} Week-over-Week Change:  ${data.metrics.weekChange > 0 ? '+' : ''}${data.metrics.weekChange}%
${monthTrend} Month-over-Month Change: ${data.metrics.monthChange > 0 ? '+' : ''}${data.metrics.monthChange}%

INSIGHTS
───────────────────────────────────
${analysis.map((a) => '• ' + a).join('\n')}

ACTION ITEMS
───────────────────────────────────
• Monitor content performance in Google Search Console
• Review top landing pages and conversion rates
• Check for any Google algorithm updates
• Validate FAQ automation effectiveness
• Review paid traffic correlation

═══════════════════════════════════════════════════════════════════
Report generated by ADMI Analytics Monitor
https://analytics.google.com/analytics/web/#/p/250948607/

Data Period: ${new Date(data.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}
`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
    .header { background: #1a73e8; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: white; padding: 20px; }
    .metric-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; }
    .metric { background: #f0f0f0; padding: 10px; border-radius: 4px; }
    .metric-label { font-size: 12px; color: #666; }
    .metric-value { font-size: 18px; font-weight: bold; color: #1a73e8; }
    .trend-up { color: #34a853; }
    .trend-down { color: #ea4335; }
    .section { margin: 20px 0; }
    .section-title { font-size: 14px; font-weight: bold; color: #1a73e8; margin-top: 20px; padding-top: 10px; border-top: 1px solid #e0e0e0; }
    .insight { background: #f9f9f9; padding: 10px; margin: 5px 0; border-left: 3px solid #1a73e8; border-radius: 2px; }
    .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Weekly Organic Traffic Report</h1>
      <p style="margin: 10px 0 0 0; font-size: 14px;">${reportDate}</p>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="section-title">Current Week (Last 7 Days)</div>
        <div class="metric-row">
          <div class="metric">
            <div class="metric-label">Sessions</div>
            <div class="metric-value">${data.currentWeek.sessions.toLocaleString()}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Users</div>
            <div class="metric-value">${data.currentWeek.users.toLocaleString()}</div>
          </div>
        </div>
        <div class="metric-row">
          <div class="metric">
            <div class="metric-label">Pageviews</div>
            <div class="metric-value">${data.currentWeek.pageviews.toLocaleString()}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Avg Sessions/Day</div>
            <div class="metric-value">${data.currentWeek.avgSessionsPerDay}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Previous Week (7-14 Days Ago)</div>
        <div class="metric-row">
          <div class="metric">
            <div class="metric-label">Sessions</div>
            <div class="metric-value">${data.previousWeek.sessions.toLocaleString()}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Users</div>
            <div class="metric-value">${data.previousWeek.users.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Trend Analysis</div>
        <div class="metric" style="background: ${data.metrics.weekChange > 0 ? '#e6f4ea' : data.metrics.weekChange < 0 ? '#fce8e6' : '#f0f0f0'}">
          <div class="metric-label">Week-over-Week Change</div>
          <div class="metric-value ${data.metrics.weekChange > 0 ? 'trend-up' : data.metrics.weekChange < 0 ? 'trend-down' : ''}">
            ${data.metrics.weekChange > 0 ? '+' : ''}${data.metrics.weekChange}%
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Insights</div>
        ${analysis.map((a) => `<div class="insight">${a}</div>`).join('')}
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0;">Generated by ADMI Analytics Monitor</p>
      <p style="margin: 5px 0 0 0;"><a href="https://analytics.google.com/analytics/web/#/p/250948607/" style="color: #1a73e8; text-decoration: none;">View in Google Analytics</a></p>
    </div>
  </div>
</body>
</html>
`
  }
}

function saveReport(data) {
  const dateStr = new Date(data.timestamp).toISOString().split('T')[0]
  const filename = `organic-traffic-${dateStr}.json`
  const filepath = path.join(CONFIG.logDir, filename)

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
  console.log('✅ Report saved to:', filepath)

  return filepath
}

async function main() {
  try {
    console.log('\n' + '='.repeat(70))
    console.log('📊 WEEKLY ORGANIC TRAFFIC MONITOR')
    console.log('='.repeat(70) + '\n')

    console.log('⏳ Fetching GA4 data...')
    const data = await fetchOrganicData()

    console.log('✅ Data fetched successfully')

    const report = generateReport(data)
    saveReport(data)

    console.log('\n' + report.plaintext)

    console.log(
      '\n💡 Tip: Save report HTML to file for email:\n' +
        '   node scripts/analytics/weekly-organic-monitor.js | tee reports/traffic-report.html\n'
    )

    console.log('='.repeat(70) + '\n')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error in monitoring job:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { fetchOrganicData, generateReport }
