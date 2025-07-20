import { MainLayout } from '@/layouts/v3/MainLayout'
import {
  CourseAbout,
  CourseApplicationProcess,
  CourseDetails,
  CourseHero,
  CourseMentors,
  CourseStudents
} from '@/components/course'
import { CMSCourseFAQs } from '@/components/course/CMSCourseFAQs'
import { CourseVideoSection } from '@/components/course/CourseVideoSection'
import {
  GRAPHIC_DESIGN_FAQS,
  ANIMATION_VFX_FAQS,
  FILM_TELEVISION_FAQS,
  AUDIO_PRODUCTION_FAQS,
  PHOTOGRAPHY_FAQS
} from '@/data/diploma-faqs'
import { PageSEO } from '@/components/shared/v3'
import { CourseSchema, BreadcrumbSchema, VideoSchema } from '@/components/shared/StructuredData'
import { DiplomaEnhancedSEO } from '@/components/course/DiplomaEnhancedSEO'
import { CertificateEnhancedSEO } from '@/components/course/CertificateEnhancedSEO'
import { EastAfricaLocalSEO } from '@/components/seo/EastAfricaLocalSEO'
// generateDiplomaKeywords utility available for future enhancements
import { GENERAL_DIPLOMA_FAQS } from '@/data/diploma-faqs'
import { YouTubeVideo, fetchADMIChannelVideos } from '@/utils/youtube-api'
import {
  GENERAL_CERTIFICATE_FAQS,
  GRAPHIC_DESIGN_CERTIFICATE_FAQS,
  DIGITAL_MARKETING_CERTIFICATE_FAQS,
  VIDEO_PRODUCTION_CERTIFICATE_FAQS,
  PHOTOGRAPHY_CERTIFICATE_FAQS,
  MUSIC_PRODUCTION_CERTIFICATE_FAQS
} from '@/data/certificate-faqs'
import { generateCourseSpecificMeta } from '@/utils/course-specific-seo'

// Helper function to get correct FAQs based on course slug
const getCorrectFAQsForCourse = (slug: string, isDiploma: boolean) => {
  // Diploma course FAQs
  if (isDiploma) {
    if (slug.includes('graphic-design')) return GRAPHIC_DESIGN_FAQS
    if (slug.includes('animation') || slug.includes('vfx')) return ANIMATION_VFX_FAQS
    if (slug.includes('film') || slug.includes('television')) return FILM_TELEVISION_FAQS
    if (slug.includes('audio') || slug.includes('sound')) return AUDIO_PRODUCTION_FAQS
    if (slug.includes('photography')) return PHOTOGRAPHY_FAQS
    return GENERAL_DIPLOMA_FAQS.slice(0, 8)
  }

  // Certificate course FAQs
  if (slug.includes('graphic-design')) return GRAPHIC_DESIGN_CERTIFICATE_FAQS
  if (slug.includes('digital-marketing')) return DIGITAL_MARKETING_CERTIFICATE_FAQS
  if (slug.includes('video-production')) return VIDEO_PRODUCTION_CERTIFICATE_FAQS
  if (slug.includes('photography')) return PHOTOGRAPHY_CERTIFICATE_FAQS
  if (slug.includes('music-production')) return MUSIC_PRODUCTION_CERTIFICATE_FAQS

  return GENERAL_CERTIFICATE_FAQS.slice(0, 6) // Return general certificate FAQs
}

