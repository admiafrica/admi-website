import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function MusicProductionNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Music Production Course in Rift Valley - ADMI',
        description:
          'Best Music Production course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/music-production-nakuru',
        keywords: 'music-production, nakuru, course, training, kenya, admi'
      }}
      courseName="Music Production"
      city="Nakuru"
      pageTitle="Music Production Course in Rift Valley"
      subtitle="Nakuru offers a unique music-production landscape, bridging Nairobi's bustling music scene with Western Kenya's rich cultural heritage. Its strategic position enhances opportunities in both traditional and contemporary music markets, including local recording studios and live event productions, capitalizing on the city's diverse musical influences."
      whyTitle="Why Choose Music Production in nakuru?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nakuru and surrounding areas'
      ]}
      courseLink="/courses/music-production-diploma"
      courseLinkText="View Full Music Production Course Details"
      faqs={[
        {
          question: "How does Nakuru's location influence my music production learning experience?",
          answer:
            "Studying in Nakuru places you at the crossroads of Kenya's music industry, offering insights into both urban and rural soundscapes. This unique mix provides a broad learning canvas for audio engineering, mastering, and beat production."
        },
        {
          question: 'What are the local career opportunities in Nakuru for music production graduates?',
          answer:
            "Nakuru's graduates find opportunities in its growing number of recording studios, local media houses, and vibrant event companies. The city's strategic location also offers unique chances to work with artists from both Nairobi and Western Kenya, catering to a diverse audience."
        }
      ]}
      details={[
        { label: 'Duration', value: '12 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Music Production Opportunities in nakuru"
      jobMarketText="nakuru is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Music Production program prepares you for the expanding job market. Students from nakuru are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Music Production Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Music Production program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Music Production Program Details"
      ctaButtonHref="/courses/music-production-diploma"
    />
  )
}
