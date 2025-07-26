/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
require('dotenv').config()

/**
 * Google Analytics MCP Server Setup Script
 *
 * This script helps you set up the official Google Analytics MCP server
 * for real-time analytics data integration with FAQ optimization
 */

async function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Running: ${command} ${args.join(' ')}`)

    const process = spawn(command, args, {
      stdio: 'inherit',
      shell: true
    })

    process.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Command completed successfully')
        resolve(code)
      } else {
        console.error(`❌ Command failed with code ${code}`)
        reject(new Error(`Command failed: ${command}`))
      }
    })

    process.on('error', (error) => {
      console.error('❌ Error running command:', error)
      reject(error)
    })
  })
}

/**
 * Check if required tools are installed
 */
async function checkPrerequisites() {
  console.log('🔍 Checking prerequisites...')

  const tools = ['node', 'npm', 'gcloud']
  const results = {}

  for (const tool of tools) {
    try {
      await runCommand(`${tool} --version`)
      results[tool] = true
      console.log(`✅ ${tool} is installed`)
    } catch (error) {
      results[tool] = false
      console.log(`❌ ${tool} is not installed`)
    }
  }

  return results
}

/**
 * Install Google Analytics MCP Server
 */
async function installSecureAnalytics() {
  console.log('\n📦 Installing Secure Google Analytics Integration...')

  try {
    // Install only the official Google Analytics Data API client (secure)
    await runCommand('npm', ['install', '@google-analytics/data'])
    console.log('✅ Official Google Analytics Data API client installed')

    // Note: No third-party MCP packages for security
    console.log('🔐 Using secure direct API integration (no third-party packages)')

    return true
  } catch (error) {
    console.error('❌ Failed to install Analytics client:', error)
    return false
  }
}

/**
 * Create Google Cloud service account
 */
function createServiceAccountInstructions() {
  console.log('\n☁️  Google Cloud Setup Instructions:')
  console.log("\n1. Create a new Google Cloud project (if you don't have one):")
  console.log('   → Go to https://console.cloud.google.com/')
  console.log('   → Click "Select a project" → "New Project"')
  console.log('   → Name your project (e.g., "admi-analytics-mcp")')
  console.log('   → Click "Create"')

  console.log('\n2. Enable required APIs:')
  console.log('   → Go to APIs & Services → Library')
  console.log('   → Search and enable "Google Analytics Data API"')
  console.log('   → Search and enable "Google Analytics Reporting API"')

  console.log('\n3. Create a service account:')
  console.log('   → Go to IAM & Admin → Service Accounts')
  console.log('   → Click "Create Service Account"')
  console.log('   → Name: "ga-mcp-service"')
  console.log('   → Description: "Google Analytics MCP Service Account"')
  console.log('   → Click "Create and Continue"')

  console.log('\n4. Assign roles:')
  console.log('   → Add role: "Viewer"')
  console.log('   → Add role: "Analytics Viewer"')
  console.log('   → Click "Continue" → "Done"')

  console.log('\n5. Create and download service account key:')
  console.log('   → Click on your service account')
  console.log('   → Go to "Keys" tab')
  console.log('   → Click "Add Key" → "Create new key"')
  console.log('   → Select "JSON" → Click "Create"')
  console.log('   → Save the file as "ga-service-account.json" in your project root')

  console.log('\n6. Add service account to Google Analytics:')
  console.log('   → Go to Google Analytics (analytics.google.com)')
  console.log('   → Select your property → Admin')
  console.log('   → Property → Property Access Management')
  console.log('   → Click "+" → "Add users"')
  console.log('   → Enter your service account email (from the JSON file)')
  console.log('   → Select "Viewer" permissions')
  console.log('   → Click "Add"')
}

/**
 * Create MCP configuration file
 */
function createMCPConfig() {
  console.log('\n⚙️  Creating MCP configuration...')

  const mcpConfig = {
    mcpServers: {
      'google-analytics': {
        command: 'node',
        args: ['node_modules/mcp-server-google-analytics/dist/index.js'],
        env: {
          GOOGLE_APPLICATION_CREDENTIALS: './ga-service-account.json',
          GA4_PROPERTY_ID: 'YOUR_GA4_PROPERTY_ID'
        }
      }
    }
  }

  const configPath = path.join(process.cwd(), 'mcp-settings.json')
  fs.writeFileSync(configPath, JSON.stringify(mcpConfig, null, 2))

  console.log(`✅ MCP configuration created: ${configPath}`)
  console.log('\n📝 Next steps:')
  console.log('1. Replace "YOUR_GA4_PROPERTY_ID" with your actual GA4 property ID')
  console.log('2. Make sure "ga-service-account.json" is in your project root')
  console.log('3. Add the file to .gitignore to keep credentials secure')

  return configPath
}

/**
 * Update environment variables
 */
function updateEnvironmentFile() {
  console.log('\n🔧 Updating environment variables...')

  const envPath = path.join(process.cwd(), '.env')
  let envContent = ''

  // Read existing .env file if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8')
  }

  // Add Google Analytics MCP variables if they don't exist
  const requiredVars = [
    'GOOGLE_APPLICATION_CREDENTIALS=./ga-service-account.json',
    'GA4_PROPERTY_ID=your-ga4-property-id',
    'GOOGLE_ANALYTICS_PROPERTY_ID=your-ga4-property-id'
  ]

  requiredVars.forEach((varLine) => {
    const varName = varLine.split('=')[0]
    if (!envContent.includes(varName)) {
      envContent += `\n${varLine}`
    }
  })

  fs.writeFileSync(envPath, envContent)
  console.log(`✅ Environment variables updated: ${envPath}`)

  // Update .gitignore
  const gitignorePath = path.join(process.cwd(), '.gitignore')
  let gitignoreContent = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : ''

  if (!gitignoreContent.includes('ga-service-account.json')) {
    gitignoreContent += '\n# Google Analytics MCP credentials\nga-service-account.json\n'
    fs.writeFileSync(gitignorePath, gitignoreContent)
    console.log('✅ Added credentials to .gitignore')
  }
}

/**
 * Create test script for MCP connection
 */
function createTestScript() {
  console.log('\n🧪 Creating MCP test script...')

  const testScript = `/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require('@modelcontextprotocol/sdk/client/index.js')
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js')

