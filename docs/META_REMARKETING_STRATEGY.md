# Aggressive Meta/Instagram Remarketing Strategy for ADMI Courses

## Overview

This document outlines an aggressive remarketing strategy leveraging the product catalog and Meta Pixel events to retarget Google Ads traffic on Instagram and Facebook.

## ✅ What's Already Set Up

### 1. Product Catalog (Completed)

- ✅ All courses have OpenGraph product meta tags
- ✅ Product ID: `admi-diploma-{slug}` or `admi-certificate-{slug}`
- ✅ Price, currency, availability fields
- ✅ JSON-LD Product schema
- ✅ Images, descriptions, URLs

### 2. Meta Pixel Integration (Completed)

- ✅ Meta Pixel firing via Google Tag Manager
- ✅ **NEW:** ViewContent events fire automatically on all course pages
- ✅ Events include: product ID, name, price, currency, category

---

## 🎯 Remarketing Campaign Setup

### Step 1: Connect Product Catalog to Meta

1. **Go to Meta Commerce Manager**

   - URL: https://business.facebook.com/commerce

2. **Create New Catalog**

   - Name: "ADMI Courses Catalog"
   - Type: **E-commerce**
   - Add catalog

3. **Add Data Source**

   - Choose: **Website with microdata tags**
   - Enter URL: `https://admi.africa/courses/`
   - Facebook will automatically crawl all course pages

4. **Verify Catalog Import**
   - Go to Catalog → Data Sources
   - Facebook will show all courses it found
   - Should see: ~50 courses (diplomas + certificates)
   - Verify each has: ID, title, price, availability, image

---

### Step 2: Create Custom Audiences (HIGH INTENT)

#### Audience 1: Course Page Viewers (Last 7 Days)

**Purpose:** Hottest leads - just viewed a course

**Setup:**

1. Audiences → Create Audience → Custom Audience
2. Source: **Website**
3. Events: **ViewContent**
4. Retention: **7 days**
5. Refinement:
   ```
   URL contains: /courses/
   AND content_type equals: product
   ```
6. Name: "Course Viewers - 7D"

#### Audience 2: Specific Course Viewers

**Purpose:** Target by program type

**Create 3 separate audiences:**

**A. Diploma Viewers (7 Days)**

- Event: ViewContent
- content_category contains: "Diploma"
- Retention: 7 days

**B. Certificate Viewers (7 Days)**

- Event: ViewContent
- content_category contains: "Certificate"
- Retention: 7 days

**C. High-Value Course Viewers (14 Days)**

- Event: ViewContent
- value is greater than: 400000 (KES)
- Retention: 14 days

#### Audience 3: Engaged But Didn't Apply (30 Days)

**Purpose:** Nurture warm leads

**Setup:**

- Viewed 2+ course pages
- Did NOT trigger Lead event
- Retention: 30 days

---

### Step 3: Dynamic Product Ads (DPA) Setup

#### Campaign 1: Retargeting - Course Viewers

**Objective:** Conversions (Leads)

**Ad Set Setup:**

1. **Audience:**

   - Custom Audience: "Course Viewers - 7D"
   - Exclude: People who triggered "Lead" event in last 30 days

2. **Placements:** (AGGRESSIVE - Instagram Focus)

   - ✅ Instagram Feed
   - ✅ Instagram Stories
   - ✅ Instagram Reels
   - ✅ Facebook Feed
   - ✅ Facebook Marketplace
   - ❌ Audience Network (low quality)

3. **Product Set:**

   - Use: **All products** in catalog
   - OR create custom sets:
     - "High-Value Diplomas" (>400k KES)
     - "Quick-Start Certificates" (<300k KES)

4. **Dynamic Creative:**

   - **Template:** Product catalog template
   - **Format:** Carousel (show 3-5 courses)
   - **Copy examples:**
     ```
     "Still thinking about {{product.name}}?"
     "{{product.name}} - Limited seats for 2025 intake"
     "Transform your career with {{product.name}}"
     "{{product.name}} - Apply now, pay in installments"
     ```

