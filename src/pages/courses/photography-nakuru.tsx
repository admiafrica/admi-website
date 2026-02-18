import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function PhotographyNakuruPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Photography Course in Rift Valley - ADMI',
        description:
          'Best Photography course in nakuru, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/photography-nakuru',
        keywords: 'photography, nakuru, course, training, kenya, admi'
      }}
      courseName="Photography"
      city="Nakuru"
      pageTitle="Photography Course in Rift Valley"
      subtitle="Nakuru offers a vibrant opportunity for photographers with its thriving tourism sector, including the famous Lake Nakuru National Park, renowned for its flamingo population. Its strategic location also connects photographers with both Nairobi's dynamic market and the untapped Western Kenya, perfect for those looking to capture diverse Kenyan landscapes and cultural events."
      whyTitle="Why Choose Photography in nakuru?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from nakuru and surrounding areas'
      ]}
      courseLink="/courses/photography-diploma"
      courseLinkText="View Full Photography Course Details"
      faqs={[
        {
          question: "How does Nakuru's unique landscape influence the photography course curriculum?",
          answer:
            "Our curriculum is tailored to exploit Nakuru's unique geographical and cultural landscape, incorporating outdoor practical sessions at iconic locations like Menengai Crater and Lake Nakuru, focusing on nature, wildlife, and cultural photography."
        },
        {
          question: 'Are there local job opportunities for photographers in Nakuru?',
          answer:
            "Absolutely, Nakuru's economy supports a growing demand for skilled photographers, especially in the tourism, real estate, and events industries. The presence of manufacturing and agricultural firms also opens doors for commercial photography gigs."
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Photography Opportunities in nakuru"
      jobMarketText="nakuru is an important center in Rift Valley with growing opportunities in Kenya's creative and digital industries. ADMI's Photography program prepares you for the expanding job market. Students from nakuru are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Photography Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Photography program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Photography Program Details"
      ctaButtonHref="/courses/photography-certificate"
    />
  )
}
