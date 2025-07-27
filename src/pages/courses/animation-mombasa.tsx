import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import PageSEO from '../../components/shared/v3/PageSEO'

const AnimationMombasaPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Animation Course in Coast',
    description:
      'Professional Animation training in mombasa, Kenya. Learn industry-relevant skills with 90% job placement rate.',
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
        title="Animation Course in Coast - ADMI"
        description="Best Animation course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/animation-mombasa"
        keywords="animation, mombasa, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Animation Course in Coast
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          In Mombasa, the animation sector is uniquely poised for growth, driven by the tourism industry's expanding need for innovative digital content. This city, with its picturesque Island, Nyali, and Bamburi areas, offers abundant inspiration for animators specializing in 2D/3D animation, character design, and VFX, catering to the hospitality and tourism brands seeking to captivate visitors with immersive experiences.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Animation in mombasa?
              </Title>

              <List spacing="sm" size="sm">
                <List.Item>Industry-relevant curriculum designed for Kenya&apos;s market</List.Item>
                <List.Item>Experienced instructors with real-world experience</List.Item>
                <List.Item>State-of-the-art facilities and equipment at our Nairobi campus</List.Item>
                <List.Item>90% job placement rate across Kenya</List.Item>
                <List.Item>Flexible payment plans available</List.Item>
                <List.Item>Career support and internship opportunities</List.Item>
                <List.Item>Accessible to students from mombasa and surrounding areas</List.Item>
              </List>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our Animation program.
                </Text>
                <Button component="a" href="/courses/animation-diploma" variant="light" fullWidth>
                  View Full Animation Course Details
                </Button>
              </Card>
            </Card>
          
            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">Frequently Asked Questions - Mombasa Students</Title>
              <Accordion>
                
                <Accordion.Item key={0} value={`faq-0`}>
                  <Accordion.Control>How does Mombasa's unique setting benefit my animation studies?</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">Mombasa's diverse cultural and coastal environment offers a rich tapestry of stories and visuals, providing animation students unique material for character design, motion graphics, and visual effects, enhancing creativity and distinctiveness in their work.</Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={`faq-1`}>
                  <Accordion.Control>Are there local career opportunities in animation within Mombasa?</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">Yes, Mombasa's animation career opportunities are growing, especially within the tourism and hospitality sectors, coastal media houses, and advertising agencies looking for engaging content to attract both local and international audiences.</Text>
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
                <strong>Level:</strong> Diploma
              </Text>
              <Text mb="sm">
                <strong>Fee:</strong>{' '}
                <a href="https://admi.africa/student-support#fees" target="_blank">
                  View current fees
                </a>
              </Text>
              <Text mb="sm">
                <strong>Location:</strong> Mombasa Campus (Central Location)</Text>
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
          Animation Opportunities in mombasa
        </Title>

        <Text>
          mombasa is an important center in Coast with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Animation program prepares you for the expanding job market. Students from mombasa are
          welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Animation Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Animation program with detailed
            curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/animation-diploma" size="lg" fullWidth>
            Explore Full Animation Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default AnimationMombasaPage
