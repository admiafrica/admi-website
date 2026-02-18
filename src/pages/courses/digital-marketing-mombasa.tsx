import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function DigitalMarketingMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Digital Marketing Course in Coast - ADMI',
        description:
          'Best Digital Marketing course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/digital-marketing-mombasa',
        keywords: 'digital-marketing, mombasa, course, training, kenya, admi'
      }}
      courseName="Digital Marketing"
      city="Mombasa"
      pageTitle="Digital Marketing Course in Coast"
      subtitle="Mombasa, with its thriving tourism sector and vibrant hospitality brands, presents a fertile ground for digital marketers. The city's demand for engaging digital content to showcase its rich cultural heritage and tourist attractions creates unique opportunities for those skilled in social media marketing, SEO/SEM, and analytics, particularly in leveraging the booming influencer and video content trends."
      whyTitle="Why Choose Digital Marketing in mombasa?"
      highlights={[
        'Industry-relevant curriculum designed for Coast market',
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment',
        '90% job placement rate in mombasa and surrounding areas',
        'Flexible payment plans available',
        'Career support and internship opportunities'
      ]}
      courseLink="/courses/digital-marketing-diploma"
      courseLinkText="View Full Digital Marketing Course Details"
      faqs={[
        {
          question: "How relevant is a digital marketing course in Mombasa's tourism-driven economy?",
          answer:
            "In Mombasa's tourism-centric economy, digital marketing skills are invaluable. Businesses seek to capitalize on online platforms to reach a global audience, making skills in social media marketing, SEO/SEM, and content marketing especially relevant for promoting local attractions and services."
        },
        {
          question: 'Are there local career opportunities in digital marketing in Mombasa?',
          answer:
            "Absolutely. Mombasa's growing tourism and hospitality industries are on the lookout for digital marketing professionals. Local coastal media houses and emerging tech startups also offer opportunities for those skilled in the latest digital marketing trends, including AI-powered marketing."
        }
      ]}
      details={[
        { label: 'Duration', value: '4 months per level (3 levels)' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Digital Marketing Job Market in mombasa"
      jobMarketText="mombasa is a growing hub for creative industries in Kenya. As Kenya's capital, the ADMI offers excellent opportunities for Digital Marketing graduates. The creative sector in Coast is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Digital Marketing Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Digital Marketing program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Digital Marketing Program Details"
      ctaButtonHref="/courses/digital-marketing-certificate"
    />
  )
}
