#!/usr/bin/env node

/**
 * Decode Brevo Pipeline and Stage IDs
 * Maps cryptic IDs to human-readable names
 */

const axios = require('axios')
require('dotenv').config()

const apiKey = process.env.BREVO_API_KEY
const baseURL = 'https://api.brevo.com/v3'

async function getAllPipelines() {
  try {
    const response = await axios.get(`${baseURL}/crm/pipeline/details/all`, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch pipelines:', error.message)
    return []
  }
}

async function decodeDealInfo(pipelineId, stageId) {
  console.log('🔍 DECODING BREVO DEAL IDENTIFIERS')
  console.log('='.repeat(70))
  console.log(`\nPipeline ID: ${pipelineId}`)
  console.log(`Stage ID: ${stageId}\n`)

  const pipelines = await getAllPipelines()

  if (!pipelines || pipelines.length === 0) {
    console.log('❌ No pipelines found')
    return
  }

  console.log('📋 ALL PIPELINES AND STAGES:')
  console.log('='.repeat(70))

  let foundPipeline = null
  let foundStage = null

  pipelines.forEach(pipeline => {
    const pId = pipeline.pipeline_id || pipeline.id
    const pName = pipeline.pipeline_name || pipeline.name
    const isMatch = pId === pipelineId

    console.log(`\n${isMatch ? '👉 ' : '   '}Pipeline: ${pName}`)
    console.log(`   ID: ${pId}`)
    console.log(`   Default: ${pipeline.is_default || false}`)

    if (isMatch) {
      foundPipeline = pipeline
    }

    const stages = pipeline.pipeline_stages || pipeline.stages || []
    stages.forEach(stage => {
      const sId = stage.id
      const sName = stage.name
      const isStageMatch = sId === stageId
      
      console.log(`   ${isStageMatch ? '   ✅ ' : '      '}Stage: ${sName} (${stage.win_percentage || 0}%)`)
      console.log(`   ${isStageMatch ? '   ' : '      '}   ID: ${sId}`)

      if (isStageMatch) {
        foundStage = stage
      }
    })
  })

  console.log('\n' + '='.repeat(70))
  console.log('🎯 DECODED RESULT:')
  console.log('='.repeat(70))

  if (foundPipeline && foundStage) {
    console.log(`\n✅ Pipeline: ${foundPipeline.pipeline_name || foundPipeline.name}`)
    console.log(`✅ Stage: ${foundStage.name}`)
    console.log(`✅ Win Probability: ${foundStage.win_percentage || 0}%`)

    if (foundStage.win_percentage === 100 || 
        foundStage.name.toLowerCase().includes('won') ||
        foundStage.name.toLowerCase().includes('enrolled')) {
      console.log('\n🎉 THIS IS A WINNING/CUSTOMER STAGE!')
      console.log('   → This contact should be exported for Customer Match')
    } else {
      console.log('\n⚠️  This is NOT a winning stage')
      console.log('   → Contact may still be in sales process')
    }
  } else {
    console.log('\n❌ Could not decode IDs')
    if (!foundPipeline) console.log('   Pipeline ID not found')
    if (!foundStage) console.log('   Stage ID not found')
  }

  console.log('\n')
}

// Get IDs from command line or use the example
const args = process.argv.slice(2)
const pipelineId = args[0] || '686e36380a6f48f74068574c'
const stageId = args[1] || '5pm1vv6452ld45bmo3rqikf'

decodeDealInfo(pipelineId, stageId).catch(console.error)
