import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function AccommodationPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Accommodation" description="Accommodation support and housing guidance for ADMI students." />
      <section className="bg-white">
        <div className="relative h-[480px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-xl flex-col justify-end px-4 pb-14 text-white xl:px-0">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/accommodation</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold">Accommodation</h1>
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-4 px-4 py-14 md:grid-cols-3 xl:px-0">
          {['Partner Residences', 'What’s Included', 'How to Book'].map((item) => (
            <article key={item} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
              <h2 className="font-fraunces text-[30px] font-bold text-[#171717]">{item}</h2>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  )
}
