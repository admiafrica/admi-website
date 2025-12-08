# Course Catalog - Remarketing Campaign Analysis
**Campaign ID**: 6860035969187
**Date**: December 8, 2025
**Period Analyzed**: Last 30 days

---

## 📊 EXECUTIVE SUMMARY

### Current Performance
- **Budget**: $25/day ($750/month)
- **Actual Spend**: $117.87 (last 30 days)
- **Reach**: 144,423 people
- **Conversions**: 1 conversation ($117.87 CPA)
- **Product Catalog**: 15 courses
- **Audiences**: Program Visitors + 1% Lookalike

### ✅ What's Working
1. **Excellent Cost Efficiency**
   - CPC: $0.04 (industry avg: $0.50-$1.00) ✅
   - CPM: $0.55 (industry avg: $5-$10) ✅
   - CTR: 1.38% (industry avg: 0.90%) ✅

2. **Good Reach**
   - 144,423 people reached
   - Low frequency (1.47x) - not oversaturating audience

3. **Strong Engagement**
   - 2,933 clicks
   - 627 landing page views (21.38% of clicks)

### ❌ What's NOT Working
1. **Poor Conversion Rate**
   - Only 1 conversation from 2,933 clicks (0.034%)
   - No purchases tracked
   - No add-to-cart events
   - **This is your #1 problem**

2. **Funnel Drop-off**
   - 212K impressions → 2,933 clicks → 627 landing pages → 55 content views → 0 conversions
   - **78.6% drop** from clicks to landing page views (should be <50%)
   - **91.2% drop** from landing page to content view (should be <70%)
   - **100% drop** from content view to conversion (should be 2-5%)

3. **High Cost Per Result**
   - $117.87 per conversation (Target: <$10)
   - $2.14 per content view
   - $0.19 per landing page view
   - No revenue tracked

---

## 🎯 CAMPAIGN SETUP ANALYSIS

### Current Configuration
**Targeting**
- Location: Kenya only
- Age: 18-65 ⚠️ (too broad!)
- Audiences: Program Visitors + 1% Lookalike

**Optimization**
- Goal: CONTENT_VIEW (pixel event) ⚠️ (wrong!)
- Billing: Impressions
- Product Set: All Products (15 courses)
- Bid Strategy: Lowest Cost

### Root Causes of Poor Performance

#### 1. Wrong Optimization Goal (CRITICAL)
**Current**: Optimizing for CONTENT_VIEW
**Problem**: You're paying Meta to find people who VIEW courses, not people who ENROLL

**Why this is killing your ROI**:
- Meta shows ads to people who like browsing
- Not people who actually buy/enroll
- Algorithm learns the wrong behavior

**Fix**: Change to CONVERSIONS (Lead or Purchase)

---

#### 2. Incomplete Pixel Tracking (CRITICAL)
**Current Tracking**:
- ✅ PageView
- ✅ ViewContent (55 events)
- ❌ AddToCart (0 events)
- ❌ InitiateCheckout (0 events)
- ❌ Lead (0 events)
- ❌ Purchase (0 events)

**Problem**: You're missing 4 out of 6 critical conversion events!

**Impact**:
- Can't measure true ROI
- Can't optimize for enrollments
- Can't calculate cost per student
- Wasting ~70% of budget on wrong traffic

---

#### 3. Age Range Too Broad
**Current**: 18-65
**Problem**: Includes everyone from high school graduates to retirees

**Data insight**: Your best students are likely 18-30 years old

**Fix**: Narrow to 18-35

---

#### 4. No Value Optimization
**Problem**: Campaign doesn't know which courses are high-value

**Example**:
- Film Production (3 year, $7,500) = high value
- Weekend Workshop ($200) = low value
- Meta treats them the same!

**Fix**: Add prices to catalog, enable value-based bidding

---

## 🔧 RECOMMENDED CHANGES

### PRIORITY 1: Fix Pixel Tracking (DO THIS FIRST!)

