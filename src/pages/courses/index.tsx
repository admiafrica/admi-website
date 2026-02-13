import Image from 'next/image'
import { Box, Text, Select } from '@mantine/core'
import { useEffect, useState } from 'react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title, SearchDropdown } from '@/components/ui'
import { ProgramListItemCard } from '@/components/cards'
import { PageSEO } from '@/components/shared/v3'
import { useIsMobile } from '@/hooks/useIsMobile'
import {
  FastConverterCTA,
  FinancingCalculator,
  TrustBadges,
  ResearcherCTA,
  LongTermPlannerCTA,
  FAQSection
} from '@/components/course'

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageRed from '@/assets/icons/ellipse-red.svg'

// Course categorization mapping to fix CMS inconsistencies
const correctCourseMapping = (course: any): string => {
  const courseName = course.fields.name

  // Fix misplaced courses
  if (courseName === 'Digital Content Creation Certificate') {
    return 'Professional Certificate'
  }
  if (courseName === 'Video Production Certificate (Professional)' || courseName === 'Video Production Certificate') {
    return 'Professional Certificate'
  }
  if (courseName === 'Video Game Development Certificate (Rubika)') {
    return 'Rubika Programs'
  }
  if (courseName === '2D Animation Certificate (Rubika)') {
    return 'Rubika Programs'
  }

  // Use original programType for correctly placed courses
  return course.fields.programType.fields.name
}

// Clean course names by removing unnecessary text in parentheses and adding consistency
const cleanCourseName = (course: any): any => {
  if (course.fields.name === 'Video Production Certificate (Professional)') {
    return {
      ...course,
      fields: {
        ...course.fields,
        name: 'Video Production Certificate'
      }
    }
  }
  if (course.fields.name === 'Entertainment Business') {
    return {
      ...course,
      fields: {
        ...course.fields,
        name: 'Entertainment Business Diploma'
      }
    }
  }
  return course
}

