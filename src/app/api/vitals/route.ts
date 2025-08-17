import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const vitalsData = {
    ...body,
    url: request.headers.get('referer') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown'
  }

  // Always log to console for monitoring
  console.log('📊 Web Vitals:', JSON.stringify(vitalsData, null, 2))

  // Track performance issues
  if (vitalsData.name === 'LCP' && vitalsData.value > 2500) {
    console.warn('⚠️ Poor LCP detected:', vitalsData.value, 'ms on', vitalsData.url)
  }
  if (vitalsData.name === 'CLS' && vitalsData.value > 0.1) {
    console.warn('⚠️ Poor CLS detected:', vitalsData.value, 'on', vitalsData.url)
  }
  if (vitalsData.name === 'FID' && vitalsData.value > 100) {
    console.warn('⚠️ Poor FID detected:', vitalsData.value, 'ms on', vitalsData.url)
  }

  try {
    // Data is already sent to GTM/GA4 via client-side gtag in layout.tsx
    // This server-side endpoint is for backup logging and custom analytics

    // Send to custom analytics endpoint if configured
    if (process.env.ANALYTICS_ENDPOINT) {
      await fetch(process.env.ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ANALYTICS_API_KEY || ''}`
        },
        body: JSON.stringify(vitalsData)
      })
    }

    return NextResponse.json({
      success: true,
      metric: vitalsData.name,
      value: vitalsData.value,
      rating: vitalsData.rating
    })
  } catch (error) {
    console.error('❌ Failed to send web vitals:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Analytics processing failed',
        metric: vitalsData.name
      },
      { status: 500 }
    )
  }
}
