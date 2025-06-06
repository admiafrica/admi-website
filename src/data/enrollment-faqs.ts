// Enrollment-focused FAQs for improved conversion and SEO
export const ENROLLMENT_FAQS = [
  {
    id: 'how-to-apply',
    question: 'How do I apply for ADMI courses?',
    answer:
      'Applying to ADMI is simple! Visit our online application portal, complete the application form, upload required documents (ID copy, academic certificates, portfolio if applicable), and pay the application fee of KES 2,000. You can also visit our Nairobi campus at Caxton House, Standard Street for in-person assistance. Our admissions team is available Monday-Friday 8AM-5PM to guide you through the process.',
    category: 'Application Process',
    keywords: ['apply now', 'application process', 'admission requirements', 'how to apply', 'online application']
  },
  {
    id: 'payment-options',
    question: 'What are the payment options available?',
    answer:
      'ADMI offers flexible payment plans to make education accessible. Options include: Full payment with 10% discount, Semester payments (50% per semester), Monthly installments over 24 months, M-Pesa payments, Bank transfers, and Employer sponsorship arrangements. We also accept HELB loans and have partnerships with financial institutions for student loans. Contact our finance team at finance@admi.ac.ke for personalized payment plans.',
    category: 'Fees and Payment',
    keywords: ['payment plans', 'flexible payment', 'installments', 'fees', 'financial assistance', 'student loans']
  },
  {
    id: 'scholarship-opportunities',
    question: 'Can I get a scholarship or financial aid?',
    answer:
      'Yes! ADMI offers several scholarship opportunities: Merit-based scholarships (up to 50% tuition waiver), Need-based financial aid, Women in Tech scholarships, Rural student support programs, Alumni referral discounts (15%), and Early bird discounts (20% for early applications). We also partner with organizations like Mastercard Foundation for full scholarships. Apply early as scholarships are limited and awarded on a first-come, first-served basis.',
    category: 'Financial Aid',
    keywords: [
      'scholarship opportunities',
      'financial aid',
      'merit scholarship',
      'need-based aid',
      'women in tech',
      'discounts'
    ]
  },
  {
    id: 'intake-dates',
    question: 'When do classes start? What are the intake dates?',
    answer:
      'ADMI has multiple intakes throughout the year: January 2025 intake (Application deadline: December 15, 2024), May 2025 intake (Application deadline: April 15, 2025), September 2025 intake (Application deadline: August 15, 2025). Classes typically start the first Monday of the intake month. We recommend applying at least 6 weeks before your preferred start date to secure your spot and complete all preparations.',
    category: 'Academic Calendar',
    keywords: [
      '2025 intake',
      '2026 intake',
      'start dates',
      'intake calendar',
      'when classes start',
      'application deadline'
    ]
  },
  {
    id: 'career-change-program',
    question: 'Is ADMI suitable for career change? Can working professionals join?',
    answer:
      'Absolutely! ADMI is perfect for career change professionals. Our programs are designed for both fresh graduates and working professionals. We offer: Evening and weekend classes, Part-time study options, Flexible schedules for working students, Career transition support, Industry mentorship programs, and Professional portfolio development. Many of our graduates have successfully transitioned from banking, teaching, and other fields into creative careers.',
    category: 'Career Development',
    keywords: [
      'career change program',
      'working professionals',
      'career transition',
      'flexible schedule',
      'part-time study'
    ]
  },
  {
    id: 'admission-requirements',
    question: 'What are the admission requirements for ADMI courses?',
    answer:
      'Admission requirements vary by program: For Diploma courses: KCSE mean grade C- and above (or equivalent), Valid ID/Passport, Academic transcripts/certificates, Portfolio (for creative programs), and Application fee payment. For Certificate courses: KCSE mean grade D+ and above, Valid ID, Academic certificates. No prior experience in creative fields is required - we welcome beginners! International students need equivalent qualifications and may require English proficiency proof.',
    category: 'Admission Requirements',
    keywords: [
      'admission requirements',
      'KCSE grades',
      'qualifications needed',
      'portfolio requirements',
      'international students'
    ]
  },
  {
    id: 'course-duration-structure',
    question: 'How long are the courses and what is the class structure?',
    answer:
      'Course duration: Diploma programs: 2 years (4 semesters), Certificate programs: 6-12 months, Short courses: 1-3 months. Class structure includes: Theory classes (40%), Practical sessions (50%), Industry projects (10%), Internship placements, Portfolio development, and Final project presentation. Classes run Monday-Friday with some weekend workshops. We maintain small class sizes (max 20 students) for personalized attention.',
    category: 'Course Information',
    keywords: ['course duration', '2 year diploma', 'class structure', 'practical training', 'internship']
  },
  {
    id: 'job-placement-support',
    question: 'Do you provide job placement assistance after graduation?',
    answer:
      'Yes! ADMI has an 85% employment rate within 6 months of graduation. Our career services include: Job placement assistance, Industry connections and networking, Interview preparation, Resume/CV building, Internship placements with top companies, Alumni network access, and Ongoing career support. We partner with Safaricom, Nation Media Group, Royal Media Services, and 200+ other companies for graduate placement.',
    category: 'Career Support',
    keywords: ['job placement', 'employment rate', 'career support', 'industry connections', 'internship placement']
  }
]

// Generate FAQ Schema for enrollment FAQs
export const generateEnrollmentFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'ADMI Enrollment FAQs - Applications, Fees, Scholarships, and Admissions',
  description:
    'Complete guide to enrolling at Africa Digital Media Institute. Find answers about applications, payment options, scholarships, and admission requirements.',
  mainEntity: ENROLLMENT_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
})

// Category-specific FAQ groups for different pages
export const FAQ_CATEGORIES = {
  APPLICATION: ENROLLMENT_FAQS.filter((faq) => faq.category === 'Application Process'),
  PAYMENT: ENROLLMENT_FAQS.filter((faq) => faq.category === 'Fees and Payment' || faq.category === 'Financial Aid'),
  ACADEMIC: ENROLLMENT_FAQS.filter(
    (faq) => faq.category === 'Academic Calendar' || faq.category === 'Course Information'
  ),
  CAREER: ENROLLMENT_FAQS.filter((faq) => faq.category === 'Career Development' || faq.category === 'Career Support'),
  ADMISSION: ENROLLMENT_FAQS.filter((faq) => faq.category === 'Admission Requirements')
}

// High-intent enrollment keywords extracted from FAQs
export const ENROLLMENT_KEYWORDS = [
  'apply now',
  'admission requirements',
  'scholarship opportunities',
  'payment plans',
  '2025 intake',
  '2026 intake',
  'career change program',
  'flexible payment',
  'financial aid',
  'job placement',
  'application deadline',
  'start dates',
  'enrollment',
  'register now',
  'secure your spot',
  'limited seats',
  'early bird discount',
  'merit scholarship',
  'industry placement',
  'career transition'
]
