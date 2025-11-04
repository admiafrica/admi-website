require('dotenv').config()

const CONFIG = {
  brevo: {
    apiKey: process.env.BREVO_API_KEY,
    baseUrl: 'https://api.brevo.com/v3'
  }
}

// Pipeline data from the comprehensive analysis
const PIPELINES = [
  {
    "pipeline": "6655908c78e5681a7bfb649d",
    "pipeline_name": "September 2024",
    "stages": [
      { "id": "vamcrX10JL1i4NKc7c514TT", "name": "Unqualified" },
      { "id": "myNBuE9leY4gEMPUG1VlkjA", "name": "MQL" },
      { "id": "YDnvx913RKtsiaI6ebgRT6X", "name": "SQL" },
      { "id": "j86YY6liJaUZLKBOlM5uX4t", "name": "Decesion Maker Brught In" },
      { "id": "05DQENMLgCx2jAj8FYCYdOc", "name": "Applied" },
      { "id": "ba3omDN0RUJ3AalWl0WnIkv", "name": "Accepted" },
      { "id": "EDQivD6BzweY7hTQKhY38Fe", "name": "Won" },
      { "id": "e68ZSXvFbCOrIMMCzarEyR2", "name": "Lost" }
    ]
  },
  {
    "pipeline": "686e36380a6f48f74068574c",
    "pipeline_name": "Sept. 2025 Pipeline",
    "stages": [
      { "id": "2dxij3gv2nnjgdgdhgtgw8i", "name": "New" },
      { "id": "axpa2daajwgs8iiwrdx3xb1", "name": "MQL" },
      { "id": "rr0u0z85sprn4sqvilpk385", "name": "SQL" },
      { "id": "06ykrak4u66r0blgsbi1wjv", "name": "Applied" },
      { "id": "5pm1vv6452ld45bmo3rqikf", "name": "Enrolled/Won" },
      { "id": "rirus6vfy5pqsyw0kv19934", "name": "Lost" }
    ]
  },
  {
    "pipeline": "68e60a790c87b5f2cbfec788",
    "pipeline_name": "January 2026 Pipeline",
    "stages": [
      { "id": "2ixzacgsn412m7y0ed20st5", "name": "New" },
      { "id": "f17io0yg7xl1rdmb5cy1d44", "name": "MQL" },
      { "id": "39539oz5gs2ktjvywn7pl6v", "name": "SQL" },
      { "id": "27x209expgyhg8428lh7ocn", "name": "Applied" },
      { "id": "7s2qqq3i6xla8uzrwwgpia2", "name": "Enrolled" },
      { "id": "ng1kn4njnv7covnpvwkhxv1", "name": "Lost" }
    ]
  },
  {
    "pipeline": "659d37d87493524ccf57dd49",
    "pipeline_name": "May 2024 Pipeline",
    "stages": [
      { "id": "659d38c0cdc5d1.02731822", "name": "Unqualified Lead" },
      { "id": "8542ec82-b23f-461f-abfb-f553254464c5", "name": "MQL" },
      { "id": "7a455476-acbe-43a5-8c28-9029c96cd942", "name": "SQL" },
      { "id": "756040af-9815-4929-aa37-c50c62f5dbb1", "name": "Decision Maker Brought in" },
      { "id": "7e6d7f45-670e-466e-9f43-168b45269b2e", "name": "Applied" },
      { "id": "e9533795-48bb-47c8-a47f-69df459417d1", "name": "Accepted" },
      { "id": "ff0d23bc-2649-439e-9db5-1f1676a64008", "name": "Won" },
      { "id": "d8158580-56f6-4f0c-9fa7-a3d202a2ab4c", "name": "Lost" }
    ]
  },

  {
    "pipeline": "6703a644ee857a2e673aa26f",
    "pipeline_name": "January 2025 Pipeline",
    "stages": [
      { "id": "fd00gpuyfdgw1rxpq0amrk7", "name": "New" },
      { "id": "wyqod9t2kca2re8k445ou1a", "name": "MQL" },
      { "id": "amkdwa35wh9e8bc4mxpxyke", "name": "SQL" },
      { "id": "j0l9twi8m7s5xzqc6q0s171", "name": "Decision Maker Brought In" },
      { "id": "aym5xv1d19h25dbulxiecji", "name": "Applied" },
      { "id": "u9mmmexd29x37llv5zh3rab", "name": "Accepted" },
      { "id": "yfolpbrufra96wvah5lw3i6", "name": "Won" },
      { "id": "b3uyen4afc8gnsx3xfuuych", "name": "Lost" }
    ]
  },
  {
    "pipeline": "679b3a27f62c2e138f7adf11",
    "pipeline_name": "May 2025 Pipeline",
    "stages": [
      { "id": "wp0q9xkxpby17ajvdowxd9p", "name": "New" },
      { "id": "k6cjvoeztpv75kmsz2zo4hy", "name": "MQL" },
      { "id": "ebvfkb95p6aemzzjzl24km5", "name": "SQL" },
      { "id": "n4u4uj7wusiq99o0x8gkr5h", "name": "Applied" },
      { "id": "i1a95qkz295gpevymty7lt5", "name": "Won" },
      { "id": "ppd6vkb8sxzsem8afh85t8a", "name": "Lost" }
    ]
  }
]

