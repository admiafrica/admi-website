/**
 * Check Academic Pathways Content in Contentful
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

async function checkAcademicPathways() {
  try {
    console.log('🔍 Fetching academic pathways content...\n');

    const response = await contentfulClient.get('/entries', {
      params: {
        content_type: 'academicPathways',
        'fields.slug': 'main',
        include: 3
      }
    });

    if (response.data.items.length === 0) {
      console.log('❌ No academic pathways page found with slug "main"');
      return;
    }

    const page = response.data.items[0];
    const includes = response.data.includes || {};

    console.log('✅ Academic Pathways Page Found:');
    console.log(`   ID: ${page.sys.id}`);
    console.log(`   Title: ${page.fields.title}`);
    console.log(`   Slug: ${page.fields.slug}\n`);

    console.log('📝 Content Fields:');
    console.log(`   Hero Title: ${page.fields.heroTitle}`);
    console.log(`   Benefits Title: ${page.fields.benefitsTitle}`);
    console.log(`   Woolf Membership Title: ${page.fields.woolfMembershipTitle}\n`);

    console.log('🤝 Partners:');
    if (page.fields.partners && page.fields.partners.length > 0) {
      console.log(`   Found ${page.fields.partners.length} partner(s) in 'partners' field`);

      page.fields.partners.forEach((partner, index) => {
        console.log(`\n   Partner ${index + 1}:`);
        if (typeof partner === 'object' && partner.sys) {
          console.log(`      Type: Reference (ID: ${partner.sys.id})`);

          // Try to find in includes
          const includedPartner = includes.Entry?.find(e => e.sys.id === partner.sys.id);
          if (includedPartner) {
            console.log(`      Name: ${includedPartner.fields.name || 'N/A'}`);
            console.log(`      Website: ${includedPartner.fields.website || 'N/A'}`);
            console.log(`      Has Logo: ${includedPartner.fields.logo ? '✅' : '❌'}`);
          }
        } else {
          console.log(`      Direct value:`, partner);
        }
      });
    } else {
      console.log('   ❌ No partners field or empty');
    }

    console.log('\n\n📦 Includes:');
    console.log(`   Entries: ${includes.Entry?.length || 0}`);
    console.log(`   Assets: ${includes.Asset?.length || 0}`);

    if (includes.Entry && includes.Entry.length > 0) {
      console.log('\n   Included Entries:');
      includes.Entry.forEach((entry, index) => {
        console.log(`   ${index + 1}. ${entry.sys.contentType?.sys?.id || entry.sys.type}: ${entry.fields.name || entry.fields.title || entry.sys.id}`);
      });
    }

    console.log('\n\n📋 All available fields on page:');
    console.log(Object.keys(page.fields));

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

checkAcademicPathways();
