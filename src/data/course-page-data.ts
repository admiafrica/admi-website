import { StaticImageData } from 'next/image'

// --- Types ---

export interface QuickFact {
  label: string
  value: string
  icon: string // Material symbol name or component reference
}

export interface CourseLeader {
  name: string
  role: string
  bio: string
  imageUrl: string | StaticImageData
  quote: string
}

export interface IndustryQuote {
  quote: string
  author: string
  role: string
  company: string
  backgroundImageUrl: string | StaticImageData
}

export interface Benefit {
  title: string
  description: string
  icon: string
}

export interface DegreeStep {
  step: number
  title: string
  description: string
  duration: string
}

export interface Semester {
  title: string
  modules: string[]
}

export interface PaymentPlan {
  title: string
  price: string
  period: string
  details: string[]
  isPopular?: boolean
  discount?: string
}

export interface ImpactStat {
  value: string
  label: string
}

export interface Testimonial {
  name: string
  role: string
  quote: string
  imageUrl: string | StaticImageData
  videoUrl?: string
}

export interface AppStep {
  step: number
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Career {
  title: string
  description: string
  salary?: string
}

export interface ProgramDetail {
  label: string
  value: string
}

export interface Mentor {
  name: string
  role: string
  company: string
  imageUrl: string | StaticImageData
}

export interface Assessment {
  method: string
  percentage: number
  description: string
}

export interface Facility {
  name: string
  description: string
  imageUrl: string | StaticImageData
}

export interface PortfolioItem {
  title: string
  student: string
  imageUrl: string | StaticImageData
  projectUrl?: string
}

export interface ActivityPhoto {
  caption: string
  imageUrl: string | StaticImageData
  videoUrl?: string // Optional YouTube URL for video content
  aspectRatio?: 'square' | 'portrait' | 'landscape' // For masonry variety
}

export interface AlumniStory {
  name: string
  role: string
  company: string
  story: string
  imageUrl: string | StaticImageData
  graduationYear: string
}

export interface Partner {
  name: string
  logoUrl: string | StaticImageData
}

export interface IndustryTrend {
  stat: string
  label: string
  description: string
}

export interface Resource {
  title: string
  category: string
  imageUrl: string | StaticImageData
  link: string
}

export interface CoursePageData {
  quickFacts: QuickFact[]
  courseLeader: CourseLeader
  industryQuote: IndustryQuote
  benefits: Benefit[]
  degreeSteps: DegreeStep[]
  semesters: Semester[]
  paymentPlans: PaymentPlan[]
  impactStats: ImpactStat[]
  testimonials: Testimonial[]
  applicationSteps: AppStep[]
  faqs: FAQ[]
  careers: Career[]
  programDetails: ProgramDetail[]
  learningOutcomes: string[]
  mentors: Mentor[]
  assessmentMethods: Assessment[]
  facilities: Facility[]
  portfolioItems: PortfolioItem[]
  activityPhotos: ActivityPhoto[]
  alumniStories: AlumniStory[]
  industryPartners: Partner[]
  industryTrends: IndustryTrend[]
  resources: Resource[]
}

// --- Default Data for Film & Television Production Diploma ---

export const filmProductionData: CoursePageData = {
  quickFacts: [
    { label: 'Duration', value: '2 Years', icon: 'schedule' },
    { label: 'Award Level', value: 'Diploma', icon: 'school' },
    { label: 'Intakes', value: 'Feb, May, Aug', icon: 'calendar_month' },
    { label: 'Online + Campus Bootcamps', value: 'Hybrid', icon: 'group' },
    { label: 'Per Semester', value: '100K KES', icon: 'payments' }
  ],
  courseLeader: {
    name: 'Kevin Oloo',
    role: 'Head of Film Department',
    bio: 'Kevin is an award-winning filmmaker with over 15 years of industry experience. He has directed feature films, documentaries, and TV commercials for major brands across East Africa.',
    imageUrl: '/placeholder/kevin-oloo.jpg', // Placeholder
    quote: 'We don’t just teach you how to use a camera; we teach you how to tell stories that matter.'
  },
  industryQuote: {
    quote:
      "ADMI graduates arrive on set ready to work. They understand both the creative and technical demands of modern production — that's rare in East Africa.",
    author: 'Dorothy Ghettuba',
    role: 'Head of African Originals',
    company: 'Netflix',
    backgroundImageUrl: '/placeholder/industry-bg.jpg'
  },
  benefits: [
    {
      title: 'Industry-Standard Production',
      description: 'Work with RED cameras, Avid, DaVinci Resolve, and professional studio equipment from day one.',
      icon: '🎬'
    },
    {
      title: 'Portfolio-Driven Learning',
      description: 'Graduate with a professional showreel and portfolio that demonstrates your skills to employers.',
      icon: '🎯'
    },
    {
      title: 'EU-Accredited Qualification',
      description:
        'Woolf University credits give your diploma international recognition and a degree pathway.',
      icon: '🌍'
    },
    {
      title: 'Guaranteed Internship',
      description: 'Every student completes a mandatory industry placement with our network of 500+ employer partners.',
      icon: '💼'
    },
    {
      title: 'Small Class Sizes',
      description:
        'Maximum 25 students per class ensures personalized mentorship and hands-on guidance from industry pros.',
      icon: '🎓'
    },
    {
      title: 'Award-Winning Alumni',
      description: 'Join graduates working at Netflix, BBC, Showmax, and winning at Kalasha Awards and AMVCA.',
      icon: '🏆'
    }
  ],
  degreeSteps: [
    { step: 1, title: 'ADMI Diploma', description: '2 Years · TVETA Registered', duration: '2 Years' },
    { step: 2, title: 'Woolf Credits', description: 'EU-Accredited Transfer', duration: 'Transfer' },
    { step: 3, title: "Bachelor's Degree", description: 'Complete While Working', duration: '1 Year' }
  ],
  semesters: [
    {
      title: 'Foundations of Filmmaking',
      modules: [
        'Introduction to Film Production',
        'Camera Operations',
        'Basic Lighting',
        'Scriptwriting Fundamentals',
        'Audio Recording Basics'
      ]
    },
    {
      title: 'Technical Mastery',
      modules: [
        'Advanced Cinematography',
        'Directing Actors',
        'Non-Linear Editing (Avid/Premiere)',
        'Production Design',
        'Sound Design'
      ]
    },
    {
      title: 'Storytelling & Post-Production',
      modules: [
        'Documentary Production',
        'Color Grading (DaVinci Resolve)',
        'VFX Basics',
        'Advanced Sound Mixing',
        'Music Video Production'
      ]
    },
    {
      title: 'Professional Production & Placement',
      modules: [
        'Final Project Film',
        'Industry Internship',
        'Portfolio Development',
        'Film Festival Submissions',
        'Career Preparation'
      ]
    }
  ],
  paymentPlans: [
    {
      title: '1st Installment · 50%',
      price: 'KES 50,000',
      period: 'Due at Registration',
      details: ['Secures your spot and access to all facilities, equipment & materials for the semester.'],
      isPopular: true
    },
    {
      title: '2nd Installment · 30%',
      price: 'KES 30,000',
      period: 'Due Mid-Semester',
      details: ['Continues your enrollment. Flexible timing aligned with your mid-semester schedule.']
    },
    {
      title: '3rd Installment · 20%',
      price: 'KES 20,000',
      period: 'Due Before Exams',
      details: ['Final balance clears you for end-of-semester assessments and certifications.']
    }
  ],
  impactStats: [
    { value: '3,000+', label: 'Graduates Since 2007' },
    { value: '85%', label: 'Employment Within 6 Months' },
    { value: '500+', label: 'Industry Partners' },
    { value: '17+', label: 'Years of Excellence' },
    { value: '75K', label: 'Avg Starting Salary (KES/mo)' }
  ],
  testimonials: [
    {
      name: 'Sarah Wanjiku',
      role: 'Film Production Graduate, 2023',
      quote:
        "ADMI gave me access to equipment and mentors I wouldn't have found anywhere else in East Africa. My final project got selected for the Kalasha Awards — that opened every door.",
      imageUrl: '/placeholder/sarah.jpg'
    },
    {
      name: 'James Ochieng',
      role: 'Film Production Graduate, 2022',
      quote:
        'The internship at NMG was life-changing. I went from a student to a working professional seamlessly. The hands-on training at ADMI meant I was already production-ready.',
      imageUrl: '/placeholder/james.jpg'
    },
    {
      name: 'Amina Hassan',
      role: 'Current Student, Semester 3',
      quote:
        "I'm in my third semester and already working on my second short film. The equipment we have access to is incredible — RED cameras, full studio, DaVinci Resolve suites. I feel like I'm learning at a real production house, not a classroom.",
      imageUrl: '/placeholder/amina.jpg'
    }
  ],
  applicationSteps: [
    {
      step: 1,
      title: 'Submit Your Application',
      description: 'Fill in the online form with your details and upload your KCSE certificate. Takes 5 minutes.'
    },
    {
      step: 2,
      title: 'Attend an Interview',
      description: 'Meet our admissions team in person or online. Share your passion and ask any questions.'
    },
    {
      step: 3,
      title: 'Secure Your Place',
      description: 'Pay your 1st installment (50%) to confirm enrollment. Save 10% by paying the full semester upfront.'
    }
  ],
  faqs: [
    {
      question: 'What are the entry requirements for the Film Production Diploma?',
      answer:
        'You need a KCSE certificate (minimum C-) or equivalent. No prior film experience required — we teach you everything from scratch. A passion for storytelling is what matters most.'
    },
    {
      question: 'How much does a semester cost, and can I pay in installments?',
      answer:
        'Semester fees range from KES 68,000 to 100,000. Yes! We offer a 3-installment plan: 50% at registration, 30% mid-semester, and 20% before exams. HELB and other financing options are also available.'
    },
    {
      question: 'Is the diploma internationally recognized?',
      answer:
        'Yes. Through our Woolf University partnership, you earn EU-accredited credits that count towards an international degree. Our programmes are also registered with TVETA Kenya.'
    },
    {
      question: 'Do I get an internship placement?',
      answer:
        'Yes — every diploma student completes a mandatory industry placement. We connect you with our network of 500+ employer partners including Safaricom, Nation Media Group, and Standard Group.'
    },
    {
      question: 'When are the next intake dates?',
      answer:
        'We have three intakes per year: February, May, and August. Applications are accepted on a rolling basis, but we recommend applying at least 4 weeks before your preferred start date.'
    },
    {
      question: 'Can I work while studying?',
      answer:
        'Classes are scheduled Monday to Friday, 8am–4pm. Some students take on freelance projects in evenings and weekends, which also builds their portfolio and industry experience.'
    }
  ],
  careers: [
    { title: 'Film Director', description: 'Lead creative vision for films, TV shows, commercials & music videos' },
    { title: 'Cinematographer', description: 'Craft stunning visuals as Director of Photography for productions' },
    {
      title: 'Film Editor',
      description: 'Shape narratives in post-production using Avid, Premiere Pro & DaVinci Resolve'
    },
    { title: 'Producer', description: 'Manage budgets, schedules & teams to bring productions to life' }
  ],
  programDetails: [
    { label: 'Awarding Body', value: 'Woolf University / TVET CDACC' },
    { label: 'Level', value: 'Level 5 Diploma' },
    { label: 'Credits', value: '240 Credits' },
    { label: 'Duration', value: '2 Years (4 Semesters)' },
    { label: 'Campus', value: 'Nairobi, CBD' },
    { label: 'Intakes', value: 'January, May, September' }
  ],
  learningOutcomes: [
    'Demonstrate proficiency in operating professional camera and lighting equipment.',
    'Write and format screenplays for short films and documentaries.',
    'Edit video and audio using industry-standard software (Premiere Pro, DaVinci Resolve).',
    'Manage a film production from pre-production to distribution.',
    'Apply critical thinking to analyze and critique films.'
  ],
  mentors: [
    { name: 'Wanuri Kahiu', role: 'Director', company: 'External Mentor', imageUrl: '/placeholder/wanuri.jpg' },
    { name: 'Toskies', role: 'Sound Engineer', company: 'ADMI Faculty', imageUrl: '/placeholder/toskies.jpg' },
    { name: 'Jim Bishop', role: 'Producer', company: 'Industry Partner', imageUrl: '/placeholder/jim.jpg' },
    { name: 'Likarion Wainaina', role: 'Director', company: 'Alumni Mentor', imageUrl: '/placeholder/likarion.jpg' }
  ],
  assessmentMethods: [
    {
      method: 'Practical Projects',
      percentage: 60,
      description: 'Short films, documentaries, and music videos produced individually or in groups.'
    },
    { method: 'Written Assignments', percentage: 20, description: 'Essays, production logs, and reflective journals.' },
    { method: 'Presentations', percentage: 10, description: 'Pitching ideas and defending creative choices.' },
    { method: 'Class Participation', percentage: 10, description: 'Engagement in critiques and workshops.' }
  ],
  facilities: [
    {
      name: 'Sound Stage',
      description: 'Professional studio with green screen and lighting grid.',
      imageUrl: '/placeholder/soundstage.jpg'
    },
    {
      name: 'Edit Suites',
      description: 'High-performance Mac workstations with Adobe Creative Cloud.',
      imageUrl: '/placeholder/editsuites.jpg'
    },
    {
      name: 'Sound Studios',
      description: 'Acoustically treated rooms for recording and mixing.',
      imageUrl: '/placeholder/soundstudios.jpg'
    },
    {
      name: 'Equipment Store',
      description: 'Fully stocked rental house for student checkouts.',
      imageUrl: '/placeholder/store.jpg'
    },
    {
      name: 'Animation Lab',
      description: 'Dedicated lab for 2D and 3D animation work.',
      imageUrl: '/placeholder/animlab.jpg'
    },
    {
      name: 'Screening Room',
      description: 'Theater-style room for viewing films.',
      imageUrl: '/placeholder/screening.jpg'
    }
  ],
  portfolioItems: [
    { title: 'The Last Matatu', student: 'Group Project', imageUrl: '/placeholder/portfolio1.jpg' },
    { title: 'Nairobi Nights', student: 'John Doe', imageUrl: '/placeholder/portfolio2.jpg' },
    { title: 'Echoes of Silence', student: 'Jane Smith', imageUrl: '/placeholder/portfolio3.jpg' }
  ],
  activityPhotos: [
    { caption: 'Students on set', imageUrl: '/placeholder/action1.jpg' },
    { caption: 'Lighting workshop', imageUrl: '/placeholder/action2.jpg' },
    { caption: 'Editing masterclass', imageUrl: '/placeholder/action3.jpg' },
    { caption: 'Graduation day', imageUrl: '/placeholder/action4.jpg' }
  ],
  alumniStories: [
    {
      name: 'Mark Maina',
      role: 'Director',
      company: 'Zamaradi',
      story: 'My thesis film won an award at KIFF, launching my career.',
      imageUrl: '/placeholder/mark.jpg',
      graduationYear: '2020'
    },
    {
      name: 'Alicia Keys',
      role: 'Editor',
      company: 'Citizen TV',
      story: 'I got hired straight out of my internship.',
      imageUrl: '/placeholder/alicia.jpg',
      graduationYear: '2021'
    },
    {
      name: 'Bob Marley',
      role: 'Sound',
      company: 'Freelance',
      story: 'ADMI gave me the network I needed to succeed.',
      imageUrl: '/placeholder/bob.jpg',
      graduationYear: '2019'
    }
  ],
  industryPartners: [
    { name: 'Canon', logoUrl: '/placeholder/canon.png' },
    { name: 'Netflix', logoUrl: '/placeholder/netflix.png' },
    { name: 'Boomplay', logoUrl: '/placeholder/boomplay.png' },
    { name: 'KBC', logoUrl: '/placeholder/kbc.png' },
    { name: 'Safaricom', logoUrl: '/placeholder/safaricom.png' },
    { name: 'Vivo', logoUrl: '/placeholder/vivo.png' },
    { name: 'Tecno', logoUrl: '/placeholder/tecno.png' },
    { name: 'Google', logoUrl: '/placeholder/google.png' },
    { name: 'Meta', logoUrl: '/placeholder/meta.png' },
    { name: 'Adobe', logoUrl: '/placeholder/adobe.png' }
  ],
  industryTrends: [
    { stat: '10%', label: 'Growth/Year', description: 'The Kenyan film industry is growing rapidly.' },
    { stat: '$2B', label: 'Market Value', description: 'Estimated value of the creative economy.' },
    { stat: '50k+', label: 'New Jobs', description: 'Expected job creation in the next 5 years.' }
  ],
  resources: [
    {
      title: 'How to pitch your film',
      category: 'Guide',
      imageUrl: '/placeholder/blog1.jpg',
      link: '/blog/pitch-guide'
    },
    {
      title: 'Top 5 cameras for beginners',
      category: 'Gear',
      imageUrl: '/placeholder/blog2.jpg',
      link: '/blog/cameras'
    },
    {
      title: 'Interview with a Director',
      category: 'Inspiration',
      imageUrl: '/placeholder/blog3.jpg',
      link: '/blog/interview'
    }
  ]
}
