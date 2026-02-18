import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function DigitalMarketingNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Digital Marketing Course in Rift Valley - ADMI',
        description:
          'Best Digital Marketing course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/digital-marketing-nakuru',
        keywords: 'digital-marketing, nakuru, course, training, kenya, admi'
      }}
      courseName="Digital Marketing"
      city="Nakuru"
      pageTitle="Digital Marketing Course in Rift Valley"
      subtitle="Nakuru offers a ripe market for digital marketers, with its booming manufacturing, agriculture, and tourism sectors. Its strategic location, bridging Nairobi and Western Kenya, presents a unique advantage for those skilled in digital marketing to carve out niches in both local and regional markets. Leveraging Nakuru's diverse economic landscape, professionals can harness digital platforms to elevate brands across the Rift Valley and beyond."
      whyTitle="Why Choose Digital Marketing in nakuru?"
      highlights={[
        'Industry-relevant curriculum designed for Rift Valley market',
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment',
        '90% job placement rate in nakuru and surrounding areas',
        'Flexible payment plans available',
        'Career support and internship opportunities'
      ]}
      courseLink="/courses/digital-marketing-diploma"
      courseLinkText="View Full Digital Marketing Course Details"
      faqs={[
        {
          question: "How relevant is a digital marketing course to Nakuru's job market?",
          answer:
            'In Nakuru, the demand for digital marketing skills is surging, particularly within the manufacturing, agribusiness, and tourism sectors. A digital marketing course equips professionals to meet the local and regional market needs, offering strategic insights into consumer behavior and digital trends that are vital for businesses in these industries.'
        },
        {
          question: 'Are there local businesses in Nakuru that hire digital marketers?',
          answer:
            "Yes, many of Nakuru's leading businesses, especially within the manufacturing, agricultural, and tourism sectors, actively seek digital marketers. These firms are looking to expand their online presence and engage with both local and international markets more effectively, creating ample opportunities for skilled professionals."
        }
      ]}
      details={[
        { label: 'Duration', value: '4 months per level (3 levels)' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Digital Marketing Job Market in nakuru"
      jobMarketText="nakuru is a growing hub for creative industries in Kenya. As Kenya's capital,000, the ADMI offers excellent opportunities for Digital Marketing graduates. The creative sector in Rift Valley is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Digital Marketing Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Digital Marketing program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Digital Marketing Program Details"
      ctaButtonHref="/courses/digital-marketing-certificate"
    />
  )
}
