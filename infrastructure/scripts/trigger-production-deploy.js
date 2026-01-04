#!/usr/bin/env node

/**
 * Trigger Production Deploy
 *
 * This script triggers a deployment to the main (production) branch
 * Can be run manually or via scheduled EventBridge rule
 *
 * Usage:
 *   node trigger-production-deploy.js
 *
 * As Lambda:
 *   AWS EventBridge triggers this daily at midnight EAT (21:00 UTC)
 */

const { AmplifyClient, StartJobCommand } = require('@aws-sdk/client-amplify')

const APP_ID = 'dlm0hjalapt7d'
const BRANCH_NAME = 'main'
const REGION = 'us-east-1'

async function triggerDeploy() {
  const client = new AmplifyClient({ region: REGION })

  try {
    console.log(`🚀 Triggering deployment for ${BRANCH_NAME} branch...`)

    const command = new StartJobCommand({
      appId: APP_ID,
      branchName: BRANCH_NAME,
      jobType: 'RELEASE',
      jobReason: 'Scheduled daily deployment'
    })

    const response = await client.send(command)

    console.log('✅ Deployment triggered successfully!')
    console.log(`📋 Job ID: ${response.jobSummary.jobId}`)
    console.log(`📅 Job ARN: ${response.jobSummary.jobArn}`)
    console.log(`🔗 View in Amplify Console: https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/${APP_ID}/${BRANCH_NAME}/${response.jobSummary.jobId}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Deployment triggered successfully',
        jobId: response.jobSummary.jobId,
        jobArn: response.jobSummary.jobArn
      })
    }
  } catch (error) {
    console.error('❌ Error triggering deployment:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to trigger deployment',
        error: error.message
      })
    }
  }
}

// Lambda handler
exports.handler = async (event, context) => {
  console.log('📦 Event:', JSON.stringify(event, null, 2))
  return await triggerDeploy()
}

// Allow running directly from command line
if (require.main === module) {
  triggerDeploy()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
