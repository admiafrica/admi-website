import Link from 'next/link'
import { Box } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const hubs = [
  {
    title: 'Campus Tour',
    summary: 'Explore the ADMI campus environment and student spaces.',
    href: '/student-experience/campus'
  },
  {
    title: 'Facilities',
    summary: 'Review classrooms, learning spaces, and support amenities.',
    href: '/student-experience/campus/facilities'
  },
  {
    title: 'The Labs',
    summary: 'See production labs, post suites, and specialist equipment zones.',
    href: '/student-experience/campus/the-labs'
  },
  {
    title: 'Studios',
    summary: 'Discover audio and video studios used in practical coursework.',
    href: '/student-experience/studios'
  },
  {
    title: 'Equipment',
    summary: 'Understand access to tools, kits, and technical resources.',
    href: '/student-experience/equipment'
  }
]

export default function StudentLifePage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Student Life"
        description="Discover student life at ADMI across campus, studios, labs, and equipment access."
        keywords="ADMI student life, campus life, labs, studios, equipment"
      />

      <Box className="bg-[#0A1A18] px-4 py-16 text-white xl:px-0">
        <Box className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/student-life</p>
          <h1 className="pt-4 font-fraunces text-[46px] font-bold leading-[1.15]">
            Student Experience Beyond the Classroom
          </h1>
          <p className="pt-4 font-nexa text-[18px] text-white/80">
            Campus, facilities, studios, and learning resources that support your creative growth.
          </p>
        </Box>
      </Box>

      <Box className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-5 px-4 py-14 md:grid-cols-2 xl:px-0">
        {hubs.map((hub) => (
          <Link
            key={hub.href}
            href={hub.href}
            className="rounded-xl border border-[#E8E8E8] bg-white p-6 transition hover:border-[#BA2E36]"
          >
            <h3 className="font-fraunces text-[30px] font-bold text-[#171717]">{hub.title}</h3>
            <p className="pt-2 font-nexa text-[16px] text-[#555]">{hub.summary}</p>
            <p className="pt-4 font-nexa text-[14px] font-bold text-[#BA2E36]">Explore Section →</p>
          </Link>
        ))}
      </Box>
    </MainLayout>
  )
}
