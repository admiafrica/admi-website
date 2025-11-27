import { Metadata } from 'next'
import { LabsContent } from '@/components/student-experience/LabsContent'

export const metadata: Metadata = {
  title: 'The Labs | ADMI',
  description:
    "Discover ADMI's specialized labs where students innovate and collaborate on cutting-edge creative projects."
}

export default function StudentExperienceLabsPage() {
  return <LabsContent />
}
