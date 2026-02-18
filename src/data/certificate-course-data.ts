import type { CoursePageData } from './course-page-data'

// --- Extended type for certificate pages ---

export interface CertificatePageData extends CoursePageData {
  tagline: string
}

// =============================================================================
// 1. VIDEO PRODUCTION CERTIFICATE (Professional · 6 months · Pearson BTEC)
// =============================================================================

const videoProductionData: CertificatePageData = {
  tagline: 'Learn to shoot, edit, and deliver broadcast-ready video in six months.',

  quickFacts: [
    { label: 'Duration', value: '6 Months', icon: 'schedule' },
    { label: 'Award Level', value: 'Professional Certificate', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid (Online + Campus)', icon: 'group' },
    { label: 'Per Term', value: 'KES 55,000', icon: 'payments' },
  ],

  courseLeader: {
    name: 'Brian Muriuki',
    role: 'Lead Instructor, Video Production',
    bio: 'Brian is a veteran broadcast journalist and videographer with 12 years of experience across KTN, NTV, and corporate production houses. He specialises in documentary storytelling and commercial video.',
    imageUrl: '/placeholder/brian-muriuki.jpg',
    quote: 'Every frame you shoot should have intention. We train you to see stories everywhere and capture them professionally.',
  },

  industryQuote: {
    quote: 'The demand for skilled video creators across social media, broadcast, and corporate communications in Kenya has never been higher. Brands are spending more on video than any other format.',
    author: 'Njeri Mwangi',
    role: 'Creative Director',
    company: 'Scanad Kenya',
    backgroundImageUrl: '/placeholder/video-industry-bg.jpg',
  },

  benefits: [
    {
      title: 'Hands-On From Week One',
      description: 'Start shooting real projects immediately using professional cameras, lighting, and audio gear.',
      icon: '🎥',
    },
    {
      title: 'Pearson BTEC Certified',
      description: 'Graduate with an internationally recognised Pearson BTEC certificate that employers trust.',
      icon: '📜',
    },
    {
      title: 'Industry-Standard Software',
      description: 'Master Adobe Premiere Pro, DaVinci Resolve, and After Effects in a professional lab environment.',
      icon: '💻',
    },
    {
      title: 'Professional Showreel',
      description: 'Leave with a polished showreel of 5+ projects ready to share with clients and employers.',
      icon: '🎬',
    },
    {
      title: 'Flexible Hybrid Learning',
      description: 'Study theory online at your own pace, then attend intensive campus bootcamps for practical sessions.',
      icon: '🔄',
    },
    {
      title: 'Pathway to Diploma',
      description: 'Credits earned count towards the ADMI Diploma in Film & Television Production, saving you time and money.',
      icon: '🎓',
    },
  ],

  degreeSteps: [
    { step: 1, title: 'Professional Certificate', description: '6 Months · Pearson BTEC', duration: '6 Months' },
    { step: 2, title: 'ADMI Diploma', description: 'Fast-track entry with credits', duration: '18 Months' },
    { step: 3, title: "Bachelor's Degree", description: 'Via Woolf University pathway', duration: '1 Year' },
  ],

  semesters: [
    {
      title: 'Term 1: Production Fundamentals',
      modules: [
        'Camera Operations & DSLR Filmmaking',
        'Lighting for Video',
        'Audio Capture & Sound Recording',
        'Storytelling & Pre-Production Planning',
        'Introduction to Video Editing (Premiere Pro)',
      ],
    },
    {
      title: 'Term 2: Advanced Production & Post',
      modules: [
        'Advanced Editing & Colour Grading (DaVinci Resolve)',
        'Motion Graphics & Titles (After Effects)',
        'Corporate & Commercial Video Production',
        'Social Media Video Strategy',
        'Showreel & Portfolio Development',
      ],
    },
  ],

  paymentPlans: [
    {
      title: '1st Installment · 60%',
      price: 'KES 33,000',
      period: 'Due at Registration',
      details: ['Secures your spot and gives full access to equipment, studios, and online learning platform.'],
      isPopular: true,
    },
    {
      title: '2nd Installment · 40%',
      price: 'KES 22,000',
      period: 'Due Mid-Term',
      details: ['Completes your term fees. Must be settled before final assessments and certification.'],
    },
  ],

  impactStats: [
    { value: '82%', label: 'Employed Within 3 Months' },
    { value: '500+', label: 'Videos Produced by Students Annually' },
    { value: '3x', label: 'Growth in Video Content Demand (Kenya)' },
    { value: 'KES 65K', label: 'Average Starting Salary' },
  ],

  testimonials: [
    {
      name: 'Dennis Otieno',
      role: 'Video Production Certificate, 2025',
      quote: 'I came in knowing nothing about cameras. Six months later I was shooting corporate videos for a Westlands agency. The hands-on approach at ADMI made all the difference.',
      imageUrl: '/placeholder/dennis-otieno.jpg',
    },
    {
      name: 'Faith Wambui',
      role: 'Video Production Certificate, 2024',
      quote: 'The hybrid model worked perfectly for me. I could study the theory at home and then come in for the bootcamps where we actually got to use the equipment and work as a team.',
      imageUrl: '/placeholder/faith-wambui.jpg',
    },
    {
      name: 'Hassan Abdi',
      role: 'Video Production Certificate, 2025',
      quote: 'My showreel from ADMI got me freelance work before I even graduated. The faculty really push you to produce work at a professional standard.',
      imageUrl: '/placeholder/hassan-abdi.jpg',
    },
  ],

  applicationSteps: [
    {
      step: 1,
      title: 'Submit Your Application',
      description: 'Complete the online form and upload your ID or KCSE certificate. Takes under 5 minutes.',
    },
    {
      step: 2,
      title: 'Chat with Admissions',
      description: 'Our team will reach out for a brief conversation to understand your goals and answer questions.',
    },
    {
      step: 3,
      title: 'Secure Your Place',
      description: 'Pay the 1st installment (60%) to confirm your enrolment. Spaces are limited per intake.',
    },
  ],

  faqs: [
    {
      question: 'Do I need any prior video or filmmaking experience?',
      answer: 'No. This certificate is designed for complete beginners. We teach you everything from how to hold a camera to professional editing workflows.',
    },
    {
      question: 'What equipment will I use during the programme?',
      answer: 'You will work with DSLR and mirrorless cameras, professional lighting kits, lapel and boom microphones, and industry-standard editing software including Adobe Premiere Pro and DaVinci Resolve.',
    },
    {
      question: 'How does the hybrid delivery model work?',
      answer: 'You complete theoretical coursework online through our learning platform. Practical sessions are held during scheduled campus bootcamps at our Nairobi campus, typically 2-3 weekends per month.',
    },
    {
      question: 'Is the Pearson BTEC certificate recognised by employers?',
      answer: 'Yes. Pearson BTEC is one of the most widely recognised vocational qualifications globally. Employers in Kenya, across Africa, and internationally accept it as proof of professional competence.',
    },
    {
      question: 'Can I continue to a diploma after this certificate?',
      answer: 'Absolutely. Credits from this certificate transfer directly into the ADMI Diploma in Film & Television Production, allowing you to fast-track your studies.',
    },
    {
      question: 'What kind of work can I do after graduating?',
      answer: 'Graduates work as videographers, video editors, content creators, corporate video producers, and social media video specialists. Many also freelance for agencies and production houses.',
    },
  ],

  careers: [
    { title: 'Videographer', description: 'Shoot events, interviews, and branded content for agencies and corporates.', salary: 'KES 35,000 - 70,000/mo' },
    { title: 'Video Editor', description: 'Edit and colour-grade video content for broadcast, online, and social platforms.', salary: 'KES 40,000 - 90,000/mo' },
    { title: 'Content Creator', description: 'Produce and publish video content for brands, influencers, or your own channels.', salary: 'KES 30,000 - 80,000/mo' },
    { title: 'Corporate Video Producer', description: 'Create training, marketing, and internal communication videos for organisations.', salary: 'KES 50,000 - 120,000/mo' },
    { title: 'Social Media Video Specialist', description: 'Plan, shoot, and edit short-form video for TikTok, Instagram, and YouTube.', salary: 'KES 35,000 - 75,000/mo' },
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'Pearson BTEC' },
    { label: 'Level', value: 'Professional Certificate' },
    { label: 'Duration', value: '6 Months (2 Terms)' },
    { label: 'Intakes', value: 'January, May, September' },
  ],

  learningOutcomes: [
    'Operate DSLR/mirrorless cameras and professional lighting setups for a range of video formats.',
    'Plan and execute video productions from concept through to final delivery.',
    'Edit video professionally using Adobe Premiere Pro and DaVinci Resolve.',
    'Record and mix audio for dialogue, interviews, and ambient sound.',
    'Produce a professional showreel demonstrating technical and creative competence.',
  ],

  mentors: [
    { name: 'Brian Muriuki', role: 'Broadcast Journalist', company: 'ADMI Faculty', imageUrl: '/placeholder/brian-muriuki.jpg' },
    { name: 'Patience Musau', role: 'Documentary Filmmaker', company: 'ADMI Faculty', imageUrl: '/placeholder/patience-musau.jpg' },
    { name: 'Eric Gitonga', role: 'Commercial Director', company: 'Industry Partner', imageUrl: '/placeholder/eric-gitonga.jpg' },
    { name: 'Lucy Mwende', role: 'Colourist & Editor', company: 'Post-Production Specialist', imageUrl: '/placeholder/lucy-mwende.jpg' },
  ],

  assessmentMethods: [
    { method: 'Practical Projects', percentage: 60, description: 'Video shoots, edits, and final showreel produced individually and in teams.' },
    { method: 'Written Briefs', percentage: 15, description: 'Pre-production documents, shot lists, and production logs.' },
    { method: 'Peer Reviews', percentage: 15, description: 'Structured critiques of classmates\u2019 work with written feedback.' },
    { method: 'Attendance & Participation', percentage: 10, description: 'Active engagement in bootcamps, online discussions, and workshops.' },
  ],

  facilities: [
    { name: 'Video Studio', description: 'Green-screen equipped studio with professional lighting grid.', imageUrl: '/placeholder/video-studio.jpg' },
    { name: 'Edit Suites', description: 'iMac workstations loaded with Premiere Pro, DaVinci Resolve, and After Effects.', imageUrl: '/placeholder/edit-suites.jpg' },
    { name: 'Equipment Store', description: 'DSLR cameras, tripods, sliders, LED panels, and audio kits available for checkout.', imageUrl: '/placeholder/equip-store.jpg' },
    { name: 'Screening Room', description: 'Dedicated space for reviewing rushes, critiques, and showcasing final projects.', imageUrl: '/placeholder/screening-room.jpg' },
  ],

  portfolioItems: [
    { title: 'Nairobi Street Food', student: 'Dennis Otieno', imageUrl: '/placeholder/portfolio-video1.jpg', description: 'A 3-minute documentary exploring Nairobi\'s vibrant street food culture.' },
    { title: 'Brand Spotlight: Kazi Coffee', student: 'Faith Wambui', imageUrl: '/placeholder/portfolio-video2.jpg', description: 'Commercial video produced for a local artisan coffee brand.' },
    { title: 'Music Video: Sawa Sawa', student: 'Group Project', imageUrl: '/placeholder/portfolio-video3.jpg', description: 'Full music video produced for an emerging Kenyan artist.' },
  ],

  activityPhotos: [
    { caption: 'On-location shoot at Karura Forest', imageUrl: '/placeholder/video-activity1.jpg' },
    { caption: 'Lighting workshop in the studio', imageUrl: '/placeholder/video-activity2.jpg' },
    { caption: 'Editing session during bootcamp', imageUrl: '/placeholder/video-activity3.jpg' },
    { caption: 'Student screening night', imageUrl: '/placeholder/video-activity4.jpg' },
  ],

  alumniStories: [
    {
      name: 'Dennis Otieno',
      role: 'Videographer',
      company: 'Ogilvy Africa',
      story: 'The certificate gave me the confidence and showreel I needed to land my first agency job. I now shoot campaigns for some of the biggest brands in East Africa.',
      imageUrl: '/placeholder/dennis-otieno.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Faith Wambui',
      role: 'Freelance Video Editor',
      company: 'Self-Employed',
      story: 'Within three months of graduating I had a steady stream of freelance clients. The practical training at ADMI is what set me apart.',
      imageUrl: '/placeholder/faith-wambui.jpg',
      graduationYear: '2024',
    },
    {
      name: 'Hassan Abdi',
      role: 'Content Producer',
      company: 'Showmax',
      story: 'I started as an intern and got promoted to content producer within a year. ADMI taught me not just the technical skills but how to think like a storyteller.',
      imageUrl: '/placeholder/hassan-abdi.jpg',
      graduationYear: '2025',
    },
  ],

  industryPartners: [
    { name: 'Canon', logoUrl: '/placeholder/canon.png' },
    { name: 'Adobe', logoUrl: '/placeholder/adobe.png' },
    { name: 'Blackmagic Design', logoUrl: '/placeholder/blackmagic.png' },
    { name: 'Nation Media Group', logoUrl: '/placeholder/nmg.png' },
    { name: 'Scanad Kenya', logoUrl: '/placeholder/scanad.png' },
    { name: 'Showmax', logoUrl: '/placeholder/showmax.png' },
  ],

  industryTrends: [
    { stat: '85%', label: 'of Internet Traffic', description: 'Video accounts for the vast majority of global internet traffic, driving massive demand for creators.' },
    { stat: '3x', label: 'Growth in Branded Video', description: 'Kenyan brands have tripled their video marketing budgets over the past three years.' },
    { stat: '10K+', label: 'Content Creator Jobs', description: 'New video content roles are created annually across East Africa as digital platforms expand.' },
  ],

  resources: [
    { title: 'Beginner\'s Guide to Video Production', category: 'Guide', imageUrl: '/placeholder/blog-video1.jpg', link: '/blog/beginners-guide-video' },
    { title: '5 Affordable Camera Setups for New Creators', category: 'Gear', imageUrl: '/placeholder/blog-video2.jpg', link: '/blog/affordable-camera-setups' },
    { title: 'How to Build a Video Showreel That Gets You Hired', category: 'Career', imageUrl: '/placeholder/blog-video3.jpg', link: '/blog/showreel-tips' },
  ],
}

