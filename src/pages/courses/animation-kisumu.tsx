import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function AnimationKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Animation Course in Western - ADMI',
        description:
          'Best Animation course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/animation-kisumu',
        keywords: 'animation, kisumu, course, training, kenya, admi'
      }}
      courseName="Animation"
      city="Kisumu"
      pageTitle="Animation Course in Western"
      subtitle="In Kisumu, the burgeoning tech hub of Western Kenya, animation professionals have a unique edge due to emerging tech and creative sectors with lower competition. The presence of Lake Region media, agricultural tech firms, and international NGOs opens doors for animation in advertising, educational content, and digital storytelling, making Kisumu an ideal place for budding animators."
      whyTitle="Why Choose Animation in kisumu?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from kisumu and surrounding areas'
      ]}
      courseLink="/courses/animation-and-motion-graphics-diploma"
      courseLinkText="View Full Animation Course Details"
      faqs={[
        {
          question: "How does Kisumu's emerging tech hub status benefit animation students?",
          answer:
            "Kisumu's position as an emerging tech hub means animation students have first-hand access to innovative projects from agricultural tech firms and international NGOs. This unique environment fosters practical learning and networking opportunities with startups seeking fresh, creative content."
        },
        {
          question: 'Are there local companies in Kisumu that hire animators?',
          answer:
            'Yes, in Kisumu, animators find opportunities within Lake Region media companies, advertising agencies, and tech startups, particularly those focusing on agricultural technology. These employers are often in search of talent skilled in 2D/3D animation, motion graphics, and VFX to bring their digital content to life.'
        }
      ]}
      details={[
        { label: 'Duration', value: '18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Animation Opportunities in kisumu"
      jobMarketText="kisumu is an important center in Western with growing opportunities in Kenya's creative and digital industries. ADMI's Animation program prepares you for the expanding job market. Students from kisumu are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Animation Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Animation program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Animation Program Details"
      ctaButtonHref="/courses/animation-and-motion-graphics-diploma"
    />
  )
}
