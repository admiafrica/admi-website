/**
 * Check Academic Pathways Page Content
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master';

const contentfulClient = axios.create({
  baseURL: `https://cdn.contentful.com`,
});

async function checkAcademicPathwaysPage() {
  try {
    console.log('🔍 Fetching Academic Pathways page...\n');

    const response = await contentfulClient.get(
      `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
      {
        params: {
          access_token: ACCESS_TOKEN,
          content_type: '7hj7s6Ixd6yXVG9PrDodkX', // Academic Pathways content type
          'fields.slug': 'main',
          include: 2
        }
      }
    );

    if (response.data.items.length === 0) {
      console.log('❌ No Academic Pathways page found with slug "main"');
      return;
    }

    const page = response.data.items[0];

    console.log('✅ Academic Pathways Page Found:\n');
    console.log(`ID: ${page.sys.id}`);
    console.log(`\n📝 Current Content:\n`);
    console.log(`Title: ${page.fields.title || 'N/A'}`);
    console.log(`Slug: ${page.fields.slug || 'N/A'}`);
    console.log(`Description: ${page.fields.description || 'N/A'}`);
    console.log(`\nHero Title: ${page.fields.heroTitle || 'N/A'}`);
    console.log(`Hero Description: ${page.fields.heroDescription || 'N/A'}`);
    console.log(`\nBenefits Title: ${page.fields.benefitsTitle || 'N/A'}`);
    console.log(`Woolf Membership Title: ${page.fields.woolfMembershipTitle || 'N/A'}`);
    console.log(`Global Opportunities Title: ${page.fields.globalOpportunitiesTitle || 'N/A'}`);

  } catch (error) {
    if (error.response?.data) {
      console.error('❌ Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

checkAcademicPathwaysPage();
