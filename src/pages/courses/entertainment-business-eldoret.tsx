import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function EntertainmentBusinessEldoretPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Entertainment Business Course in Rift Valley - ADMI',
        description:
          'Best Entertainment Business course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/entertainment-business-eldoret',
        keywords: 'entertainment-business, eldoret, course, training, kenya, admi'
      }}
      courseName="Entertainment Business"
      city="Eldoret"
      pageTitle="Entertainment Business Course in Rift Valley"
      subtitle="Professional Entertainment Business training in eldoret with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Entertainment Business in eldoret?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from eldoret and surrounding areas'
      ]}
      courseLink="/courses/entertainment-business-diploma"
      courseLinkText="View Full Entertainment Business Course Details"
      faqs={[
        {
          question: "How does Eldoret's startup ecosystem influence the entertainment-business course?",
          answer:
            "Eldoret's growing startup scene, particularly in tech and sports, enriches the course with real-world applications in digital marketing, event management, and content monetization, tapping into the local demand for digital skills."
        },
        {
          question:
            'What are the local career opportunities in Eldoret after completing the entertainment-business course?',
          answer:
            "Graduates can leverage opportunities in the region's expanding media houses, sports organizations, and the vibrant event scene, including agricultural expos and cultural festivals, for careers in marketing, production, and talent management."
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Entertainment Business Opportunities in eldoret"
      jobMarketText="eldoret is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Entertainment Business program prepares you for the expanding job market. Students from eldoret are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Entertainment Business Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Entertainment Business program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Entertainment Business Program Details"
      ctaButtonHref="/courses/entertainment-business-diploma"
    />
  )
}
