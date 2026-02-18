import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Section {
  title: string
  body: string
}

const SECTIONS: Section[] = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing and using the ADMI website or submitting any forms on our platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.'
  },
  {
    title: '2. Enquiry Form Submissions',
    body: 'When you submit an enquiry form, you consent to being contacted by an ADMI admissions advisor via phone, email, or WhatsApp regarding the programme(s) you expressed interest in. You understand that submitting an enquiry does not constitute an application or guarantee admission. Our team will reach out within 24-48 hours to provide information and guide you through the application process.'
  },
  {
    title: '3. Accuracy of Information',
    body: 'You agree to provide accurate, current, and complete information when submitting enquiry forms or applications. Providing false or misleading information may result in rejection of your application or dismissal from any programme.'
  },
  {
    title: '4. Communication Consent',
    body: 'By submitting your contact details, you consent to receive communications from ADMI including programme information, intake updates, scholarship opportunities, and marketing materials. You may opt out of marketing communications at any time by contacting us at admissions@admi.ac.ke.'
  },
  {
    title: '5. Programme Information',
    body: 'While we strive to ensure all programme information on our website is accurate and up-to-date, ADMI reserves the right to modify programme content, fees, schedules, and availability without prior notice. Official programme details will be confirmed during the application process.'
  },
  {
    title: '6. Fees and Payments',
    body: 'Programme fees are as stated on our website and official fee schedules. ADMI offers flexible payment plans for eligible students. All fees are quoted in Kenyan Shillings unless otherwise stated. Fee structures are subject to change for future intakes.'
  },
  {
    title: '7. Intellectual Property',
    body: 'All content on this website, including text, graphics, logos, images, and software, is the property of ADMI or its content suppliers and is protected by Kenyan and international copyright laws. You may not reproduce, distribute, or create derivative works without express written permission.'
  },
  {
    title: '8. Limitation of Liability',
    body: 'ADMI shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services. We do not guarantee uninterrupted access to our website and reserve the right to modify or discontinue services without notice.'
  },
  {
    title: '9. Governing Law',
    body: 'These Terms and Conditions are governed by the laws of Kenya. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.'
  },
  {
    title: '10. Contact',
    body: 'If you have any questions about these Terms and Conditions, please contact us at admissions@admi.ac.ke or call +254 741 132 751. You may also visit our campus at ADMI, Nairobi, Kenya.'
  }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TermsAndConditionsPage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Terms and Conditions | ADMI"
        description="Terms and conditions for using the ADMI website and submitting enquiries."
      />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="section-padding bg-gradient-to-br from-[#0F2E2A] via-[#0A1F1D] to-[#091110] text-center text-white">
          <div className="section-container">
            <div className="flex items-center justify-center gap-2.5">
              <span className="h-[3px] w-8 bg-secondary" />
              <span className="font-proxima text-[13px] font-semibold uppercase tracking-[2px] text-secondary">
                LEGAL
              </span>
            </div>
            <h1 className="mt-5 font-proxima text-[48px] font-bold">Terms and Conditions</h1>
            <p className="mt-3 font-proxima text-[16px] text-[#B7D8CF]">Last updated: February 2026</p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[960px] space-y-10 px-6 md:px-8">
            {SECTIONS.map((section) => (
              <article key={section.title}>
                <h2 className="font-proxima text-[24px] font-bold text-admi-black">{section.title}</h2>
                <p className="mt-3 font-proxima text-[15px] leading-[1.7] text-[#555]">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
