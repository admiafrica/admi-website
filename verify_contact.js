const https = require('https');

function getContact(email) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      port: 443,
      path: `/v3/contacts/${encodeURIComponent(email)}`,
      method: 'GET',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔍 Checking Contact Tracking Data\n');
  
  // Check contact #50973
  const contact = await getContact('wilfred@admi.ac.ke');
  
  if (contact.id) {
    console.log('✅ Contact Found: #' + contact.id);
    console.log('\n📊 Attribution Data:');
    
    const attrs = contact.attributes || {};
    
    console.log('UTM Fields:');
    console.log(`  UTM_SOURCE: ${attrs.UTM_SOURCE || 'N/A'}`);
    console.log(`  UTM_MEDIUM: ${attrs.UTM_MEDIUM || 'N/A'}`);
    console.log(`  UTM_CAMPAIGN: ${attrs.UTM_CAMPAIGN || 'N/A'}`);
    console.log(`  UTM_CONTENT: ${attrs.UTM_CONTENT || 'N/A'}`);
    
    console.log('\nFirst-Touch Attribution:');
    console.log(`  FIRST_TOUCH_SOURCE: ${attrs.FIRST_TOUCH_SOURCE || 'N/A'}`);
    console.log(`  FIRST_TOUCH_MEDIUM: ${attrs.FIRST_TOUCH_MEDIUM || 'N/A'}`);
    console.log(`  FIRST_TOUCH_CAMPAIGN: ${attrs.FIRST_TOUCH_CAMPAIGN || 'N/A'}`);
    console.log(`  FIRST_TOUCH_CONTENT: ${attrs.FIRST_TOUCH_CONTENT || 'N/A'}`);
    
    console.log('\nGA4 Tracking:');
    console.log(`  GA_CLIENT_ID: ${attrs.GA_CLIENT_ID || 'N/A'}`);
    
    console.log('\nLead Qualification:');
    console.log(`  QUALIFICATION_SCORE: ${attrs.QUALIFICATION_SCORE || 'N/A'}`);
    console.log(`  QUALIFICATION_STATUS: ${attrs.QUALIFICATION_STATUS || 'N/A'}`);
    
    // Check if data is clean
    console.log('\n✅ Data Quality Check:');
    const utmContent = attrs.UTM_CONTENT || '';
    const gaId = attrs.GA_CLIENT_ID || '';
    
    if (utmContent.includes('Expected') || utmContent.includes('Test')) {
      console.log('  ❌ UTM_CONTENT contains test data: CONTAMINATED');
    } else {
      console.log('  ✅ UTM_CONTENT is clean (no test patterns)');
    }
    
    if (gaId.includes('undefined')) {
      console.log('  ❌ GA_CLIENT_ID contains "undefined": MALFORMED');
    } else if (/^\d+\.\d+$/.test(gaId) || gaId === '') {
      console.log('  ✅ GA_CLIENT_ID format is valid');
    } else {
      console.log(`  ⚠️ GA_CLIENT_ID format unclear: "${gaId}"`);
    }
    
  } else {
    console.log('❌ Contact not found');
    console.log('Response:', contact);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
