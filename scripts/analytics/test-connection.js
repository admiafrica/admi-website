/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const path = require('path')
require('dotenv').config()

/**
 * Test Google Analytics API connection and debug issues
 */

async function testConnection() {
  console.log('🔍 Testing Google Analytics API Connection...')
  
  try {
    const credentialsPath = path.join(process.cwd(), 'ga-service-account.json')
    const propertyId = process.env.GA4_PROPERTY_ID || '250948607'
    
    console.log(`📊 Property ID: ${propertyId}`)
    console.log(`🔑 Credentials: ${credentialsPath}`)
    
    const client = new BetaAnalyticsDataClient({
      keyFilename: credentialsPath
    })
    
    console.log('✅ Client initialized successfully')
    
    // Test 1: Simple query with basic dimensions and metrics
    console.log('\n🧪 Test 1: Basic query...')
    try {
      const [response] = await client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '2025-06-01',
            endDate: '2025-09-30'
          }
        ],
        dimensions: [
          { name: 'date' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'users' }
        ],
        limit: 10
      })
      
      console.log('✅ Basic query successful')
      console.log(`📈 Total rows returned: ${response.rows?.length || 0}`)
      
      if (response.rows && response.rows.length > 0) {
        console.log('📊 Sample data:')
        response.rows.slice(0, 3).forEach((row, index) => {
          console.log(`   ${index + 1}. Date: ${row.dimensionValues[0].value}, Sessions: ${row.metricValues[0].value}, Users: ${row.metricValues[1].value}`)
        })
      }
      
    } catch (error) {
      console.error('❌ Basic query failed:', error.message)
      return false
    }
    
    // Test 2: Traffic source query
    console.log('\n🧪 Test 2: Traffic source query...')
    try {
      const [response] = await client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '2025-06-01',
            endDate: '2025-09-30'
          }
        ],
        dimensions: [
          { name: 'sessionSource' },
          { name: 'sessionMedium' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'users' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10
      })
      
      console.log('✅ Traffic source query successful')
      console.log(`📈 Total sources: ${response.rows?.length || 0}`)
      
      if (response.rows && response.rows.length > 0) {
        console.log('🚦 Top traffic sources:')
        response.rows.slice(0, 5).forEach((row, index) => {
          console.log(`   ${index + 1}. ${row.dimensionValues[0].value}/${row.dimensionValues[1].value}: ${row.metricValues[0].value} sessions`)
        })
      }
      
    } catch (error) {
      console.error('❌ Traffic source query failed:', error.message)
      console.error('🔍 This might be due to invalid dimension names')
      return false
    }
    
    // Test 3: Check available dimensions and metrics
    console.log('\n🧪 Test 3: Getting metadata...')
    try {
      const [metadata] = await client.getMetadata({
        name: `properties/${propertyId}/metadata`
      })
      
      console.log('✅ Metadata retrieved successfully')
      console.log(`📊 Available dimensions: ${metadata.dimensions?.length || 0}`)
      console.log(`📈 Available metrics: ${metadata.metrics?.length || 0}`)
      
      // Show some available dimensions
      if (metadata.dimensions && metadata.dimensions.length > 0) {
        console.log('\n🔍 Sample available dimensions:')
        metadata.dimensions.slice(0, 10).forEach((dim, index) => {
          console.log(`   ${index + 1}. ${dim.apiName} - ${dim.uiName}`)
        })
      }
      
      // Show some available metrics
      if (metadata.metrics && metadata.metrics.length > 0) {
        console.log('\n📊 Sample available metrics:')
        metadata.metrics.slice(0, 10).forEach((metric, index) => {
          console.log(`   ${index + 1}. ${metric.apiName} - ${metric.uiName}`)
        })
      }
      
    } catch (error) {
      console.error('❌ Metadata query failed:', error.message)
    }
    
    console.log('\n🎉 Connection test completed successfully!')
    return true
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message)
    
    if (error.message.includes('PERMISSION_DENIED')) {
      console.log('\n🔧 Permission Issue:')
      console.log('1. Verify the service account email was added to Google Analytics')
      console.log('2. Ensure "Viewer" role was assigned')
      console.log('3. Wait 5-10 minutes for permissions to propagate')
    }
    
    if (error.message.includes('NOT_FOUND')) {
      console.log('\n🔧 Property Not Found:')
      console.log('1. Verify the GA4_PROPERTY_ID in .env file')
      console.log('2. Ensure you\'re using GA4 property ID, not Universal Analytics')
      console.log('3. Check that the property exists and is accessible')
    }
    
    return false
  }
}

// Run test if called directly
if (require.main === module) {
  testConnection()
    .then((success) => {
      if (success) {
        console.log('\n✅ All tests passed! You can now run the full analysis.')
        console.log('Run: node scripts/analytics/run-analysis.js')
      } else {
        console.log('\n❌ Tests failed. Please check the issues above.')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('Test execution failed:', error)
      process.exit(1)
    })
}

module.exports = { testConnection }
