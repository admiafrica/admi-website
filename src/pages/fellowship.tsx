import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function FellowshipPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Fellowship" description="Fellowship programme opportunities at ADMI." />
      <div className="w-full">
        <section className="bg-[#0A3D3D] px-4 py-16 text-white xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/fellowship</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold">Fellowship</h1>
          </div>
        </section>
        <section className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-4 px-4 py-14 md:grid-cols-3 xl:px-0">
          {['What is Fellowship', 'Programme Benefits', 'How to Apply'].map((item) => (
            <article key={item} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
              <h2 className="font-fraunces text-[30px] font-bold text-[#171717]">{item}</h2>
            </article>
          ))}
        </section>
      </div>
    </MainLayout>
  )
}