// =============================================================================
// 2. DIGITAL MARKETING CERTIFICATE (Professional · 3 months · Pearson BTEC)
// =============================================================================

const digitalMarketingData: CertificatePageData = {
  tagline: 'Master data-driven digital marketing and launch campaigns that convert.',

  quickFacts: [
    { label: 'Duration', value: '3 Months', icon: 'schedule' },
    { label: 'Award Level', value: 'Professional Certificate', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid (Online + Campus)', icon: 'group' },
    { label: 'Per Term', value: 'KES 45,000', icon: 'payments' },
  ],

  courseLeader: {
    name: 'Angela Mwikali',
    role: 'Lead Instructor, Digital Marketing',
    bio: 'Angela is a certified Google and Meta marketing professional with over 10 years of experience running digital campaigns for brands across East Africa. She previously led growth at a Nairobi-based fintech startup.',
    imageUrl: '/placeholder/angela-mwikali.jpg',
    quote: 'Digital marketing is not about following trends — it is about understanding people and using data to reach them at the right time.',
  },

  industryQuote: {
    quote: 'Every business in Kenya needs digital marketing talent. The gap between demand and supply of skilled marketers is one of the biggest opportunities for young professionals today.',
    author: 'Mark Kaigwa',
    role: 'CEO',
    company: 'Nendo',
    backgroundImageUrl: '/placeholder/marketing-industry-bg.jpg',
  },

  benefits: [
    {
      title: 'Google & Meta Certified Skills',
      description: 'Learn to run campaigns on the platforms that matter most, with preparation for official certification exams.',
      icon: '📊',
    },
    {
      title: 'Pearson BTEC Certified',
      description: 'Graduate with an internationally recognised professional certificate backed by Pearson.',
      icon: '📜',
    },
    {
      title: 'Real Campaign Experience',
      description: 'Plan, launch, and optimise a live digital campaign for a real business during the programme.',
      icon: '🚀',
    },
    {
      title: 'Data-Driven Approach',
      description: 'Master Google Analytics, social media insights, and A/B testing to make decisions backed by data.',
      icon: '📈',
    },
    {
      title: 'Flexible Hybrid Format',
      description: 'Complete coursework online and attend focused campus bootcamps for workshops and group projects.',
      icon: '🔄',
    },
    {
      title: 'High-Demand Career Path',
      description: 'Digital marketing is one of the fastest-growing career fields in Kenya with strong freelance and employment opportunities.',
      icon: '💼',
    },
  ],

  degreeSteps: [
    { step: 1, title: 'Professional Certificate', description: '3 Months · Pearson BTEC', duration: '3 Months' },
    { step: 2, title: 'ADMI Diploma', description: 'Fast-track with earned credits', duration: '18 Months' },
    { step: 3, title: "Bachelor's Degree", description: 'Via Woolf University pathway', duration: '1 Year' },
  ],

  semesters: [
    {
      title: 'Term 1: Digital Marketing Foundations & Execution',
      modules: [
        'Digital Marketing Strategy & Fundamentals',
        'Social Media Marketing (Meta, TikTok, LinkedIn)',
        'Google Ads & Search Engine Marketing',
        'Content Marketing & Copywriting',
        'Google Analytics & Campaign Measurement',
      ],
    },
  ],

  paymentPlans: [
    {
      title: '1st Installment · 60%',
      price: 'KES 27,000',
      period: 'Due at Registration',
      details: ['Secures your spot with access to all online coursework, tools, and campus bootcamp sessions.'],
      isPopular: true,
    },
    {
      title: '2nd Installment · 40%',
      price: 'KES 18,000',
      period: 'Due Mid-Term',
      details: ['Completes your term fees. Must be cleared before final project presentation and certification.'],
    },
  ],

  impactStats: [
    { value: '90%', label: 'Employed Within 3 Months' },
    { value: 'KES 55K', label: 'Average Starting Salary' },
    { value: '40%', label: 'Year-on-Year Growth in Digital Ad Spend (Kenya)' },
    { value: '200+', label: 'Hiring Partners in Digital' },
  ],

  testimonials: [
    {
      name: 'Winnie Chebet',
      role: 'Digital Marketing Certificate, 2025',
      quote: 'Before ADMI I was posting on social media with no strategy. Now I manage paid campaigns for three clients and earn more than I did at my office job.',
      imageUrl: '/placeholder/winnie-chebet.jpg',
    },
    {
      name: 'Kevin Mwangi',
      role: 'Digital Marketing Certificate, 2024',
      quote: 'The live campaign project was a game-changer. I got to work with a real business and the results we achieved became part of my portfolio.',
      imageUrl: '/placeholder/kevin-mwangi.jpg',
    },
    {
      name: 'Zainab Osman',
      role: 'Digital Marketing Certificate, 2025',
      quote: 'I loved the data analytics component. Learning to read Google Analytics and make decisions from real numbers gave me confidence that I actually know what I am doing.',
      imageUrl: '/placeholder/zainab-osman.jpg',
    },
  ],

  applicationSteps: [
    {
      step: 1,
      title: 'Submit Your Application',
      description: 'Complete the online form and upload your ID or KCSE certificate. Takes under 5 minutes.',
    },
    {
      step: 2,
      title: 'Chat with Admissions',
      description: 'Our team will reach out for a brief conversation to understand your goals and answer questions.',
    },
    {
      step: 3,
      title: 'Secure Your Place',
      description: 'Pay the 1st installment (60%) to confirm your enrolment. Spaces are limited per intake.',
    },
  ],

  faqs: [
    {
      question: 'Do I need a marketing background to enrol?',
      answer: 'No. This programme is designed for beginners. Whether you are a recent school leaver, a career changer, or a small business owner wanting to market your own products, we start from the fundamentals.',
    },
    {
      question: 'Will I get hands-on experience with real campaigns?',
      answer: 'Yes. A core part of the programme is planning, launching, and measuring a live digital campaign for a real business. This becomes a key piece of your portfolio.',
    },
    {
      question: 'Does this prepare me for Google or Meta certification?',
      answer: 'Yes. The curriculum covers the same competencies tested in the Google Ads certification and Meta Blueprint exams. Many students sit for these exams during or shortly after the programme.',
    },
    {
      question: 'How does the hybrid delivery work?',
      answer: 'Theoretical content and assignments are completed online through our learning platform. You attend campus bootcamps in Nairobi for workshops, group work, and presentations — typically 2-3 weekends per month.',
    },
    {
      question: 'What career opportunities are available after this certificate?',
      answer: 'Graduates work as social media managers, digital marketing executives, content strategists, paid ads specialists, and SEO analysts. Many also freelance or start their own digital marketing agencies.',
    },
    {
      question: 'Can I progress to a diploma after this certificate?',
      answer: 'Yes. Credits earned transfer into the ADMI diploma pathway. Speak to our admissions team for details on how your certificate maps to diploma modules.',
    },
  ],

  careers: [
    { title: 'Social Media Manager', description: 'Plan and execute social media strategies for brands across multiple platforms.', salary: 'KES 40,000 - 90,000/mo' },
    { title: 'Digital Marketing Executive', description: 'Run paid advertising, email marketing, and SEO campaigns for agencies or in-house teams.', salary: 'KES 45,000 - 100,000/mo' },
    { title: 'Content Strategist', description: 'Develop content calendars and strategies that drive engagement and conversions.', salary: 'KES 50,000 - 120,000/mo' },
    { title: 'SEO / SEM Specialist', description: 'Optimise websites and manage search advertising to drive organic and paid traffic.', salary: 'KES 40,000 - 95,000/mo' },
    { title: 'Freelance Digital Marketer', description: 'Offer marketing services to multiple clients independently, setting your own rates.', salary: 'KES 30,000 - 150,000/mo' },
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'Pearson BTEC' },
    { label: 'Level', value: 'Professional Certificate' },
    { label: 'Duration', value: '3 Months (1 Term)' },
    { label: 'Intakes', value: 'January, May, September' },
  ],

  learningOutcomes: [
    'Develop and execute a comprehensive digital marketing strategy aligned with business objectives.',
    'Create and manage paid advertising campaigns on Google, Meta, and TikTok platforms.',
    'Analyse campaign performance using Google Analytics and social media insights tools.',
    'Write compelling marketing copy for ads, emails, landing pages, and social media.',
    'Apply A/B testing and data-driven optimisation to improve campaign ROI.',
  ],

  mentors: [
    { name: 'Angela Mwikali', role: 'Digital Strategist', company: 'ADMI Faculty', imageUrl: '/placeholder/angela-mwikali.jpg' },
    { name: 'Tom Maina', role: 'Performance Marketer', company: 'WPP Scangroup', imageUrl: '/placeholder/tom-maina.jpg' },
    { name: 'Ciku Muiruri', role: 'Brand Consultant', company: 'Industry Partner', imageUrl: '/placeholder/ciku-muiruri.jpg' },
    { name: 'Samuel Karanja', role: 'SEO Specialist', company: 'Ringier One Africa Media', imageUrl: '/placeholder/samuel-karanja.jpg' },
  ],

  assessmentMethods: [
    { method: 'Live Campaign Project', percentage: 50, description: 'Plan, launch, and report on a real digital marketing campaign for an actual business.' },
    { method: 'Platform Assignments', percentage: 25, description: 'Hands-on tasks in Google Ads, Meta Business Suite, and analytics tools.' },
    { method: 'Strategy Presentations', percentage: 15, description: 'Present marketing strategies and campaign results to a panel of industry professionals.' },
    { method: 'Participation & Peer Review', percentage: 10, description: 'Engagement in workshops, online forums, and constructive critique of peers\u2019 work.' },
  ],

  facilities: [
    { name: 'Digital Marketing Lab', description: 'Workstations with access to Google Ads, Meta Business Suite, and analytics platforms.', imageUrl: '/placeholder/marketing-lab.jpg' },
    { name: 'Presentation Space', description: 'Professional space for pitching campaigns and presenting strategies.', imageUrl: '/placeholder/presentation-room.jpg' },
    { name: 'Content Studio', description: 'Mini studio for creating social media content, product photography, and short videos.', imageUrl: '/placeholder/content-studio.jpg' },
    { name: 'Co-Working Area', description: 'Collaborative workspace for group projects and study sessions.', imageUrl: '/placeholder/coworking.jpg' },
  ],

  portfolioItems: [
    { title: 'Mama Fua Go-to-Market Campaign', student: 'Winnie Chebet', imageUrl: '/placeholder/portfolio-mktg1.jpg', description: 'Full digital launch strategy for a local laundry startup, achieving 3x ROAS.' },
    { title: 'Safari Eats Social Media Overhaul', student: 'Kevin Mwangi', imageUrl: '/placeholder/portfolio-mktg2.jpg', description: 'Social media rebrand and content strategy that doubled engagement in 6 weeks.' },
    { title: 'Duka Smart SEO & Google Ads', student: 'Group Project', imageUrl: '/placeholder/portfolio-mktg3.jpg', description: 'Search engine optimisation and paid search campaign for an e-commerce client.' },
  ],

  activityPhotos: [
    { caption: 'Google Analytics workshop', imageUrl: '/placeholder/mktg-activity1.jpg' },
    { caption: 'Campaign pitch presentations', imageUrl: '/placeholder/mktg-activity2.jpg' },
    { caption: 'Content creation bootcamp', imageUrl: '/placeholder/mktg-activity3.jpg' },
    { caption: 'Guest lecture from industry', imageUrl: '/placeholder/mktg-activity4.jpg' },
  ],

  alumniStories: [
    {
      name: 'Winnie Chebet',
      role: 'Digital Marketing Manager',
      company: 'Jumia Kenya',
      story: 'The certificate gave me practical skills that textbooks cannot teach. Within two months of graduating I landed a role managing campaigns for one of the largest e-commerce platforms in Africa.',
      imageUrl: '/placeholder/winnie-chebet.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Kevin Mwangi',
      role: 'Freelance Marketing Consultant',
      company: 'Self-Employed',
      story: 'I now manage digital marketing for five SME clients. The live campaign project gave me the confidence and portfolio to go independent straight away.',
      imageUrl: '/placeholder/kevin-mwangi.jpg',
      graduationYear: '2024',
    },
    {
      name: 'Zainab Osman',
      role: 'Social Media Lead',
      company: 'Safaricom',
      story: 'What I learned at ADMI in three months was more practical than what many people learn in a three-year university degree. The industry connections alone were worth the investment.',
      imageUrl: '/placeholder/zainab-osman.jpg',
      graduationYear: '2025',
    },
  ],

  industryPartners: [
    { name: 'Google', logoUrl: '/placeholder/google.png' },
    { name: 'Meta', logoUrl: '/placeholder/meta.png' },
    { name: 'Safaricom', logoUrl: '/placeholder/safaricom.png' },
    { name: 'Jumia', logoUrl: '/placeholder/jumia.png' },
    { name: 'WPP Scangroup', logoUrl: '/placeholder/wpp.png' },
    { name: 'Nendo', logoUrl: '/placeholder/nendo.png' },
    { name: 'Ringier One Africa Media', logoUrl: '/placeholder/roam.png' },
  ],

  industryTrends: [
    { stat: 'KES 28B', label: 'Digital Ad Spend in Kenya', description: 'Kenya\'s digital advertising market continues to grow as businesses shift budgets from traditional to digital channels.' },
    { stat: '40%', label: 'Year-on-Year Growth', description: 'Digital marketing spend in East Africa is growing at roughly 40% annually, outpacing all other marketing channels.' },
    { stat: '15K+', label: 'Open Digital Marketing Roles', description: 'Thousands of digital marketing positions go unfilled each year in Kenya due to a skills gap.' },
  ],

  resources: [
    { title: 'Digital Marketing Careers in Kenya: A Complete Guide', category: 'Career', imageUrl: '/placeholder/blog-mktg1.jpg', link: '/blog/digital-marketing-careers-kenya' },
    { title: 'Google Ads vs Social Media Ads: Where to Start', category: 'Guide', imageUrl: '/placeholder/blog-mktg2.jpg', link: '/blog/google-vs-social-ads' },
    { title: 'How to Measure ROI on Your First Campaign', category: 'Tutorial', imageUrl: '/placeholder/blog-mktg3.jpg', link: '/blog/measure-campaign-roi' },
  ],
}

