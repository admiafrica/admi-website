# Performance Max Conversion Value Tracking - Implementation Guide

This guide shows how to send lead quality scores to Google Ads so Performance Max can optimize for high-value (hot) leads.

---

## 🎯 Goal

Send different conversion values based on lead score:

- **Hot lead (15-20 points)**: $100 value → Google prioritizes these
- **Warm lead (10-14 points)**: $30 value → Google considers these
- **Cold lead (5-9 points)**: $10 value → Google deprioritizes these
- **Unqualified (<5 points)**: $1 value → Google avoids these

---

## 📋 Implementation Steps

### Step 1: Update EnhancedEnquiryForm.tsx

The form already calculates `leadScore`. We need to send it to Google Ads.

**File**: `/src/components/forms/EnhancedEnquiryForm.tsx`

**Find this section** (around line 260-265):

```typescript
// Show success message
setAlert({
  type: 'success',
  message: 'Enquiry submitted successfully! Redirecting...'
})

// Redirect after a short delay
setTimeout(() => {
  window.location.href = 'https://admi.africa/enquiry-thank-you'
}, 2000)
```

**Replace with**:

```typescript
// Calculate conversion value based on lead score
const conversionValue =
  leadScore >= 15
    ? 100 // Hot lead
    : leadScore >= 10
      ? 30 // Warm lead
      : leadScore >= 5
        ? 10 // Cold lead
        : 1 // Unqualified

// Send conversion event to Google Ads with value
if (typeof window.gtag !== 'undefined') {
  window.gtag('event', 'conversion', {
    send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your actual conversion ID
    value: conversionValue,
    currency: 'USD',
    transaction_id: `lead_${Date.now()}_${leadScore}`,
    event_category: 'Lead Generation',
    event_label:
      leadScore >= 15 ? 'Hot Lead' : leadScore >= 10 ? 'Warm Lead' : leadScore >= 5 ? 'Cold Lead' : 'Unqualified',
    lead_score: leadScore,
    course_name: values.courseName,
    study_timeline: values.studyTimeline
  })

  // Also send to GA4 for tracking
  window.gtag('event', 'generate_lead', {
    value: conversionValue,
    currency: 'USD',
    lead_score: leadScore,
    course: values.courseName
  })
}

// Show success message
setAlert({
  type: 'success',
  message: 'Enquiry submitted successfully! Redirecting...'
})

// Redirect after a short delay
setTimeout(() => {
  window.location.href = 'https://admi.africa/enquiry-thank-you'
}, 2000)
```

---

### Step 2: Find Your Google Ads Conversion ID

**In Google Ads**:

1. Go to **Tools & Settings** → **Conversions**
2. Find your enquiry form conversion (e.g., "Enhanced Enquiry Submission")
3. Click on it
4. Click **Tag setup** → **Use Google tag manager or edit HTML**
5. Copy the conversion ID and label:
   - Format: `AW-1234567890/AbC-dEfGhIjK`
   - Example: `AW-392935593/Xk5pCPrYqaEZEMem8cUD`

**Update the code** with your actual ID:

```typescript
send_to: 'AW-392935593/Xk5pCPrYqaEZEMem8cUD', // Replace with YOUR conversion ID
```

---

### Step 3: Add TypeScript Declaration (If Needed)

If TypeScript complains about `window.gtag`, add this declaration.

