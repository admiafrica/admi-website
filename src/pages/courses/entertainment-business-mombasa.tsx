import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function EntertainmentBusinessMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Entertainment Business Course in Coast - ADMI',
        description:
          'Best Entertainment Business course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/entertainment-business-mombasa',
        keywords: 'entertainment-business, mombasa, course, training, kenya, admi'
      }}
      courseName="Entertainment Business"
      city="Mombasa"
      pageTitle="Entertainment Business Course in Coast"
      subtitle="Professional Entertainment Business training in mombasa with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Entertainment Business in mombasa?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from mombasa and surrounding areas'
      ]}
      courseLink="/courses/entertainment-business-diploma"
      courseLinkText="View Full Entertainment Business Course Details"
      faqs={[
        {
          question: 'How relevant is the entertainment-business course to Mombasa’s tourism and hospitality sector?',
          answer:
            'This course is highly relevant to Mombasa’s market, equipping students with skills in event and talent management, crucial for enhancing the city’s tourism and hospitality offerings. It also covers digital marketing and content monetization, key to tapping into the digital transformation within the tourism sector.'
        },
        {
          question: 'Are there ample career opportunities in Mombasa for entertainment-business graduates?',
          answer:
            "Absolutely. Mombasa's entertainment sector is vibrant, with opportunities in coastal media houses, event agencies, and within the tourism and hospitality industry seeking professionals in event management, marketing, and digital content production. The city's unique cultural and tourism landscape offers a dynamic environment for entertainment-business careers."
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Entertainment Business Opportunities in mombasa"
      jobMarketText="mombasa is an important center in Coast with growing opportunities in Kenya's creative and digital industries. ADMI's Entertainment Business program prepares you for the expanding job market. Students from mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Entertainment Business Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Entertainment Business program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Entertainment Business Program Details"
      ctaButtonHref="/courses/entertainment-business-diploma"
    />
  )
}
