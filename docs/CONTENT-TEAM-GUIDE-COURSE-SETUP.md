# Content Team Guide: Course Page Setup in Contentful

## Overview

This guide explains how to set up all course page content in Contentful after running the migration scripts. The course pages now have **enhanced content types** with new fields for:

- Student portfolio YouTube/Vimeo links
- Payment plans and pricing
- Semester-by-semester curriculum
- Alumni success stories
- Industry partnerships
- Facilities and equipment showcases
- Career outcomes data

## Prerequisites

**Scripts must be run first by a developer:**

```bash
# Step 1: Add missing fields to existing content types
npm run contentful:add-course-fields

# Step 2: Create new content types
npm run contentful:create-course-types

# OR run both together:
npm run contentful:setup-courses
```

## What Changed

### ✅ Enhanced Existing Content Types

#### 1. **studentPortfolio** (16 existing entries)

**NEW FIELDS:**

- `projectUrl` - **🔥 CRITICAL** - YouTube, Vimeo, or project links
- `projectTitle` - Title of the project
- `cohort` - e.g., "Class of 2024"
- `description` - Brief project description
- `thumbnail` - Project thumbnail image
- `displayOrder` - Control sort order

**ACTION:** Go through all 16 student portfolios and add YouTube/Vimeo links

#### 2. **testimonial** (6 existing entries)

**NEW FIELDS:**

- `program` - Which course/program
- `cohort` - e.g., "Class of 2024"
- `currentRole` - Current job title
- `company` - Where they work now
- `displayOrder` - Control sort order

**ACTION:** Update testimonials with career progression details

#### 3. **courseLeaderMentor** (19 existing entries)

**NEW FIELDS:**

- `specialization` - Area of expertise
- `industryExperience` - Years in industry
- `linkedInUrl` - LinkedIn profile link
- `displayOrder` - Control sort order

**ACTION:** Add professional details for all mentors

#### 4. **faq** (187 existing entries)

**NEW FIELDS:**

- `category` - Choose from: Admission, Fees & Payment, Duration & Schedule, Career Outcomes, Equipment & Facilities, General
- `displayOrder` - Control sort order

**ACTION:** Categorize existing FAQs for better organization

### 🆕 New Content Types Created

#### 5. **courseSemesters** (NEW)

**Purpose:** Semester-by-semester curriculum breakdown

**Required Fields:**

- `semesterName` - e.g., "Semester 1: Foundation"
- `semesterNumber` - 1, 2, 3, etc.
- `modules` - Array of module names
- `relatedCourse` - Link to course

**Optional Fields:**

- `description` - What students learn this semester
- `learningOutcomes` - Array of learning outcomes

**Example:**

```
Semester Name: Semester 1: Audio Fundamentals
Semester Number: 1
Modules:
  - Introduction to Audio Engineering
  - Acoustics and Sound Physics
  - Studio Equipment Basics
Description: Foundation semester covering core audio concepts
Learning Outcomes:
  - Understand sound wave properties
  - Operate basic studio equipment
  - Apply acoustic principles
Related Course: [Link to Audio Production Diploma]
```

#### 6. **paymentPlans** (NEW)

**Purpose:** Payment options and financing plans

**Required Fields:**

- `planName` - e.g., "Full Payment Discount"
- `planType` - Choose from: Full Payment, Installments, Scholarship, Loan, Early Bird
- `totalAmount` - Total cost
- `description` - Plan details

**Optional Fields:**

- `installmentCount` - Number of payments
- `installmentAmount` - Amount per payment
- `benefits` - Array of benefits
- `eligibilityCriteria` - Who qualifies
- `displayOrder` - Sort order
- `relatedCourses` - Link to courses

**Example:**

```
Plan Name: 3-Installment Plan
Plan Type: Installments
Total Amount: 450000 (KES)
Installment Count: 3
Installment Amount: 150000
Description: Pay in 3 equal installments over the semester
Benefits:
  - No interest
  - No upfront full payment required
  - Flexible payment dates
Eligibility Criteria: All students welcome. First installment due at enrollment.
Related Courses: [Link to Music Production Diploma]
```

#### 7. **courseFacilities** (NEW)

**Purpose:** Showcase equipment and facilities

**Required Fields:**

- `facilityName` - e.g., "SSL 4000 Console"
- `facilityType` - Choose from: Studio, Lab, Equipment, Software, Library, Other
- `description` - What it's used for
- `image` - Photo of the facility

**Optional Fields:**

- `specifications` - Array of specs
- `displayOrder` - Sort order
- `relatedCourses` - Link to courses

**Example:**

```
Facility Name: SSL 4000 E-Series Console
Facility Type: Equipment
Description: Industry-standard mixing console used for recording and mixing projects
Specifications:
  - 48 channels
  - Total recall automation
  - Built-in dynamics processing
  - Classic SSL EQ
Image: [Upload photo of the console]
Related Courses: [Audio Production, Music Production]
```

#### 8. **alumniStories** (NEW)

**Purpose:** Success stories from graduates

**Required Fields:**

