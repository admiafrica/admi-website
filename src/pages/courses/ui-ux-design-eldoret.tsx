import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function UiUxDesignEldoretPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'UI/UX Design Course in Rift Valley - ADMI',
        description:
          'Best UI/UX Design course in eldoret, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/ui-ux-design-eldoret',
        keywords: 'ui-ux-design, eldoret, course, training, kenya, admi'
      }}
      courseName="Ui Ux Design"
      city="Eldoret"
      pageTitle="UI/UX Design Course in Rift Valley"
      subtitle="Eldoret's vibrant startup ecosystem and its evolving agricultural technology and sports organizations are increasingly seeking UI/UX designers. With a local demand for digital skills to enhance user experiences, Eldoret offers a unique landscape for budding designers to innovate in tech, fintech, and regional media."
      whyTitle="Why Choose UI/UX Design in eldoret?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from eldoret and surrounding areas'
      ]}
      courseLink="/courses/ui-ux-design-diploma"
      courseLinkText="View Full Ui Ux Design Course Details"
      faqs={[
        {
          question: 'How relevant is a UI/UX design course in Eldoret for local startups and tech companies?',
          answer:
            'In Eldoret, the startup and tech scene is booming, with many companies prioritizing digital presence. A UI/UX design course gears you towards meeting the high demand for creating intuitive and user-friendly digital experiences, crucial for the success of these local businesses.'
        },
        {
          question: 'Are there specific industries in Eldoret that are particularly in need of UI/UX designers?',
          answer:
            'Yes, the agricultural tech sector and sports organizations in Eldoret are on the lookout for skilled UI/UX designers to enhance their digital tools and platforms, offering unique career paths beyond the traditional tech company roles.'
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="UI/UX Design Opportunities in eldoret"
      jobMarketText="eldoret is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's UI/UX Design program prepares you for the expanding job market. Students from eldoret are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your UI/UX Design Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Graphic Design Certificate program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Graphic Design Certificate Program Details"
      ctaButtonHref="/courses/graphic-design-certificate"
    />
  )
}
