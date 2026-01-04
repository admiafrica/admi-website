#!/usr/bin/env node

/**
 * Meta Ads API Test Script
 * Tests connection and data retrieval from Meta Business Account
 */

const https = require('https');
require('dotenv').config();

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_BUSINESS_ACCOUNT_ID = process.env.META_BUSINESS_ACCOUNT_ID;
const META_APP_ID = process.env.META_APP_ID;
const META_PIXEL_ID = process.env.META_PIXEL_ID;

console.log('🧪 META ADS API TEST\n');
console.log('═'.repeat(80));

// Validate credentials
console.log('\n📋 Configuration Check:');
console.log(`  ✓ META_APP_ID: ${META_APP_ID ? 'SET' : '❌ MISSING'}`);
console.log(`  ✓ META_BUSINESS_ACCOUNT_ID: ${META_BUSINESS_ACCOUNT_ID ? 'SET' : '❌ MISSING'}`);
console.log(`  ✓ META_PIXEL_ID: ${META_PIXEL_ID ? 'SET' : '❌ MISSING'}`);
console.log(`  ✓ META_ACCESS_TOKEN: ${META_ACCESS_TOKEN ? 'SET (' + META_ACCESS_TOKEN.length + ' chars)' : '❌ MISSING'}`);

if (!META_ACCESS_TOKEN || !META_BUSINESS_ACCOUNT_ID) {
  console.error('\n❌ Missing required credentials. Cannot proceed.');
  process.exit(1);
}

function makeMetaRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const fullPath = `${path}${path.includes('?') ? '&' : '?'}access_token=${META_ACCESS_TOKEN}`;
    
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: fullPath,
      method: method,
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

async function runTests() {
  try {
    // Test 1: Get Business Account Info
    console.log('\n\n🔍 TEST 1: Get Business Account Info');
    console.log('─'.repeat(80));
    const accountResp = await makeMetaRequest(`/v18.0/${META_BUSINESS_ACCOUNT_ID}?fields=id,name`);
    
    if (accountResp.status === 200) {
      console.log('✅ SUCCESS - Business Account Data:');
      console.log(`   ID: ${accountResp.data.id}`);
      console.log(`   Name: ${accountResp.data.name}`);
    } else {
      console.log(`❌ FAILED (Status: ${accountResp.status})`);
      console.log('Response:', JSON.stringify(accountResp.data, null, 2));
    }

    // Test 2: Get Ad Accounts
    console.log('\n\n🔍 TEST 2: Get Ad Accounts under Business Account');
    console.log('─'.repeat(80));
    const adAccountsResp = await makeMetaRequest(`/v18.0/${META_BUSINESS_ACCOUNT_ID}/owned_ad_accounts?fields=id,name,account_status,currency`);
    
    if (adAccountsResp.status === 200 && adAccountsResp.data.data) {
      console.log(`✅ SUCCESS - Found ${adAccountsResp.data.data.length} Ad Account(s):`);
      adAccountsResp.data.data.forEach((acc, i) => {
        console.log(`\n   [${i + 1}] ID: ${acc.id}`);
        console.log(`       Name: ${acc.name}`);
        console.log(`       Status: ${acc.account_status}`);
        console.log(`       Currency: ${acc.currency}`);
      });
    } else {
      console.log(`❌ FAILED (Status: ${adAccountsResp.status})`);
      console.log('Response:', JSON.stringify(adAccountsResp.data, null, 2));
    }

    // Test 3: Get Campaigns (for the first ad account)
    if (adAccountsResp.data.data && adAccountsResp.data.data[0]) {
      const adAccountId = adAccountsResp.data.data[0].id;
      
      console.log('\n\n🔍 TEST 3: Get Campaigns from First Ad Account');
      console.log('─'.repeat(80));
      const campaignsResp = await makeMetaRequest(`/v18.0/${adAccountId}/campaigns?fields=id,name,status,spend,objective&limit=10`);
      
      if (campaignsResp.status === 200 && campaignsResp.data.data) {
        console.log(`✅ SUCCESS - Found ${campaignsResp.data.data.length} Campaign(s):`);
        campaignsResp.data.data.forEach((camp, i) => {
          console.log(`\n   [${i + 1}] ID: ${camp.id}`);
          console.log(`       Name: ${camp.name}`);
          console.log(`       Status: ${camp.status}`);
          console.log(`       Objective: ${camp.objective}`);
          console.log(`       Spend: ${camp.spend}`);
        });
      } else {
        console.log(`❌ FAILED (Status: ${campaignsResp.status})`);
        console.log('Response:', JSON.stringify(campaignsResp.data, null, 2));
      }

      // Test 4: Get Ad Sets
      console.log('\n\n🔍 TEST 4: Get Ad Sets from First Campaign');
      console.log('─'.repeat(80));
      
      if (campaignsResp.data.data && campaignsResp.data.data[0]) {
        const campaignId = campaignsResp.data.data[0].id;
        const adSetsResp = await makeMetaRequest(`/v18.0/${campaignId}/adsets?fields=id,name,status,daily_budget,lifetime_budget&limit=5`);
        
        if (adSetsResp.status === 200 && adSetsResp.data.data) {
          console.log(`✅ SUCCESS - Found ${adSetsResp.data.data.length} Ad Set(s):`);
          adSetsResp.data.data.forEach((adset, i) => {
            console.log(`\n   [${i + 1}] ID: ${adset.id}`);
            console.log(`       Name: ${adset.name}`);
            console.log(`       Status: ${adset.status}`);
            console.log(`       Daily Budget: ${adset.daily_budget}`);
            console.log(`       Lifetime Budget: ${adset.lifetime_budget}`);
          });
        } else {
          console.log(`❌ FAILED (Status: ${adSetsResp.status})`);
          console.log('Response:', JSON.stringify(adSetsResp.data, null, 2));
        }
      }

      // Test 5: Get Pixel Data (if available)
      if (META_PIXEL_ID) {
        console.log('\n\n🔍 TEST 5: Get Pixel Info');
        console.log('─'.repeat(80));
        const pixelResp = await makeMetaRequest(`/v18.0/${META_PIXEL_ID}?fields=id,name,creation_time`);
        
        if (pixelResp.status === 200) {
          console.log('✅ SUCCESS - Pixel Data:');
          console.log(`   ID: ${pixelResp.data.id}`);
          console.log(`   Name: ${pixelResp.data.name}`);
          console.log(`   Created: ${pixelResp.data.creation_time}`);
        } else {
          console.log(`❌ FAILED (Status: ${pixelResp.status})`);
          console.log('Response:', JSON.stringify(pixelResp.data, null, 2));
        }
      }
    }

    console.log('\n\n' + '═'.repeat(80));
    console.log('✅ META ADS API TEST COMPLETE\n');

  } catch (err) {
    console.error('❌ ERROR:', err.message);
    process.exit(1);
  }
}

runTests();
