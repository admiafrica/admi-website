import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function SoundEngineeringNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Sound Engineering Course in Nairobi - ADMI',
        description:
          'Best Sound Engineering course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/sound-engineering-nairobi',
        keywords: 'sound-engineering, nairobi, course, training, kenya, admi'
      }}
      courseName="Sound Engineering"
      city="Nairobi"
      pageTitle="Sound Engineering Course in Nairobi"
      subtitle="Nairobi, as Kenya's creative heartbeat, offers unparalleled opportunities for sound-engineering students. With giants like Safaricom, Nation Media Group, and Royal Media Services centered here, the city's vibrant mix of recording studios, broadcast media, and live event productions is fertile ground for audio professionals. Nairobi's trend towards immersive audio and podcast engineering further distinguishes it as a hub for cutting-edge audio skills development."
      whyTitle="Why Choose Sound Engineering in nairobi?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nairobi and surrounding areas'
      ]}
      courseLink="/courses/sound-engineering-diploma"
      courseLinkText="View Full Sound Engineering Course Details"
      faqs={[
        {
          question: "How does Nairobi's creative scene enhance my sound-engineering course experience?",
          answer:
            "Studying in Nairobi places you at the epicenter of East Africa's largest creative market. The city's thriving entertainment, news media, and event production scenes provide a rich context for practical learning, offering students direct exposure to industry-standard practices and networking opportunities with leading professionals."
        },
        {
          question: 'What are the career prospects in Nairobi for sound engineering graduates?',
          answer:
            'Graduates in Nairobi find themselves in a dynamic job market, with opportunities in live sound for concerts, studio recording for both major and independent artists, broadcast audio for television and radio, and emerging fields like podcast production. The presence of major employers such as Safaricom and Royal Media Services ensures a steady demand for skilled audio engineers.'
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Sound Engineering Opportunities in nairobi"
      jobMarketText="nairobi is an important center in Nairobi with growing opportunities in Kenya's creative and digital industries. ADMI's Sound Engineering program prepares you for the expanding job market. Students from nairobi are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Sound Engineering Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Sound Engineering program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Sound Engineering Program Details"
      ctaButtonHref="/courses/sound-engineering-diploma"
    />
  )
}
