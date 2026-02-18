import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function PhotographyNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Photography Course in Nairobi - ADMI',
        description:
          'Best Photography course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/photography-nairobi',
        keywords: 'photography, nairobi, course, training, kenya, admi'
      }}
      courseName="Photography"
      city="Nairobi"
      pageTitle="Photography Course in Nairobi"
      subtitle="Nairobi's vibrant culture and bustling urban landscapes provide an unmatched canvas for photographers. With the city's thriving fashion scene, numerous events, and a growing real estate market, Nairobi offers diverse opportunities for commercial, portrait, and event photography. The proximity to wildlife and scenic landscapes just outside the city further enhances the potential for tourism and nature photography."
      whyTitle="Why Choose Photography in nairobi?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nairobi and surrounding areas'
      ]}
      courseLink="/courses/photography-diploma"
      courseLinkText="View Full Photography Course Details"
      faqs={[
        {
          question: "How does Nairobi's dynamic environment enhance my photography learning experience?",
          answer:
            "Nairobi's unique blend of urban and natural landscapes provides a rich learning environment. You'll have the opportunity to practice with a variety of subjects, from cityscapes and bustling street life in areas like Eastlands and South B/C, to serene natural settings, enhancing your versatility and creativity as a photographer."
        },
        {
          question: 'What kind of photography career opportunities can I expect in Nairobi?',
          answer:
            "Nairobi, being Kenya's largest creative job market, offers extensive opportunities in media houses like Nation Media Group and Royal Media Services, fashion photography, events coverage, and the booming real estate market. The city's growing interest in drone photography and virtual tours also opens up new avenues for photographers."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Photography Opportunities in nairobi"
      jobMarketText="nairobi is an important center in Nairobi with growing opportunities in Kenya's creative and digital industries. ADMI's Photography program prepares you for the expanding job market. Students from nairobi are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Photography Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Photography program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Photography Program Details"
      ctaButtonHref="/courses/photography-certificate"
    />
  )
}
