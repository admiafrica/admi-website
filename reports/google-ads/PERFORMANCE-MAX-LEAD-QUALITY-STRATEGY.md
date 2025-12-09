# Performance Max Lead Quality Improvement Strategy

**Campaign**: Website traffic-Performance Max-Jan  
**Current Status**: 62.5% hot leads (5/8) - BEST PERFORMER  
**Target**: 80%+ hot leads with maintained or reduced CPA  
**Created**: December 9, 2025

---

## 🎯 The Challenge

Performance Max campaigns don't allow traditional audience targeting controls like Search campaigns. Google's algorithm automatically finds audiences across Display, Search, YouTube, Gmail, and Discover. **You can't manually set target audiences**, but you can **influence** who sees your ads through signals and optimization.

---

## ✅ Current Performance (Dec 1-7, 2025)

| Metric              | Value    | Assessment          |
| ------------------- | -------- | ------------------- |
| **Sessions**        | 184      | ✅ Good             |
| **Conversions**     | 32       | ✅ Excellent        |
| **Conversion Rate** | 17.4%    | ✅ Industry-leading |
| **New Leads**       | 8        | ✅ Consistent       |
| **Hot Lead Rate**   | 62.5%    | ✅ Outstanding      |
| **Avg Lead Score**  | 12.38/20 | ✅ Above average    |
| **CPA**             | $17.50   | ⚠️ Above $10 target |

**Top Lead**: Ephantus Mbugua (Music Production, Score: 15/20)

---

## 🚀 6 Strategies to Improve Lead Quality (Without Audience Targeting)

### 1. **Audience Signals** (Most Important - Influences Algorithm)

Performance Max learns from "audience signals" you provide. While you can't force targeting, signals heavily influence who sees ads.

#### Action Steps:

**A. Upload Customer Match Audiences** (High Priority)

```bash
Files to upload:
1. /reports/google-ads/qualified-leads-upload.csv (high-quality leads)
2. /reports/google-ads/enrolled-customers-from-deals.csv (95 enrolled students)
3. /reports/google-ads/expanded-customer-list.csv (all customer data)
```

**In Google Ads:**

1. Go to Tools → Audience Manager → Customer Match
2. Upload these 3 lists as separate audiences
3. In Performance Max → Settings → Audience Signals
4. Add all 3 audiences as "signals" (not targets)

**Expected Impact**: Google will find users similar to enrolled students and hot leads  
**Timeline**: 2-3 weeks for algorithm to optimize  
**Lead Quality Improvement**: +10-15% hot lead rate

---

**B. Add Custom Intent Audiences** (Medium Priority)

```
In Google Ads → Audience Manager → Custom Audiences:

Create "High-Intent Students" audience:
- Website visitors who viewed: /application, /enquiry, /student-support#fees
- YouTube viewers: ADMI course videos (50%+ watch time)
- Search activity: "enroll", "apply", "admission", "tuition fees"
```

**Expected Impact**: Targets users already showing application intent  
**Timeline**: 1-2 weeks  
**Lead Quality Improvement**: +5-10% hot lead rate

---

**C. Exclude Low-Quality Audiences** (Quick Win)

```
In Performance Max → Settings → Audience Exclusions:

Add these exclusions:
- Job seekers (exclude career-focused job hunting audiences)
- Current students at competitor schools (wrong timing)
- Users under 18 years old (below target demographic)
- Bargain hunters (price-sensitive, low commitment)
```

**Expected Impact**: Prevents wasted budget on unlikely converters  
**Timeline**: Immediate  
**Budget Savings**: 10-15% reduction in cold leads

---

### 2. **Conversion Value Rules** (Teaches Algorithm Quality)

Currently, Performance Max treats all form submissions equally. Assign different values so Google prioritizes hot leads.

#### Action Steps:

**In Google Ads → Conversions → Value Rules:**

```javascript
Rule 1: Hot Lead Premium
If lead_score >= 15 → Assign value $100

Rule 2: Warm Lead Standard
If lead_score >= 10 AND lead_score < 15 → Assign value $30

Rule 3: Cold Lead Low
If lead_score >= 5 AND lead_score < 10 → Assign value $10

Rule 4: Unqualified Penalty
If lead_score < 5 → Assign value $1
```

**How to implement:**

1. Your form already calculates `leadScore` in `EnhancedEnquiryForm.tsx`
2. Pass this to Google Ads via `gtag('event', 'conversion', { value: leadScore * 5 })`
3. Enable "Maximize Conversion Value" bidding strategy

**Expected Impact**: Algorithm automatically optimizes for high-value (hot) leads  
**Timeline**: 3-4 weeks for full optimization  
**Lead Quality Improvement**: +15-20% hot lead rate  
**CPA Impact**: May increase slightly initially, but higher quality justifies it

---

### 3. **Asset Group Optimization** (Controls Messaging)

Different ad creatives attract different quality levels. Split-test asset groups focused on qualification.

#### Current Asset Groups (Assumed):

- Generic awareness messaging (attracts cold leads)
- Mixed course promotion (attracts warm leads)

