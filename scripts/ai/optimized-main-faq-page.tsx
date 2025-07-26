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
          text: 'Yes, ADMI is accredited by Pearson, which ensures that our qualifications are recognized globally. This accreditation affirms that our curriculum meets international standards, providing our students with a competitive edge in the global job market.'
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
        description="Get answers to the most common questions about ADMI courses, fees, admission requirements, and career prospects based on what prospective students search for most."
        canonical="https://admi.africa/frequently-asked-questions"
        keywords="admi faq, digital media institute questions, course fees, admission requirements, job opportunities, career prospects, job placement, salary, income, career prospects, admission requirements, course prerequisites, course fees, payment plans, tuition, course duration, study period, time, accreditation, international recognition, location, Nairobi campus, address, scholarships, financial aid, tuition assistance"
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
          Answers to the most common questions from prospective ADMI students
        </Text>

        <Accordion variant="separated">
          <Accordion.Item
            key="What job opportunities are available for ADMI graduates?"
            value="What job opportunities are available for ADMI graduates?"
          >
            <Accordion.Control>
              <Text fw={500}>What job opportunities are available for ADMI graduates?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                ADMI graduates have a variety of job opportunities available across different creative industries,
                including graphic design, film production, digital marketing, and music production. Our strong industry
                partnerships and a robust job placement rate in Kenya ensure our students have access to employment
                opportunities such as graphic designers, film editors, digital marketers, and music producers.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item
            key="What are the salary prospects for ADMI graduates in Kenya?"
            value="What are the salary prospects for ADMI graduates in Kenya?"
          >
            <Accordion.Control>
              <Text fw={500}>What are the salary prospects for ADMI graduates in Kenya?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                The salary prospects for ADMI graduates vary depending on the specific field. For instance, graphic
                designers in Kenya can expect competitive salaries that align with industry standards. Similarly,
                digital marketing and music production professionals have lucrative salary prospects, reflecting the
                growing demand for skilled professionals in these areas.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item
            key="What are the admission requirements for ADMI courses?"
            value="What are the admission requirements for ADMI courses?"
          >
            <Accordion.Control>
              <Text fw={500}>What are the admission requirements for ADMI courses?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                Admission requirements at ADMI vary depending on the course. Generally, applicants should have completed
                high school with good grades. Specific courses like Film Production and Sound Engineering may have
                additional requirements. Please visit our website or contact our admissions office for detailed
                information on each course's requirements.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item
            key="How much does it cost to study a course at ADMI?"
            value="How much does it cost to study a course at ADMI?"
          >
            <Accordion.Control>
              <Text fw={500}>How much does it cost to study a course at ADMI?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                The fees for courses at ADMI vary. For instance, the music production course has specific fees that
                cover tuition and materials. We offer flexible payment plans, including installment options, to make
                education accessible to everyone. Contact our finance office for detailed fee structures and payment
                plans.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item key="What is the duration of ADMI courses?" value="What is the duration of ADMI courses?">
            <Accordion.Control>
              <Text fw={500}>What is the duration of ADMI courses?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                The duration of courses at ADMI varies. For example, our graphic design course typically lasts for a
                specified period that allows students to gain comprehensive skills. For detailed information on the
                duration of specific courses, please refer to the course descriptions on our website.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item
            key="Is ADMI accredited and recognized internationally?"
            value="Is ADMI accredited and recognized internationally?"
          >
            <Accordion.Control>
              <Text fw={500}>Is ADMI accredited and recognized internationally?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                Yes, ADMI is accredited by Pearson, which ensures that our qualifications are recognized globally. This
                accreditation affirms that our curriculum meets international standards, providing our students with a
                competitive edge in the global job market.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item key="Where is ADMI located in Nairobi?" value="Where is ADMI located in Nairobi?">
            <Accordion.Control>
              <Text fw={500}>Where is ADMI located in Nairobi?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                ADMI is centrally located in Nairobi, making it easily accessible to students from all parts of the
                city. Our campus is well-equipped with modern facilities to provide a conducive learning environment for
                all our programs.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item
            key="Does ADMI offer scholarships or financial aid?"
            value="Does ADMI offer scholarships or financial aid?"
          >
            <Accordion.Control>
              <Text fw={500}>Does ADMI offer scholarships or financial aid?</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                Yes, ADMI offers scholarships and financial aid to deserving students based on merit and need. We strive
                to support talented individuals to achieve their academic goals. Visit our website or contact our
                admissions office for more information on how to apply for scholarships.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </MainLayout>
  )
}

export default FAQPage
