#!/usr/bin/env node

/**
 * Check conversion status codes and details
 */

const { GoogleAdsApi } = require('google-ads-api')
require('dotenv').config()

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
})

const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '')
const customer = client.Customer({
  customer_id: customerId,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
})

async function checkStatus() {
  console.log('\n🔍 Checking Conversion Status Details...\n')

  const query = `
    SELECT
      conversion_action.id,
      conversion_action.name,
      conversion_action.status,
      conversion_action.type,
      conversion_action.primary_for_goal
    FROM conversion_action
    ORDER BY conversion_action.id DESC
    LIMIT 50
  `

  try {
    const results = await customer.query(query)
    const conversions = []

    for (const row of results) {
      conversions.push({
        id: row.conversion_action.id,
        name: row.conversion_action.name,
        status: row.conversion_action.status,
        statusCode: row.conversion_action.status,
        type: row.conversion_action.type,
        primaryForGoal: row.conversion_action.primary_for_goal
      })
    }

    console.log(`Total conversions: ${conversions.length}\n`)

    // Group by status code
    const byStatus = {}
    conversions.forEach(conv => {
      const statusKey = `Status ${conv.statusCode}`
      if (!byStatus[statusKey]) {
        byStatus[statusKey] = []
      }
      byStatus[statusKey].push(conv)
    })

    console.log('📊 CONVERSIONS BY STATUS:\n')
    
    Object.keys(byStatus).sort().forEach(statusKey => {
      const convs = byStatus[statusKey]
      console.log(`${statusKey}: ${convs.length} conversion(s)`)
      
      convs.slice(0, 10).forEach(conv => {
        console.log(`   • ${conv.name}`)
        console.log(`     ID: ${conv.id}`)
        console.log(`     Type: ${conv.type}`)
        console.log(`     Primary: ${conv.primaryForGoal ? 'Yes' : 'No'}`)
      })
      
      if (convs.length > 10) {
        console.log(`   ... and ${convs.length - 10} more`)
      }
      console.log('')
    })

    // Status code reference
    console.log('📖 STATUS CODE REFERENCE:')
    console.log('   • 2 = ENABLED')
    console.log('   • 3 = REMOVED')
    console.log('   • 4 = HIDDEN (not actively recording)')
    console.log('   • Other codes may exist in newer API versions\n')

    // Check if any are actually enabled
    const enabled = conversions.filter(c => c.statusCode === 2)
    console.log(`\n✅ ENABLED conversions: ${enabled.length}`)
    
    if (enabled.length > 0) {
      console.log('\nENABLED CONVERSIONS:')
      enabled.forEach(conv => {
        console.log(`   ✅ ${conv.name} (ID: ${conv.id})`)
      })
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.errors) {
      error.errors.forEach(err => console.error(`   • ${err.message}`))
    }
  }
}

checkStatus()
