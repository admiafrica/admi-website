/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

/**
 * Meta Ads Direct API Access
 * Tests the access token and retrieves ad account information
 */

class MetaAdsDirect {
  constructor() {
    this.accessToken = process.env.META_ACCESS_TOKEN
    this.appId = process.env.META_APP_ID
    this.appSecret = process.env.META_APP_SECRET
    this.baseUrl = 'https://graph.instagram.com/v18.0'
  }

  async testConnection() {
    console.log('🧪 Testing Meta API Connection (User Token)')
    console.log('='.repeat(60))
    console.log('')

    if (!this.accessToken) {
      console.log('❌ META_ACCESS_TOKEN not found in .env')
      return false
    }

    try {
      console.log('Testing user token format: EACO...')
      console.log('Token starts with:', this.accessToken.substring(0, 20) + '...')
      console.log('')

      // For user tokens, use the /me endpoint
      const response = await fetch(`${this.baseUrl}/me?access_token=${this.accessToken}`)
      const data = await response.json()

      if (data.error) {
        console.log('❌ Token error:', data.error.message)
        console.log('Code:', data.error.code)
        return false
      }

      console.log('✅ Token is VALID!')
      console.log(`User ID: ${data.id}`)
      console.log(`User Name: ${data.name}`)
      console.log('')

      // Try to get ad accounts
      await this.getAdAccounts()
      return true
    } catch (error) {
      console.error('❌ Connection error:', error.message)
      return false
    }
  }

  async getAdAccounts() {
    console.log('📊 Retrieving ad accounts...')

    try {
      const response = await fetch(
        `${this.baseUrl}/me/adaccounts?fields=id,name,currency,account_status&access_token=${this.accessToken}`
      )

      const data = await response.json()

      if (data.error) {
        console.log('⚠️  Cannot retrieve accounts:', data.error.message)
        return
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No ad accounts found')
        console.log('   Create your first campaign at: https://business.facebook.com')
        return
      }

      console.log(`✅ Found ${data.data.length} ad account(s):`)
      data.data.forEach((account) => {
        console.log(`   • ${account.name} (${account.id})`)
        console.log(`     Status: ${account.account_status}`)
      })

      return data.data
    } catch (error) {
      console.error('❌ Error retrieving accounts:', error.message)
      return []
    }
  }

  async runTest() {
    const success = await this.testConnection()

    console.log('')
    console.log('='.repeat(60))

    if (!success) {
      console.log('❌ Connection test failed')
    } else {
      console.log('✅ Connection test successful!')
      console.log('')
      console.log('💡 Next steps:')
      console.log('1. Go to: https://business.facebook.com')
      console.log('2. Create campaign with $50 budget')
      console.log('3. Set landing page: https://admi.africa/enquiry')
      console.log('4. Run: npm run meta:analyze')
    }
  }
}

const tester = new MetaAdsDirect()
tester.runTest().catch(console.error)
