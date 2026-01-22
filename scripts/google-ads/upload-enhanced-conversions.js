#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Automated Enhanced Conversions Upload to Google Ads
 *
 * This script:
 * 1. Fetches Applied/Decision Making deals from Brevo
 * 2. Enriches with contact data (email, phone)
 * 3. Uploads as Enhanced Conversions to Google Ads API
 *
 * Can be run:
 * - Manually: node scripts/google-ads/upload-enhanced-conversions.js
 * - Via cron: Daily at 6 AM
 * - Via webhook: When deal stage changes in Brevo
 *
 * Conversion Values (based on win probability × avg tuition):
 * - MQL (40%): KES 120,000
 * - SQL (60%): KES 180,000
 * - Applied (80%): KES 240,000
 * - Decision Making (90%): KES 270,000
 * - Enrolled (100%): KES 300,000
 */

require('dotenv/config')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_API_URL = 'https://api.brevo.com/v3'

// Google Ads Configuration
const GOOGLE_ADS_CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID // Format: 123-456-7890
const GOOGLE_ADS_DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
const GOOGLE_ADS_REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN
const GOOGLE_ADS_CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID
const GOOGLE_ADS_CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET

// Pipeline Stage IDs (January 2026 Pipeline)
const STAGES = {
  UNQUALIFIED: '2ixzacgsn412m7y0ed20st5',
  MQL: 'f17io0yg7xl1rdmb5cy1d44',
  SQL: '39539oz5gs2ktjvywn7pl6v',
  APPLIED: '27x209expgyhg8428lh7ocn',
  DECISION_MAKING: 'pwi0xiqbtdwe6brfz7vgxen',
  ENROLLED: '7s2qqq3i6xla8uzrwwgpia2',
  LOST: 'ng1kn4njnv7covnpvwkhxv1'
}

// Conversion values by stage (KES)
const CONVERSION_VALUES = {
  [STAGES.MQL]: 120000, // 40% × 300K
  [STAGES.SQL]: 180000, // 60% × 300K
  [STAGES.APPLIED]: 240000, // 80% × 300K
  [STAGES.DECISION_MAKING]: 270000, // 90% × 300K
  [STAGES.ENROLLED]: 300000 // 100% × 300K
}

