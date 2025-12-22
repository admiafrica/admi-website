/**
 * Comprehensive Campaign Analysis - Google Ads + Meta Ads + Google Analytics + Brevo CRM
 *
 * This script provides a unified analysis of:
 * 1. Google Ads Performance (Search + Performance Max campaigns)
 * 2. Meta Ads Performance (Facebook + Instagram)
 * 3. Google Analytics traffic and conversion data
 * 4. Brevo CRM lead quality and journey analysis
 *
 * Date Range: Nov 29, 2025 - Present
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https')
const fs = require('fs')
const path = require('path')
const { BetaAnalyticsDataClient } = require('@google-analytics/data')

// Load environment variables
require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY
const GA_PROPERTY_ID = process.env.GA4_PROPERTY_ID || process.env.GOOGLE_ANALYTICS_PROPERTY_ID || process.env.GA_PROPERTY_ID || '448618054'
const START_DATE = '2025-11-29'
const END_DATE = new Date().toISOString().split('T')[0]

// Validate environment
if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found')
  process.exit(1)
}

// Helper function for HTTPS requests
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

// ============================================================================
// BREVO CRM DATA
// ============================================================================

async function fetchBrevoContacts(startDate, endDate) {
  console.log(`\n📥 Fetching Brevo CRM contacts (${startDate} to ${endDate})...`)
  
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
    
    // Filter by createdAt within date range
    const filteredContacts = contacts.filter(contact => {
      const createdAt = new Date(contact.createdAt)
      return createdAt >= start && createdAt <= end
    })
    
    allContacts = allContacts.concat(filteredContacts)
    
    hasMore = contacts.length === limit
    offset += limit
    
    console.log(`   Fetched ${allContacts.length} contacts...`)
  }
  
  console.log(`✅ Total contacts: ${allContacts.length}`)
  return allContacts
}

function analyzeBrevoLeads(contacts) {
  const googleAdsLeads = []
  const metaAdsLeads = []
  const organicLeads = []
  const otherLeads = []

  contacts.forEach(contact => {
    const attrs = contact.attributes || {}
    const utmSource = (attrs.UTM_SOURCE || '').toLowerCase()
    const utmMedium = (attrs.UTM_MEDIUM || '').toLowerCase()
    const utmCampaign = attrs.UTM_CAMPAIGN || ''
    
    // Get lead score from Brevo (already calculated)
    const leadScore = parseInt(attrs.QUALIFICATION_SCORE || attrs.SCORE || 0)
    
    const leadData = {
      email: contact.email,
      name: `${attrs.FIRSTNAME || ''} ${attrs.LASTNAME || ''}`.trim(),
      phone: attrs.SMS || attrs.PHONE || '',
      course: attrs.PREFERRED_COURSE || attrs.COURSE_INTERESTED_IN || attrs.COURSE_INTEREST || '',
      leadScore,
      qualificationStatus: attrs.QUALIFICATION_STATUS || getQualificationStatus(leadScore),
      utm_source: attrs.UTM_SOURCE || '',
      utm_medium: attrs.UTM_MEDIUM || '',
      utm_campaign: utmCampaign,
      utm_term: attrs.UTM_TERM || '',
      utm_content: attrs.UTM_CONTENT || '',
      conversationSummary: attrs.CONVERSATION_SUMMARY || '',
      createdAt: contact.createdAt,
      modifiedAt: contact.modifiedAt
    }

    if (utmSource === 'google' && (utmMedium === 'cpc' || utmMedium === 'paid' || utmMedium === 'adwords')) {
      googleAdsLeads.push(leadData)
    } else if (utmSource === 'facebook' || utmSource === 'meta' || utmSource === 'instagram') {
      metaAdsLeads.push(leadData)
    } else if (utmMedium === 'organic') {
      organicLeads.push(leadData)
    } else {
      otherLeads.push(leadData)
    }
  })

  return { googleAdsLeads, metaAdsLeads, organicLeads, otherLeads }
}

function calculateLeadScore(attrs) {
  let score = 0
  
  // Timeline readiness (max 5 points)
  const timeline = (attrs.ENROLLMENT_TIMELINE || '').toLowerCase()
  if (timeline.includes('immediate') || timeline.includes('january 2026')) score += 5
  else if (timeline.includes('april') || timeline.includes('next intake')) score += 4
  else if (timeline.includes('2026')) score += 3
  else if (timeline.includes('just exploring')) score += 1
  
  // Course interest specificity (max 4 points)
  const course = (attrs.COURSE_INTEREST || '').toLowerCase()
  if (course && course !== 'not sure' && course !== 'just browsing') score += 4
  else if (course) score += 2
  
  // Financial readiness (max 4 points)
  const financing = (attrs.FINANCING_PLAN || '').toLowerCase()
  if (financing.includes('full payment') || financing.includes('ready to pay')) score += 4
  else if (financing.includes('payment plan') || financing.includes('installments')) score += 3
  else if (financing.includes('exploring') || financing.includes('need help')) score += 2
  
  // Engagement level (max 4 points)
  const questions = attrs.SPECIFIC_QUESTIONS || ''
  if (questions && questions.length > 100) score += 4
  else if (questions && questions.length > 50) score += 3
  else if (questions) score += 2
  
  // Phone provided (max 3 points)
  if (attrs.SMS || attrs.PHONE) score += 3
  
  return score
}

function getQualificationStatus(score) {
  if (score >= 15) return 'Hot Lead'
  if (score >= 10) return 'Warm Lead'
  if (score >= 5) return 'Cold Lead'
  return 'Unqualified'
}

// ============================================================================
// GOOGLE ANALYTICS DATA
// ============================================================================

async function fetchGoogleAnalyticsData() {
  console.log(`\n📊 Fetching Google Analytics data (${START_DATE} to ${END_DATE})...`)
  
  const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: path.join(__dirname, '../../ga-service-account.json')
  })

  try {
    // Traffic by source/medium
    const [trafficResponse] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: START_DATE, endDate: END_DATE }],
      dimensions: [
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
        { name: 'sessionCampaignName' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ]
    })

    // Goal completions by campaign
    const [conversionsResponse] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: START_DATE, endDate: END_DATE }],
      dimensions: [
        { name: 'sessionSource' },
        { name: 'sessionCampaignName' },
        { name: 'eventName' }
      ],
      metrics: [
        { name: 'eventCount' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'CONTAINS',
            value: 'form_submit'
          }
        }
      }
    })

    const analytics = {
      trafficByCampaign: parseAnalyticsRows(trafficResponse.rows),
      conversions: parseAnalyticsRows(conversionsResponse.rows),
      summary: {
        totalSessions: 0,
        totalUsers: 0,
        totalConversions: 0,
        avgEngagementRate: 0,
        avgBounceRate: 0
      }
    }

    // Calculate summary
    if (trafficResponse.rows) {
      analytics.summary.totalSessions = trafficResponse.rows.reduce((sum, row) => 
        sum + parseInt(row.metricValues[0].value), 0)
      analytics.summary.totalUsers = trafficResponse.rows.reduce((sum, row) => 
        sum + parseInt(row.metricValues[1].value), 0)
      analytics.summary.totalConversions = trafficResponse.rows.reduce((sum, row) => 
        sum + parseInt(row.metricValues[6].value), 0)
    }

    console.log(`✅ Sessions: ${analytics.summary.totalSessions}`)
    console.log(`✅ Users: ${analytics.summary.totalUsers}`)
    console.log(`✅ Conversions: ${analytics.summary.totalConversions}`)

    return analytics
  } catch (error) {
    console.error('❌ Error fetching Google Analytics data:', error.message)
    return { error: error.message }
  }
}

function parseAnalyticsRows(rows) {
  if (!rows) return []
  
  return rows.map(row => {
    const dimensions = {}
    const metrics = {}
    
    row.dimensionValues.forEach((dim, i) => {
      dimensions[`dimension${i}`] = dim.value
    })
    
    row.metricValues.forEach((metric, i) => {
      metrics[`metric${i}`] = metric.value
    })
    
    return { ...dimensions, ...metrics }
  })
}

// ============================================================================
// GOOGLE ADS DATA (from existing reports + Brevo attribution)
// ============================================================================

function analyzeGoogleAds(googleAdsLeads, analyticsData) {
  console.log(`\n🎯 Analyzing Google Ads performance...`)
  
  const performanceMax = googleAdsLeads.filter(lead => {
    const campaign = lead.utm_campaign.toLowerCase()
    return (
      campaign.includes('performance') ||
      campaign.includes('pmax') ||
      campaign.includes('p-max') ||
      campaign === '23282289054' || // Campaign ID for Performance Max
      campaign.includes('website-traffic-performance-max') ||
      campaign.includes('website traffic-performance max')
    )
  })
  
  const searchCampaigns = googleAdsLeads.filter(lead => {
    const campaign = lead.utm_campaign.toLowerCase()
    return (
      (campaign.includes('search') && !campaign.includes('performance')) ||
      campaign.includes('admi search') ||
      campaign.includes('admi-search')
    )
  })
  
  const otherGoogleAds = googleAdsLeads.filter(lead => {
    const campaign = lead.utm_campaign.toLowerCase()
    return !campaign.includes('performance') && 
           !campaign.includes('pmax') && 
           !campaign.includes('search') &&
           campaign !== '23282289054'
  })

  const calculateCampaignMetrics = (leads) => {
    if (leads.length === 0) {
      return {
        totalLeads: 0,
        avgLeadScore: '0.00',
        hotLeads: 0,
        warmLeads: 0,
        coldLeads: 0,
        unqualified: 0,
        hotLeadPercent: '0.0',
        warmLeadPercent: '0.0',
        coldLeadPercent: '0.0',
        unqualifiedPercent: '0.0',
        leads: []
      }
    }
    
    const hotLeads = leads.filter(l => l.leadScore >= 15)
    const warmLeads = leads.filter(l => l.leadScore >= 10 && l.leadScore < 15)
    const coldLeads = leads.filter(l => l.leadScore >= 5 && l.leadScore < 10)
    const unqualified = leads.filter(l => l.leadScore < 5)
    
    const avgScore = leads.reduce((sum, l) => sum + l.leadScore, 0) / leads.length
    
    return {
      totalLeads: leads.length,
      avgLeadScore: avgScore.toFixed(2),
      hotLeads: hotLeads.length,
      warmLeads: warmLeads.length,
      coldLeads: coldLeads.length,
      unqualified: unqualified.length,
      hotLeadPercent: ((hotLeads.length / leads.length) * 100).toFixed(1),
      warmLeadPercent: ((warmLeads.length / leads.length) * 100).toFixed(1),
      coldLeadPercent: ((coldLeads.length / leads.length) * 100).toFixed(1),
      unqualifiedPercent: ((unqualified.length / leads.length) * 100).toFixed(1),
      leads: leads.sort((a, b) => b.leadScore - a.leadScore)
    }
  }

  return {
    performanceMax: calculateCampaignMetrics(performanceMax),
    searchCampaigns: calculateCampaignMetrics(searchCampaigns),
    otherGoogleAds: calculateCampaignMetrics(otherGoogleAds),
    total: calculateCampaignMetrics(googleAdsLeads)
  }
}

// ============================================================================
// META ADS DATA
// ============================================================================

function analyzeMetaAds(metaAdsLeads) {
  console.log(`\n📘 Analyzing Meta Ads performance...`)
  
  const facebook = metaAdsLeads.filter(lead => 
    lead.utm_source.toLowerCase() === 'facebook'
  )
  
  const instagram = metaAdsLeads.filter(lead => 
    lead.utm_source.toLowerCase() === 'instagram'
  )

  const calculateMetrics = (leads) => {
    const hotLeads = leads.filter(l => l.qualificationStatus === 'Hot Lead')
    const warmLeads = leads.filter(l => l.qualificationStatus === 'Warm Lead')
    const coldLeads = leads.filter(l => l.qualificationStatus === 'Cold Lead')
    const unqualified = leads.filter(l => l.qualificationStatus === 'Unqualified')
    
    const avgScore = leads.reduce((sum, l) => sum + l.leadScore, 0) / (leads.length || 1)
    
    return {
      totalLeads: leads.length,
      avgLeadScore: avgScore.toFixed(2),
      hotLeads: hotLeads.length,
      warmLeads: warmLeads.length,
      coldLeads: coldLeads.length,
      unqualified: unqualified.length,
      hotLeadPercent: ((hotLeads.length / (leads.length || 1)) * 100).toFixed(1),
      leads: leads
    }
  }

  return {
    facebook: calculateMetrics(facebook),
    instagram: calculateMetrics(instagram),
    total: calculateMetrics(metaAdsLeads)
  }
}

// ============================================================================
// COMPREHENSIVE ANALYSIS
// ============================================================================

async function runComprehensiveAnalysis() {
  console.log('=' .repeat(80))
  console.log('📊 COMPREHENSIVE CAMPAIGN ANALYSIS')
  console.log('=' .repeat(80))
  console.log(`📅 Date Range: ${START_DATE} to ${END_DATE}`)
  console.log('=' .repeat(80))

  // Fetch all data
  const brevoContacts = await fetchBrevoContacts(START_DATE, END_DATE)
  const { googleAdsLeads, metaAdsLeads, organicLeads, otherLeads } = analyzeBrevoLeads(brevoContacts)
  const analyticsData = await fetchGoogleAnalyticsData()
  
  // Analyze campaigns
  const googleAdsAnalysis = analyzeGoogleAds(googleAdsLeads, analyticsData)
  const metaAdsAnalysis = analyzeMetaAds(metaAdsLeads)

  // Generate comprehensive report
  const report = {
    dateRange: {
      start: START_DATE,
      end: END_DATE,
      daysAnalyzed: Math.ceil((new Date(END_DATE) - new Date(START_DATE)) / (1000 * 60 * 60 * 24))
    },
    summary: {
      totalContacts: brevoContacts.length,
      googleAdsLeads: googleAdsLeads.length,
      metaAdsLeads: metaAdsLeads.length,
      organicLeads: organicLeads.length,
      otherLeads: otherLeads.length,
      paidLeads: googleAdsLeads.length + metaAdsLeads.length,
      paidLeadPercent: (((googleAdsLeads.length + metaAdsLeads.length) / brevoContacts.length) * 100).toFixed(1)
    },
    googleAnalytics: analyticsData,
    googleAds: googleAdsAnalysis,
    metaAds: metaAdsAnalysis,
    leadQualityComparison: {
      googleAds: {
        avgLeadScore: googleAdsAnalysis.total.avgLeadScore,
        hotLeadPercent: googleAdsAnalysis.total.hotLeadPercent,
        totalLeads: googleAdsAnalysis.total.totalLeads
      },
      metaAds: {
        avgLeadScore: metaAdsAnalysis.total.avgLeadScore,
        hotLeadPercent: metaAdsAnalysis.total.hotLeadPercent,
        totalLeads: metaAdsAnalysis.total.totalLeads
      },
      winner: parseFloat(googleAdsAnalysis.total.avgLeadScore) > parseFloat(metaAdsAnalysis.total.avgLeadScore) 
        ? 'Google Ads' 
        : 'Meta Ads'
    },
    campaignBreakdown: {
      performanceMax: googleAdsAnalysis.performanceMax,
      searchCampaigns: googleAdsAnalysis.searchCampaigns,
      otherGoogleAds: googleAdsAnalysis.otherGoogleAds,
      facebookAds: metaAdsAnalysis.facebook,
      instagramAds: metaAdsAnalysis.instagram
    },
    timestamp: new Date().toISOString()
  }

  // Print summary
  console.log('\n' + '=' .repeat(80))
  console.log('📈 EXECUTIVE SUMMARY')
  console.log('=' .repeat(80))
  console.log(`Total Contacts: ${report.summary.totalContacts}`)
  console.log(`Google Ads Leads: ${report.summary.googleAdsLeads} (${((report.summary.googleAdsLeads/report.summary.totalContacts)*100).toFixed(1)}%)`)
  console.log(`Meta Ads Leads: ${report.summary.metaAdsLeads} (${((report.summary.metaAdsLeads/report.summary.totalContacts)*100).toFixed(1)}%)`)
  console.log(`Organic Leads: ${report.summary.organicLeads}`)
  console.log('\n🏆 LEAD QUALITY WINNER: ' + report.leadQualityComparison.winner)
  console.log(`   Google Ads: ${googleAdsAnalysis.total.avgLeadScore} avg score, ${googleAdsAnalysis.total.hotLeadPercent}% hot leads`)
  console.log(`   Meta Ads: ${metaAdsAnalysis.total.avgLeadScore} avg score, ${metaAdsAnalysis.total.hotLeadPercent}% hot leads`)

  // Save report
  const reportDir = path.join(__dirname, '../../reports')
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().split('T')[0]
  const reportPath = path.join(reportDir, `comprehensive-campaign-analysis-${timestamp}.json`)
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n✅ Report saved: ${reportPath}`)

  // Generate markdown report
  const markdownReport = generateMarkdownReport(report)
  const markdownPath = path.join(reportDir, `comprehensive-campaign-analysis-${timestamp}.md`)
  fs.writeFileSync(markdownPath, markdownReport)
  console.log(`✅ Markdown report saved: ${markdownPath}`)

  return report
}

function generateMarkdownReport(report) {
  return `# Comprehensive Campaign Analysis
**Date Range:** ${report.dateRange.start} to ${report.dateRange.end} (${report.dateRange.daysAnalyzed} days)
**Generated:** ${report.timestamp}

## Executive Summary

- **Total Contacts:** ${report.summary.totalContacts}
- **Paid Leads:** ${report.summary.paidLeads} (${report.summary.paidLeadPercent}%)
  - Google Ads: ${report.summary.googleAdsLeads}
  - Meta Ads: ${report.summary.metaAdsLeads}
- **Organic Leads:** ${report.summary.organicLeads}
- **Other Sources:** ${report.summary.otherLeads}

## Lead Quality Comparison

### 🏆 Winner: ${report.leadQualityComparison.winner}

| Platform | Avg Lead Score | Hot Lead % | Total Leads |
|----------|---------------|------------|-------------|
| Google Ads | ${report.leadQualityComparison.googleAds.avgLeadScore} | ${report.leadQualityComparison.googleAds.hotLeadPercent}% | ${report.leadQualityComparison.googleAds.totalLeads} |
| Meta Ads | ${report.leadQualityComparison.metaAds.avgLeadScore} | ${report.leadQualityComparison.metaAds.hotLeadPercent}% | ${report.leadQualityComparison.metaAds.totalLeads} |

## Google Ads Performance

### Performance Max Campaigns
- **Total Leads:** ${report.campaignBreakdown.performanceMax.totalLeads}
- **Avg Lead Score:** ${report.campaignBreakdown.performanceMax.avgLeadScore}
- **Hot Leads:** ${report.campaignBreakdown.performanceMax.hotLeads} (${report.campaignBreakdown.performanceMax.hotLeadPercent}%)
- **Warm Leads:** ${report.campaignBreakdown.performanceMax.warmLeads} (${report.campaignBreakdown.performanceMax.warmLeadPercent}%)
- **Cold Leads:** ${report.campaignBreakdown.performanceMax.coldLeads} (${report.campaignBreakdown.performanceMax.coldLeadPercent}%)

### Search Campaigns
- **Total Leads:** ${report.campaignBreakdown.searchCampaigns.totalLeads}
- **Avg Lead Score:** ${report.campaignBreakdown.searchCampaigns.avgLeadScore}
- **Hot Leads:** ${report.campaignBreakdown.searchCampaigns.hotLeads} (${report.campaignBreakdown.searchCampaigns.hotLeadPercent}%)
- **Warm Leads:** ${report.campaignBreakdown.searchCampaigns.warmLeads} (${report.campaignBreakdown.searchCampaigns.warmLeadPercent}%)
- **Cold Leads:** ${report.campaignBreakdown.searchCampaigns.coldLeads} (${report.campaignBreakdown.searchCampaigns.coldLeadPercent}%)

### Other Google Ads
- **Total Leads:** ${report.campaignBreakdown.otherGoogleAds.totalLeads}
- **Avg Lead Score:** ${report.campaignBreakdown.otherGoogleAds.avgLeadScore}
- **Hot Leads:** ${report.campaignBreakdown.otherGoogleAds.hotLeads} (${report.campaignBreakdown.otherGoogleAds.hotLeadPercent}%)
- **Warm Leads:** ${report.campaignBreakdown.otherGoogleAds.warmLeads} (${report.campaignBreakdown.otherGoogleAds.warmLeadPercent}%)
- **Cold Leads:** ${report.campaignBreakdown.otherGoogleAds.coldLeads} (${report.campaignBreakdown.otherGoogleAds.coldLeadPercent}%)

## Meta Ads Performance

### Facebook Ads
- **Total Leads:** ${report.campaignBreakdown.facebookAds.totalLeads}
- **Avg Lead Score:** ${report.campaignBreakdown.facebookAds.avgLeadScore}
- **Hot Leads:** ${report.campaignBreakdown.facebookAds.hotLeads} (${report.campaignBreakdown.facebookAds.hotLeadPercent}%)

### Instagram Ads
- **Total Leads:** ${report.campaignBreakdown.instagramAds.totalLeads}
- **Avg Lead Score:** ${report.campaignBreakdown.instagramAds.avgLeadScore}
- **Hot Leads:** ${report.campaignBreakdown.instagramAds.hotLeads} (${report.campaignBreakdown.instagramAds.hotLeadPercent}%)

## Google Analytics Overview

- **Total Sessions:** ${report.googleAnalytics.summary?.totalSessions || 'N/A'}
- **Total Users:** ${report.googleAnalytics.summary?.totalUsers || 'N/A'}
- **Total Conversions:** ${report.googleAnalytics.summary?.totalConversions || 'N/A'}

## Recommendations

${generateRecommendations(report)}
`
}

function generateRecommendations(report) {
  const recommendations = []
  
  const googleAvgScore = parseFloat(report.googleAds.total.avgLeadScore)
  const metaAvgScore = parseFloat(report.metaAds.total.avgLeadScore)
  
  if (googleAvgScore > metaAvgScore + 2) {
    recommendations.push('✅ **Google Ads is significantly outperforming Meta Ads** in lead quality. Consider reallocating budget from Meta to Google Ads.')
  } else if (metaAvgScore > googleAvgScore + 2) {
    recommendations.push('✅ **Meta Ads is significantly outperforming Google Ads** in lead quality. Consider reallocating budget from Google to Meta.')
  } else {
    recommendations.push('📊 **Both platforms performing similarly.** Continue testing and optimizing both channels.')
  }
  
  if (parseFloat(report.googleAds.performanceMax.avgLeadScore) > parseFloat(report.googleAds.searchCampaigns.avgLeadScore)) {
    recommendations.push('🎯 **Performance Max campaigns** are generating higher quality leads than Search. Consider increasing Performance Max budget.')
  } else {
    recommendations.push('🔍 **Search campaigns** are generating higher quality leads than Performance Max. Focus on Search expansion.')
  }
  
  const hotLeadPercent = parseFloat(report.googleAds.total.hotLeadPercent)
  if (hotLeadPercent < 15) {
    recommendations.push('⚠️ **Low hot lead percentage** (' + hotLeadPercent + '%). Review pre-qualification questions and lead nurturing process.')
  }
  
  return recommendations.join('\n\n')
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

runComprehensiveAnalysis()
  .then(() => {
    console.log('\n✅ Analysis complete!')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
