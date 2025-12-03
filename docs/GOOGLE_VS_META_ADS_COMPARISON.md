# Google Ads vs Meta Ads API - ADMI Implementation Comparison

**Project**: 150-Student Acquisition Campaign ($1,600 budget)  
**Comparison Date**: November 30, 2025

---

## 🎯 Budget Allocation

| Channel                    | Budget     | Expected Students | ROI Target |
| -------------------------- | ---------- | ----------------- | ---------- |
| **Google Ads (Search)**    | $800       | 75-90             | 3-4x       |
| **Meta Ads (Retargeting)** | $400       | 40-50             | 2-3x       |
| **SEO Optimization**       | $200       | 20-30             | Long-term  |
| **Testing/Contingency**    | $200       | —                 | Variable   |
| **TOTAL**                  | **$1,600** | **150+**          | **3-4x**   |

---

## 📊 Platform Comparison

### Authentication & Setup

| Aspect                | Google Ads                                    | Meta Ads                           |
| --------------------- | --------------------------------------------- | ---------------------------------- |
| **Setup Type**        | OAuth 2.0 + Developer Token                   | OAuth 2.0                          |
| **Setup Time**        | 2-3 days (token approval)                     | 30 minutes                         |
| **Credentials**       | Client ID, Secret, Token, Developer Token     | Client ID, Secret, Access Token    |
| **Approval Required** | Yes (Google reviews)                          | No (instant)                       |
| **Documentation**     | `ADMI-Google-Ads-API-Design-Documentation.md` | `docs/META_ADS_API_INTEGRATION.md` |
| **Setup Script**      | `npm run ads:oauth`                           | `npm run meta:setup`               |

### APIs & Data Access

| Aspect              | Google Ads                       | Meta Ads                           |
| ------------------- | -------------------------------- | ---------------------------------- |
| **Primary Use**     | Campaign performance analysis    | Campaign performance + retargeting |
| **Query Language**  | GAQL (Google Ads Query Language) | GraphQL/REST (Meta Graph API)      |
| **Rate Limits**     | 15,000 requests/day              | 600 requests/minute                |
| **Data Freshness**  | Near real-time (5-15 min delay)  | Real-time                          |
| **Campaign Status** | ENABLED, PAUSED, REMOVED         | ACTIVE, PAUSED, DELETED            |
| **Historical Data** | 2024-2025 available              | Last 90 days default               |

### Campaign Structure

| Aspect                  | Google Ads                          | Meta Ads                                                |
| ----------------------- | ----------------------------------- | ------------------------------------------------------- |
| **Hierarchy**           | Account → Campaign → Ad Group → Ads | Business Account → Ad Account → Campaign → Ad Set → Ads |
| **Budget Level**        | Campaign-level                      | Campaign & Ad Set level                                 |
| **Targeting Type**      | Keywords, audiences, topics         | Audiences, interests, behaviors                         |
| **Bid Strategy**        | Manual, Enhanced CPC, Target CPA    | Lowest Cost, Target CPA, ROAS                           |
| **Conversion Tracking** | Google Conversion Tracking          | Meta Pixel + Conversion API                             |

### Performance Metrics

| Metric          | Google Ads        | Meta Ads       |
| --------------- | ----------------- | -------------- |
| **Impressions** | ✅ Yes            | ✅ Yes         |
| **Clicks**      | ✅ Yes            | ✅ Yes         |
| **Cost**        | ✅ Yes            | ✅ Yes         |
| **CPC**         | ✅ Yes            | ✅ Yes         |
| **CPM**         | ✅ Yes            | ✅ Yes         |
| **CTR**         | ✅ Yes            | ✅ Yes         |
| **Conversions** | ✅ Yes (GCLID)    | ✅ Yes (Pixel) |
| **CPA**         | ✅ Yes            | ✅ Yes         |
| **ROAS**        | ✅ Yes (with GA4) | ✅ Yes         |

---

## 🔧 Setup Workflow Comparison

### Google Ads Setup Process

```
1. Create Google Cloud Project (Google Cloud Console)
2. Enable Google Ads API
3. Create OAuth 2.0 credentials (Web application)
4. Set redirect URI to http://localhost:3000
5. Get Developer Token (requires approval)
6. Generate refresh token via: npm run ads:oauth
7. Test connection: npm run ads:test
8. Run analysis: npm run ads:analyze
9. Monitor: npm run ads:monitor
```

