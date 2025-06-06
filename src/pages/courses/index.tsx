import Image from 'next/image'
import { Box, Text, Select } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title, SearchDropdown } from '@/components/ui'
import { ProgramListItemCard, CourseListItemCard } from '@/components/cards'
import { PageSEO } from '@/components/shared/v3'
import { useIsMobile } from '@/hooks/useIsMobile'

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageRed from '@/assets/icons/ellipse-red.svg'
import { useEffect, useState } from 'react'

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

  // Categorize courses by award level
  const categorizeCourses = (courses: any[]) => {
    const foundationCertificates: any[] = []
    const professionalCertificates: any[] = []
    const diplomas: any[] = []

    courses.forEach((course) => {
      const awardLevel = course.fields.awardLevel?.toLowerCase() || ''
      const duration = course.fields.programType?.fields?.duration?.toLowerCase() || ''

      if (awardLevel.includes('diploma') || duration.includes('2 year')) {
        diplomas.push(course)
      } else if (awardLevel.includes('foundation') || awardLevel.includes('basic')) {
        foundationCertificates.push(course)
      } else if (awardLevel.includes('professional') || awardLevel.includes('advanced') || awardLevel.includes('certificate')) {
        professionalCertificates.push(course)
      } else {
        // Default to professional certificates for uncategorized courses
        professionalCertificates.push(course)
      }
    })

    return { foundationCertificates, professionalCertificates, diplomas }
  }

  const { foundationCertificates, professionalCertificates, diplomas } = categorizeCourses(courses)

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO
        title="Courses"
        description="Explore ADMI's comprehensive range of digital media and creative courses in Kenya. From certificate to diploma programs, find the perfect course to advance your creative career in Nairobi."
        keywords="ADMI courses, digital media courses Kenya, creative education Nairobi, certificate programs, diploma courses, Africa Digital Media Institute"
        url="/courses"
      />
      <div className="h-[16em] w-full overflow-x-hidden bg-[#002A23]">
        {/* BACKGROUND IMAGES */}
        <div className="absolute left-[62%] top-[20vh] z-0 h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full justify-end pr-[10%]">
            <Image src={IconBgImageYellow} alt="background image" />
          </div>
        </div>

        <div className="absolute left-1/2 top-[5vh] z-0 h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full">
            <Image src={IconBgImageRed} alt="background image" />
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
          <SearchDropdown
            destination="courses"
            items={courses}
            buttonLabel="Search"
            placeholder={isMobile ? 'Search for course' : 'Search for course e.g Graphic Design, Content Creation'}
          />
        </div>
      </div>
      <div className="relative z-10 w-full bg-[#F5FFFD]">
        <div className="mx-auto w-full max-w-screen-xl bg-[#F5FFFD] px-4 2xl:px-0">
          <div className="flex h-fit w-full flex-col pt-24 sm:flex-row">
            <div className="flex grow flex-col pb-4">
              <Title label="Courses" size="24px" color="black" />
              <Paragraph fontFamily="font-nexa" className="py-2">
                Explore our variety of courses across various topics that suit you!
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
        </div>
        <div className="relative mx-auto min-h-[60vh] w-full max-w-screen-xl px-4 2xl:px-0">
          {activeOption === 'All Courses' ? (
            // Show categorized view when "All Courses" is selected
            <div className="space-y-16">
              {/* Diplomas Section */}
              {diplomas.length > 0 && (
                <Box className="flex h-fit w-full flex-col pt-8">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-admiRed to-admiDarkOrange rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">🎓</span>
                      </div>
                      <Title label="Diplomas" size="28px" color="admiDarkOrange" />
                    </div>
                  </div>
                  <Paragraph fontFamily="font-nexa" className="mb-6 text-gray-600">
                    2-year comprehensive programs with industry placement and 85% employment rate
                  </Paragraph>
                  <div className="grid gap-4">
                    {diplomas.map((course) => (
                      <Box key={course.sys.id}>
                        <CourseListItemCard course={course} />
                      </Box>
                    ))}
                  </div>
                </Box>
              )}

              {/* Professional Certificates Section */}
              {professionalCertificates.length > 0 && (
                <Box className="flex h-fit w-full flex-col pt-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-admiShamrok to-green-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">📜</span>
                    </div>
                    <Title label="Professional Certificates" size="28px" color="admiShamrok" />
                  </div>
                  <Paragraph fontFamily="font-nexa" className="mb-6 text-gray-600">
                    Advanced skill-building programs for career advancement and specialization
                  </Paragraph>
                  <div className="grid gap-4">
                    {professionalCertificates.map((course) => (
                      <Box key={course.sys.id}>
                        <CourseListItemCard course={course} />
                      </Box>
                    ))}
                  </div>
                </Box>
              )}

              {/* Foundation Certificates Section */}
              {foundationCertificates.length > 0 && (
                <Box className="flex h-fit w-full flex-col pt-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">🌟</span>
                    </div>
                    <Title label="Foundation Certificates" size="28px" color="blue" />
                  </div>
                  <Paragraph fontFamily="font-nexa" className="mb-6 text-gray-600">
                    Entry-level programs perfect for beginners starting their creative journey
                  </Paragraph>
                  <div className="grid gap-4">
                    {foundationCertificates.map((course) => (
                      <Box key={course.sys.id}>
                        <CourseListItemCard course={course} />
                      </Box>
                    ))}
                  </div>
                </Box>
              )}
            </div>
          ) : (
            // Show filtered programs view when specific program is selected
            filteredPrograms.map((program) => (
              <Box key={program.sys.id}>
                <ProgramListItemCard
                  program={program}
                  courses={courses}
                  filterProgramCourses={(programType: string, courses: any[]) =>
                    courses.filter((course) => course.fields.programType.fields.name === programType)
                  }
                />
              </Box>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  try {
    const [programsRes, coursesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/course-programs`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/courses`)
    ])

    if (!programsRes.ok || !coursesRes.ok) throw new Error('Failed to fetch data')

    const programs = await programsRes.json()
    const courses = await coursesRes.json()

    const sortedPrograms = programs.reverse()
    const sortedCourses = courses.reverse()

    return {
      props: {
        programs: sortedPrograms,
        courses: sortedCourses,
        filterOptions: ['All Courses', ...sortedPrograms.map((program: any) => program.fields.name)]
      }
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    return { props: { programs: [], courses: [], filterOptions: ['All Courses'] } }
  }
}
