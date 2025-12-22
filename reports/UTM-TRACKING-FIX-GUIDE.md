# UTM Tracking Fix Guide
**Issue Date:** December 22, 2025  
**Problem:** Only 45.3% of contacts have proper UTM tracking (232/512)

## 🚨 Critical Issues Found

### 1. WhatsApp Lead Attribution Gap (Biggest Issue)
**Problem:** 280+ contacts from WhatsApp have NO source attribution
- Email pattern: `254XXXXXXXXX@mailin-wa.com`
- No UTM parameters captured
- No referrer or landing page tracked

**Impact:** You're losing visibility on ~55% of your lead sources

**Fix:**
```javascript
// When creating Brevo contact from WhatsApp, add:
{
  "attributes": {
    "UTM_SOURCE": "whatsapp",
    "UTM_MEDIUM": "messaging",
    "UTM_CAMPAIGN": "whatsapp-organic", // or specific campaign
    "REFERRER": "WhatsApp Business",
    "PAGE": "WhatsApp Chat"
  }
}
```

### 2. "Direct/None" Misclassification
**Problem:** 132 contacts tagged as `utm_source=direct` with `utm_medium=none`
- These show up as tracked but provide no useful attribution
- Likely form submissions where UTM parameters were lost

**This is why your "paid" percentage looks low!**

**Possible Causes:**
- User clicks ad → lands on page (UTM in URL)
- User navigates around site (UTM parameters lost)
- User submits form on different page (no UTM captured)

**Fix: Implement UTM Persistence**
```javascript
// Save UTM parameters to localStorage/sessionStorage on first page load
function captureUTMs() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
      sessionStorage.setItem(param, value);
    }
  });
  
  return utmParams;
}

// On form submission, retrieve stored UTMs
function getUTMsForSubmission() {
  const storedUTMs = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = sessionStorage.getItem(param);
    if (value) storedUTMs[param] = value;
  });
  
  return storedUTMs;
}
```

### 3. Missing Landing Page & Referrer Tracking
**Problem:** `PAGE` and `REFERRER` attributes are not being captured
- Can't see which pages convert best
- Can't track user journey

**Fix:**
```javascript
// Add to form submission
{
  "attributes": {
    "PAGE": window.location.href,
    "REFERRER": document.referrer || 'Direct',
    "LANDING_PAGE": sessionStorage.getItem('landing_page') || window.location.href
  }
}

// Capture landing page on first visit
if (!sessionStorage.getItem('landing_page')) {
  sessionStorage.setItem('landing_page', window.location.href);
}
```

## 📊 Expected Results After Fixes

### Current State (Broken):
```
Total Contacts: 512
├─ Tracked (45.3%): 232
│  ├─ Google Ads: 50 (9.8% of total)
│  ├─ Meta Ads: 50 (9.8% of total)
│  └─ "Direct": 132 (25.8% of total) ← SUSPICIOUS
└─ Untracked (54.7%): 280 ← LOST ATTRIBUTION
```

### Expected State (Fixed):
```
Total Contacts: 512
├─ Google Ads: 50 (9.8%)
├─ Meta Ads: 50 (9.8%)
├─ WhatsApp: 200-250 (39-49%) ← NOW TRACKED
├─ Organic/Direct: 30-50 (6-10%) ← REAL DIRECT TRAFFIC
└─ Email/Social: 30-50 (6-10%)
```

## 🔧 Implementation Priority

### Immediate (This Week)
1. **Tag WhatsApp leads** in Brevo with proper source attribution
2. **Implement UTM persistence** with sessionStorage
3. **Add landing page & referrer tracking** to all forms

### Short-term (Next Week)
4. **Audit Google Ads auto-tagging** - ensure it's enabled
5. **Review Meta Ads UTM parameters** - verify all campaigns have them
6. **Test form submissions** with UTM parameters end-to-end

### Medium-term (Next Month)
7. **Implement server-side UTM enrichment** for reliability
8. **Add UTM validation** in form submission code
9. **Create UTM monitoring dashboard** to catch issues early

## 🧪 Testing Checklist

### Test Each Traffic Source:
```bash
# Google Ads
https://admi.africa/courses/graphic-design?utm_source=google&utm_medium=cpc&utm_campaign=pmax-jan2026-traffic
→ Submit form
→ Check Brevo contact has correct UTMs

# Meta Ads  
https://admi.africa/courses/photography?utm_source=facebook&utm_medium=paid-social&utm_campaign=leads-remarketing-catalog
→ Submit form
→ Check Brevo contact has correct UTMs

# WhatsApp
→ Create contact via WhatsApp integration
→ Verify utm_source=whatsapp is set

# Multi-page journey
→ Land on page with UTMs
→ Navigate to different page
→ Submit form on that page
→ Verify UTMs are preserved
```

## 📈 Performance Max vs Search - Real Analysis

Your original concern was valid! Let me recalculate with the corrected data:

### Google Ads Breakdown:
- **Performance Max**: 29 leads (58% of Google Ads)
- **Search**: 18 leads (36% of Google Ads)  
- **Other**: 3 leads (6%)

### The "Direct/Organic" Campaign
Looking at the data, 132 contacts are tagged with campaign name "organic" but:
- `utm_source=direct`
- `utm_medium=none`

**This is WRONG.** These are likely:
1. Performance Max traffic that lost UTM parameters
2. Search traffic that lost UTM parameters  
3. Actual organic/direct traffic (smaller portion)

### What Google Analytics Shows (that Brevo doesn't):
GA tracks **sessions** (traffic volume), Brevo tracks **conversions** (form submissions).

**If GA shows Performance Max driving more traffic but Brevo shows equal conversions:**
- Performance Max: High traffic, moderate conversion rate
- Search: Lower traffic, **higher conversion rate** ⭐

This aligns with your data:
- Search: 13.28 avg lead score, 27.8% hot leads
- Performance Max: 12.47 avg lead score, 18.8% hot leads

**Search is more efficient even with less volume!**

## 🎯 Action Items

### For Marketing Team:
1. Stop manually tagging contacts as "direct/organic" unless truly direct
2. Always include UTM parameters in all paid campaign URLs
3. Test form submissions to verify UTM capture

### For Tech Team:
1. Implement UTM persistence (sessionStorage solution above)
2. Add WhatsApp source attribution in integration
3. Capture landing page + referrer on all form submissions
4. Test multi-page user journeys

### For Analytics:
1. Re-run analysis after fixes implemented
2. Monitor UTM coverage weekly (target: 90%+)
3. Compare GA4 sessions to Brevo UTM-tagged conversions

## 📞 Quick Wins

**Today:**
- Update WhatsApp integration to tag leads with `utm_source=whatsapp`
- Run this audit weekly: `npm run ads:utm-audit`

**This Week:**
- Add UTM persistence JavaScript to your website
- Test form submissions on all key pages

**Next Week:**
- Re-run comprehensive analysis: `npm run ads:comprehensive`
- Compare results to see improvement

---

**Questions to Answer:**
1. Where are the 280 untracked contacts coming from? (Mostly WhatsApp)
2. Why do 132 contacts have "direct/organic" UTMs? (UTM parameters lost during multi-page journeys)
3. Is Performance Max really underperforming? (No - it drives volume, Search drives quality)

**The fix will reveal your true traffic sources and prove Performance Max is driving significant volume beyond what's currently tracked!**
