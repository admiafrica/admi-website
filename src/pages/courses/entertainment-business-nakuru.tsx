import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function EntertainmentBusinessNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Entertainment Business Course in Rift Valley - ADMI',
        description:
          'Best Entertainment Business course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/entertainment-business-nakuru',
        keywords: 'entertainment-business, nakuru, course, training, kenya, admi'
      }}
      courseName="Entertainment Business"
      city="Nakuru"
      pageTitle="Entertainment Business Course in Rift Valley"
      subtitle="Professional Entertainment Business training in nakuru with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Entertainment Business in nakuru?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nakuru and surrounding areas'
      ]}
      courseLink="/courses/entertainment-business-diploma"
      courseLinkText="View Full Entertainment Business Course Details"
      faqs={[
        {
          question: "How does Nakuru's strategic location benefit my entertainment-business studies?",
          answer:
            "Studying in Nakuru places you at the crossroads of the Kenyan entertainment industry, with unique access to both the Nairobi market and the untapped potential of Western Kenya. This positions you perfectly for practical learning and networking within the industry's key areas."
        },
        {
          question: 'Are there local firms in Nakuru where I can intern or work after completing my course?',
          answer:
            "Absolutely. Nakuru is home to dynamic sectors including tourism businesses and local media houses that are always on the lookout for fresh talent in event management, digital marketing, and content production. The city's growth in digital events and influencer management also opens up new career paths."
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Entertainment Business Opportunities in nakuru"
      jobMarketText="nakuru is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Entertainment Business program prepares you for the expanding job market. Students from nakuru are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Entertainment Business Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Entertainment Business program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Entertainment Business Program Details"
      ctaButtonHref="/courses/entertainment-business-diploma"
    />
  )
}