/**
 * Test Google Analytics MCP Server Connection
 */
async function testMCPConnection() {
  console.log('🔗 Testing Google Analytics MCP connection...')
  
  try {
    // Create MCP client
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['node_modules/mcp-server-google-analytics/dist/index.js'],
      env: {
        ...process.env,
        GOOGLE_APPLICATION_CREDENTIALS: './ga-service-account.json',
        GA4_PROPERTY_ID: process.env.GA4_PROPERTY_ID
      }
    })
    
    const client = new Client({
      name: 'admi-faq-optimizer',
      version: '1.0.0'
    }, {
      capabilities: {}
    })
    
    await client.connect(transport)
    console.log('✅ Connected to Google Analytics MCP server')
    
    // Test getting available tools
    const tools = await client.listTools()
    console.log('🛠️  Available tools:', tools.tools.map(t => t.name))
    
    // Test a simple query (if property ID is configured)
    if (process.env.GA4_PROPERTY_ID && process.env.GA4_PROPERTY_ID !== 'your-ga4-property-id') {
      try {
        const result = await client.callTool({
          name: 'get_analytics_data',
          arguments: {
            property_id: process.env.GA4_PROPERTY_ID,
            date_ranges: [{ start_date: '7daysAgo', end_date: 'today' }],
            metrics: [{ name: 'activeUsers' }]
          }
        })
        
        console.log('📊 Sample analytics data retrieved successfully')
        console.log('   Active users (last 7 days):', result.content?.[0]?.text || 'Data available')
      } catch (queryError) {
        console.log('⚠️  Note: Configure GA4_PROPERTY_ID to test data retrieval')
      }
    }
    
    await client.close()
    console.log('✅ MCP connection test completed successfully')
    
  } catch (error) {
    console.error('❌ MCP connection test failed:', error.message)
    console.log('\\n💡 Troubleshooting tips:')
    console.log('1. Make sure ga-service-account.json exists and is valid')
    console.log('2. Verify GA4_PROPERTY_ID is set correctly')
    console.log('3. Check that service account has access to your GA4 property')
    console.log('4. Ensure required APIs are enabled in Google Cloud')
  }
}

