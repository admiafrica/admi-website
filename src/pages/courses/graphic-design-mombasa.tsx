import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const GraphicDesignMombasaPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Graphic Design Course in Coast',
    description:
      'Professional Graphic Design training in mombasa, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Kenya's Most Sought-After Graphic Design Course - ADMI"
        description="Industry's best-kept secret for students from Mombasa. Learn from star teachers like Brian Omolo at our Nairobi campus. Over 90% employment rate."
        canonical="https://admi.ac.ke/courses/graphic-design-mombasa"
        keywords="best graphic design course kenya, graphic design school mombasa, brian omolo graphic design, top design school kenya, graphic design diploma kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Kenya&apos;s Most Sought-After Graphic Design Course
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Welcoming students from Mombasa to Kenya&apos;s best-kept secret. Learn from star teacher Brian Omolo at our
          Nairobi campus. Over 90% employment rate
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why ADMI is Kenya&apos;s Best-Kept Secret for Graphic Design
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>
                  🌆 <strong>Star Faculty:</strong> Learn from industry legends like Brian Omolo, revolutionizing
                  digital art & murals across Nairobi
                </List.Item>
                <List.Item>
                  📈 <strong>Outstanding Results:</strong> Over 90% employment rate - the highest in Kenya
                </List.Item>
                <List.Item>
                  🏆 <strong>Industry Recognition:</strong> Most sought-after course among creative professionals
                </List.Item>
                <List.Item>
                  🎬 <strong>Nairobi Campus:</strong> All classes at our state-of-the-art Nairobi facilities
                </List.Item>
                <List.Item>
                  ✨ <strong>Cutting-Edge Equipment:</strong> Professional-grade design labs and software
                </List.Item>
                <List.Item>
                  🎨 <strong>Revolutionary Techniques:</strong> Master digital art, murals, and contemporary design
                </List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our Graphic Design
                  program.
                </Text>
                <Button component="a" href="/courses/graphic-design-diploma" variant="light" fullWidth>
                  View Full Graphic Design Course Details
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
                    How relevant is a graphic design course in Mombasa's job market?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Extremely relevant. Mombasa’s economy thrives on tourism and hospitality, sectors that
                      increasingly rely on digital marketing and branding. Graphic designers with skills in UI/UX, brand
                      design, and digital illustration are in high demand to create engaging content for these
                      industries.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>Are there local Mombasa companies hiring graphic designers?</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Yes, there are numerous opportunities in Mombasa. Local hospitality brands, advertising agencies,
                      and coastal media houses frequently seek skilled graphic designers. Additionally, the city's
                      growing tech scene offers roles in UI/UX and digital product design, along with freelance
                      projects.
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
                <strong>Duration:</strong> 15 months
              </Text>
              <Text mb="sm">
                <strong>Fee:</strong> <a href="https://admi.africa/student-support#fees">View current fees</a>
              </Text>
              <Text mb="sm">
                <strong>Location:</strong> ADMI Nairobi Campus
              </Text>
              <Button component="a" href="/enquiry" fullWidth mt="md" color="blue">
                Apply Now
              </Button>
            </Card>
          </Grid.Col>
        </Grid>

        <Title order={2} mt="xl" mb="md">
          Graphic Design Job Market in mombasa
        </Title>

        <Text>
          mombasa is a growing hub for creative industries in Kenya. As Kenya&apos;s capital, the ADMI offers excellent
          opportunities for Graphic Design graduates. The creative sector in Coast is expanding rapidly, creating
          numerous job opportunities for skilled professionals.
        </Text>
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Graphic Design Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Graphic Design program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/graphic-design-diploma" size="lg" fullWidth>
            Explore Full Graphic Design Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default GraphicDesignMombasaPage
