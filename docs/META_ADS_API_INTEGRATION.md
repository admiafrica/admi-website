# Meta Ads API Integration for ADMI

**Purpose**: Monitor and optimize Meta (Facebook/Instagram) retargeting campaigns targeting pre-qualified website visitors

**Campaign Goals**:

- 150 enrolled students with $1,600 total budget
- Meta retargeting: $400 budget (40-50 expected enrollments)
- Focus: Website visitors with pre-qualification form engagement

---

## 📋 Quick Start

### 1. Initial Setup (One-time)

```bash
# Step 1: Set up Meta App credentials
# Add these to your .env file:
META_APP_ID=your_app_id_here
META_APP_SECRET=your_app_secret_here

# Step 2: Generate access token via OAuth
npm run meta:setup

# Step 3: Set up Meta pixel for conversion tracking
npm run meta:pixel-setup
```

### 2. Daily Monitoring

```bash
# View real-time campaign performance
npm run meta:monitor

# Analyze campaign metrics
npm run meta:analyze

# Quick status check (updates every 60 seconds)
npm run meta:status
```

---

## 🔐 Authentication & Credentials

### Getting Meta App Credentials

1. **Go to Meta Developers**: https://developers.facebook.com
2. **Create App** (or select existing):
   - App Name: "ADMI Ads Manager"
   - App Purpose: "Ad Management"
   - App Type: "Business"
3. **Add Product**:
   - Navigate to "Products"
   - Add "Ads Manager"
4. **Get Credentials**:
   - Settings → Basic
   - Copy **App ID** and **App Secret**
5. **Create OAuth App**:
   - Settings → Basic
   - App Roles section → Add yourself as Admin
   - Save App ID and Secret to .env

### .env Configuration

```env
# Required for OAuth setup
META_APP_ID=your_app_id
META_APP_SECRET=your_app_secret

# Generated after OAuth setup
META_ACCESS_TOKEN=your_long_lived_access_token

# Optional but recommended
META_BUSINESS_ACCOUNT_ID=your_business_account_id
META_PIXEL_ID=your_pixel_id
```

### Getting Your Business Account ID

1. Go to https://business.facebook.com
2. Navigate to "Settings" (bottom left)
3. Find "Business ID" (12-digit number)
4. Add to .env: `META_BUSINESS_ACCOUNT_ID=your_id`

---

## 🚀 Features & Commands

### Command Reference

| Command                    | Purpose                                 | Output                             |
| -------------------------- | --------------------------------------- | ---------------------------------- |
| `npm run meta:setup`       | OAuth authentication & token generation | Access token in .env               |
| `npm run meta:test`        | Verify API connection                   | Connection status                  |
| `npm run meta:analyze`     | Detailed campaign performance analysis  | JSON report in `reports/meta-ads/` |
| `npm run meta:monitor`     | Real-time monitoring dashboard          | Live metrics (5-min refresh)       |
| `npm run meta:status`      | Quick status check                      | Dashboard (60-sec refresh)         |
| `npm run meta:pixel-setup` | Configure conversion tracking pixel     | Pixel ID in .env                   |

---

## 📊 Monitoring Dashboard

The `npm run meta:monitor` command displays:

```
═══════════════════════════════════════════════════════════
📊 ADMI META ADS REAL-TIME MONITORING DASHBOARD
═══════════════════════════════════════════════════════════

⏱️  Last updated: 11/30/2025, 2:45 PM
🚀 Monitoring since: 11/30/2025, 1:00 PM

💰 CAMPAIGN PERFORMANCE:

  📢 Website Retargeting - Course Interest
     Audience: Age: 18-45 • Interests: 3
     💵 Spend: $123.45 | Impressions: 45,234 | Clicks: 1,256
     📊 CPC: $0.10 | CPM: $2.73 | CPA: $12.34
     ✅ Conversions: 10 | Status: ACTIVE

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  💹 TOTAL: $123.45 spent | 45,234 impressions | 1,256 clicks

📋 PRE-QUALIFICATION FORM METRICS:
  👁️  Page Views: 2,345
  ✍️  Form Starts: 892 (38.0% of views)
  ✅ Form Completions: 445 (49.9% completion)
  🎓 Enrollments: 12 (2.7% of completions)

  💰 ENROLLMENT ECONOMICS:
     Cost per Enrollment: $10.29
     Target Cost: $10.67
     Efficiency: 103.7% of target
     ✅ ON TRACK TO MEET GOALS

💵 BUDGET TRACKING:
  Daily Budget: $13.33
  Day of Month: 30/30
  Expected Spend: $400.00
  Actual Spend: $395.67
  Burn Rate: 98.9%
  💡 Under budget - consider increasing bid or expanding audience
```

