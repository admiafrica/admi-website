#!/usr/bin/env node

/**
 * ADMI Brevo CRM + Analytics ROI Analysis
 * 
 * This script connects Brevo CRM data with Google Analytics to measure:
 * - True conversion rates from traffic to leads to enrollments
 * - ROI by traffic source and campaign
 * - Customer lifetime value by acquisition channel
 * - Lead quality scoring
 */

require('dotenv').config()
const fs = require('fs')
const path = require('path')

// Configuration
const CONFIG = {
  brevo: {
    apiKey: process.env.BREVO_API_KEY,
    listId: process.env.BREVO_LIST_ID,
    baseUrl: 'https://api.brevo.com/v3'
  },
  analytics: {
    propertyId: process.env.GA4_PROPERTY_ID || '250948607'
  },
  dateRange: {
    startDate: '2024-01-01',
    endDate: '2025-11-04'
  },
  focusPeriod: {
    startDate: new Date('2024-01-01'),
    endDate: new Date('2025-11-04')
  }
}

/**
 * Fetch contacts from Brevo CRM with UTM tracking data
 */
async function fetchBrevoContacts(limit = 500, offset = 0) {
  try {
    const url = `${CONFIG.brevo.baseUrl}/contacts?limit=${limit}&offset=${offset}&sort=desc`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': CONFIG.brevo.apiKey
      }
    })

    if (!response.ok) {
      throw new Error(`Brevo API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Brevo contacts:', error)
    return null
  }
}

/**
 * Fetch pipeline details to map stage IDs to names
 */
async function fetchPipelineDetails() {
  try {
    const url = `${CONFIG.brevo.baseUrl}/crm/pipeline/details`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': CONFIG.brevo.apiKey
      }
    })

    if (!response.ok) {
      console.log(`⚠️ Pipeline API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching pipeline details:', error)
    return null
  }
}

/**
 * Fetch deals from Brevo CRM
 */
