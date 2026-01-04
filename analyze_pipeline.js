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
          resolve({ error: 'Failed to parse', status: res.statusCode });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('📊 PIPELINE ANALYSIS\n');
  
  console.log('Fetching all deals in pipeline 68e60a790c87b5f2cbfec788...\n');
  
  let allDeals = [];
  let offset = 0;
  const limit = 100;

  // Fetch all deals
  while (offset < 1000) {  // Limit to first 1000 for speed
    const response = await makeRequest(`/v3/crm/deals?limit=${limit}&offset=${offset}`);
    
    if (!response.items || response.items.length === 0) break;
    
    const pipelineDeals = response.items.filter(d => 
      d.attributes?.pipeline === '68e60a790c87b5f2cbfec788'
    );
    
    allDeals = allDeals.concat(pipelineDeals);
    offset += limit;
    
    process.stdout.write(`\rFetched ${allDeals.length} deals...`);
  }
  
  console.log(`\n✅ Total deals: ${allDeals.length}\n`);

  // Group by stage
  const stageMap = {};
  allDeals.forEach(deal => {
    const stageId = deal.attributes?.deal_stage || 'unknown';
    const dealName = deal.attributes?.deal_name || 'Unnamed';
    
    if (!stageMap[stageId]) {
      stageMap[stageId] = { deals: 0, examples: [] };
    }
    
    stageMap[stageId].deals++;
    if (stageMap[stageId].examples.length < 2) {
      stageMap[stageId].examples.push(dealName);
    }
  });

  console.log('📋 STAGES FOUND:\n');
  
  const stages = Object.entries(stageMap).sort((a, b) => b[1].deals - a[1].deals);
  
  stages.forEach((entry, idx) => {
    const [stageId, data] = entry;
    const percent = ((data.deals / allDeals.length) * 100).toFixed(1);
    console.log(`${idx + 1}. Stage ID: ${stageId}`);
    console.log(`   Deals: ${data.deals} (${percent}%)`);
    console.log(`   Examples:`);
    data.examples.forEach(ex => {
      console.log(`      - ${ex}`);
    });
    console.log();
  });

  console.log('STAGE MAPPING:');
  stages.forEach((entry) => {
    const [stageId, data] = entry;
    const examples = data.examples[0] || 'Unknown';
    const stageName = examples.includes('Unqualified') ? 'Unqualified' :
                      examples.includes('Qualified') ? 'Qualified' :
                      examples.includes('Applied') ? 'Applied' :
                      examples.includes('Enroll') ? 'Enrolled' :
                      'Unknown';
    console.log(`"${stageId}": "${stageName}"`);
  });
}

main();
