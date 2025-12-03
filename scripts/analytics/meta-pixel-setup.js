/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Meta Pixel Setup for ADMI Pre-Qualification Form
 * Tracks form completion, lead quality, and enrollment conversion
 *
 * Events to track:
 * - ViewContent: Page visits to /enquiry
 * - InitiateCheckout: Form started (before pre-qual questions)
 * - AddPaymentInfo: Form filled (pre-qual questions answered)
 * - Lead: Form submitted (qualified lead)
 * - Purchase: Student enrollment confirmation
 */

class MetaPixelSetup {
  constructor() {
    this.accessToken = process.env.META_ACCESS_TOKEN
    this.businessAccountId = process.env.META_BUSINESS_ACCOUNT_ID
    this.baseUrl = 'https://graph.instagram.com/v18.0'
  }

  /**
   * Get or create Meta pixel
   */
  async getOrCreatePixel() {
    console.log('🔍 Checking for existing Meta pixels...')

    try {
      // First, get business account
      if (!this.businessAccountId) {
        console.log('⚠️  META_BUSINESS_ACCOUNT_ID not set')
        console.log('Getting available business accounts...')

        const accountsResponse = await fetch(`${this.baseUrl}/me/businesses?access_token=${this.accessToken}`)

        const accountsData = await accountsResponse.json()

        if (accountsData.error) {
          throw new Error(accountsData.error.message)
        }

        if (!accountsData.data || accountsData.data.length === 0) {
          console.log('❌ No business accounts found')
          console.log('Please set up a Business Account at https://business.facebook.com')
          return null
        }

        this.businessAccountId = accountsData.data[0].id
        console.log(`Using business account: ${accountsData.data[0].id}`)
      }

      // Get existing pixels
      const pixelsResponse = await fetch(
        `${this.baseUrl}/${this.businessAccountId}/pixels?fields=id,name,creation_time&access_token=${this.accessToken}`
      )

      const pixelsData = await pixelsResponse.json()

      if (pixelsData.error) {
        throw new Error(pixelsData.error.message)
      }

      if (pixelsData.data && pixelsData.data.length > 0) {
        console.log(`✅ Found ${pixelsData.data.length} existing pixel(s):`)

        pixelsData.data.forEach((pixel) => {
          console.log(`   • ${pixel.name} (${pixel.id})`)
        })

        // Return first pixel (or ask user which to use)
        return pixelsData.data[0]
      }

      // Create new pixel if none exist
      console.log('No pixels found. Creating new Meta pixel for ADMI...')

      const createResponse = await fetch(`${this.baseUrl}/${this.businessAccountId}/pixels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'ADMI Pre-Qualification Form Tracking',
          access_token: this.accessToken
        })
      })

      const createData = await createResponse.json()

      if (createData.error) {
        throw new Error(createData.error.message)
      }

      console.log(`✅ Created new pixel: ${createData.id}`)
      return createData
    } catch (error) {
      console.error('❌ Failed to get/create pixel:', error.message)
      return null
    }
  }

  /**
   * Get or create custom events for pre-qualification tracking
   */
  async setupCustomEvents(pixelId) {
    console.log(`\n📊 Setting up custom events for pixel ${pixelId}...`)

    const events = [
      {
        name: 'PreQualificationStart',
        description: 'User started pre-qualification form'
      },
      {
        name: 'PreQualificationComplete',
        description: 'User completed pre-qualification form'
      },
      {
        name: 'QualifiedLead',
        description: 'User passed pre-qualification (scored 4+)'
      },
      {
        name: 'EnrollmentInitiated',
        description: 'User initiated enrollment process'
      }
    ]

    console.log('Standard Meta events will track:')
    console.log('  • ViewContent: /enquiry page views')
    console.log('  • InitiateCheckout: Form started')
    console.log('  • AddPaymentInfo: Pre-qualification answered')
    console.log('  • Lead: Form submitted (qualified)')
    console.log('  • Purchase: Enrollment confirmation')

    return events
  }

  /**
   * Generate pixel implementation code
   */
  generatePixelCode(pixelId) {
    console.log(`\n💻 Pixel implementation code for ${pixelId}:`)

    const baseCode = `<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${pixelId}');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->

<!-- Custom Event Tracking for Pre-Qualification Form -->
<script>
  // Track form start
  function trackFormStart() {
    fbq('track', 'InitiateCheckout', {
      value: 0,
      currency: 'USD'
    });
  }

  // Track form completion with pre-qual score
  function trackFormCompletion(qualScore) {
    const eventData = {
      value: 0,
      currency: 'USD',
      predicted_ltv: qualScore * 100 // Score 0-10 → value 0-1000
    };

    // Track as Lead if qualified (score >= 4)
    if (qualScore >= 4) {
      fbq('track', 'Lead', eventData);
      console.log('✅ Qualified lead tracked (score: ' + qualScore + ')');
    } else {
      fbq('track', 'AddPaymentInfo', eventData);
      console.log('⚠️  Unqualified lead tracked (score: ' + qualScore + ')');
    }
  }

  // Track enrollment
  function trackEnrollment(courseId, price) {
    fbq('track', 'Purchase', {
      value: price,
      currency: 'USD',
      content_name: courseId,
      content_type: 'course'
    });
  }
</script>`

    return baseCode
  }

  /**
   * Generate Next.js component integration code
   */
  generateNextJsIntegration() {
    return `// src/components/forms/MetaPixelTracker.tsx
'use client'

import { useEffect } from 'react'

export function MetaPixelTracker() {
  useEffect(() => {
    // Initialize Meta pixel (loaded from _document or head tag)
    if (typeof window !== 'undefined' && window.fbq) {
      // Track page view
      window.fbq('track', 'PageView')
    }
  }, [])

  return null
}

// Hook for tracking form events
export function useMetaPixelTracking() {
  return {
    trackFormStart: () => {
      if (window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          value: 0,
          currency: 'USD'
        })
      }
    },

    trackQualificationScore: (score: number) => {
      if (window.fbq) {
        const eventData = {
          value: 0,
          currency: 'USD',
          predicted_ltv: score * 100
        }

        if (score >= 4) {
          window.fbq('track', 'Lead', eventData)
        } else {
          window.fbq('track', 'AddPaymentInfo', eventData)
        }
      }
    },

    trackEnrollment: (courseId: string, price: number) => {
      if (window.fbq) {
        window.fbq('track', 'Purchase', {
          value: price,
          currency: 'USD',
          content_name: courseId,
          content_type: 'course'
        })
      }
    }
  }
}

// Usage in EnquiryForm:
// import { useMetaPixelTracking } from '@/components/forms/MetaPixelTracker'
//
// export function EnquiryForm() {
//   const pixel = useMetaPixelTracking()
//
//   useEffect(() => {
//     pixel.trackFormStart()
//   }, [])
//
//   const handleSubmit = async (formData) => {
//     const qualScore = calculateQualificationScore(formData)
//     pixel.trackQualificationScore(qualScore)
//     
//     if (qualScore >= 4) {
//       // Proceed with enrollment
//     }
//   }
// }`
  }