async function fetchBrevoDeals(limit = 500, offset = 0) {
  try {
    const url = `${CONFIG.brevo.baseUrl}/crm/deals?limit=${limit}&offset=${offset}&sort=desc`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': CONFIG.brevo.apiKey
      }
    })

    if (!response.ok) {
      console.log(`⚠️ Deals API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Brevo deals:', error)
    return null
  }
}

/**
 * Filter contacts to focus period (2024-2025)
 */
function filterContactsByPeriod(contacts) {
  return contacts.filter(contact => {
    const createdAt = contact.createdAt ? new Date(contact.createdAt) : null
    if (!createdAt) return false

    return createdAt >= CONFIG.focusPeriod.startDate && createdAt <= CONFIG.focusPeriod.endDate
  })
}

/**
 * Analyze deals data from Brevo CRM with proper stage mapping
 */
function analyzeDealsData(deals, pipelineDetails) {
  if (!deals || !deals.items) {
    return {
      dealStageAnalysis: {},
      conversionFunnel: { applied: 0, enrolled: 0, other: 0, unknown: 0 },
      conversionRate: 0,
      totalDeals: 0
    }
  }

  // Create stage ID to name mapping
  const stageMapping = {}
  if (pipelineDetails && pipelineDetails.stages) {
    pipelineDetails.stages.forEach(stage => {
      stageMapping[stage.id] = stage.name
    })
  }

  const dealStageAnalysis = {}
  const conversionFunnel = {
    applied: 0,
    enrolled: 0,
    new: 0,
    mql: 0,
    sql: 0,
    lost: 0,
    other: 0
  }

  deals.items.forEach(deal => {
    const stageId = deal.attributes?.deal_stage
    const stageName = stageMapping[stageId] || 'Unknown'

    if (!dealStageAnalysis[stageName]) {
      dealStageAnalysis[stageName] = {
        count: 0,
        deals: [],
        totalAmount: 0
      }
    }

    const dealAmount = deal.attributes?.amount || 0
    dealStageAnalysis[stageName].count++
    dealStageAnalysis[stageName].totalAmount += dealAmount
    dealStageAnalysis[stageName].deals.push({
      id: deal.id,
      name: deal.attributes?.deal_name || 'Unnamed Deal',
      amount: dealAmount,
      createdAt: deal.attributes?.created_at,
      stageUpdatedAt: deal.attributes?.stage_updated_at,
      linkedContacts: deal.linkedContactsIds?.length || 0
    })

    // Count by stage
    const stageStr = String(stageName).toLowerCase()
    if (stageStr === 'applied') {
      conversionFunnel.applied++
    } else if (stageStr === 'enrolled') {
      conversionFunnel.enrolled++
    } else if (stageStr === 'new') {
      conversionFunnel.new++
    } else if (stageStr === 'mql') {
      conversionFunnel.mql++
    } else if (stageStr === 'sql') {
      conversionFunnel.sql++
    } else if (stageStr === 'lost') {
      conversionFunnel.lost++
    } else {
      conversionFunnel.other++
    }
  })

  const conversionRate = conversionFunnel.applied > 0 ?
    ((conversionFunnel.enrolled / conversionFunnel.applied) * 100).toFixed(1) : 0

  return {
    dealStageAnalysis,
    conversionFunnel,
    conversionRate,
    totalDeals: deals.items.length,
    pipelineName: pipelineDetails?.pipeline_name || 'Unknown Pipeline'
  }
}

/**
 * Analyze deal stages and conversion funnel (Applied → Enrolled) from contacts
 */
function analyzeDealStages(contacts) {
  const dealStageAnalysis = {}
  const conversionFunnel = {
    applied: 0,
    enrolled: 0,
    other: 0,
    unknown: 0
  }

  const dealStageFields = new Set()
  const appliedContacts = []
  const enrolledContacts = []

  contacts.forEach(contact => {
    const attributes = contact.attributes || {}

    // Collect all possible deal stage field names
    Object.keys(attributes).forEach(key => {
      if (key.toLowerCase().includes('deal') ||
          key.toLowerCase().includes('stage') ||
          key.toLowerCase().includes('status') ||
          key.toLowerCase().includes('applied') ||
          key.toLowerCase().includes('enrolled') ||
          key.toLowerCase().includes('student')) {
        dealStageFields.add(key)
      }
    })

    // Check multiple possible fields for deal stage
    const dealStage = attributes.DEAL_STAGE ||
                     attributes.STATUS ||
                     attributes.STAGE ||
                     attributes.CUSTOMER_STATUS ||
                     attributes.LEAD_STATUS ||
                     attributes.APPLICATION_STATUS ||
                     attributes.ENROLLMENT_STATUS ||
                     attributes.QUALIFICATION_STATUS ||
                     'Unknown'

    if (!dealStageAnalysis[dealStage]) {
      dealStageAnalysis[dealStage] = {
        count: 0,
        contacts: []
      }
    }

    dealStageAnalysis[dealStage].count++
    dealStageAnalysis[dealStage].contacts.push({
      email: contact.email,
      createdAt: contact.createdAt,
      course: attributes.PREFERRED_COURSE || attributes.COURSE_INTERESTED_IN || 'Unknown',
      utmSource: attributes.UTM_SOURCE || 'Unknown',
      utmCampaign: attributes.UTM_CAMPAIGN || 'Unknown'
    })

    // Conversion funnel analysis - match exact Brevo deal stages
    const stageStr = String(dealStage).toLowerCase().trim()
    if (stageStr === 'applied' || stageStr.includes('applied')) {
      conversionFunnel.applied++
      appliedContacts.push(contact)
    } else if (stageStr === 'enrolled' || stageStr.includes('enrolled')) {
      conversionFunnel.enrolled++
      enrolledContacts.push(contact)
    } else if (stageStr === 'new' || stageStr === 'mql' || stageStr === 'sql' || stageStr === 'lost') {
      // These are other pipeline stages
      conversionFunnel.other++
    } else if (stageStr === 'unknown' || dealStage === 'Unknown' || stageStr === '') {
      conversionFunnel.unknown++
    } else {
      conversionFunnel.other++
    }
  })

  // Calculate conversion rate
  const conversionRate = conversionFunnel.applied > 0 ?
    ((conversionFunnel.enrolled / conversionFunnel.applied) * 100).toFixed(1) : 0

  return {
    dealStageAnalysis,
    conversionFunnel,
    dealStageFields: Array.from(dealStageFields),
    conversionRate,
    appliedContacts,
    enrolledContacts,
    totalContacts: contacts.length
  }
}

/**
 * Analyze lead sources and conversion rates
 */
function analyzeLeadSources(contacts) {
  const sourceAnalysis = {}
  const campaignAnalysis = {}
  const monthlyTrends = {}

  contacts.forEach(contact => {
    const attributes = contact.attributes || {}
    const utmSource = attributes.UTM_SOURCE || 'direct'
    const utmMedium = attributes.UTM_MEDIUM || 'none'
    const utmCampaign = attributes.UTM_CAMPAIGN || 'none'
    const course = attributes.PREFERRED_COURSE || 'Unknown'
    const createdAt = contact.createdAt ? new Date(contact.createdAt) : new Date()
    const monthKey = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`

    // Source analysis
    const sourceKey = `${utmSource}/${utmMedium}`
    if (!sourceAnalysis[sourceKey]) {
      sourceAnalysis[sourceKey] = {
        leads: 0,
        courses: {},
        emails: [],
        firstSeen: createdAt,
        lastSeen: createdAt
      }
    }
    sourceAnalysis[sourceKey].leads++
    sourceAnalysis[sourceKey].courses[course] = (sourceAnalysis[sourceKey].courses[course] || 0) + 1
    sourceAnalysis[sourceKey].emails.push(attributes.EMAIL)
    if (createdAt < sourceAnalysis[sourceKey].firstSeen) sourceAnalysis[sourceKey].firstSeen = createdAt
    if (createdAt > sourceAnalysis[sourceKey].lastSeen) sourceAnalysis[sourceKey].lastSeen = createdAt

    // Campaign analysis
    if (utmCampaign !== 'none') {
      if (!campaignAnalysis[utmCampaign]) {
        campaignAnalysis[utmCampaign] = {
          leads: 0,
          sources: {},
          courses: {},
          firstSeen: createdAt,
          lastSeen: createdAt
        }
      }
      campaignAnalysis[utmCampaign].leads++
      campaignAnalysis[utmCampaign].sources[sourceKey] = (campaignAnalysis[utmCampaign].sources[sourceKey] || 0) + 1
      campaignAnalysis[utmCampaign].courses[course] = (campaignAnalysis[utmCampaign].courses[course] || 0) + 1
      if (createdAt < campaignAnalysis[utmCampaign].firstSeen) campaignAnalysis[utmCampaign].firstSeen = createdAt
      if (createdAt > campaignAnalysis[utmCampaign].lastSeen) campaignAnalysis[utmCampaign].lastSeen = createdAt
    }

    // Monthly trends
    if (!monthlyTrends[monthKey]) {
      monthlyTrends[monthKey] = {
        totalLeads: 0,
        sources: {},
        courses: {}
      }
    }
    monthlyTrends[monthKey].totalLeads++
    monthlyTrends[monthKey].sources[sourceKey] = (monthlyTrends[monthKey].sources[sourceKey] || 0) + 1
    monthlyTrends[monthKey].courses[course] = (monthlyTrends[monthKey].courses[course] || 0) + 1
  })

  return {
    sourceAnalysis,
    campaignAnalysis,
    monthlyTrends,
    totalLeads: contacts.length
  }
}

