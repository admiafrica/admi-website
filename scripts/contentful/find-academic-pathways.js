/**
 * Find all Academic Pathways pages
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master';

const contentfulClient = axios.create({
  baseURL: `https://cdn.contentful.com`,
});

async function findAcademicPathways() {
  try {
    console.log('🔍 Searching for all Academic Pathways pages...\n');

    const response = await contentfulClient.get(
      `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
      {
        params: {
          access_token: ACCESS_TOKEN,
          content_type: '7hj7s6Ixd6yXVG9PrDodkX', // Academic Pathways content type
          limit: 100,
          include: 1
        }
      }
    );

    const pages = response.data.items;

    console.log(`✅ Found ${pages.length} Academic Pathways page(s):\n`);

    pages.forEach((page, index) => {
      console.log(`${index + 1}. Academic Pathways Page`);
      console.log(`   ID: ${page.sys.id}`);
      console.log(`   Slug: ${page.fields.slug || 'N/A'}`);
      console.log(`   Title: ${page.fields.title || 'N/A'}`);
      console.log(`   Hero Title: ${page.fields.heroTitle || 'N/A'}`);
      console.log(`   Hero Description: ${page.fields.heroDescription?.substring(0, 100) || 'N/A'}...`);
      console.log(`   Published: ${page.sys.publishedVersion ? 'Yes' : 'No'}`);
      console.log('');
    });

  } catch (error) {
    if (error.response?.data) {
      console.error('❌ Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

findAcademicPathways();
