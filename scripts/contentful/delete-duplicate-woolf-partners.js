/**
 * Delete duplicate Woolf University partner entries (keep only the one with logo)
 * KEEP: 44o27K1SktXyHVgETRmlJf (has logo)
 * DELETE: All other Woolf entries without logos
 */
require('dotenv').config();
const axios = require('axios');

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master';

// Entry to KEEP (has logo)
const KEEP_ENTRY_ID = '44o27K1SktXyHVgETRmlJf';

// Entries to DELETE (no logos)
const DELETE_ENTRY_IDS = [
  '6NYuX0pOe7xqJlcNcMM7wB',
  '5Bfir8QOVdbgMHA6cgNF0v',
  '4wJkYLCu6fkFlvEOgtqIK8',
  '57fPOPcxrN1UbKjEQJsnw2',
  '1d8QrIL2hApRcHfEdTDhhL',
  '4Pl8OFnJfUXUdLLjjnxICr'
];

const managementClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
});

async function deleteEntry(entryId) {
  try {
    console.log(`\n🔍 Fetching entry ${entryId}...`);

    // Get the entry first
    const getResponse = await managementClient.get(`/entries/${entryId}`);
    const entry = getResponse.data;

    console.log(`   Name: ${entry.fields.partnerName?.['en-US'] || 'N/A'}`);
    console.log(`   Version: ${entry.sys.version}`);

    // Unpublish if published
    if (entry.sys.publishedVersion) {
      console.log(`   📤 Unpublishing...`);
      await managementClient.delete(`/entries/${entryId}/published`, {
        headers: {
          'X-Contentful-Version': entry.sys.version
        }
      });

      // Fetch updated entry after unpublish
      const updatedResponse = await managementClient.get(`/entries/${entryId}`);
      entry.sys.version = updatedResponse.data.sys.version;
      console.log(`   ✅ Unpublished (new version: ${entry.sys.version})`);
    }

    // Delete the entry
    console.log(`   🗑️  Deleting...`);
    await managementClient.delete(`/entries/${entryId}`, {
      headers: {
        'X-Contentful-Version': entry.sys.version
      }
    });

    console.log(`   ✅ Deleted successfully`);
    return true;
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(`   ⚠️  Entry not found (may already be deleted)`);
      return false;
    }
    console.error(`   ❌ Error:`, error.response?.data || error.message);
    return false;
  }
}

async function deleteDuplicateWoolfEntries() {
  console.log('🚀 Starting deletion of duplicate Woolf University entries...\n');
  console.log(`✅ KEEPING: ${KEEP_ENTRY_ID} (has logo)`);
  console.log(`❌ DELETING: ${DELETE_ENTRY_IDS.length} entries without logos\n`);

  if (!MANAGEMENT_TOKEN) {
    console.error('❌ Error: CONTENTFUL_MANAGEMENT_TOKEN not found in .env file');
    console.log('\n📝 To get a management token:');
    console.log('   1. Go to https://app.contentful.com/spaces/' + SPACE_ID + '/api/keys');
    console.log('   2. Click "Content management tokens"');
    console.log('   3. Generate a new token');
    console.log('   4. Add it to .env as CONTENTFUL_MANAGEMENT_TOKEN=your_token_here');
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const entryId of DELETE_ENTRY_IDS) {
    const success = await deleteEntry(entryId);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n\n📊 Summary:');
  console.log(`   ✅ Successfully deleted: ${successCount}`);
  console.log(`   ❌ Failed/Not found: ${failCount}`);
  console.log(`   🎯 Remaining Woolf entries: 1 (${KEEP_ENTRY_ID})`);
  console.log('\n✨ Done!');
}

deleteDuplicateWoolfEntries();
