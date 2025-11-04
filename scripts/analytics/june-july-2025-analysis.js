/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * ADMI June 1 - July 3, 2025 Analysis (34 days)
 * For apples-to-apples comparison with Oct 1 - Nov 3, 2025 (34 days)
 */

class JuneJuly2025Analyzer {
  constructor() {
    this.client = null
    this.propertyId = process.env.GA4_PROPERTY_ID || '250948607'
    this.startDate = '2025-06-01'
    this.endDate = '2025-07-03'
  }

  async initializeClient() {
    try {
      this.client = new BetaAnalyticsDataClient({
        keyFilename: 'ga-service-account.json'
      })
      console.log('✅ Google Analytics client initialized')
    } catch (error) {
      console.error('❌ Failed to initialize GA client:', error.message)
      throw error
    }
  }

  async getTrafficSources() {
    console.log('📊 Fetching traffic sources data...')
    
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: this.startDate,
            endDate: this.endDate
          }
        ],
        dimensions: [
          { name: 'sessionSource' },
          { name: 'sessionMedium' },
          { name: 'sessionCampaignName' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [
          {
            metric: { metricName: 'sessions' },
            desc: true
          }
        ],
        limit: 100
      })

      const sources = response.rows?.map(row => {
        const sessions = parseInt(row.metricValues[0].value)
        const users = parseInt(row.metricValues[1].value)
        const pageviews = parseInt(row.metricValues[2].value)
        const avgSessionDuration = parseFloat(row.metricValues[3].value)
        const bounceRate = parseFloat(row.metricValues[4].value)

        return {
          source: row.dimensionValues[0].value,
          medium: row.dimensionValues[1].value,
          campaign: row.dimensionValues[2].value,
          sessions,
          users,
          pageviews,
          avgSessionDuration,
          bounceRate
        }
      }) || []

      const totalSessions = sources.reduce((sum, source) => sum + source.sessions, 0)
      
      // Add percentage to each source
      const sourcesWithPercentage = sources.map(source => ({
        ...source,
        percentage: ((source.sessions / totalSessions) * 100).toFixed(2)
      }))

      // Calculate organic vs other traffic
      const organicSessions = sources
        .filter(s => s.medium === 'organic')
        .reduce((sum, s) => sum + s.sessions, 0)
      
      const directSessions = sources
        .filter(s => s.source === '(direct)' && s.medium === '(none)')
        .reduce((sum, s) => sum + s.sessions, 0)

      const paidSessions = sources
        .filter(s => ['cpc', 'ppc', 'adwords'].includes(s.medium))
        .reduce((sum, s) => sum + s.sessions, 0)

      const socialSessions = sources
        .filter(s => s.medium === 'social')
        .reduce((sum, s) => sum + s.sessions, 0)

      const referralSessions = sources
        .filter(s => s.medium === 'referral')
        .reduce((sum, s) => sum + s.sessions, 0)

      return {
        sources: sourcesWithPercentage,
        totalSessions,
        summary: {
          organic: {
            sessions: organicSessions,
            percentage: ((organicSessions / totalSessions) * 100).toFixed(2)
          },
          direct: {
            sessions: directSessions,
            percentage: ((directSessions / totalSessions) * 100).toFixed(2)
          },
          paid: {
            sessions: paidSessions,
            percentage: ((paidSessions / totalSessions) * 100).toFixed(2)
          },
          social: {
            sessions: socialSessions,
            percentage: ((socialSessions / totalSessions) * 100).toFixed(2)
          },
          referral: {
            sessions: referralSessions,
            percentage: ((referralSessions / totalSessions) * 100).toFixed(2)
          }
        }
      }
    } catch (error) {
      console.error('❌ Error fetching traffic sources:', error.message)
      throw error
    }
  }

  async getGeographicData() {
    console.log('🌍 Fetching geographic data...')
    
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: this.startDate,
            endDate: this.endDate
          }
        ],
        dimensions: [
          { name: 'country' },
          { name: 'city' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' }
        ],
        orderBys: [
          {
            metric: { metricName: 'sessions' },
            desc: true
          }
        ],
        limit: 50
      })

      const countries = {}
      const cities = []

      response.rows?.forEach(row => {
        const country = row.dimensionValues[0].value
        const city = row.dimensionValues[1].value
        const sessions = parseInt(row.metricValues[0].value)
        const users = parseInt(row.metricValues[1].value)

        if (!countries[country]) {
          countries[country] = { sessions: 0, users: 0 }
        }
        countries[country].sessions += sessions
        countries[country].users += users

        cities.push({
          country,
          city,
          sessions,
          users
        })
      })

      const totalSessions = Object.values(countries).reduce((sum, c) => sum + c.sessions, 0)
      
      const countriesArray = Object.entries(countries)
        .map(([country, data]) => ({
          country,
          sessions: data.sessions,
          users: data.users,
          percentage: ((data.sessions / totalSessions) * 100).toFixed(2)
        }))
        .sort((a, b) => b.sessions - a.sessions)

      return {
        countries: countriesArray,
        cities: cities.sort((a, b) => b.sessions - a.sessions),
        totalSessions
      }
    } catch (error) {
      console.error('❌ Error fetching geographic data:', error.message)
      throw error
    }
  }

  async getDeviceData() {
    console.log('📱 Fetching device data...')
    
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: this.startDate,
            endDate: this.endDate
          }
        ],
        dimensions: [
          { name: 'deviceCategory' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [
          {
            metric: { metricName: 'sessions' },
            desc: true
          }
        ]
      })

      const devices = response.rows?.map(row => {
        const sessions = parseInt(row.metricValues[0].value)
        const users = parseInt(row.metricValues[1].value)
        const avgSessionDuration = parseFloat(row.metricValues[2].value)
        const bounceRate = parseFloat(row.metricValues[3].value)

        return {
          device: row.dimensionValues[0].value,
          sessions,
          users,
          avgSessionDuration,
          bounceRate
        }
      }) || []

      const totalSessions = devices.reduce((sum, device) => sum + device.sessions, 0)
      
      const devicesWithPercentage = devices.map(device => ({
        ...device,
        percentage: ((device.sessions / totalSessions) * 100).toFixed(2)
      }))

      return {
        devices: devicesWithPercentage,
        totalSessions
      }
    } catch (error) {
      console.error('❌ Error fetching device data:', error.message)
      throw error
    }
  }

  async getEngagementMetrics() {
    console.log('📈 Fetching engagement metrics...')
    
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: this.startDate,
            endDate: this.endDate
          }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'screenPageViewsPerSession' }
        ]
      })

      const row = response.rows?.[0]
      if (!row) throw new Error('No engagement data found')

      return {
        totalSessions: parseInt(row.metricValues[0].value),
        activeUsers: parseInt(row.metricValues[1].value),
        newUsers: parseInt(row.metricValues[2].value),
        pageViews: parseInt(row.metricValues[3].value),
        avgSessionDuration: parseFloat(row.metricValues[4].value),
        bounceRate: parseFloat(row.metricValues[5].value),
        pagesPerSession: parseFloat(row.metricValues[6].value)
      }
    } catch (error) {
      console.error('❌ Error fetching engagement metrics:', error.message)
      throw error
    }
  }

  async runCompleteAnalysis() {
    console.log(`🚀 Starting June 1 - July 3, 2025 analysis (34 days)...`)
    console.log(`📅 Period: ${this.startDate} to ${this.endDate}`)
    
    await this.initializeClient()

    try {
      const [trafficSources, geographicData, deviceData, engagementMetrics] = await Promise.all([
        this.getTrafficSources(),
        this.getGeographicData(),
        this.getDeviceData(),
        this.getEngagementMetrics()
      ])

      const analysisData = {
        period: {
          startDate: this.startDate,
          endDate: this.endDate,
          days: 34,
          description: "June 1 - July 3, 2025 (34 days for apples-to-apples comparison)"
        },
        trafficSources,
        geographicData,
        deviceData,
        engagementMetrics,
        generatedAt: new Date().toISOString()
      }

      // Save to file
      const outputPath = 'analytics-june-july-2025-raw.json'
      fs.writeFileSync(outputPath, JSON.stringify(analysisData, null, 2))
      
      console.log(`✅ Analysis complete! Data saved to: ${outputPath}`)
      console.log(`📊 Total Sessions: ${engagementMetrics.totalSessions}`)
      console.log(`👥 Active Users: ${engagementMetrics.activeUsers}`)
      console.log(`🔍 Organic Traffic: ${trafficSources.summary.organic.sessions} (${trafficSources.summary.organic.percentage}%)`)
      console.log(`📱 Top Device: ${deviceData.devices[0]?.device} (${deviceData.devices[0]?.percentage}%)`)
      console.log(`🌍 Top Country: ${geographicData.countries[0]?.country} (${geographicData.countries[0]?.percentage}%)`)

      return analysisData
    } catch (error) {
      console.error('❌ Analysis failed:', error.message)
      throw error
    }
  }
}

// Run the analysis
if (require.main === module) {
  const analyzer = new JuneJuly2025Analyzer()
  analyzer.runCompleteAnalysis()
    .then(() => {
      console.log('🎉 June-July 2025 analysis completed successfully!')
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Analysis failed:', error.message)
      process.exit(1)
    })
}

module.exports = JuneJuly2025Analyzer
