/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs').promises
const path = require('path')

/**
 * Fix missing Accordion imports
 */
async function fixAccordionImports() {
  const coursesDir = path.join(__dirname, '../../src/pages/courses')
  const files = await fs.readdir(coursesDir)

  // Filter for location-specific pages that contain Accordion but missing import
  const locationPages = files.filter((file) => file.endsWith('.tsx') && file.includes('-') && !file.startsWith('['))

  console.log(`🔧 Checking ${locationPages.length} location pages for Accordion imports...`)

  let fixedCount = 0

  for (const file of locationPages) {
    try {
      const filePath = path.join(coursesDir, file)
      let content = await fs.readFile(filePath, 'utf8')

      // Check if file uses Accordion but doesn't import it
      if (content.includes('<Accordion>')) {
        const importMatch = content.match(/import { ([^}]+) } from '@mantine\/core'/)
        if (importMatch && !importMatch[1].includes('Accordion')) {
          console.log(`📦 Adding Accordion import to ${file}`)

          // Find the Mantine import and add Accordion
          content = content.replace(/import { ([^}]+) } from '@mantine\/core'/, (match, imports) => {
            if (!imports.includes('Accordion')) {
              return `import { ${imports}, Accordion } from '@mantine/core'`
            }
            return match
          })

          await fs.writeFile(filePath, content)
          console.log(`✅ Fixed: ${file}`)
          fixedCount++
        }
      }
    } catch (error) {
      console.error(`❌ Error fixing ${file}:`, error.message)
    }
  }

  console.log('\n📊 Import Fix Summary:')
  console.log(`✅ Files fixed: ${fixedCount}`)
  console.log(`📈 Total checked: ${locationPages.length}`)
}

// Run if called directly
if (require.main === module) {
  fixAccordionImports().catch(console.error)
}

module.exports = { fixAccordionImports }
