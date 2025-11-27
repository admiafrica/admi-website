# ✅ Google Ads API - Implementation Checklist

**Project:** ADMI Traffic Recovery  
**Date:** November 24, 2025  
**Status:** API Access Granted - Ready to Execute

---

## 📋 Pre-Flight Checklist

### Environment Setup
- [ ] Node.js dependencies installed (`npm install`)
- [ ] Google Ads API package installed (`google-ads-api` in package.json ✅)
- [ ] OAuth helper packages installed (`google-auth-library`, `open`, `server-destroy`)
- [ ] Reports directory created (`reports/google-ads/` ✅)

### Google Cloud Console Setup
- [ ] Project created/selected in Google Cloud Console
- [ ] Google Ads API enabled for project
- [ ] OAuth 2.0 Client ID created (Web application type)
- [ ] Redirect URI configured: `http://localhost:3000/oauth2callback`
- [ ] Client ID and Client Secret obtained

### Google Ads Account Setup
- [ ] Access to Google Ads account (ID: 392-935-5931)
- [ ] Developer Token obtained from API Center
- [ ] Developer Token approved (Basic access)
- [ ] Verified account status is ENABLED

### Credentials Configuration
- [ ] `GOOGLE_ADS_CLIENT_ID` in .env
- [ ] `GOOGLE_ADS_CLIENT_SECRET` in .env
- [ ] `GOOGLE_ADS_DEVELOPER_TOKEN` in .env
- [ ] `GOOGLE_ADS_REFRESH_TOKEN` generated and in .env
- [ ] `GOOGLE_ADS_CUSTOMER_ID=3929355931` in .env

### Testing
- [ ] OAuth flow tested: `npm run ads:oauth`
- [ ] API connection verified: `npm run ads:test`
- [ ] Test query successful (customer info retrieved)

---

## 🎯 Execution Checklist

### Phase 1: Initial Analysis (Day 1)

**Step 1: Run Full Analysis**
- [ ] Execute: `npm run ads:analyze`
- [ ] Wait for completion (2-5 minutes)
- [ ] Verify JSON files created in `reports/google-ads/`

**Step 2: Review Campaign Status**
- [ ] Open: `reports/google-ads/campaign-status-[date].json`
- [ ] Count enabled campaigns: _______
- [ ] Count paused campaigns: _______
- [ ] Count removed campaigns: _______
- [ ] Identify "Campaign 1" status: _______

**Step 3: Analyze Historical Performance**
- [ ] Open: `reports/google-ads/historical-performance-[date].json`
- [ ] Compare 2024 vs 2025 metrics
- [ ] Identify top 5 performing campaigns by sessions
- [ ] Note campaigns with best cost-per-session

**Step 4: Review Recovery Recommendations**
- [ ] Open: `reports/google-ads/recovery-recommendations-[date].json`
- [ ] Review Priority 1 campaigns
- [ ] Note suggested budgets
- [ ] Understand projected timeline

---

### Phase 2: Campaign Reactivation (Week 1)

**Top Priority Campaigns to Reactivate:**

1. [ ] **Campaign 1** (Target: 129K sessions in 2024)
   - Historical budget: $_______/day
   - Start with: $_______ (50% of historical)
   - Expected sessions/day: _______

2. [ ] **Creative Media and Tech** (Target: 10K sessions)
   - Historical budget: $_______/day
   - Start with: $_______ (50% of historical)
   - Expected sessions/day: _______

3. [ ] **Digital Content Creation** (Target: 6.6K sessions)
   - Historical budget: $_______/day
   - Start with: $_______ (50% of historical)
   - Expected sessions/day: _______

**Daily Monitoring (Days 1-7):**
- [ ] Day 1: Check session count at end of day
- [ ] Day 2: Compare to Day 1, adjust if needed
- [ ] Day 3: Verify trends are positive
- [ ] Day 4: Check conversion rates
- [ ] Day 5: Mid-week performance review
- [ ] Day 6: Decide on budget increases
- [ ] Day 7: Week 1 summary report

---

### Phase 3: Performance Optimization (Week 2-4)

