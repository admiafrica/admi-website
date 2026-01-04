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
  const resp = await makeBrevoRequest('/v3/contacts?limit=5');
  resp.contacts.forEach(c => {
    console.log('Contact:', c.email);
    console.log('Attributes:', Object.keys(c.attributes).join(', '));
    console.log('---');
  });
})();
