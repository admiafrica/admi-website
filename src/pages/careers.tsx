import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const openings = [
  { title: 'Creative Media Lecturer', type: 'Full-time', location: 'Nairobi Campus' },
  { title: 'Student Success Advisor', type: 'Full-time', location: 'Nairobi Campus' },
  { title: 'Studio Operations Assistant', type: 'Contract', location: 'Hybrid + Campus' }
]

export default function CareersPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Careers" description="Work with ADMI and help shape creative education." />
      <div className="w-full">
        <section className="relative h-[540px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1516005492235-7a8d3a652dca?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="section-container relative z-10 flex h-full flex-col justify-end pb-14 text-white">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/careers</p>
            <h1 className="pt-4 font-proxima text-[52px] font-bold leading-[1.1]">Work With Us at ADMI</h1>
            <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">
              Join a mission-driven team developing the next generation of African creative professionals.
            </p>
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="section-container">
            <h2 className="font-proxima text-[40px] font-bold text-[#171717]">Open Positions</h2>
            <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3">
              {openings.map((r) => (
                <article key={r.title} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
                  <p className="font-nexa text-[12px] uppercase tracking-[0.1em] text-brand-red">{r.type}</p>
                  <h3 className="pt-1 font-proxima text-[30px] font-bold leading-[1.2] text-[#171717]">{r.title}</h3>
                  <p className="pt-2 font-nexa text-[14px] text-[#666]">{r.location}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
