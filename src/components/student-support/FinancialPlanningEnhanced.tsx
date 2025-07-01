import { Anchor, Box, Table } from '@mantine/core'
import { Paragraph, Title } from '../ui'
import { CollapsibleContent } from '../shared/v3'
import { useCallback, useEffect, useState } from 'react'
import { IContentfulEntry } from '@/types'
import { FAQSchema } from '@/components/shared/StructuredData'

// SEO-optimized fee structure data
const COURSE_FEES = [
  {
    program: "Diploma in Digital Marketing",
    duration: "2 years",
    totalFee: "KES 240,000",
    perYear: "KES 120,000",
    perSemester: "KES 60,000"
  },
  {
    program: "Diploma in Graphic Design",
    duration: "2 years",
    totalFee: "KES 200,000",
    perYear: "KES 100,000",
    perSemester: "KES 50,000"
  },
  {
    program: "Diploma in Film & TV Production",
    duration: "2 years",
    totalFee: "KES 300,000",
    perYear: "KES 150,000",
    perSemester: "KES 75,000"
  },
  {
    program: "Diploma in Animation & Motion Graphics",
    duration: "2 years",
    totalFee: "KES 280,000",
    perYear: "KES 140,000",
    perSemester: "KES 70,000"
  },
  {
    program: "Certificate in Photography",
    duration: "6 months",
    totalFee: "KES 80,000",
    perYear: "N/A",
    perSemester: "KES 80,000"
  }
]

const FEE_FAQS = [
  {
    question: "What is the ADMI fee structure for 2025?",
    answer: "ADMI fees range from KES 80,000 to KES 150,000 per year depending on the program. Certificate courses start at KES 80,000 while diploma programs range from KES 100,000 to KES 150,000 per year."
  },
  {
    question: "How much does the Digital Marketing course cost at ADMI?",
    answer: "The Diploma in Digital Marketing at ADMI costs KES 120,000 per year (KES 240,000 total for the 2-year program). You can pay KES 60,000 per semester or choose our flexible monthly payment plans."
  },
  {
    question: "Does ADMI offer payment plans?",
    answer: "Yes, ADMI offers flexible payment options including full payment (with 5% discount), semester payments (50% each), and monthly installment plans spread over 10 months."
  },
  {
    question: "Are there scholarships available at ADMI?",
    answer: "ADMI partners with organizations like Sanara to offer sponsored programs. We also have merit-based scholarships. Contact our admissions office for current opportunities."
  }
]

export default function FinancialPlanningEnhanced() {
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
      const response = await fetch(`https:${feeDocument.url}`)
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
      <FAQSchema faqs={FEE_FAQS} />
      
      <CollapsibleContent
        key={'finance-plan-1'}
        title="ADMI Fee Structure 2025"
        content={
          <Box>
            {/* SEO-optimized fee table */}
            <Title label="Course Fees at a Glance" color="black" size="20px" className="mb-4" />
            <Paragraph className="mb-6">
              View ADMI fee structure for all diploma and certificate programs. Our competitive fees include access to industry-standard equipment, software licenses, and mentorship programs.
            </Paragraph>
            
            <div className="overflow-x-auto mb-8">
              <Table striped highlightOnHover withBorder>
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Duration</th>
                    <th>Total Fee</th>
                    <th>Per Year</th>
                    <th>Per Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {COURSE_FEES.map((course) => (
                    <tr key={course.program}>
                      <td className="font-semibold">{course.program}</td>
                      <td>{course.duration}</td>
                      <td className="font-bold text-blue-600">{course.totalFee}</td>
                      <td>{course.perYear}</td>
                      <td>{course.perSemester}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Downloadable fee structures */}
            <Title label="Detailed Fee Documents" color="black" size="18px" className="mt-8 mb-4" />
            
            <div className="mb-6">
              <Title label="Kenyan & East African Students" color="black" size="16px" />
              <ul>
                {kenyanFees.map((fee) => (
                  <li key={fee.fields.name}>
                    <Box
                      className="my-4 cursor-pointer"
                      onClick={() => handleDocumentDownload(fee.fields.document.fields.file)}
                    >
                      <Paragraph className="text-admiDarkOrange" fontWeight={900}>
                        {fee.fields.displayName}
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
                      className="my-4 cursor-pointer"
                      onClick={() => handleDocumentDownload(fee.fields.document.fields.file)}
                    >
                      <Paragraph className="text-admiDarkOrange" fontWeight={900}>
                        {fee.fields.displayName}
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
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="border rounded-lg p-4">
                <Paragraph fontWeight={900} size="18px" className="mb-2">Full Payment</Paragraph>
                <ul className="list-disc list-inside text-sm">
                  <li>5% discount on total fee</li>
                  <li>Priority course selection</li>
                  <li>Free ADMI merchandise</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <Paragraph fontWeight={900} size="18px" className="mb-2">Semester Payment</Paragraph>
                <ul className="list-disc list-inside text-sm">
                  <li>50% at start of each semester</li>
                  <li>No additional charges</li>
                  <li>Flexible payment dates</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <Paragraph fontWeight={900} size="18px" className="mb-2">Monthly Plan</Paragraph>
                <ul className="list-disc list-inside text-sm">
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
        title="Scholarships and Financial Aid"
        content={
          <Box>
            <Paragraph className="mb-4">
              ADMI is committed to making quality education accessible. We offer various scholarship opportunities and partner with organizations to provide financial support for deserving students.
            </Paragraph>
            
            <Title label="Available Programs" color="black" size="18px" className="mb-3" />
            <ul className="list-disc list-inside mb-4">
              <li><strong>Sanara Program</strong> - Fully sponsored creative education for youth</li>
              <li><strong>Merit-Based Scholarships</strong> - For academically excellent students</li>
              <li><strong>Need-Based Support</strong> - For financially disadvantaged students</li>
              <li><strong>Industry Partnerships</strong> - Sponsored by creative industry partners</li>
            </ul>
            
            <Paragraph>
              Contact our admissions office at <Anchor href="mailto:admissions@admi.ac.ke">admissions@admi.ac.ke</Anchor> to learn about current scholarship opportunities.
            </Paragraph>
          </Box>
        }
      />
      
      <CollapsibleContent
        key={'finance-plan-4'}
        title="Contact Finance Office"
        content={
          <Box>
            <Paragraph>
              Our dedicated finance team is here to help you with fee payments, payment plans, and any financial queries. Reach out during working hours Monday - Friday.
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
              <li>
                <Paragraph className="mt-6" fontWeight={900}>
                  Office Hours: Monday - Friday, 8:00 AM - 5:00 PM
                </Paragraph>
              </li>
            </ul>
          </Box>
        }
      />
      
      {/* FAQ Section for SEO */}
      <Box className="mt-8 p-6 bg-gray-50 rounded-lg">
        <Title label="Frequently Asked Questions About ADMI Fees" color="black" size="20px" className="mb-4" />
        {FEE_FAQS.map((faq, index) => (
          <Box key={index} className="mb-4">
            <Paragraph fontWeight={900} className="mb-2">{faq.question}</Paragraph>
            <Paragraph>{faq.answer}</Paragraph>
          </Box>
        ))}
      </Box>
    </Box>
  )
}