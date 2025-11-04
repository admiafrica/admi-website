/* eslint-disable @typescript-eslint/no-var-requires */
const { GoogleAdsApi } = require('google-ads-api')
const readline = require('readline')
const fs = require('fs')
require('dotenv').config()

/**
 * OAuth-based Google Ads Setup
 * This script helps you set up OAuth credentials for Google Ads API
 * Customer ID: 392-935-5931 (3929355931)
 */

class OAuthGoogleAdsSetup {
  constructor() {
    this.customerId = '3929355931'
    this.client = null
  }

  async setupOAuthCredentials() {
    console.log('🔐 Setting up OAuth credentials for Google Ads API...')
    console.log('Developer Token: ✅ Already configured')
    console.log('Customer ID: ✅ 392-935-5931')
    console.log('\n📋 Missing OAuth credentials needed:')
    console.log('1. GOOGLE_ADS_CLIENT_ID')
    console.log('2. GOOGLE_ADS_CLIENT_SECRET') 
    console.log('3. GOOGLE_ADS_REFRESH_TOKEN')
    
    console.log('\n🔧 To get these credentials:')
    console.log('1. Go to Google Cloud Console: https://console.developers.google.com/')
    console.log('2. Select project: admi-youtube-integration')
    console.log('3. APIs & Services → Credentials')
    console.log('4. Create OAuth 2.0 Client ID (Desktop Application)')
    console.log('5. Download the credentials JSON file')
    console.log('6. Run this script again to generate refresh token')
    
    // Check if we have OAuth credentials
    if (!process.env.GOOGLE_ADS_CLIENT_ID || !process.env.GOOGLE_ADS_CLIENT_SECRET) {
      console.log('\n❌ OAuth credentials not found in .env')
      console.log('\n💡 Add these to your .env file:')
      console.log('GOOGLE_ADS_CLIENT_ID=your_client_id_here')
      console.log('GOOGLE_ADS_CLIENT_SECRET=your_client_secret_here')
      console.log('GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token_here')
      return false
    }

    return true
  }

  async generateRefreshToken() {
    console.log('\n🔄 Generating refresh token...')

    try {
      // Use Google Auth Library for OAuth flow with local redirect
      const { OAuth2Client } = require('google-auth-library')
      const http = require('http')
      const url = require('url')

      const redirectUri = 'http://localhost:3000'

      const oauth2Client = new OAuth2Client(
        process.env.GOOGLE_ADS_CLIENT_ID,
        process.env.GOOGLE_ADS_CLIENT_SECRET,
        redirectUri
      )

      // Generate authorization URL
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/adwords',
        prompt: 'consent' // Force consent screen to get refresh token
      })

      console.log('\n🌐 Open this URL in your browser:')
      console.log(authUrl)
      console.log('\n📋 Steps:')
      console.log('1. Click the URL above')
      console.log('2. Sign in with your Google account')
      console.log('3. Grant permissions')
      console.log('4. You will be redirected to localhost:3000')
      console.log('5. The authorization code will be captured automatically')

      // Create a local server to capture the redirect
      const authCode = await new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
          const queryObject = url.parse(req.url, true).query

