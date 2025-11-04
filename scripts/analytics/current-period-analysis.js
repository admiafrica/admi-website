/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Current Period Analytics Analysis
 * Fetches data from October 1, 2025 to today for comparison
 */

class CurrentPeriodAnalyzer {
  constructor() {
    this.client = null
    this.propertyId = process.env.GA4_PROPERTY_ID || '250948607'
    this.startDate = '2025-10-01'
    this.endDate = 'today'
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
   * Get current period traffic sources
   */
  async getCurrentTrafficSources() {
    try {
      console.log('📊 Fetching current period traffic sources...')

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
        limit: 20
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
   * Get current period geographic data
   */
  async getCurrentGeographicData() {
    try {
      console.log('🌍 Fetching current period geographic data...')

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
   * Get current period device data
   */
  async getCurrentDeviceData() {
    try {
      console.log('📱 Fetching current period device data...')

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
   * Get daily trends for current period
   */
  async getCurrentDailyTrends() {
    try {
      console.log('📈 Fetching current period daily trends...')

      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: this.startDate, endDate: this.endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'userEngagementDuration' }
        ],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }]
      })

      const dailyData = response.rows?.map(row => ({
        date: row.dimensionValues[0].value,
        sessions: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
        pageviews: parseInt(row.metricValues[2].value),
        avgSessionDuration: parseFloat(row.metricValues[3].value)
      })) || []

      return {
        dailyData,
        totalDays: dailyData.length,
        averageSessionsPerDay: dailyData.length > 0 ? 
          Math.round(dailyData.reduce((sum, day) => sum + day.sessions, 0) / dailyData.length) : 0
      }
    } catch (error) {
      console.error('❌ Error fetching daily trends:', error.message)
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
   * Run complete current period analysis
   */
  async runCompleteAnalysis() {
    console.log('🚀 Starting Current Period Analysis (Oct 1, 2025 - Today)')
    console.log('=' .repeat(60))

    const initialized = await this.initialize()
    if (!initialized) {
      return null
    }

    try {
      const [trafficSources, geographicData, deviceData, dailyTrends] = await Promise.all([
        this.getCurrentTrafficSources(),
        this.getCurrentGeographicData(),
        this.getCurrentDeviceData(),
        this.getCurrentDailyTrends()
      ])

      const analysisData = {
        period: {
          startDate: this.startDate,
          endDate: this.endDate,
          description: 'October 1, 2025 to November 3, 2025'
        },
        trafficSources,
        geographicData,
        deviceData,
        dailyTrends,
        generatedAt: new Date().toISOString()
      }

      console.log('\n✅ Current Period Analysis Complete')
      console.log(`📊 Total Sessions: ${trafficSources?.totalSessions || 0}`)
      console.log(`👥 Top Traffic Source: ${trafficSources?.sources[0]?.source}/${trafficSources?.sources[0]?.medium}`)
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
  const analyzer = new CurrentPeriodAnalyzer()
  analyzer.runCompleteAnalysis()
    .then(data => {
      if (data) {
        const outputPath = path.join(process.cwd(), 'analytics-current-period-raw.json')
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
        console.log(`\n💾 Current period data saved: ${outputPath}`)
      }
    })
    .catch(error => {
      console.error('❌ Failed to run analysis:', error.message)
      process.exit(1)
    })
}

module.exports = { CurrentPeriodAnalyzer }
