require('dotenv').config()

const CONFIG = {
  brevo: {
    apiKey: process.env.BREVO_API_KEY,
    baseUrl: 'https://api.brevo.com/v3'
  }
}

/**
 * Fetch all pipelines in the system
 */
async function fetchAllPipelines() {
  try {
    const url = `${CONFIG.brevo.baseUrl}/crm/pipeline/details/all`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': CONFIG.brevo.apiKey
      }
    })

    if (!response.ok) {
      console.log(`⚠️ All pipelines API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching all pipelines:', error)
    return null
  }
}

/**
 * Fetch deals from all pipelines for 2024-2025
 */
async function fetchAllDeals2024_2025() {
  try {
    console.log('🔍 Fetching all deals for 2024-2025 analysis...')

    let allDeals = []
    let offset = 0
    const limit = 500
    let hasMore = true

    while (hasMore) {
      const url = `${CONFIG.brevo.baseUrl}/crm/deals?limit=${limit}&offset=${offset}&sort=desc`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'api-key': CONFIG.brevo.apiKey
        }
      })

      if (!response.ok) {
        console.log(`⚠️ Deals API error: ${response.status} ${response.statusText}`)
        break
      }

      const data = await response.json()

      if (data.items && data.items.length > 0) {
        // Filter for 2024-2025 deals
        const filtered2024_2025 = data.items.filter(deal => {
          const createdAt = deal.attributes?.created_at
          if (!createdAt) return false

          const dealDate = new Date(createdAt)
          const start2024 = new Date('2024-01-01')
          const end2025 = new Date('2025-12-31')

          return dealDate >= start2024 && dealDate <= end2025
        })

        allDeals = allDeals.concat(filtered2024_2025)
        console.log(`   Fetched ${data.items.length} deals, ${filtered2024_2025.length} from 2024-2025 (Total: ${allDeals.length})`)

        if (data.items.length < limit) {
          hasMore = false
        } else {
          offset += limit
        }
      } else {
        hasMore = false
      }
    }

    return allDeals
  } catch (error) {
    console.error('Error fetching all deals:', error)
    return []
  }
}

/**
 * Comprehensive pipeline analysis for 2024-2025
 */
async function comprehensivePipelineAnalysis() {
  try {
    console.log('🚀 Starting Comprehensive Pipeline Analysis for 2024-2025...')

    // Fetch all pipelines
    console.log('\n📊 Fetching all pipelines...')
    const allPipelines = await fetchAllPipelines()

    if (allPipelines) {
      console.log(`✅ Found ${allPipelines.length || 1} pipeline(s)`)
      console.log('Pipelines:', JSON.stringify(allPipelines, null, 2))
    }

    // Fetch all deals for 2024-2025
    const allDeals2024_2025 = await fetchAllDeals2024_2025()
    console.log(`\n✅ Total 2024-2025 deals: ${allDeals2024_2025.length}`)

    // Analyze by pipeline
    const pipelineAnalysis = {}

    allDeals2024_2025.forEach(deal => {
      const pipelineId = deal.attributes?.pipeline || 'Unknown'

      if (!pipelineAnalysis[pipelineId]) {
        pipelineAnalysis[pipelineId] = {
          deals: [],
          stages: {},
          totalAmount: 0,
          applied: 0,
          enrolled: 0
        }
      }

      pipelineAnalysis[pipelineId].deals.push(deal)
      pipelineAnalysis[pipelineId].totalAmount += deal.attributes?.amount || 0

      // Count stages (we'll map these properly with pipeline details)
      const stageId = deal.attributes?.deal_stage || 'Unknown'
      if (!pipelineAnalysis[pipelineId].stages[stageId]) {
        pipelineAnalysis[pipelineId].stages[stageId] = 0
      }
      pipelineAnalysis[pipelineId].stages[stageId]++
    })

    console.log('\n📈 Pipeline Analysis Results:')
    Object.entries(pipelineAnalysis).forEach(([pipelineId, analysis]) => {
      console.log(`\nPipeline ${pipelineId}:`)
      console.log(`  - Total Deals: ${analysis.deals.length}`)
      console.log(`  - Total Amount: $${analysis.totalAmount.toLocaleString()}`)
      console.log(`  - Stages:`, analysis.stages)
    })

    return {
      allPipelines,
      allDeals2024_2025,
      pipelineAnalysis
    }

  } catch (error) {
    console.error('❌ Error in comprehensive analysis:', error)
  }
}

// Run the comprehensive analysis
comprehensivePipelineAnalysis()
