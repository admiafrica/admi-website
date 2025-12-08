/**
 * Check Academic Partners in Contentful (Fixed Authentication)
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master';

const contentfulClient = axios.create({
  baseURL: `https://cdn.contentful.com`,
});

async function checkPartners() {
  try {
    console.log('🔍 Fetching all partners...\n');

    const response = await contentfulClient.get(
      `/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
      {
        params: {
          access_token: ACCESS_TOKEN,
          content_type: '11GIFlaTgpnZEWEr6AElPr', // Partner content type ID
          limit: 100,
          include: 2
        }
      }
    );

    const partners = response.data.items;
    const assets = response.data.includes?.Asset || [];

    console.log(`✅ Found ${partners.length} partner(s):\n`);

    partners.forEach((partner, index) => {
      console.log(`${index + 1}. ${partner.fields.name || 'Unnamed Partner'}`);
      console.log(`   ID: ${partner.sys.id}`);
      console.log(`   Type: ${partner.fields.type || 'N/A'}`);
      console.log(`   Website: ${partner.fields.website || 'N/A'}`);

      // Check for logo
      if (partner.fields.logo) {
        const logoRef = partner.fields.logo.sys?.id;
        const logoAsset = assets.find(a => a.sys.id === logoRef);
        if (logoAsset) {
          console.log(`   ✅ Logo: https:${logoAsset.fields.file.url}`);
          console.log(`   Logo Size: ${logoAsset.fields.file.details.size} bytes`);
        } else {
          console.log(`   ⚠️  Logo: Referenced (${logoRef}) but not in includes`);
        }
      } else {
        console.log(`   ❌ Logo: NOT SET`);
      }

      if (partner.fields.description) {
        const desc = partner.fields.description.substring(0, 80);
        console.log(`   Description: ${desc}...`);
      }

      console.log('');
    });

    console.log('\n📊 Summary:');
    console.log(`   Total partners: ${partners.length}`);
    console.log(`   Partners with logos: ${partners.filter(p => p.fields.logo).length}`);
    console.log(`   Partners with websites: ${partners.filter(p => p.fields.website).length}`);

  } catch (error) {
    if (error.response?.data) {
      console.error('❌ Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

checkPartners();
