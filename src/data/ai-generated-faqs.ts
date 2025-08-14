export interface AIGeneratedFAQ {
  id: string
  question: string
  answer: string
  category: string
  priority: 'high' | 'medium' | 'low'
  tags: string[]
  searchQuery: string
  searchVolume: number
  isAIGenerated: boolean
  createdAt: string
}

export const aiGeneratedFAQs: AIGeneratedFAQ[] = [
  {
    id: 'ai-generated-1',
    question: 'What are the fees for the Music Production course at ADMI?',
    answer:
      'The Music Production Diploma at Africa Digital Media Institute (ADMI) is an 18-month program and the total fee for the course is KES 180,000. This equips you with the skills to pursue various job opportunities such as a Music Producer, with a monthly salary ranging from KES 80,000 to 150,000, a Sound Engineer, Audio Technician, or even a Studio Manager. \n\nThe requirements for the course are a minimum KCSE grade of C- or its equivalent. We have a flexible payment plan that allows you to pay in installments. Plus, if you opt for full payment, you will receive a 10% discount on the course fee. Scholarships are also available on both merit and need-based grounds, and HELB loans are accepted for this diploma program.\n\nThe next intake for the Music Production Diploma is every 3 months, which means you have multiple opportunities throughout the year to enroll and start your journey in music production.\n\nWe encourage you to take the next step and apply for this course to kickstart your career in the music industry. To apply or to get more information, please visit our website or contact our admissions office. We are looking forward to helping you achieve your career goals at ADMI.',
    category: 'Admissions',
    priority: 'high',
    tags: ['fees'],
    searchQuery: 'admi music production course fees',
    searchVolume: 45,
    isAIGenerated: true,
    createdAt: '2025-08-14T18:14:34.401Z'
  },
  {
    id: 'ai-generated-2',
    question: 'What are the requirements for the Film Production Diploma at ADMI?',
    answer:
      'The Film & Television Production Diploma at Africa Digital Media Institute (ADMI) requires candidates to have a minimum of a KCSE C- or an equivalent qualification. Furthermore, while not a hard requirement, a creative portfolio showcasing your interest and preliminary work in the field can be a helpful addition to your application.\n\nThis 18-month program costs KES 200,000 and offers numerous job opportunities upon successful completion. With an ADMI diploma, you could find work as a Film Director, Video Editor, Cinematographer, or Production Assistant. Depending on your role and experience, you could earn a salary ranging from KES 70,000 to 200,000 per month.\n\nOur next intake for the Film & Television Production Diploma program is every three months, so you have multiple opportunities throughout the year to join us.\n\nADMI offers a variety of payment options to assist with your tuition fees. You can pay in full for a 10% discount or opt for an installment plan. Additionally, we offer merit-based and need-based scholarships, and HELB loans are accepted for all our diploma programs.\n\nTo begin your enrollment process or if you have any further queries about this program, we encourage you to reach out to our admissions team. Your future in film and television production starts with ADMI. We look forward to helping you on your creative journey.',
    category: 'Admissions',
    priority: 'medium',
    tags: ['requirements'],
    searchQuery: 'film production diploma requirements',
    searchVolume: 32,
    isAIGenerated: true,
    createdAt: '2025-08-14T18:14:34.402Z'
  },
  {
    id: 'ai-generated-3',
    question: 'What is the duration of the Graphic Design course at ADMI?',
    answer:
      'The Graphic Design Diploma program at Africa Digital Media Institute (ADMI) is designed to be completed in 12 months. This program provides a comprehensive understanding of graphic design principles and industry-standard software, preparing students for a variety of job opportunities.\n\nUpon successful completion of the program, graduates can pursue careers as Graphic Designers, Brand Designers, UI/UX Designers, or Creative Directors. The average salary for Graphic Designers in Kenya ranges from KES 60,000 to KES 120,000 per month, depending on experience and the specific role.\n\nThe program fee is KES 120,000. There are flexible payment plans available, including an installment option. A 10% discount is offered for full payment. Additionally, ADMI offers both merit-based and need-based scholarships. The admission requirement for this program is a KCSE C- or equivalent, and a creative portfolio.\n\nThe next intake for the Graphic Design Diploma program occurs every 2 months. You are encouraged to apply as soon as possible to secure your place.\n\nFor any further queries or to start your enrollment process, please visit our website or contact our admissions office. We look forward to welcoming you to ADMI and supporting you on your creative journey.',
    category: 'Admissions',
    priority: 'medium',
    tags: ['duration'],
    searchQuery: 'graphic design course duration',
    searchVolume: 28,
    isAIGenerated: true,
    createdAt: '2025-08-14T18:14:34.402Z'
  },
  {
    id: 'ai-generated-4',
    question: 'What job opportunities are available after completing the Animation & Motion Graphics Diploma at ADMI?',
    answer:
      "**Answer:** Upon successful completion of our Animation & Motion Graphics Diploma, you will be equipped with the necessary skills and knowledge to pursue a variety of rewarding career paths. Job opportunities in the field include 3D Animator, Motion Graphics Designer, Character Animator, and VFX Artist. \n\nThe course duration is 18 months, with an intake every 3 months, and it costs KES 180,000. The salary range in these professions typically varies from KES 80,000 to KES 180,000 per month, depending on experience and the complexity of the role. \n\nThe entry requirement is a KCSE grade of C- or equivalent, and it's beneficial to have an artistic ability. \n\nADMI offers flexible payment plans, including a 10% discount for full payment and installment options. We also accept HELB loans for this diploma program and have merit-based and need-based scholarships available. \n\nIf you're excited about bringing your creative ideas to life and contributing to the dynamic field of animation, we encourage you to apply for our next intake. Please visit our website or contact us directly for more information on how to enroll and start your journey towards a thriving career in animation and motion graphics.",
    category: 'Admissions',
    priority: 'medium',
    tags: ['careers'],
    searchQuery: 'animation course job opportunities',
    searchVolume: 24,
    isAIGenerated: true,
    createdAt: '2025-08-14T18:14:34.402Z'
  },
  {
    id: 'ai-generated-5',
    question: 'What is the salary range for a Digital Marketing Certificate holder from ADMI?',
    answer:
      'The Digital Marketing Certificate program at the Africa Digital Media Institute (ADMI) equips students with the skills needed to thrive in the rapidly evolving digital marketing landscape. After completing this 6-month course, which costs KES 80,000, you can land jobs such as a Digital Marketing Specialist, Social Media Manager, SEO Specialist, or Content Creator.\n\nThe salary range for these roles varies, but as a Digital Marketing Specialist, you can expect to earn between KES 50,000 and KES 100,000 per month. Of course, this can fluctuate based on your level of expertise, the size and industry of the company you work for, and other factors.\n\nADMI offers flexible payment plans, scholarships, and accepts HELB loans to help you finance your education. If you meet the requirement of a KCSE C- or equivalent, you can apply for the next intake, which happens monthly.\n\nWe encourage you to take the next step towards enhancing your digital marketing skills by enrolling in our program. If you have any further questions or wish to begin the application process, please contact us.\n\nWe look forward to helping you launch a successful career in digital marketing!',
    category: 'Admissions',
    priority: 'low',
    tags: ['careers'],
    searchQuery: 'digital marketing certificate salary',
    searchVolume: 19,
    isAIGenerated: true,
    createdAt: '2025-08-14T18:14:34.402Z'
  }
]
