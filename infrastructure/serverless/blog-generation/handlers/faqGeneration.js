/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * AWS Lambda handler for FAQ generation and optimization
 */

const { spawn } = require('child_process')
const path = require('path')
const { sendErrorNotification } = require('../../../../scripts/utils/error-notifications')

/**
 * Execute a Node.js script
 */
async function executeScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`📝 Executing: ${scriptPath}`)
    console.log(`📋 Args: ${JSON.stringify(args)}`)

    const child = spawn('node', [scriptPath, ...args], {
      cwd: path.join(__dirname, '../../../..'),
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data) => {
      const output = data.toString()
      stdout += output
      console.log(output)
    })

    child.stderr.on('data', (data) => {
      const output = data.toString()
      stderr += output
      console.error(output)
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, exitCode: code })
      } else {
        reject(new Error(`Script exited with code ${code}\nSTDERR: ${stderr}`))
      }
    })

    child.on('error', (error) => {
      reject(error)
    })
  })
}

/**
 * Weekly FAQ optimization using analytics data
 */
exports.weeklyOptimize = async (event) => {
  console.log('🎯 Starting weekly FAQ optimization')
  console.log('Event:', JSON.stringify(event, null, 2))

  try {
    // Run analytics-to-contentful FAQ generation
    const result = await executeScript(
      path.join(__dirname, '../../../../scripts/analytics/analytics-to-contentful-faq.js')
    )

    console.log('✅ Weekly FAQ optimization completed successfully')

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        type: 'weekly_optimize',
        timestamp: new Date().toISOString(),
        result: {
          stdout: result.stdout.substring(0, 1000), // Limit output size
          exitCode: result.exitCode
        }
      })
    }
  } catch (error) {
    console.error('❌ Weekly FAQ optimization failed:', error)

    // Send error notification
    await sendErrorNotification({
      subject: 'Weekly FAQ Optimization Failed (Lambda)',
      automationType: 'FAQ Optimization (Weekly)',
      error: error.message,
      context: {
        lambdaFunction: 'weeklyFaqOptimization',
        event: JSON.stringify(event),
        timestamp: new Date().toISOString()
      },
      severity: 'high'
    })

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        type: 'weekly_optimize',
        timestamp: new Date().toISOString(),
        error: error.message
      })
    }
  }
}

/**
 * Daily FAQ generation and Contentful sync
 */
exports.dailyGenerate = async (event) => {
  console.log('🎯 Starting daily FAQ generation')
  console.log('Event:', JSON.stringify(event, null, 2))

  try {
    const results = []

    // Step 1: Generate simple FAQs
    console.log('📝 Step 1: Generating simple FAQs...')
    const simpleResult = await executeScript(path.join(__dirname, '../../../../scripts/ai/simple-faq-generator.js'))
    results.push({ step: 'simple_faq', success: true })

    // Step 2: Optimize FAQs
    console.log('📝 Step 2: Optimizing FAQs...')
    const optimizeResult = await executeScript(path.join(__dirname, '../../../../scripts/ai/optimize-faqs.js'))
    results.push({ step: 'optimize_faq', success: true })

    console.log('✅ Daily FAQ generation completed successfully')

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        type: 'daily_faq',
        timestamp: new Date().toISOString(),
        results
      })
    }
  } catch (error) {
    console.error('❌ Daily FAQ generation failed:', error)

    // Send error notification
    await sendErrorNotification({
      subject: 'Daily FAQ Generation Failed (Lambda)',
      automationType: 'FAQ Generation (Daily)',
      error: error.message,
      context: {
        lambdaFunction: 'dailyFaqGeneration',
        event: JSON.stringify(event),
        timestamp: new Date().toISOString()
      },
      severity: 'high'
    })

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        type: 'daily_faq',
        timestamp: new Date().toISOString(),
        error: error.message
      })
    }
  }
}

/**
 * Manual test function
 */
exports.test = async (event) => {
  console.log('🧪 Testing FAQ generation')
  console.log('Event:', JSON.stringify(event, null, 2))

  try {
    // Run a simple test
    const result = await executeScript(path.join(__dirname, '../../../../scripts/ai/simple-faq-generator.js'), [
      '--test'
    ])

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        type: 'test',
        timestamp: new Date().toISOString(),
        result: {
          stdout: result.stdout.substring(0, 500)
        }
      })
    }
  } catch (error) {
    console.error('❌ FAQ generation test failed:', error)

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        type: 'test',
        timestamp: new Date().toISOString(),
        error: error.message
      })
    }
  }
}
