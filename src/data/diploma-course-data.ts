/**
 * Diploma Course Mock Data
 * 
 * This file contains hardcoded data for all diploma course pages.
 * Data can be migrated to Contentful for editing by the content team.
 * 
 * Uses Tailwind CSS variables from globals.css:
 * - Colors: brand-red (#C1272D), brand-sage (#8EBFB0), brand-teal (#8EBFB0)
 * - Text: foreground (#171717), muted (#6B7280)
 * - Backgrounds: warm (#F7F5F2), admi-green (#002A23)
 */

import { CoursePageData } from './course-page-data'

// ============ DIPLOMA-SPECIFIC TYPES ============

export interface HybridStep {
  icon: 'laptop' | 'users' | 'briefcase' | 'calendar'
  title: string
  duration: string
  description: string
}

export interface DiplomaExclusive {
  icon: string
  title: string
  description: string
}

export interface InternshipPartner {
  name: string
  industry: string
  logo?: string
}

export interface InternshipStat {
  value: string
  label: string
}

export interface InternshipStory {
  name: string
  role: string
  company: string
  quote: string
  image?: string
  graduationYear: string
}

export interface IndustryQuoteItem {
  quote: string
  name: string
  role: string
  company: string
  image?: string
}

export interface DiplomaPageData extends CoursePageData {
  // Diploma-specific sections
  hybridSteps: HybridStep[]
  hybridTestimonial: {
    quote: string
    name: string
    program: string
  }
  diplomaExclusives: DiplomaExclusive[]
  internshipStats: InternshipStat[]
  internshipSteps: string[]
  internshipPartners: InternshipPartner[]
  internshipStories: InternshipStory[]
  industryQuotes: IndustryQuoteItem[]
  hiringCompanies: string[]
}

// ============ SHARED DIPLOMA DATA ============

const SHARED_HYBRID_STEPS: HybridStep[] = [
  {
    icon: 'laptop',
    title: 'Online Learning',
    duration: '10 weeks',
    description: 'Study theory, watch tutorials, and complete assignments from anywhere. Flexible scheduling that works around your life.'
  },
  {
    icon: 'users',
    title: 'Campus Bootcamp',
    duration: '2 weeks',
    description: 'Intensive hands-on training at our Nairobi campus. Access professional equipment, studios, and work alongside classmates.'
  },
  {
    icon: 'briefcase',
    title: 'Project Work',
    duration: '4 weeks',
    description: 'Apply what you learned by completing real-world projects. Build your portfolio with industry-standard deliverables.'
  },
  {
    icon: 'calendar',
    title: 'Continue the Cycle',
    duration: 'Next semester',
    description: 'Repeat the cycle each semester, building skills progressively. By graduation, you have 4 bootcamp experiences.'
  }
]

const SHARED_DIPLOMA_EXCLUSIVES: DiplomaExclusive[] = [
  {
    icon: 'equipment',
    title: 'Professional Equipment Access',
    description: 'Full access to industry-standard cameras, sound equipment, editing suites, and production studios during in-person bootcamps.'
  },
  {
    icon: 'briefcase',
    title: 'Guaranteed Internship',
    description: '5th semester industry placement with leading media companies. Get real work experience before graduation.'
  },
  {
    icon: 'graduation',
    title: 'Degree Pathway',
    description: 'Articulate directly into Year 2 of a BA degree at ADMI or partner universities. Your diploma counts.'
  },
  {
    icon: 'network',
    title: 'Alumni Network',
    description: 'Join 2,000+ ADMI graduates working across Africa. Exclusive job boards, events, and mentorship opportunities.'
  },
  {
    icon: 'portfolio',
    title: 'Portfolio Development',
    description: 'Graduate with a professional portfolio of real projects. Reviewed by industry mentors to ensure market readiness.'
  },
  {
    icon: 'mentor',
    title: 'Industry Mentorship',
    description: 'One-on-one guidance from working professionals in your field. Learn from people actively shaping the industry.'
  }
]

const SHARED_INTERNSHIP_STATS: InternshipStat[] = [
  { value: '100%', label: 'Placement Rate' },
  { value: '3 months', label: 'Minimum Duration' },
  { value: '65%', label: 'Convert to Full-Time' },
  { value: '50+', label: 'Partner Companies' }
]

const SHARED_INTERNSHIP_STEPS = [
  'Complete 4 semesters of coursework with passing grades',
  'Work with career services to match with partner companies',
  'Complete 3-month placement with mentorship and evaluation'
]

// ============ FILM & TELEVISION PRODUCTION DIPLOMA ============