// Raw pipeline analysis data from the comprehensive fetch
const PIPELINE_ANALYSIS = {
  "68e60a790c87b5f2cbfec788": { // January 2026 Pipeline
    totalDeals: 9,
    totalAmount: 831000,
    stages: {
      '39539oz5gs2ktjvywn7pl6v': 1, // SQL
      '27x209expgyhg8428lh7ocn': 4, // Applied
      'f17io0yg7xl1rdmb5cy1d44': 4  // MQL
    }
  },
  "686e36380a6f48f74068574c": { // Sept. 2025 Pipeline
    totalDeals: 147,
    totalAmount: 15443000,
    stages: {
      '5pm1vv6452ld45bmo3rqikf': 78, // Enrolled/Won
      '2dxij3gv2nnjgdgdhgtgw8i': 14, // New
      '06ykrak4u66r0blgsbi1wjv': 6,  // Applied
      'axpa2daajwgs8iiwrdx3xb1': 33, // MQL
      'rr0u0z85sprn4sqvilpk385': 16  // SQL
    }
  },
  "679b3a27f62c2e138f7adf11": { // May 2025 Pipeline
    totalDeals: 161,
    totalAmount: 16102000,
    stages: {
      'i1a95qkz295gpevymty7lt5': 100, // Won
      'n4u4uj7wusiq99o0x8gkr5h': 8,   // Applied
      'ebvfkb95p6aemzzjzl24km5': 11,  // SQL
      'k6cjvoeztpv75kmsz2zo4hy': 40,  // MQL
      'wp0q9xkxpby17ajvdowxd9p': 1,   // New
      'ppd6vkb8sxzsem8afh85t8a': 1    // Lost
    }
  },
  "659d37d87493524ccf57dd49": { // May 2024 Pipeline
    totalDeals: 3837,
    totalAmount: 65746000,
    stages: {
      '659d38c0cdc5d1.02731822': 2950, // Unqualified Lead
      '8542ec82-b23f-461f-abfb-f553254464c5': 557, // MQL
      '7e6d7f45-670e-466e-9f43-168b45269b2e': 14,  // Applied
      'ff0d23bc-2649-439e-9db5-1f1676a64008': 134, // Won
      '7a455476-acbe-43a5-8c28-9029c96cd942': 116, // SQL
      'e9533795-48bb-47c8-a47f-69df459417d1': 6,   // Accepted
      'd8158580-56f6-4f0c-9fa7-a3d202a2ab4c': 43,  // Lost
      '756040af-9815-4929-aa37-c50c62f5dbb1': 17   // Decision Maker Brought in
    }
  },

  "6703a644ee857a2e673aa26f": { // January 2025 Pipeline
    totalDeals: 192,
    totalAmount: 19362000,
    stages: {
      'yfolpbrufra96wvah5lw3i6': 96, // Won
      'wyqod9t2kca2re8k445ou1a': 62, // MQL
      'b3uyen4afc8gnsx3xfuuych': 2,  // Lost
      'amkdwa35wh9e8bc4mxpxyke': 22, // SQL
      'aym5xv1d19h25dbulxiecji': 10  // Applied
    }
  },
  "6655908c78e5681a7bfb649d": { // September 2024
    totalDeals: 272,
    totalAmount: 24585000,
    stages: {
      'EDQivD6BzweY7hTQKhY38Fe': 98,  // Won
      'myNBuE9leY4gEMPUG1VlkjA': 114, // MQL
      'j86YY6liJaUZLKBOlM5uX4t': 4,   // Decision Maker Brought In
      '05DQENMLgCx2jAj8FYCYdOc': 6,   // Applied
      'YDnvx913RKtsiaI6ebgRT6X': 36,   // SQL
      'e68ZSXvFbCOrIMMCzarEyR2': 1,   // Lost
      'vamcrX10JL1i4NKc7c514TT': 13   // Unqualified
    }
  }
}

/**
 * Create stage mapping for all pipelines
 */
function createStageMapping() {
  const stageMapping = {}
  
  PIPELINES.forEach(pipeline => {
    pipeline.stages.forEach(stage => {
      stageMapping[stage.id] = {
        name: stage.name,
        pipeline: pipeline.pipeline_name,
        pipelineId: pipeline.pipeline
      }
    })
  })
  
  return stageMapping
}

/**
 * Analyze Applied → Enrolled conversion across all pipelines
 */
