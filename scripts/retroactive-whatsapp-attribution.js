/**
 * Retroactive WhatsApp Attribution Fixer
 *
 * Purpose: Add utm_source=whatsapp attribution to legacy WhatsApp contacts
 * that were created before the multi-touch attribution system (Jan 2, 2026)
 *
 * Identifies WhatsApp contacts by:
 * 1. Email pattern: 254XXXXXXXXX@mailin-wa.com
 * 2. Existing UTM_SOURCE=whatsapp but missing MEDIUM/CAMPAIGN
 * 3. No other UTM tracking but known to be from WhatsApp
 *
 * Usage: node scripts/retroactive-whatsapp-attribution.js
 */

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const https = require('https')

const API_KEY = process.env.BREVO_API_KEY
if (!API_KEY) {
  console.error('❌ BREVO_API_KEY not set')
  process.exit(1)
}

const stats = {
  total_checked: 0,
  whatsapp_identified: 0,
  already_complete: 0,
  updated_successfully: 0,
  update_failed: 0,
  api_errors: 0
}

/**
 * Make API request to Brevo
 */
function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (res.statusCode >= 400) {
            reject({
              status: res.statusCode,
              message: parsed.message || data
            })
          } else {
            resolve(parsed)
          }
        } catch (e) {
          reject(e)
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
 * Check if contact is a WhatsApp lead
 */
function isWhatsAppContact(contact) {
  const attrs = contact.attributes || {}
  const email = contact.email || ''

  // Pattern 1: Email from Brevo WhatsApp integration
  if (email.match(/^\d{12,13}@mailin-wa\.com$/)) {
    return {
      reason: 'Email pattern (mailin-wa.com)',
      type: 'unattributed'
    }
  }

  // Pattern 2: Already has utm_source=whatsapp but missing medium
  if (attrs.UTM_SOURCE === 'whatsapp' && (!attrs.UTM_MEDIUM || !attrs.UTM_CAMPAIGN)) {
    return {
      reason: 'Incomplete WhatsApp attribution',
      type: 'incomplete'
    }
  }

  // Pattern 3: Check if no other UTM tracking and SMS field suggests WhatsApp
  const hasNoUTM = !attrs.UTM_SOURCE || attrs.UTM_SOURCE === 'direct' || attrs.UTM_SOURCE === ''
  if (hasNoUTM && attrs.SMS && !attrs.FIRST_TOUCH_SOURCE) {
    // This is uncertain - skip for now to avoid false positives
    // Only process if explicitly matched by patterns 1 or 2
  }

  return null
}

/**
 * Update contact with WhatsApp attribution
 */
async function updateWhatsAppContact(contact) {
  try {
    const attrs = contact.attributes || {}

    // Preserve any existing data
    const updatePayload = {
      attributes: {
        // Last-touch: WhatsApp
        UTM_SOURCE: 'whatsapp',
        UTM_MEDIUM: 'messaging',
        UTM_CAMPAIGN: 'whatsapp-organic',

        // First-touch: Only set if doesn't exist
        FIRST_TOUCH_SOURCE: attrs.FIRST_TOUCH_SOURCE || 'whatsapp',
        FIRST_TOUCH_MEDIUM: attrs.FIRST_TOUCH_MEDIUM || 'messaging',
        FIRST_TOUCH_CAMPAIGN: attrs.FIRST_TOUCH_CAMPAIGN || 'whatsapp-organic',
        FIRST_TOUCH_TIMESTAMP: attrs.FIRST_TOUCH_TIMESTAMP || new Date().toISOString(),

        // Referrer
        REFERRER: attrs.REFERRER || 'WhatsApp Business',

        // Landing page
        LANDING_PAGE: attrs.LANDING_PAGE || 'WhatsApp Chat'
      },
      updateEnabled: true
    }

    const options = {
      hostname: 'api.brevo.com',
      port: 443,
      path: `/v3/contacts/${encodeURIComponent(contact.email)}`,
      method: 'PUT',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    }

    await makeRequest(options, updatePayload)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Fetch all contacts with pagination
 */
async function fetchAllContacts(limit = 100, offset = 0) {
  const options = {
    hostname: 'api.brevo.com',
    port: 443,
    path: `/v3/contacts?limit=${limit}&offset=${offset}`,
    method: 'GET',
    headers: {
      'api-key': API_KEY,
      accept: 'application/json'
    }
  }

  return makeRequest(options)
}

/**
 * Main processing loop
 */
async function processContacts() {
  console.log('🔄 Starting retroactive WhatsApp attribution fix...\n')

  let offset = 0
  const limit = 100
  let hasMore = true
  let batchNumber = 0

  while (hasMore) {
    batchNumber++
    console.log(`📦 Processing batch ${batchNumber} (offset: ${offset})...`)

    try {
      const response = await fetchAllContacts(limit, offset)
      const contacts = response.contacts || []

      if (contacts.length === 0) {
        hasMore = false
        break
      }

      for (const contact of contacts) {
        stats.total_checked++

        const whatsappMatch = isWhatsAppContact(contact)
        if (!whatsappMatch) {
          continue
        }

        stats.whatsapp_identified++

        // Check if already complete
        const attrs = contact.attributes || {}
        if (
          attrs.UTM_SOURCE === 'whatsapp' &&
          attrs.UTM_MEDIUM === 'messaging' &&
          attrs.UTM_CAMPAIGN === 'whatsapp-organic'
        ) {
          stats.already_complete++
          continue
        }

        // Update contact
        const result = await updateWhatsAppContact(contact)
        if (result.success) {
          stats.updated_successfully++
          const email = contact.email || `ID:${contact.id}`
          console.log(`  ✅ Updated: ${email} (${whatsappMatch.reason})`)
        } else {
          stats.update_failed++
          console.log(`  ❌ Failed: ${contact.email || contact.id} - ${result.error}`)
        }

        // Rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      offset += limit

      // Check if we got fewer results than requested (last page)
      if (contacts.length < limit) {
        hasMore = false
      }
    } catch (error) {
      stats.api_errors++
      console.error(`  ⚠️  API Error in batch ${batchNumber}:`, error.message)

      // Don't stop, just log and continue
      offset += limit
    }
  }
}

/**
 * Print summary report
 */
function printSummary() {
  console.log('\n' + '='.repeat(60))
  console.log('📊 RETROACTIVE WHATSAPP ATTRIBUTION FIX - SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total contacts checked: ${stats.total_checked}`)
  console.log(`WhatsApp contacts identified: ${stats.whatsapp_identified}`)
  console.log(`  ├─ Already complete: ${stats.already_complete} (no action needed)`)
  console.log(`  ├─ Successfully updated: ${stats.updated_successfully} ✅`)
  console.log(`  ├─ Failed to update: ${stats.update_failed} ❌`)
  console.log(`API errors encountered: ${stats.api_errors}`)
  console.log('='.repeat(60))

  const successRate =
    stats.whatsapp_identified > 0
      ? (((stats.updated_successfully + stats.already_complete) / stats.whatsapp_identified) * 100).toFixed(1)
      : 0

  console.log(`\n✨ Success Rate: ${successRate}%`)
  console.log(`🎯 Impact: Fixed attribution for ${stats.updated_successfully} contacts\n`)

  if (stats.update_failed > 0) {
    console.log(`⚠️  Note: ${stats.update_failed} contacts failed to update. Check logs above.`)
    console.log('   You may need to retry these manually or investigate.\n')
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    await processContacts()
    printSummary()
  } catch (error) {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  }
}

main()
