import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function VideoGameDevelopmentNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Video Game Development Course in Rift Valley - ADMI',
        description:
          'Best Video Game Development course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/video-game-development-nakuru',
        keywords: 'video-game-development, nakuru, course, training, kenya, admi'
      }}
      courseName="Video Game Development"
      city="Nakuru"
      pageTitle="Video Game Development Course in Rift Valley"
      subtitle="Professional Video Game Development training in nakuru with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Video Game Development in nakuru?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nakuru and surrounding areas'
      ]}
      courseLink="/courses/video-game-development-diploma"
      courseLinkText="View Full Video Game Development Course Details"
      faqs={[
        {
          question:
            "How does Nakuru's location influence my learning and networking opportunities in video game development?",
          answer:
            "Nakuru's strategic location not only offers access to a wide range of gaming markets but also positions you within a vibrant network of professionals from Nairobi to Western Kenya, enhancing learning and collaboration opportunities."
        },
        {
          question: 'Are there any local companies in Nakuru that hire video game developers?',
          answer:
            "Yes, Nakuru's growing tech scene, bolstered by manufacturing and educational tech firms, is increasingly in need of skilled video game developers, especially those focused on mobile and VR/AR games, offering numerous career opportunities."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Video Game Development Opportunities in nakuru"
      jobMarketText="nakuru is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Video Game Development program prepares you for the expanding job market. Students from nakuru are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Video Game Development Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Video Game Development program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Video Game Development Program Details"
      ctaButtonHref="/courses/video-game-development-certificate-rubika"
    />
  )
}
