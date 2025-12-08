#!/usr/bin/env node

/**
 * Google Ads Direct API Implementation
 * 
 * This script directly modifies your Google Ads Search campaign using API mutations
 * It will:
 * 1. Find your Search campaign (ID: 23293961952)
 * 2. Create new ad groups per course
 * 3. Add keywords to each ad group
 * 4. Pause low-intent keywords
 * 
 * Usage: node scripts/google-ads/direct-api-implementation.js [--live]
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ============================================================================
// CONFIG
// ============================================================================

const CONFIG = {
  customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '3929355931',
  campaignId: '23293961952', // Your Search campaign ID
  developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
  clientId: process.env.GOOGLE_ADS_CLIENT_ID,
  clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN
};

// ============================================================================
// KEYWORDS TO ADD
// ============================================================================

const AD_GROUPS_WITH_KEYWORDS = {
  'Film Production - Tier 1': [
    { text: 'film production diploma kenya', matchType: 'EXACT', bid: 3.50 },
    { text: 'enroll film production course nairobi', matchType: 'PHRASE', bid: 2.00 },
    { text: 'cinematography diploma nairobi', matchType: 'EXACT', bid: 3.50 },
    { text: 'start film production diploma', matchType: 'EXACT', bid: 3.50 },
  ],
  'Music Production - Tier 1': [
    { text: 'music production diploma kenya', matchType: 'EXACT', bid: 3.50 },
    { text: 'enroll music production course nairobi', matchType: 'PHRASE', bid: 2.00 },
    { text: 'sound engineering diploma africa', matchType: 'EXACT', bid: 3.50 },
    { text: 'start music production diploma', matchType: 'EXACT', bid: 3.50 },
  ],
  'Graphic Design - Tier 1': [
    { text: 'graphic design diploma kenya', matchType: 'EXACT', bid: 3.00 },
    { text: 'enroll graphic design course nairobi', matchType: 'PHRASE', bid: 1.75 },
    { text: 'start graphic design diploma', matchType: 'EXACT', bid: 3.00 },
  ],
  'Photography - Tier 1': [
    { text: 'photography diploma kenya', matchType: 'EXACT', bid: 3.00 },
    { text: 'enroll photography course nairobi', matchType: 'PHRASE', bid: 1.75 },
    { text: 'start photography diploma', matchType: 'EXACT', bid: 3.00 },
  ],
  'Creative Media - Tier 1': [
    { text: 'creative media diploma kenya', matchType: 'EXACT', bid: 3.00 },
    { text: 'enroll creative media course nairobi', matchType: 'PHRASE', bid: 1.75 },
    { text: 'start creative media diploma', matchType: 'EXACT', bid: 3.00 },
  ],
};

const KEYWORDS_TO_PAUSE = [
  'diploma',
  'course',
  'training',
  'education',
  'professional development'
];

// ============================================================================
// API CLIENT
// ============================================================================

class GoogleAdsAPI {
  constructor(liveMode = false) {
    this.liveMode = liveMode;
    this.accessToken = null;
    this.baseUrl = 'https://googleads.googleapis.com/v14';
  }

  async authenticate() {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({
        client_id: CONFIG.clientId,
        client_secret: CONFIG.clientSecret,
        refresh_token: CONFIG.refreshToken,
        grant_type: 'refresh_token'
      });

      const options = {
        hostname: 'oauth2.googleapis.com',
        path: '/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.error) {
              console.error('❌ OAuth Error:', result.error_description);
              reject(new Error(result.error_description));
            } else {
              this.accessToken = result.access_token;
              console.log('✅ Authenticated with Google Ads API');
              resolve(true);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }

  async mutate(operations) {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify({ mutate_operations: operations });

      const options = {
        hostname: 'googleads.googleapis.com',
        path: `/v14/customers/${CONFIG.customerId}/googleAds:mutate`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'developer-token': CONFIG.developerToken,
          'Content-Type': 'application/json',
          'Content-Length': body.length
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            if (res.statusCode >= 400) {
              console.error(`API Error (${res.statusCode}):`, data.substring(0, 500));
              reject(new Error(`API Error ${res.statusCode}`));
            } else {
              const result = JSON.parse(data);
              resolve(result);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.write(body);
      req.end();
    });
  }

  async search(query) {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify({ query });

      const options = {
        hostname: 'googleads.googleapis.com',
        path: `/v14/customers/${CONFIG.customerId}/googleAds:search`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'developer-token': CONFIG.developerToken,
          'Content-Type': 'application/json',
          'Content-Length': body.length
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            if (res.statusCode >= 400) {
              reject(new Error(`API Error ${res.statusCode}`));
            } else {
              const result = JSON.parse(data);
              resolve(result);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.write(body);
      req.end();
    });
  }

  createAdGroupOp(campaignResourceName, adGroupName) {
    return {
      create_ad_group: {
        campaign: campaignResourceName,
        name: adGroupName,
        status: 'ENABLED',
        type: 'SEARCH_STANDARD',
        cpc_bid_micros: 2000000 // Default $2 bid
      }
    };
  }

  createKeywordOp(adGroupResourceName, keyword) {
    const bidMicros = Math.round(keyword.bid * 1_000_000);
    const matchTypeMap = {
      'EXACT': 'EXACT',
      'PHRASE': 'PHRASE',
      'BROAD': 'BROAD'
    };

    return {
      create_ad_group_criterion: {
        ad_group: adGroupResourceName,
        keyword: {
          text: keyword.text,
          match_type: matchTypeMap[keyword.matchType] || 'PHRASE'
        },
        cpc_bid_micros: bidMicros,
        status: 'ENABLED'
      }
    };
  }

  pauseKeywordOp(resourceName) {
    return {
      update_ad_group_criterion: {
        resource_name: resourceName,
        status: 'PAUSED'
      }
    };
  }
}

// ============================================================================
// MAIN IMPLEMENTATION
// ============================================================================

class SearchCampaignImplementation {
  constructor(liveMode = false) {
    this.api = new GoogleAdsAPI(liveMode);
    this.liveMode = liveMode;
    this.campaignResourceName = `customers/${CONFIG.customerId}/campaigns/${CONFIG.campaignId}`;
    this.results = {
      adGroupsCreated: [],
      keywordsAdded: [],
      keywordsPaused: [],
      errors: []
    };
  }

  async run() {
    console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  GOOGLE ADS DIRECT API IMPLEMENTATION                             ║
║  Campaign ID: ${CONFIG.campaignId}                                    ║
║  Mode: ${this.liveMode ? 'LIVE' : 'DRY RUN'}                                    ║
╚════════════════════════════════════════════════════════════════════╝
    `);

    try {
      // Authenticate
      await this.api.authenticate();

      // Create ad groups and add keywords
      await this.createAdGroupsAndKeywords();

      // Find and pause low-intent keywords
      await this.pauseLowIntentKeywords();

      this.printResults();
      this.saveReport();
    } catch (err) {
      console.error('❌ Fatal error:', err.message);
      this.results.errors.push(err.message);
    }
  }

  async createAdGroupsAndKeywords() {
    console.log('\n📋 Creating ad groups and adding keywords...\n');

    for (const [adGroupName, keywords] of Object.entries(AD_GROUPS_WITH_KEYWORDS)) {
      console.log(`\n📚 ${adGroupName}`);
      console.log('━'.repeat(60));

      if (this.liveMode) {
        // Step 1: Create ad group
        try {
          const createAdGroupOp = [
            this.api.createAdGroupOp(this.campaignResourceName, adGroupName)
          ];

          console.log(`  Creating ad group: "${adGroupName}"...`);
          const response = await this.api.mutate(createAdGroupOp);

          // Extract the created ad group resource name
          let adGroupResourceName = null;
          if (response.results && response.results[0]) {
            adGroupResourceName = response.results[0].resource_name;
            console.log(`  ✅ Created: ${adGroupResourceName}`);
            this.results.adGroupsCreated.push(adGroupName);
          } else {
            throw new Error('Failed to create ad group');
          }

          // Step 2: Add keywords to ad group
          if (adGroupResourceName) {
            console.log(`  Adding ${keywords.length} keywords...`);
            const keywordOps = keywords.map(kw => 
              this.api.createKeywordOp(adGroupResourceName, kw)
            );

            const keywordResponse = await this.api.mutate(keywordOps);
            if (keywordResponse.results) {
              console.log(`  ✅ Added ${keywordResponse.results.length} keywords`);
              this.results.keywordsAdded.push(...keywords);
            }
          }
        } catch (err) {
          console.error(`  ❌ Error: ${err.message}`);
          this.results.errors.push(`${adGroupName}: ${err.message}`);
        }
      } else {
        // DRY RUN
        console.log(`  [DRY RUN] Would create: "${adGroupName}"`);
        console.log(`  [DRY RUN] Would add ${keywords.length} keywords:`);
        for (const kw of keywords) {
          console.log(`    • ${kw.matchType.padEnd(6)} | "${kw.text}" | $${kw.bid}`);
        }
        this.results.adGroupsCreated.push(adGroupName);
        this.results.keywordsAdded.push(...keywords);
      }
    }
  }

  async pauseLowIntentKeywords() {
    console.log('\n\n📋 Finding and pausing low-intent keywords...\n');

    try {
      // Query to find keywords matching our pause list
      const query = `
        SELECT ad_group_criterion.resource_name, 
               ad_group_criterion.keyword.text,
               ad_group_criterion.status
        FROM ad_group_criterion
        WHERE ad_group_criterion.ad_group.campaign = '${this.campaignResourceName}'
        AND ad_group_criterion.type = 'KEYWORD'
        AND ad_group_criterion.status = 'ENABLED'
        LIMIT 1000
      `;

      const results = await this.api.search(query);

      if (results.results) {
        let pausedCount = 0;
        for (const result of results.results) {
          const keyword = result.ad_group_criterion.keyword.text;
          if (KEYWORDS_TO_PAUSE.includes(keyword)) {
            console.log(`  Found: "${keyword}" - pausing...`);

            if (this.liveMode) {
              const pauseOp = [
                this.api.pauseKeywordOp(result.ad_group_criterion.resource_name)
              ];
              await this.api.mutate(pauseOp);
              this.results.keywordsPaused.push(keyword);
              pausedCount++;
              console.log(`  ✅ Paused`);
            } else {
              console.log(`  [DRY RUN] Would pause`);
              this.results.keywordsPaused.push(keyword);
            }
          }
        }
        console.log(`\n  Total paused: ${pausedCount}`);
      }
    } catch (err) {
      console.error(`❌ Error finding keywords: ${err.message}`);
      this.results.errors.push(`Pause operation: ${err.message}`);
    }
  }

  printResults() {
    console.log('\n\n' + '═'.repeat(70));
    console.log('📊 IMPLEMENTATION RESULTS');
    console.log('═'.repeat(70) + '\n');

    console.log(`Mode: ${this.liveMode ? '✅ LIVE' : '🔍 DRY RUN'}`);
    console.log(`Campaign ID: ${CONFIG.campaignId}\n`);

    console.log('✅ Ad Groups Created:');
    for (const adGroup of this.results.adGroupsCreated) {
      console.log(`   • ${adGroup}`);
    }

    console.log(`\n✅ Keywords Added: ${this.results.keywordsAdded.length}`);
    console.log(`⏸️  Keywords Paused: ${this.results.keywordsPaused.length}`);

    if (this.results.errors.length > 0) {
      console.log(`\n❌ Errors: ${this.results.errors.length}`);
      for (const err of this.results.errors) {
        console.log(`   • ${err}`);
      }
    }

    console.log('\n' + '═'.repeat(70));
  }

  saveReport() {
    const dir = path.join(process.cwd(), 'reports', 'google-ads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const reportPath = path.join(dir, `direct-api-implementation-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      liveMode: this.liveMode,
      campaignId: CONFIG.campaignId,
      results: this.results
    }, null, 2));

    console.log(`\n✅ Report saved: ${reportPath}`);
  }
}

// ============================================================================
// RUN
// ============================================================================

async function main() {
  const liveMode = process.argv.includes('--live');

  const impl = new SearchCampaignImplementation(liveMode);
  await impl.run();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
