#!/usr/bin/env node

/**
 * Comprehensive Customer Export Strategy
 * Combines multiple sources to reach 1,000+ customer matches
 */

const axios = require('axios')
const crypto = require('crypto')
const fs = require('fs')
require('dotenv').config()

const apiKey = process.env.BREVO_API_KEY
const baseURL = 'https://api.brevo.com/v3'

// Load previously exported enrolled customers
const enrolledCustomers = require('../../reports/google-ads/enrolled-customers-hashed.json')

function hashEmail(email) {
  return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
}

function hashPhone(phone) {
  const cleaned = phone.replace(/[^\d]/g, '')
  return crypto.createHash('sha256').update(cleaned).digest('hex')
}

async function getAllContacts() {
  console.log('📊 Fetching ALL Brevo contacts...\n')
  
  try {
    let allContacts = []
    let offset = 0
    const limit = 500

    while (true) {
      const response = await axios.get(`${baseURL}/contacts`, {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json'
        },
        params: {
          limit,
          offset
        }
      })

      const contacts = response.data.contacts || []
      if (contacts.length === 0) break

      allContacts = allContacts.concat(contacts)
      console.log(`   Fetched ${allContacts.length} contacts...`)

      if (contacts.length < limit) break
      offset += limit

      await new Promise(resolve => setTimeout(resolve, 200))
    }

    console.log(`✅ Total contacts: ${allContacts.length}\n`)
    return allContacts
  } catch (error) {
    console.error('Failed:', error.message)
    return []
  }
}

