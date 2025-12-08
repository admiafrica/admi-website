# Complete Tracking Audit: Google Ads → Meta Ads → Analytics → CRM
**Date**: December 8, 2025
**Status**: Comprehensive Review

---

## 🎯 EXECUTIVE SUMMARY

### Current State
✅ Google Ads tracking: Configured
✅ Meta Ads tracking: Configured with pixel
⚠️ Analytics tracking: Needs verification
⚠️ CRM integration: Needs verification
❌ Cross-platform attribution: Not verified

### Critical Gaps Found
1. Form submission tracking across platforms
2. Lead attribution from ads to CRM
3. UTM parameter consistency
4. Conversion value tracking

---

## 📊 TRACKING FLOW DIAGRAM

```
User Journey:
Google Ads / Meta Ads
         ↓ (Click with UTMs)
    Landing Page
         ↓ (PageView tracked)
    Course Page
         ↓ (ViewContent tracked)
    Enquiry Form
         ↓ (form_start tracked?)
    Form Submit
         ↓ (form_submit / Lead tracked?)
    Thank You Page
         ↓ (Conversion tracked?)
    CRM (Brevo)
         ↓ (Lead captured?)
    Attribution
         ↓ (Source tracked?)
```

---

## 1️⃣ GOOGLE ADS TRACKING AUDIT

### Current Setup

**Conversion Actions Configured**:
- Form submissions
- Phone calls (if tracked)
- Page visits (?)

### What We Need to Verify

#### A. Google Ads Conversion Tag
**Location**: Should be on thank you page or form success
**Event**: `gtag('event', 'conversion', {...})`

**Check**:
```javascript
// Should be on /thank-you or form success callback
gtag('event', 'conversion', {
    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
    'value': 2500.0,
    'currency': 'USD',
    'transaction_id': ''
});
```

#### B. UTM Parameters
**Current Google Ads**:
- Performance Max: Uses auto-tagging (gclid)
- Search: Uses auto-tagging (gclid)

**Verify**: Auto-tagging is enabled in Google Ads settings

#### C. Enhanced Conversions
**Status**: Unknown
**Recommended**: Enable for better attribution

**Setup needed**:
```javascript
gtag('set', 'user_data', {
    "email": "user@example.com",
    "phone_number": "+254...",
    "address": {...}
});
```

---

## 2️⃣ META ADS TRACKING AUDIT

### Current Setup

**Meta Pixel**: `2180607305521624` ✅

**Events Currently Tracked**:
- ✅ PageView (automatic)
- ✅ ViewContent (course pages)
- ✅ form_submit (verified exists)
- ❓ form_start (unknown)
- ❌ Lead (standard event - not confirmed)

### What Needs Verification

#### A. Pixel Installation
**Check if pixel is on all pages**:

Run this audit:
```javascript
// Open admi.africa in browser
// Open Console (F12)
// Type:
fbq('track', 'PageView');
// Check for confirmation
```

#### B. Standard Events vs Custom Events

**Current**:
- Custom event: `form_submit` ✅
- Custom event: `form_start` (?)

**Recommended**: Also implement standard events
```javascript
// When form submitted
fbq('track', 'Lead', {
    content_name: 'Course Enquiry',
    value: 2500,
    currency: 'USD'
});
```

#### C. UTM Parameters
**New campaign setup**:
```
✅ utm_source=facebook
✅ utm_medium=paid-social
✅ utm_campaign=leads-remarketing-catalog
✅ utm_content={{ad.name}}
✅ act=1381877068796675
✅ business_id=193309761118328
```

**Old campaign**: Needs verification

---

## 3️⃣ GOOGLE ANALYTICS TRACKING AUDIT

### Setup Status

**Property**: GA4 (Property ID: 250948607) ✅
**GTM**: GTM-KPDDVWR ✅

### What Needs Verification

#### A. GA4 Events Configuration

**Required Events**:
```javascript
// Form submission
gtag('event', 'generate_lead', {
    'currency': 'USD',
    'value': 2500,
    'items': [{
        'item_id': 'course-film-production',
        'item_name': 'Film & TV Production'
    }]
});

// Form start
gtag('event', 'begin_checkout', {
    'currency': 'USD',
    'value': 2500
});
```

#### B. UTM Parameter Tracking

**Check GA4 is capturing**:
- Source: google, facebook, direct
- Medium: cpc, paid-social, organic
- Campaign: campaign names
- Content: ad names
- Term: keywords (for search)

**Verify in GA4**:
- Reports → Acquisition → Traffic acquisition
- Check if utm_source, utm_medium show up

#### C. Conversion Tracking

**Check these conversions are set up**:
1. **form_submit** (key event)
2. **course_view** (engagement)
3. **page_view** (baseline)

**Verify**:
- GA4 → Configure → Events
- Check "Mark as conversion" is enabled for form_submit

