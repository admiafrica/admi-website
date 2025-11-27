#!/usr/bin/env node

/**
 * Review specific Brevo contact and deal records
 * Usage: node review-brevo-record.js <contact-id> [deal-id]
 */

const axios = require('axios')
require('dotenv').config()

const apiKey = process.env.BREVO_API_KEY
const baseURL = 'https://api.brevo.com/v3'

async function getContact(contactId) {
  console.log(`\n📇 Fetching Contact ID: ${contactId}`)
  console.log('─'.repeat(70))

  try {
    const response = await axios.get(`${baseURL}/contacts/${contactId}`, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    })

    const contact = response.data

    console.log('\n✅ CONTACT INFORMATION:')
    console.log(`Email: ${contact.email}`)
    console.log(`ID: ${contact.id}`)
    console.log(`Created: ${contact.createdAt}`)
    console.log(`Modified: ${contact.modifiedAt}`)
    console.log(`Email Blacklisted: ${contact.emailBlacklisted}`)
    console.log(`SMS Blacklisted: ${contact.smsBlacklisted}`)

    if (contact.listIds && contact.listIds.length > 0) {
      console.log(`\nLists: ${contact.listIds.join(', ')}`)
    }

    console.log('\n📋 ATTRIBUTES:')
    console.log('─'.repeat(70))
    
    if (contact.attributes) {
      Object.entries(contact.attributes).forEach(([key, value]) => {
        console.log(`${key}: ${JSON.stringify(value)}`)
      })
    } else {
      console.log('No attributes found')
    }

    if (contact.statistics) {
      console.log('\n📊 STATISTICS:')
      console.log('─'.repeat(70))
      console.log(JSON.stringify(contact.statistics, null, 2))
    }

    return contact

  } catch (error) {
    console.error(`\n❌ Failed to fetch contact ${contactId}:`, error.message)
    if (error.response) {
      console.error('Response:', error.response.data)
    }
    return null
  }
}

async function getDeal(dealId) {
  console.log(`\n\n💼 Fetching Deal ID: ${dealId}`)
  console.log('─'.repeat(70))

  try {
    const response = await axios.get(`${baseURL}/crm/deals/${dealId}`, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    })

    const deal = response.data

    console.log('\n✅ DEAL INFORMATION:')
    console.log(`ID: ${deal.id}`)
    console.log(`Name: ${deal.attributes?.deal_name || 'N/A'}`)
    console.log(`Created: ${deal.attributes?.created_at || 'N/A'}`)
    console.log(`Updated: ${deal.attributes?.updated_at || 'N/A'}`)

    console.log('\n📋 DEAL ATTRIBUTES:')
    console.log('─'.repeat(70))
    
    if (deal.attributes) {
      Object.entries(deal.attributes).forEach(([key, value]) => {
        // Format dates nicely
        if (key.includes('date') || key.includes('_at')) {
          try {
            const date = new Date(value)
            console.log(`${key}: ${value} (${date.toLocaleString()})`)
          } catch {
            console.log(`${key}: ${JSON.stringify(value)}`)
          }
        } else {
          console.log(`${key}: ${JSON.stringify(value)}`)
        }
      })
    } else {
      console.log('No attributes found')
    }

    // Show linked companies/contacts if available
    if (deal.linkedCompaniesIds && deal.linkedCompaniesIds.length > 0) {
      console.log(`\n🏢 Linked Companies: ${deal.linkedCompaniesIds.join(', ')}`)
    }

    if (deal.linkedContactsIds && deal.linkedContactsIds.length > 0) {
      console.log(`\n👥 Linked Contacts: ${deal.linkedContactsIds.join(', ')}`)
    }

    return deal

  } catch (error) {
    console.error(`\n❌ Failed to fetch deal ${dealId}:`, error.message)
    if (error.response) {
      console.error('Response:', error.response.data)
    }
    return null
  }
}

async function analyzeRecord(contactId, dealId) {
  console.log('🔍 BREVO RECORD ANALYSIS')
  console.log('='.repeat(70))

  const contact = await getContact(contactId)
  
  let deal = null
  if (dealId) {
    deal = await getDeal(dealId)
  }

  // Analysis summary
  console.log('\n\n' + '='.repeat(70))
  console.log('📊 ANALYSIS SUMMARY')
  console.log('='.repeat(70))

  if (contact) {
    console.log('\n✅ CONTACT STATUS:')
    
    // Check qualification
    const qualStatus = contact.attributes?.QUALIFICATION_STATUS
    const qualScore = contact.attributes?.QUALIFICATION_SCORE
    const preferredCourse = contact.attributes?.PREFERRED_COURSE
    
    if (qualStatus || qualScore) {
      console.log(`   Qualification Status: ${qualStatus || 'Not set'}`)
      console.log(`   Qualification Score: ${qualScore || 'Not set'}`)
      console.log(`   Preferred Course: ${preferredCourse || 'Not set'}`)
      
      if (qualScore >= 70 || qualStatus === 'qualified') {
        console.log(`   ✅ QUALIFIES for Customer Match export (score ≥70)`)
      } else {
        console.log(`   ⚠️  Does NOT qualify (score <70 or status != 'qualified')`)
      }
    }

    // Check other relevant fields
    const firstName = contact.attributes?.FIRSTNAME
    const lastName = contact.attributes?.LASTNAME
    const phone = contact.attributes?.SMS
    
    console.log(`\n   Name: ${firstName || ''} ${lastName || ''}`.trim() || 'Not set')
    console.log(`   Phone: ${phone || 'Not set'}`)
    console.log(`   Email: ${contact.email}`)
  }

  if (deal) {
    console.log('\n💼 DEAL STATUS:')
    console.log(`   Pipeline: ${deal.attributes?.pipeline || 'Not set'}`)
    console.log(`   Stage: ${deal.attributes?.deal_stage || 'Not set'}`)
    console.log(`   Deal Name: ${deal.attributes?.deal_name || 'Not set'}`)
    
    // Check if this is a "won" deal
    const stage = deal.attributes?.deal_stage?.toLowerCase() || ''
    if (stage.includes('won') || stage.includes('enrolled') || stage.includes('customer')) {
      console.log(`   ✅ This is a WON/CUSTOMER deal!`)
    }
  }

  console.log('\n' + '='.repeat(70))
  console.log('\n💡 KEY INSIGHTS:')
  
  if (contact && deal) {
    console.log('   • Contact has both CRM contact record AND deal record')
    console.log('   • Can filter by EITHER contact attributes OR deal stage')
    console.log('   • Current export uses contact.QUALIFICATION_SCORE ≥70')
    console.log('   • Alternative: Filter by deal.stage = "Enrolled/Won"')
  } else if (contact) {
    console.log('   • Contact record exists but no deal specified')
    console.log('   • Using contact attributes (QUALIFICATION_SCORE) for filtering')
  }

  console.log('\n')
}

// Parse command line arguments
const args = process.argv.slice(2)
const contactId = args[0] || '49566'
const dealId = args[1] || '68cd546309ef42b526afc357'

// Run analysis
analyzeRecord(contactId, dealId).catch(console.error)
