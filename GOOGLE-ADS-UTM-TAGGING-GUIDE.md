# Google Ads UTM Tagging Strategy for ADMI

**Date:** December 1, 2025  
**Campaigns:** 2 active (Performance Max + Search)

---

## 🎯 Your Current Setup

### Active Campaigns

1. **ADMI Search Jan 2026** - Search campaign
2. **Website traffic-Performance Max-Jan** (ID: 23282289054) - Performance Max campaign

### Lead Journey

```
Google Ads Click → Landing Page → /enquiry form (pre-qualification) → Brevo CRM
```

### Customer List Upload

- ✅ 25,000 contacts uploaded to Google Ads
- **Purpose:** Audience signals for better targeting & similar audiences
- **Benefit:** Helps Google find high-quality prospects similar to your enrolled students

---

## 📋 Recommended UTM Structure

### Performance Max Campaign

**Final URL Template (Add to campaign settings):**

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=pmax-jan2026-traffic&utm_term={keyword}&utm_content={creative}&gclid={gclid}
```

**Breakdown:**

- `utm_source=google` - Traffic source
- `utm_medium=cpc` - Paid ads
- `utm_campaign=pmax-jan2026-traffic` - **Human-readable campaign name**
- `utm_term={keyword}` - Auto-populates search term (if applicable)
- `utm_content={creative}` - Auto-populates ad creative
- `gclid={gclid}` - Google Click ID for conversion tracking

### Search Campaign

**Final URL Template (Add to campaign settings):**

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=search-jan2026-admi&utm_term={keyword}&utm_content={creative}&gclid={gclid}
```

**Breakdown:**

- `utm_source=google` - Traffic source
- `utm_medium=cpc` - Paid ads
- `utm_campaign=search-jan2026-admi` - **Human-readable campaign name**
- `utm_term={keyword}` - Captures actual search query
- `utm_content={creative}` - Ad variation identifier
- `gclid={gclid}` - Google Click ID

---

## 🔧 How to Implement in Google Ads

### Option 1: Campaign-Level Tracking Template (RECOMMENDED)

1. Go to Google Ads → **Campaigns**
2. Click on **ADMI Search Jan 2026**
3. Click **Settings** → **Campaign URL options**
4. In **Tracking template**, paste:
   ```
   {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=search-jan2026-admi&utm_term={keyword}&utm_content={creative}&gclid={gclid}
   ```
5. Click **Save**

6. Repeat for **Website traffic-Performance Max-Jan**:
   ```
   {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=pmax-jan2026-traffic&utm_term={keyword}&utm_content={creative}&gclid={gclid}
   ```

### Option 2: Account-Level Tracking (Alternative)

If you want all campaigns to use the same structure:

1. Go to **Settings** → **Account settings**
2. Click **Tracking**
3. Add tracking template:
   ```
   {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}&gclid={gclid}
   ```
4. Then map campaign IDs to names in Brevo

---

## 📊 Enhanced Tracking Parameters

### Additional Parameters for Better Attribution

**For course-specific landing pages:**

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=pmax-jan2026-traffic&utm_term={keyword}&utm_content={creative}&utm_id=23282289054&course={targetid}&gclid={gclid}
```

**New parameters:**

- `utm_id=23282289054` - Campaign ID (keeps numeric ID for reference)
- `course={targetid}` - Captures which course ad was shown for
- `placement={placement}` - Where ad appeared (for Performance Max)

### Full Enhanced Template (Performance Max)

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=pmax-jan2026-traffic&utm_term={keyword}&utm_content={creative}&utm_id={campaignid}&placement={placement}&device={device}&gclid={gclid}
```

### Full Enhanced Template (Search)

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=search-jan2026-admi&utm_term={keyword}&utm_content={creative}&utm_id={campaignid}&matchtype={matchtype}&network={network}&device={device}&gclid={gclid}
```

**Additional parameters:**

- `{placement}` - Website/app where ad showed (PMax only)
- `{device}` - mobile, tablet, desktop
- `{matchtype}` - exact, phrase, broad (Search only)
- `{network}` - search, display, youtube (Search only)

---

## 🎓 Campaign Naming Convention

### Recommended Format

```
{type}-{intake}-{goal}-{audience}
```

**Examples:**

- `pmax-jan2026-traffic-broad` - Performance Max, January intake, traffic goal, broad audience
- `search-jan2026-conversions-brand` - Search, January intake, conversion goal, brand keywords
- `pmax-may2026-leads-lookalike` - Performance Max, May intake, leads, lookalike audience

### Current Campaigns Renamed

| Current Name                        | Recommended Name                           | UTM Campaign Value             |
| ----------------------------------- | ------------------------------------------ | ------------------------------ |
| Website traffic-Performance Max-Jan | Performance Max Jan 2026 - Website Traffic | `pmax-jan2026-traffic`         |
| ADMI Search Jan 2026                | ADMI Search Jan 2026 - Brand + Generic     | `search-jan2026-brand-generic` |

---

## 📈 Customer List Upload Strategy

### What You've Done ✅

- Uploaded 25,000 Brevo contacts to Google Ads
- This provides "audience signals" for Google's machine learning

### How Google Uses This

1. **Customer Match Audience**

   - Google matches emails to Google accounts
   - Can target/exclude these contacts directly

2. **Similar Audiences (Lookalike)**

   - Google finds users similar to your 25K contacts
   - Uses characteristics: demographics, interests, behavior

3. **Smart Bidding Signals**
   - Helps algorithms understand "good fit" prospects
   - Improves conversion predictions

### Recommended Segmentation

Upload **3 separate customer lists** instead of 1:

#### List 1: Enrolled Students (~500 contacts)

- **Name:** "ADMI Enrolled Students 2024-2025"
- **Use:** Exclude from ads, create high-value lookalike
- **Bid Adjustment:** N/A (excluded)

#### List 2: Hot Leads (15+ score, ~22 contacts)

- **Name:** "ADMI Hot Leads - High Intent"
- **Use:** Create similar audience, aggressive retargeting
- **Bid Adjustment:** +50% for similar audience

#### List 3: Warm + Cold Leads (5-14 score, ~5 contacts)

- **Name:** "ADMI Engaged Prospects"
- **Use:** Retargeting with different messaging
- **Bid Adjustment:** +20% for similar audience

#### List 4: Unqualified (<5 score, ~3,617 contacts)

- **Name:** "ADMI Low Intent Contacts"
- **Use:** Exclude from high-budget campaigns
- **Bid Adjustment:** -100% (exclude)

---

## 🔄 Updated Analysis Script Configuration

Your Brevo analysis script now needs to recognize both campaign names:

### Performance Max Detection

```javascript
// Current (not working)
campaign.includes('performance') || campaign.includes('pmax')

