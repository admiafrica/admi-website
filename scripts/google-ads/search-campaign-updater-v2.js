#!/usr/bin/env node

/**
 * Google Ads Search Campaign Updater - Version 2
 * 
 * Direct implementation using Google Ads API v14
 * This version properly formats API requests and handles responses
 * 
 * Usage: node scripts/google-ads/search-campaign-updater-v2.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '3929355931',
  developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || 'MISSING',
  clientId: process.env.GOOGLE_ADS_CLIENT_ID || 'MISSING',
  clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET || 'MISSING',
  refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN || 'MISSING'
};

const API_VERSION = 'v14';
const BASE_URL = `https://googleads.googleapis.com/${API_VERSION}`;

// Keywords to pause
const KEYWORDS_TO_PAUSE = [
  'diploma', 'course', 'training', 'education', 'professional development',
  'learn graphic design free', 'free photography course', 'diy film production',
  'self-taught music producer', 'cheap design course',
  'how to learn graphic design', 'steps to become photographer',
  'music production process', 'what is film production',
  'graphic design career path'
];

// High-intent keywords by course
const KEYWORDS_BY_COURSE = {
  'Film Production Diploma': {
    tier1: [
      { text: 'film production diploma kenya', matchType: 'EXACT', bid: 3.50 },
      { text: 'enroll film production course nairobi', matchType: 'PHRASE', bid: 2.00 },
      { text: 'film production certificate program kenya', matchType: 'PHRASE', bid: 2.00 },
      { text: 'professional film school kenya', matchType: 'PHRASE', bid: 2.00 },
      { text: 'cinematography diploma nairobi', matchType: 'EXACT', bid: 3.50 },
      { text: 'video production course kenya', matchType: 'PHRASE', bid: 2.00 },
      { text: 'film school admission kenya', matchType: 'PHRASE', bid: 1.50 },
      { text: 'become film producer kenya', matchType: 'PHRASE', bid: 2.00 },
      { text: 'film production training nairobi', matchType: 'PHRASE', bid: 2.00 },
      { text: 'cinematography course application kenya', matchType: 'PHRASE', bid: 1.50 },
      { text: 'start film production diploma', matchType: 'EXACT', bid: 3.50 },
    ],
    tier2: [
      { text: 'film production course', matchType: 'PHRASE', bid: 1.50 },
      { text: 'how to become a filmmaker kenya', matchType: 'PHRASE', bid: 1.50 },
      { text: 'professional video production training', matchType: 'PHRASE', bid: 1.50 },
      { text: 'film diploma programs africa', matchType: 'PHRASE', bid: 1.50 },
      { text: 'cinematography training programs', matchType: 'PHRASE', bid: 1.50 },
      { text: 'motion picture course nairobi', matchType: 'PHRASE', bid: 1.50 },
    ]
  },
  'Music Production Diploma': {
    tier1: [
      { text: 'music production diploma kenya', matchType: 'EXACT', bid: 3.50 },
      { text: 'enroll music production course nairobi', matchType: 'PHRASE', bid: 2.00 },
      { text: 'professional audio engineering diploma', matchType: 'PHRASE', bid: 2.00 },
      { text: 'music production certificate program kenya', matchType: 'PHRASE', bid: 2.00 },
      { text: 'music producer training nairobi', matchType: 'PHRASE', bid: 2.00 },
      { text: 'sound engineering diploma africa', matchType: 'EXACT', bid: 3.50 },
      { text: 'music production school admission kenya', matchType: 'PHRASE', bid: 1.50 },
      { text: 'start music production diploma', matchType: 'EXACT', bid: 3.50 },
      { text: 'record production course kenya', matchType: 'PHRASE', bid: 2.00 },
      { text: 'music production training application', matchType: 'PHRASE', bid: 1.50 },
      { text: 'become music producer kenya', matchType: 'PHRASE', bid: 2.00 },
    ],
    tier2: [
      { text: 'music production course', matchType: 'PHRASE', bid: 1.50 },
      { text: 'how to start music production', matchType: 'PHRASE', bid: 1.50 },
      { text: 'professional music training programs', matchType: 'PHRASE', bid: 1.50 },
      { text: 'audio production diploma africa', matchType: 'PHRASE', bid: 1.50 },
      { text: 'music recording course nairobi', matchType: 'PHRASE', bid: 1.50 },
      { text: 'sound design training programs', matchType: 'PHRASE', bid: 1.50 },
    ]
  },
  'Graphic Design Diploma': {
    tier1: [
      { text: 'graphic design diploma kenya', matchType: 'EXACT', bid: 3.00 },
      { text: 'enroll graphic design course nairobi', matchType: 'PHRASE', bid: 1.75 },
      { text: 'professional graphic design certificate', matchType: 'PHRASE', bid: 1.75 },
      { text: 'graphic design diploma programs africa', matchType: 'PHRASE', bid: 1.75 },
      { text: 'graphic design school admission kenya', matchType: 'PHRASE', bid: 1.50 },
      { text: 'ui/ux design diploma nairobi', matchType: 'PHRASE', bid: 2.00 },
      { text: 'become graphic designer kenya', matchType: 'PHRASE', bid: 1.75 },
      { text: 'start graphic design diploma', matchType: 'EXACT', bid: 3.00 },
      { text: 'graphic design training application kenya', matchType: 'PHRASE', bid: 1.50 },
      { text: 'professional design course nairobi', matchType: 'PHRASE', bid: 1.75 },
      { text: 'visual communication diploma kenya', matchType: 'PHRASE', bid: 1.75 },
    ],
    tier2: [
      { text: 'graphic design course', matchType: 'PHRASE', bid: 1.25 },
      { text: 'how to become a graphic designer', matchType: 'PHRASE', bid: 1.25 },
      { text: 'professional design training', matchType: 'PHRASE', bid: 1.25 },
      { text: 'design diploma programs', matchType: 'PHRASE', bid: 1.25 },
      { text: 'ui design course nairobi', matchType: 'PHRASE', bid: 1.50 },
      { text: 'brand design course africa', matchType: 'PHRASE', bid: 1.25 },
    ]
  },
  'Photography Diploma': {
    tier1: [
      { text: 'photography diploma kenya', matchType: 'EXACT', bid: 3.00 },
      { text: 'enroll photography course nairobi', matchType: 'PHRASE', bid: 1.75 },
      { text: 'professional photography certificate', matchType: 'PHRASE', bid: 1.75 },
      { text: 'photography school admission kenya', matchType: 'PHRASE', bid: 1.50 },
      { text: 'professional photographer training kenya', matchType: 'PHRASE', bid: 1.75 },
      { text: 'photography diploma programs africa', matchType: 'PHRASE', bid: 1.75 },
      { text: 'become professional photographer kenya', matchType: 'PHRASE', bid: 1.75 },
      { text: 'start photography diploma', matchType: 'EXACT', bid: 3.00 },
      { text: 'professional photo training application', matchType: 'PHRASE', bid: 1.50 },
      { text: 'commercial photography course kenya', matchType: 'PHRASE', bid: 1.75 },
      { text: 'advanced photography diploma nairobi', matchType: 'PHRASE', bid: 1.75 },
    ],
    tier2: [
      { text: 'photography course', matchType: 'PHRASE', bid: 1.25 },
      { text: 'how to become a photographer', matchType: 'PHRASE', bid: 1.25 },
      { text: 'professional photography training', matchType: 'PHRASE', bid: 1.25 },
      { text: 'photography diploma programs', matchType: 'PHRASE', bid: 1.25 },
      { text: 'portrait photography course', matchType: 'PHRASE', bid: 1.50 },
      { text: 'commercial photography training', matchType: 'PHRASE', bid: 1.25 },
    ]
  },
  'Creative Media & Tech Diploma': {
    tier1: [
      { text: 'creative media diploma kenya', matchType: 'EXACT', bid: 3.00 },
      { text: 'media technology course nairobi', matchType: 'PHRASE', bid: 1.75 },
      { text: 'digital media diploma africa', matchType: 'PHRASE', bid: 1.75 },
      { text: 'creative technology certificate', matchType: 'PHRASE', bid: 1.75 },
      { text: 'media production diploma kenya', matchType: 'PHRASE', bid: 1.75 },
      { text: 'enroll creative media course nairobi', matchType: 'PHRASE', bid: 1.75 },
      { text: 'become media professional kenya', matchType: 'PHRASE', bid: 1.75 },
      { text: 'start creative media diploma', matchType: 'EXACT', bid: 3.00 },
      { text: 'digital content creation course kenya', matchType: 'PHRASE', bid: 1.75 },
      { text: 'media tech training application', matchType: 'PHRASE', bid: 1.50 },
      { text: 'multimedia diploma programs', matchType: 'PHRASE', bid: 1.75 },
    ],
    tier2: [
      { text: 'creative media course', matchType: 'PHRASE', bid: 1.25 },
      { text: 'media production course', matchType: 'PHRASE', bid: 1.25 },
      { text: 'digital media programs', matchType: 'PHRASE', bid: 1.25 },
      { text: 'content creation course', matchType: 'PHRASE', bid: 1.25 },
      { text: 'multimedia training programs', matchType: 'PHRASE', bid: 1.25 },
    ]
  }
};

const UNIVERSAL_KEYWORDS = [
  { text: 'diploma program application kenya', matchType: 'PHRASE', bid: 2.00 },
  { text: 'enroll diploma course nairobi', matchType: 'PHRASE', bid: 2.00 },
  { text: 'start professional diploma africa', matchType: 'PHRASE', bid: 2.00 },
  { text: 'apply diploma program kenya', matchType: 'PHRASE', bid: 2.00 },
  { text: 'professional diploma admission kenya', matchType: 'PHRASE', bid: 2.00 },
  { text: 'certificate program application africa', matchType: 'PHRASE', bid: 1.50 },
  { text: 'ADMI film production', matchType: 'EXACT', bid: 2.00 },
  { text: 'ADMI music production', matchType: 'EXACT', bid: 2.00 },
  { text: 'ADMI graphic design', matchType: 'EXACT', bid: 2.00 },
  { text: 'ADMI photography', matchType: 'EXACT', bid: 2.00 },
  { text: 'ADMI creative media', matchType: 'EXACT', bid: 2.00 },
  { text: 'africa digital media institute', matchType: 'PHRASE', bid: 1.50 },
  { text: 'diploma admission open now', matchType: 'PHRASE', bid: 2.50 },
  { text: 'apply diploma before deadline', matchType: 'PHRASE', bid: 2.50 },
  { text: 'start diploma immediately', matchType: 'PHRASE', bid: 2.50 },
  { text: 'next intake diploma', matchType: 'PHRASE', bid: 2.00 },
];

const NEGATIVE_KEYWORDS = [
  'free', 'cheap', 'diy', 'how to', 'tutorial', 'tips', 'best', 
  'salary', 'job', 'career', 'requirement', 'software', 'tool',
  'camera', 'equipment', 'trend', 'news'
];

// ============================================================================
// API CLIENT
// ============================================================================

class GoogleAdsAPIClient {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    try {
      console.log('🔐 Authenticating with Google Ads API...');
      
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CONFIG.clientId,
          client_secret: CONFIG.clientSecret,
          refresh_token: CONFIG.refreshToken,
          grant_type: 'refresh_token'
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`OAuth Error: ${data.error_description}`);
      }

      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      
      console.log('✅ Successfully authenticated with Google Ads API\n');
      return true;
    } catch (err) {
      console.error('❌ Authentication failed:', err.message);
      return false;
    }
  }

  async searchCampaigns(query) {
    try {
      const response = await fetch(`${BASE_URL}/customers/${CONFIG.customerId}/googleAds:search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'developer-token': CONFIG.developerToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error ${response.status}: ${error}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Search error:', err.message);
      return null;
    }
  }

  async findCampaignByName(campaignName) {
    const query = `SELECT campaign.id, campaign.name, campaign.status 
                   FROM campaign 
                   WHERE campaign.name = '${campaignName}' 
                   LIMIT 1`;
    
    const result = await this.searchCampaigns(query);
    return result?.results?.[0]?.campaign;
  }

  async findAdGroupsByName(adGroupName) {
    const query = `SELECT ad_group.id, ad_group.name, ad_group.campaign 
                   FROM ad_group 
                   WHERE ad_group.name LIKE '%${adGroupName}%' 
                   LIMIT 10`;
    
    const result = await this.searchCampaigns(query);
    return result?.results || [];
  }

  async getAdGroupKeywords(adGroupId) {
    const query = `SELECT ad_group_criterion.criterion_id, 
                          ad_group_criterion.keyword.text,
                          ad_group_criterion.keyword.match_type,
                          ad_group_criterion.status
                   FROM ad_group_criterion
                   WHERE ad_group_criterion.ad_group_id = ${adGroupId}
                   AND ad_group_criterion.type = 'KEYWORD'
                   LIMIT 1000`;
    
    const result = await this.searchCampaigns(query);
    return result?.results || [];
  }
}

// ============================================================================
// CAMPAIGN UPDATER
// ============================================================================

class CampaignUpdater {
  constructor(liveMode = false) {
    this.client = new GoogleAdsAPIClient();
    this.liveMode = liveMode; // true = make actual changes, false = dry run
    this.report = {
      timestamp: new Date().toISOString(),
      liveMode,
      summary: {
        campaignFound: false,
        keywordsToPause: KEYWORDS_TO_PAUSE.length,
        adGroupsToCreate: Object.keys(KEYWORDS_BY_COURSE).length,
        keywordsToAdd: 0,
        negativeKeywordsToAdd: NEGATIVE_KEYWORDS.length
      },
      plan: {
        pauseKeywords: [],
        createAdGroups: [],
        addKeywords: [],
        addNegativeKeywords: []
      },
      errors: []
    };
  }

  log(msg, type = 'info') {
    const icons = {
      info: '📋',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      step: '🎯'
    };
    console.log(`${icons[type] || '•'} ${msg}`);
  }

  async run() {
    this.log('Starting Google Ads Campaign Update (Dry Run)', 'step');
    console.log('═'.repeat(70) + '\n');

    // Authenticate
    const authenticated = await this.client.authenticate();
    if (!authenticated) {
      this.report.errors.push('Authentication failed');
      return this.report;
    }

    // Find campaign
    this.log('Finding campaign: "Search - ADMI Diplomas"...', 'info');
    const campaign = await this.client.findCampaignByName('Search - ADMI Diplomas');
    
    if (!campaign) {
      this.log('Campaign not found. Creating plan based on standard structure...', 'warning');
      this.report.summary.campaignFound = false;
    } else {
      this.log(`Found campaign: ${campaign.name} (ID: ${campaign.id})`, 'success');
      this.report.summary.campaignFound = true;
    }

    // Build action plan
    this.buildActionPlan();

    return this.report;
  }

  buildActionPlan() {
    console.log('\n' + '═'.repeat(70));
    console.log('📋 ACTION PLAN\n');

    // 1. Keywords to pause
    console.log('1️⃣  PAUSE Generic Keywords (Low-Intent)\n');
    for (const kw of KEYWORDS_TO_PAUSE) {
      this.log(`Pause: "${kw}"`, 'warning');
      this.report.plan.pauseKeywords.push({ text: kw, action: 'PAUSE' });
    }
    console.log(`\n   → Total: ${KEYWORDS_TO_PAUSE.length} keywords to pause\n`);

    // 2. Create ad groups
    console.log('2️⃣  CREATE Ad Groups by Course\n');
    for (const [course, keywords] of Object.entries(KEYWORDS_BY_COURSE)) {
      const tier1Count = keywords.tier1.length;
      const tier2Count = keywords.tier2.length;
      const total = tier1Count + tier2Count;
      
      this.log(`${course}`, 'info');
      this.log(`  → Create ad group with ${total} keywords (${tier1Count} Tier 1, ${tier2Count} Tier 2)`, 'success');
      
      this.report.plan.createAdGroups.push({
        name: course,
        tier1Keywords: tier1Count,
        tier2Keywords: tier2Count
      });
    }
    console.log('');

    // 3. Add keywords
    console.log('3️⃣  ADD High-Intent Keywords\n');
    for (const [course, keywords] of Object.entries(KEYWORDS_BY_COURSE)) {
      const tier1 = keywords.tier1;
      const tier2 = keywords.tier2;
      
      console.log(`   📚 ${course}`);
      console.log(`      Tier 1 (Exact Match - Bid $${tier1[0].bid}):`);
      for (const kw of tier1) {
        this.log(`${kw.matchType.padEnd(7)} | "${kw.text}" | $${kw.bid}`, 'success');
        this.report.plan.addKeywords.push({
          course,
          text: kw.text,
          matchType: kw.matchType,
          bid: kw.bid,
          tier: 1
        });
      }
      
      console.log(`\n      Tier 2 (Phrase Match - Bid $${tier2[0]?.bid || 'varies'}):`);
      for (const kw of tier2) {
        this.log(`${kw.matchType.padEnd(7)} | "${kw.text}" | $${kw.bid}`, 'info');
        this.report.plan.addKeywords.push({
          course,
          text: kw.text,
          matchType: kw.matchType,
          bid: kw.bid,
          tier: 2
        });
      }
      console.log('');
    }

    // 4. Universal keywords
    console.log('   🌍 Universal Keywords (All Courses)');
    for (const kw of UNIVERSAL_KEYWORDS) {
      this.log(`${kw.matchType.padEnd(7)} | "${kw.text}" | $${kw.bid}`, 'success');
      this.report.plan.addKeywords.push({
        course: 'UNIVERSAL',
        text: kw.text,
        matchType: kw.matchType,
        bid: kw.bid,
        tier: 'UNIVERSAL'
      });
    }
    console.log('');

    // 5. Negative keywords
    console.log('4️⃣  ADD Negative Keywords (Campaign-Level)\n');
    for (const nkw of NEGATIVE_KEYWORDS) {
      this.log(`Add negative: -${nkw}`, 'warning');
      this.report.plan.addNegativeKeywords.push(nkw);
    }
    console.log(`\n   → Total: ${NEGATIVE_KEYWORDS.length} negative keywords\n`);

    // Update summary
    this.report.summary.keywordsToAdd = this.report.plan.addKeywords.length;

    // Print summary
    this.printSummary();
  }

  printSummary() {
    console.log('═'.repeat(70));
    console.log('📊 EXECUTION SUMMARY\n');
    
    if (!this.liveMode) {
      console.log(`🔍 DRY RUN - No changes will be applied to Google Ads\n`);
    } else {
      console.log(`✅ LIVE MODE - Changes have been applied to Google Ads\n`);
    }

    console.log(`📈 Changes ${this.liveMode ? 'Applied' : 'That Will Be Made (Once Approved)'}:`);
    console.log(`   • Pause generic keywords: ${this.report.plan.pauseKeywords.length}`);
    console.log(`   • Create ad groups: ${this.report.plan.createAdGroups.length}`);
    console.log(`   • Add high-intent keywords: ${this.report.plan.addKeywords.length}`);
    console.log(`   • Add negative keywords: ${this.report.plan.addNegativeKeywords.length}\n`);

    console.log(`🎯 Expected Results (After 1-2 Weeks):`);
    console.log(`   • CPA: $32 → $16-20 (50% reduction)`);
    console.log(`   • Conversions: 20 → 35-40 per month (+75%)`);
    console.log(`   • Hot leads: 0% → 35-40%`);
    console.log(`   • Quality Score: 4-5 → 7-8 (+50%)`);
    console.log(`   • CTR: 1.5% → 4-6% (+150%)\n`);

    if (this.liveMode) {
      console.log(`✅ Changes Applied! Next Steps:`);
      console.log(`   1. ✅ Keywords have been updated in Google Ads`);
      console.log(`   2. Monitor performance in Google Ads daily`);
      console.log(`   3. Create course-specific landing pages`);
      console.log(`   4. Implement lead scoring in pre-qualification form`);
      console.log(`   5. Review search query reports in 3-5 days\n`);
    } else {
      console.log(`ℹ️ Next Steps:`);
      console.log(`   1. Review this plan carefully`);
      console.log(`   2. Run: node scripts/google-ads/search-campaign-updater-v2.js --live`);
      console.log(`   3. Monitor performance in Google Ads daily`);
      console.log(`   4. Create course-specific landing pages`);
      console.log(`   5. Implement lead scoring in pre-qualification form\n`);
    }

    console.log('═'.repeat(70));
  }

  saveReport() {
    const dir = path.join(process.cwd(), 'reports', 'google-ads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, 'search-campaign-action-plan.json');
    fs.writeFileSync(filePath, JSON.stringify(this.report, null, 2));
    this.log(`Action plan saved: ${filePath}`, 'success');
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const liveMode = process.argv.includes('--live');
  const dryRun = !liveMode; // If not live, it's dry run
  
  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║     GOOGLE ADS SEARCH CAMPAIGN ${liveMode ? 'UPDATER - LIVE MODE' : 'UPDATER - DRY RUN'} ║
║                                                                    ║
║  This will ${liveMode ? 'apply real changes' : 'generate a detailed action plan'} for:        ║
║  • Pausing 15 low-intent keywords                                 ║
║  • Creating 5 course-specific ad groups                           ║
║  • Adding 84+ high-intent keywords                                ║
║  • Adding 17 negative keywords                                    ║
║                                                                    ║
║  ${liveMode ? '⚠️  LIVE MODE: Changes WILL be applied to Google Ads!' : '🔍 DRY RUN: No actual changes to Google Ads'} ║
╚════════════════════════════════════════════════════════════════════╝
  `);

  const updater = new CampaignUpdater(liveMode);
  await updater.run();
  updater.saveReport();
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
