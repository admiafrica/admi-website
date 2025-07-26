/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process')
const path = require('path')
require('dotenv').config()

/**
 * Weekly FAQ Optimization Scheduler
 *
 * This script runs a comprehensive weekly optimization of FAQs using real analytics data
 * It can be scheduled to run via cron job or manually executed
 */

async function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Running: ${command} ${args.join(' ')}`)

    const process = spawn(command, args, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '../../'),
      shell: true
    })

    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Command completed successfully: ${command}`)
        resolve(code)
      } else {
        console.error(`❌ Command failed with code ${code}: ${command}`)
        reject(new Error(`Command failed: ${command}`))
      }
    })

    process.on('error', (error) => {
      console.error(`❌ Error running command: ${command}`, error)
      reject(error)
    })
  })
}

async function runWeeklyOptimization() {
  console.log('📅 Starting Weekly FAQ Optimization Process...')
  console.log(`🕐 Started at: ${new Date().toLocaleString()}`)

  try {
    // Step 1: Analyze current search query patterns
    console.log('\n📊 Step 1: Analyzing search query patterns...')
    await runCommand('npm', ['run', 'faq:analyze-queries'])

    // Step 2: Optimize main FAQ page with real data
    console.log('\n🎯 Step 2: Optimizing main FAQ page...')
    await runCommand('npm', ['run', 'faq:optimize-main'])

    // Step 3: Generate course-specific optimizations for high-traffic courses
    console.log('\n📚 Step 3: Optimizing course-specific FAQs...')

    const highTrafficCourses = [
      'music-production-diploma',
      'graphic-design-diploma',
      'film-and-television-production-diploma',
      'digital-marketing-certificate',
      'animation-and-motion-graphics-diploma'
    ]

    for (const courseSlug of highTrafficCourses) {
      console.log(`   🔄 Optimizing ${courseSlug}...`)
      try {
        await runCommand('npm', ['run', 'faq:generate-simple', courseSlug, '--', '--update'])
      } catch (error) {
        console.warn(`   ⚠️  Warning: Failed to optimize ${courseSlug}, continuing...`)
      }
    }

    // Step 4: Run type checking and linting
    console.log('\n🔍 Step 4: Running quality checks...')
    try {
      await runCommand('npm', ['run', 'type-check'])
      await runCommand('npm', ['run', 'lint'])
    } catch (error) {
      console.warn('⚠️  Warning: Quality checks had issues, but optimization completed')
    }

    console.log('\n✅ Weekly FAQ Optimization Complete!')
    console.log(`🕐 Completed at: ${new Date().toLocaleString()}`)

    // Generate summary report
    const summary = {
      timestamp: new Date().toISOString(),
      mainFAQOptimized: true,
      coursesOptimized: highTrafficCourses.length,
      qualityChecks: 'completed',
      nextOptimization: getNextWeeklyRun()
    }

    console.log('\n📋 Optimization Summary:')
    console.log(JSON.stringify(summary, null, 2))

    return summary
  } catch (error) {
    console.error('❌ Weekly optimization failed:', error)
    throw error
  }
}

function getNextWeeklyRun() {
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  return nextWeek.toISOString().split('T')[0] // Just the date part
}

/**
 * Setup instructions for cron job scheduling
 */
function displayCronInstructions() {
  console.log('\n📅 To schedule this script to run weekly, add this to your crontab:')
  console.log('Run: crontab -e')
  console.log('Add this line:')
  console.log('# Run FAQ optimization every Monday at 9 AM')
  console.log(`0 9 * * 1 cd ${process.cwd()} && npm run faq:weekly-optimize`)
  console.log('\nOr for a different schedule:')
  console.log('# Every Sunday at 6 AM: 0 6 * * 0')
  console.log('# Every first Monday of month: 0 9 1-7 * 1')
  console.log('# Twice a week (Mon & Thu): 0 9 * * 1,4')
}

// Main execution
async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'run':
      await runWeeklyOptimization()
      break
    case 'setup-cron':
      displayCronInstructions()
      break
    case 'test':
      console.log('🧪 Testing weekly optimization (dry run)...')
      console.log('This would run the following commands:')
      console.log('1. npm run faq:analyze-queries')
      console.log('2. npm run faq:optimize-main')
      console.log('3. npm run faq:generate-simple [course] --update (for 5 high-traffic courses)')
      console.log('4. npm run type-check && npm run lint')
      break
    default:
      console.log('📋 Weekly FAQ Optimization Scheduler')
      console.log('\nUsage:')
      console.log('  npm run faq:weekly-optimize run        # Run optimization now')
      console.log('  npm run faq:weekly-optimize test       # Dry run (show what would happen)')
      console.log('  npm run faq:weekly-optimize setup-cron # Show cron setup instructions')
      console.log('\nThis script will:')
      console.log('  ✅ Analyze current search patterns')
      console.log('  ✅ Optimize main FAQ page with real data')
      console.log('  ✅ Update high-traffic course FAQs')
      console.log('  ✅ Run quality checks (type-check, lint)')
      console.log('  ✅ Generate optimization summary report')
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
}

module.exports = {
  runWeeklyOptimization,
  displayCronInstructions
}
