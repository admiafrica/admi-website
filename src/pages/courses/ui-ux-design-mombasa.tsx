import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function UiUxDesignMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'UI/UX Design Course in Coast - ADMI',
        description:
          'Best UI/UX Design course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/ui-ux-design-mombasa',
        keywords: 'ui-ux-design, mombasa, course, training, kenya, admi'
      }}
      courseName="Ui Ux Design"
      city="Mombasa"
      pageTitle="UI/UX Design Course in Coast"
      subtitle="In Mombasa, the UI/UX Design course taps into the booming tourism and hospitality industries' digital transformation needs. With a unique focus on creating engaging online experiences for coastal resorts, eateries, and travel agencies, graduates are perfectly positioned to lead the digital content revolution in Kenya's premier tourist destination."
      whyTitle="Why Choose UI/UX Design in mombasa?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from mombasa and surrounding areas'
      ]}
      courseLink="/courses/ui-ux-design-diploma"
      courseLinkText="View Full Ui Ux Design Course Details"
      faqs={[
        {
          question: 'How does the Mombasa environment enhance my learning experience in UI/UX Design?',
          answer:
            "Mombasa's vibrant tourism and hospitality sectors offer a unique landscape for UI/UX students to apply their skills in real-world scenarios, especially in enhancing digital engagement for businesses in these industries."
        },
        {
          question: 'Are there local internships available in Mombasa for UI/UX Design students?',
          answer:
            'Yes, numerous opportunities exist with local coastal media houses, tourism agencies, and hospitality brands eager to innovate their digital presence, providing fertile ground for internships and project collaborations.'
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="UI/UX Design Opportunities in mombasa"
      jobMarketText="mombasa is an important center in Coast with growing opportunities in Kenya's creative and digital industries. ADMI's UI/UX Design program prepares you for the expanding job market. Students from mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your UI/UX Design Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Graphic Design Certificate program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Graphic Design Certificate Program Details"
      ctaButtonHref="/courses/graphic-design-certificate"
    />
  )
}
