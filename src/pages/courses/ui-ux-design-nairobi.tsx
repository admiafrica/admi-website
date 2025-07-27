import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const UIUXDesignNairobiPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UI/UX Design Course in Nairobi',
    description:
      'Professional UI/UX Design training in nairobi, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="UI/UX Design Course in Nairobi - ADMI"
        description="Best UI/UX Design course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/ui-ux-design-nairobi"
        keywords="ui-ux-design, nairobi, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          UI/UX Design Course in Nairobi
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Nairobi, Kenya’s tech hub, offers unrivaled opportunities for UI/UX designers with its vibrant startup scene,
          particularly in Westlands and CBD. The city's tech companies, fintech startups, and digital agencies are in
          constant demand for skilled designers to navigate the competitive digital landscape, making Nairobi a prime
          location for UI/UX education.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose UI/UX Design in nairobi?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Kenya&apos;s market</List.Item>
                <List.Item>Experienced instructors with real-world experience</List.Item>
                <List.Item>State-of-the-art facilities and equipment at our Nairobi campus</List.Item>
                <List.Item>90% job placement rate across Kenya</List.Item>
                <List.Item>Flexible payment plans available</List.Item>
                <List.Item>Career support and internship opportunities</List.Item>
                <List.Item>Accessible to students from nairobi and surrounding areas</List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our UI/UX Design
                  program.
                </Text>
                <Button component="a" href="/courses/ui-ux-design-certificate" variant="light" fullWidth>
                  View Full UI/UX Design Course Details
                </Button>
              </Card>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">
                Frequently Asked Questions - Nairobi Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value={'faq-0'}>
                  <Accordion.Control>
                    How relevant is UI/UX design training in Nairobi's tech eco-system?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      In Nairobi’s booming tech ecosystem, UI/UX design stands out as a critical skill. With major
                      employers like Safaricom and various tech startups, the demand for designers who can create
                      intuitive and engaging digital experiences is at an all-time high.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there ample career opportunities in Nairobi for UI/UX design graduates?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Absolutely. Nairobi's status as East Africa’s technology and innovation hub means graduates have
                      direct access to careers in leading tech companies, fintech, and digital agencies within the CBD,
                      Westlands, and beyond. The city's dynamic market is eager for fresh talent in UI/UX design.
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
                <strong>Duration:</strong> 4-6 months (1 semester)
              </Text>
              <Text mb="sm">
                <strong>Level:</strong> Certificate
              </Text>
              <Text mb="sm">
                <strong>Fee:</strong>{' '}
                <a href="https://admi.africa/student-support#fees" target="_blank">
                  View current fees
                </a>
              </Text>
              <Text mb="sm">
                <strong>Location:</strong> Nairobi Campus (Central Location)
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
          UI/UX Design Opportunities in nairobi
        </Title>

        <Text>
          nairobi is an important center in Nairobi with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s UI/UX Design program prepares you for the expanding job market. Students from nairobi
          are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your UI/UX Design Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive UI/UX Design program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/ui-ux-design-certificate" size="lg" fullWidth>
            Explore Full UI/UX Design Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default UIUXDesignNairobiPage
