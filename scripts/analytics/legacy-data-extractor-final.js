/* eslint-disable @typescript-eslint/no-var-requires */
const { google } = require('googleapis')
const fs = require('fs')
require('dotenv').config()

/**
 * Final Attempt: Legacy Universal Analytics Data Extractor
 * Account Found: ADMI Africa (ID: 60106678)
 * Status: Universal Analytics deprecated, but attempting data extraction
 */

class FinalLegacyExtractor {
  constructor() {
    this.auth = null
    this.analytics = null
    this.analyticsReporting = null
    this.accountId = '60106678' // ADMI Africa account found
  }

  async initializeAuth() {
    try {
      this.auth = new google.auth.GoogleAuth({
        keyFile: 'ga-service-account.json',
        scopes: [
          'https://www.googleapis.com/auth/analytics.readonly',
          'https://www.googleapis.com/auth/analytics.manage.users.readonly',
          'https://www.googleapis.com/auth/analytics'
        ]
      })

      const authClient = await this.auth.getClient()
      
      this.analytics = google.analytics({
        version: 'v3',
        auth: authClient
      })

      this.analyticsReporting = google.analyticsreporting({
        version: 'v4',
        auth: authClient
      })

      console.log('✅ Authentication initialized for ADMI Africa account')
      return true
    } catch (error) {
      console.error('❌ Auth failed:', error.message)
      return false
    }
  }

  async tryDirectPropertyAccess() {
    console.log('🔍 Attempting direct property access methods...')
    
    // Common ADMI property IDs to try (educated guesses)
    const possiblePropertyIds = [
      'UA-60106678-1',
      'UA-60106678-2', 
      'UA-60106678-3',
      'UA-60106678-4',
      'UA-60106678-5'
    ]

    const possibleViewIds = [
      '123456789',
      '987654321',
      '111111111',
      '222222222'
    ]

    console.log('🧪 Testing common property ID patterns...')
    
    for (const propertyId of possiblePropertyIds) {
      try {
        console.log(`   Testing property: ${propertyId}`)
        
        // Try to get property info
        const property = await this.analytics.management.webproperties.get({
          accountId: this.accountId,
          webPropertyId: propertyId
        })
        
        if (property.data) {
          console.log(`   ✅ Found property: ${property.data.name}`)
          console.log(`      URL: ${property.data.websiteUrl}`)
          console.log(`      Created: ${property.data.created}`)
          
          // Try to get views for this property
          const views = await this.analytics.management.profiles.list({
            accountId: this.accountId,
            webPropertyId: propertyId
          })
          
          if (views.data.items && views.data.items.length > 0) {
            console.log(`      Views found: ${views.data.items.length}`)
            
            for (const view of views.data.items) {
              console.log(`        - ${view.name} (ID: ${view.id})`)
              
              // Try to get data from this view
              const testResult = await this.testDataAccess(view.id, '2017-01-01', '2024-12-31')
              if (testResult.success) {
                return {
                  propertyId,
                  viewId: view.id,
                  viewName: view.name,
                  data: testResult
                }
              }
            }
          }
        }
      } catch (error) {
        // Expected for most attempts
        if (!error.message.includes('does not exist')) {
          console.log(`   ⚠️  ${propertyId}: ${error.message}`)
        }
      }
    }

    console.log('🧪 Testing common view ID patterns...')
    
    // Try direct view ID access
    for (const viewId of possibleViewIds) {
      try {
        console.log(`   Testing view ID: ${viewId}`)
        const testResult = await this.testDataAccess(viewId, '2017-01-01', '2024-12-31')
        if (testResult.success) {
          return {
            viewId,
            data: testResult
          }
        }
      } catch (error) {
        // Expected for most attempts
      }
    }

    return null
  }

