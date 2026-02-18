#!/usr/bin/env node

/**
 * Consolidated Page Migration to Contentful
 *
 * Instead of creating 13 separate content types for singleton pages,
 * this script creates a single `pageContent` content type with a JSON
 * `content` field, plus shared content types (teamMember, alumniProfile, pageFaq).
 *
 * This approach fits within Contentful's 25 content type limit.
 *
 * Creates:
 *   - `pageContent` content type (shared by all singleton pages)
 *   - `teamMember` content type (shared by about + work-with-us)
 *   - `alumniProfile` content type (for alumni page)
 *   - `pageFaq` content type (for FAQ page)
 *   - All page entries + seed data
 *
 * Usage:
 *   node -r dotenv/config scripts/contentful/migrate-all-pages.js
 */

const { ensureContentType, ensureEntry, ensureEntries, localize } = require('./utils/contentful-helpers')

// =============================================
// 1. SHARED CONTENT TYPES
// =============================================

async function createPageContentType() {
  return ensureContentType('pageContent', {
    name: 'Page Content',
    description: 'Singleton page content for static pages (about, alumni, impact, etc.)',
    displayField: 'internalName',
    fields: [
      { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true, validations: [{ unique: true }] },
      { id: 'pageType', name: 'Page Type', type: 'Symbol', required: true, validations: [{ in: [
        'about', 'alumni', 'impact', 'accreditation', 'work-with-us',
        'financial-planning', 'student-showcase', 'student-support',
        'student-life', 'fellowship', 'academic-pathways', 'accommodation'
      ] }] },
      { id: 'content', name: 'Page Content (JSON)', type: 'Object', required: true },
      { id: 'seoTitle', name: 'SEO Title', type: 'Symbol', required: false, validations: [{ size: { max: 120 } }] },
      { id: 'seoDescription', name: 'SEO Description', type: 'Symbol', required: false, validations: [{ size: { max: 300 } }] },
      { id: 'seoKeywords', name: 'SEO Keywords', type: 'Symbol', required: false, validations: [{ size: { max: 300 } }] }
    ]
  })
}

async function createTeamMemberType() {
  return ensureContentType('teamMember', {
    name: 'Team Member',
    description: 'Shared content type for founders, academic staff, and faculty',
    displayField: 'name',
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true, validations: [{ unique: true }] },
      { id: 'role', name: 'Role / Title', type: 'Symbol', required: true },
      { id: 'category', name: 'Category', type: 'Symbol', required: true, validations: [{ in: ['founder', 'academic', 'faculty', 'board', 'staff'] }] },
      { id: 'description', name: 'Short Bio', type: 'Text', required: false, validations: [{ size: { max: 500 } }] },
      { id: 'image', name: 'Photo URL', type: 'Symbol', required: false },
      { id: 'roleColor', name: 'Role Badge Color', type: 'Symbol', required: false },
      { id: 'sortOrder', name: 'Sort Order', type: 'Integer', required: false }
    ]
  })
}

async function createAlumniProfileType() {
  return ensureContentType('alumniProfile', {
    name: 'Alumni Profile',
    description: 'Shared content type for featured alumni',
    displayField: 'name',
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true, validations: [{ unique: true }] },
      { id: 'role', name: 'Role / Position', type: 'Symbol', required: true },
      { id: 'programme', name: 'Programme', type: 'Symbol', required: false },
      { id: 'quote', name: 'Testimonial Quote', type: 'Text', required: false },
      { id: 'image', name: 'Photo URL', type: 'Symbol', required: false },
      { id: 'sortOrder', name: 'Sort Order', type: 'Integer', required: false }
    ]
  })
}

async function createPageFaqType() {
  return ensureContentType('pageFaq', {
    name: 'Page FAQ',
    description: 'FAQ entries for the main FAQ page, grouped by category',
    displayField: 'question',
    fields: [
      { id: 'question', name: 'Question', type: 'Symbol', required: true, validations: [{ size: { max: 300 } }] },
      { id: 'answer', name: 'Answer', type: 'Text', required: true, validations: [{ size: { max: 2000 } }] },
      { id: 'category', name: 'Category', type: 'Symbol', required: true, validations: [{ in: ['General', 'Admissions', 'Fees & Payment', 'Student Life', 'Programmes'] }] },
      { id: 'sortOrder', name: 'Sort Order', type: 'Integer', required: false }
    ]
  })
}

// =============================================
// 2. SEED DATA - TEAM MEMBERS
// =============================================

const teamMemberSeeds = [
  localize({ name: 'Laila Macharia', role: 'Co-Founder and Chair', category: 'founder', description: 'Visionary leader driving ADMI\u2019s strategic growth and Pan-African expansion.', image: 'https://images.unsplash.com/photo-1580867398114-a567342074de?auto=format&fit=crop&w=600&q=80', sortOrder: 1 }),
  localize({ name: 'Wilfred Kiumi', role: 'Co-Founder', category: 'founder', description: 'Pioneering creative education in Africa with deep industry expertise and passion.', image: 'https://images.unsplash.com/photo-1731377209672-c7606ba26c25?auto=format&fit=crop&w=600&q=80', sortOrder: 2 }),
  localize({ name: 'Carolyne Sila', role: 'Head of School', category: 'academic', description: 'Leading academic excellence and curriculum development across all creative media programmes.', image: 'https://images.unsplash.com/photo-1616409000123-b36064d90ed4?auto=format&fit=crop&w=600&q=80', roleColor: '#0A3D3D', sortOrder: 3 }),
  localize({ name: 'Raji Ilangovan', role: 'Student Programs', category: 'academic', description: 'Ensuring students have the support, resources, and mentorship to thrive from day one to graduation.', image: 'https://images.unsplash.com/photo-1624354865933-4b9bdb3cb338?auto=format&fit=crop&w=600&q=80', roleColor: '#EF7B2E', sortOrder: 4 }),
  localize({ name: 'Ciku Munuku', role: 'Faculty Affairs', category: 'academic', description: 'Managing faculty development, industry partnerships, and ensuring teaching quality across departments.', image: 'https://images.unsplash.com/photo-1688841167159-bed18ddaeb44?auto=format&fit=crop&w=600&q=80', roleColor: '#C1272D', sortOrder: 5 })
]

// =============================================
// 3. SEED DATA - ALUMNI PROFILES
// =============================================

