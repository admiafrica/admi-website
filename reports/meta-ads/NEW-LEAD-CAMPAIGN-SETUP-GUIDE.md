# Meta Ads Lead Generation Campaign Setup Guide
## Course Catalog - Lead Generation (New Campaign)

**Date**: December 8, 2025
**Objective**: Generate qualified leads for ADMI courses
**Target CPA**: $3-10 per lead

---

## 📋 CAMPAIGN STRUCTURE

### Campaign Level
**Name**: Course Catalog - Lead Generation v2
**Objective**: Leads
**Budget**: $25/day ($750/month)

### Ad Set Level
**Name**: Course Catalog - Remarketing - Leads
**Optimization**: Lead
**Budget**: $25/day

### Ad Level
**Name**: Dynamic Product Ads - Courses
**Format**: Catalog ads (dynamic)

---

## 🎯 STEP-BY-STEP SETUP

### STEP 1: Create Campaign (5 minutes)

1. **Go to Ads Manager**: https://business.facebook.com/adsmanager

2. **Click "Create"**

3. **Choose Objective**:
   - Click **"Leads"**
   - Campaign name: `Course Catalog - Lead Generation v2`
   - Click "Continue"

4. **Campaign Settings**:
   - Campaign objective: Leads ✅
   - Buying type: Auction
   - Campaign budget optimization: OFF (we'll use ad set budget)
   - Click "Next"

---

### STEP 2: Ad Set Setup (10 minutes)

#### A. Conversion Settings

**Conversion Event**:
- Look for "Conversion" dropdown
- **Option 1** (if available): Select standard "Lead" event
- **Option 2**: Select your custom conversion for form submission
- **Option 3**: Create new custom conversion (see instructions below)

**Performance Goal**:
- Choose: "Maximize number of conversions"
- OR if available: "Cost per result goal" → Set to $8

#### B. Budget & Schedule

**Budget**:
- Daily budget: $25
- Start date: Immediate
- End date: Ongoing

**Schedule** (Optional - Recommended):
- Run ads on schedule
- Days: Monday - Saturday
- Hours: 8:00 AM - 10:00 PM (Kenya time)
- Why: Students browse/apply during these hours

#### C. Audience

**Custom Audiences** (Include):
- ✅ Program Visitors (your existing remarketing audience)
- ✅ 1% Lookalike - Program Visitors

**Locations**:
- ✅ Kenya
- Location type: People living in or recently in this location

**Age**:
- Min: 18
- Max: 35 ← **Changed from 65!**

**Gender**:
- All genders

**Detailed Targeting** (Optional - Test This):
```
Interests:
- Higher education
- Adult education
- Vocational education

OR

- Film
- Music production
- Graphic design
- Animation
- Digital marketing

Behaviors:
- College graduates
- Recent college graduates
```

**Languages**:
- English (Kenya)
- Swahili (optional)

**Expected Audience Size**: 50,000 - 150,000

#### D. Placements

**Recommended** (For Lead Gen):
- Advantage+ placements: OFF
- Manual placements:
  - ✅ Facebook Feed
  - ✅ Instagram Feed
  - ✅ Facebook Marketplace
  - ✅ Instagram Explore
  - ❌ Stories (unless you have vertical creative)
  - ❌ Reels (unless you have video creative)
  - ❌ Audience Network (lower quality leads)

**Why**: Lead forms work best in feed placements

#### E. Optimization & Delivery

**Optimization Goal**:
- Conversions ← **Most important setting!**

**Cost Control** (if available):
- Cost per result goal: $8
- OR Bid cap: $10

**Conversion Window**:
- 7-day click, 1-day view (default)

**Delivery Type**:
- Standard

---

### STEP 3: Ad Creative (15 minutes)

#### A. Ad Format

**Choose**: Catalog Sales (Dynamic Ads)

**Setup**:
1. Select your product catalog
2. Product set: "All Products" (or create filtered sets)
3. Ad format: Single image or carousel

#### B. Ad Copy Template

**Primary Text** (125 characters):
```
Ready to start your creative career?
Explore our {product.name} program.
Apply now and join Kenya's top creative school. 👇
```

**Headline** (40 characters):
```
Start Your {product.name} Journey
```

OR
```
Apply for {product.name} Today
```

**Description** (30 characters):
```
18-month diploma • Job-ready skills
```

OR
```
Professional training • Career support
```

**Call to Action**:
- **"Learn More"** (if linking to course page)
- **"Apply Now"** (if linking to application form)
- **"Sign Up"** (if linking to enquiry form)

#### C. Destination

**Website**:
- Link to: {product.link} (from your catalog)
- This should go to individual course pages

**OR Use Instant Form** (Recommended for Lead Gen):
- Create an Instant Form (see below)

---

### STEP 4: Create Instant Form (Optional but Recommended)

**Why Use Instant Form**:
- ✅ Higher conversion rate (people don't leave Facebook)
- ✅ Auto-fill user data (name, email, phone)
- ✅ Lower CPA (typically 30-50% cheaper)
- ❌ Lower quality leads (easier to submit)

**Setup**:

1. **Form Type**: More Volume (not Higher Intent)

2. **Intro**:
   - Headline: "Apply for {Course Name}"
   - Image: Course thumbnail
   - Description: "Fill out this form to receive course details and speak with our admissions team."

3. **Questions**:
   ```
   Required:
   - Full Name (pre-filled)
   - Email (pre-filled)
   - Phone Number (custom question)
   - Which course are you interested in? (multiple choice)
     • Film & TV Production
     • Music Production
     • Graphic Design
     • Animation
     • Other

   Optional:
   - Age range (custom - to pre-qualify)
     • 18-24
     • 25-30
     • 31-35
   - When do you plan to start? (custom)
     • Immediately
     • Next semester
     • Still researching
   ```

4. **Privacy Policy**:
   - Link: https://admi.africa/privacy
   - Custom disclaimer: "By submitting, you agree to receive info about ADMI programs."

5. **Thank You Screen**:
   - Headline: "Application Received!"
   - Description: "Our admissions team will contact you within 24 hours."
   - Button: "Visit Website" → https://admi.africa
   - Download leads: Yes

---

### STEP 5: Catalog Setup Check

Make sure your product catalog has these fields:

**Required Fields**:
```json
{
  "id": "course-film-production",
  "title": "Film & TV Production Diploma",
  "description": "18-month professional training in film and television production",
  "link": "https://admi.africa/programs/film-tv-production",
  "image_link": "https://admi.africa/images/film-course.jpg",
  "availability": "in stock",
  "condition": "new"
}
```

**Recommended Fields**:
```json
{
  "price": "2500 USD",
  "brand": "ADMI",
  "product_type": "Diploma > Film & TV",
  "custom_label_0": "Premium",
  "custom_label_1": "18 months"
}
```

---

### STEP 6: Pixel Event Setup

Make sure these events are firing:

#### A. On Course Page Load
```javascript
fbq('track', 'ViewContent', {
  content_ids: ['course-film-production'],
  content_type: 'product',
  content_name: 'Film & TV Production',
  value: 2500,
  currency: 'USD'
});
```

#### B. On Form Submit (CRITICAL!)
```javascript
fbq('track', 'Lead', {
  content_name: 'Film & TV Production Enquiry',
  content_ids: ['course-film-production'],
  value: 2500,
  currency: 'USD'
});
```

**Where to add**:
- Form submit success callback
- Thank you page
- After successful API response

**Test it**:
1. Submit a test form
2. Check Events Manager → Test Events
3. Verify "Lead" event appears

---

## 📊 CAMPAIGN SETTINGS SUMMARY

```
CAMPAIGN LEVEL
├─ Objective: Leads
├─ Budget: Daily ad set budgets
└─ Status: Active

AD SET LEVEL
├─ Name: Course Catalog - Remarketing - Leads
├─ Optimization: Lead (or custom conversion)
├─ Budget: $25/day
├─ Schedule: Mon-Sat, 8am-10pm
├─ Location: Kenya
├─ Age: 18-35
├─ Audience: Program Visitors + 1% Lookalike
├─ Placements: Feed only
└─ Bid: Auto or $8 cost cap

AD LEVEL
├─ Format: Catalog (Dynamic)
├─ Product Set: All Products
├─ Creative: Dynamic
├─ CTA: Apply Now / Learn More
└─ Destination: Course pages OR Instant Form
```

---

## 🎯 LAUNCH CHECKLIST

Before launching, verify:

### Pre-Launch (Must Do)
- [ ] Lead event is firing on form submission
- [ ] Test form submit and check Events Manager
- [ ] Product catalog has all 15 courses
- [ ] All course images are high quality
- [ ] Course links work and load fast
- [ ] Age targeting set to 18-35
- [ ] Optimization goal set to "Lead"
- [ ] Budget set to $25/day

### Post-Launch (First 24 Hours)
- [ ] Check if ads are delivering
- [ ] Verify no errors in Ads Manager
- [ ] Check CTR (should be >0.5%)
- [ ] Verify leads are coming through
- [ ] Test lead quality (call 1-2 leads)

### Week 1 Monitoring
- [ ] Daily CPA tracking
- [ ] Lead volume (target: 5-8/day)
- [ ] CTR trend (target: 1.0-1.5%)
- [ ] Frequency (keep under 2.0)
- [ ] Landing page conversion rate

---

## 📈 EXPECTED PERFORMANCE

### Week 1 (Learning Phase)
```
Budget: $175 (7 days × $25)
Leads: 20-35
CPA: $5-8
CTR: 1.0-1.5%
Status: Learning
```

### Week 2-3 (Optimization Phase)
```
Budget: $350-525
Leads: 50-80
CPA: $4-6
CTR: 1.2-1.8%
Status: Active
```

### Week 4+ (Scaled Performance)
```
Budget: $750/month
Leads: 150-250/month
CPA: $3-5
CTR: 1.5-2.0%
ROAS: 5-10x (if tracking revenue)
```

---

## 🚀 OPTIMIZATION ROADMAP

### Week 1: Launch & Monitor
- Launch campaign
- Don't touch settings for 3 days
- Collect data
- Verify lead quality

### Week 2: Initial Optimization
- Pause worst-performing placements
- Test CTA variations (Apply vs Learn More)
- Adjust age range if needed
- Check device performance (mobile vs desktop)

### Week 3: Creative Testing
- Test video ads vs image ads
- Try carousel vs single image
- Test different messaging angles
- A/B test headlines

### Week 4: Scaling
- If CPA < $5: Increase budget to $35/day
- If CPA $5-8: Keep at $25/day
- If CPA > $8: Optimize or pause

---

## 💡 PRO TIPS

### 1. Use Instant Forms First
Start with Instant Forms (not website forms) because:
- 50% lower CPA
- Higher conversion rate
- Auto-filled data
- Then migrate high-quality leads to website later

### 2. Exclude Existing Students
Create custom audience of enrolled students:
- Upload student email list
- Exclude from targeting
- Save 10-15% of budget

### 3. Create Lookalike Stack
Don't just use 1% lookalike, test:
- 1% Lookalike - Program Visitors
- 1% Lookalike - Form Submitters
- 1% Lookalike - Enrolled Students (best quality!)

### 4. Monitor Lead Quality
Track not just CPA, but:
- Phone answer rate
- Email open rate
- Appointment show rate
- Enrollment rate
- Adjust targeting if quality drops

### 5. Day Parting
After 2 weeks, check which hours perform best:
- Pause low-performing hours
- Increase budget during peak hours
- Typically: 6-9pm performs best for education

---

## 🔧 TROUBLESHOOTING

### Issue: No Leads Coming In

**Check**:
1. Is "Lead" event firing? (Events Manager)
2. Is campaign in "Learning" status? (wait 3 days)
3. Is form working? (test submission)
4. Is audience too small? (need 50K+ reach)

**Fix**: Verify pixel event, wait for learning phase

---

### Issue: High CPA (>$15)

**Check**:
1. Landing page conversion rate
2. Audience frequency (>3.0 = burned out)
3. Ad relevance score (<6 = poor creative)
4. Placement performance

**Fix**:
- Refresh creative
- Expand audience
- Optimize landing page
- Pause bad placements

---

### Issue: Low CTR (<0.5%)

**Check**:
1. Ad creative quality
2. Product images in catalog
3. Ad copy relevance
4. Audience match

**Fix**:
- Update ad copy
- Test video ads
- Better product images
- Narrow targeting

---

### Issue: Leads But Poor Quality

**Check**:
1. Are you using Instant Forms? (lower quality)
2. What's your targeting?
3. Which placements?

**Fix**:
- Add qualification questions to form
- Tighten age range (20-30)
- Remove Audience Network
- Add interest targeting
- Increase form friction slightly

---

## 📞 NEXT STEPS

1. **Create the campaign** (30 min)
   - Follow steps 1-3 above
   - Use Instant Form for best CPA

2. **Verify pixel tracking** (10 min)
   - Test form submission
   - Check Events Manager
   - Confirm Lead event fires

3. **Launch** (2 min)
   - Review settings one more time
   - Click "Publish"

4. **Monitor** (5 min/day)
   - Day 1: Check delivery
   - Day 2-3: Don't change anything
   - Day 4-7: Monitor CPA trend
   - Week 2: Start optimizing

---

## 📊 TRACKING DASHBOARD

Track these daily:

| Metric | Target | Alert If |
|--------|--------|----------|
| Daily Spend | $25 | >$30 or <$20 |
| Leads/Day | 5-8 | <3 or >15 |
| CPA | $3-5 | >$10 |
| CTR | 1.2-1.8% | <0.8% |
| Frequency | 1.5-2.5 | >3.0 |
| Relevance Score | 7-10 | <6 |

---

## 🎯 SUCCESS CRITERIA

After 30 days, you should have:

✅ 150-250 leads generated
✅ CPA between $3-8
✅ CTR above 1.2%
✅ 10-20 enrolled students
✅ ROAS of 5-10x
✅ Sustainable, scalable system

---

**Ready to Launch?** Follow the steps above and let me know if you need help with any specific part!

The key difference from your current campaign:
- ✅ Optimized for LEAD from day 1
- ✅ Age 18-35 (not 18-65)
- ✅ Feed placements only
- ✅ Instant Forms for lower CPA
- ✅ Proper tracking verified before launch

This should get you $3-5 CPA instead of $117! 🚀
