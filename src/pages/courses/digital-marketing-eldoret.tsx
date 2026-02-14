import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function DigitalMarketingEldoretPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Digital Marketing Course in Rift Valley - ADMI',
        description:
          'Best Digital Marketing course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/digital-marketing-eldoret',
        keywords: 'digital-marketing, eldoret, course, training, kenya, admi'
      }}
      courseName="Digital Marketing"
      city="Eldoret"
      pageTitle="Digital Marketing Course in Rift Valley"
      subtitle="Eldoret's emerging startup ecosystem, particularly in AgriTech and sports innovation, presents unique opportunities for digital marketers to carve out niche expertise. Coupled with its growing e-commerce platforms, professionals can leverage skills in SEO/SEM and social media marketing to drive regional growth."
      whyTitle="Why Choose Digital Marketing in eldoret?"
      highlights={[
        'Industry-relevant curriculum designed for Rift Valley market',
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment',
        '90% job placement rate in eldoret and surrounding areas',
        'Flexible payment plans available',
        'Career support and internship opportunities'
      ]}
      courseLink="/courses/digital-marketing-diploma"
      courseLinkText="View Full Digital Marketing Course Details"
      faqs={[
        {
          question: "How does Eldoret's startup scene influence the digital marketing course content?",
          answer:
            "The course is tailored to address the unique needs of Eldoret's booming startup ecosystem, focusing on AgriTech and sports marketing, and includes case studies and projects from local companies."
        },
        {
          question: 'Are there opportunities in Eldoret for digital marketing professionals?',
          answer:
            "Absolutely. Beyond startups, Eldoret's regional media houses and e-commerce ventures are on the lookout for skilled digital marketers to elevate their online presence and engagement."
        }
      ]}
      details={[
        { label: 'Duration', value: '4 months per level (3 levels)' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Digital Marketing Job Market in eldoret"
      jobMarketText="eldoret is a growing hub for creative industries in Kenya. As Kenya's capital,000, the ADMI offers excellent opportunities for Digital Marketing graduates. The creative sector in Rift Valley is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Digital Marketing Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Digital Marketing program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Digital Marketing Program Details"
      ctaButtonHref="/courses/digital-marketing-certificate"
    />
  )
}
