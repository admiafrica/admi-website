#!/usr/bin/env node

const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')

async function fetchDecemberData() {
  try {
    const credentials = JSON.parse(fs.readFileSync('ga-service-account.json', 'utf8'))

    const client = new BetaAnalyticsDataClient({
      credentials
    })

    console.log('\n' + '='.repeat(70))
    console.log('📊 FETCHING ORGANIC TRAFFIC - December 1-8, 2025')
    console.log('='.repeat(70) + '\n')

    // Get Dec 1-8 (8 days ago to today as of Dec 8)
    const [response] = await client.runReport({
      property: 'properties/250948607',
      dateRanges: [
        {
          startDate: '8daysAgo',
          endDate: 'today'
        }
      ],
      metrics: [
        {
          name: 'sessions'
        },
        {
          name: 'users'
        },
        {
          name: 'screenPageViews'
        },
        {
          name: 'bounceRate'
        },
        {
          name: 'averageSessionDuration'
        }
      ]
    })

    const row = response.rows[0]
    const sessions = parseInt(row.metricValues[0].value)
    const users = parseInt(row.metricValues[1].value)
    const pageviews = parseInt(row.metricValues[2].value)
    const bounceRate = parseFloat(row.metricValues[3].value)
    const duration = parseFloat(row.metricValues[4].value)

    console.log('Total Metrics (Dec 1-8):')
    console.log(`  Sessions:        ${sessions.toLocaleString()}`)
    console.log(`  Users:           ${users.toLocaleString()}`)
    console.log(`  Pageviews:       ${pageviews.toLocaleString()}`)
    console.log(`  Bounce Rate:     ${(bounceRate * 100).toFixed(2)}%`)
    console.log(`  Avg Duration:    ${(duration / 60).toFixed(1)} seconds`)
    console.log('\nDaily Averages:')
    console.log(`  Sessions/day:    ${(sessions / 8).toFixed(0)}`)
    console.log(`  Users/day:       ${(users / 8).toFixed(0)}`)
    console.log(`  Pageviews/day:   ${(pageviews / 8).toFixed(0)}`)

    // Get previous period (Oct 1 - Nov 3)
    const [prevResponse] = await client.runReport({
      property: 'properties/250948607',
      dateRanges: [
        {
          startDate: '42daysAgo',
          endDate: '8daysAgo'
        }
      ],
      metrics: [
        {
          name: 'sessions'
        }
      ]
    })

    const prevSessions = parseInt(prevResponse.rows[0].metricValues[0].value)
    const prevDaily = prevSessions / 34 // Oct 1 - Nov 3 is ~34 days
    const currDaily = sessions / 8
    const change = (((currDaily - prevDaily) / prevDaily) * 100).toFixed(1)
    const arrow = change > 0 ? '📈' : change < 0 ? '📉' : '➡️'

    console.log('\n' + '='.repeat(70))
    console.log('\n🔄 COMPARISON: Dec 1-8 vs Oct 1 - Nov 3\n')
    console.log('Oct 1 - Nov 3 (34 days):')
    console.log(`  Total:           ${prevSessions.toLocaleString()}`)
    console.log(`  Daily Avg:       ${prevDaily.toFixed(0)} sessions/day`)
    console.log('\nDec 1-8 (8 days):')
    console.log(`  Total:           ${sessions.toLocaleString()}`)
    console.log(`  Daily Avg:       ${currDaily.toFixed(0)} sessions/day`)
    console.log(`\n${arrow} Change (daily normalized): ${change > 0 ? '+' : ''}${change}%\n`)

    if (change > 0) {
      console.log('✅ POSITIVE TREND: Organic traffic is IMPROVING!')
      console.log('\nThis suggests recent SEO fixes and FAQ automation are having positive impact.')
    } else if (change < -10) {
      console.log('⚠️  NEGATIVE TREND: Organic traffic is still declining significantly')
      console.log('\nPossible reasons:')
      console.log('  - FAQ fixes (Nov 27) and automation (Dec 8) may need 2-4 weeks to show impact')
      console.log('  - Seasonal decline from peak summer enrollment period')
      console.log('  - Google algorithm adjustments')
    } else {
      console.log('➡️  STABLE: Organic traffic is roughly steady')
    }

    // Save results
    const results = {
      timestamp: new Date().toISOString(),
      period: 'Dec 1-8, 2025',
      metrics: {
        sessions,
        users,
        pageviews,
        bounceRate: (bounceRate * 100).toFixed(2),
        avgDuration: (duration / 60).toFixed(1)
      },
      daily: {
        sessions: (sessions / 8).toFixed(0),
        users: (users / 8).toFixed(0),
        pageviews: (pageviews / 8).toFixed(0)
      },
      comparison: {
        'Oct 1 - Nov 3 Total': prevSessions,
        'Oct 1 - Nov 3 Daily Avg': prevDaily.toFixed(0),
        'Dec 1-8 Total': sessions,
        'Dec 1-8 Daily Avg': currDaily.toFixed(0),
        'Percent Change': `${change > 0 ? '+' : ''}${change}%`,
        Trend: change > 0 ? 'IMPROVING' : change < -10 ? 'DECLINING' : 'STABLE'
      }
    }

    fs.writeFileSync('analytics-december-1-8-2025.json', JSON.stringify(results, null, 2))
    console.log('\n✅ Results saved to: analytics-december-1-8-2025.json')

    console.log('\n' + '='.repeat(70) + '\n')
  } catch (error) {
    console.error('\n❌ Error fetching analytics:', error.message)
    console.error('Code:', error.code)
  }
}

// Run if called directly
if (require.main === module) {
  fetchDecemberData().catch(console.error)
}

module.exports = { fetchDecemberData }