          if (queryObject.code) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(`
              <html>
                <body>
                  <h1>✅ Authorization Successful!</h1>
                  <p>You can close this window and return to the terminal.</p>
                  <script>setTimeout(() => window.close(), 3000)</script>
                </body>
              </html>
            `)
            server.close()
            resolve(queryObject.code)
          } else if (queryObject.error) {
            res.writeHead(400, { 'Content-Type': 'text/html' })
            res.end(`
              <html>
                <body>
                  <h1>❌ Authorization Failed</h1>
                  <p>Error: ${queryObject.error}</p>
                </body>
              </html>
            `)
            server.close()
            reject(new Error(`Authorization failed: ${queryObject.error}`))
          }
        })

        server.listen(3000, () => {
          console.log('\n🔄 Waiting for authorization... (local server started on port 3000)')
        })

        // Timeout after 5 minutes
        setTimeout(() => {
          server.close()
          reject(new Error('Authorization timeout'))
        }, 300000)
      })

      // Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(authCode)

      console.log('\n✅ Tokens generated successfully!')
      console.log('\n📝 Add this to your .env file:')
      console.log(`GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}`)

      // Save to a temporary file
      const tokenData = {
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token,
        generated_at: new Date().toISOString()
      }

      fs.writeFileSync('google-ads-tokens.json', JSON.stringify(tokenData, null, 2))
      console.log('\n💾 Tokens also saved to: google-ads-tokens.json')

      return tokens.refresh_token

    } catch (error) {
      console.error('❌ Failed to generate refresh token:', error.message)
      return null
    }
  }

  async testConnection() {
    console.log('\n🧪 Testing Google Ads API connection...')
    
    try {
      this.client = new GoogleAdsApi({
        client_id: process.env.GOOGLE_ADS_CLIENT_ID,
        client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
        developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
      })

      const customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
      })

      // Test query
      const customerQuery = `
        SELECT 
          customer.id,
          customer.descriptive_name,
          customer.currency_code,
          customer.time_zone
        FROM customer
        WHERE customer.id = ${this.customerId}
      `

      const result = await customer.query(customerQuery)
      
      if (result && result.length > 0) {
        const info = result[0].customer
        console.log('✅ Connection successful!')
        console.log(`📊 Account: ${info.descriptive_name}`)
        console.log(`💰 Currency: ${info.currency_code}`)
        console.log(`🌍 Timezone: ${info.time_zone}`)
        return true
      } else {
        console.log('❌ No customer data returned')
        return false
      }

    } catch (error) {
      console.error('❌ Connection test failed:', error.message)
      
      if (error.message.includes('DEVELOPER_TOKEN_NOT_APPROVED')) {
        console.log('\n💡 Developer token not approved yet:')
        console.log('1. Check your email for approval notification')
        console.log('2. Developer tokens can take 1-2 business days to approve')
        console.log('3. You can use a test account in the meantime')
      }
      
      return false
    }
  }

  async runSetup() {
    console.log('🚀 Google Ads API OAuth Setup for ADMI')
    console.log('Customer ID: 392-935-5931')
    console.log('=' .repeat(50))
    
    // Check current setup
    const hasOAuth = await this.setupOAuthCredentials()
    
    if (!hasOAuth) {
      console.log('\n🔧 Next steps:')
      console.log('1. Set up OAuth credentials in Google Cloud Console')
      console.log('2. Add CLIENT_ID and CLIENT_SECRET to .env')
      console.log('3. Run this script again to generate refresh token')
      return
    }

    // Check if we need to generate refresh token
    if (!process.env.GOOGLE_ADS_REFRESH_TOKEN || process.env.GOOGLE_ADS_REFRESH_TOKEN === 'your_refresh_token_here') {
      console.log('\n🔄 Generating refresh token...')
      const refreshToken = await this.generateRefreshToken()
      
      if (refreshToken) {
        console.log('\n✅ Setup complete!')
        console.log('Add the refresh token to your .env file and run the analysis script')
      }
      return
    }

    // Test existing connection
    const connectionWorks = await this.testConnection()
    
    if (connectionWorks) {
      console.log('\n🎉 Google Ads API is ready!')
      console.log('You can now run: node scripts/analytics/admi-google-ads-recovery-analysis.js')
    } else {
      console.log('\n❌ Connection failed')
      console.log('Check your credentials and developer token status')
    }
  }
}

// Alternative: Manual export instructions
function showManualExportInstructions() {
  console.log('\n📋 ALTERNATIVE: Manual Export Method')
  console.log('=' .repeat(50))
  console.log('If API setup is complex, you can export data manually:')
  console.log('\n1. Go to Google Ads: https://ads.google.com/aw/campaigns?ocid=3929355931')
  console.log('2. Click "Campaigns" tab')
  console.log('3. Set date range: Jan 1, 2024 - Nov 3, 2025')
  console.log('4. Click "Download" → "Export"')
  console.log('5. Save as CSV')
  console.log('\n🎯 Look for these campaigns:')
  console.log('- "Creative Media and Tech" (10,475 sessions in 2024)')
  console.log('- Campaign "1" (129,197 sessions - TOP PERFORMER)')
  console.log('- "Digital Content Creation" (6,656 sessions)')
  console.log('- "Data Analysis" (5,617 sessions)')
  console.log('\n📊 Check their status: Enabled/Paused/Removed')
  console.log('🚀 Reactivate paused campaigns immediately!')
}

// Run setup
if (require.main === module) {
  const setup = new OAuthGoogleAdsSetup()
  setup.runSetup()
    .then(() => {
      console.log('\n' + '='.repeat(50))
      showManualExportInstructions()
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Setup failed:', error.message)
      showManualExportInstructions()
      process.exit(1)
    })
}

module.exports = OAuthGoogleAdsSetup
