# Contentful Course Content Types - Current State vs Needed

**Generated:** 18 February 2026  
**Space ID:** qtu3mga6n6gc  
**Environment:** master

---

## ✅ EXISTING CONTENT TYPES (Ready to Use)

### 1. **course** (13 entries) ✅
- **Status:** PRIMARY - Already configured
- **Fields Available:**
  - ✅ Basic Info: `slug`, `name`, `coverImage`, `awardLevel`, `tuitionFees`, `creditHours`
  - ✅ Content: `aboutTheCourse`, `description`, `learningOutcomes`, `careerOptions`
  - ✅ Media: `courseVideo`
  - ✅ Metadata: `intakes`, `intakeMonths`, `educationalLevel`, `category`, `subtitle`
  - ✅ Relationships (Arrays):
    - `courseBenefits` → courseBenefit
    - `courseLeadersMentors` → courseLeaderMentor
    - `studentPortfolio` → studentPortfolio
    - `studentReviews` → studentReview
    - `faqs` → faq
    - `applicationProcesses` → applicationProcess
    - `testimonials` → testimonial
    - `programType` → program

**What's Missing from Core Course:**
- ❌ `courseSemesters` relationship (curriculum breakdown)
- ❌ `paymentPlans` relationship
- ❌ `facilitiesEquipment` relationship
- ❌ `alumniStories` relationship
- ❌ `industryPartners` relationship
- ❌ `mentors` relationship (separate from courseLeaders)
- ❌ `industryQuote` relationship

---

### 2. **courseBenefit** (71 entries) ✅
- **Status:** Working - "Why This Course" section
- **Fields:**
  - ✅ `title` (Symbol, required)
  - ✅ `text` (RichText, required)
  - ✅ `icon` (Link to Asset, required)
- **Used For:** Course benefits/advantages
- **Matches Guide Section:** ✅ "Why This Course / Benefits"

---

### 3. **courseLeaderMentor** (19 entries) ✅
- **Status:** Working - Faculty profiles
- **Fields:**
  - ✅ `name` (Symbol, required)
  - ✅ `slug` (Symbol, required)
  - ⚠️  `professionalTitle` (Symbol, optional)
  - ⚠️  `jobTitle` (Symbol, optional)
  - ⚠️  `bio` (RichText, optional)
  - ⚠️  `image` (Link to Asset, optional)
  - ⚠️  `socialMediaLink` (Symbol, optional - LinkedIn?)
- **Used For:** Course leader profiles
- **Matches Guide Section:** ✅ "Course Leader" + Partial "Mentors Grid"
- **Missing Fields:**
  - ❌ `specialization` field
  - ❌ `industryExperience` (number) field
  - ❌ Separate distinction between leaders vs mentors

---

### 4. **faq** (187 entries) ✅
- **Status:** Working - FAQ sections
- **Fields:**
  - ✅ `question` (Symbol, required)
  - ✅ `answer` (RichText, required)
  - ✅ `course` (Link to course, optional - for course-specific FAQs)
- **Used For:** General and course-specific FAQs
- **Matches Guide Section:** ✅ "FAQ Section"
- **Missing Fields:**
  - ❌ `displayOrder` (for sorting)
  - ❌ `category` (for grouping: Admission, Fees, Career, etc.)

---

### 5. **applicationProcess** (6 entries) ✅
- **Status:** Working - Application steps
- **Fields:**
  - ✅ `title` (Symbol, required)
  - ⚠️  `text` (RichText, optional)
- **Used For:** Step-by-step application instructions
- **Matches Guide Section:** ✅ "Application Steps"

---

### 6. **program** (4 entries) ✅
- **Status:** Working - Program types
- **Fields:**
  - ✅ `name` (Symbol, required)
  - ✅ `duration` (Symbol, required)
  - ✅ `deliveryMode` (Symbol, required)
  - ⚠️  `termLength` (Symbol, optional)
  - ⚠️  `icon` (Link to Asset, optional)
- **Used For:** Program metadata (Diploma, Certificate, etc.)
- **Matches Guide Section:** ✅ Used in "Quick Facts Bar"

---

### 7. **studentPortfolio** (16 entries) ✅
- **Status:** Working - Student work showcase
- **Fields:**
  - ⚠️  `studentName` (Symbol, optional)
  - ⚠️  `professionalTitle` (Symbol, optional)
  - ⚠️  `profilePicture` (Link to Asset, optional)
  - ⚠️  `bio` (RichText, optional)
  - ⚠️  `assets` (Array of Assets, optional)
  - ⚠️  `relatedCourses` (Array of courses, optional)
  - ⚠️  `projectType` (Symbol, optional)
- **Used For:** Student portfolios and projects
- **Matches Guide Section:** ✅ "Student Portfolio"
- **Missing Fields:**
  - ❌ `projectTitle` (currently uses studentName?)
  - ❌ `cohort` field
  - ❌ `description` of project
  - ❌ `thumbnail` (separate from assets?)
  - ❌ `projectUrl` field ⚠️ **CRITICAL - For YouTube/Vimeo links!**
  - ❌ `displayOrder` field

