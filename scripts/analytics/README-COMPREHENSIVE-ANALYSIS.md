# Comprehensive Campaign Analysis

## Overview

This analysis script provides a unified view of:
- **Google Ads** performance (Search + Performance Max campaigns)
- **Meta Ads** performance (Facebook + Instagram)
- **Google Analytics** traffic and conversion data
- **Brevo CRM** lead quality and journey tracking

## Quick Start

```bash
# Run comprehensive analysis since Nov 29, 2025
npm run ads:comprehensive
```

## Output Files

The script generates two reports in the `/reports/` directory:

1. **JSON Report**: `comprehensive-campaign-analysis-YYYY-MM-DD.json`
   - Complete raw data
   - All lead details
   - Campaign metrics
   - Analytics data

2. **Markdown Report**: `comprehensive-campaign-analysis-YYYY-MM-DD.md`
   - Executive summary
   - Campaign breakdowns
   - Lead quality analysis
   - Actionable recommendations

## Analysis Period

- **Default Start Date**: November 29, 2025
- **End Date**: Current date
- **Configurable**: Edit `START_DATE` constant in script

## Data Sources

### 1. Brevo CRM
- **API**: Brevo Contacts API
- **Data**: All contacts with UTM tracking
- **Fields Used**:
  - `QUALIFICATION_SCORE` or `SCORE` (lead score 0-20)
  - `QUALIFICATION_STATUS` (Hot/Warm/Cold/Unqualified)
  - `PREFERRED_COURSE` or `COURSE_INTERESTED_IN`
  - `CONVERSATION_SUMMARY` (parsed form data)
  - `UTM_SOURCE`, `UTM_MEDIUM`, `UTM_CAMPAIGN`
  - `FIRSTNAME`, `LASTNAME`, `SMS`, `PHONE`

### 2. Google Analytics
- **API**: Google Analytics Data API (GA4)
- **Service Account**: `ga-service-account.json`
- **Metrics**:
  - Sessions, Users, Conversions
  - Engagement Rate, Bounce Rate
  - Campaign attribution
  - Event tracking

**Note**: Requires proper service account permissions. See [Troubleshooting](#troubleshooting).

### 3. Campaign Attribution Logic

#### Google Ads Leads
- `UTM_SOURCE = "google"` AND `UTM_MEDIUM = "cpc" OR "paid" OR "adwords"`

**Campaign Types:**
- **Performance Max**: Campaign name contains `pmax`, `p-max`, `performance`, or ID `23282289054`
- **Search**: Campaign name contains `search` (excluding Performance Max)
- **Other**: All other Google Ads campaigns

#### Meta Ads Leads
- `UTM_SOURCE = "facebook"` OR `"meta"` OR `"instagram"`

**Platform Split:**
- **Facebook**: `UTM_SOURCE = "facebook"`
- **Instagram**: `UTM_SOURCE = "instagram"`

## Lead Scoring

Brevo CRM automatically calculates lead scores (0-20) based on:

### Scoring Breakdown
- **Timeline Readiness**: 0-5 points
  - Immediate/January 2026: 5 points
  - April/Next intake: 4 points
  - 2026 (general): 3 points
  - Just exploring: 1 point

- **Course Interest**: 0-4 points
  - Specific course: 4 points
  - General interest: 2 points
  - Not sure: 0 points

- **Financial Readiness**: 0-4 points
  - Full payment ready: 4 points
  - Payment plan: 3 points
  - Need help: 2 points

- **Engagement Level**: 0-4 points
  - Detailed questions (>100 chars): 4 points
  - Some questions (>50 chars): 3 points
  - Basic questions: 2 points

- **Contact Info**: 0-3 points
  - Phone provided: 3 points

### Qualification Status
- **Hot Lead**: Score 15-20
- **Warm Lead**: Score 10-14
- **Cold Lead**: Score 5-9
- **Unqualified**: Score 0-4

## Key Metrics Analyzed

### Volume Metrics
- Total contacts in period
- Leads by traffic source (Google/Meta/Organic/Other)
- Leads by campaign type (PMax/Search/Facebook/Instagram)
- Paid lead percentage

### Quality Metrics
- Average lead score by platform
- Hot lead percentage by platform
- Warm/Cold/Unqualified distribution
- Lead score by campaign type

### Comparative Analysis
- Google Ads vs Meta Ads quality comparison
- Performance Max vs Search campaign effectiveness
- Facebook vs Instagram performance
- Winner determination

### Course Interest Analysis
- Top requested courses
- Course interest by campaign type
- Program type preferences (Diploma/Certificate)

## Requirements

### Environment Variables
```env
# Required
BREVO_API_KEY=your_brevo_api_key

# Optional (for Google Analytics)
GA_PROPERTY_ID=your_ga4_property_id  # Defaults to 448618054
```

### Service Account Setup
1. Ensure `ga-service-account.json` exists in project root
2. Grant service account access to GA4 property:
   - Email: `ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com`
   - Role: Viewer or Analyst
   - Property: Your GA4 property ID

### Dependencies
```json
{
  "@google-analytics/data": "^5.2.0",
  "https": "builtin",
  "fs": "builtin",
  "path": "builtin"
}
```

## Troubleshooting

### Google Analytics Permission Error
```
Error: 7 PERMISSION_DENIED: User does not have sufficient permissions
```

**Solution:**
1. Go to Google Analytics Admin → Property → Property Access Management
2. Add service account email: `ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com`
3. Assign "Viewer" role minimum
4. Wait 5 minutes for permissions to propagate
5. Re-run analysis

**Temporary Workaround:**
The script continues with Brevo CRM data even if GA fails. Full analysis still provides:
- Lead volume and quality metrics
- Campaign attribution
- Lead scoring and qualification
- Conversation summaries

### Low Meta Ads Attribution
If Meta Ads shows low lead counts:
1. Check UTM parameters on Meta campaigns
2. Verify `utm_source` is set to `facebook` or `instagram`
3. Ensure `utm_medium` is set correctly
4. Review Brevo contact data for proper UTM capture

### Missing Lead Scores
If leads show score of 0:
1. Verify Brevo form captures all qualification fields
2. Check `QUALIFICATION_SCORE` field in Brevo
3. Review lead scoring automation in Brevo
4. Manually score if needed

## Customization

### Change Analysis Period
Edit `START_DATE` in script:
```javascript
const START_DATE = '2025-11-29'  // Change to desired start date
```

### Modify Lead Scoring
Update `getQualificationStatus()` function:
```javascript
function getQualificationStatus(score) {
  if (score >= 15) return 'Hot Lead'
  if (score >= 10) return 'Warm Lead'
  if (score >= 5) return 'Cold Lead'
  return 'Unqualified'
}
```

### Add Custom Metrics
Extend `calculateCampaignMetrics()` function with additional analysis.

## Related Scripts

- **`brevo-google-ads-journey-analysis.js`**: Google Ads specific analysis
- **`meta-ads-analysis.js`**: Meta Ads specific analysis (if exists)
- **`weekly-organic-monitor.js`**: Organic traffic analysis

## Support

For issues or questions:
1. Check the generated markdown report for recommendations
2. Review the JSON report for detailed data
3. Check Brevo CRM for UTM tracking accuracy
4. Verify Google Analytics permissions

## Changelog

### 2025-12-22
- Initial release
- Integrated Brevo CRM, Google Ads, Meta Ads, and Google Analytics
- Added lead quality scoring and qualification
- Campaign-specific analysis (PMax vs Search)
- Markdown report generation
- Recommendations engine
