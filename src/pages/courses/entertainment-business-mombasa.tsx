import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const EntertainmentBusinessMombasaPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Entertainment Business Course in Coast',
    description:
      'Professional Entertainment Business training in mombasa, Kenya. Learn music business, event management, artist management, and entertainment law.',
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
    <>
      <PageSEO
        title="Entertainment Business Course in Coast - ADMI"
        description="Best Entertainment Business course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/entertainment-business-mombasa"
        keywords="entertainment-business, mombasa, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Entertainment Business Course in Coast
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Professional Entertainment Business training in mombasa with industry experts and guaranteed job placement
          support
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Entertainment Business in mombasa?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Kenya&apos;s market</List.Item>
                <List.Item>Experienced instructors with real-world experience</List.Item>
                <List.Item>State-of-the-art facilities and equipment at our Nairobi campus</List.Item>
                <List.Item>90% job placement rate across Kenya</List.Item>
                <List.Item>Flexible payment plans available</List.Item>
                <List.Item>Career support and internship opportunities</List.Item>
                <List.Item>Accessible to students from mombasa and surrounding areas</List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our Entertainment
                  Business program.
                </Text>
                <Button component="a" href="/courses/entertainment-business-diploma" variant="light" fullWidth>
                  View Full Entertainment Business Course Details
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
                <strong>Duration:</strong> 12-18 months
              </Text>
              <Text mb="sm">
                <strong>Level:</strong> Diploma
              </Text>
              <Text mb="sm">
                <strong>Fee:</strong>{' '}
                <a href="https://admi.africa/student-support#fees" target="_blank">
                  View current fees
                </a>
              </Text>
              <Text mb="sm">
                <strong>Location:</strong> mombasa, Coast
              </Text>
              <Text mb="sm">
                <strong>Campus:</strong> 25 Kenyatta Avenue, Nairobi
              </Text>

              <Button component="a" href="/enquiry" fullWidth mt="md" color="blue">
                Apply Now
              </Button>
            </Card>
          </Grid.Col>
        </Grid>

        <Title order={2} mt="xl" mb="md">
          Entertainment Business Opportunities in mombasa
        </Title>

        <Text>
          mombasa is an important center in Coast with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Entertainment Business program prepares you for the expanding job market. Students
          from mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta
          Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Entertainment Business Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Entertainment Business program
            with detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/entertainment-business-diploma" size="lg" fullWidth>
            Explore Full Entertainment Business Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default EntertainmentBusinessMombasaPage
