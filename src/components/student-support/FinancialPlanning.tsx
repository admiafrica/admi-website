import { Anchor, Box, Accordion } from '@mantine/core'
import { ensureProtocol } from '@/utils'

import { Paragraph, Title } from '../ui'
import { CollapsibleContent } from '../shared/v3'
import { useCallback, useEffect, useState } from 'react'
import { IContentfulEntry } from '@/types'
import { CMSFAQSchema } from '@/components/shared/StructuredData'

const FEE_FAQS = [
  {
    question: 'What is the ADMI fee structure for 2026?',
    answer:
      'For the most current and accurate fee information for all ADMI programs, please visit our official student support page at https://admi.africa/student-support#fees. This page contains up-to-date fee structures for both East African and International students, payment plans, and course-specific costs.'
  },
  {
    question: 'How long are ADMI diploma programs?',
    answer:
      'ADMI diploma programs vary in duration from 4-5 semesters depending on the specific program. For detailed program duration, semester-wise costs, and payment options, please visit https://admi.africa/student-support#fees.'
  },
  {
    question: 'Are there different fees for East African and International students?',
    answer:
      'Yes, ADMI has separate fee structures for East African students (Kenya, Uganda, Tanzania, Rwanda, Burundi) and International students. For current fee information and detailed payment options, please visit https://admi.africa/student-support#fees.'
  },
  {
    question: 'Does ADMI offer payment plans?',
    answer:
      'Yes, ADMI offers flexible payment options including full payment with discounts, semester payments, and monthly installment plans. For current payment terms, discount details, and complete payment options, please visit https://admi.africa/student-support#fees or contact fee@admi.ac.ke.'
  },
  {
    question: 'What is included in ADMI course fees?',
    answer:
      "Course fees include tuition, access to labs and equipment, software licenses, workshop materials, and industry mentorship programs. For complete details about what's included and current fee structures, please visit https://admi.africa/student-support#fees. Accommodation and meals are separate."
  }
]

