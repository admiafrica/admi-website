#!/usr/bin/env node

/**
 * Fetch Google Analytics GA4 data using OAuth credentials
 * Uses Google Analytics Admin API + Reporting API
 */

const axios = require('axios')
const fs = require('fs')
require('dotenv').config()

class GA4DataFetcher {
  constructor() {
    this.clientId = process.env.GOOGLE_ADS_CLIENT_ID
    this.clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET
    this.refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN
    this.propertyId = '250948607'
    this.accessToken = null
  }

  async getAccessToken() {
    try {
      console.log('🔐 Getting access token from refresh token...')

      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token'
      })

      this.accessToken = response.data.access_token
      console.log('✅ Access token obtained\n')
      return this.accessToken
    } catch (error) {
      console.error('❌ Failed to get access token:', error.response?.data || error.message)
      return null
    }
  }

  async fetchGAData(startDate, endDate) {
    if (!this.accessToken) {
      await this.getAccessToken()
    }

    try {
      console.log(`📊 Fetching GA4 data: ${startDate} to ${endDate}\n`)

      const response = await axios.post(
        `https://analyticsreporting.googleapis.com/v4/reports:batchGet`,
        {
          reportRequests: [
            {
              viewId: this.propertyId,
              dateRanges: [
                {
                  startDate: startDate,
                  endDate: endDate
                }
              ],
              metrics: [
                { expression: 'ga:sessions' },
                { expression: 'ga:users' },
                { expression: 'ga:pageviews' },
                { expression: 'ga:bounceRate' },
                { expression: 'ga:avgSessionDuration' }
              ],
              dimensions: [{ name: 'ga:sourceMedium' }, { name: 'ga:date' }],
              dimensionFilterClauses: [
                {
                  filters: [
                    {
                      dimensionName: 'ga:sourceMedium',
                      expressions: ['google / organic']
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data
    } catch (error) {
      console.error('❌ Error fetching GA data:', error.response?.data || error.message)
      return null
    }
  }

  async fetchBetaAnalyticsData(startDate, endDate) {
    if (!this.accessToken) {
      await this.getAccessToken()
    }

    try {
      console.log(`📊 Fetching GA4 Beta Reporting API data: ${startDate} to ${endDate}\n`)

      const response = await axios.post(
        `https://analyticsdata.googleapis.com/v1beta/properties/${this.propertyId}:runReport`,
        {
          dateRanges: [
            {
              startDate: startDate,
              endDate: endDate
            }
          ],
          metrics: [
            { name: 'sessions' },
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' }
          ],
          dimensions: [{ name: 'sourceMedium' }, { name: 'date' }],
          dimensionFilter: {
            filter: {
              fieldName: 'sourceMedium',
              stringFilter: {
                matchType: 'EXACT',
                value: 'google / organic'
              }
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data
    } catch (error) {
      console.error('❌ Error fetching GA Beta data:', error.response?.data || error.message)
      if (error.response?.status === 403) {
        console.log('\n⚠️  Permission denied. Ensure the OAuth credentials have:')
        console.log('  - google-analytics scope')
        console.log('  - Access to property 250948607')
      }
      return null
    }
  }

  parseResults(data) {
    if (!data || !data.reports || data.reports.length === 0) {
      console.log('⚠️  No data returned')
      return null
    }

    const report = data.reports[0]
    const rows = report.data?.rows || []

    if (rows.length === 0) {
      console.log('⚠️  No rows returned for organic search')
      return null
    }

    const results = {
      totalSessions: 0,
      totalUsers: 0,
      totalPageviews: 0,
      totalBounceRate: 0,
      totalDuration: 0,
      dayCount: 0,
      rows: []
    }

    rows.forEach((row) => {
      const date = row.dimensions[1]
      const sessions = parseInt(row.metrics[0].values[0]) || 0
      const users = parseInt(row.metrics[1].values[0]) || 0
      const pageviews = parseInt(row.metrics[2].values[0]) || 0
      const bounceRate = parseFloat(row.metrics[3].values[0]) || 0
      const duration = parseFloat(row.metrics[4].values[0]) || 0

      results.totalSessions += sessions
      results.totalUsers += users
      results.totalPageviews += pageviews
      results.totalBounceRate += bounceRate
      results.totalDuration += duration
      results.dayCount++

      results.rows.push({
        date: `2025-12-${date}`,
        sessions,
        users,
        pageviews,
        bounceRate: bounceRate.toFixed(2),
        avgDuration: (duration / 60).toFixed(1)
      })
    })

    return results
  }

  formatResults(results) {
    if (!results || results.dayCount === 0) return null

    console.log('📈 Daily Breakdown:\n')
    console.log('Date       | Sessions | Users | Pageviews | Bounce Rate | Avg Duration')
    console.log(''.padEnd(80, '-'))

    results.rows.forEach((row) => {
      console.log(
        `${row.date} | ${String(row.sessions).padStart(8)} | ${String(row.users).padStart(5)} | ${String(row.pageviews).padStart(9)} | ${String(row.bounceRate).padStart(11)}% | ${String(row.avgDuration).padStart(11)}s`
      )
    })

    console.log(''.padEnd(80, '-'))
    console.log('\n📊 TOTALS:\n')
    console.log(`  Sessions:        ${results.totalSessions.toLocaleString()}`)
    console.log(`  Users:           ${results.totalUsers.toLocaleString()}`)
    console.log(`  Pageviews:       ${results.totalPageviews.toLocaleString()}`)
    console.log(`  Avg Bounce Rate: ${(results.totalBounceRate / results.dayCount).toFixed(2)}%`)
    console.log(`  Avg Duration:    ${(results.totalDuration / results.dayCount / 60).toFixed(1)}s`)

    return results
  }
}

async function main() {
  const fetcher = new GA4DataFetcher()

  // Check credentials
  if (!fetcher.clientId || !fetcher.clientSecret || !fetcher.refreshToken) {
    console.log('❌ Missing OAuth credentials in .env')
    console.log('\nRequired:')
    console.log('  - GOOGLE_ADS_CLIENT_ID')
    console.log('  - GOOGLE_ADS_CLIENT_SECRET')
    console.log('  - GOOGLE_ADS_REFRESH_TOKEN')
    process.exit(1)
  }

  // Get access token
  const token = await fetcher.getAccessToken()
  if (!token) {
    process.exit(1)
  }

  // Try Beta Analytics API (newer, more reliable)
  const data = await fetcher.fetchBetaAnalyticsData('2025-12-01', '2025-12-08')

  if (data && data.rows) {
    const parsed = fetcher.parseResults(data)
    if (parsed) {
      fetcher.formatResults(parsed)

      // Save results
      const results = {
        timestamp: new Date().toISOString(),
        period: 'Dec 1-8, 2025',
        metrics: parsed
      }

      fs.writeFileSync('analytics-december-1-8-2025.json', JSON.stringify(results, null, 2))
      console.log('\n✅ Results saved to: analytics-december-1-8-2025.json\n')
    }
  } else {
    console.log('\n⚠️  Could not fetch data from GA4')
    console.log('\nTroubleshooting:')
    console.log('1. Verify OAuth credentials are correct')
    console.log('2. Check that property 250948607 is accessible')
    console.log('3. Ensure Google Analytics scope is included in OAuth')
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { GA4DataFetcher }
