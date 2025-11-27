#!/usr/bin/env node

/**
 * Verify Google Ads Goals and GA4 Integration
 * Check goals setup, GA4 conversions, and sync status
 */

const { GoogleAdsApi } = require('google-ads-api')
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
require('dotenv').config()

class GoalsAndGA4Verifier {
  constructor() {
    this.client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    })

    this.customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '')
    this.customer = this.client.Customer({
      customer_id: this.customerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
    })

    // GA4 client
    this.analyticsClient = new BetaAnalyticsDataClient({
      keyFilename: './ga-service-account.json'
    })
  }

  /**
   * Get Google Ads Goals (new conversion structure)
   */
  async getGoals() {
    console.log('\n🎯 Fetching Google Ads Goals...\n')

    const query = `
      SELECT
        customer_conversion_goal.category,
        customer_conversion_goal.origin,
        customer_conversion_goal.status,
        customer_conversion_goal.biddable
      FROM customer_conversion_goal
    `

    try {
      const results = await this.customer.query(query)
      const goals = []

      for (const row of results) {
        const goal = row.customer_conversion_goal
        goals.push({
          category: goal.category,
          origin: goal.origin,
          status: goal.status,
          biddable: goal.biddable
        })
      }

      console.log(`✅ Found ${goals.length} goal(s)\n`)

      goals.forEach((goal, index) => {
        console.log(`${index + 1}. Goal Category: ${goal.category}`)
        console.log(`   Origin: ${goal.origin}`)
        console.log(`   Status: ${goal.status === 'ENABLED' ? '✅ ENABLED' : '⚠️  ' + goal.status}`)
        console.log(`   Biddable: ${goal.biddable ? 'Yes' : 'No'}`)
        console.log('')
      })

      return goals
    } catch (error) {
      console.error('❌ Error fetching goals:', error.message)
      if (error.errors) {
        error.errors.forEach(err => console.error(`   • ${err.message}`))
      }
      return []
    }
  }

  /**
   * Get conversion actions (legacy and new)
   */
  async getConversionActions() {
    console.log('\n📊 Fetching Conversion Actions...\n')

    const query = `
      SELECT
        conversion_action.id,
        conversion_action.name,
        conversion_action.type,
        conversion_action.status,
        conversion_action.category,
        conversion_action.origin,
        conversion_action.primary_for_goal,
        conversion_action.value_settings.default_value
      FROM conversion_action
      WHERE conversion_action.status != 'REMOVED'
      ORDER BY conversion_action.name
    `

    try {
      const results = await this.customer.query(query)
      const conversions = []

      for (const row of results) {
        const action = row.conversion_action
        conversions.push({
          id: action.id,
          name: action.name,
          type: action.type,
          status: action.status,
          category: action.category,
          origin: action.origin,
          primaryForGoal: action.primary_for_goal,
          defaultValue: action.value_settings?.default_value
        })
      }

      console.log(`✅ Found ${conversions.length} conversion action(s)\n`)

      // Group by status
      const enabled = conversions.filter(c => c.status === 'ENABLED')
      const disabled = conversions.filter(c => c.status !== 'ENABLED')

      console.log(`📈 ENABLED Conversions (${enabled.length}):\n`)
      enabled.forEach((conv, index) => {
        console.log(`   ${index + 1}. ${conv.name}`)
        console.log(`      ID: ${conv.id}`)
        console.log(`      Origin: ${conv.origin}`)
        console.log(`      Category: ${conv.category}`)
        console.log(`      Primary for Goal: ${conv.primaryForGoal ? 'Yes' : 'No'}`)
        if (conv.defaultValue) {
          console.log(`      Value: ${conv.defaultValue}`)
        }
        console.log('')
      })

      if (disabled.length > 0) {
        console.log(`⚠️  DISABLED Conversions (${disabled.length}):\n`)
        disabled.slice(0, 5).forEach((conv, index) => {
          console.log(`   ${index + 1}. ${conv.name} (Status: ${conv.status})`)
        })
        if (disabled.length > 5) {
          console.log(`   ... and ${disabled.length - 5} more\n`)
        }
        console.log('')
      }

      return conversions
    } catch (error) {
      console.error('❌ Error fetching conversion actions:', error.message)
      return []
    }
  }

  /**
   * Get GA4 conversion events
   */
  async getGA4Conversions() {
    console.log('\n📊 Fetching GA4 Conversion Events...\n')

    try {
      const propertyId = '338158264' // Your GA4 property ID

      // Get conversion events from last 30 days
      const [response] = await this.analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{
          startDate: '30daysAgo',
          endDate: 'today'
        }],
        dimensions: [
          { name: 'eventName' },
          { name: 'date' }
        ],
        metrics: [
          { name: 'eventCount' }
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: {
              matchType: 'CONTAINS',
              value: 'submit',
              caseSensitive: false
            }
          }
        },
        limit: 50
      })

      const events = {}
      
      response.rows?.forEach(row => {
        const eventName = row.dimensionValues[0].value
        const count = parseInt(row.metricValues[0].value)
        
        if (!events[eventName]) {
          events[eventName] = 0
        }
        events[eventName] += count
      })

      console.log('✅ GA4 Conversion Events (Last 30 Days):\n')
      
      if (Object.keys(events).length === 0) {
        console.log('   ⚠️  No submission events found in GA4')
        console.log('   Check: GA4 → Configure → Events → mark events as conversions\n')
      } else {
        const sorted = Object.entries(events).sort((a, b) => b[1] - a[1])
        sorted.forEach(([eventName, count]) => {
          console.log(`   • ${eventName}: ${count} events`)
        })
        console.log('')
      }

      // Check for form_submit specifically
      const [formSubmitResponse] = await this.analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{
          startDate: '30daysAgo',
          endDate: 'today'
        }],
        dimensions: [
          { name: 'eventName' }
        ],
        metrics: [
          { name: 'eventCount' }
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            inListFilter: {
              values: ['form_submit', 'generate_lead', 'contact', 'submit_lead_form']
            }
          }
        }
      })

      if (formSubmitResponse.rows?.length > 0) {
        console.log('📋 Lead Generation Events:\n')
        formSubmitResponse.rows.forEach(row => {
          const eventName = row.dimensionValues[0].value
          const count = row.metricValues[0].value
          console.log(`   • ${eventName}: ${count} conversions`)
        })
        console.log('')
      }

      return events
    } catch (error) {
      console.error('❌ Error fetching GA4 data:', error.message)
      console.log('\nNote: Make sure ga-service-account.json has access to GA4 property\n')
      return {}
    }
  }

  /**
   * Check Google Ads ↔ GA4 linking
   */
  async checkGA4Link() {
    console.log('\n🔗 Checking Google Ads ↔ GA4 Integration...\n')

    const query = `
      SELECT
        customer.id,
        customer.descriptive_name,
        customer.auto_tagging_enabled
      FROM customer
      WHERE customer.id = ${this.customerId}
    `

    try {
      const results = await this.customer.query(query)
      
      for (const row of results) {
        const customer = row.customer
        
        console.log(`Account: ${customer.descriptive_name}`)
        console.log(`Auto-tagging: ${customer.auto_tagging_enabled ? '✅ ENABLED' : '⚠️  DISABLED'}`)
        
        if (!customer.auto_tagging_enabled) {
          console.log('\n⚠️  WARNING: Auto-tagging must be enabled for GA4 integration!')
        }
      }

      console.log('\n💡 To verify GA4 link:')
      console.log('   1. Google Ads → Tools → Linked accounts → Google Analytics 4')
      console.log('   2. Check if property 338158264 is linked')
      console.log('   3. Ensure "Import conversions" is enabled')
      console.log('')

    } catch (error) {
      console.error('❌ Error checking link:', error.message)
    }
  }

  /**
   * Main verification process
   */
  async verify() {
    console.log('\n' + '='.repeat(70))
    console.log('🔍 GOOGLE ADS GOALS & GA4 INTEGRATION VERIFICATION')
    console.log('='.repeat(70))

    try {
      // 1. Check Goals
      const goals = await this.getGoals()

      // 2. Check Conversion Actions
      const conversions = await this.getConversionActions()

      // 3. Check GA4 Conversions
      const ga4Events = await this.getGA4Conversions()

      // 4. Check GA4 Link
      await this.checkGA4Link()

      // Summary
      console.log('\n' + '='.repeat(70))
      console.log('📊 VERIFICATION SUMMARY')
      console.log('='.repeat(70))

      const enabledConversions = conversions.filter(c => c.status === 'ENABLED')
      const enabledGoals = goals.filter(g => g.status === 'ENABLED')

      console.log(`\n✅ Google Ads Goals: ${enabledGoals.length} enabled`)
      console.log(`✅ Conversion Actions: ${enabledConversions.length} enabled, ${conversions.length} total`)
      console.log(`✅ GA4 Events: ${Object.keys(ga4Events).length} conversion events found`)

      console.log('\n🎯 RECOMMENDATIONS:\n')

      if (enabledConversions.length === 0) {
        console.log('   ❌ CRITICAL: No enabled conversion actions!')
        console.log('      → Go to Google Ads → Goals → Conversions')
        console.log('      → Enable key conversions (form submissions, leads)')
      } else {
        console.log('   ✅ Conversion tracking is active')
      }

      if (Object.keys(ga4Events).length === 0) {
        console.log('\n   ⚠️  No GA4 conversion events detected')
        console.log('      → Check GA4 → Configure → Events')
        console.log('      → Mark key events as conversions')
        console.log('      → Import to Google Ads via Linked accounts')
      } else {
        console.log('\n   ✅ GA4 is tracking conversion events')
      }

      console.log('\n📋 KEY CONVERSIONS TO ENABLE:')
      console.log('   • Lead form submissions (highest value)')
      console.log('   • Contact form completions')  
      console.log('   • Phone clicks (free conversions)')
      console.log('   • Application submissions')

      console.log('\n🔗 HELPFUL LINKS:')
      console.log('   • Goals: https://ads.google.com/aw/conversions/summary')
      console.log('   • GA4: https://analytics.google.com')
      console.log('   • Linked accounts: https://ads.google.com/aw/account-linking')
      
      console.log('\n' + '='.repeat(70))

    } catch (error) {
      console.error('\n❌ Verification failed:', error.message)
      process.exit(1)
    }
  }
}

// Run verification
if (require.main === module) {
  const verifier = new GoalsAndGA4Verifier()
  verifier.verify()
    .then(() => {
      console.log('\n✅ Verification complete!\n')
      process.exit(0)
    })
    .catch(error => {
      console.error('\n❌ Error:', error.message)
      process.exit(1)
    })
}

module.exports = GoalsAndGA4Verifier
