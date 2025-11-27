#!/usr/bin/env node

/**
 * Verify Google Ads Conversion Tracking Setup
 * Check conversion actions, goals, and recent conversion data
 */

const { GoogleAdsApi } = require('google-ads-api')
require('dotenv').config()

class ConversionTrackingVerifier {
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
  }

  /**
   * Get all conversion actions
   */
  async getConversionActions() {
    console.log('\n🎯 Fetching Conversion Actions...\n')

    const query = `
      SELECT
        conversion_action.id,
        conversion_action.name,
        conversion_action.type,
        conversion_action.status,
        conversion_action.category,
        conversion_action.primary_for_goal,
        conversion_action.counting_type,
        conversion_action.click_through_lookback_window_days,
        conversion_action.view_through_lookback_window_days,
        conversion_action.value_settings.default_value,
        conversion_action.value_settings.always_use_default_value
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
          primaryForGoal: action.primary_for_goal,
          countingType: action.counting_type,
          clickLookback: action.click_through_lookback_window_days,
          viewLookback: action.view_through_lookback_window_days,
          defaultValue: action.value_settings?.default_value,
          alwaysUseDefault: action.value_settings?.always_use_default_value
        })
      }

      console.log(`✅ Found ${conversions.length} conversion action(s)\n`)

      conversions.forEach((conv, index) => {
        console.log(`${index + 1}. ${conv.name}`)
        console.log(`   ID: ${conv.id}`)
        console.log(`   Type: ${conv.type}`)
        console.log(`   Status: ${conv.status === 'ENABLED' ? '✅ ENABLED' : '⚠️  ' + conv.status}`)
        console.log(`   Category: ${conv.category}`)
        console.log(`   Primary for Goal: ${conv.primaryForGoal ? 'Yes' : 'No'}`)
        console.log(`   Counting: ${conv.countingType}`)
        console.log(`   Click Lookback: ${conv.clickLookback} days`)
        console.log(`   View Lookback: ${conv.viewLookback} days`)
        if (conv.defaultValue) {
          console.log(`   Default Value: ${conv.defaultValue}`)
        }
        console.log('')
      })

      return conversions
    } catch (error) {
      console.error('❌ Error fetching conversion actions:', error.message)
      throw error
    }
  }

  /**
   * Get recent conversion data
   */
  async getRecentConversions(days = 30) {
    console.log(`\n📊 Fetching Conversion Data (Last ${days} Days)...\n`)

    const query = `
      SELECT
        segments.date,
        segments.conversion_action_name,
        metrics.conversions,
        metrics.all_conversions
      FROM customer
      WHERE 
        segments.date DURING LAST_${days}_DAYS
      ORDER BY segments.date DESC
    `

    try {
      const results = await this.customer.query(query)
      const conversions = []

      for (const row of results) {
        if (row.metrics.conversions > 0 || row.metrics.all_conversions > 0) {
          conversions.push({
            date: row.segments.date,
            conversionAction: row.segments.conversion_action_name,
            conversions: row.metrics.conversions,
            allConversions: row.metrics.all_conversions
          })
        }
      }

      if (conversions.length === 0) {
        console.log(`⚠️  No conversions found in the last ${days} days`)
        console.log('\nPossible reasons:')
        console.log('   • No campaigns running (all paused)')
        console.log('   • Conversion actions need to be enabled')
        console.log('   • No conversions occurred yet')
        console.log('   • Tags not firing on website')
      } else {
        console.log(`✅ Found conversion activity!\n`)

        // Group by conversion action
        const byAction = {}
        conversions.forEach(conv => {
          if (!byAction[conv.conversionAction]) {
            byAction[conv.conversionAction] = {
              total: 0,
              allConversions: 0
            }
          }
          byAction[conv.conversionAction].total += conv.conversions
          byAction[conv.conversionAction].allConversions += conv.allConversions
        })

        console.log('📈 CONVERSION SUMMARY (Last 30 Days):\n')
        const sorted = Object.entries(byAction).sort((a, b) => b[1].total - a[1].total)
        
        sorted.forEach(([actionName, data]) => {
          console.log(`   • ${actionName}`)
          console.log(`     Conversions: ${data.total}`)
          console.log(`     All Conversions: ${data.allConversions}`)
          console.log('')
        })

        // Show recent activity
        console.log('📅 RECENT ACTIVITY (Last 10 Days):\n')
        const recentDays = conversions.slice(0, 20)
        const byDate = {}
        
        recentDays.forEach(conv => {
          if (!byDate[conv.date]) {
            byDate[conv.date] = 0
          }
          byDate[conv.date] += conv.conversions
        })
        
        Object.entries(byDate).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 10).forEach(([date, count]) => {
          console.log(`   ${date}: ${count} conversion(s)`)
        })
        console.log('')
      }

      return conversions
    } catch (error) {
      console.error('❌ Error fetching conversion data:', error.message)
      if (error.errors) {
        error.errors.forEach(err => console.error(`   • ${err.message}`))
      }
      throw error
    }
  }

  /**
   * Check conversion tracking tags
   */
  async checkConversionTracking() {
    console.log('\n🔍 CONVERSION TRACKING TAG STATUS:\n')

    const query = `
      SELECT
        customer.id,
        customer.descriptive_name,
        customer.auto_tagging_enabled,
        customer.tracking_url_template,
        customer.final_url_suffix
      FROM customer
      WHERE customer.id = ${this.customerId}
    `

    try {
      const results = await this.customer.query(query)
      
      for (const row of results) {
        const customer = row.customer
        
        console.log(`Account: ${customer.descriptive_name}`)
        console.log(`Auto-tagging: ${customer.auto_tagging_enabled ? '✅ ENABLED' : '⚠️  DISABLED'}`)
        
        if (customer.tracking_url_template) {
          console.log(`Tracking Template: ${customer.tracking_url_template}`)
        }
        
        if (customer.final_url_suffix) {
          console.log(`URL Suffix: ${customer.final_url_suffix}`)
        }
        
        if (!customer.auto_tagging_enabled) {
          console.log('\n⚠️  WARNING: Auto-tagging is disabled!')
          console.log('   This is required for accurate conversion tracking.')
          console.log('   Enable it: Tools → Settings → Account Settings → Auto-tagging')
        }
      }
    } catch (error) {
      console.error('❌ Error checking tracking settings:', error.message)
    }
  }

  /**
   * Main verification process
   */
  async verify() {
    console.log('\n' + '='.repeat(70))
    console.log('🔍 GOOGLE ADS CONVERSION TRACKING VERIFICATION')
    console.log('='.repeat(70))

    try {
      // 1. Check conversion actions
      const actions = await this.getConversionActions()

      // 2. Check tracking settings
      await this.checkConversionTracking()

      // 3. Check recent conversions
      await this.getRecentConversions(30)

      // Summary
      console.log('\n' + '='.repeat(70))
      console.log('📊 VERIFICATION SUMMARY')
      console.log('='.repeat(70))

      const enabledActions = actions.filter(a => a.status === 'ENABLED')
      
      console.log(`\n✅ Conversion Actions: ${enabledActions.length} enabled, ${actions.length} total`)
      
      if (enabledActions.length === 0) {
        console.log('\n⚠️  ACTION REQUIRED:')
        console.log('   No enabled conversion actions found!')
        console.log('   Set up conversion tracking:')
        console.log('   1. Go to Tools → Conversions')
        console.log('   2. Click + New conversion action')
        console.log('   3. Choose: Website, App, Phone calls, or Import')
        console.log('   4. Set up conversion tracking tag on admi.africa')
      } else {
        console.log('\n✅ Conversion tracking is set up')
        console.log('\n💡 RECOMMENDATIONS:')
        console.log('   1. Verify conversion tag is on your website')
        console.log('   2. Test conversions using Google Tag Assistant')
        console.log('   3. Set conversion values for ROI tracking')
        console.log('   4. Use "Lead" category for form submissions')
      }

      console.log('\n🔗 HELPFUL LINKS:')
      console.log('   • Conversion tracking: https://ads.google.com/aw/conversions')
      console.log('   • Tag Manager: https://tagmanager.google.com')
      console.log('   • Tag Assistant: https://tagassistant.google.com')
      
      console.log('\n' + '='.repeat(70))

    } catch (error) {
      console.error('\n❌ Verification failed:', error.message)
      process.exit(1)
    }
  }
}

// Run verification
if (require.main === module) {
  const verifier = new ConversionTrackingVerifier()
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

module.exports = ConversionTrackingVerifier
