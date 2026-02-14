import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function FilmProductionNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Premier Film School in Rift Valley - ADMI Film Production Nakuru',
        description:
          "East Africa's premier film school welcomes students from Nakuru and Rift Valley. All classes held at our state-of-the-art Nairobi campus with industry-leading facilities.",
        canonical: 'https://admi.ac.ke/courses/film-production-nakuru',
        keywords:
          'premier film school rift valley, top film school nakuru, leading film school kenya, film production nakuru, best film school rift valley, film school nakuru, admi'
      }}
      courseName="Film Production"
      city="Nakuru"
      pageTitle="Premier Film School in Rift Valley - Film Production Course"
      subtitle="East Africa's premier film school welcomes students from Nakuru and Rift Valley. All classes at our state-of-the-art Nairobi campus"
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
      jobMarketTitle="Film Production Job Market in nakuru"
      jobMarketText="nakuru is a growing hub for creative industries in Kenya. As Kenya's capital,000, the ADMI offers excellent opportunities for Film Production graduates. The creative sector in Rift Valley is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Film Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Film Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Film Production Program Details"
      ctaButtonHref="/courses/film-and-television-production-diploma"
    />
  )
}
