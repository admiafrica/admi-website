import { Box } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const sections = [
  {
    title: 'Information We Collect',
    text: 'We collect information you provide through enquiry, application, contact, and student support forms, as well as basic analytics data used to improve our services.'
  },
  {
    title: 'How We Use Information',
    text: 'Your information is used to process enquiries, support admissions, deliver student services, and communicate relevant programme and institutional updates.'
  },
  {
    title: 'Data Sharing',
    text: 'We do not sell personal data. Information may be shared with trusted service providers and partners only where necessary to deliver our services.'
  },
  {
    title: 'Security and Retention',
    text: 'We apply reasonable technical and organizational safeguards. Data is retained only as long as required for legitimate educational, operational, and legal purposes.'
  },
  {
    title: 'Your Rights',
    text: 'You may request access, correction, or deletion of your personal data, subject to applicable legal and institutional obligations.'
  }
]

export default function PrivacyPolicyPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Privacy Policy"
        description="How ADMI collects, uses, stores, and protects personal information."
        keywords="ADMI privacy policy, data protection, personal information"
      />

      <Box className="w-full">
        <Box className="border-b border-[#E8E8E8] bg-white px-4 py-14 xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#666]">/privacy-policy</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold leading-[1.1] text-[#171717]">Privacy Policy</h1>
            <p className="max-w-[860px] pt-4 font-nexa text-[17px] text-[#555]">
              This page explains how Africa Digital Media Institute handles personal information across our website,
              admissions workflows, and student support processes.
            </p>
          </Box>
        </Box>

        <Box className="mx-auto w-full max-w-screen-xl px-4 py-14 xl:px-0">
          <Box className="mx-auto max-w-[960px] space-y-10">
            {sections.map((section) => (
              <Box key={section.title}>
                <h2 className="font-fraunces text-[34px] font-bold text-[#171717]">{section.title}</h2>
                <p className="pt-3 font-nexa text-[16px] leading-[1.7] text-[#555]">{section.text}</p>
              </Box>
            ))}

            <Box className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-6">
              <h3 className="font-fraunces text-[30px] font-bold text-[#171717]">Contact</h3>
              <p className="pt-2 font-nexa text-[15px] text-[#555]">
                For privacy-related requests, contact us at <a className="font-bold text-[#BA2E36]" href="mailto:admissions@admi.ac.ke">admissions@admi.ac.ke</a>.
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}
