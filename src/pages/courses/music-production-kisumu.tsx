import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const MusicProductionKisumuPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Music Production Course in Western',
    description:
      'Professional Music Production training in kisumu, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Music Production Course in Western - ADMI"
        description="Best Music Production course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/music-production-kisumu"
        keywords="music-production, kisumu, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Music Production Course in Western
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          In Kisumu, the burgeoning tech and creative scene, particularly in Milimani and Mamboleo, presents a fertile
          ground for music production graduates. With the city's status as an emerging tech hub, there's a unique
          advantage for those entering creative roles, including audio engineering and beat production, with less
          competition and a growing demand for innovative audio content in media houses and among local artists.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Music Production in kisumu?
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
                  Get detailed curriculum, admission requirements, and enrollment information for our Music Production
                  program.
                </Text>
                <Button component="a" href="/courses/music-production-diploma" variant="light" fullWidth>
                  View Full Music Production Course Details
                </Button>
              </Card>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">
                Frequently Asked Questions - Kisumu Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value={'faq-0'}>
                  <Accordion.Control>
                    How does Kisumu's emerging tech scene benefit music production students?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Kisumu's status as an emerging tech hub, especially in areas like Milimani and Mamboleo, offers
                      music production students unique opportunities to collaborate with tech startups and NGOs on
                      innovative projects such as podcasting and live streaming, setting them apart in the creative
                      industry.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there local career opportunities in music production in Kisumu?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Yes, Kisumu offers diverse career opportunities in music production, from working with local
                      recording studios and media houses like Lake Region Media to collaborating with international NGOs
                      and agricultural tech firms on their audio content needs. The growing trend of home studios and
                      podcast production further opens up freelance and entrepreneurial avenues.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={2} value={'faq-2'}>
                  <Accordion.Control>undefined</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">undefined</Text>
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
                <strong>Duration:</strong> 12 months
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
          Music Production Opportunities in kisumu
        </Title>

        <Text>
          kisumu is an important center in Western with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Music Production program prepares you for the expanding job market. Students from
          kisumu are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Music Production Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Music Production program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/music-production-diploma" size="lg" fullWidth>
            Explore Full Music Production Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default MusicProductionKisumuPage
