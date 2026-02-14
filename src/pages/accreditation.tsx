import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function AccreditationPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Accreditation" description="Institutional accreditation and quality frameworks at ADMI." />
      <div className="w-full">
        <section className="bg-[#0A0A0A] px-4 py-16 text-white xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/accreditation</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold">Accreditation</h1>
          </div>
        </section>
        <section className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-4 px-4 py-14 md:grid-cols-3 xl:px-0">
          {['Primary Accreditations', 'Quality Framework', 'What This Means'].map((item) => (
            <article key={item} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
              <h2 className="font-fraunces text-[30px] font-bold text-[#171717]">{item}</h2>
            </article>
          ))}
        </section>
      </div>
    </MainLayout>
  )
}
