# DIPLOMA ENROLLMENT OPTIMIZATION - IMPLEMENTATION CHECKLIST

**Status:** 🟢 IN PROGRESS  
**Priority:** 🔴 CRITICAL - Revenue Recovery  
**Target Deployment:** February 14, 2026 (3 days)  
**Expected Impact:** Shift from 30% diploma rate to 70%+ within 30 days

---

## ✅ COMPLETED (Ready for Deployment)

### 1. Lead Scoring System Updated ✅

**File:** `src/components/forms/EnhancedEnquiryForm.tsx`

**Changes Made:**

- ✅ Increased diploma scoring from 4 to 8 points (doubled weight)
- ✅ Reduced certificate scoring from 3 to 2 points
- ✅ Adjusted investment range scoring to favor diploma-level budgets (300-500K = 6 points, perfect diploma range)
- ✅ Updated conversion value calculation to reflect true revenue potential (diploma = $100-200, certificate = $10-50)
- ✅ Enhanced lead quality tiers: "hot_diploma", "warm_diploma" for better tracking
- ✅ Pricing: 4 semesters (100K/68K) + 1 internship (48K) = 450K/320K total
- ✅ Added visual emphasis on diploma option in form (bold text, salary mentions, emoji)
- ✅ Raised lead score cap from 20 to 30 points

**Expected Impact:**

- Diploma leads will score 20-28 points (vs certificate 8-14 points)
- CRM/sales team can prioritize hot diploma leads immediately
- Google Ads conversion value properly reflects diploma LTV ($200 vs $10)

**Deploy:** Push to staging, test form submission, verify Brevo lead capture

---

### 2. Comparison Landing Page Created ✅

**File:** `src/pages/programs/diploma-vs-certificate.tsx`

**Features:**

- ✅ Comprehensive ROI comparison table
- ✅ Side-by-side career outcomes (60-120K vs 25-50K salaries)
- ✅ Visual payment plan options (24K/month installments)
- ✅ "Who should choose what" decision framework
- ✅ Real salary data and 5-year earnings projections
- ✅ FAQ section addressing common objections
- ✅ Strong CTAs pointing to diploma programs

**Expected Impact:**

- Convert 30-40% of certificate-interested visitors to diploma inquiries
- Reduce sticker shock by showing flexible payment options
- Provide sales team with shareable resource for objection handling

**Deploy:**

- Add to main navigation (`/programs/diploma-vs-certificate`)
- Link from homepage hero section
- Add to footer "Programs" section
- Include in all application confirmation emails

---

## 🔄 IN PROGRESS (Complete This Week)

### 3. Homepage Messaging Update 🟡

**File:** `src/pages/index.tsx`  
**Priority:** HIGH (Deploy by Feb 12)

**Required Changes:**

```tsx
// HERO SECTION
Current: "Unlock Your Creative Potential"
New: "Launch a Professional Career with Industry-Recognized Diplomas"

// PRIMARY CTA
Current: "Explore All Courses"
New: "Explore Diploma Programs" (links to /courses?filter=diploma)

// SECONDARY CTA (NEW)
Add: "Compare Diploma vs Certificate" (links to /programs/diploma-vs-certificate)

// SOCIAL PROOF UPDATE
Add: "85% of diploma graduates employed within 3 months earning 60K-120K KES/month"
```

**Implementation Steps:**

1. Update hero title and description to emphasize diploma career outcomes
2. Change primary CTA from generic "courses" to diploma-specific
3. Add diploma success metrics prominently (employment rate, salary range)
4. Reduce certificate program visibility (move to second section)
5. Add testimonials from diploma graduates only (not certificate)

**Expected Impact:** 45-60% of homepage visitors will click diploma programs vs current 25%

---

### 4. Diploma ROI Calculator Component 🟡

**File:** `src/components/shared/DiplomaROICalculator.tsx` (NEW)  
**Priority:** HIGH (Deploy by Feb 13)

**Features to Build:**

```tsx
// Interactive calculator showing:
- User input: Current salary or expected starting salary
- Program cost: 750,000 KES (with payment plan options)
- Expected post-graduation salary: 60K-120K KES/month
- Payback period calculation
- 5-year earnings projection
- Visual chart showing ROI over time
```

**Placement:**

- Diploma course detail pages (`/courses/[diploma-slug]`)
- `/programs/diploma-vs-certificate` page
- Homepage (sticky widget or section)
- Application form (before payment step)

**Expected Impact:** 25% increase in diploma application completion rate

---

### 5. GA4 Custom Event Tracking 🟡

