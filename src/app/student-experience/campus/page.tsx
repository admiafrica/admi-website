import { Metadata } from 'next'
import { CampusContent } from '@/components/student-experience/CampusContent'

export const metadata: Metadata = {
  title: 'Campus Experience | ADMI',
  description:
    "Explore ADMI's state-of-the-art campus facilities, studios, labs, and collaborative spaces designed for creative students."
}

export default function StudentExperienceCampusPage() {
  return <CampusContent />
}
