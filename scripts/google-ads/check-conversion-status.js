#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

/**
 * Check Google Ads conversion setup and upload status
 */

const { GoogleAdsApi } = require('google-ads-api')
require('dotenv').config()

const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID

async function checkConversionStatus() {
  console.log('\n══════════════════════════════════════════════════════════════════════')
  console.log('📊 GOOGLE ADS CONVERSION STATUS CHECK')
  console.log('══════════════════════════════════════════════════════════════════════\n')

  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  })

  const customer = client.Customer({
    customer_id: CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
  })

  // 1. Check account settings
  console.log('📋 ACCOUNT SETTINGS:')
  console.log('─'.repeat(50))
  
  try {
    const settings = await customer.query(`
      SELECT
        customer.id,
        customer.conversion_tracking_setting.accepted_customer_data_terms,
        customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled,
        customer.conversion_tracking_setting.google_ads_conversion_customer
      FROM customer
    `)
    
    settings.forEach(r => {
      const cts = r.customer.conversion_tracking_setting || {}
      console.log(`  Customer ID: ${r.customer.id}`)
      console.log(`  Customer Data Terms Accepted: ${cts.accepted_customer_data_terms || 'NOT SET'}`)
      console.log(`  Enhanced Conversions for Leads: ${cts.enhanced_conversions_for_leads_enabled || 'NOT SET'}`)
      console.log(`  Conversion Customer: ${cts.google_ads_conversion_customer || 'N/A'}`)
    })
  } catch (err) {
    console.log(`  Error fetching settings: ${err.message}`)
  }

  // 2. Check conversion action details
  console.log('\n📊 CONVERSION ACTIONS (Import Types):')
  console.log('─'.repeat(50))
  
  try {
    const actions = await customer.query(`
      SELECT 
        conversion_action.name,
        conversion_action.id,
        conversion_action.type,
        conversion_action.status,
        conversion_action.category,
        conversion_action.all_conversions,
        conversion_action.all_conversions_value
      FROM conversion_action
      WHERE conversion_action.type IN (7, 9)
    `)
    
    if (actions.length === 0) {
      console.log('  No offline import conversion actions found.')
      console.log('  Type 7 = UPLOAD_CLICKS (legacy)')
      console.log('  Type 9 = UPLOAD_CALLS')
    } else {
      actions.forEach(r => {
        const ca = r.conversion_action
        console.log(`\n  "${ca.name}"`)
        console.log(`    ID: ${ca.id}`)
        console.log(`    Type: ${ca.type} ${ca.type === 7 ? '(UPLOAD_CLICKS/Legacy Offline)' : ca.type === 9 ? '(UPLOAD_CALLS)' : ''}`)
        console.log(`    Status: ${ca.status === 2 ? 'ENABLED' : ca.status === 3 ? 'REMOVED' : ca.status}`)
        console.log(`    Category: ${ca.category}`)
        console.log(`    All Conversions: ${ca.all_conversions || 0}`)
        console.log(`    All Conversions Value: ${ca.all_conversions_value || 0}`)
      })
    }
  } catch (err) {
    console.log(`  Error fetching actions: ${err.message}`)
  }

  // 3. Check offline upload diagnostics
  console.log('\n📈 OFFLINE UPLOAD DIAGNOSTICS:')
  console.log('─'.repeat(50))
  
  try {
    const diagnostics = await customer.query(`
      SELECT
        offline_conversion_upload_client_summary.client,
        offline_conversion_upload_client_summary.status,
        offline_conversion_upload_client_summary.total_event_count,
        offline_conversion_upload_client_summary.successful_event_count,
        offline_conversion_upload_client_summary.success_rate,
        offline_conversion_upload_client_summary.last_upload_date_time
      FROM offline_conversion_upload_client_summary
      ORDER BY offline_conversion_upload_client_summary.last_upload_date_time DESC
      LIMIT 5
    `)
    
    if (diagnostics.length === 0) {
      console.log('  No upload diagnostics found.')
      console.log('  This means no conversions have been processed yet.')
    } else {
      diagnostics.forEach(r => {
        const d = r.offline_conversion_upload_client_summary
        console.log(`\n  Client: ${d.client}`)
        console.log(`    Status: ${d.status}`)
        console.log(`    Total Events: ${d.total_event_count}`)
        console.log(`    Successful: ${d.successful_event_count}`)
        console.log(`    Success Rate: ${(d.success_rate * 100).toFixed(1)}%`)
        console.log(`    Last Upload: ${d.last_upload_date_time}`)
      })
    }
  } catch (err) {
    console.log(`  Error fetching diagnostics: ${err.message}`)
  }

  // 4. Summary and recommendations
  console.log('\n\n🔍 KEY THINGS TO CHECK:')
  console.log('─'.repeat(50))
  console.log('1. Enhanced Conversions for Leads should be ENABLED')
  console.log('2. Customer Data Terms should be ACCEPTED')
  console.log('3. Conversion action type 7 is legacy - works but limited')
  console.log('4. Conversions appear on CLICK DATE, not upload date')
  console.log('5. Look in Reports > Date range Nov 29 - Jan 22')
  console.log('\n💡 To see uploaded conversions in Google Ads UI:')
  console.log('   Goals > Conversions > Summary > Click "offline (Upload)"')
  console.log('   Then check "Upload status" or "Diagnostics" tab')
}

checkConversionStatus().catch(console.error)
