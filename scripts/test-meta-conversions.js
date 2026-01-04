#!/usr/bin/env node

/**
 * Meta Ads API - Complete Insights & Conversion Data
 * Fetches conversion actions, leads, and full insights breakdown
 */

const https = require('https');
require('dotenv').config();

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_BUSINESS_ACCOUNT_ID = process.env.META_BUSINESS_ACCOUNT_ID;

function makeMetaRequest(path) {
  return new Promise((resolve, reject) => {
    const fullPath = `${path}${path.includes('?') ? '&' : '?'}access_token=${META_ACCESS_TOKEN}`;
    
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: fullPath,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function analyzeConversions() {
  console.log('🎯 META ADS CONVERSION & LEADS ANALYSIS\n');
  console.log('═'.repeat(100));

  try {
    // Get ad accounts
    const adAccountsResp = await makeMetaRequest(
      `/v18.0/${META_BUSINESS_ACCOUNT_ID}/owned_ad_accounts?fields=id,name`
    );

    const adAccount = adAccountsResp.data.data[0];
    console.log(`\n📍 Ad Account: ${adAccount.name}\n`);

    // Get campaigns with conversion insights
    console.log('🔍 Fetching active campaigns with conversion data...\n');
    
    const campaignsResp = await makeMetaRequest(
      `/v18.0/${adAccount.id}/campaigns?fields=id,name,status,insights.date_preset(last_30d){spend,impressions,clicks,actions,action_values}&limit=50`
    );

    const activeCampaigns = campaignsResp.data.data.filter(c => c.status === 'ACTIVE');
    
    console.log(`📋 Active Campaigns: ${activeCampaigns.length}\n`);
    console.log('═'.repeat(100));

    activeCampaigns.forEach((camp, idx) => {
      const insights = camp.insights?.data?.[0] || {};
      const spend = parseFloat(insights.spend) || 0;
      const impressions = parseInt(insights.impressions) || 0;
      const clicks = parseInt(insights.clicks) || 0;
      const actions = insights.actions || [];

      console.log(`\n${idx + 1}. ${camp.name}`);
      console.log(`   Campaign ID: ${camp.id}`);
      console.log(`\n   📊 METRICS:`);
      console.log(`      Spend: $${spend.toFixed(2)}`);
      console.log(`      Impressions: ${impressions.toLocaleString()}`);
      console.log(`      Clicks: ${clicks.toLocaleString()}`);
      console.log(`      CPC: $${clicks > 0 ? (spend / clicks).toFixed(2) : '0.00'}`);
      console.log(`      CPM: $${impressions > 0 ? (spend / impressions * 1000).toFixed(2) : '0.00'}`);
      console.log(`      CTR: ${impressions > 0 ? (clicks / impressions * 100).toFixed(2) : '0.00'}%`);

      if (actions.length > 0) {
        console.log(`\n   🎯 CONVERSIONS:`);
        actions.forEach(action => {
          console.log(`      • ${action.action_type}: ${action.value}`);
        });
      }
    });

    // Get all ad sets with conversion data
    console.log('\n\n' + '═'.repeat(100));
    console.log('\n📋 AD SETS WITH CONVERSION BREAKDOWN\n');

    const adSetsResp = await makeMetaRequest(
      `/v18.0/${adAccount.id}/adsets?fields=id,name,campaign_id,status,insights.date_preset(last_30d){spend,impressions,clicks,actions,action_values}&limit=50`
    );

    if (adSetsResp.data.data && adSetsResp.data.data.length > 0) {
      const activeAdSets = adSetsResp.data.data.filter(a => a.status === 'ACTIVE');
      console.log(`📊 Active Ad Sets: ${activeAdSets.length}\n`);

      activeAdSets.slice(0, 5).forEach((adset, idx) => {
        const insights = adset.insights?.data?.[0] || {};
        const spend = parseFloat(insights.spend) || 0;
        const clicks = parseInt(insights.clicks) || 0;
        const actions = insights.actions || [];

        console.log(`${idx + 1}. ${adset.name}`);
        console.log(`   Spend: $${spend.toFixed(2)} | Clicks: ${clicks}`);
        
        if (actions.length > 0) {
          console.log(`   Conversions: ${actions.map(a => `${a.action_type}(${a.value})`).join(', ')}`);
        }
        console.log('');
      });
    }

    // Test Conversion Pixel
    console.log('═'.repeat(100));
    console.log('\n🎯 CONVERSION TRACKING TEST\n');

    const pixelResp = await makeMetaRequest(
      `/v18.0/${process.env.META_PIXEL_ID}?fields=id,name,events`
    );

    if (pixelResp.status === 200) {
      console.log(`✅ Pixel Connected: ${pixelResp.data.name}`);
      console.log(`   Pixel ID: ${pixelResp.data.id}`);
      if (pixelResp.data.events) {
        console.log(`   Events Tracked: ${pixelResp.data.events.length}`);
      }
    }

    console.log('\n' + '═'.repeat(100));
    console.log('\n✅ Meta Ads Conversion Analysis Complete\n');

  } catch (err) {
    console.error('❌ ERROR:', err.message);
    process.exit(1);
  }
}

analyzeConversions();
