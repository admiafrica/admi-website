const https = require('https');

exports.handler = async (event) => {
  console.log('🕐 Starting ADMI video cache refresh at:', new Date().toISOString());
  
  const appUrl = process.env.APP_URL;
  const cronSecret = process.env.CRON_SECRET;
  
  if (!appUrl) {
    console.error('❌ APP_URL environment variable not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'APP_URL not configured' })
    };
  }

  const url = `${appUrl}/api/cron/refresh-video-cache`;
  
  try {
    const result = await makeRequest(url, cronSecret);
    
    console.log('✅ Cache refresh completed successfully');
    console.log('📊 Response:', result);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Video cache refreshed successfully',
        timestamp: new Date().toISOString(),
        response: result
      })
    };
    
  } catch (error) {
    console.error('❌ Cache refresh failed:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Video cache refresh failed',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};

function makeRequest(url, cronSecret) {
  return new Promise((resolve, reject) => {
    const urlParts = new URL(url);
    
    const options = {
      hostname: urlParts.hostname,
      port: urlParts.port || 443,
      path: urlParts.pathname,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cronSecret}`,
        'User-Agent': 'AWS-Lambda-ADMI-Cron/1.0',
        'Content-Type': 'application/json'
      },
      timeout: 60000 // 60 second timeout
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (parseError) {
            resolve({ raw: data, statusCode: res.statusCode });
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}