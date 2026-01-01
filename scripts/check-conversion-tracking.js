#!/usr/bin/env node

/**
 * Check Conversion Tracking Configuration
 *
 * Checks both:
 * 1. Google Analytics 4 - Conversion events configuration
 * 2. Google Ads - Conversion actions and Enhanced Conversions status
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const { GoogleAdsApi } = require('google-ads-api')
require('dotenv').config()

const GA_PROPERTY_ID = process.env.GA4_PROPERTY_ID || process.env.GOOGLE_ANALYTICS_PROPERTY_ID || '250948607'
const GOOGLE_ADS_CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID
const GOOGLE_ADS_CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET
const GOOGLE_ADS_DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim()
const GOOGLE_ADS_REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN
const GOOGLE_ADS_CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID

// ============================================================================
// GOOGLE ANALYTICS 4 - Check Conversion Events
// ============================================================================

async function checkGA4Conversions() {
  console.log('📊 GOOGLE ANALYTICS 4 - CONVERSION EVENTS\n')
  console.log('═'.repeat(100))

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || './ga-service-account.json'
    })

    // Get all events with conversion status
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'conversions' }],
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 50
    })

    console.log(`\n📋 Events from Last 30 Days (Property: ${GA_PROPERTY_ID})\n`)

    const events = []

    if (response.rows) {
      response.rows.forEach((row) => {
        const eventName = row.dimensionValues[0].value
        const eventCount = parseInt(row.metricValues[0].value)
        const conversions = parseInt(row.metricValues[1].value)
        const isConversion = conversions > 0

        events.push({
          name: eventName,
          count: eventCount,
          conversions: conversions,
          isConversion: isConversion
        })
      })
    }

    // Separate conversion events from regular events
    const conversionEvents = events.filter((e) => e.isConversion)
    const regularEvents = events.filter((e) => !e.isConversion)

    console.log(`\n✅ CONVERSION EVENTS (${conversionEvents.length})\n`)
    if (conversionEvents.length > 0) {
      conversionEvents.forEach((event, i) => {
        console.log(`${i + 1}. ${event.name}`)
        console.log(`   Event Count: ${event.count.toLocaleString()}`)
        console.log(`   Conversions: ${event.conversions.toLocaleString()}`)
        console.log('')
      })
    } else {
      console.log('⚠️  No conversion events found!\n')
      console.log('To mark an event as a conversion:')
      console.log('1. Go to GA4 → Configure → Events')
      console.log('2. Find "Enquiry_Form_Submitted" event')
      console.log('3. Toggle "Mark as conversion" to ON\n')
    }

    console.log('═'.repeat(100))
    console.log(`\n📌 REGULAR EVENTS (Top 10 of ${regularEvents.length})\n`)
    regularEvents.slice(0, 10).forEach((event, i) => {
      console.log(`${i + 1}. ${event.name} - ${event.count.toLocaleString()} events`)
    })

    // Check specifically for form submission events
    console.log('\n' + '═'.repeat(100))
    console.log('\n🔍 FORM SUBMISSION EVENTS\n')

    const formEvents = events.filter(
      (e) =>
        e.name.toLowerCase().includes('form') ||
        e.name.toLowerCase().includes('submit') ||
        e.name.toLowerCase().includes('enquiry') ||
        e.name.toLowerCase().includes('generate_lead')
    )

    if (formEvents.length > 0) {
      formEvents.forEach((event) => {
        console.log(`${event.isConversion ? '✅' : '⚠️ '} ${event.name}`)
        console.log(`   Events: ${event.count.toLocaleString()}`)
        console.log(`   Conversions: ${event.conversions.toLocaleString()}`)
        console.log(`   Status: ${event.isConversion ? 'Marked as Conversion' : 'NOT marked as conversion'}`)
        console.log('')
      })
    } else {
      console.log('❌ No form submission events found in last 30 days\n')
    }
  } catch (error) {
    console.error('\n❌ GA4 Error:', error.message)
    if (error.message.includes('ENOENT')) {
      console.log('\n💡 Service account file not found.')
      console.log(`   Expected: ${process.env.GOOGLE_APPLICATION_CREDENTIALS || './ga-service-account.json'}`)
    }
  }
}

// ============================================================================
// GOOGLE ADS - Check Conversion Actions & Enhanced Conversions
// ============================================================================

async function checkGoogleAdsConversions() {
  console.log('\n\n💰 GOOGLE ADS - CONVERSION ACTIONS\n')
  console.log('═'.repeat(100))

  if (!GOOGLE_ADS_CLIENT_ID || !GOOGLE_ADS_DEVELOPER_TOKEN || !GOOGLE_ADS_CUSTOMER_ID) {
    console.log('\n⚠️  Google Ads API credentials not configured')
    console.log('   Set these in .env:')
    console.log('   - GOOGLE_ADS_CLIENT_ID')
    console.log('   - GOOGLE_ADS_CLIENT_SECRET')
    console.log('   - GOOGLE_ADS_DEVELOPER_TOKEN')
    console.log('   - GOOGLE_ADS_REFRESH_TOKEN')
    console.log('   - GOOGLE_ADS_CUSTOMER_ID\n')
    return
  }

  try {
    const client = new GoogleAdsApi({
      client_id: GOOGLE_ADS_CLIENT_ID,
      client_secret: GOOGLE_ADS_CLIENT_SECRET,
      developer_token: GOOGLE_ADS_DEVELOPER_TOKEN
    })

    const customer = client.Customer({
      customer_id: GOOGLE_ADS_CUSTOMER_ID,
      refresh_token: GOOGLE_ADS_REFRESH_TOKEN
    })

    // Query for all conversion actions
    const query = `
      SELECT
        conversion_action.id,
        conversion_action.name,
        conversion_action.type,
        conversion_action.status,
        conversion_action.category,
        conversion_action.origin,
        customer.id
      FROM conversion_action
      WHERE conversion_action.status != 'REMOVED'
      ORDER BY conversion_action.name
    `

    const results = await customer.query(query)

    console.log(`\n📋 Conversion Actions (Customer: ${GOOGLE_ADS_CUSTOMER_ID})\n`)

    if (results.length === 0) {
      console.log('⚠️  No conversion actions found\n')
      console.log('To create a conversion action:')
      console.log('1. Go to Google Ads → Tools → Conversions')
      console.log('2. Click "+" → Website')
      console.log('3. Select "Code conversion using Google tag or tag manager"')
      console.log('4. Configure event from GA4: "Enquiry_Form_Submitted"\n')
      return
    }

    results.forEach((row, i) => {
      const action = row.conversion_action
      console.log(`${i + 1}. ${action.name}`)
      console.log(`   ID: ${action.id}`)
      console.log(`   Type: ${action.type}`)
      console.log(`   Status: ${action.status}`)
      console.log(`   Category: ${action.category}`)
      console.log(`   Origin: ${action.origin}`)
      console.log('')
    })

    // Check for Enhanced Conversions - need to query campaign-level settings
    console.log('═'.repeat(100))
    console.log('\n🔍 ENHANCED CONVERSIONS STATUS\n')

    // Query for conversion tracking settings
    const settingsQuery = `
      SELECT
        customer.id,
        customer.descriptive_name,
        customer.conversion_tracking_setting.conversion_tracking_id,
        customer.conversion_tracking_setting.cross_account_conversion_tracking_id,
        customer.conversion_tracking_setting.accepted_customer_data_terms
      FROM customer
      WHERE customer.id = ${GOOGLE_ADS_CUSTOMER_ID}
    `

    const settingsResults = await customer.query(settingsQuery)

    if (settingsResults.length > 0) {
      const settings = settingsResults[0].customer.conversion_tracking_setting
      console.log(`Account: ${settingsResults[0].customer.descriptive_name}`)
      console.log(`Conversion Tracking ID: ${settings?.conversion_tracking_id || 'Not set'}`)
      console.log(`Customer Data Terms Accepted: ${settings?.accepted_customer_data_terms ? '✅ Yes' : '❌ No'}`)

      if (!settings?.accepted_customer_data_terms) {
        console.log('\n⚠️  Enhanced Conversions NOT enabled')
        console.log('\nTo enable Enhanced Conversions:')
        console.log('1. Go to Google Ads → Tools → Conversions')
        console.log('2. Click on a conversion action')
        console.log('3. Scroll to "Enhanced conversions"')
        console.log('4. Toggle ON and accept terms')
        console.log('5. Save changes\n')
      } else {
        console.log('\n✅ Customer data terms accepted - Enhanced Conversions can be enabled per conversion action')
      }
    }

    // Get conversion action settings details
    console.log('\n' + '═'.repeat(100))
    console.log('\n📊 CONVERSION ACTION DETAILS\n')

    const detailsQuery = `
      SELECT
        conversion_action.id,
        conversion_action.name,
        conversion_action.value_settings.default_value,
        conversion_action.value_settings.default_currency_code,
        conversion_action.counting_type,
        conversion_action.click_through_lookback_window_days,
        conversion_action.view_through_lookback_window_days
      FROM conversion_action
      WHERE conversion_action.status = 'ENABLED'
    `

    const detailsResults = await customer.query(detailsQuery)

    detailsResults.forEach((row) => {
      const action = row.conversion_action
      const value = action.value_settings

      console.log(`${action.name}:`)
      console.log(`   Default Value: ${value?.default_currency_code} ${value?.default_value || '0'}`)
      console.log(`   Counting: ${action.counting_type}`)
      console.log(`   Click Lookback: ${action.click_through_lookback_window_days} days`)
      console.log(`   View Lookback: ${action.view_through_lookback_window_days} days`)
      console.log('')
    })
  } catch (error) {
    console.error('\n❌ Google Ads Error:', error.message)
    console.error(error)
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('\n🔍 CONVERSION TRACKING CONFIGURATION CHECK\n')
  console.log('═'.repeat(100))
  console.log('\nThis script checks:')
  console.log('1. Google Analytics 4 - Which events are marked as conversions')
  console.log('2. Google Ads - Conversion actions and Enhanced Conversions status\n')
  console.log('═'.repeat(100))

  // Check GA4
  await checkGA4Conversions()

  // Check Google Ads
  await checkGoogleAdsConversions()

  console.log('\n' + '═'.repeat(100))
  console.log('\n✅ CHECK COMPLETE\n')
  console.log('Next Steps:')
  console.log('1. Ensure "Enquiry_Form_Submitted" is marked as conversion in GA4')
  console.log('2. Import this GA4 conversion into Google Ads')
  console.log('3. Enable Enhanced Conversions for the conversion action')
  console.log('4. Update form code to send enhanced conversion data')
  console.log('\nSee: docs/ENHANCED-CONVERSIONS-QUICK-START.md\n')
  console.log('═'.repeat(100) + '\n')
}

main().catch(console.error)
