import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function PhotographyKisumuPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Photography Course in Western - ADMI',
        description:
          'Best Photography course in kisumu, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/photography-kisumu',
        keywords: 'photography, kisumu, course, training, kenya, admi'
      }}
      courseName="Photography"
      city="Kisumu"
      pageTitle="Photography Course in Western"
      subtitle="Kisumu, with its vibrant cultural scene and emerging tech hub status, presents a unique canvas for photographers. The city's natural beauty, from the shores of Lake Victoria to the bustling markets of Kibuye, offers endless material for commercial, event, and portrait photography. Additionally, Kisumu's growth as a tech hub creates a demand for high-quality visual content, from drone photography for agricultural tech firms to virtual tours for real estate and tourism."
      whyTitle="Why Choose Photography in kisumu?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from kisumu and surrounding areas'
      ]}
      courseLink="/courses/photography-diploma"
      courseLinkText="View Full Photography Course Details"
      faqs={[
        {
          question: "How does Kisumu's tech scene influence the photography course?",
          answer:
            "Kisumu's burgeoning status as a tech hub uniquely positions our photography course to integrate cutting-edge trends like drone photography and virtual tours, tailoring skills that are in high demand by local tech firms and international NGOs."
        },
        {
          question: "Are there real opportunities for photographers in Kisumu's job market?",
          answer:
            "Absolutely. Beyond traditional opportunities in media houses, Kisumu's growing events scene, international NGO presence, and the local tourism industry are increasingly seeking skilled photographers for commercial work, real estate virtual tours, and social media content."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Photography Opportunities in kisumu"
      jobMarketText="kisumu is an important center in Western with growing opportunities in Kenya's creative and digital industries. ADMI's Photography program prepares you for the expanding job market. Students from kisumu are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Photography Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Photography program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Photography Program Details"
      ctaButtonHref="/courses/photography-certificate"
    />
  )
}
