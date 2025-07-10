import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const GraphicDesignNairobiPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Graphic Design Course in Nairobi',
    description:
      'Professional Graphic Design training in nairobi, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Kenya's Most Sought-After Graphic Design Course - ADMI Nairobi"
        description="Industry's best-kept secret: ADMI's revolutionary Graphic Design program in Nairobi. Learn from star teachers like Brian Omolo. Over 90% employment rate. State-of-the-art facilities."
        canonical="https://admi.ac.ke/courses/graphic-design-nairobi"
        keywords="best graphic design course kenya, graphic design nairobi, brian omolo admi, top graphic design school kenya, graphic design diploma nairobi, digital art kenya, admi"
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
          The industry&apos;s best-kept secret: Revolutionary Graphic Design program with star teachers like Brian
          Omolo. Over 90% employment rate
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why ADMI is Kenya&apos;s Best-Kept Secret for Graphic Design
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>
                  🎆 <strong>Star Faculty:</strong> Learn from industry legends like Brian Omolo, revolutionizing
                  digital art & murals across Nairobi
                </List.Item>
                <List.Item>
                  📈 <strong>Outstanding Results:</strong> Over 90% employment rate - the highest in Kenya
                </List.Item>
                <List.Item>
                  🏆 <strong>Industry Recognition:</strong> Most sought-after course among creative professionals
                </List.Item>
                <List.Item>
                  ✨ <strong>Cutting-Edge Equipment:</strong> State-of-the-art design labs and professional-grade
                  software
                </List.Item>
                <List.Item>
                  🎨 <strong>Revolutionary Techniques:</strong> Master digital art, murals, and contemporary design
                  methods
                </List.Item>
                <List.Item>
                  🌐 <strong>Industry Connections:</strong> Direct access to Kenya&apos;s top design studios and
                  agencies
                </List.Item>
                <List.Item>
                  💼 <strong>Guaranteed Success:</strong> Comprehensive career support with proven track record
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
                <strong>Location:</strong> nairobi, Nairobi
              </Text>
              <Text mb="sm">
                <strong>Population:</strong> 4.4 million
              </Text>

              <Button component="a" href="/enquiry" fullWidth mt="md" color="blue">
                Apply Now
              </Button>
            </Card>
          </Grid.Col>
        </Grid>

        <Title order={2} mt="xl" mb="md">
          Graphic Design Job Market in nairobi
        </Title>

        <Text>
          nairobi is a growing hub for creative industries in Kenya. As Kenya&apos;s capital, the ADMI offers excellent
          opportunities for Graphic Design graduates. The creative sector in Nairobi is expanding rapidly, creating
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

export default GraphicDesignNairobiPage