**File:** `src/components/forms/EnhancedEnquiryForm.tsx`  
**Priority:** MEDIUM (Deploy by Feb 14)

**Events to Add:**

```javascript
// Track program type selection
gtag('event', 'program_type_selected', {
  program_type: 'diploma' | 'certificate',
  course_name: courseName,
  lead_score: calculatedScore
})

// Track diploma comparison page views
gtag('event', 'diploma_comparison_viewed', {
  referrer: document.referrer,
  session_id: gaClientId
})

// Track ROI calculator usage
gtag('event', 'roi_calculator_used', {
  input_salary: userSalary,
  calculated_roi: roiValue,
  program_type: 'diploma'
})

// Track payment plan selection
gtag('event', 'payment_plan_viewed', {
  plan_type: 'monthly' | 'semester' | 'full',
  program_type: 'diploma'
})
```

**Implementation:** Update GTM container with new triggers and variables

**Expected Impact:** Better visibility into conversion funnel drop-off points

---

## 📋 PENDING (Next Week Priority)

### 6. Google Ads Campaign Restructure 🔴

**Files:**

- `reports/google-ads/KEYWORDS-MASTER-LIST.md` (update)
- New campaigns in Google Ads dashboard

**Action Items:**

- [ ] Create separate "Diploma Programs" campaign (70% of budget)
- [ ] Add diploma-specific keywords (see strategy doc)
- [ ] Update ad copy to emphasize career outcomes + salary ranges
- [ ] Add negative keywords (exclude "free", "short course", "weekend")
- [ ] Set higher bids for diploma keywords ($4-5 vs $2-3 for certificates)
- [ ] Create diploma-focused landing page variants

**Budget Allocation:**

```
Current: 50/50 split (diploma/certificate)
New: 70/30 split (prioritize diploma)

Diploma Campaign: 70,000 KES/month
Certificate Campaign: 30,000 KES/month
```

---

### 7. Meta Ads Audience Segmentation 🔴

**Platform:** Facebook Ads Manager

**Create New Campaigns:**

**Campaign A: "Diploma Career Launchers"**

- Targeting: Age 22-32, University graduates, Career changers
- Income: Middle to upper-middle class
- Interests: Professional development, career advancement, entrepreneurship
- Creative: Video testimonials, salary comparisons, career progression stories

**Campaign B: "Certificate Skill Builders"**

- Targeting: Age 18-25, Recent high school graduates
- Income: Entry-level
- Interests: Creative hobbies, freelancing, side hustles
- Creative: Quick wins, affordable learning, fast results

**Budget Split:** 70% Diploma, 30% Certificate

---

### 8. Course Page Optimization 🟡

**Files:** All diploma course pages (`/courses/*-diploma.tsx`)

**Add to Every Diploma Page:**

- [ ] "Why Choose Diploma?" section at top (before curriculum)
- [ ] Salary range prominently displayed (60K-120K KES/month)
- [ ] ROI calculator widget (embed DiplomaROICalculator component)
- [ ] Payment plan options (24K/month, 145K/term, 675K full)
- [ ] Comparison link: "Not sure? Compare diploma vs certificate"
- [ ] Graduate testimonials (salary focus)
- [ ] Employer testimonials (prefer diploma graduates)

**Update SEO:**

- Title: "[Course] Diploma - Launch Your Career Earning 60K-120K KES/month"
- Meta description: Include salary range and employment rate
- Schema markup: Emphasize salary outcomes and employment stats

---

### 9. Email Follow-Up Sequence 🟡

**Platform:** Brevo automation

**Create Diploma-Specific Drip Campaign:**

**Day 0:** Application received

- Subject: "Your Diploma Application is Priority #1 at ADMI"
- Content: Next steps, advisor contact info, program benefits

**Day 1:** Personal outreach

- Subject: "Quick Question About Your [Course] Diploma Journey"
- Content: Address common concerns, scholarship info, payment plans

**Day 3:** ROI focus

- Subject: "See How Much You'll Earn as a [Course] Professional"
- Content: Salary data, career outcomes, alumni success stories

**Day 7:** Urgency + incentive

- Subject: "Limited Time: Save 20,000 KES on Your Diploma (Expires Feb 28)"
- Content: Early bird discount, limited spots, payment calculator

**Day 10:** Last chance

- Subject: "Last Call: Your Diploma Spot is About to Expire"
- Content: Final reminder, alternative intake options, waitlist

---

### 10. Admissions Team Training 🔴

**Priority:** URGENT (Train by Feb 13)