---

## 📈 Campaign Performance Metrics

### Key Metrics Tracked

| Metric          | Definition                     | Target       |
| --------------- | ------------------------------ | ------------ |
| **Impressions** | Times ad was shown             | High (reach) |
| **Clicks**      | Times ad was clicked           | Optimize CTR |
| **Spend**       | Total ad cost                  | $400 budget  |
| **CPC**         | Cost per click                 | <$2.00       |
| **CPM**         | Cost per 1000 impressions      | <$5.00       |
| **CPA**         | Cost per acquisition (lead)    | <$15.00      |
| **Conversions** | Pre-qualified leads (score ≥4) | 40-50        |

### Pre-Qualification Form Metrics

| Metric              | Definition                  | Target             |
| ------------------- | --------------------------- | ------------------ |
| **Page Views**      | Visits to /enquiry          | Track reach        |
| **Form Starts**     | Pre-qualification initiated | >30%               |
| **Completions**     | Form submitted              | >45%               |
| **Qualified Leads** | Score ≥4 (hot leads)        | 70% of completions |
| **Enrollments**     | Students who enrolled       | 40-50 total        |

---

## 🎯 Campaign Setup Guide

### Step 1: Create Audiences

Meta retargeting targets specific visitor segments:

1. **Website Visitors (14 days)**

   - All visitors to https://admi.africa
   - Excellent re-engagement potential

2. **Pre-Qualification Form Viewers**

   - Visited /enquiry page
   - High intent audience

3. **Course Page Visitors**
   - Viewed specific course pages
   - Segment by course interest

### Step 2: Create Ad Sets

```
Campaign: ADMI Q4 Lead Generation
Daily Budget: $13.33

Ad Set 1: Website Retargeting - All Visitors
  Audience: Website visitors (14 days)
  Budget: $5/day
  Bid: Lowest cost (auto)

Ad Set 2: Pre-Qualification Viewers
  Audience: /enquiry page visitors
  Budget: $5/day
  Bid: Lowest cost (auto)

Ad Set 3: Course Interest (Lookalike)
  Audience: Lookalike of qualified leads
  Budget: $3.33/day
  Bid: Lowest cost (auto)
```

### Step 3: Create Ads

Focus on:

- **Lead magnets**: "Free trial week", "Speak to counselor"
- **Social proof**: Student testimonials (video, carousel)
- **Urgency**: Limited-time offers, application deadline
- **Reassurance**: Financing options, career outcomes

---

## 🔄 Integration with Pre-Qualification Form

### Event Tracking

The Meta pixel tracks the full pre-qualification journey:

```
PageView → InitiateCheckout → AddPaymentInfo → Lead/Purchase
   ↓            ↓                   ↓              ↓
  Visit     Form Start      Pre-qual Score    Enrollment
  /enquiry  Button Click    Questions answered Student confirmed
```

### Real-Time Score Transmission

When user completes pre-qualification:

1. **Low Score (0-3)**: Track as `AddPaymentInfo` event
2. **High Score (4-10)**: Track as `Lead` event
3. **Enrollment**: Track as `Purchase` event

This allows Meta to:

- Optimize bidding for high-quality leads
- Build lookalike audiences from qualified leads
- Calculate accurate CPA and ROI

---

## 📊 Data Export & Analysis

### Automatic Report Generation

Reports are automatically saved to `reports/meta-ads/`:

```
reports/meta-ads/
├── analysis.json              # Latest analysis
├── metrics-1730345678.json    # Historical metrics
├── metrics-1730349278.json
└── metrics-1730352878.json
```

### Manual Analysis

