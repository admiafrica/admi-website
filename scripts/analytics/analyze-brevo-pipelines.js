#!/usr/bin/env node

/**
 * Brevo CRM Pipeline & Deal Attributes Analyzer
 * Checks all pipelines and deal stages to understand customer labeling
 */

const axios = require('axios')
const fs = require('fs')
require('dotenv').config()

class BrevoCRMAnalyzer {
  constructor() {
    this.apiKey = process.env.BREVO_API_KEY
    this.baseURL = 'https://api.brevo.com/v3'
  }

  /**
   * Get all CRM pipelines
   */
  async getAllPipelines() {
    console.log('📊 Fetching all CRM pipelines...\n')

    try {
      const response = await axios.get(`${this.baseURL}/crm/pipeline/details/all`, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      })

      return response.data
    } catch (error) {
      console.error('❌ Failed to fetch pipelines:', error.message)
      if (error.response) {
        console.error('   Response:', error.response.data)
      }
      throw error
    }
  }

  /**
   * Get deals in a specific pipeline
   */
  async getDealsInPipeline(pipelineName, filters = {}) {
    console.log(`\n🔍 Fetching deals from pipeline: ${pipelineName}`)

    try {
      const params = {
        'filters[attributes.pipeline]': pipelineName,
        limit: 50,
        offset: 0,
        sort: 'desc',
        ...filters
      }

      const response = await axios.get(`${this.baseURL}/crm/deals`, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        },
        params
      })

      return response.data.items || []
    } catch (error) {
      console.error(`   ❌ Failed to fetch deals from ${pipelineName}:`, error.message)
      return []
    }
  }

  /**
   * Get deals in specific stage
   */
  async getDealsInStage(pipelineName, stageName) {
    console.log(`   Checking stage: ${stageName}`)

    try {
      const params = {
        'filters[attributes.pipeline]': pipelineName,
        'filters[attributes.deal_stage]': stageName,
        limit: 10 // Just get sample
      }

      const response = await axios.get(`${this.baseURL}/crm/deals`, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        },
        params
      })

      return response.data.items || []
    } catch (error) {
      return []
    }
  }

  /**
   * Analyze all pipelines and stages
   */
  async analyzePipelines() {
    console.log('🚀 Brevo CRM Pipeline & Deal Analysis')
    console.log('=' .repeat(70))
    console.log('Goal: Understand how customers/enrolled students are labeled\n')

    try {
      // Get all pipelines
      const pipelines = await this.getAllPipelines()

      if (!pipelines || pipelines.length === 0) {
        console.log('⚠️  No pipelines found')
        return
      }

      console.log(`✅ Found ${pipelines.length} pipeline(s)\n`)

      const analysis = {
        pipelines: [],
        customerStages: [],
        enrolledStages: [],
        totalDeals: 0,
        recommendations: []
      }

      // Analyze each pipeline
      for (const pipeline of pipelines) {
        console.log('─'.repeat(70))
        console.log(`📋 Pipeline: ${pipeline.pipeline_name || pipeline.name}`)
        console.log('─'.repeat(70))

        const pipelineData = {
          name: pipeline.pipeline_name || pipeline.name,
          isDefault: pipeline.is_default || false,
          stages: [],
          totalDeals: 0
        }

        // Analyze each stage
        if (pipeline.pipeline_stages || pipeline.stages) {
          const stages = pipeline.pipeline_stages || pipeline.stages

          for (const stage of stages) {
            console.log(`\n   Stage: ${stage.name}`)
            console.log(`   Win Probability: ${stage.win_percentage || 0}%`)

            // Get sample deals in this stage
            const deals = await this.getDealsInStage(
              pipeline.pipeline_name || pipeline.name,
              stage.name
            )

            const stageData = {
              name: stage.name,
              winProbability: stage.win_percentage || 0,
              dealCount: deals.length,
              isWinningStage: stage.win_percentage === 100 || 
                             stage.name.toLowerCase().includes('won') ||
                             stage.name.toLowerCase().includes('enrolled') ||
                             stage.name.toLowerCase().includes('customer'),
              sampleDeals: deals.slice(0, 3).map(deal => ({
                id: deal.id,
                name: deal.attributes?.deal_name || deal.name,
                contactEmail: deal.attributes?.contact_email,
                stage: deal.attributes?.deal_stage
              }))
            }

            pipelineData.stages.push(stageData)
            pipelineData.totalDeals += deals.length

            console.log(`   Deal count (sample): ${deals.length}`)
            
            if (stageData.isWinningStage) {
              console.log(`   ✅ WINNING/CUSTOMER STAGE identified!`)
              analysis.customerStages.push({
                pipeline: pipeline.pipeline_name || pipeline.name,
                stage: stage.name,
                dealCount: deals.length
              })
            }

            // Show sample deal if available
            if (deals.length > 0 && deals[0].attributes) {
              console.log(`   Sample deal attributes:`)
              const attrs = deals[0].attributes
              Object.keys(attrs).slice(0, 5).forEach(key => {
                console.log(`      - ${key}: ${attrs[key]}`)
              })
            }
          }
        }

        analysis.pipelines.push(pipelineData)
        analysis.totalDeals += pipelineData.totalDeals

        console.log(`\n   Total deals in this pipeline: ${pipelineData.totalDeals}`)
      }

      // Generate report
      console.log('\n' + '='.repeat(70))
      console.log('📊 ANALYSIS SUMMARY')
      console.log('='.repeat(70))

      console.log(`\nTotal Pipelines: ${analysis.pipelines.length}`)
      console.log(`Total Deals: ${analysis.totalDeals}`)

      if (analysis.customerStages.length > 0) {
        console.log(`\n✅ CUSTOMER/ENROLLED STAGES IDENTIFIED:`)
        analysis.customerStages.forEach((stage, idx) => {
          console.log(`   ${idx + 1}. ${stage.pipeline} → ${stage.stage}`)
          console.log(`      Deals in this stage: ${stage.dealCount}`)
        })
      } else {
        console.log(`\n⚠️  No obvious customer/enrolled stages found`)
        console.log(`   Looked for stages with:`)
        console.log(`   - 100% win probability`)
        console.log(`   - Names containing: "won", "enrolled", "customer"`)
      }

      // Generate recommendations
      console.log(`\n💡 RECOMMENDATIONS FOR CUSTOMER MATCH:`)
      
      if (analysis.customerStages.length > 0) {
        console.log(`\n   Use these stages to identify actual customers:`)
        analysis.customerStages.forEach(stage => {
          console.log(`   - Pipeline: "${stage.pipeline}", Stage: "${stage.stage}"`)
        })
      }

      console.log(`\n   To export customers, update the Brevo export script to filter by:`)
      console.log(`   1. Deal stage (if using CRM deals)`)
      console.log(`   2. Contact attributes (QUALIFICATION_STATUS)`)
      console.log(`   3. Specific lists (enrolled students list)`)

      // Save detailed report
      const reportPath = 'reports/google-ads/brevo-pipeline-analysis.json'
      fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2))
      console.log(`\n✅ Detailed report saved: ${reportPath}`)

      console.log('\n' + '='.repeat(70))

      return analysis

    } catch (error) {
      console.error('\n❌ Analysis failed:', error.message)
      throw error
    }
  }

  /**
   * Get contacts associated with winning deals
   */
  async getCustomersFromDeals() {
    console.log('\n\n🎯 Extracting customers from winning deals...\n')

    try {
      const pipelines = await this.getAllPipelines()
      const customerEmails = new Set()
      const customerData = []

      for (const pipeline of pipelines) {
        const stages = pipeline.pipeline_stages || pipeline.stages || []
        
        for (const stage of stages) {
          // Check if this is a winning stage
          const isWinningStage = stage.win_percentage === 100 || 
                                stage.name.toLowerCase().includes('won') ||
                                stage.name.toLowerCase().includes('enrolled')

          if (isWinningStage) {
            console.log(`   Fetching deals from: ${pipeline.pipeline_name || pipeline.name} → ${stage.name}`)
            
            const deals = await this.getDealsInStage(
              pipeline.pipeline_name || pipeline.name,
              stage.name
            )

            deals.forEach(deal => {
              const email = deal.attributes?.contact_email || deal.attributes?.email
              if (email && !customerEmails.has(email)) {
                customerEmails.add(email)
                customerData.push({
                  email,
                  dealName: deal.attributes?.deal_name || deal.name,
                  pipeline: pipeline.pipeline_name || pipeline.name,
                  stage: stage.name,
                  dealId: deal.id
                })
              }
            })
          }
        }
      }

      console.log(`\n✅ Found ${customerEmails.size} unique customer emails from winning deals\n`)

      if (customerData.length > 0) {
        const samplePath = 'reports/google-ads/customers-from-deals.json'
        fs.writeFileSync(samplePath, JSON.stringify(customerData, null, 2))
        console.log(`✅ Customer data saved: ${samplePath}`)
      }

      return customerData

    } catch (error) {
      console.error('❌ Failed to extract customers:', error.message)
      return []
    }
  }
}

// Run analysis
async function main() {
  const analyzer = new BrevoCRMAnalyzer()
  
  try {
    // Analyze pipeline structure
    const analysis = await analyzer.analyzePipelines()
    
    // Extract customers from winning deals
    const customers = await analyzer.getCustomersFromDeals()

    console.log('\n🎯 NEXT STEPS:')
    console.log('1. Review: reports/google-ads/brevo-pipeline-analysis.json')
    console.log('2. Check: reports/google-ads/customers-from-deals.json')
    console.log('3. Update customer match export script with correct filters')
    console.log('4. Re-run export with actual customer data\n')

  } catch (error) {
    console.error('Analysis failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = BrevoCRMAnalyzer
