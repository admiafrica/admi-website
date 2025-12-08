/**
 * Inspect a specific Contentful entry
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

// Entry ID from the URL
const ENTRY_ID = '44o27K1SktXyHVgETRmlJf';

const contentfulClient = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

async function inspectEntry() {
  try {
    console.log(`🔍 Fetching entry ${ENTRY_ID}...\n`);

    const response = await contentfulClient.get(`/entries/${ENTRY_ID}`, {
      params: {
        include: 2
      }
    });

    const entry = response.data;
    const includes = response.data.includes || {};

    console.log('📦 Entry Details:');
    console.log(`   ID: ${entry.sys.id}`);
    console.log(`   Content Type: ${entry.sys.contentType.sys.id}`);
    console.log(`   Created: ${entry.sys.createdAt}`);
    console.log(`   Updated: ${entry.sys.updatedAt}\n`);

    console.log('📝 Fields:');
    Object.keys(entry.fields).forEach(key => {
      const value = entry.fields[key];
      if (value && typeof value === 'object' && value.sys) {
        console.log(`   ${key}: [Reference: ${value.sys.type} ${value.sys.id}]`);
      } else if (typeof value === 'string') {
        console.log(`   ${key}: ${value.substring(0, 100)}${value.length > 100 ? '...' : ''}`);
      } else {
        console.log(`   ${key}:`, value);
      }
    });

    if (includes.Asset && includes.Asset.length > 0) {
      console.log('\n🖼️  Included Assets:');
      includes.Asset.forEach((asset, index) => {
        console.log(`   ${index + 1}. ${asset.fields.title || 'Untitled'}`);
        console.log(`      URL: https:${asset.fields.file.url}`);
        console.log(`      Type: ${asset.fields.file.contentType}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

inspectEntry();
