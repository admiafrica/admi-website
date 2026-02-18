#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

/**
 * Check how many contacts have GCLID stored since Nov 29
 */

require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY
const START_DATE = '2025-11-29'

async function checkGCLID() {
  let offset = 0
  const pageSize = 50
  let total = 0
  let withGclid = 0
  let withFbclid = 0
  let withUtmSource = 0
  const gclidSamples = []
  const allAttributeKeys = new Set()

  console.log('📥 Fetching contacts since', START_DATE, '...\n')

  while (true) {
    const url = new URL('https://api.brevo.com/v3/contacts')
    url.searchParams.set('limit', pageSize)
    url.searchParams.set('offset', offset)
    url.searchParams.set('modifiedSince', new Date(START_DATE).toISOString())

    const response = await fetch(url.toString(), {
      headers: { 'api-key': BREVO_API_KEY }
    })

    const data = await response.json()
    const contacts = data.contacts || []

    for (const c of contacts) {
      total++
      const attrs = c.attributes || {}

      // Collect all attribute keys
      Object.keys(attrs).forEach((k) => allAttributeKeys.add(k))

      // Check for GCLID (various possible field names)
      const gclid =
        attrs.GCLID ||
        attrs.gclid ||
        attrs.GOOGLE_CLICK_ID ||
        attrs.google_click_id ||
        attrs.FIRST_GCLID ||
        attrs.first_gclid ||
        attrs.LAST_GCLID ||
        attrs.last_gclid

      // Check for FBCLID
      const fbclid = attrs.FBCLID || attrs.fbclid || attrs.FIRST_FBCLID || attrs.LAST_FBCLID

      // Check for UTM source
      const utmSource =
        attrs.UTM_SOURCE ||
        attrs.utm_source ||
        attrs.FIRST_UTM_SOURCE ||
        attrs.LAST_UTM_SOURCE ||
        attrs.TRAFFIC_SOURCE

      if (gclid) {
        withGclid++
        if (gclidSamples.length < 5) {
          gclidSamples.push({ email: c.email, gclid })
        }
      }

      if (fbclid) withFbclid++
      if (utmSource) withUtmSource++
    }

    if (!contacts.length || contacts.length < pageSize) break
    offset += pageSize

    if (total % 500 === 0) {
      process.stdout.write(`   Checked ${total} contacts...\r`)
    }
  }

  console.log('\n' + '═'.repeat(60))
  console.log('📊 ATTRIBUTION DATA CHECK - Contacts since Nov 29, 2025')
  console.log('═'.repeat(60))
  console.log(`\nTotal contacts:        ${total.toLocaleString()}`)
  console.log(`\n🔍 Attribution Fields Found:`)
  console.log(`   Contacts with GCLID:     ${withGclid} (${((withGclid / total) * 100).toFixed(2)}%)`)
  console.log(`   Contacts with FBCLID:    ${withFbclid} (${((withFbclid / total) * 100).toFixed(2)}%)`)
  console.log(`   Contacts with UTM_SOURCE: ${withUtmSource} (${((withUtmSource / total) * 100).toFixed(2)}%)`)

  if (gclidSamples.length > 0) {
    console.log('\n📋 Sample GCLIDs found:')
    gclidSamples.forEach((s) => console.log(`   - ${s.email}: ${s.gclid}`))
  }

  // Show what attribution fields exist
  const attributionFields = Array.from(allAttributeKeys).filter(
    (k) =>
      k.toLowerCase().includes('gclid') ||
      k.toLowerCase().includes('fbclid') ||
      k.toLowerCase().includes('utm') ||
      k.toLowerCase().includes('source') ||
      k.toLowerCase().includes('medium') ||
      k.toLowerCase().includes('campaign') ||
      k.toLowerCase().includes('traffic') ||
      k.toLowerCase().includes('referrer')
  )

  console.log('\n📝 Attribution-related fields in Brevo:')
  if (attributionFields.length === 0) {
    console.log('   ⚠️  No attribution fields found!')
    console.log('   You need to add GCLID field to Brevo and capture it in forms.')
  } else {
    attributionFields.forEach((f) => console.log(`   - ${f}`))
  }

  console.log('\n' + '─'.repeat(60))
  console.log('💡 RECOMMENDATION:')
  if (withGclid === 0) {
    console.log('   No contacts have GCLID stored. To fix this:')
    console.log('   1. Add a GCLID attribute to Brevo contacts')
    console.log('   2. Update forms to capture GCLID from URL/cookie')
    console.log('   3. Pass GCLID to Brevo on form submission')
    console.log('\n   The attribution-tracking.js captures GCLID client-side.')
    console.log('   It needs to be included in form submissions to Brevo.')
  }
}

checkGCLID().catch(console.error)
