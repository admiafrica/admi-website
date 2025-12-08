/**
 * Update Academic Pathways Hero Content
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master';

const ENTRY_ID = '5S7ClljQzI4b219Dfi5kuS';

const managementClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
});

async function updateHeroContent() {
  try {
    console.log('🔍 Fetching current Academic Pathways page...\n');

    // Get current entry
    const getResponse = await managementClient.get(`/entries/${ENTRY_ID}`);
    const entry = getResponse.data;

    console.log('📝 Current Hero Content:');
    console.log(`   Hero Title: ${entry.fields.heroTitle?.['en-US'] || 'N/A'}`);
    console.log(`   Hero Description: ${entry.fields.heroDescription?.['en-US']?.substring(0, 100) || 'N/A'}...\n`);

    // Update with new content
    const updatedFields = {
      ...entry.fields,
      heroTitle: {
        'en-US': 'Explore ADMI\'s academic pathways and strategic partnerships with leading institutions.'
      },
      heroDescription: {
        'en-US': 'Discover seamless transitions for further studies and career opportunities in digital media and creative technology.'
      }
    };

    console.log('📤 Updating with new content...');
    console.log(`   New Hero Title: ${updatedFields.heroTitle['en-US']}`);
    console.log(`   New Hero Description: ${updatedFields.heroDescription['en-US']}\n`);

    // Update the entry
    const updateResponse = await managementClient.put(
      `/entries/${ENTRY_ID}`,
      { fields: updatedFields },
      {
        headers: {
          'X-Contentful-Version': entry.sys.version
        }
      }
    );

    console.log('✅ Entry updated (version ' + updateResponse.data.sys.version + ')');

    // Publish the changes
    console.log('📤 Publishing changes...');
    await managementClient.put(
      `/entries/${ENTRY_ID}/published`,
      null,
      {
        headers: {
          'X-Contentful-Version': updateResponse.data.sys.version
        }
      }
    );

    console.log('✅ Changes published successfully!\n');
    console.log('🎉 Hero content has been updated on the Academic Pathways page');

  } catch (error) {
    if (error.response?.data) {
      console.error('❌ Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

updateHeroContent();
