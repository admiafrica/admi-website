#!/usr/bin/env node

/**
 * FINAL CAMPAIGN ANALYSIS
 * November 29, 2025 - February 6, 2026
 *
 * Analyzes complete campaign with 101 applications
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY
const PIPELINE_ID = '68e60a790c87b5f2cbfec788' // January 2026 Pipeline

// Campaign details
const START_DATE = '2025-11-29'
const END_DATE = '2026-02-06'
const TOTAL_APPLICATIONS = 101
const CAMPAIGN_DAYS = 69 // Nov 29, 2025 to Feb 6, 2026

// Known spend (update if you have actuals)
const GOOGLE_ADS_SPEND_USD = 2019.55 // Update with actual
const META_ADS_SPEND_USD = 731.91 // Update with actual
const EXCHANGE_RATE = 129 // KES per USD

if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found')
  process.exit(1)
}

// Brevo API helper
function brevoRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      path: path,
      method: method,
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    }

    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => (body += chunk))
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body))
          } catch (e) {
            resolve(body)
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`))
        }
      })
    })

    req.on('error', reject)
    if (data) req.write(JSON.stringify(data))
    req.end()
  })
}

// Fetch all contacts with pagination
async function fetchAllContacts() {
  let allContacts = []
  let offset = 0
  const limit = 50
  let hasMore = true

  console.log('📊 Fetching all contacts from Brevo...')

  while (hasMore) {
    try {
      const response = await brevoRequest(`/v3/contacts?limit=${limit}&offset=${offset}&sort=desc:createdAt`)

      if (response.contacts && response.contacts.length > 0) {
        allContacts = allContacts.concat(response.contacts)
        offset += limit

        // Check if there are more contacts
        if (response.contacts.length < limit) {
          hasMore = false
        }

        console.log(`   Fetched ${allContacts.length} contacts...`)
      } else {
        hasMore = false
      }
    } catch (error) {
      console.error(`❌ Error fetching contacts: ${error.message}`)
      hasMore = false
    }
  }

  console.log(`✅ Total contacts fetched: ${allContacts.length}`)
  return allContacts
}

// Fetch all deals from pipeline
async function fetchAllDeals() {
  try {
    console.log('📊 Fetching all deals from pipeline...')
    const response = await brevoRequest(`/v3/crm/pipeline/details/${PIPELINE_ID}`)
    console.log(`✅ Total deals in pipeline: ${response.deals?.length || 0}`)
    return response.deals || []
  } catch (error) {
    console.error(`❌ Error fetching deals: ${error.message}`)
    return []
  }
}

// Categorize source
function categorizeSource(contact) {
  const utmSource = contact.attributes?.UTM_SOURCE?.toLowerCase() || ''
  const utmMedium = contact.attributes?.UTM_MEDIUM?.toLowerCase() || ''
  const utmCampaign = contact.attributes?.UTM_CAMPAIGN?.toLowerCase() || ''

  // Google Ads
  if (
    (utmSource === 'google' || utmSource === 'adwords') &&
    (utmMedium === 'cpc' || utmMedium === 'paid' || utmMedium === 'adwords')
  ) {
    // Performance Max
    if (
      utmCampaign.includes('pmax') ||
      utmCampaign.includes('p-max') ||
      utmCampaign.includes('performance') ||
      utmCampaign === '23282289054'
    ) {
      return 'Google Performance Max'
    }
    // Search
    if (utmCampaign.includes('search')) {
      return 'Google Search Ads'
    }
    return 'Google Ads (Other)'
  }

  // Meta Ads
  if (utmSource === 'facebook' || utmSource === 'meta') {
    return 'Meta Ads (Facebook)'
  }
  if (utmSource === 'instagram') {
    return 'Instagram Ads'
  }

  // Organic
  if (utmMedium === 'organic' || (utmSource === 'google' && !utmMedium)) {
    return 'Organic Search'
  }

  // Direct
  if (!utmSource || utmSource === 'direct' || utmSource === '(direct)') {
    return 'Direct'
  }

  return 'Other'
}

// Analyze contacts
function analyzeContacts(contacts) {
  const analysis = {
    total: contacts.length,
    bySource: {},
    byQualification: {
      Hot: 0,
      Warm: 0,
      Cold: 0,
      Unqualified: 0
    },
    averageScore: 0,
    campaignPeriodContacts: 0
  }

  let totalScore = 0
  let scoredContacts = 0

  contacts.forEach((contact) => {
    const source = categorizeSource(contact)

    if (!analysis.bySource[source]) {
      analysis.bySource[source] = {
        count: 0,
        hot: 0,
        warm: 0,
        cold: 0,
        unqualified: 0,
        totalScore: 0,
        scoredCount: 0
      }
    }

    analysis.bySource[source].count++

    // Check if contact is from campaign period
    const createdAt = new Date(contact.createdAt)
    const startDate = new Date(START_DATE)
    const endDate = new Date(END_DATE)

    if (createdAt >= startDate && createdAt <= endDate) {
      analysis.campaignPeriodContacts++
    }

    // Qualification status
    const qualStatus = contact.attributes?.QUALIFICATION_STATUS || contact.attributes?.STATUS || ''

    if (qualStatus) {
      analysis.byQualification[qualStatus] = (analysis.byQualification[qualStatus] || 0) + 1
      analysis.bySource[source][qualStatus.toLowerCase()] =
        (analysis.bySource[source][qualStatus.toLowerCase()] || 0) + 1
    }

    // Score
    const score = contact.attributes?.QUALIFICATION_SCORE || contact.attributes?.SCORE || 0

    if (score > 0) {
      totalScore += score
      scoredContacts++
      analysis.bySource[source].totalScore += score
      analysis.bySource[source].scoredCount++
    }
  })

  analysis.averageScore = scoredContacts > 0 ? (totalScore / scoredContacts).toFixed(2) : 0

  // Calculate average scores by source
  Object.keys(analysis.bySource).forEach((source) => {
    const data = analysis.bySource[source]
    data.avgScore = data.scoredCount > 0 ? (data.totalScore / data.scoredCount).toFixed(2) : 0
  })

  return analysis
}

// Analyze deals
function analyzeDeals(deals) {
  const analysis = {
    total: deals.length,
    byStage: {},
    bySource: {},
    totalValue: 0
  }

  const stageNames = {
    '2ixzacgsn412m7y0ed20st5': 'Unqualified',
    f17io0yg7xl1rdmb5cy1d44: 'MQL',
    '39539oz5gs2ktjvywn7pl6v': 'SQL',
    '27x209expgyhg8428lh7ocn': 'Applied',
    pwi0xiqbtdwe6brfz7vgxen: 'Decision Making'
  }

  deals.forEach((deal) => {
    const stageId = deal.attributes?.pipeline_stage
    const stageName = stageNames[stageId] || 'Unknown'

    analysis.byStage[stageName] = (analysis.byStage[stageName] || 0) + 1

    // Get contact details for source attribution
    const linkedContactsValue = deal.linkedContactsIds?.length || 0

    // Deal value
    const value = parseFloat(deal.attributes?.deal_value || 0)
    analysis.totalValue += value
  })

  return analysis
}

// Generate markdown report
function generateReport(contactAnalysis, dealAnalysis) {
  const totalSpendKES = (GOOGLE_ADS_SPEND_USD + META_ADS_SPEND_USD) * EXCHANGE_RATE
  const costPerLead =
    contactAnalysis.campaignPeriodContacts > 0 ? totalSpendKES / contactAnalysis.campaignPeriodContacts : 0
  const costPerApplication = TOTAL_APPLICATIONS > 0 ? totalSpendKES / TOTAL_APPLICATIONS : 0

  const report = `# FINAL CAMPAIGN ANALYSIS
**November 29, 2025 - February 6, 2026**

**Campaign Duration:** ${CAMPAIGN_DAYS} days
**Generated:** ${new Date().toISOString()}

---

## 🎯 Executive Summary

### Investment
- **Google Ads Spend:** $${GOOGLE_ADS_SPEND_USD.toFixed(2)} USD (KES ${(GOOGLE_ADS_SPEND_USD * EXCHANGE_RATE).toLocaleString()})
- **Meta Ads Spend:** $${META_ADS_SPEND_USD.toFixed(2)} USD (KES ${(META_ADS_SPEND_USD * EXCHANGE_RATE).toLocaleString()})
- **Total Ad Spend:** KES ${totalSpendKES.toLocaleString()}
- **Exchange Rate:** 1 USD = ${EXCHANGE_RATE} KES

### Results
- **✅ Total Applications:** ${TOTAL_APPLICATIONS}
- **📊 Total Leads (Campaign Period):** ${contactAnalysis.campaignPeriodContacts.toLocaleString()}
- **📈 Total Contacts (All Time):** ${contactAnalysis.total.toLocaleString()}
- **🎯 Application Rate:** ${((TOTAL_APPLICATIONS / contactAnalysis.campaignPeriodContacts) * 100).toFixed(2)}%

### Efficiency Metrics
- **Cost per Lead:** KES ${costPerLead.toLocaleString(undefined, { maximumFractionDigits: 0 })}
- **Cost per Application:** KES ${costPerApplication.toLocaleString(undefined, { maximumFractionDigits: 0 })}
- **Average Lead Score:** ${contactAnalysis.averageScore}/20

---

## 📊 Lead Quality Breakdown

### Overall Qualification Status
| Status | Count | Percentage |
|--------|-------|------------|
| Hot | ${contactAnalysis.byQualification.Hot || 0} | ${((contactAnalysis.byQualification.Hot / contactAnalysis.total) * 100).toFixed(1)}% |
| Warm | ${contactAnalysis.byQualification.Warm || 0} | ${((contactAnalysis.byQualification.Warm / contactAnalysis.total) * 100).toFixed(1)}% |
| Cold | ${contactAnalysis.byQualification.Cold || 0} | ${((contactAnalysis.byQualification.Cold / contactAnalysis.total) * 100).toFixed(1)}% |
| Unqualified | ${contactAnalysis.byQualification.Unqualified || 0} | ${((contactAnalysis.byQualification.Unqualified / contactAnalysis.total) * 100).toFixed(1)}% |

---

## 🎯 Performance by Source

| Source | Leads | Avg Score | Hot | Warm | Cold | Unqualified |
|--------|-------|-----------|-----|------|------|-------------|
${Object.entries(contactAnalysis.bySource)
  .sort((a, b) => b[1].count - a[1].count)
  .map(
    ([source, data]) =>
      `| ${source} | ${data.count} | ${data.avgScore}/20 | ${data.hot || 0} | ${data.warm || 0} | ${data.cold || 0} | ${data.unqualified || 0} |`
  )
  .join('\n')}

---

## 🚀 Pipeline Performance

### Deals by Stage
${Object.entries(dealAnalysis.byStage)
  .map(([stage, count]) => `- **${stage}:** ${count} deals`)
  .join('\n')}

**Total Pipeline Value:** KES ${dealAnalysis.totalValue.toLocaleString()}
**Total Deals:** ${dealAnalysis.total}

---

## 💡 Key Insights

1. **Application Success:** Achieved ${TOTAL_APPLICATIONS} applications from ${contactAnalysis.campaignPeriodContacts.toLocaleString()} leads (${((TOTAL_APPLICATIONS / contactAnalysis.campaignPeriodContacts) * 100).toFixed(2)}% conversion)
2. **Cost Efficiency:** KES ${costPerApplication.toLocaleString(undefined, { maximumFractionDigits: 0 })} per application
3. **Lead Quality:** Average score of ${contactAnalysis.averageScore}/20 across all contacts
4. **Campaign Duration:** ${CAMPAIGN_DAYS} days from Nov 29, 2025 to Feb 6, 2026

---

## 📌 Next Steps

1. **Analyze conversion patterns** - Which sources drove the highest quality applications?
2. **ROI calculation** - Calculate expected revenue from ${TOTAL_APPLICATIONS} applications
3. **Campaign optimization** - Use insights to optimize future campaigns
4. **Follow-up strategy** - Ensure all ${TOTAL_APPLICATIONS} applications are processed efficiently

---

*Report generated on ${new Date().toLocaleString()}*
`

  return report
}

// Main execution
async function main() {
  console.log('🚀 Starting Final Campaign Analysis...\n')
  console.log(`📅 Period: ${START_DATE} to ${END_DATE} (${CAMPAIGN_DAYS} days)`)
  console.log(`🎯 Total Applications: ${TOTAL_APPLICATIONS}\n`)

  try {
    // Fetch data
    const contacts = await fetchAllContacts()
    const deals = await fetchAllDeals()

    console.log('\n📊 Analyzing data...\n')

    // Analyze
    const contactAnalysis = analyzeContacts(contacts)
    const dealAnalysis = analyzeDeals(deals)

    // Generate report
    const report = generateReport(contactAnalysis, dealAnalysis)

    // Save reports
    const timestamp = new Date().toISOString().split('T')[0]
    const reportDir = path.join(__dirname, '../../reports')

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true })
    }

    const mdPath = path.join(reportDir, `final-campaign-analysis-${timestamp}.md`)
    const jsonPath = path.join(reportDir, `final-campaign-analysis-${timestamp}.json`)

    fs.writeFileSync(mdPath, report)
    fs.writeFileSync(
      jsonPath,
      JSON.stringify(
        {
          campaignDetails: {
            startDate: START_DATE,
            endDate: END_DATE,
            days: CAMPAIGN_DAYS,
            applications: TOTAL_APPLICATIONS,
            googleAdsSpend: GOOGLE_ADS_SPEND_USD,
            metaAdsSpend: META_ADS_SPEND_USD,
            exchangeRate: EXCHANGE_RATE
          },
          contacts: contactAnalysis,
          deals: dealAnalysis,
          generatedAt: new Date().toISOString()
        },
        null,
        2
      )
    )

    console.log('✅ Analysis Complete!\n')
    console.log(`📄 Markdown Report: ${mdPath}`)
    console.log(`📊 JSON Data: ${jsonPath}\n`)

    console.log('='.repeat(60))
    console.log('QUICK SUMMARY')
    console.log('='.repeat(60))
    console.log(`Applications: ${TOTAL_APPLICATIONS}`)
    console.log(`Campaign Leads: ${contactAnalysis.campaignPeriodContacts}`)
    console.log(
      `Application Rate: ${((TOTAL_APPLICATIONS / contactAnalysis.campaignPeriodContacts) * 100).toFixed(2)}%`
    )
    console.log(
      `Cost per Application: KES ${(((GOOGLE_ADS_SPEND_USD + META_ADS_SPEND_USD) * EXCHANGE_RATE) / TOTAL_APPLICATIONS).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    )
    console.log('='.repeat(60))
  } catch (error) {
    console.error('❌ Analysis failed:', error.message)
    process.exit(1)
  }
}

main()