This is your foundation. Without proper tracking, everything else fails.

#### Step 1: Add Missing Pixel Events

**On Course Page** (e.g., /programs/film-production):
```javascript
// Already have this ✅
fbq('track', 'ViewContent', {
  content_ids: ['course-film-production'],
  content_type: 'product',
  content_name: 'Film & TV Production',
  value: 2500,
  currency: 'USD'
});
```

**When User Clicks "Apply Now" or "Enquire"**:
```javascript
// ADD THIS ❌
fbq('track', 'AddToCart', {
  content_ids: ['course-film-production'],
  content_type: 'product',
  content_name: 'Film & TV Production Enquiry',
  value: 2500,
  currency: 'USD'
});
```

**When User Starts Application Form**:
```javascript
// ADD THIS ❌
fbq('track', 'InitiateCheckout', {
  content_ids: ['course-film-production'],
  content_type: 'product',
  content_name: 'Film & TV Production Application',
  value: 2500,
  currency: 'USD'
});
```

**When User Submits Enquiry/Application**:
```javascript
// ADD THIS ❌
fbq('track', 'Lead', {
  content_ids: ['course-film-production'],
  content_name: 'Film & TV Production',
  value: 2500,
  currency: 'USD'
});
```

**When Student Pays Deposit/Enrolls**:
```javascript
// ADD THIS ❌
fbq('track', 'Purchase', {
  content_ids: ['course-film-production'],
  content_name: 'Film & TV Production Enrollment',
  value: 2500,
  currency: 'USD',
  content_category: 'Course Enrollment'
});
```

#### Step 2: Test Events
1. Open Chrome
2. Install Meta Pixel Helper extension
3. Visit your course pages
4. Click through enquiry process
5. Verify all events fire in Events Manager

**Timeline**: 1-2 days
**Impact**: Foundation for 50-70% improvement in CPA

---

### PRIORITY 2: Change Optimization Goal

**Action**: Change from CONTENT_VIEW → LEAD (or PURCHASE)

**How**:
1. Ad Set Settings → Optimization & Delivery
2. Conversion Event → Select "Lead"
3. If you get enrollments, use "Purchase"

**Why**:
- Meta will find people who actually convert
- Not just people who browse
- Algorithm learns from actual enrollments

**Expected Impact**:
- 30-50% increase in conversion rate
- CPA drops from $117 to $35-50 in first week
- Further improvements as algorithm learns

**Warning**:
- Campaign enters "Learning" phase
- Performance unstable for 3-7 days
- Needs 50 conversions to exit learning
- Don't panic if first 2-3 days look worse

---

### PRIORITY 3: Narrow Age Targeting

**Current**: 18-65
**Change to**: 18-35

**Why**:
- Digital media courses target young professionals
- 18-24: Recent high school grads
- 25-35: Career changers
- 36+: Lower intent, higher skepticism

**How**:
1. Ad Set → Audience → Age
2. Change max age to 35
3. Save

**Expected Impact**:
- 20-30% better conversion rate
- More relevant audience
- Lower CPA

**Timeline**: Immediate

---

### PRIORITY 4: Segment by Course Value

**Problem**: Treating $200 workshop same as $7,500 diploma

**Solution**: Create tiered campaigns

**Campaign 1: Premium Programs ($15/day)**
- Film & TV Production
- Music Production
- Graphic Design
- Target: High-intent, career-focused
- Optimization: Purchase
- Expected CPA: $25-40

**Campaign 2: Mid-Tier Programs ($7/day)**
- Animation
- Gaming
- Digital Marketing
- Target: Younger audience, first-time students
- Optimization: Lead
- Expected CPA: $15-25

**Campaign 3: Workshops & Short Courses ($3/day)**
- Weekend bootcamps
- Short courses
- Target: Broader audience
- Optimization: Lead
- Expected CPA: $5-10

**Expected Impact**:
- Better budget allocation
- 25-40% improvement in overall ROAS
- More relevant messaging per tier

---

