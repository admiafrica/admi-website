import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const AnimationEldoretPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Animation Course in Rift Valley',
    description:
      'Professional Animation training in eldoret, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        description="Best Animation course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/animation-eldoret"
        keywords="animation, eldoret, course, training, kenya, admi"
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
          In Eldoret, the burgeoning startup ecosystem, intertwined with agricultural technology and regional media
          sectors, presents a fertile ground for animation professionals. The city's unique positioning as a digital
          skills hub in North Rift offers extensive opportunities in creating animated content for educational purposes,
          marketing campaigns, and sports organizations.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Animation in eldoret?
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
                  Get detailed curriculum, admission requirements, and enrollment information for our Animation program.
                </Text>
                <Button component="a" href="/courses/animation-diploma" variant="light" fullWidth>
                  View Full Animation Course Details
                </Button>
              </Card>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">
                Frequently Asked Questions - Eldoret Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value={'faq-0'}>
                  <Accordion.Control>
                    How can the animation course in Eldoret leverage the local startup ecosystem?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      The course is designed to equip students with skills in 2D/3D animation and VFX, tapping into
                      Eldoret’s startup ecosystem which is ripe for digital content creation, especially for
                      agricultural technology, and regional media sectors seeking innovative marketing and educational
                      tools.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there local employment opportunities in Eldoret for animation graduates?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Yes, Eldoret offers a growing number of opportunities for animation professionals, especially
                      within advertising agencies, regional media houses, and the emerging gaming sector. Additionally,
                      the city’s sports organizations are increasingly incorporating animated content for promotional
                      purposes.
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
                <strong>Location:</strong> Eldoret Campus (Central Location)
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
          Animation Opportunities in eldoret
        </Title>

        <Text>
          eldoret is an important center in Rift Valley with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Animation program prepares you for the expanding job market. Students from eldoret are
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

export default AnimationEldoretPage
