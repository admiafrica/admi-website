'use client'

import { StudentExperienceLayout } from './StudentExperienceLayout'

export function EquipmentContent() {
  const sections = [
    {
      title: 'Equipment & Technology',
      paragraphs: [
        'ADMI invests in the latest creative technology to ensure students learn on the same tools used by industry professionals. Our comprehensive equipment inventory spans all major creative disciplines.'
      ],
      bullets: null
    },
    {
      title: 'Available Equipment',
      paragraphs: ['From cameras and lighting rigs to synthesizers and gaming engines, our equipment covers:'],
      bullets: [
        'Professional cameras and lenses (4K & beyond)',
        'Studio lighting and grip equipment',
        'Audio recording and mixing consoles',
        'Computers with industry software (Adobe, Autodesk, Unreal Engine, etc.)',
        'VR and motion capture technology',
        'Professional displays and color grading monitors'
      ]
    },
    {
      title: 'Equipment Borrowing',
      paragraphs: [
        'Students can request to borrow equipment for projects outside of class. Our equipment management system ensures fair access and proper maintenance of all resources.'
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      seoTitle="Equipment & Technology | ADMI"
      seoDescription="Discover ADMI's professional-grade equipment and technology available to students for creative projects."
      heroTitle="Equipment & Technology"
      heroKicker="Student Experience"
      intro="Industry-standard tools for creative excellence"
      sections={sections}
    />
  )
}
