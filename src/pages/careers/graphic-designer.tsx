import React from 'react'
import { Container, Title, Text, Card, Grid, List, Badge, Group } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const GraphicDesignerCareerGuide = () => {
  const careerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Graphic Designer Career Guide Kenya 2025',
    description:
      'Complete career guide for Graphic Designer in Kenya. Learn about salary, skills, job market, and education requirements.',
    author: {
      '@type': 'Organization',
      name: 'Africa Digital Media Institute'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ADMI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://admi.ac.ke/logo.png'
      }
    },
    datePublished: '2025-07-09T23:11:45.882Z',
    dateModified: '2025-07-09T23:11:45.882Z'
  }

  return (
    <>
      <PageSEO
        title="Graphic Designer Career Guide Kenya 2025 - ADMI"
        description="Complete Graphic Designer career guide for Kenya. Learn about salary ranges, required skills, job market trends, and how to start your career."
        canonical="https://admi.ac.ke/careers/graphic-designer"
        keywords="graphic-designer, career, kenya, salary, jobs, skills"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(careerSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Graphic Designer Career Guide Kenya 2025
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Everything you need to know about building a successful Graphic Designer career in Kenya
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
              <Title order={2} mb="md">
                Job Market Overview
              </Title>
              <Text>Stable demand across all industries with increasing need for digital and print design.</Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
              <Title order={2} mb="md">
                Required Skills
              </Title>
              <Group gap="xs" mb="md">
                <Badge key="Adobe Creative Suite" variant="light" color="blue">
                  Adobe Creative Suite
                </Badge>
                <Badge key="Branding" variant="light" color="blue">
                  Branding
                </Badge>
                <Badge key="UI/UX" variant="light" color="blue">
                  UI/UX
                </Badge>
                <Badge key="Print Design" variant="light" color="blue">
                  Print Design
                </Badge>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                How to Start Your Career
              </Title>
              <List spacing="sm">
                <List.Item>Enroll in ADMI&apos;s Graphic Design Diploma program</List.Item>
                <List.Item>Build a strong portfolio during your studies</List.Item>
                <List.Item>Complete internships with industry partners</List.Item>
                <List.Item>Network with professionals in the field</List.Item>
                <List.Item>Stay updated with industry trends and tools</List.Item>
              </List>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
              <Title order={3} mb="md">
                Salary Range
              </Title>
              <Text size="xl" fw={700} color="blue">
                Competitive salary based on experience
              </Text>
              <Text size="sm" c="dimmed">
                per month in Kenya
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">
                Recommended Course
              </Title>
              <Text mb="sm">Graphic Design Diploma</Text>
              <Text size="sm" c="dimmed">
                Get industry-relevant training and guaranteed job placement support
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}

export default GraphicDesignerCareerGuide
