import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function PhotographyEldoretPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Photography Course in Rift Valley - ADMI',
        description:
          'Best Photography course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/photography-eldoret',
        keywords: 'photography, eldoret, course, training, kenya, admi'
      }}
      courseName="Photography"
      city="Eldoret"
      pageTitle="Photography Course in Rift Valley"
      subtitle="Eldoret, with its vibrant startup ecosystem and a strong base in agricultural technology and sports organizations, offers unique opportunities for photographers. The demand for digital skills in capturing the dynamic landscapes of agricultural innovations, sports events, and burgeoning local businesses provides a fertile ground for commercial, event, and portrait photography enthusiasts."
      whyTitle="Why Choose Photography in eldoret?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from eldoret and surrounding areas'
      ]}
      courseLink="/courses/photography-diploma"
      courseLinkText="View Full Photography Course Details"
      faqs={[
        {
          question: 'How does the startup ecosystem in Eldoret enhance my learning in commercial photography?',
          answer:
            "Studying commercial photography in Eldoret puts you at the forefront of a growing digital market. The city's startup ecosystem is ripe with opportunities for capturing innovative products, creating digital content, and engaging with new businesses in need of professional imagery."
        },
        {
          question: "Are there specific career opportunities in photography within Eldoret's major industries?",
          answer:
            "Yes, Eldoret's major industries such as agricultural technology, sports organizations, and regional media houses offer diverse career opportunities. Photographers can find roles in documenting agricultural projects, covering sports events, or contributing to media content, not to mention the emerging demand in real estate and tourism photography."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Photography Opportunities in eldoret"
      jobMarketText="eldoret is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Photography program prepares you for the expanding job market. Students from eldoret are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Photography Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Photography program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Photography Program Details"
      ctaButtonHref="/courses/photography-certificate"
    />
  )
}
