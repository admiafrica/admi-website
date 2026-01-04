# Analytics Scripts

## Main Analysis Script

### Complete Customer Journey Analysis (Nov 29, 2025 - Jan 31, 2026)

**Script:** [`complete-journey-nov29-jan31.js`](./complete-journey-nov29-jan31.js)

**Purpose:** Tracks the complete customer journey from paid/organic traffic through to enrollment decision-making for the January 2026 intake.

**What it analyzes:**

1. **Google Ads** (Search + Performance Max) → Sessions → Leads → Pipeline stages
2. **Meta Ads** (Facebook + Instagram) → Sessions → Leads → Pipeline stages
3. **Organic/Direct Traffic** → Sessions → Leads → Pipeline stages

**Full Journey Tracked:**
```
Ad Click/Organic Visit
  ↓
Google Analytics Session
  ↓
Form Submission (GA4 Conversion)
  ↓
Lead Created in Brevo CRM
  ↓
Pipeline Stages:
  1. Unqualified
  2. MQL (Marketing Qualified Lead)
  3. SQL (Sales Qualified Lead)
  4. Applied
  5. Decision Making
  ↓
Enrollment (tracked manually after Jan 31)
```

**How to run:**

```bash
node scripts/analytics/complete-journey-nov29-jan31.js
```

**Output:**

1. **Console:** Detailed summary with all metrics
2. **JSON Report:** `reports/complete-journey-nov29-jan31-YYYY-MM-DD.json`
3. **Markdown Report:** `reports/complete-journey-nov29-jan31-YYYY-MM-DD.md`

**Report Sections:**

- ⏰ Campaign Status (shows days remaining + early data warnings)
- 📊 Google Analytics Conversion Funnel (Sessions → Leads by source)
- 📥 Lead Generation Summary (with lead quality scoring)
- 🎯 Pipeline Conversion Funnel (Unqualified → MQL → SQL → Applied → Decision Making)
- 💡 Key Insights (with context about campaign timing)

**Important Notes:**

- ✅ Uses **actual customized pipeline stages** from Brevo
- ✅ Shows **campaign in progress warnings** (no premature winners!)
- ✅ Tracks **Decision Making stage** as final pre-enrollment step
- ✅ Most conversions happen in **final 2 weeks** - current data is preliminary
- ✅ Reports update automatically until Jan 31, 2026 enrollment deadline

---

## Other Scripts

### Organic Traffic Monitoring

- `fetch-current-organic-traffic.js` - Current organic traffic snapshot
- `weekly-organic-monitor.js` - Weekly organic traffic trends
- `organic-traffic-report.js` - Detailed organic traffic report
- `weekly-traffic-report.js` - General weekly traffic overview

**Purpose:** Monitor organic search performance separately from paid campaigns.

---

## Environment Variables Required

```bash
BREVO_API_KEY=your_brevo_api_key
GA4_PROPERTY_ID=448618054  # Or your GA4 property ID
```

Make sure these are set in your `.env` file.

---

## Pipeline Configuration

The analysis uses the **January 2026 Pipeline** in Brevo CRM:

- **Pipeline ID:** `68e60a790c87b5f2cbfec788`
- **URL:** https://app.brevo.com/crm/deals/kanban?pipeline=68e60a790c87b5f2cbfec788

**Stage IDs (auto-detected):**
- `2ixzacgsn412m7y0ed20st5` - Unqualified
- `f17io0yg7xl1rdmb5cy1d44` - MQL
- `39539oz5gs2ktjvywn7pl6v` - SQL
- `27x209expgyhg8428lh7ocn` - Applied
- `pwi0xiqbtdwe6brfz7vgxen` - Decision Making

If you add new stages or pipelines, update the `STAGE_NAMES` constant in the script.
