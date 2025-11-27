import { Metadata } from 'next'
import { FacilitiesContent } from '@/components/student-experience/FacilitiesContent'

export const metadata: Metadata = {
  title: 'Campus Facilities | ADMI',
  description:
    "Explore ADMI's comprehensive campus facilities designed to support creative learning and student wellbeing."
}

export default function StudentExperienceFacilitiesPage() {
  return <FacilitiesContent />
}
