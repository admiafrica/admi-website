import React from 'react'
import { Container, Title, Text, Card, Grid, List, Badge, Group } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const FilmDirectorCareerGuide = () => {
  const careerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Film Director Career Guide Kenya 2025',
    description:
      'Complete career guide for Film Director in Kenya. Learn about salary, skills, job market, and education requirements.',
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
    datePublished: '2025-07-09T23:11:45.881Z',
    dateModified: '2025-07-09T23:11:45.881Z'
  }

  return (
    <>
      <PageSEO
        title="Film Director Career Guide Kenya 2025 - ADMI"
        description="Complete Film Director career guide for Kenya. Learn about salary ranges, required skills, job market trends, and how to start your career."
        canonical="https://admi.ac.ke/careers/film-director"
        keywords="film-director, career, kenya, salary, jobs, skills"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(careerSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Film Director Career Guide Kenya 2025
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Everything you need to know about building a successful Film Director career in Kenya
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
              <Title order={2} mb="md">
                Job Market Overview
              </Title>
              <Text>
                Growing industry with increased demand for local content creators and film professionals in Kenya and
                East Africa.
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
              <Title order={2} mb="md">
                Required Skills
              </Title>
              <Group gap="xs" mb="md">
                <Badge key="Cinematography" variant="light" color="blue">
                  Cinematography
                </Badge>
                <Badge key="Editing" variant="light" color="blue">
                  Editing
                </Badge>
                <Badge key="Storytelling" variant="light" color="blue">
                  Storytelling
                </Badge>
                <Badge key="Project Management" variant="light" color="blue">
                  Project Management
                </Badge>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                How to Start Your Career
              </Title>
              <List spacing="sm">
                <List.Item>Enroll in ADMI&apos;s Film Production Diploma program</List.Item>
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
              <Text mb="sm">Film Production Diploma</Text>
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

export default FilmDirectorCareerGuide
