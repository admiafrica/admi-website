import { GetStaticPaths, GetStaticProps } from 'next'
import { ensureProtocol } from '@/utils'
import { useRouter } from 'next/router'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { VideoSchema, BreadcrumbSchema } from '@/components/shared/StructuredData'
import { VideoPlayer } from '@/components/shared/v3'
import { IconArrowLeft, IconPlayerPlay } from '@tabler/icons-react'
import Link from 'next/link'

interface VideoWatchPageProps {
  course: any
  slug: string
}

export default function VideoWatchPage({ course, slug }: VideoWatchPageProps) {
  const router = useRouter()
  const isEmbedMode = router.query.embed === 'true'
  // Check if we have a valid video (either direct or resolved from includes)
  const hasValidVideo = course?.courseVideo?.fields?.file?.url || course?.resolvedVideo?.fields?.file?.url

  if (!hasValidVideo) {
    return (
      <MainLayout>
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
          <p className="text-gray-700">Video not found</p>
        </div>
      </MainLayout>
    )
  }

  const videoTitle = `${course.name} - Course Preview`
  const videoDescription = `Watch this comprehensive preview of ${course.name} at Africa Digital Media Institute. Learn about the curriculum, facilities, career opportunities, and what makes this ${course.awardLevel || 'course'} program special. Discover how ADMI's hands-on approach and industry partnerships prepare students for successful careers in ${course.name.toLowerCase()}.`

  const breadcrumbItems = [
    { name: 'Home', url: 'https://admi.africa' },
    { name: 'Courses', url: 'https://admi.africa/courses' },
    { name: course.name, url: `https://admi.africa/courses/${slug}` },
    { name: 'Video Preview', url: `https://admi.africa/watch/${slug}` }
  ]

  // If in embed mode, render minimal player-only view
  if (isEmbedMode) {
    return (
      <div style={{ width: '100%', height: '100vh', backgroundColor: '#000' }}>
        <VideoPlayer
          videoUrl={course.resolvedVideo?.fields?.file?.url || course.courseVideo?.fields?.file?.url}
          showControls={true}
        />
      </div>
    )
  }

  return (
    <MainLayout>
      <PageSEO
        title={videoTitle}
        description={videoDescription}
        image={course.coverImage?.fields?.file?.url ? ensureProtocol(course.coverImage.fields.file.url) : undefined}
        canonical={`https://admi.africa/watch/${slug}`}
      />

      {/* Video Schema for dedicated watch page */}
      <VideoSchema
        name={videoTitle}
        description={videoDescription}
        thumbnailUrl={
          course.resolvedCoverImage?.fields?.file?.url || course.coverImage?.fields?.file?.url
            ? ensureProtocol(course.resolvedCoverImage?.fields?.file?.url || course.coverImage?.fields?.file?.url)
            : 'https://admi.africa/logo.png'
        }
        // Swap: embedUrl (watch page) becomes primary, direct video file becomes secondary
        contentUrl={ensureProtocol(course.resolvedVideo?.fields?.file?.url || course.courseVideo?.fields?.file?.url)}
        embedUrl={`https://admi.africa/watch/${slug}`}
        uploadDate={course.sys?.updatedAt || `${new Date().getFullYear()}-01-01T00:00:00.000Z`}
        duration="PT2M30S"
        publisher={{
          name: 'Africa Digital Media Institute',
          logo: 'https://admi.africa/logo.png'
        }}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        {/* Back to Course Button */}
        <div className="mb-6 flex flex-wrap">
          <Link
            href={`/courses/${slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-transparent px-4 py-2 font-medium text-gray-900 transition"
          >
            <IconArrowLeft size={16} />
            Back to Course
          </Link>
        </div>

        {/* Video Player Section */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div>
            <div className="relative aspect-video w-full">
              <VideoPlayer
                videoUrl={course.resolvedVideo?.fields?.file?.url || course.courseVideo?.fields?.file?.url}
                showControls={true}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-between px-4 pb-1 pt-4">
            <h2 className="text-3xl font-semibold text-gray-900">{videoTitle}</h2>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
              {course.awardLevel || 'Course'}
            </span>
          </div>

          <p className="mb-4 px-4 text-sm text-gray-500">{videoDescription}</p>

          <div className="flex flex-wrap px-4 pb-4">
            <Link
              href={`/courses/${slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition"
            >
              <IconPlayerPlay size={16} />
              Learn More About This Course
            </Link>
          </div>
        </div>

        {/* Course Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">About {course.name}</h3>

          <div className="mb-4 flex flex-wrap gap-2">
            {course.programType?.fields?.duration && (
              <span className="inline-flex items-center rounded-full border border-gray-400 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-900">
                Duration: {course.programType.fields.duration}
              </span>
            )}
            {course.programType?.fields?.deliveryMode && (
              <span className="inline-flex items-center rounded-full border border-gray-400 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-900">
                Mode: {course.programType.fields.deliveryMode}
              </span>
            )}
            {course.creditHours && (
              <span className="inline-flex items-center rounded-full border border-gray-400 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-900">
                Credits: {course.creditHours}
              </span>
            )}
          </div>

          <p className="mb-4 text-gray-700">
            {course.aboutTheCourse?.content?.[0]?.content?.[0]?.value ||
              `Discover the exciting world of ${course.name} with ADMI's comprehensive program designed to prepare you for a successful career in the creative media industry.`}
          </p>

          <Link
            href={`/courses/${slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition"
          >
            View Full Course Details
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const coursesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course&include=2`
    )
    const coursesData = await coursesResponse.json()

    // Helper function to resolve asset references
    const resolveAsset = (assetRef: any) => {
      if (!assetRef?.sys?.id || !coursesData.includes?.Asset) return null
      return coursesData.includes.Asset.find((asset: any) => asset.sys.id === assetRef.sys.id)
    }

    // Only generate paths for courses that have valid video files
    const paths =
      coursesData.items
        ?.filter((course: any) => {
          if (!course.fields?.slug || !course.fields?.courseVideo) return false
          const videoAsset = resolveAsset(course.fields.courseVideo)
          return videoAsset?.fields?.file?.url
        })
        .map((course: any) => ({
          params: { slug: course.fields.slug }
        })) || []

    return {
      paths,
      fallback: 'blocking'
    }
  } catch (error) {
    console.error('Error generating video watch paths:', error)
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  try {
    const coursesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course&fields.slug=${slug}&include=2`
    )
    const coursesData = await coursesResponse.json()

    if (!coursesData.items?.length) {
      return { notFound: true }
    }

    const course = coursesData.items[0]

    // Helper function to resolve asset references
    const resolveAsset = (assetRef: any) => {
      if (!assetRef?.sys?.id || !coursesData.includes?.Asset) return null
      return coursesData.includes.Asset.find((asset: any) => asset.sys.id === assetRef.sys.id)
    }

    // Resolve video and cover image assets
    const videoAsset = resolveAsset(course.fields?.courseVideo)
    const coverImageAsset = resolveAsset(course.fields?.coverImage)

    // Only show video watch page if course has a valid video file
    if (!videoAsset?.fields?.file?.url) {
      return { notFound: true }
    }

    return {
      props: {
        course: {
          ...course.fields,
          resolvedVideo: videoAsset,
          resolvedCoverImage: coverImageAsset
        },
        slug
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching course for video watch page:', error)
    return { notFound: true }
  }
}