#### Recommended New Structure:

**Asset Group A: "High-Intent Application"** (60% budget)

```
Headlines:
- "Apply to ADMI Before January 15 Deadline"
- "Tuition: Ksh 300,000-500,000+ Programs"
- "Admission Requirements: High School Diploma"
- "Film Production Diploma - 9 Months Full-Time"

Descriptions:
- "Full-time diploma programs start January 2026. Limited seats available."
- "Professional training with industry certification. Apply now for priority consideration."

Landing Page: /enquiry (with EnhancedEnquiryForm - already has pre-qualification)
```

**Asset Group B: "Course Research"** (40% budget)

```
Headlines:
- "Explore ADMI Creative Media Courses"
- "Digital Marketing, Film, Music Production"
- "Industry-Led Training in Nairobi, Kenya"

Landing Page: /courses (discovery, lower intent)
```

**Expected Impact**: Group A attracts serious applicants, Group B for awareness  
**Timeline**: 1 week to create + 2 weeks to test  
**Lead Quality Improvement**: +10-15% hot lead rate from Group A

---

### 4. **Landing Page Pre-Qualification** (Filter Before Form Submission)

Your `/enquiry` page already uses `EnhancedEnquiryForm.tsx` with lead scoring. **This is excellent!** But we can add one more layer.

#### Enhancement: Add Pre-Form Qualifier

**Before showing the multi-step form, add a single-question gate:**

```tsx
// New component: /src/components/forms/PreQualificationGate.tsx

"Are you ready to apply for January 2026 intake?"

Options:
1. "Yes, I want to apply now" → Show EnhancedEnquiryForm (hot leads)
2. "I need more information first" → Redirect to /courses (warm leads)
3. "Just browsing options" → Show course catalog, no form (cold leads)
```

**Expected Impact**: Filters out cold leads before form submission  
**Timeline**: 2-3 days to implement  
**Lead Quality Improvement**: +20-25% hot lead rate (filters early)  
**Form Completion Rate**: May drop 30-40%, but quality increases dramatically

---

### 5. **Budget Caps & Quality Thresholds** (Protect Against Bad Days)

Performance Max can go off-track. Set guardrails to prevent budget waste.

#### Action Steps:

**In Google Ads → Performance Max → Settings:**

```
Daily Budget Limits:
- Max daily spend: $75 (prevents runaway spending)
- Bid strategy: Target CPA $17 (current performance level)

Quality Monitoring:
- Set automated rule: "Pause campaign if CPA > $25 for 2 consecutive days"
- Set alert: "Email if conversion rate drops below 15%"
```

**Manual Review Checklist** (Weekly):

```
Every Monday morning:
1. Check lead quality in Brevo CRM (hot lead %)
2. If hot leads < 50% for 3+ days → Reduce budget by 30%
3. If hot leads > 70% for 3+ days → Increase budget by 20%
4. Review asset group performance → Pause low-quality groups
```

**Expected Impact**: Prevents algorithm from drifting toward low-quality leads  
**Timeline**: Set up today, review weekly  
**Budget Protection**: Saves 15-20% on bad-performing days

---

### 6. **Geographic & Demographic Refinement** (Hidden Controls)

While you can't "target" audiences, you **can** adjust bids by location and demographics.

#### Action Steps:

**A. Location Bid Adjustments**

```
In Performance Max → Settings → Locations → Location Options:

Analyze current data (run report for Dec 1-7):
- Which cities generated hot leads? (Nairobi, Mombasa, Kisumu?)
- Which regions generated cold leads?

Bid Adjustments:
+30% bid: Cities with hot leads (e.g., Nairobi CBD if applicable)
+10% bid: Major cities (secondary markets)
-20% bid: Rural areas with low conversion
-50% bid: Regions with zero hot leads
```

**B. Demographic Bid Adjustments**

```
In Performance Max → Demographics → Age:

Likely pattern (based on ADMI student profile):
- Age 18-24: High school graduates → +20% bid (high intent)
- Age 25-34: Career changers → +30% bid (highest intent)
- Age 35-44: Professionals → +10% bid (medium intent)
- Age 45+: Low enrollment → -30% bid (save budget)

Gender:
- Analyze current data first (don't assume)
- If one gender converts 2x better → +20% bid
```

**Expected Impact**: Focuses budget on highest-converting demographics  
**Timeline**: Analyze data week 1, implement week 2  
**CPA Improvement**: 10-15% reduction  
**Lead Quality**: +5-10% hot lead rate

---

## 📊 Implementation Timeline

### Week 1 (Dec 9-15): Quick Wins

- [ ] **Day 1-2**: Upload Customer Match audiences (qualified leads + enrolled students)
- [ ] **Day 3-4**: Set up Conversion Value Rules ($100 hot, $30 warm, $10 cold)
- [ ] **Day 5-6**: Add audience exclusions (job seekers, under 18, competitors)
- [ ] **Day 7**: Set budget caps ($75/day max) and quality alerts

**Expected Impact**: +10-15% lead quality improvement

---

### Week 2 (Dec 16-22): Asset & Landing Page Optimization

