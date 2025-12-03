/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

/**
 * Meta Ads Direct API Access
 * For system user tokens and app tokens
 *
 * This script works with system user tokens that have the format:
 * APP_ID|APP_SECRET or system user tokens
 */

class MetaAdsDirect {
  constructor() {
    this.accessToken = process.env.META_ACCESS_TOKEN
    this.appId = process.env.META_APP_ID
    this.appSecret = process.env.META_APP_SECRET
    this.baseUrl = 'https://graph.instagram.com/v18.0'
  }

  async testConnection() {
    console.log('🧪 Testing Meta API Connection')
    console.log('='.repeat(60))
    console.log('')

    if (!this.userToken && !this.appToken) {
      console.log('❌ Neither META_USER_TOKEN nor META_APP_TOKEN found in .env')
      return false
    }

    const token = this.userToken || this.appToken
    const tokenType = this.userToken ? 'User Token' : 'App Token'

    try {
      // Try multiple endpoints to identify token type
      console.log(`Testing ${tokenType}...`)

      // Test endpoint
      const response = await fetch(`${this.baseUrl}/me?access_token=${token}`)
      const data = await response.json()

      if (data.error) {
        console.log('❌ Token error:', data.error.message)
        console.log('Code:', data.error.code)
        console.log('')
        console.log('💡 This might mean:')
        console.log('1. Token has expired (tokens last 60 days)')
        console.log("2. Token doesn't have proper permissions")
        console.log('3. Token format is invalid')
        return false
      }

      console.log('✅ Token is valid!')
      console.log(`ID: ${data.id}`)
      console.log(`Name: ${data.name}`)
      console.log('')
      return true
    } catch (error) {
      console.error('❌ Connection error:', error.message)
      return false
    }
  }

  async getAdAccounts() {
    console.log('\n📊 Retrieving ad accounts...')

    const token = this.userToken || this.appToken

    try {
      const response = await fetch(
        `${this.baseUrl}/me/adaccounts?fields=id,name,currency,spend_limit,account_status&access_token=${token}`
      )

      const data = await response.json()

      if (data.error) {
        console.log('⚠️  Cannot retrieve accounts:', data.error.message)
        console.log('')
        console.log("This is normal if you don't have proper system user permissions.")
        console.log('Try using Meta Ads Manager UI at: https://business.facebook.com')
        return []
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No ad accounts found')
        console.log('')
        console.log('This means either:')
        console.log('1. No campaigns have been created yet')
        console.log("2. Token doesn't have ads_management permission")
        return []
      }

      console.log(`✅ Found ${data.data.length} ad account(s):`)
      data.data.forEach((account) => {
        console.log(`  • ${account.name} (${account.id})`)
        console.log(`    Currency: ${account.currency}`)
        console.log(`    Status: ${account.account_status}`)
        console.log(`    Spend Limit: ${account.spend_limit}`)
      })

      return data.data
    } catch (error) {
      console.error('❌ Error retrieving accounts:', error.message)
      return []
    }
  }

  async getCampaigns(accountId) {
    console.log(`\n📈 Retrieving campaigns for ${accountId}...`)

    const token = this.userToken || this.appToken

    try {
      const response = await fetch(
        `${this.baseUrl}/${accountId}/campaigns?fields=id,name,status,objective,created_time,updated_time&access_token=${token}`
      )

      const data = await response.json()

      if (data.error) {
        console.log('⚠️  Cannot retrieve campaigns:', data.error.message)
        return []
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No campaigns found for this account')
        return []
      }

      console.log(`✅ Found ${data.data.length} campaign(s):`)
      data.data.forEach((campaign) => {
        console.log(`  • ${campaign.name} (${campaign.id})`)
        console.log(`    Status: ${campaign.status}`)
        console.log(`    Objective: ${campaign.objective}`)
      })

      return data.data
    } catch (error) {
      console.error('❌ Error retrieving campaigns:', error.message)
      return []
    }
  }

  async runTest() {
    const connected = await this.testConnection()

    if (!connected) {
      return
    }

    const accounts = await this.getAdAccounts()

    if (accounts.length > 0) {
      console.log('')
      console.log('💾 Saving account information...')
      const accountIds = accounts.map((a) => a.id)

      // Save first account ID
      if (accountIds.length > 0) {
        console.log(`Set META_AD_ACCOUNT_ID=${accountIds[0]} in .env to use account ID in scripts`)
      }

      // Try to get campaigns from first account
      if (accountIds.length > 0) {
        await this.getCampaigns(accountIds[0])
      }
    }

    console.log('')
    console.log('='.repeat(60))
    console.log('✅ Test complete!')
    console.log('')
    console.log('💡 Next steps:')
    console.log('1. If you see ad accounts, set META_AD_ACCOUNT_ID in .env')
    console.log('2. Create a campaign at: https://business.facebook.com')
    console.log('3. Use budget: $50 for testing')
    console.log('4. Set landing page: https://admi.africa/enquiry')
    console.log('5. Then run: npm run meta:monitor')
  }
}

const tester = new MetaAdsDirect()
tester.runTest().catch(console.error)
