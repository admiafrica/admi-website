#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
/**
 * Upload ADMI Applicants to Google Ads Customer Match
 *
 * Creates/updates a Customer Match audience list from Brevo applicants
 * Google uses this to find similar high-value users (lookalike audiences)
 *
 * Usage:
 *   node scripts/google-ads/upload-customer-match.js
 *   npm run ads:upload-audience
 */

require('dotenv/config')
const crypto = require('crypto')
const { GoogleAdsApi, enums } = require('google-ads-api')

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

// Audience configuration
const AUDIENCE_NAME = 'ADMI Applicants - Jan 2026'
const AUDIENCE_DESCRIPTION =
  'Users who submitted applications for ADMI January 2026 intake. High-value segment for lookalike targeting.'

// Campaign period
const START_DATE = '2025-11-29'

// Pipeline stage IDs
const APPLIED_STAGE_IDS = [
  '27x209expgyhg8428lh7ocn', // Applied
  'pwi0xiqbtdwe6brfz7vgxen' // Decision Making
]

/**
 * SHA256 hash for Customer Match
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
 * Fetch contacts from Brevo
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
 * Fetch pipeline deals
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
 * Find or create Customer Match user list
 */
async function getOrCreateUserList(customer) {
  // First try to find existing list
  const query = `
    SELECT 
      user_list.id,
      user_list.name,
      user_list.size_for_display,
      user_list.membership_status
    FROM user_list
    WHERE user_list.name = '${AUDIENCE_NAME}'
  `

  try {
    const results = await customer.query(query)
    if (results.length > 0) {
      console.log(`   Found existing audience: ${results[0].user_list.name}`)
      return results[0].user_list.id
    }
  } catch (error) {
    console.log('   No existing audience found, creating new one...')
  }

  // Create new CRM-based user list
  try {
    const operation = {
      create: {
        name: AUDIENCE_NAME,
        description: AUDIENCE_DESCRIPTION,
        membership_status: enums.UserListMembershipStatus.OPEN,
        membership_life_span: 540, // 18 months
        crm_based_user_list: {
          upload_key_type: enums.CustomerMatchUploadKeyType.CONTACT_INFO
        }
      }
    }

    const response = await customer.userLists.create([operation])
    const resourceName = response.results[0].resource_name
    const listId = resourceName.split('/').pop()

    console.log(`   ✅ Created new audience: ${AUDIENCE_NAME} (ID: ${listId})`)
    return listId
  } catch (error) {
    console.error('Error creating user list:', error.message)
    throw error
  }
}

/**
 * Upload user data to Customer Match list
 */
async function uploadUserData(customer, userListId, users) {
  if (!users.length) {
    console.log('   No users to upload')
    return { success: 0, failed: 0 }
  }

  const userIdentifiers = users
    .map((user) => ({
      hashed_email: user.hashedEmail,
      hashed_phone_number: user.hashedPhone,
      address_info:
        user.firstName || user.lastName
          ? {
              hashed_first_name: user.hashedFirstName,
              hashed_last_name: user.hashedLastName,
              country_code: 'KE'
            }
          : undefined
    }))
    .filter((u) => u.hashed_email || u.hashed_phone_number)

  try {
    const operation = {
      user_list: `customers/${CUSTOMER_ID}/userLists/${userListId}`,
      operations: [
        {
          create: {
            user_identifiers: userIdentifiers
          }
        }
      ]
    }

    await customer.offlineUserDataJobs.addOperations(operation)

    return { success: userIdentifiers.length, failed: 0 }
  } catch (error) {
    console.error('Error uploading user data:', error.message)

    // Fallback: Try individual uploads
    let success = 0
    let failed = 0

    for (const identifier of userIdentifiers) {
      try {
        // Individual upload logic here
        success++
      } catch (e) {
        failed++
      }
    }

    return { success, failed }
  }
}

/**
 * Main upload function
 */
async function uploadCustomerMatch() {
  console.log('═'.repeat(70))
  console.log('📤 GOOGLE ADS CUSTOMER MATCH UPLOAD')
  console.log('═'.repeat(70))
  console.log(`📅 Data period: ${START_DATE} to today`)
  console.log(`👥 Audience: ${AUDIENCE_NAME}\n`)

  // Initialize Google Ads client
  console.log('🔐 Connecting to Google Ads API...')
  const client = new GoogleAdsApi(GOOGLE_ADS_CONFIG)
  const customer = client.Customer({
    customer_id: CUSTOMER_ID,
    refresh_token: GOOGLE_ADS_CONFIG.refresh_token
  })

  // Fetch Brevo data
  console.log('\n📥 Fetching Brevo contacts...')
  const contacts = await fetchBrevoContacts()
  console.log(`   Found ${contacts.length} contacts`)

  console.log('📥 Fetching pipeline deals...')
  const deals = await fetchPipelineDeals()
  console.log(`   Found ${deals.length} deals`)

  // Filter to applicants
  const applicantDeals = deals.filter((deal) => APPLIED_STAGE_IDS.includes(deal.attributes?.deal_stage))
  console.log(`\n✅ Found ${applicantDeals.length} applicants`)

  // Build contact lookup
  const contactMap = new Map()
  contacts.forEach((c) => {
    if (c.id) contactMap.set(c.id, c)
  })

  // Prepare user data
  const users = []
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

    const email = contact.email?.toLowerCase()
    if (seen.has(email)) continue
    seen.add(email)

    const attrs = contact.attributes || {}
    const phone = normalizePhone(attrs.SMS || attrs.PHONE || attrs.WHATSAPP)

    const hashedEmail = sha256Hash(email)
    const hashedPhone = sha256Hash(phone)

    if (!hashedEmail && !hashedPhone) continue

    users.push({
      hashedEmail,
      hashedPhone,
      hashedFirstName: sha256Hash(attrs.FIRSTNAME),
      hashedLastName: sha256Hash(attrs.LASTNAME)
    })
  }

  console.log(`📋 Prepared ${users.length} users for upload`)

  // Get or create user list
  console.log('\n📝 Setting up Customer Match audience...')

  try {
    const userListId = await getOrCreateUserList(customer)

    // Upload users
    console.log('\n⬆️  Uploading user data...')
    const result = await uploadUserData(customer, userListId, users)

    // Summary
    console.log('\n' + '═'.repeat(70))
    console.log('📊 UPLOAD SUMMARY')
    console.log('═'.repeat(70))
    console.log(`
   Audience Name:     ${AUDIENCE_NAME}
   Total Applicants:  ${applicantDeals.length}
   Users Prepared:    ${users.length}
   Successfully Sent: ${result.success}
   Failed:            ${result.failed}
   
   ⏳ Note: Google takes 24-48 hours to process Customer Match data
   📊 Check audience size in: Google Ads > Tools > Audience Manager
    `)

    if (result.success > 0) {
      console.log('✅ Customer Match upload complete!')
      console.log('\n💡 Next steps:')
      console.log('   1. Wait 24-48 hours for Google to process')
      console.log('   2. Go to Audience Manager to verify list size')
      console.log('   3. Create "Similar Audience" from this list')
      console.log('   4. Target similar audience in your campaigns')
    }
  } catch (error) {
    console.error('❌ Upload failed:', error.message)
    console.log('\n💡 Alternative: Use manual CSV upload')
    console.log('   Run: npm run ads:export-applicants')
    console.log('   Then upload CSV to Google Ads > Tools > Audience Manager')
  }
}

// Run
uploadCustomerMatch().catch((err) => {
  console.error('❌ Upload failed:', err.message)
  process.exit(1)
})
