#!/usr/bin/env node

/**
 * Performance Max Campaign Reviewer
 * Analyzes asset groups, ad strength, and provides optimization recommendations
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

// Field type mapping for Performance Max
const fieldTypeMap = {
  1: 'HEADLINE',
  2: 'HEADLINE',
  3: 'LONG_HEADLINE',
  4: 'DESCRIPTION',
  5: 'BUSINESS_NAME',
  6: 'CALL_TO_ACTION',
  7: 'MARKETING_IMAGE',
  8: 'MARKETING_IMAGE',
  9: 'SQUARE_MARKETING_IMAGE',
  10: 'PORTRAIT_MARKETING_IMAGE',
  11: 'LOGO',
  12: 'LANDSCAPE_LOGO',
  13: 'YOUTUBE_VIDEO',
  14: 'CALL_TO_ACTION_SELECTION'
}

const statusMap = {
  0: 'UNSPECIFIED',
  1: 'UNKNOWN',
  2: 'ENABLED',
  3: 'PAUSED',
  4: 'REMOVED'
}

async function reviewPerformanceMaxCampaign(campaignId) {
  const reviewData = {
    campaignId,
    timestamp: new Date().toISOString(),
    campaign: {},
    assetGroups: [],
    performance: {},
    recommendations: []
  }

  console.log('🔍 PERFORMANCE MAX CAMPAIGN REVIEW')
  console.log('='.repeat(80))

  // Get campaign details
  const campaignQuery = `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type,
      campaign.bidding_strategy_type,
      campaign_budget.amount_micros,
      campaign.start_date,
      campaign.url_expansion_opt_out
    FROM campaign
    WHERE campaign.id = ${campaignId}
  `

  const [campaign] = await customer.query(campaignQuery)
  reviewData.campaign = {
    id: campaign.campaign.id,
    name: campaign.campaign.name,
    status: statusMap[campaign.campaign.status],
    dailyBudget: campaign.campaign_budget.amount_micros / 1_000_000
  }

  console.log(`
📋 CAMPAIGN: ${campaign.campaign.name}
─────────────────────────────────────────────────────────────────
   ID: ${campaign.campaign.id}
   Status: ${statusMap[campaign.campaign.status]}
   Daily Budget: KES ${campaign.campaign_budget.amount_micros / 1_000_000}
   Start Date: ${campaign.campaign.start_date}
   URL Expansion: ${campaign.campaign.url_expansion_opt_out ? 'DISABLED' : 'ENABLED'}
`)

  // Get asset groups
  const assetGroupQuery = `
    SELECT
      asset_group.id,
      asset_group.name,
      asset_group.status,
      asset_group.final_urls,
      asset_group.ad_strength
    FROM asset_group
    WHERE campaign.id = ${campaignId}
  `

  const assetGroups = await customer.query(assetGroupQuery)

  for (const ag of assetGroups) {
    const assetGroupData = {
      id: ag.asset_group.id,
      name: ag.asset_group.name,
      status: statusMap[ag.asset_group.status],
      adStrength: ag.asset_group.ad_strength || 'PENDING',
      assets: {},
      checks: []
    }

    console.log(`\n🎨 ASSET GROUP: ${ag.asset_group.name}`)
    console.log('─'.repeat(65))
    console.log(`   Status: ${statusMap[ag.asset_group.status]}`)
    console.log(`   Ad Strength: ${ag.asset_group.ad_strength || 'PENDING'}`)
    console.log(`   Final URL: ${ag.asset_group.final_urls?.join(', ') || 'Not set'}`)

    // Get all assets for this asset group
    const assetQuery = `
      SELECT
        asset_group_asset.field_type,
        asset_group_asset.status,
        asset_group_asset.performance_label,
        asset.id,
        asset.name,
        asset.type,
        asset.text_asset.text,
        asset.image_asset.file_size,
        asset.image_asset.full_size.width_pixels,
        asset.image_asset.full_size.height_pixels,
        asset.youtube_video_asset.youtube_video_id,
        asset.youtube_video_asset.youtube_video_title
      FROM asset_group_asset
      WHERE asset_group.id = ${ag.asset_group.id}
      ORDER BY asset_group_asset.field_type
    `

    const assets = await customer.query(assetQuery)

    // Group by field type
    const grouped = {}
    assets.forEach(a => {
      const type = fieldTypeMap[a.asset_group_asset.field_type] || `TYPE_${a.asset_group_asset.field_type}`
      if (!grouped[type]) grouped[type] = []
      grouped[type].push(a)
    })

    // Headlines
    console.log('\n   📝 HEADLINES')
    const headlines = grouped['HEADLINE'] || []
    let shortHeadlineCount = 0
    headlines.forEach((h, i) => {
      const text = h.asset.text_asset?.text || h.asset.name || ''
      const len = text.length
      if (len <= 30) {
        shortHeadlineCount++
        console.log(`      ${i + 1}. ✅ (${len} chars) "${text}"`)
      } else {
        console.log(`      ${i + 1}. ⚠️  (${len} chars - TOO LONG for short headline) "${text}"`)
      }
    })
    console.log(`      Total: ${headlines.length} | Valid short headlines: ${shortHeadlineCount}`)

    // Long Headlines
    console.log('\n   📝 LONG HEADLINES')
    const longHeadlines = grouped['LONG_HEADLINE'] || []
    longHeadlines.forEach((h, i) => {
      const text = h.asset.text_asset?.text || h.asset.name || ''
      const len = text.length
      const status = len <= 90 ? '✅' : '⚠️ TOO LONG'
      console.log(`      ${i + 1}. ${status} (${len} chars) "${text}"`)
    })
    console.log(`      Total: ${longHeadlines.length}`)

    // Descriptions
    console.log('\n   📝 DESCRIPTIONS')
    const descriptions = grouped['DESCRIPTION'] || []
    descriptions.forEach((d, i) => {
      const text = d.asset.text_asset?.text || d.asset.name || ''
      const len = text.length
      const status = len <= 90 ? '✅' : '⚠️ TOO LONG'
      console.log(`      ${i + 1}. ${status} (${len} chars) "${text}"`)
    })
    console.log(`      Total: ${descriptions.length}`)

    // Images
    console.log('\n   🖼️  IMAGES')
    const images = [
      ...(grouped['MARKETING_IMAGE'] || []),
      ...(grouped['SQUARE_MARKETING_IMAGE'] || []),
      ...(grouped['PORTRAIT_MARKETING_IMAGE'] || [])
    ]
    let landscapeCount = 0, squareCount = 0, portraitCount = 0
    images.forEach((img, i) => {
      const w = img.asset.image_asset?.full_size?.width_pixels
      const h = img.asset.image_asset?.full_size?.height_pixels
      if (w && h) {
        const ratio = w / h
        let type = 'Unknown'
        if (ratio > 1.5) { type = 'Landscape'; landscapeCount++ }
        else if (ratio > 0.9 && ratio < 1.1) { type = 'Square'; squareCount++ }
        else if (ratio < 0.9) { type = 'Portrait'; portraitCount++ }
        console.log(`      ${i + 1}. ${w}x${h} (${type})`)
      }
    })
    console.log(`      Total: ${images.length} | Landscape: ${landscapeCount} | Square: ${squareCount} | Portrait: ${portraitCount}`)

    // Logos
    console.log('\n   🏷️  LOGOS')
    const logos = [...(grouped['LOGO'] || []), ...(grouped['LANDSCAPE_LOGO'] || [])]
    logos.forEach((logo, i) => {
      const w = logo.asset.image_asset?.full_size?.width_pixels || '?'
      const h = logo.asset.image_asset?.full_size?.height_pixels || '?'
      console.log(`      ${i + 1}. ${w}x${h}`)
    })
    console.log(`      Total: ${logos.length}`)

    // Videos
    console.log('\n   🎬 YOUTUBE VIDEOS')
    const videos = grouped['YOUTUBE_VIDEO'] || []
    videos.forEach((v, i) => {
      const title = v.asset.youtube_video_asset?.youtube_video_title || 'Untitled'
      const id = v.asset.youtube_video_asset?.youtube_video_id || '?'
      console.log(`      ${i + 1}. "${title}"`)
      console.log(`         https://youtube.com/watch?v=${id}`)
    })
    console.log(`      Total: ${videos.length}`)

    // Asset Requirements Check
    console.log('\n   ✅ ASSET REQUIREMENTS CHECK')
    console.log('   ─'.repeat(30))
    const checks = [
      { name: 'Short Headlines (≤30 chars)', have: shortHeadlineCount, need: 3, max: 15 },
      { name: 'Long Headlines', have: longHeadlines.length, need: 1, max: 5 },
      { name: 'Descriptions', have: descriptions.length, need: 2, max: 5 },
      { name: 'Landscape Images', have: landscapeCount, need: 1, max: 20 },
      { name: 'Square Images', have: squareCount, need: 1, max: 20 },
      { name: 'Logos', have: logos.length, need: 1, max: 5 },
      { name: 'Videos (optional)', have: videos.length, need: 0, max: 5 }
    ]

    checks.forEach(check => {
      let status = 'PASS'
      if (check.have < check.need) status = 'MISSING'
      else if (check.have > check.max) status = 'EXCESS'
      console.log(`      ${status === 'PASS' ? '✅' : status === 'MISSING' ? '❌ MISSING' : '⚠️ TOO MANY'} ${check.name}: ${check.have}/${check.need}-${check.max}`)
      
      assetGroupData.checks.push({
        name: check.name,
        status,
        have: check.have,
        need: check.need,
        max: check.max
      })
    })

    reviewData.assetGroups.push(assetGroupData)
  }

  // Get performance data
  console.log('\n\n📊 PERFORMANCE (Last 7 Days)')
  console.log('='.repeat(80))

  try {
    const perfQuery = `
      SELECT
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.video_views
      FROM campaign
      WHERE campaign.id = ${campaignId}
        AND segments.date DURING LAST_7_DAYS
    `

    const perf = await customer.query(perfQuery)

    const totals = perf.reduce((acc, p) => ({
      impressions: acc.impressions + (p.metrics.impressions || 0),
      clicks: acc.clicks + (p.metrics.clicks || 0),
      cost: acc.cost + (p.metrics.cost_micros || 0),
      conversions: acc.conversions + (p.metrics.conversions || 0),
      videoViews: acc.videoViews + (p.metrics.video_views || 0)
    }), { impressions: 0, clicks: 0, cost: 0, conversions: 0, videoViews: 0 })

    reviewData.performance = {
      period: 'LAST_7_DAYS',
      impressions: totals.impressions,
      clicks: totals.clicks,
      videoViews: totals.videoViews,
      ctr: totals.impressions > 0 ? (totals.clicks / totals.impressions * 100) : 0,
      cost: totals.cost / 1_000_000,
      conversions: totals.conversions
    }

    console.log(`   Impressions: ${totals.impressions.toLocaleString()}`)
    console.log(`   Clicks: ${totals.clicks.toLocaleString()}`)
    console.log(`   Video Views: ${totals.videoViews.toLocaleString()}`)
    console.log(`   CTR: ${totals.impressions > 0 ? (totals.clicks / totals.impressions * 100).toFixed(2) : 0}%`)
    console.log(`   Cost: KES ${(totals.cost / 1_000_000).toLocaleString()}`)
    console.log(`   Conversions: ${totals.conversions}`)

    if (totals.impressions === 0) {
      console.log('\n   ⚠️  No impressions yet - campaign may still be in learning phase or pending review.')
      reviewData.recommendations.push({
        priority: 'HIGH',
        category: 'PERFORMANCE',
        issue: 'No impressions yet',
        suggestion: 'Campaign may be in learning phase or pending review. Wait 24-48 hours.'
      })
    }

    // Performance-based recommendations
    if (totals.impressions > 100 && totals.clicks < 5) {
      reviewData.recommendations.push({
        priority: 'HIGH',
        category: 'CTR',
        issue: `Low CTR: ${(totals.clicks / totals.impressions * 100).toFixed(2)}%`,
        suggestion: 'Test more compelling headlines and descriptions. Industry average is 2-5%.'
      })
    }

    if (totals.clicks > 10 && totals.conversions === 0) {
      reviewData.recommendations.push({
        priority: 'HIGH',
        category: 'CONVERSIONS',
        issue: 'No conversions with traffic',
        suggestion: 'Check conversion tracking setup and landing page relevance.'
      })
    }

  } catch (e) {
    console.log('   No performance data available yet.')
    reviewData.performance = { error: 'No data available' }
  }

  // Recommendations
  console.log('\n\n💡 RECOMMENDATIONS')
  console.log('='.repeat(80))

  const budget = campaign.campaign_budget.amount_micros / 1_000_000
  if (budget < 500) {
    console.log(`
   🔴 BUDGET: Your daily budget of KES ${budget} is very low for Performance Max.
      → For "lots of traffic quickly", increase to at least KES 1,000-2,000/day
      → Current budget may only get 5-10 clicks/day
`)
    reviewData.recommendations.push({
      priority: 'CRITICAL',
      category: 'BUDGET',
      issue: `Daily budget too low: KES ${budget}`,
      suggestion: 'Increase to KES 1,000-2,000/day for meaningful traffic volume'
    })
  }

  // Asset recommendations
  reviewData.assetGroups.forEach(ag => {
    ag.checks.forEach(check => {
      if (check.status === 'MISSING') {
        reviewData.recommendations.push({
          priority: 'HIGH',
          category: 'ASSETS',
          issue: `${ag.name}: Missing ${check.name}`,
          suggestion: `Add at least ${check.need} ${check.name.toLowerCase()}`
        })
      }
    })
  })

  console.log(`
   📍 AUDIENCE SIGNALS: Add audience signals to help Google find the right users faster
      → Custom segments: "film school", "music production", "graphic design courses"
      → Interests: Arts & Entertainment, Education, Career Development
      → Your data: Upload your Customer Match list (42,330 contacts ready!)

   🎯 SEARCH THEMES: Add search themes to improve Search inventory targeting
      → "media courses Kenya", "film school Nairobi", "graphic design diploma"
      → "music production training", "video editing course"

   ⏱️  LEARNING PERIOD: New PMax campaigns need 1-2 weeks to optimize
      → Don't make major changes for the first 7 days
      → Google needs ~50 conversions to fully optimize
`)

  reviewData.recommendations.push(
    {
      priority: 'MEDIUM',
      category: 'TARGETING',
      issue: 'Audience signals not verified',
      suggestion: 'Add custom segments and interest categories to accelerate learning'
    },
    {
      priority: 'MEDIUM',
      category: 'TARGETING',
      issue: 'Search themes not verified',
      suggestion: 'Add 5-10 search themes related to media courses in Kenya'
    }
  )

  // Save to JSON
  const reportsDir = path.join(__dirname, '../../reports/google-ads')
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }

  const filename = `pmax-review-${campaignId}-${new Date().toISOString().split('T')[0]}.json`
  const filepath = path.join(reportsDir, filename)
  fs.writeFileSync(filepath, JSON.stringify(reviewData, null, 2))
  console.log(`\n📄 Report saved: ${filepath}`)

  return reviewData
}

// Run
const args = process.argv.slice(2)
const campaignIds = args.length > 0 ? args : ['23282289054']

;(async () => {
  for (const id of campaignIds) {
    await reviewPerformanceMaxCampaign(id)
    if (campaignIds.length > 1) {
      console.log('\n' + '='.repeat(80) + '\n')
    }
  }
  console.log('\n✅ Review complete!')
})().catch(e => {
  console.error('❌ Error:', e.message)
  process.exit(1)
})