// =============================================================================
// 3. GRAPHIC DESIGN CERTIFICATE (Professional · 4 months · Pearson BTEC)
// =============================================================================

const graphicDesignData: CertificatePageData = {
  tagline: 'Build a design portfolio and master the tools used by agencies worldwide.',

  quickFacts: [
    { label: 'Duration', value: '4 Months', icon: 'schedule' },
    { label: 'Award Level', value: 'Professional Certificate', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid (Online + Campus)', icon: 'group' },
    { label: 'Per Term', value: 'KES 50,000', icon: 'payments' },
  ],

  courseLeader: {
    name: 'Stella Nduta',
    role: 'Lead Instructor, Graphic Design',
    bio: 'Stella is a brand identity specialist and graphic designer with over 14 years of experience. She has created visual identities for major Kenyan brands and teaches design thinking alongside technical skills.',
    imageUrl: '/placeholder/stella-nduta.jpg',
    quote: 'Good design solves problems. We train you to think strategically and execute beautifully.',
  },

  industryQuote: {
    quote: 'Kenyan businesses are investing more in brand identity and design than ever before. The demand for designers who can think conceptually and deliver polished work is very high.',
    author: 'Jimmy Gitonga',
    role: 'Creative Director',
    company: 'Africa\u2019s Talking',
    backgroundImageUrl: '/placeholder/design-industry-bg.jpg',
  },

  benefits: [
    {
      title: 'Adobe Creative Suite Mastery',
      description: 'Become proficient in Photoshop, Illustrator, and InDesign — the industry standard tools for print and digital design.',
      icon: '🎨',
    },
    {
      title: 'Pearson BTEC Certified',
      description: 'Graduate with an internationally recognised Pearson BTEC certificate that proves your professional competence.',
      icon: '📜',
    },
    {
      title: 'Real Client Projects',
      description: 'Work on briefs from actual businesses during the programme, building portfolio pieces with real-world impact.',
      icon: '💼',
    },
    {
      title: 'Design Thinking Foundation',
      description: 'Learn to approach every project with research, strategy, and user-centred thinking — not just aesthetics.',
      icon: '🧠',
    },
    {
      title: 'Portfolio-Ready Graduation',
      description: 'Leave with 8+ polished portfolio pieces covering branding, print, digital, and packaging design.',
      icon: '🎯',
    },
    {
      title: 'Career-Connected Learning',
      description: 'Guest lectures, agency visits, and mentorship from working designers keep you plugged into the industry.',
      icon: '🤝',
    },
  ],

  degreeSteps: [
    { step: 1, title: 'Professional Certificate', description: '4 Months · Pearson BTEC', duration: '4 Months' },
    { step: 2, title: 'ADMI Diploma', description: 'Fast-track with earned credits', duration: '18 Months' },
    { step: 3, title: "Bachelor's Degree", description: 'Via Woolf University pathway', duration: '1 Year' },
  ],

  semesters: [
    {
      title: 'Term 1: Design Fundamentals',
      modules: [
        'Principles of Visual Design & Colour Theory',
        'Typography & Layout Design',
        'Adobe Photoshop for Designers',
        'Adobe Illustrator for Vector Graphics',
        'Brand Identity & Logo Design',
      ],
    },
    {
      title: 'Term 2: Applied Design & Portfolio',
      modules: [
        'Adobe InDesign for Print & Publishing',
        'Digital Design for Web & Social Media',
        'Packaging & Environmental Design',
        'Client Brief & Real-World Project',
        'Portfolio Development & Presentation',
      ],
    },
  ],

  paymentPlans: [
    {
      title: '1st Installment · 60%',
      price: 'KES 30,000',
      period: 'Due at Registration',
      details: ['Secures your place with full access to design labs, software licences, and online learning platform.'],
      isPopular: true,
    },
    {
      title: '2nd Installment · 40%',
      price: 'KES 20,000',
      period: 'Due Mid-Term',
      details: ['Completes your term fees. Must be settled before portfolio reviews and certification.'],
    },
  ],

  impactStats: [
    { value: '88%', label: 'Employed Within 3 Months' },
    { value: '8+', label: 'Portfolio Pieces at Graduation' },
    { value: 'KES 50K', label: 'Average Starting Salary' },
    { value: '300+', label: 'Design Industry Partners' },
  ],

  testimonials: [
    {
      name: 'Joy Akinyi',
      role: 'Graphic Design Certificate, 2025',
      quote: 'I had been self-teaching Photoshop for years but had no real direction. ADMI gave me the structure, the design thinking foundation, and the portfolio that actually got me hired.',
      imageUrl: '/placeholder/joy-akinyi.jpg',
    },
    {
      name: 'Peter Kamau',
      role: 'Graphic Design Certificate, 2024',
      quote: 'Working on a real client brief during the programme was the best preparation. When I walked into my first job interview I already had work that mattered in my portfolio.',
      imageUrl: '/placeholder/peter-kamau.jpg',
    },
    {
      name: 'Halima Abdirahman',
      role: 'Graphic Design Certificate, 2025',
      quote: 'The bootcamp sessions were intense but brilliant. Being in the lab with other creatives, getting feedback from industry mentors — that is where the real learning happened.',
      imageUrl: '/placeholder/halima-abdirahman.jpg',
    },
  ],

  applicationSteps: [
    {
      step: 1,
      title: 'Submit Your Application',
      description: 'Complete the online form and upload your ID or KCSE certificate. Takes under 5 minutes.',
    },
    {
      step: 2,
      title: 'Chat with Admissions',
      description: 'Our team will reach out for a brief conversation to understand your goals and answer questions.',
    },
    {
      step: 3,
      title: 'Secure Your Place',
      description: 'Pay the 1st installment (60%) to confirm your enrolment. Spaces are limited per intake.',
    },
  ],

  faqs: [
    {
      question: 'Do I need to know how to draw or have design experience?',
      answer: 'No. This programme starts from the basics. While creative curiosity helps, we teach you the principles, tools, and techniques from scratch. Many successful graduates came in with zero design experience.',
    },
    {
      question: 'What software will I learn?',
      answer: 'You will gain proficiency in the Adobe Creative Suite — specifically Photoshop, Illustrator, and InDesign. These are the industry-standard tools used by design agencies worldwide.',
    },
    {
      question: 'Will I work on real projects or just hypothetical briefs?',
      answer: 'Both. Early modules use structured briefs to build your skills. In the second term, you work on a real client project sourced from our industry network, giving you genuine portfolio material.',
    },
    {
      question: 'Is the Pearson BTEC certificate recognised by employers?',
      answer: 'Yes. Pearson BTEC is one of the most widely recognised vocational qualifications globally. Employers across Kenya, Africa, and internationally accept it as proof of professional competence.',
    },
    {
      question: 'Can I freelance after completing this certificate?',
      answer: 'Absolutely. Many graduates start freelancing immediately, offering services like logo design, social media graphics, and print collateral. The portfolio you build during the programme serves as your calling card.',
    },
    {
      question: 'How does this certificate connect to the ADMI diploma?',
      answer: 'Credits earned in this certificate transfer directly into the ADMI Diploma pathway, allowing you to continue your studies with advanced standing.',
    },
  ],

  careers: [
    { title: 'Graphic Designer', description: 'Create visual concepts for print, digital, and packaging across agencies and in-house teams.', salary: 'KES 35,000 - 80,000/mo' },
    { title: 'Brand Identity Designer', description: 'Develop logos, brand guidelines, and visual identity systems for businesses.', salary: 'KES 45,000 - 100,000/mo' },
    { title: 'UI/Visual Designer', description: 'Design user interfaces for websites and mobile applications.', salary: 'KES 50,000 - 120,000/mo' },
    { title: 'Print & Packaging Designer', description: 'Design marketing collateral, packaging, and publication layouts.', salary: 'KES 35,000 - 75,000/mo' },
    { title: 'Freelance Designer', description: 'Offer design services independently to multiple clients and agencies.', salary: 'KES 30,000 - 150,000/mo' },
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'Pearson BTEC' },
    { label: 'Level', value: 'Professional Certificate' },
    { label: 'Duration', value: '4 Months (2 Terms)' },
    { label: 'Intakes', value: 'January, May, September' },
  ],

  learningOutcomes: [
    'Apply core design principles including typography, colour theory, layout, and visual hierarchy.',
    'Create professional designs using Adobe Photoshop, Illustrator, and InDesign.',
    'Develop brand identity systems including logos, colour palettes, and brand guidelines.',
    'Produce design work for print, digital, packaging, and social media channels.',
    'Present and defend design decisions to clients and stakeholders using design thinking methodology.',
  ],

  mentors: [
    { name: 'Stella Nduta', role: 'Brand Designer', company: 'ADMI Faculty', imageUrl: '/placeholder/stella-nduta.jpg' },
    { name: 'Oscar Mwalo', role: 'Art Director', company: 'Ogilvy Africa', imageUrl: '/placeholder/oscar-mwalo.jpg' },
    { name: 'Nyambura Wainaina', role: 'UI Designer', company: 'Safaricom', imageUrl: '/placeholder/nyambura-wainaina.jpg' },
    { name: 'Ahmed Ibrahim', role: 'Packaging Designer', company: 'Industry Partner', imageUrl: '/placeholder/ahmed-ibrahim.jpg' },
  ],

  assessmentMethods: [
    { method: 'Design Projects', percentage: 55, description: 'Branding, print, digital, and packaging design projects completed throughout the programme.' },
    { method: 'Client Brief', percentage: 25, description: 'A real-world client project executed from brief to final delivery in the second term.' },
    { method: 'Portfolio Presentation', percentage: 10, description: 'Final portfolio review and presentation to a panel of industry professionals.' },
    { method: 'Participation & Critiques', percentage: 10, description: 'Active engagement in bootcamps, design critiques, and peer feedback sessions.' },
  ],

  facilities: [
    { name: 'Design Lab', description: 'iMac workstations with Adobe Creative Cloud, Figma, and calibrated displays.', imageUrl: '/placeholder/design-lab.jpg' },
    { name: 'Print Workshop', description: 'Access to large-format printers and finishing equipment for physical mockups.', imageUrl: '/placeholder/print-workshop.jpg' },
    { name: 'Resource Library', description: 'Design books, magazines, and material samples for research and inspiration.', imageUrl: '/placeholder/resource-library.jpg' },
    { name: 'Critique Space', description: 'Dedicated wall space for pinning up work and conducting structured design reviews.', imageUrl: '/placeholder/critique-space.jpg' },
  ],

  portfolioItems: [
    { title: 'Chai Republic Brand Identity', student: 'Joy Akinyi', imageUrl: '/placeholder/portfolio-design1.jpg', description: 'Complete brand identity for a Kenyan tea brand including logo, packaging, and guidelines.' },
    { title: 'Nairobi Jazz Festival Poster Series', student: 'Peter Kamau', imageUrl: '/placeholder/portfolio-design2.jpg', description: 'Series of event posters blending African patterns with modern typography.' },
    { title: 'Green Basket App UI', student: 'Halima Abdirahman', imageUrl: '/placeholder/portfolio-design3.jpg', description: 'Mobile app interface design for a farm-to-table delivery service.' },
  ],

  activityPhotos: [
    { caption: 'Typography workshop', imageUrl: '/placeholder/design-activity1.jpg' },
    { caption: 'Client brief presentation day', imageUrl: '/placeholder/design-activity2.jpg' },
    { caption: 'Portfolio review session', imageUrl: '/placeholder/design-activity3.jpg' },
    { caption: 'Agency visit to Ogilvy', imageUrl: '/placeholder/design-activity4.jpg' },
  ],

  alumniStories: [
    {
      name: 'Joy Akinyi',
      role: 'Junior Designer',
      company: 'Viva Africa Consulting',
      story: 'The client project in Term 2 was pivotal. I designed a full brand identity that I still use as the centrepiece of my portfolio. It is what got me my first design job.',
      imageUrl: '/placeholder/joy-akinyi.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Peter Kamau',
      role: 'Freelance Graphic Designer',
      company: 'Self-Employed',
      story: 'I went from doing basic Canva work to producing agency-quality designs. The difference was learning proper design principles and mastering the Adobe tools.',
      imageUrl: '/placeholder/peter-kamau.jpg',
      graduationYear: '2024',
    },
    {
      name: 'Halima Abdirahman',
      role: 'Brand Designer',
      company: 'Africa\u2019s Talking',
      story: 'ADMI connected me with my current employer through a guest lecture. The mentor relationship turned into a job offer before I even finished the programme.',
      imageUrl: '/placeholder/halima-abdirahman.jpg',
      graduationYear: '2025',
    },
  ],

  industryPartners: [
    { name: 'Adobe', logoUrl: '/placeholder/adobe.png' },
    { name: 'Ogilvy Africa', logoUrl: '/placeholder/ogilvy.png' },
    { name: 'Africa\u2019s Talking', logoUrl: '/placeholder/africastalking.png' },
    { name: 'Safaricom', logoUrl: '/placeholder/safaricom.png' },
    { name: 'Viva Africa Consulting', logoUrl: '/placeholder/viva.png' },
    { name: 'Dentsu', logoUrl: '/placeholder/dentsu.png' },
  ],

  industryTrends: [
    { stat: 'KES 12B', label: 'Design Industry Value (Kenya)', description: 'Kenya\'s design and branding industry is valued in the billions as businesses invest in visual identity.' },
    { stat: '35%', label: 'Growth in Freelance Design', description: 'Freelance design opportunities are growing rapidly as SMEs and startups outsource creative work.' },
    { stat: '5K+', label: 'Open Design Roles Annually', description: 'Thousands of graphic design and UI roles go unfilled in Kenya each year due to a shortage of skilled talent.' },
  ],

  resources: [
    { title: 'How to Build a Design Portfolio That Gets You Hired', category: 'Career', imageUrl: '/placeholder/blog-design1.jpg', link: '/blog/design-portfolio-tips' },
    { title: 'Adobe Illustrator vs Photoshop: When to Use Which', category: 'Guide', imageUrl: '/placeholder/blog-design2.jpg', link: '/blog/illustrator-vs-photoshop' },
    { title: 'Graphic Design Salary Guide: Kenya 2026', category: 'Career', imageUrl: '/placeholder/blog-design3.jpg', link: '/blog/design-salary-guide-kenya' },
  ],
}

