/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Meta Ads Manual Token Setup
 * Alternative to OAuth flow - use long-lived token from Meta Business Suite
 *
 * This script helps you generate or paste a long-lived access token
 * without needing the browser OAuth callback flow
 */

class MetaManualTokenSetup {
  constructor() {
    this.appId = process.env.META_APP_ID
    this.appSecret = process.env.META_APP_SECRET
    this.envPath = path.join(__dirname, '../../.env')
  }

  async generateLongLivedToken(userToken) {
    console.log('\n🔄 Exchanging user token for long-lived token...')

    try {
      const params = new URLSearchParams({
        grant_type: 'fb_exchange_token',
        client_id: this.appId,
        client_secret: this.appSecret,
        fb_exchange_token: userToken
      })

      const exchangeResponse = await fetch(`https://graph.instagram.com/v18.0/oauth/access_token?${params.toString()}`)

      if (!exchangeResponse.ok) {
        throw new Error(`Token exchange failed: ${exchangeResponse.statusText}`)
      }

      const data = await exchangeResponse.json()

      if (data.error) {
        throw new Error(`Meta API error: ${data.error.message}`)
      }

      return data.access_token
    } catch (error) {
      console.log('\n⚠️  Token exchange skipped (optional)')
      console.log('Your token will be used as-is')
      return userToken
    }
  }

  updateEnvFile(token) {
    console.log('\n💾 Updating .env file...')

    try {
      let envContent = fs.readFileSync(this.envPath, 'utf-8')

      // Check if META_ACCESS_TOKEN exists
      if (envContent.includes('META_ACCESS_TOKEN=')) {
        // Replace existing token
        envContent = envContent.replace(/META_ACCESS_TOKEN=.*/, `META_ACCESS_TOKEN=${token}`)
      } else {
        // Append new token
        if (!envContent.endsWith('\n')) {
          envContent += '\n'
        }
        envContent += `META_ACCESS_TOKEN=${token}\n`
      }

      fs.writeFileSync(this.envPath, envContent)
      console.log('✅ Token saved to .env')
      return true
    } catch (error) {
      console.log(`❌ Error updating .env: ${error.message}`)
      console.log('\n📝 Manual setup - Add this to your .env file:')
      console.log(`META_ACCESS_TOKEN=${token}`)
      return false
    }
  }

  async testConnection(token) {
    console.log('\n🧪 Testing Meta API connection...')

    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me?fields=id,name,email&access_token=${token}`)

      if (!response.ok) {
        throw new Error(`API test failed: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(`Meta API error: ${data.error.message}`)
      }

      console.log('✅ Connection successful!')
      console.log(`   User: ${data.name || 'Unknown'}`)
      console.log(`   ID: ${data.id}`)
      return true
    } catch (error) {
      console.log(`⚠️  Connection test failed: ${error.message}`)
      console.log('   (Token may still be valid - try running npm run meta:test)')
      return false
    }
  }

  printInstructions() {
    console.log('\n' + '='.repeat(70))
    console.log('📖 HOW TO GET YOUR META ACCESS TOKEN')
    console.log('='.repeat(70))

    console.log('\n🔗 METHOD 1: Using Meta Business Suite (Recommended)')
    console.log('────────────────────────────────────────────────────')
    console.log('1. Go to https://business.facebook.com')
    console.log('2. Navigate to Settings → User Settings (top right)')
    console.log('3. Go to Apps and Websites → Logged in with Facebook')
    console.log('4. Find your app and click it')
    console.log('5. Look for access token in the URL or use Graph API Explorer')
    console.log('6. Copy the token and paste below')

    console.log('\n🔗 METHOD 2: Using Graph API Explorer')
    console.log('────────────────────────────────────────────────────')
    console.log('1. Go to https://developers.facebook.com/tools/explorer/')
    console.log('2. Select your app from the dropdown')
    console.log('3. Click "Get Token" → "Get User Access Token"')
    console.log('4. Select permissions: ads_management, ads_read')
    console.log('5. Click "Generate Access Token"')
    console.log('6. Copy the token (it\'s long - check the "Copy to Clipboard" button)')

    console.log('\n🔗 METHOD 3: Using Meta Marketing API')
    console.log('────────────────────────────────────────────────────')
    console.log('1. Go to https://developers.facebook.com/docs/marketing-api/access-tokens')
    console.log('2. Follow the User Access Token flow')
    console.log('3. Use the OAuth playground to generate token')

    console.log('\n💡 TOKEN REQUIREMENTS:')
    console.log('────────────────────────────────────────────────────')
    console.log('✓ Must include "ads_management" permission')
    console.log('✓ Must include "ads_read" permission')
    console.log('✓ Should be a long-lived token (60+ day expiry)')
    console.log('✓ Typically 200+ characters long')

    console.log('\n' + '='.repeat(70))
  }

  async run() {
    console.log('\n🚀 Meta Ads API - Manual Token Setup')
    console.log('='.repeat(70))

    if (!this.appId || !this.appSecret) {
      console.log('❌ Error: META_APP_ID or META_APP_SECRET not found in .env')
      console.log('\n📝 Required environment variables:')
      console.log('META_APP_ID=your_app_id')
      console.log('META_APP_SECRET=your_app_secret')
      process.exit(1)
    }

    console.log('✅ Meta App credentials found')
    console.log(`   App ID: ${this.appId.substring(0, 10)}...`)

    this.printInstructions()

    // Simulate getting token from user (in real scenario, this would be interactive)
    const readline = require('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return new Promise((resolve) => {
      rl.question('\n🔑 Paste your Meta access token here: ', async (token) => {
        rl.close()

        if (!token || token.trim().length === 0) {
          console.log('❌ No token provided. Setup cancelled.')
          process.exit(1)
        }

        const cleanToken = token.trim()

        // Test connection
        await this.testConnection(cleanToken)

        // Save to .env
        this.updateEnvFile(cleanToken)

        console.log('\n' + '='.repeat(70))
        console.log('✅ SETUP COMPLETE')
        console.log('='.repeat(70))
        console.log('\n📋 Next steps:')
        console.log('1. Run: npm run meta:test')
        console.log('   (Verify token works with your app)')
        console.log('\n2. Run: npm run meta:pixel-setup')
        console.log('   (Create conversion tracking pixel)')
        console.log('\n3. Run: npm run meta:monitor')
        console.log('   (Start real-time monitoring dashboard)')

        console.log('\n💡 Pro tip:')
        console.log('   Token expires after 60 days. When it expires, run this')
        console.log('   command again to generate a new one:')
        console.log('   npm run meta:token')

        resolve(true)
      })
    })
  }
}

// Run setup
const setup = new MetaManualTokenSetup()
setup.run().catch((error) => {
  console.error('❌ Setup error:', error.message)
  process.exit(1)
})