### PRIORITY 5: Landing Page Optimization

**Problem**: 78.6% of people who click don't land on your page

**Possible causes**:
- Slow page load
- Mobile unfriendly
- Link broken
- Page doesn't match ad

**Action**: Test landing page speed & mobile experience

**Quick wins**:
1. Use Fast Loading Experiences (FLE) in Meta
2. Compress images
3. Remove unnecessary scripts
4. Mobile-first design

**Expected Impact**:
- Reduce 78.6% drop to <50%
- 25-35% more conversions from same ad spend

---

## 📈 PROJECTED RESULTS

### Current (Baseline)
| Metric | Value |
|--------|-------|
| Monthly Spend | $750 |
| Conversions | 1-2 |
| CPA | $375-750 |
| ROAS | Unknown (no tracking) |

### Month 1 (After Pixel Fix + Optimization Change)
| Metric | Value |
|--------|-------|
| Monthly Spend | $750 |
| Conversions | 25-35 leads |
| CPA | $21-30 |
| ROAS | 2-3x (if tracking revenue) |

### Month 2 (After Campaign Restructure)
| Metric | Value |
|--------|-------|
| Monthly Spend | $750 |
| Conversions | 40-55 leads |
| CPA | $13-18 |
| ROAS | 4-6x |

### Month 3 (Optimized)
| Metric | Value |
|--------|-------|
| Monthly Spend | $750 |
| Conversions | 55-75 leads |
| CPA | $10-13 |
| ROAS | 6-10x |
| Enrolled Students | 5-10/month |

---

## 🚀 IMPLEMENTATION ROADMAP

### Week 1: Fix Tracking Foundation
**Mon-Tue**: Install missing pixel events
- [ ] Add AddToCart to enquiry button
- [ ] Add InitiateCheckout to application form
- [ ] Add Lead to form submission
- [ ] Add Purchase to enrollment confirmation

**Wed-Thu**: Test & Verify
- [ ] Test all events with Pixel Helper
- [ ] Verify in Events Manager
- [ ] Check 24hrs of data

**Fri**: Launch Changes
- [ ] Change optimization to Lead
- [ ] Change age to 18-35
- [ ] Monitor for 3 days

### Week 2: Monitor & Adjust
- [ ] Daily performance checks
- [ ] Adjust budgets if needed
- [ ] A/B test ad creative
- [ ] Build exclusion audiences

### Week 3: Scale What Works
- [ ] Identify best-performing courses
- [ ] Create separate campaigns
- [ ] Increase budget on winners
- [ ] Pause low performers

### Week 4: Advanced Optimization
- [ ] Value-based bidding
- [ ] Dynamic creative testing
- [ ] Retention campaigns
- [ ] LTV optimization

---

## 💡 QUICK WINS (Do Today - 20 Minutes)

These require NO code changes:

### 1. Change Age Targeting (5 min)
- Go to Ad Set → Edit
- Age: 18-65 → 18-35
- Save

**Expected**: 20% better conversion rate within 48hrs

### 2. Add Ad Schedule (5 min)
- Ad Set → Ad Scheduling
- Run ads only when people apply
- Example: Mon-Fri 9am-9pm, Sat 10am-4pm

**Expected**: 15% cost savings

### 3. Exclude Existing Students (5 min)
- Create custom audience of existing students
- Exclude from campaign
- Stop wasting money on enrolled students

**Expected**: 10-15% better ROAS

### 4. Check Mobile Performance (5 min)
- Go to Campaign → Breakdown → Platform
- If mobile converting worse, adjust budget
- Or create mobile-specific creative

**Expected**: Identify quick optimization

---

## 📋 TRACKING IMPLEMENTATION GUIDE

### Where to Add Pixel Events

**File/Page** | **Event** | **Trigger**
---|---|---
`/programs/[course-name]` | ViewContent | Page load
`/programs/[course-name]` | AddToCart | Click "Apply" or "Enquire"
`/enquiry/[course]` or `/apply` | InitiateCheckout | Form page load
`/enquiry/submit` or `/apply/submit` | Lead | Form submission success
`/enrollment/confirmation` | Purchase | Payment confirmation