// =============================================================================
// 4. DATA ANALYTICS & VISUALISATION (Professional · 4 months · Pearson BTEC)
// =============================================================================

const dataAnalyticsData: CertificatePageData = {
  tagline: 'Turn raw data into clear insights and compelling visual stories.',

  quickFacts: [
    { label: 'Duration', value: '4 Months', icon: 'schedule' },
    { label: 'Award Level', value: 'Professional Certificate', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid (Online + Campus)', icon: 'group' },
    { label: 'Per Term', value: 'KES 50,000', icon: 'payments' },
  ],

  courseLeader: {
    name: 'Dr. Patrick Njoroge',
    role: 'Lead Instructor, Data Analytics',
    bio: 'Patrick holds a PhD in Statistics from the University of Nairobi and spent eight years as a data scientist at Safaricom before joining ADMI. He is passionate about making data skills accessible to creative professionals.',
    imageUrl: '/placeholder/patrick-njoroge.jpg',
    quote: 'Data literacy is the new superpower. Whether you are in marketing, film, or design, the ability to read and communicate data sets you apart.',
  },

  industryQuote: {
    quote: 'The organisations that win in Africa are the ones that can turn their data into action. We need more professionals who can bridge the gap between raw numbers and strategic decisions.',
    author: 'Juliana Rotich',
    role: 'Co-Founder',
    company: 'BRCK',
    backgroundImageUrl: '/placeholder/data-industry-bg.jpg',
  },

  benefits: [
    {
      title: 'Python & SQL Foundations',
      description: 'Learn the two most in-demand data languages from scratch, with no prior coding experience required.',
      icon: '🐍',
    },
    {
      title: 'Pearson BTEC Certified',
      description: 'Graduate with an internationally recognised Pearson BTEC certificate valued by employers globally.',
      icon: '📜',
    },
    {
      title: 'Tableau & Power BI',
      description: 'Master the leading data visualisation tools used by analysts at top companies worldwide.',
      icon: '📊',
    },
    {
      title: 'Real-World Datasets',
      description: 'Work with genuine datasets from Kenyan industries including finance, health, agriculture, and media.',
      icon: '🗃️',
    },
    {
      title: 'Capstone Dashboard Project',
      description: 'Build an interactive dashboard for a real organisation as your final project — a portfolio centrepiece.',
      icon: '🎯',
    },
    {
      title: 'Cross-Industry Demand',
      description: 'Data skills are needed in every sector. This certificate opens doors across tech, finance, media, NGOs, and government.',
      icon: '🌐',
    },
  ],

  degreeSteps: [
    { step: 1, title: 'Professional Certificate', description: '4 Months · Pearson BTEC', duration: '4 Months' },
    { step: 2, title: 'ADMI Diploma', description: 'Fast-track with earned credits', duration: '18 Months' },
    { step: 3, title: "Bachelor's Degree", description: 'Via Woolf University pathway', duration: '1 Year' },
  ],

  semesters: [
    {
      title: 'Term 1: Data Fundamentals & Analysis',
      modules: [
        'Introduction to Data Analytics & the Data Lifecycle',
        'Excel & Google Sheets for Data Analysis',
        'SQL for Data Querying & Management',
        'Introduction to Python for Data',
        'Statistics & Exploratory Data Analysis',
      ],
    },
    {
      title: 'Term 2: Visualisation & Capstone',
      modules: [
        'Data Visualisation with Tableau',
        'Power BI Dashboards & Reporting',
        'Data Storytelling & Presentation',
        'Capstone Project: Interactive Dashboard for a Real Client',
      ],
    },
  ],

  paymentPlans: [
    {
      title: '1st Installment · 60%',
      price: 'KES 30,000',
      period: 'Due at Registration',
      details: ['Secures your place with access to all online materials, software licences, and campus bootcamp sessions.'],
      isPopular: true,
    },
    {
      title: '2nd Installment · 40%',
      price: 'KES 20,000',
      period: 'Due Mid-Term',
      details: ['Completes your term fees. Must be settled before capstone presentation and certification.'],
    },
  ],

  impactStats: [
    { value: '92%', label: 'Employed Within 3 Months' },
    { value: 'KES 70K', label: 'Average Starting Salary' },
    { value: '60%', label: 'Growth in Data Roles (Kenya, 2023-2025)' },
    { value: '150+', label: 'Hiring Partners in Data & Tech' },
  ],

  testimonials: [
    {
      name: 'Sylvia Njeri',
      role: 'Data Analytics Certificate, 2025',
      quote: 'I was working in customer service and wanted to switch careers. This programme taught me Python and Tableau in four months, and now I work as a junior data analyst at a fintech company.',
      imageUrl: '/placeholder/sylvia-njeri.jpg',
    },
    {
      name: 'Moses Kipchoge',
      role: 'Data Analytics Certificate, 2025',
      quote: 'The capstone project sealed it for me. I built a dashboard for an agricultural NGO that they actually adopted. That project alone was worth more than the entire tuition.',
      imageUrl: '/placeholder/moses-kipchoge.jpg',
    },
    {
      name: 'Aisha Mohammed',
      role: 'Data Analytics Certificate, 2024',
      quote: 'Coming from a non-technical background, I was nervous about coding. The instructors broke everything down so clearly that I was writing SQL queries confidently within two weeks.',
      imageUrl: '/placeholder/aisha-mohammed.jpg',
    },
  ],

  applicationSteps: [
    {
      step: 1,
      title: 'Submit Your Application',
      description: 'Complete the online form and upload your ID or KCSE certificate. Takes under 5 minutes.',
    },
    {
      step: 2,
      title: 'Chat with Admissions',
      description: 'Our team will reach out for a brief conversation to understand your goals and answer questions.',
    },
    {
      step: 3,
      title: 'Secure Your Place',
      description: 'Pay the 1st installment (60%) to confirm your enrolment. Spaces are limited per intake.',
    },
  ],

  faqs: [
    {
      question: 'Do I need a maths or tech background to enrol?',
      answer: 'No. This programme is designed for beginners from any background. We teach all the maths, coding, and tools you need from scratch. The most important thing is curiosity and willingness to learn.',
    },
    {
      question: 'What programming languages will I learn?',
      answer: 'You will learn Python (for data analysis and manipulation) and SQL (for querying databases). Both are taught from the very basics with no prior experience required.',
    },
    {
      question: 'What tools and software are covered?',
      answer: 'The programme covers Excel, Google Sheets, Python (pandas, matplotlib), SQL, Tableau, and Power BI. You will gain hands-on proficiency with all of these tools.',
    },
    {
      question: 'Is data analytics relevant to creative industries?',
      answer: 'Absolutely. Media companies, marketing agencies, entertainment platforms, and design studios all rely on data. Understanding analytics makes you far more valuable in any creative role.',
    },
    {
      question: 'What is the capstone project?',
      answer: 'In your final term, you build an interactive dashboard for a real organisation using genuine data. This project demonstrates your skills to employers and becomes the centrepiece of your portfolio.',
    },
    {
      question: 'Can I transition from this certificate into a data science career?',
      answer: 'Yes. This certificate provides the foundation for data science. Many graduates continue to the ADMI diploma or self-study machine learning while working as data analysts.',
    },
  ],

  careers: [
    { title: 'Data Analyst', description: 'Analyse datasets, identify trends, and produce reports that inform business decisions.', salary: 'KES 50,000 - 120,000/mo' },
    { title: 'Business Intelligence Analyst', description: 'Build dashboards and visualisations that help leadership teams monitor KPIs.', salary: 'KES 60,000 - 150,000/mo' },
    { title: 'Marketing Analyst', description: 'Measure campaign performance, customer behaviour, and ROI using data tools.', salary: 'KES 45,000 - 100,000/mo' },
    { title: 'Data Visualisation Specialist', description: 'Design clear, compelling charts, dashboards, and infographics that tell data stories.', salary: 'KES 50,000 - 110,000/mo' },
    { title: 'Research Analyst', description: 'Conduct quantitative research and analysis for NGOs, consultancies, and government agencies.', salary: 'KES 45,000 - 100,000/mo' },
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'Pearson BTEC' },
    { label: 'Level', value: 'Professional Certificate' },
    { label: 'Duration', value: '4 Months (2 Terms)' },
    { label: 'Intakes', value: 'January, May, September' },
  ],

  learningOutcomes: [
    'Clean, manipulate, and analyse structured datasets using Python (pandas) and SQL.',
    'Build interactive dashboards and visualisations in Tableau and Power BI.',
    'Apply descriptive statistics and exploratory data analysis to real-world problems.',
    'Communicate data insights effectively through visual storytelling and presentations.',
    'Manage a complete data analytics project from data collection to stakeholder delivery.',
  ],

  mentors: [
    { name: 'Dr. Patrick Njoroge', role: 'Data Scientist', company: 'ADMI Faculty', imageUrl: '/placeholder/patrick-njoroge.jpg' },
    { name: 'Mercy Wanjiku', role: 'BI Analyst', company: 'Safaricom', imageUrl: '/placeholder/mercy-wanjiku.jpg' },
    { name: 'Daniel Odhiambo', role: 'Data Engineer', company: 'Andela', imageUrl: '/placeholder/daniel-odhiambo.jpg' },
    { name: 'Ruth Muthoni', role: 'Analytics Manager', company: 'Equity Bank', imageUrl: '/placeholder/ruth-muthoni.jpg' },
  ],

  assessmentMethods: [
    { method: 'Capstone Dashboard Project', percentage: 40, description: 'Build an interactive dashboard for a real organisation using genuine data.' },
    { method: 'Technical Assignments', percentage: 30, description: 'Hands-on exercises in Python, SQL, Tableau, and Power BI completed throughout the programme.' },
    { method: 'Data Presentation', percentage: 20, description: 'Present data insights and recommendations to a panel simulating a business stakeholder meeting.' },
    { method: 'Participation & Peer Review', percentage: 10, description: 'Active engagement in workshops, code reviews, and constructive feedback on classmates\u2019 work.' },
  ],

  facilities: [
    { name: 'Data Lab', description: 'Workstations pre-loaded with Python, Tableau, Power BI, and SQL environments.', imageUrl: '/placeholder/data-lab.jpg' },
    { name: 'Presentation Suite', description: 'Professional space for practising and delivering data presentations.', imageUrl: '/placeholder/data-presentation.jpg' },
    { name: 'Collaboration Zone', description: 'Open workspace for group projects, pair programming, and study sessions.', imageUrl: '/placeholder/collab-zone.jpg' },
    { name: 'Online Learning Platform', description: '24/7 access to course materials, video tutorials, datasets, and discussion forums.', imageUrl: '/placeholder/online-platform.jpg' },
  ],

  portfolioItems: [
    { title: 'Kenya Health Indicators Dashboard', student: 'Sylvia Njeri', imageUrl: '/placeholder/portfolio-data1.jpg', description: 'Interactive Tableau dashboard visualising county-level health data from the Kenya Demographic Health Survey.' },
    { title: 'M-Pesa Transaction Analysis', student: 'Moses Kipchoge', imageUrl: '/placeholder/portfolio-data2.jpg', description: 'Python-based analysis of mobile money trends with insights on seasonal spending patterns.' },
    { title: 'Nairobi Air Quality Monitor', student: 'Group Project', imageUrl: '/placeholder/portfolio-data3.jpg', description: 'Power BI dashboard tracking air quality readings across Nairobi neighbourhoods.' },
  ],

  activityPhotos: [
    { caption: 'Python coding bootcamp session', imageUrl: '/placeholder/data-activity1.jpg' },
    { caption: 'Capstone project presentations', imageUrl: '/placeholder/data-activity2.jpg' },
    { caption: 'Tableau workshop', imageUrl: '/placeholder/data-activity3.jpg' },
    { caption: 'Guest talk by Safaricom data team', imageUrl: '/placeholder/data-activity4.jpg' },
  ],

  alumniStories: [
    {
      name: 'Sylvia Njeri',
      role: 'Junior Data Analyst',
      company: 'M-KOPA Solar',
      story: 'I went from zero coding knowledge to building Tableau dashboards that my company uses every day. The structured learning path at ADMI made a complex subject feel completely achievable.',
      imageUrl: '/placeholder/sylvia-njeri.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Moses Kipchoge',
      role: 'BI Analyst',
      company: 'KCB Group',
      story: 'The capstone project opened doors I never expected. The NGO I built a dashboard for recommended me to a bank, and I was hired within weeks of graduating.',
      imageUrl: '/placeholder/moses-kipchoge.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Aisha Mohammed',
      role: 'Marketing Analyst',
      company: 'Jumia Kenya',
      story: 'Combining my marketing background with data analytics skills made me incredibly valuable. I now lead campaign performance analysis for one of East Africa\'s biggest e-commerce platforms.',
      imageUrl: '/placeholder/aisha-mohammed.jpg',
      graduationYear: '2024',
    },
  ],

  industryPartners: [
    { name: 'Safaricom', logoUrl: '/placeholder/safaricom.png' },
    { name: 'Equity Bank', logoUrl: '/placeholder/equity.png' },
    { name: 'M-KOPA Solar', logoUrl: '/placeholder/mkopa.png' },
    { name: 'Andela', logoUrl: '/placeholder/andela.png' },
    { name: 'Tableau', logoUrl: '/placeholder/tableau.png' },
    { name: 'Microsoft', logoUrl: '/placeholder/microsoft.png' },
    { name: 'KCB Group', logoUrl: '/placeholder/kcb.png' },
    { name: 'IBM', logoUrl: '/placeholder/ibm.png' },
  ],

  industryTrends: [
    { stat: '60%', label: 'Growth in Data Roles', description: 'Data analytics job postings in Kenya have grown by 60% over the past two years, outpacing most other tech roles.' },
    { stat: 'KES 1.2M', label: 'Avg. Senior Salary (Annual)', description: 'Experienced data analysts in Kenya command six-figure monthly salaries, making it one of the highest-paying tech paths.' },
    { stat: '80%', label: 'of Kenyan Firms Investing in Data', description: 'A growing majority of Kenyan enterprises are investing in data analytics capabilities, creating sustained demand for talent.' },
  ],

  resources: [
    { title: 'Getting Started with Data Analytics: A Beginner\'s Roadmap', category: 'Guide', imageUrl: '/placeholder/blog-data1.jpg', link: '/blog/data-analytics-roadmap' },
    { title: 'Python vs R: Which Should You Learn First?', category: 'Guide', imageUrl: '/placeholder/blog-data2.jpg', link: '/blog/python-vs-r' },
    { title: 'Data Careers in Kenya: Salaries, Roles & Outlook', category: 'Career', imageUrl: '/placeholder/blog-data3.jpg', link: '/blog/data-careers-kenya' },
  ],
}

