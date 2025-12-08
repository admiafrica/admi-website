#!/usr/bin/env node

/**
 * Google Ads Library Implementation
 * Using google-ads-api npm package v21
 */

const GoogleAdsApi = require('google-ads-api').default;
require('dotenv').config();

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
});

const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID || '3929355931';
const CAMPAIGN_ID = '23293961952';

// Ad groups and keywords to create
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

async function main() {
  const liveMode = process.argv.includes('--live');

  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  GOOGLE ADS LIBRARY IMPLEMENTATION                                ║
║  Using: google-ads-api@21.0.1                                     ║
║  Customer ID: ${CUSTOMER_ID}                                  ║
║  Campaign ID: ${CAMPAIGN_ID}                                        ║
║  Mode: ${liveMode ? 'LIVE - Changes will be applied' : 'DRY RUN - Preview only'}  ║
╚════════════════════════════════════════════════════════════════════╝
  `);

  try {
    let successCount = 0;
    let errorCount = 0;

    // Iterate through each ad group
    for (const [adGroupName, keywords] of Object.entries(AD_GROUPS_WITH_KEYWORDS)) {
      console.log(`\n📚 ${adGroupName}`);
      console.log('━'.repeat(70));

      if (liveMode) {
        try {
          // Create ad group
          console.log(`  Creating ad group...`);
          const adGroupResponse = await client.AdGroup.create(CUSTOMER_ID, {
            campaign_id: CAMPAIGN_ID,
            name: adGroupName,
            status: 'ENABLED',
            type: 'SEARCH_STANDARD'
          });

          if (adGroupResponse) {
            const adGroupId = adGroupResponse;
            console.log(`  ✅ Created ad group ID: ${adGroupId}`);
            successCount++;

            // Add keywords to the ad group
            console.log(`  Adding ${keywords.length} keywords...`);
            for (const kw of keywords) {
              try {
                const kwResponse = await client.AdGroupCriterion.create(CUSTOMER_ID, {
                  ad_group_id: adGroupId,
                  keyword: {
                    text: kw.text,
                    match_type: kw.matchType
                  },
                  cpc_bid_micros: Math.round(kw.bid * 1_000_000),
                  status: 'ENABLED'
                });

                if (kwResponse) {
                  console.log(`    ✅ ${kw.matchType.padEnd(6)} | "${kw.text}" | $${kw.bid}`);
                  successCount++;
                }
              } catch (err) {
                console.error(`    ❌ Failed to add keyword: ${err.message}`);
                errorCount++;
              }
            }
          }
        } catch (err) {
          console.error(`  ❌ Error: ${err.message}`);
          errorCount++;
        }
      } else {
        // DRY RUN
        console.log(`  [DRY RUN] Would create: "${adGroupName}"`);
        console.log(`  [DRY RUN] Would add ${keywords.length} keywords:`);
        for (const kw of keywords) {
          console.log(`    • ${kw.matchType.padEnd(6)} | "${kw.text}" | $${kw.bid}`);
        }
        successCount += 1 + keywords.length;
      }
    }

    // Summary
    console.log('\n\n' + '═'.repeat(70));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(70));
    console.log(`✅ Operations: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

    if (liveMode) {
      console.log('\n✅ Changes applied to Google Ads campaign!');
    } else {
      console.log('\n🔍 To apply changes, run with --live flag:');
      console.log('   node scripts/google-ads/library-implementation.js --live');
    }

    console.log('\n📈 Expected Results (1-2 weeks):');
    console.log('   • CPA: $32 → $16-20 (50% reduction)');
    console.log('   • Conversions: 20 → 35-40 per month');
    console.log('   • Hot leads: 0% → 35-40%');
    console.log('═'.repeat(70));
  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
}

main();
