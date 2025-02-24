import Image from 'next/image';
import { Box, Divider } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';

import ImageSupportLanding from '@/assets/images/student-support-landing.png';

export default function PrivacyPolicyPage() {
  return (
    <MainLayout footerBgColor="#002A23">
      <PageSEO title="Privacy Policy" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full">
          <Image
            src={ImageSupportLanding}
            placeholder="empty"
            alt="Student Support Banner"
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
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0, 42, 35, 1) 100%)',
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[40vh] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[8vh] flex flex-col sm:w-1/2">
              Í
              <Title label="Privacy Policy" color="admiShamrok" size="48px" />
            </Box>
          </Box>
        </Box>
        {/* POLICY POINTS */}
        <Box className="relative z-10 w-full bg-[#002A23] py-8">
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col">
            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Introduction" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                At Africa Digital Media Institute (ADMI), we value your privacy and are committed to safeguarding your
                personal data. This Privacy Policy outlines how we collect, use, store, and protect your information in
                compliance with the Data Protection Act, 2019, and other relevant data protection laws. By engaging with
                our services, you consent to the practices described in this policy.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Information We Collect" color="#F1FE37" />
              </Box>
              <Paragraph>We may collect the following types of personal data:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Personal Identification Information: Name, email address, phone number, and other contact details.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Academic Information: Enrollment details, academic records, and examination results.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Financial Information: Payment details, financial aid applications, and scholarship information.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Demographic Information: Age, gender, nationality, and other relevant demographic data.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Purpose of Data Collection" color="#F1FE37" />
              </Box>
              <Paragraph>We collect your personal data for the following purposes:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    To provide educational services and support.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    To manage your enrollment and academic progress.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    To process financial transactions and provide financial aid.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    To communicate important information regarding your studies and campus activities.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    To comply with legal obligations and regulatory requirements.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Data Security" color="#F1FE37" />
              </Box>
              <Paragraph>
                ADMI takes the security of your personal data seriously. We implement appropriate technical and
                organizational measures to protect your information from unauthorized access, disclosure, alteration, or
                destruction. This includes:
              </Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Secure storage of data in encrypted databases.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Restricted access to personal data only to authorized personnel who require it for their roles.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    Regular security assessments to identify and mitigate potential risks.
                  </Paragraph>
                </li>
              </ul>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Data Retention" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                We will retain your personal data only for as long as necessary to fulfill the purposes outlined in this
                policy or as required by law. Once your data is no longer needed, we will securely delete or anonymize
                it to prevent unauthorized access.
              </Paragraph>
            </Box>
            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Sharing Your Information" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                We do not sell, trade, or otherwise transfer your personal data to outside parties without your explicit
                consent, except as required by law or to trusted third parties who assist us in operating our website,
                conducting our business, or servicing you, so long as those parties agree to keep this information
                confidential.
              </Paragraph>
            </Box>
            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Your Rights" color="#F1FE37" />
              </Box>
              <Paragraph>You have the following rights regarding your personal data:</Paragraph>
              <ul>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    The right to access your personal data.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    The right to request correction of inaccurate or incomplete data.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    The right to request deletion of your personal data under certain circumstances.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    The right to restrict or object to the processing of your personal data.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph className="py-4" fontFamily="font-nexa">
                    The right to data portability.
                  </Paragraph>
                </li>
              </ul>

              <Paragraph className="py-4" fontFamily="font-nexa">
                To exercise any of these rights, please contact our Data Protection Officer.
              </Paragraph>
            </Box>

            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Changes to This Privacy Policy" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. We will notify you of any significant changes and encourage
                you to review this policy periodically.
              </Paragraph>
            </Box>
            <Box className="w-full px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Contact Us" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
                at:
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
                Your privacy is important to us, and we are committed to protecting your personal data while providing
                you with an exceptional educational experience.
              </Paragraph>
            </Box>
          </Box>
          <Divider mt={24} c={'admiShamrok'} opacity={'20%'} />
        </Box>
      </div>
    </MainLayout>
  );
}
