import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const PhotographyKisumuPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Photography Course in Western',
    description:
      'Professional Photography training in kisumu, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Photography Course in Western - ADMI"
        description="Best Photography course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/photography-kisumu"
        keywords="photography, kisumu, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Photography Course in Western
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Kisumu, with its vibrant cultural scene and emerging tech hub status, presents a unique canvas for
          photographers. The city's natural beauty, from the shores of Lake Victoria to the bustling markets of Kibuye,
          offers endless material for commercial, event, and portrait photography. Additionally, Kisumu's growth as a
          tech hub creates a demand for high-quality visual content, from drone photography for agricultural tech firms
          to virtual tours for real estate and tourism.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Photography in kisumu?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Kenya&apos;s market</List.Item>
                <List.Item>Experienced instructors with real-world experience</List.Item>
                <List.Item>State-of-the-art facilities and equipment at our Nairobi campus</List.Item>
                <List.Item>90% job placement rate across Kenya</List.Item>
                <List.Item>Flexible payment plans available</List.Item>
                <List.Item>Career support and internship opportunities</List.Item>
                <List.Item>Accessible to students from kisumu and surrounding areas</List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our Photography
                  program.
                </Text>
                <Button component="a" href="/courses/photography-certificate" variant="light" fullWidth>
                  View Full Photography Course Details
                </Button>
              </Card>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">
                Frequently Asked Questions - Kisumu Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value={'faq-0'}>
                  <Accordion.Control>How does Kisumu's tech scene influence the photography course?</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Kisumu's burgeoning status as a tech hub uniquely positions our photography course to integrate
                      cutting-edge trends like drone photography and virtual tours, tailoring skills that are in high
                      demand by local tech firms and international NGOs.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there real opportunities for photographers in Kisumu's job market?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Absolutely. Beyond traditional opportunities in media houses, Kisumu's growing events scene,
                      international NGO presence, and the local tourism industry are increasingly seeking skilled
                      photographers for commercial work, real estate virtual tours, and social media content.
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
                <strong>Location:</strong> Kisumu Campus (Central Location)
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
          Photography Opportunities in kisumu
        </Title>

        <Text>
          kisumu is an important center in Western with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Photography program prepares you for the expanding job market. Students from kisumu
          are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Photography Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Photography program with detailed
            curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/photography-certificate" size="lg" fullWidth>
            Explore Full Photography Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default PhotographyKisumuPage
