import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function VideoGameDevelopmentKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Video Game Development Course in Western - ADMI',
        description:
          'Best Video Game Development course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/video-game-development-kisumu',
        keywords: 'video-game-development, kisumu, course, training, kenya, admi'
      }}
      courseName="Video Game Development"
      city="Kisumu"
      pageTitle="Video Game Development Course in Western"
      subtitle="Professional Video Game Development training in kisumu with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Video Game Development in kisumu?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from kisumu and surrounding areas'
      ]}
      courseLink="/courses/video-game-development-diploma"
      courseLinkText="View Full Video Game Development Course Details"
      faqs={[
        {
          question: "How does Kisumu's tech scene influence my learning in video game development?",
          answer:
            "Kisumu's growing tech scene, particularly in Milimani and Mamboleo areas, provides a unique ecosystem for immersive learning. Students benefit from local tech meetups, potential internships, and collaboration with tech firms and NGOs on gaming projects."
        },
        {
          question: 'Are there local companies in Kisumu that hire video game developers?',
          answer:
            "Yes, Kisumu is home to a variety of tech firms and educational technology startups, especially around Kibuye and Nyalenda, looking for skilled game developers. The city's focus on agricultural tech also opens doors for simulation game development for training purposes."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Video Game Development Opportunities in kisumu"
      jobMarketText="kisumu is an important center in Western with growing opportunities in Kenya's creative and digital industries. ADMI's Video Game Development program prepares you for the expanding job market. Students from kisumu are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Video Game Development Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Video Game Development program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Video Game Development Program Details"
      ctaButtonHref="/courses/video-game-development-certificate-rubika"
    />
  )
}
