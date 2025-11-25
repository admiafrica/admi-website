import { GetStaticProps } from 'next'
import { StudentExperienceLayout } from '@/components/student-experience/StudentExperienceLayout'
import { FacilityItemCard } from '@/components/cards'
import { ADMI_FACILITIES } from '@/utils'
import { getStudentExperiencePage, StudentExperiencePage } from '@/services/contentful/studentExperience'

interface LabsPageProps {
  pageData: StudentExperiencePage | null
}

const labsFacility = {
  name: 'The Labs',
  description:
    'Mac and PC labs installed with Final Cut, Pro Tools, DaVinci, Adobe Premiere, Autodesk tools, Avid Composer, and more so you can practice with the same software used in the industry.',
  image: ADMI_FACILITIES.find((facility) => facility.name === 'The Labs')?.image
}

const fallbackSections = [
  {
    title: 'Mac and PC labs with industry software',
    paragraphs: [
      'Each lab is set up with the software suites you need for editing, animation, design, sound, and grading. Workstations are maintained by technicians so you can jump straight into your project.',
      'You will practice on both Mac and PC so you are comfortable with the platforms used across creative studios.'
    ]
  },
  {
    title: 'Software you will learn on',
    paragraphs: ['Labs are loaded with the tools that match your coursework and production goals.'],
    bullets: [
      'Final Cut, Pro Tools, DaVinci Resolve, Adobe Premiere Pro, and the wider Adobe Creative Cloud.',
      'Autodesk tools and Avid Composer for animation, modeling, and post-production workflows.'
    ]
  },
  {
    title: 'Structured time for practice',
    paragraphs: [
      'Lab time is timetabled for classes and supervised sessions, with additional booking windows set aside for project work.',
      'Technicians stay close to help with software setup, exporting, media management, and troubleshooting so you do not lose time on technical issues.'
    ]
  }
]

export default function StudentExperienceLabsPage({ pageData }: LabsPageProps) {
  const sections = pageData?.sections || fallbackSections

  return (
    <StudentExperienceLayout
      seoTitle={pageData?.seoTitle || 'Student Experience | Labs'}
      seoDescription={
        pageData?.seoDescription ||
        'Preview ADMI Mac and PC labs, the software installed, and how supervised lab sessions help you finish projects on time.'
      }
      heroTitle={pageData?.heroTitle || 'The Labs'}
      heroKicker={pageData?.heroKicker}
      intro={
        pageData?.intro ||
        'Explore the computer labs you will use for editing, grading, animation, design, and audio. Each workstation is equipped with industry software and supported by on-site technicians.'
      }
      sections={sections}
    >
      <FacilityItemCard facility={labsFacility} />
    </StudentExperienceLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getStudentExperiencePage('campus-the-labs')

  return {
    props: {
      pageData
    },
    revalidate: 60
  }
}
