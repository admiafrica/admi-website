import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check environment variables
    if (!process.env.ADMI_CONTENTFUL_SPACE_ID || !process.env.ADMI_CONTENTFUL_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          error: 'Missing Contentful environment variables',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    // Fetch all courses from Contentful
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course&include=2`
    )

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Contentful API error: ${response.status} ${response.statusText}`,
          timestamp: new Date().toISOString()
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Extract course information
    const courses =
      data.items?.map((course: any) => ({
        id: course.sys.id,
        name: course.fields?.name || 'Unknown',
        slug: course.fields?.slug || 'no-slug',
        awardLevel: course.fields?.awardLevel || 'Unknown',
        programType: course.fields?.programType?.fields?.name || 'Unknown',
        duration: course.fields?.programType?.fields?.duration || 'Unknown',
        hasVideo: !!course.fields?.courseVideo,
        hasCoverImage: !!course.fields?.coverImage,
        published: course.sys.publishedAt || 'Unknown',
        updated: course.sys.updatedAt || 'Unknown'
      })) || []

    // Look for video game related courses
    const videoGameCourses = courses.filter(
      (course: any) =>
        course.name?.toLowerCase().includes('game') ||
        course.slug?.toLowerCase().includes('game') ||
        course.name?.toLowerCase().includes('video game')
    )

    // Check for specific problematic slugs
    const problematicSlugs = [
      'video-game-development-certificate',
      'video-game-development-certificate-rubika',
      'game-development',
      'video-game-development'
    ]

    const foundProblematicCourses = courses.filter((course: any) => problematicSlugs.includes(course.slug))

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      totalCourses: courses.length,
      courses: courses.slice(0, 20), // Show first 20 courses
      videoGameCourses,
      foundProblematicCourses,
      allSlugs: courses.map((c: any) => c.slug).sort(),
      coursesWithVideos: courses.filter((c: any) => c.hasVideo).length,
      searchedSlugs: problematicSlugs
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
