import Image from 'next/image'
import { Box, Divider } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title } from '@/components/ui'
import { PageSEO } from '@/components/shared/v3'

import ImageSupportLanding from '@/assets/images/student-support-landing.png'

export default function TermsAndConditionsPage() {
  return (
    <MainLayout footerBgColor="#002A23">
      <PageSEO
        title="Terms and Conditions"
        description="Read ADMI's terms and conditions governing the use of our services, website, and educational programmes. Understand your rights and responsibilities as a student."
        keywords="ADMI terms and conditions, student agreement, enrollment terms, academic policies, student responsibilities, service terms, educational institution terms"
      />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full">
          <Image
            src={ImageSupportLanding}
            placeholder="empty"
            alt="Terms and Conditions Banner"
            fill
            priority
            className="absolute inset-0 z-0"
            style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
          />
          <Box className="" bg={'#F5FFFD'}></Box>
          {/* Radial Gradient Overlay */}
          <div
            className="z-5 absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0, 42, 35, 1) 100%)'
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[40vh] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[8vh] flex flex-col sm:w-1/2">
              <Title label="Terms and Conditions" color="admiShamrok" size="48px" />
            </Box>
          </Box>
        </Box>
        {/* TERMS CONTENT */}
        <Box className="relative z-10 w-full bg-[#002A23] py-8">
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col">
            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Introduction" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                Welcome to Africa Digital Media Institute (ADMI). These Terms and Conditions govern your use of our
                website, services, and educational programmes. By accessing our website or enrolling in our programmes,
                you agree to be bound by these terms. Please read them carefully before proceeding.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Acceptance of Terms" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                By using our website, submitting an application, or enrolling in any of our programmes, you acknowledge
                that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree
                with any part of these terms, you should not use our services or enroll in our programmes.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Enrollment and Admission" color="#F1FE37" />
              </Box>
              <Paragraph>By applying to ADMI, you agree to the following:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    All information provided in your application is accurate, complete, and truthful.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Admission is subject to meeting our entry requirements and availability of places.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    ADMI reserves the right to verify all information provided and to withdraw an offer of admission if
                    any information is found to be false or misleading.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Acceptance of an offer of admission constitutes a binding agreement to these Terms and Conditions.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Fees and Payment" color="#F1FE37" />
              </Box>
              <Paragraph>The following terms apply to fees and payments:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Tuition fees must be paid in full or according to an approved payment plan before the commencement
                    of each term.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Registration fees and application fees are non-refundable.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    ADMI reserves the right to adjust fees with reasonable notice before the start of a new academic
                    year.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Students with outstanding fees may be denied access to classes, examinations, or academic records
                    until all dues are cleared.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Payment plans must be agreed upon in writing with the finance department before the start of the
                    term.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Refund Policy" color="#F1FE37" />
              </Box>
              <Paragraph>Refunds are subject to the following conditions:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Withdrawal before the start of the programme: A refund of tuition fees may be granted, minus
                    administrative charges.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Withdrawal within the first two weeks: A partial refund may be considered on a case-by-case basis.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Withdrawal after two weeks: No refund will be provided.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    All refund requests must be submitted in writing to the Admissions Office.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Academic Policies" color="#F1FE37" />
              </Box>
              <Paragraph>Students are expected to adhere to the following academic standards:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Maintain a minimum attendance of 80% in all classes and practical sessions.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Complete all assignments, projects, and examinations by the specified deadlines.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Uphold academic integrity by avoiding plagiarism, cheating, or any form of academic dishonesty.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Academic misconduct may result in disciplinary action, including suspension or expulsion.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Code of Conduct" color="#F1FE37" />
              </Box>
              <Paragraph>All students must adhere to the ADMI Code of Conduct, which includes:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Treating all staff, faculty, and fellow students with respect and dignity.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Maintaining a safe and inclusive learning environment free from harassment, discrimination, or
                    bullying.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Taking care of ADMI property, equipment, and facilities.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Complying with all health and safety regulations on campus.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Refraining from the use of illegal substances on campus premises.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Intellectual Property" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                All course materials, content, and resources provided by ADMI are the intellectual property of ADMI or
                its licensors. Students may not reproduce, distribute, or share these materials without prior written
                consent. Student work created during the programme remains the intellectual property of the student,
                though ADMI reserves the right to use such work for promotional and educational purposes with
                appropriate credit.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Equipment and Facilities" color="#F1FE37" />
              </Box>
              <Paragraph>When using ADMI equipment and facilities, students agree to:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Use all equipment responsibly and only for educational purposes.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Report any damage or malfunction immediately to the relevant department.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Be liable for any damage caused through negligence or misuse.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Follow all booking procedures and return equipment on time.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Website Use" color="#F1FE37" />
              </Box>
              <Paragraph>When using the ADMI website, you agree to:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Use the website only for lawful purposes and in accordance with these Terms.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Not attempt to gain unauthorized access to any part of the website or its systems.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Not use the website to transmit any harmful code, viruses, or malicious content.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Respect the intellectual property rights of ADMI and third parties.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Limitation of Liability" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                ADMI shall not be liable for any indirect, incidental, special, or consequential damages arising out of
                or in connection with your use of our services or website. Our total liability shall not exceed the
                amount of fees paid by you for the relevant programme or service. ADMI is not responsible for any loss
                of personal belongings on campus premises.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Disciplinary Procedures" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                Violation of these Terms and Conditions or the ADMI Code of Conduct may result in disciplinary action,
                which may include warnings, suspension, or expulsion. All disciplinary matters will be handled in
                accordance with ADMI&apos;s disciplinary procedures, and students will have the right to a fair hearing.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Changes to Terms" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                ADMI reserves the right to modify these Terms and Conditions at any time. Any changes will be posted on
                our website, and continued use of our services after such changes constitutes acceptance of the modified
                terms. We encourage you to review these Terms periodically.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Governing Law" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of the
                Republic of Kenya. Any disputes arising from these terms shall be subject to the exclusive jurisdiction
                of the courts of Kenya.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Contact Us" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                If you have any questions or concerns about these Terms and Conditions, please contact us at:
              </Paragraph>

              <Paragraph className="py-4" fontFamily="font-nexa" fontWeight={900}>
                Africa Digital Media Institute (ADMI)
              </Paragraph>
              <Paragraph className="py-4" fontFamily="font-nexa">
                Email: info@admi.ac.ke
              </Paragraph>
              <Paragraph className="py-4" fontFamily="font-nexa">
                Phone: +254 (0) 706 349696
              </Paragraph>
              <Paragraph className="py-4" fontFamily="font-nexa">
                Physical Address: Kunste Complex, Peponi Road, Westlands, Nairobi, Kenya
              </Paragraph>

              <Paragraph className="py-4" fontFamily="font-nexa">
                By using our website or enrolling in our programmes, you confirm that you have read and understood these
                Terms and Conditions and agree to be bound by them.
              </Paragraph>

              <Paragraph className="py-4 italic" fontFamily="font-nexa">
                Last updated: January 2026
              </Paragraph>
            </Box>
          </Box>
          <Divider mt={24} c={'admiShamrok'} opacity={'20%'} />
        </Box>
      </div>
    </MainLayout>
  )
}
