import { Box } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import StudentShowcaseSection from '@/components/homepage/StudentShowcase'

export default function StudentShowcasePage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Student Showcase"
        description="Explore standout ADMI student projects across film, animation, design, and music production."
        keywords="ADMI student showcase, student projects, creative portfolio, film projects, animation projects"
      />

      <Box className="w-full bg-[#0A1A18] px-4 py-16 text-white xl:px-0">
        <Box className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/student-showcase</p>
          <h1 className="pt-4 font-fraunces text-[46px] font-bold leading-[1.15]">
            Student Projects Across Film, Design, Animation, and Audio
          </h1>
          <p className="pt-4 font-nexa text-[18px] text-white/80">
            Discover work created in our studios, labs, and industry-facing project briefs.
          </p>
        </Box>
      </Box>

      <StudentShowcaseSection />
    </MainLayout>
  )
}
