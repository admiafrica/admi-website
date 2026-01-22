#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Export ADMI Applicants for Google Ads Customer Match & Offline Conversions
 *
 * This script exports applicant data in two formats:
 * 1. Customer Match CSV - For creating audience lists
 * 2. Offline Conversions CSV - For importing conversions with GCLID
 *
 * Usage: node scripts/google-ads/export-applicants-for-google.js
 */

require('dotenv/config')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_API_URL = 'https://api.brevo.com/v3'

// Campaign period
const START_DATE = '2025-11-29'
const END_DATE = '2026-01-31'

/**
 * SHA256 hash for Google Ads (required format)
 */
function sha256Hash(value) {
  if (!value) return ''
  // Normalize: lowercase, trim whitespace
  const normalized = String(value).toLowerCase().trim()
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

/**
 * Normalize phone number to E.164 format
 */
function normalizePhone(phone) {
  if (!phone) return ''
  // Remove all non-digits
  let digits = phone.replace(/\D/g, '')

  // Handle Kenyan numbers
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
 * Fetch contacts from Brevo with date filter using modifiedSince
 */
async function fetchBrevoContacts(startDate = null, limit = 10000) {
  const contacts = []
  let offset = 0
  const pageSize = 50

  while (true) {
    const url = new URL(`${BREVO_API_URL}/contacts`)
    url.searchParams.set('limit', pageSize)
    url.searchParams.set('offset', offset)

    // Filter by modification date (contacts created/modified since campaign start)
    if (startDate) {
      url.searchParams.set('modifiedSince', new Date(startDate).toISOString())
    }

    const response = await fetch(url.toString(), {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Brevo API error: ${response.status}`)
    }

    const data = await response.json()
    contacts.push(...(data.contacts || []))

    if (!data.contacts || data.contacts.length < pageSize || contacts.length >= limit) {
      break
    }
    offset += pageSize
  }

  return contacts
}

/**
 * Fetch pipeline deals to identify applicants
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
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Brevo API error: ${response.status}`)
    }

    const data = await response.json()
    deals.push(...(data.items || []))

    if (!data.items || data.items.length < pageSize) {
      break
    }
    offset += pageSize
  }

  return deals
}

/**
 * Main export function
 */
async function exportApplicantsForGoogleAds() {
  console.log('═'.repeat(80))
  console.log('📊 EXPORT APPLICANTS FOR GOOGLE ADS')
  console.log('═'.repeat(80))
  console.log(`📅 Campaign Period: ${START_DATE} to ${END_DATE}\n`)

  // Fetch contacts created/modified since campaign start (much faster!)
  console.log(`📥 Fetching Brevo contacts (since ${START_DATE})...`)
  const allContacts = await fetchBrevoContacts(START_DATE, 10000)
  console.log(`   Found ${allContacts.length} contacts in campaign period`)

  console.log('📥 Fetching pipeline deals...')
  const allDeals = await fetchPipelineDeals()
  console.log(`   Found ${allDeals.length} total deals`)

  // Applied stages (stage IDs for "Applied" and "Decision Making")
  const appliedStageIds = [
    '27x209expgyhg8428lh7ocn', // Applied
    'pwi0xiqbtdwe6brfz7vgxen' // Decision Making
  ]

  // Filter deals to only applicants
  const applicantDeals = allDeals.filter((deal) => {
    const isApplicant = appliedStageIds.includes(deal.attributes?.deal_stage)
    return isApplicant
  })

  console.log(`\n✅ Found ${applicantDeals.length} applicants in pipeline\n`)

  // Build contact lookup map
  const contactMap = new Map()
  allContacts.forEach((contact) => {
    if (contact.email) {
      contactMap.set(contact.email.toLowerCase(), contact)
    }
  })

  // Enrich applicant data
  const applicants = []
  for (const deal of applicantDeals) {
    const contactIds = deal.linkedContactsIds || []
    let contact = null

    // Find linked contact
    for (const contactId of contactIds) {
      const foundContact = allContacts.find((c) => c.id === contactId)
      if (foundContact) {
        contact = foundContact
        break
      }
    }

    // Try to match by email in deal name or attributes
    if (!contact && deal.attributes?.email) {
      contact = contactMap.get(deal.attributes.email.toLowerCase())
    }

    if (contact) {
      const attrs = contact.attributes || {}
      applicants.push({
        email: contact.email,
        phone: attrs.SMS || attrs.PHONE || attrs.WHATSAPP || '',
        firstName: attrs.FIRSTNAME || '',
        lastName: attrs.LASTNAME || '',
        gclid: attrs.GCLID || '',
        conversionTime: deal.attributes?.created_at || deal.createdAt,
        course: attrs.COURSE_INTEREST || deal.attributes?.deal_name || '',
        source: attrs.UTM_SOURCE || attrs.FIRST_TOUCH_SOURCE || '',
        medium: attrs.UTM_MEDIUM || attrs.FIRST_TOUCH_MEDIUM || '',
        campaign: attrs.UTM_CAMPAIGN || attrs.FIRST_TOUCH_CAMPAIGN || ''
      })
    }
  }

  console.log(`📋 Enriched ${applicants.length} applicants with contact data\n`)

  // Create output directory
  const outputDir = path.join(__dirname, '../../reports/google-ads-exports')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().split('T')[0]

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. CUSTOMER MATCH CSV (for audience creation)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('📝 Generating Customer Match CSV...')

  const customerMatchHeaders = ['Email', 'Phone', 'First Name', 'Last Name', 'Country']

  const customerMatchRows = applicants.map((a) => [
    a.email,
    normalizePhone(a.phone),
    a.firstName,
    a.lastName,
    'KE' // Kenya
  ])

  const customerMatchCSV = [
    customerMatchHeaders.join(','),
    ...customerMatchRows.map((row) => row.map((v) => `"${v || ''}"`).join(','))
  ].join('\n')

  const customerMatchPath = path.join(outputDir, `customer-match-${timestamp}.csv`)
  fs.writeFileSync(customerMatchPath, customerMatchCSV)
  console.log(`   ✅ Saved: ${customerMatchPath}`)

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. CUSTOMER MATCH HASHED CSV (pre-hashed for direct upload)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('📝 Generating Customer Match HASHED CSV...')

  const hashedHeaders = ['Email [SHA256]', 'Phone [SHA256]', 'First Name [SHA256]', 'Last Name [SHA256]', 'Country']

  const hashedRows = applicants.map((a) => [
    sha256Hash(a.email),
    sha256Hash(normalizePhone(a.phone)),
    sha256Hash(a.firstName),
    sha256Hash(a.lastName),
    'KE'
  ])

  const hashedCSV = [
    hashedHeaders.join(','),
    ...hashedRows.map((row) => row.map((v) => `"${v || ''}"`).join(','))
  ].join('\n')

  const hashedPath = path.join(outputDir, `customer-match-hashed-${timestamp}.csv`)
  fs.writeFileSync(hashedPath, hashedCSV)
  console.log(`   ✅ Saved: ${hashedPath}`)

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. OFFLINE CONVERSIONS CSV (for GCLID-based conversion import)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('📝 Generating Offline Conversions CSV...')

  // Only include applicants with GCLID
  const applicantsWithGclid = applicants.filter((a) => a.gclid)

  const offlineHeaders = [
    'Google Click ID',
    'Conversion Name',
    'Conversion Time',
    'Conversion Value',
    'Conversion Currency'
  ]

  const offlineRows = applicantsWithGclid.map((a) => {
    // Format time as required: yyyy-MM-dd HH:mm:ss+TZ
    const convTime = new Date(a.conversionTime)
    const formattedTime = convTime.toISOString().replace('T', ' ').replace('Z', '+00:00').slice(0, 25)

    return [
      a.gclid,
      'Application Submitted', // Conversion action name in Google Ads
      formattedTime,
      '300000', // KES 300,000 average tuition value
      'KES'
    ]
  })

  const offlineCSV = [
    offlineHeaders.join(','),
    ...offlineRows.map((row) => row.map((v) => `"${v || ''}"`).join(','))
  ].join('\n')

  const offlinePath = path.join(outputDir, `offline-conversions-${timestamp}.csv`)
  fs.writeFileSync(offlinePath, offlineCSV)
  console.log(`   ✅ Saved: ${offlinePath}`)
  console.log(`   📊 ${applicantsWithGclid.length} applicants have GCLID for offline import`)

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. ENHANCED CONVERSIONS CSV (email/phone based)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('📝 Generating Enhanced Conversions CSV...')

  const enhancedHeaders = [
    'Email [SHA256]',
    'Phone [SHA256]',
    'Conversion Name',
    'Conversion Time',
    'Conversion Value',
    'Conversion Currency'
  ]

  const enhancedRows = applicants.map((a) => {
    const convTime = new Date(a.conversionTime)
    const formattedTime = convTime.toISOString().replace('T', ' ').replace('Z', '+00:00').slice(0, 25)

    return [
      sha256Hash(a.email),
      sha256Hash(normalizePhone(a.phone)),
      'Application Submitted',
      formattedTime,
      '300000',
      'KES'
    ]
  })

  const enhancedCSV = [
    enhancedHeaders.join(','),
    ...enhancedRows.map((row) => row.map((v) => `"${v || ''}"`).join(','))
  ].join('\n')

  const enhancedPath = path.join(outputDir, `enhanced-conversions-${timestamp}.csv`)
  fs.writeFileSync(enhancedPath, enhancedCSV)
  console.log(`   ✅ Saved: ${enhancedPath}`)

  // ═══════════════════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n' + '═'.repeat(80))
  console.log('📊 EXPORT SUMMARY')
  console.log('═'.repeat(80))
  console.log(`
Total Applicants: ${applicants.length}
Applicants with GCLID: ${applicantsWithGclid.length}

Files Generated:
1. ${customerMatchPath}
   → Upload to: Google Ads > Tools > Audience Manager > Customer Lists
   → Use for: Creating Similar Audiences (lookalikes)

2. ${hashedPath}
   → Pre-hashed version for direct API upload
   → SHA256 hashed emails and phones

3. ${offlinePath}
   → Upload to: Google Ads > Tools > Conversions > Uploads
   → Use for: ROAS optimization (tells Google which clicks converted)
   → Note: Only ${applicantsWithGclid.length} applicants have GCLID

4. ${enhancedPath}
   → Upload to: Google Ads > Tools > Conversions > Uploads
   → Use for: Enhanced Conversions (email/phone matching)
`)

  // Stats by source
  console.log('📊 Applicants by Source:')
  const sourceStats = {}
  applicants.forEach((a) => {
    const source = a.source || 'Unknown'
    sourceStats[source] = (sourceStats[source] || 0) + 1
  })
  Object.entries(sourceStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([source, count]) => {
      console.log(`   • ${source}: ${count}`)
    })

  console.log('\n✅ Export complete!')
}

// Run
exportApplicantsForGoogleAds().catch(console.error)
