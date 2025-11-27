'use client'

import { StudentExperienceLayout } from './StudentExperienceLayout'

export function FacilitiesContent() {
  const sections = [
    {
      title: 'Campus Facilities',
      paragraphs: [
        "Beyond specialized creative spaces, ADMI provides comprehensive facilities designed to support the complete student experience. From dining areas to wellness spaces, we've created an environment that nurtures both creative and personal growth."
      ],
      bullets: null
    },
    {
      title: 'Key Facilities',
      paragraphs: ['Our campus includes:'],
      bullets: [
        'Collaborative workspaces and breakout areas',
        'Student lounge and social areas',
        'Library and resource center',
        'Wellness and fitness facilities',
        'Cafeteria and dining areas',
        'Student services and support offices',
        'Event and presentation spaces',
        'Secure parking facilities'
      ]
    },
    {
      title: 'Support Services',
      paragraphs: [
        'Dedicated staff members are available to assist with student needs including academic advising, technical support, mental health resources, and career development guidance.'
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      seoTitle="Campus Facilities | ADMI"
      seoDescription="Explore ADMI's comprehensive campus facilities designed to support creative learning and student wellbeing."
      heroTitle="Campus Facilities"
      heroKicker="Student Experience"
      intro="Complete support for your creative journey"
      sections={sections}
    />
  )
}