function analyzeAppliedEnrolledConversion() {
  console.log('🎯 Analyzing Applied → Enrolled Conversion Across All Pipelines (2024-2025)')
  console.log('=' .repeat(80))
  
  const stageMapping = createStageMapping()
  let totalApplied = 0
  let totalEnrolled = 0
  let totalWon = 0
  let totalAccepted = 0
  
  const pipelineResults = []
  
  Object.entries(PIPELINE_ANALYSIS).forEach(([pipelineId, analysis]) => {
    const pipelineName = PIPELINES.find(p => p.pipeline === pipelineId)?.pipeline_name || 'Unknown'
    
    let applied = 0
    let enrolled = 0
    let won = 0
    let accepted = 0
    let other = 0
    
    const stageBreakdown = {}
    
    Object.entries(analysis.stages).forEach(([stageId, count]) => {
      const stageName = stageMapping[stageId]?.name || 'Unknown'
      stageBreakdown[stageName] = count
      
      const stageNameLower = stageName.toLowerCase()
      if (stageNameLower.includes('applied')) {
        applied += count
      } else if (stageNameLower.includes('enrolled')) {
        enrolled += count
      } else if (stageNameLower.includes('won')) {
        won += count
      } else if (stageNameLower.includes('accepted')) {
        accepted += count
      } else {
        other += count
      }
    })
    
    // For conversion calculation, consider Won/Accepted as successful enrollments
    const successfulEnrollments = enrolled + won + accepted
    const conversionRate = applied > 0 ? ((successfulEnrollments / applied) * 100).toFixed(1) : 0
    
    totalApplied += applied
    totalEnrolled += enrolled
    totalWon += won
    totalAccepted += accepted
    
    pipelineResults.push({
      pipelineName,
      pipelineId,
      totalDeals: analysis.totalDeals,
      totalAmount: analysis.totalAmount,
      applied,
      enrolled,
      won,
      accepted,
      successfulEnrollments,
      conversionRate,
      stageBreakdown
    })
    
    console.log(`\n📊 ${pipelineName}:`)
    console.log(`   Total Deals: ${analysis.totalDeals.toLocaleString()}`)
    console.log(`   Total Value: $${analysis.totalAmount.toLocaleString()}`)
    console.log(`   Applied: ${applied}`)
    console.log(`   Enrolled: ${enrolled}`)
    console.log(`   Won: ${won}`)
    console.log(`   Accepted: ${accepted}`)
    console.log(`   Successful Enrollments: ${successfulEnrollments}`)
    console.log(`   Applied → Success Rate: ${conversionRate}%`)
    console.log(`   Stage Breakdown:`, stageBreakdown)
  })
  
  const totalSuccessfulEnrollments = totalEnrolled + totalWon + totalAccepted
  const overallConversionRate = totalApplied > 0 ? ((totalSuccessfulEnrollments / totalApplied) * 100).toFixed(1) : 0
  
  console.log('\n' + '=' .repeat(80))
  console.log('🎯 CORRECTED ANALYSIS: ADMI ENROLLMENT PERFORMANCE (2024-2025)')
  console.log('=' .repeat(80))
  console.log(`📊 Total Applied Across All Pipelines: ${totalApplied}`)
  console.log(`🎓 Total Enrolled: ${totalEnrolled}`)
  console.log(`🏆 Total Won: ${totalWon}`)
  console.log(`✅ Total Accepted: ${totalAccepted}`)
  console.log(`🎯 Total Successful Enrollments: ${totalSuccessfulEnrollments}`)
  console.log(`📈 Applied → Success Conversion Rate: ${overallConversionRate}%`)
  console.log(`🎯 Target Conversion Rate: 80%`)
  console.log(`📉 Gap from Target: ${(80 - parseFloat(overallConversionRate)).toFixed(1)} percentage points`)

  // CORRECTED ANALYSIS
  console.log('\n' + '🚨 CORRECTED UNDERSTANDING:')
  console.log(`💰 All amounts are in KES (Kenyan Shillings), not USD`)
  console.log(`👥 Manual process: Contact → MQL → SQL → Applied → Enrolled → Lost`)
  console.log(`🎯 Annual Target: 350 students × 3 intakes = 1,050 students per year`)
  console.log(`📊 Actual 2024-2025: ${totalSuccessfulEnrollments} students`)
  console.log(`📉 Performance Gap: ${totalSuccessfulEnrollments} vs 1,050 target = ${((totalSuccessfulEnrollments / 1050) * 100).toFixed(1)}% of target`)
  console.log(`🚨 Shortfall: ${1050 - totalSuccessfulEnrollments} students below target`)

  // Calculate per-intake performance
  const avgPerIntake = totalSuccessfulEnrollments / 3
  console.log(`📈 Average per intake: ${avgPerIntake.toFixed(0)} students (Target: 350)`)
  console.log(`⚠️ Per-intake gap: ${(350 - avgPerIntake).toFixed(0)} students short per intake`)

  return {
    pipelineResults,
    totalApplied,
    totalEnrolled,
    totalWon,
    totalAccepted,
    totalSuccessfulEnrollments,
    overallConversionRate,
    targetRate: 80,
    gapFromTarget: 80 - parseFloat(overallConversionRate),
    // Corrected metrics
    annualTarget: 1050,
    actualEnrollments: totalSuccessfulEnrollments,
    performancePercentage: (totalSuccessfulEnrollments / 1050) * 100,
    shortfall: 1050 - totalSuccessfulEnrollments,
    avgPerIntake: totalSuccessfulEnrollments / 3,
    perIntakeGap: 350 - (totalSuccessfulEnrollments / 3)
  }
}

// Run the analysis
analyzeAppliedEnrolledConversion()
