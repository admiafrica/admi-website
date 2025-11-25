import { GetStaticProps } from 'next'
import { StudentExperienceLayout } from '@/components/student-experience/StudentExperienceLayout'
import { FacilityItemCard } from '@/components/cards'
import { ADMI_FACILITIES } from '@/utils'
import { getStudentExperiencePage, StudentExperiencePage } from '@/services/contentful/studentExperience'

interface StudiosPageProps {
  pageData: StudentExperiencePage | null
}

const studiosFacility = {
  name: 'The Studios',
  description:
    'Industry-standard audio and TV studios with a tracking floor, lighting grid, vocal booth that doubles as a rehearsal space, and a control room equipped with Pro Tools and Logic.',
  image: ADMI_FACILITIES.find((facility) => facility.name === 'The Studios')?.image
}

const fallbackSections = [
  {
    title: 'Audio studios ready to record',
    paragraphs: [
      'Produce music, podcasts, and sound design projects in acoustically treated rooms. The vocal booth is sized for both solo artists and small ensembles, while the control room gives you a clean monitoring environment for mixing.',
      'You practice with the same workflows used in professional studios, from mic placement and routing to editing and mastering inside Pro Tools and Logic.'
    ]
  },
  {
    title: 'TV studio for multi-camera practice',
    paragraphs: [
      'Film interviews, shows, and live demonstrations on a tracking floor with a lighting grid. You will learn blocking, camera movement, lighting balance, and on-set communication while rotating through crew roles.',
      'Switch between studio and post-production quickly with labs and edit bays close by.'
    ]
  },
  {
    title: 'How bookings work',
    paragraphs: [
      'Studios are scheduled around class labs and productions. Technicians help you set up signal flow, lighting, and safety checks before you start recording.',
      'Plan your sessions early, share your shot list or session plan, and use rehearsal time to test ideas before final takes.'
    ],
    bullets: [
      'Staff support is available during booked sessions for troubleshooting and quick adjustments.',
      'Bring your storage and session templates so you can keep files organized when you move to the labs for edits.'
    ]
  }
]

export default function StudentExperienceStudiosPage({ pageData }: StudiosPageProps) {
  const sections = pageData?.sections || fallbackSections

  return (
    <StudentExperienceLayout
      seoTitle={pageData?.seoTitle || 'Student Experience | Studios'}
      seoDescription={
        pageData?.seoDescription ||
        'Discover ADMI audio and TV studios, how to book them, and what support is available while you record, shoot, and mix.'
      }
      heroTitle={pageData?.heroTitle || 'Studios'}
      heroKicker={pageData?.heroKicker}
      intro={
        pageData?.intro ||
        'Step inside the studios you will use for sound design, music production, podcasting, and broadcast shoots. Each space is engineered for professional workflows so you can focus on creative direction.'
      }
      sections={sections}
    >
      <FacilityItemCard facility={studiosFacility} />
    </StudentExperienceLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getStudentExperiencePage('studios')

  return {
    props: {
      pageData
    },
    revalidate: 60
  }
}
