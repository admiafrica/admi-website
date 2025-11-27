#!/usr/bin/env node

/**
 * Performance Max Campaign Review - January 2026
 * Detailed analysis of PMax campaign performance for January 2026
 */

const { GoogleAdsApi } = require('google-ads-api')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

// Validation
const requiredEnvVars = [
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_REFRESH_TOKEN'
]

const missingVars = requiredEnvVars.filter(v => !process.env[v])
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '))
  process.exit(1)
}

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
})

const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '')
const customer = client.Customer({
  customer_id: customerId,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
})

const statusMap = {
  0: 'UNSPECIFIED',
  1: 'UNKNOWN',
  2: 'ENABLED',
  3: 'PAUSED',
  4: 'REMOVED'
}

async function reviewJanuary2026(campaignId) {
  console.log('🔍 PERFORMANCE MAX CAMPAIGN REVIEW - JANUARY 2026')
  console.log('='.repeat(80))
  console.log('Period: January 1-31, 2026\n')

  const reviewData = {
    campaignId,
    period: 'January 2026',
    timestamp: new Date().toISOString(),
    campaign: {},
    performance: {
      january: {},
      december: {},
      comparison: {}
    },
    dailyBreakdown: [],
    recommendations: []
  }

  // Get campaign details
  const campaignQuery = `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign_budget.amount_micros,
      campaign.start_date
    FROM campaign
    WHERE campaign.id = ${campaignId}
  `

  const [campaign] = await customer.query(campaignQuery)
  
  reviewData.campaign = {
    id: campaign.campaign.id,
    name: campaign.campaign.name,
    status: statusMap[campaign.campaign.status],
    dailyBudget: campaign.campaign_budget.amount_micros / 1_000_000,
    startDate: campaign.campaign.start_date
  }

  console.log(`📋 CAMPAIGN: ${campaign.campaign.name}`)
  console.log(`   ID: ${campaign.campaign.id}`)
  console.log(`   Status: ${statusMap[campaign.campaign.status]}`)
  console.log(`   Daily Budget: KES ${(campaign.campaign_budget.amount_micros / 1_000_000).toLocaleString()}`)
  console.log(`   Start Date: ${campaign.campaign.start_date}`)

  // January 2026 Performance
  console.log('\n\n📊 JANUARY 2026 PERFORMANCE')
  console.log('='.repeat(80))

  const januaryQuery = `
    SELECT
      segments.date,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value,
      metrics.video_views,
      metrics.interactions,
      metrics.all_conversions
    FROM campaign
    WHERE campaign.id = ${campaignId}
      AND segments.date >= '2026-01-01'
      AND segments.date <= '2026-01-31'
    ORDER BY segments.date
  `

  try {
    const januaryData = await customer.query(januaryQuery)

    if (januaryData.length === 0) {
      console.log('\n⚠️  No data available for January 2026')
      console.log('   Campaign may not have been active during this period.')
      reviewData.performance.january = { error: 'No data available' }
    } else {
      const totals = januaryData.reduce((acc, day) => ({
        impressions: acc.impressions + (day.metrics.impressions || 0),
        clicks: acc.clicks + (day.metrics.clicks || 0),
        cost: acc.cost + (day.metrics.cost_micros || 0),
        conversions: acc.conversions + (day.metrics.conversions || 0),
        conversionsValue: acc.conversionsValue + (day.metrics.conversions_value || 0),
        videoViews: acc.videoViews + (day.metrics.video_views || 0),
        interactions: acc.interactions + (day.metrics.interactions || 0),
        allConversions: acc.allConversions + (day.metrics.all_conversions || 0)
      }), { impressions: 0, clicks: 0, cost: 0, conversions: 0, conversionsValue: 0, videoViews: 0, interactions: 0, allConversions: 0 })

      const avgDailyCost = totals.cost / 1_000_000 / januaryData.length
      const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions * 100) : 0
      const cpc = totals.clicks > 0 ? (totals.cost / 1_000_000 / totals.clicks) : 0
      const cpa = totals.conversions > 0 ? (totals.cost / 1_000_000 / totals.conversions) : 0
      const conversionRate = totals.clicks > 0 ? (totals.conversions / totals.clicks * 100) : 0

      reviewData.performance.january = {
        activeDays: januaryData.length,
        impressions: totals.impressions,
        clicks: totals.clicks,
        videoViews: totals.videoViews,
        interactions: totals.interactions,
        ctr: parseFloat(ctr.toFixed(2)),
        cost: parseFloat((totals.cost / 1_000_000).toFixed(2)),
        avgDailyCost: parseFloat(avgDailyCost.toFixed(2)),
        cpc: parseFloat(cpc.toFixed(2)),
        conversions: totals.conversions,
        allConversions: totals.allConversions,
        conversionRate: parseFloat(conversionRate.toFixed(2)),
        cpa: parseFloat(cpa.toFixed(2)),
        conversionsValue: parseFloat((totals.conversionsValue).toFixed(2))
      }

      console.log(`\n📈 OVERALL METRICS (${januaryData.length} days active)`)
      console.log(`   Impressions: ${totals.impressions.toLocaleString()}`)
      console.log(`   Clicks: ${totals.clicks.toLocaleString()}`)
      console.log(`   CTR: ${ctr.toFixed(2)}%`)
      console.log(`   Video Views: ${totals.videoViews.toLocaleString()}`)
      console.log(`   Interactions: ${totals.interactions.toLocaleString()}`)
      console.log(`\n💰 SPEND & EFFICIENCY`)
      console.log(`   Total Cost: KES ${(totals.cost / 1_000_000).toLocaleString()}`)
      console.log(`   Avg Daily Cost: KES ${avgDailyCost.toFixed(2)}`)
      console.log(`   CPC: KES ${cpc.toFixed(2)}`)
      console.log(`\n🎯 CONVERSIONS`)
      console.log(`   Conversions: ${totals.conversions}`)
      console.log(`   All Conversions: ${totals.allConversions}`)
      console.log(`   Conversion Rate: ${conversionRate.toFixed(2)}%`)
      console.log(`   CPA: KES ${cpa.toFixed(2)}`)
      console.log(`   Conversions Value: KES ${totals.conversionsValue.toLocaleString()}`)

      // Daily breakdown for top/worst days
      const dailyData = januaryData.map(day => ({
        date: day.segments.date,
        impressions: day.metrics.impressions || 0,
        clicks: day.metrics.clicks || 0,
        cost: (day.metrics.cost_micros || 0) / 1_000_000,
        conversions: day.metrics.conversions || 0,
        ctr: day.metrics.impressions > 0 ? (day.metrics.clicks / day.metrics.impressions * 100) : 0
      }))

      reviewData.dailyBreakdown = dailyData

      // Top 5 days by clicks
      const topDays = [...dailyData].sort((a, b) => b.clicks - a.clicks).slice(0, 5)
      console.log(`\n🏆 TOP 5 DAYS (by clicks)`)
      topDays.forEach((day, i) => {
        console.log(`   ${i + 1}. ${day.date}: ${day.clicks} clicks, ${day.impressions.toLocaleString()} imp, ${day.ctr.toFixed(2)}% CTR`)
      })

      // Worst 5 days by CTR (with at least 100 impressions)
      const worstDays = dailyData
        .filter(d => d.impressions >= 100)
        .sort((a, b) => a.ctr - b.ctr)
        .slice(0, 5)
      
      if (worstDays.length > 0) {
        console.log(`\n⚠️  LOWEST CTR DAYS (min 100 impressions)`)
        worstDays.forEach((day, i) => {
          console.log(`   ${i + 1}. ${day.date}: ${day.ctr.toFixed(2)}% CTR, ${day.clicks} clicks, ${day.impressions.toLocaleString()} imp`)
        })
      }

      // Weekly trends
      console.log(`\n📅 WEEKLY BREAKDOWN`)
      const weeks = [
        { name: 'Week 1 (Jan 1-7)', start: '2026-01-01', end: '2026-01-07' },
        { name: 'Week 2 (Jan 8-14)', start: '2026-01-08', end: '2026-01-14' },
        { name: 'Week 3 (Jan 15-21)', start: '2026-01-15', end: '2026-01-21' },
        { name: 'Week 4 (Jan 22-28)', start: '2026-01-22', end: '2026-01-28' },
        { name: 'Week 5 (Jan 29-31)', start: '2026-01-29', end: '2026-01-31' }
      ]

      weeks.forEach(week => {
        const weekData = dailyData.filter(d => d.date >= week.start && d.date <= week.end)
        if (weekData.length > 0) {
          const weekTotals = weekData.reduce((acc, d) => ({
            impressions: acc.impressions + d.impressions,
            clicks: acc.clicks + d.clicks,
            cost: acc.cost + d.cost,
            conversions: acc.conversions + d.conversions
          }), { impressions: 0, clicks: 0, cost: 0, conversions: 0 })

          const weekCtr = weekTotals.impressions > 0 ? (weekTotals.clicks / weekTotals.impressions * 100) : 0
          console.log(`   ${week.name}:`)
          console.log(`      ${weekTotals.impressions.toLocaleString()} imp | ${weekTotals.clicks} clicks | ${weekCtr.toFixed(2)}% CTR | KES ${weekTotals.cost.toFixed(2)} | ${weekTotals.conversions} conv`)
        }
      })
    }
  } catch (e) {
    console.error(`\n❌ Error fetching January data: ${e.message}`)
    reviewData.performance.january = { error: e.message }
  }

  // Compare to December 2025
  console.log('\n\n📊 COMPARISON: JANUARY 2026 vs DECEMBER 2025')
  console.log('='.repeat(80))

  const decemberQuery = `
    SELECT
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM campaign
    WHERE campaign.id = ${campaignId}
      AND segments.date >= '2025-12-01'
      AND segments.date <= '2025-12-31'
  `

  try {
    const decemberData = await customer.query(decemberQuery)

    if (decemberData.length > 0) {
      const decTotals = decemberData.reduce((acc, day) => ({
        impressions: acc.impressions + (day.metrics.impressions || 0),
        clicks: acc.clicks + (day.metrics.clicks || 0),
        cost: acc.cost + (day.metrics.cost_micros || 0),
        conversions: acc.conversions + (day.metrics.conversions || 0),
        conversionsValue: acc.conversionsValue + (day.metrics.conversions_value || 0)
      }), { impressions: 0, clicks: 0, cost: 0, conversions: 0, conversionsValue: 0 })

      reviewData.performance.december = {
        impressions: decTotals.impressions,
        clicks: decTotals.clicks,
        cost: decTotals.cost / 1_000_000,
        conversions: decTotals.conversions
      }

      const janPerf = reviewData.performance.january
      if (!janPerf.error) {
        const impChange = decTotals.impressions > 0 ? ((janPerf.impressions - decTotals.impressions) / decTotals.impressions * 100) : 0
        const clickChange = decTotals.clicks > 0 ? ((janPerf.clicks - decTotals.clicks) / decTotals.clicks * 100) : 0
        const costChange = decTotals.cost > 0 ? ((janPerf.cost * 1_000_000 - decTotals.cost) / decTotals.cost * 100) : 0
        const convChange = decTotals.conversions > 0 ? ((janPerf.conversions - decTotals.conversions) / decTotals.conversions * 100) : 0

        reviewData.performance.comparison = {
          impressionsChange: parseFloat(impChange.toFixed(2)),
          clicksChange: parseFloat(clickChange.toFixed(2)),
          costChange: parseFloat(costChange.toFixed(2)),
          conversionsChange: parseFloat(convChange.toFixed(2))
        }

        console.log(`   Impressions: ${impChange >= 0 ? '📈' : '📉'} ${impChange >= 0 ? '+' : ''}${impChange.toFixed(1)}%`)
        console.log(`   Clicks: ${clickChange >= 0 ? '📈' : '📉'} ${clickChange >= 0 ? '+' : ''}${clickChange.toFixed(1)}%`)
        console.log(`   Cost: ${costChange >= 0 ? '📈' : '📉'} ${costChange >= 0 ? '+' : ''}${costChange.toFixed(1)}%`)
        console.log(`   Conversions: ${convChange >= 0 ? '📈' : '📉'} ${convChange >= 0 ? '+' : ''}${convChange.toFixed(1)}%`)
      }
    } else {
      console.log('   No December 2025 data available for comparison')
    }
  } catch (e) {
    console.log(`   Could not fetch December data: ${e.message}`)
  }

  // Recommendations based on January performance
  console.log('\n\n💡 RECOMMENDATIONS FOR FEBRUARY 2026')
  console.log('='.repeat(80))

  const janPerf = reviewData.performance.january
  if (!janPerf.error) {
    // Budget recommendations
    if (janPerf.avgDailyCost < reviewData.campaign.dailyBudget * 0.7) {
      const budgetUtil = (janPerf.avgDailyCost / reviewData.campaign.dailyBudget * 100).toFixed(1)
      console.log(`\n💰 BUDGET UTILIZATION: ${budgetUtil}%`)
      console.log(`   Budget: KES ${reviewData.campaign.dailyBudget} | Actual: KES ${janPerf.avgDailyCost.toFixed(2)}`)
      console.log(`   → Campaign is underspending. Consider:`)
      console.log(`      • Expanding targeting (more keywords/audiences)`)
      console.log(`      • Increasing bids for better ad positions`)
      console.log(`      • Adding more ad variations`)
      
      reviewData.recommendations.push({
        priority: 'MEDIUM',
        category: 'BUDGET',
        issue: `Budget underutilization: ${budgetUtil}%`,
        suggestion: 'Expand targeting or increase bids to utilize full budget'
      })
    }

    // CTR recommendations
    if (janPerf.ctr < 2.0) {
      console.log(`\n📊 CTR: ${janPerf.ctr}% (Below industry average of 2-5%)`)
      console.log(`   → Improve ad creative:`)
      console.log(`      • Test more compelling headlines`)
      console.log(`      • Add emotional triggers (dreams, career growth)`)
      console.log(`      • Include clear CTAs and value propositions`)
      
      reviewData.recommendations.push({
        priority: 'HIGH',
        category: 'CTR',
        issue: `Low CTR: ${janPerf.ctr}%`,
        suggestion: 'Test new headlines and descriptions. Industry average is 2-5%.'
      })
    }

    // Conversion recommendations
    if (janPerf.conversions === 0 && janPerf.clicks > 20) {
      console.log(`\n🎯 CONVERSIONS: 0 (with ${janPerf.clicks} clicks)`)
      console.log(`   → Critical issues to check:`)
      console.log(`      • Conversion tracking setup`)
      console.log(`      • Landing page load time and mobile optimization`)
      console.log(`      • Form friction (too many fields?)`)
      console.log(`      • Clear value proposition on landing page`)
      
      reviewData.recommendations.push({
        priority: 'CRITICAL',
        category: 'CONVERSIONS',
        issue: 'No conversions with significant traffic',
        suggestion: 'Audit conversion tracking and landing page experience immediately'
      })
    } else if (janPerf.conversionRate < 1.0 && janPerf.clicks > 50) {
      console.log(`\n🎯 CONVERSION RATE: ${janPerf.conversionRate}% (Below 1%)`)
      console.log(`   → Optimize conversion funnel:`)
      console.log(`      • Simplify lead form (fewer fields)`)
      console.log(`      • Add trust signals (testimonials, accreditations)`)
      console.log(`      • Improve page speed (target <3s load time)`)
      
      reviewData.recommendations.push({
        priority: 'HIGH',
        category: 'CONVERSIONS',
        issue: `Low conversion rate: ${janPerf.conversionRate}%`,
        suggestion: 'Optimize landing page and reduce form friction'
      })
    }

    // Cost efficiency
    if (janPerf.cpa > 1000 && janPerf.conversions > 0) {
      console.log(`\n💸 CPA: KES ${janPerf.cpa.toFixed(2)} (High)`)
      console.log(`   → Reduce acquisition costs:`)
      console.log(`      • Target more qualified audiences`)
      console.log(`      • Improve Quality Score (better ad relevance)`)
      console.log(`      • Test pre-qualification questions`)
      
      reviewData.recommendations.push({
        priority: 'MEDIUM',
        category: 'EFFICIENCY',
        issue: `High CPA: KES ${janPerf.cpa.toFixed(2)}`,
        suggestion: 'Focus on qualified audiences and pre-qualification forms'
      })
    }

    // ADMI-specific recommendations
    console.log(`\n🎓 ADMI-SPECIFIC OPTIMIZATIONS`)
    console.log(`   → Target students with financing ability:`)
    console.log(`      • Add income/employment targeting`)
    console.log(`      • Target professionals seeking career change`)
    console.log(`      • Focus on diploma programs (higher conversion)`)
    console.log(`   → Leverage Customer Match list (42,330 contacts):`)
    console.log(`      • Upload to Google Ads for remarketing`)
    console.log(`      • Create lookalike audiences`)
    console.log(`   → Test pre-qualification landing pages:`)
    console.log(`      • "Can you commit KES 50K+ for training?"`)
    console.log(`      • "When do you plan to start? (Next 3 months)"`)
  }

  // Save report
  const reportsDir = path.join(__dirname, '../../reports/google-ads')
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }

  const filename = `pmax-january-2026-${campaignId}.json`
  const filepath = path.join(reportsDir, filename)
  fs.writeFileSync(filepath, JSON.stringify(reviewData, null, 2))
  console.log(`\n\n📄 Full report saved: ${filepath}`)

  return reviewData
}

// Run
const campaignId = process.argv[2] || '23282289054'
reviewJanuary2026(campaignId)
  .then(() => console.log('\n✅ January 2026 review complete!'))
  .catch(e => {
    console.error('❌ Error:', e.message)
    process.exit(1)
  })
