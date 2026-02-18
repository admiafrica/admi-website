# Course Page Content Preparation Guide

> Complete checklist for preparing content for ADMI course Overview and Deep Dive pages

**Last Updated:** 18 February 2026  
**Author:** Content Strategy Team  
**Target:** Content creators, CMS editors, course coordinators

---

## 📋 Table of Contents

1. [Page Structure Overview](#page-structure-overview)
2. [Overview Tab Content](#overview-tab-content)
3. [Deep Dive Tab Content](#deep-dive-tab-content)
4. [Required Assets](#required-assets)
5. [SEO & Schema Requirements](#seo--schema-requirements)
6. [Contentful Setup Checklist](#contentful-setup-checklist)
7. [Priority Levels](#priority-levels)
8. [Content Writing Guidelines](#content-writing-guidelines)

---

## 🏗️ Page Structure Overview

Course pages use a **tabbed layout** with two main sections accessible via sticky navigation:

### Overview Tab (`#overview`)
- **Purpose:** High-level introduction, selling points, and conversion-focused content
- **Target Audience:** Prospective students researching courses
- **Goal:** Drive enquiries and applications
- **Tone:** Inspirational, benefits-driven, clear value proposition

### Deep Dive Tab (`#details`)
- **Purpose:** Detailed curriculum, facilities, faculty, and in-depth information
- **Target Audience:** Serious applicants comparing programs
- **Goal:** Build confidence and trust through transparency
- **Tone:** Detailed, professional, comprehensive

---

## 🎯 OVERVIEW TAB CONTENT

### 1. Hero Section ✅ REQUIRED

**Contentful Fields:**
```yaml
Content Type: course
Fields:
  - name (Short Text) ✅ Required
  - coverImage (Media) ✅ Required
  - programType (Reference) ✅ Required
  - awardLevel (Short Text) ✅ Required
  - creditHours (Number) ✅ Required
  - heroSubtitle (Short Text) Optional
```

**Specifications:**
- **Cover Image:** 1200x630px, optimized WebP/JPEG, <200KB
- **Hero Subtitle:** 60-80 characters max
- **Alt Text:** Descriptive, includes course name

**Example:**
```
Name: Film & Television Production Diploma
Cover Image: film-production-hero.jpg
Program Type: Full-Time Diploma
Award Level: Diploma Level 6
Credit Hours: 240
Subtitle: Master the art of visual storytelling with industry-leading equipment
```

---

### 2. Quick Facts Bar ✅ REQUIRED

**Contentful Fields:**
```yaml
Content Type: course
Fields:
  - programType.fields.duration (Short Text) ✅ Required
  - awardLevel (Short Text) ✅ Required
  - intakeMonths (Short Text) ✅ Required
  - programType.fields.deliveryMode (Short Text) ✅ Required
```

**Format:**
```
Duration: "2 years (4 semesters)"
Award Level: "Diploma Level 6"
Intakes: "January, May, September"
Delivery: "Hybrid - Online + On-campus"
Location: "Nairobi, Kenya" (auto-added)
```

---

### 3. About the Course ✅ REQUIRED

**Contentful Fields:**
```yaml
Content Type: course
Fields:
  - aboutTheCourse (Rich Text) ✅ Required
  - courseVideo (Media) Optional
```

**Content Requirements:**
- **Length:** 300-500 words (3-4 paragraphs)
- **Structure:**
  1. **Opening Hook:** What makes this course unique? (2-3 sentences)
  2. **What You'll Learn:** Core skills and knowledge areas (1 paragraph)
  3. **Who It's For:** Target student profile (1 paragraph)
  4. **Why ADMI:** Unique advantages and differentiators (1 paragraph)

**Writing Tips:**
- Use active voice
- Include specific outcomes (e.g., "Build a professional portfolio with 8+ projects")
- Mention industry partnerships or accreditation
- Address student concerns (equipment, schedule flexibility, support)

**Example:**
```markdown
The Film & Television Production Diploma is designed for aspiring filmmakers who want to master every aspect of visual storytelling. From scriptwriting to post-production, you'll gain hands-on experience with the same equipment used by Kenya's top production houses.

Over two years, you'll learn cinematography, editing, sound design, directing, and production management through real-world projects. Work with RED cameras, DaVinci Resolve, and professional audio equipment in our fully-equipped studios.

This programme is ideal for creative individuals with a passion for storytelling, whether you're a school-leaver, career changer, or working professional looking to formalize your skills. No prior experience required—just creativity and commitment.

ADMI graduates work at Nation Media Group, Royal Media Services, and international production companies. With 85% of our diploma students employed within 6 months, you'll graduate ready for industry.
```

---

### 4. Course Leader 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: courseLeader (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - name (Short Text) ✅ Required
  - title (Short Text) ✅ Required
  - bio (Rich Text) ✅ Required
  - photo (Media) ✅ Required
  - linkedInUrl (Short Text) Optional
```

**Photo Specifications:**
- **Size:** 400x400px (square)
- **Format:** Professional headshot, neutral background
- **Quality:** High-resolution, well-lit

**Bio Guidelines:**
- **Length:** 100-150 words
- **Include:** Industry experience, notable projects, teaching philosophy
- **Tone:** Professional but approachable

**Example:**
```
Name: Jane Kamau
Title: Head of Film Production
Bio: Jane has over 15 years of experience in Kenya's film and television industry, having worked as a cinematographer for Citizen TV and directed award-winning documentaries. She's passionate about nurturing the next generation of African storytellers and believes in learning through doing. Jane holds an MA in Film Studies from the University of Nairobi and has trained over 500 filmmakers at ADMI.
LinkedIn: https://linkedin.com/in/janekamau
```

---

### 5. Industry Quote 🎤 OPTIONAL

**Contentful Setup:**
```yaml
Content Type: industryQuote (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - quote (Long Text) ✅ Required
  - authorName (Short Text) ✅ Required
  - authorRole (Short Text) ✅ Required
  - authorCompany (Short Text) Optional
  - authorPhoto (Media) Optional
```

**Quote Guidelines:**
- **Length:** 50-100 words
- **Source:** Industry professional, hiring manager, or partner company
- **Content:** Should validate course quality, employability, or industry relevance

**Example:**
```
Quote: "ADMI graduates arrive on set with practical skills and a professional mindset. They understand the fast-paced nature of production and can jump straight into projects. We've hired five ADMI graduates this year alone."
Author: David Ochieng
Role: Senior Producer
Company: Royal Media Services
```

---

### 6. Why This Course / Benefits 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: courseBenefits (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - title (Short Text) ✅ Required
  - description (Long Text) ✅ Required
  - icon (Short Text) Optional (e.g., "camera", "graduation-cap")
  - displayOrder (Number) ✅ Required
```

**Requirements:**
- **Minimum:** 4-6 benefits per course
- **Balance:** Mix of practical, career, and personal benefits
- **Specificity:** Use numbers and concrete outcomes

**Benefit Categories:**
1. **Career Outcomes:** Employment rates, job titles, salaries
2. **Practical Skills:** Specific tools, techniques, certifications
3. **Industry Connections:** Partnerships, networking, internships
4. **Learning Experience:** Equipment access, small classes, mentorship
5. **Flexibility:** Payment plans, hybrid delivery, support services
6. **Recognition:** Accreditation, degree pathways, international recognition

**Example Benefits:**
```yaml
Benefit 1:
  title: "Industry-Standard Equipment"
  description: "Learn on the same RED cameras, Blackmagic gear, and editing suites used by top Kenyan production houses"
  icon: "camera"
  displayOrder: 1

Benefit 2:
  title: "85% Employment Rate"
  description: "Graduate with confidence—85% of our diploma students secure industry roles within 6 months"
  icon: "briefcase"
  displayOrder: 2

Benefit 3:
  title: "Build Your Portfolio"
  description: "Complete 8+ real-world projects including documentaries, commercials, and short films"
  icon: "portfolio"
  displayOrder: 3

Benefit 4:
  title: "UK Degree Pathway"
  description: "Progress directly to a BA (Hons) degree with Woolf University after graduation"
  icon: "graduation-cap"
  displayOrder: 4
```

---

### 7. Degree Pathway ✅ ALWAYS VISIBLE

**Content:** Static/Shared across all courses

```yaml
Step 1:
  title: "ADMI Diploma"
  duration: "2 years"
  description: "Hands-on training with industry-standard equipment and mentorship"
  color: "#C1272D" (Red)

Step 2:
  title: "UK Bachelor's Degree"
  duration: "1 year (top-up)"
  description: "Progress to BA (Hons) with Woolf University"
  color: "#171717" (Black)

Step 3:
  title: "UK Master's Degree"
  duration: "1 year"
  description: "Advance to MA level for leadership roles"
  color: "#8EBFB0" (Teal)
```

**Note:** This section is automatically included on all course pages. No CMS setup required.

---

### 8. Curriculum Overview 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: courseSemesters (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - semesterNumber (Number) ✅ Required
  - semesterName (Short Text) ✅ Required
  - duration (Short Text) ✅ Required
  - modules (Array of Short Text) ✅ Required
  - keyProjects (Array of Short Text) Optional
  - learningOutcomes (Long Text) Optional
  - displayOrder (Number) ✅ Required
```

**Module Guidelines:**
- **Per Semester:** 4-6 modules
- **Naming:** Clear, descriptive titles (not codes)
- **Balance:** Mix theory and practical modules

**Example Semester:**
```yaml
Semester 1:
  semesterName: "Foundations of Filmmaking"
  duration: "6 months"
  modules:
    - "Introduction to Cinematography"
    - "Scriptwriting Fundamentals"
    - "Camera Operations & Lighting"
    - "Audio Recording Basics"
    - "Storyboarding & Pre-Production"
  keyProjects:
    - "Short Documentary (3-5 minutes)"
    - "Narrative Scene Study"
  learningOutcomes: "Master camera fundamentals, develop visual storytelling skills, understand the production pipeline"
  displayOrder: 1
```

---

### 9. Payment Plan 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: paymentPlans (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - totalPerSemester (Short Text) ✅ Required
  - installmentOptions (Long Text) ✅ Required
  - discountMessage (Long Text) Optional
  - financingPartners (Array of Short Text) Optional
```

**Content Guidelines:**
- Be transparent about costs
- Highlight payment flexibility
- Mention financing partners (e.g., Watu Credit, Peach Loans)
- Include early bird or upfront discounts

**Example:**
```yaml
totalPerSemester: "KES 85,000 per semester (4 semesters total)"
installmentOptions: |
  Option 1: Pay upfront and save 10% (KES 76,500)
  Option 2: Two installments (KES 42,500 each)
  Option 3: Four monthly installments (KES 21,250 each)
discountMessage: "Apply by March 15 and receive early bird 15% discount on first semester"
financingPartners: ["Watu Credit", "Peach Loans", "M-Pesa Faraja"]
```

---

### 10. Impact Stats ✅ ALWAYS VISIBLE

**Content:** Static/Shared ADMI-wide statistics

```yaml
Graduate Employment: "85% employed within 6 months"
Industry Partners: "50+ hiring partners"
Years of Operation: "15+ years of excellence"
Student Satisfaction: "4.8/5.0 graduate rating"
```

**Note:** Automatically included. Update centrally in `filmProductionData.impactStats`.

---

### 11. Student Testimonials 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: courseTestimonials (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - studentName (Short Text) ✅ Required
  - studentPhoto (Media) ✅ Required
  - program (Short Text) ✅ Required
  - cohort (Short Text) Optional (e.g., "Class of 2024")
  - quote (Long Text) ✅ Required
  - currentRole (Short Text) Optional
  - company (Short Text) Optional
  - displayOrder (Number) ✅ Required
```

**Photo Specifications:**
- **Size:** 300x300px (square)
- **Format:** Professional or candid, smiling preferred
- **Background:** Can be on-campus or at workplace

**Quote Guidelines:**
- **Length:** 50-100 words (2-3 sentences)
- **Authenticity:** Use real student voices, exact wording
- **Specificity:** Mention specific skills, projects, or outcomes
- **Balance:** Mix career outcomes, learning experience, faculty quality

**Example Testimonials:**
```yaml
Testimonial 1:
  studentName: "Brian Otieno"
  studentPhoto: "brian-otieno.jpg"
  program: "Film & Television Production Diploma"
  cohort: "Class of 2024"
  quote: "The hands-on approach at ADMI changed everything for me. I went from no experience to editing commercials at Nation Media Group in just two years. The mentors treat you like a colleague, not just a student."
  currentRole: "Junior Video Editor"
  company: "Nation Media Group"
  displayOrder: 1

Testimonial 2:
  studentName: "Faith Mueni"
  studentPhoto: "faith-mueni.jpg"
  program: "Film & Television Production Diploma"
  cohort: "Class of 2023"
  quote: "I was scared about the cost, but the payment plans made it manageable. Now I earn more than I ever thought possible, and I'm working on projects I'm proud of."
  currentRole: "Freelance Cinematographer"
  company: null
  displayOrder: 2
```

---

### 12. Application Steps ✅ ALWAYS VISIBLE

**Content:** Static/Shared application process

```yaml
Step 1: "Submit Enquiry - Fill out the form or call us"
Step 2: "Receive Information Pack - Get full course details & pricing"
Step 3: "Complete Application - Submit documents & portfolio (if required)"
Step 4: "Interview & Assessment - Meet the team and showcase your potential"
Step 5: "Enrollment Confirmation - Secure your spot and start your journey"
```

**Note:** Automatically included on all course pages.

---

### 13. FAQ Section ✅ PRIORITY - REQUIRED FOR SEO

**Contentful Setup:**
```yaml
Content Type: courseFAQ (ID: 2aEawNi41H2x8BXE8J2I9a)
Fields:
  - course (Reference to course) ✅ Required
  - question (Short Text) ✅ Required
  - answer (Rich Text) ✅ Required
  - displayOrder (Number) ✅ Required
  - category (Short Text) Optional
```

**Requirements:**
- **Minimum:** 8-12 FAQs per course
- **SEO:** Critical for FAQ Schema and voice search
- **Coverage:** Address all major student concerns

**FAQ Categories & Example Questions:**

#### Admission & Entry Requirements
```
Q: What are the entry requirements for this diploma?
A: Minimum KCSE grade C- (5 GPA) or equivalent. If you don't meet this, you can take a foundation course first. We look for creativity and commitment more than grades.

Q: Do I need prior experience in film production?
A: No prior experience required! We teach from the basics and build up to advanced techniques.

Q: Can I apply if I'm a mature student or career changer?
A: Absolutely! We welcome students of all ages. Many of our best graduates were career changers.
```

#### Duration & Schedule
```
Q: How long is the Film & Television Production Diploma?
A: The programme runs for 2 years (4 semesters). Each semester is 6 months.

Q: Is the course full-time or part-time?
A: Full-time with hybrid delivery. Attend 2-3 days per week on campus, with the rest online.

Q: When are the intake dates?
A: We have three intakes per year: January, May, and September.
```

#### Fees & Payment
```
Q: How much does the diploma cost?
A: KES 85,000 per semester (4 semesters total). Pay upfront for 10% discount.

Q: Are there payment plans available?
A: Yes! Pay in 2-4 installments per semester. We also partner with financing providers.

Q: Do you offer scholarships?
A: We offer need-based bursaries and early bird discounts. Contact admissions for details.
```

#### Career Outcomes
```
Q: What jobs can I get after graduating?
A: Video editor, cinematographer, producer, director, sound engineer, colorist. 85% of graduates are employed within 6 months.

Q: What's the average salary after graduation?
A: Entry-level: KES 35,000-60,000/month. Experienced: KES 80,000-150,000+.

Q: Do you help with job placement?
A: Yes! We connect you with our 50+ hiring partners and provide career counseling.
```

#### Equipment & Facilities
```
Q: What equipment will I use?
A: RED cameras, Blackmagic cameras, DaVinci Resolve, Final Cut Pro, Pro Tools, professional lighting and audio gear.

Q: Do I need to buy my own equipment?
A: No! All equipment is provided. You'll need a laptop (we can recommend specs).
```

---

### 14. Career Outcomes 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: careerOutcomes (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - jobTitles (Array of Short Text) ✅ Required
  - averageSalaryLow (Number) ✅ Required
  - averageSalaryHigh (Number) ✅ Required
  - currency (Short Text) ✅ Required
  - hiringCompanies (Array of Short Text) Optional
  - employmentRate (Number) Optional
  - industryStatistics (Long Text) Optional
```

**OR use existing field:**
```yaml
Content Type: course
Fields:
  - careerOptions (Rich Text)
```

**Example:**
```yaml
jobTitles:
  - "Video Editor"
  - "Cinematographer"
  - "Film Producer"
  - "Director"
  - "Colorist"
  - "Sound Designer"

averageSalaryLow: 35000
averageSalaryHigh: 150000
currency: "KES"

hiringCompanies:
  - "Nation Media Group"
  - "Royal Media Services"
  - "Standard Group"
  - "Safaricom"
  - "Kenya Film Commission"

employmentRate: 85

industryStatistics: |
  The Kenyan film and TV industry is growing at 15% annually. 
  Streaming services like Netflix and Showmax are producing more African content. 
  Demand for video editors has increased 300% in the last 5 years.
```

---

## 🔍 DEEP DIVE TAB CONTENT

### 1. Program Details ✅ REQUIRED

**Contentful Fields:**
```yaml
Content Type: course
Fields:
  - learningOutcomes (Rich Text) ✅ Required
  - courseObjectives (Rich Text) Optional
  - skillsYoullGain (Array of Short Text) Optional
  - entryRequirements (Rich Text) Optional
```

**Learning Outcomes Format:**
- **Structure:** Bulleted list of 8-12 specific outcomes
- **Phrasing:** Start with action verbs (Master, Create, Develop, Execute)
- **Specificity:** Include tools, techniques, and deliverables

**Example:**
```markdown
## Learning Outcomes

By the end of this programme, you will be able to:

- Master camera operations for RED, Blackmagic, and DSLR cameras
- Execute professional lighting setups for narrative and documentary projects
- Edit multi-camera projects in DaVinci Resolve and Final Cut Pro
- Design and mix audio for film and television using Pro Tools
- Write compelling scripts following industry-standard formatting
- Direct actors and crew on location and in-studio
- Manage production workflows from pre-production to post
- Create a professional showreel with 8+ portfolio projects
- Understand color grading and finishing for broadcast standards
- Collaborate effectively in production teams of 5-10 people
```

---

### 2. Mentors Grid 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: courseMentors (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - name (Short Text) ✅ Required
  - title (Short Text) ✅ Required
  - specialization (Short Text) Optional
  - bio (Long Text) ✅ Required
  - photo (Media) ✅ Required
  - industryExperience (Number) Optional
  - linkedInUrl (Short Text) Optional
  - displayOrder (Number) ✅ Required
```

**Requirements:**
- **Minimum:** 3-6 mentors per course
- **Balance:** Mix faculty and industry practitioners
- **Credentials:** Highlight relevant experience and achievements

**Photo Specifications:**
- **Size:** 400x400px (square)
- **Style:** Professional but approachable
- **Background:** Neutral or on-campus

**Bio Guidelines:**
- **Length:** 80-120 words
- **Structure:** Current role + Industry experience + Teaching focus + Notable achievements
- **Tone:** Professional, third-person

**Example Mentors:**
```yaml
Mentor 1:
  name: "Peter Njenga"
  title: "Senior Lecturer - Cinematography"
  specialization: "Documentary & Corporate Video"
  bio: "Peter has 12 years of experience as a DoP for Kenya's top production houses. He's shot commercials for Safaricom, documentaries for Al Jazeera, and music videos for Diamond Platnumz. At ADMI, he teaches cinematography fundamentals and advanced lighting techniques. Peter believes in learning by doing and pushes students to experiment with creative visual solutions."
  photo: "peter-njenga.jpg"
  industryExperience: 12
  linkedInUrl: "https://linkedin.com/in/peternjenga"
  displayOrder: 1

Mentor 2:
  name: "Caroline Wanjiru"
  title: "Industry Mentor - Post-Production"
  specialization: "Editing & Color Grading"
  bio: "As lead editor at Nation Media Group, Caroline has edited hundreds of documentaries, news packages, and branded content pieces. She specializes in DaVinci Resolve and teaches students how to work under tight deadlines while maintaining creative excellence. Caroline is passionate about mentoring young editors and often hires ADMI graduates for her team."
  photo: "caroline-wanjiru.jpg"
  industryExperience: 8
  displayOrder: 2
```

---

### 3. Assessment Breakdown 🌟 RECOMMENDED

**Content Source:** Derived from `courseSemesters` data

**Format:**
```yaml
Assessment Methods:
  - method: "Practical Projects"
    percentage: 40
    description: "8+ hands-on projects including documentaries, commercials, and narrative shorts"
  
  - method: "Examinations"
    percentage: 30
    description: "Written and practical exams covering theory and technical skills"
  
  - method: "Assignments"
    percentage: 20
    description: "Research papers, case studies, and reflective journals"
  
  - method: "Final Showreel"
    percentage: 10
    description: "Professional portfolio showcasing your best work"
```

**Note:** Component returns null if no semester data. Can use static fallback data.

---

### 4. Equipment & Facilities 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: courseFacilities (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - name (Short Text) ✅ Required
  - description (Long Text) ✅ Required
  - image (Media) ✅ Required
  - specifications (Long Text) Optional
  - accessDetails (Short Text) Optional
  - displayOrder (Number) ✅ Required
```

**Requirements:**
- **Minimum:** 4-6 facilities/equipment per course
- **Visuals:** Show students using equipment in real contexts
- **Specificity:** Include brands, models, software versions

**Photo Specifications:**
- **Size:** 800x600px (landscape, 4:3 ratio)
- **Content:** Students using equipment, not empty rooms
- **Lighting:** Well-lit, professional quality

**Example Facilities:**
```yaml
Facility 1:
  name: "Professional Edit Suites"
  description: "Five dedicated editing suites equipped with iMac Pros, dual monitors, and color-calibrated displays. Work on DaVinci Resolve Studio, Final Cut Pro X, Adobe Premiere Pro, and Pro Tools."
  image: "edit-suite-students.jpg"
  specifications: |
    Hardware: iMac Pro (32GB RAM, 8-core), LG UltraFine 5K monitors
    Software: DaVinci Resolve Studio, Final Cut Pro X, Adobe CC, Pro Tools
    Storage: 10TB shared network storage per student
  accessDetails: "24/7 access with student ID card"
  displayOrder: 1

Facility 2:
  name: "Recording Studio & Foley Stage"
  description: "Professional audio recording studio with Neumann microphones, SSL mixing desk, and acoustic treatment. Perfect for ADR, voiceovers, and sound design."
  image: "recording-studio.jpg"
  specifications: |
    Microphones: Neumann U87, Sennheiser 416, AKG C414
    Mixing: SSL Origin console with Pro Tools HDX
    Monitoring: Genelec 8351 speakers in 5.1 configuration
  accessDetails: "Bookable in 4-hour slots, 7 days a week"
  displayOrder: 2
```

---

### 5. Student Portfolio 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: studentPortfolio (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - projectTitle (Short Text) ✅ Required
  - studentName (Short Text) ✅ Required
  - cohort (Short Text) Optional
  - description (Long Text) ✅ Required
  - thumbnail (Media) ✅ Required
  - projectUrl (Short Text) Optional (YouTube, Vimeo)
  - projectType (Short Text) Optional (Documentary, Commercial, etc.)
  - displayOrder (Number) ✅ Required
```

**Requirements:**
- **Minimum:** 6-9 showcase items per course
- **Variety:** Mix different project types and styles
- **Quality:** Only showcase best student work

**Thumbnail Specifications:**
- **Size:** 1200x800px (landscape, 3:2 ratio)
- **Format:** High-quality still from project
- **Text:** Burned-in title optional but not required

**Example Portfolio Items:**
```yaml
Portfolio 1:
  projectTitle: "Urban Rhythms - Documentary"
  studentName: "Michael Omondi"
  cohort: "Class of 2024"
  description: "15-minute documentary exploring Nairobi's underground hip-hop scene. Features interviews with 8 artists and performance footage shot over 3 months. Premiered at Docubox Film Festival."
  thumbnail: "urban-rhythms-thumbnail.jpg"
  projectUrl: "https://vimeo.com/123456789"
  projectType: "Documentary"
  displayOrder: 1

Portfolio 2:
  projectTitle: "Safaricom Brand Commercial"
  studentName: "Grace Muthoni"
  cohort: "Class of 2023"
  description: "30-second commercial created during industry placement. Shot on RED Komodo with Cooke lenses. Currently airing on national TV."
  thumbnail: "safaricom-commercial.jpg"
  projectUrl: "https://youtube.com/watch?v=abc123"
  projectType: "Commercial"
  displayOrder: 2
```

---

### 6. Students in Action 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: coursePhotos (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - image (Media) ✅ Required
  - caption (Short Text) Optional
  - photoType (Short Text) Optional
  - displayOrder (Number) ✅ Required
```

**Requirements:**
- **Minimum:** 8-12 photos per course
- **Variety:** Mix classroom, studio, location shoots, presentations
- **Authenticity:** Real students, real projects (not stock photos)

**Photo Specifications:**
- **Size:** 1200x800px (landscape, 3:2 ratio)
- **Quality:** High-resolution, well-composed
- **Subjects:** Students engaged in activities, faces visible

**Photo Types:**
```yaml
- Classroom sessions (lectures, critiques)
- Studio work (camera operation, lighting setups)
- Location shoots (outdoor filming, field interviews)
- Group projects (collaboration, teamwork)
- Editing sessions (post-production work)
- Student presentations (showcases, pitches)
- Equipment demos (faculty teaching techniques)
- Social moments (breaks, celebrations)
```

---

### 7. Alumni Stories 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: alumniStories (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - alumniName (Short Text) ✅ Required
  - photo (Media) ✅ Required
  - graduationYear (Number) ✅ Required
  - currentRole (Short Text) ✅ Required
  - company (Short Text) Optional
  - successStory (Rich Text) ✅ Required
  - quote (Long Text) ✅ Required
  - linkedInUrl (Short Text) Optional
  - displayOrder (Number) ✅ Required
```

**Requirements:**
- **Minimum:** 3-6 alumni per course
- **Diversity:** Mix employers (employed, freelance, entrepreneurs)
- **Timeframes:** Recent (1-2 years) and established (3-5+ years)

**Photo Specifications:**
- **Size:** 400x400px (square)
- **Setting:** Professional workplace or proud moment
- **Quality:** High-resolution, not selfies

**Success Story Guidelines:**
- **Length:** 150-250 words (2-3 paragraphs)
- **Structure:** Before ADMI → During ADMI → After ADMI
- **Specificity:** Mention projects, challenges overcome, career trajectory

**Example Alumni:**
```yaml
Alumni 1:
  alumniName: "John Mwangi"
  photo: "john-mwangi-alumni.jpg"
  graduationYear: 2021
  currentRole: "Senior Video Producer"
  company: "Nation Media Group"
  successStory: |
    Before ADMI, John was working retail and dreaming of breaking into media. He joined the Film & Television Production Diploma with no prior experience, just raw passion.
    
    During his studies, John's documentary "Street Vendors of Nairobi" won the student showcase award and caught the attention of Nation Media Group. They offered him an internship, which turned into a full-time role immediately after graduation.
    
    Three years later, John has produced over 50 documentaries, trained junior editors, and recently launched his own production company on the side. He credits ADMI's hands-on approach and industry mentors for his rapid career growth.
  quote: "ADMI gave me the skills and confidence to compete with anyone in the industry. Now I'm hiring ADMI graduates myself—I know they come prepared."
  linkedInUrl: "https://linkedin.com/in/johnmwangi"
  displayOrder: 1
```

---

### 8. Industry Partners 🌟 RECOMMENDED

**Contentful Setup:**
```yaml
Content Type: industryPartners (linked to course or global)
Fields:
  - course (Reference to course) Optional (leave empty for global partners)
  - companyName (Short Text) ✅ Required
  - logo (Media) ✅ Required
  - partnershipType (Short Text) Optional
  - description (Long Text) Optional
  - websiteUrl (Short Text) Optional
  - displayOrder (Number) ✅ Required
```

**Logo Specifications:**
- **Size:** 200x80px (landscape, flexible aspect ratio)
- **Format:** PNG with transparent background (SVG preferred)
- **Color:** Original brand colors (component handles grayscale hover effect)

**Partnership Types:**
```
- Hiring Partner
- Equipment Sponsor
- Industry Mentor Provider
- Internship Provider
- Guest Lecturer Organization
```

**Example Partners:**
```yaml
Partner 1:
  companyName: "Nation Media Group"
  logo: "nation-media-logo.png"
  partnershipType: "Hiring Partner & Industry Mentor"
  description: "Kenya's largest media house. Provides guest lecturers, internships, and hires multiple ADMI graduates annually."
  websiteUrl: "https://www.nation.co.ke"
  displayOrder: 1

Partner 2:
  companyName: "Safaricom"
  logo: "safaricom-logo.png"
  partnershipType: "Equipment Sponsor & Hiring Partner"
  description: "Major telecommunications and digital services provider supporting ADMI's technology infrastructure."
  websiteUrl: "https://www.safaricom.co.ke"
  displayOrder: 2
```

---

### 9. Industry Trends 💡 OPTIONAL

**Contentful Setup:**
```yaml
Content Type: industryTrends (linked to course)
Fields:
  - course (Reference to course) ✅ Required
  - trendTitle (Short Text) ✅ Required
  - description (Long Text) ✅ Required
  - relevanceToCourse (Long Text) ✅ Required
  - statistic (Short Text) Optional
  - source (Short Text) Optional
  - date (Date) Optional
  - displayOrder (Number) ✅ Required
```

**Requirements:**
- **Minimum:** 3-5 trends per course
- **Recency:** Update annually or when major shifts occur
- **Sources:** Cite reputable industry reports

**Example Trends:**
```yaml
Trend 1:
  trendTitle: "Streaming Services Investing in African Content"
  description: "Netflix, Prime Video, and Showmax are commissioning more original African productions. Netflix alone plans to invest $175M in African content by 2025."
  relevanceToCourse: "Our graduates are working on shows for these platforms. We teach production standards required for international streaming distribution."
  statistic: "$175M investment by Netflix in African content"
  source: "Netflix Africa Report 2024"
  date: 2024-06-15
  displayOrder: 1

Trend 2:
  trendTitle: "Rise of Content Creator Economy"
  description: "Social media creators are professionalizing their content. Brands now spend 30% of marketing budgets on creator partnerships."
  relevanceToCourse: "Learn commercial video production skills applicable to brands, agencies, and your own creator business."
  statistic: "30% of marketing budgets to creator partnerships"
  source: "Kenya Marketing Society Report 2025"
  displayOrder: 2
```

---

### 10. Related Resources 💡 OPTIONAL

**Content Source:** Links to blog articles, guides, videos from your CMS

**Contentful Setup:**
```yaml
Use existing content types:
  - articles (blog posts)
  - resources (guides, eBooks)
  - videos (YouTube embeds)

Query by:
  - relatedCourse field
  - tags/categories
```

**API Endpoint:**
```
/api/v3/course-articles?slug={slug}
```

**Example:**
```
- "10 Essential Cinematography Tips for Beginners"
- "Career Guide: How to Break into Kenya's Film Industry"
- "Student Showcase: Best Projects from 2024"
- "Interview with Nation Media Group Senior Producer"
```

---

## 🎨 REQUIRED ASSETS

### Image Assets

| Asset Type | Dimensions | Format | Max Size | Notes |
|------------|-----------|---------|----------|-------|
| Course Cover Image | 1200x630px | WebP/JPEG | 200KB | Hero background, OG image |
| Hero Background | 1920x1080px | WebP/JPEG | 300KB | Optional alternative to cover |
| Mentor Headshots | 400x400px | WebP/JPEG | 100KB | Professional, neutral background |
| Student Testimonial Photos | 300x300px | WebP/JPEG | 80KB | Professional or candid |
| Facility Photos | 800x600px | WebP/JPEG | 150KB | Show students using equipment |
| Portfolio Thumbnails | 1200x800px | WebP/JPEG | 200KB | Project stills, high quality |
| Students in Action | 1200x800px | WebP/JPEG | 200KB | Authentic campus/studio shots |
| Alumni Photos | 400x400px | WebP/JPEG | 100KB | Professional workplace setting |
| Partner Logos | 200x80px | PNG/SVG | 50KB | Transparent background |

### Video Assets

| Video Type | Length | Format | Notes |
|------------|--------|--------|-------|
| Course Overview Video | 2-3 min | MP4 (YouTube/Vimeo) | Embed from hosting platform |
| Faculty Welcome | 1-2 min | MP4 (YouTube/Vimeo) | Optional, adds personal touch |
| Campus Tour | 3-5 min | MP4 (YouTube/Vimeo) | Show facilities in action |
| Student Testimonials | 30-60 sec each | MP4 (YouTube/Vimeo) | 3-5 short clips |
| Portfolio Projects | 2-15 min | MP4 (YouTube/Vimeo) | Student work showcase |

### Document Assets

| Document Type | Format | Notes |
|---------------|--------|-------|
| Course Brochure | PDF | Downloadable from enquiry form |
| Sample Curriculum | PDF | Detailed semester breakdown |
| Admission Requirements | PDF | Entry criteria and documents needed |
| Fee Structure | PDF | Complete pricing with payment options |

---

## 🔍 SEO & SCHEMA REQUIREMENTS

### Meta Tags (Per Course)

```yaml
Meta Title: 
  - Format: "{Course Name} | ADMI Kenya"
  - Length: 50-60 characters
  - Example: "Film & Television Production Diploma | ADMI Kenya"

Meta Description:
  - Length: 145-155 characters
  - Include: Course name, duration, key benefit, location, CTA
  - Example: "2-year Film & TV Production Diploma in Nairobi. Learn with RED cameras, industry mentors. 85% employed within 6 months. Apply now!"

Keywords:
  - Primary: Course-specific + location
  - Secondary: Career outcomes, tools, certifications
  - Long-tail: Program type + location variations
  - Example: "film production school Kenya, cinematography diploma Nairobi, video editing course Kenya"

OpenGraph Image:
  - Use: Course cover image
  - Size: 1200x630px
  - Include: Course name overlay optional
```

### Structured Data (JSON-LD)

#### 1. Course Schema ✅ REQUIRED
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Film & Television Production Diploma",
  "description": "...",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Africa Digital Media Institute",
    "sameAs": "https://admi.africa"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "blended",
    "duration": "P2Y",
    "startDate": "2026-05-01"
  },
  "offers": {
    "@type": "Offer",
    "price": "340000",
    "priceCurrency": "KES"
  }
}
```

#### 2. FAQ Schema ✅ REQUIRED
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the entry requirements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

#### 3. Breadcrumb Schema ✅ REQUIRED
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://admi.africa"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Courses",
      "item": "https://admi.africa/courses"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Film & Television Production",
      "item": "https://admi.africa/courses/film-television-production"
    }
  ]
}
```

#### 4. Video Schema (if video present)
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Film Production Diploma Overview",
  "description": "...",
  "thumbnailUrl": "...",
  "uploadDate": "2025-01-15",
  "contentUrl": "https://youtube.com/watch?v=..."
}
```

### Enhanced SEO for Diplomas

**Additional Fields Required:**
```yaml
employmentRate: 85 (percentage)
averageSalary: "KES 45,000 - 120,000/month"
industryPartners: ["Nation Media Group", "Royal Media Services", ...]
accreditation: "Woolf University & TVETA Kenya"
```

**SEO Boosters:**
- Include employment statistics in meta description
- Add "Apply now" or "Limited seats" urgency in title
- Use location-specific keywords throughout
- Link to related blog content about careers in the field

---

## ✅ CONTENTFUL SETUP CHECKLIST

### Core Content Types

#### 1. Main Course Entry ✅ REQUIRED
```yaml
Content Type: course
Status: ✅ Exists
Key Fields:
  - name ✅
  - slug ✅
  - coverImage ✅
  - aboutTheCourse (Rich Text) ✅
  - programType (Reference) ✅
  - awardLevel ✅
  - creditHours ✅
  - intakeMonths ✅
  - learningOutcomes (Rich Text) ✅
  - careerOptions (Rich Text) ✅
```

#### 2. Course Leader
```yaml
Content Type: courseLeader
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - name (Short Text)
  - title (Short Text)
  - bio (Rich Text)
  - photo (Media)
  - linkedInUrl (Short Text)
```

#### 3. Industry Quote
```yaml
Content Type: industryQuote
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - quote (Long Text)
  - authorName (Short Text)
  - authorRole (Short Text)
  - authorCompany (Short Text)
  - authorPhoto (Media)
```

#### 4. Course Benefits
```yaml
Content Type: courseBenefits
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - title (Short Text)
  - description (Long Text)
  - icon (Short Text)
  - displayOrder (Number)
```

#### 5. Course Semesters
```yaml
Content Type: courseSemesters
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - semesterNumber (Number)
  - semesterName (Short Text)
  - duration (Short Text)
  - modules (Array)
  - keyProjects (Array)
  - learningOutcomes (Long Text)
  - displayOrder (Number)
```

#### 6. Payment Plans
```yaml
Content Type: paymentPlans
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - totalPerSemester (Short Text)
  - installmentOptions (Long Text)
  - discountMessage (Long Text)
  - financingPartners (Array)
```

#### 7. Course Testimonials
```yaml
Content Type: courseTestimonials
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - studentName (Short Text)
  - studentPhoto (Media)
  - program (Short Text)
  - cohort (Short Text)
  - quote (Long Text)
  - currentRole (Short Text)
  - company (Short Text)
  - displayOrder (Number)
```

#### 8. Course FAQs ✅ PRIORITY
```yaml
Content Type: courseFAQ
ID: 2aEawNi41H2x8BXE8J2I9a
Status: ✅ Exists
Fields:
  - course (Reference to course) ✅
  - question (Short Text) ✅
  - answer (Rich Text) ✅
  - displayOrder (Number) ✅
  - category (Short Text) ✅
```

#### 9. Career Outcomes
```yaml
Content Type: careerOutcomes
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - jobTitles (Array)
  - averageSalaryLow (Number)
  - averageSalaryHigh (Number)
  - currency (Short Text)
  - hiringCompanies (Array)
  - employmentRate (Number)
  - industryStatistics (Long Text)
```

#### 10. Course Mentors
```yaml
Content Type: courseMentors
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - name (Short Text)
  - title (Short Text)
  - specialization (Short Text)
  - bio (Long Text)
  - photo (Media)
  - industryExperience (Number)
  - linkedInUrl (Short Text)
  - displayOrder (Number)
```

#### 11. Course Facilities
```yaml
Content Type: courseFacilities
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - name (Short Text)
  - description (Long Text)
  - image (Media)
  - specifications (Long Text)
  - accessDetails (Short Text)
  - displayOrder (Number)
```

#### 12. Student Portfolio
```yaml
Content Type: studentPortfolio
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - projectTitle (Short Text)
  - studentName (Short Text)
  - cohort (Short Text)
  - description (Long Text)
  - thumbnail (Media)
  - projectUrl (Short Text)
  - projectType (Short Text)
  - displayOrder (Number)
```

#### 13. Alumni Stories
```yaml
Content Type: alumniStories
Status: ❓ To Be Created
Fields:
  - course (Reference to course)
  - alumniName (Short Text)
  - photo (Media)
  - graduationYear (Number)
  - currentRole (Short Text)
  - company (Short Text)
  - successStory (Rich Text)
  - quote (Long Text)
  - linkedInUrl (Short Text)
  - displayOrder (Number)
```

#### 14. Industry Partners
```yaml
Content Type: industryPartners
Status: ❓ To Be Created
Fields:
  - course (Reference to course, optional for global partners)
  - companyName (Short Text)
  - logo (Media)
  - partnershipType (Short Text)
  - description (Long Text)
  - websiteUrl (Short Text)
  - displayOrder (Number)
```

### API Endpoints Created

```
✅ /api/v3/course-details?slug={slug}
✅ /api/v3/course-faqs?slug={slug}
✅ /api/v3/course-sections?slug={slug}&section={sectionName}
✅ /api/v3/course-articles?slug={slug}
❓ /api/v3/related-articles?slug={slug} (optional)
```

---

## ⚡ PRIORITY LEVELS

### 🔴 CRITICAL - Launch Blockers
**Cannot publish course page without these:**

1. ✅ Course cover image (1200x630px)
2. ✅ Course name & slug
3. ✅ About the course (300-500 words rich text)
4. ✅ Quick facts (duration, award level, intakes, delivery mode)
5. ✅ Learning outcomes (8-12 bullet points)
6. ✅ FAQs (minimum 8 questions)
7. ✅ Basic SEO metadata (title, description, keywords)
8. ✅ Program type & award level

**Timeline:** Must complete before course page goes live

---

### 🟠 HIGH PRIORITY - High Impact
**Significantly improves conversion and user experience:**

1. 🌟 Student testimonials (3-5 with photos)
2. 🌟 Course benefits (4-6 clear benefits)
3. 🌟 Payment plan information
4. 🌟 Career outcomes (job titles, salaries)
5. 🌟 Course mentors/faculty (3-6 profiles)
6. 🌟 Curriculum overview (semester breakdown)
7. 🌟 Facilities & equipment (4-6 photos)

**Timeline:** Complete within 1-2 weeks of launch

---

### 🟡 MEDIUM PRIORITY - Enhancements
**Nice to have, improves credibility and depth:**

1. 💡 Course leader profile
2. 💡 Industry quote
3. 💡 Alumni stories (3-6 profiles)
4. 💡 Student portfolio showcase (6-9 projects)
5. 💡 Assessment breakdown
6. 💡 Students in action photos (8-12 photos)
7. 💡 Industry partners logos

**Timeline:** Ongoing, add as content becomes available

---

### 🟢 LOW PRIORITY - Future Enhancements
**Optional, can be added later:**

1. ⭕ Industry trends analysis
2. ⭕ Related resources/blog links
3. ⭕ Course overview video
4. ⭕ Virtual campus tour
5. ⭕ Downloadable brochures
6. ⭕ Student testimonial videos

**Timeline:** 3-6 months after launch, continuous improvement

---

## ✍️ CONTENT WRITING GUIDELINES

### Tone & Voice

**ADMI Brand Voice:**
- **Professional but approachable** - Not academic/dry, not overly casual
- **Action-oriented** - Focus on doing, creating, building
- **Aspirational but realistic** - Dreams are achievable with hard work
- **African-centered** - Celebrate African creativity and contexts

**Avoid:**
- Corporate jargon ("synergy", "paradigm", "leverage")
- Academic stuffiness ("pursuant to", "in accordance with")
- Hype without substance ("best in the world", "guaranteed success")
- Condescending language (don't talk down to students)

---

### Writing Style

#### Headlines & Titles
```
✅ DO: "Master Film Production with Industry Mentors"
❌ DON'T: "Comprehensive Film and Television Production Programme"

✅ DO: "85% of Graduates Employed Within 6 Months"
❌ DON'T: "Career Outcome Success Metrics"

✅ DO: "Learn on RED Cameras & Professional Edit Suites"
❌ DON'T: "Utilize State-of-the-Art Equipment"
```

#### Body Copy
- **Active voice:** "You'll create 8 projects" NOT "8 projects will be created"
- **Second person:** "You'll master..." NOT "Students will master..."
- **Specific numbers:** "3-5 days per week" NOT "regular attendance"
- **Concrete examples:** "RED Komodo, DaVinci Resolve" NOT "industry tools"

#### Call-to-Actions
```
✅ DO: "Apply Now - Limited Seats Available"
✅ DO: "Start Your Application Today"
✅ DO: "Talk to an Advisor"

❌ DON'T: "Click Here"
❌ DON'T: "Learn More"
❌ DON'T: "Submit"
```

---

### SEO Writing Best Practices

#### Keyword Integration
- **Natural placement** - Keywords should flow naturally, not stuffed
- **Vary phrasing** - Use synonyms and related terms
- **Location targeting** - Include "Kenya", "Nairobi", "East Africa" naturally

**Example:**
```
✅ GOOD:
"The Film & Television Production Diploma is one of Kenya's leading filmmaking programmes. Based in Nairobi, you'll learn cinematography, editing, and directing from industry professionals. Our graduates work at top Kenyan media houses and international production companies."

❌ BAD (keyword stuffing):
"Film production Kenya film production Nairobi film school Kenya best film school Nairobi Kenya filmmaking diploma Kenya film production course Nairobi best film school Kenya..."
```

#### Header Tags (H1-H6)
```html
H1: Course name (one per page, automatically handled)
H2: Major section headers (About, Why This Course, Curriculum)
H3: Subsections (Semester 1, Benefits, FAQs)
H4: Minor subsections (specific topics within H3)
```

---

### Accessibility Guidelines

#### Alt Text for Images
```
✅ DO: "Student operates RED Komodo camera during location shoot"
✅ DO: "Peter Njenga, Senior Lecturer in Cinematography"

❌ DON'T: "Image123.jpg"
❌ DON'T: "Picture of student"
```

#### Link Text
```
✅ DO: "Read about our payment plans"
✅ DO: "View the full curriculum (PDF)"

❌ DON'T: "Click here"
❌ DON'T: "Link"
```

#### Lists & Structure
- Use bulleted lists for 3+ related items
- Keep paragraphs to 3-4 sentences max
- Use tables for comparison data (fees, intakes)
- Break up long text with images or quotes

---

### Cultural Considerations

#### Kenyan/East African Context
- **Currency:** Always use KES (Kenyan Shillings), not USD
- **Dates:** Use DD/MM/YYYY format or "15 March 2026"
- **Names:** Include Kenyan names in examples (not just Western names)
- **References:** Mention local companies, not just international ones
- **Language:** British English spelling (programme, colour, centre)

#### Financial Sensitivity
- Be transparent about costs (don't hide fees)
- Prominently feature payment plans and financing options
- Acknowledge cost concerns, offer solutions
- Mention bursaries/scholarships if available

#### Career Realism
- Don't promise guaranteed employment
- Be specific about average outcomes (percentages, realistic salaries)
- Mention success requires effort and skill development
- Highlight support services (career counseling, job board)

---

## 📊 CONTENT AUDIT CHECKLIST

Before publishing a course page, verify:

### Content Completeness
- [ ] All CRITICAL priority items complete
- [ ] Minimum 8 FAQs with comprehensive answers
- [ ] At least 3 student testimonials with photos
- [ ] Course cover image optimized (<200KB)
- [ ] About the course 300+ words, well-structured
- [ ] Learning outcomes list (8-12 items)

### Quality Check
- [ ] No placeholder text ("Lorem ipsum", "Coming soon")
- [ ] All links tested and working
- [ ] No spelling or grammar errors
- [ ] Photos show real ADMI students/facilities (not stock photos)
- [ ] Currency always in KES (not USD)
- [ ] Dates are current (no references to 2024 if we're in 2026)

### SEO Validation
- [ ] Meta title 50-60 characters
- [ ] Meta description 145-155 characters with CTA
- [ ] All images have descriptive alt text
- [ ] Course Schema implemented
- [ ] FAQ Schema implemented
- [ ] Breadcrumb Schema implemented
- [ ] No broken internal links

### Accessibility
- [ ] All images have alt text
- [ ] Link text is descriptive
- [ ] Good contrast ratios (text readable on backgrounds)
- [ ] Heading hierarchy correct (no skipped levels)

### Mobile Experience
- [ ] All images responsive and load fast
- [ ] Text readable on small screens
- [ ] CTAs easily tappable (44x44px minimum)
- [ ] No horizontal scrolling required

---

## 🚀 QUICK START GUIDE

### For a New Course Page

**Week 1: Foundation**
1. Create course entry in Contentful with basic info
2. Write 400-500 word "About the Course" section
3. Compile 10-15 FAQs from admissions team
4. Source high-quality cover image
5. Define learning outcomes (10-12 bullet points)

**Week 2: Conversion Content**
6. Gather 3-5 student testimonials (photos + quotes)
7. Define 4-6 clear course benefits
8. Document payment plans and pricing
9. List career outcomes and job titles
10. Create SEO metadata (title, description, keywords)

**Week 3: Deep Dive Content**
11. Detail curriculum (semester-by-semester breakdown)
12. Profile 3-6 course mentors/faculty
13. Photograph facilities and equipment (6-8 images)
14. Compile assessment breakdown details

**Week 4: Polish & Launch**
15. Add alumni stories (2-3 profiles)
16. Source student portfolio items (6-9 projects)
17. Add industry partner logos
18. Final SEO and accessibility audit
19. **LAUNCH** 🎉

---

## 📞 SUPPORT & RESOURCES

### Internal Contacts
- **Content questions:** Content Strategy Team
- **CMS access:** Web Development Team
- **Photography:** Marketing Department
- **Student testimonials:** Student Affairs Office
- **Faculty profiles:** Academic Affairs

### External Resources
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Schema.org Course](https://schema.org/Course)
- [Google Search Console](https://search.google.com/search-console)
- [WebAIM Accessibility Checklist](https://webaim.org/standards/wcag/checklist)

---

## 📝 REVISION HISTORY

| Date | Version | Changes |
|------|---------|---------|
| 18 Feb 2026 | 1.0 | Initial guide created based on current course page structure |

---

**Questions or feedback?** Contact the Web Development Team or create an issue in the project repository.
