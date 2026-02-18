import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function DigitalMarketingKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Digital Marketing Course in Western - ADMI',
        description:
          'Best Digital Marketing course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/digital-marketing-kisumu',
        keywords: 'digital-marketing, kisumu, course, training, kenya, admi'
      }}
      courseName="Digital Marketing"
      city="Kisumu"
      pageTitle="Digital Marketing Course in Western"
      subtitle="Kisumu, emerging as a vibrant tech hub in Western Kenya, offers unique opportunities for digital marketers. With a growing base of tech startups, agricultural tech firms, and international NGOs, the city's lesser competition for creative roles compared to Nairobi opens vast avenues for fresh digital marketing talents. Specializing in skills like SEO/SEM and influencer marketing can position you as a sought-after expert in this burgeoning market."
      whyTitle="Why Choose Digital Marketing in kisumu?"
      highlights={[
        'Industry-relevant curriculum designed for Western market',
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment',
        '90% job placement rate in kisumu and surrounding areas',
        'Flexible payment plans available',
        'Career support and internship opportunities'
      ]}
      courseLink="/courses/digital-marketing-diploma"
      courseLinkText="View Full Digital Marketing Course Details"
      faqs={[
        {
          question: "How relevant is a digital marketing course in Kisumu's tech and agricultural sectors?",
          answer:
            "Extremely relevant. Kisumu's growing tech and agricultural sectors are increasingly leveraging digital marketing to scale their operations. Learning cutting-edge skills such as AI-powered marketing and analytics positions you as a valuable asset within these industries."
        },
        {
          question: 'Are there ample career opportunities in Kisumu for digital marketing professionals?',
          answer:
            'Yes. With major employers like Lake Region media, numerous agri-tech firms, and international NGOs, Kisumu offers a rich landscape for digital marketing careers. The local emergence of e-commerce and tech startups further amplifies career options.'
        }
      ]}
      details={[
        { label: 'Duration', value: '4 months per level (3 levels)' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Digital Marketing Job Market in kisumu"
      jobMarketText="kisumu is a growing hub for creative industries in Kenya. As Kenya's capital,000, the ADMI offers excellent opportunities for Digital Marketing graduates. The creative sector in Western is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Digital Marketing Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Digital Marketing program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Digital Marketing Program Details"
      ctaButtonHref="/courses/digital-marketing-certificate"
    />
  )
}