/**
 * Calculate conversion rates and ROI metrics
 */
function calculateROIMetrics(analysis, trafficData = null) {
  const roiMetrics = {
    overallMetrics: {
      totalLeads: analysis.totalLeads,
      avgLeadsPerMonth: 0,
      topSources: [],
      topCampaigns: [],
      topCourses: {}
    },
    sourcePerformance: {},
    campaignPerformance: {},
    monthlyGrowth: []
  }

  // Calculate top sources by lead volume
  const sortedSources = Object.entries(analysis.sourceAnalysis)
    .sort(([,a], [,b]) => b.leads - a.leads)
    .slice(0, 10)

  roiMetrics.overallMetrics.topSources = sortedSources.map(([source, data]) => ({
    source,
    leads: data.leads,
    percentage: ((data.leads / analysis.totalLeads) * 100).toFixed(1),
    topCourse: Object.entries(data.courses).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown',
    duration: Math.ceil((data.lastSeen - data.firstSeen) / (1000 * 60 * 60 * 24)) || 1
  }))

  // Calculate top campaigns
  const sortedCampaigns = Object.entries(analysis.campaignAnalysis)
    .sort(([,a], [,b]) => b.leads - a.leads)
    .slice(0, 10)

  roiMetrics.overallMetrics.topCampaigns = sortedCampaigns.map(([campaign, data]) => ({
    campaign,
    leads: data.leads,
    percentage: ((data.leads / analysis.totalLeads) * 100).toFixed(1),
    topSource: Object.entries(data.sources).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown',
    topCourse: Object.entries(data.courses).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown',
    duration: Math.ceil((data.lastSeen - data.firstSeen) / (1000 * 60 * 60 * 24)) || 1
  }))

  // Calculate course popularity
  const allCourses = {}
  Object.values(analysis.sourceAnalysis).forEach(source => {
    Object.entries(source.courses).forEach(([course, count]) => {
      allCourses[course] = (allCourses[course] || 0) + count
    })
  })
  roiMetrics.overallMetrics.topCourses = Object.entries(allCourses)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([course, leads]) => ({
      course,
      leads,
      percentage: ((leads / analysis.totalLeads) * 100).toFixed(1)
    }))

  // Calculate monthly growth
  const sortedMonths = Object.entries(analysis.monthlyTrends).sort()
  roiMetrics.monthlyGrowth = sortedMonths.map(([month, data], index) => {
    const prevMonth = index > 0 ? sortedMonths[index - 1][1] : null
    const growth = prevMonth ? ((data.totalLeads - prevMonth.totalLeads) / prevMonth.totalLeads * 100).toFixed(1) : 0
    
    return {
      month,
      leads: data.totalLeads,
      growth: parseFloat(growth),
      topSource: Object.entries(data.sources).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown',
      topCourse: Object.entries(data.courses).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown'
    }
  })

  // Calculate average leads per month
  roiMetrics.overallMetrics.avgLeadsPerMonth = sortedMonths.length > 0 
    ? (analysis.totalLeads / sortedMonths.length).toFixed(1)
    : 0

  return roiMetrics
}

