#!/usr/bin/env node

/**
 * Fetch current organic traffic data from Google Analytics GA4 API
 * Property ID: 250948607 (ADMI Website)
 *
 * Usage:
 *   node scripts/analytics/fetch-current-organic-traffic.js
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')

// Try to load service account from env variable or file
async function getServiceAccount() {
  // Check if service account JSON in env
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    try {
      return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
    } catch (e) {
      console.error('❌ Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON')
    }
  }

  // Try to load from file
  const credFile = path.join(process.cwd(), 'ga-service-account.json')
  if (fs.existsSync(credFile)) {
    try {
      return JSON.parse(fs.readFileSync(credFile, 'utf8'))
    } catch (e) {
      console.error('❌ Failed to read ga-service-account.json')
    }
  }

  return null
}

async function fetchOrganicTraffic() {
  try {
    console.log('\n📊 Fetching CURRENT organic traffic from Google Analytics...\n')

    const credentials = await getServiceAccount()

    if (!credentials) {
      console.log('⚠️  Service account credentials not found')
      console.log('\nTo set up, either:')
      console.log("1. Export service account as: export GOOGLE_APPLICATION_CREDENTIALS_JSON='<json>'")
      console.log('2. Place ga-service-account.json in project root')
      console.log('\nFor now, showing historical data...\n')

      // Fall back to historical data
      const currentPeriod = JSON.parse(fs.readFileSync('analytics-current-period-raw.json', 'utf8'))
      showHistoricalData(currentPeriod)
      return
    }

    // Initialize GA4 client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials
    })

    const propertyId = '250948607'

    console.log(`🔍 Querying: Dec 1 - Dec 8, 2025\n`)

    const response = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2025-12-01',
          endDate: '2025-12-08'
        }
      ],
      dimensions: [
        {
          name: 'sourceMedium'
        },
        {
          name: 'date'
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

    // Process results
    let totalSessions = 0
    let totalUsers = 0
    let totalPageviews = 0
    let totalBounceRate = 0
    let totalDuration = 0
    let dayCount = 0

    console.log('📈 Daily Breakdown (Dec 1-8):\n')
    console.log('Date       | Sessions | Users | Pageviews | Bounce Rate | Avg Duration')
    console.log(''.padEnd(80, '-'))

    if (response.rows && response.rows.length > 0) {
      response.rows.forEach((row) => {
        const date = row.dimensionValues?.[1]?.value || 'N/A'
        const sessions = parseInt(row.metricValues?.[0]?.value || 0)
        const users = parseInt(row.metricValues?.[1]?.value || 0)
        const pageviews = parseInt(row.metricValues?.[2]?.value || 0)
        const bounceRate = parseFloat(row.metricValues?.[3]?.value || 0)
        const duration = parseFloat(row.metricValues?.[4]?.value || 0)

        totalSessions += sessions
        totalUsers += users
        totalPageviews += pageviews
        totalBounceRate += bounceRate
        totalDuration += duration
        dayCount++

        const dateStr = `2025-12-${date}`.slice(0, 10)
        console.log(
          `${dateStr} | ${String(sessions).padStart(8)} | ${String(users).padStart(5)} | ${String(pageviews).padStart(9)} | ${bounceRate.toFixed(2).padStart(11)}% | ${(duration / 60).toFixed(1).padStart(11)}s`
        )
      })
    } else {
      console.log('⚠️  No organic traffic data found for Dec 1-8, 2025')
    }

    console.log(''.padEnd(80, '-'))
    console.log('TOTALS (Dec 1-8):')
    console.log(`  Sessions:        ${totalSessions.toLocaleString()}`)
    console.log(`  Users:           ${totalUsers.toLocaleString()}`)
    console.log(`  Pageviews:       ${totalPageviews.toLocaleString()}`)
    console.log(`  Avg Bounce Rate: ${(totalBounceRate / dayCount).toFixed(2)}%`)
    console.log(`  Avg Duration:    ${(totalDuration / dayCount / 60).toFixed(1)}s`)

    // Compare with Oct 1 - Nov 3 period
    console.log('\n' + '='.repeat(80))
    console.log('📊 COMPARISON: Dec 1-8 vs Oct 1 - Nov 3\n')

    const currentPeriod = JSON.parse(fs.readFileSync('analytics-current-period-raw.json', 'utf8'))
    const previousOrganic = currentPeriod.trafficSources.sources.find(
      (s) => s.source === 'google' && s.medium === 'organic'
    )

    // Note: Oct 1 - Nov 3 is 34 days, Dec 1-8 is 8 days
    const octNovDaily = previousOrganic.sessions / 34
    const decDaily = totalSessions / 8

    console.log(`Oct 1 - Nov 3 (34 days):`)
    console.log(`  Total Sessions: ${previousOrganic.sessions?.toLocaleString()}`)
    console.log(`  Daily Avg:      ${octNovDaily.toFixed(0)} sessions/day`)

    console.log(`\nDec 1 - Dec 8 (8 days):`)
    console.log(`  Total Sessions: ${totalSessions.toLocaleString()}`)
    console.log(`  Daily Avg:      ${decDaily.toFixed(0)} sessions/day`)

    const change = (((decDaily - octNovDaily) / octNovDaily) * 100).toFixed(1)
    const arrow = change > 0 ? '📈' : change < 0 ? '📉' : '➡️'

    console.log(`\n${arrow} Change (daily normalized): ${change > 0 ? '+' : ''}${change}%`)

    if (change > 0) {
      console.log('✅ POSITIVE TREND: Organic traffic is improving!')
    } else if (change < 0) {
      console.log('⚠️  NEGATIVE TREND: Organic traffic still declining')
    }

    // Save results
    const results = {
      timestamp: new Date().toISOString(),
      period: 'Dec 1-8, 2025',
      metrics: {
        sessions: totalSessions,
        users: totalUsers,
        pageviews: totalPageviews,
        bounceRate: (totalBounceRate / dayCount).toFixed(2),
        avgDuration: (totalDuration / dayCount / 60).toFixed(1)
      },
      comparison: {
        octNovAvgDaily: octNovDaily.toFixed(0),
        decAvgDaily: decDaily.toFixed(0),
        percentChange: change
      }
    }

    fs.writeFileSync('analytics-december-1-8-2025.json', JSON.stringify(results, null, 2))
    console.log('\n✅ Results saved to: analytics-december-1-8-2025.json\n')
  } catch (error) {
    console.error('❌ Error fetching analytics:', error.code, error.message)
    console.error('Full error:', JSON.stringify(error, null, 2))

    if (error.message.includes('credentials')) {
      console.log('\nTo fix, set up Google Analytics service account:')
      console.log('1. Go to: https://console.cloud.google.com')
      console.log('2. Create service account with "Editor" role')
      console.log('3. Download as JSON and set GOOGLE_APPLICATION_CREDENTIALS')
      console.log('4. Grant account access to GA4 property 250948607')
    }
  }
}

function showHistoricalData(currentPeriod) {
  const organic = currentPeriod.trafficSources.sources.find((s) => s.source === 'google' && s.medium === 'organic')

  if (organic) {
    console.log('Last Available Snapshot (Oct 1 - Nov 3):')
    console.log(`  Sessions:       ${organic.sessions?.toLocaleString()}`)
    console.log(`  Users:          ${organic.users?.toLocaleString()}`)
    console.log(`  Pageviews:      ${organic.pageviews?.toLocaleString()}`)
    console.log(`  Bounce Rate:    ${(organic.bounceRate * 100).toFixed(2)}%`)
    console.log(`  Avg Duration:   ${(organic.avgSessionDuration / 60).toFixed(1)}s\n`)
  }
}

// Run if called directly
if (require.main === module) {
  fetchOrganicTraffic().catch(console.error)
}

module.exports = { fetchOrganicTraffic }
