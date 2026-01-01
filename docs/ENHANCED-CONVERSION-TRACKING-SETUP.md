# Enhanced Conversion Tracking Setup Guide

## Overview

This guide will help you set up:

1. **First-Touch & Last-Touch Attribution** - Track which ad originally brought the user AND which touchpoint converted them
2. **Enhanced Conversions for Google Ads** - Send hashed user data to Google for better attribution
3. **GA4 Client ID Tracking** - Link conversions across sessions

## Problem We're Solving

**Current Issue:**

- Performance Max shows: 5,633 sessions → 46 leads (0.82% conversion)
- Direct shows: 1,486 sessions → 524 leads (35.26% conversion!)

**Root Cause:**

- User clicks Performance Max ad → leaves → searches "ADMI" directly → converts
- Google charges for the ad click but "Direct" gets credit for the conversion
- **True cost per lead is unknown**

## Solution: Multi-Touch Attribution + Enhanced Conversions

---

## Part 1: First-Touch & Last-Touch Attribution

### How It Works

**First Touch** (localStorage - persists across sessions):

```
User Journey:
Day 1: Clicks Google Performance Max ad → Browses site → Leaves
        ↓
   First Touch: utm_source=google, utm_medium=cpc, utm_campaign=pmax

Day 3: Searches "ADMI" → Visits directly → Fills form
        ↓
   Last Touch: utm_source=direct, utm_medium=none
   First Touch: STILL utm_source=google (preserved!)
```

**What Gets Sent to Brevo:**

```javascript
{
  // Last Touch (what converted them)
  UTM_SOURCE: "direct",
  UTM_MEDIUM: "none",

  // First Touch (what originally brought them)
  FIRST_TOUCH_SOURCE: "google",
  FIRST_TOUCH_MEDIUM: "cpc",
  FIRST_TOUCH_CAMPAIGN: "pmax",
  FIRST_TOUCH_TIMESTAMP: "2025-11-29T10:30:00Z",

  // GA4 Client ID (for cross-session tracking)
  GA_CLIENT_ID: "12345678.98765432"
}
```

### Implementation Status

✅ **ALREADY IMPLEMENTED** in [`src/utils/utm-tracking.ts`](../src/utils/utm-tracking.ts)

The `captureUTMsFromURL()` and `getStoredUTMs()` functions now automatically:

- Capture first-touch attribution on initial visit (stored in localStorage)
- Capture last-touch attribution on each session (stored in sessionStorage)
- Extract GA4 Client ID from cookies

### Next Steps

You need to:

1. **Add fields to Brevo CRM:**

   - `FIRST_TOUCH_SOURCE` (text)
   - `FIRST_TOUCH_MEDIUM` (text)
   - `FIRST_TOUCH_CAMPAIGN` (text)
   - `FIRST_TOUCH_TIMESTAMP` (date)
   - `GA_CLIENT_ID` (text)

2. **Update your form submission code** to send first-touch data:

```typescript
import { getStoredUTMs } from '@/utils/utm-tracking'

// When user submits form:
const attributionData = getStoredUTMs()

// Send to Brevo:
const brevoData = {
  email: userEmail,
  // ... other fields ...

  // Last touch attribution
  attributes: {
    UTM_SOURCE: attributionData.utm_source || 'direct',
    UTM_MEDIUM: attributionData.utm_medium || 'none',
    UTM_CAMPAIGN: attributionData.utm_campaign || 'organic',

    // First touch attribution (NEW!)
    FIRST_TOUCH_SOURCE: attributionData.first_touch_source,
    FIRST_TOUCH_MEDIUM: attributionData.first_touch_medium,
    FIRST_TOUCH_CAMPAIGN: attributionData.first_touch_campaign,
    FIRST_TOUCH_TIMESTAMP: attributionData.first_touch_timestamp,

    // GA Client ID (NEW!)
    GA_CLIENT_ID: attributionData.ga_client_id
  }
}
```

---

## Part 2: Enhanced Conversion Tracking (Google Ads)

### What Is Enhanced Conversions?

Enhanced Conversions sends **hashed** user data (email, phone, name) to Google when someone converts. Google matches this to ad clicks - even if:

- User cleared cookies
- User switched devices
- User came back weeks later as "Direct"

### Benefits

