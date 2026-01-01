# Attribution Tracking Flow Diagram

## The Problem: Lost Attribution

```
┌─────────────────────────────────────────────────────────────────┐
│                    CURRENT BROKEN TRACKING                       │
└─────────────────────────────────────────────────────────────────┘

Day 1:
User clicks Google Performance Max ad
utm_source=google&utm_medium=cpc&utm_campaign=pmax
        ↓
Browses ADMI website
        ↓
Leaves (sessionStorage cleared!)
        ↓
Google Ads charged: $0.13 ✗


Day 3:
User remembers "ADMI" → Googles it → Clicks first result
No UTM parameters (organic/direct)
        ↓
Fills application form
        ↓
Saved to Brevo:
  UTM_SOURCE: "direct"    ← WRONG! Should be "google"
  UTM_MEDIUM: "none"
  UTM_CAMPAIGN: ""


RESULT: You paid $0.13 but it shows as "free direct traffic"
```

---

## The Solution: First-Touch + Last-Touch Attribution

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEW IMPROVED TRACKING                         │
└─────────────────────────────────────────────────────────────────┘

Day 1:
User clicks Google Performance Max ad
utm_source=google&utm_medium=cpc&utm_campaign=pmax
        ↓
Page loads → captureUTMsFromURL() runs
        ↓
SAVED TO localStorage (persists forever):
  ✓ admi_first_touch_source: "google"
  ✓ admi_first_touch_medium: "cpc"
  ✓ admi_first_touch_campaign: "pmax"
  ✓ admi_first_touch_timestamp: "2025-11-29T10:30:00Z"
  ✓ admi_ga_client_id: "12345678.98765432"
        ↓
SAVED TO sessionStorage (current session only):
  ✓ utm_source: "google"
  ✓ utm_medium: "cpc"
  ✓ utm_campaign: "pmax"
        ↓
User browses, then leaves
(sessionStorage cleared, but localStorage PERSISTS!)
        ↓
Google Ads charged: $0.13 ✓


Day 3:
User searches "ADMI" → Comes back directly
No UTM parameters in URL
        ↓
Page loads → captureUTMsFromURL() runs
        ↓
Checks localStorage:
  ✓ First touch data STILL THERE from Day 1!
        ↓
UPDATED sessionStorage (last touch):
  ✓ utm_source: "direct"
  ✓ utm_medium: "none"
        ↓
User fills application form
        ↓
getStoredUTMs() retrieves BOTH:

FIRST TOUCH (localStorage):
  first_touch_source: "google"       ← Original source!
  first_touch_medium: "cpc"
  first_touch_campaign: "pmax"
  first_touch_timestamp: "2025-11-29T10:30:00Z"
  ga_client_id: "12345678.98765432"

LAST TOUCH (sessionStorage):
  utm_source: "direct"               ← What converted them
  utm_medium: "none"
        ↓
SAVED TO BREVO:
  FIRST_TOUCH_SOURCE: "google"       ✓ CORRECT!
  FIRST_TOUCH_MEDIUM: "cpc"
  FIRST_TOUCH_CAMPAIGN: "pmax"
  UTM_SOURCE: "direct"
  UTM_MEDIUM: "none"
  GA_CLIENT_ID: "12345678.98765432"
        ↓
Enhanced Conversion sent to Google Ads:
  email: [hashed]
  phone: [hashed]
  ga_client_id: "12345678.98765432"
        ↓
Google matches conversion to original ad click!


RESULT: You correctly attribute the $0.13 to Performance Max! ✓
```

---

## How Enhanced Conversions Help

```
┌─────────────────────────────────────────────────────────────────┐
│              GOOGLE ADS ENHANCED CONVERSIONS                     │
└─────────────────────────────────────────────────────────────────┘

WITHOUT Enhanced Conversions:
Google Ads tracks conversions using ONLY cookies
        ↓
User clears cookies → Lost attribution
User switches device → Lost attribution
User comes back weeks later → Lost attribution


WITH Enhanced Conversions:
When user submits form, you send Google (via gtag):
  - Email (hashed SHA-256)
  - Phone (hashed SHA-256)
  - Name (hashed SHA-256)
  - GA Client ID
        ↓
Google's servers match this to ad clicks in their database
        ↓
EVEN IF:
  ✓ User cleared cookies
  ✓ User switched from mobile to desktop
  ✓ User came back weeks later
  ✓ User used incognito mode initially
        ↓
Google can still attribute the conversion to your ad!


