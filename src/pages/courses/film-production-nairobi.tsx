import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function FilmProductionNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Premier Film School in Nairobi - ADMI Film Production Course',
        description:
          'Top-rated film school in East Africa. Premier Film Production training in Nairobi, Kenya. Leading film school with industry experts, state-of-the-art facilities, and 90% job placement rate.',
        canonical: 'https://admi.ac.ke/courses/film-production-nairobi',
        keywords:
          'premier film school nairobi, top rated film school kenya, leading film school east africa, film production nairobi, best film school kenya, film school nairobi, cinematography school kenya, admi'
      }}
      courseName="Film Production"
      city="Nairobi"
      pageTitle="Premier Film School in Nairobi - Film Production Course"
      subtitle="East Africa&apos;s top-rated film school. Premier Film Production training in Nairobi with industry-leading experts and 90% job placement rate"
      whyTitle="Why Choose East Africa's Premier Film School?"
      highlights={[
        '🏆 Top-rated film school in East Africa with regional recognition',
        '🎬 Industry-leading curriculum designed by film industry professionals',
        '⭐ Award-winning instructors with international film experience',
        '🎥 State-of-the-art HD and digital cinema equipment',
        '📈 90% job placement rate with leading production companies',
        "🌍 Partnerships with Africa's vibrant film industry and international studios",
        '💼 Comprehensive career support and industry networking'
      ]}
      courseLink="/courses/film-and-television-production-diploma"
      courseLinkText="View Full Film Production Course Details"
      details={[
        { label: 'Duration', value: '18 months' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Film Production Job Market in Nairobi"
      jobMarketText="Nairobi is a growing hub for creative industries in Kenya. As Kenya's capital, ADMI offers excellent opportunities for Film Production graduates. The creative sector in Nairobi is expanding rapidly, creating numerous job opportunities for skilled professionals."
      ctaTitle="🎯 Ready to Start Your Film Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Film Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Film Production Program Details"
      ctaButtonHref="/courses/film-and-television-production-diploma"
    />
  )
}
