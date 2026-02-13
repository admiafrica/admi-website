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
        name: 'What job opportunities are available for ADMI graduates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADMI graduates have a variety of job opportunities available across different creative industries, including graphic design, film production, digital marketing, and music production. Our strong industry partnerships and a robust job placement rate in Kenya ensure our students have access to employment opportunities such as graphic designers, film editors, digital marketers, and music producers.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the salary prospects for ADMI graduates in Kenya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The salary prospects for ADMI graduates vary depending on the specific field. For instance, graphic designers in Kenya can expect competitive salaries that align with industry standards. Similarly, digital marketing and music production professionals have lucrative salary prospects, reflecting the growing demand for skilled professionals in these areas.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the admission requirements for ADMI courses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Admission requirements at ADMI vary depending on the course. Generally, applicants should have completed high school with good grades. Specific courses like Film Production and Sound Engineering may have additional requirements. Please visit our website or contact our admissions office for detailed information on each course's requirements."
        }
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to study a course at ADMI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The fees for courses at ADMI vary. For instance, the music production course has specific fees that cover tuition and materials. We offer flexible payment plans, including installment options, to make education accessible to everyone. Contact our finance office for detailed fee structures and payment plans.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the duration of ADMI courses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The duration of courses at ADMI varies. For example, our graphic design course typically lasts for a specified period that allows students to gain comprehensive skills. For detailed information on the duration of specific courses, please refer to the course descriptions on our website.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is ADMI accredited and recognized internationally?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, ADMI is accredited through Woolf University (EU) and registered with TVETA Kenya, ensuring our qualifications are recognised internationally. This accreditation affirms that our curriculum meets international standards, providing our students with a competitive edge in the global job market.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where is ADMI located in Nairobi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ADMI is centrally located in Nairobi, making it easily accessible to students from all parts of the city. Our campus is well-equipped with modern facilities to provide a conducive learning environment for all our programs.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does ADMI offer scholarships or financial aid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, ADMI offers scholarships and financial aid to deserving students based on merit and need. We strive to support talented individuals to achieve their academic goals. Visit our website or contact our admissions office for more information on how to apply for scholarships.'
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
