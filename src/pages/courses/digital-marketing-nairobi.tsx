import React from 'react'
import { Title, Text, Button, Grid, Card, List } from '@mantine/core'
import { MainLayout } from '@/layouts/v3/MainLayout'
import PageSEO from '../../components/shared/v3/PageSEO'

const DigitalMarketingNairobiPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Digital Marketing Course in Nairobi',
    description:
      'Professional Digital Marketing training in nairobi, Kenya. Learn industry-relevant skills with 90% job placement rate.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Africa Digital Media Institute',
      sameAs: 'https://admi.ac.ke'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'on-site',
      location: {
        '@type': 'Place',
        name: 'ADMI Nairobi Campus',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '25 Kenyatta Avenue, 3rd Floor, Caxton House',
          addressLocality: 'Nairobi',
          addressCountry: 'Kenya'
        }
      }
    },
    offers: {
      '@type': 'Offer',
      description: 'Visit https://admi.africa/student-support#fees for current fee structure',
      priceCurrency: 'KES'
    }
  }

  return (
    <MainLayout>
      <PageSEO
        title="Digital Marketing Course in Nairobi - ADMI"
        description="Best Digital Marketing course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/digital-marketing-nairobi"
        keywords="digital-marketing, nairobi, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Title order={1} ta="center" mb="md">
          Digital Marketing Course in Nairobi
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Professional Digital Marketing training in nairobi with industry experts and guaranteed job placement support
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Digital Marketing in nairobi?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Nairobi market</List.Item>
                <List.Item>Experienced instructors with real-world experience</List.Item>
                <List.Item>State-of-the-art facilities and equipment</List.Item>
                <List.Item>90% job placement rate in nairobi and surrounding areas</List.Item>
                <List.Item>Flexible payment plans available</List.Item>
                <List.Item>Career support and internship opportunities</List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our Digital Marketing
                  program.
                </Text>
                <Button component="a" href="/courses/digital-marketing-certificate" variant="light" fullWidth>
                  View Full Digital Marketing Course Details
                </Button>
              </Card>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">
                Course Details
              </Title>

              <Text mb="sm">
                <strong>Duration:</strong> 4 months per level (3 levels)
              </Text>
              <Text mb="sm">
                <strong>Fee:</strong> <a href="https://admi.africa/student-support#fees">View current fees</a>
              </Text>
              <Text mb="sm">
                <strong>Location:</strong> nairobi, Nairobi
              </Text>
              <Text mb="sm">
                <strong>Population:</strong> 4.4 million
              </Text>

              <Button component="a" href="/enquiry" fullWidth mt="md" color="blue">
                Apply Now
              </Button>
            </Card>
          </Grid.Col>
        </Grid>

        <Title order={2} mt="xl" mb="md">
          Digital Marketing Job Market in nairobi
        </Title>

        <Text>
          nairobi is a growing hub for creative industries in Kenya. As Kenya&apos;s capital, the ADMI offers excellent
          opportunities for Digital Marketing graduates. The creative sector in Nairobi is expanding rapidly, creating
          numerous job opportunities for skilled professionals.
        </Text>
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Digital Marketing Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Digital Marketing program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/digital-marketing-certificate" size="lg" fullWidth>
            Explore Full Digital Marketing Program Details
          </Button>
        </Card>
      </div>
    </MainLayout>
  )
}

export default DigitalMarketingNairobiPage