#### D. E-commerce Tracking (for Course Catalog)

**Not currently implemented** ❌

**Recommended setup**:
```javascript
// When viewing course
gtag('event', 'view_item', {
    'currency': 'USD',
    'value': 2500,
    'items': [{
        'item_id': 'course-film-production',
        'item_name': 'Film & TV Production',
        'price': 2500,
        'item_category': 'Diploma'
    }]
});

// When submitting form
gtag('event', 'purchase', {
    'transaction_id': 'LEAD-12345',
    'value': 2500,
    'currency': 'USD',
    'items': [...]
});
```

---

## 4️⃣ BREVO CRM TRACKING AUDIT

### Current Integration

**Brevo API**: Configured ✅
**List ID**: 106 ✅

### What Needs Verification

#### A. Lead Capture Flow

**Check this flow works**:
1. User submits form on website
2. Form data sent to Brevo API
3. Contact created in Brevo
4. **UTM parameters captured?** ❓
5. **Source attribution saved?** ❓

#### B. UTM Parameter Storage in Brevo

**Critical**: Brevo needs to store:
- `utm_source` (google, facebook)
- `utm_medium` (cpc, paid-social)
- `utm_campaign` (campaign name)
- `gclid` (Google Click ID)
- `fbclid` (Facebook Click ID)

**Current status**: Unknown ❌

**Implementation needed**:
```javascript
// When form submits, capture UTMs
const urlParams = new URLSearchParams(window.location.search);
const utmData = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    gclid: urlParams.get('gclid'),
    fbclid: urlParams.get('fbclid')
};

// Send to Brevo with contact
await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
            UTM_SOURCE: utmData.utm_source,
            UTM_MEDIUM: utmData.utm_medium,
            UTM_CAMPAIGN: utmData.utm_campaign,
            GCLID: utmData.gclid,
            FBCLID: utmData.fbclid
        },
        listIds: [106]
    })
});
```

#### C. Custom Attributes in Brevo

**Check if these fields exist**:
- [ ] UTM_SOURCE
- [ ] UTM_MEDIUM
- [ ] UTM_CAMPAIGN
- [ ] GCLID
- [ ] FBCLID
- [ ] LEAD_SOURCE (derived)
- [ ] COURSE_INTEREST

**If not, create them in Brevo**:
1. Go to Contacts → Settings
2. Create custom attributes
3. Type: Text
4. Use in API calls

---

## 5️⃣ CROSS-PLATFORM ATTRIBUTION AUDIT

### Current Attribution Model

**Problem**: Multiple tracking systems, no single source of truth

### What Needs to Be Built

#### A. Attribution Logic

**Priority order** (first-touch attribution):
```
1. gclid present → Source: Google Ads
2. fbclid present → Source: Facebook Ads
3. utm_source=google → Source: Google Organic
4. utm_source=facebook → Source: Facebook Organic
5. None → Source: Direct/Unknown
```

#### B. Server-Side Attribution Tracking

**Create a tracking database table**:
```sql
CREATE TABLE lead_attribution (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(255),
    utm_content VARCHAR(255),
    gclid VARCHAR(255),
    fbclid VARCHAR(255),
    landing_page VARCHAR(500),
    referrer VARCHAR(500),
    timestamp TIMESTAMP DEFAULT NOW()
);
```

**Capture on page load**:
```javascript
// Save attribution on first visit (using cookie)
if (!getCookie('attribution_captured')) {
    const attribution = {
        utm_source: getURLParam('utm_source'),
        utm_medium: getURLParam('utm_medium'),
        utm_campaign: getURLParam('utm_campaign'),
        gclid: getURLParam('gclid'),
        fbclid: getURLParam('fbclid'),
        landing_page: window.location.href,
        referrer: document.referrer
    };

    // Save to cookie for 30 days
    setCookie('lead_attribution', JSON.stringify(attribution), 30);

    // Also send to backend
    fetch('/api/track-attribution', {
        method: 'POST',
        body: JSON.stringify(attribution)
    });
}
```

**On form submit, retrieve and send**:
```javascript
// Get attribution from cookie
const attribution = JSON.parse(getCookie('lead_attribution'));

// Send with form data
const formData = {
    email: email,
    name: name,
    ...attribution
};
```

---

## 🔍 AUDIT CHECKLIST

### Immediate Actions Required

#### Google Ads
- [ ] Verify conversion tracking is firing on form submit
- [ ] Check auto-tagging is enabled
- [ ] Enable enhanced conversions
- [ ] Verify gclid is being captured

#### Meta Ads
- [ ] Verify pixel fires on all pages
- [ ] Check form_submit event fires on form success
- [ ] Implement standard Lead event alongside custom event
- [ ] Verify fbclid is being captured

