import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function UiUxDesignNairobiPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'UI/UX Design Course in Nairobi - ADMI',
        description:
          'Best UI/UX Design course in nairobi, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/ui-ux-design-nairobi',
        keywords: 'ui-ux-design, nairobi, course, training, kenya, admi'
      }}
      courseName="Ui Ux Design"
      city="Nairobi"
      pageTitle="UI/UX Design Course in Nairobi"
      subtitle="Nairobi, Kenya’s tech hub, offers unrivaled opportunities for UI/UX designers with its vibrant startup scene, particularly in Westlands and CBD. The city's tech companies, fintech startups, and digital agencies are in constant demand for skilled designers to navigate the competitive digital landscape, making Nairobi a prime location for UI/UX education."
      whyTitle="Why Choose UI/UX Design in nairobi?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nairobi and surrounding areas'
      ]}
      courseLink="/courses/ui-ux-design-diploma"
      courseLinkText="View Full Ui Ux Design Course Details"
      faqs={[
        {
          question: "How relevant is UI/UX design training in Nairobi's tech eco-system?",
          answer:
            'In Nairobi’s booming tech ecosystem, UI/UX design stands out as a critical skill. With major employers like Safaricom and various tech startups, the demand for designers who can create intuitive and engaging digital experiences is at an all-time high.'
        },
        {
          question: 'Are there ample career opportunities in Nairobi for UI/UX design graduates?',
          answer:
            "Absolutely. Nairobi's status as East Africa’s technology and innovation hub means graduates have direct access to careers in leading tech companies, fintech, and digital agencies within the CBD, Westlands, and beyond. The city's dynamic market is eager for fresh talent in UI/UX design."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="UI/UX Design Opportunities in nairobi"
      jobMarketText="nairobi is an important center in Nairobi with growing opportunities in Kenya's creative and digital industries. ADMI's UI/UX Design program prepares you for the expanding job market. Students from nairobi are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your UI/UX Design Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Graphic Design Certificate program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Graphic Design Certificate Program Details"
      ctaButtonHref="/courses/graphic-design-certificate"
    />
  )
}
