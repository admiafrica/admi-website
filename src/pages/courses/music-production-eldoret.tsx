import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function MusicProductionEldoretPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Music Production Course in Rift Valley - ADMI',
        description:
          'Best Music Production course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/music-production-eldoret',
        keywords: 'music-production, eldoret, course, training, kenya, admi'
      }}
      courseName="Music Production"
      city="Eldoret"
      pageTitle="Music Production Course in Rift Valley"
      subtitle="Eldoret, with its burgeoning startup ecosystem especially in agri-tech and sports, presents a unique avenue for music production students to blend digital skills with local content creation. The diverse cultures and stories within the North Rift region provide rich material for audio storytelling, beat production for local artists, and podcasting about regional developments."
      whyTitle="Why Choose Music Production in eldoret?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from eldoret and surrounding areas'
      ]}
      courseLink="/courses/music-production-diploma"
      courseLinkText="View Full Music Production Course Details"
      faqs={[
        {
          question: "How relevant is a music production course in Eldoret's current economic landscape?",
          answer:
            "Given Eldoret's growing interest in digital and creative fields, coupled with the regional demand for digital marketing in agri-tech and sports, a music production course is highly relevant. It opens doors to creating digital audio content for local businesses and entertainers."
        },
        {
          question: 'Are there local outlets or platforms in Eldoret where I can showcase my music production skills?',
          answer:
            'Yes, Eldoret boasts several local media houses, event companies, and a vibrant live music scene. Emerging artists and startups in the city are always on the lookout for fresh talent in audio engineering and beat production to elevate their digital presence.'
        }
      ]}
      details={[
        { label: 'Duration', value: '12 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Music Production Opportunities in eldoret"
      jobMarketText="eldoret is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Music Production program prepares you for the expanding job market. Students from eldoret are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Music Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Music Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Music Production Program Details"
      ctaButtonHref="/courses/music-production-diploma"
    />
  )
}