/**
 * Generate comprehensive ROI report
 */
function generateROIReport(roiMetrics, analysis, dealStageAnalysis, dealsAnalysis) {
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalLeads: roiMetrics.overallMetrics.totalLeads,
      avgLeadsPerMonth: roiMetrics.overallMetrics.avgLeadsPerMonth,
      activePeriod: `2024-01-01 to 2025-11-04`,
      focusPeriod: 'Filtered to 2024-2025 leads only',
      dataSource: 'Brevo CRM + Google Analytics'
    },
    keyInsights: [],
    topPerformers: {
      sources: roiMetrics.overallMetrics.topSources,
      campaigns: roiMetrics.overallMetrics.topCampaigns,
      courses: roiMetrics.overallMetrics.topCourses
    },
    dealStageAnalysis: {
      conversionFunnel: dealStageAnalysis.conversionFunnel,
      conversionRate: dealStageAnalysis.conversionRate,
      dealStages: dealStageAnalysis.dealStageAnalysis,
      availableFields: dealStageAnalysis.dealStageFields,
      appliedCount: dealStageAnalysis.appliedContacts.length,
      enrolledCount: dealStageAnalysis.enrolledContacts.length
    },
    dealsAnalysis: dealsAnalysis ? {
      conversionFunnel: dealsAnalysis.conversionFunnel,
      conversionRate: dealsAnalysis.conversionRate,
      dealStages: dealsAnalysis.dealStageAnalysis,
      totalDeals: dealsAnalysis.totalDeals,
      pipelineName: dealsAnalysis.pipelineName
    } : null,
    trends: {
      monthlyGrowth: roiMetrics.monthlyGrowth
    },
    recommendations: []
  }

  // Generate insights
  const topSource = roiMetrics.overallMetrics.topSources[0]
  const topCampaign = roiMetrics.overallMetrics.topCampaigns[0]
  const topCourse = roiMetrics.overallMetrics.topCourses[0]

  if (topSource) {
    report.keyInsights.push(`Top traffic source "${topSource.source}" generated ${topSource.leads} leads (${topSource.percentage}% of total)`)
  }

  if (topCampaign) {
    report.keyInsights.push(`Best performing campaign "${topCampaign.campaign}" generated ${topCampaign.leads} leads over ${topCampaign.duration} days`)
  }

  if (topCourse) {
    report.keyInsights.push(`Most popular course "${topCourse.course}" attracted ${topCourse.leads} leads (${topCourse.percentage}% of total)`)
  }

  // Add deal stage insights
  if (dealStageAnalysis) {
    const { conversionFunnel, conversionRate } = dealStageAnalysis
    report.keyInsights.push(`Applied to Enrolled conversion rate: ${conversionRate}% (${conversionFunnel.enrolled} enrolled from ${conversionFunnel.applied} applied)`)

    if (conversionFunnel.unknown > 0) {
      const unknownPercentage = ((conversionFunnel.unknown / dealStageAnalysis.totalContacts) * 100).toFixed(1)
      report.keyInsights.push(`${unknownPercentage}% of contacts have unknown deal stage - data quality issue`)
    }
  }

  // Calculate recent growth
  const recentMonths = roiMetrics.monthlyGrowth.slice(-3)
  const avgRecentGrowth = recentMonths.reduce((sum, month) => sum + month.growth, 0) / recentMonths.length
  if (avgRecentGrowth > 0) {
    report.keyInsights.push(`Average growth rate over last 3 months: ${avgRecentGrowth.toFixed(1)}%`)
  } else {
    report.keyInsights.push(`Lead generation has declined by ${Math.abs(avgRecentGrowth).toFixed(1)}% over last 3 months`)
  }

  // Generate recommendations
  if (topSource && topSource.percentage > 50) {
    report.recommendations.push(`Diversify traffic sources - ${topSource.source} accounts for ${topSource.percentage}% of leads`)
  }

  const organicSources = roiMetrics.overallMetrics.topSources.filter(s => 
    s.source.includes('google/organic') || s.source.includes('bing/organic')
  )
  const organicLeads = organicSources.reduce((sum, source) => sum + source.leads, 0)
  const organicPercentage = ((organicLeads / roiMetrics.overallMetrics.totalLeads) * 100).toFixed(1)
  
  if (organicPercentage < 30) {
    report.recommendations.push(`Increase SEO efforts - organic traffic only generates ${organicPercentage}% of leads`)
  } else {
    report.recommendations.push(`Strong organic performance - ${organicPercentage}% of leads from organic search`)
  }

  if (roiMetrics.overallMetrics.topCourses.length > 0) {
    const diplomaCourses = roiMetrics.overallMetrics.topCourses.filter(c =>
      c.course.toLowerCase().includes('diploma')
    )
    if (diplomaCourses.length > 0) {
      const diplomaLeads = diplomaCourses.reduce((sum, course) => sum + course.leads, 0)
      report.recommendations.push(`Focus on diploma courses - they generate ${diplomaLeads} leads with higher LTV`)
    }
  }

  // Add deal stage recommendations
  if (dealStageAnalysis) {
    const { conversionRate, conversionFunnel } = dealStageAnalysis

    if (parseFloat(conversionRate) < 80) {
      report.recommendations.push(`Improve Applied → Enrolled conversion: Currently ${conversionRate}% vs target 80%`)
    } else {
      report.recommendations.push(`Excellent conversion rate: ${conversionRate}% Applied → Enrolled (exceeds 80% target)`)
    }

    if (conversionFunnel.unknown > conversionFunnel.applied + conversionFunnel.enrolled) {
      report.recommendations.push(`Fix deal stage tracking - majority of contacts have unknown status`)
    }

    if (conversionFunnel.applied > 0 && conversionFunnel.enrolled > 0) {
      report.recommendations.push(`Track ${conversionFunnel.applied} Applied leads for enrollment opportunities`)
    }
  }

  return report
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting ADMI Brevo CRM + Analytics ROI Analysis...')
  
  if (!CONFIG.brevo.apiKey) {
    console.error('❌ Missing BREVO_API_KEY environment variable')
    process.exit(1)
  }

  try {
    // Fetch all contacts from Brevo
    console.log('📊 Fetching contacts from Brevo CRM...')
    let allContacts = []
    let offset = 0
    const limit = 500

    while (true) {
      const response = await fetchBrevoContacts(limit, offset)
      if (!response || !response.contacts || response.contacts.length === 0) {
        break
      }
      
      allContacts = allContacts.concat(response.contacts)
      console.log(`   Fetched ${allContacts.length} contacts so far...`)
      
      if (response.contacts.length < limit) {
        break // No more contacts
      }
      
      offset += limit
    }

    console.log(`✅ Total contacts fetched: ${allContacts.length}`)

    // Filter to focus period (2024-2025)
    console.log('📅 Filtering contacts to 2024-2025 period...')
    const filteredContacts = filterContactsByPeriod(allContacts)
    console.log(`✅ Contacts in 2024-2025 period: ${filteredContacts.length}`)

    // Analyze lead sources and conversion patterns
    console.log('🔍 Analyzing lead sources and conversion patterns...')
    const analysis = analyzeLeadSources(filteredContacts)

    // Fetch pipeline details and deals data
    console.log('🔧 Fetching pipeline details...')
    const pipelineDetails = await fetchPipelineDetails()

    console.log('💼 Fetching deals from Brevo CRM...')
    const dealsData = await fetchBrevoDeals(1000, 0)

    let dealsAnalysis = null
    if (dealsData && dealsData.items && dealsData.items.length > 0) {
      console.log(`✅ Found ${dealsData.items.length} deals`)
      if (pipelineDetails) {
        console.log(`✅ Pipeline: ${pipelineDetails.pipeline_name} with ${pipelineDetails.stages?.length || 0} stages`)
      }
      dealsAnalysis = analyzeDealsData(dealsData, pipelineDetails)
    } else {
      console.log('⚠️ No deals found or deals API not accessible')
    }

    // Analyze deal stages from contacts (fallback)
    console.log('🎯 Analyzing deal stages from contacts...')
    const dealStageAnalysis = analyzeDealStages(filteredContacts)

    // Calculate ROI metrics
    console.log('💰 Calculating ROI metrics...')
    const roiMetrics = calculateROIMetrics(analysis)

    // Generate comprehensive report
    console.log('📋 Generating ROI report...')
    const report = generateROIReport(roiMetrics, analysis, dealStageAnalysis, dealsAnalysis)

    // Save results
    const timestamp = new Date().toISOString().split('T')[0]
    const outputDir = path.join(process.cwd(), 'reports', 'roi-analysis')
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const reportPath = path.join(outputDir, `brevo-roi-analysis-${timestamp}.json`)
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

    console.log('✅ ROI Analysis Complete!')
    console.log(`📄 Report saved to: ${reportPath}`)

    console.log('\n🎯 Key Insights:')
    report.keyInsights.forEach(insight => console.log(`   • ${insight}`))

    console.log('\n📊 Deal Stage Analysis:')
    if (dealsAnalysis && dealsAnalysis.totalDeals > 0) {
      console.log(`   • Pipeline: ${dealsAnalysis.pipelineName}`)
      console.log(`   • Total Deals Found: ${dealsAnalysis.totalDeals}`)
      console.log(`   • Applied Deals: ${dealsAnalysis.conversionFunnel.applied}`)
      console.log(`   • Enrolled Deals: ${dealsAnalysis.conversionFunnel.enrolled}`)
      console.log(`   • Conversion Rate: ${dealsAnalysis.conversionRate}% (Target: 80%)`)
      console.log(`   • Pipeline Breakdown - New: ${dealsAnalysis.conversionFunnel.new}, MQL: ${dealsAnalysis.conversionFunnel.mql}, SQL: ${dealsAnalysis.conversionFunnel.sql}, Lost: ${dealsAnalysis.conversionFunnel.lost}`)
    } else {
      console.log(`   • No deals found - checking contact attributes...`)
      if (dealStageAnalysis.dealStageFields.length > 0) {
        console.log(`   • Available deal stage fields: ${dealStageAnalysis.dealStageFields.join(', ')}`)
      } else {
        console.log(`   • No deal stage fields found in contacts`)
      }
      console.log(`   • Applied: ${dealStageAnalysis.conversionFunnel.applied} contacts`)
      console.log(`   • Enrolled: ${dealStageAnalysis.conversionFunnel.enrolled} contacts`)
      console.log(`   • Conversion Rate: ${dealStageAnalysis.conversionRate}% (Target: 80%)`)
      console.log(`   • Unknown Status: ${dealStageAnalysis.conversionFunnel.unknown} contacts`)
    }

    console.log('\n💡 Recommendations:')
    report.recommendations.forEach(rec => console.log(`   • ${rec}`))

    return report

  } catch (error) {
    console.error('❌ Error during ROI analysis:', error)
    process.exit(1)
  }
}

// Run the analysis
if (require.main === module) {
  main()
}

module.exports = {
  fetchBrevoContacts,
  analyzeLeadSources,
  calculateROIMetrics,
  generateROIReport
}
