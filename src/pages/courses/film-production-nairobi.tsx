import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List } from '@/lib/tw-mantine'
import PageSEO from '../../components/shared/v3/PageSEO'

const FilmProductionNairobiPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Film Production Course in Nairobi',
    description:
      'Professional Film Production training in nairobi, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Premier Film School in Nairobi - ADMI Film Production Course"
        description="Top-rated film school in East Africa. Premier Film Production training in Nairobi, Kenya. Leading film school with industry experts, state-of-the-art facilities, and 90% job placement rate."
        canonical="https://admi.ac.ke/courses/film-production-nairobi"
        keywords="premier film school nairobi, top rated film school kenya, leading film school east africa, film production nairobi, best film school kenya, film school nairobi, cinematography school kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Premier Film School in Nairobi - Film Production Course
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          East Africa&apos;s top-rated film school. Premier Film Production training in Nairobi with industry-leading
          experts and 90% job placement rate
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose East Africa&apos;s Premier Film School?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>🏆 Top-rated film school in East Africa with regional recognition</List.Item>
                <List.Item>🎬 Industry-leading curriculum designed by film industry professionals</List.Item>
                <List.Item>⭐ Award-winning instructors with international film experience</List.Item>
                <List.Item>🎥 State-of-the-art HD and digital cinema equipment</List.Item>
                <List.Item>📈 90% job placement rate with leading production companies</List.Item>
                <List.Item>
                  🌍 Partnerships with Africa&apos;s vibrant film industry and international studios
                </List.Item>
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
                <Button component="a" href="/courses/film-and-television-production-diploma" variant="light" fullWidth>
                  View Full Film Production Course Details
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
                <strong>Duration:</strong> 18 months
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
          Film Production Job Market in nairobi
        </Title>

        <Text>
          nairobi is a growing hub for creative industries in Kenya. As Kenya&apos;s capital, the ADMI offers excellent
          opportunities for Film Production graduates. The creative sector in Nairobi is expanding rapidly, creating
          numerous job opportunities for skilled professionals.
        </Text>
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Film Production Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Film Production program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/film-and-television-production-diploma" size="lg" fullWidth>
            Explore Full Film Production Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default FilmProductionNairobiPage