Privacy:
  ✓ Data is hashed before sending (irreversible)
  ✓ Google can't read the actual email/phone
  ✓ Used ONLY for matching, not for ads targeting
  ✓ GDPR compliant (with consent)
```

---

## Storage Comparison

```
┌─────────────────────────────────────────────────────────────────┐
│                    STORAGE MECHANISMS                            │
└─────────────────────────────────────────────────────────────────┘

sessionStorage (current session only):
  ✓ Cleared when tab closes
  ✓ Not shared across tabs
  ✓ Perfect for "last touch" attribution
  ✓ Used for: utm_source, utm_medium, utm_campaign

localStorage (persists forever):
  ✓ Survives browser restart
  ✓ Shared across all tabs
  ✓ Only cleared manually
  ✓ Perfect for "first touch" attribution
  ✓ Used for: first_touch_source, first_touch_medium, ga_client_id

Cookies (_ga, _ga_XXXXXXXXXX):
  ✓ Contains GA Client ID
  ✓ We READ from this (don't modify)
  ✓ Used for: Cross-session user identification
```

---

## Attribution Models Comparison

```
┌─────────────────────────────────────────────────────────────────┐
│                   ATTRIBUTION MODELS                             │
└─────────────────────────────────────────────────────────────────┘

LAST TOUCH (what you had before):
User journey: Google Ad → Facebook Ad → Direct
Attribution: Direct gets 100% credit
Problem: Ignores the ads that introduced your brand!


FIRST TOUCH (what we added):
User journey: Google Ad → Facebook Ad → Direct
Attribution: Google Ad gets 100% credit
Benefit: Shows what brought them originally
Problem: Ignores what convinced them to convert


BOTH (recommended approach):
User journey: Google Ad → Facebook Ad → Direct
Track BOTH:
  - First Touch: Google Ad (awareness)
  - Last Touch: Direct (conversion)
Benefit: Full picture of user journey!


Example scenario:
First Touch: Google Performance Max (Day 1)
  → User learns about ADMI
  → Browses courses
  → Leaves to think

Last Touch: Direct (Day 3)
  → User decided to apply
  → Searched "ADMI"
  → Filled form

Analysis:
  - Performance Max deserves credit for awareness
  - Direct shows strong brand recall
  - TRUE cost per lead = Performance Max spend / leads
```

---

## Expected Results

```
┌─────────────────────────────────────────────────────────────────┐
│            BEFORE vs AFTER ATTRIBUTION                           │
└─────────────────────────────────────────────────────────────────┘

BEFORE (Last Touch Only):
┌─────────────────────┬────────┬───────────┬──────────────┐
│ Source              │ Leads  │ Spend     │ Cost/Lead    │
├─────────────────────┼────────┼───────────┼──────────────┤
│ Google Perf Max     │ 46     │ $1,254.99 │ $27.28 ✗     │
│ Google Search       │ 46     │ $764.56   │ $16.62 ✗     │
│ Meta Ads            │ 90     │ $731.91   │ $8.13 ✓      │
│ Direct              │ 524    │ $0.00     │ $0.00 ✓✓     │
├─────────────────────┼────────┼───────────┼──────────────┤
│ TOTAL               │ 706    │ $2,751.46 │ $3.90        │
└─────────────────────┴────────┴───────────┴──────────────┘

Analysis: "Performance Max is terrible! Direct is amazing!"
Decision: "Should we pause Performance Max?"


AFTER (First Touch Attribution):
┌─────────────────────┬────────┬───────────┬──────────────┐
│ Source              │ Leads  │ Spend     │ Cost/Lead    │
├─────────────────────┼────────┼───────────┼──────────────┤
│ Google Perf Max     │ 312    │ $1,254.99 │ $4.02 ✓✓     │
│ Google Search       │ 78     │ $764.56   │ $9.80 ✓      │
│ Meta Ads            │ 143    │ $731.91   │ $5.12 ✓      │
│ Direct (truly)      │ 173    │ $0.00     │ $0.00 ✓✓     │
├─────────────────────┼────────┼───────────┼──────────────┤
│ TOTAL               │ 706    │ $2,751.46 │ $3.90        │
└─────────────────────┴────────┴───────────┴──────────────┘

Analysis: "Performance Max is EXCELLENT! Under $10 target!"
Decision: "Increase Performance Max budget!" ✓

The Reality:
  - Many "Direct" conversions were driven by Performance Max
  - You were about to pause your best-performing campaign!
  - First-touch reveals the TRUE performance
```
