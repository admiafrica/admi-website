import CourseCityTemplate from '@/components/course/CourseCityTemplate'

export default function SoundEngineeringMombasaPage() {
  return (
    <CourseCityTemplate
      seo={{
        title: 'Sound Engineering Course in Coast - ADMI',
        description:
          'Best Sound Engineering course in mombasa, Kenya. Professional training with industry experts, modern facilities, and guaranteed job placement support.',
        canonical: 'https://admi.ac.ke/courses/sound-engineering-mombasa',
        keywords: 'sound-engineering, mombasa, course, training, kenya, admi'
      }}
      courseName="Sound Engineering"
      city="Mombasa"
      pageTitle="Sound Engineering Course in Coast"
      subtitle="Mombasa's vibrant tourism sector and its burgeoning media houses offer unique opportunities for sound engineers. The city's demand for high-quality digital content in its hospitality and tourism industries, coupled with an increasing interest in immersive audio experiences, positions Mombasa as a thriving hub for audio professionals specializing in live sound, studio recording, and sound design."
      whyTitle="Why Choose Sound Engineering in mombasa?"
      highlights={[
        "Industry-relevant curriculum designed for Kenya's market",
        'Experienced instructors with real-world experience',
        'State-of-the-art facilities and equipment at our Nairobi campus',
        '90% job placement rate across Kenya',
        'Flexible payment plans available',
        'Career support and internship opportunities',
        'Accessible to students from mombasa and surrounding areas'
      ]}
      courseLink="/courses/sound-engineering-diploma"
      courseLinkText="View Full Sound Engineering Course Details"
      faqs={[
        {
          question: 'Can I find internship opportunities in sound engineering within Mombasa’s tourism sector?',
          answer:
            "Absolutely! Mombasa's booming tourism industry offers numerous internship opportunities for sound engineering students, especially within hospitality brands looking to enhance their on-site entertainment and immersive tour experiences through superior sound design."
        },
        {
          question: 'Are there local media houses in Mombasa that employ sound engineers?',
          answer:
            'Yes, Mombasa is home to several coastal media houses that are consistently on the lookout for talented sound engineers to support broadcast audio, podcast engineering, and streaming quality improvements in line with current trends.'
        }
      ]}
      details={[
        { label: 'Duration', value: '12-18 months' },
        { label: 'Level', value: 'Diploma' },
        { label: 'Fee', value: 'View current fees', href: 'https://admi.africa/student-support#fees' },
        { label: 'Location', value: 'ADMI Nairobi Campus' },
        { label: 'Campus', value: '25 Kenyatta Avenue, Nairobi' }
      ]}
      jobMarketTitle="Sound Engineering Opportunities in mombasa"
      jobMarketText="mombasa is an important center in Coast with growing opportunities in Kenya's creative and digital industries. ADMI's Sound Engineering program prepares you for the expanding job market. Students from mombasa are welcome to join our comprehensive programs at our Nairobi campus located at 25 Kenyatta Avenue."
      ctaTitle="🎯 Ready to Start Your Sound Engineering Journey?"
      ctaText="Take the next step towards your creative career. Explore our comprehensive Sound Engineering program with detailed curriculum, career outcomes, and admission process."
      ctaButtonText="Explore Full Sound Engineering Program Details"
      ctaButtonHref="/courses/sound-engineering-diploma"
    />
  )
}
