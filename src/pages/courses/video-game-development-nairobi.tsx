import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function VideoGameDevelopmentNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Video Game Development Course in Nairobi - ADMI',
        description:
          'Best Video Game Development course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/video-game-development-nairobi',
        keywords: 'video-game-development, nairobi, course, training, kenya, admi'
      }}
      courseName="Video Game Development"
      city="Nairobi"
      pageTitle="Video Game Development Course in Nairobi"
      subtitle="Professional Video Game Development training in nairobi with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Video Game Development in nairobi?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nairobi and surrounding areas'
      ]}
      courseLink="/courses/video-game-development-diploma"
      courseLinkText="View Full Video Game Development Course Details"
      faqs={[
        {
          question: "How does Nairobi's tech ecosystem enhance my learning in video game development?",
          answer:
            "Nairobi's dynamic tech ecosystem, spearheaded by tech giants and startups in areas like CBD and Westlands, provides a fertile ground for innovation and collaboration. Students can engage with cutting-edge VR/AR projects and mobile gaming startups, gaining real-world insights and networking opportunities."
        },
        {
          question: 'Are there real career opportunities in Nairobi for video game development graduates?',
          answer:
            "Absolutely. Nairobi's growing gaming industry, bolstered by tech hubs and innovation centers, is on the lookout for skilled graduates in game design, programming, and 3D modeling. Opportunities span gaming studios, edtech companies, and simulation firms, particularly those focusing on mobile and VR/AR games."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Video Game Development Opportunities in nairobi"
      jobMarketText="nairobi is an important center in Nairobi with growing opportunities in Kenya's creative and digital industries. ADMI's Video Game Development program prepares you for the expanding job market. Students from nairobi are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Video Game Development Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Video Game Development program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Video Game Development Program Details"
      ctaButtonHref="/courses/video-game-development-certificate-rubika"
    />
  )
}