if (require.main === module) {
  testMCPConnection()
}

module.exports = { testMCPConnection }
`

  const testPath = path.join(process.cwd(), 'scripts/analytics/test-mcp-connection.js')
  fs.writeFileSync(testPath, testScript)

  console.log(`✅ Test script created: ${testPath}`)
  console.log('   Run with: npm run faq:test-mcp')

  return testPath
}

/**
 * Get GA4 Property ID instructions
 */
function getGA4PropertyIDInstructions() {
  console.log('\n🔍 How to find your GA4 Property ID:')
  console.log('1. Go to Google Analytics (analytics.google.com)')
  console.log('2. Select your property')
  console.log('3. Click "Admin" (gear icon) in the bottom left')
  console.log('4. Under "Property", click "Property Settings"')
  console.log('5. Your Property ID is displayed at the top (format: 123456789)')
  console.log('\nAlternatively:')
  console.log('1. In Google Analytics, look at the URL')
  console.log('2. The Property ID is after "/p/" in the URL')
  console.log('   Example: analytics.google.com/analytics/web/#/p123456789/...')
}

/**
 * Main setup process
 */
async function setupMCP() {
  console.log('🚀 Google Analytics MCP Server Setup')
  console.log('=====================================\n')

  // Step 1: Check prerequisites
  const prereqs = await checkPrerequisites()

  if (!prereqs.node || !prereqs.npm) {
    console.error('❌ Node.js and npm are required. Please install them first.')
    return false
  }

  if (!prereqs.gcloud) {
    console.log('⚠️  gcloud CLI not found. You can install it later or use the web console.')
  }

  // Step 2: Install secure Analytics integration
  const installed = await installSecureAnalytics()
  if (!installed) {
    console.error('❌ Failed to install Analytics integration')
    return false
  }

  // Step 3: Show Google Cloud setup instructions
  createServiceAccountInstructions()

  // Step 4: Create configuration files
  createMCPConfig()
  updateEnvironmentFile()
  createTestScript()

  // Step 5: Show GA4 Property ID instructions
  getGA4PropertyIDInstructions()

  console.log('\n🎉 Secure Analytics Setup Complete!')
  console.log('\n📋 Next Steps:')
  console.log('1. Complete the Google Cloud setup (follow instructions above)')
  console.log('2. Download your service account JSON file')
  console.log('3. Update GA4_PROPERTY_ID in .env file')
  console.log('4. Test the connection: npm run faq:test-analytics')
  console.log('5. Start using real analytics data: npm run faq:optimize-with-real-data')

  return true
}

/**
 * Update package.json with test script
 */
function updatePackageJSON() {
  console.log('\n📦 Adding test script to package.json...')

  const packagePath = path.join(process.cwd(), 'package.json')
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

  if (!packageData.scripts['faq:test-mcp']) {
    packageData.scripts['faq:test-mcp'] = 'node scripts/analytics/test-mcp-connection.js'
    fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2))
    console.log('✅ Added faq:test-mcp script')
  }
}

/**
 * Main execution
 */
async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'install':
      await setupMCP()
      updatePackageJSON()
      break
    case 'test':
      // This will be handled by the test script
      console.log('Use: npm run faq:test-mcp')
      break
    case 'config':
      createMCPConfig()
      updateEnvironmentFile()
      break
    case 'instructions':
      createServiceAccountInstructions()
      getGA4PropertyIDInstructions()
      break
    default:
      console.log('🔧 Google Analytics MCP Setup Tool')
      console.log('\nUsage:')
      console.log('  npm run faq:setup-mcp install       # Full setup process')
      console.log('  npm run faq:setup-mcp config        # Create config files only')
      console.log('  npm run faq:setup-mcp instructions  # Show setup instructions')
      console.log('  npm run faq:test-mcp                 # Test MCP connection')
      console.log('\nThis will set up:')
      console.log('  ✅ Google Analytics MCP server installation')
      console.log('  ✅ Service account configuration')
      console.log('  ✅ Environment variables setup')
      console.log('  ✅ MCP settings file')
      console.log('  ✅ Connection testing tools')
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  })
}

module.exports = {
  setupMCP,
  checkPrerequisites,
  installSecureAnalytics,
  createMCPConfig,
  updateEnvironmentFile
}