// Conversion action names in Google Ads
const CONVERSION_ACTIONS = {
  [STAGES.MQL]: 'MQL - Marketing Qualified Lead',
  [STAGES.SQL]: 'SQL - Sales Qualified Lead',
  [STAGES.APPLIED]: 'Application Submitted',
  [STAGES.DECISION_MAKING]: 'Decision Making',
  [STAGES.ENROLLED]: 'Enrolled Student'
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SHA256 hash for Google Ads Enhanced Conversions
 */
function sha256Hash(value) {
  if (!value) return null
  const normalized = String(value).toLowerCase().trim()
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

/**
 * Normalize phone to E.164 format
 */
function normalizePhone(phone) {
  if (!phone) return null
  let digits = phone.replace(/\D/g, '')

  // Handle Kenyan numbers
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '254' + digits.substring(1)
  }
  if (digits.startsWith('7') && digits.length === 9) {
    digits = '254' + digits
  }

  return '+' + digits
}

/**
 * Get Google Ads access token
 */
async function getGoogleAdsAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_ADS_CLIENT_ID,
      client_secret: GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`)
  }

  const data = await response.json()
  return data.access_token
}

// ═══════════════════════════════════════════════════════════════════════════
// BREVO API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch all pipeline deals
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

    if (!response.ok) throw new Error(`Brevo API error: ${response.status}`)

    const data = await response.json()
    deals.push(...(data.items || []))

    if (!data.items || data.items.length < pageSize) break
    offset += pageSize
  }

  return deals
}

/**
 * Fetch all contacts
 */
async function fetchContacts() {
  const contacts = []
  let offset = 0
  const pageSize = 50

  while (true) {
    const url = new URL(`${BREVO_API_URL}/contacts`)
    url.searchParams.set('limit', pageSize)
    url.searchParams.set('offset', offset)

    const response = await fetch(url.toString(), {
      headers: { 'api-key': BREVO_API_KEY }
    })

    if (!response.ok) throw new Error(`Brevo API error: ${response.status}`)

    const data = await response.json()
    contacts.push(...(data.contacts || []))

    if (!data.contacts || data.contacts.length < pageSize) break
    offset += pageSize
  }

  return contacts
}

/**
 * Get contact by ID
 */
async function getContactById(contactId) {
  const response = await fetch(`${BREVO_API_URL}/contacts/${contactId}`, {
    headers: { 'api-key': BREVO_API_KEY }
  })

  if (!response.ok) return null
  return response.json()
}

// ═══════════════════════════════════════════════════════════════════════════
// GOOGLE ADS API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Upload enhanced conversions to Google Ads
 */
async function uploadEnhancedConversions(conversions, dryRun = false) {
  if (dryRun) {
    console.log('\n🔍 DRY RUN - Would upload these conversions:')
    conversions.forEach((c, i) => {
      console.log(`   ${i + 1}. ${c.conversionAction} - ${c.email} - KES ${c.conversionValue}`)
    })
    return { success: true, dryRun: true, count: conversions.length }
  }

  // Check if we have Google Ads credentials
  if (!GOOGLE_ADS_CUSTOMER_ID || !GOOGLE_ADS_DEVELOPER_TOKEN) {
    console.log('\n⚠️  Google Ads API credentials not configured')
    console.log('   Set these environment variables:')
    console.log('   - GOOGLE_ADS_CUSTOMER_ID')
    console.log('   - GOOGLE_ADS_DEVELOPER_TOKEN')
    console.log('   - GOOGLE_ADS_REFRESH_TOKEN')
    console.log('   - GOOGLE_ADS_CLIENT_ID')
    console.log('   - GOOGLE_ADS_CLIENT_SECRET')

    // Save to file for manual upload instead
    return saveForManualUpload(conversions)
  }

  try {
    const accessToken = await getGoogleAdsAccessToken()
    const customerId = GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '')

    // Build the conversion upload request
    const operations = conversions.map((c) => ({
      create: {
        conversionAction: `customers/${customerId}/conversionActions/${c.conversionActionId}`,
        conversionDateTime: c.conversionTime,
        conversionValue: c.conversionValue,
        currencyCode: 'KES',
        userIdentifiers: [
          c.hashedEmail ? { hashedEmail: c.hashedEmail } : null,
          c.hashedPhone ? { hashedPhoneNumber: c.hashedPhone } : null
        ].filter(Boolean)
      }
    }))

    const response = await fetch(
      `https://googleads.googleapis.com/v15/customers/${customerId}:uploadConversionAdjustments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'developer-token': GOOGLE_ADS_DEVELOPER_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversions: operations,
          partialFailure: true
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Google Ads API error: ${error}`)
    }

    const result = await response.json()
    return { success: true, result, count: conversions.length }
  } catch (error) {
    console.error('❌ Error uploading to Google Ads:', error.message)
    return saveForManualUpload(conversions)
  }
}

/**
 * Save conversions for manual upload if API fails
 */
function saveForManualUpload(conversions) {
  const outputDir = path.join(__dirname, '../../reports/google-ads-exports')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `enhanced-conversions-auto-${timestamp}.csv`
  const filepath = path.join(outputDir, filename)

  const headers = [
    'Email [SHA256]',
    'Phone [SHA256]',
    'Conversion Name',
    'Conversion Time',
    'Conversion Value',
    'Conversion Currency'
  ]

  const rows = conversions.map((c) => [
    c.hashedEmail || '',
    c.hashedPhone || '',
    c.conversionAction,
    c.conversionTime,
    c.conversionValue,
    'KES'
  ])

  const csv = [headers.join(','), ...rows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n')

  fs.writeFileSync(filepath, csv)
  console.log(`\n📁 Saved for manual upload: ${filepath}`)

  return { success: true, manualUpload: true, filepath, count: conversions.length }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const stageFilter = args.find((a) => a.startsWith('--stage='))?.split('=')[1]

  console.log('═'.repeat(70))
  console.log('📤 AUTOMATED ENHANCED CONVERSIONS UPLOAD')
  console.log('═'.repeat(70))
  console.log(`📅 Date: ${new Date().toISOString().split('T')[0]}`)
  if (dryRun) console.log('🔍 Mode: DRY RUN (no actual upload)')
  console.log('')

  // Fetch deals and contacts
  console.log('📥 Fetching Brevo data...')
  const [deals, contacts] = await Promise.all([fetchPipelineDeals(), fetchContacts()])
  console.log(`   Found ${deals.length} deals, ${contacts.length} contacts`)

  // Build contact lookup map
  const contactMap = new Map()
  contacts.forEach((c) => contactMap.set(c.id, c))

  // Filter to conversion-worthy stages
  const conversionStages = [STAGES.MQL, STAGES.SQL, STAGES.APPLIED, STAGES.DECISION_MAKING, STAGES.ENROLLED]

  // Apply stage filter if provided
  const targetStages = stageFilter ? [STAGES[stageFilter.toUpperCase()]] : conversionStages

  const conversionDeals = deals.filter((d) => targetStages.includes(d.attributes?.deal_stage))

  console.log('\n📊 Deals by Stage:')
  Object.entries(STAGES).forEach(([name, id]) => {
    const count = deals.filter((d) => d.attributes?.deal_stage === id).length
    if (count > 0) console.log(`   • ${name}: ${count}`)
  })

  console.log(`\n🎯 Processing ${conversionDeals.length} deals for conversion upload...`)

  // Build conversion data
  const conversions = []
  const processed = new Set() // Track processed emails to avoid duplicates

  for (const deal of conversionDeals) {
    const contactIds = deal.linkedContactsIds || []
    if (contactIds.length === 0) continue

    // Get the primary contact
    let contact = contactMap.get(contactIds[0])
    if (!contact) {
      contact = await getContactById(contactIds[0])
      if (!contact) continue
    }

    const email = contact.email
    const phone = contact.attributes?.SMS || contact.attributes?.PHONE || contact.attributes?.WHATSAPP

    // Skip if already processed (avoid duplicate conversions)
    const key = `${email}-${deal.attributes?.deal_stage}`
    if (processed.has(key)) continue
    processed.add(key)

    const stageId = deal.attributes?.deal_stage
    const conversionValue = CONVERSION_VALUES[stageId]
    const conversionAction = CONVERSION_ACTIONS[stageId]

    if (!conversionValue || !conversionAction) continue

    // Format conversion time
    const convTime = new Date(deal.attributes?.stage_updated_at || deal.attributes?.created_at)
    const formattedTime = convTime.toISOString().replace('T', ' ').slice(0, 19) + '+00:00'

    conversions.push({
      email,
      hashedEmail: sha256Hash(email),
      phone: normalizePhone(phone),
      hashedPhone: sha256Hash(normalizePhone(phone)),
      conversionAction,
      conversionValue,
      conversionTime: formattedTime,
      dealId: deal.id,
      contactName: `${contact.attributes?.FIRSTNAME || ''} ${contact.attributes?.LASTNAME || ''}`.trim()
    })
  }

  console.log(`\n✅ Prepared ${conversions.length} unique conversions`)

  // Group by conversion action for summary
  console.log('\n📊 Conversions by Type:')
  const byType = {}
  conversions.forEach((c) => {
    byType[c.conversionAction] = byType[c.conversionAction] || { count: 0, value: 0 }
    byType[c.conversionAction].count++
    byType[c.conversionAction].value += c.conversionValue
  })
  Object.entries(byType).forEach(([action, data]) => {
    console.log(`   • ${action}: ${data.count} (KES ${data.value.toLocaleString()})`)
  })

  // Upload to Google Ads
  console.log('\n📤 Uploading to Google Ads...')
  const result = await uploadEnhancedConversions(conversions, dryRun)

  // Summary
  console.log('\n' + '═'.repeat(70))
  console.log('📊 UPLOAD SUMMARY')
  console.log('═'.repeat(70))
  console.log(`   Total Conversions: ${result.count}`)
  console.log(`   Total Value: KES ${conversions.reduce((s, c) => s + c.conversionValue, 0).toLocaleString()}`)
  if (result.manualUpload) {
    console.log('   Method: Manual upload file created')
    console.log(`   File: ${result.filepath}`)
  } else if (result.dryRun) {
    console.log('   Method: Dry run (no upload)')
  } else {
    console.log('   Method: Google Ads API')
    console.log('   Status: Success')
  }
  console.log('')

  // Save tracking log
  const logPath = path.join(__dirname, '../../logs/enhanced-conversions')
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true })
  }

  const logFile = path.join(logPath, `upload-${new Date().toISOString().split('T')[0]}.json`)
  fs.writeFileSync(
    logFile,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        conversions: conversions.length,
        totalValue: conversions.reduce((s, c) => s + c.conversionValue, 0),
        byType,
        dryRun,
        result: result.success ? 'success' : 'failed'
      },
      null,
      2
    )
  )

  console.log(`📝 Log saved: ${logFile}`)
  console.log('\n✅ Done!')
}

main().catch(console.error)
