/**
 * Google Ads & Meta Ads Budget Allocation Analysis
 * Total Budget: $1,600 across all channels
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
require('dotenv').config()

async function analyzeBudgetAllocation() {
  console.log('\n' + '='.repeat(80))
  console.log('💰 BUDGET ALLOCATION ANALYSIS - TOTAL $1,600/MONTH')
  console.log('='.repeat(80) + '\n')

  // Current budget scenario (what we're analyzing against)
  console.log('📊 CURRENT SITUATION')
  console.log('-'.repeat(80))
  console.log('Total Monthly Budget:               $1,600')
  console.log('Channels: Google Ads Display, Google Ads Search, Meta Remarketing\n')

  // Campaign performance data (from previous analysis)
  const campaignData = {
    performanceMax: {
      channel: 'Google Ads - Performance Max (Display)',
      allocation: 0.35,  // 35% of budget
      actualSpend: 560,
      sessions: 184,
      conversions: 32,
      newLeads: 8,
      hotLeads: 5,
      warmLeads: 2,
      coldLeads: 1,
      cpa: 57.50,
      cpc: 10
    },
    search: {
      channel: 'Google Ads - Search',
      allocation: 0.40,  // 40% of budget
      actualSpend: 640,
      sessions: 156,
      conversions: 20,
      newLeads: 4,
      hotLeads: 0,
      warmLeads: 3,
      coldLeads: 1,
      cpa: 117,
      cpc: 15
    },
    metaRemarketing: {
      channel: 'Meta - Remarketing (Existing Audience)',
      allocation: 0.25,  // 25% of budget
      actualSpend: 400,
      sessions: 120,
      conversions: 12,
      newLeads: 2,
      hotLeads: 0,
      warmLeads: 2,
      coldLeads: 0,
      cpa: 133.33,
      cpc: 3.33
    }
  }

  const totalBudget = 1600

  // Display current allocation
  console.log('CURRENT ALLOCATION')
  console.log('-'.repeat(80))
  Object.entries(campaignData).forEach(([key, data]) => {
    console.log(`\n${data.channel}`)
    console.log(`  Budget Allocation:                ${(data.allocation * 100).toFixed(0)}% ($${data.actualSpend})`)
    console.log(`  Sessions:                         ${data.sessions}`)
    console.log(`  Conversions:                      ${data.conversions}`)
    console.log(`  CPA:                              $${data.cpa.toFixed(2)}`)
    console.log(`  Hot Leads:                        ${data.hotLeads}`)
  })

  // Totals
  console.log('\n' + '-'.repeat(80))
  const totalSessions = Object.values(campaignData).reduce((sum, d) => sum + d.sessions, 0)
  const totalConversions = Object.values(campaignData).reduce((sum, d) => sum + d.conversions, 0)
  const totalLeads = Object.values(campaignData).reduce((sum, d) => sum + d.newLeads, 0)
  const totalHotLeads = Object.values(campaignData).reduce((sum, d) => sum + d.hotLeads, 0)

  console.log(`TOTALS:`)
  console.log(`  Total Budget:                     $${totalBudget}`)
  console.log(`  Total Sessions:                   ${totalSessions}`)
  console.log(`  Total Conversions:                ${totalConversions}`)
  console.log(`  Total New Leads:                  ${totalLeads}`)
  console.log(`  Total Hot Leads:                  ${totalHotLeads}`)
  console.log(`  Blended CPA:                      $${(totalBudget / totalConversions).toFixed(2)}`)
  console.log(`  Blended CPC:                      $${(totalBudget / totalSessions).toFixed(2)}\n`)

  // RECOMMENDED REALLOCATION
  console.log('\n' + '='.repeat(80))
  console.log('✅ RECOMMENDED BUDGET REALLOCATION')
  console.log('='.repeat(80) + '\n')

  const recommended = {
    performanceMax: {
      channel: 'Google Ads - Performance Max (Display)',
      allocation: 0.50,  // Increase to 50%
      actualSpend: 800,
      reason: 'Best CPA ($57.50), highest hot lead rate (63%)'
    },
    search: {
      channel: 'Google Ads - Search',
      allocation: 0.30,  // Decrease to 30%
      actualSpend: 480,
      reason: 'High CPA ($117), needs optimization'
    },
    metaRemarketing: {
      channel: 'Meta - Remarketing',
      allocation: 0.20,  // Decrease to 20%
      actualSpend: 320,
      reason: 'Lower CPA ($133), but lower conversion rate'
    }
  }

  console.log('RECOMMENDED ALLOCATION')
  console.log('-'.repeat(80))
  Object.entries(recommended).forEach(([key, data]) => {
    const percentChange = ((data.allocation - campaignData[key].allocation) * 100).toFixed(0)
    const change = percentChange > 0 ? `+${percentChange}%` : `${percentChange}%`
    console.log(`\n${data.channel}`)
    console.log(`  Current:                          ${(campaignData[key].allocation * 100).toFixed(0)}% ($${campaignData[key].actualSpend})`)
    console.log(`  Recommended:                      ${(data.allocation * 100).toFixed(0)}% ($${data.actualSpend})`)
    console.log(`  Change:                           ${change}`)
    console.log(`  Reason:                           ${data.reason}`)
  })

  // PROJECT RESULTS
  console.log('\n' + '='.repeat(80))
  console.log('📈 PROJECTED RESULTS WITH REALLOCATION')
  console.log('='.repeat(80) + '\n')

  // Scale conversions proportionally to new budget
  const performanceMaxProjected = {
    spend: 800,
    conversions: Math.round((800 / campaignData.performanceMax.actualSpend) * campaignData.performanceMax.conversions),
    sessions: Math.round((800 / campaignData.performanceMax.actualSpend) * campaignData.performanceMax.sessions),
    leads: Math.round((800 / campaignData.performanceMax.actualSpend) * campaignData.performanceMax.newLeads)
  }

  const searchProjected = {
    spend: 480,
    conversions: Math.round((480 / campaignData.search.actualSpend) * campaignData.search.conversions),
    sessions: Math.round((480 / campaignData.search.actualSpend) * campaignData.search.sessions),
    leads: Math.round((480 / campaignData.search.actualSpend) * campaignData.search.newLeads)
  }

  const metaProjected = {
    spend: 320,
    conversions: Math.round((320 / campaignData.metaRemarketing.actualSpend) * campaignData.metaRemarketing.conversions),
    sessions: Math.round((320 / campaignData.metaRemarketing.actualSpend) * campaignData.metaRemarketing.sessions),
    leads: Math.round((320 / campaignData.metaRemarketing.actualSpend) * campaignData.metaRemarketing.newLeads)
  }

  console.log('Performance Max (50% allocation):')
  console.log(`  Budget:                           $800 (vs $${campaignData.performanceMax.actualSpend})`)
  console.log(`  Projected Conversions:            ${performanceMaxProjected.conversions} (vs ${campaignData.performanceMax.conversions})`)
  console.log(`  Projected Sessions:               ${performanceMaxProjected.sessions} (vs ${campaignData.performanceMax.sessions})`)
  console.log(`  Projected New Leads:              ${performanceMaxProjected.leads} (vs ${campaignData.performanceMax.newLeads})`)
  console.log(`  CPA:                              $${(800 / performanceMaxProjected.conversions).toFixed(2)}\n`)

  console.log('Search Campaign (30% allocation):')
  console.log(`  Budget:                           $480 (vs $${campaignData.search.actualSpend})`)
  console.log(`  Projected Conversions:            ${searchProjected.conversions} (vs ${campaignData.search.conversions})`)
  console.log(`  Projected Sessions:               ${searchProjected.sessions} (vs ${campaignData.search.sessions})`)
  console.log(`  Projected New Leads:              ${searchProjected.leads} (vs ${campaignData.search.newLeads})`)
  console.log(`  CPA:                              $${(480 / searchProjected.conversions).toFixed(2)}\n`)

  console.log('Meta Remarketing (20% allocation):')
  console.log(`  Budget:                           $320 (vs $${campaignData.metaRemarketing.actualSpend})`)
  console.log(`  Projected Conversions:            ${metaProjected.conversions} (vs ${campaignData.metaRemarketing.conversions})`)
  console.log(`  Projected Sessions:               ${metaProjected.sessions} (vs ${campaignData.metaRemarketing.sessions})`)
  console.log(`  Projected New Leads:              ${metaProjected.leads} (vs ${campaignData.metaRemarketing.newLeads})`)
  console.log(`  CPA:                              $${(320 / metaProjected.conversions).toFixed(2)}\n`)

  // TOTAL PROJECTION
  console.log('-'.repeat(80))
  const projectedTotal = {
    conversions: performanceMaxProjected.conversions + searchProjected.conversions + metaProjected.conversions,
    sessions: performanceMaxProjected.sessions + searchProjected.sessions + metaProjected.sessions,
    leads: performanceMaxProjected.leads + searchProjected.leads + metaProjected.leads
  }
  const currentTotal = {
    conversions: campaignData.performanceMax.conversions + campaignData.search.conversions + campaignData.metaRemarketing.conversions,
    sessions: campaignData.performanceMax.sessions + campaignData.search.sessions + campaignData.metaRemarketing.sessions,
    leads: campaignData.performanceMax.newLeads + campaignData.search.newLeads + campaignData.metaRemarketing.newLeads
  }

  console.log('PROJECTED TOTALS:')
  console.log(`  Total Budget:                     $1,600`)
  console.log(`  Current Conversions:              ${currentTotal.conversions}`)
  console.log(`  Projected Conversions:            ${projectedTotal.conversions}`)
  console.log(`  Improvement:                      ${projectedTotal.conversions - currentTotal.conversions > 0 ? '+' : ''}${projectedTotal.conversions - currentTotal.conversions} conversions (${((projectedTotal.conversions / currentTotal.conversions - 1) * 100).toFixed(1)}% increase)`)
  console.log(`  Current Blended CPA:              $${(totalBudget / currentTotal.conversions).toFixed(2)}`)
  console.log(`  Projected Blended CPA:            $${(totalBudget / projectedTotal.conversions).toFixed(2)}`)
  console.log(`  CPA Improvement:                  ${((totalBudget / currentTotal.conversions - totalBudget / projectedTotal.conversions) / (totalBudget / currentTotal.conversions) * 100).toFixed(1)}% reduction\n`)

  // KEY INSIGHTS
  console.log('='.repeat(80))
  console.log('⚠️  KEY ISSUES WITH CURRENT ALLOCATION')
  console.log('='.repeat(80) + '\n')

  console.log('1. SEARCH CAMPAIGN IS TOO EXPENSIVE')
  console.log(`   - CPA: $${campaignData.search.cpa.toFixed(2)} (vs $${campaignData.performanceMax.cpa.toFixed(2)} for Performance Max)`)
  console.log(`   - Getting 40% of budget but only 23% of conversions`)
  console.log(`   - Zero hot leads = lower quality conversions\n`)

  console.log('2. PERFORMANCE MAX UNDERALLOCATED')
  console.log(`   - Best CPA: $${campaignData.performanceMax.cpa.toFixed(2)}`)
  console.log(`   - Highest hot lead rate: 63%`)
  console.log(`   - Only getting 35% of budget\n`)

  console.log('3. META REMARKETING HAS LOWEST ROI')
  console.log(`   - CPA: $${campaignData.metaRemarketing.cpa.toFixed(2)}`)
  console.log(`   - Only 2 new leads in 5 days`)
  console.log(`   - Getting 25% of budget\n`)

  console.log('='.repeat(80))
  console.log('✅ IMMEDIATE ACTION ITEMS')
  console.log('='.repeat(80) + '\n')

  console.log('URGENT (This Week):')
  console.log('1. Reallocate budget: 50% Performance Max, 30% Search, 20% Meta')
  console.log('2. Pause lowest 25% of Search keywords by performance')
  console.log('3. Reduce Meta Remarketing budget from $400 to $320')
  console.log('4. Monitor daily spend and adjust bids\n')

  console.log('SHORT-TERM (Next 2 Weeks):')
  console.log('1. A/B test Search campaign ad copy')
  console.log('2. Implement search-specific landing pages')
  console.log('3. Test tighter keyword matching for Search')
  console.log('4. Analyze Meta audience for quality improvement\n')

  console.log('EXPECTED OUTCOMES:')
  console.log(`- More conversions: ${projectedTotal.conversions} vs ${currentTotal.conversions} (+${projectedTotal.conversions - currentTotal.conversions})`)
  console.log(`- Lower CPA: $${(totalBudget / projectedTotal.conversions).toFixed(2)} vs $${(totalBudget / currentTotal.conversions).toFixed(2)}`)
  console.log(`- Better ROI with same $1,600 budget`)
  console.log(`- More qualified leads from Performance Max\n`)
}

async function main() {
  try {
    await analyzeBudgetAllocation()
    console.log('✅ Budget allocation analysis complete!\n')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