---

### 8. **testimonial** (6 entries) ✅
- **Status:** Working - Student testimonials
- **Fields:**
  - ✅ `fullName` (Symbol, required)
  - ✅ `testimonial` (RichText, required)
  - ✅ `role` (Symbol, required)
  - ✅ `image` (Link to Asset, required)
  - ⚠️  `relatedCourses` (Array of courses, optional)
  - ⚠️  `courseCategory` (Symbol, optional)
- **Used For:** Student testimonials and reviews
- **Matches Guide Section:** ✅ "Student Testimonials"
- **Missing Fields:**
  - ❌ `program` field
  - ❌ `cohort` field (e.g., "Class of 2024")
  - ❌ `currentRole` field (for alumni)
  - ❌ `company` field
  - ❌ `displayOrder` field

---

## ❌ MISSING CONTENT TYPES (Need to Create)

### 9. **courseSemesters** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Curriculum breakdown by semester
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - semesterNumber: Number (required)
  - semesterName: Symbol (required)
  - duration: Symbol (required)
  - modules: Array of Symbols (required)
  - keyProjects: Array of Symbols (optional)
  - learningOutcomes: Long Text (optional)
  - displayOrder: Number (required)
  ```
- **Guide Section:** "Curriculum Overview"
- **Priority:** 🟠 HIGH

---

### 10. **paymentPlans** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Payment options and financing
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - totalPerSemester: Symbol (required)
  - installmentOptions: Long Text (required)
  - discountMessage: Long Text (optional)
  - financingPartners: Array of Symbols (optional)
  ```
- **Guide Section:** "Payment Plan"
- **Priority:** 🟠 HIGH

---

### 11. **courseFacilities** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Equipment and facility showcase
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - name: Symbol (required)
  - description: Long Text (required)
  - image: Link to Asset (required)
  - specifications: Long Text (optional)
  - accessDetails: Symbol (optional)
  - displayOrder: Number (required)
  ```
- **Guide Section:** "Equipment & Facilities"
- **Priority:** 🟠 HIGH

---

### 12. **courseMentors** ❌
- **Status:** MISSING (or merge with courseLeaderMentor?)
- **Purpose:** Full faculty/mentor profiles for Deep Dive
- **Note:** Could potentially extend `courseLeaderMentor` instead
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - name: Symbol (required)
  - title: Symbol (required)
  - specialization: Symbol (optional)
  - bio: Long Text (required)
  - photo: Link to Asset (required)
  - industryExperience: Number (optional)
  - linkedInUrl: Symbol (optional)
  - displayOrder: Number (required)
  ```
- **Guide Section:** "Mentors Grid"
- **Priority:** 🟡 MEDIUM
- **Recommendation:** ⚠️ **Extend existing `courseLeaderMentor` instead of creating new**

---

### 13. **alumniStories** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Alumni success stories
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - alumniName: Symbol (required)
  - photo: Link to Asset (required)
  - graduationYear: Number (required)
  - currentRole: Symbol (required)
  - company: Symbol (optional)
  - successStory: Rich Text (required)
  - quote: Long Text (required)
  - linkedInUrl: Symbol (optional)
  - displayOrder: Number (required)
  ```
- **Guide Section:** "Alumni Stories"
- **Priority:** 🟠 HIGH

---

### 14. **industryPartners** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Partner company logos and details
- **Required Fields:**
  ```yaml
  - course: Link to course (optional - leave empty for global)
  - companyName: Symbol (required)
  - logo: Link to Asset (required)
  - partnershipType: Symbol (optional)
  - description: Long Text (optional)
  - websiteUrl: Symbol (optional)
  - displayOrder: Number (required)
  ```
- **Guide Section:** "Industry Partners"
- **Priority:** 🟡 MEDIUM

---

### 15. **industryQuote** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Industry testimonial/validation quote
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - quote: Long Text (required)
  - authorName: Symbol (required)
  - authorRole: Symbol (required)
  - authorCompany: Symbol (optional)
  - authorPhoto: Link to Asset (optional)
  ```
- **Guide Section:** "Industry Quote"
- **Priority:** 🟡 MEDIUM

---

### 16. **industryTrends** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Industry trend analysis
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - trendTitle: Symbol (required)
  - description: Long Text (required)
  - relevanceToCourse: Long Text (required)
  - statistic: Symbol (optional)
  - source: Symbol (optional)
  - date: Date (optional)
  - displayOrder: Number (required)
  ```
- **Guide Section:** "Industry Trends"
- **Priority:** 🟢 LOW

---

### 17. **coursePhotos** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Students in action photo gallery
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - image: Link to Asset (required)
  - caption: Symbol (optional)
  - photoType: Symbol (optional)
  - displayOrder: Number (required)
  ```
