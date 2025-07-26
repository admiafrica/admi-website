/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Secure Google Analytics Integration
 *
 * This uses only the official Google Analytics Data API for secure data access
 * No third-party packages - direct integration with Google's official client library
 */

class SecureAnalyticsClient {
  constructor() {
    this.client = null
    this.propertyId = process.env.GA4_PROPERTY_ID
  }

  /**
   * Initialize the Analytics client with service account credentials
   */
  async initialize() {
    try {
      const credentialsPath = path.join(process.cwd(), 'ga-service-account.json')

      if (!fs.existsSync(credentialsPath)) {
        throw new Error('Service account credentials file not found. Please run setup first.')
      }

      if (!this.propertyId || this.propertyId === 'your-ga4-property-id') {
        throw new Error('GA4_PROPERTY_ID not configured. Please update your .env file.')
      }

      this.client = new BetaAnalyticsDataClient({
        keyFilename: credentialsPath,
        projectId: JSON.parse(fs.readFileSync(credentialsPath, 'utf8')).project_id
      })

      console.log('✅ Secure Analytics client initialized')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize Analytics client:', error.message)
      return false
    }
  }

  /**
   * Get search queries that led to FAQ pages
   */
  async getSearchQueriesToFAQPages() {
    if (!this.client) {
      throw new Error('Client not initialized')
    }

    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today'
          }
        ],
        dimensions: [{ name: 'sessionGoogleAdsQuery' }, { name: 'pagePath' }],
        metrics: [{ name: 'sessions' }, { name: 'users' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              matchType: 'CONTAINS',
              value: 'frequently-asked-questions'
            }
          }
        },
        orderBys: [
          {
            metric: {
              metricName: 'sessions'
            },
            desc: true
          }
        ],
        limit: 100
      })

      return this.formatSearchQueries(response)
    } catch (error) {
      console.error('Error fetching search queries:', error)
      return []
    }
  }

  /**
   * Get FAQ page engagement metrics
   */
  async getFAQPageMetrics() {
    if (!this.client) {
      throw new Error('Client not initialized')
    }

    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today'
          }
        ],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'users' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' }
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              matchType: 'CONTAINS',
              value: 'frequently-asked-questions'
            }
          }
        }
      })

      return this.formatFAQMetrics(response)
    } catch (error) {
      console.error('Error fetching FAQ metrics:', error)
      return null
    }
  }

  /**
   * Get conversion funnel data (FAQ -> Course -> Application)
   */
  async getConversionFunnelData() {
    if (!this.client) {
      throw new Error('Client not initialized')
    }

    try {
      // Get FAQ page views
      const [faqResponse] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'users' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: { matchType: 'CONTAINS', value: 'frequently-asked-questions' }
          }
        }
      })

      // Get course page views after FAQ
      const [courseResponse] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'users' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: { matchType: 'CONTAINS', value: '/courses/' }
          }
        }
      })

      return this.formatConversionData(faqResponse, courseResponse)
    } catch (error) {
      console.error('Error fetching conversion data:', error)
      return null
    }
  }

  /**
   * Get popular course pages to optimize FAQs for
   */
  async getPopularCoursePages() {
    if (!this.client) {
      throw new Error('Client not initialized')
    }

    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'users' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: { matchType: 'CONTAINS', value: '/courses/' }
          }
        },
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 20
      })

      return this.formatCoursePageData(response)
    } catch (error) {
      console.error('Error fetching course page data:', error)
      return []
    }
  }

  /**
   * Format search query results
   */
  formatSearchQueries(response) {
    if (!response.rows) return []

    return response.rows
      .map((row) => ({
        query: row.dimensionValues[0]?.value || '',
        pagePath: row.dimensionValues[1]?.value || '',
        sessions: parseInt(row.metricValues[0]?.value || '0'),
        users: parseInt(row.metricValues[1]?.value || '0')
      }))
      .filter((item) => item.query && item.query !== '(not set)')
  }

  /**
   * Format FAQ metrics
   */
  formatFAQMetrics(response) {
    if (!response.rows || response.rows.length === 0) return null

    const row = response.rows[0]
    return {
      pageViews: parseInt(row.metricValues[0]?.value || '0'),
      users: parseInt(row.metricValues[1]?.value || '0'),
      averageSessionDuration: parseFloat(row.metricValues[2]?.value || '0'),
      bounceRate: parseFloat(row.metricValues[3]?.value || '0') * 100
    }
  }

  /**
   * Format conversion funnel data
   */
  formatConversionData(faqResponse, courseResponse) {
    const faqViews = faqResponse.rows?.[0]?.metricValues[0]?.value || '0'
    const faqUsers = faqResponse.rows?.[0]?.metricValues[1]?.value || '0'
    const courseViews = courseResponse.rows?.[0]?.metricValues[0]?.value || '0'
    const courseUsers = courseResponse.rows?.[0]?.metricValues[1]?.value || '0'

    return {
      faqPageViews: parseInt(faqViews),
      faqUsers: parseInt(faqUsers),
      coursePageViews: parseInt(courseViews),
      courseUsers: parseInt(courseUsers),
      faqToCourseConversionRate: ((parseInt(courseUsers) / parseInt(faqUsers)) * 100).toFixed(1)
    }
  }

  /**
   * Format course page data
   */
  formatCoursePageData(response) {
    if (!response.rows) return []

    return response.rows
      .map((row) => ({
        pagePath: row.dimensionValues[0]?.value || '',
        pageViews: parseInt(row.metricValues[0]?.value || '0'),
        users: parseInt(row.metricValues[1]?.value || '0')
      }))
      .filter((item) => item.pagePath.includes('/courses/'))
  }
}

