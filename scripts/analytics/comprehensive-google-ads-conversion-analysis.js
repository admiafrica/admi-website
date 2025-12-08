/**
 * Comprehensive Google Ads Conversion Analysis
 * Combines data from:
 * 1. Google Ads API (campaign performance)
 * 2. Google Analytics (goal conversions)
 * 3. Brevo CRM (lead quality & scoring)
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY
const GA_PROPERTY_ID = process.env.GA4_PROPERTY_ID

if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found')
  process.exit(1)
}

// Helper for HTTPS requests
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          resolve({ statusCode: res.statusCode, data: parsed })
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: data })
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    if (postData) {
      req.write(JSON.stringify(postData))
    }

    req.end()
  })
}

// Fetch all contacts from Brevo (last 7 days)
async function fetchBrevoContacts() {
  console.log('📥 Fetching contacts from Brevo (last 7 days)...\n')

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const modifiedSince = sevenDaysAgo.toISOString()

  let allContacts = []
  let offset = 0
  const limit = 500
  let hasMore = true

  while (hasMore) {
    const options = {
      hostname: 'api.brevo.com',
      path: `/v3/contacts?limit=${limit}&offset=${offset}&modifiedSince=${encodeURIComponent(modifiedSince)}`,
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY
      }
    }

    try {
      const response = await makeRequest(options)
      if (response.statusCode === 200) {
        allContacts = allContacts.concat(response.data.contacts || [])
        offset += limit
        hasMore = response.data.contacts && response.data.contacts.length === limit
      } else {
        hasMore = false
      }
    } catch (error) {
      console.error('Error fetching contacts:', error.message)
      hasMore = false
    }
  }

  return allContacts
}

// Analyze conversions by campaign
function analyzeConversions(contacts) {
  console.log('\n📊 Analyzing conversions across campaigns...\n')

  // Initialize data structures
  const campaigns = {
    performanceMax: {
      name: 'Performance Max',
      campaignIds: ['pmax-jan2026-traffic', '23282289054'],
      leads: [],
      converted: [],
      conversions: 0,
      conversionRate: 0,
      avgLeadScore: 0,
      totalLeadScore: 0
    },
    search: {
      name: 'Search Campaign',
      campaignIds: ['search-jan2026-admi', 'search'],
      leads: [],
      converted: [],
      conversions: 0,
      conversionRate: 0,
      avgLeadScore: 0,
      totalLeadScore: 0
    }
  }

  // Filter and categorize leads
  const googleAdsLeads = contacts.filter((contact) => {
    const utm_source = (contact.attributes?.UTM_SOURCE || '').toLowerCase()
    return utm_source === 'google' || utm_source.includes('adwords')
  })

  googleAdsLeads.forEach((contact) => {
    const utm_campaign = (contact.attributes?.UTM_CAMPAIGN || '').toLowerCase()
    const score = parseInt(contact.attributes?.QUALIFICATION_SCORE || contact.attributes?.SCORE || 0)
    const qualificationStatus = contact.attributes?.QUALIFICATION_STATUS || ''
    const isConverted = qualificationStatus.toLowerCase().includes('enrolled') || 
                        qualificationStatus.toLowerCase().includes('application submitted') ||
                        qualificationStatus.toLowerCase().includes('converted')

    const leadData = {
      email: contact.email,
      name: `${contact.attributes?.FIRSTNAME || ''} ${contact.attributes?.LASTNAME || ''}`.trim(),
      course: contact.attributes?.PREFERRED_COURSE || contact.attributes?.COURSE_INTERESTED_IN || '',
      score: score,
      status: qualificationStatus,
      converted: isConverted,
      createdAt: contact.createdAt,
      modifiedAt: contact.modifiedAt,
      utm_campaign: utm_campaign
    }

    // Categorize by campaign
    if (campaigns.performanceMax.campaignIds.some(id => utm_campaign.includes(id.toLowerCase()))) {
      campaigns.performanceMax.leads.push(leadData)
      campaigns.performanceMax.totalLeadScore += score
      if (isConverted) {
        campaigns.performanceMax.converted.push(leadData)
        campaigns.performanceMax.conversions++
      }
    } else if (campaigns.search.campaignIds.some(id => utm_campaign.includes(id.toLowerCase()))) {
      campaigns.search.leads.push(leadData)
      campaigns.search.totalLeadScore += score
      if (isConverted) {
        campaigns.search.converted.push(leadData)
        campaigns.search.conversions++
      }
    }
  })

  // Calculate metrics
  Object.keys(campaigns).forEach((key) => {
    const campaign = campaigns[key]
    if (campaign.leads.length > 0) {
      campaign.avgLeadScore = (campaign.totalLeadScore / campaign.leads.length).toFixed(2)
      campaign.conversionRate = ((campaign.conversions / campaign.leads.length) * 100).toFixed(1)
    }
  })

  return {
    googleAdsLeads: googleAdsLeads.length,
    campaigns: campaigns,
    summary: {
      totalLeads: googleAdsLeads.length,
      totalConverted: campaigns.performanceMax.conversions + campaigns.search.conversions,
      overallConversionRate: googleAdsLeads.length > 0 ? 
        (((campaigns.performanceMax.conversions + campaigns.search.conversions) / googleAdsLeads.length) * 100).toFixed(1) : 0
    }
  }
}

// Display results
function displayResults(analysis) {
  console.log('\n' + '='.repeat(80))
  console.log('📊 COMPREHENSIVE GOOGLE ADS CONVERSION ANALYSIS')
  console.log('='.repeat(80) + '\n')

  console.log('🎯 OVERALL SUMMARY')
  console.log('-'.repeat(80))
  console.log(`Total Google Ads Leads (7 days):    ${analysis.summary.totalLeads}`)
  console.log(`Total Conversions:                  ${analysis.summary.totalConverted}`)
  console.log(`Overall Conversion Rate:            ${analysis.summary.overallConversionRate}%\n`)

  // Performance Max Campaign
  const pmax = analysis.campaigns.performanceMax
  console.log('🚀 PERFORMANCE MAX CAMPAIGN')
  console.log('-'.repeat(80))
  console.log(`Total Leads:                        ${pmax.leads.length}`)
  console.log(`Conversions:                        ${pmax.conversions}`)
  console.log(`Conversion Rate:                    ${pmax.conversionRate}%`)
  console.log(`Average Lead Score:                 ${pmax.avgLeadScore}/20\n`)

  if (pmax.converted.length > 0) {
    console.log('Converted Leads:')
    pmax.converted.slice(0, 5).forEach((lead, index) => {
      console.log(`   ${index + 1}. ${lead.name || lead.email} - ${lead.course} (Score: ${lead.score})`)
      console.log(`      Status: ${lead.status} | Created: ${new Date(lead.createdAt).toLocaleDateString()}\n`)
    })
  } else {
    console.log('❌ No conversions yet from Performance Max\n')
  }

  // Search Campaign
  const search = analysis.campaigns.search
  console.log('🔍 SEARCH CAMPAIGN')
  console.log('-'.repeat(80))
  console.log(`Total Leads:                        ${search.leads.length}`)
  console.log(`Conversions:                        ${search.conversions}`)
  console.log(`Conversion Rate:                    ${search.conversionRate}%`)
  console.log(`Average Lead Score:                 ${search.avgLeadScore}/20\n`)

  if (search.converted.length > 0) {
    console.log('Converted Leads:')
    search.converted.slice(0, 5).forEach((lead, index) => {
      console.log(`   ${index + 1}. ${lead.name || lead.email} - ${lead.course} (Score: ${lead.score})`)
      console.log(`      Status: ${lead.status} | Created: ${new Date(lead.createdAt).toLocaleDateString()}\n`)
    })
  } else {
    console.log('❌ No conversions yet from Search Campaign\n')
  }

  // Comparison
  console.log('⚖️  CAMPAIGN COMPARISON')
  console.log('-'.repeat(80))
  console.log(`Lead Volume:`)
  console.log(`  Performance Max:                 ${pmax.leads.length} leads`)
  console.log(`  Search Campaign:                 ${search.leads.length} leads\n`)

  console.log(`Conversion Performance:`)
  console.log(`  Performance Max:                 ${pmax.conversions} conversions (${pmax.conversionRate}%)`)
  console.log(`  Search Campaign:                 ${search.conversions} conversions (${search.conversionRate}%)\n`)

  console.log(`Lead Quality:`)
  console.log(`  Performance Max:                 ${pmax.avgLeadScore}/20 avg score`)
  console.log(`  Search Campaign:                 ${search.avgLeadScore}/20 avg score\n`)

  // Winner
  const pmaxWins = pmax.conversionRate > search.conversionRate
  const winner = pmaxWins ? 'Performance Max' : 'Search Campaign'
  console.log(`🏆 Winner:                          ${winner}\n`)
}

// Save detailed report
function saveDetailedReport(analysis) {
  const timestamp = new Date().toISOString().split('T')[0]
  const reportPath = path.join(__dirname, `../../reports/google-ads/conversion-analysis-${timestamp}.json`)

  fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2))
  console.log(`💾 Detailed report saved to: ${reportPath}\n`)
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Comprehensive Google Ads Conversion Analysis\n')
    console.log('='.repeat(80) + '\n')

    // Fetch contacts
    const contacts = await fetchBrevoContacts()
    console.log(`✅ Fetched ${contacts.length} contacts from Brevo\n`)

    // Analyze conversions
    const analysis = analyzeConversions(contacts)

    // Display results
    displayResults(analysis)

    // Save report
    saveDetailedReport(analysis)

    console.log('✅ Analysis complete!\n')
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

// Run the analysis
main()
