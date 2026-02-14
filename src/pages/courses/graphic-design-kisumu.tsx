import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function GraphicDesignKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: "Kenya's Most Sought-After Graphic Design Course - ADMI",
        description:
          "Industry's best-kept secret for students from Kisumu. Learn from star teachers like Brian Omolo at our Nairobi campus. Over 90% employment rate.",
        canonical: 'https://admi.ac.ke/courses/graphic-design-kisumu',
        keywords:
          'best graphic design course kenya, graphic design school kisumu, brian omolo graphic design, top design school kenya, graphic design diploma kenya, admi'
      }}
      courseName="Graphic Design"
      city="Kisumu"
      pageTitle="Kenya's Most Sought-After Graphic Design Course"
      subtitle="Welcoming students from Kisumu to Kenya's best-kept secret. Learn from star teacher Brian Omolo at our Nairobi campus. Over 90% employment rate"
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
          question: "How does Kisumu's emerging tech scene influence the graphic design course curriculum?",
          answer:
            "The curriculum is tailored to meet Kisumu’s unique market needs, focusing on digital-first design and UI/UX, preparing students for roles in the city's growing tech firms and agricultural technology companies."
        },
        {
          question: "Are there ample opportunities for graphic designers in Kisumu's job market?",
          answer:
            "Yes, Kisumu's job market is ripe for graphic designers, especially in new media houses, tech start-ups, and NGOs requiring brand design and digital marketing solutions, thanks to its status as a budding tech hub."
        }
      ]}
      details={[
        { label: 'Duration', value: '15 months' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Graphic Design Job Market in kisumu"
      jobMarketText="kisumu is a growing hub for creative industries in Kenya. As Kenya's capital,000, the ADMI offers excellent opportunities for Graphic Design graduates. The creative sector in Western is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Graphic Design Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Graphic Design program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Graphic Design Program Details"
      ctaButtonHref="/courses/graphic-design-diploma"
    />
  )
}
