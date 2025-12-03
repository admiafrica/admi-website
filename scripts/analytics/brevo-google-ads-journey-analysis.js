/**
 * Brevo to Google Ads Journey Analysis
 *
 * This script:
 * 1. Fetches all leads from Brevo CRM
 * 2. Filters for enhanced enquiry leads with UTM data
 * 3. Maps leads to their Google Ads campaigns (Performance Max & Search)
 * 4. Analyzes lead quality by campaign
 * 5. Calculates conversion rates and lead scores
 * 6. Compares Performance Max vs Search campaign effectiveness
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY

if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found in environment variables')
  process.exit(1)
}

// Helper function to make HTTPS requests
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

// Fetch all contacts from Brevo with pagination (last 5 days only)
async function fetchAllBrevoContacts() {
  console.log('📥 Fetching contacts from Brevo (last 5 days)...\n')

  // Calculate date 5 days ago in ISO format
  const fiveDaysAgo = new Date()
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
  const modifiedSince = fiveDaysAgo.toISOString()

  console.log(`   Filtering contacts modified since: ${modifiedSince}\n`)

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
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await makeRequest(options)

      if (response.statusCode !== 200) {
        console.error(`❌ Brevo API error: ${response.statusCode}`)
        console.error(response.data)
        break
      }

      const contacts = response.data.contacts || []
      allContacts = allContacts.concat(contacts)

      console.log(`   Fetched ${contacts.length} contacts (total: ${allContacts.length})`)

      if (contacts.length < limit) {
        hasMore = false
      } else {
        offset += limit
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200))
    } catch (error) {
      console.error('❌ Error fetching contacts:', error.message)
      break
    }
  }

  console.log(`\n✅ Total contacts fetched: ${allContacts.length}\n`)
  return allContacts
}

// Analyze contacts and map to Google Ads campaigns
function analyzeLeadJourney(contacts) {
  console.log('🔍 Analyzing lead journey from Google Ads...\n')

  // Filter for contacts with UTM data
  const leadsWithUTM = contacts.filter((contact) => {
    const attrs = contact.attributes || {}
    return attrs.UTM_SOURCE || attrs.UTM_MEDIUM || attrs.UTM_CAMPAIGN
  })

  console.log(`📊 Contacts with UTM tracking: ${leadsWithUTM.length} / ${contacts.length}`)

  // Categorize by traffic source
  const googleAdsLeads = leadsWithUTM.filter((contact) => {
    const attrs = contact.attributes || {}
    const source = (attrs.UTM_SOURCE || '').toLowerCase()
    const medium = (attrs.UTM_MEDIUM || '').toLowerCase()

    return (source === 'google' || source === '1') && (medium === 'cpc' || medium === 'adwords' || medium === 'paid')
  })

  console.log(`🎯 Google Ads leads: ${googleAdsLeads.length}\n`)

  // Separate Performance Max vs Search campaigns
  const performanceMaxLeads = googleAdsLeads.filter((contact) => {
    const campaign = (contact.attributes?.UTM_CAMPAIGN || '').toLowerCase()
    return (
      campaign.includes('performance') ||
      campaign.includes('pmax') ||
      campaign.includes('p-max') ||
      campaign === '23282289054' || // Campaign ID for Performance Max
      campaign.includes('website-traffic-performance-max') ||
      campaign.includes('website traffic-performance max')
    )
  })

  const searchCampaignLeads = googleAdsLeads.filter((contact) => {
    const campaign = (contact.attributes?.UTM_CAMPAIGN || '').toLowerCase()
    return (
      (campaign.includes('search') && !campaign.includes('performance')) ||
      campaign.includes('admi search') ||
      campaign.includes('admi-search')
    )
  })

  const otherGoogleLeads = googleAdsLeads.filter((contact) => {
    const campaign = (contact.attributes?.UTM_CAMPAIGN || '').toLowerCase()
    return !campaign.includes('performance') && !campaign.includes('pmax') && !campaign.includes('search')
  })

  console.log('📈 Campaign Breakdown:')
  console.log(`   Performance Max: ${performanceMaxLeads.length}`)
  console.log(`   Search: ${searchCampaignLeads.length}`)
  console.log(`   Other Google Ads: ${otherGoogleLeads.length}\n`)

  // Analyze lead quality by campaign type
  const analyzeLeadQuality = (leads, campaignType) => {
    if (leads.length === 0) {
      return {
        campaignType,
        totalLeads: 0,
        avgLeadScore: 0,
        hotLeads: 0,
        warmLeads: 0,
        coldLeads: 0,
        unqualified: 0,
        leads: []
      }
    }

    let totalScore = 0
    let hotLeads = 0
    let warmLeads = 0
    let coldLeads = 0
    let unqualified = 0

    const leadDetails = leads.map((contact) => {
      const attrs = contact.attributes || {}
      const score = parseInt(attrs.QUALIFICATION_SCORE || attrs.SCORE || 0)
      totalScore += score

      // Categorize by score
      if (score >= 15) hotLeads++
      else if (score >= 10) warmLeads++
      else if (score >= 5) coldLeads++
      else unqualified++

      return {
        email: contact.email,
        name: `${attrs.FIRSTNAME || ''} ${attrs.LASTNAME || ''}`.trim(),
        phone: attrs.SMS || '',
        course: attrs.PREFERRED_COURSE || attrs.COURSE_INTERESTED_IN || '',
        leadScore: score,
        qualificationStatus: attrs.QUALIFICATION_STATUS || '',
        utm_source: attrs.UTM_SOURCE || '',
        utm_medium: attrs.UTM_MEDIUM || '',
        utm_campaign: attrs.UTM_CAMPAIGN || '',
        utm_term: attrs.UTM_TERM || '',
        utm_content: attrs.UTM_CONTENT || '',
        conversationSummary: attrs.CONVERSATION_SUMMARY || '',
        createdAt: contact.createdAt || '',
        modifiedAt: contact.modifiedAt || ''
      }
    })

    return {
      campaignType,
      totalLeads: leads.length,
      avgLeadScore: (totalScore / leads.length).toFixed(2),
      hotLeads,
      warmLeads,
      coldLeads,
      unqualified,
      hotLeadPercent: ((hotLeads / leads.length) * 100).toFixed(1),
      warmLeadPercent: ((warmLeads / leads.length) * 100).toFixed(1),
      coldLeadPercent: ((coldLeads / leads.length) * 100).toFixed(1),
      unqualifiedPercent: ((unqualified / leads.length) * 100).toFixed(1),
      leads: leadDetails.sort((a, b) => b.leadScore - a.leadScore)
    }
  }

  const performanceMaxAnalysis = analyzeLeadQuality(performanceMaxLeads, 'Performance Max')
  const searchCampaignAnalysis = analyzeLeadQuality(searchCampaignLeads, 'Search Campaign')
  const otherGoogleAnalysis = analyzeLeadQuality(otherGoogleLeads, 'Other Google Ads')

  return {
    summary: {
      totalContacts: contacts.length,
      contactsWithUTM: leadsWithUTM.length,
      googleAdsLeads: googleAdsLeads.length,
      performanceMaxLeads: performanceMaxLeads.length,
      searchCampaignLeads: searchCampaignLeads.length,
      otherGoogleLeads: otherGoogleLeads.length
    },
    performanceMax: performanceMaxAnalysis,
    searchCampaign: searchCampaignAnalysis,
    otherGoogle: otherGoogleAnalysis,
    allGoogleAdsLeads: analyzeLeadQuality(googleAdsLeads, 'All Google Ads')
  }
}

// Display results
function displayResults(analysis) {
  console.log('\n' + '='.repeat(80))
  console.log('📊 BREVO TO GOOGLE ADS JOURNEY ANALYSIS REPORT')
  console.log('='.repeat(80) + '\n')

  console.log('🎯 SUMMARY')
  console.log('-'.repeat(80))
  console.log(`Total Contacts in Brevo:           ${analysis.summary.totalContacts.toLocaleString()}`)
  console.log(`Contacts with UTM Tracking:        ${analysis.summary.contactsWithUTM.toLocaleString()}`)
  console.log(`Google Ads Leads:                  ${analysis.summary.googleAdsLeads.toLocaleString()}`)
  console.log(`  └─ Performance Max:              ${analysis.summary.performanceMaxLeads.toLocaleString()}`)
  console.log(`  └─ Search Campaign:              ${analysis.summary.searchCampaignLeads.toLocaleString()}`)
  console.log(`  └─ Other Google Ads:             ${analysis.summary.otherGoogleLeads.toLocaleString()}\n`)

  // Performance Max Analysis
  if (analysis.performanceMax.totalLeads > 0) {
    console.log('🚀 PERFORMANCE MAX CAMPAIGN')
    console.log('-'.repeat(80))
    console.log(`Total Leads:                       ${analysis.performanceMax.totalLeads}`)
    console.log(`Average Lead Score:                ${analysis.performanceMax.avgLeadScore}/20`)
    console.log(
      `Hot Leads (15-20):                 ${analysis.performanceMax.hotLeads} (${analysis.performanceMax.hotLeadPercent}%)`
    )
    console.log(
      `Warm Leads (10-14):                ${analysis.performanceMax.warmLeads} (${analysis.performanceMax.warmLeadPercent}%)`
    )
    console.log(
      `Cold Leads (5-9):                  ${analysis.performanceMax.coldLeads} (${analysis.performanceMax.coldLeadPercent}%)`
    )
    console.log(
      `Unqualified (<5):                  ${analysis.performanceMax.unqualified} (${analysis.performanceMax.unqualifiedPercent}%)\n`
    )

    if (analysis.performanceMax.leads.length > 0) {
      console.log('Top 5 Performance Max Leads:')
      analysis.performanceMax.leads.slice(0, 5).forEach((lead, index) => {
        console.log(`   ${index + 1}. ${lead.name || lead.email} - Score: ${lead.leadScore}/20`)
        console.log(`      Course: ${lead.course}`)
        console.log(`      Campaign: ${lead.utm_campaign}`)
        console.log(`      Created: ${new Date(lead.createdAt).toLocaleDateString()}\n`)
      })
    }
  } else {
    console.log('🚀 PERFORMANCE MAX CAMPAIGN')
    console.log('-'.repeat(80))
    console.log('❌ No leads found from Performance Max campaign yet\n')
  }

  // Search Campaign Analysis
  if (analysis.searchCampaign.totalLeads > 0) {
    console.log('🔍 SEARCH CAMPAIGN')
    console.log('-'.repeat(80))
    console.log(`Total Leads:                       ${analysis.searchCampaign.totalLeads}`)
    console.log(`Average Lead Score:                ${analysis.searchCampaign.avgLeadScore}/20`)
    console.log(
      `Hot Leads (15-20):                 ${analysis.searchCampaign.hotLeads} (${analysis.searchCampaign.hotLeadPercent}%)`
    )
    console.log(
      `Warm Leads (10-14):                ${analysis.searchCampaign.warmLeads} (${analysis.searchCampaign.warmLeadPercent}%)`
    )
    console.log(
      `Cold Leads (5-9):                  ${analysis.searchCampaign.coldLeads} (${analysis.searchCampaign.coldLeadPercent}%)`
    )
    console.log(
      `Unqualified (<5):                  ${analysis.searchCampaign.unqualified} (${analysis.searchCampaign.unqualifiedPercent}%)\n`
    )

    if (analysis.searchCampaign.leads.length > 0) {
      console.log('Top 5 Search Campaign Leads:')
      analysis.searchCampaign.leads.slice(0, 5).forEach((lead, index) => {
        console.log(`   ${index + 1}. ${lead.name || lead.email} - Score: ${lead.leadScore}/20`)
        console.log(`      Course: ${lead.course}`)
        console.log(`      Campaign: ${lead.utm_campaign}`)
        console.log(`      Created: ${new Date(lead.createdAt).toLocaleDateString()}\n`)
      })
    }
  } else {
    console.log('🔍 SEARCH CAMPAIGN')
    console.log('-'.repeat(80))
    console.log('❌ No leads found from Search campaign yet\n')
  }

  // Comparison
  if (analysis.performanceMax.totalLeads > 0 && analysis.searchCampaign.totalLeads > 0) {
    console.log('⚖️  PERFORMANCE MAX vs SEARCH COMPARISON')
    console.log('-'.repeat(80))

    const pmaxScore = parseFloat(analysis.performanceMax.avgLeadScore)
    const searchScore = parseFloat(analysis.searchCampaign.avgLeadScore)
    const scoreDiff = Math.abs(pmaxScore - searchScore)
    const winner = pmaxScore > searchScore ? 'Performance Max' : 'Search'

    console.log('Average Lead Score:')
    console.log(`  Performance Max:                 ${analysis.performanceMax.avgLeadScore}/20`)
    console.log(`  Search Campaign:                 ${analysis.searchCampaign.avgLeadScore}/20`)
    console.log(`  Winner:                          ${winner} (+${scoreDiff.toFixed(2)} points)\n`)

    console.log('Hot Lead Rate:')
    console.log(`  Performance Max:                 ${analysis.performanceMax.hotLeadPercent}%`)
    console.log(`  Search Campaign:                 ${analysis.searchCampaign.hotLeadPercent}%\n`)

    console.log('Lead Volume:')
    console.log(`  Performance Max:                 ${analysis.performanceMax.totalLeads} leads`)
    console.log(`  Search Campaign:                 ${analysis.searchCampaign.totalLeads} leads\n`)
  }

  // All Google Ads Summary
  console.log('📊 ALL GOOGLE ADS LEADS COMBINED')
  console.log('-'.repeat(80))
  console.log(`Total Google Ads Leads:            ${analysis.allGoogleAdsLeads.totalLeads}`)
  console.log(`Average Lead Score:                ${analysis.allGoogleAdsLeads.avgLeadScore}/20`)
  console.log(
    `Hot Leads (15-20):                 ${analysis.allGoogleAdsLeads.hotLeads} (${analysis.allGoogleAdsLeads.hotLeadPercent}%)`
  )
  console.log(
    `Warm Leads (10-14):                ${analysis.allGoogleAdsLeads.warmLeads} (${analysis.allGoogleAdsLeads.warmLeadPercent}%)`
  )
  console.log(
    `Cold Leads (5-9):                  ${analysis.allGoogleAdsLeads.coldLeads} (${analysis.allGoogleAdsLeads.coldLeadPercent}%)`
  )
  console.log(
    `Unqualified (<5):                  ${analysis.allGoogleAdsLeads.unqualified} (${analysis.allGoogleAdsLeads.unqualifiedPercent}%)\n`
  )

  // Course preferences
  const coursePreferences = {}
  analysis.allGoogleAdsLeads.leads.forEach((lead) => {
    const course = lead.course || 'Not specified'
    coursePreferences[course] = (coursePreferences[course] || 0) + 1
  })

  const sortedCourses = Object.entries(coursePreferences)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  if (sortedCourses.length > 0) {
    console.log('🎓 TOP 5 COURSES FROM GOOGLE ADS')
    console.log('-'.repeat(80))
    sortedCourses.forEach(([course, count], index) => {
      const percent = ((count / analysis.allGoogleAdsLeads.totalLeads) * 100).toFixed(1)
      console.log(`   ${index + 1}. ${course}: ${count} leads (${percent}%)`)
    })
    console.log()
  }

  console.log('='.repeat(80) + '\n')
}

// Save detailed report to file
function saveDetailedReport(analysis) {
  const reportDir = path.join(__dirname, '../../reports/google-ads')

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().split('T')[0]
  const reportPath = path.join(reportDir, `brevo-google-ads-journey-${timestamp}.json`)

  fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2))
  console.log(`💾 Detailed report saved to: ${reportPath}\n`)

  // Also save CSV for easy analysis in spreadsheets
  if (analysis.allGoogleAdsLeads.leads.length > 0) {
    const csvPath = path.join(reportDir, `brevo-google-ads-leads-${timestamp}.csv`)
    const csvHeaders = [
      'Email',
      'Name',
      'Phone',
      'Course',
      'Lead Score',
      'Qualification Status',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Term',
      'UTM Content',
      'Created At',
      'Conversation Summary'
    ].join(',')

    const csvRows = analysis.allGoogleAdsLeads.leads.map((lead) => {
      return [
        lead.email,
        `"${lead.name}"`,
        lead.phone,
        `"${lead.course}"`,
        lead.leadScore,
        `"${lead.qualificationStatus}"`,
        lead.utm_source,
        lead.utm_medium,
        `"${lead.utm_campaign}"`,
        `"${lead.utm_term}"`,
        `"${lead.utm_content}"`,
        new Date(lead.createdAt).toISOString(),
        `"${lead.conversationSummary}"`
      ].join(',')
    })

    fs.writeFileSync(csvPath, csvHeaders + '\n' + csvRows.join('\n'))
    console.log(`📊 CSV export saved to: ${csvPath}\n`)
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Brevo to Google Ads Journey Analysis\n')
    console.log('='.repeat(80) + '\n')

    // Fetch contacts
    const contacts = await fetchAllBrevoContacts()

    // Analyze journey
    const analysis = analyzeLeadJourney(contacts)

    // Display results
    displayResults(analysis)

    // Save detailed report
    saveDetailedReport(analysis)

    console.log('✅ Analysis complete!\n')
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

// Run the analysis
main()
