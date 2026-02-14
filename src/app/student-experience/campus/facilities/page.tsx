import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function StudentExperienceFacilitiesPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Student Experience: Facilities" description="Campus facilities and learning spaces at ADMI." />

      <div className="bg-white">
        <div className="relative h-[520px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-xl flex-col justify-end px-4 pb-14 text-white xl:px-0">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">
              /student-experience/campus/facilities
            </p>
            <h1 className="pt-4 font-proxima text-[48px] font-bold leading-[1.1]">Campus Facilities</h1>
            <p className="max-w-[840px] pt-4 font-nexa text-[18px] text-white/85">
              Purpose-built spaces for studio work, collaborative projects, and creative experimentation.
            </p>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-5 px-4 py-14 md:grid-cols-2 xl:px-0">
          {['Studios Section', 'Labs Section', 'Equipment Section', 'The Space Section'].map((item) => (
            <div key={item} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
              <h3 className="font-proxima text-[30px] font-bold text-[#171717]">{item}</h3>
              <p className="pt-2 font-nexa text-[15px] text-[#555]">
                Detailed operational overview and student usage patterns for this facility area.
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
