import React from 'react'
import { Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import { MainLayout } from '@/layouts/v3/MainLayout'
import PageSEO from '../../components/shared/v3/PageSEO'

const DigitalMarketingMombasaPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Digital Marketing Course in Coast',
    description:
      'Professional Digital Marketing training in mombasa, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
    <MainLayout>
      <PageSEO
        title="Digital Marketing Course in Coast - ADMI"
        description="Best Digital Marketing course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/digital-marketing-mombasa"
        keywords="digital-marketing, mombasa, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Title order={1} ta="center" mb="md">
          Digital Marketing Course in Coast
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Mombasa, with its thriving tourism sector and vibrant hospitality brands, presents a fertile ground for
          digital marketers. The city's demand for engaging digital content to showcase its rich cultural heritage and
          tourist attractions creates unique opportunities for those skilled in social media marketing, SEO/SEM, and
          analytics, particularly in leveraging the booming influencer and video content trends.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Digital Marketing in mombasa?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Coast market</List.Item>
                <List.Item>Experienced instructors with real-world experience</List.Item>
                <List.Item>State-of-the-art facilities and equipment</List.Item>
                <List.Item>90% job placement rate in mombasa and surrounding areas</List.Item>
                <List.Item>Flexible payment plans available</List.Item>
                <List.Item>Career support and internship opportunities</List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our Digital Marketing
                  program.
                </Text>
                <Button component="a" href="/courses/digital-marketing-certificate" variant="light" fullWidth>
                  View Full Digital Marketing Course Details
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
                    How relevant is a digital marketing course in Mombasa's tourism-driven economy?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      In Mombasa's tourism-centric economy, digital marketing skills are invaluable. Businesses seek to
                      capitalize on online platforms to reach a global audience, making skills in social media
                      marketing, SEO/SEM, and content marketing especially relevant for promoting local attractions and
                      services.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there local career opportunities in digital marketing in Mombasa?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Absolutely. Mombasa's growing tourism and hospitality industries are on the lookout for digital
                      marketing professionals. Local coastal media houses and emerging tech startups also offer
                      opportunities for those skilled in the latest digital marketing trends, including AI-powered
                      marketing.
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
                <strong>Duration:</strong> 4 months per level (3 levels)
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
          Digital Marketing Job Market in mombasa
        </Title>

        <Text>
          mombasa is a growing hub for creative industries in Kenya. As Kenya&apos;s capital, the ADMI offers excellent
          opportunities for Digital Marketing graduates. The creative sector in Coast is expanding rapidly, creating
          numerous job opportunities for skilled professionals.
        </Text>
        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Digital Marketing Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Digital Marketing program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/digital-marketing-certificate" size="lg" fullWidth>
            Explore Full Digital Marketing Program Details
          </Button>
        </Card>
      </div>
    </MainLayout>
  )
}

export default DigitalMarketingMombasaPage
