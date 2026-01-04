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
          resolve({ error: 'parse error' });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('📊 PIPELINE STAGES\n');
  
  // Fetch first 500 deals
  const response = await makeRequest('/v3/crm/deals?limit=500&offset=0');
  
  if (!response.items) {
    console.log('No items found');
    return;
  }

  const pipelineDeals = response.items.filter(d => 
    d.attributes?.pipeline === '68e60a790c87b5f2cbfec788'
  );
  
  console.log(`Total deals fetched: ${response.items.length}`);
  console.log(`Deals in pipeline: ${pipelineDeals.length}`);
  console.log(`Total in pipeline (all): ${response.pager?.total || 'unknown'}\n`);

  // Group by stage
  const stages = {};
  pipelineDeals.forEach(deal => {
    const stageId = deal.attributes?.deal_stage;
    if (!stages[stageId]) {
      stages[stageId] = { count: 0, sample: null };
    }
    stages[stageId].count++;
    if (!stages[stageId].sample) {
      stages[stageId].sample = deal.attributes?.deal_name;
    }
  });

  console.log('Stages:\n');
  Object.entries(stages)
    .sort((a, b) => b[1].count - a[1].count)
    .forEach(([stageId, data], idx) => {
      console.log(`${idx + 1}. Stage: ${stageId}`);
      console.log(`   Count: ${data.count}`);
      console.log(`   Example: ${data.sample}\n`);
    });
}

main();
