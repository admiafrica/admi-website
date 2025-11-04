/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * June-September 2025 Analytics Analysis
 * Fetches the specific period data that matches the dashboard screenshot
 */

class JuneSeptember2025Analyzer {
  constructor() {
    this.client = null
    this.propertyId = process.env.GA4_PROPERTY_ID || '250948607'
    this.startDate = '2025-06-01'
    this.endDate = '2025-09-30'
  }

  /**
   * Initialize the Analytics client
   */
  async initialize() {
    try {
      const credentialsPath = path.join(process.cwd(), 'ga-service-account.json')

      if (!fs.existsSync(credentialsPath)) {
        throw new Error(`Service account credentials file not found at: ${credentialsPath}`)
      }

      this.client = new BetaAnalyticsDataClient({
        keyFilename: credentialsPath
      })

      console.log('✅ Google Analytics client initialized')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize Analytics client:', error.message)
      return false
    }
  }

  /**
   * Get June-September 2025 traffic sources
   */
  async getTrafficSources() {
    try {
      console.log('📊 Fetching June-September 2025 traffic sources...')

      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: this.startDate, endDate: this.endDate }],
        dimensions: [
          { name: 'sessionSource' },
          { name: 'sessionMedium' },
          { name: 'sessionCampaignName' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'userEngagementDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 25
      })

      const sources = response.rows?.map(row => ({
        source: row.dimensionValues[0].value,
        medium: row.dimensionValues[1].value,
        campaign: row.dimensionValues[2].value,
        sessions: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
        pageviews: parseInt(row.metricValues[2].value),
        avgSessionDuration: parseFloat(row.metricValues[3].value),
        bounceRate: parseFloat(row.metricValues[4].value)
      })) || []

      const totalSessions = sources.reduce((sum, source) => sum + source.sessions, 0)

      // Add percentage
      sources.forEach(source => {
        source.percentage = ((source.sessions / totalSessions) * 100).toFixed(2)
      })

