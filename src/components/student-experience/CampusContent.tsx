'use client'

import Link from 'next/link'
import { StudentExperienceLayout } from './StudentExperienceLayout'

export function CampusContent() {
  const sections = [
    {
      title: 'Campus Overview',
      paragraphs: [
        "ADMI's state-of-the-art campus is thoughtfully designed to foster creativity, collaboration, and professional growth. Our facilities are equipped with cutting-edge technology and provide an inspiring environment where students can bring their creative visions to life."
      ],
      bullets: null
    },
    {
      title: 'What to Expect',
      paragraphs: [
        "From the moment you step onto our campus, you'll experience a vibrant community dedicated to creative excellence. Whether you're working in our studios, collaborating in shared spaces, or learning in classrooms, every corner of ADMI is designed to support your creative journey."
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      seoTitle="Campus Experience | ADMI"
      seoDescription="Explore ADMI's state-of-the-art campus facilities, studios, labs, and collaborative spaces designed for creative students."
      heroTitle="Campus Experience"
      heroKicker="Student Experience"
      intro="Discover the heart of creative learning at ADMI"
      sections={sections}
    >
      <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-3">
        <Link
          href="/student-experience/campus/facilities"
          className="rounded-xl border-2 border-admiShamrok bg-white p-6 text-center transition-all hover:shadow-lg"
        >
          <h3 className="text-admiDark text-xl font-bold">Facilities</h3>
          <p className="mt-2 text-sm text-gray-600">Explore all campus facilities</p>
        </Link>
        <Link
          href="/student-experience/campus/the-labs"
          className="rounded-xl border-2 border-admiShamrok bg-white p-6 text-center transition-all hover:shadow-lg"
        >
          <h3 className="text-admiDark text-xl font-bold">The Labs</h3>
          <p className="mt-2 text-sm text-gray-600">Specialized creative labs</p>
        </Link>
        <Link
          href="/student-experience/studios"
          className="rounded-xl border-2 border-admiShamrok bg-white p-6 text-center transition-all hover:shadow-lg"
        >
          <h3 className="text-admiDark text-xl font-bold">Studios</h3>
          <p className="mt-2 text-sm text-gray-600">Professional studio spaces</p>
        </Link>
      </div>
    </StudentExperienceLayout>
  )
}
