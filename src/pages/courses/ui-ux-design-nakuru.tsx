import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function UiUxDesignNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'UI/UX Design Course in Rift Valley - ADMI',
        description:
          'Best UI/UX Design course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/ui-ux-design-nakuru',
        keywords: 'ui-ux-design, nakuru, course, training, kenya, admi'
      }}
      courseName="Ui Ux Design"
      city="Nakuru"
      pageTitle="UI/UX Design Course in Rift Valley"
      subtitle="Nakuru's unique positioning as a strategic hub connecting Nairobi and Western Kenya opens unparalleled opportunities for UI/UX designers. With burgeoning tech startups, agricultural firms transitioning to digital platforms, and tourism businesses seeking to enhance online experiences, Nakuru's diverse market demands innovative UI/UX solutions tailored to a wide-ranging audience."
      whyTitle="Why Choose UI/UX Design in nakuru?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nakuru and surrounding areas'
      ]}
      courseLink="/courses/ui-ux-design-diploma"
      courseLinkText="View Full Ui Ux Design Course Details"
      faqs={[
        {
          question: "How does Nakuru's location influence my learning experience in UI/UX design?",
          answer:
            "Nakuru's strategic location offers a unique learning canvas—bridging urban and semi-urban user experiences. This diversity prepares you for a wide range of design challenges, from urban tech startups to rural agricultural apps, enhancing your adaptability and creativity."
        },
        {
          question: 'Are there local career opportunities in UI/UX design after completing the course in Nakuru?',
          answer:
            "Absolutely. Nakuru's economic landscape is rich with opportunities, from manufacturing companies and tech startups to agricultural firms and tourism businesses, all in need of skilled UI/UX designers to enhance their digital interfaces and improve user experiences."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="UI/UX Design Opportunities in nakuru"
      jobMarketText="nakuru is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's UI/UX Design program prepares you for the expanding job market. Students from nakuru are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your UI/UX Design Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Graphic Design Certificate program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Graphic Design Certificate Program Details"
      ctaButtonHref="/courses/graphic-design-certificate"
    />
  )
}
