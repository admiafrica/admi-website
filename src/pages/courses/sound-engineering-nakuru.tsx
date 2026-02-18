import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function SoundEngineeringNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Sound Engineering Course in Rift Valley - ADMI',
        description:
          'Best Sound Engineering course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/sound-engineering-nakuru',
        keywords: 'sound-engineering, nakuru, course, training, kenya, admi'
      }}
      courseName="Sound Engineering"
      city="Nakuru"
      pageTitle="Sound Engineering Course in Rift Valley"
      subtitle="Nakuru, with its mix of manufacturing, agriculture, and tourism sectors, offers unique sound-engineering prospects, especially in immersive audio for tourism experiences, podcast engineering for local stories, and quality streaming for agricultural tutorials."
      whyTitle="Why Choose Sound Engineering in nakuru?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nakuru and surrounding areas'
      ]}
      courseLink="/courses/sound-engineering-diploma"
      courseLinkText="View Full Sound Engineering Course Details"
      faqs={[
        {
          question: 'How do the sectors in Nakuru enhance my learning experience in sound engineering?',
          answer:
            "Nakuru's diverse economy allows students to apply sound engineering across different fields, from creating immersive tourist audio guides in Lake Nakuru National Park to producing high-quality agricultural podcasts, offering a rich, hands-on learning environment."
        },
        {
          question: "Are there local internships available in sound engineering within Nakuru's industries?",
          answer:
            'Yes, Nakuru’s manufacturing companies, agricultural firms, and tourism businesses often seek skilled sound engineers for product promotions, field recordings, and event productions, providing ample internship opportunities for students.'
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Sound Engineering Opportunities in nakuru"
      jobMarketText="nakuru is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Sound Engineering program prepares you for the expanding job market. Students from nakuru are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Sound Engineering Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Sound Engineering program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Sound Engineering Program Details"
      ctaButtonHref="/courses/sound-engineering-diploma"
    />
  )
}