async function createExpandedCustomerList() {
  console.log('🎯 EXPANDED CUSTOMER MATCH STRATEGY')
  console.log('='.repeat(70))
  console.log('Goal: Export 1,500+ contacts for 1,000+ Google Ads matches')
  console.log('='.repeat(70))

  // Start with enrolled customers from deals (428)
  const enrolledEmails = new Set(
    enrolledCustomers.customers.map(c => c.hashedEmail)
  )

  console.log(`\n✅ Base: ${enrolledEmails.size} enrolled customers from deals`)

  // Get all contacts
  const allContacts = await getAllContacts()

  const expandedCustomers = new Map()

  // Strategy: Add contacts with strong engagement signals
  const strategies = [
    {
      name: 'Enrolled Students (from deals)',
      filter: (c) => {
        if (!c.email) return false
        const email = c.email.toLowerCase().trim()
        return enrolledEmails.has(hashEmail(email))
      }
    },
    {
      name: 'High Qualification Score (≥70)',
      filter: (c) => {
        if (!c.email) return false
        const score = c.attributes?.QUALIFICATION_SCORE || 0
        return score >= 70
      }
    },
    {
      name: 'Medium Qualification Score (≥40)',
      filter: (c) => {
        if (!c.email) return false
        const score = c.attributes?.QUALIFICATION_SCORE || 0
        return score >= 40 && score < 70
      }
    },
    {
      name: 'Qualified/Interested Status',
      filter: (c) => {
        if (!c.email) return false
        const status = c.attributes?.QUALIFICATION_STATUS?.toLowerCase() || ''
        return status.includes('qualified') || status.includes('enrolled') || 
               status.includes('customer') || status.includes('interested')
      }
    },
    {
      name: 'Has Course Interest',
      filter: (c) => {
        if (!c.email) return false
        const hasCourse = c.attributes?.PREFERRED_COURSE || c.attributes?.COURSE_INTERESTED_IN
        return !!hasCourse
      }
    },
    {
      name: 'Recent Activity (2024-2025)',
      filter: (c) => {
        if (!c.email) return false
        const modifiedDate = new Date(c.modifiedAt || c.createdAt)
        return modifiedDate >= new Date('2024-01-01')
      }
    }
  ]

  console.log('\n📊 SEGMENTATION:\n')

  strategies.forEach(strategy => {
    const matching = allContacts.filter(strategy.filter)
    console.log(`${strategy.name}: ${matching.length} contacts`)

    matching.forEach(contact => {
      const email = contact.email.toLowerCase().trim()
      if (!expandedCustomers.has(email)) {
        expandedCustomers.set(email, {
          email: contact.email,
          firstName: contact.attributes?.FIRSTNAME || '',
          lastName: contact.attributes?.LASTNAME || '',
          phone: contact.attributes?.SMS || '',
          country: contact.attributes?.COUNTRY || '',
          zip: contact.attributes?.ZIP || '',
          score: contact.attributes?.QUALIFICATION_SCORE || 0,
          status: contact.attributes?.QUALIFICATION_STATUS || '',
          course: contact.attributes?.PREFERRED_COURSE || contact.attributes?.COURSE_INTERESTED_IN || '',
          segment: strategy.name
        })
      }
    })

    console.log(`   Running total: ${expandedCustomers.size}`)
  })

  const customers = Array.from(expandedCustomers.values())

  console.log('\n' + '='.repeat(70))
  console.log('📊 FINAL EXPORT SUMMARY')
  console.log('='.repeat(70))
  console.log(`\nTotal unique customers: ${customers.length}`)

  // Statistics
  const stats = {
    total: customers.length,
    withEmail: customers.filter(c => c.email).length,
    withPhone: customers.filter(c => c.phone).length,
    withBoth: customers.filter(c => c.email && c.phone).length,
    withName: customers.filter(c => c.firstName || c.lastName).length
  }

  console.log(`\nData Quality:`)
  console.log(`  Emails: ${stats.withEmail} (${(stats.withEmail/stats.total*100).toFixed(1)}%)`)
  console.log(`  Phones: ${stats.withPhone} (${(stats.withPhone/stats.total*100).toFixed(1)}%)`)
  console.log(`  Email + Phone: ${stats.withBoth} (${(stats.withBoth/stats.total*100).toFixed(1)}%)`)
  console.log(`  Names: ${stats.withName} (${(stats.withName/stats.total*100).toFixed(1)}%)`)

  // Expected Google match
  const expectedMatches = Math.floor(customers.length * 0.6) // Conservative 60% match rate
  console.log(`\n🎯 Expected Google Ads matches: ${expectedMatches} (at 60% rate)`)

  if (expectedMatches >= 1000) {
    console.log(`✅ SUFFICIENT for Similar Audiences (need 1,000 minimum)`)
  } else {
    console.log(`⚠️  May need ${Math.ceil((1000 - expectedMatches) / 0.6)} more contacts`)
  }

  // Segment breakdown
  const segmentBreakdown = {}
  customers.forEach(c => {
    if (!segmentBreakdown[c.segment]) {
      segmentBreakdown[c.segment] = 0
    }
    segmentBreakdown[c.segment]++
  })

  console.log(`\nBreakdown by Segment:`)
  Object.entries(segmentBreakdown).forEach(([segment, count]) => {
    console.log(`  ${segment}: ${count}`)
  })

  // Export CSV
  const csvRows = [
    'Email,Phone,First Name,Last Name,Country,Zip,Score,Status,Segment'
  ]

  customers.forEach(customer => {
    csvRows.push([
      customer.email,
      customer.phone,
      `"${customer.firstName}"`,
      `"${customer.lastName}"`,
      customer.country,
      customer.zip,
      customer.score,
      customer.status,
      `"${customer.segment}"`
    ].join(','))
  })

  const csvPath = 'reports/google-ads/expanded-customer-list.csv'
  fs.writeFileSync(csvPath, csvRows.join('\n'))
  console.log(`\n✅ CSV exported: ${csvPath}`)

  // Export hashed
  const hashedData = {
    consent: {
      adUserData: 'GRANTED',
      adPersonalization: 'GRANTED'
    },
    customers: customers.map(customer => ({
      hashedEmail: hashEmail(customer.email),
      hashedPhoneNumber: customer.phone ? hashPhone(customer.phone) : undefined,
      addressInfo: {
        hashedFirstName: customer.firstName ? crypto.createHash('sha256').update(customer.firstName.toLowerCase().trim()).digest('hex') : undefined,
        hashedLastName: customer.lastName ? crypto.createHash('sha256').update(customer.lastName.toLowerCase().trim()).digest('hex') : undefined,
        countryCode: customer.country,
        postalCode: customer.zip
      }
    }))
  }

  const jsonPath = 'reports/google-ads/expanded-customer-list-hashed.json'
  fs.writeFileSync(jsonPath, JSON.stringify(hashedData, null, 2))
  console.log(`✅ Hashed JSON exported: ${jsonPath}`)

  console.log('\n' + '='.repeat(70))
  console.log('🎯 RECOMMENDATION:')
  console.log('='.repeat(70))
  
  if (customers.length >= 1500) {
    console.log('\n✅ Upload: expanded-customer-list.csv')
    console.log(`   This includes ${customers.length} contacts`)
    console.log(`   Expected ${expectedMatches}+ Google matches`)
    console.log('   Sufficient for Similar Audiences!')
  } else {
    console.log('\n⚠️  List may be too small for optimal results')
    console.log('   Consider lowering qualification threshold further')
  }

  console.log('\n')
}

createExpandedCustomerList().catch(console.error)
