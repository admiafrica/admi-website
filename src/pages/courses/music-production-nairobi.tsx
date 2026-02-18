import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function MusicProductionNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Music Production Course in Nairobi - ADMI',
        description:
          'Best Music Production course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/music-production-nairobi',
        keywords: 'music-production, nairobi, course, training, kenya, admi'
      }}
      courseName="Music Production"
      city="Nairobi"
      pageTitle="Music Production Course in Nairobi"
      subtitle="Nairobi, as the heart of Kenya's creative job market, offers unparalleled opportunities for music production students. With close proximity to major employers like Safaricom and Royal Media Services, students have direct paths to internships and jobs in recording studios, media houses, and with top-tier artists requiring high-level audio engineering, mixing, and mastering skills."
      whyTitle="Why Choose Music Production in nairobi?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nairobi and surrounding areas'
      ]}
      courseLink="/courses/music-production-diploma"
      courseLinkText="View Full Music Production Course Details"
      faqs={[
        {
          question: 'How does studying music production in Nairobi give me an edge in the job market?',
          answer:
            "Nairobi's vibrant entertainment and media industry, including proximity to major employers like Nation Media Group and event companies, offers music production students immediate exposure and networking opportunities unavailable elsewhere, setting the stage for a thriving career."
        },
        {
          question: 'Are there local opportunities for hands-on experience while studying?',
          answer:
            'Absolutely. Nairobi offers a rich tapestry of recording studios, live event companies, and artists keen on new talent. Students often find internships and project collaborations that enhance their learning with practical experience.'
        }
      ]}
      details={[
        { label: 'Duration', value: '12 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Music Production Opportunities in nairobi"
      jobMarketText="nairobi is an important center in Nairobi with growing opportunities in Kenya's creative and digital industries. ADMI's Music Production program prepares you for the expanding job market. Students from nairobi are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Music Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Music Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Music Production Program Details"
      ctaButtonHref="/courses/music-production-diploma"
    />
  )
}
