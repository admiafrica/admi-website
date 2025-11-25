import Link from 'next/link'
import { GetStaticProps } from 'next'

import { StudentExperienceLayout } from '@/components/student-experience/StudentExperienceLayout'
import { getStudentExperiencePage, StudentExperiencePage } from '@/services/contentful/studentExperience'

interface CampusPageProps {
  pageData: StudentExperiencePage | null
}

// Fallback data for development
const fallbackQuickLinks = [
  {
    title: 'Facilities',
    description: 'Classrooms, lounges, and creative spaces ready for daily coursework.',
    href: '/student-experience/campus/facilities'
  },
  {
    title: 'Studios',
    description: 'Audio and video studios you can book for productions.',
    href: '/student-experience/studios'
  },
  {
    title: 'Labs',
    description: 'Mac and PC labs with industry software and guided practice.',
    href: '/student-experience/campus/the-labs'
  },
  {
    title: 'Equipment',
    description: 'Camera, sound, and lighting gear supported by our technicians.',
    href: '/student-experience/equipment'
  }
]

const fallbackSections = [
  {
    title: 'A campus built for creatives',
    paragraphs: [
      "ADMI is based in Caxton House next to the GPO in Nairobi's CBD, keeping lectures, labs, studios, and support services within a short walk of each other.",
      'The layout keeps you close to faculty, technicians, and the equipment vault, making it easy to move from class to production work without leaving campus.'
    ]
  },
  {
    title: 'Where you will spend your time',
    paragraphs: [
      'Every program blends classroom learning with hands-on sessions. Use the guides below to see how each space is set up before you arrive.'
    ],
    bullets: [
      <span key="facilities-link">
        <Link href="/student-experience/campus/facilities" className="text-admiRed hover:underline">
          Campus facilities
        </Link>{' '}
        - classrooms, lounges, and collaboration spaces that support daily study.
      </span>,
      <span key="studios-link">
        <Link href="/student-experience/studios" className="text-admiRed hover:underline">
          Studios
        </Link>{' '}
        - fully treated audio and TV studios ready for production practice.
      </span>,
      <span key="labs-link">
        <Link href="/student-experience/campus/the-labs" className="text-admiRed hover:underline">
          Labs
        </Link>{' '}
        - Mac and PC setups with the software you will use on projects.
      </span>,
      <span key="equipment-link">
        <Link href="/student-experience/equipment" className="text-admiRed hover:underline">
          Equipment vault
        </Link>{' '}
        - how to access cameras, audio kits, and lighting with technician support.
      </span>
    ]
  },
  {
    title: 'Getting support on campus',
    paragraphs: [
      'Technicians prep labs and studios ahead of your sessions, while program leads stay close by for reviews and feedback.',
      <>
        Visit{' '}
        <Link href="/student-support" className="text-admiRed hover:underline">
          Student Support
        </Link>{' '}
        whenever you need scheduling help, wellbeing resources, or guidance on internships and career prep.
      </>
    ]
  }
]

export default function StudentExperienceCampusPage({ pageData }: CampusPageProps) {
  // Use Contentful data if available, otherwise fallback to hardcoded
  const quickLinks = pageData?.quickLinks || fallbackQuickLinks
  const sections = pageData?.sections || fallbackSections

  return (
    <StudentExperienceLayout
      seoTitle={pageData?.seoTitle || 'Student Experience | Campus'}
      seoDescription={
        pageData?.seoDescription ||
        "See how ADMI's campus is organized for creative students - from studios and labs to collaboration spaces and support services."
      }
      heroTitle={pageData?.heroTitle || 'Campus Experience'}
      heroKicker={pageData?.heroKicker}
      intro={
        pageData?.intro ||
        'Explore how our Nairobi campus is organized for creative work. Everything - from lecture rooms to production suites - is within reach so you can focus on learning, collaborating, and shipping projects.'
      }
      sections={sections}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((item) => (
          <Link key={item.title} href={item.href}>
            <div className="h-full rounded-2xl border border-[#CBECE3] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-xs uppercase tracking-[0.2em] text-[#5AA286]">{item.title}</p>
              <p className="pt-3 font-nexa text-lg font-black text-[#002A23]">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </StudentExperienceLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getStudentExperiencePage('campus')

  return {
    props: {
      pageData
    },
    revalidate: 60 // Revalidate every 60 seconds
  }
}
