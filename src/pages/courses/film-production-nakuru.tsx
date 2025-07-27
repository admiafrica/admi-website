import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const FilmProductionNakuruPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Film Production Course in Rift Valley',
    description:
      'Professional Film Production training in nakuru, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Premier Film School in Rift Valley - ADMI Film Production Nakuru"
        description="East Africa's premier film school welcomes students from Nakuru and Rift Valley. All classes held at our state-of-the-art Nairobi campus with industry-leading facilities."
        canonical="https://admi.ac.ke/courses/film-production-nakuru"
        keywords="premier film school rift valley, top film school nakuru, leading film school kenya, film production nakuru, best film school rift valley, film school nakuru, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Premier Film School in Rift Valley - Film Production Course
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          East Africa&apos;s premier film school welcomes students from Nakuru and Rift Valley. All classes at our
          state-of-the-art Nairobi campus
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose East Africa&apos;s Premier Film School?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>🏆 Top-rated film school in East Africa with regional recognition</List.Item>
                <List.Item>🎬 All classes held at our modern Nairobi campus</List.Item>
                <List.Item>⭐ Award-winning instructors with international film experience</List.Item>
                <List.Item>🎥 State-of-the-art HD and digital cinema equipment in Nairobi</List.Item>
                <List.Item>📈 90% job placement rate across Kenya and East Africa</List.Item>
                <List.Item>🌍 Partnerships with Africa&apos;s vibrant film industry</List.Item>
                <List.Item>💼 Comprehensive career support and industry networking</List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our Film Production
                  program.
                </Text>
                <Button component="a" href="/courses/film-production-diploma" variant="light" fullWidth>
                  View Full Film Production Course Details
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
                    How does Nakuru's location influence the film production course?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Nakuru's strategic position offers students unique access to diverse filming locations, from urban
                      settings in the Town Centre and Milimani to natural landscapes around Lanet and Free Area. This
                      variety enriches the course, allowing students to gain hands-on experience in various shooting
                      environments.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there local career opportunities in film production after completing the course?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Yes, Nakuru's growth in tourism and manufacturing has spurred demand for professional video
                      content, opening opportunities in local TV stations, advertising agencies, and content creation
                      for social media and streaming platforms. Graduates can find roles in cinematography, editing, and
                      production management within these industries.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card>
          
            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">Frequently Asked Questions - Nakuru Students</Title>
              <Accordion>
                
                <Accordion.Item key={0} value={`faq-0`}>
                  <Accordion.Control>How does Nakuru's location influence the film production course?</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">Nakuru's strategic position offers students unique access to diverse filming locations, from urban settings in the Town Centre and Milimani to natural landscapes around Lanet and Free Area. This variety enriches the course, allowing students to gain hands-on experience in various shooting environments.</Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={`faq-1`}>
                  <Accordion.Control>Are there local career opportunities in film production after completing the course?</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">Yes, Nakuru's growth in tourism and manufacturing has spurred demand for professional video content, opening opportunities in local TV stations, advertising agencies, and content creation for social media and streaming platforms. Graduates can find roles in cinematography, editing, and production management within these industries.</Text>
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
                <strong>Fee:</strong> <a href="https://admi.africa/student-support#fees">View current fees</a>
              </Text>
              <Text mb="sm">
                <strong>Location:</strong> Nakuru Campus (Central Location)</Text>
              <Button component="a" href="/enquiry" fullWidth mt="md" color="blue">
                Apply Now
              </Button>
            </Card>
          </Grid.Col>
        </Grid>

        <Title order={2} mt="xl" mb="md">
          Film Production Job Market in nakuru
        </Title>

        <Text>
          nakuru is a growing hub for creative industries in Kenya. As Kenya&apos;s capital,000, the ADMI offers
          excellent opportunities for Film Production graduates. The creative sector in Rift Valley is expanding
          rapidly, creating numerous job opportunities for skilled professionals.
        </Text>
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Film Production Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Film Production program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/film-production-diploma" size="lg" fullWidth>
            Explore Full Film Production Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default FilmProductionNakuruPage
