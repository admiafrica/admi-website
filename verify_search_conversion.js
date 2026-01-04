const https = require('https');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          resolve({ error: 'parse' });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔍 VERIFYING GOOGLE SEARCH CONTACTS IN PIPELINE\n');
  
  // Fetch all deals
  let searchDeals = [];
  let offset = 0;

  while (offset < 2000) {
    const response = await makeRequest(`/v3/crm/deals?limit=500&offset=${offset}`);
    
    if (!response.items || response.items.length === 0) break;
    
    const filtered = response.items.filter(d => 
      d.attributes?.pipeline === '68e60a790c87b5f2cbfec788'
    );
    
    searchDeals = searchDeals.concat(filtered);
    offset += 500;
  }

  console.log(`Total deals in pipeline: ${searchDeals.length}\n`);

  // Get all contact IDs
  const contactIds = new Set();
  searchDeals.forEach(deal => {
    if (deal.linkedContactsIds) {
      deal.linkedContactsIds.forEach(id => contactIds.add(id));
    }
  });

  console.log(`Fetching ${contactIds.size} contact details...\n`);

  // Fetch contact details and classify
  const searchContacts = [];
  
  for (const id of contactIds) {
    try {
      const contact = await makeRequest(`/v3/contacts/${id}`);
      const utmSource = (contact.attributes?.UTM_SOURCE || '').toLowerCase();
      const utmCampaign = (contact.attributes?.UTM_CAMPAIGN || '').toLowerCase();
      
      const isSearch = utmSource === 'google' && 
                       (utmCampaign.includes('search') || 
                        contact.attributes?.UTM_MEDIUM?.toLowerCase() === 'cpc');
      
      if (isSearch) {
        searchContacts.push({
          id: contact.id,
          email: contact.email,
          name: contact.attributes?.FIRSTNAME || 'Unknown'
        });
      }
    } catch (e) {
      // Skip
    }
  }

  console.log(`Found ${searchContacts.length} Google Search contacts\n`);

  // Now find their deals and stages
  console.log('Google Search Contacts in Pipeline:\n');
  
  searchContacts.forEach(sc => {
    // Find their deals
    const theirDeals = searchDeals.filter(d => 
      d.linkedContactsIds && d.linkedContactsIds.includes(sc.id)
    );
    
    console.log(`${sc.name} (${sc.email})`);
    console.log(`  Contact ID: ${sc.id}`);
    
    theirDeals.forEach(deal => {
      const stageId = deal.attributes?.deal_stage;
      const stageName = {
        '2ixzacgsn412m7y0ed20st5': 'Unqualified',
        'f17io0yg7xl1rdmb5cy1d44': 'Qualified',
        'pwi0xiqbtdwe6brfz7vgxen': 'Enrolled',
        '39539oz5gs2ktjvywn7pl6v': 'Paid'
      }[stageId] || stageId;
      
      console.log(`  Deal: ${deal.attributes?.deal_name || 'Unnamed'}`);
      console.log(`  Stage: ${stageName}`);
      console.log(`  Created: ${deal.attributes?.created_at?.split('T')[0]}`);
    });
    console.log();
  });
}

main();
