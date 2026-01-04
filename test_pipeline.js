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
        console.log(`Status: ${res.statusCode}`);
        console.log(data);
        resolve();
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('Testing pipeline API calls...\n');
  
  console.log('1. Getting pipeline info:');
  await makeRequest('/v3/crm/pipeline/68e60a790c87b5f2cbfec788');
  
  console.log('\n2. Getting all pipelines:');
  await makeRequest('/v3/crm/pipeline');
  
  console.log('\n3. Getting deals with limit:');
  await makeRequest('/v3/crm/deals?limit=5');
}

main();
