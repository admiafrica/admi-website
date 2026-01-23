#!/usr/bin/env node

/**
 * Flag Contacts Needing Attribution
 *
 * Identifies all contacts in Brevo that are missing GA_CLIENT_ID
 * and flags them for re-engagement tracking. When these contacts
 * return to the website, we can capture their GA_CLIENT_ID.
 *
 * What this script does:
 * 1. Fetches all contacts from Brevo (paginated)
 * 2. Identifies contacts without valid GA_CLIENT_ID
 * 3. Sets NEEDS_ATTRIBUTION_UPDATE = true for them
 * 4. Optionally filters by campaign date range
 *
 * Run: node scripts/flag-contacts-needing-attribution.js [--dry-run] [--since=YYYY-MM-DD]
 *
 * Options:
 *   --dry-run     Preview changes without updating Brevo
 *   --since       Only process contacts created after this date
 *   --limit       Maximum contacts to process (default: all)
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https')
require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY

if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found in environment variables')
  process.exit(1)
}

// Parse command line arguments
const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run')
const sinceArg = args.find((a) => a.startsWith('--since='))
const limitArg = args.find((a) => a.startsWith('--limit='))
const sinceDate = sinceArg ? new Date(sinceArg.split('=')[1]) : null
const maxContacts = limitArg ? parseInt(limitArg.split('=')[1]) : Infinity

/**
 * Make a request to Brevo API
 */
function makeBrevoRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          resolve({ status: res.statusCode, data: parsed })
        } catch (e) {
          resolve({ status: res.statusCode, data: data })
        }
      })
    })

    req.on('error', reject)

    if (body) {
      req.write(JSON.stringify(body))
    }

    req.end()
  })
}

/**
 * Validate GA Client ID format
 */
function isValidGaClientId(gaClientId) {
  if (!gaClientId || typeof gaClientId !== 'string') return false
  return /^\d+\.\d+$/.test(gaClientId)
}

/**
 * Fetch all contacts with pagination
 */
