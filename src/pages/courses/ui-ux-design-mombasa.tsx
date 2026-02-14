import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@/lib/tw-mantine'
import PageSEO from '../../components/shared/v3/PageSEO'

const UIUXDesignMombasaPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UI/UX Design Course in Coast',
    description:
      'Professional UI/UX Design training in mombasa, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="UI/UX Design Course in Coast - ADMI"
        description="Best UI/UX Design course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/ui-ux-design-mombasa"
        keywords="ui-ux-design, mombasa, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          UI/UX Design Course in Coast
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          In Mombasa, the UI/UX Design course taps into the booming tourism and hospitality industries' digital
          transformation needs. With a unique focus on creating engaging online experiences for coastal resorts,
          eateries, and travel agencies, graduates are perfectly positioned to lead the digital content revolution in
          Kenya's premier tourist destination.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose UI/UX Design in mombasa?
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
                  Get detailed curriculum, admission requirements, and enrollment information for our Graphic Design
                  Certificate program.
                </Text>
                <Button component="a" href="/courses/graphic-design-certificate" variant="light" fullWidth>
                  View Full Graphic Design Certificate Details
                </Button>
              </Card>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">
                Frequently Asked Questions - Mombasa Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value={'faq-0'}>
                  <Accordion.Control>
                    How does the Mombasa environment enhance my learning experience in UI/UX Design?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Mombasa's vibrant tourism and hospitality sectors offer a unique landscape for UI/UX students to
                      apply their skills in real-world scenarios, especially in enhancing digital engagement for
                      businesses in these industries.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there local internships available in Mombasa for UI/UX Design students?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Yes, numerous opportunities exist with local coastal media houses, tourism agencies, and
                      hospitality brands eager to innovate their digital presence, providing fertile ground for
                      internships and project collaborations.
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
                <strong>Location:</strong> ADMI Nairobi Campus
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
          UI/UX Design Opportunities in mombasa
        </Title>

        <Text>
          mombasa is an important center in Coast with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s UI/UX Design program prepares you for the expanding job market. Students from mombasa
          are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your UI/UX Design Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Graphic Design Certificate
            program with detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/graphic-design-certificate" size="lg" fullWidth>
            Explore Full Graphic Design Certificate Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default UIUXDesignMombasaPage