- **Guide Section:** "Students in Action"
- **Priority:** 🟡 MEDIUM

---

### 18. **careerOutcomes** ❌
- **Status:** MISSING - Need to create
- **Purpose:** Career outcomes and job statistics
- **Note:** Data currently stored in `careerOptions` field on course
- **Required Fields:**
  ```yaml
  - course: Link to course (required)
  - jobTitles: Array of Symbols (required)
  - averageSalaryLow: Number (required)
  - averageSalaryHigh: Number (required)
  - currency: Symbol (required)
  - hiringCompanies: Array of Symbols (optional)
  - employmentRate: Number (optional)
  - industryStatistics: Long Text (optional)
  ```
- **Guide Section:** "Career Outcomes"
- **Priority:** 🟠 HIGH
- **Recommendation:** ⚠️ **Could potentially just enhance `course.careerOptions` field usage**

---

## 🔧 REQUIRED MODIFICATIONS TO EXISTING TYPES

### **studentPortfolio** - Add Missing Fields
```yaml
Fields to ADD:
  - projectTitle: Symbol (required) - rename/add separate from studentName
  - cohort: Symbol (optional) - e.g., "Class of 2024"
  - description: Long Text (required) - project description
  - thumbnail: Link to Asset (required) - separate project thumbnail
  - projectUrl: Symbol (optional) ⚠️ **CRITICAL - YouTube/Vimeo/portfolio links**
  - displayOrder: Number (required)
```

### **testimonial** - Add Missing Fields
```yaml
Fields to ADD:
  - program: Symbol (optional) - program name
  - cohort: Symbol (optional) - e.g., "Class of 2024"
  - currentRole: Symbol (optional) - for employed alumni
  - company: Symbol (optional) - current employer
  - displayOrder: Number (required)
```

### **courseLeaderMentor** - Add Missing Fields
```yaml
Fields to ADD:
  - specialization: Symbol (optional) - teaching specialty
  - industryExperience: Number (optional) - years of experience
  - displayOrder: Number (required)
  
Fields to RENAME/CLARIFY:
  - socialMediaLink → linkedInUrl (be specific)
```

### **faq** - Add Missing Fields
```yaml
Fields to ADD:
  - displayOrder: Number (required)
  - category: Symbol (optional) - Admission, Fees, Career, Duration, Equipment
```

---

## 📊 SUMMARY

### Content Type Status
- ✅ **Existing & Working:** 8 content types
- 🔧 **Existing but Need Updates:** 4 content types
- ❌ **Missing (Need to Create):** 10 content types

### Field Priority for studentPortfolio
```
🔴 CRITICAL - Add immediately:
   - projectUrl (for YouTube/Vimeo links)
   - displayOrder (for sorting)

🟠 HIGH - Add soon:
   - projectTitle (separate from studentName)
   - description (project details)
   - thumbnail (project image)
   - cohort (class year)
```

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: Quick Wins (Immediate) 🔴
1. **Add `projectUrl` field to `studentPortfolio`** ⚠️ Most important!
2. **Add `displayOrder` to `faq`, `testimonial`, `studentPortfolio`**
3. **Add missing fields to `testimonial`** (cohort, currentRole, company)

### Phase 2: High Priority Content Types (This Week) 🟠
4. Create `courseSemesters` (for curriculum)
5. Create `paymentPlans` (for pricing transparency)
6. Create `courseFacilities` (for equipment showcase)
7. Create `alumniStories` (for credibility)

### Phase 3: Medium Priority (Next 2 Weeks) 🟡
8. Create `industryPartners` (for logos)
9. Create `industryQuote` (for validation)
10. Create `coursePhotos` (for gallery)
11. Enhance `courseLeaderMentor` (add specialization, experience fields)

### Phase 4: Nice to Have (Future) 🟢
12. Create `industryTrends` (for thought leadership)
13. Create `careerOutcomes` (or enhance existing field)

---

## 💡 NOTES

1. **studentPortfolio Enhancement is Critical:**
   - The `projectUrl` field is essential for linking to YouTube/Vimeo
   - Current structure treats it as a person profile, not a project showcase
   - May need to restructure or create separate `studentProject` content type

2. **Reuse vs Create New:**
   - `courseLeaderMentor` can serve both leaders and mentors (add type field?)
   - `careerOutcomes` data might be better as structured field on `course`
   - `testimonial` can serve both students and alumni with minor enhancements

3. **API Endpoints Already Exist:**
   - `/api/v3/course-faqs?slug={slug}` ✅
   - `/api/v3/course-sections?slug={slug}&section={section}` ✅
   - `/api/v3/course-details?slug={slug}` ✅

4. **Code Already Expects:**
   - `studentPortfolio.projectUrl` field (in component)
   - `PortfolioItem.projectUrl` interface (in TypeScript)
   - All API functions ready to fetch linked content

---

**Next Steps:** Ready to create migration scripts for missing content types?