- [ ] **Day 8-10**: Create 2 new asset groups (High-Intent vs Research)
- [ ] **Day 11-12**: Implement pre-qualification gate on /enquiry page
- [ ] **Day 13-14**: Add demographic bid adjustments based on data analysis

**Expected Impact**: +15-20% lead quality improvement (cumulative: 25-35%)

---

### Week 3-4 (Dec 23 - Jan 5): Testing & Scaling

- [ ] **Week 3**: Monitor asset group performance, pause low-performers
- [ ] **Week 4**: Analyze lookalike audience performance from Customer Match
- [ ] **Ongoing**: Weekly lead quality review, adjust bids accordingly

**Expected Impact**: Stabilize at 75-85% hot lead rate

---

## 🎯 Expected Outcomes

### Conservative Scenario (50% success rate)

```
Current: 62.5% hot leads (5/8)
After optimization: 75% hot leads (12/16)
CPA: $17.50 → $19 (slight increase acceptable for quality)
Budget efficiency: 15% improvement on cost per HOT lead
```

### Optimistic Scenario (80% success rate)

```
Current: 62.5% hot leads (5/8)
After optimization: 85% hot leads (17/20)
CPA: $17.50 → $16 (better targeting = lower waste)
Budget efficiency: 30% improvement on cost per HOT lead
```

---

## 📈 Success Metrics (Track Weekly)

| Metric            | Current  | Week 2 Target | Week 4 Target |
| ----------------- | -------- | ------------- | ------------- |
| Hot Lead %        | 62.5%    | 70%           | 80%           |
| Avg Lead Score    | 12.38/20 | 13.5/20       | 15/20         |
| CPA               | $17.50   | $18           | $16           |
| Cost per Hot Lead | $28      | $25           | $20           |
| Conversion Rate   | 17.4%    | 18%           | 20%           |

---

## 🔧 Technical Implementation Checklist

### Google Ads Setup

- [ ] Upload 3 Customer Match audiences (qualified, enrolled, expanded)
- [ ] Create "High-Intent Students" custom intent audience
- [ ] Add 4 audience exclusions (job seekers, under 18, competitors, bargain hunters)
- [ ] Set conversion value rules (4 tiers based on lead score)
- [ ] Create 2 asset groups (High-Intent 60%, Research 40%)
- [ ] Set daily budget cap at $75
- [ ] Add CPA > $25 pause rule
- [ ] Configure demographic bid adjustments (+30% age 25-34)

### Website Updates

- [ ] Implement PreQualificationGate component (optional but recommended)
- [ ] Ensure EnhancedEnquiryForm sends lead_score to Google Ads
- [ ] Add conversion value tracking: `gtag('event', 'conversion', { value: leadScore * 5 })`
- [ ] Test form submission → Brevo → Lead score calculation

### Monitoring & Reporting

- [ ] Set up weekly Google Ads report export (lead quality by asset group)
- [ ] Create Brevo dashboard: Hot leads % from Performance Max
- [ ] Weekly Monday review: Adjust bids based on previous week's quality
- [ ] Monthly analysis: Customer Match audience lookalike performance

---

## ⚠️ Common Mistakes to Avoid

1. **Don't disable audience signals** - They're your only targeting control
2. **Don't pause asset groups too quickly** - Give 2-3 weeks for data
3. **Don't ignore low-value conversions** - Still useful for negative feedback to algorithm
4. **Don't change multiple things at once** - A/B test one variable at a time
5. **Don't forget to update Customer Match lists** - Upload new enrolled students monthly

---

## 🎓 Why This Works (Algorithm Science)

Performance Max uses **machine learning** to find audiences. It needs 3 inputs:

1. **Positive signals** (Customer Match, custom audiences) → "Find people like these"
2. **Negative signals** (Exclusions, low-value conversions) → "Avoid people like these"
3. **Feedback loops** (Conversion values, bid adjustments) → "Prioritize quality over quantity"

By providing all 3, you're essentially "training" Google's algorithm to:

- Target users similar to your best students (enrolled list)
- Avoid users who never convert to applications (exclusions)
- Optimize for high-value leads (conversion value rules)

**Result**: Better lead quality WITHOUT manual audience targeting controls.

---

## 📞 Next Steps

1. **Today**: Upload Customer Match audiences + Set conversion value rules
2. **This week**: Create High-Intent asset group + Add exclusions
3. **Week 2**: Implement pre-qualification gate + Demographic bid adjustments
4. **Weekly**: Review lead quality, adjust bids accordingly

---

## 📚 Related Documentation

- Current campaign analysis: `/reports/google-ads/COMPREHENSIVE-ANALYSIS-2025-12-07.md`
- Search vs PMax comparison: `/reports/google-ads/SEARCH-VS-PERFORMANCE-MAX-REVIEW.md`
- Lead scoring implementation: `/src/components/forms/EnhancedEnquiryForm.tsx`
- Brevo CRM integration: `/scripts/analytics/brevo-google-ads-journey-analysis.js`

---

**Questions or need help implementing?** Review the checklist above and start with Week 1 quick wins first.
