import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const AnimationNakuruPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Animation Course in Rift Valley',
    description:
      'Professional Animation training in nakuru, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Animation Course in Rift Valley - ADMI"
        description="Best Animation course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/animation-nakuru"
        keywords="animation, nakuru, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Animation Course in Rift Valley
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Nakuru offers a vibrant market for animators, uniquely benefiting from its strategic position to service both
          Nairobi's and Western Kenya's burgeoning digital content demand. The city's growing manufacturing,
          agriculture, and tourism sectors increasingly rely on animated marketing and educational content, presenting a
          fertile ground for animation professionals.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Animation in nakuru?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Kenya&apos;s market</List.Item>
                <List.Item>Experienced instructors with real-world experience</List.Item>
                <List.Item>State-of-the-art facilities and equipment at our Nairobi campus</List.Item>
                <List.Item>90% job placement rate across Kenya</List.Item>
                <List.Item>Flexible payment plans available</List.Item>
                <List.Item>Career support and internship opportunities</List.Item>
                <List.Item>Accessible to students from nakuru and surrounding areas</List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our Animation program.
                </Text>
                <Button component="a" href="/courses/animation-diploma" variant="light" fullWidth>
                  View Full Animation Course Details
                </Button>
              </Card>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">
                Frequently Asked Questions - Nakuru Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value={'faq-0'}>
                  <Accordion.Control>
                    How does Nakuru's location influence the animation course experience?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Nakuru's strategic location allows for unique cross-market insights in animation, offering
                      students exposure to a diverse range of projects from both Nairobi and Western Kenya, enriching
                      their learning and creative application.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there local animation studios or related industries in Nakuru?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Yes, Nakuru is home to emerging animation studios, and its proximity to major manufacturing and
                      agricultural firms, as well as tourism businesses, provides ample opportunities for animators in
                      advertising and promotional content creation.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">
                Course Details
              </Title>

              <Text mb="sm">
                <strong>Duration:</strong> 18 months
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
                <strong>Location:</strong> Nakuru Campus (Central Location)
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
          Animation Opportunities in nakuru
        </Title>

        <Text>
          nakuru is an important center in Rift Valley with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Animation program prepares you for the expanding job market. Students from nakuru are
          welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Animation Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Animation program with detailed
            curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/animation-diploma" size="lg" fullWidth>
            Explore Full Animation Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default AnimationNakuruPage
