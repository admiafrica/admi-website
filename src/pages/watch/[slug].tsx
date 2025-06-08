import { GetStaticPaths, GetStaticProps } from 'next'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { VideoSchema, BreadcrumbSchema } from '@/components/shared/StructuredData'
import { VideoPlayer } from '@/components/shared/v3'
import { Button, Container, Title, Text, Card, Group, Badge } from '@mantine/core'
import { IconArrowLeft, IconPlayerPlay } from '@tabler/icons-react'
import Link from 'next/link'

interface VideoWatchPageProps {
  course: any
  slug: string
}

export default function VideoWatchPage({ course, slug }: VideoWatchPageProps) {
  if (!course?.courseVideo) {
    return (
      <MainLayout>
        <Container size="lg" py="xl">
          <Text>Video not found</Text>
        </Container>
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

  return (
    <MainLayout>
      <PageSEO
        title={videoTitle}
        description={videoDescription}
        image={course.coverImage?.fields?.file?.url ? `https:${course.coverImage.fields.file.url}` : undefined}
        canonical={`https://admi.africa/watch/${slug}`}
      />

      {/* Video Schema for dedicated watch page */}
      <VideoSchema
        name={videoTitle}
        description={videoDescription}
        thumbnailUrl={
          course.coverImage?.fields?.file?.url
            ? `https:${course.coverImage.fields.file.url}`
            : 'https://admi.africa/logo.png'
        }
        contentUrl={`https:${course.courseVideo.fields.file.url}`}
        embedUrl={`https://admi.africa/watch/${slug}`}
        uploadDate={course.sys?.updatedAt || new Date().toISOString()}
        duration="PT2M30S"
        publisher={{
          name: 'Africa Digital Media Institute',
          logo: 'https://admi.africa/logo.png'
        }}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbItems} />

      <Container size="lg" py="xl">
        {/* Back to Course Button */}
        <Group mb="lg">
          <Button
            component={Link}
            href={`/courses/${slug}`}
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            size="sm"
          >
            Back to Course
          </Button>
        </Group>

        {/* Video Player Section */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Card.Section>
            <div className="relative aspect-video w-full">
              <VideoPlayer videoUrl={course.courseVideo.fields.file.url} />
            </div>
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Title order={2} size="h3">
              {videoTitle}
            </Title>
            <Badge color="blue" variant="light">
              {course.awardLevel || 'Course'}
            </Badge>
          </Group>

          <Text size="sm" c="dimmed" mb="md">
            {videoDescription}
          </Text>

          <Group>
            <Button
              component={Link}
              href={`/courses/${slug}`}
              leftSection={<IconPlayerPlay size={16} />}
              variant="filled"
              color="red"
            >
              Learn More About This Course
            </Button>
          </Group>
        </Card>

        {/* Course Information */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            About {course.name}
          </Title>

          <Group mb="md">
            {course.programType?.fields?.duration && (
              <Badge variant="outline">Duration: {course.programType.fields.duration}</Badge>
            )}
            {course.programType?.fields?.deliveryMode && (
              <Badge variant="outline">Mode: {course.programType.fields.deliveryMode}</Badge>
            )}
            {course.creditHours && <Badge variant="outline">Credits: {course.creditHours}</Badge>}
          </Group>

          <Text mb="md">
            {course.aboutTheCourse?.content?.[0]?.content?.[0]?.value ||
              `Discover the exciting world of ${course.name} with ADMI's comprehensive program designed to prepare you for a successful career in the creative media industry.`}
          </Text>

          <Button component={Link} href={`/courses/${slug}`} variant="outline" fullWidth>
            View Full Course Details
          </Button>
        </Card>
      </Container>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const coursesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course&select=fields.slug,fields.courseVideo`
    )
    const coursesData = await coursesResponse.json()

    // Only generate paths for courses that have videos
    const paths =
      coursesData.items
        ?.filter((course: any) => course.fields?.slug && course.fields?.courseVideo)
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

    // Only show video watch page if course has a video
    if (!course.fields?.courseVideo) {
      return { notFound: true }
    }

    return {
      props: {
        course: course.fields,
        slug
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching course for video watch page:', error)
    return { notFound: true }
  }
}
