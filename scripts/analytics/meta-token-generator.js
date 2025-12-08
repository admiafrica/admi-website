#!/usr/bin/env node

/**
 * Meta Ads API Token Generation Helper
 * Step-by-step guide to get a fresh System User Access Token
 */

console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║           META ADS API - FRESH TOKEN GENERATION GUIDE                      ║
╚════════════════════════════════════════════════════════════════════════════╝

🔧 STEP 1: Generate Fresh System User Access Token

1. Go to https://business.facebook.com/settings/system-users/
   (You must be in your Meta Business Account)

2. Click "Create System User"
   - Name: "ADMI Ads API Bot" (or similar)
   - Role: Admin
   - Click Create

3. For that user, click "Generate Token"
   - App: Select your app (ID: 1117569380254441)
   - Token expires in: 60 days
   - Permissions needed:
     ✓ ads_read
     ✓ ads_management
     ✓ catalog_management

4. IMPORTANT: Copy the token IMMEDIATELY
   - Tokens are only shown once
   - Store it somewhere safe
   - Format should be: EAA...long string...

5. Paste token in .env file:
   META_ACCESS_TOKEN=<your_token_here>

⚠️  COPY-PASTE RULES:
   - Do NOT include quotes
   - Token should start with "EAA" or "EAAP"
   - Token length: ~200-300 characters
   - If line wraps in editor, that's normal

════════════════════════════════════════════════════════════════════════════

🆔 YOUR CURRENT SETUP:

App ID:              1117569380254441
Business Account ID: 193309761118328
Pixel ID:            2180607305521624
App Secret:          (stored in .env)

════════════════════════════════════════════════════════════════════════════

✅ NEXT STEPS:

1. Generate fresh token using steps above
2. Update .env: META_ACCESS_TOKEN=EAA...
3. Run: node scripts/analytics/meta-ads-analyzer-v2.js
4. You should see: ✅ Connection successful!

════════════════════════════════════════════════════════════════════════════
`);
