import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function AnimationNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Animation Course in Nairobi - ADMI',
        description:
          'Best Animation course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/animation-nairobi',
        keywords: 'animation, nairobi, course, training, kenya, admi'
      }}
      courseName="Animation"
      city="Nairobi"
      pageTitle="Animation Course in Nairobi"
      subtitle="In Nairobi, the heart of Kenya's creative economy, our animation course taps directly into the burgeoning markets of advertising, film production, and the innovative realm of AR/VR content development. With Nairobi being a central hub for major media employers like Safaricom and Nation Media Group, students have unparalleled access to internships and job opportunities, making it an ideal launching pad for aspiring animators."
      whyTitle="Why Choose Animation in nairobi?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nairobi and surrounding areas'
      ]}
      courseLink="/courses/animation-and-motion-graphics-diploma"
      courseLinkText="View Full Animation Course Details"
      faqs={[
        {
          question: 'How does the Nairobi location enhance my learning experience in animation?',
          answer:
            "Our Nairobi campus is at the epicenter of Kenya's creative and tech industries, offering students real-world exposure to animation studios, advertising agencies, and gaming companies. This unique environment fosters practical, hands-on learning, directly linking your coursework with the city's thriving digital content production scene."
        },
        {
          question: 'What kind of job prospects can I expect in Nairobi after completing my animation course?',
          answer:
            "Graduates from our Nairobi course can look forward to dynamic career opportunities across a range of sectors, including animation studios, film production, advertising agencies, and gaming companies. Additionally, Nairobi's position as a leader in digital marketing and educational content opens up further avenues for animation professionals."
        }
      ]}
      details={[
        { label: 'Duration', value: '18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Animation Opportunities in nairobi"
      jobMarketText="nairobi is an important center in Nairobi with growing opportunities in Kenya's creative and digital industries. ADMI's Animation program prepares you for the expanding job market. Students from nairobi are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Animation Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Animation program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Animation Program Details"
      ctaButtonHref="/courses/animation-and-motion-graphics-diploma"
    />
  )
}