      return {
        sources,
        totalSessions,
        summary: this.categorizeTrafficSources(sources)
      }
    } catch (error) {
      console.error('❌ Error fetching traffic sources:', error.message)
      return null
    }
  }

  /**
   * Get June-September 2025 geographic data
   */
  async getGeographicData() {
    try {
      console.log('🌍 Fetching June-September 2025 geographic data...')

      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: this.startDate, endDate: this.endDate }],
        dimensions: [
          { name: 'country' },
          { name: 'city' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'userEngagementDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 25
      })

      const countries = response.rows?.map(row => ({
        country: row.dimensionValues[0].value,
        city: row.dimensionValues[1].value,
        sessions: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
        avgSessionDuration: parseFloat(row.metricValues[2].value),
        bounceRate: parseFloat(row.metricValues[3].value)
      })) || []

      const totalSessions = countries.reduce((sum, country) => sum + country.sessions, 0)

      // Add percentage
      countries.forEach(country => {
        country.percentage = ((country.sessions / totalSessions) * 100).toFixed(2)
      })

      return {
        countries,
        totalSessions,
        kenyaData: countries.find(c => c.country === 'Kenya') || null
      }
    } catch (error) {
      console.error('❌ Error fetching geographic data:', error.message)
      return null
    }
  }

  /**
   * Get June-September 2025 device data
   */
  async getDeviceData() {
    try {
      console.log('📱 Fetching June-September 2025 device data...')

      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: this.startDate, endDate: this.endDate }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'userEngagementDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
      })

      const devices = response.rows?.map(row => ({
        device: row.dimensionValues[0].value,
        sessions: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
        avgSessionDuration: parseFloat(row.metricValues[2].value),
        bounceRate: parseFloat(row.metricValues[3].value)
      })) || []

      const totalSessions = devices.reduce((sum, device) => sum + device.sessions, 0)

      // Add percentage
      devices.forEach(device => {
        device.percentage = ((device.sessions / totalSessions) * 100).toFixed(2)
      })

      return {
        devices,
        totalSessions
      }
    } catch (error) {
      console.error('❌ Error fetching device data:', error.message)
      return null
    }
  }

  /**
   * Get monthly trends for June-September 2025
   */
  async getMonthlyTrends() {
    try {
      console.log('📈 Fetching June-September 2025 monthly trends...')

      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: this.startDate, endDate: this.endDate }],
        dimensions: [
          { name: 'yearMonth' },
          { name: 'sessionSource' },
          { name: 'sessionMedium' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' }
        ],
        orderBys: [
          { dimension: { dimensionName: 'yearMonth' }, desc: false },
          { metric: { metricName: 'sessions' }, desc: true }
        ]
      })

      const monthlyData = {}
      
      response.rows?.forEach(row => {
        const month = row.dimensionValues[0].value
        const source = row.dimensionValues[1].value
        const medium = row.dimensionValues[2].value
        const sessions = parseInt(row.metricValues[0].value)
        const users = parseInt(row.metricValues[1].value)
        const pageviews = parseInt(row.metricValues[2].value)

        if (!monthlyData[month]) {
          monthlyData[month] = {
            totalSessions: 0,
            totalUsers: 0,
            totalPageviews: 0,
            sources: {}
          }
        }

        monthlyData[month].totalSessions += sessions
        monthlyData[month].totalUsers += users
        monthlyData[month].totalPageviews += pageviews

        const sourceKey = `${source}/${medium}`
        if (!monthlyData[month].sources[sourceKey]) {
          monthlyData[month].sources[sourceKey] = 0
        }
        monthlyData[month].sources[sourceKey] += sessions
      })

      return monthlyData
    } catch (error) {
      console.error('❌ Error fetching monthly trends:', error.message)
      return null
    }
  }

  /**
   * Categorize traffic sources
   */
  categorizeTrafficSources(sources) {
    let organic = 0, direct = 0, social = 0, paid = 0, referral = 0

    sources.forEach(source => {
      if (source.medium === 'organic') {
        organic += source.sessions
      } else if (source.medium === '(none)' || source.source === '(direct)') {
        direct += source.sessions
      } else if (source.medium === 'social' || source.source.includes('facebook') || source.source.includes('instagram')) {
        social += source.sessions
      } else if (source.medium === 'cpc' || source.medium === 'ppc' || source.medium === 'adwords') {
        paid += source.sessions
      } else {
        referral += source.sessions
      }
    })

    const total = organic + direct + social + paid + referral

    return {
      organic: { sessions: organic, percentage: ((organic / total) * 100).toFixed(2) },
      direct: { sessions: direct, percentage: ((direct / total) * 100).toFixed(2) },
      social: { sessions: social, percentage: ((social / total) * 100).toFixed(2) },
      paid: { sessions: paid, percentage: ((paid / total) * 100).toFixed(2) },
      referral: { sessions: referral, percentage: ((referral / total) * 100).toFixed(2) }
    }
  }

  /**
   * Run complete June-September 2025 analysis
   */
  async runCompleteAnalysis() {
    console.log('🚀 Starting June-September 2025 Analysis')
    console.log('=' .repeat(60))

    const initialized = await this.initialize()
    if (!initialized) {
      return null
    }

    try {
      const [trafficSources, geographicData, deviceData, monthlyTrends] = await Promise.all([
        this.getTrafficSources(),
        this.getGeographicData(),
        this.getDeviceData(),
        this.getMonthlyTrends()
      ])

      const analysisData = {
        period: {
          startDate: this.startDate,
          endDate: this.endDate,
          description: 'June 1 - September 30, 2025'
        },
        trafficSources,
        geographicData,
        deviceData,
        monthlyTrends,
        generatedAt: new Date().toISOString()
      }

      console.log('\n✅ June-September 2025 Analysis Complete')
      console.log(`📊 Total Sessions: ${trafficSources?.totalSessions || 0}`)
      console.log(`👥 Total Users: ${trafficSources?.sources.reduce((sum, s) => sum + s.users, 0) || 0}`)
      console.log(`🌍 Top Country: ${geographicData?.countries[0]?.country}`)
      console.log(`📱 Mobile Sessions: ${deviceData?.devices.find(d => d.device === 'mobile')?.percentage || 0}%`)

      return analysisData
    } catch (error) {
      console.error('❌ Analysis failed:', error.message)
      return null
    }
  }
}

// Run if called directly
if (require.main === module) {
  const analyzer = new JuneSeptember2025Analyzer()
  analyzer.runCompleteAnalysis()
    .then(data => {
      if (data) {
        const outputPath = path.join(process.cwd(), 'analytics-june-september-2025-raw.json')
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
        console.log(`\n💾 June-September 2025 data saved: ${outputPath}`)
      }
    })
    .catch(error => {
      console.error('❌ Failed to run analysis:', error.message)
      process.exit(1)
    })
}

module.exports = { JuneSeptember2025Analyzer }
