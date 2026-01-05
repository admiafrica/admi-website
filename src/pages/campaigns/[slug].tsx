import { ensureProtocol } from '@/utils'
import { GetServerSideProps } from 'next'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { CourseHero, CourseAbout, CourseDetails, CourseApplicationProcess, CourseFAQs } from '@/components/course'
import { PageSEO } from '@/components/shared/v3'

interface CourseDetailPageProps {
  course: any
  courseAssets: any
}

export default function CourseDetailPage({ course, courseAssets }: CourseDetailPageProps) {
  if (!course) return null

  return (
    <MainLayout minimizeFooter minimizeHeader>
      <PageSEO
        title={course.name}
        description={`${course.programType.fields.duration}, ${course.programType.fields.deliveryMode}`}
        image={ensureProtocol(course.coverImage?.fields.file.url)}
      />
      <CourseHero
        name={course.name}
        coverImage={course.coverImage}
        programType={course.programType}
        awardLevel={course.awardLevel}
        creditHours={course.creditHours}
        isCampaign
      />
      <CourseAbout
        description={course.aboutTheCourse}
        isCampaign
        intakes={course.intakes}
        courseVideo={course.courseVideo}
        educationalLevel={course.educationalLevel}
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
      <CourseApplicationProcess processes={course.applicationProcesses || []} />
      <CourseFAQs faqs={course.faqs || []} />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params ?? {}

  if (!slug) {
    return { notFound: true }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/course-details?slug=${slug}`)

    if (!res.ok) {
      throw new Error('Failed to fetch course details')
    }

    const data = await res.json()

    return {
      props: {
        course: data.fields || null,
        courseAssets: data.assets || null
      }
    }
  } catch (error) {
    console.error('Error fetching course:', error)
    return { notFound: true }
  }
}