**Week 2:**
- [ ] Increase budgets on performing campaigns to 75% of historical
- [ ] Reactivate 2-3 additional tier-2 campaigns
- [ ] Target: 1,000+ daily sessions
- [ ] Monitor cost per acquisition (CPA)

**Week 3:**
- [ ] Scale top performers to 100% of historical budgets
- [ ] Optimize underperforming campaigns or pause
- [ ] Add tier-3 campaigns if budget allows
- [ ] Target: 1,200-1,500 daily sessions

**Week 4:**
- [ ] Full portfolio analysis
- [ ] Compare actuals vs projections
- [ ] Adjust strategy for Month 2
- [ ] Document lessons learned

---

### Phase 4: Sustained Growth (Month 2-3)

**Month 2:**
- [ ] Test new campaign variations
- [ ] Expand to additional course offerings
- [ ] Optimize for lead quality (not just volume)
- [ ] Target: 1,500+ daily sessions sustained

**Month 3:**
- [ ] Achieve baseline stability
- [ ] Refine lead qualification integration
- [ ] Scale successful patterns
- [ ] Document final ROI

---

## 📊 Success Metrics

### Week 1 Targets
- [ ] 500-800 daily sessions
- [ ] 3-5 paused campaigns reactivated
- [ ] Cost per session within 150% of 2024 benchmark
- [ ] At least 2 campaigns performing to expectations

### Month 1 Targets
- [ ] 1,000+ daily sessions sustained
- [ ] 60% of 2024 traffic levels recovered
- [ ] Lead quality maintained (track via pre-qualification)
- [ ] Positive ROI on reactivated campaigns

### Month 3 Targets
- [ ] 1,500+ daily sessions sustained
- [ ] 80% of 2024 traffic levels recovered
- [ ] Optimized campaign portfolio
- [ ] Clear understanding of which campaigns work in 2025

---

## 🚨 Red Flags to Watch For

### Technical Issues
- [ ] API rate limiting errors (scale back query frequency)
- [ ] Authentication failures (refresh token expired)
- [ ] Data inconsistencies (verify with Google Ads UI)

### Campaign Performance Issues
- [ ] Cost per session >200% of 2024 benchmark
- [ ] Click-through rates <50% of 2024 performance
- [ ] Zero conversions after 7 days
- [ ] Budget exhausting before end of day (adjust downward)

### Business Issues
- [ ] Lead quality declining (check pre-qualification)
- [ ] Conversion rate not improving despite traffic
- [ ] Budget constraints preventing scale
- [ ] Competitive landscape changes affecting performance

---

## 📞 Escalation Path

### If Technical Issues Arise:
1. Check Google Ads API status: https://ads-developers.googleblog.com/
2. Review error messages in console output
3. Consult `scripts/analytics/google-ads-setup-guide.md`
4. Google Ads API forum: https://groups.google.com/g/adwords-api

### If Campaign Performance Issues:
1. Compare with Google Ads UI data (verify API accuracy)
2. Review campaign settings in Ads UI
3. Check for policy violations or account issues
4. Consider market changes since 2024

---

## 🎯 Quick Commands Reference

```bash
# Setup (one-time)
npm run ads:oauth

# Daily/Regular Use
npm run ads:test          # Quick health check
npm run ads:status        # Campaign status snapshot
npm run ads:performance   # Historical data update
npm run ads:analyze       # Full analysis (weekly)

# Files to Review
reports/google-ads/campaign-status-*.json
reports/google-ads/historical-performance-*.json
reports/google-ads/recovery-recommendations-*.json
```

---

## 📝 Notes & Observations

### Discovery Phase Notes:
```
[Use this space to document findings from initial analysis]

Top performing campaigns:
1. 
2. 
3. 

Surprising findings:


Questions to investigate:


```

### Week 1 Performance Notes:
```
[Document actual vs expected performance]

What worked well:


What needs adjustment:


Decisions for Week 2:


```

---

**Last Updated:** November 24, 2025  
**Next Review:** After initial analysis completion  
**Status:** Ready to execute - all systems go! 🚀
