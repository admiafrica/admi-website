import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function SoundEngineeringEldoretPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Sound Engineering Course in Rift Valley - ADMI',
        description:
          'Best Sound Engineering course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/sound-engineering-eldoret',
        keywords: 'sound-engineering, eldoret, course, training, kenya, admi'
      }}
      courseName="Sound Engineering"
      city="Eldoret"
      pageTitle="Sound Engineering Course in Rift Valley"
      subtitle="Eldoret's dynamic mix of agricultural tech firms, burgeoning sports organizations, and regional media outlets presents a fertile ground for sound engineers. The city's growing startup ecosystem, particularly in digital realms, amplifies the demand for skilled professionals in live sound, studio recording, and sound design, uniquely positioning Eldoret as a hub for audio engineering excellence."
      whyTitle="Why Choose Sound Engineering in eldoret?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from eldoret and surrounding areas'
      ]}
      courseLink="/courses/sound-engineering-diploma"
      courseLinkText="View Full Sound Engineering Course Details"
      faqs={[
        {
          question: "How does Eldoret's startup ecosystem enhance my learning experience in sound engineering?",
          answer:
            "Eldoret's startup scene, especially in tech and digital media, provides real-world application opportunities for sound engineering students. Engagement with local startups allows for hands-on experience in sound design and audio production, critical for mastering the course."
        },
        {
          question: 'Are there local employment opportunities in Eldoret for sound engineering graduates?',
          answer:
            'Yes, Eldoret offers diverse employment opportunities, from working with regional media houses and sports organizations requiring broadcast audio professionals to the vibrant event production scene for live sound engineers. The presence of recording studios also supports studio recording careers.'
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Sound Engineering Opportunities in eldoret"
      jobMarketText="eldoret is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Sound Engineering program prepares you for the expanding job market. Students from eldoret are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Sound Engineering Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Sound Engineering program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Sound Engineering Program Details"
      ctaButtonHref="/courses/sound-engineering-diploma"
    />
  )
}
