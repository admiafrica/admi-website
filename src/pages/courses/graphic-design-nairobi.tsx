import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function GraphicDesignNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: "Kenya's Most Sought-After Graphic Design Course - ADMI Nairobi",
        description:
          "Industry's best-kept secret: ADMI's revolutionary Graphic Design program in Nairobi. Learn from star teachers like Brian Omolo. Over 90% employment rate. State-of-the-art facilities.",
        canonical: 'https://admi.ac.ke/courses/graphic-design-nairobi',
        keywords:
          'best graphic design course kenya, graphic design nairobi, brian omolo admi, top graphic design school kenya, graphic design diploma nairobi, digital art kenya, admi'
      }}
      courseName="Graphic Design"
      city="Nairobi"
      pageTitle="Kenya's Most Sought-After Graphic Design Course"
      subtitle="The industry's best-kept secret: Revolutionary Graphic Design program with star teachers like Brian Omolo. Over 90% employment rate"
      whyTitle="Why ADMI is Kenya's Best-Kept Secret for Graphic Design"
      highlights={[
        '🎆 <strong>Star Faculty:</strong> Learn from industry legends like Brian Omolo, revolutionizing digital art & murals across Nairobi',
        '📈 <strong>Outstanding Results:</strong> Over 90% employment rate - the highest in Kenya',
        '🏆 <strong>Industry Recognition:</strong> Most sought-after course among creative professionals',
        '✨ <strong>Cutting-Edge Equipment:</strong> State-of-the-art design labs and professional-grade software',
        '🎨 <strong>Revolutionary Techniques:</strong> Master digital art, murals, and contemporary design methods',
        "🌐 <strong>Industry Connections:</strong> Direct access to Kenya's top design studios and agencies",
        '💼 <strong>Guaranteed Success:</strong> Comprehensive career support with proven track record'
      ]}
      courseLink="/courses/graphic-design-diploma"
      courseLinkText="View Full Graphic Design Course Details"
      faqs={[
        {
          question: "How does Nairobi's tech boom impact graphic design students?",
          answer:
            "Nairobi's tech boom offers graphic design students unique opportunities to engage with cutting-edge digital design trends and work alongside leading tech companies and startups, making it an ideal environment for learning and innovation."
        },
        {
          question: "Are there opportunities for graphic designers in Nairobi's advertising agencies?",
          answer:
            "Absolutely. Nairobi's dynamic advertising scene is on the lookout for skilled graphic designers with fresh ideas, especially those proficient in digital-first design and motion graphics, to cater to an increasingly digital marketplace."
        }
      ]}
      details={[
        { label: 'Duration', value: '15 months' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Graphic Design Job Market in nairobi"
      jobMarketText="nairobi is a growing hub for creative industries in Kenya. As Kenya's capital, the ADMI offers excellent opportunities for Graphic Design graduates. The creative sector in Nairobi is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Graphic Design Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Graphic Design program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Graphic Design Program Details"
      ctaButtonHref="/courses/graphic-design-diploma"
    />
  )
}
