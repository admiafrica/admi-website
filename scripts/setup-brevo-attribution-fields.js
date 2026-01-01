#!/usr/bin/env node

/**
 * Brevo CRM - Create First-Touch Attribution Fields
 *
 * Automatically creates the 5 new contact attributes needed for first-touch attribution:
 * - FIRST_TOUCH_SOURCE
 * - FIRST_TOUCH_MEDIUM
 * - FIRST_TOUCH_CAMPAIGN
 * - FIRST_TOUCH_TIMESTAMP
 * - GA_CLIENT_ID
 *
 * Run: node scripts/setup-brevo-attribution-fields.js
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https')
require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY

if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found in environment variables')
  process.exit(1)
}

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
 * Get existing contact attributes
 */
async function getExistingAttributes() {
  const response = await makeBrevoRequest('GET', '/v3/contacts/attributes')
  return response.data.attributes || []
}

/**
 * Create a contact attribute
 */
async function createAttribute(attributeName, type, enumeration = null) {
  const body = {
    type: type
  }

  if (enumeration) {
    body.enumeration = enumeration
  }

  const response = await makeBrevoRequest('POST', `/v3/contacts/attributes/normal/${attributeName}`, body)

  return response
}

/**
 * Main setup function
 */
async function setupAttributionFields() {
  console.log('🔧 BREVO CRM - FIRST-TOUCH ATTRIBUTION SETUP\n')
  console.log('═'.repeat(80))

  try {
    // 1. Get existing attributes
    console.log('\n📋 Step 1: Checking existing contact attributes...\n')
    const existing = await getExistingAttributes()
    const existingNames = existing.map((attr) => attr.name)

    console.log(`Found ${existing.length} existing attributes\n`)

    // 2. Define the fields we need
    const fieldsToCreate = [
      {
        name: 'FIRST_TOUCH_SOURCE',
        type: 'text',
        description: 'Original traffic source (e.g., google, facebook)'
      },
      {
        name: 'FIRST_TOUCH_MEDIUM',
        type: 'text',
        description: 'Original medium (e.g., cpc, social)'
      },
      {
        name: 'FIRST_TOUCH_CAMPAIGN',
        type: 'text',
        description: 'Original campaign name'
      },
      {
        name: 'FIRST_TOUCH_TIMESTAMP',
        type: 'date',
        description: 'When user first visited (ISO 8601 format)'
      },
      {
        name: 'GA_CLIENT_ID',
        type: 'text',
        description: 'Google Analytics client ID for cross-session tracking'
      }
    ]

    console.log('═'.repeat(80))
    console.log('\n🎯 Step 2: Creating first-touch attribution fields...\n')

    let created = 0
    let skipped = 0
    let errors = 0

    for (const field of fieldsToCreate) {
      if (existingNames.includes(field.name)) {
        console.log(`⏭️  ${field.name} - Already exists, skipping`)
        skipped++
        continue
      }

      try {
        const response = await createAttribute(field.name, field.type)

        if (response.status === 200 || response.status === 201) {
          console.log(`✅ ${field.name} - Created successfully (${field.type})`)
          console.log(`   Description: ${field.description}`)
          created++
        } else {
          console.log(`❌ ${field.name} - Failed (Status ${response.status})`)
          console.log(`   Response: ${JSON.stringify(response.data)}`)
          errors++
        }
      } catch (err) {
        console.log(`❌ ${field.name} - Error: ${err.message}`)
        errors++
      }
    }

    // 3. Summary
    console.log('\n' + '═'.repeat(80))
    console.log('\n📊 SUMMARY\n')
    console.log(`✅ Created: ${created} fields`)
    console.log(`⏭️  Skipped: ${skipped} fields (already exist)`)
    console.log(`❌ Errors: ${errors} fields`)

    if (created > 0 || skipped === fieldsToCreate.length) {
      console.log('\n✨ SUCCESS! Your Brevo CRM is now ready for first-touch attribution!\n')
      console.log('Next steps:')
      console.log('1. ✅ Deploy utm-tracking.ts to production')
      console.log('2. ✅ Update form submissions to send first-touch data')
      console.log('3. ✅ Enable Enhanced Conversions in Google Ads')
      console.log('4. ✅ Test attribution tracking')
      console.log('\nSee: docs/ENHANCED-CONVERSIONS-QUICK-START.md\n')
    } else {
      console.log('\n⚠️  Some fields could not be created. Check errors above.\n')
    }

    console.log('═'.repeat(80) + '\n')
  } catch (err) {
    console.error('\n❌ FATAL ERROR:', err.message)
    console.error(err)
    process.exit(1)
  }
}

// Run the setup
setupAttributionFields()
