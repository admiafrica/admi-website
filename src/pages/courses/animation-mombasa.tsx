import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function AnimationMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Animation Course in Coast - ADMI',
        description:
          'Best Animation course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/animation-mombasa',
        keywords: 'animation, mombasa, course, training, kenya, admi'
      }}
      courseName="Animation"
      city="Mombasa"
      pageTitle="Animation Course in Coast"
      subtitle="In Mombasa, the animation sector is uniquely poised for growth, driven by the tourism industry's expanding need for innovative digital content. This city, with its picturesque Island, Nyali, and Bamburi areas, offers abundant inspiration for animators specializing in 2D/3D animation, character design, and VFX, catering to the hospitality and tourism brands seeking to captivate visitors with immersive experiences."
      whyTitle="Why Choose Animation in mombasa?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from mombasa and surrounding areas'
      ]}
      courseLink="/courses/animation-and-motion-graphics-diploma"
      courseLinkText="View Full Animation Course Details"
      faqs={[
        {
          question: "How does Mombasa's unique setting benefit my animation studies?",
          answer:
            "Mombasa's diverse cultural and coastal environment offers a rich tapestry of stories and visuals, providing animation students unique material for character design, motion graphics, and visual effects, enhancing creativity and distinctiveness in their work."
        },
        {
          question: 'Are there local career opportunities in animation within Mombasa?',
          answer:
            "Yes, Mombasa's animation career opportunities are growing, especially within the tourism and hospitality sectors, coastal media houses, and advertising agencies looking for engaging content to attract both local and international audiences."
        }
      ]}
      details={[
        { label: 'Duration', value: '18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Animation Opportunities in mombasa"
      jobMarketText="mombasa is an important center in Coast with growing opportunities in Kenya's creative and digital industries. ADMI's Animation program prepares you for the expanding job market. Students from mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Animation Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Animation program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Animation Program Details"
      ctaButtonHref="/courses/animation-and-motion-graphics-diploma"
    />
  )
}