**Update Sales Scripts:**

**Opening (Always lead with diploma):**
"Hi [Name], congratulations on your interest in ADMI! I'm calling about your [Course] inquiry. Based on your career goals, our 2-year diploma program would be perfect for you. Diploma graduates from this program earn an average of 75,000 KES per month within 3 months of graduating. The investment is just 100,000 KES per semester, which you'll earn back in your first few months. Can I walk you through what that looks like?"

**Objection Handling - "Too Expensive":**
"I totally understand. Let me show you our payment plan - it's just 17,000 KES per month, which is less than what you'll earn in your first month after graduating. Most diploma students pay back their investment in under 7 months. Would you like me to calculate your personal ROI?"

**Objection Handling - "Certificate is Faster":**
"That's true, certificates are faster. But here's the reality: certificate graduates earn 35,000 KES/month on average, while diploma graduates earn 75,000 KES/month. Over 5 years, that's an extra 2.4 million KES in your pocket. Is saving 18 months worth earning 2.4 million less?"

**Objection Handling - "I Can't Commit 2 Years":**
"Great news - our diploma program is hybrid, meaning you can work part-time while studying. Many students maintain jobs or freelance during the program. Plus, we offer weekend and evening classes. Would you like to see a sample schedule?"

**Closing:**
"Based on what you've told me, I genuinely believe the diploma program is the best path for your career goals. To secure your spot for [Month] intake, we need to submit your application this week. Can we proceed with the enrollment steps now?"

**New KPI Targets:**

- 80% of calls should discuss diploma option (even if inquiry was for certificate)
- 50% conversion rate for diploma inquiries (vs 25% current)
- Average call length: 15-20 minutes (thorough qualification)

---

## 📊 ANALYTICS & MONITORING

### Weekly Dashboard Metrics (Track Starting Feb 12)

**Lead Quality Metrics:**

- [ ] Diploma inquiry rate (Target: 70%+)
- [ ] Average lead score (Target: 20+)
- [ ] Hot diploma leads (score 24+) per week (Target: 30+)
- [ ] Certificate to diploma upsell rate (Target: 35%+)

**Conversion Metrics:**

- [ ] Diploma application rate (Target: 15%+)
- [ ] Diploma enrollment rate (Target: 8%+)
- [ ] Payment plan adoption (Target: 60%+)
- [ ] Scholarship applications (Target: 25 per month)

**Revenue Metrics:**

- [ ] Revenue from diploma applications (Target: 500K+ per week)
- [ ] Average deal value (Target: 145K+)
- [ ] Cost per diploma lead (Target: < 2,500 KES)
- [ ] Cost per diploma enrollment (Target: < 15,000 KES)

**Traffic Metrics:**

- [ ] `/programs/diploma-vs-certificate` pageviews (Target: 200+ per week)
- [ ] Diploma course page engagement rate (Target: 5+ min avg)
- [ ] ROI calculator usage (Target: 150+ uses per week)
- [ ] Form drop-off rate at program selection (Target: < 15%)

---

## 🚀 DEPLOYMENT SEQUENCE

### Phase 1: This Week (Feb 11-14)

**Goal:** Deploy critical code changes and start shifting lead mix

**Monday, Feb 11:**

- [x] ✅ Update lead scoring in EnhancedEnquiryForm
- [x] ✅ Create diploma comparison page
- [ ] 🟡 Deploy to staging for testing

**Tuesday, Feb 12:**

- [ ] Update homepage messaging (diploma-first)
- [ ] Add comparison page to navigation
- [ ] Test lead scoring with sample submissions
- [ ] Deploy to production (staging branch → PR → main)

**Wednesday, Feb 13:**

- [ ] Build ROI calculator component
- [ ] Add calculator to diploma course pages
- [ ] Train admissions team on new scripts
- [ ] Launch diploma-focused email sequence

**Thursday, Feb 14:**

- [ ] Implement GA4 custom events
- [ ] Set up weekly analytics dashboard
- [ ] Begin Google Ads campaign restructure
- [ ] A/B test new homepage vs old homepage

---

### Phase 2: Next Week (Feb 17-21)

**Goal:** Optimize marketing campaigns and amplify messaging

- [ ] Complete Google Ads diploma campaign setup
- [ ] Launch Meta Ads audience segmentation
- [ ] Update all diploma course pages with ROI widgets
- [ ] Publish 2 diploma-focused blog posts
- [ ] Send "Diploma Career Outcomes" email to database

---

### Phase 3: Weeks 3-4 (Feb 24 - Mar 7)

