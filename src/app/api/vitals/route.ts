import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', body)
  }

  // Send to your analytics service
  // This could be Google Analytics, custom endpoint, etc.
  try {
    // Example: Send to a custom endpoint
    await fetch(process.env.ANALYTICS_ENDPOINT || 'https://your-analytics-endpoint.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...body,
        url: request.headers.get('referer'),
        userAgent: request.headers.get('user-agent')
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send web vitals:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
