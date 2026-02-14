import { Accordion, Box } from '@mantine/core'
import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const faqItems = [
  {
    q: 'What are the admission requirements?',
    a: 'Requirements depend on programme level, but generally include KCSE or equivalent, basic digital literacy, and a completed application.'
  },
  {
    q: 'Do you offer hybrid learning options?',
    a: 'Yes. Many programmes now include hybrid delivery with practical studio sessions complemented by online learning components.'
  },
  {
    q: 'How are fees structured?',
    a: 'Fees are provided by programme and intake. You can review current fee structures and payment plans under Student Support.'
  },
  {
    q: 'Are students supported with career readiness?',
    a: 'Yes. Students receive portfolio guidance, mentorship, internship support, and employer-facing showcase opportunities.'
  },
  {
    q: 'Where is ADMI located?',
    a: 'ADMI campus is in Nairobi, with facilities, labs, and studios built for practical creative training.'
  }
]

export default function FAQPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Frequently Asked Questions"
        description="Answers to common questions about admissions, programmes, fees, and student life at ADMI."
        keywords="ADMI FAQ, admissions questions, fees, student support"
      />

      <Box className="w-full">
        <Box className="bg-[#0A3D3D] px-4 py-16 text-white xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/frequently-asked-questions</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold leading-[1.12]">Frequently Asked Questions</h1>
            <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">
              Everything prospective and current students often ask about programmes, learning modes, and student support.
            </p>
          </Box>
        </Box>

        <Box className="mx-auto w-full max-w-screen-xl px-4 py-12 xl:px-0">
          <Box className="mb-8 flex gap-2 overflow-x-auto border-b border-[#E8E8E8] pb-3">
            {['Admissions', 'Programmes', 'Fees', 'Student Life', 'Careers'].map((tab) => (
              <span key={tab} className="whitespace-nowrap rounded-full border border-[#E8E8E8] px-3 py-1 font-nexa text-[13px] font-bold text-[#555]">
                {tab}
              </span>
            ))}
          </Box>

          <Accordion variant="separated" radius="md">
            {faqItems.map((item) => (
              <Accordion.Item key={item.q} value={item.q}>
                <Accordion.Control className="font-nexa text-[16px] font-bold text-[#171717]">{item.q}</Accordion.Control>
                <Accordion.Panel>
                  <p className="font-nexa text-[15px] leading-[1.6] text-[#555]">{item.a}</p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>

        <Box className="bg-[#F9F9F9] px-4 py-16 xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl text-center">
            <h2 className="font-fraunces text-[40px] font-bold text-[#171717]">Still Have a Question?</h2>
            <p className="mx-auto max-w-[720px] pt-4 font-nexa text-[17px] text-[#555]">
              Reach out to admissions and student support for personalized guidance.
            </p>
            <Link href="/contact" className="mt-7 inline-block rounded-lg border border-[#BA2E36] px-6 py-3 font-nexa text-[15px] font-bold text-[#BA2E36] hover:bg-[#BA2E36] hover:text-white">
              Contact ADMI
            </Link>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}
