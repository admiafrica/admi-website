# Enhanced Conversions - Quick Start

## TL;DR

Your tracking is now ready for **first-touch attribution**. Here's what to do next:

---

## 1. Add These Fields to Brevo CRM (1 minute)

**Automated Setup (Recommended):**

```bash
node scripts/setup-brevo-attribution-fields.js
```

This automatically creates all 5 required fields:

| Field Name              | Type | Description                                           |
| ----------------------- | ---- | ----------------------------------------------------- |
| `FIRST_TOUCH_SOURCE`    | Text | Original traffic source (e.g., google, facebook)      |
| `FIRST_TOUCH_MEDIUM`    | Text | Original medium (e.g., cpc, social)                   |
| `FIRST_TOUCH_CAMPAIGN`  | Text | Original campaign name                                |
| `FIRST_TOUCH_TIMESTAMP` | Date | When user first visited                               |
| `GA_CLIENT_ID`          | Text | Google Analytics client ID for cross-session tracking |

**Manual Setup (Alternative):**
Go to [Brevo Contacts](https://app.brevo.com/contact/list) → Settings → Contact attributes → Add each field above manually.

---

## 2. Update Your Form Submissions (Already coded, just deploy)

The code in `src/utils/utm-tracking.ts` is ready. When you call `getStoredUTMs()`, you now get:

```javascript
{
  // Current (last touch)
  utm_source: "direct",
  utm_medium: "none",

  // Original (first touch) ✨ NEW!
  first_touch_source: "google",
  first_touch_medium: "cpc",
  first_touch_campaign: "pmax",

  // GA Client ID ✨ NEW!
  ga_client_id: "12345678.98765432"
}
```

Just make sure your form submissions send these fields to Brevo!

---

## 3. Enable Enhanced Conversions in Google Ads (10 minutes)

### Step-by-Step:

1. Go to [Google Ads](https://ads.google.com) → Tools → Conversions
2. Click your "Form Submit" conversion
3. Click "Edit settings"
4. Scroll to "Enhanced conversions"
5. Toggle it **ON**
6. Accept terms
7. **Save**

### Add to Your Form Code:

```typescript
// When form submits successfully:
if (window.gtag) {
  window.gtag('event', 'conversion', {
    send_to: 'AW-YOUR_CONVERSION_ID/YOUR_LABEL', // Get from Google Ads
    email: email,
    phone_number: phone,
    first_name: firstName,
    last_name: lastName,
    value: 10.0, // Your target cost per lead in USD
    currency: 'USD'
  })
}
```

**Get your Conversion ID:**

- Google Ads → Conversions → Click conversion → Tag setup → Copy ID (format: `AW-123456789/AbCdEf`)

---

## 4. Test It (5 minutes)

### Test First-Touch:

```javascript
// 1. Clear storage
localStorage.clear()
sessionStorage.clear()

// 2. Visit with UTMs
// Go to: https://admi.africa/?utm_source=test&utm_medium=cpc

// 3. Check it saved
console.log(localStorage.getItem('admi_first_touch_source')) // Should be "test"

// 4. Visit directly (no UTMs)
// Go to: https://admi.africa/

// 5. Check it persisted
console.log(localStorage.getItem('admi_first_touch_source')) // Still "test"!

// 6. Fill out a form and check Brevo - should see FIRST_TOUCH_SOURCE = "test"
```

### Test Enhanced Conversions:

1. Submit a real form
2. Wait 2-3 hours
3. Google Ads → Conversions → Look for "Enhanced" badge
4. Match rate should be >50%

---

## 5. Update Your Analytics Script

In `scripts/analytics/complete-journey-nov29-jan31.js`, change the classification to use first-touch:

```javascript
function classifyLeadSource(contact) {
  const attrs = contact.attributes || {}

  // Use FIRST TOUCH (what originally brought them)
  const source = attrs.FIRST_TOUCH_SOURCE || attrs.UTM_SOURCE || 'direct'
  const medium = attrs.FIRST_TOUCH_MEDIUM || attrs.UTM_MEDIUM || 'none'
  const campaign = attrs.FIRST_TOUCH_CAMPAIGN || attrs.UTM_CAMPAIGN || ''

  if (source === 'google' && medium === 'cpc') {
    if (campaign.toLowerCase().includes('pmax')) return 'Google Performance Max'
    if (campaign.toLowerCase().includes('search')) return 'Google Search Ads'
    return 'Google Ads (Other)'
  }
  // ... rest
}
```

---

## What This Fixes

### Current Problem:

```
User Journey:
Day 1: Clicks Google Performance Max ad ($0.13 cost) → Browses → Leaves
Day 3: Googles "ADMI" → Comes back direct → Converts

Your current tracking sees: "Direct" (free!)
Google Ads charged you: $0.13
Result: You think it's free, but it's not!
```

### After Fix:

```
Same journey ↑
Your new tracking sees:
  - First Touch: Google Performance Max ($0.13)
  - Last Touch: Direct

Result: You correctly attribute the $0.13 to Performance Max! ✅
```

---

## Expected Impact

**Before:**

- Performance Max: 46 leads, $27.28/lead
- Direct: 524 leads, $0/lead

**After (estimate):**

- Performance Max: ~300 leads, $4.18/lead ✅ (under $10 target!)
- Direct: ~200 leads, $0/lead

You'll finally see the **true performance** of your campaigns!

---

## Next Actions

1. [ ] Add 5 new fields to Brevo (5 min)
2. [ ] Deploy current code to production (already done in utm-tracking.ts)
3. [ ] Enable Enhanced Conversions in Google Ads (10 min)
4. [ ] Add gtag conversion code to forms (15 min)
5. [ ] Test everything (5 min)
6. [ ] Wait 1 week for data
7. [ ] Run analysis script with first-touch attribution
8. [ ] Compare results!

---

## Need Help?

See full guide: [ENHANCED-CONVERSION-TRACKING-SETUP.md](./ENHANCED-CONVERSION-TRACKING-SETUP.md)
