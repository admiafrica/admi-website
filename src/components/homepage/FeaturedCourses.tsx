'use client'

import { useRef } from 'react'
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

const FEATURED_COURSES: FeaturedCourse[] = [
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

export default function FeaturedCourses() {
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
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
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
          className="scrollbar-hide -mx-6 flex gap-6 overflow-x-auto px-6 pb-4 md:-mx-0 md:px-0"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {FEATURED_COURSES.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] md:w-[320px]"
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
              <div className="flex flex-1 flex-col gap-2.5 p-5">
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

                <h3 className="font-proxima text-[15px] font-bold leading-snug text-[#171717]">{course.name}</h3>
                <p className="line-clamp-2 font-proxima text-[13px] leading-relaxed text-[#666]">
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
        <div className="mt-8 flex justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-lg border border-[#ddd] bg-white px-8 py-3.5 font-proxima text-[15px] font-semibold text-[#171717] transition-colors hover:border-[#aaa] hover:bg-[#f5f5f5]"
          >
            View All Programmes
            <IconArrowRight size={16} stroke={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
