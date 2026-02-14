import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function SoundEngineeringKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Sound Engineering Course in Western - ADMI',
        description:
          'Best Sound Engineering course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/sound-engineering-kisumu',
        keywords: 'sound-engineering, kisumu, course, training, kenya, admi'
      }}
      courseName="Sound Engineering"
      city="Kisumu"
      pageTitle="Sound Engineering Course in Western"
      subtitle="Kisumu, an emerging tech hub with blossoming media and event sectors, offers unique sound-engineering prospects. Its vibrant arts scene and the rise of agricultural tech firms adopting multimedia for marketing create a demand for skilled audio professionals, setting Kisumu apart with diverse opportunities in live sound, studio recording, and immersive audio projects."
      whyTitle="Why Choose Sound Engineering in kisumu?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from kisumu and surrounding areas'
      ]}
      courseLink="/courses/sound-engineering-diploma"
      courseLinkText="View Full Sound Engineering Course Details"
      faqs={[
        {
          question: "How does Kisumu's emerging tech status contribute to a sound-engineering course?",
          answer:
            "Kisumu's status as an emerging tech hub means students have the advantage of tapping into a growing market with less saturation. The presence of Lake Region media, alongside international NGOs in need of audio content, provides practical training opportunities directly tied to the city's unique economic landscape."
        },
        {
          question: 'Are there local employment opportunities for sound engineers in Kisumu?',
          answer:
            "Yes, Kisumu's diverse economy includes recording studios, broadcast media, and a dynamic event production scene. Additionally, the city's agricultural tech firms and international NGOs increasingly require sound engineers for content creation, offering a broad spectrum of career paths for graduates."
        },
        { question: 'undefined', answer: 'undefined' }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Sound Engineering Opportunities in kisumu"
      jobMarketText="kisumu is an important center in Western with growing opportunities in Kenya's creative and digital industries. ADMI's Sound Engineering program prepares you for the expanding job market. Students from kisumu are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Sound Engineering Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Sound Engineering program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Sound Engineering Program Details"
      ctaButtonHref="/courses/sound-engineering-diploma"
    />
  )
}