**Goal:** Measure impact and iterate

- [ ] Analyze lead quality improvements
- [ ] Adjust lead scoring if needed
- [ ] Optimize ad campaigns based on performance data
- [ ] Launch scholarship program promotion
- [ ] Create video testimonials from diploma graduates
- [ ] Scale winning campaigns

---

## 🎯 SUCCESS CRITERIA (By March 15, 2026)

**Lead Mix Shift:**

- ✅ 70%+ of inquiries are for diploma programs (vs current 30%)
- ✅ Average lead score increases from 12 to 22
- ✅ Hot diploma leads (24+ score) make up 40%+ of pipeline

**Conversion Improvement:**

- ✅ Diploma application rate reaches 18%+ (vs industry 10-12%)
- ✅ Diploma enrollment rate reaches 10%+ (vs current 5%)
- ✅ 60%+ of diploma students opt for payment plans

**Revenue Impact:**

- ✅ March intake: 50+ diploma enrollments (vs Feb's ~15)
- ✅ First-semester revenue: 5M+ KES (50 × 100K avg)
- ✅ Projected lifetime value: 19.3M+ KES (50 × 385K avg)

**Marketing Efficiency:**

- ✅ Cost per diploma lead drops to 2,000 KES (vs current 3,000)
- ✅ Cost per diploma enrollment drops to 12,000 KES (vs current 20K+)
- ✅ Diploma ROI calculator used 600+ times per month

---

## ⚠️ RISKS & MITIGATION

### Risk 1: Application Volume Decline

**Scenario:** Total applications drop as we filter out certificate-only leads

**Mitigation:**

- Maintain 30% budget for certificate campaigns
- Upsell certificate inquiries during consultation calls
- Offer "start with certificate, upgrade to diploma" pathway
- Monitor total lead volume weekly, adjust if needed

### Risk 2: Longer Sales Cycle for Diplomas

**Scenario:** Diploma decisions take longer (7-14 days vs 2-4 days for certificates)

**Mitigation:**

- Multi-touch nurture campaign (email + SMS + calls)
- Time-limited early bird discounts to create urgency
- Scholarship application deadlines
- Free career consultation sessions to address concerns

### Risk 3: Payment Plan Default Risk

**Scenario:** Students enroll via monthly payments but default later

**Mitigation:**

- Require 20% down payment (29K KES) + signed agreement
- Auto-debit from M-Pesa/bank accounts
- Semester-by-semester payment (vs full program upfront commitment)
- Financial literacy workshop in first semester

---

## 📞 POINT OF CONTACT

**Technical Implementation:**

- Development Team Lead: [To Assign]
- QA Testing: [To Assign]

**Marketing Campaigns:**

- Digital Marketing Manager: [To Assign]
- Google Ads Specialist: [To Assign]
- Meta Ads Specialist: [To Assign]

**Sales & Admissions:**

- Admissions Director: [To Assign]
- Training Coordinator: [To Assign]

**Analytics & Reporting:**

- Data Analyst: [To Assign]
- Weekly Report Owner: [To Assign]

---

## 📝 NOTES FOR DEVELOPMENT TEAM

**Code Review Checklist:**

- [ ] Lead scoring logic tested with multiple scenarios
- [ ] Diploma vs certificate page responsive on mobile
- [ ] ROI calculator handles edge cases (e.g., $0 salary input)
- [ ] GA4 events firing correctly in GTM Preview mode
- [ ] Form validation works for all program type selections
- [ ] Conversion values properly sent to Google Ads
- [ ] Enhanced conversions (user data) properly hashed

**Testing Scenarios:**

1. Submit form as high-value diploma lead (verify score = 26+)
2. Submit form as low-value certificate lead (verify score < 12)
3. View comparison page on mobile (verify tables are readable)
4. Use ROI calculator with various salary inputs (verify math correct)
5. Check GTM events in dataLayer (verify all custom events present)

**Deploy Checklist (Staging → Production):**

- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] Build succeeds without warnings (`npm run build`)
- [ ] Test on staging: https://staging.admi.africa
- [ ] QA approval from admissions team (test form flow)
- [ ] Create PR: staging → main (include testing notes)
- [ ] Deploy during low-traffic hours (10PM - 2AM EAT)
- [ ] Monitor error logs for 24 hours post-deployment
- [ ] Verify Brevo leads arriving with correct lead scores

---

**Last Updated:** February 11, 2026, 11:45 AM EAT  
**Next Review:** February 14, 2026 (check deployment progress)  
**Version:** 1.0
