#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Automated Google Ads Enhanced Conversions Upload
 *
 * Syncs Brevo pipeline applicants to Google Ads as Enhanced Conversions
 * This helps Google optimize campaigns for users who actually convert.
 *
 * Usage:
 *   node scripts/google-ads/sync-enhanced-conversions.js
 *   npm run ads:sync-conversions
 *
 * Can be run daily via cron or AWS Lambda
 */

require('dotenv/config')
const crypto = require('crypto')
const { GoogleAdsApi } = require('google-ads-api')

// API Configuration
const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_API_URL = 'https://api.brevo.com/v3'

const GOOGLE_ADS_CONFIG = {
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim(),
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
}

const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID

// Campaign period
const START_DATE = '2025-11-29'

// Conversion action name in Google Ads (must match exactly)
const CONVERSION_ACTION_NAME = 'Application Submitted'

// Conversion value in KES (average tuition)
const CONVERSION_VALUE = 300000
const CONVERSION_CURRENCY = 'KES'

// Pipeline stage IDs for "Applied" and "Decision Making"
const APPLIED_STAGE_IDS = [
  '27x209expgyhg8428lh7ocn', // Applied
  'pwi0xiqbtdwe6brfz7vgxen' // Decision Making
]

/**
 * SHA256 hash for Enhanced Conversions (Google requirement)
 */