export default function CoursesPage({
  programs,
  courses,
  filterOptions
}: {
  programs: any[]
  courses: any[]
  filterOptions: string[]
}) {
  const isMobile = useIsMobile()
  const [activeOption, setActiveOption] = useState<string>('All Courses')
  const [filteredPrograms, setFilteredPrograms] = useState<any[]>(programs)

  useEffect(() => {
    setFilteredPrograms(
      activeOption !== 'All Courses'
        ? programs.filter((program) => program.fields.name.includes(activeOption))
        : programs
    )
  }, [activeOption, programs])

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO
        title="Courses"
        description="Explore ADMI's comprehensive range of digital media and creative courses in Kenya. From certificate to diploma programs, find the perfect course to advance your creative career in Nairobi."
        keywords="ADMI courses, digital media courses Kenya, creative education Nairobi, certificate programs, diploma courses, Africa Digital Media Institute"
        url="/courses"
      />
      <div
        className="relative h-[16em] w-full overflow-hidden bg-[#002A23]"
        style={{ minHeight: '16em', contain: 'layout' }}
      >
        {/* BACKGROUND IMAGES - Fixed positioning to prevent layout shifts */}
        <div className="absolute left-[62%] top-[3rem] z-0 h-fit w-full -translate-x-1/2 transform will-change-transform">
          <div className="flex w-full justify-end pr-[10%]">
            <Image
              src={IconBgImageYellow}
              alt="background image"
              priority
              style={{ maxWidth: '100%', height: 'auto' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="absolute left-1/2 top-[1rem] z-0 h-fit w-full -translate-x-1/2 transform will-change-transform">
          <div className="flex w-full pl-[5%]">
            <Image
              src={IconBgImageRed}
              alt="background image"
              priority
              style={{ maxWidth: '100%', height: 'auto' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
          <SearchDropdown
            destination="courses"
            items={courses.map(cleanCourseName)}
            buttonLabel="Search"
            placeholder={isMobile ? 'Search for course' : 'Search for course e.g Graphic Design, Content Creation'}
          />
        </div>
      </div>
      <div className="relative z-10 w-full bg-[#F5FFFD]">
        <div className="mx-auto w-full max-w-screen-xl bg-[#F5FFFD] px-4 2xl:px-0">
          {/* Fast Converter CTA - Segment A (25% of visitors) */}
          <FastConverterCTA />

          <div className="flex h-fit w-full flex-col pt-12 sm:flex-row">
            <div className="flex grow flex-col pb-4">
              <Title label="Courses" size="24px" color="black" />
              <Paragraph fontFamily="font-nexa" className="py-2">
                <strong>Diploma programs</strong> hone your skills for career transformation (15K/month). Or capture
                quick wins with our certificate courses.
              </Paragraph>
            </div>
            <div className="flex items-center bg-white pl-4 font-proxima">
              <Text>Sort By:</Text>
              <Select
                className="grow border-none font-proxima font-bold sm:w-[220px]"
                placeholder="Select Program"
                allowDeselect={false}
                nothingFoundMessage="No programs found"
                data={filterOptions}
                onChange={(value) => setActiveOption(value as string)}
                renderOption={(value) => (
                  <div className="font-proxima">
                    <Text size="16px">{value.option.value}</Text>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Interactive Financing Calculator */}
          <FinancingCalculator />

          {/* Trust & Social Proof */}
          <TrustBadges />

          {/* Researcher CTA - Segment C (18% of visitors) */}
          <ResearcherCTA />

          {/* Long-Term Planner CTA - Segment D (31% of visitors) */}
          <LongTermPlannerCTA />
        </div>
        <div className="relative mx-auto min-h-[60vh] w-full max-w-screen-xl px-4 2xl:px-0">
          {filteredPrograms.map((program) => {
            // Clean course names and filter courses for this program
            const cleanedCourses = courses.map(cleanCourseName)
            const programCourses = cleanedCourses.filter(
              (course) => correctCourseMapping(course) === program.fields.name
            )

            // Only render if program has courses
            if (programCourses.length === 0) return null

            return (
              <Box key={program.sys.id}>
                <ProgramListItemCard
                  program={program}
                  courses={cleanedCourses}
                  filterProgramCourses={(programType: string, courses: any[]) =>
                    courses.filter((course) => correctCourseMapping(course) === programType)
                  }
                />
              </Box>
            )
          })}
        </div>

        {/* Comprehensive FAQ Section */}
        <FAQSection />
      </div>
    </MainLayout>
  )
}

export async function getStaticProps() {
  try {
    const [programsRes, coursesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/course-programs`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/courses`)
    ])

    if (!programsRes.ok || !coursesRes.ok) throw new Error('Failed to fetch data')

    const programs = await programsRes.json()
    const courses = await coursesRes.json()

    // Sort programs to prioritize diplomas first, then certificates
    // This aligns with the diploma-first enrollment strategy
    const sortedPrograms = programs.sort((a: any, b: any) => {
      const aName = a.fields.name.toLowerCase()
      const bName = b.fields.name.toLowerCase()

      // Diploma programs come first
      const aIsDiploma = aName.includes('diploma')
      const bIsDiploma = bName.includes('diploma')

      if (aIsDiploma && !bIsDiploma) return -1 // a (diploma) before b (not diploma)
      if (!aIsDiploma && bIsDiploma) return 1 // b (diploma) before a (not diploma)

      // Within same category (both diplomas or both certificates), maintain original order
      return 0
    })

    const sortedCourses = courses.reverse()

    // Add Rubika Programs section if not exists
    const rubikaProgram = {
      sys: { id: 'rubika-programs' },
      fields: {
        name: 'Rubika Programs',
        duration: '1-2 years',
        deliveryMode: 'In-person',
        icon: programs.find((p: any) => p.fields.name.includes('Rubika'))?.fields.icon || null
      },
      assets: programs[0]?.assets || []
    }

    const enhancedPrograms = [...sortedPrograms, rubikaProgram]

    return {
      props: {
        programs: enhancedPrograms,
        courses: sortedCourses,
        filterOptions: ['All Courses', ...enhancedPrograms.map((program: any) => program.fields.name)]
      },
      revalidate: 3600 // Regenerate every hour
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    return {
      props: { programs: [], courses: [], filterOptions: ['All Courses'] },
      revalidate: 300 // Retry in 5 minutes if error
    }
  }
}
