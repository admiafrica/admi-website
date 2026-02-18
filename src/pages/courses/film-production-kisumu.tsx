import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function FilmProductionKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Premier Film School in Western Kenya - ADMI Film Production Kisumu',
        description:
          "East Africa's premier film school welcomes students from Kisumu and Western Kenya. All classes held at our state-of-the-art Nairobi campus with industry-leading facilities.",
        canonical: 'https://admi.ac.ke/courses/film-production-kisumu',
        keywords:
          'premier film school western kenya, top film school kisumu, leading film school kenya, film production kisumu, best film school western, film school kisumu, admi'
      }}
      courseName="Film Production"
      city="Kisumu"
      pageTitle="Premier Film School in Western Kenya - Film Production Course"
      subtitle="East Africa's premier film school welcomes students from Kisumu and Western Kenya. All classes at our state-of-the-art Nairobi campus"
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
      jobMarketTitle="Film Production Job Market in kisumu"
      jobMarketText="Kisumu is a growing hub for creative industries in Western Kenya. ADMI welcomes students from Kisumu and the Western region, with all classes conducted at our state-of-the-art Nairobi campus. The creative sector in Kenya is expanding rapidly, creating numerous job opportunities for skilled film production professionals."
      ctaTitle="🎯 Ready to Start Your Film Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Film Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Film Production Program Details"
      ctaButtonHref="/courses/film-and-television-production-diploma"
    />
  )
}
