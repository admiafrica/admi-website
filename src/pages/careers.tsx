import { Box } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { Paragraph, Title } from '@/components/ui'

const openings = [
  {
    title: 'Creative Media Lecturer',
    type: 'Full-time',
    location: 'Nairobi Campus',
    summary: 'Lead practical modules, mentor student projects, and contribute to curriculum excellence.'
  },
  {
    title: 'Student Success Advisor',
    type: 'Full-time',
    location: 'Nairobi Campus',
    summary: 'Support learners across progression, retention, and career transition milestones.'
  },
  {
    title: 'Studio Operations Assistant',
    type: 'Contract',
    location: 'Hybrid + Campus',
    summary: 'Coordinate studio schedules, equipment readiness, and technical support workflows.'
  }
]

export default function CareersPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Careers"
        description="Join ADMI and help shape the future of creative education through teaching, mentoring, and institutional excellence."
        keywords="ADMI careers, teaching jobs, creative education jobs, faculty roles"
      />

      <Box className="w-full">
        <Box className="relative h-[540px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1516005492235-7a8d3a652dca?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <Box className="absolute inset-0 bg-black/60" />
          <Box className="relative z-10 mx-auto flex h-full w-full max-w-screen-xl flex-col justify-end px-4 pb-14 text-white xl:px-0">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/careers</p>
            <h1 className="pt-4 font-fraunces text-[52px] font-bold leading-[1.1]">Work With Us at ADMI</h1>
            <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">
              Join a mission-driven team developing the next generation of African creative professionals.
            </p>
          </Box>
        </Box>

        <Box className="bg-[#F9F9F9] py-16">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Faculty Awards & Recognition" color="black" size="40px" />
            <Box className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3">
              {['Teaching Excellence', 'Industry Impact', 'Curriculum Innovation'].map((item) => (
                <Box key={item} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
                  <h3 className="font-fraunces text-[28px] font-bold text-[#171717]">{item}</h3>
                  <p className="pt-2 font-nexa text-[16px] text-[#555]">
                    We celebrate educators and teams who improve learner outcomes through practical, industry-linked learning.
                  </p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="bg-white py-16">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Open Positions" color="black" size="40px" />
            <Paragraph className="max-w-[820px] pt-4" fontFamily="font-nexa" size="17px">
              We welcome applications from educators, practitioners, and student support professionals aligned to our values.
            </Paragraph>
            <Box className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3">
              {openings.map((role) => (
                <Box key={role.title} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
                  <p className="font-nexa text-[12px] uppercase tracking-[0.1em] text-[#BA2E36]">{role.type}</p>
                  <h3 className="pt-1 font-fraunces text-[30px] font-bold leading-[1.2] text-[#171717]">{role.title}</h3>
                  <p className="pt-2 font-nexa text-[14px] text-[#666]">{role.location}</p>
                  <p className="pt-3 font-nexa text-[15px] text-[#555]">{role.summary}</p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="bg-[#0A0A0A] py-16 text-white">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Why ADMI" color="white" size="40px" />
            <Box className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3">
              {['Mission-led Work', 'Collaborative Culture', 'Real Industry Relevance'].map((item) => (
                <Box key={item} className="rounded-xl border border-white/20 bg-white/5 p-6">
                  <h3 className="font-fraunces text-[28px] font-bold text-white">{item}</h3>
                  <p className="pt-2 font-nexa text-[15px] text-white/80">
                    Build meaningful impact by teaching and shaping future-ready creative talent.
                  </p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="bg-white py-16">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Meet the Team" color="black" size="40px" />
            <Paragraph className="max-w-[800px] pt-4" fontFamily="font-nexa" size="17px">
              Work alongside educators, creatives, and operators who care deeply about learner success.
            </Paragraph>
          </Box>
        </Box>

        <Box className="bg-gradient-to-r from-[#BA2E36] via-[#8B1A24] to-[#5A0F16] px-4 py-16 text-white xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl text-center">
            <h2 className="font-fraunces text-[42px] font-bold">Interested in Joining ADMI?</h2>
            <p className="mx-auto max-w-[760px] pt-4 font-nexa text-[18px] text-white/85">
              Send your profile and tell us how you can contribute to our student experience.
            </p>
            <a href="mailto:apply@admi.ac.ke" className="mt-7 inline-block rounded-lg border border-white/40 px-6 py-3 font-nexa text-[15px] font-bold text-white hover:bg-white hover:text-[#171717]">
              Apply via Email
            </a>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}
