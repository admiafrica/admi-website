#!/usr/bin/env node

/**
 * Google Ads OAuth Flow Generator
 * Generates refresh token for Google Ads API access
 */

const { OAuth2Client } = require('google-auth-library')
const http = require('http')
const url = require('url')
const open = require('open')
const destroyer = require('server-destroy')
require('dotenv').config()

const SCOPES = ['https://www.googleapis.com/auth/adwords']
const REDIRECT_URI = 'http://localhost:3000/oauth2callback'

async function getRefreshToken() {
  console.log('🔐 Google Ads OAuth Flow - Refresh Token Generator\n')

  // Check for required credentials
  if (!process.env.GOOGLE_ADS_CLIENT_ID || !process.env.GOOGLE_ADS_CLIENT_SECRET) {
    console.error('❌ Missing credentials in .env file:')
    console.error('   Required: GOOGLE_ADS_CLIENT_ID')
    console.error('   Required: GOOGLE_ADS_CLIENT_SECRET\n')
    console.error('💡 Setup instructions:')
    console.error('   1. Go to: https://console.cloud.google.com/')
    console.error('   2. Navigate to: APIs & Services → Credentials')
    console.error('   3. Create OAuth 2.0 Client ID (Web application)')
    console.error('   4. Add redirect URI: http://localhost:3000/oauth2callback')
    console.error('   5. Copy Client ID and Secret to .env file\n')
    process.exit(1)
  }

  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_ADS_CLIENT_ID,
    process.env.GOOGLE_ADS_CLIENT_SECRET,
    REDIRECT_URI
  )

  // Generate authorization URL
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent' // Force to get refresh token
  })

  console.log('📋 Step 1: Opening browser for Google authentication...')
  console.log('If browser doesn\'t open, visit this URL:\n')
  console.log(authorizeUrl + '\n')

  // Create local server to receive OAuth callback
  const server = http.createServer(async (req, res) => {
    try {
      if (req.url.indexOf('/oauth2callback') > -1) {
        const qs = new url.URL(req.url, 'http://localhost:3000').searchParams
        const code = qs.get('code')

        console.log('\n✅ Authorization code received!')
        console.log('📋 Step 2: Exchanging code for tokens...')

        res.end('✅ Authentication successful! You can close this window.')

        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code)
        
        console.log('\n🎉 Success! Your refresh token:\n')
        console.log('─'.repeat(80))
        console.log(tokens.refresh_token)
        console.log('─'.repeat(80))
        console.log('\n📋 Step 3: Add this to your .env file:')
        console.log(`GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}\n`)
        
        if (tokens.access_token) {
          console.log('💡 Access token also generated (expires in 1 hour):')
          console.log(tokens.access_token.substring(0, 50) + '...\n')
        }

        server.destroy()
      }
    } catch (e) {
      console.error('❌ Error during OAuth flow:', e.message)
      server.destroy()
    }
  }).listen(3000, () => {
    console.log('🌐 Local server started on http://localhost:3000')
    console.log('⏳ Waiting for authentication...\n')
    
    // Open browser
    open(authorizeUrl, { wait: false }).then(cp => cp.unref())
  })

  destroyer(server)
}

// Run the OAuth flow
getRefreshToken().catch(console.error)