```bash
# Run detailed analysis
npm run meta:analyze

# View JSON report
cat reports/meta-ads/analysis.json | jq '.summary'
```

---

## 🚨 Troubleshooting

### Issue: "Missing META_ACCESS_TOKEN"

**Solution**: Run OAuth setup

```bash
npm run meta:setup
```

### Issue: "Token Expired or Invalid"

**Solution**: Refresh token

```bash
# Remove old token
sed -i '' '/META_ACCESS_TOKEN=/d' .env

# Generate new token
npm run meta:setup
```

### Issue: "No Campaigns Found"

**Possible causes**:

1. No ad accounts linked to user
2. Ad accounts are disabled
3. No active campaigns

**Solution**:

- Visit https://ads.facebook.com
- Verify ad accounts are accessible
- Create test campaign if needed

### Issue: "Pixel Not Tracking Events"

**Solution**:

1. Verify pixel code is in your HTML
2. Check Events Manager (Meta Ads Manager)
3. Verify event parameter matches (`fbq('track', 'Lead')`)
4. Clear browser cache and retry

---

## 📱 Performance Optimization Tips

### Audience Optimization

1. **Start Broad**: Website visitors (all traffic)
2. **Segment by Engagement**: Course page visitors
3. **Scale Winners**: Expand budget on best-performing audiences
4. **Lookalike Audiences**: Create lookalikes from qualified leads

### Budget Allocation

- **High Performers** (ROI > 2x): +20-30% budget
- **Average** (ROI 1-2x): Maintain
- **Low Performers** (ROI < 1x): -50% or pause

### Creative Optimization

- Test 3-5 different ads per audience
- Focus on video (2x engagement)
- Lead with benefits, not features
- Strong CTA ("Get Free Assessment")

### Bid Strategy

- **Conversion Rate Campaigns**: Lowest Cost (with CPA cap)
- **Lead Campaigns**: Lowest Cost (value optimization)
- **Awareness**: CPM (cost per 1000 impressions)

---

## 🔒 Security & Compliance

### Access Token Security

- ✅ Store in `.env` (never in code)
- ✅ Regenerate if exposed
- ✅ Limit access to authorized team members
- ✅ Rotate tokens periodically

### Data Privacy

- ✅ Comply with Meta advertising policies
- ✅ Only collect consented data
- ✅ Respect user privacy choices
- ✅ Don't retarget for predatory offers

### Financial Compliance

- ✅ Use educational institution discounts
- ✅ Track spend against budget
- ✅ Document ROI calculations
- ✅ Maintain spending records

---

## 📞 Support & Resources

### Meta Documentation

- [Meta Ads Manager API](https://developers.facebook.com/docs/marketing-api)
- [Conversion API Reference](https://developers.facebook.com/docs/marketing-api/conversions-api/)
- [Pixel Setup Guide](https://developers.facebook.com/docs/facebook-pixel)

### ADMI Resources

- Google Ads setup: `docs/GOOGLE-ADS-API-Design-Documentation.md`
- Pre-qualification strategy: `ADMI-Pre-Qualification-Form-Strategy.html`
- Budget allocation: $1,600 total ($800 Google, $400 Meta, $200 SEO, $200 testing)

### Team Contacts

- Technical Support: admissions@admi.africa
- Marketing: marketing@admi.africa
- Analytics: analytics@admi.africa

---

## 🎯 Success Metrics

### Monthly Targets

| Metric                    | Target       | Current |
| ------------------------- | ------------ | ------- |
| Pre-qualified leads       | 5,000-8,000  | —       |
| Form completion rate      | >50%         | —       |
| Qualified leads (score≥4) | 70% of forms | —       |
| Cost per lead             | <$15         | —       |
| Cost per enrollment       | $10.67       | —       |
| Total enrollments         | 40-50        | —       |
| ROI                       | 3-4x         | —       |

### Traffic Recovery Goals

- **Current**: 78 daily sessions (paid)
- **Target**: 300-400 daily sessions (paid) by end of Q4
- **Metric**: 300% increase in qualified traffic

---

**Last Updated**: November 30, 2025  
**Version**: 1.0  
**Status**: Production Ready
