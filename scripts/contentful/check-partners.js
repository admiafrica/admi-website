/**
 * Check Academic Partners in Contentful
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

const contentfulClient = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

async function checkPartners() {
  try {
    console.log('🔍 Fetching all partners...\n');

    const response = await contentfulClient.get('/entries', {
      params: {
        content_type: 'partner',
        limit: 100,
        include: 2
      }
    });

    const partners = response.data.items;
    const assets = response.data.includes?.Asset || [];

    console.log(`Found ${partners.length} partner(s):\n`);

    partners.forEach((partner, index) => {
      console.log(`\n${index + 1}. Partner:`);
      console.log(`   ID: ${partner.sys.id}`);
      console.log(`   Name: ${partner.fields.name}`);
      console.log(`   Type: ${partner.fields.type || 'N/A'}`);
      console.log(`   Website: ${partner.fields.website || 'N/A'}`);
      console.log(`   Description: ${partner.fields.description?.substring(0, 100) || 'N/A'}...`);

      // Check for logo
      if (partner.fields.logo) {
        const logoRef = partner.fields.logo.sys?.id;
        const logoAsset = assets.find(a => a.sys.id === logoRef);
        if (logoAsset) {
          console.log(`   Logo URL: https:${logoAsset.fields.file.url}`);
        } else {
          console.log(`   Logo: Referenced (${logoRef}) but not found in includes`);
        }
      } else {
        console.log(`   Logo: ❌ NOT SET`);
      }
    });

    console.log('\n\n📊 Summary:');
    console.log(`   Total partners: ${partners.length}`);
    console.log(`   Partners with logos: ${partners.filter(p => p.fields.logo).length}`);
    console.log(`   Partners without logos: ${partners.filter(p => !p.fields.logo).length}`);

  } catch (error) {
    console.error('❌ Error fetching partners:', error.response?.data || error.message);
  }
}

checkPartners();
