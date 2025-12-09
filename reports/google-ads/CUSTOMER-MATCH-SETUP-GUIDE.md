# Customer Match Audiences - Performance Max Setup Guide

**Date**: December 9, 2025  
**Status**: ✅ Audiences Uploaded (24,400 total contacts)

---

## 📊 Uploaded Audiences

### 1. ADMI-Customer-Expanded_List

- **Size**: 24,000 contacts
- **Source**: All customer interactions, leads, inquiries
- **Quality**: Mixed (includes cold, warm, and hot leads)
- **Use for**: Broad lookalike targeting

### 2. ADMI CUSTOMER LIST

- **Size**: 400 contacts
- **Source**: Likely enrolled students or high-quality leads
- **Quality**: High (qualified customers)
- **Use for**: High-quality lookalike targeting (PRIORITY)

---

## 🎯 How to Add to Performance Max Campaign

### Step 1: Go to Performance Max Campaign

1. Open Google Ads
2. Click **Campaigns** (left menu)
3. Find: **Website traffic-Performance Max-Jan**
4. Click on the campaign name

---

### Step 2: Add Audience Signals

1. In the campaign view, click **Audience signals** tab (or scroll to "Audience signals" section)
2. Click **Edit audience signals** button
3. Click **+ Audience signals** or **Browse**

---

### Step 3: Add Your Customer Match Audiences

**Add BOTH audiences as signals:**

1. Click **Your data** → **Customer lists**
2. Select: ✅ **ADMI CUSTOMER LIST (400)**
3. Select: ✅ **ADMI-Customer-Expanded_List (24,000)**
4. Click **Save**

---

### Step 4: Set Signal Strength (Important!)

After adding, you'll see "Signal strength" for your campaign.

**Target: "Excellent" or "Strong" signal strength**

If signal strength is "Medium" or below, add more signals:

- Custom segments (website visitors to /enquiry, /application pages)
- Demographics (Age 18-34)
- In-market audiences (Education services, Career services)

---

## 🔍 How Performance Max Uses These Audiences

### ADMI CUSTOMER LIST (400) - High Priority

This is your **GOLD STANDARD** audience. Google will:

1. Analyze characteristics of these 400 contacts
2. Find "lookalike" users with similar:
   - Browsing behavior
   - Demographics
   - Interests
   - Online activity patterns
3. Prioritize showing ads to users who match this profile

**Expected Impact**: +15-20% hot lead rate

---

### ADMI-Customer-Expanded_List (24,000) - Supporting Signal

This provides **broader context**. Google will:

1. Identify patterns across your full customer base
2. Understand your market positioning
3. Refine targeting based on larger dataset

**Expected Impact**: +5-10% reach, maintains quality

---

## ⚙️ Optimization: Create Tiered Audiences (Recommended)

Instead of using the full 24K list, create **quality tiers** for better optimization:

### Option A: Manual Segmentation (If you have lead scores in your data)

**In Google Ads → Audience Manager → Customer Match:**

Create 3 new lists:

1. **ADMI-Hot-Leads** (~6,000 contacts)

   - Filter: Lead score 15-20 OR enrolled students
   - Use for: Primary Performance Max signal (highest priority)

2. **ADMI-Warm-Leads** (~10,000 contacts)

   - Filter: Lead score 10-14
   - Use for: Secondary signal

