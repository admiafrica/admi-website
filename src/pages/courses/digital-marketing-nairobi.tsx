import React from 'react'
import { Title, Text, Button, Grid, Card, List, Accordion } from '@/lib/tw-mantine'
import { MainLayout } from '@/layouts/v3/MainLayout'
import PageSEO from '../../components/shared/v3/PageSEO'

const DigitalMarketingNairobiPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Digital Marketing Course in Nairobi',
    description:
      'Professional Digital Marketing training in nairobi, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Digital Marketing Course in Nairobi - ADMI"
        description="Best Digital Marketing course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/digital-marketing-nairobi"
        keywords="digital-marketing, nairobi, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Title order={1} ta="center" mb="md">
          Digital Marketing Course in Nairobi
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Nairobi, the heart of Kenya's largest creative job market, offers unparalleled access to digital marketing
          careers, especially within tech startups, e-commerce, and corporate marketing departments of major employers
          like Safaricom. The city's vibrant influencer and video content scene provides a unique landscape for those
          skilled in social media marketing, SEO/SEM, and analytics.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Study Digital Marketing for Nairobi?
              </Title>

              <Text mb="md">
                Nairobi, the heart of Kenya's largest creative job market, offers unparalleled access to digital
                marketing careers, especially within tech startups, e-commerce, and corporate marketing departments of
                major employers like Safaricom. The city's vibrant influencer and video content scene provides a unique
                landscape for those skilled in social media marketing, SEO/SEM, and analytics.
              </Text>

              <Title order={3} mb="sm">
                Easy Access from Nairobi
              </Title>
              <Text mb="md">
                Navigate Nairobi's bustling streets seamlessly with easy matatu and bus connections, ensuring prompt
                access to classes from CBD, Westlands, Karen, Eastlands, or South B/C.
              </Text>

              <Text size="sm" c="dimmed" mb="md">
                💫 A Nairobi-based graduate recently spearheaded a successful influencer marketing campaign for a major
                e-commerce platform, showcasing the city's dynamic digital marketing potential.
              </Text>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Nairobi market</List.Item>
                <List.Item>Direct networking with Safaricom, Nation Media Group professionals</List.Item>
                <List.Item>Access to Kenya's largest creative job market</List.Item>
                <List.Item>90% job placement rate in Nairobi and surrounding areas</List.Item>
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
                Frequently Asked Questions - Nairobi Students
              </Title>
              <Accordion>
                <Accordion.Item key={0} value="faq-0">
                  <Accordion.Control>
                    How does Nairobi's tech ecosystem enhance my learning in digital marketing?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Nairobi's thriving tech ecosystem, highlighted by numerous startups and tech hubs, provides a
                      real-world laboratory for digital marketing students. You'll get to apply concepts in SEO/SEM and
                      content marketing directly to the city's dynamic online commerce and tech innovation.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value="faq-1">
                  <Accordion.Control>
                    What kind of local career opportunities can I expect after completing the course in Nairobi?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Graduates can look forward to roles in Nairobi's leading tech companies, media houses like Nation
                      Media Group, and in the marketing departments of major corporations such as Safaricom. The city's
                      growing emphasis on AI-powered marketing and e-commerce opens up numerous opportunities.
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
          Digital Marketing Job Market in nairobi
        </Title>

        <Text>
          nairobi is a growing hub for creative industries in Kenya. As Kenya&apos;s capital, the ADMI offers excellent
          opportunities for Digital Marketing graduates. The creative sector in Nairobi is expanding rapidly, creating
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

export default DigitalMarketingNairobiPage