5. **CTA Button:** "Apply Now" or "Learn More"

6. **Destination:** Course page URL (from catalog)

#### Campaign 2: Cross-Sell - Alternative Courses

**Purpose:** Show related courses to viewers

**Setup:**

- Use **Broad Audience Targeting**
- Show courses in same category
- Example: "Viewed Graphic Design? Check out UI/UX Design"

---

### Step 4: Aggressive Instagram Stories Ads

#### Story Ad 1: Urgency + Social Proof

**Creative:**

```
[BACKGROUND: Course image with dark overlay]
[TEXT OVERLAY]
🎓 {{product.name}}

✅ 85% Employment Rate
✅ Industry Placement
✅ Flexible Payment Plans

⏰ Limited Seats - Jan 2025 Intake

[SWIPE UP CTA: Apply Now]
```

#### Story Ad 2: Pricing Focus (KES)

**Creative:**

```
[BACKGROUND: Campus/student image]
[TEXT OVERLAY]
Start Your Career for

KES {{product.price}}

💳 Pay in Installments
📚 {{product.name}}
🎯 Get Industry-Ready in [duration]

[SWIPE UP CTA: Check Availability]
```

#### Story Ad 3: FOMO (Fear of Missing Out)

**Creative:**

```
[VIDEO: Quick campus tour or student testimonial]
[TEXT OVERLAY]
⚠️ You viewed {{product.name}}

🔥 Only 15 seats left
📅 Classes start January 2025
💼 Job placement guaranteed

[SWIPE UP CTA: Secure Your Spot]
```

---

### Step 5: Budget Allocation (Aggressive)

**Total Monthly Budget: KES 200,000 - 500,000**

**Split:**

- 50% - Dynamic Product Ads (Course Retargeting)
- 30% - Instagram Stories/Reels (Impulse)
- 20% - Facebook Feed/Marketplace (Broader reach)

**Daily Spend:**

- Start: KES 10,000/day
- Scale up to: KES 20,000/day based on performance

**Bidding Strategy:**

- Objective: **Leads** (not link clicks)
- Bid Strategy: **Lowest cost** (let Meta optimize)
- Optimization Event: **Lead** submissions

---

### Step 6: Lookalike Audiences (Expansion)

Once you have 100+ leads from remarketing:

1. **Create Lookalike from Course Viewers**

   - Source: "Course Viewers - 7D"
   - Location: Kenya
   - Size: 1% (most similar)

2. **Create Lookalike from Lead Submitters**

   - Source: Custom audience of Lead event triggerers
   - Location: Kenya + East Africa
   - Size: 1-2%

3. **Run DPA to Lookalikes**
   - Show courses to people similar to your best leads

---

## 🎨 Creative Best Practices

### Instagram Feed/Carousel

- **Images:** High-quality campus photos, students working, success stories
- **Video:** 15-30 sec student testimonials
- **Copy:** Short, benefit-focused

  ```
  "Ready to level up your creative career?

  {{product.name}} at ADMI
  ✅ Industry-recognized diploma
  ✅ 85% employment rate
  ✅ Flexible payment from KES X/month

  Apply for Jan 2025 intake → [Link]"
  ```

### Instagram Stories

- **Format:** Vertical 9:16
- **Duration:** 5-7 seconds per frame
- **Text:** Large, bold, minimal
- **CTA:** Always "Swipe Up"

### Instagram Reels

- **Format:** Vertical 9:16
- **Duration:** 15-30 seconds
- **Hook:** First 3 seconds critical
- **Examples:**
  - "POV: You just enrolled in ADMI..."
  - "Day in the life of an ADMI student"
  - "Before ADMI vs After ADMI"

---

## 📊 Tracking & Optimization

