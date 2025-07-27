import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const UIUXDesignEldoretPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UI/UX Design Course in Rift Valley',
    description:
      'Professional UI/UX Design training in eldoret, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="UI/UX Design Course in Rift Valley - ADMI"
        description="Best UI/UX Design course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/ui-ux-design-eldoret"
        keywords="ui-ux-design, eldoret, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          UI/UX Design Course in Rift Valley
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Eldoret's vibrant startup ecosystem and its evolving agricultural technology and sports organizations are increasingly seeking UI/UX designers. With a local demand for digital skills to enhance user experiences, Eldoret offers a unique landscape for budding designers to innovate in tech, fintech, and regional media.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose UI/UX Design in eldoret?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Kenya&apos;s market</List.Item>
                <List.Item>Experienced instructors with real-world experience</List.Item>
                <List.Item>State-of-the-art facilities and equipment at our Nairobi campus</List.Item>
                <List.Item>90% job placement rate across Kenya</List.Item>
                <List.Item>Flexible payment plans available</List.Item>
                <List.Item>Career support and internship opportunities</List.Item>
                <List.Item>Accessible to students from eldoret and surrounding areas</List.Item>
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
              <Title order={3} mb="md">Frequently Asked Questions - Eldoret Students</Title>
              <Accordion>
                
                <Accordion.Item key={0} value={`faq-0`}>
                  <Accordion.Control>How relevant is a UI/UX design course in Eldoret for local startups and tech companies?</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">In Eldoret, the startup and tech scene is booming, with many companies prioritizing digital presence. A UI/UX design course gears you towards meeting the high demand for creating intuitive and user-friendly digital experiences, crucial for the success of these local businesses.</Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={`faq-1`}>
                  <Accordion.Control>Are there specific industries in Eldoret that are particularly in need of UI/UX designers?</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">Yes, the agricultural tech sector and sports organizations in Eldoret are on the lookout for skilled UI/UX designers to enhance their digital tools and platforms, offering unique career paths beyond the traditional tech company roles.</Text>
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
                <strong>Location:</strong> Eldoret Campus (Central Location)</Text>
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
          UI/UX Design Opportunities in eldoret
        </Title>

        <Text>
          eldoret is an important center in Rift Valley with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s UI/UX Design program prepares you for the expanding job market. Students from eldoret
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

export default UIUXDesignEldoretPage
