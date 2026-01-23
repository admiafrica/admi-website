#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

/**
 * Create GCLID and FBCLID attributes in Brevo for Google Ads attribution
 */

require('dotenv').config()

const API_KEY = process.env.BREVO_API_KEY

async function createAttribute(name, type = 'text') {
  const response = await fetch('https://api.brevo.com/v3/contacts/attributes/normal/' + name, {
    method: 'POST',
    headers: {
      'api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type })
  })

  if (response.ok) {
    console.log('✅ Created:', name)
    return true
  } else if (response.status === 400) {
    console.log('⏭️  Already exists:', name)
    return true
  } else {
    const err = await response.json()
    console.log('❌ Failed:', name, err.message)
    return false
  }
}

async function main() {
  console.log('═'.repeat(60))
  console.log('📝 Creating Attribution Attributes in Brevo')
  console.log('═'.repeat(60))
  console.log()

  // Google Ads click IDs
  console.log('Google Ads Click IDs:')
  await createAttribute('GCLID')
  await createAttribute('FIRST_GCLID')
  await createAttribute('LAST_GCLID')

  // Meta/Facebook click IDs
  console.log('\nMeta/Facebook Click IDs:')
  await createAttribute('FBCLID')
  await createAttribute('FIRST_FBCLID')
  await createAttribute('LAST_FBCLID')

  // Additional Google attribution
  console.log('\nAdditional Google Attribution:')
  await createAttribute('GBRAID') // Google App campaigns
  await createAttribute('WBRAID') // Google Web-to-App

  console.log('\n' + '═'.repeat(60))
  console.log('✅ Done! Brevo now has GCLID/FBCLID fields.')
  console.log('═'.repeat(60))
}

main().catch(console.error)