export default function CourseDetailPage({
  course,
  courseAssets,
  slug,
  youtubeVideos
}: {
  course: any
  courseAssets: any[]
  slug: string
  youtubeVideos: YouTubeVideo[]
}) {
  // Extract rich text content for description
  const getPlainTextFromRichText = (richText: any) => {
    if (!richText || !richText.content) return ''

    return (
      richText.content
        .map((block: any) => block.content?.map((content: any) => content.value).join(' '))
        .join(' ')
        .substring(0, 160) + '...'
    )
  }

  // Create comprehensive course description for SEO with enrollment focus
  const baseDescription = course.description
    ? getPlainTextFromRichText(course.description)
    : course.aboutTheCourse
      ? getPlainTextFromRichText(course.aboutTheCourse)
      : `${course.name} - ${course.programType?.fields?.duration || ''} ${course.programType?.fields?.deliveryMode || ''} course at ADMI. ${course.awardLevel || ''} level program.`

  // Check if this is a diploma program (moved before usage)
  const isDiploma =
    course.awardLevel?.toLowerCase().includes('diploma') || course.programType?.fields?.duration?.includes('2 year')

  // Enhanced keywords with course-specific targeting
  const courseSpecificSEO = generateCourseSpecificMeta(slug)

  const courseDescription =
    courseSpecificSEO?.description ||
    (isDiploma
      ? `${baseDescription} 🎓 Apply now for 2025/2026 intake! 85% employment rate. Scholarship opportunities available. Flexible payment plans. Industry placement guaranteed. Limited seats - secure your spot today!`
      : `${baseDescription} Apply now for upcoming intakes. Flexible payment options available. Industry-recognized certification.`)

  // Extract learning outcomes as array
  const learningOutcomes =
    course.learningOutcomes?.content
      ?.map((block: any) => block.content?.map((content: any) => content.value).join(' '))
      .filter(Boolean) || []

  // Extract career options as array
  const careerOptions =
    course.careerOptions?.content
      ?.map((block: any) => block.content?.map((content: any) => content.value).join(' '))
      .filter(Boolean) || []

  // Program type detection available for future enhancements

  // Create SEO keywords with African market focus and high-intent enrollment terms
  const enrollmentKeywords = [
    'apply now',
    'admission requirements',
    'scholarship opportunities',
    'payment plans',
    '2025 intake',
    '2026 intake',
    'career change program',
    'register now',
    'secure your spot',
    'limited seats available',
    'early bird discount',
    'industry placement',
    'job placement guarantee',
    'flexible payment options',
    'financial aid available'
  ]

  const baseKeywords = [
    course.name,
    course.programType?.fields?.name,
    course.awardLevel,
    'ADMI',
    'Africa Digital Media Institute',
    'Africa',
    'African education',
    'Kenya',
    'Nairobi',
    'East Africa',
    'West Africa',
    'Southern Africa',
    'digital media',
    'creative education',
    'online learning Africa',
    'distance learning',
    'African students',
    'pan-African education',
    ...enrollmentKeywords,
    ...(isDiploma
      ? [
          'diploma courses Africa',
          '2 year diploma',
          'professional diploma',
          'industry-recognized diploma',
          '85% employment rate',
          'hands-on training'
        ]
      : []),
    ...learningOutcomes.slice(0, 3),
    ...careerOptions.slice(0, 3)
  ]

  const keywords = courseSpecificSEO?.keywords || baseKeywords.filter(Boolean).join(', ')

  return (
    <MainLayout>
      <PageSEO
        title={course.name}
        description={courseDescription}
        keywords={keywords}
        image={course.coverImage?.fields?.file?.url ? `https:${course.coverImage.fields.file.url}` : undefined}
        url={`/courses/${slug}`}
      />

      {/* Enhanced SEO for Different Program Types - Only ONE Course Schema per page */}
      {isDiploma ? (
        <DiplomaEnhancedSEO
          course={course}
          slug={slug}
          faqs={course.faqs?.length > 0 ? course.faqs : GENERAL_DIPLOMA_FAQS.slice(0, 8)}
          employmentRate={85}
          averageSalary="KES 45,000 - 120,000"
          industryPartners={['Safaricom', 'Nation Media Group', 'Standard Group', 'Royal Media Services']}
          accreditation="Pearson Assured & Woolf University"
        />
      ) : course.awardLevel?.toLowerCase().includes('certificate') ? (
        /* Enhanced Certificate Structured Data */
        <CertificateEnhancedSEO
          course={course}
          slug={slug}
          faqs={course.faqs?.length > 0 ? course.faqs : getCorrectFAQsForCourse(slug, false)}
          employmentRate={75}
          averageSalary="KES 25,000 - 80,000"
          industryPartners={['Safaricom', 'Nation Media Group', 'Standard Group', 'Royal Media Services']}
          accreditation="Pearson Assured"
        />
      ) : (
        /* Basic Course Structured Data */
        <CourseSchema
          name={course.name}
          description={courseDescription}
          provider={{
            name: 'Africa Digital Media Institute',
            url: 'https://admi.africa'
          }}
          url={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses/${slug}`}
          image={course.coverImage?.fields?.file?.url ? `https:${course.coverImage.fields.file.url}` : undefined}
          awardLevel={course.awardLevel}
          tuitionFees={course.tuitionFees}
          duration={course.programType?.fields?.duration}
          deliveryMode={course.programType?.fields?.deliveryMode}
          educationalLevel={course.educationalLevel}
          learningOutcomes={learningOutcomes}
          careerOptions={careerOptions}
          courseVideo={course.courseVideo}
          courseSlug={slug}
        />
      )}

      {/* Breadcrumb Structured Data */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa' },
          { name: 'Courses', url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses` },
          {
            name: course.name,
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses/${slug}`
          }
        ]}
      />

      {/* East Africa Local Business Schema - No course catalog or FAQ schema on individual course pages */}
      <EastAfricaLocalSEO targetCity="Nairobi" excludeCourseCatalog={true} excludeFAQSchema={true} />

      {/* Note: FAQ Schema is handled within the enhanced SEO components above to avoid duplication */}

      {/* Course Video Schema (if video exists) - Points to dedicated watch page */}
      {course.courseVideo && (
        <VideoSchema
          name={`${course.name} - Course Preview`}
          description={`Watch this comprehensive preview of ${course.name} at Africa Digital Media Institute. Learn about the curriculum, facilities, career opportunities, and what makes this ${course.awardLevel || 'course'} program special.`}
          thumbnailUrl={
            course.coverImage?.fields?.file?.url
              ? `https:${course.coverImage.fields.file.url}`
              : 'https://admi.africa/logo.png'
          }
          contentUrl={`https:${course.courseVideo.fields.file.url}`}
          embedUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/watch/${slug}`}
          uploadDate={course.sys?.updatedAt || new Date().toISOString()}
          duration="PT2M30S"
          publisher={{
            name: 'Africa Digital Media Institute',
            logo: 'https://admi.africa/logo.png'
          }}
        />
      )}
      <CourseHero
        name={course.name}
        coverImage={course.coverImage}
        programType={course.programType}
        awardLevel={course.awardLevel}
        creditHours={course.creditHours}
      />
      <CourseAbout
        description={course.aboutTheCourse}
        intakes={course.intakes}
        courseVideo={course.courseVideo}
        educationalLevel={course.educationalLevel}
        courseSlug={slug}
      />
      <CourseDetails
        benefits={course.courseBenefits || []}
        assets={courseAssets || []}
        programType={course.programType}
        creditHours={course.creditHours}
        tuitionFees={course.tuitionFees}
        courseDescription={course.description}
        careerOptions={course.careerOptions}
        learningOutcomes={course.learningOutcomes}
      />
      <CourseMentors mentors={course.courseLeadersMentors} assets={courseAssets || []} />
      <CourseStudents
        portfolios={course.studentPortfolio || []}
        assets={courseAssets}
        testimonials={course.studentReviews || []}
        totalHistoricalEnrollment={course.totalHistoricalEnrollment}
      />
      <CourseApplicationProcess processes={course.applicationProcesses || []} />

      {/* Enhanced Video Section with YouTube Integration */}
      <CourseVideoSection course={course} slug={slug} youtubeVideos={youtubeVideos} />

      <CMSCourseFAQs
        courseSlug={slug}
        fallbackFAQs={getCorrectFAQsForCourse(slug, isDiploma)}
        showGeneralFallback={isDiploma}
      />
    </MainLayout>
  )
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    // Fetch course details
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/course-details?slug=${slug}`)
    if (!response.ok) {
      return { notFound: true } // Redirect to 404 if course is not found
    }

    const data = await response.json()

    // Fetch YouTube videos for enhanced video section
    let youtubeVideos: YouTubeVideo[] = []
    try {
      youtubeVideos = await fetchADMIChannelVideos(30) // Fetch up to 30 videos
    } catch (videoError) {
      console.error('Error fetching YouTube videos for course page:', videoError)
      // Continue without videos if YouTube API fails
    }

    return {
      props: {
        course: data.fields,
        courseAssets: data.assets || [],
        slug,
        youtubeVideos
      }
    }
  } catch (error) {
    console.error('Error fetching course:', error)
    return { notFound: true }
  }
}
