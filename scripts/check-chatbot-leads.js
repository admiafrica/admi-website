#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

/**
 * Check AI-Chatbot and WhatsApp leads in Brevo during the campaign period
 */

require('dotenv').config()

const API_KEY = process.env.BREVO_API_KEY

async function checkChatbotLeads() {
  console.log('='.repeat(60))
  console.log('CHATBOT & WHATSAPP LEAD ANALYSIS')
  console.log('Campaign Period: Nov 29, 2025 - Jan 31, 2026')
  console.log('='.repeat(60))

  // Check available attributes first
  const attrsResponse = await fetch('https://api.brevo.com/v3/contacts/attributes', {
    headers: { 'api-key': API_KEY }
  })
  const attrs = await attrsResponse.json()

  const leadSourceAttr = attrs.attributes?.find((a) => a.name === 'LEAD_SOURCE')
  console.log('\n📋 LEAD_SOURCE attribute:', leadSourceAttr ? '✅ Exists' : '❌ Not found')

  // Get all contacts modified since Nov 29
  let allContacts = []
  let offset = 0
  const limit = 500

  console.log('\n⏳ Fetching contacts since Nov 29, 2025...')

  while (true) {
    const response = await fetch(
      `https://api.brevo.com/v3/contacts?limit=${limit}&offset=${offset}&modifiedSince=2025-11-29T00:00:00Z`,
      {
        headers: { 'api-key': API_KEY }
      }
    )

    const data = await response.json()
    if (!data.contacts || data.contacts.length === 0) break

    allContacts = allContacts.concat(data.contacts)
    offset += limit
    process.stdout.write(`\r  Fetched ${allContacts.length} contacts...`)

    if (data.contacts.length < limit) break
  }

  console.log(`\n✅ Total contacts fetched: ${allContacts.length}`)

  // Categorize by source
  const sources = {
    'AI-Chatbot': [],
    WhatsApp: [],
    Website: [],
    Direct: [],
    'Google Ads': [],
    'Meta Ads': [],
    Unknown: []
  }

  for (const contact of allContacts) {
    const attrs = contact.attributes || {}
    const leadSource = attrs.LEAD_SOURCE || ''
    const utmSource = attrs.UTM_SOURCE || ''
    const utmMedium = attrs.UTM_MEDIUM || ''
    const email = contact.email || ''

    // Check for chatbot leads
    if (leadSource === 'AI-Chatbot' || leadSource === 'chatbot' || leadSource === 'intelliagent') {
      sources['AI-Chatbot'].push(contact)
    }
    // Check for WhatsApp leads (often have phone@mailin-wa.com format)
    else if (email.includes('@mailin-wa.com') || leadSource === 'whatsapp' || utmSource === 'whatsapp') {
      sources['WhatsApp'].push(contact)
    }
    // Google Ads
    else if (
      utmSource === 'google' ||
      utmMedium === 'cpc' ||
      utmMedium === 'pmax' ||
      attrs.GCLID
    ) {
      sources['Google Ads'].push(contact)
    }
    // Meta Ads
    else if (utmSource === 'facebook' || utmSource === 'meta' || utmSource === 'fb' || attrs.FBCLID) {
      sources['Meta Ads'].push(contact)
    }
    // Direct
    else if (utmSource === 'direct' || (!utmSource && !leadSource)) {
      sources['Direct'].push(contact)
    }
    // Website forms
    else if (leadSource === 'website' || utmMedium === 'organic' || utmMedium === 'referral') {
      sources['Website'].push(contact)
    } else {
      sources['Unknown'].push(contact)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('LEADS BY SOURCE')
  console.log('='.repeat(60))

  for (const [source, contacts] of Object.entries(sources)) {
    if (contacts.length > 0) {
      console.log(`\n${source}: ${contacts.length} leads`)

      // Check how many have GCLID for Google Ads attribution
      const withGclid = contacts.filter((c) => c.attributes?.GCLID).length
      const withFbclid = contacts.filter((c) => c.attributes?.FBCLID).length

      if (withGclid > 0) console.log(`  └─ With GCLID: ${withGclid}`)
      if (withFbclid > 0) console.log(`  └─ With FBCLID: ${withFbclid}`)

      // Show sample of first 3
      if (contacts.length > 0 && contacts.length <= 10) {
        console.log('  └─ Sample emails:')
        contacts.slice(0, 3).forEach((c) => {
          console.log(`     - ${c.email}`)
        })
      }
    }
  }

  // Check specifically for chatbot/intelliagent patterns
  console.log('\n' + '='.repeat(60))
  console.log('CHATBOT LEAD DETAILS')
  console.log('='.repeat(60))

  const chatbotContacts = sources['AI-Chatbot']
  if (chatbotContacts.length > 0) {
    console.log(`\n📱 AI-Chatbot Leads: ${chatbotContacts.length}`)
    console.log('\nSample chatbot leads:')
    chatbotContacts.slice(0, 5).forEach((c) => {
      const a = c.attributes || {}
      console.log(`  - ${c.email}`)
      console.log(`    GCLID: ${a.GCLID || 'NOT SET'}`)
      console.log(`    UTM_SOURCE: ${a.UTM_SOURCE || 'NOT SET'}`)
      console.log(`    FIRST_TOUCH_SOURCE: ${a.FIRST_TOUCH_SOURCE || 'NOT SET'}`)
    })
  } else {
    console.log('\n⚠️  No contacts found with LEAD_SOURCE = AI-Chatbot')
    console.log('   The IntelliAgent app may be using a different field or method.')
  }

  // Check WhatsApp leads
  console.log('\n' + '='.repeat(60))
  console.log('WHATSAPP LEAD DETAILS')
  console.log('='.repeat(60))

  const whatsappContacts = sources['WhatsApp']
  if (whatsappContacts.length > 0) {
    console.log(`\n📲 WhatsApp Leads: ${whatsappContacts.length}`)
    console.log('\nSample WhatsApp leads:')
    whatsappContacts.slice(0, 5).forEach((c) => {
      const a = c.attributes || {}
      console.log(`  - ${c.email}`)
      console.log(`    GCLID: ${a.GCLID || 'NOT SET'}`)
      console.log(`    UTM_SOURCE: ${a.UTM_SOURCE || 'NOT SET'}`)
    })
  } else {
    console.log('\n⚠️  No WhatsApp leads found')
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('ATTRIBUTION GAPS')
  console.log('='.repeat(60))

  const noGclid = allContacts.filter((c) => !c.attributes?.GCLID).length
  const noUtmSource = allContacts.filter((c) => !c.attributes?.UTM_SOURCE).length

  console.log(`\n📊 Attribution Analysis:`)
  console.log(`   Total contacts: ${allContacts.length}`)
  console.log(`   Without GCLID: ${noGclid} (${((noGclid / allContacts.length) * 100).toFixed(1)}%)`)
  console.log(`   Without UTM_SOURCE: ${noUtmSource} (${((noUtmSource / allContacts.length) * 100).toFixed(1)}%)`)

  console.log('\n⚠️  KEY ISSUE: Chatbot/WhatsApp leads likely have NO attribution')
  console.log('   because they don\'t go through the website form.')
  console.log('\n💡 SOLUTION: The IntelliAgent app needs to:')
  console.log('   1. Capture GCLID/FBCLID from the referral URL')
  console.log('   2. Pass it to Brevo when creating the contact')
  console.log('   3. Or use a webhook to get the user\'s browser session data')
}

checkChatbotLeads().catch(console.error)
