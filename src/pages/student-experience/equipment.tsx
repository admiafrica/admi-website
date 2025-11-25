import { GetStaticProps } from 'next'
import { StudentExperienceLayout } from '@/components/student-experience/StudentExperienceLayout'
import { FacilityItemCard } from '@/components/cards'
import { ADMI_FACILITIES } from '@/utils'
import { getStudentExperiencePage, StudentExperiencePage } from '@/services/contentful/studentExperience'

interface EquipmentPageProps {
  pageData: StudentExperiencePage | null
}

const equipmentFacility = {
  name: 'The Equipment Vault',
  description:
    'Progressive access to HD camcorders, digital cinema cameras from Sony, Canon, Panasonic, and Blackmagic, plus lighting, grip, and audio kits. Technicians help you build safe rigs before you book anything out.',
  image: ADMI_FACILITIES.find((facility) => facility.name === 'The Equipment')?.image
}

const fallbackSections = [
  {
    title: 'Professionally maintained gear',
    paragraphs: [
      'From your first semester you work with the same caliber of tools used on professional sets. Gear is stored and serviced on campus so you can focus on your shoot plan instead of logistics.',
      'Technicians guide you through setup and maintenance, making sure every camera, recorder, and light is ready before you head to location.'
    ]
  },
  {
    title: 'What you can check out',
    paragraphs: ['Our inventory covers the core tools you need for class projects, reels, and capstone productions.'],
    bullets: [
      'HD and digital cinema camera kits with lens options, tripods, sliders, and stabilization accessories.',
      'Lighting, grip, and modifiers to control your look indoors or on location.',
      'Location sound kits, studio microphones, mixers, and monitoring for film and music projects.'
    ]
  },
  {
    title: 'How checkout works',
    paragraphs: [
      'Equipment is scheduled around coursework so every team has what they need for labs, assignments, and productions.',
      'Book early for larger shoots, confirm return times, and build your kit with a technician to make sure it matches your storyboard.'
    ],
    bullets: [
      'Training and refreshers are required before you take out new gear categories.',
      'On-campus pickup lets you test setups with staff support before leaving.'
    ]
  }
]

export default function StudentExperienceEquipmentPage({ pageData }: EquipmentPageProps) {
  const sections = pageData?.sections || fallbackSections

  return (
    <StudentExperienceLayout
      seoTitle={pageData?.seoTitle || 'Student Experience | Equipment'}
      seoDescription={
        pageData?.seoDescription ||
        'Learn how ADMI students access industry cameras, audio kits, and lighting from the on-campus equipment vault with technician support.'
      }
      heroTitle={pageData?.heroTitle || 'Equipment Access'}
      heroKicker={pageData?.heroKicker}
      intro={
        pageData?.intro ||
        'See how to access the cameras, sound kits, and lighting you will use from first-year exercises through advanced productions. The equipment vault sits on campus so you can book what you need and get hands-on guidance quickly.'
      }
      sections={sections}
    >
      <FacilityItemCard facility={equipmentFacility} />
    </StudentExperienceLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getStudentExperiencePage('equipment')

  return {
    props: {
      pageData
    },
    revalidate: 60
  }
}
