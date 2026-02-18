import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function VideoGameDevelopmentMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Video Game Development Course in Coast - ADMI',
        description:
          'Best Video Game Development course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/video-game-development-mombasa',
        keywords: 'video-game-development, mombasa, course, training, kenya, admi'
      }}
      courseName="Video Game Development"
      city="Mombasa"
      pageTitle="Video Game Development Course in Coast"
      subtitle="Professional Video Game Development training in mombasa with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Video Game Development in mombasa?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from mombasa and surrounding areas'
      ]}
      courseLink="/courses/video-game-development-diploma"
      courseLinkText="View Full Video Game Development Course Details"
      faqs={[
        {
          question: "How does Mombasa's cultural and touristic appeal influence the video game development course?",
          answer:
            "Mombasa's rich cultural heritage and status as a tourist hotspot infuse the video game development course with unique content themes, such as historical simulations and tourist experience games, providing an edge in creating culturally immersive and educational games."
        },
        {
          question: 'Are there specific opportunities in Mombasa for video game developers after the course?',
          answer:
            "Yes, besides the emerging local gaming studios, Mombasa's educational and tourism sectors are increasingly incorporating gamification into their offerings. Graduates also find opportunities in coastal media houses and tech startups focused on enhancing digital experiences for the tourism industry."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Video Game Development Opportunities in mombasa"
      jobMarketText="mombasa is an important center in Coast with growing opportunities in Kenya's creative and digital industries. ADMI's Video Game Development program prepares you for the expanding job market. Students from mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Video Game Development Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Video Game Development program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Video Game Development Program Details"
      ctaButtonHref="/courses/video-game-development-certificate-rubika"
    />
  )
}
