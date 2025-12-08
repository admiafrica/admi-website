/**
 * Google Ads Keywords & Copy Audit
 * Reviews Search Campaign keywords and Performance Max ad copy
 * Goal: Identify low-quality keywords causing high CPA
 */

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const fs = require('fs')
const path = require('path')

const { GoogleAdsApi } = require('google-ads-api')

class GoogleAdsAudit {
  constructor() {
    this.customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, '')
    this.developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    this.clientId = process.env.GOOGLE_ADS_CLIENT_ID
    this.clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET
    this.refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN

    this.client = null
  }

  async initialize() {
    try {
      this.client = new GoogleAdsApi({
        developer_token: this.developerToken,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken
      })

      console.log('✅ Google Ads API initialized\n')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize Google Ads API:', error.message)
      return false
    }
  }

  async getSearchCampaigns() {
    console.log('📊 Fetching Search Campaigns...\n')

    try {
      const customer = this.client.Customer({
        customer_id: this.customerId
      })

      const campaigns = await customer.query(`
        SELECT
          campaign.id,
          campaign.name,
          campaign.status,
          metrics.cost_micros,
          metrics.conversions,
          metrics.click_through_rate,
          metrics.ctr
        FROM campaign
        WHERE campaign.advertising_channel_type = 'SEARCH'
          AND segments.date >= '2025-12-01'
        ORDER BY metrics.cost_micros DESC
      `)

      if (!campaigns || campaigns.length === 0) {
        console.log('⚠️  No Search campaigns found')
        return []
      }

      console.log(`✅ Found ${campaigns.length} Search campaign(s):\n`)
      campaigns.forEach((c, idx) => {
        const campaign = c.campaign
        const metrics = c.metrics
        console.log(`${idx + 1}. ${campaign.name}`)
        console.log(`   ID: ${campaign.id}`)
        console.log(`   Status: ${campaign.status}`)
        console.log(`   Cost: $${(metrics.cost_micros / 1000000).toFixed(2)}`)
        console.log(`   Conversions: ${Math.round(metrics.conversions)}`)
        console.log(`   CTR: ${metrics.ctr.toFixed(2)}%`)
        console.log('')
      })

      return campaigns
    } catch (error) {
      console.error('❌ Error fetching campaigns:', error.message)
      return []
    }
  }

  async getSearchKeywords(campaignId) {
    console.log(`🔑 Fetching Keywords for Campaign: ${campaignId}\n`)

    try {
      const customer = this.client.Customer({
        customer_id: this.customerId
      })

      const keywords = await customer.query(`
        SELECT
          ad_group.id,
          ad_group.name,
          ad_group_criterion.keyword.text,
          ad_group_criterion.keyword.match_type,
          ad_group_criterion.status,
          metrics.cost_micros,
          metrics.conversions,
          metrics.click_through_rate,
          metrics.impressions,
          metrics.clicks
        FROM ad_group_criterion
        WHERE campaign.id = ${campaignId}
          AND ad_group_criterion.type = 'KEYWORD'
          AND segments.date >= '2025-12-01'
        ORDER BY metrics.cost_micros DESC
      `)

      if (!keywords || keywords.length === 0) {
        console.log('⚠️  No keywords found for this campaign')
        return []
      }

      console.log(`✅ Found ${keywords.length} keyword(s):\n`)

      const keywordsList = []

      keywords.forEach((k, idx) => {
        const keyword = k.ad_group_criterion.keyword
        const metrics = k.metrics
        const cost = metrics.cost_micros / 1000000
        const conversions = Math.round(metrics.conversions)
        const cpa = conversions > 0 ? cost / conversions : 0

        console.log(`${idx + 1}. "${keyword.text}" [${keyword.match_type}]`)
        console.log(`   Ad Group: ${k.ad_group.name}`)
        console.log(`   Status: ${k.ad_group_criterion.status}`)
        console.log(`   Impressions: ${metrics.impressions}`)
        console.log(`   Clicks: ${metrics.clicks}`)
        console.log(`   CTR: ${metrics.click_through_rate.toFixed(2)}%`)
        console.log(`   Cost: $${cost.toFixed(2)}`)
        console.log(`   Conversions: ${conversions}`)
        if (conversions > 0) {
          console.log(`   CPA: $${cpa.toFixed(2)}`)
        }

        if (cpa > 20 || (metrics.clicks > 10 && conversions === 0)) {
          console.log(`   ⚠️  UNDERPERFORMING - Consider pausing`)
        }

        console.log('')

        keywordsList.push({
          text: keyword.text,
          matchType: keyword.match_type,
          status: k.ad_group_criterion.status,
          adGroup: k.ad_group.name,
          impressions: metrics.impressions,
          clicks: metrics.clicks,
          ctr: metrics.click_through_rate,
          cost: cost,
          conversions: conversions,
          cpa: cpa
        })
      })

      return keywordsList
    } catch (error) {
      console.error('❌ Error fetching keywords:', error.message)
      return []
    }
  }

  async getPerformanceMaxAssets() {
    console.log('📢 Fetching Performance Max Campaigns & Assets...\n')

    try {
      const customer = this.client.Customer({
        customer_id: this.customerId
      })

      // Get Performance Max campaigns
      const campaigns = await customer.query(`
        SELECT
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          metrics.cost_micros,
          metrics.conversions,
          metrics.click_through_rate
        FROM campaign
        WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
          AND segments.date >= '2025-12-01'
        ORDER BY metrics.cost_micros DESC
      `)

      if (!campaigns || campaigns.length === 0) {
        console.log('⚠️  No Performance Max campaigns found')
        return []
      }

      console.log(`✅ Found ${campaigns.length} Performance Max campaign(s):\n`)

      const pmCampaigns = []

      for (const c of campaigns) {
        const campaign = c.campaign
        const metrics = c.metrics
        const cost = metrics.cost_micros / 1000000
        const conversions = Math.round(metrics.conversions)
        const cpa = conversions > 0 ? cost / conversions : 0

        console.log(`📌 ${campaign.name}`)
        console.log(`   ID: ${campaign.id}`)
        console.log(`   Status: ${campaign.status}`)
        console.log(`   Cost: $${cost.toFixed(2)}`)
        console.log(`   Conversions: ${conversions}`)
        console.log(`   CPA: $${cpa.toFixed(2)}`)
        console.log(`   CTR: ${metrics.click_through_rate.toFixed(2)}%`)
        console.log('')

        // Fetch ad group assets
        try {
          const assetGroups = await customer.query(`
            SELECT
              asset_group.id,
              asset_group.name,
              asset_group.status,
              asset.id,
              asset.name,
              asset.type,
              asset_group_asset.asset_performance_label,
              asset_group_asset.status
            FROM asset_group_asset
            WHERE campaign.id = ${campaign.id}
            ORDER BY asset_group.id
          `)

          if (assetGroups && assetGroups.length > 0) {
            console.log(`   📁 Asset Groups: ${new Set(assetGroups.map((a) => a.asset_group.id)).size}`)

            assetGroups.slice(0, 5).forEach((ag) => {
              console.log(`      • ${ag.asset.type}: ${ag.asset.name}`)
              console.log(`        Status: ${ag.asset_group_asset.status}`)
            })

            if (assetGroups.length > 5) {
              console.log(`      ... and ${assetGroups.length - 5} more assets`)
            }
          }
        } catch (e) {
          console.log(`   (Asset details unavailable)`)
        }

        console.log('')

        pmCampaigns.push({
          name: campaign.name,
          id: campaign.id,
          status: campaign.status,
          cost: cost,
          conversions: conversions,
          cpa: cpa,
          ctr: metrics.click_through_rate
        })
      }

      return pmCampaigns
    } catch (error) {
      console.error('❌ Error fetching Performance Max campaigns:', error.message)
      return []
    }
  }

  async generateReport() {
    console.log('\n' + '='.repeat(80))
    console.log('🎯 GOOGLE ADS KEYWORDS & COPY AUDIT')
    console.log('='.repeat(80) + '\n')

    // Get Search campaigns
    const searchCampaigns = await this.getSearchCampaigns()

    if (searchCampaigns.length > 0) {
      console.log('\n' + '='.repeat(80))
      console.log('🔍 SEARCH CAMPAIGN KEYWORD ANALYSIS')
      console.log('='.repeat(80) + '\n')

      for (const campaign of searchCampaigns) {
        const keywords = await this.getSearchKeywords(campaign.campaign.id)

        // Identify underperformers
        const underperformers = keywords.filter(
          (k) => k.cpa > 20 || (k.clicks > 10 && k.conversions === 0)
        )

        if (underperformers.length > 0) {
          console.log(`⚠️  UNDERPERFORMING KEYWORDS (${underperformers.length}):\n`)
          underperformers.forEach((k) => {
            console.log(`   ❌ "${k.text}" [${k.matchType}]`)
            console.log(`      Clicks: ${k.clicks}, Conversions: ${k.conversions}, CPA: $${k.cpa.toFixed(2)}`)
          })
          console.log('')
        }
      }
    }

    // Get Performance Max campaigns
    console.log('\n' + '='.repeat(80))
    console.log('📢 PERFORMANCE MAX CAMPAIGNS')
    console.log('='.repeat(80) + '\n')

    const pmCampaigns = await this.getPerformanceMaxAssets()

    console.log('\n' + '='.repeat(80))
    console.log('✅ Audit Complete\n')

    return {
      searchCampaigns,
      pmCampaigns
    }
  }
}

async function main() {
  const audit = new GoogleAdsAudit()

  if (!audit.customerId || !audit.developerToken) {
    console.log('❌ Google Ads credentials missing')
    console.log('Required .env variables:')
    console.log('  - GOOGLE_ADS_CUSTOMER_ID')
    console.log('  - GOOGLE_ADS_DEVELOPER_TOKEN')
    console.log('  - GOOGLE_ADS_CLIENT_ID')
    console.log('  - GOOGLE_ADS_CLIENT_SECRET')
    console.log('  - GOOGLE_ADS_REFRESH_TOKEN\n')
    process.exit(1)
  }

  const initialized = await audit.initialize()
  if (!initialized) {
    process.exit(1)
  }

  try {
    await audit.generateReport()
  } catch (error) {
    console.error('Error during audit:', error)
    process.exit(1)
  }
}

main()