export default function FinancialPlanning() {
  const [kenyanFees, setKenyanFees] = useState<Array<IContentfulEntry>>([])
  const [intlFees, setIntlFees] = useState<Array<IContentfulEntry>>([])

  const fetchFeeStructure = useCallback(async () => {
    try {
      const response = await fetch('/api/v3/fee-structure')
      const data = await response.json()
      const filteredKenyan = data.filter(
        (item: IContentfulEntry) => item.fields.studentCategory == 'Kenyan & East African Students'
      )
      const filteredIntl = data.filter(
        (item: IContentfulEntry) => item.fields.studentCategory != 'Kenyan & East African Students'
      )
      setKenyanFees(filteredKenyan)
      setIntlFees(filteredIntl)
    } catch (error) {
      console.log('Error fetching courses:', error)
    }
  }, [])

  const handleDocumentDownload = async (feeDocument: any) => {
    try {
      const response = await fetch(ensureProtocol(feeDocument.url))
      if (!response.ok) throw new Error('Failed to fetch file')

      const blob = await response.blob()
      const link = document.createElement('a')

      link.href = URL.createObjectURL(blob)
      link.download = feeDocument.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  useEffect(() => {
    fetchFeeStructure()
  }, [fetchFeeStructure])

  return (
    <Box className="w-full" id="fees">
      {/* Add FAQ Schema for fee-related questions */}
      <CMSFAQSchema faqs={FEE_FAQS} />

      <CollapsibleContent
        key={'finance-plan-1'}
        title="ADMI Fee Structure 2026"
        content={
          <Box>
            {/* Downloadable fee structures */}
            <Title label="Official Fee Structure Documents" color="black" size="18px" className="mb-4" />
            <Paragraph className="mb-6 text-gray-700">
              Download the complete and official fee structure documents below. These PDFs contain detailed
              semester-wise fees, payment options, and terms for East African and International students. Course
              durations vary from 4-5 semesters depending on the program, so please refer to these updated documents for
              accurate information.
            </Paragraph>

            <div className="mb-6">
              <Title
                label="East African Students (Kenya, Uganda, Tanzania, Rwanda, Burundi)"
                color="black"
                size="16px"
              />
              <ul>
                {kenyanFees.map((fee) => (
                  <li key={fee.fields.name}>
                    <Box
                      className="my-4 cursor-pointer rounded-lg border-l-4 border-admiDarkOrange bg-gray-50 p-4 hover:bg-gray-100"
                      onClick={() => handleDocumentDownload(fee.fields.document.fields.file)}
                    >
                      <Paragraph className="text-admiDarkOrange" fontWeight={900}>
                        📄 {fee.fields.displayName}
                      </Paragraph>
                      <Paragraph className="text-sm text-gray-600">
                        Click to download complete fee structure with semester breakdown
                      </Paragraph>
                    </Box>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Title label="International Students" color="black" size="16px" />
              <ul>
                {intlFees.map((fee) => (
                  <li key={fee.fields.name}>
                    <Box
                      className="my-4 cursor-pointer rounded-lg border-l-4 border-admiDarkOrange bg-gray-50 p-4 hover:bg-gray-100"
                      onClick={() => handleDocumentDownload(fee.fields.document.fields.file)}
                    >
                      <Paragraph className="text-admiDarkOrange" fontWeight={900}>
                        📄 {fee.fields.displayName}
                      </Paragraph>
                      <Paragraph className="text-sm text-gray-600">
                        Click to download complete fee structure with semester breakdown
                      </Paragraph>
                    </Box>
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        }
      />
      <CollapsibleContent
        key={'finance-plan-2'}
        title="Payment Options & Methods"
        content={
          <Box>
            {/* Payment Plans */}
            <Title label="Flexible Payment Plans" color="black" size="20px" className="mb-4" />

            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <Paragraph fontWeight={900} size="18px" className="mb-2">
                  Full Payment
                </Paragraph>
                <ul className="list-inside list-disc text-sm">
                  <li>5% discount on total fee</li>
                  <li>Priority course selection</li>
                  <li>Free ADMI merchandise</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <Paragraph fontWeight={900} size="18px" className="mb-2">
                  Semester Payment
                </Paragraph>
                <ul className="list-inside list-disc text-sm">
                  <li>50% at start of each semester</li>
                  <li>No additional charges</li>
                  <li>Flexible payment dates</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <Paragraph fontWeight={900} size="18px" className="mb-2">
                  Monthly Plan
                </Paragraph>
                <ul className="list-inside list-disc text-sm">
                  <li>10 monthly installments</li>
                  <li>Small admin fee applies</li>
                  <li>Auto-debit available</li>
                </ul>
              </div>
            </div>

            <Paragraph fontWeight={900} size="24px">
              How to Pay Your ADMI Fees
            </Paragraph>

            <Paragraph fontWeight={900} className="mb-2 mt-6">
              Option 1: NCBA BANK
            </Paragraph>
            <Paragraph className="py-1">Account Name: Africa Digital Media Institute</Paragraph>
            <Paragraph className="py-1">Bank: NCBA Bank</Paragraph>
            <Paragraph className="py-1">Branch: Harambee Avenue</Paragraph>
            <Paragraph className="py-1">Account No (KSH): 2665570197</Paragraph>
            <Paragraph className="py-1">Account No (USD): 2665570071</Paragraph>
            <Paragraph className="py-1">Bank Code: 07000</Paragraph>
            <Paragraph className="py-1">Branch Code: 110</Paragraph>
            <Paragraph className="py-1">Swift Code: CBAFKENX</Paragraph>

            <Paragraph fontWeight={900} className="mb-2 mt-6">
              Option 2: Kingdom Bank
            </Paragraph>
            <Paragraph className="py-1">Account Name: Africa Digital Media Institute</Paragraph>
            <Paragraph className="py-1">Bank: Jamii Bora Bank</Paragraph>
            <Paragraph className="py-1">Branch: Koinange Branch</Paragraph>
            <Paragraph className="py-1">Account No:1001801622002</Paragraph>
            <Paragraph className="py-1">Bank Branch Code:02</Paragraph>
            <Paragraph className="py-1">Swift Code: CIFIKENA</Paragraph>

            <Paragraph fontWeight={900} className="mb-2 mt-6">
              Option 3: MPESA
            </Paragraph>
            <Paragraph className="py-1">Mpesa Menu</Paragraph>
            <Paragraph className="py-1">Lipa Na Mpesa</Paragraph>
            <Paragraph className="py-1">Select Paybill</Paragraph>
            <Paragraph className="py-1">Enter Business Number:836036</Paragraph>
            <Paragraph className="py-1">Enter Account Number: Admission Number/Full names</Paragraph>
            <Paragraph className="py-1">Enter Amount: XXX</Paragraph>
            <Paragraph className="py-1">Mpesa Pin: XXX</Paragraph>
            <Paragraph className="py-1">Click: Confirm Mpesa notification</Paragraph>
            <Paragraph className="py-1">Account Name: Africa Digital Media Institute</Paragraph>

            <Paragraph className="mt-6">
              NB: During payment in the bank, the person paying should ensure that the Full Names of the student is
              captured with the payment details.
            </Paragraph>
          </Box>
        }
      />
      <CollapsibleContent
        key={'finance-plan-3'}
        title="Scholarships and Grants"
        content={
          <Paragraph>
            Keep an eye on this space for future opportunities to support your educational journey at ADMI.
          </Paragraph>
        }
      />
      <CollapsibleContent
        key={'finance-plan-4'}
        title="Contact Finance Office"
        content={
          <Box>
            <Paragraph>
              You can reach out to our finance office anytime during working hours Monday - Friday for any assistance.
            </Paragraph>
            <ul>
              <li>
                <Anchor href="mailto:fee@admi.ac.ke" target="_blank">
                  <Paragraph className="mt-6" fontWeight={900}>
                    Email: fee@admi.ac.ke
                  </Paragraph>
                </Anchor>
              </li>
              <li>
                <Anchor href="tel:+254770370691" target="_blank">
                  <Paragraph className="mt-6" fontWeight={900}>
                    Call: +254 770370691
                  </Paragraph>
                </Anchor>
              </li>
            </ul>
          </Box>
        }
      />

      {/* FAQ Section for SEO */}
      <Box className="mt-8">
        <Title
          label="Frequently Asked Questions About ADMI Fees"
          color="black"
          size="24px"
          className="mb-6 text-center"
        />

        <Accordion variant="separated" radius="lg" chevronPosition="right" className="mb-8">
          {FEE_FAQS.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`faq-${index}`}
              className="border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <Accordion.Control className="hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-admiDarkOrange text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <Paragraph fontWeight={700} className="text-gray-900" size="16px">
                    {faq.question}
                  </Paragraph>
                </div>
              </Accordion.Control>
              <Accordion.Panel>
                <div className="flex items-start gap-3 pt-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    A
                  </div>
                  <Paragraph className="leading-relaxed text-gray-700">{faq.answer}</Paragraph>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Call to action */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-admiDarkOrange to-orange-600 p-8 text-center text-white">
          <Title label="Still Have Questions?" color="white" size="24px" className="mb-4" />
          <Paragraph className="mb-6 text-lg text-orange-100">
            Our finance team is here to help you understand the fee structure and payment options.
          </Paragraph>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <div className="rounded-lg bg-white px-6 py-4 shadow-lg transition-shadow hover:shadow-xl">
              <Anchor
                href="mailto:fee@admi.ac.ke"
                target="_blank"
                className="text-lg font-bold text-admiDarkOrange no-underline"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <span>Email Finance Team</span>
                </div>
              </Anchor>
            </div>

            <div className="rounded-lg bg-white px-6 py-4 shadow-lg transition-shadow hover:shadow-xl">
              <Anchor
                href="tel:+254770370691"
                target="_blank"
                className="text-lg font-bold text-admiDarkOrange no-underline"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <span>Call +254 770 370 691</span>
                </div>
              </Anchor>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  )
}
