import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch courses with videos from Contentful
    const coursesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course&include=2`
    )
    const coursesData = await coursesResponse.json()

    if (!coursesData.items) {
      return NextResponse.json({ error: 'No courses found', data: coursesData })
    }

    // Check each course for video structure
    const courseAnalysis = coursesData.items.map((course: any) => ({
      name: course.fields?.name || 'Unknown',
      slug: course.fields?.slug || 'no-slug',
      hasVideo: !!course.fields?.courseVideo,
      hasVideoFile: !!course.fields?.courseVideo?.fields?.file,
      hasVideoUrl: !!course.fields?.courseVideo?.fields?.file?.url,
      videoStructure: course.fields?.courseVideo
        ? {
            hasFields: !!course.fields.courseVideo.fields,
            hasFile: !!course.fields.courseVideo.fields?.file,
            hasUrl: !!course.fields.courseVideo.fields?.file?.url,
            url: course.fields.courseVideo.fields?.file?.url || null
          }
        : null
    }))

    const coursesWithVideos = coursesData.items.filter(
      (course: any) => course.fields?.slug && course.fields?.courseVideo?.fields?.file?.url
    )

    return NextResponse.json({
      totalCourses: coursesData.items.length,
      coursesWithVideos: coursesWithVideos.length,
      analysis: courseAnalysis,
      validVideoCourses: coursesWithVideos.map((course: any) => ({
        name: course.fields.name,
        slug: course.fields.slug,
        videoUrl: course.fields.courseVideo.fields.file.url
      }))
    })
  } catch (error) {
    console.error('Error testing videos:', error)
    return NextResponse.json({ error: 'Failed to test videos', details: error })
  }
}
