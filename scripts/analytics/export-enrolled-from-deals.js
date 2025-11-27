#!/usr/bin/env node

/**
 * Export Enrolled/Customer contacts from Brevo CRM Deals
 * Filters by "Won", "Enrolled", or "Customer" deal stages
 */

const axios = require('axios')
const crypto = require('crypto')
const fs = require('fs')
require('dotenv').config()

const apiKey = process.env.BREVO_API_KEY
const baseURL = 'https://api.brevo.com/v3'

// SHA256 hashing for Customer Match
function hashEmail(email) {
  return crypto.createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex')
}

function hashPhone(phone) {
  const cleaned = phone.replace(/[^\d]/g, '')
  return crypto.createHash('sha256')
    .update(cleaned)
    .digest('hex')
}

async function getAllPipelines() {
  try {
    const response = await axios.get(`${baseURL}/crm/pipeline/details/all`, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch pipelines:', error.message)
    return []
  }
}

async function getAllDeals() {
  try {
    let allDeals = []
    let offset = 0
    const limit = 50

    console.log('   Fetching ALL deals from Brevo CRM...')

    while (true) {
      const response = await axios.get(`${baseURL}/crm/deals`, {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json'
        },
        params: {
          limit,
          offset,
          sort: 'desc'
        }
      })

      const deals = response.data.items || []
      if (deals.length === 0) break

      allDeals = allDeals.concat(deals)
      
      console.log(`   Fetched ${allDeals.length} deals so far...`)
      
      if (deals.length < limit) break
      offset += limit

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    console.log(`   ✅ Total deals fetched: ${allDeals.length}`)
    return allDeals
  } catch (error) {
    console.error('Failed to fetch deals:', error.message)
    return []
  }
}

async function getContact(contactId) {
  try {
    const response = await axios.get(`${baseURL}/contacts/${contactId}`, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    return null
  }
}

async function exportEnrolledCustomers() {
  console.log('🎯 BREVO CRM - ENROLLED CUSTOMERS EXPORT')
  console.log('='.repeat(70))
  console.log('Strategy: Export contacts from "Won", "Enrolled", "Customer" deal stages')
  console.log('='.repeat(70))

  // Get all pipelines and identify winning stages
  const pipelines = await getAllPipelines()

  if (!pipelines || pipelines.length === 0) {
    console.error('❌ No pipelines found')
    return
  }

  console.log(`\n✅ Found ${pipelines.length} pipeline(s)\n`)

  const winningStages = []
  const customerContacts = new Map() // Use Map to deduplicate by email

  // Identify winning/enrolled stages
  pipelines.forEach(pipeline => {
    const pName = pipeline.pipeline_name || pipeline.name
    const stages = pipeline.pipeline_stages || pipeline.stages || []

    stages.forEach(stage => {
      const sName = stage.name.toLowerCase()
      const isWinning = sName.includes('won') || 
                       sName.includes('enrolled') || 
                       sName.includes('customer') ||
                       stage.win_percentage === 100

      if (isWinning) {
        console.log(`✅ Found winning stage: "${stage.name}" in "${pName}"`)
        winningStages.push({
          pipeline: pName,
          pipelineId: pipeline.pipeline_id || pipeline.id,
          stageName: stage.name,
          stageId: stage.id
        })
      }
    })
  })

  if (winningStages.length === 0) {
    console.error('\n❌ No winning/enrolled stages found')
    return
  }

  console.log(`\n🔍 Processing ${winningStages.length} winning stage(s)...\n`)

  // Fetch ALL deals at once
  const allDeals = await getAllDeals()

  // Filter deals by winning stages
  for (const stage of winningStages) {
    console.log(`\n📋 Processing: ${stage.pipeline} → ${stage.stageName}`)

    // Filter deals that match this stage ID
    const stageDeals = allDeals.filter(deal => 
      deal.attributes?.deal_stage === stage.stageId
    )

    console.log(`   Found ${stageDeals.length} deal(s) in this stage`)

    // Get contact info for each deal
    for (const deal of stageDeals) {
      const contactIds = deal.linkedContactsIds || []

      for (const contactId of contactIds) {
        const contact = await getContact(contactId)

        if (contact && contact.email) {
          const email = contact.email.toLowerCase().trim()

          // Deduplicate by email
          if (!customerContacts.has(email)) {
            customerContacts.set(email, {
              email: contact.email,
              firstName: contact.attributes?.FIRSTNAME || contact.attributes?.firstname || '',
              lastName: contact.attributes?.LASTNAME || contact.attributes?.lastname || '',
              phone: contact.attributes?.SMS || contact.attributes?.phone || '',
              country: contact.attributes?.COUNTRY || contact.attributes?.country || '',
              zip: contact.attributes?.ZIP || contact.attributes?.zip || '',
              pipeline: stage.pipeline,
              dealStage: stage.stageName,
              dealName: deal.attributes?.deal_name || '',
              dealAmount: deal.attributes?.amount || 0,
              dealCloseDate: deal.attributes?.actual_close_date || deal.attributes?.close_date || ''
            })
          }
        }
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  const customers = Array.from(customerContacts.values())

  console.log('\n' + '='.repeat(70))
  console.log('📊 EXPORT SUMMARY')
  console.log('='.repeat(70))
  console.log(`\nTotal unique enrolled customers: ${customers.length}`)

  if (customers.length === 0) {
    console.log('\n⚠️  No customers found in winning deal stages')
    return
  }

  // Calculate statistics
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

  // Show deal breakdown
  const pipelineBreakdown = {}
  customers.forEach(c => {
    if (!pipelineBreakdown[c.pipeline]) {
      pipelineBreakdown[c.pipeline] = 0
    }
    pipelineBreakdown[c.pipeline]++
  })

  console.log(`\nBreakdown by Pipeline:`)
  Object.entries(pipelineBreakdown).forEach(([pipeline, count]) => {
    console.log(`  ${pipeline}: ${count} customers`)
  })

  // Export to CSV (Google Ads upload format)
  const csvRows = [
    'Email,Phone,First Name,Last Name,Country,Zip,Pipeline,Deal Stage,Deal Amount,Close Date'
  ]

  customers.forEach(customer => {
    csvRows.push([
      customer.email,
      customer.phone,
      customer.firstName,
      customer.lastName,
      customer.country,
      customer.zip,
      customer.pipeline,
      customer.dealStage,
      customer.dealAmount,
      customer.dealCloseDate
    ].join(','))
  })

  const csvPath = 'reports/google-ads/enrolled-customers-from-deals.csv'
  fs.writeFileSync(csvPath, csvRows.join('\n'))
  console.log(`\n✅ CSV exported: ${csvPath}`)

  // Export hashed version for API upload
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

  const jsonPath = 'reports/google-ads/enrolled-customers-hashed.json'
  fs.writeFileSync(jsonPath, JSON.stringify(hashedData, null, 2))
  console.log(`✅ Hashed JSON exported: ${jsonPath}`)

  console.log('\n' + '='.repeat(70))
  console.log('🎯 NEXT STEPS:')
  console.log('='.repeat(70))
  console.log('\n1. Upload to Google Ads:')
  console.log(`   • Go to: Tools → Audience Manager → "+" → Customer list`)
  console.log(`   • Upload: ${csvPath}`)
  console.log(`   • Name: "ADMI - Enrolled Customers (${customers.length})"`)
  console.log('\n2. Wait 24-48 hours for Google to match emails')
  console.log('   • Expect 30-70% match rate')
  console.log(`   • Minimum ${Math.ceil(customers.length * 0.3)} matches expected`)
  console.log('\n3. Create Similar Audiences:')
  console.log('   • 1% Similar (highest quality)')
  console.log('   • 3% Similar (broader reach)')
  console.log('   • 5% Similar (widest reach)')
  console.log('\n4. Build new campaigns targeting these lookalike audiences')
  console.log('\n')
}

// Run export
exportEnrolledCustomers().catch(console.error)
