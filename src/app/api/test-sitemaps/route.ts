import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'

    // Test environment variables
    const envCheck = {
      ADMI_CONTENTFUL_SPACE_ID: !!process.env.ADMI_CONTENTFUL_SPACE_ID,
      ADMI_CONTENTFUL_ENVIRONMENT: !!process.env.ADMI_CONTENTFUL_ENVIRONMENT,
      ADMI_CONTENTFUL_ACCESS_TOKEN: !!process.env.ADMI_CONTENTFUL_ACCESS_TOKEN,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
    }

    // Test Contentful connection
    let contentfulTest = { success: false, error: '', itemCount: 0 }
    try {
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=article&limit=5`
      )

      if (response.ok) {
        const data = await response.json()
        contentfulTest = {
          success: true,
          error: '',
          itemCount: data.items?.length || 0
        }
      } else {
        contentfulTest = {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          itemCount: 0
        }
      }
    } catch (error) {
      contentfulTest = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        itemCount: 0
      }
    }

    // Test sitemap endpoints
    const sitemapTests = []
    const sitemapUrls = [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/news-sitemap.xml`,
      `${baseUrl}/resources-sitemap.xml`,
      `${baseUrl}/video-sitemap.xml`,
      `${baseUrl}/sitemap-index.xml`
    ]

    for (const url of sitemapUrls) {
      try {
        const response = await fetch(url)
        sitemapTests.push({
          url,
          status: response.status,
          contentType: response.headers.get('content-type'),
          success: response.ok
        })
      } catch (error) {
        sitemapTests.push({
          url,
          status: 'ERROR',
          contentType: null,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      baseUrl,
      environment: envCheck,
      contentful: contentfulTest,
      sitemaps: sitemapTests
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
