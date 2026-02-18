import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function AnimationNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Animation Course in Rift Valley - ADMI',
        description:
          'Best Animation course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/animation-nakuru',
        keywords: 'animation, nakuru, course, training, kenya, admi'
      }}
      courseName="Animation"
      city="Nakuru"
      pageTitle="Animation Course in Rift Valley"
      subtitle="Nakuru offers a vibrant market for animators, uniquely benefiting from its strategic position to service both Nairobi's and Western Kenya's burgeoning digital content demand. The city's growing manufacturing, agriculture, and tourism sectors increasingly rely on animated marketing and educational content, presenting a fertile ground for animation professionals."
      whyTitle="Why Choose Animation in nakuru?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nakuru and surrounding areas'
      ]}
      courseLink="/courses/animation-and-motion-graphics-diploma"
      courseLinkText="View Full Animation Course Details"
      faqs={[
        {
          question: "How does Nakuru's location influence the animation course experience?",
          answer:
            "Nakuru's strategic location allows for unique cross-market insights in animation, offering students exposure to a diverse range of projects from both Nairobi and Western Kenya, enriching their learning and creative application."
        },
        {
          question: 'Are there local animation studios or related industries in Nakuru?',
          answer:
            'Yes, Nakuru is home to emerging animation studios, and its proximity to major manufacturing and agricultural firms, as well as tourism businesses, provides ample opportunities for animators in advertising and promotional content creation.'
        }
      ]}
      details={[
        { label: 'Duration', value: '18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Animation Opportunities in nakuru"
      jobMarketText="nakuru is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Animation program prepares you for the expanding job market. Students from nakuru are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Animation Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Animation program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Animation Program Details"
      ctaButtonHref="/courses/animation-and-motion-graphics-diploma"
    />
  )
}
