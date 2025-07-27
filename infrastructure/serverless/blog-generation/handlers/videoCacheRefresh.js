/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * AWS Lambda handler for video cache refresh
 * Calls the Amplify app's video cache refresh endpoint daily at 1 AM UTC
 */
exports.refresh = async (event) => {
  console.log('🎥 Starting video cache refresh Lambda function')
  console.log('Event:', JSON.stringify(event, null, 2))

  const appUrl = process.env.APP_URL || 'https://main.d2yh9rjzagq5ao.amplifyapp.com'
  const cronSecret = process.env.CRON_SECRET || 'admi-cron-secret-2025'

  try {
    console.log(`📡 Calling video cache refresh endpoint: ${appUrl}`)

    const response = await fetch(`${appUrl}/api/cron/refresh-video-cache`, {
      method: 'GET', // Changed from POST to GET to match the API endpoint
      headers: {
        Authorization: `Bearer ${cronSecret}`,
        'Content-Type': 'application/json',
        'User-Agent': 'ADMI-Lambda-VideoCacheRefresh/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()

    console.log('✅ Video cache refresh completed successfully')
    console.log('Result:', JSON.stringify(result, null, 2))

    // Send notification if webhook URL is configured
    if (process.env.BLOG_GENERATION_WEBHOOK_URL) {
      await sendNotification('video-cache-refresh', result)
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        type: 'video-cache-refresh',
        timestamp: new Date().toISOString(),
        result: result,
        videosProcessed: result.videosProcessed || 0,
        cacheUpdated: result.cacheUpdated || false
      })
    }
  } catch (error) {
    console.error('❌ Video cache refresh failed:', error)

    // Send error notification
    if (process.env.BLOG_GENERATION_WEBHOOK_URL) {
      await sendErrorNotification('video-cache-refresh', error)
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        type: 'video-cache-refresh',
        timestamp: new Date().toISOString()
      })
    }
  }
}

/**
 * Send success notification webhook
 */
async function sendNotification(type, result) {
  if (!process.env.BLOG_GENERATION_WEBHOOK_URL) return

  try {
    const payload = {
      text: '✅ Video Cache Refresh Complete',
      attachments: [
        {
          color: 'good',
          fields: [
            {
              title: 'Videos Processed',
              value: result.videosProcessed || 'Unknown',
              short: true
            },
            {
              title: 'Cache Updated',
              value: result.cacheUpdated ? 'Yes' : 'No',
              short: true
            },
            {
              title: 'Type',
              value: type.toUpperCase(),
              short: true
            },
            {
              title: 'Timestamp',
              value: new Date().toISOString(),
              short: true
            }
          ]
        }
      ]
    }

    if (result.newVideos && result.newVideos > 0) {
      payload.attachments[0].fields.push({
        title: 'New Videos Found',
        value: result.newVideos.toString(),
        short: true
      })
    }

    await fetch(process.env.BLOG_GENERATION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    console.log('📡 Video cache notification sent successfully')
  } catch (error) {
    console.error('❌ Failed to send video cache notification:', error)
  }
}

/**
 * Send error notification webhook
 */
async function sendErrorNotification(type, error) {
  if (!process.env.BLOG_GENERATION_WEBHOOK_URL) return

  try {
    const payload = {
      text: '❌ Video Cache Refresh Failed',
      attachments: [
        {
          color: 'danger',
          fields: [
            {
              title: 'Error',
              value: error.message,
              short: false
            },
            {
              title: 'Type',
              value: type.toUpperCase(),
              short: true
            },
            {
              title: 'Timestamp',
              value: new Date().toISOString(),
              short: true
            }
          ]
        }
      ]
    }

    await fetch(process.env.BLOG_GENERATION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    console.log('📡 Video cache error notification sent successfully')
  } catch (notificationError) {
    console.error('❌ Failed to send video cache error notification:', notificationError)
  }
}
