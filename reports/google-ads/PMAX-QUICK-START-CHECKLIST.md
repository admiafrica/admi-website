# Performance Max Lead Quality - Quick Start Checklist

**Goal**: Improve from 62.5% → 80%+ hot leads  
**Timeline**: 4 weeks  
**Current CPA**: $17.50 | **Target CPA**: $15-16

---

## ✅ WEEK 1: AUDIENCE SIGNALS (DO FIRST)

### Day 1-2: Upload Customer Lists

**Why**: Tells Google "find people like my best students"

```
In Google Ads:
1. Tools & Settings → Audience Manager → Customer Match
2. Upload lists:
   ✓ qualified-leads-upload.csv (hot leads)
   ✓ enrolled-customers-from-deals.csv (95 students)
   ✓ expanded-customer-list.csv (all customers)

3. Performance Max → Settings → Audience Signals
4. Add all 3 lists as signals (NOT targets)
```

**Files**: `/reports/google-ads/qualified-leads-upload.csv`, `/reports/google-ads/enrolled-customers-from-deals.csv`

---

### Day 3-4: Set Conversion Values

**Why**: Teaches algorithm to prioritize hot leads

```
In Google Ads → Conversions → Value Rules:

Create 4 rules:
1. If lead_score >= 15 → Value $100 (Hot)
2. If lead_score 10-14 → Value $30 (Warm)
3. If lead_score 5-9 → Value $10 (Cold)
4. If lead_score < 5 → Value $1 (Unqualified)

Then: Performance Max → Bidding → Change to "Maximize Conversion Value"
```

**Code update needed**:

```typescript
// In src/components/forms/EnhancedEnquiryForm.tsx
// After form submission success:
gtag('event', 'conversion', {
  value: leadScore * 5, // Add this line
  lead_score: leadScore
})
```

---

### Day 5: Add Exclusions

**Why**: Stops wasting budget on unlikely converters

```
Performance Max → Settings → Audience Exclusions → Add:

✓ In-market: Job Seekers
✓ Demographics: Users under 18
✓ Custom: Competitor students (if available)
✓ Custom: "Bargain hunters" (discount seekers)
```

---

### Day 6-7: Set Budget Guardrails

**Why**: Prevents algorithm from going crazy

```
Performance Max → Settings:

✓ Daily budget cap: $75 (prevents overspend)
✓ Target CPA: $17 (current level)

Automated Rules → Create New Rule:
✓ "Pause campaign if CPA > $25 for 2 consecutive days"
✓ "Email alert if conversion rate < 15%"
```

---

## ✅ WEEK 2: ASSET OPTIMIZATION

### Day 8-10: Create High-Intent Asset Group

**Why**: Different messaging attracts different quality

```
Performance Max → Asset Groups → Create New:

Name: "High-Intent Application"
Budget allocation: 60% of campaign

Headlines (add 5+):
- "Apply to ADMI Before January 15 Deadline"
- "Tuition: Ksh 300K-500K+ Programs Available"
- "Film Production Diploma - 9 Months Full-Time"
- "Admission Requirements: High School Diploma"
- "Limited Seats - January 2026 Intake"

Descriptions (add 3+):
- "Full-time diploma programs start January 2026. Apply now for priority consideration."
- "Professional creative media training with industry certification and job placement."

Final URL: https://admi.africa/enquiry
Display Path: /apply/january-2026
```

Keep existing asset group at 40% for awareness/research traffic.

---

### Day 11-12: Add Pre-Qualification Gate (Optional)

**Why**: Filters cold leads before form

```
Create: /src/components/forms/PreQualificationGate.tsx

Simple 1-question qualifier:
"When are you planning to start your course?"
- January 2026 (show form) → HOT
- May/September 2026 (show form) → WARM
- Just researching (redirect /courses) → COLD
```

**Skip this if**: You want to keep current 17.4% conversion rate high  
**Do this if**: You want 80%+ hot leads even with lower volume

---

## ✅ WEEK 3: DEMOGRAPHIC REFINEMENT

### Day 15-17: Analyze & Adjust Demographics

