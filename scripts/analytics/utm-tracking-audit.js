/**
 * UTM Tracking Audit - Diagnose tracking gaps in Brevo CRM
 *
 * This script analyzes why 80% of contacts have no UTM parameters
 * and provides actionable fixes for tracking implementation.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY
const START_DATE = '2025-11-29'
const END_DATE = new Date().toISOString().split('T')[0]

if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found')
  process.exit(1)
}

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, data: JSON.parse(data) })
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: data })
        }
      })
    })
    req.on('error', reject)
    if (postData) req.write(JSON.stringify(postData))
    req.end()
  })
}

async function fetchBrevoContacts(startDate, endDate) {
  console.log(`\n📥 Fetching Brevo contacts (${startDate} to ${endDate})...`)
  
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  let allContacts = []
  let offset = 0
  const limit = 500
  let hasMore = true

  while (hasMore) {
    const options = {
      hostname: 'api.brevo.com',
      path: `/v3/contacts?limit=${limit}&offset=${offset}&modifiedSince=${start.toISOString()}`,
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    }

    const response = await makeRequest(options)
    
    if (response.statusCode !== 200) {
      console.error(`❌ Brevo API error: ${response.statusCode}`)
      break
    }

    const contacts = response.data.contacts || []
    
    const filteredContacts = contacts.filter(contact => {
      const createdAt = new Date(contact.createdAt)
      return createdAt >= start && createdAt <= end
    })
    
    allContacts = allContacts.concat(filteredContacts)
    
    hasMore = contacts.length === limit
    offset += limit
    
    console.log(`   Fetched ${allContacts.length} contacts...`)
  }
  
  console.log(`✅ Total contacts: ${allContacts.length}\n`)
  return allContacts
}

function analyzeUTMCoverage(contacts) {
  console.log('🔍 Analyzing UTM Parameter Coverage...\n')
  
  const analysis = {
    total: contacts.length,
    withUTM: 0,
    noUTM: 0,
    partialUTM: 0,
    sources: {},
    mediums: {},
    campaigns: {},
    pages: {},
    referrers: {},
    noUTMSamples: []
  }

  contacts.forEach(contact => {
    const attrs = contact.attributes || {}
    
    const utmSource = attrs.UTM_SOURCE || ''
    const utmMedium = attrs.UTM_MEDIUM || ''
    const utmCampaign = attrs.UTM_CAMPAIGN || ''
    const page = attrs.PAGE || attrs.LANDING_PAGE || ''
    const referrer = attrs.REFERRER || attrs.HTTP_REFERER || ''
    
    const hasUTM = utmSource || utmMedium || utmCampaign
    const hasCompleteUTM = utmSource && utmMedium
    
    if (hasCompleteUTM) {
      analysis.withUTM++
    } else if (hasUTM) {
      analysis.partialUTM++
    } else {
      analysis.noUTM++
      
      // Collect samples of contacts without UTM
      if (analysis.noUTMSamples.length < 10) {
        analysis.noUTMSamples.push({
          email: contact.email,
          name: `${attrs.FIRSTNAME || ''} ${attrs.LASTNAME || ''}`.trim(),
          page: page,
          referrer: referrer,
          createdAt: contact.createdAt,
          attributes: Object.keys(attrs)
        })
      }
    }
    
    // Track sources
    if (utmSource) {
      analysis.sources[utmSource] = (analysis.sources[utmSource] || 0) + 1
    }
    
    // Track mediums
    if (utmMedium) {
      analysis.mediums[utmMedium] = (analysis.mediums[utmMedium] || 0) + 1
    }
    
    // Track campaigns
    if (utmCampaign) {
      analysis.campaigns[utmCampaign] = (analysis.campaigns[utmCampaign] || 0) + 1
    }
    
    // Track pages
    if (page) {
      const pageKey = page.split('?')[0] // Remove query params
      analysis.pages[pageKey] = (analysis.pages[pageKey] || 0) + 1
    }
    
    // Track referrers
    if (referrer && !hasUTM) {
      try {
        const url = new URL(referrer)
        const domain = url.hostname
        analysis.referrers[domain] = (analysis.referrers[domain] || 0) + 1
      } catch (e) {
        // Invalid URL
      }
    }
  })

  return analysis
}

function generateReport(analysis) {
  console.log('=' .repeat(80))
  console.log('📊 UTM TRACKING AUDIT REPORT')
  console.log('=' .repeat(80))
  console.log()
  
  // Coverage Summary
  console.log('📈 COVERAGE SUMMARY')
  console.log('-' .repeat(80))
  console.log(`Total Contacts:              ${analysis.total}`)
  console.log(`With Complete UTM:           ${analysis.withUTM} (${((analysis.withUTM/analysis.total)*100).toFixed(1)}%)`)
  console.log(`With Partial UTM:            ${analysis.partialUTM} (${((analysis.partialUTM/analysis.total)*100).toFixed(1)}%)`)
  console.log(`No UTM Parameters:           ${analysis.noUTM} (${((analysis.noUTM/analysis.total)*100).toFixed(1)}%) ⚠️`)
  console.log()
  
  // UTM Sources
  console.log('🎯 UTM SOURCES (Top 10)')
  console.log('-' .repeat(80))
  const sortedSources = Object.entries(analysis.sources)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
  sortedSources.forEach(([source, count]) => {
    const percent = ((count / analysis.total) * 100).toFixed(1)
    console.log(`${source.padEnd(30)} ${count.toString().padStart(5)} (${percent}%)`)
  })
  console.log()
  
  // UTM Mediums
  console.log('📢 UTM MEDIUMS (Top 10)')
  console.log('-' .repeat(80))
  const sortedMediums = Object.entries(analysis.mediums)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
  sortedMediums.forEach(([medium, count]) => {
    const percent = ((count / analysis.total) * 100).toFixed(1)
    console.log(`${medium.padEnd(30)} ${count.toString().padStart(5)} (${percent}%)`)
  })
  console.log()
  
  // Top Campaigns
  console.log('🎪 TOP CAMPAIGNS (Top 10)')
  console.log('-' .repeat(80))
  const sortedCampaigns = Object.entries(analysis.campaigns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
  sortedCampaigns.forEach(([campaign, count]) => {
    const percent = ((count / analysis.total) * 100).toFixed(1)
    console.log(`${campaign.padEnd(30)} ${count.toString().padStart(5)} (${percent}%)`)
  })
  console.log()
  
  // Landing Pages
  console.log('📄 TOP LANDING PAGES (Top 10)')
  console.log('-' .repeat(80))
  const sortedPages = Object.entries(analysis.pages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
  sortedPages.forEach(([page, count]) => {
    const percent = ((count / analysis.total) * 100).toFixed(1)
    const shortPage = page.length > 50 ? page.substring(0, 47) + '...' : page
    console.log(`${shortPage.padEnd(50)} ${count.toString().padStart(5)} (${percent}%)`)
  })
  console.log()
  
  // Referrers for non-UTM traffic
  if (Object.keys(analysis.referrers).length > 0) {
    console.log('🔗 TOP REFERRERS (No UTM Traffic)')
    console.log('-' .repeat(80))
    const sortedReferrers = Object.entries(analysis.referrers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
    sortedReferrers.forEach(([referrer, count]) => {
      const percent = ((count / analysis.noUTM) * 100).toFixed(1)
      console.log(`${referrer.padEnd(50)} ${count.toString().padStart(5)} (${percent}% of no-UTM)`)
    })
    console.log()
  }
  
  // Sample contacts without UTM
  console.log('👥 SAMPLE CONTACTS WITHOUT UTM (First 10)')
  console.log('-' .repeat(80))
  analysis.noUTMSamples.forEach((sample, i) => {
    console.log(`${i + 1}. ${sample.email}`)
    console.log(`   Name: ${sample.name || 'N/A'}`)
    console.log(`   Page: ${sample.page || 'Not captured'}`)
    console.log(`   Referrer: ${sample.referrer || 'Not captured'}`)
    console.log(`   Created: ${sample.createdAt}`)
    console.log(`   Attributes: ${sample.attributes.length} fields captured`)
    console.log()
  })
  
  // Diagnosis & Recommendations
  console.log('=' .repeat(80))
  console.log('🔧 DIAGNOSIS & RECOMMENDATIONS')
  console.log('=' .repeat(80))
  console.log()
  
  const utmCoverage = (analysis.withUTM / analysis.total) * 100
  
  if (utmCoverage < 30) {
    console.log('🚨 CRITICAL: Less than 30% UTM coverage')
    console.log()
    console.log('Likely Issues:')
    console.log('1. Form submissions not capturing UTM parameters from URL')
    console.log('2. UTM parameters stored in session but not passed to Brevo')
    console.log('3. Direct traffic to forms (bypassing landing pages with UTMs)')
    console.log('4. Form embed issues preventing JavaScript UTM capture')
    console.log()
    console.log('Immediate Actions:')
    console.log('✓ Check form code for UTM parameter capture logic')
    console.log('✓ Verify hidden fields exist for: utm_source, utm_medium, utm_campaign')
    console.log('✓ Test form submission with UTM parameters in URL')
    console.log('✓ Review GA4 to compare session volume vs. form submission UTM capture')
    console.log('✓ Implement cookie-based UTM persistence for multi-page journeys')
  } else if (utmCoverage < 60) {
    console.log('⚠️  WARNING: 30-60% UTM coverage - significant tracking gaps')
    console.log()
    console.log('Likely Issues:')
    console.log('1. Some traffic sources not using UTM parameters')
    console.log('2. Partial UTM implementation (some forms tracked, others not)')
    console.log('3. Organic/direct traffic mixed with paid traffic')
    console.log()
    console.log('Recommended Actions:')
    console.log('✓ Audit all form submission pages for UTM capture')
    console.log('✓ Add UTM parameters to all paid campaign URLs')
    console.log('✓ Implement automatic UTM tagging for Google Ads (auto-tagging)')
    console.log('✓ Review Meta Ads for proper UTM parameter setup')
  } else {
    console.log('✅ GOOD: Over 60% UTM coverage - minor optimization needed')
    console.log()
    console.log('Optimization Opportunities:')
    console.log('✓ Capture referrer data for remaining non-UTM traffic')
    console.log('✓ Implement server-side UTM parameter enrichment')
    console.log('✓ Add campaign tracking to email campaigns')
  }
  
  console.log()
  console.log('=' .repeat(80))
  
  return {
    summary: {
      total: analysis.total,
      withUTM: analysis.withUTM,
      noUTM: analysis.noUTM,
      utmCoveragePercent: utmCoverage.toFixed(1)
    },
    sources: analysis.sources,
    mediums: analysis.mediums,
    campaigns: analysis.campaigns,
    pages: analysis.pages,
    referrers: analysis.referrers,
    noUTMSamples: analysis.noUTMSamples
  }
}

async function runAudit() {
  console.log('🔍 UTM Tracking Audit')
  console.log(`📅 Period: ${START_DATE} to ${END_DATE}`)
  console.log()
  
  const contacts = await fetchBrevoContacts(START_DATE, END_DATE)
  const analysis = analyzeUTMCoverage(contacts)
  const report = generateReport(analysis)
  
  // Save report
  const reportDir = path.join(__dirname, '../../reports')
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().split('T')[0]
  const reportPath = path.join(reportDir, `utm-tracking-audit-${timestamp}.json`)
  
  fs.writeFileSync(reportPath, JSON.stringify({ ...analysis, report }, null, 2))
  console.log(`\n✅ Full report saved: ${reportPath}`)
}

runAudit()
  .then(() => {
    console.log('\n✅ Audit complete!')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
