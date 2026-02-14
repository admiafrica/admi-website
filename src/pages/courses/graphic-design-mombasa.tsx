import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function GraphicDesignMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: "Kenya's Most Sought-After Graphic Design Course - ADMI",
        description:
          "Industry's best-kept secret for students from Mombasa. Learn from star teachers like Brian Omolo at our Nairobi campus. Over 90% employment rate.",
        canonical: 'https://admi.ac.ke/courses/graphic-design-mombasa',
        keywords:
          'best graphic design course kenya, graphic design school mombasa, brian omolo graphic design, top design school kenya, graphic design diploma kenya, admi'
      }}
      courseName="Graphic Design"
      city="Mombasa"
      pageTitle="Kenya's Most Sought-After Graphic Design Course"
      subtitle="Welcoming students from Mombasa to Kenya's best-kept secret. Learn from star teacher Brian Omolo at our Nairobi campus. Over 90% employment rate"
      whyTitle="Why ADMI is Kenya's Best-Kept Secret for Graphic Design"
      highlights={[
        '🌆 <strong>Star Faculty:</strong> Learn from industry legends like Brian Omolo, revolutionizing digital art & murals across Nairobi',
        '📈 <strong>Outstanding Results:</strong> Over 90% employment rate - the highest in Kenya',
        '🏆 <strong>Industry Recognition:</strong> Most sought-after course among creative professionals',
        '🎬 <strong>Nairobi Campus:</strong> All classes at our state-of-the-art Nairobi facilities',
        '✨ <strong>Cutting-Edge Equipment:</strong> Professional-grade design labs and software',
        '🎨 <strong>Revolutionary Techniques:</strong> Master digital art, murals, and contemporary design'
      ]}
      courseLink="/courses/graphic-design-diploma"
      courseLinkText="View Full Graphic Design Course Details"
      faqs={[
        {
          question: "How relevant is a graphic design course in Mombasa's job market?",
          answer:
            'Extremely relevant. Mombasa’s economy thrives on tourism and hospitality, sectors that increasingly rely on digital marketing and branding. Graphic designers with skills in UI/UX, brand design, and digital illustration are in high demand to create engaging content for these industries.'
        },
        {
          question: 'Are there local Mombasa companies hiring graphic designers?',
          answer:
            "Yes, there are numerous opportunities in Mombasa. Local hospitality brands, advertising agencies, and coastal media houses frequently seek skilled graphic designers. Additionally, the city's growing tech scene offers roles in UI/UX and digital product design, along with freelance projects."
        }
      ]}
      details={[
        { label: 'Duration', value: '15 months' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Graphic Design Job Market in mombasa"
      jobMarketText="mombasa is a growing hub for creative industries in Kenya. As Kenya's capital, the ADMI offers excellent opportunities for Graphic Design graduates. The creative sector in Coast is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Graphic Design Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Graphic Design program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Graphic Design Program Details"
      ctaButtonHref="/courses/graphic-design-diploma"
    />
  )
}
