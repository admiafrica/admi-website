const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')

async function main() {
  try {
    const creds = JSON.parse(fs.readFileSync('ga-service-account.json', 'utf8'))
    const client = new BetaAnalyticsDataClient({ credentials: creds })

    // Last 7 days
    const [resp1] = await client.runReport({
      property: 'properties/250948607',
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'sessions' }, { name: 'users' }]
    })

    // Previous 7 days
    const [resp2] = await client.runReport({
      property: 'properties/250948607',
      dateRanges: [{ startDate: '14daysAgo', endDate: '8daysAgo' }],
      metrics: [{ name: 'sessions' }]
    })

    const curr = parseInt(resp1.rows[0].metricValues[0].value)
    const currUsers = parseInt(resp1.rows[0].metricValues[1].value)
    const prev = parseInt(resp2.rows[0].metricValues[0].value)
    const change = (((curr - prev) / prev) * 100).toFixed(1)

    console.log('\n' + '='.repeat(70))
    console.log('📊 ORGANIC TRAFFIC - CURRENT WEEK (Dec 2-8, 2025)')
    console.log('='.repeat(70) + '\n')

    console.log(`Sessions (last 7 days):     ${curr.toLocaleString()} (${(curr / 7).toFixed(0)}/day)`)
    console.log(`Users (last 7 days):        ${currUsers.toLocaleString()}`)
    console.log(`Sessions (previous 7 days): ${prev.toLocaleString()} (${(prev / 7).toFixed(0)}/day)`)

    const trend = change > 0 ? '📈 UP' : change < 0 ? '📉 DOWN' : '➡️ STABLE'
    console.log(`\n${trend} Week-over-Week Change: ${change > 0 ? '+' : ''}${change}%\n`)

    if (change > 0) {
      console.log('✅ POSITIVE: Organic traffic is improving!')
    } else if (change < -5) {
      console.log('⚠️  DECLINING: Organic traffic is down.')
      console.log('   FAQ fixes (Nov 27) and automation (Dec 8) may take 2-4 weeks.')
    } else {
      console.log('➡️  STABLE: Organic traffic is steady')
    }

    console.log('\n' + '='.repeat(70) + '\n')
  } catch (err) {
    console.error('Error:', err.message)
  }
}

main()