export const filmProductionDiplomaData: DiplomaPageData = {
  // Quick Facts
  quickFacts: [
    { label: 'Duration', value: '2 Years', icon: 'schedule' },
    { label: 'Award Level', value: 'Level 6 Diploma', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid', icon: 'group' },
    { label: 'Per Semester', value: 'KES 100,000', icon: 'payments' }
  ],

  // Course Leader
  courseLeader: {
    name: 'Kevin Oloo',
    role: 'Head of Film Department',
    bio: 'Kevin is an award-winning filmmaker with over 15 years of industry experience. He has directed feature films, documentaries, and TV commercials for major brands across East Africa.',
    imageUrl: '/images/faculty/kevin-oloo.jpg',
    quote: "We don't just teach you how to use a camera; we teach you how to tell stories that matter."
  },

  // Industry Quote (main)
  industryQuote: {
    quote: "ADMI graduates arrive on set ready to work. They understand both the creative and technical demands of modern production — that's rare in East Africa.",
    author: 'Dorothy Ghettuba',
    role: 'Head of African Originals',
    company: 'Netflix',
    backgroundImageUrl: '/images/industry/netflix-bg.jpg'
  },

  // Benefits / Why This Course
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
      description: 'Woolf University credits give your diploma international recognition and a degree pathway.',
      icon: '🌍'
    },
    {
      title: 'Guaranteed Internship',
      description: 'Every student completes a mandatory industry placement with our network of 500+ employer partners.',
      icon: '💼'
    },
    {
      title: 'Small Class Sizes',
      description: 'Maximum 25 students per class ensures personalized mentorship and hands-on guidance.',
      icon: '🎓'
    },
    {
      title: 'Award-Winning Alumni',
      description: 'Join graduates working at Netflix, BBC, Showmax, and winning at Kalasha Awards and AMVCA.',
      icon: '🏆'
    }
  ],

  // Degree Pathway
  degreeSteps: [
    { step: 1, title: 'ADMI Diploma', description: '2 Years · TVETA Registered', duration: '2 Years' },
    { step: 2, title: 'Woolf Credits', description: 'EU-Accredited Transfer', duration: 'Transfer' },
    { step: 3, title: "Bachelor's Degree", description: 'Complete While Working', duration: '1 Year' }
  ],

  // Curriculum / Semesters
  semesters: [
    {
      title: 'Semester 1: Foundations of Filmmaking',
      modules: ['Introduction to Film Production', 'Camera Operations', 'Basic Lighting', 'Scriptwriting Fundamentals', 'Audio Recording Basics']
    },
    {
      title: 'Semester 2: Technical Mastery',
      modules: ['Advanced Cinematography', 'Directing Actors', 'Non-Linear Editing (Avid/Premiere)', 'Production Design', 'Sound Design']
    },
    {
      title: 'Semester 3: Storytelling & Post-Production',
      modules: ['Documentary Production', 'Color Grading (DaVinci Resolve)', 'VFX Basics', 'Advanced Sound Mixing', 'Music Video Production']
    },
    {
      title: 'Semester 4: Professional Production',
      modules: ['Final Project Film', 'Portfolio Development', 'Film Festival Submissions', 'Career Preparation', 'Industry Networking']
    }
  ],

  // Payment Plans
  paymentPlans: [
    {
      title: '1st Installment',
      price: 'KES 50,000',
      period: '50% at Registration',
      details: ['Secures your spot and access to all facilities, equipment & materials for the semester.'],
      isPopular: true
    },
    {
      title: '2nd Installment',
      price: 'KES 30,000',
      period: '30% Mid-Semester',
      details: ['Continues your enrollment. Flexible timing aligned with your mid-semester schedule.']
    },
    {
      title: '3rd Installment',
      price: 'KES 20,000',
      period: '20% Before Exams',
      details: ['Final balance clears you for end-of-semester assessments and certifications.']
    }
  ],

  // Impact Stats
  impactStats: [
    { value: '3,000+', label: 'Graduates Since 2007' },
    { value: '85%', label: 'Employed Within 6 Months' },
    { value: '500+', label: 'Industry Partners' },
    { value: 'KES 75K', label: 'Avg Starting Salary' }
  ],

  // Testimonials
  testimonials: [
    {
      name: 'Sarah Wanjiku',
      role: 'Film Production Graduate, 2023',
      quote: "ADMI gave me access to equipment and mentors I wouldn't have found anywhere else in East Africa. My final project got selected for the Kalasha Awards.",
      imageUrl: '/images/testimonials/sarah-wanjiku.jpg'
    },
    {
      name: 'James Ochieng',
      role: 'Film Production Graduate, 2022',
      quote: 'The internship at NMG was life-changing. I went from a student to a working professional seamlessly.',
      imageUrl: '/images/testimonials/james-ochieng.jpg'
    },
    {
      name: 'Amina Hassan',
      role: 'Current Student, Semester 3',
      quote: "I'm already working on my second short film. The equipment we have access to is incredible — RED cameras, full studio, DaVinci Resolve suites.",
      imageUrl: '/images/testimonials/amina-hassan.jpg'
    }
  ],

  // Application Steps
  applicationSteps: [
    { step: 1, title: 'Submit Application', description: 'Fill in the online form with your details and upload your KCSE certificate. Takes 5 minutes.' },
    { step: 2, title: 'Attend Interview', description: 'Meet our admissions team in person or online. Share your passion and ask any questions.' },
    { step: 3, title: 'Secure Your Place', description: 'Pay your 1st installment (50%) to confirm enrollment. Save 10% by paying upfront.' }
  ],

  // FAQs
  faqs: [
    {
      question: 'What are the entry requirements?',
      answer: 'You need a KCSE certificate (minimum C-) or equivalent. No prior film experience required — we teach you everything from scratch.'
    },
    {
      question: 'How much does a semester cost?',
      answer: 'Semester fees are KES 100,000. We offer a 3-installment plan: 50% at registration, 30% mid-semester, and 20% before exams.'
    },
    {
      question: 'Is the diploma internationally recognized?',
      answer: 'Yes. Through our Woolf University partnership, you earn EU-accredited credits. Our programmes are also registered with TVETA Kenya.'
    },
    {
      question: 'Do I get an internship placement?',
      answer: 'Yes — every diploma student completes a mandatory industry placement in the 5th semester with our network of 500+ employer partners.'
    },
    {
      question: 'When are the next intake dates?',
      answer: 'We have three intakes per year: January, May, and September. Apply at least 4 weeks before your preferred start date.'
    }
  ],

  // Career Outcomes
  careers: [
    { title: 'Film Director', description: 'Lead creative vision for films, TV shows, commercials & music videos' },
    { title: 'Cinematographer', description: 'Craft stunning visuals as Director of Photography' },
    { title: 'Film Editor', description: 'Shape narratives using Avid, Premiere Pro & DaVinci Resolve' },
    { title: 'Producer', description: 'Manage budgets, schedules & teams to bring productions to life' },
    { title: 'Sound Designer', description: 'Create immersive audio experiences for film and TV' },
    { title: 'Colorist', description: 'Grade footage to create cinematic looks and moods' }
  ],

  // Program Details
  programDetails: [
    { label: 'Awarding Body', value: 'Woolf University / TVET CDACC' },
    { label: 'Level', value: 'Level 6 Diploma' },
    { label: 'Credits', value: '240 Credits' },
    { label: 'Duration', value: '2 Years (5 Semesters)' },
    { label: 'Campus', value: 'Nairobi CBD' },
    { label: 'Intakes', value: 'January, May, September' }
  ],

  // Learning Outcomes
  learningOutcomes: [
    'Operate professional camera and lighting equipment',
    'Write and format screenplays for short films and documentaries',
    'Edit video and audio using industry-standard software',
    'Manage a film production from pre-production to distribution',
    'Apply critical thinking to analyze and critique films'
  ],

  // Mentors - Real ADMI faculty from Contentful
  mentors: [
    { name: 'Kevin Oloo', role: 'Head of Film', company: 'ADMI Faculty', imageUrl: '/images/faculty/kevin-oloo.jpg' },
    { name: 'Alfred Chomba', role: 'Director of Photography', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/3Wkosdz4HWKw7L1U7WpSTF/c209d77b178bfeaf7520d09dbbae3d82/Afred_Chomba.webp' },
    { name: 'Ciku Munuku', role: 'Production & Directing', company: 'ADMI Faculty', imageUrl: '/images/faculty/ciku-munuku.jpg' },
    { name: 'Wanuri Kahiu', role: 'Director', company: 'Industry Mentor', imageUrl: '/images/mentors/wanuri-kahiu.jpg' },
    { name: 'Likarion Wainaina', role: 'Director, Supa Modo', company: 'Alumni Mentor', imageUrl: '/images/mentors/likarion-wainaina.jpg' }
  ],

  // Assessment Methods
  assessmentMethods: [
    { method: 'Practical Projects', percentage: 60, description: 'Short films, documentaries, and music videos' },
    { method: 'Written Assignments', percentage: 20, description: 'Essays, production logs, and reflective journals' },
    { method: 'Presentations', percentage: 10, description: 'Pitching ideas and defending creative choices' },
    { method: 'Class Participation', percentage: 10, description: 'Engagement in critiques and workshops' }
  ],

  // Facilities
  facilities: [
    { name: 'Sound Stage', description: 'Professional studio with green screen and lighting grid', imageUrl: '/images/facilities/sound-stage.jpg' },
    { name: 'Edit Suites', description: 'High-performance Mac workstations with Adobe Creative Cloud', imageUrl: '/images/facilities/edit-suites.jpg' },
    { name: 'Equipment Store', description: 'RED cameras, Blackmagic, professional audio gear for checkout', imageUrl: '/images/facilities/equipment-store.jpg' },
    { name: 'Screening Room', description: 'Theater-style room for viewing and critiquing work', imageUrl: '/images/facilities/screening-room.jpg' }
  ],

  // Portfolio Items - Real ADMI student projects
  portfolioItems: [
    { title: 'AHADI', student: 'ADMI Student Production', imageUrl: '/images/portfolio/ahadi.jpg', projectUrl: 'https://www.youtube.com/watch?v=4pHCMcI4CHw' },
    { title: 'SANAA Exhibition 2024', student: 'Class of 2024', imageUrl: '/images/portfolio/sanaa-exhibition.jpg', projectUrl: 'https://www.youtube.com/watch?v=384UobxSV9I' },
    { title: 'This Is ADMI Series', student: 'ADMI Productions', imageUrl: '/images/portfolio/this-is-admi.jpg', projectUrl: 'https://www.youtube.com/watch?v=VrSltUraBzE' },
    { title: 'Mama Watoto', student: 'Faith Chebet', imageUrl: '/images/portfolio/mama-watoto.jpg', projectUrl: 'https://youtube.com/watch?v=example4' },
    { title: 'Digital Divide', student: 'Class of 2025', imageUrl: '/images/portfolio/digital-divide.jpg', projectUrl: 'https://youtube.com/watch?v=example5' },
    { title: 'Kibera Rising', student: 'Moses Otieno', imageUrl: '/images/portfolio/kibera-rising.jpg', projectUrl: 'https://youtube.com/watch?v=example6' }
  ],

  // Activity Photos - Mix of images and YouTube videos for masonry grid
  activityPhotos: [
    { caption: 'SANAA Student Exhibition 2024 - presenting final projects', imageUrl: '/images/activities/sanaa-exhibition.jpg', videoUrl: 'https://www.youtube.com/watch?v=384UobxSV9I', aspectRatio: 'landscape' },
    { caption: 'Three-point lighting workshop with DoP Samuel Ngugi', imageUrl: '/images/activities/lighting-workshop.jpg', aspectRatio: 'square' },
    { caption: 'Color grading session using DaVinci Resolve', imageUrl: '/images/activities/color-grading.jpg', aspectRatio: 'portrait' },
    { caption: 'Inside the SANAA Student Exhibition', imageUrl: '/images/activities/sanaa-inside.jpg', videoUrl: 'https://www.youtube.com/watch?v=hmC_wWGiQTk', aspectRatio: 'landscape' },
    { caption: 'Students directing actors during bootcamp exercise', imageUrl: '/images/activities/directing-actors.jpg', aspectRatio: 'square' },
    { caption: 'Behind the scenes: AHADI student film production', imageUrl: '/images/activities/ahadi-bts.jpg', videoUrl: 'https://www.youtube.com/watch?v=4pHCMcI4CHw', aspectRatio: 'landscape' }
  ],

  // Alumni Stories - Real ADMI graduates from This Is ADMI series
  alumniStories: [
    {
      name: 'Ritchie Mistri',
      role: 'Film Director & Cinematographer',
      company: 'Freelance',
      story: 'Started with programming, but my heart belonged to film. A short course at ADMI grew into a full diploma. The late nights editing, the creative freedom — ADMI was not just school, it was home.',
      imageUrl: '/images/alumni/ritchie-mistri.jpg',
      graduationYear: '2024'
    },
    {
      name: 'Hussein Lorot',
      role: 'Director of Photography',
      company: 'Freelance',
      story: 'ADMI taught me to see light differently. Now I shoot commercials and music videos for top artists across East Africa.',
      imageUrl: '/images/alumni/hussein-lorot.jpg',
      graduationYear: '2022'
    },
    {
      name: 'Arieh Aura',
      role: 'Film Editor',
      company: 'Production House',
      story: 'The editing suite became my second home at ADMI. Today I edit content for international broadcasters.',
      imageUrl: '/images/alumni/arieh-aura.jpg',
      graduationYear: '2021'
    }
  ],

  // Industry Partners
  industryPartners: [
    { name: 'Netflix', logoUrl: '/images/partners/netflix.png' },
    { name: 'Nation Media Group', logoUrl: '/images/partners/nmg.png' },
    { name: 'Standard Group', logoUrl: '/images/partners/standard.png' },
    { name: 'Showmax', logoUrl: '/images/partners/showmax.png' },
    { name: 'Canon', logoUrl: '/images/partners/canon.png' }
  ],

  // Industry Trends
  industryTrends: [
    { stat: '10%', label: 'Annual Growth', description: 'Kenyan film industry growing rapidly' },
    { stat: '$2B', label: 'Market Value', description: 'East African creative economy' },
    { stat: '50K+', label: 'New Jobs', description: 'Expected in next 5 years' }
  ],

  // Resources
  resources: [
    { title: 'How to Pitch Your Film', category: 'Guide', imageUrl: '/images/blog/pitch-guide.jpg', link: '/blog/film-pitch-guide' },
    { title: 'Top Cameras for Beginners', category: 'Gear', imageUrl: '/images/blog/cameras.jpg', link: '/blog/beginner-cameras' }
  ],

  // ============ DIPLOMA-SPECIFIC SECTIONS ============

  // Hybrid Model
  hybridSteps: SHARED_HYBRID_STEPS,
  hybridTestimonial: {
    quote: "The hybrid model changed everything for me. I could study online from Mombasa, then come to Nairobi for the bootcamps. Those two weeks on campus were intense but incredible — we shot our first short film!",
    name: 'Michael Odhiambo',
    program: 'Film Production Diploma, Class of 2025'
  },

  // Diploma Exclusives
  diplomaExclusives: SHARED_DIPLOMA_EXCLUSIVES,

  // Internship Program
  internshipStats: SHARED_INTERNSHIP_STATS,
  internshipSteps: SHARED_INTERNSHIP_STEPS,
  internshipPartners: [
    { name: 'Nation Media Group', industry: 'Media & Broadcasting' },
    { name: 'Standard Group', industry: 'Media & Broadcasting' },
    { name: 'Royal Media Services', industry: 'Media & Broadcasting' },
    { name: 'Homeboyz Entertainment', industry: 'Entertainment' },
    { name: 'Spielworks Media', industry: 'Production House' },
    { name: 'Blue Sky Films', industry: 'Production House' }
  ],
  internshipStories: [
    {
      name: 'James Mwangi',
      role: 'Assistant Editor',
      company: 'Nation Media Group',
      quote: 'Started as an intern during my 5th semester. Three months later, I was offered a full-time position.',
      image: '/images/interns/james-mwangi.jpg',
      graduationYear: '2024'
    },
    {
      name: 'Sarah Ochieng',
      role: 'Assistant Director',
      company: 'Riverwood Studios',
      quote: 'My internship turned into my career. The bootcamp training meant I already knew the equipment.',
      image: '/images/interns/sarah-ochieng.jpg',
      graduationYear: '2023'
    }
  ],

  // Industry Validation
  industryQuotes: [
    {
      quote: "ADMI graduates come prepared. They understand both the creative and technical sides of production. We don't need to teach them basics.",
      name: 'David Odhiambo',
      role: 'Head of Production',
      company: 'Nation Media Group',
      image: '/images/industry/david-odhiambo.jpg'
    },
    {
      quote: "The practical experience they gain during bootcamps shows. When we hire ADMI graduates, we're hiring professionals who understand workflows.",
      name: 'Grace Muthoni',
      role: 'Studio Manager',
      company: 'Ketebul Music',
      image: '/images/industry/grace-muthoni.jpg'
    },
    {
      quote: "We've hired 12 ADMI interns over the past two years. Eight are now full-time employees. That says everything.",
      name: 'Michael Kamau',
      role: 'Creative Director',
      company: 'Homeboyz Entertainment',
      image: '/images/industry/michael-kamau.jpg'
    }
  ],
  hiringCompanies: [
    'Nation Media Group',
    'Standard Group',
    'Royal Media Services',
    'Homeboyz Entertainment',
    'Safaricom',
    'Scanad Kenya',
    'Ogilvy Kenya',
    'Dentsu Kenya',
    'Netflix Africa',
    'Showmax',
    'BBC Africa',
    'UNICEF Kenya'
  ]
}

