import { Metadata } from 'next'
import { StudiosContent } from '@/components/student-experience/StudiosContent'

export const metadata: Metadata = {
  title: 'Professional Studios | ADMI',
  description:
    "Explore ADMI's professional studio spaces equipped with industry-standard equipment for hands-on creative learning."
}

export default function StudentExperienceStudiosPage() {
  return <StudiosContent />
}