### Testing Checklist

```
Test Flow:
1. Visit course page → ViewContent fires ✅
2. Click "Apply" → AddToCart fires ✅
3. Land on form → InitiateCheckout fires ✅
4. Submit form → Lead fires ✅
5. (If payment) → Purchase fires ✅

Tools:
- Meta Pixel Helper (Chrome extension)
- Events Manager → Test Events
- Console log for debugging
```

---

## ⚠️ CRITICAL WARNINGS

### 1. Don't Change Everything At Once
❌ **Wrong**: Fix pixel + change optimization + restructure campaigns + new creative = chaos
✅ **Right**: Fix pixel → wait 3 days → change optimization → wait 3 days → etc.

**Why**: You won't know what caused improvement/decline

### 2. Learning Phase Patience
- Campaign needs 50 conversions to exit learning
- At 25-35 leads/month, this takes ~6-8 days
- Performance will be unstable during learning
- **Don't panic and revert changes!**

### 3. Audience Burnout
Current frequency: 1.47 (healthy)

**Monitor**:
- Frequency >3.0 = audience fatigue
- CTR declining = creative fatigue
- CPM rising = saturation

**Fix**:
- Refresh creative every 2-3 weeks
- Expand audience (try 2% lookalike)
- Reduce frequency cap

### 4. Pixel Accuracy = Everything
One wrong event = entire campaign optimizes incorrectly

**Verify**:
- Events fire on correct pages
- Values passed correctly
- Currency is USD not KES
- Content IDs match catalog

---

## 🎯 SUCCESS METRICS DASHBOARD

### Daily Checks
- [ ] Spend vs budget
- [ ] CPA trend
- [ ] Conversion volume
- [ ] CTR stability

### Weekly Review
- [ ] ROAS calculation
- [ ] Audience frequency
- [ ] Top performing courses
- [ ] Landing page conversion rate

### Monthly Analysis
- [ ] Cost per enrolled student
- [ ] Lifetime value (LTV)
- [ ] Channel comparison (vs Google Ads)
- [ ] Budget reallocation decisions

---

## 📞 RESOURCES & NEXT STEPS

### Meta Resources
- **Events Manager**: business.facebook.com/events_manager
- **Pixel Helper**: Chrome Web Store
- **Catalog Manager**: business.facebook.com/products
- **Learning**: facebook.com/business/learn

### Recommended Actions (Priority Order)

**This Week**:
1. ✅ Add missing pixel events (AddToCart, Lead, Purchase)
2. ✅ Test events in Events Manager
3. ✅ Change age targeting to 18-35

**Next Week**:
4. ✅ Change optimization goal to Lead
5. ✅ Monitor learning phase (3-7 days)
6. ✅ A/B test new creative

**Week 3-4**:
7. ✅ Create tiered campaigns by course value
8. ✅ Implement value-based bidding
9. ✅ Scale winning combinations

---

## 💬 Key Takeaways

### The Good News
- Your ads are reaching people cheaply
- Engagement is strong
- Audience isn't burned out
- Foundation is solid

### The Bad News
- You're optimizing for the wrong goal
- Pixel tracking is incomplete
- Can't measure true ROI
- Wasting ~70% of budget

### The Solution
1. **Fix tracking first** (1-2 days work)
2. **Change optimization goal** (5 minutes)
3. **Wait for learning phase** (3-7 days)
4. **Expect 5-10x improvement** in CPA

### Bottom Line
**Current**: $117 per conversation = unsustainable
**Potential**: $10-15 per lead = profitable
**Timeline**: 2-4 weeks to get there
**Effort**: 2-3 days of dev work + ongoing optimization

---

**Next Action**: Start with pixel tracking implementation. Everything else builds on this foundation.

Once tracking is live, we can make data-driven decisions and scale profitably.