// ============ SOUND ENGINEERING DIPLOMA ============

export const soundEngineeringDiplomaData: DiplomaPageData = {
  quickFacts: [
    { label: 'Duration', value: '2 Years', icon: 'schedule' },
    { label: 'Award Level', value: 'Level 6 Diploma', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid', icon: 'group' },
    { label: 'Per Semester', value: 'KES 100,000', icon: 'payments' }
  ],

  courseLeader: {
    name: 'Hendrick Sam',
    role: 'Head of Sound Engineering',
    bio: 'Hendrick is a producer, audio engineer, film scorer and educator with extensive experience in the Kenyan music and film industry. He has worked on numerous award-winning productions.',
    imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/7MKvW5jJsY1aUK9ep53SgZ/d23a89753f7dc2db0e124de0b57f5b79/image__95_.webp',
    quote: 'Great sound is invisible when done right. Our job is to make music feel, not just sound.'
  },

  industryQuote: {
    quote: 'ADMI sound graduates have been essential to our studio operations. They understand both the art and science of audio production.',
    author: 'Taio Tripper',
    role: 'Founder',
    company: 'Kaka Empire',
    backgroundImageUrl: '/images/industry/studio-bg.jpg'
  },

  benefits: [
    {
      title: 'World-Class Studios',
      description: 'Train in professional recording studios with SSL consoles, Genelec monitors, and Pro Tools HDX systems.',
      icon: '🎛️'
    },
    {
      title: 'Live Sound Training',
      description: 'Learn live mixing, PA systems, and event production. Work real events during bootcamps.',
      icon: '🎤'
    },
    {
      title: 'Industry Connections',
      description: 'Guest lectures from top producers and engineers. Network with Kenya\'s music industry leaders.',
      icon: '🤝'
    },
    {
      title: 'Certified Training',
      description: 'Avid Pro Tools certification included. Graduate with credentials recognized worldwide.',
      icon: '📜'
    },
    {
      title: 'Portfolio Projects',
      description: 'Record, mix, and master real songs. Graduate with professional credits to your name.',
      icon: '💿'
    },
    {
      title: 'Studio Internship',
      description: 'Mandatory placement at professional studios. Many students get hired by their internship hosts.',
      icon: '🏢'
    }
  ],

  degreeSteps: [
    { step: 1, title: 'ADMI Diploma', description: '2 Years · TVETA Registered', duration: '2 Years' },
    { step: 2, title: 'Woolf Credits', description: 'EU-Accredited Transfer', duration: 'Transfer' },
    { step: 3, title: "Bachelor's Degree", description: 'Complete While Working', duration: '1 Year' }
  ],

  semesters: [
    {
      title: 'Semester 1: Audio Fundamentals',
      modules: ['Introduction to Sound', 'Acoustics & Psychoacoustics', 'Microphone Techniques', 'Pro Tools Basics', 'Music Theory for Engineers']
    },
    {
      title: 'Semester 2: Recording Techniques',
      modules: ['Advanced Mic Placement', 'Multi-track Recording', 'Session Management', 'Signal Flow', 'Studio Etiquette']
    },
    {
      title: 'Semester 3: Mixing & Production',
      modules: ['Mixing Fundamentals', 'EQ & Compression', 'Effects Processing', 'Mixing in Different Genres', 'Mix Translation']
    },
    {
      title: 'Semester 4: Mastering & Live Sound',
      modules: ['Mastering for Distribution', 'Live Sound Fundamentals', 'PA System Design', 'Broadcast Audio', 'Final Portfolio']
    }
  ],

  paymentPlans: [
    { title: '1st Installment', price: 'KES 50,000', period: '50% at Registration', details: ['Secures your spot'], isPopular: true },
    { title: '2nd Installment', price: 'KES 30,000', period: '30% Mid-Semester', details: ['Continues enrollment'] },
    { title: '3rd Installment', price: 'KES 20,000', period: '20% Before Exams', details: ['Clears assessments'] }
  ],

  impactStats: [
    { value: '500+', label: 'Sound Graduates' },
    { value: '90%', label: 'Industry Placement' },
    { value: '30+', label: 'Studio Partners' },
    { value: 'KES 60K', label: 'Avg Starting Salary' }
  ],

  testimonials: [
    {
      name: 'Kevin Mwangi',
      role: 'Sound Engineering Graduate, 2023',
      quote: 'I went from knowing nothing about audio to mixing for major artists. ADMI\'s studios are incredible.',
      imageUrl: '/images/testimonials/kevin-mwangi.jpg'
    },
    {
      name: 'Mercy Akinyi',
      role: 'Sound Engineering Graduate, 2022',
      quote: 'The Pro Tools certification helped me land my first job. Now I work at Ketebul Music.',
      imageUrl: '/images/testimonials/mercy-akinyi.jpg'
    }
  ],

  applicationSteps: [
    { step: 1, title: 'Submit Application', description: 'Fill the online form and upload your KCSE certificate.' },
    { step: 2, title: 'Admissions Interview', description: 'Meet our team to discuss your goals and answer questions.' },
    { step: 3, title: 'Confirm Enrollment', description: 'Pay 50% deposit to secure your place.' }
  ],

  faqs: [
    { question: 'Do I need music experience?', answer: 'No prior experience required. We teach you from the fundamentals.' },
    { question: 'What software will I learn?', answer: 'Pro Tools (certified), Logic Pro, Ableton Live, and more.' },
    { question: 'Is live sound included?', answer: 'Yes! You\'ll learn both studio recording and live event mixing.' }
  ],

  careers: [
    { title: 'Recording Engineer', description: 'Record artists in professional studio environments' },
    { title: 'Mix Engineer', description: 'Create polished mixes for music releases' },
    { title: 'Mastering Engineer', description: 'Finalize audio for distribution platforms' },
    { title: 'Live Sound Engineer', description: 'Mix audio for concerts, events, and broadcasts' },
    { title: 'Podcast Producer', description: 'Record and produce podcast content' },
    { title: 'Audio for Film', description: 'Design sound for film and television' }
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'Woolf University / TVET CDACC' },
    { label: 'Level', value: 'Level 6 Diploma' },
    { label: 'Credits', value: '240 Credits' },
    { label: 'Duration', value: '2 Years (5 Semesters)' },
    { label: 'Campus', value: 'Nairobi CBD' },
    { label: 'Certification', value: 'Avid Pro Tools Certified' }
  ],

  learningOutcomes: [
    'Operate professional recording equipment',
    'Record multi-track sessions for various genres',
    'Mix and master audio to industry standards',
    'Design and operate live sound systems',
    'Apply acoustic principles to studio design'
  ],

  // Mentors - Real ADMI faculty from Contentful
  mentors: [
    { name: 'Hendrick Sam', role: 'Producer & Film Scorer', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/7MKvW5jJsY1aUK9ep53SgZ/d23a89753f7dc2db0e124de0b57f5b79/image__95_.webp' },
    { name: 'Karumba Ngatia', role: 'DJ/Producer & Mix Engineer', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/2CdtlISmgi2FVjgoXAquQm/ec5c2f25406b9fd336d4c17ac83ae964/image__8_.webp' },
    { name: 'Patrick Kabugi', role: 'Composer & Sound Designer', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/4aZBSQXnU9paLaO5WKYZbi/4d93417d473b781fc71815485c267336/kabugi.png' },
    { name: 'Kennedy Wathome', role: 'Music Producer', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/7eyJxfU1GQBstr6vbjzACd/40e469767d77de35717d156ffb12147b/KEN-WATHOME-MP.png' }
  ],

  assessmentMethods: [
    { method: 'Practical Projects', percentage: 70, description: 'Recording, mixing, mastering assignments' },
    { method: 'Technical Tests', percentage: 15, description: 'Equipment operation and theory' },
    { method: 'Portfolio', percentage: 15, description: 'Final portfolio of completed works' }
  ],

  facilities: [
    { name: 'Recording Studio A', description: 'SSL AWS 948 console with Pro Tools HDX, Genelec 8341A monitoring', imageUrl: '/images/facilities/studio-a.jpg' },
    { name: 'Recording Studio B', description: 'Neve-style analog warmth with vintage outboard gear', imageUrl: '/images/facilities/studio-b.jpg' },
    { name: 'Mix Room', description: 'Acoustically treated room with 5.1 surround capability', imageUrl: '/images/facilities/mix-room.jpg' },
    { name: 'Live Sound Lab', description: 'Full PA system with digital mixing consoles for concert simulation', imageUrl: '/images/facilities/live-sound.jpg' },
    { name: 'Podcast Studio', description: 'Voice-over ready booth with broadcast-quality equipment', imageUrl: '/images/facilities/podcast-studio.jpg' }
  ],

  // Portfolio Items - Real ADMI album launches from YouTube
  portfolioItems: [
    { title: 'Club Euphoria Album', student: 'Sound Engineering Sem 4', imageUrl: '/images/portfolio/club-euphoria.jpg', projectUrl: 'https://www.youtube.com/watch?v=hxxDpUVKY1Y' },
    { title: 'Cloud Nine Album', student: 'Sound Engineering Class', imageUrl: '/images/portfolio/cloud-nine.jpg', projectUrl: 'https://www.youtube.com/watch?v=n5dclg0hi5k' },
    { title: 'Live at Alliance Française', student: 'Mercy Akinyi', imageUrl: '/images/portfolio/live-alliance.jpg' },
    { title: 'Film Score: Mama Watoto', student: 'Peter Njoroge', imageUrl: '/images/portfolio/film-score.jpg' },
    { title: 'Afro Jazz EP', student: 'Class of 2025', imageUrl: '/images/portfolio/afro-jazz.jpg' }
  ],

  // Activity Photos - Mix of images and YouTube videos for masonry grid
  activityPhotos: [
    { caption: 'Recording a live band in Studio A - bootcamp session', imageUrl: '/images/activities/studio-session.jpg', aspectRatio: 'landscape' },
    { caption: 'Club Euphoria Album Launch - celebrating Semester 4 graduates', imageUrl: '/images/activities/club-euphoria-launch.jpg', videoUrl: 'https://www.youtube.com/watch?v=hxxDpUVKY1Y', aspectRatio: 'landscape' },
    { caption: 'Pro Tools certification exam preparation', imageUrl: '/images/activities/protools-cert.jpg', aspectRatio: 'square' },
    { caption: 'Cloud Nine Album Launch - student showcase event', imageUrl: '/images/activities/cloud-nine-launch.jpg', videoUrl: 'https://www.youtube.com/watch?v=n5dclg0hi5k', aspectRatio: 'landscape' },
    { caption: 'Students mixing a full album during bootcamp', imageUrl: '/images/activities/mixing-session.jpg', aspectRatio: 'portrait' }
  ],

  // Alumni Stories - Real ADMI alumni from This Is ADMI series
  alumniStories: [
    {
      name: 'Papa Billions',
      role: 'Music Producer',
      company: 'Independent Artist',
      story: 'ADMI gave me the technical foundation to take my music to the next level. From the SSL console to the industry connections, it was the launchpad I needed.',
      imageUrl: '/images/alumni/papa-billions.jpg',
      graduationYear: '2023'
    },
    {
      name: 'Francis Simba',
      role: 'Sound Engineer',
      company: 'Freelance',
      story: 'I came to ADMI with passion but no direction. The hands-on studio hours and mentorship helped me find my voice in the industry.',
      imageUrl: '/images/alumni/francis-simba.jpg',
      graduationYear: '2022'
    },
    {
      name: 'Sifa Mutonga',
      role: 'Audio Post-Production',
      company: 'Production House',
      story: 'The film sound courses opened doors I never expected. Now I\'m doing audio post for documentaries and commercials.',
      imageUrl: '/images/alumni/sifa-mutonga.jpg',
      graduationYear: '2021'
    }
  ],

  industryPartners: [
    { name: 'Ketebul Music', logoUrl: '/images/partners/ketebul.png' },
    { name: 'Decimal Records', logoUrl: '/images/partners/decimal.png' },
    { name: 'Kaka Empire', logoUrl: '/images/partners/kaka-empire.png' },
    { name: 'Ogopa DJs', logoUrl: '/images/partners/ogopa.png' }
  ],

  industryTrends: [
    { stat: '25%', label: 'Streaming Growth', description: 'Kenya\'s music streaming market expanding' },
    { stat: '1M+', label: 'Artists', description: 'Active creators across Africa' }
  ],

  resources: [
    { title: 'Pro Tools Shortcuts Guide', category: 'Guide', imageUrl: '/images/blog/protools.jpg', link: '/blog/protools-shortcuts' }
  ],

  // Diploma-specific
  hybridSteps: SHARED_HYBRID_STEPS,
  hybridTestimonial: {
    quote: 'During the bootcamps, I recorded actual artists. That experience was priceless.',
    name: 'Peter Njoroge',
    program: 'Sound Engineering Diploma, Class of 2024'
  },
  diplomaExclusives: SHARED_DIPLOMA_EXCLUSIVES,
  internshipStats: SHARED_INTERNSHIP_STATS,
  internshipSteps: SHARED_INTERNSHIP_STEPS,
  internshipPartners: [
    { name: 'Ketebul Music', industry: 'Recording Studio' },
    { name: 'Decimal Records', industry: 'Music Production' },
    { name: 'Homeboyz Entertainment', industry: 'Entertainment' },
    { name: 'Capital FM', industry: 'Broadcast' }
  ],
  internshipStories: [
    {
      name: 'Brian Kibet',
      role: 'Assistant Engineer',
      company: 'Decimal Records',
      quote: 'My internship became my career. I\'m now a full-time studio engineer.',
      image: '/images/interns/brian-kibet.jpg',
      graduationYear: '2021'
    }
  ],
  industryQuotes: [
    {
      quote: 'ADMI sound graduates understand workflow. They don\'t just know the tools — they know how to run a session.',
      name: 'Taio Tripper',
      role: 'Founder',
      company: 'Kaka Empire',
      image: '/images/industry/taio-tripper.jpg'
    }
  ],
  hiringCompanies: [
    'Ketebul Music',
    'Decimal Records',
    'Kaka Empire',
    'Ogopa DJs',
    'Capital FM',
    'NRG Radio',
    'Homeboyz Entertainment',
    'Safari Sounds',
    'Audio House Kenya'
  ]
}

// ============ GRAPHIC DESIGN DIPLOMA ============

export const graphicDesignDiplomaData: DiplomaPageData = {
  quickFacts: [
    { label: 'Duration', value: '2 Years', icon: 'schedule' },
    { label: 'Award Level', value: 'Level 6 Diploma', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid', icon: 'group' },
    { label: 'Per Semester', value: 'KES 85,000', icon: 'payments' }
  ],

  courseLeader: {
    name: 'Christine Mwangi',
    role: 'Head of Design Department',
    bio: 'Christine has 15 years of experience in brand design and has worked with major corporations across East Africa. She brings real-world design thinking to every lesson.',
    imageUrl: '/images/faculty/christine-mwangi.jpg',
    quote: 'Design is problem-solving made visible. We teach you to think, not just create.'
  },

  industryQuote: {
    quote: 'ADMI design graduates understand brand strategy, not just software. That\'s what makes them valuable.',
    author: 'Peter Nganga',
    role: 'Creative Director',
    company: 'Ogilvy Kenya',
    backgroundImageUrl: '/images/industry/agency-bg.jpg'
  },

  benefits: [
    { title: 'Adobe Certified Training', description: 'Master Photoshop, Illustrator, InDesign, and After Effects with certified instruction.', icon: '🎨' },
    { title: 'Brand Strategy Focus', description: 'Learn the business side of design — positioning, storytelling, and client management.', icon: '📊' },
    { title: 'Portfolio-First Curriculum', description: 'Every project builds your portfolio. Graduate with 20+ polished pieces.', icon: '📁' },
    { title: 'Agency Partnerships', description: 'Work on real briefs from partner agencies during bootcamps.', icon: '🏢' },
    { title: 'UI/UX Foundations', description: 'Learn digital product design basics — prepare for the tech industry.', icon: '📱' },
    { title: 'Career Support', description: 'Interview prep, portfolio reviews, and direct introductions to hiring partners.', icon: '🚀' }
  ],

  degreeSteps: [
    { step: 1, title: 'ADMI Diploma', description: '2 Years · TVETA Registered', duration: '2 Years' },
    { step: 2, title: 'Woolf Credits', description: 'EU-Accredited Transfer', duration: 'Transfer' },
    { step: 3, title: "Bachelor's Degree", description: 'Complete While Working', duration: '1 Year' }
  ],

  semesters: [
    { title: 'Semester 1: Design Foundations', modules: ['Elements of Design', 'Typography', 'Color Theory', 'Adobe Illustrator', 'Drawing for Designers'] },
    { title: 'Semester 2: Digital Design', modules: ['Adobe Photoshop', 'Adobe InDesign', 'Layout Design', 'Print Production', 'Brand Identity Basics'] },
    { title: 'Semester 3: Brand & Motion', modules: ['Brand Strategy', 'Logo Design', 'After Effects', 'Social Media Design', 'UI Design Basics'] },
    { title: 'Semester 4: Professional Practice', modules: ['Campaign Design', 'Packaging Design', 'Portfolio Development', 'Client Presentations', 'Career Prep'] }
  ],

  paymentPlans: [
    { title: '1st Installment', price: 'KES 42,500', period: '50% at Registration', details: ['Secures your spot'], isPopular: true },
    { title: '2nd Installment', price: 'KES 25,500', period: '30% Mid-Semester', details: ['Continues enrollment'] },
    { title: '3rd Installment', price: 'KES 17,000', period: '20% Before Exams', details: ['Clears assessments'] }
  ],

  impactStats: [
    { value: '800+', label: 'Design Graduates' },
    { value: '88%', label: 'Employed in 6 Months' },
    { value: '40+', label: 'Agency Partners' },
    { value: 'KES 65K', label: 'Avg Starting Salary' }
  ],

  testimonials: [
    {
      name: 'Angela Kimani',
      role: 'Graphic Design Graduate, 2023',
      quote: 'The real-world briefs during bootcamps prepared me for agency life. I felt ready from day one.',
      imageUrl: '/images/testimonials/angela-kimani.jpg'
    }
  ],

  applicationSteps: [
    { step: 1, title: 'Apply Online', description: 'Submit your application with KCSE certificate.' },
    { step: 2, title: 'Portfolio Review', description: 'Share any creative work (optional but encouraged).' },
    { step: 3, title: 'Secure Your Spot', description: 'Pay your deposit to confirm enrollment.' }
  ],

  faqs: [
    { question: 'Do I need a portfolio to apply?', answer: 'No portfolio required for admission. We\'ll help you build one during the program.' },
    { question: 'What software will I learn?', answer: 'Adobe Creative Suite (Photoshop, Illustrator, InDesign, After Effects) and Figma for UI/UX.' },
    { question: 'Can I specialize in UI/UX?', answer: 'Yes! Our curriculum includes UI/UX foundations, and many graduates work in tech.' }
  ],

  careers: [
    { title: 'Graphic Designer', description: 'Create visual content for brands and publications' },
    { title: 'Brand Designer', description: 'Develop brand identities and style guides' },
    { title: 'UI Designer', description: 'Design user interfaces for apps and websites' },
    { title: 'Motion Designer', description: 'Create animated graphics and video content' },
    { title: 'Art Director', description: 'Lead creative vision for campaigns and projects' }
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'Woolf University / TVET CDACC' },
    { label: 'Level', value: 'Level 6 Diploma' },
    { label: 'Credits', value: '240 Credits' },
    { label: 'Duration', value: '2 Years (5 Semesters)' },
    { label: 'Campus', value: 'Nairobi CBD' }
  ],

  learningOutcomes: [
    'Create professional brand identities',
    'Design for print and digital platforms',
    'Apply typography and color theory',
    'Present and defend design decisions',
    'Manage client relationships'
  ],

  mentors: [
    { name: 'Christine Mwangi', role: 'Head of Design', company: 'ADMI Faculty', imageUrl: '/images/faculty/christine-mwangi.jpg' },
    { name: 'Benjamin Waithaka', role: 'Animation Lecturer & 3D Artist', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/4s4gv9moVBGWk4x2RleQ1a/2650fe1a4f4d60804751bcb2bd430415/benja.jpeg' },
    { name: 'Manal Omayer', role: 'Animation Lecturer & VR Specialist', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/5fFBD2H4IcdXbsngXlL2c8/419dbdf524943f88737122a36fdb7373/image__73_.webp' },
    { name: 'Fredrick Muendo', role: 'Graphic Design Expert', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/atfcin0DTFP8cFdJIIk5I/aa1a92056d747d5a7638303bc647af20/image__90_.webp' },
    { name: 'Nzilani Simu', role: 'Visual Artist & Illustrator', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/6dUxjvQGa9cZ7yGlqauV7B/2c0fd6499a3c80b2191ee38349d926a4/image__21_.webp' }
  ],

  assessmentMethods: [
    { method: 'Design Projects', percentage: 70, description: 'Brand, print, and digital design work' },
    { method: 'Presentations', percentage: 15, description: 'Client pitch simulations' },
    { method: 'Theory', percentage: 15, description: 'Design history and principles' }
  ],

  facilities: [
    { name: 'Computer Lab', description: 'iMacs with Adobe Creative Cloud', imageUrl: '/images/facilities/computer-lab.jpg' },
    { name: 'Print Room', description: 'Professional printing equipment', imageUrl: '/images/facilities/print-room.jpg' }
  ],

  portfolioItems: [
    { title: 'Safaricom Rebrand Concept', student: 'Angela Kimani', imageUrl: '/images/portfolio/safaricom-rebrand.jpg' },
    { title: 'Kenya Airways Annual Report', student: 'Dennis Omondi', imageUrl: '/images/portfolio/kq-report.jpg' },
    { title: 'Tusker Malt Campaign', student: 'Class of 2024', imageUrl: '/images/portfolio/tusker-campaign.jpg' },
    { title: 'M-Shwari App UI Redesign', student: 'Patricia Wanjiru', imageUrl: '/images/portfolio/mshwari-ui.jpg' },
    { title: 'KECF Environmental Branding', student: 'James Kiprotich', imageUrl: '/images/portfolio/kecf-branding.jpg' },
    { title: 'Equity Bank Motion Graphics', student: 'Class of 2025', imageUrl: '/images/portfolio/equity-motion.jpg' }
  ],

  // Activity Photos - Masonry grid with varied aspect ratios
  activityPhotos: [
    { caption: 'Brand strategy workshop with Ogilvy Creative Director', imageUrl: '/images/activities/brand-workshop.jpg', aspectRatio: 'landscape' },
    { caption: 'Typography masterclass - designing with African fonts', imageUrl: '/images/activities/typography-class.jpg', aspectRatio: 'square' },
    { caption: 'Student presentations during bootcamp finals', imageUrl: '/images/activities/design-presentations.jpg', aspectRatio: 'portrait' },
    { caption: 'Agency visit to Scan Group offices', imageUrl: '/images/activities/agency-visit.jpg', aspectRatio: 'landscape' },
    { caption: 'Print production workshop - from screen to paper', imageUrl: '/images/activities/print-production.jpg', aspectRatio: 'square' }
  ],

  alumniStories: [
    {
      name: 'Dennis Omondi',
      role: 'Senior Brand Designer',
      company: 'Safaricom',
      story: 'I started as an intern, now I lead the brand team on major campaigns. My ADMI portfolio got me in the door, but the strategic thinking skills kept me here. Last year I worked on the M-PESA rebrand.',
      imageUrl: '/images/alumni/dennis-omondi.jpg',
      graduationYear: '2020'
    },
    {
      name: 'Patricia Wanjiru',
      role: 'UI/UX Designer',
      company: 'Andela',
      story: 'ADMI taught me design fundamentals that translate to any medium. When I pivoted to UI/UX, I was already ahead because I understood visual hierarchy, typography, and user psychology.',
      imageUrl: '/images/alumni/patricia-wanjiru.jpg',
      graduationYear: '2021'
    },
    {
      name: 'James Kiprotich',
      role: 'Art Director',
      company: 'Ogilvy Kenya',
      story: 'The internship program connected me with my future employer. I\'ve now worked on campaigns for Coca-Cola, Unilever, and Kenya Airways. The agency life is intense, but ADMI prepared me for it.',
      imageUrl: '/images/alumni/james-kiprotich.jpg',
      graduationYear: '2022'
    }
  ],

  industryPartners: [
    { name: 'Ogilvy Kenya', logoUrl: '/images/partners/ogilvy.png' },
    { name: 'Scanad', logoUrl: '/images/partners/scanad.png' },
    { name: 'Safaricom', logoUrl: '/images/partners/safaricom.png' },
    { name: 'Dentsu Kenya', logoUrl: '/images/partners/dentsu.png' },
    { name: 'DDB Kenya', logoUrl: '/images/partners/ddb.png' }
  ],

  industryTrends: [
    { stat: '25%', label: 'Annual Growth', description: 'African design industry expanding rapidly' },
    { stat: 'KES 120K', label: 'Senior Salary', description: 'Average monthly for experienced designers' },
    { stat: '50%', label: 'Go Freelance', description: 'ADMI grads successfully self-employed' }
  ],

  resources: [],

  // Diploma-specific
  hybridSteps: SHARED_HYBRID_STEPS,
  hybridTestimonial: {
    quote: 'The bootcamps were where magic happened. Working alongside classmates, getting feedback in real-time — that\'s what made me confident.',
    name: 'Angela Kimani',
    program: 'Graphic Design Diploma, Class of 2023'
  },
  diplomaExclusives: SHARED_DIPLOMA_EXCLUSIVES,
  internshipStats: SHARED_INTERNSHIP_STATS,
  internshipSteps: SHARED_INTERNSHIP_STEPS,
  internshipPartners: [
    { name: 'Ogilvy Kenya', industry: 'Advertising Agency' },
    { name: 'Scanad Kenya', industry: 'Advertising Agency' },
    { name: 'Safaricom', industry: 'Technology' },
    { name: 'Dentsu Kenya', industry: 'Marketing' }
  ],
  internshipStories: [
    {
      name: 'Dennis Omondi',
      role: 'Design Intern → Senior Designer',
      company: 'Safaricom',
      quote: 'Started as an intern during my 5th semester. They liked my work so much they offered me a job before graduation. Now I lead brand campaigns.',
      image: '/images/interns/dennis-omondi.jpg',
      graduationYear: '2020'
    },
    {
      name: 'Angela Kimani',
      role: 'Junior Designer',
      company: 'Ogilvy Kenya',
      quote: 'The real agency briefs during bootcamps prepared me for the fast pace. My internship supervisor said I was the most prepared intern they\'d had.',
      image: '/images/interns/angela-kimani.jpg',
      graduationYear: '2023'
    }
  ],
  industryQuotes: [
    {
      quote: 'ADMI grads understand brand thinking. They\'re not just pixel pushers — they\'re strategic thinkers who can defend their design decisions.',
      name: 'Peter Nganga',
      role: 'Creative Director',
      company: 'Ogilvy Kenya',
      image: '/images/industry/peter-nganga.jpg'
    },
    {
      quote: 'We\'ve hired 8 ADMI interns in the past 3 years. 6 are now full-time employees. The quality is consistent.',
      name: 'Mary Wambui',
      role: 'Head of Design',
      company: 'Safaricom',
      image: '/images/industry/mary-wambui.jpg'
    },
    {
      quote: 'Their students come in knowing how agencies work. They understand timelines, client feedback, and revisions. That\'s rare for graduates.',
      name: 'John Kimani',
      role: 'Managing Director',
      company: 'Scanad Kenya',
      image: '/images/industry/john-kimani.jpg'
    }
  ],
  hiringCompanies: [
    'Ogilvy Kenya',
    'Scanad Kenya',
    'Dentsu Kenya',
    'Safaricom',
    'Equity Bank',
    'KCB',
    'East Africa Breweries',
    'DDB Kenya',
    'Publicis Africa'
  ]
}

// ============ DIGITAL CONTENT CREATION DIPLOMA ============

export const digitalContentDiplomaData: DiplomaPageData = {
  quickFacts: [
    { label: 'Duration', value: '2 Years', icon: 'schedule' },
    { label: 'Award Level', value: 'Level 6 Diploma', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid', icon: 'group' },
    { label: 'Per Semester', value: 'KES 90,000', icon: 'payments' }
  ],

  courseLeader: {
    name: 'Njeri Wangari',
    role: 'Head of Digital Media',
    bio: 'Njeri is a digital native who has built audiences of millions across platforms. She brings creator and brand perspectives to help students understand both sides.',
    imageUrl: '/images/faculty/njeri-wangari.jpg',
    quote: 'Content is everywhere. We teach you to create content that matters and converts.'
  },

  industryQuote: {
    quote: 'The digital creators from ADMI understand platforms, analytics, and storytelling. They\'re not just creators — they\'re strategists.',
    author: 'Dan Aceda',
    role: 'Head of Content',
    company: 'Boomplay',
    backgroundImageUrl: '/images/industry/digital-bg.jpg'
  },

  benefits: [
    { title: 'Multi-Platform Training', description: 'Master YouTube, TikTok, Instagram, and podcasting in one program.', icon: '📱' },
    { title: 'Creator Economy Focus', description: 'Learn monetization: brand deals, affiliate marketing, memberships.', icon: '💰' },
    { title: 'Professional Equipment', description: 'Access cameras, lighting, audio gear, and editing software.', icon: '🎥' },
    { title: 'Analytics & Strategy', description: 'Understand algorithms, data, and growth hacking techniques.', icon: '📊' },
    { title: 'Brand Collaborations', description: 'Work on real briefs from brands during your studies.', icon: '🤝' },
    { title: 'Studio Access', description: 'Professional podcast and video studios for your content.', icon: '🎙️' }
  ],

  degreeSteps: [
    { step: 1, title: 'ADMI Diploma', description: '2 Years · TVETA Registered', duration: '2 Years' },
    { step: 2, title: 'Woolf Credits', description: 'EU-Accredited Transfer', duration: 'Transfer' },
    { step: 3, title: "Bachelor's Degree", description: 'Complete While Working', duration: '1 Year' }
  ],

  semesters: [
    { title: 'Semester 1: Content Foundations', modules: ['Storytelling 101', 'Video Production Basics', 'Photography', 'Writing for Digital', 'Platform Overview'] },
    { title: 'Semester 2: Video & Audio', modules: ['YouTube Strategy', 'Advanced Video Editing', 'Podcasting', 'TikTok/Reels', 'Audio Production'] },
    { title: 'Semester 3: Growth & Monetization', modules: ['Content Strategy', 'Analytics & Data', 'Monetization Models', 'Brand Partnerships', 'Community Building'] },
    { title: 'Semester 4: Professional Content', modules: ['Brand Campaigns', 'Advanced Storytelling', 'Portfolio Project', 'Career Prep', 'Industry Placement'] }
  ],

  paymentPlans: [
    { title: '1st Installment', price: 'KES 45,000', period: '50% at Registration', details: ['Secures your spot'], isPopular: true },
    { title: '2nd Installment', price: 'KES 27,000', period: '30% Mid-Semester', details: ['Continues enrollment'] },
    { title: '3rd Installment', price: 'KES 18,000', period: '20% Before Exams', details: ['Clears assessments'] }
  ],

  impactStats: [
    { value: '400+', label: 'Content Graduates' },
    { value: '92%', label: 'Self-Employed or Hired' },
    { value: '25+', label: 'Brand Partners' },
    { value: '500K+', label: 'Combined Followers' }
  ],

  testimonials: [
    {
      name: 'Michelle Anyango',
      role: 'Digital Content Graduate, 2023',
      quote: 'I grew my YouTube channel from 0 to 50K while studying. The strategies I learned actually work.',
      imageUrl: '/images/testimonials/michelle-anyango.jpg'
    }
  ],

  applicationSteps: [
    { step: 1, title: 'Apply Online', description: 'Submit your application form.' },
    { step: 2, title: 'Creative Review', description: 'Share any content you\'ve created (optional).' },
    { step: 3, title: 'Enroll', description: 'Pay deposit and join the cohort.' }
  ],

  faqs: [
    { question: 'Do I need existing followers to apply?', answer: 'No! We\'ll help you build your audience from scratch.' },
    { question: 'What platforms will I learn?', answer: 'YouTube, TikTok, Instagram, Twitter/X, Podcasting, and more.' },
    { question: 'Can I work on my own brand?', answer: 'Absolutely! Your personal brand is your capstone project.' }
  ],

  careers: [
    { title: 'Content Creator', description: 'Build and monetize your personal brand' },
    { title: 'Social Media Manager', description: 'Manage brand accounts and strategies' },
    { title: 'Video Producer', description: 'Create video content for brands' },
    { title: 'Podcast Host/Producer', description: 'Create and grow podcast shows' },
    { title: 'Digital Marketing Specialist', description: 'Execute content-led marketing campaigns' }
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'Woolf University / TVET CDACC' },
    { label: 'Level', value: 'Level 6 Diploma' },
    { label: 'Credits', value: '240 Credits' },
    { label: 'Duration', value: '2 Years (5 Semesters)' },
    { label: 'Campus', value: 'Nairobi CBD' }
  ],

  learningOutcomes: [
    'Create engaging content across platforms',
    'Develop and execute content strategies',
    'Analyze performance data and optimize',
    'Monetize audiences through multiple streams',
    'Manage brand partnerships professionally'
  ],

  // Mentors - Real ADMI faculty from Contentful
  mentors: [
    { name: 'Sam Mungai', role: 'Digital Marketing Lead', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/hA5UjOlauVQOjOH7HIwq2/718594a1e8bf6569e95204fe9c48ba76/image__93_.webp' },
    { name: 'Dorothy Lavuna', role: 'Digital Marketing Expert', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/2VZ5sQgHlwCBeZGiqcwIFI/1561216be72e137b1d54910d4829d6b2/image__92_.webp' },
    { name: 'Isaac Kamau', role: 'Photography & AV Production', company: 'ADMI Faculty', imageUrl: 'https://images.ctfassets.net/qtu3mga6n6gc/1iusV9kaioNmZJ4hdOZgaW/b18c39721683a5c77aad1db0bbd6dcd1/image__47_.webp' }
  ],

  assessmentMethods: [
    { method: 'Content Portfolio', percentage: 60, description: 'Published content across platforms' },
    { method: 'Growth Metrics', percentage: 20, description: 'Audience growth and engagement' },
    { method: 'Strategy Presentations', percentage: 20, description: 'Content plans and analysis' }
  ],

  facilities: [
    { name: 'Podcast Studio', description: 'Professional recording setup', imageUrl: '/images/facilities/podcast-studio.jpg' },
    { name: 'Video Studio', description: 'Green screen and lighting', imageUrl: '/images/facilities/video-studio.jpg' }
  ],

  portfolioItems: [
    { title: 'Explore Kenya Travel Series', student: 'Michelle Anyango', imageUrl: '/images/portfolio/travel-vlog.jpg' },
    { title: 'Tech Review Channel', student: 'Brian Mwendwa', imageUrl: '/images/portfolio/tech-reviews.jpg' },
    { title: 'The Finance Talk Podcast', student: 'Class of 2024', imageUrl: '/images/portfolio/finance-podcast.jpg' },
    { title: 'Nairobi Street Food Series', student: 'Grace Atieno', imageUrl: '/images/portfolio/street-food.jpg' },
    { title: 'Mental Health Awareness Campaign', student: 'David Mutua', imageUrl: '/images/portfolio/mental-health.jpg' },
    { title: 'Gengetone Documentary', student: 'Class of 2025', imageUrl: '/images/portfolio/gengetone-doc.jpg' }
  ],

  // Activity Photos - Masonry grid with varied aspect ratios
  activityPhotos: [
    { caption: 'YouTube strategy workshop with 500K+ subscriber creator', imageUrl: '/images/activities/youtube-workshop.jpg', aspectRatio: 'landscape' },
    { caption: 'Students filming TikTok content during bootcamp', imageUrl: '/images/activities/tiktok-filming.jpg', aspectRatio: 'portrait' },
    { caption: 'Podcast recording session in professional studio', imageUrl: '/images/activities/podcast-recording.jpg', aspectRatio: 'square' },
    { caption: 'Brand partnership pitch presentations', imageUrl: '/images/activities/brand-pitch.jpg', aspectRatio: 'landscape' },
    { caption: 'Analytics deep-dive with YouTube Certified trainer', imageUrl: '/images/activities/analytics-class.jpg', aspectRatio: 'square' }
  ],

  alumniStories: [
    {
      name: 'Brian Mwendwa',
      role: 'Content Creator & Influencer',
      company: 'Self-employed',
      story: 'I grew my channel from 0 to 150K subscribers while at ADMI. Now I earn more than my friends with corporate jobs, working from anywhere. Last month I landed a KES 500K brand deal with Safaricom.',
      imageUrl: '/images/alumni/brian-mwendwa.jpg',
      graduationYear: '2022'
    },
    {
      name: 'Michelle Anyango',
      role: 'Travel Content Creator',
      company: 'Self-employed',
      story: 'ADMI taught me to think like a business, not just a creator. I now make 6 figures monthly from YouTube ads, sponsorships, and affiliate marketing. Brands approach me now.',
      imageUrl: '/images/alumni/michelle-anyango.jpg',
      graduationYear: '2023'
    },
    {
      name: 'David Mutua',
      role: 'Social Media Manager',
      company: 'Safaricom',
      story: 'Not everyone wants to be an influencer. I used my content skills to land a corporate role. I manage Safaricom\'s social strategy, and my creator background gives me an edge others don\'t have.',
      imageUrl: '/images/alumni/david-mutua.jpg',
      graduationYear: '2024'
    }
  ],

  industryPartners: [
    { name: 'Boomplay', logoUrl: '/images/partners/boomplay.png' },
    { name: 'Safaricom', logoUrl: '/images/partners/safaricom.png' },
    { name: 'YouTube', logoUrl: '/images/partners/youtube.png' },
    { name: 'TikTok', logoUrl: '/images/partners/tiktok.png' },
    { name: 'Spotify', logoUrl: '/images/partners/spotify.png' }
  ],

  industryTrends: [
    { stat: '$250B', label: 'Creator Economy', description: 'Global creative economy - and growing 20% yearly' },
    { stat: '2M+', label: 'African Creators', description: 'Content creators across the continent' },
    { stat: 'KES 300K', label: 'Top Creator Income', description: 'What successful creators earn monthly in Kenya' }
  ],

  resources: [],

  // Diploma-specific
  hybridSteps: SHARED_HYBRID_STEPS,
  hybridTestimonial: {
    quote: 'I could create content from home during online weeks, then collaborate with classmates during bootcamps. Best of both worlds.',
    name: 'Michelle Anyango',
    program: 'Digital Content Creation Diploma, Class of 2023'
  },
  diplomaExclusives: SHARED_DIPLOMA_EXCLUSIVES,
  internshipStats: SHARED_INTERNSHIP_STATS,
  internshipSteps: SHARED_INTERNSHIP_STEPS,
  internshipPartners: [
    { name: 'Boomplay', industry: 'Digital Music & Entertainment' },
    { name: 'Safaricom', industry: 'Technology & Telecom' },
    { name: 'NTV Kenya', industry: 'Broadcast Media' },
    { name: 'Radio Africa Group', industry: 'Media & Entertainment' },
    { name: 'Jumia', industry: 'E-commerce' },
    { name: 'Standard Media', industry: 'Digital Publishing' }
  ],
  internshipStories: [
    {
      name: 'Brian Mwendwa',
      role: 'Content Producer',
      company: 'Boomplay',
      quote: 'My internship taught me how brands think about creators. Now when I pitch deals, I speak their language. That\'s why my conversion rate is so high.',
      image: '/images/interns/brian-mwendwa.jpg',
      graduationYear: '2022'
    },
    {
      name: 'Grace Atieno',
      role: 'Social Media Intern',
      company: 'Safaricom',
      quote: 'I managed real campaigns during my internship. The experience gave me confidence to freelance for other brands too. Now I have 5 retainer clients.',
      image: '/images/interns/grace-atieno.jpg',
      graduationYear: '2023'
    }
  ],
  industryQuotes: [
    {
      quote: 'ADMI content creators understand metrics. They don\'t just make videos — they make business cases. When they pitch us, they come with data.',
      name: 'Dan Aceda',
      role: 'Head of Content',
      company: 'Boomplay',
      image: '/images/industry/dan-aceda.jpg'
    },
    {
      quote: 'We\'ve worked with several ADMI graduates on campaigns. They understand both creator and brand perspectives, which makes collaboration smooth.',
      name: 'Joan Kwamboka',
      role: 'Digital Marketing Lead',
      company: 'Safaricom',
      image: '/images/industry/joan-kwamboka.jpg'
    },
    {
      quote: 'The content landscape in Kenya is evolving. ADMI graduates are at the forefront because they understand platforms, algorithms, and audience psychology.',
      name: 'Mark Kaigwa',
      role: 'CEO',
      company: 'Nendo',
      image: '/images/industry/mark-kaigwa.jpg'
    }
  ],
  hiringCompanies: [
    'Boomplay',
    'Safaricom',
    'NTV Kenya',
    'The Standard',
    'Radio Africa Group',
    'Tusker',
    'East Africa Breweries',
    'Kenya Airways',
    'Jumia',
    'Bolt',
    'Uber Kenya',
    'Glovo'
  ]
}

// ============ EXPORT ALL DIPLOMA DATA ============

export const diplomaCourseData: Record<string, DiplomaPageData> = {
  'film-and-television-production-diploma': filmProductionDiplomaData,
  'sound-engineering-diploma': soundEngineeringDiplomaData,
  'graphic-design-diploma': graphicDesignDiplomaData,
  'digital-content-creation-diploma': digitalContentDiplomaData
}

export function getDiplomaData(slug: string): DiplomaPageData | null {
  return diplomaCourseData[slug] || null
}
