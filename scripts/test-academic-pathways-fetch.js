/**
 * Test fetching Academic Pathways content
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master';

async function testFetch() {
  try {
    console.log('🔍 Testing Academic Pathways fetch...\n');
    console.log(`Space ID: ${SPACE_ID}`);
    console.log(`Environment: ${ENVIRONMENT}\n`);

    // Test the exact API call the page makes
    const response = await axios.get(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
      {
        params: {
          access_token: ACCESS_TOKEN,
          content_type: '7hj7s6Ixd6yXVG9PrDodkX',
          'fields.slug': 'academic-pathways',
          include: 3
        }
      }
    );

    console.log(`✅ Found ${response.data.items.length} item(s)\n`);

    if (response.data.items.length > 0) {
      const page = response.data.items[0];
      console.log('📄 Page Details:');
      console.log(`   ID: ${page.sys.id}`);
      console.log(`   Title: ${page.fields.title}`);
      console.log(`   Slug: ${page.fields.slug}`);
      console.log(`   Hero Title: ${page.fields.heroTitle?.substring(0, 80)}...`);
      console.log(`   Hero Description: ${page.fields.heroDescription?.substring(0, 80)}...`);
      console.log(`\n   All fields available:`, Object.keys(page.fields));
    }

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testFetch();