  /**
   * Save configuration
   */
  async saveConfiguration(pixelId) {
    console.log('\n💾 Saving Meta pixel configuration...')

    try {
      const envPath = path.join(process.cwd(), '.env')
      let envContent = ''

      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8')
      }

      const lines = envContent.split('\n')
      let foundPixelId = false

      const updatedLines = lines.map((line) => {
        if (line.startsWith('META_PIXEL_ID=')) {
          foundPixelId = true
          return `META_PIXEL_ID=${pixelId}`
        }
        return line
      })

      if (!foundPixelId) {
        updatedLines.push(`META_PIXEL_ID=${pixelId}`)
      }

      if (this.businessAccountId) {
        let foundBusinessId = false
        const finalLines = updatedLines.map((line) => {
          if (line.startsWith('META_BUSINESS_ACCOUNT_ID=')) {
            foundBusinessId = true
            return `META_BUSINESS_ACCOUNT_ID=${this.businessAccountId}`
          }
          return line
        })

        if (!foundBusinessId) {
          finalLines.push(`META_BUSINESS_ACCOUNT_ID=${this.businessAccountId}`)
        }

        fs.writeFileSync(envPath, finalLines.join('\n'), 'utf8')
      } else {
        fs.writeFileSync(envPath, updatedLines.join('\n'), 'utf8')
      }

      console.log('✅ Configuration saved to .env')
    } catch (error) {
      console.error('❌ Failed to save configuration:', error.message)
    }
  }

  /**
   * Main setup workflow
   */
  async runSetup() {
    console.log('🚀 Meta Pixel Setup for ADMI Pre-Qualification Form')
    console.log('='.repeat(60))

    if (!this.accessToken) {
      console.log('❌ Missing META_ACCESS_TOKEN in .env')
      console.log('Run: npm run meta:setup')
      return
    }

    // Get or create pixel
    const pixel = await this.getOrCreatePixel()

    if (!pixel) {
      console.log('❌ Failed to get/create pixel')
      return
    }

    // Setup custom events
    await this.setupCustomEvents(pixel.id)

    // Generate implementation code
    const pixelCode = this.generatePixelCode(pixel.id)
    const nextJsCode = this.generateNextJsIntegration()

    // Save code snippets
    const codePath = path.join(process.cwd(), 'docs', 'META_PIXEL_IMPLEMENTATION.md')
    const codeDir = path.dirname(codePath)

    if (!fs.existsSync(codeDir)) {
      fs.mkdirSync(codeDir, { recursive: true })
    }

    const documentation = `# Meta Pixel Implementation for ADMI

## Pixel ID
\`\`\`
${pixel.id}
\`\`\`

## Global Pixel Code
Add this to your Next.js app layout or _document:

\`\`\`html
${pixelCode}
\`\`\`

## React Component Integration

\`\`\`typescript
${nextJsCode}
\`\`\`

## Event Tracking Summary

| Event | Purpose | Score Condition |
|-------|---------|-----------------|
| ViewContent | Page view to /enquiry | Always |
| InitiateCheckout | Form started | Always |
| AddPaymentInfo | Pre-qual questions answered | Score < 4 |
| Lead | Pre-qualified (hot) | Score >= 4 |
| Purchase | Student enrolled | After confirmation |

## Verification

Test your pixel setup:
1. Open https://admi.africa/enquiry
2. Go to Meta Ads Manager → Conversions → Events Manager
3. Verify you see test events coming in
4. Submit the form and confirm conversion is tracked

## Next Steps

1. Integrate pixel code into app layout
2. Add MetaPixelTracker component to your pages
3. Update EnquiryForm component with tracking calls
4. Test form submissions in Events Manager
5. Run: npm run meta:monitor
`

    fs.writeFileSync(codePath, documentation)
    console.log(`\n📄 Implementation guide saved to ${codePath}`)

    // Save pixel configuration
    await this.saveConfiguration(pixel.id)

    console.log('\n' + '='.repeat(60))
    console.log('✅ Meta Pixel Setup Complete!')
    console.log('\nNext steps:')
    console.log('1. Add pixel code to your app')
    console.log('2. Integrate React hooks for tracking')
    console.log('3. Test form submissions')
    console.log('4. Monitor conversions: npm run meta:monitor')
  }
}

// Run setup
if (require.main === module) {
  const setup = new MetaPixelSetup()
  setup
    .runSetup()
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error.message)
      process.exit(1)
    })
}

module.exports = MetaPixelSetup
