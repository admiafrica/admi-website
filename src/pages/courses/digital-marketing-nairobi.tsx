import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function DigitalMarketingNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Digital Marketing Course in Nairobi - ADMI',
        description:
          'Best Digital Marketing course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/digital-marketing-nairobi',
        keywords: 'digital-marketing, nairobi, course, training, kenya, admi'
      }}
      courseName="Digital Marketing"
      city="Nairobi"
      pageTitle="Digital Marketing Course in Nairobi"
      subtitle="Nairobi, the heart of Kenya's largest creative job market, offers unparalleled access to digital marketing careers, especially within tech startups, e-commerce, and corporate marketing departments of major employers like Safaricom. The city's vibrant influencer and video content scene provides a unique landscape for those skilled in social media marketing, SEO/SEM, and analytics."
      whyTitle="Why Study Digital Marketing for Nairobi?"
      highlights={[
        'Industry-relevant curriculum designed for Nairobi market',
        'Direct networking with Safaricom, Nation Media Group professionals',
        "Access to Kenya's largest creative job market",
        '90% job placement rate in Nairobi and surrounding areas',
        'Flexible payment plans available',
        'Career support and internship opportunities'
      ]}
      courseLink="/courses/digital-marketing-diploma"
      courseLinkText="View Full Digital Marketing Course Details"
      faqs={[
        {
          question: "How does Nairobi's tech ecosystem enhance my learning in digital marketing?",
          answer:
            "Nairobi's thriving tech ecosystem, highlighted by numerous startups and tech hubs, provides a real-world laboratory for digital marketing students. You'll get to apply concepts in SEO/SEM and content marketing directly to the city's dynamic online commerce and tech innovation."
        },
        {
          question: 'What kind of local career opportunities can I expect after completing the course in Nairobi?',
          answer:
            "Graduates can look forward to roles in Nairobi's leading tech companies, media houses like Nation Media Group, and in the marketing departments of major corporations such as Safaricom. The city's growing emphasis on AI-powered marketing and e-commerce opens up numerous opportunities."
        }
      ]}
      details={[
        { label: 'Duration', value: '4 months per level (3 levels)' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Digital Marketing Job Market in nairobi"
      jobMarketText="nairobi is a growing hub for creative industries in Kenya. As Kenya's capital, the ADMI offers excellent opportunities for Digital Marketing graduates. The creative sector in Nairobi is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Digital Marketing Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Digital Marketing program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Digital Marketing Program Details"
      ctaButtonHref="/courses/digital-marketing-certificate"
    />
  )
}