#### Google Analytics
- [ ] Verify form_submit is marked as conversion
- [ ] Check UTM parameters are captured correctly
- [ ] Set up e-commerce tracking for course views
- [ ] Create custom reports for ad performance

#### Brevo CRM
- [ ] Create custom attributes for UTM parameters
- [ ] Implement API calls to save UTM data
- [ ] Test attribution is saved correctly
- [ ] Create segments by traffic source

#### Attribution
- [ ] Build attribution tracking system
- [ ] Create database table for attribution
- [ ] Implement cookie-based attribution storage
- [ ] Build reporting dashboard

---

## 🚀 IMPLEMENTATION PRIORITY

### Phase 1: Critical (Do This Week)
**Goal**: Basic tracking works

1. **Verify pixel/tag firing** (2 hours)
   - Check Meta pixel on all pages
   - Check Google Ads conversion tag
   - Use Meta Pixel Helper + Google Tag Assistant

2. **UTM parameter capture in CRM** (4 hours)
   - Create Brevo custom attributes
   - Update form submission to include UTMs
   - Test end-to-end

3. **Mark GA4 conversions** (30 min)
   - Mark form_submit as key event
   - Verify it shows in reports

### Phase 2: Important (Next Week)
**Goal**: Better attribution

4. **Server-side attribution tracking** (6 hours)
   - Build database table
   - Implement cookie-based tracking
   - Update form handler

5. **Enhanced conversions** (2 hours)
   - Google Ads enhanced conversions
   - Meta CAPI (Conversions API)

6. **E-commerce tracking** (4 hours)
   - Implement view_item for courses
   - Implement purchase for enrollments

### Phase 3: Advanced (Month 2)
**Goal**: Full attribution

7. **Multi-touch attribution model**
8. **Custom dashboards**
9. **Automated reporting**

---

## 📊 TESTING PROTOCOL

### Test Each Platform

#### Test 1: Google Ads Conversion
```
1. Click Google Ad (or add ?gclid=test123 to URL)
2. Land on course page
3. Fill out enquiry form
4. Submit form
5. Check:
   ✓ Google Ads shows conversion
   ✓ GA4 shows form_submit event
   ✓ Brevo receives contact with gclid
```

#### Test 2: Meta Ads Conversion
```
1. Click Meta Ad (or add ?fbclid=test456 to URL)
2. Land on course page
3. Fill out enquiry form
4. Submit form
5. Check:
   ✓ Meta Events Manager shows form_submit
   ✓ GA4 shows form_submit event
   ✓ Brevo receives contact with fbclid
```

#### Test 3: Attribution Persistence
```
1. Visit site with UTMs: ?utm_source=google&utm_medium=cpc
2. Browse multiple pages
3. Come back next day (direct)
4. Submit form
5. Check:
   ✓ Original UTMs are preserved
   ✓ First-touch attribution = google/cpc
```

---

## 📈 EXPECTED DATA FLOW (After Implementation)

### Perfect Tracking Flow

```
User clicks ad
    ↓
URL: admi.africa/programs/film?utm_source=facebook&fbclid=xxx
    ↓
Page loads:
    → Meta Pixel fires PageView
    → GA4 tracks page_view with UTMs
    → Cookie saves attribution data
    ↓
Views course:
    → Meta Pixel fires ViewContent
    → GA4 tracks view_item
    ↓
Fills form:
    → Meta Pixel fires form_start (if implemented)
    → GA4 tracks begin_checkout
    ↓
Submits form:
    → Meta Pixel fires form_submit + Lead
    → GA4 tracks generate_lead
    → Google Ads fires conversion
    → Brevo creates contact with UTMs
    → Backend saves attribution
    ↓
Report shows:
    Platform: Facebook
    Campaign: leads-remarketing-catalog
    Cost: $3.50
    Lead: wilfred@example.com
    Course: Film & TV Production
```

---

## 🎯 SUCCESS METRICS

After implementation, you should be able to answer:

✅ **How many leads came from Google Ads?**
✅ **How many leads came from Meta Ads?**
✅ **What's the CPA for each platform?**
✅ **Which campaigns are most profitable?**
✅ **Which courses get most interest?**
✅ **What's the ROAS for each channel?**
✅ **What's the lead-to-enrollment rate by source?**

---

## 📞 NEXT STEPS

### This Week
1. Run pixel/tag verification tests
2. Create Brevo custom attributes
3. Update form submission code
4. Test end-to-end tracking

### Next Week
5. Implement server-side attribution
6. Set up enhanced conversions
7. Build reporting dashboard

### Ongoing
8. Monitor data quality daily
9. Fix tracking issues immediately
10. Optimize based on attribution data

---

**Status**: Ready to implement
**Estimated effort**: 16-20 hours
**Expected outcome**: 100% accurate attribution across all platforms
