import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function FilmProductionMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Premier Film School in Coast - ADMI Film Production Mombasa',
        description:
          "East Africa's premier film school welcomes students from Mombasa and Coast region. All classes held at our state-of-the-art Nairobi campus with industry-leading facilities.",
        canonical: 'https://admi.ac.ke/courses/film-production-mombasa',
        keywords:
          'premier film school coast, top film school mombasa, leading film school kenya, film production mombasa, best film school coast, film school mombasa, admi'
      }}
      courseName="Film Production"
      city="Mombasa"
      pageTitle="Premier Film School in Coast - Film Production Course"
      subtitle="East Africa's premier film school welcomes students from Mombasa and Coast region. All classes at our state-of-the-art Nairobi campus"
      whyTitle="Why Choose East Africa's Premier Film School?"
      highlights={[
        '🏆 Top-rated film school in East Africa with regional recognition',
        '🎬 All classes held at our modern Nairobi campus',
        '⭐ Award-winning instructors with international film experience',
        '🎥 State-of-the-art HD and digital cinema equipment in Nairobi',
        '📈 90% job placement rate across Kenya and East Africa',
        "🌍 Partnerships with Africa's vibrant film industry",
        '💼 Comprehensive career support and industry networking'
      ]}
      courseLink="/courses/film-and-television-production-diploma"
      courseLinkText="View Full Film Production Course Details"
      details={[
        { label: 'Duration', value: '18 months' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Film Production Job Market in mombasa"
      jobMarketText="mombasa is a growing hub for creative industries in Kenya. As Kenya's capital, the ADMI offers excellent opportunities for Film Production graduates. The creative sector in Coast is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Film Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Film Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Film Production Program Details"
      ctaButtonHref="/courses/film-and-television-production-diploma"
    />
  )
}
