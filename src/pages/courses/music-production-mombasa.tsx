import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function MusicProductionMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Music Production Course in Coast - ADMI',
        description:
          'Best Music Production course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/music-production-mombasa',
        keywords: 'music-production, mombasa, course, training, kenya, admi'
      }}
      courseName="Music Production"
      city="Mombasa"
      pageTitle="Music Production Course in Coast"
      subtitle="Mombasa, with its flourishing tourism sector and increasing demand for digital content, presents a unique market for music production. The city's vibrant cultural scene and hospitality brands are continually seeking innovative audio content to captivate visitors, offering an untapped market for audio engineering, mixing, and live streaming audio services."
      whyTitle="Why Choose Music Production in mombasa?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from mombasa and surrounding areas'
      ]}
      courseLink="/courses/music-production-diploma"
      courseLinkText="View Full Music Production Course Details"
      faqs={[
        {
          question: "How does Mombasa's tourism sector influence the music production course?",
          answer:
            "The demand for engaging digital content in Mombasa's tourism sector allows students to tailor their music production skills towards creating memorable auditory experiences for visitors, opening up unique internship and employment opportunities within the hospitality industry."
        },
        {
          question: 'Are there local studios or media houses in Mombasa for practical exposure?',
          answer:
            'Yes, Mombasa is home to several coastal media houses and recording studios, such as those in Nyali and Bamburi, providing ample opportunities for hands-on experience and networking within the local music industry.'
        }
      ]}
      details={[
        { label: 'Duration', value: '12 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Music Production Opportunities in mombasa"
      jobMarketText="mombasa is an important center in Coast with growing opportunities in Kenya's creative and digital industries. ADMI's Music Production program prepares you for the expanding job market. Students from mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Music Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Music Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Music Production Program Details"
      ctaButtonHref="/courses/music-production-diploma"
    />
  )
}