**Time to Production**: 2-3 days (wait for token approval)

### Meta Ads Setup Process

```
1. Create Meta App (Meta Developers)
2. Add "Ads Manager" product
3. Get App ID and Secret
4. Generate access token via: npm run meta:setup
5. Test connection: npm run meta:test
6. Create conversion pixel: npm run meta:pixel-setup
7. Add pixel to app (auto-generated code)
8. Run analysis: npm run meta:analyze
9. Monitor: npm run meta:monitor
```

**Time to Production**: 30 minutes to 1 hour

---

## 📈 Traffic Sources & Audience Profile

### Google Ads (Search Intent)

**Best for**: High-intent students actively searching

- ✅ Keywords: "music production diploma", "audio engineering course Africa"
- ✅ Audience: Actively searching for education
- ✅ Intent: High (solving immediate need)
- ✅ Budget efficiency: $3-5 CPC
- ✅ Conversion: 5-7% (pre-qualified searchers)

**Recommended Campaigns**:

1. Brand terms: "ADMI", "Africa Digital Media Institute"
2. Course names: "Music Production", "Film Editing", etc.
3. Competitor terms: Target competitor course names
4. Long-tail: "Best music production school Africa"

### Meta Ads (Retargeting)

**Best for**: Re-engaging website visitors with pre-qualification data

- ✅ Audiences: Website visitors (14-90 day window)
- ✅ Audience: Previously interested (warm leads)
- ✅ Intent: Medium (returning for reconsideration)
- ✅ Budget efficiency: $0.50-1.50 CPC
- ✅ Conversion: 3-5% (warm retargeting)

**Recommended Campaigns**:

1. Website retargeting (all visitors)
2. Pre-qualification form viewers
3. Course page visitors by course
4. Lookalike audiences (from qualified leads)

---

## 🎯 Audience Targeting Comparison

### Google Ads Targeting

```
Keyword-Based:
├── Broad: "music production"
├── Phrase: "music production diploma"
├── Exact: "music production diploma Africa"
└── Negative: -free -online (limit low-intent)

Audience-Based:
├── In-market audiences
├── Affinity audiences
├── Custom audiences (website visitors)
└── Lookalike audiences

Demographics:
├── Age
├── Gender
├── Parental status
└── Household income
```

### Meta Ads Targeting

```
Audience-Based (Primary):
├── Website visitors (pixel-based)
├── App users
├── Custom audiences (email list)
└── Lookalike audiences

Interest & Behavior:
├── Interests (music, education, technology)
├── Behaviors (education engaged, recent movers)
├── Demographics (age, location, language)
└── Life events (high school graduates)

Lookalike Audiences:
├── From qualified leads (score ≥4)
├── From course page viewers
├── From past enrollees
└── From email subscribers
```

---

## 📊 Monitoring & Optimization

### Google Ads Monitoring

**Command**: `npm run ads:analyze` + `npm run ads:monitor`

**Metrics Available**:

- Campaign status (Enabled/Paused)
- Impressions, clicks, cost
- Conversions and conversion rate
- CPC, CPM, CTR
- Historical performance (2024-2025)

**Reports Generated**:

- `reports/google-ads/analysis.json`
- Recovery recommendations
- Paused campaign identification
- Budget optimization suggestions

### Meta Ads Monitoring

**Command**: `npm run meta:analyze` + `npm run meta:monitor`

**Metrics Available**:

- Campaign performance (real-time)
- Ad set targeting breakdown
- Audience performance
- Pre-qualification form completion rates
- Conversion rates by audience

**Reports Generated**:

- `reports/meta-ads/analysis.json`
- Real-time dashboard (5-min refresh)
- Audience performance summary
- Budget burn rate tracking

---

## 💰 Cost Efficiency Comparison

### Cost Breakdown

**Google Ads ($800 budget)**

- Daily budget: $26.67
- Expected CPC: $3-5
- Expected daily clicks: 150-250
- Expected monthly conversions: 75-90 students
- Cost per student: $8.89-10.67

**Meta Ads ($400 budget)**

- Daily budget: $13.33
- Expected CPC: $0.50-1.50
- Expected daily clicks: 300-600
- Expected monthly conversions: 40-50 students
- Cost per student: $8-10

**Total Campaign**

- Budget: $1,600
- Expected students: 150+
- Cost per student: $10.67
- Expected ROI: 3-4x (assuming $100-150 lifetime value per student)

