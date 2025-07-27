/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs').promises
const path = require('path')

/**
 * Fix duplicate FAQ sections and remove population stats
 */
async function fixDuplicateFAQs() {
  const coursesDir = path.join(__dirname, '../../src/pages/courses')
  const files = await fs.readdir(coursesDir)

  // Filter for location-specific pages (contain hyphen)
  const locationPages = files.filter(
    (file) => file.endsWith('.tsx') && file.includes('-') && !file.startsWith('[') // Exclude dynamic routes
  )

  console.log(`🔧 Fixing ${locationPages.length} location pages...`)

  let fixedCount = 0
  let errorCount = 0

  for (const file of locationPages) {
    try {
      const filePath = path.join(coursesDir, file)
      let content = await fs.readFile(filePath, 'utf8')

      let modified = false

      // Remove duplicate FAQ sections
      const faqPattern =
        /(<Card shadow="sm" padding="lg" radius="md" withBorder mt="md">\s*<Title order={3} mb="md">Frequently Asked Questions - [^<]+ Students<\/Title>\s*<Accordion>[\s\S]*?<\/Accordion>\s*<\/Card>)/g
      const faqMatches = content.match(faqPattern)

      if (faqMatches && faqMatches.length > 1) {
        console.log(`🔄 Removing ${faqMatches.length - 1} duplicate FAQ sections from ${file}`)

        // Keep only the first FAQ section
        let firstFAQFound = false
        content = content.replace(faqPattern, (match) => {
          if (!firstFAQFound) {
            firstFAQFound = true
            return match
          }
          return '' // Remove subsequent duplicates
        })
        modified = true
      }

      // Remove population stats completely
      const populationPattern = /<Text mb="sm">\s*<strong>Population:<\/strong>[^<]*<\/Text>\s*/g
      if (populationPattern.test(content)) {
        console.log(`🗑️ Removing population stats from ${file}`)
        content = content.replace(populationPattern, '')
        modified = true
      }

      // Fix missing import for Accordion
      if (content.includes('<Accordion>') && !content.includes('Accordion') && content.includes('import {')) {
        const importMatch = content.match(/import { ([^}]+) } from '@mantine\/core'/)
        if (importMatch && !importMatch[1].includes('Accordion')) {
          content = content.replace(
            /import { ([^}]+) } from '@mantine\/core'/,
            "import { $1, Accordion } from '@mantine/core'"
          )
          console.log(`📦 Added Accordion import to ${file}`)
          modified = true
        }
      }

      // Clean up malformed location text
      content = content.replace(
        /<strong>Location:<\/strong>[^<]*<\/Text>/g,
        '<strong>Location:</strong> ADMI Nairobi Campus</Text>'
      )

      if (modified) {
        await fs.writeFile(filePath, content)
        console.log(`✅ Fixed: ${file}`)
        fixedCount++
      } else {
        console.log(`✓ No issues: ${file}`)
      }
    } catch (error) {
      console.error(`❌ Error fixing ${file}:`, error.message)
      errorCount++
    }
  }

  console.log('\n📊 Fix Summary:')
  console.log(`✅ Files fixed: ${fixedCount}`)
  console.log(`✓ Files with no issues: ${locationPages.length - fixedCount - errorCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`📈 Total processed: ${locationPages.length}`)
}

// Run if called directly
if (require.main === module) {
  fixDuplicateFAQs().catch(console.error)
}

module.exports = { fixDuplicateFAQs }