// =============================================================================
// 5. MULTIMEDIA PRODUCTION CERTIFICATE (Foundation · 4 months · TVETA)
// =============================================================================

const multimediaData: CertificatePageData = {
  tagline: 'Get a broad creative foundation in video, audio, graphics, and web content.',

  quickFacts: [
    { label: 'Duration', value: '4 Months', icon: 'schedule' },
    { label: 'Award Level', value: 'Foundation Certificate', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid (Online + Campus)', icon: 'group' },
    { label: 'Per Term', value: 'KES 35,000', icon: 'payments' },
  ],

  courseLeader: {
    name: 'Joseph Mutua',
    role: 'Lead Instructor, Multimedia Production',
    bio: 'Joseph is a multimedia specialist with over 11 years of experience spanning broadcast, web, and social media production. He has produced content for Kenya\u2019s leading media houses and digital agencies.',
    imageUrl: '/placeholder/joseph-mutua.jpg',
    quote: 'Multimedia is where all the creative disciplines meet. Our graduates can shoot, edit, design, and publish — that versatility is gold in today\u2019s market.',
  },

  industryQuote: {
    quote: 'The most valuable creative professionals today are the ones who can work across multiple formats. A multimedia foundation gives you that edge from the start.',
    author: 'Catherine Namuye',
    role: 'Head of Content',
    company: 'Standard Group',
    backgroundImageUrl: '/placeholder/multimedia-industry-bg.jpg',
  },

  benefits: [
    {
      title: 'Multi-Disciplinary Skills',
      description: 'Learn video, audio, graphic design, and web content creation in one programme — making you versatile from day one.',
      icon: '🎨',
    },
    {
      title: 'TVETA Registered',
      description: 'Graduate with a nationally recognised certificate from a TVETA-registered institution.',
      icon: '📜',
    },
    {
      title: 'Hands-On Production',
      description: 'Spend the majority of your time creating content, not just watching lectures. Produce real projects every week.',
      icon: '🎥',
    },
    {
      title: 'Industry-Standard Tools',
      description: 'Work with Adobe Creative Cloud, Canva, basic HTML/CSS, and professional camera and audio equipment.',
      icon: '💻',
    },
    {
      title: 'Perfect Career Starter',
      description: 'Ideal for school leavers or career changers who want to explore the creative industries before specialising.',
      icon: '🚀',
    },
    {
      title: 'Pathway to Specialisation',
      description: 'Credits transfer into ADMI diploma programmes in film, design, animation, or music production.',
      icon: '🎓',
    },
  ],

  degreeSteps: [
    { step: 1, title: 'Foundation Certificate', description: '4 Months · TVETA Registered', duration: '4 Months' },
    { step: 2, title: 'ADMI Diploma', description: 'Specialise with advanced standing', duration: '2 Years' },
    { step: 3, title: "Bachelor's Degree", description: 'Via Woolf University pathway', duration: '1 Year' },
  ],

  semesters: [
    {
      title: 'Term 1: Creative Foundations',
      modules: [
        'Introduction to Multimedia & Creative Industries',
        'Basic Photography & Video Production',
        'Graphic Design Fundamentals (Photoshop & Canva)',
        'Audio Recording & Podcast Production',
        'Introduction to Web Content & Social Media',
      ],
    },
    {
      title: 'Term 2: Applied Production',
      modules: [
        'Video Editing (Premiere Pro)',
        'Motion Graphics Basics (After Effects)',
        'Digital Publishing & Content Strategy',
        'Integrated Multimedia Capstone Project',
      ],
    },
  ],

  paymentPlans: [
    {
      title: '1st Installment · 60%',
      price: 'KES 21,000',
      period: 'Due at Registration',
      details: ['Secures your spot with full access to all labs, equipment, and online learning resources.'],
      isPopular: true,
    },
    {
      title: '2nd Installment · 40%',
      price: 'KES 14,000',
      period: 'Due Mid-Term',
      details: ['Completes your term fees. Must be settled before final assessments and certification.'],
    },
  ],

  impactStats: [
    { value: '80%', label: 'Employed or Studying Within 4 Months' },
    { value: 'KES 40K', label: 'Average Starting Salary' },
    { value: '4', label: 'Creative Disciplines Covered' },
    { value: '10+', label: 'Projects Produced Per Student' },
  ],

  testimonials: [
    {
      name: 'Grace Wangari',
      role: 'Multimedia Certificate, 2025',
      quote: 'I was not sure whether I wanted to do video, design, or music. This programme let me try everything. I discovered I love motion graphics and now I am continuing into the animation diploma.',
      imageUrl: '/placeholder/grace-wangari.jpg',
    },
    {
      name: 'Brian Odhiambo',
      role: 'Multimedia Certificate, 2024',
      quote: 'The best part was producing a complete multimedia campaign for a real client. We did the photos, video, graphics, and social media posts — everything from start to finish.',
      imageUrl: '/placeholder/brian-odhiambo.jpg',
    },
    {
      name: 'Fatma Ali',
      role: 'Multimedia Certificate, 2025',
      quote: 'As a school leaver I had no idea what career path to follow. ADMI gave me the exposure to multiple creative fields and I found my calling in content creation.',
      imageUrl: '/placeholder/fatma-ali.jpg',
    },
  ],

  applicationSteps: [
    {
      step: 1,
      title: 'Submit Your Application',
      description: 'Complete the online form and upload your ID or KCSE certificate. Takes under 5 minutes.',
    },
    {
      step: 2,
      title: 'Chat with Admissions',
      description: 'Our team will reach out for a brief conversation to understand your goals and answer questions.',
    },
    {
      step: 3,
      title: 'Secure Your Place',
      description: 'Pay the 1st installment (60%) to confirm your enrolment. Spaces are limited per intake.',
    },
  ],

  faqs: [
    {
      question: 'What is a multimedia certificate and who is it for?',
      answer: 'This is a broad foundation programme covering video, audio, graphic design, and digital content creation. It is ideal for school leavers exploring creative careers, career changers, or anyone wanting a versatile multimedia skill set.',
    },
    {
      question: 'Do I need any previous experience or qualifications?',
      answer: 'No prior creative experience is needed. You should have a KCSE certificate or equivalent. The programme teaches everything from scratch.',
    },
    {
      question: 'What makes this different from the professional certificates?',
      answer: 'The foundation certificate gives you breadth across multiple disciplines, while professional certificates go deeper into a single specialisation. Many students start here and then choose a specialisation for their next programme.',
    },
    {
      question: 'What equipment and software will I learn?',
      answer: 'You will use DSLR cameras, audio recorders, LED lighting, and learn Adobe Photoshop, Premiere Pro, After Effects, and Canva. We also cover basic web publishing tools.',
    },
    {
      question: 'Can I continue to a diploma after this certificate?',
      answer: 'Yes. Credits transfer into any ADMI diploma programme — film, design, animation, or music production. You enter with advanced standing, saving both time and money.',
    },
    {
      question: 'Is the TVETA registration important?',
      answer: 'Yes. TVETA (Technical and Vocational Education and Training Authority) is the Kenyan government body that regulates vocational training. Registration means our programmes meet national quality standards.',
    },
  ],

  careers: [
    { title: 'Content Creator', description: 'Produce multi-format content for brands, media companies, or your own platforms.', salary: 'KES 25,000 - 60,000/mo' },
    { title: 'Social Media Manager', description: 'Create and manage visual content across social media platforms for businesses.', salary: 'KES 30,000 - 70,000/mo' },
    { title: 'Junior Videographer', description: 'Assist with video production for events, corporate content, and digital campaigns.', salary: 'KES 25,000 - 50,000/mo' },
    { title: 'Multimedia Assistant', description: 'Support media teams with photography, basic editing, and content formatting.', salary: 'KES 25,000 - 45,000/mo' },
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'TVETA Kenya (Registered)' },
    { label: 'Level', value: 'Foundation Certificate' },
    { label: 'Duration', value: '4 Months (2 Terms)' },
    { label: 'Intakes', value: 'January, May, September' },
  ],

  learningOutcomes: [
    'Capture photographs and video footage using DSLR cameras and professional lighting.',
    'Edit video and audio content using Adobe Premiere Pro and basic audio tools.',
    'Create graphic design assets using Adobe Photoshop and Canva for print and digital use.',
    'Produce a complete multimedia campaign combining video, audio, graphics, and web content.',
    'Identify personal strengths across creative disciplines to inform future specialisation choices.',
  ],

  mentors: [
    { name: 'Joseph Mutua', role: 'Multimedia Producer', company: 'ADMI Faculty', imageUrl: '/placeholder/joseph-mutua.jpg' },
    { name: 'Mary Kiptoo', role: 'Content Director', company: 'Mediamax', imageUrl: '/placeholder/mary-kiptoo.jpg' },
    { name: 'Isaac Nganga', role: 'Photographer', company: 'Freelance', imageUrl: '/placeholder/isaac-nganga.jpg' },
    { name: 'Amina Yusuf', role: 'Social Media Strategist', company: 'Gina Din Group', imageUrl: '/placeholder/amina-yusuf.jpg' },
  ],

  assessmentMethods: [
    { method: 'Production Projects', percentage: 55, description: 'Video, audio, photography, and design projects produced throughout the programme.' },
    { method: 'Capstone Campaign', percentage: 25, description: 'An integrated multimedia campaign combining multiple formats for a real or simulated client.' },
    { method: 'Reflective Journal', percentage: 10, description: 'Ongoing journal documenting learning progress, creative decisions, and self-assessment.' },
    { method: 'Participation & Critiques', percentage: 10, description: 'Engagement in bootcamp sessions, group work, and constructive peer feedback.' },
  ],

  facilities: [
    { name: 'Multimedia Lab', description: 'Workstations with Adobe Creative Cloud and content creation tools.', imageUrl: '/placeholder/multimedia-lab.jpg' },
    { name: 'Video Studio', description: 'Green-screen studio with professional lighting for video and photography.', imageUrl: '/placeholder/video-studio-mm.jpg' },
    { name: 'Audio Booth', description: 'Soundproofed recording space for podcasts, voiceovers, and audio projects.', imageUrl: '/placeholder/audio-booth.jpg' },
    { name: 'Equipment Checkout', description: 'Cameras, tripods, audio recorders, and lighting kits available for student use.', imageUrl: '/placeholder/equip-checkout.jpg' },
  ],

  portfolioItems: [
    { title: 'Explore Nairobi Campaign', student: 'Grace Wangari', imageUrl: '/placeholder/portfolio-mm1.jpg', description: 'Multi-format tourism campaign including a 2-minute video, photo series, poster, and social media kit.' },
    { title: 'Youth Voices Podcast', student: 'Brian Odhiambo', imageUrl: '/placeholder/portfolio-mm2.jpg', description: 'Three-episode podcast series featuring young Kenyan creatives with custom artwork and audiograms.' },
    { title: 'Tala Fitness Social Rebrand', student: 'Group Project', imageUrl: '/placeholder/portfolio-mm3.jpg', description: 'Complete social media rebrand including photography, video reels, and branded templates.' },
  ],

  activityPhotos: [
    { caption: 'On-location photography field trip', imageUrl: '/placeholder/mm-activity1.jpg' },
    { caption: 'Podcast recording session', imageUrl: '/placeholder/mm-activity2.jpg' },
    { caption: 'Graphic design bootcamp', imageUrl: '/placeholder/mm-activity3.jpg' },
    { caption: 'Capstone project presentations', imageUrl: '/placeholder/mm-activity4.jpg' },
  ],

  alumniStories: [
    {
      name: 'Grace Wangari',
      role: 'Motion Graphics Student',
      company: 'ADMI (Continuing to Diploma)',
      story: 'The foundation certificate helped me discover that motion graphics is my passion. I enrolled in the animation diploma immediately and I am now creating work I am genuinely proud of.',
      imageUrl: '/placeholder/grace-wangari.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Brian Odhiambo',
      role: 'Content Creator',
      company: 'Freelance',
      story: 'I started getting freelance clients while still in the programme. Being able to offer video, photos, and graphic design as a package makes me much more competitive than one-skill creators.',
      imageUrl: '/placeholder/brian-odhiambo.jpg',
      graduationYear: '2024',
    },
    {
      name: 'Fatma Ali',
      role: 'Social Media Coordinator',
      company: 'Kenya Red Cross',
      story: 'The multimedia skills I gained at ADMI were exactly what my employer needed. I manage all their visual content — video, graphics, and photography — and it started with this foundation certificate.',
      imageUrl: '/placeholder/fatma-ali.jpg',
      graduationYear: '2025',
    },
  ],

  industryPartners: [
    { name: 'Standard Group', logoUrl: '/placeholder/standard-group.png' },
    { name: 'Mediamax', logoUrl: '/placeholder/mediamax.png' },
    { name: 'Adobe', logoUrl: '/placeholder/adobe.png' },
    { name: 'Gina Din Group', logoUrl: '/placeholder/ginadiin.png' },
    { name: 'Canon', logoUrl: '/placeholder/canon.png' },
    { name: 'Kenya Red Cross', logoUrl: '/placeholder/redcross.png' },
  ],

  industryTrends: [
    { stat: '75%', label: 'of Brands Use Multi-Format Content', description: 'Most businesses now require multimedia content across video, audio, design, and web — driving demand for versatile creators.' },
    { stat: '2x', label: 'Growth in Content Creator Economy', description: 'The creator economy in Kenya has doubled in three years, with multimedia skills being the most sought-after.' },
    { stat: '8K+', label: 'Multimedia Roles Annually', description: 'New multimedia and content creation positions are created each year across East Africa.' },
  ],

  resources: [
    { title: 'What Is Multimedia Production? A Career Guide', category: 'Career', imageUrl: '/placeholder/blog-mm1.jpg', link: '/blog/what-is-multimedia-production' },
    { title: 'Foundation vs Professional Certificate: Which Is Right for You?', category: 'Guide', imageUrl: '/placeholder/blog-mm2.jpg', link: '/blog/foundation-vs-professional' },
    { title: 'Building a Multi-Skill Creative Portfolio', category: 'Tips', imageUrl: '/placeholder/blog-mm3.jpg', link: '/blog/multi-skill-portfolio' },
  ],
}

