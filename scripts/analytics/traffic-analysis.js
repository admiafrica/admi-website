/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * ADMI Website Traffic Analysis Script
 * Retrieves and analyzes Google Analytics data for specified date ranges
 */

class ADMITrafficAnalyzer {
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
        throw new Error(`
Service account credentials file not found at: ${credentialsPath}

Please follow these steps to set up Google Analytics API access:

1. Go to Google Cloud Console (https://console.cloud.google.com/)
2. Enable Google Analytics Data API
3. Create a service account: ga-analytics-service
4. Generate and download service account key as 'ga-service-account.json'
5. Place the file in the project root directory
6. Add the service account email to Google Analytics with Viewer permissions

Service account email format: ga-analytics-service@YOUR-PROJECT-ID.iam.gserviceaccount.com
        `)
      }

      this.client = new BetaAnalyticsDataClient({
        keyFilename: credentialsPath,
        projectId: JSON.parse(fs.readFileSync(credentialsPath, 'utf8')).project_id
      })

      console.log('✅ Google Analytics Data API client initialized successfully')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize Analytics client:', error.message)
      return false
    }
  }

  /**
   * Get traffic source data (source/medium breakdown)
   */
  async getTrafficSources() {
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
          { name: 'screenPageViews' },
          { name: 'userEngagementDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 100
      })

      return this.processTrafficSourceData(response)
    } catch (error) {
      console.error('Error fetching traffic source data:', error)
      throw error
    }
  }

  /**
   * Get geographic data with focus on Kenya and Africa
   */
  async getGeographicData() {
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
          { name: 'userEngagementDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 50
      })

      return this.processGeographicData(response)
    } catch (error) {
      console.error('Error fetching geographic data:', error)
      throw error
    }
  }

  /**
   * Get device category breakdown
   */
  async getDeviceData() {
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
          { name: 'userEngagementDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
      })

      return this.processDeviceData(response)
    } catch (error) {
      console.error('Error fetching device data:', error)
      throw error
    }
  }

  /**
   * Get monthly trends data
   */
  async getMonthlyTrends() {
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
          { name: 'yearMonth' },
          { name: 'sessionSource' },
          { name: 'sessionMedium' }
        ],
        metrics: [
          { name: 'sessions' }
        ],
        orderBys: [
          { dimension: { dimensionName: 'yearMonth' } },
          { metric: { metricName: 'sessions' }, desc: true }
        ],
        limit: 200
      })

      return this.processMonthlyTrends(response)
    } catch (error) {
      console.error('Error fetching monthly trends:', error)
      throw error
    }
  }

  /**
   * Get conversion data (enquiry form submissions)
   */
  async getConversionData() {
    try {
      // Get events related to form submissions and course enquiries
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
          { name: 'eventName' }
        ],
        metrics: [
          { name: 'eventCount' },
          { name: 'sessions' }
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: {
              matchType: 'CONTAINS',
              value: 'form'
            }
          }
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 100
      })

      return this.processConversionData(response)
    } catch (error) {
      console.error('Error fetching conversion data:', error)
      // Return empty data if conversion tracking is not set up
      return {
        conversionsBySource: [],
        totalConversions: 0,
        conversionRate: 0
      }
    }
  }

  /**
   * Process traffic source data
   */
  processTrafficSourceData(response) {
    const sources = []
    let totalSessions = 0

    response.rows?.forEach((row) => {
      const sessions = parseInt(row.metricValues[0].value)
      totalSessions += sessions

      sources.push({
        source: row.dimensionValues[0].value,
        medium: row.dimensionValues[1].value,
        campaign: row.dimensionValues[2].value,
        sessions: sessions,
        users: 0, // Will be calculated separately if needed
        pageviews: parseInt(row.metricValues[1].value),
        avgSessionDuration: parseFloat(row.metricValues[2].value) / 1000000, // Convert microseconds to seconds
        bounceRate: parseFloat(row.metricValues[3].value)
      })
    })

    // Calculate percentages
    sources.forEach((source) => {
      source.percentage = ((source.sessions / totalSessions) * 100).toFixed(2)
    })

    return {
      sources: sources.slice(0, 20), // Top 20 sources
      totalSessions,
      summary: this.generateSourceSummary(sources)
    }
  }

  /**
   * Process geographic data
   */
  processGeographicData(response) {
    const countries = []
    const africanCountries = []
    let totalSessions = 0

    response.rows?.forEach((row) => {
      const sessions = parseInt(row.metricValues[0].value)
      totalSessions += sessions

      const countryData = {
        country: row.dimensionValues[0].value,
        city: row.dimensionValues[1].value,
        sessions: sessions,
        users: 0, // Will be calculated separately if needed
        avgSessionDuration: parseFloat(row.metricValues[1].value) / 1000000, // Convert microseconds to seconds
        bounceRate: parseFloat(row.metricValues[2].value)
      }

      countries.push(countryData)

      // Identify African countries
      const africanCountryNames = [
        'Kenya', 'Nigeria', 'South Africa', 'Ghana', 'Uganda', 'Tanzania',
        'Rwanda', 'Ethiopia', 'Morocco', 'Egypt', 'Algeria', 'Tunisia',
        'Botswana', 'Zambia', 'Zimbabwe', 'Malawi', 'Mozambique'
      ]

      if (africanCountryNames.includes(countryData.country)) {
        africanCountries.push(countryData)
      }
    })

    return {
      allCountries: countries.slice(0, 20),
      africanCountries,
      totalSessions,
      kenyaData: countries.find((c) => c.country === 'Kenya') || null
    }
  }

  /**
   * Process device data
   */
  processDeviceData(response) {
    const devices = []
    let totalSessions = 0

    response.rows?.forEach((row) => {
      const sessions = parseInt(row.metricValues[0].value)
      totalSessions += sessions

      devices.push({
        device: row.dimensionValues[0].value,
        sessions: sessions,
        users: 0, // Will be calculated separately if needed
        avgSessionDuration: parseFloat(row.metricValues[1].value) / 1000000, // Convert microseconds to seconds
        bounceRate: parseFloat(row.metricValues[2].value)
      })
    })

    // Calculate percentages
    devices.forEach((device) => {
      device.percentage = ((device.sessions / totalSessions) * 100).toFixed(2)
    })

    return { devices, totalSessions }
  }

  /**
   * Process monthly trends
   */
  processMonthlyTrends(response) {
    const monthlyData = {}

    response.rows?.forEach((row) => {
      const month = row.dimensionValues[0].value
      const source = row.dimensionValues[1].value
      const medium = row.dimensionValues[2].value
      const sessions = parseInt(row.metricValues[0].value)

      if (!monthlyData[month]) {
        monthlyData[month] = {
          totalSessions: 0,
          sources: {}
        }
      }

      const sourceKey = `${source}/${medium}`
      monthlyData[month].totalSessions += sessions
      monthlyData[month].sources[sourceKey] = (monthlyData[month].sources[sourceKey] || 0) + sessions
    })

    return monthlyData
  }

  /**
   * Process conversion data
   */
  processConversionData(response) {
    const conversionsBySource = []
    let totalConversions = 0

    response.rows?.forEach((row) => {
      const conversions = parseInt(row.metricValues[0].value)
      totalConversions += conversions

      conversionsBySource.push({
        source: row.dimensionValues[0].value,
        medium: row.dimensionValues[1].value,
        eventName: row.dimensionValues[2].value,
        conversions: conversions,
        sessions: parseInt(row.metricValues[1].value)
      })
    })

    return {
      conversionsBySource,
      totalConversions,
      conversionRate: totalConversions > 0 ? (totalConversions / 1000 * 100).toFixed(2) : 0
    }
  }

  /**
   * Generate source summary
   */
  generateSourceSummary(sources) {
    const organicSessions = sources
      .filter((s) => s.medium === 'organic')
      .reduce((sum, s) => sum + s.sessions, 0)

    const directSessions = sources
      .filter((s) => s.source === 'direct' || s.medium === '(none)')
      .reduce((sum, s) => sum + s.sessions, 0)

    const socialSessions = sources
      .filter((s) => s.medium === 'social' || ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].includes(s.source.toLowerCase()))
      .reduce((sum, s) => sum + s.sessions, 0)

    const referralSessions = sources
      .filter((s) => s.medium === 'referral')
      .reduce((sum, s) => sum + s.sessions, 0)

    return {
      organic: organicSessions,
      direct: directSessions,
      social: socialSessions,
      referral: referralSessions
    }
  }

  /**
   * Run complete analysis
   */
  async runCompleteAnalysis() {
    console.log('🚀 Starting ADMI Website Traffic Analysis...')
    console.log(`📅 Analysis Period: ${this.startDate} to ${this.endDate}`)

    if (!(await this.initialize())) {
      return null
    }

    try {
      console.log('📊 Fetching traffic source data...')
      const trafficSources = await this.getTrafficSources()

      console.log('🌍 Fetching geographic data...')
      const geographicData = await this.getGeographicData()

      console.log('📱 Fetching device data...')
      const deviceData = await this.getDeviceData()

      console.log('📈 Fetching monthly trends...')
      const monthlyTrends = await this.getMonthlyTrends()

      console.log('🎯 Fetching conversion data...')
      const conversionData = await this.getConversionData()

      const analysisResults = {
        period: {
          startDate: this.startDate,
          endDate: this.endDate
        },
        trafficSources,
        geographicData,
        deviceData,
        monthlyTrends,
        conversionData,
        generatedAt: new Date().toISOString()
      }

      console.log('✅ Analysis complete!')
      return analysisResults
    } catch (error) {
      console.error('❌ Analysis failed:', error)
      throw error
    }
  }
}

// Export for use in other scripts
module.exports = ADMITrafficAnalyzer

// Run analysis if called directly
if (require.main === module) {
  const analyzer = new ADMITrafficAnalyzer()
  analyzer
    .runCompleteAnalysis()
    .then((results) => {
      if (results) {
        const outputPath = path.join(process.cwd(), 'analytics-data-raw.json')
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))
        console.log(`📄 Raw data saved to: ${outputPath}`)
      }
    })
    .catch((error) => {
      console.error('Script execution failed:', error)
      process.exit(1)
    })
}