async function fetchAllContacts() {
  const contacts = []
  let offset = 0
  const limit = 100 // Brevo max per page
  let hasMore = true

  console.log('📥 Fetching contacts from Brevo...\n')

  while (hasMore && contacts.length < maxContacts) {
    const response = await makeBrevoRequest('GET', `/v3/contacts?limit=${limit}&offset=${offset}&sort=desc`)

    if (response.status !== 200) {
      console.error('Error fetching contacts:', response.data)
      break
    }

    const batch = response.data.contacts || []
    contacts.push(...batch)

    console.log(`   Fetched ${contacts.length} contacts...`)

    if (batch.length < limit) {
      hasMore = false
    } else {
      offset += limit
    }

    // Rate limiting - don't hammer the API
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  return contacts.slice(0, maxContacts)
}

/**
 * Update contact to flag for attribution
 */
async function flagContact(email, originalContactDate) {
  const updatePayload = {
    attributes: {
      NEEDS_ATTRIBUTION_UPDATE: true,
      ORIGINAL_CONTACT_DATE: originalContactDate || new Date().toISOString()
    }
  }

  const response = await makeBrevoRequest('PUT', `/v3/contacts/${encodeURIComponent(email)}`, updatePayload)

  return response.status === 204 || response.status === 200
}

/**
 * Main function
 */
async function main() {
  console.log('═'.repeat(80))
  console.log('🔍 FLAG CONTACTS NEEDING ATTRIBUTION UPDATE')
  console.log('═'.repeat(80))
  console.log('')

  if (isDryRun) {
    console.log('⚠️  DRY RUN MODE - No changes will be made\n')
  }

  if (sinceDate) {
    console.log(`📅 Filtering contacts created since: ${sinceDate.toISOString()}\n`)
  }

  if (maxContacts < Infinity) {
    console.log(`🔢 Processing maximum ${maxContacts} contacts\n`)
  }

  // Fetch all contacts
  const allContacts = await fetchAllContacts()
  console.log(`\n📊 Total contacts fetched: ${allContacts.length}\n`)

  // Filter contacts
  const contactsNeedingAttribution = allContacts.filter((contact) => {
    const attrs = contact.attributes || {}

    // Check if GA_CLIENT_ID is missing or invalid
    const gaClientId = attrs.GA_CLIENT_ID
    const needsUpdate = !isValidGaClientId(gaClientId)

    // Skip if already flagged
    if (attrs.NEEDS_ATTRIBUTION_UPDATE === true) {
      return false
    }

    // Skip if already has attribution updated
    if (attrs.ATTRIBUTION_UPDATED === true) {
      return false
    }

    // Filter by date if specified
    if (sinceDate) {
      const createdAt = new Date(contact.createdAt || contact.modifiedAt)
      if (createdAt < sinceDate) {
        return false
      }
    }

    return needsUpdate
  })

  console.log(`🎯 Contacts needing attribution: ${contactsNeedingAttribution.length}`)
  console.log('')

  if (contactsNeedingAttribution.length === 0) {
    console.log('✅ All contacts already have valid GA_CLIENT_ID or are flagged!')
    console.log('═'.repeat(80))
    return
  }

  // Show sample of contacts
  console.log('📋 Sample contacts to flag:')
  console.log('-'.repeat(60))

  const sample = contactsNeedingAttribution.slice(0, 10)
  for (const contact of sample) {
    const attrs = contact.attributes || {}
    console.log(`   ${contact.email}`)
    console.log(`      GA_CLIENT_ID: ${attrs.GA_CLIENT_ID || '(missing)'}`)
    console.log(`      UTM_SOURCE: ${attrs.UTM_SOURCE || attrs.FIRST_TOUCH_SOURCE || '(unknown)'}`)
    console.log(`      Created: ${contact.createdAt || 'unknown'}`)
    console.log('')
  }

  if (contactsNeedingAttribution.length > 10) {
    console.log(`   ... and ${contactsNeedingAttribution.length - 10} more\n`)
  }

  // If dry run, stop here
  if (isDryRun) {
    console.log('═'.repeat(80))
    console.log('🏁 DRY RUN COMPLETE')
    console.log('')
    console.log('To actually flag these contacts, run:')
    console.log('   node scripts/flag-contacts-needing-attribution.js')
    console.log('═'.repeat(80))
    return
  }

  // Confirm before proceeding
  console.log('═'.repeat(80))
  console.log(`⚠️  About to flag ${contactsNeedingAttribution.length} contacts`)
  console.log('   This will set NEEDS_ATTRIBUTION_UPDATE = true')
  console.log('')
  console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...')
  console.log('═'.repeat(80))

  await new Promise((resolve) => setTimeout(resolve, 5000))

  // Flag contacts
  console.log('\n🚀 Flagging contacts...\n')

  let flagged = 0
  let errors = 0

  for (let i = 0; i < contactsNeedingAttribution.length; i++) {
    const contact = contactsNeedingAttribution[i]

    try {
      const success = await flagContact(contact.email, contact.createdAt)

      if (success) {
        flagged++
        if (flagged % 50 === 0) {
          console.log(`   Progress: ${flagged}/${contactsNeedingAttribution.length} flagged`)
        }
      } else {
        errors++
        console.log(`   ❌ Failed to flag: ${contact.email}`)
      }
    } catch (err) {
      errors++
      console.log(`   ❌ Error flagging ${contact.email}: ${err.message}`)
    }

    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  // Summary
  console.log('')
  console.log('═'.repeat(80))
  console.log('📊 SUMMARY')
  console.log('═'.repeat(80))
  console.log(`✅ Contacts flagged: ${flagged}`)
  console.log(`❌ Errors: ${errors}`)
  console.log('')
  console.log('Next steps:')
  console.log('1. Deploy the re-engagement API: src/pages/api/v3/track-reengagement.ts')
  console.log('2. Call the API when flagged contacts interact with your site')
  console.log('3. Run this script periodically to flag new contacts')
  console.log('═'.repeat(80))
}

// Run
main().catch(console.error)
