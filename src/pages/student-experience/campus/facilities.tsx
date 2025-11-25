import { GetStaticProps } from 'next'
import { StudentExperienceLayout } from '@/components/student-experience/StudentExperienceLayout'
import { FacilityItemCard } from '@/components/cards'
import { ADMI_FACILITIES } from '@/utils'
import { getStudentExperiencePage, StudentExperiencePage } from '@/services/contentful/studentExperience'

interface FacilitiesPageProps {
  pageData: StudentExperiencePage | null
}

const facilityDetails = ADMI_FACILITIES.map((facility) => {
  if (facility.name === 'The Studios') {
    return {
      ...facility,
      description:
        'Industry-standard audio and TV studios with a tracking floor, lighting grid, vocal booth, and control room running Pro Tools and Logic for recording, mixing, and broadcast practice.'
    }
  }
  if (facility.name === 'The Space') {
    return {
      ...facility,
      description:
        'Classrooms, animation and graphics labs, TV and sound production studios, Mac and PC labs, a film equipment vault, and a fully stocked digital library housed at Caxton House next to the GPO.'
    }
  }
  if (facility.name === 'The Labs') {
    return {
      ...facility,
      description:
        'Mac and PC labs installed with Final Cut, Pro Tools, DaVinci, Adobe Premiere, Autodesk tools, Avid Composer, and more so you can practice with the same software used in the industry.'
    }
  }
  if (facility.name === 'The Equipment') {
    return {
      ...facility,
      description:
        'HD camcorders and digital cinema cameras from leading manufacturers, plus lighting, grip, and audio kits. Technicians help you progress from foundational shoots to advanced productions safely.'
    }
  }
  return facility
})

const fallbackSections = [
  {
    title: 'Spaces that keep you creating',
    paragraphs: [
      'Every floor on campus is set up for hands-on practice. Labs, studios, and equipment storage sit close to classrooms so you can move quickly between instruction and production.',
      'You will find editing bays, rehearsal spaces, and collaboration areas near the tools you need so group projects stay on schedule.'
    ]
  },
  {
    title: 'Designed for collaboration',
    paragraphs: [
      'Programs are clustered so filmmakers, animators, designers, marketers, and audio engineers work near each other. It is easy to swap feedback, record together, and learn how different creative disciplines overlap.'
    ]
  },
  {
    title: 'Amenities that support your day',
    paragraphs: [
      'Breakout zones give teams space to plan before lab time, and lounges let you review edits or rehearse without fighting for a room.',
      'The campus support team and technicians are available during teaching hours to help troubleshoot equipment, room setups, and software questions.'
    ]
  }
]

export default function StudentExperienceFacilitiesPage({ pageData }: FacilitiesPageProps) {
  const sections = pageData?.sections || fallbackSections

  return (
    <StudentExperienceLayout
      seoTitle={pageData?.seoTitle || 'Student Experience | Campus Facilities'}
      seoDescription={
        pageData?.seoDescription ||
        'Explore ADMI campus facilities, from classrooms and collaboration spaces to studios, labs, and the on-site equipment vault.'
      }
      heroTitle={pageData?.heroTitle || 'Campus Facilities'}
      heroKicker={pageData?.heroKicker}
      intro={
        pageData?.intro ||
        'Get familiar with the spaces you will use every week. Our Nairobi campus combines teaching rooms, production suites, and collaboration areas so you always have a place to plan, practice, and deliver your projects.'
      }
      sections={sections}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {facilityDetails.map((facility) => (
          <FacilityItemCard key={facility.name} facility={facility} />
        ))}
      </div>
    </StudentExperienceLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getStudentExperiencePage('campus-facilities')

  return {
    props: {
      pageData
    },
    revalidate: 60
  }
}
