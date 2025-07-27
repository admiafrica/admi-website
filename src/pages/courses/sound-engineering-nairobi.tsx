import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const SoundEngineeringNairobiPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Sound Engineering Course in Nairobi',
    description:
      'Professional Sound Engineering training in nairobi, Kenya. Master audio production, mixing, mastering, and live sound engineering.',
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
        title="Sound Engineering Course in Nairobi - ADMI"
        description="Best Sound Engineering course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/sound-engineering-nairobi"
        keywords="sound-engineering, nairobi, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Sound Engineering Course in Nairobi
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Nairobi, as Kenya's creative heartbeat, offers unparalleled opportunities for sound-engineering students. With
          giants like Safaricom, Nation Media Group, and Royal Media Services centered here, the city's vibrant mix of
          recording studios, broadcast media, and live event productions is fertile ground for audio professionals.
          Nairobi's trend towards immersive audio and podcast engineering further distinguishes it as a hub for
          cutting-edge audio skills development.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Sound Engineering in nairobi?
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
                Frequently Asked Questions - Nairobi Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value={'faq-0'}>
                  <Accordion.Control>
                    How does Nairobi's creative scene enhance my sound-engineering course experience?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Studying in Nairobi places you at the epicenter of East Africa's largest creative market. The
                      city's thriving entertainment, news media, and event production scenes provide a rich context for
                      practical learning, offering students direct exposure to industry-standard practices and
                      networking opportunities with leading professionals.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    What are the career prospects in Nairobi for sound engineering graduates?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Graduates in Nairobi find themselves in a dynamic job market, with opportunities in live sound for
                      concerts, studio recording for both major and independent artists, broadcast audio for television
                      and radio, and emerging fields like podcast production. The presence of major employers such as
                      Safaricom and Royal Media Services ensures a steady demand for skilled audio engineers.
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
          Sound Engineering Opportunities in nairobi
        </Title>

        <Text>
          nairobi is an important center in Nairobi with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Sound Engineering program prepares you for the expanding job market. Students from
          nairobi are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
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

export default SoundEngineeringNairobiPage
