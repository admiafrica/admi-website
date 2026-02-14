import React from 'react'
import { Container, Title, Text, Button, Grid, Card, List, Accordion } from '@/lib/tw-mantine'
import PageSEO from '../../components/shared/v3/PageSEO'

const SoundEngineeringMombasaPage = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Sound Engineering Course in Coast',
    description:
      'Professional Sound Engineering training in mombasa, Kenya. Master audio production, mixing, mastering, and live sound engineering.',
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
        title="Sound Engineering Course in Coast - ADMI"
        description="Best Sound Engineering course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support."
        canonical="https://admi.ac.ke/courses/sound-engineering-mombasa"
        keywords="sound-engineering, mombasa, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          Sound Engineering Course in Coast
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Mombasa's vibrant tourism sector and its burgeoning media houses offer unique opportunities for sound
          engineers. The city's demand for high-quality digital content in its hospitality and tourism industries,
          coupled with an increasing interest in immersive audio experiences, positions Mombasa as a thriving hub for
          audio professionals specializing in live sound, studio recording, and sound design.
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Choose Sound Engineering in mombasa?
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
                  Get detailed curriculum, admission requirements, and enrollment information for our Sound Engineering
                  program.
                </Text>
                <Button component="a" href="/courses/sound-engineering-diploma" variant="light" fullWidth>
                  View Full Sound Engineering Course Details
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
                    Can I find internship opportunities in sound engineering within Mombasa’s tourism sector?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Absolutely! Mombasa's booming tourism industry offers numerous internship opportunities for sound
                      engineering students, especially within hospitality brands looking to enhance their on-site
                      entertainment and immersive tour experiences through superior sound design.
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={1} value={'faq-1'}>
                  <Accordion.Control>
                    Are there local media houses in Mombasa that employ sound engineers?
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">
                      Yes, Mombasa is home to several coastal media houses that are consistently on the lookout for
                      talented sound engineers to support broadcast audio, podcast engineering, and streaming quality
                      improvements in line with current trends.
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
                <strong>Duration:</strong> 12-18 months
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
                <strong>Location:</strong> ADMI Nairobi Campus
              </Text>
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
          Sound Engineering Opportunities in mombasa
        </Title>

        <Text>
          mombasa is an important center in Coast with growing opportunities in Kenya&apos;s creative and digital
          industries. ADMI&apos;s Sound Engineering program prepares you for the expanding job market. Students from
          mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue.
        </Text>

        <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            🎯 Ready to Start Your Sound Engineering Journey?
          </Title>
          <Text mb="md">
            Take the next step towards your creative career. Explore our comprehensive Sound Engineering program with
            detailed curriculum, career outcomes, and admission process.
          </Text>
          <Button component="a" href="/courses/sound-engineering-diploma" size="lg" fullWidth>
            Explore Full Sound Engineering Program Details
          </Button>
        </Card>
      </Container>
    </>
  )
}

export default SoundEngineeringMombasaPage
