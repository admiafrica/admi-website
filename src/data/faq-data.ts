export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  title: string
  icon: string
  color: string
  items: FAQItem[]
}

export const FAQ_DATA: FAQCategory[] = [
  {
    title: '💰 Financing & Investment',
    icon: '💰',
    color: '#FF6B35',
    items: [
      {
        question: 'Can I pay in installments?',
        answer:
          'Yes! We offer flexible payment plans from 3 to 36 months. Most students choose the 30-month plan at 15,000 KES/month.'
      },
      {
        question: "What if I can't afford 15K/month?",
        answer:
          'We work with each student individually. Contact our admissions team via WhatsApp to discuss custom payment arrangements. Many students pay per semester (100K every 4 months).'
      },
      {
        question: 'Are there scholarships or financial aid?',
        answer:
          'Yes! We offer merit-based scholarships reducing tuition by 10-30%. Apply early for the best chances. HELB loans are also available for Kenyan citizens.'
      },
      {
        question: "What's included in the 450K fee?",
        answer:
          'Everything: 4 semesters of tuition, industrial internship placement, industry-standard equipment access, project materials, and career support. No hidden fees.'
      },
      {
        question: 'Can I get a refund if I drop out?',
        answer:
          'Yes, we have a pro-rated refund policy. If you withdraw within the first month, you receive a 70% refund. See full policy in your enrollment agreement.'
      }
    ]
  },
  {
    title: '⏰ Time Commitment & Schedule',
    icon: '⏰',
    color: '#1971c2',
    items: [
      {
        question: 'Can I study while working full-time?',
        answer:
          'Yes! 60% of our diploma students work while studying. Classes run Monday-Friday, 6pm-9pm or Saturday 9am-5pm depending on the program. Choose the schedule that fits your life.'
      },
      {
        question: 'How many hours per week is required?',
        answer:
          'Expect 15-20 hours/week: 9 hours in class + 6-11 hours for projects and assignments. Weekend programs concentrate coursework into intensive Saturday sessions.'
      },
      {
        question: 'What about the internship semester?',
        answer:
          'The 5th semester is a full-time, 3-month industrial internship. Most employers offer flexible arrangements for working students, or you can take unpaid leave. Many internships lead to job offers.'
      },
      {
        question: 'Can I pause my studies if life gets busy?',
        answer:
          'Yes. You can defer for up to 2 semesters without penalty. Just notify your program coordinator at least 2 weeks before the semester starts.'
      },
      {
        question: "How long to complete if I'm working?",
        answer:
          "Full program: 2 years (4 semesters + internship). Working students typically complete in 2-2.5 years. There's no rush—focus on quality learning."
      }
    ]
  },
  {
    title: '🚀 Career Outcomes & ROI',
    icon: '🚀',
    color: '#2f9e44',
    items: [
      {
        question: 'Will I really get a job after graduation?',
        answer:
          '85% of our diploma graduates secure employment within 3 months. We provide job placement support, resume reviews, portfolio building, and connections to 500+ employer partners.'
      },
      {
        question: "What's the average starting salary?",
        answer:
          '75,000 KES/month for diploma grads vs 35,000 KES for certificate holders. Within 2 years, diploma grads average 100K/month. Your 450K investment pays back in 6 months.'
      },
      {
        question: 'Do employers recognize ADMI diplomas?',
        answer:
          "Absolutely. We're Kenya's leading creative media institute with 500+ employer partnerships including Safaricom, Nation Media Group, and major production houses. Our curriculum meets global industry standards."
      },
      {
        question: 'Can I freelance with a diploma?',
        answer:
          "Yes! 40% of our grads freelance or run their own studios. You'll build a professional portfolio, learn client management, and master exportable skills for international markets."
      },
      {
        question: 'What if I already have some experience?',
        answer:
          'Perfect! The diploma will formalize your skills, fill knowledge gaps, and provide credentials employers trust. Many experienced creatives choose our program to level up professionally.'
      }
    ]
  },
  {
    title: '📚 Program Details',
    icon: '📚',
    color: '#087f5b',
    items: [
      {
        question: 'What equipment do I need?',
        answer:
          'We provide all hardware: computers, cameras, audio gear, software licenses. You just need a laptop for homework (we can recommend affordable options).'
      },
      {
        question: 'Do I need prior experience to enroll?',
        answer:
          'No. Diploma programs start from fundamentals and build to advanced skills. We welcome complete beginners as well as those with some background.'
      },
      {
        question: "What's the difference between campuses?",
        answer:
          'All campuses (Nairobi, Mombasa, Eldoret, Kisumu, Nakuru) offer the same quality education with the same curriculum. Choose based on location convenience.'
      },
      {
        question: 'Can I switch programs after starting?',
        answer:
          'Yes, within the first semester. You may need to make up some coursework. Speak with your academic advisor to plan the transition.'
      },
      {
        question: 'Is online/remote learning available?',
        answer:
          'Diploma programs require in-person attendance for hands-on training with professional equipment. However, some theory classes and assignments can be completed remotely.'
      }
    ]
  }
]
