import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const hubs = [
  { title: 'Campus Tour', href: '/student-experience/campus' },
  { title: 'Facilities', href: '/student-experience/campus/facilities' },
  { title: 'The Labs', href: '/student-experience/campus/the-labs' },
  { title: 'Studios', href: '/student-experience/studios' },
  { title: 'Equipment', href: '/student-experience/equipment' }
]

export default function StudentLifePage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Student Life" description="Campus, facilities, labs, and studios that shape the ADMI student experience." />
      <section className="bg-[#0A1A18] px-4 py-16 text-white xl:px-0">
        <div className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/student-life</p>
          <h1 className="pt-4 font-fraunces text-[46px] font-bold leading-[1.15]">Student Experience Beyond the Classroom</h1>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-5 px-4 py-14 md:grid-cols-2 xl:px-0">
        {hubs.map((hub) => (
          <Link key={hub.href} href={hub.href} className="rounded-xl border border-[#E8E8E8] bg-white p-6 transition hover:border-[#BA2E36]">
            <h3 className="font-fraunces text-[32px] font-bold text-[#171717]">{hub.title}</h3>
            <p className="pt-4 font-nexa text-[14px] font-bold text-[#BA2E36]">Explore Section →</p>
          </Link>
        ))}
      </section>
    </MainLayout>
  )
}
