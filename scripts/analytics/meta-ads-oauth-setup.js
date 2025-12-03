/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Meta Ads OAuth Setup
 * Sets up OAuth credentials for Meta Ads Manager API
 * This script handles the OAuth flow to get access tokens
 *
 * Business Context:
 * - Pre-qualification form on https://admi.africa/enquiry
 * - Target: 150 qualified students with $1,600 budget
 * - Meta retargeting budget: $400 (40-50 expected enrollments)
 */

class MetaAdsOAuthSetup {
  constructor() {
    this.appId = process.env.META_APP_ID
    this.appSecret = process.env.META_APP_SECRET
    this.redirectUri = 'http://localhost:3001/meta-callback'
    this.businessAccountId = process.env.META_BUSINESS_ACCOUNT_ID
  }

  async setupOAuthCredentials() {
    console.log('🔐 Setting up OAuth credentials for Meta Ads API...')
    console.log('='.repeat(60))

    // Check if we have app credentials
    if (!this.appId || !this.appSecret) {
      console.log('\n❌ Meta App credentials not found in .env')
      console.log('\n📋 Required environment variables:')
      console.log('META_APP_ID=your_app_id')
      console.log('META_APP_SECRET=your_app_secret')
      console.log('META_BUSINESS_ACCOUNT_ID=your_business_account_id (optional)')

      console.log('\n🔧 To get these credentials:')
      console.log('1. Go to Meta Developers: https://developers.facebook.com')
      console.log('2. Create a new app or select existing one')
      console.log('3. Add "Ads Manager" product to your app')
      console.log('4. Navigate to Settings → Basic to find App ID and Secret')
      console.log('5. Go to Roles → Advertiser Roles → Add Assets to find Business Account ID')
      return false
    }

    console.log('✅ Meta App credentials found')
    console.log(`App ID: ${this.appId.substring(0, 10)}...`)
    return true
  }

