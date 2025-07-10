import React from 'react'
import { Container, Title, Text, Card, Grid, List, Badge, Group } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const DigitalMarketingSpecialistCareerGuide = () => {
  const careerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Digital Marketing Specialist Career Guide Kenya 2025',
    description:
      'Complete career guide for Digital Marketing Specialist in Kenya. Learn about salary, skills, job market, and education requirements.',
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
    datePublished: '2025-07-09T23:11:45.877Z',
    dateModified: '2025-07-09T23:11:45.878Z'
  }

  return (
    <>
      <PageSEO
        title="Digital Marketing Specialist Career Guide Kenya 2025 - ADMI"
        description="Complete Digital Marketing Specialist career guide for Kenya. Learn about salary ranges, required skills, job market trends, and how to start your career."
        canonical="https://admi.ac.ke/careers/digital-marketing-specialist"
        keywords="digital-marketing-specialist, career, kenya, salary, jobs, skills"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(careerSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Digital Marketing Specialist Career Guide Kenya 2025
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Everything you need to know about building a successful Digital Marketing Specialist career in Kenya
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
              <Title order={2} mb="md">
                Job Market Overview
              </Title>
              <Text>High demand with 300+ new positions monthly in Kenya&apos;s growing digital economy.</Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
              <Title order={2} mb="md">
                Required Skills
              </Title>
              <Group gap="xs" mb="md">
                <Badge key="SEO" variant="light" color="blue">
                  SEO
                </Badge>
                <Badge key="Social Media" variant="light" color="blue">
                  Social Media
                </Badge>
                <Badge key="Google Ads" variant="light" color="blue">
                  Google Ads
                </Badge>
                <Badge key="Analytics" variant="light" color="blue">
                  Analytics
                </Badge>
                <Badge key="Content Marketing" variant="light" color="blue">
                  Content Marketing
                </Badge>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                How to Start Your Career
              </Title>
              <List spacing="sm">
                <List.Item>Enroll in ADMI&apos;s Digital Marketing Diploma program</List.Item>
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
              <Text mb="sm">Digital Marketing (Certificate, Diploma & Advanced Diploma)</Text>
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

export default DigitalMarketingSpecialistCareerGuide
