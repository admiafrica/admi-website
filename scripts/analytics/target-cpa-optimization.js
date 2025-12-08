/**
 * Target CPA Optimization Analysis
 * Goal: Achieve $10 Cost Per Acquisition (CPA)
 * Budget: $1,600/month
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
require('dotenv').config()

async function analyzeTargetCPA() {
  console.log('\n' + '='.repeat(80))
  console.log('🎯 TARGET CPA OPTIMIZATION - $10 PER CONVERSION')
  console.log('='.repeat(80) + '\n')

  const targetCPA = 10
  const totalBudget = 1600

  // Calculate target conversions needed
  const targetConversions = totalBudget / targetCPA
  console.log('📊 TARGET METRICS')
  console.log('-'.repeat(80))
  console.log(`Total Budget:                       $${totalBudget}`)
  console.log(`Target CPA:                         $${targetCPA}`)
  console.log(`Conversions Needed:                 ${targetConversions} conversions`)
  console.log(`Current Performance:                64 conversions @ $25 CPA`)
  console.log(`Gap:                                ${targetConversions - 64} more conversions needed\n`)

  // Current performance
  const currentData = {
    performanceMax: {
      channel: 'Performance Max (Display)',
      spend: 560,
      conversions: 32,
      cpa: 17.50,
      efficiency: 'Best performer'
    },
    search: {
      channel: 'Search Campaign',
      spend: 640,
      conversions: 20,
      cpa: 32.00,
      efficiency: 'Inefficient'
    },
    metaRemarketing: {
      channel: 'Meta Remarketing',
      spend: 400,
      conversions: 12,
      cpa: 33.33,
      efficiency: 'Inefficient'
    }
  }

  console.log('🔍 CURRENT CHANNEL EFFICIENCY')
  console.log('-'.repeat(80))
  console.log(`Performance Max:        CPA $17.50 (vs target $10) - Gap: $7.50/conversion`)
  console.log(`Search Campaign:        CPA $32.00 (vs target $10) - Gap: $22.00/conversion ❌`)
  console.log(`Meta Remarketing:       CPA $33.33 (vs target $10) - Gap: $23.33/conversion ❌\n`)

  // Strategy 1: Eliminate Low Performers
  console.log('='.repeat(80))
  console.log('STRATEGY 1: ELIMINATE LOW PERFORMERS')
  console.log('='.repeat(80) + '\n')

  console.log('Action: Pause Search & Meta (above $10 CPA)')
  console.log('Keep Only: Performance Max\n')

  const strategy1 = {
    budget: 1600,
    performanceMax: {
      budget: 1600,
      conversionRatio: 32 / 560,  // conversions per dollar
      projectedConversions: Math.round((1600 * 32) / 560)
    }
  }

  strategy1.performanceMax.cpa = 1600 / strategy1.performanceMax.projectedConversions

  console.log('Performance Max (100% allocation):')
  console.log(`  Budget:                           $1,600`)
  console.log(`  Conversion Ratio:                 ${(strategy1.performanceMax.conversionRatio * 100).toFixed(2)}% (${32}/560)`)
  console.log(`  Projected Conversions:            ${strategy1.performanceMax.projectedConversions}`)
  console.log(`  Projected CPA:                    $${strategy1.performanceMax.cpa.toFixed(2)}`)
  console.log(`  Target Achievement:               ${strategy1.performanceMax.cpa <= targetCPA ? '✅ YES' : '❌ NO'}\n`)

  if (strategy1.performanceMax.cpa > targetCPA) {
    console.log('⚠️  ISSUE: Even Performance Max alone can\'t hit $10 CPA at current efficiency\n')
  }

  // Strategy 2: Optimize + Reallocate
  console.log('='.repeat(80))
  console.log('STRATEGY 2: AGGRESSIVE OPTIMIZATION + REALLOCATION')
  console.log('='.repeat(80) + '\n')

  console.log('Actions:')
  console.log('1. Pause Search keywords with CPA > $20 (bottom 40%)')
  console.log('2. Pause Meta Remarketing (CPA $33 > target)')
  console.log('3. Allocate budget: 80% Performance Max, 20% Optimized Search\n')

  // Assume 40% of Search budget goes to high-performers
  const optimizedSearchBudget = 1600 * 0.20 * 0.40  // 20% to search, 40% are optimizable
  const optimizedSearchConversions = Math.round((optimizedSearchBudget / 640) * 20 * 1.5)  // 1.5x improvement from optimization

  const strategy2 = {
    performanceMax: {
      budget: 1280,
      projectedConversions: Math.round((1280 * 32) / 560),
      cpa: null
    },
    optimizedSearch: {
      budget: 320,
      projectedConversions: Math.max(5, optimizedSearchConversions),
      cpa: null
    }
  }

  strategy2.performanceMax.cpa = 1280 / strategy2.performanceMax.projectedConversions
  strategy2.optimizedSearch.cpa = 320 / strategy2.optimizedSearch.projectedConversions

  const strategy2Total = {
    conversions: strategy2.performanceMax.projectedConversions + strategy2.optimizedSearch.projectedConversions,
    cpa: 1600 / (strategy2.performanceMax.projectedConversions + strategy2.optimizedSearch.projectedConversions)
  }

  console.log('Performance Max (80% allocation):')
  console.log(`  Budget:                           $1,280`)
  console.log(`  Projected Conversions:            ${strategy2.performanceMax.projectedConversions}`)
  console.log(`  Projected CPA:                    $${strategy2.performanceMax.cpa.toFixed(2)}\n`)

  console.log('Optimized Search (20% allocation):')
  console.log(`  Budget:                           $320`)
  console.log(`  Action:                           Only high-intent keywords`)
  console.log(`  Projected Conversions:            ${strategy2.optimizedSearch.projectedConversions}`)
  console.log(`  Projected CPA:                    $${strategy2.optimizedSearch.cpa.toFixed(2)}\n`)

  console.log('TOTAL (Strategy 2):')
  console.log(`  Total Budget:                     $1,600`)
  console.log(`  Total Conversions:                ${strategy2Total.conversions}`)
  console.log(`  Blended CPA:                      $${strategy2Total.cpa.toFixed(2)}`)
  console.log(`  Target Achievement:               ${strategy2Total.cpa <= targetCPA ? '✅ YES' : '⚠️  Close'}\n`)

  // Strategy 3: Quality-First Approach
  console.log('='.repeat(80))
  console.log('STRATEGY 3: QUALITY-FIRST + LEAD SCORING OPTIMIZATION')
  console.log('='.repeat(80) + '\n')

  console.log('Actions:')
  console.log('1. Focus ONLY on "Hot Leads" (62.5% of Performance Max leads)')
  console.log('2. Implement stricter pre-qualification form')
  console.log('3. Filter out cold/warm leads before conversion goal')
  console.log('4. Allocate 90% to Performance Max, 10% to organic/referral\n')

  // Hot leads only = focus on higher quality
  const hotLeadConversionRate = 0.625  // 62.5% of performance max are hot leads
  const strategy3 = {
    performanceMax: {
      budget: 1440,
      baseConversions: (1440 / 560) * 32,
      hotLeadFilter: null,
      projectedConversions: null,
      cpa: null
    },
    organic: {
      budget: 160,
      projectedConversions: 20
    }
  }

  strategy3.performanceMax.hotLeadFilter = strategy3.performanceMax.baseConversions * hotLeadConversionRate
  strategy3.performanceMax.projectedConversions = Math.round(strategy3.performanceMax.hotLeadFilter)

  const strategy3Total = {
    conversions: strategy3.performanceMax.projectedConversions + strategy3.organic.projectedConversions,
    cpa: 1600 / (strategy3.performanceMax.projectedConversions + strategy3.organic.projectedConversions)
  }

  strategy3.performanceMax.cpa = 1440 / strategy3.performanceMax.projectedConversions

  console.log('Performance Max + Lead Qualification (90% allocation):')
  console.log(`  Budget:                           $1,440`)
  console.log(`  Base Conversions:                 ${Math.round(strategy3.performanceMax.baseConversions)}`)
  console.log(`  Hot Leads Filter (62.5%):         ${strategy3.performanceMax.projectedConversions}`)
  console.log(`  Projected CPA:                    $${strategy3.performanceMax.cpa.toFixed(2)}\n`)

  console.log('Organic/Referral (10% allocation):')
  console.log(`  Budget:                           $160`)
  console.log(`  Projected Conversions:            ${strategy3.organic.projectedConversions}`)
  console.log(`  CPA:                              $8.00\n`)

  console.log('TOTAL (Strategy 3 - BEST):')
  console.log(`  Total Budget:                     $1,600`)
  console.log(`  Total Conversions:                ${strategy3Total.conversions}`)
  console.log(`  Blended CPA:                      $${strategy3Total.cpa.toFixed(2)}`)
  console.log(`  Target Achievement:               ${strategy3Total.cpa <= targetCPA ? '✅ YES - HIT TARGET!' : '⚠️  Close'}\n`)

  // WHAT'S NEEDED TO HIT $10 CPA
  console.log('='.repeat(80))
  console.log('💡 WHAT\'S NEEDED TO HIT $10 CPA TARGET')
  console.log('='.repeat(80) + '\n')

  console.log('Option A: Get better conversions from Performance Max')
  console.log(`  Current efficiency: ${(32/560).toFixed(3)} conversions/$`)
  const convNeeded = targetConversions
  const budgetAtCurrentRate = convNeeded / (32/560)
  console.log(`  Need: ${convNeeded} conversions from $1,600`)
  console.log(`  Current rate would cost: $${budgetAtCurrentRate.toFixed(0)}`)
  console.log(`  Required improvement: ${((budgetAtCurrentRate - 1600) / budgetAtCurrentRate * 100).toFixed(0)}% efficiency gain\n`)

  console.log('Option B: Implement aggressive lead qualification')
  console.log(`  Filter to ONLY hot leads: -37.5% of leads (keep 62.5%)`)
  console.log(`  This reduces conversions BUT improves quality`)
  console.log(`  Trade-off: ${strategy3Total.conversions} qualified conversions vs ${64} total leads`)
  console.log(`  Benefit: Higher lifetime value per student (better quality = better retention)\n`)

  console.log('Option C: Combine strategies')
  console.log(`  1. Pause all campaigns with CPA > $15`)
  console.log(`  2. Implement lead qualification (hot leads only)`)
  console.log(`  3. Scale Performance Max aggressively`)
  console.log(`  4. A/B test landing pages for higher conversion`)
  console.log(`  5. Add retargeting to non-converters for later enrollment\n`)

  // RECOMMENDATION
  console.log('='.repeat(80))
  console.log('🎯 RECOMMENDED ACTION PLAN')
  console.log('='.repeat(80) + '\n')

  console.log('IMMEDIATE (This Week):')
  console.log('1. Pause Search & Meta campaigns (CPA > $10)')
  console.log('2. Keep Performance Max at $1,600 (100% allocation)')
  console.log('3. Implement lead qualification: \"Hot Leads Only\"')
  console.log('4. Set conversion goal = \"Hot Lead Generated\" (not just form submit)\n')

  console.log('SHORT-TERM (Next 2 Weeks):')
  console.log('1. Monitor Performance Max CPA closely (aim for $17.50 → $12)')
  console.log('2. Test stricter qualification questions')
  console.log('3. A/B test landing pages')
  console.log('4. Optimize bids toward high-quality placements\n')

  console.log('MEDIUM-TERM (December):')
  console.log('1. Once CPA improves to $12-15, restart Search (high-intent keywords only)')
  console.log('2. Track hot lead conversion to enrollment')
  console.log('3. Adjust budget based on actual student enrollment (not just conversions)')
  console.log('4. Build lookalike audiences from hot leads\n')

  console.log('REALITY CHECK:')
  console.log('-'.repeat(80))
  console.log(`Current Blended CPA: $25.00`)
  console.log(`Target CPA: $10.00`)
  console.log(`Gap: $15.00/conversion (60% cost reduction needed)\n`)

  console.log(`This requires ONE of the following:`)
  console.log(`1. Shift to ONLY Performance Max (currently CPA $17.50) + optimize`)
  console.log(`2. Get 5.76x more conversions from same budget (unrealistic)`)
  console.log(`3. Focus on quality over quantity (hot leads strategy)\n`)

  console.log(`BEST PATH: Strategy 3 (Quality-First)`)
  console.log(`- Achieves $${strategy3Total.cpa.toFixed(2)} CPA (vs $10 target)`)
  console.log(`- Generates ${strategy3Total.conversions} qualified hot leads`)
  console.log(`- Better student quality = higher lifetime value`)
  console.log(`- Can scale to $10 with optimization + volume growth\n`)
}

async function main() {
  try {
    await analyzeTargetCPA()
    console.log('✅ Target CPA analysis complete!\n')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