const alumniProfileSeeds = [
  localize({ name: 'Grace Muthoni', role: 'Senior Editor at NTV Kenya', programme: 'Film Production Diploma, Class of 2022', quote: 'The hands-on training at ADMI gave me the confidence to walk into a professional newsroom and deliver from day one. I was editing broadcast-ready packages within my first month at NTV.', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80', sortOrder: 1 }),
  localize({ name: 'David Kimani', role: 'Creative Director at Ogilvy Africa', programme: 'Graphic Design Diploma, Class of 2021', quote: 'My portfolio coming out of ADMI was stronger than what most agencies see from candidates with years of experience. The faculty pushed us to think beyond templates and create original work.', image: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?auto=format&fit=crop&w=800&q=80', sortOrder: 2 }),
  localize({ name: 'Wanjiku Njeri', role: 'Sound Engineer at Ogopa DJs', programme: 'Sound Engineering Diploma, Class of 2023', quote: 'ADMI connected me directly to the industry. By the time I graduated, I already had freelance clients and a clear path into one of Kenya\u2019s biggest music production houses.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80', sortOrder: 3 })
]

// =============================================
// 4. SEED DATA - PAGE SINGLETONS
// =============================================

const PAGE_DATA = {
  about: {
    internalName: 'About Page',
    pageType: 'about',
    content: {
      stats: [
        { value: '15+', label: 'Years of Excellence', color: '#8EBFB0' },
        { value: '4,500+', label: 'Graduates', color: '#ffffff' },
        { value: '10+', label: 'Countries Represented', color: '#EF7B2E' },
        { value: '500+', label: 'Industry Partners', color: '#C1272D' }
      ],
      values: [
        { title: 'Global', desc: 'International education benchmarks with curriculum aligned to EU and Kenyan standards.', color: '#C1272D', bg: '#FFF0F0' },
        { title: 'Practical', desc: 'Learn-and-Work model combining production training with real industry projects.', color: '#0A3D3D', bg: '#EEF9F7' },
        { title: 'Digital', desc: 'Paperless campus with e-learning tools and industry-standard digital workflows.', color: '#EF7B2E', bg: '#FFF8F0' },
        { title: 'Value-Driven', desc: 'Ethics, psycho-social support, and academic counselling woven into every programme.', color: '#1a1a4e', bg: '#EEF0FF' },
        { title: 'Transformational', desc: 'A defining experience that builds creative professionals ready to shape industries.', color: '#0A3D3D', bg: '#EEFFF9' }
      ],
      timeline: [
        { year: '2011', title: 'The Beginning', desc: 'Wilfred Kiumi establishes JFTA with a vision to build Africa\u2019s creative media talent pipeline.', color: '#C1272D', border: '#C1272D44' },
        { year: '2014', title: 'First Campus', desc: 'ADMI\u2019s first dedicated campus opens in Nairobi CBD with purpose-built studios and labs.', color: '#8EBFB0', border: '#0A3D3D44' },
        { year: '2015', title: 'Rebranded to ADMI', desc: 'JFTA rebrands to Africa Digital Media Institute with 6 core programmes launched.', color: '#EF7B2E', border: '#EF7B2E44' },
        { year: '2018', title: '1,000th Student', desc: 'Major milestone as ADMI enrols its 1,000th student from across Africa and beyond.', color: '#ffffff', border: '#ffffff22' },
        { year: '2019', title: '$1M+ Revenue, Rubika Partnership', desc: 'Crossed $1M annual revenue, secured AFD $1M investment, and partnered with Rubika International.', color: '#C1272D', border: '#C1272D44' },
        { year: '2022', title: '10th Anniversary', desc: 'A decade of impact celebrated with 3,000+ alumni and expanded programme offerings.', color: '#8EBFB0', border: '#8EBFB044' },
        { year: '2023', title: 'GOYN and Google.org', desc: 'Partnered with Global Opportunity Youth Network and Google.org to scale youth employment.', color: '#EF7B2E', border: '#EF7B2E44' },
        { year: '2026', title: 'Pan-African Vision', desc: 'EU-accredited degree pathways, Top 10 SME recognition, and 4,500+ graduates shaping industries.', color: '#ffffff', border: 'transparent', highlight: true }
      ],
      facilities: [
        { name: 'Film & Music Studios', desc: 'Soundproofed recording and filming stages', image: 'https://images.unsplash.com/photo-1659083475067-8ab6af362082?auto=format&fit=crop&w=800&q=80', wide: true },
        { name: 'Mac & PC Labs', desc: 'Industry-standard software and hardware', image: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?auto=format&fit=crop&w=800&q=80', wide: true },
        { name: 'Equipment Vault', desc: 'Cameras, lenses, audio gear', image: 'https://images.unsplash.com/photo-1769699167687-540cce99f744?auto=format&fit=crop&w=600&q=80' },
        { name: 'Creative Spaces', desc: 'Collaborative work areas', image: 'https://images.unsplash.com/photo-1765812515298-f299f9e29b68?auto=format&fit=crop&w=600&q=80' },
        { name: 'Resource Library', desc: 'Books, journals, and digital archives', image: 'https://images.unsplash.com/photo-1760035989402-f4b2661a05fd?auto=format&fit=crop&w=600&q=80' }
      ],
      partners: [
        { name: 'Woolf University', desc: 'EU-accredited degree pathways with ECTS credits', bg: '#EEF9F7' },
        { name: 'TVETA Kenya', desc: 'Registered with Kenya\u2019s TVET Authority', bg: '#FFF0F0' },
        { name: 'Rubika International', desc: 'Global creative arts network for animation and gaming', bg: '#EEF0FF' },
        { name: 'Google.org and GOYN', desc: 'Youth employment and digital skills partnerships', bg: '#FFF8F0' }
      ]
    },
    seoTitle: 'About ADMI | Africa Digital Media Institute',
    seoDescription: 'Since 2011, ADMI has pioneered creative media education in East Africa. Learn about our story, mission, leadership, campus, and accreditation.'
  },

  alumni: {
    internalName: 'Alumni Page',
    pageType: 'alumni',
    content: {
      stats: [
        { value: '4,000+', label: 'Graduates' },
        { value: '87%', label: 'Employment Rate' },
        { value: '15+', label: 'Countries Reached' },
        { value: '200+', label: 'Partner Companies' }
      ],
      companyRows: [
        { names: ['NTV Kenya', 'Ogilvy Africa', 'MSC Cruises', 'Ogopa DJs', 'Sensorflick'] },
        { names: ['Citizen TV', 'Scanad Kenya', 'inABLE', 'BBC Africa'] }
      ],
      networkBenefits: [
        { icon: 'briefcase', title: 'Career Support', desc: 'Access job boards, CV reviews, and career coaching exclusively for ADMI graduates. Our careers team works with 200+ partner companies to match alumni with opportunities.' },
        { icon: 'users', title: 'Networking Events', desc: 'Quarterly meetups, industry mixers, and annual homecoming events that keep you connected to fellow graduates and industry leaders across East Africa.' },
        { icon: 'heart-handshake', title: 'Mentorship Programme', desc: 'Give back by mentoring current students or connect with senior alumni for guidance. Our structured mentorship programme pairs graduates across disciplines and experience levels.' },
        { icon: 'speakerphone', title: 'Alumni Spotlight', desc: 'Get featured on our platforms and amplify your work. From social media takeovers to campus talks, we celebrate alumni achievements and help you build your public profile.' }
      ]
    },
    seoTitle: 'Our Alumni | Africa Digital Media Institute',
    seoDescription: 'Meet 4,000+ ADMI graduates building Africa\u2019s creative future. Discover alumni stories, career outcomes, and the network that connects creative professionals.'
  },

  impact: {
    internalName: 'Impact Page',
    pageType: 'impact',
    content: {
      heroStats: [
        { value: '4,500+', label: 'Students & Alumni', color: '#8EBFB0' },
        { value: '88%', label: 'Employment Rate', color: '#ffffff' },
        { value: '3x', label: 'Income Growth by Year 3', color: '#EF7B2E' },
        { value: '15+', label: 'Countries Reached', color: '#C1272D' }
      ],
      incomeYearCards: [
        { badge: 'Year 1 \u2014 The Hustle', badgeBg: '#FFF0F0', badgeColor: '#C1272D', value: 'KES 10-20K', subtitle: 'monthly', description: 'Building portfolios, taking on freelance gigs, and gaining real-world experience. The foundation years.', bgColor: '#f9f9f9' },
        { badge: 'Year 2 \u2014 Building Momentum', badgeBg: '#FFF8F0', badgeColor: '#EF7B2E', value: 'KES 25-50K', subtitle: 'monthly', description: 'Reputation growing, clients returning, and specialisation kicking in. Income doubles.', bgColor: '#f9f9f9' },
        { badge: 'Year 3 \u2014 Breaking Through', badgeBg: 'rgba(255,255,255,0.12)', badgeColor: '#8EBFB0', value: 'KES 50-100K+', subtitle: 'monthly', description: 'Industry leaders, business owners, and in-demand professionals. 65-230% above industry benchmarks.', bgColor: '#0A3D3D' }
      ],
      programmeOutcomes: [
        { name: 'Film & TV Production', value: 'KES 80-90K+', color: '#8EBFB0', barWidth: '75%', note: '85% employed within 6 months' },
        { name: 'Music Production', value: 'KES 80-100K+', color: '#EF7B2E', barWidth: '80%', note: 'Highest earning potential among all programmes' },
        { name: 'Multimedia', value: 'KES 80-120K+', color: '#C1272D', barWidth: '85%', note: 'Most versatile career options' },
        { name: 'Sound Engineering', value: 'KES 60-80K+', color: '#8EBFB0', barWidth: '65%', note: 'High demand in live events and studios' },
        { name: 'Graphic Design', value: 'KES 50-70K+', color: '#EF7B2E', barWidth: '55%', note: 'Strong freelance and agency demand' },
        { name: 'Animation', value: 'KES 50-70K+', color: '#C1272D', barWidth: '55%', note: 'Growing international remote opportunities' }
      ],
      companyPills: [
        { name: 'NTV Kenya' }, { name: 'Ogilvy Africa' }, { name: 'MSC Cruises' },
        { name: 'Safaricom' }, { name: 'Ogopa DJs' }, { name: 'Nation Media' },
        { name: 'WPP Scangroup' }, { name: 'Showmax' }, { name: 'Citizen TV' },
        { name: 'Weza Tele' }, { name: 'Netflix Africa' }, { name: 'Tubidy Studios' }
      ],
      alumniStories: [
        { image: 'https://images.unsplash.com/photo-1615453261261-77494754424e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80', name: 'Grace Muthoni', role: 'Senior Editor, NTV Kenya', roleColor: '#8EBFB0', quote: '\u201cADMI gave me the technical skills and industry connections that launched my career in broadcast journalism.\u201d', meta: 'Film Production Diploma, Class of 2022' },
        { image: 'https://images.unsplash.com/photo-1622295023825-6e319464b810?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80', name: 'David Kimani', role: 'Creative Director, Ogilvy Africa', roleColor: '#EF7B2E', quote: '\u201cThe hands-on approach at ADMI prepared me for real agency life. Within 3 years, I was leading creative campaigns for major brands.\u201d', meta: 'Graphic Design Diploma, Class of 2021' },
        { image: 'https://images.unsplash.com/photo-1685634115415-4fd59062a34e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80', name: 'Wanjiku Njeri', role: 'Sound Engineer, Ogopa DJs', roleColor: '#C1272D', quote: '\u201cFrom student projects to mixing tracks for top Kenyan artists. ADMI\u2019s studio facilities and mentorship made all the difference.\u201d', meta: 'Sound Engineering Diploma, Class of 2023' }
      ],
      methodologyStats: [
        { value: '700+', label: 'Emails Sent', description: 'Across all six diploma programmes' },
        { value: '110', label: 'Phone Follow-ups', description: 'Personal calls for deeper insights' },
        { value: '43', label: 'Detailed Responses', description: 'With verified income data' },
        { value: '8', label: 'Employer Insights', description: 'Industry partner hiring feedback' }
      ],
      ctaBottomStats: [
        { value: '4.8/5', label: 'Student Satisfaction' },
        { value: '500+', label: 'Industry Partners' },
        { value: 'Since 2011', label: 'Shaping Creative Careers' }
      ]
    },
    seoTitle: 'Our Impact | ADMI - Transforming Lives Through Creative Education',
    seoDescription: 'Discover how ADMI graduates achieve 3x income growth by Year 3. 88% employment rate, 4,500+ alumni across 15+ countries.'
  },

  accreditation: {
    internalName: 'Accreditation Page',
    pageType: 'accreditation',
    content: {
      accreditations: [
        { title: 'Woolf University', subtitle: 'EU-Accredited Degree Partner', description: 'Woolf is an EU-accredited, degree-granting institution. Through our partnership, ADMI diploma graduates can earn ECTS credits recognised across the European Higher Education Area.', icon: 'school', borderColor: '#8EBFB0', accentColor: '#0A3D3D', tags: ['ECTS Credits', 'EU Accredited', 'International'] },
        { title: 'TVETA Kenya', subtitle: 'National Technical Education Authority', description: "Registered with Kenya's Technical and Vocational Education and Training Authority. All programmes meet national quality standards and comply with KNQF requirements.", icon: 'shield-check', borderColor: '#C1272D', accentColor: '#C1272D', tags: ['KNQF Compliant', 'National Recognition'] },
        { title: 'Pearson BTEC', subtitle: 'Globally Recognised Professional Certification', description: 'Professional certificates carry Pearson BTEC certification, globally recognised by employers and universities as a mark of vocational excellence.', icon: 'award', borderColor: '#EF7B2E', accentColor: '#EF7B2E', tags: ['Employer Recognised', 'Global Standard'] }
      ],
      qualityStandards: [
        { title: 'ECTS Credits', description: 'European Credit Transfer System ensures your qualifications are portable and recognised across the continent.', icon: 'certificate', iconColor: '#8EBFB0' },
        { title: 'KNQF Level Mapping', description: 'Each programme maps to specific KNQF levels, ensuring alignment with national education standards and employer expectations.', icon: 'layers-subtract', iconColor: '#0A3D3D' },
        { title: 'Quality Assurance', description: 'Rigorous internal and external quality processes ensure curriculum relevance, teaching excellence, and student success.', icon: 'clipboard-check', iconColor: '#C1272D' },
        { title: 'Industry Advisory Board', description: 'Leading creative industry professionals review and guide programme content to ensure graduates are career-ready.', icon: 'users', iconColor: '#EF7B2E' }
      ],
      benefits: [
        { title: 'International Recognition', description: 'Your qualifications are recognised across Europe and beyond through ECTS credit alignment.', icon: 'globe', iconColor: '#8EBFB0' },
        { title: 'Credit Transfer', description: 'Seamlessly transfer credits between ADMI programmes and towards international degree pathways.', icon: 'arrows-exchange', iconColor: '#0A3D3D' },
        { title: 'Employer Confidence', description: 'Accredited qualifications give employers confidence in the standards and rigour of your education.', icon: 'briefcase', iconColor: '#C1272D' },
        { title: 'Pathway to Degrees', description: 'Progress from certificate to diploma to degree through a structured, credit-bearing academic pathway.', icon: 'trending-up', iconColor: '#EF7B2E' },
        { title: 'Government-Registered Programmes', description: 'All programmes are registered with TVETA Kenya, meeting the national standards for technical and vocational education.', icon: 'checklist', iconColor: '#0A3D3D' },
        { title: 'Student Protection Standards', description: 'Robust quality frameworks safeguard your learning experience with regular audits and transparent reporting.', icon: 'shield-check', iconColor: '#C1272D' }
      ]
    },
    seoTitle: 'Accreditation',
    seoDescription: 'ADMI holds accreditation from Woolf University (EU-accredited ECTS credits), TVETA Kenya, and Pearson BTEC.'
  },

  'work-with-us': {
    internalName: 'Work With Us Page',
    pageType: 'work-with-us',
    content: {
      faculty: [
        { name: 'Prof. Michael Otieno', title: 'Head of Film & TV', description: 'Award-winning filmmaker with over 15 years of experience in East African cinema and broadcast television.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
        { name: 'Sarah Kamau', title: 'Lead, Digital Design', description: 'Former creative director at a leading Nairobi agency, specialising in brand identity and UX for African markets.', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80' },
        { name: 'James Mwangi', title: 'Director, Music Production', description: 'Grammy-nominated producer and sound engineer who has shaped the Kenyan music scene for over a decade.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' }
      ],
      openings: [
        { title: 'Film Production Lecturer', type: 'Full-time', location: 'Nairobi', posted: 'Posted Jan 2026', description: 'Deliver practical modules across screenwriting, cinematography, and post-production workflows for diploma learners.' },
        { title: 'Motion Graphics Instructor', type: 'Full-time / Contract', location: 'Nairobi', posted: 'Posted Jan 2026', description: 'Teach motion design principles using After Effects, Cinema 4D, and emerging real-time tools.' },
        { title: 'Graphic Design Instructor', type: 'Full-time', location: 'Hybrid', posted: 'Posted Feb 2026', description: 'Guide learners through brand identity, editorial layout, and digital illustration projects.' },
        { title: 'Sound Engineering Lab Technician', type: 'Full-time', location: 'Nairobi', posted: 'Posted Feb 2026', description: 'Maintain studio equipment, support practical sessions, and ensure lab readiness for audio production classes.' }
      ],
      benefits: [
        { icon: 'bulb', title: 'Creative Environment', description: 'Work alongside industry professionals in state-of-the-art studios and labs.' },
        { icon: 'rocket', title: 'Impact-Driven', description: 'Shape the future of creative education across East Africa.' },
        { icon: 'briefcase', title: 'Professional Growth', description: 'Access to industry events, workshops, and continuous learning opportunities.' },
        { icon: 'heart', title: 'Strong Community', description: 'Join a diverse team of passionate educators and creatives.' }
      ],
      teamMembers: [
        { name: 'Angela Ndegwa', role: 'Director of Admissions', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' },
        { name: 'David Ochieng', role: 'Head of Student Affairs', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
        { name: 'Fatima Hassan', role: 'HR & People Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
        { name: 'Brian Kiplagat', role: 'Operations Manager', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    seoTitle: 'Work With Us',
    seoDescription: "Join ADMI's award-winning faculty and team. Explore open positions in film, design, music production, and creative education in Nairobi, Kenya.",
    seoKeywords: 'ADMI careers, work at ADMI, creative education jobs, teaching jobs Nairobi'
  },

  'financial-planning': {
    internalName: 'Financial Planning Page',
    pageType: 'financial-planning',
    content: {
      feeCards: [
        { title: 'Diploma Programmes', price: 'From KES 15,000/month', duration: '18 months', badge: 'EU-Accredited via Woolf', borderColor: '#C1272D', features: ['Woolf University ECTS credits', 'Full studio access', 'Industry mentorship', 'Portfolio development'] },
        { title: 'Professional Certificates', price: 'From KES 8,500/month', duration: '6 months', badge: 'In-person / Online', borderColor: '#0A3D3D', features: ['Pearson BTEC certified', 'Flexible scheduling', 'Industry projects', 'Career support'] },
        { title: 'Foundation Certificates', price: 'From KES 5,000/month', duration: '3 months', badge: 'In-person \u00b7 ADMI Certified', borderColor: '#EF7B2E', features: ['Beginner-friendly', 'Hands-on training', 'Portfolio starter', 'Pathway to Professional'] },
        { title: 'Bachelor\u2019s Programme', price: 'Contact for Pricing', duration: '1\u20132 years', badge: 'Rubika International', borderColor: '#1a1a4e', features: ['International degree', 'Exchange opportunities', 'Advanced specialisation', 'Global network'] }
      ],
      paymentPlans: [
        { title: 'Monthly Instalments', subtitle: 'From KES 5,000/mo', description: 'Spread your fees across manageable monthly payments throughout each semester.', tag: 'Most Popular', tagColor: '#C1272D' },
        { title: 'Per Semester', subtitle: 'Save 5%', description: 'Pay your full semester fees upfront and enjoy a 5% discount.' },
        { title: 'Full Payment', subtitle: 'Save 10%', description: 'Settle your entire programme fee at enrolment and receive the maximum 10% discount.', tag: 'Best Value', tagColor: '#0A3D3D' }
      ],
      scholarships: [
        { title: 'Merit-Based Scholarships', description: 'Outstanding academic achievers and creative talents can receive up to 50% tuition coverage.', coverage: 'Up to 50% coverage', bgColor: '#FFF0F0', iconColor: '#C1272D', icon: 'star' },
        { title: 'Need-Based Financial Aid', description: 'ADMI is committed to making creative education accessible. Need-based aid is available for students who demonstrate financial need.', coverage: 'Assessed individually', bgColor: '#EEF9F7', iconColor: '#0A3D3D', icon: 'heart' },
        { title: 'Industry Partner Sponsorships', description: 'Leading creative studios and agencies sponsor talented students through ADMI partnership programmes.', coverage: 'Varies by partner', bgColor: '#FFF8F0', iconColor: '#EF7B2E', icon: 'briefcase' }
      ],
      faqItems: [
        { q: 'What is included in the tuition fees?', a: 'Tuition fees cover all teaching and instruction, access to studio facilities and equipment, learning materials and software licences, portfolio development support, and career services.' },
        { q: 'Can I switch payment plans during my programme?', a: 'Yes, you can request to change your payment plan at the start of a new semester. Contact the Finance Office at least two weeks before the semester begins.' },
        { q: 'Are there any hidden fees or additional costs?', a: 'ADMI is committed to full transparency. Your fee structure document outlines every cost associated with your programme.' },
        { q: 'How do I apply for a scholarship?', a: 'Scholarship applications are submitted alongside your programme application. You will need academic transcripts, a personal statement, and a creative portfolio.' },
        { q: 'What happens if I miss a payment?', a: 'Contact the Finance Office as early as possible. ADMI offers a grace period and can work with you to arrange a revised payment schedule.' },
        { q: 'Is there a refund policy?', a: 'Yes. Full refunds within the first two weeks minus an administrative fee. Partial refunds within the first month. After the first month, fees are non-refundable.' }
      ]
    },
    seoTitle: 'Financial Planning',
    seoDescription: 'Transparent fee structures, flexible payment plans, and scholarship opportunities at ADMI.',
    seoKeywords: 'ADMI fees, tuition fees Kenya, creative education cost, ADMI scholarships, payment plans'
  },

  'student-showcase': {
    internalName: 'Student Showcase Page',
    pageType: 'student-showcase',
    content: {
      featuredProjects: [
        { title: 'Shifting Horizons', student: 'Achieng O.', programme: 'Film Production Diploma', type: 'Short Documentary', image: 'https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=800&q=80' },
        { title: 'Urban Pulse', student: 'Brian K.', programme: 'Graphic Design', type: 'Brand Campaign', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80' },
        { title: 'Echoes of Tomorrow', student: 'Maureen T.', programme: 'Animation', type: '3D Short Film', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80' }
      ],
      disciplineSections: [
        { title: 'Film & Video Production', bg: '#ffffff', projects: [
          { title: 'Shifting Horizons', student: 'Achieng O.', type: 'Short Documentary', image: 'https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=600&q=80' },
          { title: 'City Lights', student: 'Kevin M.', type: 'Music Video', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80' },
          { title: 'The Last Mile', student: 'Faith W.', type: 'Short Film', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80' }
        ]},
        { title: 'Animation & VFX', bg: '#F9F9F9', projects: [
          { title: 'Dreamscape', student: 'Maureen T.', type: '3D Animation', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' },
          { title: 'Wireframe World', student: 'James K.', type: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80' },
          { title: 'Neon Genesis', student: 'Lucy A.', type: 'VFX Reel', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' }
        ]},
        { title: 'Graphic Design & Branding', bg: '#ffffff', projects: [
          { title: 'Urban Pulse', student: 'Brian K.', type: 'Brand Identity', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80' },
          { title: 'Savannah Studio', student: 'Grace N.', type: 'Logo & Packaging', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80' },
          { title: 'Craft & Co', student: 'Dennis O.', type: 'Brand Campaign', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80' }
        ]},
        { title: 'Music & Audio Production', bg: '#F9F9F9', projects: [
          { title: 'Bassline Theory', student: 'Samuel M.', type: 'EP Production', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80' },
          { title: 'Sound of Nairobi', student: 'Diana K.', type: 'Podcast Series', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80' },
          { title: 'Studio Sessions', student: 'Peter W.', type: 'Sound Design', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80' }
        ]}
      ],
      studentVoices: [
        { quote: 'My final-year project became my first paid client campaign two months before graduation.', name: 'Achieng O.', discipline: 'Graphic Design' },
        { quote: 'We pitched to a real brand, got feedback from agency creatives, and shipped the campaign live.', name: 'Brian K.', discipline: 'Film Production' },
        { quote: 'Mentors treated us like studio teams, so we left with confidence and a body of work we are proud of.', name: 'Maureen T.', discipline: 'Animation' }
      ]
    },
    seoTitle: 'Student Showcase | ADMI',
    seoDescription: 'Explore film, animation, design and audio work produced by ADMI students through hybrid learning.'
  },

  'student-support': {
    internalName: 'Student Support Page',
    pageType: 'student-support',
    content: {
      supportTabs: [
        { key: 'academic', label: 'Academic', icon: 'school', color: '#0A3D3D', title: 'Academic Advising', desc: 'Advisors help plan online and on-campus modules, deadlines, and interventions.', cards: [
          { title: 'Module Planning', desc: 'Get personalised guidance on selecting modules that align with your goals.' },
          { title: 'Progress Tracking', desc: 'Regular check-ins to monitor your academic progress and address challenges early.' },
          { title: 'Study Skills', desc: 'Workshops on time management, note-taking, research methods, and exam prep.' }
        ]},
        { key: 'wellness', label: 'Wellness', icon: 'heart-handshake', color: '#C1272D', title: 'Wellness Support', desc: 'Counselling and wellbeing support available virtually and on campus.', cards: [
          { title: 'Counselling', desc: 'Private sessions with certified counsellors for personal and academic challenges.' },
          { title: 'Peer Support', desc: 'Student-led support groups and mentoring programmes for community wellbeing.' },
          { title: 'Crisis Support', desc: 'Immediate support and referral pathways for urgent wellbeing concerns.' }
        ]},
        { key: 'career', label: 'Career', icon: 'briefcase', color: '#EF7B2E', title: 'Career Services', desc: 'Career coaching across virtual sessions, portfolio reviews, and campus showcases.', cards: [
          { title: 'Portfolio Reviews', desc: 'One-on-one sessions with industry professionals to strengthen your portfolio.' },
          { title: 'Interview Prep', desc: 'Mock interviews, CV workshops, and employer introduction sessions.' },
          { title: 'Internship Matching', desc: 'Direct connections to internship opportunities with creative industry partners.' }
        ]},
        { key: 'financial', label: 'Financial Aid', icon: 'cash', color: '#8EBFB0', title: 'Funding & Financial Aid', desc: 'Flexible funding guidance for blended schedules and staged tuition.', cards: [
          { title: 'Payment Plans', desc: 'Spread your fees across the duration of your programme with no interest charges.' },
          { title: 'Scholarships', desc: 'Merit-based and need-based scholarship opportunities for qualifying students.' },
          { title: 'Financial Counselling', desc: 'One-on-one sessions to plan your education finances and explore aid options.' }
        ]},
        { key: 'learning', label: 'Learning', icon: 'book', color: '#0A3D3D', title: 'Learning Support', desc: 'Tutoring, software support, and study coaching for hybrid coursework.', cards: [
          { title: 'Tutoring', desc: 'Peer tutoring and faculty office hours for additional academic support.' },
          { title: 'Software Training', desc: 'Workshops on industry-standard tools: Adobe Suite, DaVinci Resolve, and more.' },
          { title: 'Study Coaching', desc: 'Personalised coaching to develop effective study habits and techniques.' }
        ]},
        { key: 'accessibility', label: 'Accessibility', icon: 'accessible', color: '#C1272D', title: 'Accessibility Support', desc: 'Inclusive accommodations and assistive support for online and campus delivery.', cards: [
          { title: 'Accommodations', desc: 'Tailored learning accommodations for students with disabilities or learning differences.' },
          { title: 'Assistive Tech', desc: 'Access to assistive technologies and adaptive equipment in labs and studios.' },
          { title: 'Inclusive Design', desc: 'All learning materials designed with accessibility standards in mind.' }
        ]}
      ],
      feeCards: [
        { badge: 'DIPLOMA', badgeBg: '#FFF0F0', badgeColor: '#C1272D', title: 'Diploma Programmes', price: 'From KES 15,000/month', priceColor: '#C1272D', details: '18 months \u2022 In-person\nEU-accredited via Woolf University\nFlexible payment plans available', btnBg: '#C1272D' },
        { badge: 'PROFESSIONAL', badgeBg: '#EEF9F7', badgeColor: '#0A3D3D', title: 'Professional Certificates', price: 'From KES 8,500/month', priceColor: '#0A3D3D', details: '6 months \u2022 In-person / Online\nADMI & Woolf accredited\nInstalment options available', btnBg: '#0A3D3D' },
        { badge: 'FOUNDATION', badgeBg: '#FFF8F0', badgeColor: '#EF7B2E', title: 'Foundation Certificates', price: 'From KES 5,000/month', priceColor: '#EF7B2E', details: '3 months \u2022 In-person\nADMI Certified\nPay-as-you-go option', btnBg: '#EF7B2E' },
        { badge: 'RUBIKA', badgeBg: '#EEF0FF', badgeColor: '#1a1a4e', title: 'Rubika Programmes', price: 'Contact for pricing', priceColor: '#1a1a4e', details: '1\u20132 years \u2022 In-person\nRubika International accredited\nScholarship options available', btnBg: '#1a1a4e' }
      ],
      helpDesks: [
        { title: 'Student Desk', desc: 'Walk in: Mon-Fri, 8:00-5:00\nEmail: support@admi.ac.ke' },
        { title: 'Counselling Office', desc: 'Private sessions with certified counsellors.\nBook via portal in under 2 minutes.' },
        { title: 'Career Office', desc: 'CV clinic, interview prep, and internship matching with industry partners.' }
      ]
    },
    seoTitle: 'Student Support | ADMI',
    seoDescription: 'Academic, financial, wellness, and career support designed for learner success at ADMI.'
  },

  'student-life': {
    internalName: 'Student Life Page',
    pageType: 'student-life',
    content: {
      hubCards: [
        { icon: 'palette', title: 'Student Showcase', desc: 'Browse portfolios, films, animations, and design projects from current students and recent graduates.', link: '/student-showcase', linkText: 'Explore Showcase', image: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?auto=format&fit=crop&w=800&q=80' },
        { icon: 'heart-handshake', title: 'Student Support', desc: 'Academic advising, wellness resources, career coaching, and accessibility services \u2014 all in one place.', link: '/student-support', linkText: 'Get Support', image: 'https://images.unsplash.com/photo-1571055931484-22dce9d6c510?auto=format&fit=crop&w=800&q=80' },
        { icon: 'calculator', title: 'Financial Planning & Fees', desc: 'Fee structures, payment plans, scholarship opportunities, and financial aid options for every programme.', link: '/financial-planning', linkText: 'View Fees & Aid', image: 'https://images.unsplash.com/photo-1656049471454-ff3c59812741?auto=format&fit=crop&w=800&q=80' }
      ],
      campusFeatures: [
        { icon: 'movie', title: 'Studio Access', desc: 'Professional film, animation, audio, and design studios available for student projects and practice sessions.' },
        { icon: 'users', title: 'Community Events', desc: 'Regular showcases, hackathons, film screenings, and networking events connecting students with industry professionals.' },
        { icon: 'briefcase', title: 'Career Services', desc: 'CV workshops, interview prep, portfolio reviews, and direct introductions to employers across creative industries.' },
        { icon: 'wifi', title: 'Hybrid Learning', desc: 'Flexible online and on-campus learning model with digital tools, virtual studios, and remote collaboration support.' }
      ]
    },
    seoTitle: 'Student Life | ADMI',
    seoDescription: 'From creative studios to career support \u2014 everything you need to thrive as an ADMI student.'
  },

  fellowship: {
    internalName: 'Fellowship Page',
    pageType: 'fellowship',
    content: {
      benefits: [
        { icon: 'users', iconColor: '#0A3D3D', title: 'Mentorship', description: 'One-on-one guidance from industry leaders and seasoned creative professionals throughout the programme.' },
        { icon: 'cash', iconColor: '#C1272D', title: 'Funding', description: 'Financial support for creative projects, equipment, and professional development opportunities.' },
        { icon: 'network', iconColor: '#EF7B2E', title: 'Industry Access', description: 'Exclusive access to industry events, studio visits, networking opportunities, and potential internships.' },
        { icon: 'layout-grid', iconColor: '#8EBFB0', title: 'Portfolio Development', description: 'Structured support to build an industry-standard portfolio that showcases your unique creative vision.' }
      ],
      eligibilityCriteria: [
        'Graduate of any ADMI diploma or professional certificate programme',
        'Strong creative portfolio demonstrating technical skill and originality',
        'Demonstrated leadership potential and commitment to the creative industries',
        'Clear vision for a creative project or venture to develop during the fellowship',
        'Available to commit to the full 12-month programme'
      ],
      applicationSteps: [
        { number: '1', bgColor: '#EF7B2E', title: 'Submit Application', description: 'Complete the online application form with your personal details, creative statement, and project proposal.' },
        { number: '2', bgColor: '#0A3D3D', title: 'Portfolio Review', description: 'Our panel of industry experts and faculty members review your portfolio and creative body of work.' },
        { number: '3', bgColor: '#C1272D', title: 'Interview', description: 'Shortlisted candidates are invited for a personal interview to discuss their vision, goals, and fellowship plans.' }
      ]
    },
    seoTitle: 'Fellowship',
    seoDescription: 'The ADMI Fellowship is a 12-month programme for outstanding graduates, offering mentorship, funding, industry access, and portfolio development.'
  },

  'academic-pathways': {
    internalName: 'Academic Pathways Page',
    pageType: 'academic-pathways',
    content: {
      pathwaySteps: [
        { step: 1, duration: '3 MONTHS', title: 'Foundation Certificate', description: 'Build core creative skills and discover your specialisation. Earn foundational credits that articulate directly into professional programmes.', credits: '15 ECTS Credits', price: 'KES 5,000/mo', certification: 'ADMI Certified', borderColor: '#EF7B2E', bgColor: '#FFFFFF' },
        { step: 2, duration: '6 MONTHS', title: 'Professional Certificate', description: 'Deepen your expertise in your chosen field. Industry-aligned curriculum with hands-on projects and professional portfolio development.', credits: '30 ECTS Credits', price: 'KES 8,500/mo', certification: 'Pearson BTEC', borderColor: '#0A3D3D', bgColor: '#FFFFFF' },
        { step: 3, duration: '18 MONTHS', title: 'Diploma Programme', description: 'Comprehensive programme combining theory and practice. Graduate industry-ready with a nationally recognised qualification.', credits: '90 ECTS Credits', price: 'KES 15,000/mo', certification: 'Woolf ECTS', borderColor: '#C1272D', bgColor: '#FFFFFF' },
        { step: 4, duration: 'DEGREE PATHWAY', title: 'Bachelor\u2019s Degree via Woolf University', description: 'Articulate your ADMI credits into a full EU-accredited bachelor\u2019s degree through Woolf University.', credits: '180 ECTS Credits  \u00b7  EU Accredited', price: null, certification: 'EU Accredited', borderColor: '#8EBFB0', bgColor: '#F0FDFA' }
      ],
      articulationCards: [
        { icon: 'school', iconColor: '#0A3D3D', title: 'Woolf University', description: 'EU-accredited degree-granting institution. ADMI diploma graduates can articulate credits towards a full bachelor\u2019s degree with international recognition.' },
        { icon: 'shield-check', iconColor: '#C1272D', title: 'KNQF Alignment', description: 'All ADMI programmes are aligned with the Kenya National Qualifications Framework, ensuring national recognition and seamless credit transfer.' },
        { icon: 'award', iconColor: '#EF7B2E', title: 'ECTS Credits', description: 'European Credit Transfer System credits ensure your qualifications are recognised across Europe and beyond, enabling global mobility.' }
      ],
      creditCards: [
        { value: '100%', valueColor: '#EF7B2E', description: 'Credit articulation between ADMI programmes' },
        { value: 'ECTS', valueColor: '#0A3D3D', description: 'European credits recognised in 48+ countries worldwide' },
        { value: 'KNQF', valueColor: '#C1272D', description: 'Kenya National Qualifications Framework aligned for local recognition' }
      ]
    },
    seoTitle: 'Academic Pathways',
    seoDescription: "ADMI offers an accredited academic pathway from foundation courses through to an internationally recognised bachelor's degree."
  },

  accommodation: {
    internalName: 'Accommodation Page',
    pageType: 'accommodation',
    content: {
      heroTitle: 'Student Accommodation',
      heroDescription: 'Comfortable living options near campus to help you focus on what matters most \u2014 your creative education.',
      heroImage: 'https://images.unsplash.com/photo-1758874573194-a98be0ed3ff5?auto=format&fit=crop&w=1920&q=80',
      residences: [
        { name: 'Qwetu', price: 'From KES 25,000/month', description: 'Purpose-built student living with modern furnished rooms, high-speed WiFi, study lounges, a gym, and 24/7 security.', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80', link: 'https://www.qwetu.com' },
        { name: 'Qejani', price: 'From KES 18,000/month', description: 'Contemporary co-living spaces designed for students and young professionals.', image: 'https://images.unsplash.com/photo-1649800292011-6a92542f08ce?auto=format&fit=crop&w=800&q=80', link: 'https://www.qejani.com' },
        { name: 'YWCA Parklands', price: 'From KES 10,000/month', description: 'Safe, well-managed accommodation for female students in Parklands.', image: 'https://images.unsplash.com/photo-1759889392274-246af1a984ba?auto=format&fit=crop&w=800&q=80' },
        { name: 'Private Hostels Network', price: 'From KES 8,000/month', description: 'ADMI partners with vetted private hostels across Nairobi to offer affordable, quality housing options near campus.', image: 'https://images.unsplash.com/photo-1758874573194-a98be0ed3ff5?auto=format&fit=crop&w=800&q=80' }
      ],
      amenities: [
        { label: 'High-Speed WiFi', icon: 'wifi' },
        { label: 'Daily Meals Available', icon: 'tools-kitchen-2' },
        { label: 'Quiet Study Spaces', icon: 'book' },
        { label: '24/7 Security', icon: 'shield' },
        { label: 'Laundry Facilities', icon: 'wash' },
        { label: 'Common Social Areas', icon: 'users' }
      ],
      bookingSteps: [
        { number: '1', title: 'Apply to ADMI', description: 'Submit your application to your chosen programme at ADMI.' },
        { number: '2', title: 'Choose Your Residence', description: 'Browse available options and select the residence that fits your needs.' },
        { number: '3', title: 'Secure Your Room', description: 'Pay your deposit and move in before classes begin.' }
      ],
      neighborhoodHighlights: ['Walking distance to public transport', 'Restaurants and cafes nearby', 'Shopping malls within reach'],
      ctaTitle: 'Ready to Find Your Home Away From Home?',
      ctaDescription: 'Secure your spot in one of our partner residences and start your ADMI journey with comfort and convenience.',
      ctaButtonText: 'Enquire About Accommodation',
      ctaButtonUrl: '/contact'
    },
    seoTitle: 'Student Accommodation',
    seoDescription: 'Comfortable living options near ADMI campus in Nairobi.',
    seoKeywords: 'ADMI accommodation, student housing Nairobi, student residences Kenya'
  }
}

// =============================================
// 5. SEED DATA - FAQ ENTRIES
// =============================================

const FAQ_DATA = {
  General: [
    { q: 'What is ADMI?', a: 'ADMI (Africa Digital Media Institute) is East Africa\u2019s leading creative media and technology institute. Founded in 2011, we offer accredited diploma programmes, professional certificates, and foundation certificates in film, animation, design, music production, gaming, and more.' },
    { q: 'Where is ADMI located?', a: 'Our campus is located at Caxton House, 3rd Floor, Kenyatta Avenue in Nairobi CBD, Kenya. We\u2019re right next to the General Post Office \u2014 very accessible by public transport.' },
    { q: 'Is ADMI accredited?', a: 'Yes. ADMI is registered with TVETA Kenya, offers EU-accredited credits through Woolf University (ECTS), and our professional certificates are Pearson BTEC certified.' },
    { q: 'What intakes are available?', a: 'We have three intake windows per year: January, May, and September. The next available intakes are May 2026 and September 2026.' }
  ],
  Admissions: [
    { q: 'What are the entry requirements?', a: 'Requirements vary by programme level. Diploma programmes generally require a KCSE certificate (C- and above) or equivalent. Professional certificates require at least a KCSE certificate. Foundation certificates are open to anyone 16+ with a passion for creative media.' },
    { q: 'How do I apply?', a: 'You can apply online through our website by visiting the Apply page, or by contacting our admissions team via WhatsApp at +254 741 132 751. The application process takes about 10 minutes.' },
    { q: 'Can international students apply?', a: 'Absolutely. We welcome students from across Africa and beyond. International students may need a student visa \u2014 our admissions team can guide you through the process.' },
    { q: 'What documents do I need?', a: 'You\u2019ll need a copy of your national ID or passport, academic certificates (KCSE or equivalent), and a recent passport-size photo. Some programmes may also require a portfolio.' }
  ],
  'Fees & Payment': [
    { q: 'How much are the tuition fees?', a: 'Fees vary by programme. Diploma programmes start from KES 15,000/month (18 months), professional certificates from KES 8,500/month (6 months), and foundation certificates from KES 5,000/month (3 months).' },
    { q: 'Are payment plans available?', a: 'Yes. We offer flexible monthly payment plans for all programmes. You can spread your fees across the duration of your programme with no interest or hidden charges.' },
    { q: 'Are there scholarships?', a: 'Yes, ADMI offers merit-based and need-based scholarships. We also partner with organisations like Google.org and GOYN for sponsored training opportunities.' },
    { q: 'What is the refund policy?', a: 'ADMI has a structured refund policy. Full refunds are available within the first week of classes. After that, refunds are prorated based on the time enrolled.' }
  ],
  'Student Life': [
    { q: 'What facilities does ADMI have?', a: 'Our campus features professional film and music studios, Mac and PC labs with industry-standard software, an equipment vault with cameras and audio gear, collaborative creative spaces, and a resource library.' },
    { q: 'Is there student support available?', a: 'Yes. ADMI provides academic advising, wellness resources, career coaching, accessibility services, and psycho-social support.' },
    { q: 'Are there events and networking opportunities?', a: 'Regularly. We host student showcases, film screenings, hackathons, industry guest talks, and networking events that connect students with professionals in creative industries.' },
    { q: 'Does ADMI offer accommodation?', a: 'While ADMI doesn\u2019t have on-campus housing, we help students find affordable accommodation options near the campus.' }
  ],
  Programmes: [
    { q: 'What programmes does ADMI offer?', a: 'We offer diploma programmes (18 months) in Film Production, Music Production, and Animation; professional certificates (6 months) in Graphic Design, Digital Marketing, Sound Engineering, UI/UX Design, and more; plus foundation certificates (3 months) for beginners.' },
    { q: 'Is online learning available?', a: 'Yes. Many of our programmes include a hybrid delivery model combining on-campus studio sessions with online learning components.' },
    { q: 'Do programmes include practical projects?', a: 'Absolutely. ADMI\u2019s learning model is project-based. Students work on real industry briefs, build portfolios, and complete capstone projects.' },
    { q: 'Can I transfer credits to other universities?', a: 'Our diploma programmes offer EU-accredited ECTS credits through Woolf University, which can be recognised by universities worldwide.' }
  ]
}

// =============================================
// 6. MAIN EXECUTION
// =============================================

async function main() {
  console.log('=== Consolidated Page Migration ===\n')

  // Step 1: Create content types
  console.log('--- Creating content types ---')
  await createPageContentType()
  await createTeamMemberType()
  await createAlumniProfileType()
  await createPageFaqType()
  console.log('')

  // Step 2: Seed team members
  console.log('--- Seeding team members ---')
  await ensureEntries('teamMember', teamMemberSeeds, { uniqueField: 'name' })
  console.log('')

  // Step 3: Seed alumni profiles
  console.log('--- Seeding alumni profiles ---')
  await ensureEntries('alumniProfile', alumniProfileSeeds, { uniqueField: 'name' })
  console.log('')

  // Step 4: Seed page singletons
  console.log('--- Seeding page content ---')
  for (const [key, data] of Object.entries(PAGE_DATA)) {
    await ensureEntry('pageContent', localize(data))
    console.log('')
  }

  // Step 5: Seed FAQ entries
  console.log('--- Seeding FAQ entries ---')
  let faqCount = 0
  for (const [category, items] of Object.entries(FAQ_DATA)) {
    for (const item of items) {
      faqCount += 1
      await ensureEntry(
        'pageFaq',
        localize({ question: item.q, answer: item.a, category, sortOrder: faqCount }),
        { uniqueField: 'question' }
      )
    }
  }
  console.log('')

  console.log('=== Migration Complete ===')
  console.log(`  Content types: 4 (pageContent, teamMember, alumniProfile, pageFaq)`)
  console.log(`  Page singletons: ${Object.keys(PAGE_DATA).length}`)
  console.log(`  Team members: ${teamMemberSeeds.length}`)
  console.log(`  Alumni profiles: ${alumniProfileSeeds.length}`)
  console.log(`  FAQ entries: ${faqCount}`)
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