  async testDataAccess(viewId, startDate, endDate) {
    try {
      const response = await this.analyticsReporting.reports.batchGet({
        requestBody: {
          reportRequests: [{
            viewId: viewId,
            dateRanges: [{ startDate, endDate }],
            metrics: [
              { expression: 'ga:sessions' },
              { expression: 'ga:users' },
              { expression: 'ga:pageviews' }
            ],
            dimensions: [
              { name: 'ga:year' }
            ],
            orderBys: [
              { fieldName: 'ga:year', sortOrder: 'ASCENDING' }
            ]
          }]
        }
      })

      const report = response.data.reports[0]
      
      if (report.data && report.data.rows && report.data.rows.length > 0) {
        let totalSessions = 0
        const yearlyData = []
        
        report.data.rows.forEach(row => {
          const year = row.dimensions[0]
          const sessions = parseInt(row.metrics[0].values[0])
          const users = parseInt(row.metrics[0].values[1])
          const pageviews = parseInt(row.metrics[0].values[2])
          
          totalSessions += sessions
          yearlyData.push({ year, sessions, users, pageviews })
        })
        
        console.log(`      ✅ Data found! Total sessions: ${totalSessions.toLocaleString()}`)
        
        return {
          success: true,
          totalSessions,
          yearlyData,
          dateRange: { startDate, endDate }
        }
      }
      
      return { success: false, error: 'No data found' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async getDetailedHistoricalData(viewId) {
    console.log(`📊 Extracting detailed historical data from view: ${viewId}`)
    
    const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
    const historicalData = {}
    
    for (const year of years) {
      console.log(`   Extracting ${year} data...`)
      
      try {
        // Get comprehensive data for each year
        const response = await this.analyticsReporting.reports.batchGet({
          requestBody: {
            reportRequests: [{
              viewId: viewId,
              dateRanges: [{ 
                startDate: `${year}-01-01`, 
                endDate: `${year}-12-31` 
              }],
              metrics: [
                { expression: 'ga:sessions' },
                { expression: 'ga:users' },
                { expression: 'ga:newUsers' },
                { expression: 'ga:pageviews' },
                { expression: 'ga:bounceRate' },
                { expression: 'ga:avgSessionDuration' },
                { expression: 'ga:pageviewsPerSession' }
              ],
              dimensions: [
                { name: 'ga:source' },
                { name: 'ga:medium' }
              ],
              orderBys: [
                { metric: { metricName: 'ga:sessions' }, desc: true }
              ],
              pageSize: 100
            }]
          }
        })

        const report = response.data.reports[0]
        
        if (report.data && report.data.rows) {
          // Process traffic sources
          const sources = report.data.rows.map(row => ({
            source: row.dimensionValues[0].value,
            medium: row.dimensionValues[1].value,
            sessions: parseInt(row.metricValues[0].values[0]),
            users: parseInt(row.metricValues[0].values[1]),
            newUsers: parseInt(row.metricValues[0].values[2]),
            pageviews: parseInt(row.metricValues[0].values[3]),
            bounceRate: parseFloat(row.metricValues[0].values[4]),
            avgSessionDuration: parseFloat(row.metricValues[0].values[5]),
            pageviewsPerSession: parseFloat(row.metricValues[0].values[6])
          }))

          const totalSessions = sources.reduce((sum, s) => sum + s.sessions, 0)
          
          // Categorize traffic
          const organicSessions = sources.filter(s => s.medium === 'organic').reduce((sum, s) => sum + s.sessions, 0)
          const directSessions = sources.filter(s => s.source === '(direct)' && s.medium === '(none)').reduce((sum, s) => sum + s.sessions, 0)
          const paidSessions = sources.filter(s => ['cpc', 'ppc', 'adwords'].includes(s.medium)).reduce((sum, s) => sum + s.sessions, 0)
          const socialSessions = sources.filter(s => s.medium === 'social').reduce((sum, s) => sum + s.sessions, 0)
          const referralSessions = sources.filter(s => s.medium === 'referral').reduce((sum, s) => sum + s.sessions, 0)

          historicalData[year] = {
            year: parseInt(year),
            totalSessions,
            totalUsers: sources.reduce((sum, s) => sum + s.users, 0),
            totalPageviews: sources.reduce((sum, s) => sum + s.pageviews, 0),
            avgBounceRate: sources.reduce((sum, s) => sum + (s.bounceRate * s.sessions), 0) / totalSessions,
            avgSessionDuration: sources.reduce((sum, s) => sum + (s.avgSessionDuration * s.sessions), 0) / totalSessions,
            trafficSources: {
              organic: { sessions: organicSessions, percentage: ((organicSessions / totalSessions) * 100).toFixed(2) },
              direct: { sessions: directSessions, percentage: ((directSessions / totalSessions) * 100).toFixed(2) },
              paid: { sessions: paidSessions, percentage: ((paidSessions / totalSessions) * 100).toFixed(2) },
              social: { sessions: socialSessions, percentage: ((socialSessions / totalSessions) * 100).toFixed(2) },
              referral: { sessions: referralSessions, percentage: ((referralSessions / totalSessions) * 100).toFixed(2) }
            },
            topSources: sources.slice(0, 10),
            dailyAverage: Math.round(totalSessions / 365)
          }
          
          console.log(`      ✅ ${year}: ${totalSessions.toLocaleString()} sessions, ${((organicSessions / totalSessions) * 100).toFixed(1)}% organic`)
        } else {
          console.log(`      ❌ ${year}: No data found`)
          historicalData[year] = { year: parseInt(year), hasData: false }
        }
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (error) {
        console.log(`      ❌ ${year}: Error - ${error.message}`)
        historicalData[year] = { year: parseInt(year), hasData: false, error: error.message }
      }
    }
    
    return historicalData
  }

  async runFinalExtraction() {
    console.log('🚀 Final Legacy Data Extraction Attempt')
    console.log('Account: ADMI Africa (ID: 60106678)')
    console.log('Status: Universal Analytics deprecated, attempting data recovery\n')
    
    const authSuccess = await this.initializeAuth()
    if (!authSuccess) {
      return null
    }

    // Try to find accessible properties/views
    const accessResult = await this.tryDirectPropertyAccess()
    
    if (!accessResult) {
      console.log('\n❌ No accessible Universal Analytics data found')
      console.log('\n💡 Recommendations:')
      console.log('1. Check if you have manual export files from before July 2023')
      console.log('2. Try Google Takeout for historical analytics data')
      console.log('3. Contact previous ADMI team members who may have exported data')
      console.log('4. Focus recovery strategy on 2024-2025 comparison')
      return null
    }

    console.log('\n🎉 Found accessible legacy data!')
    
    // Extract detailed historical data
    const historicalData = await this.getDetailedHistoricalData(accessResult.viewId)
    
    // Compile final results
    const finalResults = {
      generatedAt: new Date().toISOString(),
      account: 'ADMI Africa (60106678)',
      accessMethod: 'Direct view access',
      viewId: accessResult.viewId,
      viewName: accessResult.viewName || 'Unknown',
      propertyId: accessResult.propertyId || 'Unknown',
      historicalData,
      summary: this.generateSummary(historicalData)
    }

    // Save results
    fs.writeFileSync('admi-legacy-analytics-2017-2024.json', JSON.stringify(finalResults, null, 2))
    console.log('\n✅ Legacy data saved to: admi-legacy-analytics-2017-2024.json')
    
    return finalResults
  }

  generateSummary(historicalData) {
    const validYears = Object.keys(historicalData).filter(year => 
      historicalData[year].hasData !== false && historicalData[year].totalSessions > 0
    )
    
    if (validYears.length === 0) {
      return { error: 'No valid historical data found' }
    }

    const peakYear = validYears.reduce((peak, year) => 
      historicalData[year].totalSessions > historicalData[peak].totalSessions ? year : peak
    )

    const totalSessions = validYears.reduce((sum, year) => sum + historicalData[year].totalSessions, 0)
    
    return {
      dataYears: validYears.map(y => parseInt(y)),
      peakYear: parseInt(peakYear),
      peakSessions: historicalData[peakYear].totalSessions,
      totalHistoricalSessions: totalSessions,
      averageYearlySessions: Math.round(totalSessions / validYears.length),
      organicTrend: validYears.map(year => ({
        year: parseInt(year),
        organicPercentage: parseFloat(historicalData[year].trafficSources.organic.percentage)
      }))
    }
  }
}

// Run the final extraction
if (require.main === module) {
  const extractor = new FinalLegacyExtractor()
  extractor.runFinalExtraction()
    .then((results) => {
      if (results) {
        console.log('\n🎉 Legacy data extraction completed successfully!')
        console.log(`Found data for years: ${results.summary.dataYears.join(', ')}`)
        console.log(`Peak year: ${results.summary.peakYear} with ${results.summary.peakSessions.toLocaleString()} sessions`)
      } else {
        console.log('\n❌ Legacy data extraction completed with no results')
        console.log('Universal Analytics data appears to be permanently inaccessible')
      }
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Legacy data extraction failed:', error.message)
      process.exit(1)
    })
}

module.exports = FinalLegacyExtractor
