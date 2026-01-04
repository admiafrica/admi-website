#!/usr/bin/env node

/**
 * COMPLETE CUSTOMER JOURNEY ANALYSIS
 * November 29, 2025 - January 31, 2026
 *
 * Full end-to-end tracking:
 * 1. Google Ads (Search + Performance Max) → GA4 → Brevo → Pipeline
 * 2. Meta Ads (Facebook + Instagram) → GA4 → Brevo → Pipeline
 * 3. Organic Traffic → GA4 → Brevo → Pipeline
 *
 * Tracks complete funnel:
 * Ad Click → Website Session → Form Submit → Lead Created → Pipeline Progress → Paid Student
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https');
const fs = require('fs');
const path = require('path');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const { GoogleAdsApi } = require('google-ads-api');

// Load environment variables
require('dotenv').config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const GA_PROPERTY_ID = process.env.GA4_PROPERTY_ID || process.env.GOOGLE_ANALYTICS_PROPERTY_ID || process.env.GA_PROPERTY_ID || '448618054';
const PIPELINE_ID = '68e60a790c87b5f2cbfec788'; // January 2026 Pipeline

// Google Ads API credentials
const GOOGLE_ADS_CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const GOOGLE_ADS_CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const GOOGLE_ADS_DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
const GOOGLE_ADS_REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN;
const GOOGLE_ADS_CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID;

// Meta Ads API credentials
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_BUSINESS_ACCOUNT_ID = process.env.META_BUSINESS_ACCOUNT_ID;

// Analysis period
const START_DATE = '2025-11-29';
const END_DATE = '2026-01-31';

// Validate environment
if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found');
  process.exit(1);
}

// Stage IDs for January 2026 Pipeline
// Based on actual pipeline structure at https://app.brevo.com/crm/deals/kanban?pipeline=68e60a790c87b5f2cbfec788
const STAGE_NAMES = {
  '2ixzacgsn412m7y0ed20st5': 'Unqualified',
  'f17io0yg7xl1rdmb5cy1d44': 'MQL',  // Marketing Qualified Lead
  '39539oz5gs2ktjvywn7pl6v': 'SQL',  // Sales Qualified Lead
  '27x209expgyhg8428lh7ocn': 'Applied',
  'pwi0xiqbtdwe6brfz7vgxen': 'Decision Making',
  // Note: Enrolled and Lost stages exist but have 0 deals currently (no stage IDs found)
};

// Constants for cost analysis
const TUITION_PER_TERM_KES = 50000;
const ESTIMATED_DAILY_AD_SPEND_KES = 123; // Based on previous analysis
const USD_TO_KES_RATE = 129; // Current exchange rate (update as needed)

// ============================================================================
// GOOGLE ADS API - FETCH ACTUAL SPEND DATA
// ============================================================================

async function fetchGoogleAdsSpend() {
  console.log(`\n💰 Fetching actual Google Ads spend data (${START_DATE} to ${END_DATE})...`);

  if (!GOOGLE_ADS_CLIENT_ID || !GOOGLE_ADS_DEVELOPER_TOKEN || !GOOGLE_ADS_CUSTOMER_ID) {
    console.log('⚠️  Google Ads API credentials not configured - using estimated spend');
    return null;
  }

  try {
    const client = new GoogleAdsApi({
      client_id: GOOGLE_ADS_CLIENT_ID,
      client_secret: GOOGLE_ADS_CLIENT_SECRET,
      developer_token: GOOGLE_ADS_DEVELOPER_TOKEN
    });

    const customer = client.Customer({
      customer_id: GOOGLE_ADS_CUSTOMER_ID,
      refresh_token: GOOGLE_ADS_REFRESH_TOKEN
    });

    // Convert dates to YYYYMMDD format for Google Ads API
    const startDateFormatted = START_DATE.replace(/-/g, '');
    const endDateFormatted = new Date().toISOString().split('T')[0].replace(/-/g, '');

    // Query for campaign performance
    const query = `
      SELECT
        campaign.name,
        campaign.id,
        metrics.cost_micros,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions
      FROM campaign
      WHERE segments.date BETWEEN '${startDateFormatted}' AND '${endDateFormatted}'
        AND campaign.status = 'ENABLED'
    `;

    const campaigns = await customer.query(query);

    let totalSpendMicros = 0;
    const campaignData = [];

    for (const row of campaigns) {
      const cost = parseInt(row.metrics.cost_micros || 0);
      totalSpendMicros += cost;

      campaignData.push({
        name: row.campaign.name,
        id: row.campaign.id,
        spend: cost / 1000000, // Convert micros to currency
        impressions: parseInt(row.metrics.impressions || 0),
        clicks: parseInt(row.metrics.clicks || 0),
        conversions: parseFloat(row.metrics.conversions || 0)
      });
    }

    const totalSpendUSD = totalSpendMicros / 1000000; // Convert micros to USD
    const totalSpendKES = totalSpendUSD * USD_TO_KES_RATE; // Convert USD to KES

    console.log(`\n📋 Campaign Breakdown:`);
    campaignData.forEach(campaign => {
      console.log(`   • ${campaign.name}: $${campaign.spend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`);
    });

    console.log(`\n✅ Total Google Ads Spend: $${totalSpendUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD (KES ${totalSpendKES.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`);
    console.log(`✅ Exchange Rate: 1 USD = ${USD_TO_KES_RATE} KES`);
    console.log(`✅ Campaigns analyzed: ${campaignData.length}`);

    return {
      totalSpendUSD: totalSpendUSD,
      totalSpendKES: totalSpendKES,
      exchangeRate: USD_TO_KES_RATE,
      campaigns: campaignData,
      totalImpressions: campaignData.reduce((sum, c) => sum + c.impressions, 0),
      totalClicks: campaignData.reduce((sum, c) => sum + c.clicks, 0),
      totalConversions: campaignData.reduce((sum, c) => sum + c.conversions, 0)
    };
  } catch (error) {
    console.error(`❌ Error fetching Google Ads data: ${error.message}`);
    console.log('⚠️  Falling back to estimated spend');
    return null;
  }
}

// ============================================================================
// META ADS API - FETCH ACTUAL SPEND DATA
// ============================================================================

async function fetchMetaAdsSpend() {
  console.log(`\n📘 Fetching actual Meta Ads spend data (${START_DATE} to ${END_DATE})...`);

  if (!META_ACCESS_TOKEN || !META_BUSINESS_ACCOUNT_ID) {
    console.log('⚠️  Meta Ads API credentials not configured - skipping Meta spend');
    return null;
  }

  try {
    // First, get the ad account ID
    const adAccountsResp = await makeRequest({
      hostname: 'graph.facebook.com',
      path: `/v18.0/${META_BUSINESS_ACCOUNT_ID}/owned_ad_accounts?access_token=${META_ACCESS_TOKEN}&fields=id,name`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!adAccountsResp.data.data || adAccountsResp.data.data.length === 0) {
      console.error('❌ No ad accounts found under business account');
      return null;
    }

    const adAccountId = adAccountsResp.data.data[0].id;
    console.log(`   Using Ad Account: ${adAccountsResp.data.data[0].name} (${adAccountId})`);

    // Get campaigns with insights for the specific date range
    const today = new Date().toISOString().split('T')[0];
    const timeRange = encodeURIComponent(JSON.stringify({ since: START_DATE, until: today }));

    const response = await makeRequest({
      hostname: 'graph.facebook.com',
      path: `/v18.0/${adAccountId}/campaigns?access_token=${META_ACCESS_TOKEN}&fields=id,name,status,insights.time_range(${timeRange}){spend,impressions,clicks,actions}&limit=100`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.statusCode !== 200) {
      console.error(`❌ Meta API returned status ${response.statusCode}`);
      if (response.data && response.data.error) {
        console.error(`   Error: ${response.data.error.message || JSON.stringify(response.data.error)}`);
        console.error(`   Code: ${response.data.error.code}`);
      }
      console.log('⚠️  Note: Meta access token may need Ads Management permissions or may be expired');
      console.log('⚠️  Skipping Meta spend data');
      return null;
    }

    const campaigns = response.data.data || [];
    let totalSpendUSD = 0;
    const campaignData = [];

    for (const campaign of campaigns) {
      // Insights are nested in the campaign object
      const insights = campaign.insights?.data?.[0] || {};
      const spend = parseFloat(insights.spend || 0);

      if (spend > 0) {  // Only include campaigns with spend
        totalSpendUSD += spend;

        // Extract conversions from actions array
        let conversions = 0;
        if (insights.actions) {
          const leadAction = insights.actions.find(a =>
            a.action_type === 'lead' ||
            a.action_type === 'offsite_conversion.fb_pixel_lead' ||
            a.action_type === 'omni_complete_registration'
          );
          conversions = leadAction ? parseInt(leadAction.value) : 0;
        }

        campaignData.push({
          name: campaign.name,
          id: campaign.id,
          status: campaign.status,
          spend: spend,
          impressions: parseInt(insights.impressions || 0),
          clicks: parseInt(insights.clicks || 0),
          conversions: conversions
        });
      }
    }

    const totalSpendKES = totalSpendUSD * USD_TO_KES_RATE;

    console.log(`\n📋 Meta Campaign Breakdown:`);
    campaignData.forEach(campaign => {
      console.log(`   • ${campaign.name}: $${campaign.spend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`);
    });

    console.log(`\n✅ Total Meta Ads Spend: $${totalSpendUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD (KES ${totalSpendKES.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`);
    console.log(`✅ Exchange Rate: 1 USD = ${USD_TO_KES_RATE} KES`);
    console.log(`✅ Campaigns analyzed: ${campaignData.length}`);

    return {
      totalSpendUSD: totalSpendUSD,
      totalSpendKES: totalSpendKES,
      exchangeRate: USD_TO_KES_RATE,
      campaigns: campaignData,
      totalImpressions: campaignData.reduce((sum, c) => sum + c.impressions, 0),
      totalClicks: campaignData.reduce((sum, c) => sum + c.clicks, 0),
      totalConversions: campaignData.reduce((sum, c) => sum + c.conversions, 0)
    };
  } catch (error) {
    console.error(`❌ Error fetching Meta Ads data: ${error.message}`);
    console.log('⚠️  Skipping Meta spend data');
    return null;
  }
}

// ============================================================================
// HTTPS REQUEST HELPER
// ============================================================================

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(JSON.stringify(postData));
    req.end();
  });
}

// ============================================================================
// GOOGLE ANALYTICS DATA
// ============================================================================

async function fetchGoogleAnalyticsData() {
  console.log(`\n📊 Fetching Google Analytics data (${START_DATE} to ${END_DATE})...`);

  const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: path.join(__dirname, '../../ga-service-account.json')
  });

  try {
    // 1. Traffic by source/medium/campaign
    const [trafficResponse] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: START_DATE, endDate: END_DATE }],
      dimensions: [
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
        { name: 'sessionCampaignName' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ]
    });

    // 2. Form submissions (conversions)
    const [conversionsResponse] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: START_DATE, endDate: END_DATE }],
      dimensions: [
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
        { name: 'sessionCampaignName' },
        { name: 'eventName' }
      ],
      metrics: [
        { name: 'eventCount' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'CONTAINS',
            value: 'form_submit'
          }
        }
      }
    });

    const analytics = {
      trafficByCampaign: parseAnalyticsRows(trafficResponse.rows),
      conversions: parseAnalyticsRows(conversionsResponse.rows)
    };

    // Aggregate by source
    const bySource = {};

    if (trafficResponse.rows) {
      trafficResponse.rows.forEach(row => {
        const source = row.dimensionValues[0].value;
        const medium = row.dimensionValues[1].value;
        const campaign = row.dimensionValues[2].value;
        const key = classifyTrafficSource(source, medium, campaign);

        if (!bySource[key]) {
          bySource[key] = {
            sessions: 0,
            users: 0,
            newUsers: 0,
            conversions: 0,
            engagementRate: 0,
            bounceRate: 0
          };
        }

        bySource[key].sessions += parseInt(row.metricValues[0].value);
        bySource[key].users += parseInt(row.metricValues[1].value);
        bySource[key].newUsers += parseInt(row.metricValues[2].value);
        bySource[key].conversions += parseInt(row.metricValues[6].value);
      });
    }

    console.log(`✅ Total Sessions: ${Object.values(bySource).reduce((sum, d) => sum + d.sessions, 0)}`);
    console.log(`✅ Total Conversions: ${Object.values(bySource).reduce((sum, d) => sum + d.conversions, 0)}`);

    return { bySource, raw: analytics };
  } catch (error) {
    console.error('❌ Error fetching Google Analytics data:', error.message);
    return { bySource: {}, raw: { error: error.message } };
  }
}

function parseAnalyticsRows(rows) {
  if (!rows) return [];

  return rows.map(row => {
    const result = {};

    row.dimensionValues?.forEach((dim, i) => {
      result[`dimension${i}`] = dim.value;
    });

    row.metricValues?.forEach((metric, i) => {
      result[`metric${i}`] = metric.value;
    });

    return result;
  });
}

function classifyTrafficSource(source, medium, campaign) {
  source = (source || '').toLowerCase();
  medium = (medium || '').toLowerCase();
  campaign = (campaign || '').toLowerCase();

  // Google Ads
  if (source === 'google' && (medium === 'cpc' || medium === 'paid')) {
    if (campaign.includes('search')) return 'Google Search Ads';
    if (campaign.includes('pmax') || campaign.includes('performance')) return 'Google Performance Max';
    return 'Google Ads (Other)';
  }

  // Meta Ads
  if (source === 'facebook' || source === 'meta') return 'Meta Ads (Facebook)';
  if (source === 'instagram') return 'Meta Ads (Instagram)';

  // Organic
  if (medium === 'organic') return 'Organic Search';
  if (source === 'direct' || source === '(direct)') return 'Direct';

  return 'Other';
}

// ============================================================================
// BREVO CRM DATA
// ============================================================================

async function fetchBrevoContacts(startDate, endDate) {
  console.log(`\n📥 Fetching Brevo CRM contacts (${startDate} to ${endDate})...`);

  const start = new Date(startDate);
  const end = new Date(endDate);

  let allContacts = [];
  let offset = 0;
  const limit = 500;

  while (true) {
    const options = {
      hostname: 'api.brevo.com',
      path: `/v3/contacts?limit=${limit}&offset=${offset}`,
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const response = await makeRequest(options);

    if (response.statusCode !== 200 || !response.data.contacts || response.data.contacts.length === 0) {
      break;
    }

    // Filter by createdAt within date range
    const filteredContacts = response.data.contacts.filter(contact => {
      const createdAt = new Date(contact.createdAt);
      return createdAt >= start && createdAt <= end;
    });

    allContacts = allContacts.concat(filteredContacts);
    offset += limit;

    process.stdout.write(`\r   Fetched ${allContacts.length} contacts in period...`);

    if (response.data.contacts.length < limit) break;
  }

  console.log(`\n✅ Total contacts in period: ${allContacts.length}`);
  return allContacts;
}

// ============================================================================
// BREVO PIPELINE DATA (January 2026)
// ============================================================================

async function fetchPipelineDeals() {
  console.log(`\n📥 Fetching January 2026 pipeline deals...`);

  let allDeals = [];
  let offset = 0;
  const limit = 500;

  while (true) {
    const options = {
      hostname: 'api.brevo.com',
      path: `/v3/crm/deals?limit=${limit}&offset=${offset}`,
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'accept': 'application/json'
      }
    };

    const response = await makeRequest(options);

    if (response.statusCode !== 200 || !response.data.items || response.data.items.length === 0) {
      break;
    }

    // Filter for January 2026 pipeline only
    const pipelineDeals = response.data.items.filter(d =>
      d.attributes?.pipeline === PIPELINE_ID
    );

    allDeals = allDeals.concat(pipelineDeals);
    offset += limit;

    process.stdout.write(`\r   Fetched ${allDeals.length} pipeline deals...`);

    if (response.data.items.length < limit) break;
  }

  console.log(`\n✅ Total pipeline deals: ${allDeals.length}`);
  return allDeals;
}

// ============================================================================
// LEAD ANALYSIS & CLASSIFICATION
// ============================================================================

function classifyLeadSource(contact) {
  if (!contact || !contact.attributes) return 'Unknown Source';

  const utmSource = (contact.attributes.UTM_SOURCE || '').toLowerCase();
  const utmMedium = (contact.attributes.UTM_MEDIUM || '').toLowerCase();
  const utmCampaign = (contact.attributes.UTM_CAMPAIGN || '').toLowerCase();

  // Google Ads
  if (utmSource === 'google') {
    if (utmMedium === 'cpc' || utmMedium === 'paid') {
      if (utmCampaign.includes('search')) return 'Google Search Ads';
      if (utmCampaign.includes('pmax') || utmCampaign.includes('performance')) return 'Google Performance Max';
      return 'Google Ads (Other)';
    }
  }

  // Meta Ads
  if (utmSource === 'meta' || utmSource === 'facebook') return 'Meta Ads (Facebook)';
  if (utmSource === 'instagram') return 'Meta Ads (Instagram)';

  // Organic
  if (utmMedium === 'organic') return 'Organic Search';
  if (utmSource === 'direct' || !utmSource) return 'Direct';

  return 'Other';
}

function calculateLeadScore(attrs) {
  let score = 0;

  // Timeline readiness (max 5 points)
  const timeline = (attrs.ENROLLMENT_TIMELINE || '').toLowerCase();
  if (timeline.includes('immediate') || timeline.includes('january 2026')) score += 5;
  else if (timeline.includes('april') || timeline.includes('next intake')) score += 4;
  else if (timeline.includes('2026')) score += 3;
  else if (timeline.includes('just exploring')) score += 1;

  // Course interest specificity (max 4 points)
  const course = (attrs.COURSE_INTEREST || attrs.PREFERRED_COURSE || '').toLowerCase();
  if (course && course !== 'not sure' && course !== 'just browsing') score += 4;
  else if (course) score += 2;

  // Financial readiness (max 4 points)
  const financing = (attrs.FINANCING_PLAN || '').toLowerCase();
  if (financing.includes('full payment') || financing.includes('ready to pay')) score += 4;
  else if (financing.includes('payment plan') || financing.includes('installments')) score += 3;
  else if (financing.includes('exploring') || financing.includes('need help')) score += 2;

  // Engagement level (max 4 points)
  const questions = attrs.SPECIFIC_QUESTIONS || '';
  if (questions && questions.length > 100) score += 4;
  else if (questions && questions.length > 50) score += 3;
  else if (questions) score += 2;

  // Phone provided (max 3 points)
  if (attrs.SMS || attrs.PHONE) score += 3;

  return score;
}

function getQualificationStatus(score) {
  if (score >= 15) return 'Hot Lead';
  if (score >= 10) return 'Warm Lead';
  if (score >= 5) return 'Cold Lead';
  return 'Unqualified';
}

function analyzeLeadsBySource(contacts) {
  const bySource = {};

  contacts.forEach(contact => {
    const attrs = contact.attributes || {};
    const source = classifyLeadSource(contact);
    const leadScore = attrs.QUALIFICATION_SCORE || calculateLeadScore(attrs);

    if (!bySource[source]) {
      bySource[source] = {
        count: 0,
        totalScore: 0,
        hot: 0,
        warm: 0,
        cold: 0,
        unqualified: 0,
        leads: []
      };
    }

    bySource[source].count++;
    bySource[source].totalScore += leadScore;

    const status = getQualificationStatus(leadScore);
    if (status === 'Hot Lead') bySource[source].hot++;
    else if (status === 'Warm Lead') bySource[source].warm++;
    else if (status === 'Cold Lead') bySource[source].cold++;
    else bySource[source].unqualified++;

    bySource[source].leads.push({
      id: contact.id,
      email: contact.email,
      name: `${attrs.FIRSTNAME || ''} ${attrs.LASTNAME || ''}`.trim(),
      leadScore,
      status,
      utm_source: attrs.UTM_SOURCE || '',
      utm_medium: attrs.UTM_MEDIUM || '',
      utm_campaign: attrs.UTM_CAMPAIGN || '',
      createdAt: contact.createdAt
    });
  });

  // Calculate averages
  Object.values(bySource).forEach(data => {
    data.avgLeadScore = (data.totalScore / data.count).toFixed(2);
    data.hotPercent = ((data.hot / data.count) * 100).toFixed(1);
    data.warmPercent = ((data.warm / data.count) * 100).toFixed(1);
  });

  return bySource;
}

// ============================================================================
// PIPELINE FUNNEL ANALYSIS
// ============================================================================

function analyzePipelineFunnel(deals, contacts) {
  console.log(`\n📊 Analyzing January 2026 pipeline funnel...`);

  const funnelBySource = {};
  // Updated stage order to match actual pipeline
  const stageOrder = [
    'Unqualified',
    'MQL',
    'SQL',
    'Applied',
    'Decision Making'
    // Enrolled and Lost exist but have 0 deals currently
  ];

  // Create contact lookup
  const contactLookup = {};
  contacts.forEach(c => {
    contactLookup[c.id] = c;
  });

  deals.forEach(deal => {
    const stageId = deal.attributes?.deal_stage;
    const stageName = STAGE_NAMES[stageId] || 'Unknown';

    // Get source from linked contact
    let source = 'Unknown Source';
    if (deal.linkedContactsIds && deal.linkedContactsIds.length > 0) {
      const contactId = deal.linkedContactsIds[0];
      const contact = contactLookup[contactId];
      if (contact) {
        source = classifyLeadSource(contact);
      }
    }

    if (!funnelBySource[source]) {
      funnelBySource[source] = {};
      stageOrder.forEach(stage => {
        funnelBySource[source][stage] = 0;
      });
    }

    funnelBySource[source][stageName]++;
  });

  // Calculate conversion rates through the funnel
  const conversionRates = {};
  Object.entries(funnelBySource).forEach(([source, stages]) => {
    const unqualified = stages['Unqualified'] || 0;
    const mql = stages['MQL'] || 0;
    const sql = stages['SQL'] || 0;
    const applied = stages['Applied'] || 0;
    const decisionMaking = stages['Decision Making'] || 0;

    conversionRates[source] = {
      unqualified,
      mql,
      sql,
      applied,
      decisionMaking,
      enrolled: 0,  // No deals in Enrolled stage yet
      paid: 0,      // No deals in paid stage yet
      unqualifiedToMQL: unqualified > 0 ? ((mql / unqualified) * 100).toFixed(1) : '0.0',
      mqlToSQL: mql > 0 ? ((sql / mql) * 100).toFixed(1) : '0.0',
      sqlToApplied: sql > 0 ? ((applied / sql) * 100).toFixed(1) : '0.0',
      appliedToDecisionMaking: applied > 0 ? ((decisionMaking / applied) * 100).toFixed(1) : '0.0',
      // Overall conversion from lead to furthest stage
      overallConversion: unqualified > 0 ? ((decisionMaking / unqualified) * 100).toFixed(2) : '0.00'
    };
  });

  return { funnelBySource, conversionRates };
}

// ============================================================================
// COMPREHENSIVE REPORT GENERATION
// ============================================================================

async function runCompleteJourneyAnalysis() {
  console.log('═'.repeat(80));
  console.log('📊 COMPLETE CUSTOMER JOURNEY ANALYSIS');
  console.log('═'.repeat(80));
  console.log(`📅 Period: ${START_DATE} to ${END_DATE}`);
  console.log('═'.repeat(80));

  // Calculate days in period
  const startDate = new Date(START_DATE);
  const endDate = new Date(END_DATE);
  const daysInPeriod = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  // 0. Fetch actual Google Ads and Meta Ads spend data
  const googleAdsData = await fetchGoogleAdsSpend();
  const metaAdsData = await fetchMetaAdsSpend();

  const googleAdSpend = googleAdsData?.totalSpendKES || 0;
  const metaAdSpend = metaAdsData?.totalSpendKES || 0;
  const totalAdSpend = googleAdSpend + metaAdSpend;
  const actualAdSpend = totalAdSpend > 0 ? totalAdSpend : (daysInPeriod * ESTIMATED_DAILY_AD_SPEND_KES);

  // 1. Fetch Google Analytics data (Ad clicks → Website sessions)
  const analyticsData = await fetchGoogleAnalyticsData();

  // 2. Fetch Brevo contacts (Website → Lead conversion)
  const contacts = await fetchBrevoContacts(START_DATE, END_DATE);
  const leadsBySource = analyzeLeadsBySource(contacts);

  // 3. Fetch all contacts for pipeline analysis
  console.log(`\n📥 Fetching all contacts for pipeline matching...`);
  let allContacts = [];
  let offset = 0;
  const limit = 500;

  while (true) {
    const options = {
      hostname: 'api.brevo.com',
      path: `/v3/contacts?limit=${limit}&offset=${offset}`,
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const response = await makeRequest(options);
    if (response.statusCode !== 200 || !response.data.contacts || response.data.contacts.length === 0) {
      break;
    }

    allContacts = allContacts.concat(response.data.contacts);
    offset += limit;

    process.stdout.write(`\r   Fetched ${allContacts.length} total contacts...`);

    if (response.data.contacts.length < limit) break;
  }
  console.log(`\n✅ Total contacts: ${allContacts.length}`);

  // 4. Fetch January 2026 pipeline deals (Lead → Paid conversion)
  const pipelineDeals = await fetchPipelineDeals();
  const { funnelBySource, conversionRates } = analyzePipelineFunnel(pipelineDeals, allContacts);

  // ============================================================================
  // GENERATE COMPREHENSIVE REPORT
  // ============================================================================

  const report = {
    generatedAt: new Date().toISOString(),
    period: {
      start: START_DATE,
      end: END_DATE,
      days: daysInPeriod
    },

    // Stage 1: Ad Performance → Website Traffic
    adPerformance: {
      totalAdSpend: actualAdSpend,
      googleAdsData: googleAdsData,
      metaAdsData: metaAdsData,
      hasActualSpend: (googleAdsData !== null || metaAdsData !== null),
      googleAnalytics: analyticsData.bySource,
      summary: {
        totalSessions: Object.values(analyticsData.bySource).reduce((sum, d) => sum + d.sessions, 0),
        totalUsers: Object.values(analyticsData.bySource).reduce((sum, d) => sum + d.users, 0),
        totalConversions: Object.values(analyticsData.bySource).reduce((sum, d) => sum + d.conversions, 0)
      }
    },

    // Stage 2: Website Traffic → Leads in CRM
    leadGeneration: {
      totalLeads: contacts.length,
      bySource: Object.fromEntries(
        Object.entries(leadsBySource)
          .sort((a, b) => b[1].count - a[1].count)
          .map(([source, data]) => [source, {
            count: data.count,
            avgLeadScore: data.avgLeadScore,
            hot: data.hot,
            warm: data.warm,
            cold: data.cold,
            unqualified: data.unqualified,
            hotPercent: data.hotPercent,
            warmPercent: data.warmPercent
          }])
      )
    },

    // Stage 3: Leads → Pipeline → Paid Students
    pipelineConversion: {
      totalDeals: pipelineDeals.length,
      funnelBySource,
      conversionRates: Object.fromEntries(
        Object.entries(conversionRates)
          .sort((a, b) => parseFloat(b[1].overallConversion) - parseFloat(a[1].overallConversion))
      )
    },

    // Complete Journey Metrics by Source
    completeJourney: generateCompleteJourneyMetrics(
      analyticsData.bySource,
      leadsBySource,
      conversionRates,
      actualAdSpend
    )
  };

  // ============================================================================
  // PRINT SUMMARY
  // ============================================================================

  console.log('\n' + '═'.repeat(80));
  console.log('📈 COMPLETE CUSTOMER JOURNEY SUMMARY');
  console.log('═'.repeat(80));

  console.log('\n💰 AD SPEND & TRAFFIC');
  if (report.adPerformance.hasActualSpend) {
    if (report.adPerformance.googleAdsData) {
      console.log(`   Google Ads Spend (Actual): $${report.adPerformance.googleAdsData.totalSpendUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD (KES ${report.adPerformance.googleAdsData.totalSpendKES.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`);
      console.log(`   Google Ads Clicks: ${report.adPerformance.googleAdsData.totalClicks.toLocaleString()}`);
      console.log(`   Google Ads Impressions: ${report.adPerformance.googleAdsData.totalImpressions.toLocaleString()}`);
    }
    if (report.adPerformance.metaAdsData) {
      console.log(`   Meta Ads Spend (Actual): $${report.adPerformance.metaAdsData.totalSpendUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD (KES ${report.adPerformance.metaAdsData.totalSpendKES.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`);
      console.log(`   Meta Ads Clicks: ${report.adPerformance.metaAdsData.totalClicks.toLocaleString()}`);
      console.log(`   Meta Ads Impressions: ${report.adPerformance.metaAdsData.totalImpressions.toLocaleString()}`);
    }
    console.log(`   Exchange Rate: 1 USD = ${USD_TO_KES_RATE} KES`);
    console.log(`   Total Ad Spend: KES ${actualAdSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  } else {
    console.log(`   Estimated Ad Spend (${daysInPeriod} days): KES ${actualAdSpend.toLocaleString()}`);
  }
  console.log(`   Total Sessions: ${report.adPerformance.summary.totalSessions.toLocaleString()}`);
  console.log(`   Total Users: ${report.adPerformance.summary.totalUsers.toLocaleString()}`);
  console.log(`   GA4 Conversions: ${report.adPerformance.summary.totalConversions.toLocaleString()}`);

  console.log('\n📊 GOOGLE ANALYTICS FUNNEL (Sessions → Leads)');
  Object.entries(analyticsData.bySource)
    .sort((a, b) => b[1].sessions - a[1].sessions)
    .slice(0, 5)  // Top 5 sources
    .forEach(([source, data]) => {
      const leads = leadsBySource[source]?.count || 0;
      const conversionRate = data.sessions > 0 ? ((leads / data.sessions) * 100).toFixed(2) : '0.00';
      console.log(`   ${source}: ${data.sessions.toLocaleString()} sessions → ${leads} leads (${conversionRate}%)`);
    });

  console.log('\n📥 LEAD GENERATION');
  console.log(`   Total Leads in Brevo: ${report.leadGeneration.totalLeads}`);
  console.log('\n   By Source:');
  Object.entries(report.leadGeneration.bySource).forEach(([source, data]) => {
    console.log(`   • ${source}: ${data.count} leads (Avg Score: ${data.avgLeadScore}, ${data.hotPercent}% Hot)`);
  });

  console.log('\n📊 PIPELINE CONVERSION (January 2026)');
  console.log(`   Total Pipeline Deals: ${report.pipelineConversion.totalDeals}`);
  Object.entries(report.pipelineConversion.conversionRates).forEach(([source, rates]) => {
    if (parseInt(rates.unqualified) > 0) {
      console.log(`\n   ${source}:`);
      console.log(`     Unqualified: ${rates.unqualified}`);
      console.log(`     → MQL: ${rates.mql} (${rates.unqualifiedToMQL}%)`);
      console.log(`     → SQL: ${rates.sql} (${rates.mqlToSQL}%)`);
      console.log(`     → Applied: ${rates.applied} (${rates.sqlToApplied}%)`);
      console.log(`     → Decision Making: ${rates.decisionMaking} (${rates.appliedToDecisionMaking}%)`);
      console.log(`     Overall Progress to Decision Making: ${rates.overallConversion}%`);
    }
  });

  console.log('\n' + '═'.repeat(80));
  console.log('🎯 COMPLETE JOURNEY METRICS BY SOURCE');
  console.log('═'.repeat(80));
  Object.entries(report.completeJourney.bySource).forEach(([source, metrics]) => {
    console.log(`\n${source}:`);
    console.log(`   Sessions: ${metrics.sessions}`);
    console.log(`   Leads Created: ${metrics.leads}`);
    console.log(`   Session → Lead Rate: ${metrics.sessionToLeadRate}%`);
    console.log(`   Paid Students: ${metrics.paidStudents}`);
    console.log(`   Overall Conversion: ${metrics.overallConversion}%`);
    console.log(`   Revenue: KES ${metrics.revenue.toLocaleString()}`);
    if (metrics.costPerLead) {
      console.log(`   Cost per Lead: KES ${metrics.costPerLead.toLocaleString()}`);
      console.log(`   ROI: ${metrics.roi}%`);
    }
  });

  console.log('\n' + '═'.repeat(80));
  console.log('💡 KEY INSIGHTS');
  console.log('═'.repeat(80));
  report.completeJourney.insights.forEach(insight => {
    console.log(`   ${insight}`);
  });

  // Save reports
  const reportDir = path.join(__dirname, '../../reports');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const jsonPath = path.join(reportDir, `complete-journey-nov29-jan31-${timestamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ JSON Report saved: ${jsonPath}`);

  const markdownPath = path.join(reportDir, `complete-journey-nov29-jan31-${timestamp}.md`);
  fs.writeFileSync(markdownPath, generateMarkdownReport(report));
  console.log(`✅ Markdown Report saved: ${markdownPath}`);

  return report;
}

// ============================================================================
// COMPLETE JOURNEY METRICS CALCULATION
// ============================================================================

function generateCompleteJourneyMetrics(analyticsData, leadsBySource, conversionRates, totalAdSpend) {
  const bySource = {};
  const insights = [];

  // Calculate paid ad sources (for cost allocation)
  const paidSources = [
    'Google Search Ads',
    'Google Performance Max',
    'Google Ads (Other)',
    'Meta Ads (Facebook)',
    'Meta Ads (Instagram)'
  ];

  const totalPaidLeads = Object.entries(leadsBySource)
    .filter(([source]) => paidSources.includes(source))
    .reduce((sum, [, data]) => sum + data.count, 0);

  // Build metrics for each source
  const allSources = new Set([
    ...Object.keys(analyticsData),
    ...Object.keys(leadsBySource),
    ...Object.keys(conversionRates)
  ]);

  allSources.forEach(source => {
    const sessions = analyticsData[source]?.sessions || 0;
    const leads = leadsBySource[source]?.count || 0;
    const mql = parseInt(conversionRates[source]?.mql || 0);
    const sql = parseInt(conversionRates[source]?.sql || 0);
    const applied = parseInt(conversionRates[source]?.applied || 0);
    const decisionMaking = parseInt(conversionRates[source]?.decisionMaking || 0);
    const paidStudents = 0;  // No paid students tracked yet in this pipeline
    const revenue = 0;  // No revenue yet (pipeline doesn't track payments)

    // Allocate ad spend proportionally to paid sources based on lead count
    const isPaidSource = paidSources.includes(source);
    const adSpendForSource = isPaidSource && totalPaidLeads > 0
      ? (leads / totalPaidLeads) * totalAdSpend
      : 0;

    const costPerLead = leads > 0 && isPaidSource ? adSpendForSource / leads : null;
    const roi = isPaidSource && adSpendForSource > 0
      ? (((revenue - adSpendForSource) / adSpendForSource) * 100).toFixed(1)
      : null;

    bySource[source] = {
      sessions,
      leads,
      mql,
      sql,
      applied,
      decisionMaking,
      paidStudents,
      revenue,
      adSpend: isPaidSource ? Math.round(adSpendForSource) : 0,
      costPerLead: costPerLead ? Math.round(costPerLead) : null,
      sessionToLeadRate: sessions > 0 ? ((leads / sessions) * 100).toFixed(2) : '0.00',
      overallConversion: leads > 0 ? ((decisionMaking / leads) * 100).toFixed(2) : '0.00',  // Track to Decision Making stage
      roi: roi,
      avgLeadScore: leadsBySource[source]?.avgLeadScore || '0.00',
      hotLeadPercent: leadsBySource[source]?.hotPercent || '0.0'
    };
  });

  // Calculate current date and days remaining
  const now = new Date();
  const campaignEnd = new Date('2026-01-31');
  const daysRemaining = Math.max(0, Math.ceil((campaignEnd - now) / (1000 * 60 * 60 * 24)));
  const isInProgress = daysRemaining > 0;

  // Generate insights with campaign timing context
  if (isInProgress) {
    insights.push(`⏰ CAMPAIGN IN PROGRESS: ${daysRemaining} days remaining until Jan 31, 2026 enrollment deadline`);
    insights.push(`⚠️  EARLY DATA: Most conversions typically occur in the final 2 weeks of the campaign`);
  }

  // Count leads progressing through pipeline
  const paidSourcesData = Object.entries(bySource)
    .filter(([source]) => paidSources.includes(source));

  const totalInDecisionMaking = paidSourcesData.reduce((sum, [, data]) =>
    sum + data.decisionMaking, 0);

  if (totalInDecisionMaking > 0 && isInProgress) {
    insights.push(`📊 Pipeline Status: ${totalInDecisionMaking} leads in Decision Making stage (final stage before enrollment)`);
  }

  // Show pipeline progression performance
  const sortedByProgression = Object.entries(bySource)
    .filter(([, m]) => m.leads > 0)
    .sort((a, b) => parseFloat(b[1].overallConversion) - parseFloat(a[1].overallConversion));

  if (sortedByProgression.length > 0 && isInProgress) {
    const best = sortedByProgression[0];
    insights.push(`📈 Best Pipeline Progress (may change): ${best[0]} - ${best[1].overallConversion}% reaching Decision Making, ${best[1].decisionMaking} in final stage`);
  } else if (sortedByProgression.length > 0) {
    const best = sortedByProgression[0];
    insights.push(`✅ Best Pipeline Progress: ${best[0]} (${best[1].overallConversion}% reaching Decision Making)`);
  }

  const sortedByLeadQuality = Object.entries(bySource)
    .filter(([, m]) => m.leads > 0)
    .sort((a, b) => parseFloat(b[1].avgLeadScore) - parseFloat(a[1].avgLeadScore));

  if (sortedByLeadQuality.length > 0) {
    const best = sortedByLeadQuality[0];
    insights.push(`✅ Highest Lead Quality: ${best[0]} (Avg Score: ${best[1].avgLeadScore}, ${best[1].hotLeadPercent}% Hot)`);
  }

  // Show leads in Decision Making stage (close to enrollment)
  const sortedByDecisionMaking = Object.entries(bySource)
    .filter(([, m]) => m.decisionMaking > 0 && paidSources.includes(m[0]))
    .sort((a, b) => b[1].decisionMaking - a[1].decisionMaking);

  if (sortedByDecisionMaking.length > 0 && isInProgress) {
    sortedByDecisionMaking.forEach(([source, data]) => {
      if (data.decisionMaking > 0) {
        const potentialRevenue = data.decisionMaking * TUITION_PER_TERM_KES;
        insights.push(`⏳ ${source}: ${data.decisionMaking} in Decision Making (KES ${potentialRevenue.toLocaleString()} potential if they enroll)`);
      }
    });
  }

  // Total metrics
  const totalLeads = Object.values(bySource).reduce((sum, m) => sum + m.leads, 0);
  const totalMQL = Object.values(bySource).reduce((sum, m) => sum + m.mql, 0);
  const totalSQL = Object.values(bySource).reduce((sum, m) => sum + m.sql, 0);
  const totalApplied = Object.values(bySource).reduce((sum, m) => sum + m.applied, 0);
  const totalDecisionMaking = Object.values(bySource).reduce((sum, m) => sum + m.decisionMaking, 0);

  const summary = isInProgress
    ? `💰 Current Pipeline: ${totalLeads} leads → ${totalMQL} MQL → ${totalSQL} SQL → ${totalApplied} Applied → ${totalDecisionMaking} Decision Making`
    : `💰 Final Pipeline: ${totalLeads} leads → ${totalMQL} MQL → ${totalSQL} SQL → ${totalApplied} Applied → ${totalDecisionMaking} Decision Making`;

  insights.push(summary);

  return {
    bySource: Object.fromEntries(
      Object.entries(bySource).sort((a, b) => b[1].decisionMaking - a[1].decisionMaking)
    ),
    insights,
    campaignStatus: {
      isInProgress,
      daysRemaining,
      enrollmentDeadline: '2026-01-31'
    },
    totals: {
      adSpend: totalAdSpend,
      sessions: Object.values(bySource).reduce((sum, m) => sum + m.sessions, 0),
      leads: totalLeads,
      mql: totalMQL,
      sql: totalSQL,
      applied: totalApplied,
      decisionMaking: totalDecisionMaking,
      paidStudents: 0,
      revenue: 0
    }
  };
}

// ============================================================================
// MARKDOWN REPORT
// ============================================================================

function generateMarkdownReport(report) {
  let md = `# Complete Customer Journey Analysis\n`;
  md += `**November 29, 2025 - January 31, 2026**\n\n`;
  md += `**Period:** ${report.period.days} days\n`;
  md += `**Generated:** ${report.generatedAt}\n\n`;

  // Campaign status banner
  if (report.completeJourney.campaignStatus.isInProgress) {
    md += `> ⏰ **CAMPAIGN IN PROGRESS**\n`;
    md += `> ${report.completeJourney.campaignStatus.daysRemaining} days remaining until enrollment deadline (${report.completeJourney.campaignStatus.enrollmentDeadline})\n`;
    md += `>\n`;
    md += `> ⚠️  **Important:** Most conversions typically occur in the final 2 weeks. Current metrics are preliminary.\n\n`;
  }

  md += `---\n\n`;

  md += `## Executive Summary\n\n`;
  if (report.adPerformance.hasActualSpend) {
    if (report.adPerformance.googleAdsData) {
      md += `- **Google Ads Spend (Actual):** $${report.adPerformance.googleAdsData.totalSpendUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD (KES ${report.adPerformance.googleAdsData.totalSpendKES.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})\n`;
      md += `- **Google Ads Clicks:** ${report.adPerformance.googleAdsData.totalClicks.toLocaleString()}\n`;
      md += `- **Google Ads Impressions:** ${report.adPerformance.googleAdsData.totalImpressions.toLocaleString()}\n`;
    }
    if (report.adPerformance.metaAdsData) {
      md += `- **Meta Ads Spend (Actual):** $${report.adPerformance.metaAdsData.totalSpendUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD (KES ${report.adPerformance.metaAdsData.totalSpendKES.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})\n`;
      md += `- **Meta Ads Clicks:** ${report.adPerformance.metaAdsData.totalClicks.toLocaleString()}\n`;
      md += `- **Meta Ads Impressions:** ${report.adPerformance.metaAdsData.totalImpressions.toLocaleString()}\n`;
    }
    md += `- **Exchange Rate:** 1 USD = ${USD_TO_KES_RATE} KES\n`;
    md += `- **Total Ad Spend:** KES ${report.completeJourney.totals.adSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  } else {
    md += `- **Estimated Ad Spend:** KES ${report.completeJourney.totals.adSpend.toLocaleString()}\n`;
  }
  md += `- **Total Sessions:** ${report.completeJourney.totals.sessions.toLocaleString()}\n`;
  md += `- **Total Leads:** ${report.completeJourney.totals.leads}\n`;
  md += `- **MQL (Marketing Qualified):** ${report.completeJourney.totals.mql}\n`;
  md += `- **SQL (Sales Qualified):** ${report.completeJourney.totals.sql}\n`;
  md += `- **Applied:** ${report.completeJourney.totals.applied}\n`;
  md += `- **Decision Making:** ${report.completeJourney.totals.decisionMaking}\n\n`;

  if (report.completeJourney.campaignStatus.isInProgress && report.completeJourney.totals.decisionMaking > 0) {
    const potentialRevenue = report.completeJourney.totals.decisionMaking * 50000;
    md += `- **⏳ In Decision Making:** ${report.completeJourney.totals.decisionMaking} leads (KES ${potentialRevenue.toLocaleString()} potential)\n\n`;
  }

  md += `## Google Analytics Conversion Funnel\n\n`;
  md += `Shows the journey from website traffic to form submission (lead creation) by source.\n\n`;
  md += `| Source | Sessions | Users | GA4 Conversions | Session → Lead Rate |\n`;
  md += `|--------|----------|-------|-----------------|---------------------|\n`;
  Object.entries(report.completeJourney.bySource).forEach(([source, metrics]) => {
    const gaData = report.adPerformance.googleAnalytics[source] || {};
    const sessions = metrics.sessions || 0;
    const users = gaData.users || 0;
    const gaConversions = gaData.conversions || 0;
    const sessionToLeadRate = metrics.sessionToLeadRate || '0.00';
    md += `| ${source} | ${sessions.toLocaleString()} | ${users.toLocaleString()} | ${gaConversions.toLocaleString()} | ${sessionToLeadRate}% |\n`;
  });
  md += `\n`;

  md += `## Complete Journey Metrics by Source\n\n`;
  md += `| Source | Sessions | Leads | MQL | SQL | Applied | Decision Making | Cost/Lead | Progress to DM |\n`;
  md += `|--------|----------|-------|-----|-----|---------|-----------------|-----------|----------------|\n`;
  Object.entries(report.completeJourney.bySource).forEach(([source, metrics]) => {
    const costPerLead = metrics.costPerLead !== null ? `KES ${metrics.costPerLead.toLocaleString()}` : '-';
    md += `| ${source} | ${metrics.sessions} | ${metrics.leads} | ${metrics.mql} | ${metrics.sql} | ${metrics.applied} | ${metrics.decisionMaking} | ${costPerLead} | ${metrics.overallConversion}% |\n`;
  });
  md += `\n`;

  md += `## Key Insights\n\n`;
  report.completeJourney.insights.forEach(insight => {
    md += `- ${insight}\n`;
  });
  md += `\n`;

  md += `## Lead Quality Breakdown\n\n`;
  md += `| Source | Total Leads | Avg Score | Hot % | Warm % |\n`;
  md += `|--------|-------------|-----------|-------|--------|\n`;
  Object.entries(report.leadGeneration.bySource).forEach(([source, data]) => {
    md += `| ${source} | ${data.count} | ${data.avgLeadScore} | ${data.hotPercent}% | ${data.warmPercent}% |\n`;
  });
  md += `\n`;

  md += `## Pipeline Conversion Funnel\n\n`;
  md += `| Source | Unqualified | MQL | SQL | Applied | Decision Making | Overall % |\n`;
  md += `|--------|-------------|-----|-----|---------|-----------------|------------|\n`;
  Object.entries(report.pipelineConversion.conversionRates).forEach(([source, rates]) => {
    if (parseInt(rates.unqualified) > 0) {
      md += `| ${source} | ${rates.unqualified} | ${rates.mql} (${rates.unqualifiedToMQL}%) | ${rates.sql} (${rates.mqlToSQL}%) | ${rates.applied} (${rates.sqlToApplied}%) | ${rates.decisionMaking} (${rates.appliedToDecisionMaking}%) | ${rates.overallConversion}% |\n`;
    }
  });
  md += `\n`;

  return md;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

runCompleteJourneyAnalysis()
  .then(() => {
    console.log('\n✅ Complete journey analysis finished!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Error:', error);
    console.error(error.stack);
    process.exit(1);
  });
