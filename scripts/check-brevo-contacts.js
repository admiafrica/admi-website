require('dotenv').config();
const https = require('https');

function makeBrevoRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  // Get contacts from last 2 days
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const modifiedSince = twoDaysAgo.toISOString();
  
  console.log('Checking contacts added since:', modifiedSince);
  console.log('---');
  
  // Fetch contacts modified in last 2 days
  let offset = 0;
  let allContacts = [];
  const limit = 50;
  
  while (true) {
    const resp = await makeBrevoRequest('/v3/contacts?limit=' + limit + '&offset=' + offset + '&modifiedSince=' + encodeURIComponent(modifiedSince));
    
    if (resp.contacts && resp.contacts.length > 0) {
      allContacts = allContacts.concat(resp.contacts);
      offset += limit;
      
      if (resp.contacts.length < limit) break;
    } else {
      break;
    }
  }
  
  console.log('Total contacts modified in last 2 days:', allContacts.length);
  console.log('---');
  
  // Show the most recent ones
  const recent = allContacts.slice(0, 15);
  console.log('Most recent contacts:');
  recent.forEach((c, i) => {
    console.log((i+1) + '. ' + c.email);
    console.log('   Created:', c.createdAt);
    console.log('   Modified:', c.modifiedAt);
    if (c.attributes) {
      if (c.attributes.FIRSTNAME) console.log('   Name:', c.attributes.FIRSTNAME, c.attributes.LASTNAME || '');
      if (c.attributes.UTM_SOURCE) console.log('   Source:', c.attributes.UTM_SOURCE);
      if (c.attributes.UTM_MEDIUM) console.log('   Medium:', c.attributes.UTM_MEDIUM);
      if (c.attributes.UTM_CAMPAIGN) console.log('   Campaign:', c.attributes.UTM_CAMPAIGN);
    }
    console.log('');
  });
})();
