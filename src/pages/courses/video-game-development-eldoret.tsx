import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function VideoGameDevelopmentEldoretPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Video Game Development Course in Rift Valley - ADMI',
        description:
          'Best Video Game Development course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/video-game-development-eldoret',
        keywords: 'video-game-development, eldoret, course, training, kenya, admi'
      }}
      courseName="Video Game Development"
      city="Eldoret"
      pageTitle="Video Game Development Course in Rift Valley"
      subtitle="Professional Video Game Development training in eldoret with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Video Game Development in eldoret?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from eldoret and surrounding areas'
      ]}
      courseLink="/courses/video-game-development-diploma"
      courseLinkText="View Full Video Game Development Course Details"
      faqs={[
        {
          question: 'How does Eldoret’s startup culture benefit my learning in video game development?',
          answer:
            "Eldoret's growing digital and tech startup scene offers a vibrant community for innovation and creativity, providing students with real-world project opportunities and networking with local entrepreneurs and tech enthusiasts."
        },
        {
          question: 'Are there local companies in Eldoret interested in game development skills?',
          answer:
            "Yes, with Eldoret's tech ecosystem expanding, companies in educational tech and agricultural technology are showing interest in gamified simulations and training tools, thus valuing game development skills more than ever."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Video Game Development Opportunities in eldoret"
      jobMarketText="eldoret is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Video Game Development program prepares you for the expanding job market. Students from eldoret are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Video Game Development Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Video Game Development program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Video Game Development Program Details"
      ctaButtonHref="/courses/video-game-development-certificate-rubika"
    />
  )
}
