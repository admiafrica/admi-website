/* eslint-disable @typescript-eslint/no-var-requires */
const { generateLocationContent, LOCATIONS, COURSE_CONTEXTS } = require('./location-content-generator')
const { updateLocationPage } = require('./update-location-pages')
const fs = require('fs').promises
const path = require('path')

/**
 * Complete workflow: Generate content and update pages
 */
async function completeLocationEnhancement() {
  const courses = Object.keys(COURSE_CONTEXTS)
  const locations = Object.keys(LOCATIONS)

  console.log('🚀 Starting complete location enhancement...')
  console.log(
    `📊 Processing ${courses.length} courses × ${locations.length} locations = ${courses.length * locations.length} pages`
  )

  const results = {
    generated: 0,
    updated: 0,
    errors: 0,
    existing: 0
  }

  for (const course of courses) {
    console.log(`\n📚 Processing course: ${course}`)

    for (const location of locations) {
      const contentFile = path.join(__dirname, `generated-location-content-${course}-${location}.json`)

      try {
        // Check if content already exists
        let content
        try {
          const existingContent = await fs.readFile(contentFile, 'utf8')
          content = JSON.parse(existingContent)
          console.log(`✓ Using existing content: ${course}-${location}`)
          results.existing++
        } catch (error) {
          // Generate new content
          console.log(`⏳ Generating: ${course}-${location}...`)
          content = await generateLocationContent(course, location)

          if (content) {
            await fs.writeFile(contentFile, JSON.stringify(content, null, 2))
            console.log(`✅ Generated: ${course}-${location}`)
            results.generated++

            // Rate limiting
            await new Promise((resolve) => setTimeout(resolve, 1500))
          } else {
            console.log(`❌ Failed to generate: ${course}-${location}`)
            results.errors++
            continue
          }
        }

        // Update the page
        if (content) {
          const updated = await updateLocationPage(course, location, content)
          if (updated) {
            console.log(`✅ Updated page: ${course}-${location}`)
            results.updated++
          } else {
            console.log(`❌ Failed to update page: ${course}-${location}`)
            results.errors++
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${course}-${location}:`, error.message)
        results.errors++
      }
    }
  }

  // Generate summary report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: courses.length * locations.length,
      ...results
    },
    courses: courses,
    locations: locations,
    performance: {
      successRate: `${Math.round((results.updated / (courses.length * locations.length)) * 100)}%`,
      generatedNew: results.generated,
      usedExisting: results.existing,
      totalUpdated: results.updated,
      errors: results.errors
    }
  }

  await fs.writeFile(path.join(__dirname, 'location-enhancement-report.json'), JSON.stringify(report, null, 2))

  console.log('\n📊 FINAL SUMMARY:')
  console.log(`✅ Content Generated: ${results.generated}`)
  console.log(`✓ Existing Content Used: ${results.existing}`)
  console.log(`✅ Pages Updated: ${results.updated}`)
  console.log(`❌ Errors: ${results.errors}`)
  console.log(`📈 Success Rate: ${report.performance.successRate}`)
  console.log('📁 Report saved: location-enhancement-report.json')

  return report
}

// Create usage guide
async function generateUsageGuide() {
  const guide = `# Location Content Enhancement - Usage Guide

## 🎯 What This Does
Enhances all 45 location landing pages with:
- Unique local market insights
- Location-specific FAQs  
- Transport/access information
- Local success stories

## 🚀 Quick Start
\`\`\`bash
# Generate content for single location
node generate-single-location.js digital-marketing nairobi

# Update single page  
node update-location-pages.js digital-marketing nairobi

# Complete enhancement (all pages)
node complete-location-enhancement.js

# Generate content in batches
node batch-location-generator.js 5 0  # First 5
node batch-location-generator.js 5 5  # Next 5
\`\`\`

## 📁 Generated Files
- \`generated-location-content-{course}-{location}.json\` - AI content
- \`batch-{number}-location-content.json\` - Batch results
- \`location-enhancement-report.json\` - Final report

## 🔧 Customization
Edit \`location-content-generator.js\`:
- Update \`LOCATIONS\` data for new cities
- Modify \`COURSE_CONTEXTS\` for new courses  
- Adjust prompts for different content styles

## 📊 Quality Control
Each generated content includes:
- 40-60 word local opportunity insights
- 20-30 word transport solutions
- 2 location-specific FAQs
- 20-25 word local success mentions

## 🎨 Page Structure
Enhanced pages include:
- Updated hero description
- Local market insights section
- Transport/access information  
- FAQ accordion
- Local success stories
`

  await fs.writeFile(path.join(__dirname, 'LOCATION_ENHANCEMENT_GUIDE.md'), guide)
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.includes('--guide')) {
    generateUsageGuide()
      .then(() => console.log('✅ Usage guide generated: LOCATION_ENHANCEMENT_GUIDE.md'))
      .catch(console.error)
  } else {
    completeLocationEnhancement()
      .then(() => console.log('🎉 Location enhancement complete!'))
      .catch(console.error)
  }
}

module.exports = { completeLocationEnhancement }