  async generateAccessToken() {
    console.log('\n🔄 Generating Meta access token...')

    try {
      const authUrl =
        'https://www.facebook.com/v18.0/dialog/oauth?' +
        `client_id=${this.appId}` +
        `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
        '&scope=ads_management,ads_read' +
        `&state=security_token_${Date.now()}` +
        '&response_type=code'

      console.log('\n🌐 Open this URL in your browser:')
      console.log(authUrl)
      console.log('\n📋 Steps:')
      console.log('1. Click the link above or copy-paste into browser')
      console.log('2. Authorize the app to access Meta Ads')
      console.log('3. You will be redirected to http://localhost:3001/')
      console.log('4. The access token will be displayed and saved to .env')

      return new Promise((resolve, reject) => {
        const server = http.createServer(async (req, res) => {
          try {
            const queryUrl = new url.URL(req.url, 'http://localhost:3001')
            const code = queryUrl.searchParams.get('code')

            if (code) {
              console.log('\n✅ Authorization code received!')

              // Exchange code for access token
              const tokenResponse = await this.exchangeCodeForToken(code)

              if (tokenResponse.access_token) {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(`
                  <html>
                    <body style="font-family: Arial; padding: 20px;">
                      <h1>✅ Authorization Successful!</h1>
                      <p>Your Meta Ads access token has been generated and saved to .env</p>
                      <p>You can close this window.</p>
                    </body>
                  </html>
                `)
                server.close()
                resolve(tokenResponse.access_token)
              } else {
                throw new Error('No access token in response')
              }
            } else if (queryUrl.searchParams.get('error')) {
              const error = queryUrl.searchParams.get('error')
              const errorDescription = queryUrl.searchParams.get('error_description')
              throw new Error(`Auth error: ${error} - ${errorDescription}`)
            } else {
              res.writeHead(400, { 'Content-Type': 'text/html' })
              res.end(`
                <html>
                  <body style="font-family: Arial; padding: 20px;">
                    <h1>❌ Authorization Failed</h1>
                    <p>No authorization code received</p>
                  </body>
                </html>
              `)
              server.close()
              reject(new Error('No authorization code received'))
            }
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' })
            res.end(`<h1>Error: ${error.message}</h1>`)
            server.close()
            reject(error)
          }
        })

        server.listen(3001, () => {
          console.log('\n🔄 Waiting for authorization... (local server started on port 3001)')
        })

        // Timeout after 5 minutes
        setTimeout(() => {
          server.close()
          reject(new Error('Authorization timeout'))
        }, 300000)
      })
    } catch (error) {
      console.error('❌ Token generation failed:', error.message)
      throw error
    }
  }

  async exchangeCodeForToken(code) {
    console.log('📋 Exchanging authorization code for access token...')

    try {
      const response = await fetch('https://graph.instagram.com/v18.0/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: this.appId,
          client_secret: this.appSecret,
          redirect_uri: this.redirectUri,
          code: code
        }).toString()
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(`Meta API error: ${data.error.message}`)
      }

      console.log('✅ Access token obtained successfully')
      return data
    } catch (error) {
      console.error('❌ Token exchange failed:', error.message)
      throw error
    }
  }

  async saveAccessToken(accessToken) {
    console.log('\n💾 Saving access token to .env...')

    try {
      const envPath = path.join(process.cwd(), '.env')
      let envContent = ''

      // Read existing .env if it exists
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8')
      }

      // Update or add META_ACCESS_TOKEN
      const lines = envContent.split('\n')
      let found = false

      const updatedLines = lines.map((line) => {
        if (line.startsWith('META_ACCESS_TOKEN=')) {
          found = true
          return `META_ACCESS_TOKEN=${accessToken}`
        }
        return line
      })

      if (!found) {
        updatedLines.push(`META_ACCESS_TOKEN=${accessToken}`)
      }

      fs.writeFileSync(envPath, updatedLines.join('\n'), 'utf8')
      console.log('✅ .env file updated with META_ACCESS_TOKEN')
    } catch (error) {
      console.error('❌ Failed to save token:', error.message)
      console.log('\n📋 Manually add this to your .env file:')
      console.log(`META_ACCESS_TOKEN=${accessToken}`)
      throw error
    }
  }

  async testConnection() {
    console.log('\n🧪 Testing Meta Ads API connection...')

    try {
      const accessToken = process.env.META_ACCESS_TOKEN

      if (!accessToken) {
        console.log('❌ No META_ACCESS_TOKEN found in .env')
        return false
      }

      // Test with a simple graph API call
      const response = await fetch(
        `https://graph.instagram.com/v18.0/me?fields=id,name,email&access_token=${accessToken}`
      )

      const data = await response.json()

      if (data.error) {
        console.log('❌ Connection test failed:', data.error.message)
        if (data.error.type === 'OAuthException') {
          console.log('\n💡 Token may have expired. Run setup again to refresh.')
        }
        return false
      }

      console.log('✅ Connection successful!')
      console.log(`User: ${data.name} (${data.id})`)
      return true
    } catch (error) {
      console.error('❌ Connection test failed:', error.message)
      return false
    }
  }

  async runSetup() {
    console.log('🚀 Meta Ads API OAuth Setup for ADMI')
    console.log('='.repeat(60))
    console.log('\n📊 Campaign Goals:')
    console.log('• Target: 150 qualified students with $1,600 budget')
    console.log('• Meta retargeting: $400 budget, 40-50 expected enrollments')
    console.log('• Focus: Website visitors with pre-qualification form data')

    // Check current setup
    const hasOAuth = await this.setupOAuthCredentials()

    if (!hasOAuth) {
      console.log('\n🔧 Next steps:')
      console.log('1. Set up OAuth credentials in Meta Developers')
      console.log('2. Add META_APP_ID and META_APP_SECRET to .env')
      console.log('3. Run this script again to generate access token')
      return
    }

    // Check if we need to generate access token
    if (!process.env.META_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN === 'your_access_token_here') {
      console.log('\n🔄 Generating access token...')

      try {
        const accessToken = await this.generateAccessToken()
        await this.saveAccessToken(accessToken)

        console.log('\n✅ Setup complete!')
        console.log('You can now run: npm run meta:test')
      } catch (error) {
        console.error('\n❌ Setup failed:', error.message)
        return
      }
    }

    // Test existing connection
    const connectionWorks = await this.testConnection()

    if (connectionWorks) {
      console.log('\n🎉 Meta Ads API is ready!')
      console.log('You can now run:')
      console.log('  npm run meta:analyze     - Analyze campaign performance')
      console.log('  npm run meta:monitor     - Monitor campaign metrics')
      console.log('  npm run meta:create-audience  - Create retargeting audiences')
    } else {
      console.log('\n❌ Connection failed')
      console.log('Check your credentials and try again')
    }
  }
}

// Run setup
if (require.main === module) {
  const setup = new MetaAdsOAuthSetup()
  setup
    .runSetup()
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error.message)
      process.exit(1)
    })
}

module.exports = MetaAdsOAuthSetup
