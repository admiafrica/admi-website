/**
 * Google Ads API Audit (REST)
 * Reviews Search keywords and Performance Max copy
 */

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const fs = require('fs')
const https = require('https')

class GoogleAdsRestAudit {
  constructor() {
    this.customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, '')
    this.developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    this.clientId = process.env.GOOGLE_ADS_CLIENT_ID
    this.clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET
    this.refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN
  }

  async getAccessToken() {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token'
      })

      const options = {
        hostname: 'oauth2.googleapis.com',
        port: 443,
        path: '/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        }
      }

      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          try {
            const json = JSON.parse(data)
            resolve(json.access_token)
          } catch (e) {
            reject(new Error(`Failed to parse token: ${data}`))
          }
        })
      })

      req.on('error', reject)
      req.write(postData)
      req.end()
    })
  }

  async googleAdsQuery(query) {
    try {
      const token = await this.getAccessToken()

      return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
          query: query
        })

        const options = {
          hostname: 'googleads.googleapis.com',
          port: 443,
          path: `/v14/customers/${this.customerId}/googleAds:search`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
            'developer-token': this.developerToken,
            'authorization': `Bearer ${token}`
          }
        }

        const req = https.request(options, (res) => {
          let data = ''
          res.on('data', (chunk) => {
            data += chunk
          })
          res.on('end', () => {
            try {
              const json = JSON.parse(data)
              if (json.error) {
                reject(new Error(json.error.message || JSON.stringify(json.error)))
              } else {
                resolve(json.results || [])
              }
            } catch (e) {
              reject(new Error(`Parse error: ${data}`))
            }
          })
        })

        req.on('error', reject)
        req.write(postData)
        req.end()
      })
    } catch (error) {
      throw error
    }
  }

  async getSearchCampaigns() {
    console.log('📊 Fetching Search Campaigns...\n')

    try {
      const query = `
        SELECT campaign.id, campaign.name, campaign.status, 
               metrics.cost_micros, metrics.conversions, metrics.ctr
        FROM campaign
        WHERE campaign.advertising_channel_type = 'SEARCH'
          AND segments.date >= '2025-12-01'
        ORDER BY metrics.cost_micros DESC
        LIMIT 10
      `

      const results = await this.googleAdsQuery(query)

      if (!results || results.length === 0) {
        console.log('⚠️  No Search campaigns found\n')
        return []
      }

      console.log(`✅ Found ${results.length} Search campaign(s):\n`)

      results.forEach((row, idx) => {
        const campaign = row.campaign
        const metrics = row.metrics
        console.log(`${idx + 1}. ${campaign.name}`)
        console.log(`   ID: ${campaign.id}`)
        console.log(`   Status: ${campaign.status}`)
        if (metrics) {
          console.log(`   Cost: $${(metrics.cost_micros / 1000000).toFixed(2)}`)
          console.log(`   Conversions: ${Math.round(metrics.conversions || 0)}`)
          console.log(`   CTR: ${(metrics.ctr * 100).toFixed(2)}%`)
        }
        console.log('')
      })

      return results
    } catch (error) {
      console.error('❌ Error fetching campaigns:', error.message)
      return []
    }
  }

  async getSearchKeywords() {
    console.log('🔑 Fetching Search Keywords...\n')

    try {
      const query = `
        SELECT ad_group.name, 
               ad_group_criterion.keyword.text,
               ad_group_criterion.keyword.match_type,
               ad_group_criterion.status,
               metrics.cost_micros, metrics.conversions, metrics.ctr,
               metrics.impressions, metrics.clicks
        FROM ad_group_criterion
        WHERE campaign.advertising_channel_type = 'SEARCH'
          AND ad_group_criterion.type = 'KEYWORD'
          AND segments.date >= '2025-12-01'
        ORDER BY metrics.cost_micros DESC
        LIMIT 50
      `

      const results = await this.googleAdsQuery(query)

      if (!results || results.length === 0) {
        console.log('⚠️  No keywords found\n')
        return []
      }

      console.log(`✅ Found ${results.length} keyword(s):\n`)

      const keywords = []

      results.forEach((row, idx) => {
        const keyword = row.ad_group_criterion.keyword
        const metrics = row.metrics
        const cost = metrics.cost_micros / 1000000
        const conversions = Math.round(metrics.conversions || 0)
        const cpa = conversions > 0 ? cost / conversions : 0

        console.log(`${idx + 1}. "${keyword.text}" [${keyword.match_type}]`)
        console.log(`   Ad Group: ${row.ad_group.name}`)
        console.log(`   Status: ${row.ad_group_criterion.status}`)
        console.log(`   Impressions: ${metrics.impressions}`)
        console.log(`   Clicks: ${metrics.clicks}`)
        console.log(`   CTR: ${(metrics.ctr * 100).toFixed(2)}%`)
        console.log(`   Cost: $${cost.toFixed(2)}`)
        console.log(`   Conversions: ${conversions}`)

        if (conversions > 0) {
          console.log(`   CPA: $${cpa.toFixed(2)}`)
        }

        // Flag underperformers
        if (cpa > 20 || (metrics.clicks > 10 && conversions === 0)) {
          console.log(`   ⚠️  UNDERPERFORMING - Consider pausing`)
          keywords.push({
            text: keyword.text,
            matchType: keyword.match_type,
            status: 'UNDERPERFORMER',
            cpa: cpa,
            clicks: metrics.clicks,
            conversions: conversions
          })
        }

        console.log('')
      })

      return keywords
    } catch (error) {
      console.error('❌ Error fetching keywords:', error.message)
      return []
    }
  }

  async getPerformanceMaxCampaigns() {
    console.log('📢 Fetching Performance Max Campaigns...\n')

    try {
      const query = `
        SELECT campaign.id, campaign.name, campaign.status,
               metrics.cost_micros, metrics.conversions, metrics.ctr
        FROM campaign
        WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
          AND segments.date >= '2025-12-01'
        ORDER BY metrics.cost_micros DESC
        LIMIT 10
      `

      const results = await this.googleAdsQuery(query)

      if (!results || results.length === 0) {
        console.log('⚠️  No Performance Max campaigns found\n')
        return []
      }

      console.log(`✅ Found ${results.length} Performance Max campaign(s):\n`)

      results.forEach((row, idx) => {
        const campaign = row.campaign
        const metrics = row.metrics
        const cost = metrics.cost_micros / 1000000
        const conversions = Math.round(metrics.conversions || 0)
        const cpa = conversions > 0 ? cost / conversions : 0

        console.log(`${idx + 1}. ${campaign.name}`)
        console.log(`   ID: ${campaign.id}`)
        console.log(`   Status: ${campaign.status}`)
        console.log(`   Cost: $${cost.toFixed(2)}`)
        console.log(`   Conversions: ${conversions}`)
        console.log(`   CPA: $${cpa.toFixed(2)}`)
        console.log(`   CTR: ${(metrics.ctr * 100).toFixed(2)}%`)
        console.log('')
      })

      return results
    } catch (error) {
      console.error('❌ Error fetching campaigns:', error.message)
      return []
    }
  }

  async runAudit() {
    console.log('\n' + '='.repeat(80))
    console.log('🎯 GOOGLE ADS KEYWORDS & COPY AUDIT')
    console.log('='.repeat(80) + '\n')

    // Get Search campaigns
    const searchCampaigns = await this.getSearchCampaigns()

    console.log('='.repeat(80))
    // Get Search keywords
    const underperformingKeywords = await this.getSearchKeywords()

    console.log('='.repeat(80))
    console.log('📊 SUMMARY - UNDERPERFORMING KEYWORDS')
    console.log('='.repeat(80) + '\n')

    if (underperformingKeywords.length > 0) {
      console.log(`Found ${underperformingKeywords.length} underperforming keyword(s):\n`)
      underperformingKeywords.forEach((k) => {
        console.log(`❌ "${k.text}" [${k.matchType}]`)
        console.log(`   Clicks: ${k.clicks}, Conversions: ${k.conversions}, CPA: $${k.cpa.toFixed(2)}\n`)
      })

      console.log('💡 RECOMMENDATIONS:')
      console.log('1. Pause keywords with CPA > $20')
      console.log('2. Increase bids for high-CTR, high-conversion keywords')
      console.log('3. Create search-specific landing pages')
      console.log('4. Implement negative keywords to filter low-intent traffic\n')
    } else {
      console.log('✅ No significant underperformers found in Search campaign\n')
    }

    // Get Performance Max campaigns
    console.log('='.repeat(80))
    const pmCampaigns = await this.getPerformanceMaxCampaigns()

    console.log('\n' + '='.repeat(80))
    console.log('✅ Audit Complete\n')
  }
}

async function main() {
  const audit = new GoogleAdsRestAudit()

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

  try {
    await audit.runAudit()
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main()
