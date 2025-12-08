/**
 * Meta Ads Campaign Performance Analyzer
 * Pulls current campaign data for ADMI remarketing campaigns
 * Goal: Analyze performance for $10 CPA optimization
 */

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

class MetaCampaignAnalyzer {
  constructor() {
    this.accessToken = process.env.META_ACCESS_TOKEN
    this.businessAccountId = process.env.META_BUSINESS_ACCOUNT_ID
    this.pixelId = process.env.META_PIXEL_ID
    this.baseUrl = 'https://graph.instagram.com/v18.0'
    this.missingCredentials = []
  }

  validateCredentials() {
    console.log('\n' + '='.repeat(80))
    console.log('🔐 CREDENTIALS CHECK')
    console.log('='.repeat(80) + '\n')

    if (!this.accessToken) {
      this.missingCredentials.push('META_ACCESS_TOKEN')
      console.log('❌ META_ACCESS_TOKEN not set in .env')
    } else {
      console.log('✅ META_ACCESS_TOKEN found')
    }

    if (!this.businessAccountId) {
      this.missingCredentials.push('META_BUSINESS_ACCOUNT_ID')
      console.log('❌ META_BUSINESS_ACCOUNT_ID not set in .env')
    } else {
      console.log('✅ META_BUSINESS_ACCOUNT_ID found')
    }

    if (!this.pixelId) {
      this.missingCredentials.push('META_PIXEL_ID')
      console.log('❌ META_PIXEL_ID not set in .env')
    } else {
      console.log('✅ META_PIXEL_ID found')
    }

    return this.missingCredentials.length === 0
  }

  async testConnection() {
    console.log('\n🔗 Testing Meta API Connection...\n')

    try {
      const response = await fetch(
        `${this.baseUrl}/me?fields=id,name,email&access_token=${this.accessToken}`
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(`Meta API Error: ${data.error.message}`)
      }

      console.log('✅ Connection successful!')
      console.log(`   User: ${data.name || 'Unknown'}`)
      console.log(`   ID: ${data.id}\n`)
      return true
    } catch (error) {
      console.error('❌ Connection failed:', error.message)
      return false
    }
  }

  async getAdAccounts() {
    console.log('📊 Fetching Ad Accounts...\n')

    try {
      const response = await fetch(
        `${this.baseUrl}/me/adaccounts?fields=id,name,currency,spend_limit,account_status,created_time&limit=100&access_token=${this.accessToken}`
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No ad accounts found')
        console.log('   → Create your first campaign at: https://ads.facebook.com\n')
        return []
      }

      console.log(`✅ Found ${data.data.length} ad account(s):\n`)
      data.data.forEach((account, idx) => {
        console.log(`${idx + 1}. ${account.name}`)
        console.log(`   ID: ${account.id}`)
        console.log(`   Status: ${account.account_status}`)
        console.log(`   Currency: ${account.currency}`)
        if (account.spend_limit) {
          console.log(`   Spend Limit: ${account.currency} ${account.spend_limit}`)
        }
        console.log('')
      })

      return data.data
    } catch (error) {
      console.error('❌ Error fetching accounts:', error.message)
      return []
    }
  }

  async getCampaigns(accountId) {
    console.log(`📈 Fetching Campaigns for Account: ${accountId}\n`)

    try {
      const response = await fetch(
        `${this.baseUrl}/${accountId}/campaigns?fields=id,name,status,objective,updated_time,created_time,campaign_spec,insights.date_preset(last_7d){spend,impressions,clicks,actions}&limit=100&access_token=${this.accessToken}`
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No campaigns found for this account\n')
        return []
      }

      console.log(`✅ Found ${data.data.length} campaign(s):\n`)

      const campaigns = []

      data.data.forEach((campaign, idx) => {
        console.log(`${idx + 1}. ${campaign.name}`)
        console.log(`   ID: ${campaign.id}`)
        console.log(`   Status: ${campaign.status}`)
        console.log(`   Objective: ${campaign.objective}`)
        console.log(`   Created: ${new Date(campaign.created_time).toLocaleDateString()}`)
        console.log(`   Updated: ${new Date(campaign.updated_time).toLocaleDateString()}`)

        if (campaign.insights && campaign.insights.data.length > 0) {
          const insight = campaign.insights.data[0]
          console.log(`   Last 7 Days:`)
          console.log(`     Spend: $${(parseFloat(insight.spend) || 0).toFixed(2)}`)
          console.log(`     Impressions: ${insight.impressions || 0}`)
          console.log(`     Clicks: ${insight.clicks || 0}`)

          const conversions = insight.actions
            ? insight.actions.filter((a) => a.action_type === 'offsite_conversion.fb_pixel_purchase').reduce((sum, a) => sum + parseInt(a.value), 0)
            : 0

          console.log(`     Conversions: ${conversions}`)

          if (conversions > 0 && parseFloat(insight.spend) > 0) {
            const cpa = parseFloat(insight.spend) / conversions
            console.log(`     CPA: $${cpa.toFixed(2)}`)
          }
        }

        console.log('')

        campaigns.push({
          id: campaign.id,
          name: campaign.name,
          status: campaign.status,
          objective: campaign.objective,
          insights: campaign.insights?.data[0] || {}
        })
      })

      return campaigns
    } catch (error) {
      console.error('❌ Error fetching campaigns:', error.message)
      return []
    }
  }

