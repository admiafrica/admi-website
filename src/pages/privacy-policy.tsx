import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const sections = [
  ['Information We Collect', 'We collect data submitted through enquiries, applications, and support channels, alongside essential analytics.'],
  ['How We Use Information', 'Data is used to process admissions, support learners, and improve service delivery.'],
  ['Security and Retention', 'We apply reasonable safeguards and keep data only as long as needed for legitimate educational and legal purposes.'],
  ['Your Rights', 'You may request access, correction, or deletion of personal information where applicable.']
]

export default function PrivacyPolicyPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Privacy Policy" description="How ADMI collects, uses, and protects personal information." />
      <div className="w-full">
        <section className="border-b border-[#E8E8E8] bg-white px-4 py-14 xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#666]">/privacy-policy</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold leading-[1.1] text-[#171717]">Privacy Policy</h1>
          </div>
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-4 py-14 xl:px-0">
          <div className="mx-auto max-w-[960px] space-y-10">
            {sections.map(([title, text]) => (
              <article key={title}>
                <h2 className="font-fraunces text-[34px] font-bold text-[#171717]">{title}</h2>
                <p className="pt-3 font-nexa text-[16px] leading-[1.7] text-[#555]">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
