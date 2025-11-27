'use client'

import { StudentExperienceLayout } from './StudentExperienceLayout'

export function StudiosContent() {
  const sections = [
    {
      title: 'Professional Studio Spaces',
      paragraphs: [
        'Our studios are equipped with industry-standard equipment and designed for hands-on learning. Each studio is a fully functional creative workspace where students collaborate on real-world projects.'
      ],
      bullets: null
    },
    {
      title: 'Studio Types',
      paragraphs: ['ADMI features multiple specialized studio spaces tailored to different creative disciplines:'],
      bullets: [
        'Film & Video Production Studios',
        'Music Production & Recording Studios',
        'Photography Studios with Professional Lighting',
        'Animation & Motion Graphics Labs',
        'Game Development Studios',
        'Post-Production & Editing Suites'
      ]
    },
    {
      title: 'Studio Features',
      paragraphs: [
        'Each studio is outfitted with professional-grade technology, ergonomic workstations, and dedicated mentorship areas where instructors provide real-time feedback and guidance.'
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      seoTitle="Professional Studios | ADMI"
      seoDescription="Explore ADMI's professional studio spaces equipped with industry-standard equipment for hands-on creative learning."
      heroTitle="Professional Studios"
      heroKicker="Student Experience"
      intro="State-of-the-art creative workspace"
      sections={sections}
    />
  )
}
