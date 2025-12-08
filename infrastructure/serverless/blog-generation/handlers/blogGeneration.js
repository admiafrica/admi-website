/* eslint-disable @typescript-eslint/no-var-requires */
const BlogScheduler = require('../../../../scripts/blog-generation/blog-scheduler')
const { sendErrorNotification: sendEmailNotification } = require('../../../../scripts/utils/error-notifications')

/**
 * AWS Lambda handler for daily blog generation
 */
exports.daily = async (event) => {
  console.log('🚀 Starting daily blog generation Lambda function')
  console.log('Event:', JSON.stringify(event, null, 2))

  const scheduler = new BlogScheduler()

  try {
    // Generate daily batch (2 articles)
    const result = await scheduler.dailyGeneration()

    console.log('✅ Daily blog generation completed successfully')
    console.log('Result:', JSON.stringify(result, null, 2))

    // Send notification if webhook URL is configured
    if (process.env.BLOG_GENERATION_WEBHOOK_URL) {
      await sendNotification('daily', result)
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        type: 'daily',
        articlesGenerated: result.successful,
        totalGenerated: result.totalGenerated,
        timestamp: new Date().toISOString(),
        articles: result.articles.map((article) => ({
          title: article.title,
          id: article.entryId,
          category: article.category
        }))
      })
    }
  } catch (error) {
    console.error('❌ Daily blog generation failed:', error)

    // Send error notification via email
    await sendEmailNotification({
      subject: 'Daily Blog Generation Failed (Lambda)',
      automationType: 'Blog Generation (Daily)',
      error: error.message,
      context: {
        lambdaFunction: 'dailyBlogGeneration',
        event: JSON.stringify(event),
        stack: error.stack,
        timestamp: new Date().toISOString()
      },
      severity: 'high'
    })

    // Send webhook notification if configured
    if (process.env.BLOG_GENERATION_WEBHOOK_URL) {
      await sendErrorNotification('daily', error)
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        type: 'daily',
        timestamp: new Date().toISOString()
      })
    }
  }
}

/**
 * AWS Lambda handler for weekly blog generation
 */
exports.weekly = async (event) => {
  console.log('🚀 Starting weekly blog generation Lambda function')
  console.log('Event:', JSON.stringify(event, null, 2))

  const scheduler = new BlogScheduler()

  try {
    // Generate weekly batch (7 articles)
    const result = await scheduler.weeklyGeneration()

    console.log('✅ Weekly blog generation completed successfully')
    console.log('Result:', JSON.stringify(result, null, 2))

    // Send notification if webhook URL is configured
    if (process.env.BLOG_GENERATION_WEBHOOK_URL) {
      await sendNotification('weekly', result)
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        type: 'weekly',
        articlesGenerated: result.successful,
        totalGenerated: result.totalGenerated,
        timestamp: new Date().toISOString(),
        articles: result.articles.map((article) => ({
          title: article.title,
          id: article.entryId,
          category: article.category
        }))
      })
    }
  } catch (error) {
    console.error('❌ Weekly blog generation failed:', error)

    // Send error notification via email
    await sendEmailNotification({
      subject: 'Weekly Blog Generation Failed (Lambda)',
      automationType: 'Blog Generation (Weekly)',
      error: error.message,
      context: {
        lambdaFunction: 'weeklyBlogGeneration',
        event: JSON.stringify(event),
        stack: error.stack,
        timestamp: new Date().toISOString()
      },
      severity: 'high'
    })

    // Send webhook notification if configured
    if (process.env.BLOG_GENERATION_WEBHOOK_URL) {
      await sendErrorNotification('weekly', error)
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        type: 'weekly',
        timestamp: new Date().toISOString()
      })
    }
  }
}

/**
 * AWS Lambda handler for test blog generation (HTTP endpoint)
 */
exports.test = async (event) => {
  console.log('🧪 Starting test blog generation')
  console.log('Event:', JSON.stringify(event, null, 2))

  const scheduler = new BlogScheduler()

  try {
    // Parse request body for parameters
    const body = event.body ? JSON.parse(event.body) : {}
    const count = body.count || 1
    const category = body.category

    let result

    if (category) {
      // Generate for specific category
      result = await scheduler.generateByCategory(category, count)
      result = {
        successful: result ? result.length : 0,
        failed: count - (result ? result.length : 0),
        articles: result || [],
        totalGenerated: result ? result.length : 0
      }
    } else {
      // Generate batch
      result = await scheduler.generateBatch(count)
    }

    console.log('✅ Test blog generation completed')
    console.log('Result:', JSON.stringify(result, null, 2))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        type: 'test',
        articlesGenerated: result.successful,
        totalGenerated: result.totalGenerated,
        timestamp: new Date().toISOString(),
        articles: result.articles.map((article) => ({
          title: article.title,
          id: article.entryId,
          category: article.category
        }))
      })
    }
  } catch (error) {
    console.error('❌ Test blog generation failed:', error)

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        type: 'test',
        timestamp: new Date().toISOString()
      })
    }
  }
}

/**
 * AWS Lambda handler for blog generation statistics
 */
exports.stats = async () => {
  console.log('📊 Getting blog generation statistics')

  const scheduler = new BlogScheduler()

  try {
    const stats = await scheduler.getStats()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        stats: stats,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('❌ Failed to get blog stats:', error)

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
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
    const fetch = (await import('node-fetch')).default

    const payload = {
      text: `✅ Blog Generation Complete - ${type}`,
      attachments: [
        {
          color: 'good',
          fields: [
            {
              title: 'Articles Generated',
              value: result.successful,
              short: true
            },
            {
              title: 'Total Generated',
              value: result.totalGenerated,
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

    if (result.articles && result.articles.length > 0) {
      payload.attachments[0].fields.push({
        title: 'Generated Articles',
        value: result.articles.map((article) => `• ${article.title}`).join('\n'),
        short: false
      })
    }

    await fetch(process.env.BLOG_GENERATION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    console.log('📡 Notification sent successfully')
  } catch (error) {
    console.error('❌ Failed to send notification:', error)
  }
}

/**
 * Send error notification webhook
 */
async function sendErrorNotification(type, error) {
  if (!process.env.BLOG_GENERATION_WEBHOOK_URL) return

  try {
    const fetch = (await import('node-fetch')).default

    const payload = {
      text: `❌ Blog Generation Failed - ${type}`,
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

    console.log('📡 Error notification sent successfully')
  } catch (notificationError) {
    console.error('❌ Failed to send error notification:', notificationError)
  }
}