// =============================================================================
// 6. AI ADOPTION & DIGITAL TRANSFORMATION (Foundation · 3 months · TVETA)
// =============================================================================

const aiAdoptionData: CertificatePageData = {
  tagline: 'Learn to harness AI tools and lead digital transformation in any organisation.',

  quickFacts: [
    { label: 'Duration', value: '3 Months', icon: 'schedule' },
    { label: 'Award Level', value: 'Foundation Certificate', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid (Online + Campus)', icon: 'group' },
    { label: 'Per Term', value: 'KES 40,000', icon: 'payments' },
  ],

  courseLeader: {
    name: 'Dr. Wambui Karanja',
    role: 'Lead Instructor, AI & Digital Transformation',
    bio: 'Dr. Wambui is a technology strategist with a doctorate in Information Systems from Strathmore University. She has advised organisations across East Africa on digital transformation and has a gift for making complex technology concepts accessible.',
    imageUrl: '/placeholder/wambui-karanja.jpg',
    quote: 'AI is not here to replace people — it is here to amplify what people can do. Understanding how to adopt it responsibly is one of the most valuable skills you can gain today.',
  },

  industryQuote: {
    quote: 'Every industry in Africa is being reshaped by AI and digital tools. The professionals who understand how to adopt and apply these technologies will lead the next wave of growth.',
    author: 'Bitange Ndemo',
    role: 'Former PS, ICT',
    company: 'Government of Kenya',
    backgroundImageUrl: '/placeholder/ai-industry-bg.jpg',
  },

  benefits: [
    {
      title: 'AI Tools for Every Profession',
      description: 'Learn to use ChatGPT, Midjourney, Copilot, and other AI tools to boost productivity in any career.',
      icon: '🤖',
    },
    {
      title: 'TVETA Registered',
      description: 'Graduate with a nationally recognised certificate from a TVETA-registered institution.',
      icon: '📜',
    },
    {
      title: 'No Coding Required',
      description: 'This programme focuses on using AI tools, not building them. No programming experience needed.',
      icon: '🧩',
    },
    {
      title: 'Digital Transformation Framework',
      description: 'Understand how organisations adopt technology — from automating workflows to implementing AI strategies.',
      icon: '🔄',
    },
    {
      title: 'Hands-On AI Projects',
      description: 'Complete practical projects using AI for content creation, data analysis, customer service, and business automation.',
      icon: '🎯',
    },
    {
      title: 'Future-Proof Your Career',
      description: 'AI literacy is becoming essential across all industries. This certificate positions you ahead of the curve.',
      icon: '🚀',
    },
  ],

  degreeSteps: [
    { step: 1, title: 'Foundation Certificate', description: '3 Months · TVETA Registered', duration: '3 Months' },
    { step: 2, title: 'ADMI Diploma', description: 'Continue into a specialist track', duration: '2 Years' },
    { step: 3, title: "Bachelor's Degree", description: 'Via Woolf University pathway', duration: '1 Year' },
  ],

  semesters: [
    {
      title: 'Term 1: AI Foundations & Digital Transformation',
      modules: [
        'Understanding AI: Concepts, History & Current Landscape',
        'AI Tools for Productivity (ChatGPT, Copilot, Notion AI)',
        'AI for Content Creation (Midjourney, DALL-E, Canva AI)',
        'Digital Transformation Strategy & Change Management',
        'AI Ethics, Data Privacy & Responsible Adoption',
      ],
    },
  ],

  paymentPlans: [
    {
      title: '1st Installment · 60%',
      price: 'KES 24,000',
      period: 'Due at Registration',
      details: ['Secures your spot with full access to all AI tools, online coursework, and campus bootcamp sessions.'],
      isPopular: true,
    },
    {
      title: '2nd Installment · 40%',
      price: 'KES 16,000',
      period: 'Due Mid-Term',
      details: ['Completes your term fees. Must be settled before final project presentation and certification.'],
    },
  ],

  impactStats: [
    { value: '95%', label: 'of Graduates Report Career Improvement' },
    { value: '40%', label: 'Productivity Increase (Avg. Self-Reported)' },
    { value: '10+', label: 'AI Tools Mastered' },
    { value: 'KES 55K', label: 'Average Starting Salary' },
  ],

  testimonials: [
    {
      name: 'Josephine Atieno',
      role: 'AI Adoption Certificate, 2025',
      quote: 'I was terrified of AI before this programme. Now I use it every single day in my work — writing reports, analysing data, and automating repetitive tasks. My boss thinks I have superpowers.',
      imageUrl: '/placeholder/josephine-atieno.jpg',
    },
    {
      name: 'Michael Wekesa',
      role: 'AI Adoption Certificate, 2025',
      quote: 'As a small business owner, this programme showed me how to automate customer support, generate marketing content, and use data analytics — all without hiring extra staff.',
      imageUrl: '/placeholder/michael-wekesa.jpg',
    },
    {
      name: 'Rahma Hassan',
      role: 'AI Adoption Certificate, 2024',
      quote: 'The ethical discussions were as valuable as the technical training. I now help my organisation adopt AI tools responsibly, and that makes me incredibly valuable to the leadership team.',
      imageUrl: '/placeholder/rahma-hassan.jpg',
    },
  ],

  applicationSteps: [
    {
      step: 1,
      title: 'Submit Your Application',
      description: 'Complete the online form and upload your ID or KCSE certificate. Takes under 5 minutes.',
    },
    {
      step: 2,
      title: 'Chat with Admissions',
      description: 'Our team will reach out for a brief conversation to understand your goals and answer questions.',
    },
    {
      step: 3,
      title: 'Secure Your Place',
      description: 'Pay the 1st installment (60%) to confirm your enrolment. Spaces are limited per intake.',
    },
  ],

  faqs: [
    {
      question: 'Do I need a tech background or coding skills?',
      answer: 'Not at all. This programme is designed for non-technical professionals. We focus on using AI tools, not building them. If you can use a smartphone and a laptop, you are ready.',
    },
    {
      question: 'What AI tools will I learn to use?',
      answer: 'You will gain hands-on experience with ChatGPT, Microsoft Copilot, Midjourney, DALL-E, Canva AI, Notion AI, Google Bard, and various automation tools like Zapier.',
    },
    {
      question: 'Is this programme only for people in tech roles?',
      answer: 'No. AI adoption is relevant to every profession — marketing, finance, education, healthcare, agriculture, media, and more. We train you to apply AI within your specific field.',
    },
    {
      question: 'Will AI replace my job?',
      answer: 'AI is more likely to transform jobs than eliminate them. Professionals who understand AI tools will be more productive, more valuable, and better positioned for leadership roles. This programme ensures you are on the right side of that shift.',
    },
    {
      question: 'What is digital transformation and why does it matter?',
      answer: 'Digital transformation is the process of adopting technology to improve how an organisation operates. Understanding this process makes you valuable to any company looking to modernise and become more efficient.',
    },
    {
      question: 'Can I take this programme while working full-time?',
      answer: 'Yes. The hybrid format is specifically designed for working professionals. Online coursework is self-paced, and campus bootcamps are scheduled on weekends to minimise disruption to your work schedule.',
    },
  ],

  careers: [
    { title: 'AI Implementation Specialist', description: 'Help organisations adopt and integrate AI tools into their workflows.', salary: 'KES 50,000 - 120,000/mo' },
    { title: 'Digital Transformation Coordinator', description: 'Lead technology adoption projects and change management within organisations.', salary: 'KES 60,000 - 140,000/mo' },
    { title: 'AI Content Strategist', description: 'Use AI tools to produce, optimise, and scale content for marketing and communications.', salary: 'KES 40,000 - 90,000/mo' },
    { title: 'Productivity Consultant', description: 'Advise businesses on using AI and automation tools to improve efficiency and reduce costs.', salary: 'KES 50,000 - 130,000/mo' },
    { title: 'Innovation Manager', description: 'Identify and pilot new technologies that create competitive advantages for organisations.', salary: 'KES 70,000 - 200,000/mo' },
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'TVETA Kenya (Registered)' },
    { label: 'Level', value: 'Foundation Certificate' },
    { label: 'Duration', value: '3 Months (1 Term)' },
    { label: 'Intakes', value: 'January, May, September' },
  ],

  learningOutcomes: [
    'Use AI tools (ChatGPT, Copilot, Midjourney) to enhance personal and professional productivity.',
    'Evaluate and select appropriate AI tools for specific business tasks and workflows.',
    'Develop a digital transformation roadmap for an organisation or department.',
    'Apply ethical frameworks to AI adoption decisions including data privacy and bias considerations.',
    'Create AI-assisted content across text, image, and data analysis use cases.',
  ],

  mentors: [
    { name: 'Dr. Wambui Karanja', role: 'Technology Strategist', company: 'ADMI Faculty', imageUrl: '/placeholder/wambui-karanja.jpg' },
    { name: 'Chris Kirubi Jr.', role: 'Innovation Lead', company: 'Safaricom', imageUrl: '/placeholder/chris-kirubi.jpg' },
    { name: 'Naomi Mwaura', role: 'AI Researcher', company: 'IBM Research Africa', imageUrl: '/placeholder/naomi-mwaura.jpg' },
    { name: 'James Waithaka', role: 'Digital Transformation Consultant', company: 'Deloitte East Africa', imageUrl: '/placeholder/james-waithaka.jpg' },
  ],

  assessmentMethods: [
    { method: 'AI Application Projects', percentage: 45, description: 'Practical projects demonstrating AI tool usage across content creation, data analysis, and business automation.' },
    { method: 'Transformation Proposal', percentage: 30, description: 'A detailed digital transformation proposal for a real or simulated organisation.' },
    { method: 'Tool Demonstrations', percentage: 15, description: 'Live demonstrations of AI tools applied to real business scenarios, presented to the class.' },
    { method: 'Participation & Ethics Discussions', percentage: 10, description: 'Engagement in bootcamp sessions, ethical debates, and collaborative problem-solving.' },
  ],

  facilities: [
    { name: 'Innovation Lab', description: 'Workstations with access to all major AI platforms and productivity tools.', imageUrl: '/placeholder/innovation-lab.jpg' },
    { name: 'Workshop Space', description: 'Flexible space for group exercises, design sprints, and transformation planning.', imageUrl: '/placeholder/workshop-space.jpg' },
    { name: 'Online Platform', description: '24/7 access to course materials, AI tool tutorials, and discussion forums.', imageUrl: '/placeholder/ai-platform.jpg' },
    { name: 'Presentation Room', description: 'Professional space for final project demonstrations and panel reviews.', imageUrl: '/placeholder/ai-presentation.jpg' },
  ],

  portfolioItems: [
    { title: 'AI-Powered Customer Service Blueprint', student: 'Josephine Atieno', imageUrl: '/placeholder/portfolio-ai1.jpg', description: 'Chatbot implementation plan and AI workflow automation proposal for a Kenyan insurance company.' },
    { title: 'Content Factory: AI Marketing Suite', student: 'Michael Wekesa', imageUrl: '/placeholder/portfolio-ai2.jpg', description: 'Full AI-powered marketing content pipeline producing social posts, blog articles, and ad copy.' },
    { title: 'Digital Transformation Roadmap: Nairobi Clinic', student: 'Group Project', imageUrl: '/placeholder/portfolio-ai3.jpg', description: 'Comprehensive digital transformation strategy for a mid-size healthcare provider in Nairobi.' },
  ],

  activityPhotos: [
    { caption: 'AI tools hands-on workshop', imageUrl: '/placeholder/ai-activity1.jpg' },
    { caption: 'Digital transformation case study', imageUrl: '/placeholder/ai-activity2.jpg' },
    { caption: 'Ethics and AI debate session', imageUrl: '/placeholder/ai-activity3.jpg' },
    { caption: 'Final project presentations', imageUrl: '/placeholder/ai-activity4.jpg' },
  ],

  alumniStories: [
    {
      name: 'Josephine Atieno',
      role: 'Operations Manager (AI-Enhanced)',
      company: 'Britam Insurance',
      story: 'After the programme I proposed an AI workflow to my bosses that saved 20 hours a week across the team. I was promoted within three months.',
      imageUrl: '/placeholder/josephine-atieno.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Michael Wekesa',
      role: 'Founder',
      company: 'Wekesa Digital Solutions',
      story: 'I used to run my business alone. Now AI handles my marketing copy, social media scheduling, and customer responses. It is like having a team of five.',
      imageUrl: '/placeholder/michael-wekesa.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Rahma Hassan',
      role: 'Digital Innovation Lead',
      company: 'UNDP Kenya',
      story: 'Understanding both the opportunities and risks of AI made me the go-to person in my organisation for all technology decisions. This certificate changed my career trajectory completely.',
      imageUrl: '/placeholder/rahma-hassan.jpg',
      graduationYear: '2024',
    },
  ],

  industryPartners: [
    { name: 'Microsoft', logoUrl: '/placeholder/microsoft.png' },
    { name: 'Google', logoUrl: '/placeholder/google.png' },
    { name: 'Safaricom', logoUrl: '/placeholder/safaricom.png' },
    { name: 'IBM Research Africa', logoUrl: '/placeholder/ibm.png' },
    { name: 'Deloitte East Africa', logoUrl: '/placeholder/deloitte.png' },
    { name: 'UNDP Kenya', logoUrl: '/placeholder/undp.png' },
    { name: 'Andela', logoUrl: '/placeholder/andela.png' },
  ],

  industryTrends: [
    { stat: '75%', label: 'of Kenyan Firms Exploring AI', description: 'Three quarters of large Kenyan enterprises are actively exploring AI adoption, creating enormous demand for professionals who understand the technology.' },
    { stat: '$4.5B', label: 'AI Market in Africa by 2030', description: 'The African AI market is projected to reach billions in value, with Kenya positioned as a leading hub for AI innovation on the continent.' },
    { stat: '50%', label: 'Productivity Boost from AI Tools', description: 'Studies show that professionals who effectively use AI tools see productivity improvements of up to 50% across knowledge work.' },
  ],

  resources: [
    { title: 'AI Tools for Beginners: Where to Start', category: 'Guide', imageUrl: '/placeholder/blog-ai1.jpg', link: '/blog/ai-tools-beginners' },
    { title: 'Digital Transformation in Kenya: Trends for 2026', category: 'Industry', imageUrl: '/placeholder/blog-ai2.jpg', link: '/blog/digital-transformation-kenya' },
    { title: 'How AI Is Changing Creative Industries in Africa', category: 'Insight', imageUrl: '/placeholder/blog-ai3.jpg', link: '/blog/ai-creative-industries-africa' },
  ],
}

