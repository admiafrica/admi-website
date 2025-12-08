import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const PhotographyNairobiPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Photography Course in Nairobi',
    description:
      'Professional Photography training in nairobi, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Photography Course in Nairobi - ADMI"
        description="Best Photography course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/photography-nairobi"
        keywords="photography, nairobi, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Photography Course in Nairobi
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Nairobi's vibrant culture and bustling urban landscapes provide an unmatched canvas for photographers. With
          the city's thriving fashion scene, numerous events, and a growing real estate market, Nairobi offers diverse
          opportunities for commercial, portrait, and event photography. The proximity to wildlife and scenic landscapes
          just outside the city further enhances the potential for tourism and nature photography.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Photography in nairobi?
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
                Frequently Asked Questions - Nairobi Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value={'faq-0'}>
                  <Accordion.Control>
                    How does Nairobi's dynamic environment enhance my photography learning experience?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Nairobi's unique blend of urban and natural landscapes provides a rich learning environment.
                      You'll have the opportunity to practice with a variety of subjects, from cityscapes and bustling
                      street life in areas like Eastlands and South B/C, to serene natural settings, enhancing your
                      versatility and creativity as a photographer.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    What kind of photography career opportunities can I expect in Nairobi?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Nairobi, being Kenya's largest creative job market, offers extensive opportunities in media houses
                      like Nation Media Group and Royal Media Services, fashion photography, events coverage, and the
                      booming real estate market. The city's growing interest in drone photography and virtual tours
                      also opens up new avenues for photographers.
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
          Photography Opportunities in nairobi
        </Title>

        <Text>
          nairobi is an important center in Nairobi with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Photography program prepares you for the expanding job market. Students from nairobi
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

export default PhotographyNairobiPage
