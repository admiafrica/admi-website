/* eslint-disable @typescript-eslint/no-var-requires */
const { generateLocationContent, LOCATIONS, COURSE_CONTEXTS } = require('./location-content-generator')
const fs = require('fs').promises
const path = require('path')

/**
 * Generate content for a single course-location combination
 */
async function generateSingle() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.log('Usage: node generate-single-location.js <course> <location>')
    console.log('\nAvailable courses:')
    console.log(Object.keys(COURSE_CONTEXTS).join(', '))
    console.log('\nAvailable locations:')
    console.log(Object.keys(LOCATIONS).join(', '))
    console.log('\nExample: node generate-single-location.js digital-marketing nairobi')
    return
  }

  const [course, location] = args

  if (!COURSE_CONTEXTS[course]) {
    console.error(`❌ Invalid course: ${course}`)
    console.log('Available courses:', Object.keys(COURSE_CONTEXTS).join(', '))
    return
  }

  if (!LOCATIONS[location]) {
    console.error(`❌ Invalid location: ${location}`)
    console.log('Available locations:', Object.keys(LOCATIONS).join(', '))
    return
  }

  console.log(`\n🎯 Generating content for ${course} in ${location}...`)

  try {
    const content = await generateLocationContent(course, location)

    if (content) {
      console.log('\n✅ Generated content:')
      console.log(JSON.stringify(content, null, 2))

      // Save to file
      const filename = `generated-location-content-${course}-${location}.json`
      await fs.writeFile(path.join(__dirname, filename), JSON.stringify(content, null, 2))
      console.log(`\n📁 Saved to: ${filename}`)
    } else {
      console.error('❌ Failed to generate content')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

generateSingle()
