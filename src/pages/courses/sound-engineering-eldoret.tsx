import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const SoundEngineeringEldoretPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Sound Engineering Course in Rift Valley',
    description:
      'Professional Sound Engineering training in eldoret, Kenya. Master audio production, mixing, mastering, and live sound engineering.',
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
        title="Sound Engineering Course in Rift Valley - ADMI"
        description="Best Sound Engineering course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/sound-engineering-eldoret"
        keywords="sound-engineering, eldoret, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Sound Engineering Course in Rift Valley
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Eldoret's dynamic mix of agricultural tech firms, burgeoning sports organizations, and regional media outlets
          presents a fertile ground for sound engineers. The city's growing startup ecosystem, particularly in digital
          realms, amplifies the demand for skilled professionals in live sound, studio recording, and sound design,
          uniquely positioning Eldoret as a hub for audio engineering excellence.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Sound Engineering in eldoret?
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
                  Get detailed curriculum, admission requirements, and enrollment information for our Sound Engineering
                  program.
                </Text>
                <Button component="a" href="/courses/sound-engineering-diploma" variant="light" fullWidth>
                  View Full Sound Engineering Course Details
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
                    How does Eldoret's startup ecosystem enhance my learning experience in sound engineering?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Eldoret's startup scene, especially in tech and digital media, provides real-world application
                      opportunities for sound engineering students. Engagement with local startups allows for hands-on
                      experience in sound design and audio production, critical for mastering the course.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there local employment opportunities in Eldoret for sound engineering graduates?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Yes, Eldoret offers diverse employment opportunities, from working with regional media houses and
                      sports organizations requiring broadcast audio professionals to the vibrant event production scene
                      for live sound engineers. The presence of recording studios also supports studio recording
                      careers.
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
          Sound Engineering Opportunities in eldoret
        </Title>

        <Text>
          eldoret is an important center in Rift Valley with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Sound Engineering program prepares you for the expanding job market. Students from
          eldoret are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Sound Engineering Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Sound Engineering program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/sound-engineering-diploma" size="lg" fullWidth>
            Explore Full Sound Engineering Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default SoundEngineeringEldoretPage
