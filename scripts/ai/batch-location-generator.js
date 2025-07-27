/* eslint-disable @typescript-eslint/no-var-requires */
const { generateLocationContent, LOCATIONS, COURSE_CONTEXTS } = require('./location-content-generator')
const fs = require('fs').promises
const path = require('path')

/**
 * Generate content in smaller batches to avoid timeouts
 */
async function generateBatch() {
  const args = process.argv.slice(2)
  const batchSize = parseInt(args[0]) || 5
  const startIndex = parseInt(args[1]) || 0

  const courses = Object.keys(COURSE_CONTEXTS)
  const locations = Object.keys(LOCATIONS)

  // Create all combinations
  const combinations = []
  for (const course of courses) {
    for (const location of locations) {
      combinations.push({ course, location })
    }
  }

  const batch = combinations.slice(startIndex, startIndex + batchSize)

  console.log(`🚀 Generating batch ${Math.floor(startIndex / batchSize) + 1}`)
  console.log(
    `📊 Processing ${batch.length} combinations (${startIndex + 1}-${startIndex + batch.length} of ${combinations.length})`
  )

  const results = {}

  for (let i = 0; i < batch.length; i++) {
    const { course, location } = batch[i]
    console.log(`\n⏳ [${i + 1}/${batch.length}] Generating: ${course} in ${location}...`)

    try {
      const content = await generateLocationContent(course, location)

      if (content) {
        if (!results[course]) results[course] = {}
        results[course][location] = content

        // Save individual file
        const filename = `generated-location-content-${course}-${location}.json`
        await fs.writeFile(path.join(__dirname, filename), JSON.stringify(content, null, 2))

        console.log(`✅ Success: ${course} in ${location}`)
      } else {
        console.log(`❌ Failed: ${course} in ${location}`)
      }

      // Rate limiting between calls
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } catch (error) {
      console.log(`❌ Error: ${course} in ${location} - ${error.message}`)
    }
  }

  // Save batch results
  const batchFile = `batch-${Math.floor(startIndex / batchSize) + 1}-location-content.json`
  await fs.writeFile(path.join(__dirname, batchFile), JSON.stringify(results, null, 2))

  console.log(`\n✅ Batch completed! Saved to: ${batchFile}`)
  console.log(`📈 Next batch: node batch-location-generator.js ${batchSize} ${startIndex + batchSize}`)

  return results
}

generateBatch().catch(console.error)
