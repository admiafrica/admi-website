import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function AnimationEldoretPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Animation Course in Rift Valley - ADMI',
        description:
          'Best Animation course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/animation-eldoret',
        keywords: 'animation, eldoret, course, training, kenya, admi'
      }}
      courseName="Animation"
      city="Eldoret"
      pageTitle="Animation Course in Rift Valley"
      subtitle="In Eldoret, the burgeoning startup ecosystem, intertwined with agricultural technology and regional media sectors, presents a fertile ground for animation professionals. The city's unique positioning as a digital skills hub in North Rift offers extensive opportunities in creating animated content for educational purposes, marketing campaigns, and sports organizations."
      whyTitle="Why Choose Animation in eldoret?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from eldoret and surrounding areas'
      ]}
      courseLink="/courses/animation-and-motion-graphics-diploma"
      courseLinkText="View Full Animation Course Details"
      faqs={[
        {
          question: 'How can the animation course in Eldoret leverage the local startup ecosystem?',
          answer:
            'The course is designed to equip students with skills in 2D/3D animation and VFX, tapping into Eldoret’s startup ecosystem which is ripe for digital content creation, especially for agricultural technology, and regional media sectors seeking innovative marketing and educational tools.'
        },
        {
          question: 'Are there local employment opportunities in Eldoret for animation graduates?',
          answer:
            'Yes, Eldoret offers a growing number of opportunities for animation professionals, especially within advertising agencies, regional media houses, and the emerging gaming sector. Additionally, the city’s sports organizations are increasingly incorporating animated content for promotional purposes.'
        }
      ]}
      details={[
        { label: 'Duration', value: '18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Animation Opportunities in eldoret"
      jobMarketText="eldoret is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Animation program prepares you for the expanding job market. Students from eldoret are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Animation Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Animation program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Animation Program Details"
      ctaButtonHref="/courses/animation-and-motion-graphics-diploma"
    />
  )
}
