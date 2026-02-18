'use client'

import { useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

interface FeaturedCourse {
  name: string
  slug: string
  description: string
  duration: string
  level: string
  levelColor: string
  levelBg: string
  imageUrl: string
}

// Program level styling
const LEVEL_STYLES: Record<string, { color: string; bg: string; label: string }> = {
  diploma: { color: '#C1272D', bg: '#FFF0F0', label: 'Diploma' },
  'professional certificate': { color: '#0A3D3D', bg: '#EEF9F7', label: 'Professional' },
  'foundation certificate': { color: '#EF7B2E', bg: '#FFF8F0', label: 'Foundation' },
  'rubika programs': { color: '#1a1a4e', bg: '#EEF0FF', label: 'Rubika' }
}

// Get level style based on program type
const getLevelStyle = (programTypeName: string) => {
  const lower = programTypeName.toLowerCase()
  if (lower.includes('diploma')) return LEVEL_STYLES['diploma']
  if (lower.includes('professional')) return LEVEL_STYLES['professional certificate']
  if (lower.includes('foundation')) return LEVEL_STYLES['foundation certificate']
  if (lower.includes('rubika')) return LEVEL_STYLES['rubika programs']
  return LEVEL_STYLES['diploma'] // default
}

// Extract plain text from Contentful rich text
const getPlainTextFromRichText = (richText: any, maxLength = 120): string => {
  if (!richText?.content) return ''
  const text = richText.content
    .map((block: any) => block.content?.map((node: any) => node.value || '').join('') || '')
    .join(' ')
    .trim()
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

// Fallback courses for when CMS data is unavailable
const FALLBACK_COURSES: FeaturedCourse[] = [
  {
    name: 'Film & TV Production Diploma',
    slug: 'film-tv-production-diploma',
    description: 'Master cinematography, directing, editing and post-production with industry-standard equipment.',
    duration: '18 months',
    level: 'Diploma',
    levelColor: '#C1272D',
    levelBg: '#FFF0F0',
    imageUrl: '/images/homepage/diploma-students.jpg'
  },
  {
    name: 'Music Production & Sound Engineering Diploma',
    slug: 'music-production-sound-engineering-diploma',
    description: 'Learn recording, mixing, mastering and live sound in professional studio environments.',
    duration: '18 months',
    level: 'Diploma',
    levelColor: '#C1272D',
    levelBg: '#FFF0F0',
    imageUrl: '/images/homepage/professional-students.jpg'
  },
  {
    name: 'Graphic Design Diploma',
    slug: 'graphic-design-diploma',
    description: 'Build expertise in branding, typography, layout and digital design tools used by top agencies.',
    duration: '18 months',
    level: 'Diploma',
    levelColor: '#C1272D',
    levelBg: '#FFF0F0',
    imageUrl: '/images/homepage/foundation-students.jpg'
  },
  {
    name: 'Animation Diploma',
    slug: 'animation-diploma',
    description: 'Create 2D and 3D animations, motion graphics and visual effects for film, TV and advertising.',
    duration: '18 months',
    level: 'Diploma',
    levelColor: '#C1272D',
    levelBg: '#FFF0F0',
    imageUrl: '/images/homepage/diploma-students.jpg'
  },
  {
    name: 'Digital Content Creation Certificate',
    slug: 'digital-content-creation-certificate',
    description: 'Learn video production, social media content and digital storytelling for modern platforms.',
    duration: '6 months',
    level: 'Professional',
    levelColor: '#0A3D3D',
    levelBg: '#EEF9F7',
    imageUrl: '/images/homepage/professional-students.jpg'
  },
  {
    name: 'Photography Certificate',
    slug: 'photography-foundation-certificate',
    description: 'Discover portrait, landscape and commercial photography with hands-on studio sessions.',
    duration: '3 months',
    level: 'Foundation',
    levelColor: '#EF7B2E',
    levelBg: '#FFF8F0',
    imageUrl: '/images/homepage/foundation-students.jpg'
  }
]

interface FeaturedCoursesProps {
  courses?: any[]
}

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  // Transform CMS courses to display format
  const displayCourses = useMemo((): FeaturedCourse[] => {
    if (!courses || courses.length === 0) return FALLBACK_COURSES

    // Sort courses: diplomas first, then professional, then foundation
    const sortedCourses = [...courses].sort((a, b) => {
      const aType = a.fields?.programType?.fields?.name?.toLowerCase() || ''
      const bType = b.fields?.programType?.fields?.name?.toLowerCase() || ''

      const order = (type: string) => {
        if (type.includes('diploma')) return 1
        if (type.includes('professional')) return 2
        if (type.includes('foundation')) return 3
        return 4
      }

      return order(aType) - order(bType)
    })

    // Take first 6 courses
    return sortedCourses.slice(0, 6).map((course) => {
      const programType = course.fields?.programType?.fields?.name || 'Diploma'
      const levelStyle = getLevelStyle(programType)

      // Get image URL
      let imageUrl = '/images/homepage/diploma-students.jpg'
      if (course.fields?.coverImage?.fields?.file?.url) {
        imageUrl = course.fields.coverImage.fields.file.url.startsWith('http')
          ? course.fields.coverImage.fields.file.url
          : `https:${course.fields.coverImage.fields.file.url}`
      }

      return {
        name: course.fields?.name || 'Course',
        slug: course.fields?.slug || '',
        description: getPlainTextFromRichText(course.fields?.description) || '',
        duration: course.fields?.programType?.fields?.duration || '18 months',
        level: levelStyle.label,
        levelColor: levelStyle.color,
        levelBg: levelStyle.bg,
        imageUrl
      }
    })
  }, [courses])
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = 320
    const gap = 24
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth'
    })
  }

  return (
    <section id="compare" className="section-padding bg-[#f9f9f9]">
      <div className="section-container">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-4">
          <div>
            <span className="section-label-light">FEATURED PROGRAMMES</span>
            <h2 className="section-heading-light">Find the Right Fit</h2>
            <p className="section-subheading-light mt-3 max-w-[500px]">
              Our most popular programmes across diploma, professional and foundation levels.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Scroll arrows — desktop only */}
            <button
              onClick={() => scroll('left')}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#ddd] bg-white text-[#555] transition-colors hover:border-[#aaa] hover:text-[#171717] md:flex"
              aria-label="Scroll left"
            >
              <IconChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#ddd] bg-white text-[#555] transition-colors hover:border-[#aaa] hover:text-[#171717] md:flex"
              aria-label="Scroll right"
            >
              <IconChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-3 md:-mx-0 md:gap-6 md:px-0 md:pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {displayCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group flex w-[270px] shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] md:w-[320px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image */}
              <div className="relative h-[160px] w-full bg-[#1a1a1a]">
                <Image
                  src={course.imageUrl}
                  alt={course.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="320px"
                />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-2 p-4 md:gap-2.5 md:p-5">
                {/* Tags */}
                <div className="flex gap-2">
                  <span
                    className="rounded-full px-2.5 py-1 font-proxima text-[11px] font-semibold"
                    style={{ color: course.levelColor, backgroundColor: course.levelBg }}
                  >
                    {course.level}
                  </span>
                  <span className="rounded-full bg-[#f0f0f0] px-2.5 py-1 font-proxima text-[11px] font-semibold text-[#666]">
                    {course.duration}
                  </span>
                  <span className="rounded-full bg-secondary/10 px-2.5 py-1 font-proxima text-[11px] font-semibold text-secondary">
                    Hybrid
                  </span>
                </div>

                <h3 className="font-proxima text-[14px] font-bold leading-snug text-[#171717] md:text-[15px]">
                  {course.name}
                </h3>
                <p className="line-clamp-2 font-proxima text-[12px] leading-relaxed text-[#666] md:text-[13px]">
                  {course.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-1 font-proxima text-[13px] font-semibold text-brand-red transition-colors group-hover:text-[#a52830]">
                  View Programme
                  <IconArrowRight size={14} stroke={2.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All link */}
        <div className="mt-6 flex justify-center md:mt-8">
          <Link
            href="/courses"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#ddd] bg-white px-4 font-proxima text-[13px] font-semibold text-[#171717] transition-colors hover:border-[#aaa] hover:bg-[#f5f5f5] md:h-auto md:gap-2 md:px-8 md:py-3.5 md:text-[15px]"
          >
            View All Programmes
            <IconArrowRight size={16} stroke={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
