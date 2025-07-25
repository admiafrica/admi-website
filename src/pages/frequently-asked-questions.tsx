import React from 'react'
import { Container, Title, Accordion, Text } from '@mantine/core'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const FAQPage = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why choose ADMI for creative media training?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADMI is Kenya&apos;s leading creative media and technology training institution with 90% job placement rate. We offer practical, industry-standard courses in Film & TV, Music, Animation, Gaming, Graphic Design, and Digital Marketing with modern equipment, experienced instructors, and strong industry connections.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does ADMI cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADMI course fees vary by program and intake. For the most current fee structure, please visit https://admi.africa/student-support#fees to download the official fee schedule. We offer flexible payment plans and scholarship opportunities.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are ADMI admission requirements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADMI admission requires KCSE mean grade D+ or equivalent, passion for creative media, and basic computer literacy. No prior experience needed - we teach from basics to professional level.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which ADMI course has the best job prospects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All ADMI diploma programs have exceptional job placement rates of 85-90%. Our Graphic Design Diploma, Film & TV Production Diploma, Animation & Motion Graphics Diploma, Music Production Diploma, and Sound Engineering Diploma are all highly sought after in Kenya&apos;s rapidly growing creative economy, with graduates working at leading studios and production companies.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where is ADMI located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADMI main campus is located in Nairobi, Kenya at Kilimani area. We also have satellite centers in Mombasa, Kisumu, and partnerships across East Africa for wider accessibility.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does ADMI offer online courses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, ADMI offers hybrid learning with online and in-person components. Digital Marketing and Graphic Design have strong online options, while Film Production requires more hands-on training.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long do ADMI courses take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADMI programs vary by course. Digital Marketing has 3 levels (Certificate, Diploma, Advanced Diploma) - each 4 months. Other diploma programs are 12-18 months. All certificate programs are 4-6 months (1 semester each). We offer flexible scheduling including evening and weekend classes for working professionals.'
        }
      },
      {
        '@type': 'Question',
        name: 'What equipment does ADMI provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADMI provides state-of-the-art equipment including professional cameras, editing suites, recording studios, design computers with latest software, and industry-standard tools for hands-on learning.'
        }
      }
    ]
  }

  return (
    <MainLayout>
      <PageSEO
        title="Frequently Asked Questions - ADMI"
        description="Get answers to common questions about ADMI courses, fees, admission requirements, and career prospects in Kenya's leading digital media institute."
        canonical="https://admi.ac.ke/frequently-asked-questions"
        keywords="admi faq, digital media institute questions, course fees, admission requirements"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="xl">
          Frequently Asked Questions
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Everything you need to know about ADMI courses, fees, and admission
        </Text>

        <Accordion variant="separated">
          <Accordion.Item key="Why choose ADMI?" value="Why choose ADMI?">
            <Accordion.Control>
              <Text fw={500}>Why choose ADMI for creative media training?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                ADMI is Kenya&apos;s leading creative media and technology training institution with 90% job placement
                rate. We offer practical, industry-standard courses in Film & TV, Music, Animation, Gaming, Graphic
                Design, and Digital Marketing with modern equipment, experienced instructors, and strong industry
                connections.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item key="How much does ADMI cost?" value="How much does ADMI cost?">
            <Accordion.Control>
              <Text fw={500}>How much does ADMI cost?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                ADMI course fees vary by program and intake. For the most current fee structure, please visit{' '}
                <a href="https://admi.africa/student-support#fees" target="_blank">
                  https://admi.africa/student-support#fees
                </a>{' '}
                to download the official fee schedule. We offer flexible payment plans and scholarship opportunities.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item key="What are ADMI admission requirements?" value="What are ADMI admission requirements?">
            <Accordion.Control>
              <Text fw={500}>What are ADMI admission requirements?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                ADMI admission requires KCSE mean grade D+ or equivalent, passion for creative media, and basic computer
                literacy. No prior experience needed - we teach from basics to professional level.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item
            key="Which ADMI course has the best job prospects?"
            value="Which ADMI course has the best job prospects?"
          >
            <Accordion.Control>
              <Text fw={500}>Which ADMI course has the best job prospects?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                All ADMI diploma programs have exceptional job placement rates of 85-90%. Our Graphic Design Diploma,
                Film & TV Production Diploma, Animation & Motion Graphics Diploma, Music Production Diploma, and Sound
                Engineering Diploma are all highly sought after in Kenya's rapidly growing creative economy, with
                graduates working at leading companies like Nation Media Group, Royal Media Services, and Safaricom.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item key="Where is ADMI located?" value="Where is ADMI located?">
            <Accordion.Control>
              <Text fw={500}>Where is ADMI located?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>ADMI is located at 25 Kenyatta Avenue, 3rd Floor, Caxton House, Nairobi, Kenya.</Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item key="Does ADMI offer online courses?" value="Does ADMI offer online courses?">
            <Accordion.Control>
              <Text fw={500}>Does ADMI offer online courses?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                Yes, ADMI offers hybrid learning with online and in-person components. Digital Marketing and Graphic
                Design have strong online options, while Film Production requires more hands-on training.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item key="How long do ADMI courses take?" value="How long do ADMI courses take?">
            <Accordion.Control>
              <Text fw={500}>How long do ADMI courses take?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                ADMI diploma programs are 12-18 months. Certificate courses are 3-6 months. We offer flexible scheduling
                including evening and weekend classes for working professionals.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item key="What equipment does ADMI provide?" value="What equipment does ADMI provide?">
            <Accordion.Control>
              <Text fw={500}>What equipment does ADMI provide?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                ADMI provides state-of-the-art equipment including professional cameras, editing suites, recording
                studios, design computers with latest software, and industry-standard tools for hands-on learning.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </MainLayout>
  )
}

export default FAQPage