- `alumniName` - Graduate's name
- `graduationYear` - Year they graduated
- `currentRole` - Current job title
- `company` - Where they work
- `story` - Their success story (text)
- `image` - Professional photo
- `relatedCourse` - Link to their course

**Optional Fields:**

- `videoUrl` - YouTube interview link
- `achievements` - Array of key achievements
- `linkedInUrl` - LinkedIn profile
- `displayOrder` - Sort order

**Example:**

```
Alumni Name: Sarah Mwangi
Graduation Year: 2023
Current Role: Audio Engineer
Company: Ketebul Music
Story: "After graduating from ADMI's Audio Production program, I've been working on award-winning albums for East African artists. The hands-on training and industry connections at ADMI opened doors I never thought possible."
Video URL: https://youtube.com/watch?v=xxxxx
Achievements:
  - Worked on 3 Grammy-nominated albums
  - Sound engineer for Coke Studio Africa
  - Opened own recording studio in 2025
LinkedIn URL: https://linkedin.com/in/sarah-mwangi
Image: [Upload professional photo]
Related Course: [Link to Audio Production Diploma]
```

#### 9. **industryPartners** (NEW)

**Purpose:** Companies and organizations partnering with ADMI

**Required Fields:**

- `companyName` - Partner name
- `partnershipType` - Choose from: Employer Partner, Equipment Sponsor, Guest Lecturer, Internship Provider, Project Partner
- `logo` - Company logo (transparent PNG preferred)

**Optional Fields:**

- `description` - Partnership details
- `websiteUrl` - Company website
- `displayOrder` - Sort order
- `relatedCourses` - Link to courses

**Example:**

```
Company Name: Ketebul Music
Partnership Type: Employer Partner
Logo: [Upload Ketebul logo]
Description: Leading music production house providing internships and employment opportunities for ADMI graduates
Website URL: https://ketebulmusic.org
Related Courses: [Music Production, Audio Production]
```

#### 10. **industryQuote** (NEW)

**Purpose:** Quotes from industry professionals

**Required Fields:**

- `personName` - Expert's name
- `personRole` - Their job title
- `company` - Where they work
- `quote` - What they said

**Optional Fields:**

- `image` - Professional photo
- `displayOrder` - Sort order
- `relatedCourses` - Link to courses

**Example:**

```
Person Name: David Odhiambo
Person Role: Head of Audio Production
Company: Homeboyz Radio
Quote: "The demand for skilled audio engineers in Kenya is growing exponentially. ADMI graduates bring both technical expertise and creative thinking that our industry desperately needs."
Image: [Upload photo]
Related Courses: [Audio Production, Music Production]
```

#### 11. **coursePhotos** (NEW)

**Purpose:** Photo galleries for courses

**Required Fields:**

- `title` - Photo title
- `photoCategory` - Choose from: Studio, Classroom, Student Work, Events, Facilities, Campus Life
- `image` - The photo
- `relatedCourse` - Link to course

**Optional Fields:**

- `caption` - Photo description
- `displayOrder` - Sort order

**Example:**

```
Title: Students Recording Live Session
Photo Category: Studio
Image: [Upload photo]
Caption: Second-year students recording a live band in our main studio
Related Course: [Link to Audio Production Diploma]
```

#### 12. **careerOutcomes** (NEW)

**Purpose:** Career statistics and outcomes

**Required Fields:**

- `outcomeName` - e.g., "2024 Graduate Outcomes"
- `dataYear` - Year of data (e.g., 2024)
- `relatedCourse` - Link to course

**Optional Fields:**

- `employmentRate` - % employed (e.g., 85)
- `averageSalary` - Starting salary
- `topJobRoles` - Array of common job titles
- `topEmployers` - Array of companies
- `description` - Additional context

**Example:**

```
Outcome Name: 2024 Audio Production Graduate Outcomes
Data Year: 2024
Employment Rate: 87
Average Salary: 45000 (KES/month)
Top Job Roles:
  - Studio Engineer
  - Live Sound Engineer
  - Freelance Audio Producer
  - Radio Production Assistant
Top Employers:
  - Radio Africa Group
  - Homeboyz Radio
  - Ketebul Music
  - Standard Group
Description: Based on a survey of 50 graduates from the Class of 2024
Related Course: [Link to Audio Production Diploma]
```

## Content Entry Workflow

### Phase 1: Update Existing Content (Week 1)

**Priority 1 - CRITICAL:** Add YouTube/Vimeo links to student portfolios

1. Go to **Content** → **studentPortfolio**
2. Open each of the 16 entries
3. Add `projectUrl` field with YouTube/Vimeo link
4. Add `projectTitle` if applicable
5. Add `displayOrder` (1, 2, 3, etc.) to control sort order
6. Save and publish

**Priority 2:** Update testimonials with career details

1. Go to **Content** → **testimonial**
2. Update all 6 entries with:
   - Current role
   - Company
   - Cohort (e.g., "Class of 2024")
3. Save and publish

**Priority 3:** Enhance mentor profiles

1. Go to **Content** → **courseLeaderMentor**
2. Add LinkedIn URLs and specializations
3. Save and publish

