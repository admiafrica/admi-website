import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function UiUxDesignKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'UI/UX Design Course in Western - ADMI',
        description:
          'Best UI/UX Design course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/ui-ux-design-kisumu',
        keywords: 'ui-ux-design, kisumu, course, training, kenya, admi'
      }}
      courseName="Ui Ux Design"
      city="Kisumu"
      pageTitle="UI/UX Design Course in Western"
      subtitle="Kisumu is poised as a burgeoning tech hub in Western Kenya, with its unique positioning offering less competition and a vibrant space for UI/UX designers. With major employers including Lake Region media, agricultural tech firms, and international NGOs, there's a rich landscape for designers to apply user research, wireframing, and prototyping skills in diverse projects aimed at local and global audiences."
      whyTitle="Why Choose UI/UX Design in kisumu?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from kisumu and surrounding areas'
      ]}
      courseLink="/courses/ui-ux-design-diploma"
      courseLinkText="View Full Ui Ux Design Course Details"
      faqs={[
        {
          question: "How relevant is a UI/UX Design course in Kisumu's job market?",
          answer:
            "In Kisumu, the demand for UI/UX designers is growing, fueled by an expanding tech ecosystem, including startups and tech-based agricultural initiatives. Skills in user research and mobile-first design are particularly valued, aligning with Kisumu's drive towards becoming an innovative tech hub."
        },
        {
          question: 'Are there any local Kisumu companies actively seeking UI/UX designers?',
          answer:
            'Yes, numerous companies in Kisumu, from Lake Region media houses to agri-tech startups and international NGOs, are on the lookout for skilled UI/UX designers. These firms value innovative design thinking to enhance user experiences, particularly for mobile platforms.'
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="UI/UX Design Opportunities in kisumu"
      jobMarketText="kisumu is an important center in Western with growing opportunities in Kenya's creative and digital industries. ADMI's UI/UX Design program prepares you for the expanding job market. Students from kisumu are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your UI/UX Design Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Graphic Design Certificate program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Graphic Design Certificate Program Details"
      ctaButtonHref="/courses/graphic-design-certificate"
    />
  )
}