### Key Metrics to Monitor

**Campaign Level:**

- CPM (Cost Per 1000 Impressions): Target < KES 500
- CTR (Click-Through Rate): Target > 2%
- CPC (Cost Per Click): Target < KES 50
- CPL (Cost Per Lead): Target < KES 5,000

**Catalog Performance:**

- Top performing courses by impressions
- Top performing courses by leads
- Products with high clicks but no leads (improve landing page)

### Weekly Optimization Tasks

**Monday:**

- Review weekend performance
- Pause low-performing ad sets (CPL > KES 8,000)
- Increase budget on winners (CPL < KES 3,000)

**Wednesday:**

- Refresh ad creative (Meta fatigues creative fast)
- Test new copy variations
- Update course availability if seats are filling

**Friday:**

- Analyze which courses are converting
- Create custom product sets for top performers
- Plan weekend creative refresh

---

## 🚀 Advanced Tactics

### 1. Frequency Capping

- Don't show same ad more than 5 times/week per person
- Create 5-7 creative variations per course
- Rotate creatively weekly

### 2. Sequential Retargeting

**Day 1-3:** Show course benefits
**Day 4-7:** Show social proof + testimonials
**Day 8-14:** Show urgency + scarcity
**Day 15+:** Show payment plans + last chance

### 3. Instagram Influencer Collaboration

- Partner with creative/tech influencers in Kenya
- Have them create Stories featuring ADMI courses
- Run as "Partnership Ads" for authenticity

### 4. User-Generated Content (UGC)

- Collect student testimonial videos
- Post on Instagram, boost as ads
- Tag with course product IDs for catalog attribution

---

## 🎯 Conversion Rate Optimization

### Landing Page Enhancements

**For Course Pages:**

1. Add "Apply Now" sticky CTA that follows scroll
2. Add trust signals above fold:
   - "85% employment rate"
   - "2,000+ graduates"
   - "Industry-recognized"
3. Add urgency: "15 seats remaining" or "Application closes soon"
4. Add payment options prominently: "Pay in 4 installments"

**For Enquiry Form:**

1. Simplify to 3-4 fields max
2. Add WhatsApp option: "Prefer WhatsApp? Click here"
3. Add social proof: "Join 200+ students enrolled for Jan 2025"

---

## 📱 WhatsApp Integration (Future Enhancement)

**Strategy:** Drive leads to WhatsApp for faster conversion

1. Add WhatsApp CTA to ads: "Chat with us on WhatsApp"
2. Set up WhatsApp Business with:
   - Auto-replies
   - Course catalog
   - Payment link sharing
3. Track WhatsApp leads separately in CRM

---

## ✅ Next Steps

### Immediate (This Week):

1. ✅ Deploy the Meta Pixel ViewContent events (DONE - in staging)
2. ☐ Verify events are firing in Meta Events Manager
3. ☐ Set up Custom Audiences in Meta Ads Manager
4. ☐ Create first DPA campaign

### Week 2:

5. ☐ Launch 3 Instagram Stories ad variations
6. ☐ Set up conversion tracking for Lead events
7. ☐ Begin A/B testing ad creative

### Week 3:

8. ☐ Analyze first week data
9. ☐ Create Lookalike Audiences
10. ☐ Scale winning campaigns

### Week 4:

11. ☐ Implement sequential retargeting
12. ☐ Launch cross-sell campaigns
13. ☐ Optimize landing pages based on data

---

## 📞 Support

**Questions?** Check:

- Meta Events Manager: `business.facebook.com/events_manager`
- Catalog Health: `business.facebook.com/commerce`
- Pixel Helper Chrome Extension: To verify pixel firing

**Pro Tip:** Instagram Stories/Reels have the lowest CPM and highest engagement for Gen-Z/Millennial audiences (your target market)!

---

**Last Updated:** December 2025
**Status:** Meta Pixel + Catalog Integration LIVE
