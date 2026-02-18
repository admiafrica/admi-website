#!/usr/bin/env node

/**
 * Brevo CRM - Create Re-engagement Tracking Fields
 *
 * Creates fields needed to track re-engaged contacts and capture
 * GA_CLIENT_ID when historical contacts return to the website.
 *
 * Fields created:
 * - NEEDS_ATTRIBUTION_UPDATE (boolean) - Flag for contacts missing GA_CLIENT_ID
 * - REENGAGEMENT_DATE (date) - When contact re-engaged with website
 * - REENGAGEMENT_SOURCE (text) - How they re-engaged (chat, form, etc.)
 * - ATTRIBUTION_UPDATED (boolean) - Whether attribution has been backfilled
 *
 * Run: node scripts/setup-brevo-reengagement-fields.js
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
async function setupReengagementFields() {
  console.log('🔧 BREVO CRM - RE-ENGAGEMENT TRACKING SETUP\n')
  console.log('═'.repeat(80))
  console.log('\nPurpose: Track contacts who return to the website so we can')
  console.log('capture their GA_CLIENT_ID and update their attribution data.\n')
  console.log('═'.repeat(80))

  try {
    // 1. Get existing attributes
    console.log('\n📋 Step 1: Checking existing contact attributes...\n')
    const existing = await getExistingAttributes()
    const existingNames = existing.map((attr) => attr.name)

    console.log(`Found ${existing.length} existing attributes\n`)

    // 2. Define the re-engagement tracking fields
    const fieldsToCreate = [
      {
        name: 'NEEDS_ATTRIBUTION_UPDATE',
        type: 'boolean',
        description: 'Flag for contacts missing GA_CLIENT_ID that need tracking update'
      },
      {
        name: 'REENGAGEMENT_DATE',
        type: 'date',
        description: 'When the contact re-engaged with the website'
      },
      {
        name: 'REENGAGEMENT_SOURCE',
        type: 'text',
        description: 'How they re-engaged: chat, form, whatsapp, etc.'
      },
      {
        name: 'ATTRIBUTION_UPDATED',
        type: 'boolean',
        description: 'Whether attribution was backfilled from re-engagement'
      },
      {
        name: 'ORIGINAL_CONTACT_DATE',
        type: 'date',
        description: 'When the contact was originally created (for tracking delays)'
      }
    ]

    console.log('═'.repeat(80))
    console.log('\n🎯 Step 2: Creating re-engagement tracking fields...\n')

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
      console.log('\n✨ SUCCESS! Your Brevo CRM is ready for re-engagement tracking!\n')
      console.log('Next steps:')
      console.log('1. Run: node scripts/flag-contacts-needing-attribution.js')
      console.log('   (This flags all contacts without GA_CLIENT_ID)')
      console.log('')
      console.log('2. Deploy the re-engagement API endpoint')
      console.log('   (src/pages/api/v3/track-reengagement.ts)')
      console.log('')
      console.log('3. Integrate with your chat widget / forms')
      console.log('   (Call the API when existing contacts interact)')
      console.log('')
    } else if (errors > 0) {
      console.log('\n⚠️  Some fields could not be created. Check errors above.')
    }

    console.log('═'.repeat(80) + '\n')
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

// Run the setup
setupReengagementFields()