function sha256Hash(value) {
  if (!value) return null
  const normalized = String(value).toLowerCase().trim()
  if (!normalized) return null
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

/**
 * Normalize phone to E.164 format
 */
function normalizePhone(phone) {
  if (!phone) return null
  let digits = phone.replace(/\D/g, '')

  if (digits.startsWith('0') && digits.length === 10) {
    digits = '254' + digits.substring(1)
  }
  if (digits.startsWith('7') && digits.length === 9) {
    digits = '254' + digits
  }
  if (!digits.startsWith('+')) {
    digits = '+' + digits
  }
  return digits
}

/**
 * Fetch contacts from Brevo since campaign start
 */
async function fetchBrevoContacts() {
  const contacts = []
  let offset = 0
  const pageSize = 50

  while (true) {
    const url = new URL(`${BREVO_API_URL}/contacts`)
    url.searchParams.set('limit', pageSize)
    url.searchParams.set('offset', offset)
    url.searchParams.set('modifiedSince', new Date(START_DATE).toISOString())

    const response = await fetch(url.toString(), {
      headers: { 'api-key': BREVO_API_KEY }
    })

    if (!response.ok) throw new Error(`Brevo contacts error: ${response.status}`)

    const data = await response.json()
    contacts.push(...(data.contacts || []))

    if (!data.contacts || data.contacts.length < pageSize || contacts.length >= 10000) break
    offset += pageSize
  }

  return contacts
}

/**
 * Fetch pipeline deals from Brevo
 */
async function fetchPipelineDeals() {
  const deals = []
  let offset = 0
  const pageSize = 50

  while (true) {
    const url = new URL(`${BREVO_API_URL}/crm/deals`)
    url.searchParams.set('limit', pageSize)
    url.searchParams.set('offset', offset)

    const response = await fetch(url.toString(), {
      headers: { 'api-key': BREVO_API_KEY }
    })

    if (!response.ok) throw new Error(`Brevo deals error: ${response.status}`)

    const data = await response.json()
    deals.push(...(data.items || []))

    if (!data.items || data.items.length < pageSize) break
    offset += pageSize
  }

  return deals
}

/**
 * Get conversion action ID from Google Ads
 */
async function getConversionActionId(customer) {
  const query = `
    SELECT 
      conversion_action.id,
      conversion_action.name,
      conversion_action.status
    FROM conversion_action
    WHERE conversion_action.name = '${CONVERSION_ACTION_NAME}'
  `

  try {
    const results = await customer.query(query)
    if (results.length > 0) {
      return results[0].conversion_action.id
    }
    return null
  } catch (error) {
    console.error('Error fetching conversion action:', error.message)
    return null
  }
}

/**
 * Upload Enhanced Conversions to Google Ads
 */
async function uploadEnhancedConversions(customer, conversions, conversionActionId) {
  if (!conversions.length) {
    console.log('   No conversions to upload')
    return { success: 0, failed: 0 }
  }

  const conversionAdjustments = conversions.map((conv) => ({
    conversion_action: `customers/${CUSTOMER_ID}/conversionActions/${conversionActionId}`,
    adjustment_type: 'ENHANCEMENT',
    adjustment_date_time: conv.conversionTime,
    user_identifiers: [
      conv.hashedEmail ? { hashed_email: conv.hashedEmail } : null,
      conv.hashedPhone ? { hashed_phone_number: conv.hashedPhone } : null
    ].filter(Boolean),
    user_agent: 'Mozilla/5.0', // Generic user agent
    conversion_date_time: conv.conversionTime,
    order_id: conv.orderId
  }))

  try {
    const response = await customer.conversionAdjustmentUploads.uploadConversionAdjustments({
      customer_id: CUSTOMER_ID,
      conversions: conversionAdjustments,
      partial_failure: true
    })

    const successCount = conversionAdjustments.length - (response.partial_failure_error?.errors?.length || 0)
    const failedCount = response.partial_failure_error?.errors?.length || 0

    return { success: successCount, failed: failedCount }
  } catch (error) {
    console.error('Error uploading conversions:', error.message)
    return { success: 0, failed: conversions.length }
  }
}

/**
 * Main sync function
 */
async function syncEnhancedConversions() {
  console.log('═'.repeat(70))
  console.log('🔄 GOOGLE ADS ENHANCED CONVERSIONS SYNC')
  console.log('═'.repeat(70))
  console.log(`📅 Syncing conversions since: ${START_DATE}`)
  console.log(`🎯 Conversion Action: ${CONVERSION_ACTION_NAME}`)
  console.log(`💰 Conversion Value: ${CONVERSION_CURRENCY} ${CONVERSION_VALUE.toLocaleString()}\n`)

  // Initialize Google Ads client
  console.log('🔐 Connecting to Google Ads API...')
  const client = new GoogleAdsApi(GOOGLE_ADS_CONFIG)
  const customer = client.Customer({
    customer_id: CUSTOMER_ID,
    refresh_token: GOOGLE_ADS_CONFIG.refresh_token
  })

  // Get conversion action ID
  console.log('📋 Fetching conversion action...')
  const conversionActionId = await getConversionActionId(customer)

  if (!conversionActionId) {
    console.error(`❌ Conversion action "${CONVERSION_ACTION_NAME}" not found in Google Ads`)
    console.log('\n💡 To create it:')
    console.log('   1. Go to Google Ads > Tools > Conversions')
    console.log('   2. Click "+ New conversion action"')
    console.log('   3. Select "Import" > "Other data sources"')
    console.log(`   4. Name it exactly: "${CONVERSION_ACTION_NAME}"`)
    return
  }
  console.log(`   ✅ Found conversion action ID: ${conversionActionId}`)

  // Fetch Brevo data
  console.log('\n📥 Fetching Brevo contacts...')
  const contacts = await fetchBrevoContacts()
  console.log(`   Found ${contacts.length} contacts`)

  console.log('📥 Fetching pipeline deals...')
  const deals = await fetchPipelineDeals()
  console.log(`   Found ${deals.length} deals`)

  // Filter to applicants only
  const applicantDeals = deals.filter((deal) => APPLIED_STAGE_IDS.includes(deal.attributes?.deal_stage))
  console.log(`\n✅ Found ${applicantDeals.length} applicants in pipeline`)

  // Build contact lookup
  const contactMap = new Map()
  contacts.forEach((c) => {
    if (c.id) contactMap.set(c.id, c)
  })

  // Prepare conversion data
  const conversions = []
  const seen = new Set()

  for (const deal of applicantDeals) {
    const contactIds = deal.linkedContactsIds || []
    let contact = null

    for (const cid of contactIds) {
      if (contactMap.has(cid)) {
        contact = contactMap.get(cid)
        break
      }
    }

    if (!contact) continue

    // Dedupe by email
    const email = contact.email?.toLowerCase()
    if (seen.has(email)) continue
    seen.add(email)

    const attrs = contact.attributes || {}
    const hashedEmail = sha256Hash(email)
    const hashedPhone = sha256Hash(normalizePhone(attrs.SMS || attrs.PHONE || attrs.WHATSAPP))

    if (!hashedEmail && !hashedPhone) continue

    // Format conversion time
    const convTime = new Date(deal.attributes?.created_at || deal.createdAt)
    const formattedTime = convTime.toISOString().replace('T', ' ').slice(0, 19) + '+00:00'

    conversions.push({
      hashedEmail,
      hashedPhone,
      conversionTime: formattedTime,
      orderId: `ADMI-${deal.id.slice(-8)}`, // Unique order ID
      value: CONVERSION_VALUE,
      currency: CONVERSION_CURRENCY
    })
  }

  console.log(`📋 Prepared ${conversions.length} conversions for upload`)

  // Upload to Google Ads
  console.log('\n⬆️  Uploading Enhanced Conversions to Google Ads...')
  const result = await uploadEnhancedConversions(customer, conversions, conversionActionId)

  // Summary
  console.log('\n' + '═'.repeat(70))
  console.log('📊 SYNC SUMMARY')
  console.log('═'.repeat(70))
  console.log(`
   Total Applicants:    ${applicantDeals.length}
   Conversions Prepared: ${conversions.length}
   Successfully Uploaded: ${result.success}
   Failed:              ${result.failed}
   
   Conversion Action:   ${CONVERSION_ACTION_NAME}
   Conversion Value:    ${CONVERSION_CURRENCY} ${CONVERSION_VALUE.toLocaleString()} per conversion
   Total Value Uploaded: ${CONVERSION_CURRENCY} ${(result.success * CONVERSION_VALUE).toLocaleString()}
  `)

  if (result.success > 0) {
    console.log('✅ Enhanced Conversions synced successfully!')
    console.log('   Google Ads will use this data to optimize campaigns.')
  }

  return result
}

// Run
syncEnhancedConversions().catch((err) => {
  console.error('❌ Sync failed:', err.message)
  process.exit(1)
})
