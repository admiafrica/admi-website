#!/usr/bin/env node

/**
 * Meta Ads API - Campaign Performance Test
 * Fetches detailed campaign metrics and performance data
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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function runCampaignAnalysis() {
  console.log('📊 META ADS CAMPAIGN PERFORMANCE ANALYSIS\n');
  console.log('═'.repeat(100));

  try {
    // Get ad accounts
    const adAccountsResp = await makeMetaRequest(
      `/v18.0/${META_BUSINESS_ACCOUNT_ID}/owned_ad_accounts?fields=id,name`
    );

    if (!adAccountsResp.data.data || adAccountsResp.data.data.length === 0) {
      console.error('❌ No ad accounts found');
      return;
    }

    const adAccount = adAccountsResp.data.data[0];
    console.log(`\n📍 Ad Account: ${adAccount.name} (${adAccount.id})\n`);

    // Get all campaigns with metrics
    console.log('🔍 Fetching campaigns with performance metrics...\n');
    
    const campaignsResp = await makeMetaRequest(
      `/v18.0/${adAccount.id}/campaigns?fields=id,name,status,objective,created_time,insights.date_preset(last_90d){spend,impressions,clicks,actions}&limit=50`
    );

    if (!campaignsResp.data.data) {
      console.error('❌ Failed to fetch campaigns');
      console.log(campaignsResp.data);
      return;
    }

    const campaigns = campaignsResp.data.data;
    console.log(`📋 Found ${campaigns.length} campaigns\n`);
    console.log('═'.repeat(100));

    let totalSpend = 0;
    let totalImpressions = 0;
    let totalClicks = 0;
    let activeCampaigns = 0;
    let pausedCampaigns = 0;

    // Organize by status
    const active = campaigns.filter(c => c.status === 'ACTIVE');
    const paused = campaigns.filter(c => c.status === 'PAUSED');

    console.log(`\n🟢 ACTIVE CAMPAIGNS (${active.length})\n`);
    active.forEach((camp, i) => {
      const insights = camp.insights?.data?.[0] || {};
      const spend = parseFloat(insights.spend) || 0;
      const impressions = parseInt(insights.impressions) || 0;
      const clicks = parseInt(insights.clicks) || 0;
      const cpc = clicks > 0 ? (spend / clicks).toFixed(2) : '0.00';
      const cpm = impressions > 0 ? (spend / impressions * 1000).toFixed(2) : '0.00';

      totalSpend += spend;
      totalImpressions += impressions;
      totalClicks += clicks;
      activeCampaigns++;

      console.log(`${i + 1}. ${camp.name}`);
      console.log(`   ID: ${camp.id}`);
      console.log(`   Objective: ${camp.objective}`);
      console.log(`   Status: ${camp.status}`);
      console.log(`   Spend: $${spend.toFixed(2)} | Impressions: ${impressions.toLocaleString()} | Clicks: ${clicks.toLocaleString()}`);
      console.log(`   CPC: $${cpc} | CPM: $${cpm}`);
      console.log('');
    });

    console.log('═'.repeat(100));
    console.log(`\n🔴 PAUSED CAMPAIGNS (${paused.length})\n`);
    paused.slice(0, 10).forEach((camp, i) => {
      console.log(`${i + 1}. ${camp.name}`);
      console.log(`   ID: ${camp.id} | Status: ${camp.status} | Objective: ${camp.objective}`);
    });

    if (paused.length > 10) {
      console.log(`\n... and ${paused.length - 10} more paused campaigns`);
    }

    console.log('\n' + '═'.repeat(100));
    console.log('\n📊 SUMMARY (Last 90 Days)\n');
    console.log(`Total Spend: $${totalSpend.toFixed(2)}`);
    console.log(`Total Impressions: ${totalImpressions.toLocaleString()}`);
    console.log(`Total Clicks: ${totalClicks.toLocaleString()}`);
    console.log(`Active Campaigns: ${activeCampaigns}`);
    console.log(`Paused Campaigns: ${pausedCampaigns}`);

    if (totalClicks > 0) {
      console.log(`Overall CPC: $${(totalSpend / totalClicks).toFixed(2)}`);
    }
    if (totalImpressions > 0) {
      console.log(`Overall CPM: $${(totalSpend / totalImpressions * 1000).toFixed(2)}`);
      console.log(`Overall CTR: ${(totalClicks / totalImpressions * 100).toFixed(2)}%`);
    }

    // Test 2: Get Ads from Active Campaign
    if (active.length > 0) {
      console.log('\n' + '═'.repeat(100));
      console.log(`\n🎯 ADS FROM ACTIVE CAMPAIGN: ${active[0].name}\n`);

      const adsResp = await makeMetaRequest(
        `/v18.0/${active[0].id}/ads?fields=id,name,status,created_time,insights.date_preset(last_30d){spend,impressions,clicks,actions}&limit=10`
      );

      if (adsResp.data.data && adsResp.data.data.length > 0) {
        adsResp.data.data.forEach((ad, i) => {
          const insights = ad.insights?.data?.[0] || {};
          const spend = parseFloat(insights.spend) || 0;
          const impressions = parseInt(insights.impressions) || 0;
          const clicks = parseInt(insights.clicks) || 0;

          console.log(`${i + 1}. ${ad.name}`);
          console.log(`   Status: ${ad.status} | Created: ${new Date(ad.created_time).toLocaleDateString()}`);
          console.log(`   Spend: $${spend.toFixed(2)} | Impressions: ${impressions} | Clicks: ${clicks}`);
        });
      }
    }

    console.log('\n' + '═'.repeat(100));
    console.log('\n✅ Campaign Performance Analysis Complete\n');

  } catch (err) {
    console.error('❌ ERROR:', err.message);
    process.exit(1);
  }
}

runCampaignAnalysis();
