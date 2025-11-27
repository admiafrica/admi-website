'use client'

import { StudentExperienceLayout } from './StudentExperienceLayout'

export function LabsContent() {
  const sections = [
    {
      title: 'The Labs',
      paragraphs: [
        "ADMI's specialized labs are dedicated spaces where students can experiment, innovate, and collaborate on cutting-edge projects. Each lab is designed for specific creative disciplines and equipped with specialized technology."
      ],
      bullets: null
    },
    {
      title: 'Lab Spaces',
      paragraphs: ['Our labs include:'],
      bullets: [
        'Digital Art & Design Lab',
        'Sound Design & Acoustics Lab',
        'Game Development Lab',
        'VR & Interactive Media Lab',
        'Motion Capture & Animation Lab',
        'Collaborative Innovation Lab'
      ]
    },
    {
      title: 'How Labs Work',
      paragraphs: [
        'Labs are available for scheduled classes, independent projects, and group collaborations. Students work with experienced lab technicians who provide guidance on equipment usage and technical best practices. Lab time is a crucial part of the hands-on learning experience at ADMI.'
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      seoTitle="The Labs | ADMI"
      seoDescription="Discover ADMI's specialized labs where students innovate and collaborate on cutting-edge creative projects."
      heroTitle="The Labs"
      heroKicker="Student Experience"
      intro="Innovation spaces for creative experimentation"
      sections={sections}
    />
  )
}
