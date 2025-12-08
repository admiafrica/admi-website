/**
 * List all content types in Contentful
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master';

const contentfulClient = axios.create({
  baseURL: `https://cdn.contentful.com`,
});

async function listContentTypes() {
  try {
    console.log('🔍 Fetching all content types...\n');

    const response = await contentfulClient.get(
      `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/content_types`,
      {
        params: {
          access_token: ACCESS_TOKEN
        }
      }
    );

    const contentTypes = response.data.items;

    console.log(`✅ Found ${contentTypes.length} content type(s):\n`);

    contentTypes.forEach((ct, index) => {
      console.log(`${index + 1}. ${ct.name} (${ct.sys.id})`);
      console.log(`   Description: ${ct.description || 'N/A'}`);
      console.log(`   Fields: ${ct.fields.map(f => f.name).join(', ')}`);
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

listContentTypes();