// =============================================================================
// 7. MUSIC PRODUCTION & SOUND ENGINEERING (Foundation · 4 months · TVETA)
// =============================================================================

const musicProductionData: CertificatePageData = {
  tagline: 'Record, mix, and produce professional music using industry-standard studio equipment.',

  quickFacts: [
    { label: 'Duration', value: '4 Months', icon: 'schedule' },
    { label: 'Award Level', value: 'Foundation Certificate', icon: 'school' },
    { label: 'Intakes', value: 'Jan, May, Sept', icon: 'calendar_month' },
    { label: 'Delivery', value: 'Hybrid (Online + Campus)', icon: 'group' },
    { label: 'Per Term', value: 'KES 35,000', icon: 'payments' },
  ],

  courseLeader: {
    name: 'Tito Ochieng',
    role: 'Lead Instructor, Music Production',
    bio: 'Tito is a Grammy-considered sound engineer and music producer with 13 years of experience. He has worked with top East African artists and produced soundtracks for film and television. He runs ADMI\u2019s state-of-the-art recording studios.',
    imageUrl: '/placeholder/tito-ochieng.jpg',
    quote: 'The studio is where art meets science. We teach you to hear what others miss and shape sound into something extraordinary.',
  },

  industryQuote: {
    quote: 'East Africa\u2019s music industry is exploding globally. What we need are producers and engineers who can deliver international-quality sound from studios right here in Nairobi.',
    author: 'Bien Baraza',
    role: 'Musician & Producer',
    company: 'Sauti Sol',
    backgroundImageUrl: '/placeholder/music-industry-bg.jpg',
  },

  benefits: [
    {
      title: 'Professional Studio Access',
      description: 'Record in acoustically treated studios with industry-grade microphones, monitors, and outboard gear from day one.',
      icon: '🎙️',
    },
    {
      title: 'TVETA Registered',
      description: 'Graduate with a nationally recognised certificate from a TVETA-registered institution.',
      icon: '📜',
    },
    {
      title: 'DAW Proficiency',
      description: 'Master Logic Pro, Ableton Live, and Pro Tools — the three DAWs used in professional studios worldwide.',
      icon: '🎹',
    },
    {
      title: 'Complete Production Pipeline',
      description: 'Learn every stage — beat-making, recording, editing, mixing, and mastering — so you can handle full productions.',
      icon: '🎚️',
    },
    {
      title: 'Industry Networking',
      description: 'Connect with working musicians, producers, and A&R professionals through ADMI\u2019s music industry network.',
      icon: '🤝',
    },
    {
      title: 'Pathway to Advanced Study',
      description: 'Credits transfer into the ADMI Diploma in Music Production for those wanting to go deeper.',
      icon: '🎓',
    },
  ],

  degreeSteps: [
    { step: 1, title: 'Foundation Certificate', description: '4 Months · TVETA Registered', duration: '4 Months' },
    { step: 2, title: 'ADMI Diploma', description: 'Specialise with advanced standing', duration: '2 Years' },
    { step: 3, title: "Bachelor's Degree", description: 'Via Woolf University pathway', duration: '1 Year' },
  ],

  semesters: [
    {
      title: 'Term 1: Production Foundations',
      modules: [
        'Music Theory & Ear Training for Producers',
        'Beat Making & Sound Design (Ableton Live)',
        'Recording Techniques & Microphone Selection',
        'Introduction to Mixing (Logic Pro)',
        'Studio Session Management',
      ],
    },
    {
      title: 'Term 2: Mixing, Mastering & Release',
      modules: [
        'Advanced Mixing Techniques (Pro Tools)',
        'Mastering for Streaming & Physical Media',
        'Sound Design for Film & Media',
        'Music Business & Distribution',
        'Final Project: Produce & Release a Track',
      ],
    },
  ],

  paymentPlans: [
    {
      title: '1st Installment · 60%',
      price: 'KES 21,000',
      period: 'Due at Registration',
      details: ['Secures your spot with full studio access, software licences, and online learning platform.'],
      isPopular: true,
    },
    {
      title: '2nd Installment · 40%',
      price: 'KES 14,000',
      period: 'Due Mid-Term',
      details: ['Completes your term fees. Must be settled before final production submission and certification.'],
    },
  ],

  impactStats: [
    { value: '85%', label: 'Employed or Freelancing Within 4 Months' },
    { value: '3', label: 'Professional DAWs Mastered' },
    { value: 'KES 45K', label: 'Average Starting Salary' },
    { value: '100+', label: 'Music Industry Connections' },
  ],

  testimonials: [
    {
      name: 'Victor Ouma',
      role: 'Music Production Certificate, 2025',
      quote: 'I had been making beats in my bedroom for years but they never sounded right. Learning proper mixing and mastering at ADMI took my productions from amateur to professional in months.',
      imageUrl: '/placeholder/victor-ouma.jpg',
    },
    {
      name: 'Nancy Wangeci',
      role: 'Music Production Certificate, 2024',
      quote: 'The studio sessions were incredible. Working with real outboard gear and learning from engineers who have mixed actual hits gave me skills I could never have learned from YouTube tutorials.',
      imageUrl: '/placeholder/nancy-wangeci.jpg',
    },
    {
      name: 'Ali Abdinoor',
      role: 'Music Production Certificate, 2025',
      quote: 'I released my first professionally mixed track while still in the programme. It got picked up by a playlist curator and now has over 50,000 streams on Spotify.',
      imageUrl: '/placeholder/ali-abdinoor.jpg',
    },
  ],

  applicationSteps: [
    {
      step: 1,
      title: 'Submit Your Application',
      description: 'Complete the online form and upload your ID or KCSE certificate. Takes under 5 minutes.',
    },
    {
      step: 2,
      title: 'Chat with Admissions',
      description: 'Our team will reach out for a brief conversation to understand your goals and answer questions.',
    },
    {
      step: 3,
      title: 'Secure Your Place',
      description: 'Pay the 1st installment (60%) to confirm your enrolment. Spaces are limited per intake.',
    },
  ],

  faqs: [
    {
      question: 'Do I need to play a musical instrument to enrol?',
      answer: 'No. While musical background is helpful, it is not required. We teach the music theory essentials you need and focus primarily on production, engineering, and software skills.',
    },
    {
      question: 'What DAWs (Digital Audio Workstations) will I learn?',
      answer: 'You will work with Logic Pro, Ableton Live, and Pro Tools. These three DAWs cover virtually all professional music production and sound engineering scenarios.',
    },
    {
      question: 'Do I need to bring my own equipment?',
      answer: 'No. All studio equipment, software, and tools are provided at the ADMI campus. However, having a laptop with a DAW installed is useful for practising at home.',
    },
    {
      question: 'Will I actually release music during the programme?',
      answer: 'Yes. Your final project involves producing, mixing, mastering, and distributing a track on streaming platforms. You graduate with a released credit to your name.',
    },
    {
      question: 'Can I use these skills for film and TV sound work?',
      answer: 'Absolutely. The programme includes a module on sound design for film and media. Many graduates work across both music and screen sound.',
    },
    {
      question: 'What career paths are available after this certificate?',
      answer: 'Graduates work as music producers, sound engineers, recording technicians, podcast editors, and sound designers for film. Many also produce music independently and earn from streaming royalties.',
    },
  ],

  careers: [
    { title: 'Music Producer', description: 'Create beats, arrange tracks, and produce music for artists and labels.', salary: 'KES 30,000 - 80,000/mo' },
    { title: 'Sound Engineer', description: 'Record and mix music in professional studios for artists and commercial projects.', salary: 'KES 35,000 - 90,000/mo' },
    { title: 'Mixing & Mastering Engineer', description: 'Specialise in the final stages of production that make tracks sound polished and release-ready.', salary: 'KES 40,000 - 100,000/mo' },
    { title: 'Podcast Producer', description: 'Record, edit, and produce podcast content for media companies and independent creators.', salary: 'KES 30,000 - 65,000/mo' },
    { title: 'Sound Designer', description: 'Create soundscapes, effects, and audio for film, TV, games, and advertising.', salary: 'KES 40,000 - 100,000/mo' },
    { title: 'Live Sound Technician', description: 'Set up and operate sound systems for concerts, events, and conferences.', salary: 'KES 25,000 - 60,000/mo' },
  ],

  programDetails: [
    { label: 'Awarding Body', value: 'TVETA Kenya (Registered)' },
    { label: 'Level', value: 'Foundation Certificate' },
    { label: 'Duration', value: '4 Months (2 Terms)' },
    { label: 'Intakes', value: 'January, May, September' },
  ],

  learningOutcomes: [
    'Operate a professional recording studio including microphone placement, signal flow, and session management.',
    'Produce beats and arrangements using Ableton Live, Logic Pro, and Pro Tools.',
    'Mix multi-track recordings to broadcast and streaming standards.',
    'Master audio for various delivery formats including streaming, vinyl, and broadcast.',
    'Manage the music production pipeline from concept to distribution on streaming platforms.',
  ],

  mentors: [
    { name: 'Tito Ochieng', role: 'Sound Engineer & Producer', company: 'ADMI Faculty', imageUrl: '/placeholder/tito-ochieng.jpg' },
    { name: 'Cedo', role: 'Music Producer', company: 'Industry Partner', imageUrl: '/placeholder/cedo.jpg' },
    { name: 'Viola Karuri', role: 'Mastering Engineer', company: 'Ketebul Music', imageUrl: '/placeholder/viola-karuri.jpg' },
    { name: 'DJ Protege', role: 'DJ & Producer', company: 'Alumni Mentor', imageUrl: '/placeholder/dj-protege.jpg' },
  ],

  assessmentMethods: [
    { method: 'Production Projects', percentage: 50, description: 'Beats, recordings, mixes, and masters produced individually throughout the programme.' },
    { method: 'Final Track Release', percentage: 25, description: 'A fully produced, mixed, and mastered track distributed to streaming platforms.' },
    { method: 'Studio Practicals', percentage: 15, description: 'Observed studio sessions demonstrating recording, mixing, and equipment operation skills.' },
    { method: 'Participation & Critiques', percentage: 10, description: 'Active engagement in listening sessions, peer feedback, and collaborative production.' },
  ],

  facilities: [
    { name: 'Recording Studio A', description: 'Main studio with Audient console, Neumann microphones, and isolated vocal booth.', imageUrl: '/placeholder/studio-a.jpg' },
    { name: 'Production Suites', description: 'Individual production rooms with MIDI controllers, monitors, and DAW setups.', imageUrl: '/placeholder/prod-suites.jpg' },
    { name: 'Mixing Room', description: 'Acoustically treated room with reference monitors for critical listening and mixing.', imageUrl: '/placeholder/mixing-room.jpg' },
    { name: 'Equipment Store', description: 'Microphones, audio interfaces, headphones, and MIDI keyboards available for student checkout.', imageUrl: '/placeholder/music-equip.jpg' },
    { name: 'Live Performance Space', description: 'Small venue for live recording sessions, showcases, and listening parties.', imageUrl: '/placeholder/live-space.jpg' },
  ],

  portfolioItems: [
    { title: 'Midnight in Nai (EP)', student: 'Victor Ouma', imageUrl: '/placeholder/portfolio-music1.jpg', description: 'Three-track Afrobeat EP produced, mixed, and mastered entirely at ADMI studios.' },
    { title: 'Acoustic Sessions Vol. 1', student: 'Nancy Wangeci', imageUrl: '/placeholder/portfolio-music2.jpg', description: 'Live acoustic recording session with a four-piece band, mixed and mastered for streaming.' },
    { title: 'Film Score: The Return', student: 'Group Project', imageUrl: '/placeholder/portfolio-music3.jpg', description: 'Original soundtrack produced for a student short film, including Foley and ambient sound design.' },
  ],

  activityPhotos: [
    { caption: 'Recording session in Studio A', imageUrl: '/placeholder/music-activity1.jpg' },
    { caption: 'Beat-making workshop', imageUrl: '/placeholder/music-activity2.jpg' },
    { caption: 'Mixing masterclass', imageUrl: '/placeholder/music-activity3.jpg' },
    { caption: 'Student showcase and listening party', imageUrl: '/placeholder/music-activity4.jpg' },
  ],

  alumniStories: [
    {
      name: 'Victor Ouma',
      role: 'Music Producer',
      company: 'Freelance',
      story: 'I now produce for three signed artists. The engineering skills I learned at ADMI mean I can record, mix, and master everything in my home studio to professional standards.',
      imageUrl: '/placeholder/victor-ouma.jpg',
      graduationYear: '2025',
    },
    {
      name: 'Nancy Wangeci',
      role: 'Recording Engineer',
      company: 'Decimal Records',
      story: 'I walked into ADMI wanting to sing and walked out wanting to engineer. The studio sessions opened my eyes to a whole world behind the glass that I now call home.',
      imageUrl: '/placeholder/nancy-wangeci.jpg',
      graduationYear: '2024',
    },
    {
      name: 'Ali Abdinoor',
      role: 'Sound Designer',
      company: 'Showmax',
      story: 'The sound design for film module was a revelation. I discovered I could combine my music skills with visual storytelling and now I design sound for television.',
      imageUrl: '/placeholder/ali-abdinoor.jpg',
      graduationYear: '2025',
    },
  ],

  industryPartners: [
    { name: 'Boomplay', logoUrl: '/placeholder/boomplay.png' },
    { name: 'Spotify', logoUrl: '/placeholder/spotify.png' },
    { name: 'Ketebul Music', logoUrl: '/placeholder/ketebul.png' },
    { name: 'Decimal Records', logoUrl: '/placeholder/decimal.png' },
    { name: 'Ableton', logoUrl: '/placeholder/ableton.png' },
    { name: 'Focusrite', logoUrl: '/placeholder/focusrite.png' },
    { name: 'Sennheiser', logoUrl: '/placeholder/sennheiser.png' },
  ],

  industryTrends: [
    { stat: '$80M+', label: 'Kenyan Music Industry Value', description: 'Kenya\u2019s music industry continues to grow as streaming platforms expand and local artists gain international audiences.' },
    { stat: '300%', label: 'Growth in African Streaming', description: 'Music streaming in Africa has grown by 300% in recent years, with Kenya among the top markets on the continent.' },
    { stat: '5K+', label: 'Audio Production Roles Annually', description: 'New roles in music production, sound engineering, and audio post-production are created each year across East Africa.' },
  ],

  resources: [
    { title: 'How to Start a Music Production Career in Kenya', category: 'Career', imageUrl: '/placeholder/blog-music1.jpg', link: '/blog/music-production-career-kenya' },
    { title: 'Home Studio Setup Guide on a Budget', category: 'Gear', imageUrl: '/placeholder/blog-music2.jpg', link: '/blog/home-studio-budget' },
    { title: 'Understanding Mixing vs Mastering', category: 'Guide', imageUrl: '/placeholder/blog-music3.jpg', link: '/blog/mixing-vs-mastering' },
  ],
}
