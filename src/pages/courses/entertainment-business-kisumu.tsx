import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function EntertainmentBusinessKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Entertainment Business Course in Western - ADMI',
        description:
          'Best Entertainment Business course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/entertainment-business-kisumu',
        keywords: 'entertainment-business, kisumu, course, training, kenya, admi'
      }}
      courseName="Entertainment Business"
      city="Kisumu"
      pageTitle="Entertainment Business Course in Western"
      subtitle="Professional Entertainment Business training in kisumu with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Entertainment Business in kisumu?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from kisumu and surrounding areas'
      ]}
      courseLink="/courses/entertainment-business-diploma"
      courseLinkText="View Full Entertainment Business Course Details"
      faqs={[
        {
          question: "How does Kisumu's emerging tech scene benefit my entertainment-business studies?",
          answer:
            "Kisumu's tech scene fosters a unique learning environment, enabling you to integrate cutting-edge technologies into entertainment and event management. This positions you at the forefront of digital events and content monetization in Western Kenya."
        },
        {
          question: 'Are there ample career opportunities in Kisumu for entertainment-business graduates?',
          answer:
            "Yes, Kisumu offers growing opportunities in the entertainment sector, especially within Lake Region media houses, event agencies, and with agricultural tech firms and NGOs needing event and talent management. The city's tech evolution also opens doors to creating content and managing digital platforms."
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Entertainment Business Opportunities in kisumu"
      jobMarketText="kisumu is an important center in Western with growing opportunities in Kenya's creative and digital industries. ADMI's Entertainment Business program prepares you for the expanding job market. Students from kisumu are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Entertainment Business Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Entertainment Business program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Entertainment Business Program Details"
      ctaButtonHref="/courses/entertainment-business-diploma"
    />
  )
}
