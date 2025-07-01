import React from 'react'
import Script from 'next/script'

interface InstitutionalFAQSchemaProps {
  faqType?: 'general' | 'admissions' | 'academic' | 'financial' | 'career'
  includeAll?: boolean
}

export function InstitutionalFAQSchema({ faqType = 'general', includeAll = false }: InstitutionalFAQSchemaProps) {
  // General institutional FAQs
  const generalFAQs = [
    {
      question: 'What is Africa Digital Media Institute (ADMI)?',
      answer:
        "Africa Digital Media Institute (ADMI) is Eastern Africa's premier creative media and technology training institution. Founded in 2012, ADMI offers diploma and certificate programs in film production, animation, graphic design, music production, sound engineering, and digital content creation. We serve students across Africa with industry-standard training and career placement support."
    },
    {
      question: 'Where is ADMI located?',
      answer:
        'ADMI is located at 25 Caxton House 3rd Floor, Kenyatta Avenue, Nairobi, Kenya. Our campus features professional film studios, recording studios, computer labs, and animation suites equipped with industry-standard equipment.'
    },
    {
      question: 'Is ADMI accredited?',
      answer:
        'Yes, ADMI is accredited by Pearson Assured and partnered with Woolf University. Our programs are industry-recognized and meet international standards for creative media education.'
    },
    {
      question: 'What makes ADMI different from other media schools?',
      answer:
        'ADMI stands out through our industry partnerships with companies like Safaricom, Nation Media Group, and Royal Media Services. We offer hands-on training with professional equipment, guaranteed internships, 85% employment rate for diploma graduates, and comprehensive career placement support.'
    },
    {
      question: 'Do you accept international students?',
      answer:
        'Yes, ADMI welcomes students from across Africa and internationally. We provide support for international students including accommodation assistance and visa guidance where needed.'
    }
  ]

  // Admissions process FAQs
  const admissionsFAQs = [
    {
      question: 'When are ADMI course intakes?',
      answer:
        'ADMI has three intakes per year: January (starts January 15), May (starts May 15), and September (starts September 15). Registration typically opens 3-4 months before each intake.'
    },
    {
      question: 'What are the admission requirements for ADMI?',
      answer:
        'For diploma programs: KCSE mean grade of C- (minus) or equivalent. For certificate programs: KCSE mean grade of D+ or equivalent. We also consider portfolio work and conduct interviews for creative programs.'
    },
    {
      question: 'How do I apply to ADMI?',
      answer:
        'You can apply online through our website at admi.africa/enquiry, visit our campus, or call +254 772 913 811. Our admissions team will guide you through the application process and help you choose the right program.'
    },
    {
      question: 'Is there an application fee?',
      answer:
        'No, there is no application fee to apply to ADMI. The application process is free, and our admissions team provides free consultation to help you choose the right program.'
    },
    {
      question: 'Can I visit the campus before applying?',
      answer:
        'Absolutely! We encourage prospective students to visit our campus for tours. You can see our facilities, meet instructors, and get a feel for the learning environment. Contact us to schedule a campus tour.'
    }
  ]

  // Academic program FAQs
  const academicFAQs = [
    {
      question: 'How long are ADMI programs?',
      answer:
        'Diploma programs are 2 years (4 semesters) and certificate programs are 6 months. All programs include practical training, internships, and portfolio development.'
    },
    {
      question: 'What is the class schedule like?',
      answer:
        'Classes typically run Monday to Friday, with some weekend workshops. We offer flexible scheduling options including morning, afternoon, and evening classes to accommodate working students.'
    },
    {
      question: 'Do you provide equipment for students?',
      answer:
        'Yes, ADMI provides all necessary equipment during classes including cameras, editing software, recording equipment, and computers. Students also have access to equipment rental for personal projects.'
    },
    {
      question: 'Are internships guaranteed?',
      answer:
        'Yes, all diploma programs include guaranteed internships with our industry partners. We have partnerships with over 50 media companies across Kenya and East Africa.'
    },
    {
      question: 'What software do you teach?',
      answer:
        'We teach industry-standard software including Adobe Creative Suite (Premiere Pro, After Effects, Photoshop, Illustrator), Avid Media Composer, Pro Tools, Logic Pro, Blender, Maya, and more.'
    }
  ]

  // Financial and fees FAQs
  const financialFAQs = [
    {
      question: 'How much do ADMI programs cost?',
      answer:
        'Diploma programs cost KES 150,000 and certificate programs cost KES 75,000. We offer flexible payment plans and scholarship opportunities for qualified students.'
    },
    {
      question: 'Do you offer payment plans?',
      answer:
        'Yes, we offer flexible payment plans including installment options. You can pay per semester or arrange a customized payment schedule with our finance team.'
    },
    {
      question: 'Are scholarships available?',
      answer:
        'Yes, ADMI offers merit-based scholarships and need-based financial assistance. We also have special programs for students from underserved communities.'
    },
    {
      question: 'What does the fee include?',
      answer:
        'The fee includes tuition, access to all equipment and software, course materials, internship placement, career counseling, and portfolio development support.'
    },
    {
      question: 'Are there any hidden costs?',
      answer:
        'No, our fees are transparent. The only additional costs might be personal project materials or optional certification exams from external bodies.'
    }
  ]

  // Career and employment FAQs
  const careerFAQs = [
    {
      question: 'What is the employment rate for ADMI graduates?',
      answer:
        'ADMI diploma graduates have an 85% employment rate within 6 months of graduation. Certificate graduates have a 75% employment rate. Our career services team provides ongoing support.'
    },
    {
      question: 'What careers can I pursue after ADMI?',
      answer:
        'Graduates work as video editors, graphic designers, sound engineers, film directors, animators, content creators, social media managers, and more. Many also start their own creative businesses.'
    },
    {
      question: 'Do you help with job placement?',
      answer:
        'Yes, we provide comprehensive career placement support including resume writing, interview preparation, portfolio development, and direct connections with our industry partners.'
    },
    {
      question: 'What is the average salary for ADMI graduates?',
      answer:
        'Diploma graduates typically earn KES 45,000 - 120,000 per month, while certificate graduates earn KES 25,000 - 80,000 per month, depending on experience and specialization.'
    },
    {
      question: 'Can I freelance after completing my program?',
      answer:
        'Absolutely! Many of our graduates work as freelancers. We provide training on business skills, client management, and pricing strategies to help you succeed as a freelancer.'
    }
  ]

  // Select FAQs based on type
  const getFAQsByType = () => {
    if (includeAll) {
      return [...generalFAQs, ...admissionsFAQs, ...academicFAQs, ...financialFAQs, ...careerFAQs]
    }

    switch (faqType) {
      case 'admissions':
        return [...generalFAQs.slice(0, 2), ...admissionsFAQs]
      case 'academic':
        return [...generalFAQs.slice(0, 2), ...academicFAQs]
      case 'financial':
        return [...generalFAQs.slice(0, 2), ...financialFAQs]
      case 'career':
        return [...generalFAQs.slice(0, 2), ...careerFAQs]
      default:
        return generalFAQs
    }
  }

  const selectedFAQs = getFAQsByType()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://admi.africa/faq/${faqType}`,
    name: `ADMI ${faqType.charAt(0).toUpperCase() + faqType.slice(1)} FAQs`,
    description: `Frequently asked questions about ${faqType === 'general' ? 'Africa Digital Media Institute' : faqType + ' at ADMI'}`,
    mainEntity: selectedFAQs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `https://admi.africa/faq/${faqType}#question-${index + 1}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        author: {
          '@type': 'Organization',
          name: 'Africa Digital Media Institute',
          url: 'https://admi.africa'
        }
      }
    }))
  }

  return (
    <Script
      id={`institutional-faq-${faqType}-schema`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
