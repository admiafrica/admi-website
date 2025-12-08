#!/usr/bin/env node

/**
 * Meta Ads Analyzer v2 - Direct API Integration
 * Fetches real campaign data from Meta API and compares with Google Ads
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const META_CONFIG = {
  accessToken: process.env.META_ACCESS_TOKEN,
  businessAccountId: process.env.META_BUSINESS_ACCOUNT_ID,
  pixelId: process.env.META_PIXEL_ID,
  appId: process.env.META_APP_ID,
};

// Validate credentials
const missingCredentials = Object.entries(META_CONFIG)
  .filter(([key, val]) => !val)
  .map(([key]) => key);

if (missingCredentials.length > 0) {
  console.log('❌ Missing Meta Ads credentials:');
  missingCredentials.forEach(cred => console.log(`   - ${cred}`));
  console.log('\n📋 Setup instructions:');
  console.log('   1. Create Meta Business Account at business.facebook.com');
  console.log('   2. Generate System User Access Token (Ads Manager role)');
  console.log('   3. Add to .env: META_ACCESS_TOKEN, META_BUSINESS_ACCOUNT_ID, META_PIXEL_ID, META_APP_ID\n');
  process.exit(1);
}

// Helper: Make HTTPS request to Meta Graph API
async function metaApiRequest(endpoint, fields = '') {
  return new Promise((resolve, reject) => {
    const query = new URLSearchParams({
      access_token: META_CONFIG.accessToken,
      ...(fields && { fields })
    }).toString();

    const url = `https://graph.instagram.com/v17.0/${endpoint}?${query}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// Test API connection
async function testConnection() {
  try {
    console.log('🔗 Testing Meta API connection...\n');
    const response = await metaApiRequest('me', 'name,id');
    
    if (response.error) {
      console.log(`❌ API Error: ${response.error.message}`);
      if (response.error.error_user_title) {
        console.log(`   ${response.error.error_user_title}: ${response.error.error_user_msg}`);
      }
      return false;
    }

    console.log('✅ Connection successful!');
    console.log(`   ID: ${response.id}`);
    if (response.name) console.log(`   Name: ${response.name}`);
    return true;
  } catch (err) {
    console.log(`❌ Connection failed: ${err.message}`);
    return false;
  }
}

// Fetch campaigns from Meta
async function fetchCampaigns() {
  try {
    console.log('\n📊 Fetching Meta Ads campaigns...\n');
    const accountId = `act_${META_CONFIG.businessAccountId}`;
    
    const response = await metaApiRequest(
      `${accountId}/campaigns`,
      'id,name,status,objective,start_time,created_time'
    );

    if (response.error) {
      console.log(`❌ API Error: ${response.error.message}`);
      return [];
    }

    if (!response.data) {
      console.log('ℹ️  No campaigns found');
      return [];
    }

    console.log(`✅ Found ${response.data.length} campaigns:\n`);
    response.data.forEach((campaign, i) => {
      console.log(`${i + 1}. ${campaign.name}`);
      console.log(`   ID: ${campaign.id}`);
      console.log(`   Status: ${campaign.status}`);
      console.log(`   Objective: ${campaign.objective}`);
    });

    return response.data;
  } catch (err) {
    console.log(`❌ Failed to fetch campaigns: ${err.message}`);
    return [];
  }
}

// Fetch campaign insights (metrics)
async function fetchCampaignInsights(campaignId) {
  try {
    const response = await metaApiRequest(
      `${campaignId}/insights`,
      'spend,impressions,clicks,actions,action_values,cost_per_action_type,conversion_rate_ranking'
    );

    if (response.error) {
      console.log(`   ❌ Error fetching insights: ${response.error.message}`);
      return null;
    }

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return response.data[0]; // Most recent insight
  } catch (err) {
    console.log(`   ❌ Insights error: ${err.message}`);
    return null;
  }
}

// Calculate CPA from insights
function calculateCPA(insights) {
  if (!insights) return null;

  const spend = parseFloat(insights.spend || 0);
  const actions = insights.actions;

  if (!actions || spend === 0) return null;

  // Find conversion action (usually 'Purchase' or 'Lead')
  const conversions = actions.find(a => 
    a.action_type === 'omni_purchase' || 
    a.action_type === 'purchase' ||
    a.action_type === 'offsite_conversion.fb_pixel_purchase'
  );

  if (!conversions) return null;

  const conversionCount = parseInt(conversions.value || 0);
  return conversionCount > 0 ? spend / conversionCount : null;
}

// Generate comparison report
async function generateReport(campaigns) {
  console.log('\n\n' + '='.repeat(70));
  console.log('META ADS vs GOOGLE ADS COMPARISON');
  console.log('='.repeat(70) + '\n');

  // Google Ads data (from previous analysis)
  const googleData = {
    'Performance Max': { cpa: 12.44, spend: 560, conversions: 45, platform: 'Google' },
    'Search': { cpa: 32.00, spend: 640, conversions: 20, platform: 'Google' },
  };

  console.log('📊 CHANNEL COMPARISON:\n');
  console.log('Channel                 CPA      Spend    Conversions   Status');
  console.log('-'.repeat(70));

  let metaTotal = { cpa: 0, spend: 0, conversions: 0 };
  let campaignCount = 0;

  for (const campaign of campaigns) {
    if (campaign.status !== 'ACTIVE') continue;

    campaignCount++;
    const insights = await fetchCampaignInsights(campaign.id);
    
    if (insights) {
      const spend = parseFloat(insights.spend || 0);
      const cpa = calculateCPA(insights);

      if (cpa) {
        metaTotal.cpa += cpa;
        metaTotal.spend += spend;
        console.log(
          `${campaign.name.padEnd(23)} $${cpa.toFixed(2).padStart(6)} $${spend.toFixed(0).padStart(7)} ${insights.actions ? JSON.parse(insights.actions)[0]?.value || 0 : 0}   ✅ Running`
        );
      }
    }
  }

  if (campaignCount > 0) {
    metaTotal.cpa = metaTotal.cpa / campaignCount;
  }

  console.log('-'.repeat(70));
  console.log(`${'Meta Ads (Average)'.padEnd(23)} $${metaTotal.cpa.toFixed(2).padStart(6)} $${metaTotal.spend.toFixed(0).padStart(7)}`);
  console.log(`${'Performance Max'.padEnd(23)} $${googleData['Performance Max'].cpa.toFixed(2).padStart(6)} $${googleData['Performance Max'].spend.toFixed(0).padStart(7)} ${googleData['Performance Max'].conversions}`);
  console.log(`${'Search'.padEnd(23)} $${googleData['Search'].cpa.toFixed(2).padStart(6)} $${googleData['Search'].spend.toFixed(0).padStart(7)} ${googleData['Search'].conversions}`);

  console.log('\n📈 STRATEGIC RECOMMENDATIONS:\n');

  if (metaTotal.cpa === 0) {
    console.log('⚠️  Meta campaigns have no conversion data yet. Recommendations:');
    console.log('   1. Ensure pixel is correctly installed on website');
    console.log('   2. Wait 24-48 hours for data to populate');
    console.log('   3. Check conversion tracking in Pixel settings');
  } else if (metaTotal.cpa > 30) {
    console.log('❌ Meta Ads CPA ($' + metaTotal.cpa.toFixed(2) + ') is 3x over target ($10)');
    console.log('   Recommendation: PAUSE Meta Ads immediately');
    console.log('   Reason: Performance Max ($12.44) is better alternative');
    console.log('   Savings: Reallocate $400/month to Performance Max');
  } else if (metaTotal.cpa > 15) {
    console.log('⚠️  Meta Ads CPA ($' + metaTotal.cpa.toFixed(2) + ') is above target');
    console.log('   Recommendation: Reduce budget, test creative optimization');
  } else {
    console.log('✅ Meta Ads CPA ($' + metaTotal.cpa.toFixed(2) + ') is acceptable');
    console.log('   Keep running, monitor daily');
  }

  // Save report
  const reportDir = path.join(process.cwd(), 'reports/meta-ads');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportPath = path.join(reportDir, `meta-ads-analysis-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    meta: {
      campaignsActive: campaignCount,
      averageCPA: metaTotal.cpa.toFixed(2),
      totalSpend: metaTotal.spend.toFixed(2),
    },
    googleComparison: googleData,
    recommendation: metaTotal.cpa > 25 ? 'PAUSE' : 'MONITOR',
  }, null, 2));

  console.log(`\n📁 Report saved to: ${reportPath}\n`);
}

// Main execution
async function main() {
  console.log('\n🚀 META ADS ANALYZER v2\n');
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Account ID:', META_CONFIG.businessAccountId);
  console.log('Pixel ID:', META_CONFIG.pixelId);
  console.log('App ID:', META_CONFIG.appId);

  // Test connection
  const connected = await testConnection();
  if (!connected) {
    console.log('\n❌ Cannot proceed without API connection');
    process.exit(1);
  }

  // Fetch campaigns
  const campaigns = await fetchCampaigns();
  if (campaigns.length === 0) {
    console.log('\n⚠️  No campaigns found. Check account access.');
    process.exit(0);
  }

  // Generate report
  await generateReport(campaigns);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