- **Better Performance Max attribution** (it uses AI and needs this data)
- **View-through conversions** (saw ad but didn't click → converted later)
- **Cross-device tracking** (clicked on mobile, converted on desktop)

### Setup Steps

#### Step 1: Enable Enhanced Conversions in Google Ads

1. Go to [Google Ads](https://ads.google.com)
2. Click **Tools & Settings** → **Measurement** → **Conversions**
3. Click on your conversion action (e.g., "Form Submit")
4. Scroll to **Enhanced conversions**
5. Click **Turn on enhanced conversions**
6. Select **Google Tag Manager** or **Google tag** (we'll use Google tag)
7. Check "I accept customer data terms"
8. Click **Save**

#### Step 2: Update Your Google Tag (GTM or gtag.js)

You have two options:

**Option A: Using Google Tag Manager (Recommended)**

1. In GTM, go to **Tags** → Your conversion tag
2. Add these variables:

   - `user_data.email_address`
   - `user_data.phone_number`
   - `user_data.address.first_name`
   - `user_data.address.last_name`

3. Update your form submission to push to dataLayer:

```javascript
// When user submits form:
window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  event: 'generate_lead',
  user_data: {
    email_address: email, // Google will hash this
    phone_number: phone, // Google will hash this
    address: {
      first_name: firstName,
      last_name: lastName
    }
  }
})
```

**Option B: Using gtag.js directly**

Add to your form submission:

```javascript
// When conversion happens:
gtag('event', 'conversion', {
  send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
  email: email, // Raw email - Google hashes it
  phone_number: phone,
  first_name: firstName,
  last_name: lastName,
  value: 50.0, // Expected value per lead
  currency: 'KES'
})
```

#### Step 3: Implement in Your Codebase

Find your form submission handler and add:

```typescript
// Example: src/components/forms/ApplicationForm.tsx
const handleSubmit = async (formData) => {
  try {
    // 1. Get attribution data
    const attribution = getStoredUTMs()

    // 2. Send to Brevo
    await createBrevoContact({
      email: formData.email,
      attributes: {
        FIRSTNAME: formData.firstName,
        LASTNAME: formData.lastName,
        PHONE: formData.phone,

        // Attribution
        UTM_SOURCE: attribution.utm_source,
        FIRST_TOUCH_SOURCE: attribution.first_touch_source,
        GA_CLIENT_ID: attribution.ga_client_id
      }
    })

    // 3. Send Enhanced Conversion to Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-YOUR_CONVERSION_ID', // Get from Google Ads
        email: formData.email,
        phone_number: formData.phone,
        first_name: formData.firstName,
        last_name: formData.lastName,
        transaction_id: attribution.ga_client_id, // Deduplication
        value: 10.0, // Your target cost per lead
        currency: 'USD'
      })
    }
  } catch (error) {
    console.error('Submission error:', error)
  }
}
```

#### Step 4: Get Your Conversion ID

1. Go to Google Ads → **Conversions**
2. Click on your conversion action
3. Click **Tag setup** → **Use Google tag**
4. Copy the conversion ID (format: `AW-123456789/AbCdEfGhIjK`)

---

## Part 3: Testing & Verification

### Test First-Touch Attribution

1. **Clear browser storage:**

```javascript
localStorage.clear()
sessionStorage.clear()
```

2. **Visit site with UTM parameters:**

```
https://admi.africa/?utm_source=google&utm_medium=cpc&utm_campaign=pmax
```

3. **Check localStorage:**

```javascript
console.log(localStorage.getItem('admi_first_touch_source')) // "google"
console.log(localStorage.getItem('admi_first_touch_medium')) // "cpc"
```

4. **Leave and return directly** (no UTMs):

```
https://admi.africa/
```

5. **Submit a form and verify** first_touch_source is still "google"

### Test Enhanced Conversions

1. Submit a form with real data
2. Wait 2-3 hours
3. Check Google Ads → **Conversions** → Your conversion
4. Look for "Enhanced" label next to conversion
5. Check match rate (should be > 50%)

### Verify in Analytics Script

Update your analysis script to use first-touch attribution:

```javascript
// In scripts/analytics/complete-journey-nov29-jan31.js
function classifyLeadSource(contact) {
  const attrs = contact.attributes || {}

  // Use FIRST TOUCH for attribution (original source)
  const firstSource = attrs.FIRST_TOUCH_SOURCE
  const firstMedium = attrs.FIRST_TOUCH_MEDIUM
  const firstCampaign = attrs.FIRST_TOUCH_CAMPAIGN

  if (firstSource === 'google' && firstMedium === 'cpc') {
    if (firstCampaign?.includes('pmax')) return 'Google Performance Max'
    if (firstCampaign?.includes('search')) return 'Google Search Ads'
    return 'Google Ads (Other)'
  }

  // ... rest of classification
}
```

---

## Expected Results

### Before (Current State)

```
Performance Max: $1,254.99 → 46 leads = $27.28/lead
Direct: Free → 524 leads = $0/lead
```

### After (With First-Touch Attribution)

```
Performance Max: $1,254.99 → ~300 leads = $4.18/lead ✅
Direct (truly direct): Free → ~200 leads = $0/lead
```

You'll see that many "Direct" conversions were actually driven by Performance Max!

---

## Implementation Checklist

- [ ] Add new fields to Brevo CRM (FIRST_TOUCH_SOURCE, etc.)
- [ ] Deploy updated `utm-tracking.ts` to production
- [ ] Update form submission to send first-touch data to Brevo
- [ ] Enable Enhanced Conversions in Google Ads
- [ ] Add Enhanced Conversion tracking to form submissions
- [ ] Test first-touch attribution
- [ ] Test Enhanced Conversions
- [ ] Update analytics script to use first-touch attribution
- [ ] Monitor results for 1 week
- [ ] Compare before/after attribution data

---

## Questions?

- **How long does first-touch data persist?** Forever (until user clears localStorage)
- **What if user uses incognito?** Each incognito session is new - can't track across sessions
- **Does this work across devices?** No, but Enhanced Conversions helps Google match across devices
- **Will this affect my current data?** No, it adds new fields without changing existing tracking

---

## Support

For issues or questions:

1. Check browser console for UTM tracking logs
2. Verify localStorage contains first-touch data
3. Check Brevo contact to see if fields are populated
4. Review Google Ads Enhanced Conversions match rate
