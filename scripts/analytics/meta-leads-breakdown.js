#!/usr/bin/env node

/**
 * META LEADS BREAKDOWN BY PLATFORM
 * Analyzes leads from Nov 29, 2025 - Feb 6, 2026 campaign
 * Breaks down by Facebook, Instagram, and WhatsApp
 * Uses Brevo CRM data + UTM tracking to reconstruct platform data
 *
 * Note: Requires Meta Lead API access token for full data.
 * Falls back to UTM tracking if Meta API unavailable.
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') })

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const META_BUSINESS_ACCOUNT_ID = process.env.META_BUSINESS_ACCOUNT_ID
const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_LIST_ID = process.env.BREVO_LIST_ID

// Analysis period
const START_DATE = '2025-11-29'
const END_DATE = '2026-02-06'

// Helper function to make HTTPS requests
function httpRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {}
          resolve({ status: res.statusCode, data: parsed })
        } catch (e) {
          resolve({ status: res.statusCode, data: { raw: body } })
        }
      })
    })
    req.on('error', reject)
    if (data) req.write(JSON.stringify(data))
    req.end()
  })
}

// Fetch all contacts from Brevo list
async function fetchBrevoContactsList() {
  console.log('📘 Fetching all Brevo contacts...')

  let allContacts = []
  let offset = 0
  let hasMore = true
  let pageCount = 0

  while (hasMore && pageCount < 100) {
    // Safety limit: max 100 pages = 50k contacts
    const options = {
      hostname: 'api.brevo.com',
      path: `/v3/contacts?limit=500&offset=${offset}&sort=desc`,
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    }

    try {
      const { status, data } = await httpRequest(options)
      if (status !== 200) {
        console.error(`❌ Brevo API error (status ${status})`)
        hasMore = false
        break
      }

      const contacts = data.contacts || []
      allContacts = [...allContacts, ...contacts]

      offset += 500
      hasMore = contacts.length === 500
      pageCount++

      console.log(`   Page ${pageCount}: ${contacts.length} contacts (total: ${allContacts.length})`)
    } catch (e) {
      console.error('❌ Error fetching Brevo contacts:', e.message)
      hasMore = false
    }
  }

  console.log(`✅ Found ${allContacts.length} total contacts`)
  return allContacts
}

// Main analysis using Brevo CRM data + UTM tracking
async function analyzeMetaLeads() {
  console.log('\n🎯 META LEADS BREAKDOWN ANALYSIS')
  console.log(`📅 Period: ${START_DATE} to ${END_DATE}`)
  console.log('='.repeat(80))

  // Validate Brevo API key
  if (!BREVO_API_KEY) {
    console.error('❌ Missing BREVO_API_KEY - cannot access CRM data')
    process.exit(1)
  }

  let results = {
    generatedAt: new Date().toISOString(),
    period: { start: START_DATE, end: END_DATE },
    method: 'Brevo CRM + UTM Tracking (Meta API fallback)',
    summary: {
      totalLeads: 0,
      facebookLeads: 0,
      instagramLeads: 0,
      whatsappLeads: 0,
      unknownLeads: 0,
      totalApplications: 0,
      totalEnrolled: 0
    },
    platformBreakdown: {
      facebook: { leads: [], totalLeads: 0, applications: 0, enrolled: 0, revenue: 0, avgDaysToEnroll: 0 },
      instagram: { leads: [], totalLeads: 0, applications: 0, enrolled: 0, revenue: 0, avgDaysToEnroll: 0 },
      whatsapp: { leads: [], totalLeads: 0, applications: 0, enrolled: 0, revenue: 0, avgDaysToEnroll: 0 },
      unknown: { leads: [], totalLeads: 0, applications: 0, enrolled: 0, revenue: 0, avgDaysToEnroll: 0 }
    },
    recommendations: [],
    campaignAnalysis: {}
  }

  // Step 1: Fetch all contacts from Brevo
  console.log('\n📊 STEP 1: Fetching CRM data...')
  const allContacts = await fetchBrevoContactsList()

  // Step 2: Filter by date range and analyze
  console.log('\n📊 STEP 2: Analyzing leads by platform...')

  const platformMap = {
    facebook: 'facebook',
    fb: 'facebook',
    meta: 'facebook',
    instagram: 'instagram',
    ig: 'instagram',
    insta: 'instagram',
    whatsapp: 'whatsapp',
    wa: 'whatsapp',
    messenger: 'facebook'
  }

  const categorizedLeads = {
    facebook: [],
    instagram: [],
    whatsapp: [],
    unknown: []
  }

  for (const contact of allContacts) {
    try {
      // Check if contact is from campaign period
      const createdDate = new Date(contact.createdAt)
      const startDate = new Date(START_DATE)
      const endDate = new Date(END_DATE)

      if (createdDate < startDate || createdDate > endDate) continue

      // Determine platform from source or custom fields
      let platform = 'unknown'
      const utmSource = contact.attributes?.utm_source?.toLowerCase() || ''
      const source = contact.attributes?.source?.toLowerCase() || ''
      const channel = contact.attributes?.channel?.toLowerCase() || ''
      const formSource = contact.attributes?.form_source?.toLowerCase() || ''

      // Check various fields for platform identification
      for (const [key, val] of Object.entries(platformMap)) {
        if (utmSource.includes(key) || source.includes(key) || channel.includes(key) || formSource.includes(key)) {
          platform = val
          break
        }
      }

      // If still unknown, try to infer from campaign name or other clues
      if (platform === 'unknown') {
        const campaignName = contact.attributes?.campaign_name?.toLowerCase() || ''
        if (campaignName.includes('instagram') || campaignName.includes('ig')) platform = 'instagram'
        else if (campaignName.includes('facebook') || campaignName.includes('fb')) platform = 'facebook'
        else if (campaignName.includes('whatsapp') || campaignName.includes('wa')) platform = 'whatsapp'
      }

      const leadData = {
        id: contact.id,
        email: contact.email,
        name: contact.attributes?.name || 'Unknown',
        phone: contact.attributes?.phone || '',
        source: source || utmSource || 'unknown',
        platform: platform,
        createdAt: contact.createdAt,
        pipelineStatus: contact.attributes?.pipeline_status || 'lead',
        joiningDate: contact.attributes?.joining_date || contact.attributes?.enrollment_date || null,
        attributes: contact.attributes
      }

      categorizedLeads[platform].push(leadData)
    } catch (e) {
      // Skip contacts with parsing errors
      continue
    }
  }

  // Calculate enrollment timeline
  function calculateDaysToEnroll(createdAt, enrolledDate) {
    if (!createdAt || !enrolledDate) return null
    const created = new Date(createdAt)
    const enrolled = new Date(enrolledDate)
    return Math.floor((enrolled - created) / (1000 * 60 * 60 * 24))
  }

  // Step 3: Build platform breakdown
  console.log('\n📊 STEP 3: Building platform breakdown...')

  for (const platform of ['facebook', 'instagram', 'whatsapp', 'unknown']) {
    const leads = categorizedLeads[platform]
    const applications = leads.filter((l) => l.pipelineStatus === 'applied' || l.pipelineStatus === 'applying')
    const enrolled = leads.filter((l) => l.pipelineStatus === 'enrolled')

    // Calculate average days to enrollment
    const daysToEnroll = enrolled
      .map((l) => calculateDaysToEnroll(l.createdAt, l.joiningDate))
      .filter((d) => d !== null)
    const avgDaysToEnroll =
      daysToEnroll.length > 0 ? Math.round(daysToEnroll.reduce((a, b) => a + b, 0) / daysToEnroll.length) : 0

    results.platformBreakdown[platform] = {
      leads: leads.map((l) => ({
        email: l.email,
        name: l.name,
        phone: l.phone,
        status: l.pipelineStatus,
        source: l.source,
        createdAt: l.createdAt,
        daysToEnroll: l.pipelineStatus === 'enrolled' ? calculateDaysToEnroll(l.createdAt, l.joiningDate) : null
      })),
      totalLeads: leads.length,
      applications: applications.length,
      applicationRate: leads.length > 0 ? ((applications.length / leads.length) * 100).toFixed(2) + '%' : '0%',
      enrolled: enrolled.length,
      conversionRate: leads.length > 0 ? ((enrolled.length / leads.length) * 100).toFixed(2) + '%' : '0%',
      revenue: enrolled.length * 50000,
      avgDaysToEnroll: avgDaysToEnroll
    }

    results.summary.totalLeads += leads.length
    results.summary[`${platform}Leads`] = leads.length
    results.summary.totalApplications += applications.length
    results.summary.totalEnrolled += enrolled.length
  }

  // Step 4: Generate recommendations
  console.log('\n📊 STEP 4: Generating recommendations...')
  results.recommendations = generateRecommendations(results)

  return results
}

function generateRecommendations(results) {
  const recs = []
  const platforms = ['facebook', 'instagram', 'whatsapp']

  for (const platform of platforms) {
    const data = results.platformBreakdown[platform]
    const convRate = parseFloat(data.conversionRate)
    const appRate = parseFloat(data.applicationRate)

    let recommendation = ''
    let priority = 'MEDIUM'

    if (data.totalLeads === 0) {
      recommendation = '⚠️ NO LEADS - Platform not active or no tracking data'
      priority = 'LOW'
    } else if (convRate < 3) {
      recommendation = '🔴 LOW CONVERSION (<3%) - Review audience targeting, creative, and pre-qualification'
      priority = 'HIGH'
    } else if (convRate < 5) {
      recommendation = '🟡 MODERATE (3-5%) - Optimize audience segments and messaging'
      priority = 'MEDIUM'
    } else if (convRate >= 5 && appRate < 1) {
      recommendation = '🟡 HIGH CONVERSION BUT LOW APPS - Improve lead-to-application flow'
      priority = 'MEDIUM'
    } else {
      recommendation = '🟢 PERFORMING WELL (>5%) - Scale budget and replicate strategy'
      priority = 'LOW'
    }

    recs.push({
      platform: platform.toUpperCase(),
      totalLeads: data.totalLeads,
      applications: data.applications,
      applicationRate: data.applicationRate,
      enrolled: data.enrolled,
      conversionRate: data.conversionRate,
      revenue: 'KES ' + data.revenue.toLocaleString(),
      avgTimeToEnroll: data.avgDaysToEnroll ? `${data.avgDaysToEnroll} days` : 'N/A',
      recommendation: recommendation,
      priority: priority
    })
  }

  return recs
}

// Output results
async function main() {
  try {
    const results = await analyzeMetaLeads()

    // Print summary
    console.log('\n' + '='.repeat(80))
    console.log('📊 META LEADS BREAKDOWN SUMMARY')
    console.log('='.repeat(80))

    console.log('\n✅ TOTAL LEADS BY PLATFORM:')
    console.log(`   Facebook: ${results.summary.facebookLeads.toLocaleString()} leads`)
    console.log(`   Instagram: ${results.summary.instagramLeads.toLocaleString()} leads`)
    console.log(`   WhatsApp: ${results.summary.whatsappLeads.toLocaleString()} leads`)
    console.log(`   Unknown: ${results.summary.unknownLeads.toLocaleString()} leads`)
    console.log(`   TOTAL: ${results.summary.totalLeads.toLocaleString()} leads`)

    console.log('\n📈 CONVERSION FUNNEL:')
    console.log(
      `   Total Applications: ${results.summary.totalApplications} (${((results.summary.totalApplications / results.summary.totalLeads) * 100).toFixed(2)}% of leads)`
    )
    console.log(
      `   Total Enrolled: ${results.summary.totalEnrolled} (${((results.summary.totalEnrolled / results.summary.totalLeads) * 100).toFixed(2)}% of leads)`
    )

    console.log('\n📈 PLATFORM PERFORMANCE:')
    results.recommendations.forEach((rec) => {
      console.log(`\n   ┌─ ${rec.platform} ${rec.priority === 'HIGH' ? '🔴' : rec.priority === 'MEDIUM' ? '🟡' : '🟢'}`)
      console.log(`   ├─ Total Leads: ${rec.totalLeads.toLocaleString()}`)
      console.log(`   ├─ Applications: ${rec.applications} (${rec.applicationRate})`)
      console.log(`   ├─ Enrolled: ${rec.enrolled} (${rec.conversionRate})`)
      console.log(`   ├─ Revenue: ${rec.revenue}`)
      console.log(`   ├─ Avg Time to Enroll: ${rec.avgTimeToEnroll}`)
      console.log(`   ├─ Priority: ${rec.priority}`)
      console.log(`   └─ ${rec.recommendation}`)
    })

    console.log('\n💡 PLATFORM COMPARISON TABLE:')
    console.log('\n' + generateComparisonTable(results.recommendations))

    // Save to file
    const timestamp = new Date().toISOString().split('T')[0]
    const outputPath = path.join(__dirname, '../reports', `meta-leads-breakdown-${timestamp}.json`)
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))

    console.log('\n✅ Results saved to: reports/meta-leads-breakdown-' + timestamp + '.json')
    console.log('='.repeat(80) + '\n')
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

function generateComparisonTable(recs) {
  let table = '| Platform | Leads | Apps | Conv% | Revenue | Recommendation |\n'
  table += '|----------|-------|------|-------|---------|----------------|\n'

  for (const rec of recs) {
    table += `| ${rec.platform} | ${rec.totalLeads} | ${rec.applications} | ${rec.conversionRate} | ${rec.revenue} | ${rec.recommendation.substring(0, 30)}... |\n`
  }

  return table
}

main()
