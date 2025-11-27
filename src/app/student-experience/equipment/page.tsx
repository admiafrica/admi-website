import { Metadata } from 'next'
import { EquipmentContent } from '@/components/student-experience/EquipmentContent'

export const metadata: Metadata = {
  title: 'Equipment & Technology | ADMI',
  description:
    "Discover ADMI's professional-grade equipment and technology available to students for creative projects."
}

export default function StudentExperienceEquipmentPage() {
  return <EquipmentContent />
}