---

## 🔄 Integration & Sync

### Cross-Platform Optimization

1. **Lead Scoring Alignment**

   ```
   Pre-qualification form score (0-10)
   ↓
   Google Ads: Audience signals
   ↓
   Meta Ads: Lookalike source
   ↓
   CRM: Lead quality scoring
   ```

2. **Attribution Tracking**

   - Google Ads: First-click, last-click models
   - Meta Ads: 7-day view, 28-day click
   - Combined: Multi-touch attribution

3. **Audience Sharing**
   - Qualified leads (score ≥4) → Lookalike source for both platforms
   - High-value enrollees → Scale similar audiences
   - Low performers → Negative audiences

---

## 🚀 Launch Timeline

### Week 1: Setup

- ✅ **Google Ads**: Dev token approval pending, OAuth ready
- ✅ **Meta Ads**: OAuth setup complete, monitoring ready
- ✅ **Pixel**: Pre-qualification form tracking configured

### Week 2: Campaign Launch

- ✅ **Google Ads**: Reactivate top 5 paused campaigns
- ✅ **Meta Ads**: Launch retargeting (3 ad sets)
- ✅ **Monitoring**: Real-time dashboards active

### Week 3-4: Optimization

- ✅ Scale high performers (+20-30%)
- ✅ Pause low performers (<1% CTR, >$20 CPA)
- ✅ Test new creative and audiences
- ✅ Calculate actual ROI

### Month 2+: Scale

- ✅ Allocate based on performance
- ✅ Expand winning audiences (lookalikes)
- ✅ Create course-specific campaigns
- ✅ Full attribution analysis

---

## 📋 Implementation Checklist

### Google Ads

- [ ] Developer token approved
- [ ] OAuth credentials configured
- [ ] `npm run ads:oauth` completed
- [ ] `npm run ads:test` passed
- [ ] Top 5 campaigns identified for reactivation
- [ ] Budget: $26.67/day allocated
- [ ] Monitoring active

### Meta Ads

- [ ] OAuth setup completed via `npm run meta:setup`
- [ ] Business account connected
- [ ] Ad account created and verified
- [ ] Pixel created via `npm run meta:pixel-setup`
- [ ] Pixel code added to app
- [ ] 3 ad sets configured
- [ ] $400 budget allocated ($13.33/day)
- [ ] Monitoring active

### Coordination

- [ ] Pre-qualification form scoring finalized
- [ ] Lead quality definitions aligned
- [ ] Audience segments created (both platforms)
- [ ] CRM integration tested
- [ ] Team training completed
- [ ] Daily sync process established

---

## 🎓 Quick Reference

### Commands Comparison

```bash
# Google Ads
npm run ads:oauth              # Setup OAuth
npm run ads:test              # Test connection
npm run ads:analyze           # Full analysis
npm run ads:status            # Quick status

# Meta Ads
npm run meta:setup            # Setup OAuth
npm run meta:test             # Test connection
npm run meta:analyze          # Full analysis
npm run meta:monitor          # Real-time dashboard
npm run meta:pixel-setup      # Setup conversion pixel
npm run meta:status           # Quick status (60sec refresh)
```

### Documentation

| Document                                      | Platform | Purpose                                  |
| --------------------------------------------- | -------- | ---------------------------------------- |
| `ADMI-Google-Ads-API-Design-Documentation.md` | Google   | API design, architecture, implementation |
| `docs/META_ADS_API_INTEGRATION.md`            | Meta     | Setup, monitoring, optimization guide    |
| `GOOGLE-ADS-CHECKLIST.md`                     | Google   | Pre-launch checklist                     |
| `META-ADS-CHECKLIST.md`                       | Meta     | Pre-launch checklist                     |

---

## 📞 Support & Escalation

### Issues

| Issue                | Solution                  | Time   |
| -------------------- | ------------------------- | ------ |
| Google token expired | `npm run ads:oauth`       | 5 min  |
| Meta token expired   | `npm run meta:setup`      | 5 min  |
| Pixel not firing     | Check Events Manager      | 15 min |
| Low CTR (<0.5%)      | Pause creative, test new  | 1 hour |
| High CPA (>$20)      | Refine audience targeting | 1 hour |
| Budget overrun       | Reduce daily budget       | 30 min |

---

**Last Updated**: November 30, 2025  
**Status**: Ready for Production  
**Next Review**: December 7, 2025 (post-launch)