**File**: `/src/types/gtag.d.ts` (create if doesn't exist)

```typescript
// Global gtag type declaration for Google Analytics & Ads
declare global {
  interface Window {
    gtag: (command: 'event' | 'config' | 'set', targetOrAction: string, params?: Record<string, any>) => void
    dataLayer: any[]
  }
}

export {}
```

---

### Step 4: Set Up Value Rules in Google Ads

**In Google Ads**:

1. Go to **Tools & Settings** → **Conversions**
2. Click on "Enquiry_Form_Submitted" conversion
3. Scroll to **Value** section
4. Select: **"Use the value from the Google Analytics 4 property"**
5. Set default value: **10** (fallback if code doesn't send value)
6. Click **Save**

✅ **Already configured** - The GA4 property will automatically receive our dynamic values ($1, $10, $30, $100) from the gtag events we're sending.

---

### Step 5: Change Bid Strategy to Maximize Conversion Value

**In Performance Max Campaign**:

1. Go to **Settings** → **Bidding**
2. Change from "Maximize Conversions" to **"Maximize Conversion Value"**
3. Optional: Set a **Target ROAS** (e.g., 300% = $3 in value for every $1 spent)

**Why this matters**:

- Old strategy: Google optimizes for ANY form submission (treats $1 and $100 the same)
- New strategy: Google prioritizes HIGH-VALUE ($100) leads over low-value ($1) leads

---

## 🧪 Testing the Implementation

### Test 1: Submit Test Form (Low Score)

1. Go to: `https://admi.africa/enquiry`
2. Fill form with LOW-INTENT answers:

   - Timeline: "Just researching"
   - Program: "Weekend part-time"
   - Investment: "Under 100k"
   - Goals: "Personal interest"
   - Experience: "Complete beginner"

3. Open browser console (F12)
4. Submit form
5. **Check console for**:
   ```javascript
   gtag('event', 'conversion', {
     value: 1, // Should be $1 for low score
     lead_score: 5 - 9
   })
   ```

---

### Test 2: Submit Test Form (High Score)

1. Fill form with HIGH-INTENT answers:

   - Timeline: "January 2026"
   - Program: "Full-time diploma"
   - Investment: "500k plus"
   - Goals: "Career change"
   - Experience: "Professional upgrade"

2. Submit form
3. **Check console for**:
   ```javascript
   gtag('event', 'conversion', {
     value: 100, // Should be $100 for hot lead
     lead_score: 15 - 20
   })
   ```

---

### Test 3: Verify in Google Ads

**24 hours after deploying**:

1. Go to **Conversions** → "Enhanced Enquiry Submission"
2. Click **Segmentation** → **Conversion value**
3. You should see entries like:
   - `$1.00` (unqualified leads)
   - `$10.00` (cold leads)
   - `$30.00` (warm leads)
   - `$100.00` (hot leads) ← These are what Performance Max will optimize for

---

## 📊 Monitoring After Implementation

### Week 1: Verify Data Flow

```bash
# Check Brevo for lead scores
node scripts/analytics/brevo-google-ads-journey-analysis.js

# Expected output:
# Hot leads: X (should have $100 value in Google Ads)
# Warm leads: Y (should have $30 value)
# Cold leads: Z (should have $10 value)
```

**In Google Ads**:

- Check that conversion values match lead scores
- Verify "Maximize Conversion Value" bidding is active
- Monitor if algorithm shifts toward higher-value conversions

---

### Week 2-3: Algorithm Learning

Google Ads needs **2-3 weeks** to learn the new value patterns.

**What you'll see**:

- Week 1: No change (algorithm collecting data)
- Week 2: CPA may increase slightly (targeting better quality costs more)
- Week 3: Hot lead % increases, CPA stabilizes

**DON'T PANIC** if CPA increases 10-20% initially. You're paying slightly more per conversion, but getting MUCH better quality.

**Example**:

- Before: $17.50 CPA, 62.5% hot leads = $28 per hot lead
- Week 3: $19 CPA, 80% hot leads = $23.75 per hot lead ✅ (15% improvement!)

---

## 🎯 Expected Results (4 Weeks)

| Metric                | Current  | After Value Optimization          |
| --------------------- | -------- | --------------------------------- |
| Hot Lead %            | 62.5%    | 75-85%                            |
| Avg Lead Score        | 12.38/20 | 14-16/20                          |
| CPA                   | $17.50   | $18-20 (acceptable)               |
| **Cost per Hot Lead** | **$28**  | **$22-24** ✅ **21% improvement** |

---

## 🚨 Troubleshooting

### Problem: gtag not defined

**Solution**: Make sure Google Ads tag is in `_app.tsx` or `_document.tsx`

```typescript
// In src/pages/_app.tsx or _document.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-ads" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-XXXXXXXXXX');
  `}
</Script>
```

---

### Problem: Values not showing in Google Ads

**Solution**:

1. Check conversion action is set to "Use the value from the Google Analytics 4 property"
2. Wait 24-48 hours for data to appear
3. Verify `send_to` conversion ID matches your account: `AW-16679471170/F0GVCJjHwNQZEMKQspE-`
4. Check GA4 is receiving the values (Real-time → Events → generate_lead)

---

### Problem: All values showing as $0

**Solution**:

1. Check that `value` parameter is a NUMBER, not string
2. Ensure `currency: 'USD'` is set (or 'KES' if you prefer)
3. Verify conversion is firing (check in Real-Time reports)

---

## 📝 Code Summary

**Key changes**:

1. ✅ Calculate conversion value based on lead score (1/10/30/100)
2. ✅ Send to Google Ads via `gtag('event', 'conversion', { value: X })`
3. ✅ Change Performance Max to "Maximize Conversion Value" bidding
4. ✅ Monitor for 3 weeks as algorithm learns

**Files modified**:

- `/src/components/forms/EnhancedEnquiryForm.tsx` (add gtag event)
- `/src/types/gtag.d.ts` (TypeScript declaration, if needed)

**Google Ads changes**:

- Conversion action: Enable "different values per conversion"
- Performance Max: Change to "Maximize Conversion Value"

---

## 🎓 Why This Works

**Before value tracking**:

- All leads equal → Algorithm can't tell hot from cold
- Optimizes for VOLUME (any form submission)
- Gets 62.5% hot leads by luck

**After value tracking**:

- Hot leads = $100, Cold = $1 → Algorithm learns quality
- Optimizes for VALUE (high-scoring submissions)
- Actively targets users who behave like hot leads

**Result**: 20-30% improvement in lead quality at similar or better cost per HOT lead.

---

## 🔗 Next Steps

After implementing value tracking:

1. **Week 1**: Verify data flowing correctly (check Google Ads conversions)
2. **Week 2**: Upload Customer Match audiences (see PMAX-QUICK-START-CHECKLIST.md)
3. **Week 3**: Create high-intent asset group
4. **Week 4**: Review results, scale winning strategies

**Full strategy**: `/reports/google-ads/PERFORMANCE-MAX-LEAD-QUALITY-STRATEGY.md`
