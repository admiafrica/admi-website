import Link from 'next/link'
import { Box } from '@/lib/tw-mantine'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const sections = [
  {
    title: 'Facilities',
    summary: 'Classrooms, student spaces, and support amenities designed for practical learning.',
    href: '/student-experience/campus/facilities'
  },
  {
    title: 'The Labs',
    summary: 'Specialized creative labs with production-ready software and collaborative workflows.',
    href: '/student-experience/campus/the-labs'
  },
  {
    title: 'Studios',
    summary: 'Professional studio environments for audio, video, and project execution.',
    href: '/student-experience/studios'
  },
  {
    title: 'Equipment',
    summary: 'Access to industry-standard tools and kits used across ADMI programmes.',
    href: '/student-experience/equipment'
  }
]

export default function StudentExperienceCampusPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Student Experience: Campus"
        description="Explore ADMI campus experience, from facilities and labs to studios and equipment access."
      />

      <Box className="bg-[#0A1A18] px-4 py-16 text-white xl:px-0">
        <Box className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/student-experience/campus</p>
          <h1 className="pt-4 font-fraunces text-[48px] font-bold leading-[1.1]">Campus Experience at ADMI</h1>
          <p className="max-w-[860px] pt-4 font-nexa text-[18px] text-white/85">
            Discover the learning spaces where creative ideas are developed into professional outcomes.
          </p>
        </Box>
      </Box>

      <Box className="border-y border-[#E8E8E8] bg-white">
        <Box className="mx-auto flex w-full max-w-screen-xl items-center gap-2 px-4 xl:px-0">
          {['#facilities', '#labs', '#studios', '#equipment'].map((tab, idx) => (
            <a
              key={tab}
              href={tab}
              className={`px-4 py-4 font-nexa text-[14px] font-bold ${idx === 0 ? 'border-b-[3px] border-[#BA2E36] text-[#171717]' : 'text-[#666]'}`}
            >
              {tab}
            </a>
          ))}
        </Box>
      </Box>

      <Box className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-5 px-4 py-14 md:grid-cols-2 xl:px-0">
        {sections.map((section, idx) => (
          <Link
            key={section.href}
            href={section.href}
            id={idx === 0 ? 'facilities' : idx === 1 ? 'labs' : idx === 2 ? 'studios' : 'equipment'}
            className="rounded-xl border border-[#E8E8E8] bg-white p-6 transition hover:border-[#BA2E36]"
          >
            <h3 className="font-fraunces text-[32px] font-bold text-[#171717]">{section.title}</h3>
            <p className="pt-2 font-nexa text-[16px] text-[#555]">{section.summary}</p>
            <p className="pt-4 font-nexa text-[14px] font-bold text-[#BA2E36]">Explore →</p>
          </Link>
        ))}
      </Box>
    </MainLayout>
  )
}