### Phase 2: Add Essential Course Content (Week 2)

For EACH course (start with flagship courses):

**Step 1: Create Semesters/Modules** (courseSemesters)

- Add 2-4 semester entries per course
- Include all module names
- Add learning outcomes

**Step 2: Add Payment Plans** (paymentPlans)

- Create 2-3 payment options per course
- Include full payment, installments, scholarships
- Link to course

**Step 3: Add Alumni Stories** (alumniStories)

- Add 2-3 success stories per course
- Include photos and video interviews if available
- Link to course

### Phase 3: Build Credibility (Week 3-4)

**Step 4: Add Industry Partners** (industryPartners)

- Upload company logos
- Add partnership descriptions
- Link to relevant courses

**Step 5: Add Industry Quotes** (industryQuote)

- Get quotes from industry professionals
- Include titles and companies
- Link to courses

**Step 6: Showcase Facilities** (courseFacilities)

- Photograph all major equipment
- Write descriptions and specifications
- Link to courses that use them

### Phase 4: Visual Content (Ongoing)

**Step 7: Add Course Photos** (coursePhotos)

- Upload 10-20 photos per course
- Categorize properly
- Add captions
- Link to course

**Step 8: Add Career Data** (careerOutcomes)

- Gather employment statistics
- Survey recent graduates
- Add salary and job role data
- Link to course

## Linking Content to Courses

**IMPORTANT:** All new content types have a `relatedCourse` or `relatedCourses` field.

### To Link Content:

1. When creating an entry (e.g., Alumni Story)
2. Find the `Related Course` field
3. Click **Add existing entry**
4. Select the course from the list
5. Save and publish

### Courses Currently in Contentful (13):

Based on inspection, these courses exist:

- Audio Production
- Music Production
- Film & Television Production
- Photography & Imaging
- Animation & Visual Effects
- Game Design
- Graphic Design
- Web Development
- Software Development
- UI/UX Design
- Digital Marketing
- Journalism & Media Studies
- Business & Entrepreneurship

## Content Writing Tips

### For Student Portfolios:

- ✅ Use actual YouTube video URLs (e.g., `https://youtube.com/watch?v=xxxxx`)
- ✅ Use Vimeo URLs (e.g., `https://vimeo.com/xxxxx`)
- ✅ Use project websites if available
- ❌ Don't use internal file links

### For Payment Plans:

- ✅ Be transparent about pricing
- ✅ Clearly state eligibility criteria
- ✅ List all benefits
- ❌ Don't make promises you can't keep
- ❌ Don't forget to link to courses

### For Alumni Stories:

- ✅ Use real graduate names and stories
- ✅ Include specific achievements
- ✅ Add LinkedIn profiles for credibility
- ✅ Use professional photos
- ❌ Don't use stock photos or fake stories

### For Facilities:

- ✅ Use high-quality photos (well-lit, professional)
- ✅ Include technical specifications
- ✅ Explain what students do with the equipment
- ❌ Don't use blurry or dark photos

## Quality Checklist

Before publishing course content, verify:

- [ ] All student portfolios have YouTube/Vimeo links
- [ ] Each course has 2-4 semester entries
- [ ] Each course has 2-3 payment plan options
- [ ] Each course has 2-3 alumni stories
- [ ] Each course is linked to relevant industry partners
- [ ] Each course has 5-10 facility/equipment entries
- [ ] Each course has 10+ photos
- [ ] Each course has current year career outcome data
- [ ] All entries are published (not draft)
- [ ] All images are uploaded and displaying correctly
- [ ] All links work (YouTube, LinkedIn, company websites)

## Priority Courses

**Start with these high-priority courses:**

1. Music Production Diploma (highest traffic)
2. Film & Television Production
3. Audio Production Diploma
4. Photography & Imaging
5. Animation & Visual Effects

Complete ALL content for these 5 courses first before moving to others.

## Need Help?

### Common Issues:

**Q: I don't see the new content types**
A: Make sure developer ran `npm run contentful:setup-courses` first

**Q: I can't add projectUrl to student portfolio**
A: Content type needs to be migrated first. Ask developer to run `npm run contentful:add-course-fields`

**Q: YouTube link not working**
A: Make sure you're using the full URL (e.g., `https://youtube.com/watch?v=xxxxx`)

**Q: How do I know displayOrder values?**
A: Lower numbers appear first (1, 2, 3). Use increments of 10 (10, 20, 30) to allow for easy reordering later

**Q: Can I edit content that's already published?**
A: Yes! Edit and republish anytime. Changes are live immediately.

## Next Steps After Content Entry

Once content is added:

1. **Test on staging:** Visit `https://staging.admi.africa/courses/[course-slug]` to preview
2. **Review with team:** Check accuracy of all information
3. **Collect feedback:** Get input from faculty and students
4. **Deploy to production:** Merge staging → main branch
5. **Monitor results:** Track engagement with new content sections

---

**Questions?** Contact the development team or refer to the [Course Page Content Guide](./COURSE-PAGE-CONTENT-GUIDE.md) for detailed specifications.
