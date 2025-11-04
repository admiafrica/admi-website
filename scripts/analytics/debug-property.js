/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const path = require('path')
require('dotenv').config()

/**
 * Debug Google Analytics property access
 */

async function debugProperty() {
  console.log('🔍 Debugging Google Analytics Property Access...')
  
  try {
    const credentialsPath = path.join(process.cwd(), 'ga-service-account.json')
    const propertyId = process.env.GA4_PROPERTY_ID || '250948607'
    
    console.log(`📊 Property ID: ${propertyId}`)
    console.log(`🔑 Credentials: ${credentialsPath}`)
    
    // Read service account info
    const serviceAccountInfo = JSON.parse(require('fs').readFileSync(credentialsPath, 'utf8'))
    console.log(`📧 Service Account Email: ${serviceAccountInfo.client_email}`)
    console.log(`🏗️  Project ID: ${serviceAccountInfo.project_id}`)
    
    const client = new BetaAnalyticsDataClient({
      keyFilename: credentialsPath
    })
    
    console.log('✅ Client initialized successfully')
    
    // Try to get account summaries first
    console.log('\n🧪 Attempting to list account summaries...')
    try {
      const [accountSummaries] = await client.listAccountSummaries({})
      
      console.log('✅ Account summaries retrieved successfully')
      console.log(`📊 Found ${accountSummaries.accountSummaries?.length || 0} accounts`)
      
      if (accountSummaries.accountSummaries && accountSummaries.accountSummaries.length > 0) {
        console.log('\n🏢 Available accounts and properties:')
        accountSummaries.accountSummaries.forEach((account, accountIndex) => {
          console.log(`\n   Account ${accountIndex + 1}: ${account.displayName} (${account.account})`)
          
          if (account.propertySummaries && account.propertySummaries.length > 0) {
            account.propertySummaries.forEach((property, propIndex) => {
              console.log(`     Property ${propIndex + 1}: ${property.displayName} (ID: ${property.property?.replace('properties/', '')})`)
              
              // Check if this matches our target property
              if (property.property?.replace('properties/', '') === propertyId) {
                console.log('     ⭐ THIS IS OUR TARGET PROPERTY!')
              }
            })
          } else {
            console.log('     No properties found in this account')
          }
        })
      }
      
    } catch (error) {
      console.error('❌ Account summaries failed:', error.message)
      
      if (error.message.includes('PERMISSION_DENIED')) {
        console.log('\n🚨 PERMISSION DENIED ERROR')
        console.log('This means the service account is not properly configured in Google Analytics.')
        console.log('\nPlease verify:')
        console.log(`1. Go to Google Analytics (https://analytics.google.com/)`)
        console.log(`2. Select the ADMI property`)
        console.log(`3. Go to Admin > Property Access Management`)
        console.log(`4. Verify this email is added with Viewer role: ${serviceAccountInfo.client_email}`)
        console.log(`5. If not added, click + and add the service account email`)
        return false
      }
    }
    
    // Try a simple metadata call for our specific property
    console.log(`\n🧪 Attempting to get metadata for property ${propertyId}...`)
    try {
      const [metadata] = await client.getMetadata({
        name: `properties/${propertyId}/metadata`
      })
      
      console.log('✅ Property metadata retrieved successfully')
      console.log(`📊 Available dimensions: ${metadata.dimensions?.length || 0}`)
      console.log(`📈 Available metrics: ${metadata.metrics?.length || 0}`)
      
      return true
      
    } catch (error) {
      console.error('❌ Property metadata failed:', error.message)
      
      if (error.message.includes('NOT_FOUND')) {
        console.log('\n🚨 PROPERTY NOT FOUND ERROR')
        console.log(`Property ID ${propertyId} was not found or is not accessible.`)
        console.log('\nPossible issues:')
        console.log('1. Wrong property ID - check Google Analytics Admin > Property Settings')
        console.log('2. Service account not added to this specific property')
        console.log('3. Using Universal Analytics ID instead of GA4 property ID')
      }
      
      if (error.message.includes('PERMISSION_DENIED')) {
        console.log('\n🚨 PERMISSION DENIED FOR SPECIFIC PROPERTY')
        console.log(`The service account cannot access property ${propertyId}`)
        console.log('\nPlease verify:')
        console.log('1. The service account email is added to the correct property')
        console.log('2. The property ID is correct (GA4 property, not Universal Analytics)')
        console.log('3. Permissions have had time to propagate (wait 5-10 minutes)')
      }
      
      return false
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message)
    return false
  }
}

// Run debug if called directly
if (require.main === module) {
  debugProperty()
    .then((success) => {
      if (success) {
        console.log('\n✅ Property access verified! You can now run the full analysis.')
      } else {
        console.log('\n❌ Property access issues found. Please resolve the issues above.')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('Debug execution failed:', error)
      process.exit(1)
    })
}

module.exports = { debugProperty }
