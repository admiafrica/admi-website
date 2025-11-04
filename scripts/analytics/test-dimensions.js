/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const path = require('path')
require('dotenv').config()

/**
 * Test individual dimensions and metrics to identify issues
 */

async function testDimensions() {
  console.log('🔍 Testing Individual Dimensions and Metrics...')
  
  try {
    const credentialsPath = path.join(process.cwd(), 'ga-service-account.json')
    const propertyId = process.env.GA4_PROPERTY_ID || '250948607'
    
    const client = new BetaAnalyticsDataClient({
      keyFilename: credentialsPath
    })
    
    console.log('✅ Client initialized successfully')
    
    // Test basic dimensions one by one
    const dimensionsToTest = [
      'sessionSource',
      'sessionMedium', 
      'sessionCampaignName',
      'country',
      'city',
      'deviceCategory',
      'date'
    ]
    
    const metricsToTest = [
      'sessions',
      'users',
      'screenPageViews',
      'userEngagementDuration',
      'bounceRate'
    ]
    
    console.log('\n🧪 Testing Dimensions...')
    for (const dimension of dimensionsToTest) {
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
            { name: dimension }
          ],
          metrics: [
            { name: 'sessions' }
          ],
          limit: 5
        })
        
        console.log(`✅ ${dimension}: ${response.rows?.length || 0} rows`)
        
      } catch (error) {
        console.log(`❌ ${dimension}: ${error.message}`)
      }
    }
    
    console.log('\n🧪 Testing Metrics...')
    for (const metric of metricsToTest) {
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
            { name: metric }
          ],
          limit: 5
        })
        
        console.log(`✅ ${metric}: ${response.rows?.length || 0} rows`)
        
      } catch (error) {
        console.log(`❌ ${metric}: ${error.message}`)
      }
    }
    
    // Test the problematic combination
    console.log('\n🧪 Testing Traffic Source Combination...')
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
      
      console.log(`✅ Traffic Source Combination: ${response.rows?.length || 0} rows`)
      
      if (response.rows && response.rows.length > 0) {
        console.log('📊 Sample traffic sources:')
        response.rows.slice(0, 5).forEach((row, index) => {
          console.log(`   ${index + 1}. ${row.dimensionValues[0].value}/${row.dimensionValues[1].value}: ${row.metricValues[0].value} sessions`)
        })
      }
      
    } catch (error) {
      console.log(`❌ Traffic Source Combination: ${error.message}`)
    }
    
    // Test with campaign dimension
    console.log('\n🧪 Testing with Campaign Dimension...')
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
          { name: 'sessionMedium' },
          { name: 'sessionCampaignName' }
        ],
        metrics: [
          { name: 'sessions' }
        ],
        limit: 10
      })
      
      console.log(`✅ With Campaign: ${response.rows?.length || 0} rows`)
      
    } catch (error) {
      console.log(`❌ With Campaign: ${error.message}`)
    }
    
    console.log('\n🎉 Dimension testing completed!')
    
  } catch (error) {
    console.error('❌ Testing failed:', error.message)
  }
}

// Run test if called directly
if (require.main === module) {
  testDimensions()
    .catch((error) => {
      console.error('Test execution failed:', error)
      process.exit(1)
    })
}

module.exports = { testDimensions }
