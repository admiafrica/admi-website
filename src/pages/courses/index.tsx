import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import CoursesHero from '@/components/courses/CoursesHero'
import CoursesAccreditationBar from '@/components/courses/CoursesAccreditationBar'
import CoursesTabs from '@/components/courses/CoursesTabs'
import CoursesFilter from '@/components/courses/CoursesFilter'
import ProgramSection from '@/components/courses/ProgramSection'
import CoursesFAQ from '@/components/courses/CoursesFAQ'
import { CoursesFinalCTA } from '@/components/courses/CoursesFinalCTA'
import { IContentfulEntry } from '@/types'

// Course categorization mapping to fix CMS inconsistencies
const correctCourseMapping = (course: any): string => {
  const courseName = course.fields.name

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

  return course.fields.programType.fields.name
}

// Clean course names
const cleanCourseName = (course: any): any => {
  if (course.fields.name === 'Video Production Certificate (Professional)') {
    return {
      ...course,
      fields: { ...course.fields, name: 'Video Production Certificate' },
    }
  }
  if (course.fields.name === 'Entertainment Business') {
    return {
      ...course,
      fields: { ...course.fields, name: 'Entertainment Business Diploma' },
    }
  }
  return course
}

// Extract plain text from Contentful rich text for course descriptions
const getPlainTextFromRichText = (richText: any, maxLength = 120): string => {
  if (!richText?.content) return ''
  const text = richText.content
    .map((block: any) =>
      block.content?.map((node: any) => node.value || '').join('') || ''
    )
    .join(' ')
    .trim()
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

// Program section styling config
const PROGRAM_CONFIG: Record<string, {
  iconLetter: string
  iconBgColor: string
  iconTextColor: string
  accentColor: string
  accentBg: string
  bgColor: string
  meta: string
  tabName: string
}> = {
  'Diploma': {
    iconLetter: 'D',
    iconBgColor: '#BA2E36',
    iconTextColor: '#FFFFFF',
    accentColor: '#BA2E36',
    accentBg: '#FFF0F0',
    bgColor: 'bg-white',
    meta: '18 months  •  In-person  •  EU-Accredited via Woolf  •  From KES 15,000/month',
    tabName: 'Diploma Programmes',
  },
  'Professional Certificate': {
    iconLetter: 'P',
    iconBgColor: '#0A3D3D',
    iconTextColor: '#08F6CF',
    accentColor: '#0A3D3D',
    accentBg: '#EEF9F7',
    bgColor: 'bg-[#f9f9f9]',
    meta: '6 months  •  In-person / Online  •  From KES 8,500/month',
    tabName: 'Professional Certificates',
  },
  'Foundation Certificate': {
    iconLetter: 'F',
    iconBgColor: '#3A1F0B',
    iconTextColor: '#F76335',
    accentColor: '#F76335',
    accentBg: '#FFF8F0',
    bgColor: 'bg-white',
    meta: '3 months  •  In-person  •  ADMI Certified  •  From KES 5,000/month',
    tabName: 'Foundation Certificates',
  },
  'Rubika Programs': {
    iconLetter: 'R',
    iconBgColor: '#1a1a4e',
    iconTextColor: '#08F6CF',
    accentColor: '#1a1a4e',
    accentBg: '#EEF0FF',
    bgColor: 'bg-[#f9f9f9]',
    meta: '1-2 years  •  In-person  •  Rubika International',
    tabName: 'Rubika Programmes',
  },
}

// Match a program name to the config key
const getConfigKey = (programName: string): string => {
  const lower = programName.toLowerCase()
  if (lower.includes('diploma')) return 'Diploma'
  if (lower.includes('professional')) return 'Professional Certificate'
  if (lower.includes('foundation')) return 'Foundation Certificate'
  if (lower.includes('rubika')) return 'Rubika Programs'
  return 'Diploma' // default fallback
}

const TAB_OPTIONS = [
  'All Programmes',
  'Diploma Programmes',
  'Professional Certificates',
  'Foundation Certificates',
  'Rubika Programmes',
]

export default function CoursesPage({
  programs,
  courses,
}: {
  programs: any[]
  courses: any[]
  filterOptions: string[]
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('All Programmes')
  const [sortValue, setSortValue] = useState('All Programmes')
  const [searchQuery, setSearchQuery] = useState('')

  // Clean all course names once
  const cleanedCourses = useMemo(() => courses.map(cleanCourseName), [courses])

  // Group courses by program type
  const programSections = useMemo(() => {
    return programs
      .map((program) => {
        const programName = program.fields.name
        const configKey = getConfigKey(programName)
        const config = PROGRAM_CONFIG[configKey]
        if (!config) return null

        const programCourses = cleanedCourses.filter(
          (course) => correctCourseMapping(course) === programName
        )

        if (programCourses.length === 0) return null

        return {
          key: program.sys.id,
          title: programName,
          config,
          courses: programCourses.map((course: any) => ({
            name: course.fields.name,
            slug: course.fields.slug,
            description: getPlainTextFromRichText(course.fields.description),
            duration: course.fields.programType?.fields?.duration || '18 months',
            deliveryMode: course.fields.programType?.fields?.deliveryMode || 'In-person',
            imageUrl: course.fields.coverImage?.fields?.file?.url
              ? course.fields.coverImage.fields.file.url.startsWith('http')
                ? course.fields.coverImage.fields.file.url
                : `https:${course.fields.coverImage.fields.file.url}`
              : undefined,
          })),
        }
      })
      .filter(Boolean) as Array<{
      key: string
      title: string
      config: (typeof PROGRAM_CONFIG)[string]
      courses: Array<{
        name: string
        slug: string
        description: string
        duration: string
        deliveryMode: string
        imageUrl?: string
      }>
    }>
  }, [programs, cleanedCourses])

  // Filter sections based on active tab
  const filteredSections = useMemo(() => {
    if (activeTab === 'All Programmes') return programSections
    return programSections.filter((section) => section.config.tabName === activeTab)
  }, [activeTab, programSections])

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortValue(value)
    // Map sort options to tabs
    const tabMap: Record<string, string> = {
      'All Programmes': 'All Programmes',
      'Diploma Programmes': 'Diploma Programmes',
      'Professional Certificates': 'Professional Certificates',
      'Foundation Certificates': 'Foundation Certificates',
      'Rubika Programmes': 'Rubika Programmes',
    }
    if (tabMap[value]) setActiveTab(tabMap[value])
  }

  // Sync tab with sort
  useEffect(() => {
    setSortValue(activeTab)
  }, [activeTab])

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO
        title="Courses | ADMI - Africa Digital Media Institute"
        description="Explore ADMI's comprehensive range of digital media and creative courses in Kenya. From certificate to diploma programs, find the perfect course to advance your creative career in Nairobi."
        keywords="ADMI courses, digital media courses Kenya, creative education Nairobi, certificate programs, diploma courses, Africa Digital Media Institute"
        url="/courses"
      />

      <CoursesHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <CoursesAccreditationBar />

      <CoursesTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={TAB_OPTIONS}
      />

      <CoursesFilter
        sortValue={sortValue}
        onSortChange={handleSortChange}
        sortOptions={TAB_OPTIONS}
      />

      {/* Program Sections */}
      {filteredSections.map((section) => (
        <ProgramSection
          key={section.key}
          title={section.title}
          iconLetter={section.config.iconLetter}
          iconBgColor={section.config.iconBgColor}
          iconTextColor={section.config.iconTextColor}
          meta={section.config.meta}
          bgColor={section.config.bgColor}
          accentColor={section.config.accentColor}
          accentBg={section.config.accentBg}
          courses={section.courses}
        />
      ))}

      <CoursesFAQ />
      <CoursesFinalCTA />
    </MainLayout>
  )
}

export async function getStaticProps() {
  try {
    const [programsRes, coursesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/course-programs`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/courses`),
    ])

    if (!programsRes.ok || !coursesRes.ok) throw new Error('Failed to fetch data')

    const programs = await programsRes.json()
    const courses = await coursesRes.json()

    // Sort programs to prioritize diplomas first
    const sortedPrograms = programs.sort((a: any, b: any) => {
      const aIsDiploma = a.fields.name.toLowerCase().includes('diploma')
      const bIsDiploma = b.fields.name.toLowerCase().includes('diploma')
      if (aIsDiploma && !bIsDiploma) return -1
      if (!aIsDiploma && bIsDiploma) return 1
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
        icon: programs.find((p: any) => p.fields.name.includes('Rubika'))?.fields.icon || null,
      },
      assets: programs[0]?.assets || [],
    }

    const enhancedPrograms = [...sortedPrograms, rubikaProgram]

    return {
      props: {
        programs: enhancedPrograms,
        courses: sortedCourses,
        filterOptions: ['All Courses', ...enhancedPrograms.map((program: any) => program.fields.name)],
      },
      revalidate: 3600,
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    return {
      props: { programs: [], courses: [], filterOptions: ['All Courses'] },
      revalidate: 300,
    }
  }
}