**Step 1: Export data**

```
Performance Max → Demographics → Download report (Dec 1-7)
Look for patterns:
- Which age groups have highest hot lead %?
- Which genders convert better?
- Which locations produce hot leads?
```

**Step 2: Set bid adjustments**

```
Based on ADMI typical student profile:

Age adjustments:
✓ 18-24: +20% (fresh high school grads)
✓ 25-34: +30% (career changers - BEST)
✓ 35-44: +10% (professionals)
✓ 45+: -30% (unlikely to enroll)

Location adjustments (if data shows):
✓ Nairobi: +20% (main campus)
✓ Kisumu: +10% (regional campus)
✓ Other cities: 0% (baseline)
```

---

## ✅ WEEK 4: MONITOR & SCALE

### Daily Check (5 minutes)

```
1. Performance Max dashboard → Check CPA
   - If CPA > $20 → Reduce budget by 20%
   - If CPA < $15 → Increase budget by 20%

2. Brevo CRM → Check lead scores from yesterday
   - If hot leads < 50% → Pause low-performing asset group
   - If hot leads > 75% → Increase that asset group budget
```

---

### Weekly Review (Monday mornings)

```
Compare week-over-week:
✓ Hot lead % (target: 70%+ by week 2, 80%+ by week 4)
✓ Avg lead score (target: 13.5+/20 by week 4)
✓ CPA (target: $16 or below)
✓ Cost per hot lead (target: $20-25)

Actions:
- Winning asset group → Increase budget to 75%
- Losing asset group → Reduce to 25% or pause
- Update Customer Match list with new enrolled students
```

---

## 🎯 SUCCESS CRITERIA

After 4 weeks, you should see:

| Metric            | Before   | After (Target) |
| ----------------- | -------- | -------------- |
| Hot Lead %        | 62.5%    | 80%+           |
| Avg Lead Score    | 12.38/20 | 15/20          |
| CPA               | $17.50   | $15-16         |
| Cost per Hot Lead | $28      | $20-22         |

**If not hitting targets after 4 weeks**:

1. Double-check Customer Match lists uploaded correctly
2. Verify conversion value rules are active
3. Review asset group performance - pause bottom 50%
4. Consider stricter pre-qualification (may reduce volume)

---

## 🚫 WHAT NOT TO DO

❌ Don't manually pick audiences (impossible in Performance Max)  
❌ Don't pause the campaign - optimization takes 3-4 weeks  
❌ Don't remove audience signals - they're your only control  
❌ Don't change bid strategy during learning phase  
❌ Don't ignore low-quality leads - they train the algorithm what to avoid

---

## 📊 TRACKING SCRIPT

Run this weekly to check Performance Max quality:

```bash
npm run ads:analyze
# Check for Performance Max leads in Brevo

# Or manual check:
node scripts/analytics/brevo-google-ads-journey-analysis.js
```

Look for:

- Performance Max hot lead %
- Average lead score trend
- CPA trend

---

## 💡 PRO TIPS

1. **Customer Match is KEY** - Update monthly with new enrolled students
2. **Conversion values matter** - $100 hot vs $10 cold teaches quality
3. **Asset groups = messaging control** - High-intent copy attracts hot leads
4. **Be patient** - Algorithm needs 2-3 weeks to learn from signals
5. **Don't over-optimize** - One change per week max

---

## 📞 IMPLEMENTATION ORDER

**Priority 1 (This week):**

- [ ] Upload Customer Match audiences (Days 1-2)
- [ ] Set conversion value rules (Days 3-4)
- [ ] Add audience exclusions (Day 5)

**Priority 2 (Week 2):**

- [ ] Create high-intent asset group (Days 8-10)
- [ ] Set demographic bid adjustments (Day 15+)

**Priority 3 (Optional):**

- [ ] Pre-qualification gate (if want 80%+ quality over volume)

Start with Priority 1 first - it has the biggest impact with least effort.

---

**Need the full strategy?** See: `/reports/google-ads/PERFORMANCE-MAX-LEAD-QUALITY-STRATEGY.md`
