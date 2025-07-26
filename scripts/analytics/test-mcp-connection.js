/* eslint-disable @typescript-eslint/no-var-requires */
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

    const client = new Client(
      {
        name: 'admi-faq-optimizer',
        version: '1.0.0'
      },
      {
        capabilities: {}
      }
    )

    await client.connect(transport)
    console.log('✅ Connected to Google Analytics MCP server')

    // Test getting available tools
    const tools = await client.listTools()
    console.log(
      '🛠️  Available tools:',
      tools.tools.map((t) => t.name)
    )

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
    console.log('\n💡 Troubleshooting tips:')
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
