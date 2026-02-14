import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function MusicProductionKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Music Production Course in Western - ADMI',
        description:
          'Best Music Production course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/music-production-kisumu',
        keywords: 'music-production, kisumu, course, training, kenya, admi'
      }}
      courseName="Music Production"
      city="Kisumu"
      pageTitle="Music Production Course in Western"
      subtitle="In Kisumu, the burgeoning tech and creative scene, particularly in Milimani and Mamboleo, presents a fertile ground for music production graduates. With the city's status as an emerging tech hub, there's a unique advantage for those entering creative roles, including audio engineering and beat production, with less competition and a growing demand for innovative audio content in media houses and among local artists."
      whyTitle="Why Choose Music Production in kisumu?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from kisumu and surrounding areas'
      ]}
      courseLink="/courses/music-production-diploma"
      courseLinkText="View Full Music Production Course Details"
      faqs={[
        {
          question: "How does Kisumu's emerging tech scene benefit music production students?",
          answer:
            "Kisumu's status as an emerging tech hub, especially in areas like Milimani and Mamboleo, offers music production students unique opportunities to collaborate with tech startups and NGOs on innovative projects such as podcasting and live streaming, setting them apart in the creative industry."
        },
        {
          question: 'Are there local career opportunities in music production in Kisumu?',
          answer:
            'Yes, Kisumu offers diverse career opportunities in music production, from working with local recording studios and media houses like Lake Region Media to collaborating with international NGOs and agricultural tech firms on their audio content needs. The growing trend of home studios and podcast production further opens up freelance and entrepreneurial avenues.'
        },
        { question: 'undefined', answer: 'undefined' }
      ]}
      details={[
        { label: 'Duration', value: '12 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Music Production Opportunities in kisumu"
      jobMarketText="kisumu is an important center in Western with growing opportunities in Kenya's creative and digital industries. ADMI's Music Production program prepares you for the expanding job market. Students from kisumu are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Music Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Music Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Music Production Program Details"
      ctaButtonHref="/courses/music-production-diploma"
    />
  )
}