// Updated (will work)
campaign.includes('performance') ||
  campaign.includes('pmax') ||
  campaign === '23282289054' || // Campaign ID fallback
  campaign.includes('website-traffic-performance-max')
```

### Search Campaign Detection

```javascript
campaign.includes('search') && !campaign.includes('performance')
campaign === 'search-jan2026-admi' || campaign.includes('admi-search')
```

---

## ⚡ Quick Implementation Checklist

**This Week (Critical):**

- [ ] Add tracking template to Performance Max campaign
- [ ] Add tracking template to Search campaign
- [ ] Test both campaigns generate proper UTMs (click ads, check URL)
- [ ] Verify UTM data flows to Brevo correctly
- [ ] Run `npm run ads:journey` to confirm campaign detection

**Next Week (Optimization):**

- [ ] Segment 25K contact list into 4 quality tiers
- [ ] Create lookalike audiences from Enrolled Students list
- [ ] Set up remarketing lists for website visitors
- [ ] Add conversion tracking for form submissions
- [ ] Set up enhanced conversions with Cynthia's data

**Month 1 (Scale):**

- [ ] Test different UTM content values for ad variations
- [ ] A/B test landing pages with utm_content parameter
- [ ] Create separate campaigns for high-intent courses (Film/TV, Data Analysis)
- [ ] Launch Display remarketing with segmented customer lists

---

## 📞 Immediate Action: Contact Cynthia

**Hot Lead - Score 16/20**

- Name: Cynthia Lukui
- Phone: +254 116 358 552
- Email: lukuicynthia14@gmail.com
- Course: Video Production Certificate
- Timeline: January 2026 (IMMEDIATE)
- Budget: 100K - 300K KES
- Goal: Start own creative business
- Submitted: Nov 30, 2025 at 3:00 PM

**Call Script:**

1. "Hi Cynthia, this is [name] from ADMI. I saw you're interested in our Video Production Certificate for January 2026."
2. "You mentioned wanting to start your own creative business - that's exactly what this program is designed for."
3. "The January intake starts in 4 weeks. Can we schedule a campus tour this week?"
4. "We have payment plans starting from 50K deposit, would that work for you?"

---

## 🎯 Expected Results After Implementation

### Before (Current State)

- Campaign detection: 0 Performance Max, 0 Search (all "Other")
- Attribution: Only campaign ID visible
- Analysis: Can't compare campaign performance

### After (With Updated UTMs)

- Campaign detection: 100% accurate
- Attribution: Full journey visibility
- Analysis: Performance Max vs Search comparison
- Optimization: Data-driven budget allocation

### Week 1 After Implementation

- 3-5 leads/day (vs current 0.6/day)
- Clear campaign performance metrics
- Ability to scale winning campaign
- Better Google algorithm learning with proper signals

---

## 💡 Pro Tips

1. **Always include `gclid={gclid}`** - Enables offline conversion tracking
2. **Use lowercase** - UTM parameters are case-sensitive
3. **No spaces** - Use hyphens: `jan-2026` not `jan 2026`
4. **Test in Google's Campaign URL Builder** - Validate before deploying
5. **Document changes** - Keep record of when UTMs were updated
6. **Monitor for 48 hours** - Ensure data flows correctly to Brevo

---

## 🚨 Common Mistakes to Avoid

❌ **Don't use campaign ID as campaign name** - Hard to read in reports  
✅ **Use descriptive names** - `pmax-jan2026-traffic`

❌ **Don't mix URL parameters** - Keep consistent structure  
✅ **Standardize across campaigns** - Same format everywhere

❌ **Don't forget gclid** - Breaks conversion tracking  
✅ **Always include {gclid}** - Essential for Google Ads

❌ **Don't use special characters** - Breaks URLs  
✅ **Use alphanumeric + hyphens** - Safe for all systems

---

**Need help implementing?** Run these commands:

```bash
# Test current UTM detection
npm run ads:journey

# After implementing new UTMs, verify detection
npm run ads:journey

# Monitor real-time form submissions
npm run meta:monitor
```
