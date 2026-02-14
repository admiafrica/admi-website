import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function EntertainmentBusinessNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Entertainment Business Course in Nairobi - ADMI',
        description:
          'Best Entertainment Business course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/entertainment-business-nairobi',
        keywords: 'entertainment-business, nairobi, course, training, kenya, admi'
      }}
      courseName="Entertainment Business"
      city="Nairobi"
      pageTitle="Entertainment Business Course in Nairobi"
      subtitle="Professional Entertainment Business training in nairobi with industry experts and guaranteed job placement support"
      whyTitle="Why Choose Entertainment Business in nairobi?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nairobi and surrounding areas'
      ]}
      courseLink="/courses/entertainment-business-diploma"
      courseLinkText="View Full Entertainment Business Course Details"
      faqs={[
        {
          question: "How does Nairobi's entertainment scene enhance my learning experience in entertainment business?",
          answer:
            "Nairobi's diverse entertainment scene, from thriving digital events to traditional cultural showcases, offers a live laboratory for students. You can directly apply your coursework in real-world scenarios, network with industry leaders at events in CBD, Westlands, and beyond, and gain firsthand experience in one of Africa's fastest-growing entertainment markets."
        },
        {
          question: 'What are the career prospects in Nairobi after completing this course?',
          answer:
            "Graduates find themselves in a city buzzing with opportunities, from launching careers at top media houses like Nation Media Group to innovating in digital event spaces. Nairobi's unique position as a creative hub not only in Kenya but in East Africa opens doors to roles in event management, talent scouting, and digital marketing within the entertainment sector."
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Entertainment Business Opportunities in nairobi"
      jobMarketText="nairobi is an important center in Nairobi with growing opportunities in Kenya's creative and digital industries. ADMI's Entertainment Business program prepares you for the expanding job market. Students from nairobi are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Entertainment Business Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Entertainment Business program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Entertainment Business Program Details"
      ctaButtonHref="/courses/entertainment-business-diploma"
    />
  )
}
