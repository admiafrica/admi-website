import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function PhotographyMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Photography Course in Coast - ADMI',
        description:
          'Best Photography course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/photography-mombasa',
        keywords: 'photography, mombasa, course, training, kenya, admi'
      }}
      courseName="Photography"
      city="Mombasa"
      pageTitle="Photography Course in Coast"
      subtitle="Mombasa's bustling tourism and hospitality sector creates a vibrant market for photographers. The scenic coastal landscape, from the white sandy beaches of Nyali and Bamburi to the historical richness of the Island, offers unique backdrops for commercial, portrait, and event photography. The city's demand for digital content, especially in tourism, provides an unparalleled opportunity for photographers to showcase their skills in drone photography, virtual tours, and social media content creation."
      whyTitle="Why Choose Photography in mombasa?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from mombasa and surrounding areas'
      ]}
      courseLink="/courses/photography-diploma"
      courseLinkText="View Full Photography Course Details"
      faqs={[
        {
          question: "How does Mombasa's coastal environment enhance the photography course experience?",
          answer:
            'Mombasa’s unique coastal environment provides students with real-world experience in capturing diverse landscapes, from stunning beach sunsets in Nyali to the historical architecture of Fort Jesus on the Island. The course emphasizes drone and outdoor photography techniques, making the most of Mombasa’s scenic views.'
        },
        {
          question: 'What are the local career opportunities for photography graduates in Mombasa?',
          answer:
            'Graduates find ample opportunities in Mombasa’s thriving tourism and hospitality industries, coastal media houses, and the burgeoning real estate sector. Skills in commercial, event, and portrait photography are in high demand for creating compelling content for hotels, resorts, and travel agencies, as well as coverage for local events and fashion.'
        }
      ]}
      details={[
        { label: 'Duration', value: '4-6 months (1 semester)' },
        { label: 'Level', value: 'Certificate' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Photography Opportunities in mombasa"
      jobMarketText="mombasa is an important center in Coast with growing opportunities in Kenya's creative and digital industries. ADMI's Photography program prepares you for the expanding job market. Students from mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Photography Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Photography program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Photography Program Details"
      ctaButtonHref="/courses/photography-certificate"
    />
  )
}
