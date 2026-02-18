import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function FilmProductionNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title:
          'East Africa&apos;s top-rated film school. Premier Film Production training in Nairobi with industry-leading experts and 90% job placement rate',
        description: '',
        canonical: '',
        keywords: ''
      }}
      courseName="Film Production"
      city="Nairobi"
      pageTitle="Film Production Course in Nairobi"
      subtitle="Best Film Production course in Nairobi, Kenya."
      whyTitle="Why Choose Film Production in Nairobi?"
      highlights={["Industry-relevant curriculum designed for Kenya's market"]}
      courseLink="/courses/film-and-television-production-diploma"
      courseLinkText="View Full Film Production Course Details"
      details={[
        { label: 'Duration', value: '18 months' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' }
      ]}
      jobMarketTitle="Film Production Opportunities in Nairobi"
      jobMarketText="Nairobi offers growing opportunities in Kenya's creative industries."
      ctaTitle="🎯 Ready to Start Your Film Production Journey?"
      ctaText="Take the next step towards your creative career."
      ctaButtonText="Explore Full Film Production Program Details"
      ctaButtonHref="/courses/film-and-television-production-diploma"
    />
  )
}