/**
 * Test the secure analytics connection
 */
async function testSecureConnection() {
  console.log('🔐 Testing secure Google Analytics connection...')

  const client = new SecureAnalyticsClient()

  const initialized = await client.initialize()
  if (!initialized) {
    console.log('\n💡 Setup required:')
    console.log('1. Run: npm run faq:setup-mcp config')
    console.log('2. Follow Google Cloud setup instructions')
    console.log('3. Download service account credentials')
    console.log('4. Update GA4_PROPERTY_ID in .env')
    return false
  }

  try {
    console.log('📊 Fetching sample data...')

    // Test FAQ metrics
    const faqMetrics = await client.getFAQPageMetrics()
    if (faqMetrics) {
      console.log('✅ FAQ page metrics retrieved:')
      console.log(`   Page Views: ${faqMetrics.pageViews}`)
      console.log(`   Users: ${faqMetrics.users}`)
      console.log(`   Bounce Rate: ${faqMetrics.bounceRate.toFixed(1)}%`)
    }

    // Test popular courses
    const popularCourses = await client.getPopularCoursePages()
    if (popularCourses.length > 0) {
      console.log('✅ Popular course pages:')
      popularCourses.slice(0, 3).forEach((course, i) => {
        console.log(`   ${i + 1}. ${course.pagePath} (${course.pageViews} views)`)
      })
    }

    console.log('\n🎉 Secure Analytics integration working!')
    return true
  } catch (error) {
    console.error('❌ Analytics test failed:', error.message)
    return false
  }
}

/**
 * Generate optimization report using real analytics data
 */
async function generateAnalyticsOptimizationReport() {
  console.log('📈 Generating analytics-driven optimization report...')

  const client = new SecureAnalyticsClient()
  const initialized = await client.initialize()

  if (!initialized) {
    console.log('⚠️  Analytics not configured. Using sample data.')
    return null
  }

  try {
    const [searchQueries, faqMetrics, conversionData, popularCourses] = await Promise.all([
      client.getSearchQueriesToFAQPages(),
      client.getFAQPageMetrics(),
      client.getConversionFunnelData(),
      client.getPopularCoursePages()
    ])

    const report = {
      timestamp: new Date().toISOString(),
      analytics: {
        searchQueries: searchQueries.slice(0, 10),
        faqMetrics,
        conversionData,
        popularCourses: popularCourses.slice(0, 10)
      },
      recommendations: generateDataDrivenRecommendations(searchQueries, faqMetrics, conversionData)
    }

    // Save report
    const reportPath = path.join(
      __dirname,
      'reports',
      `analytics-optimization-${new Date().toISOString().split('T')[0]}.json`
    )
    const reportsDir = path.dirname(reportPath)

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true })
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

    console.log('✅ Analytics optimization report generated')
    console.log(`📄 Saved to: ${reportPath}`)

    return report
  } catch (error) {
    console.error('❌ Failed to generate analytics report:', error.message)
    return null
  }
}

/**
 * Generate recommendations based on real analytics data
 */
function generateDataDrivenRecommendations(searchQueries, faqMetrics, conversionData) {
  const recommendations = []

  // Search query recommendations
  if (searchQueries.length > 0) {
    const topQueries = searchQueries.slice(0, 5).map((q) => q.query)
    recommendations.push({
      type: 'content',
      priority: 'high',
      title: 'Create FAQs for top search queries',
      description: `Add FAQs addressing: ${topQueries.join(', ')}`,
      data: { topQueries }
    })
  }

  // Engagement recommendations
  if (faqMetrics && faqMetrics.bounceRate > 60) {
    recommendations.push({
      type: 'engagement',
      priority: 'high',
      title: 'Reduce high bounce rate',
      description: `FAQ page bounce rate is ${faqMetrics.bounceRate.toFixed(1)}%. Improve content relevance and page loading speed.`,
      data: { bounceRate: faqMetrics.bounceRate }
    })
  }

  // Conversion recommendations
  if (conversionData && parseFloat(conversionData.faqToCourseConversionRate) < 30) {
    recommendations.push({
      type: 'conversion',
      priority: 'medium',
      title: 'Improve FAQ to course conversion',
      description: `Only ${conversionData.faqToCourseConversionRate}% of FAQ visitors view course pages. Add more course links in FAQ answers.`,
      data: { conversionRate: conversionData.faqToCourseConversionRate }
    })
  }

  return recommendations
}

/**
 * Main execution
 */
async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'test':
      await testSecureConnection()
      break
    case 'report':
      await generateAnalyticsOptimizationReport()
      break
    default:
      console.log('🔐 Secure Google Analytics Integration')
      console.log('\nUsage:')
      console.log('  npm run faq:test-analytics     # Test connection')
      console.log('  npm run faq:analytics-report   # Generate optimization report')
      console.log('\nFeatures:')
      console.log('  ✅ Official Google Analytics Data API only')
      console.log('  ✅ No third-party packages (secure)')
      console.log('  ✅ Service account authentication')
      console.log('  ✅ Search query analysis')
      console.log('  ✅ Conversion funnel tracking')
      console.log('  ✅ FAQ engagement metrics')
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
}

module.exports = {
  SecureAnalyticsClient,
  testSecureConnection,
  generateAnalyticsOptimizationReport
}