3. **ADMI-Cold-Leads** (~8,000 contacts)
   - Filter: Lead score 5-9
   - Use for: Exclusion list (don't target similar users)

**Then in Performance Max:**

- Add: ADMI-Hot-Leads (strong signal)
- Add: ADMI-Warm-Leads (moderate signal)
- Exclude: ADMI-Cold-Leads (negative signal)

---

### Option B: Use Existing Lists (Quick Start - Do This First)

**In Performance Max → Audience Signals:**

**Add as positive signals:**

- ✅ ADMI CUSTOMER LIST (400) - **Primary signal** (highest quality)
- ✅ ADMI-Customer-Expanded_List (24,000) - **Supporting signal**

**Create exclusion from cold leads:**

- Export contacts with lead score < 5 from Brevo
- Upload as new Customer Match list: "ADMI-Unqualified-Leads"
- Add to Performance Max as **Exclusion**

---

## 📈 Expected Performance Timeline

### Week 1: Learning Phase

```
Google Ads status: "Learning"
Hot lead %: 62.5% (no change yet)
CPA: $17.50 (stable)
```

Google is analyzing your Customer Match audiences.

---

### Week 2: Initial Optimization

```
Google Ads status: "Learning" → "Active"
Hot lead %: 65-70% (↑ 5-10%)
CPA: $18-19 (slight increase is normal)
```

Algorithm starts finding lookalike users.

---

### Week 3: Mature Optimization

```
Hot lead %: 70-75% (↑ 12-20%)
CPA: $16-18 (stabilizing)
Cost per hot lead: $23-25 (↓ from $28)
```

Lookalike targeting fully optimized.

---

### Week 4: Scaled Performance

```
Hot lead %: 75-80% (↑ 20-28%)
CPA: $15-17 (improved)
Cost per hot lead: $20-22 (↓ 21-29%)
```

Ready to scale budget if results are strong.

---

## 🎯 Monitoring Checklist

### Daily (First Week)

- [ ] Check Performance Max "Signal strength" = Strong or Excellent
- [ ] Monitor CPA (should stay under $20)
- [ ] Review new leads in Brevo for quality

### Weekly

- [ ] Run: `node scripts/analytics/brevo-google-ads-journey-analysis.js`
- [ ] Check hot lead % trend (target: +5% per week)
- [ ] Review asset group performance
- [ ] Update Customer Match list with new enrolled students

### Monthly

- [ ] Export new qualified leads from Brevo
- [ ] Upload to "ADMI-Hot-Leads" Customer Match list
- [ ] Remove unqualified leads (add to exclusion list)
- [ ] Analyze ROI: Cost per hot lead vs. enrollment value

---

## 🚨 Troubleshooting

### Signal Strength Shows "Low" or "Medium"

**Solution**: Add more signals

1. Custom segment: Website visitors to /enquiry (last 30 days)
2. Custom segment: YouTube viewers (50%+ watch time)
3. Demographics: Age 18-34
4. In-market: Education, Career services

---

### Hot Lead % Not Improving After 2 Weeks

**Check:**

1. Is "Maximize Conversion Value" bidding enabled?
2. Are conversion values ($1-$100) showing in Google Ads?
3. Is Customer Match list properly matched? (Check match rate in Audience Manager)
4. Signal strength = Strong or Excellent?

**Expected match rate**: 60-80% of your 24,400 contacts

---

### CPA Increasing Beyond $22

**Solutions:**

1. Reduce daily budget by 20% to slow learning
2. Add more high-quality audience signals
3. Check if asset groups are performing well
4. Consider adding demographic bid adjustments (-20% for ages 45+)

---

## 💡 Pro Tips

### 1. Match Rate Matters

- Higher match rate = Better performance
- Include: Email, Phone, First name, Last name, Country
- Format: Use Google's template for best results

### 2. Update Lists Monthly

```bash
# Export from Brevo with lead scores
# Upload new enrolled students to "ADMI CUSTOMER LIST"
# This keeps lookalike targeting fresh
```

### 3. Combine with Conversion Values

Customer Match + Conversion Values = **Compound Effect**

- Customer Match: Tells Google WHO to target
- Conversion Values: Tells Google to prioritize QUALITY

Expected combined improvement: **30-40% better cost per hot lead**

---

### 4. Use Exclusions Wisely

**Exclude:**

- Current enrolled students (already converted)
- Contacts who unsubscribed
- Leads with score < 5 (unqualified)

**Don't exclude:**

- Past applicants who didn't enroll (might try again)
- Warm leads (score 10-14) - still valuable

---

## 📊 Success Metrics (Track in Spreadsheet)

| Week         | Hot Lead %  | CPA    | Cost/Hot Lead | Match Rate | Signal Strength |
| ------------ | ----------- | ------ | ------------- | ---------- | --------------- |
| 0 (Baseline) | 62.5%       | $17.50 | $28.00        | N/A        | N/A             |
| 1            | Target: 65% | $18    | $27           | 70%+       | Strong          |
| 2            | Target: 70% | $18    | $25           | 70%+       | Strong          |
| 3            | Target: 75% | $17    | $22           | 70%+       | Excellent       |
| 4            | Target: 80% | $16    | $20           | 70%+       | Excellent       |

---

## 🔗 Next Steps

### Immediate (Today)

1. ✅ Add ADMI CUSTOMER LIST (400) to Performance Max audience signals
2. ✅ Add ADMI-Customer-Expanded_List (24,000) to Performance Max
3. ✅ Check signal strength = "Strong" or better
4. ✅ Verify "Maximize Conversion Value" bidding is enabled

### This Week

1. Monitor daily CPA and lead quality
2. Export unqualified leads (score < 5) from Brevo
3. Create exclusion list from unqualified leads
4. Review conversion values are tracking ($1-$100)

### Next Week

1. Analyze Week 1 results (hot lead % improvement)
2. Create high-intent asset group (see PMAX-QUICK-START-CHECKLIST.md)
3. Set demographic bid adjustments
4. Scale budget by 20% if hot lead % > 70%

---

## 📚 Related Documentation

- Full strategy: `/reports/google-ads/PERFORMANCE-MAX-LEAD-QUALITY-STRATEGY.md`
- Quick start checklist: `/reports/google-ads/PMAX-QUICK-START-CHECKLIST.md`
- Conversion tracking: `/reports/google-ads/PMAX-CONVERSION-VALUE-IMPLEMENTATION.md`

---

**You're all set!** Customer Match + Conversion Values = The two most powerful Performance Max optimization tools combined. 🚀