  async runFullAnalysis() {
    console.log('\n' + '='.repeat(80))
    console.log('🎯 META ADS CAMPAIGN PERFORMANCE ANALYZER')
    console.log('='.repeat(80))

    // Step 1: Validate credentials
    if (!this.validateCredentials()) {
      console.log('\n' + '='.repeat(80))
      console.log('⚠️  SETUP REQUIRED')
      console.log('='.repeat(80))
      console.log('\n📋 Missing Credentials:')
      this.missingCredentials.forEach((cred) => {
        console.log(`   • ${cred}`)
      })

      console.log('\n🔧 To set up Meta Ads API:')
      console.log('\n1. Go to: https://developers.facebook.com')
      console.log('2. Create a new app or select existing app')
      console.log('3. Add "Ads Manager" product to your app')
      console.log('4. Get App ID & Secret from Settings → Basic')
      console.log('5. Add to .env:')
      console.log('   META_APP_ID=your_app_id_here')
      console.log('   META_APP_SECRET=your_app_secret_here')
      console.log('\n6. Then run: npm run meta:setup')
      console.log('   (This generates META_ACCESS_TOKEN automatically)')

      console.log('\n7. Get Business Account ID from:')
      console.log('   https://business.facebook.com → Settings')
      console.log('\n8. Get Pixel ID from:')
      console.log('   https://business.facebook.com → Events Manager')

      console.log('\n💡 Alternative: If you have a long-lived access token:')
      console.log('   npm run meta:manual-token\n')
      return false
    }

    // Step 2: Test connection
    const connected = await this.testConnection()
    if (!connected) {
      console.log('\n❌ Cannot connect to Meta API. Check your access token.')
      return false
    }

    // Step 3: Get accounts
    const accounts = await this.getAdAccounts()
    if (accounts.length === 0) {
      console.log('No accounts to analyze')
      return false
    }

    // Step 4: Get campaigns for each account
    console.log('='.repeat(80))
    console.log('📊 CAMPAIGN PERFORMANCE SUMMARY')
    console.log('='.repeat(80) + '\n')

    let totalSpend = 0
    let totalImpressions = 0
    let totalClicks = 0
    let totalConversions = 0

    for (const account of accounts) {
      const campaigns = await this.getCampaigns(account.id)

      campaigns.forEach((campaign) => {
        const insight = campaign.insights
        if (insight && Object.keys(insight).length > 0) {
          totalSpend += parseFloat(insight.spend) || 0
          totalImpressions += parseInt(insight.impressions) || 0
          totalClicks += parseInt(insight.clicks) || 0
        }
      })
    }

    console.log('\n' + '='.repeat(80))
    console.log('💰 AGGREGATED METRICS (Last 7 Days)')
    console.log('='.repeat(80) + '\n')
    console.log(`Total Spend:        $${totalSpend.toFixed(2)}`)
    console.log(`Total Impressions:  ${totalImpressions.toLocaleString()}`)
    console.log(`Total Clicks:       ${totalClicks.toLocaleString()}`)

    if (totalImpressions > 0) {
      const ctr = (totalClicks / totalImpressions) * 100
      console.log(`CTR:                ${ctr.toFixed(2)}%`)
    }

    if (totalClicks > 0) {
      const cpc = totalSpend / totalClicks
      console.log(`CPC:                $${cpc.toFixed(2)}`)
    }

    console.log('\n' + '='.repeat(80))
    console.log('✅ Analysis Complete\n')

    return true
  }
}

async function main() {
  const analyzer = new MetaCampaignAnalyzer()
  await analyzer.runFullAnalysis()
}

main().catch(console.error)
