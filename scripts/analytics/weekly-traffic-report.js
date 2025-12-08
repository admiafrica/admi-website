const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')

async function generateReport() {
  try {
    const credentials = JSON.parse(fs.readFileSync('ga-service-account.json', 'utf8'))
    const client = new BetaAnalyticsDataClient({ credentials })

    // Last 7 days
    const [curr] = await client.runReport({
      property: 'properties/250948607',
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'sessions' }, { name: 'users' }]
    })

    // Previous 7 days
    const [prev] = await client.runReport({
      property: 'properties/250948607',
      dateRanges: [{ startDate: '14daysAgo', endDate: '8daysAgo' }],
      metrics: [{ name: 'sessions' }, { name: 'users' }]
    })

    const currSessions = parseInt(curr.rows[0].metricValues[0].value)
    const prevSessions = parseInt(prev.rows[0].metricValues[0].value)
    const currUsers = parseInt(curr.rows[0].metricValues[1].value)

    const change = (((currSessions - prevSessions) / prevSessions) * 100).toFixed(1)
    const arrow = change > 0 ? '📈 UP' : change < 0 ? '📉 DOWN' : '➡️ STABLE'

    console.log('\n' + '='.repeat(70))
    console.log('📊 ORGANIC TRAFFIC REPORT - CURRENT WEEK')
    console.log('='.repeat(70) + '\n')

    console.log('Last 7 days (Dec 2-8, 2025):')
    console.log(`  Sessions:    ${currSessions.toLocaleString()} (${(currSessions / 7).toFixed(0)}/day)`)
    console.log(`  Users:       ${currUsers.toLocaleString()}`)

    console.log('\nPrevious 7 days (Nov 25 - Dec 1):')
    console.log(`  Sessions:    ${prevSessions.toLocaleString()} (${(prevSessions / 7).toFixed(0)}/day)`)

    console.log('\n' + '='.repeat(70))
    console.log(`\n${arrow} Week-over-Week: ${change > 0 ? '+' : ''}${change}%\n`)

    if (change > 0) {
      console.log('✅ Organic traffic is IMPROVING!')
    } else if (change < -5) {
      console.log('⚠️  Organic traffic is declining.')
      console.log('   FAQ fixes (Nov 27) and automation (Dec 8) may take 2-4 weeks to show impact.')
    } else {
      console.log('➡️  Organic traffic is stable')
    }

    console.log('\n' + '='.repeat(70) + '\n')

    // Save data
    const report = {
      timestamp: new Date().toISOString(),
      week: 'Dec 2-8, 2025',
      currentWeek: { sessions: currSessions, users: currUsers },
      previousWeek: { sessions: prevSessions },
      change: `${change > 0 ? '+' : ''}${change}%`,
      trend: change > 0 ? 'UP' : change < 0 ? 'DOWN' : 'STABLE'
    }

    fs.writeFileSync('analytics-weekly-report.json', JSON.stringify(report, null, 2))
    console.log('Saved to: analytics-weekly-report.json\n')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

generateReport()
