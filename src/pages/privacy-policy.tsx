import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type { PolicySection } from '@/types/privacy-policy'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SECTIONS: PolicySection[] = [
  {
    title: '1. Data Collection',
    body: 'We collect personal information that you voluntarily provide when you apply for admission, enquire about our programmes, or interact with our website. This includes your name, email address, phone number, academic records, and other relevant details necessary to process your application and provide our services.'
  },
  {
    title: '2. Use of Information',
    body: 'The information we collect is used to process admissions applications, communicate with prospective and current students, improve our educational services, send relevant updates about programmes and events, and comply with applicable legal and regulatory requirements.'
  },
  {
    title: '3. Cookies',
    body: 'Our website uses cookies to enhance your browsing experience, analyse site traffic, and personalise content. You may manage your cookie preferences through your browser settings. By continuing to use our website, you consent to the use of cookies as described in this policy.'
  },
  {
    title: '4. Third-Party Services',
    body: 'We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or serving our students. These parties are contractually obligated to keep your information confidential and use it only for the purposes specified.'
  },
  {
    title: '5. Data Security',
    body: 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.'
  },
  {
    title: '6. Your Rights',
    body: 'You have the right to access, correct, or delete your personal data held by ADMI. You may also request restrictions on processing or object to processing in certain circumstances. To exercise these rights, please contact our data protection officer using the details provided below.'
  },
  {
    title: '7. Contact',
    body: 'If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us at admissions@admi.ac.ke or call +254 741 132 751. You may also visit our campus at ADMI, Nairobi, Kenya.'
  }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PrivacyPolicyPage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Privacy Policy | ADMI"
        description="How ADMI collects, uses, and protects personal information."
      />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-[#0F2E2A] via-[#0A1F1D] to-[#091110] px-4 py-20 text-center text-white xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex items-center justify-center gap-2.5">
              <span className="h-[3px] w-8 bg-secondary" />
              <span className="font-proxima text-[13px] font-semibold uppercase tracking-[2px] text-secondary">LEGAL</span>
            </div>
            <h1 className="mt-5 font-proxima text-[48px] font-bold">Privacy Policy</h1>
            <p className="mt-3 font-proxima text-[16px] text-[#B7D8CF]">Last updated: February 2026</p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="bg-white px-4 py-16 xl:px-20">
          <div className="mx-auto max-w-[960px] space-y-10">
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
