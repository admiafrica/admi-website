# Meta Ads API - Implementation Checklist

**Project**: ADMI 150-Student Acquisition Campaign ($1,600 budget)  
**Deadline**: End of Q4 2025  
**Status**: Setup Phase

---

## ✅ Pre-Flight Checklist

### Credentials Configuration

- [ ] **Meta App ID**: Obtained from Meta Developers
- [ ] **Meta App Secret**: Obtained from Meta Developers
- [ ] **Business Account ID**: Found in business.facebook.com settings
- [ ] **Meta Pixel ID**: Created via `npm run meta:pixel-setup`
- [ ] **Access Token**: Generated via OAuth flow

Add to `.env`:

```env
META_APP_ID=your_app_id_here
META_APP_SECRET=your_app_secret_here
META_BUSINESS_ACCOUNT_ID=your_business_id_here
META_ACCESS_TOKEN=your_access_token_here (auto-generated)
META_PIXEL_ID=your_pixel_id_here (auto-generated)
```

### Setup Steps

- [ ] Meta App created at https://developers.facebook.com
- [ ] "Ads Manager" product added to app
- [ ] OAuth credentials added to .env
- [ ] `npm run meta:setup` completed successfully
- [ ] Access token saved to .env
- [ ] `npm run meta:test` passes
- [ ] `npm run meta:pixel-setup` completed
- [ ] Pixel ID saved to .env
- [ ] Meta Events Manager showing test events

### Ad Account Setup

- [ ] Business Account created at https://business.facebook.com
- [ ] Ad account linked to Business Account
- [ ] Billing method added and verified
- [ ] Campaign budget set: $400 for month
- [ ] Two ad accounts created (organic + paid testing)

### Audience Configuration

- [ ] **Website Retargeting**: All visitors (14-day window)
- [ ] **Form Viewers**: /enquiry page visitors
- [ ] **Course Interest**: Segment by course category
- [ ] **Lookalike Audience**: Created from qualified leads
- [ ] Audience sizing: 50K-500K people per segment

### Pixel Implementation

- [ ] Meta pixel code added to app layout
- [ ] Events tracked in /enquiry form:
  - [ ] `ViewContent` on page load
  - [ ] `InitiateCheckout` on form start
  - [ ] `AddPaymentInfo` for low-score (0-3)
  - [ ] `Lead` for high-score (4-10)
  - [ ] `Purchase` on enrollment
- [ ] Events Manager showing conversions
- [ ] Test pixel events in Events Manager

### Campaign Creation

- [ ] Campaign "ADMI Q4 Lead Generation" created
- [ ] Daily budget: $13.33 (400/30)
- [ ] 3 ad sets created:
  - [ ] Website Retargeting (all visitors)
  - [ ] Pre-qualification Viewers
  - [ ] Lookalike Audience
- [ ] 3-5 creative variations per ad set
- [ ] Ad copy emphasizes pre-qualification benefits
- [ ] Landing page: https://admi.africa/enquiry
- [ ] Bid strategy: Lowest Cost (conversion value)

---

## 🚀 Deployment

### Pre-Launch Testing

- [ ] `npm run meta:analyze` runs without errors
- [ ] `npm run meta:monitor` displays metrics
- [ ] 48 hours of test traffic collected
- [ ] Events Manager shows pixel firing correctly
- [ ] No crashes or errors in monitoring

### Launch

- [ ] All 3 ad sets go ACTIVE
- [ ] Initial budget: $50 (test)
- [ ] Monitor for 24 hours
- [ ] Verify form completions increase
- [ ] Scale budget by 25% per day if metrics healthy

### Monitoring Setup

- [ ] Monitoring script running: `npm run meta:monitor`
- [ ] Daily performance reports generated
- [ ] Dashboard accessible to marketing team
- [ ] Alerts configured for low CTR (<1%)
- [ ] Alerts configured for high CPA (>$20)

---

## 📊 Performance Tracking

### Week 1 Goals

| Metric               | Target | Current |
| -------------------- | ------ | ------- |
| Daily impressions    | 5,000+ | —       |
| Daily clicks         | 200+   | —       |
| Daily form starts    | 50+    | —       |
| Form completion rate | >40%   | —       |
| Cost per form start  | <$2.00 | —       |
| Cost per completion  | <$5.00 | —       |

### Month 1 Goals

| Metric                    | Target | Current |
| ------------------------- | ------ | ------- |
| Total spend               | $400   | —       |
| Total impressions         | 150K+  | —       |
| Total clicks              | 6K+    | —       |
| Total form completions    | 1,200+ | —       |
| Qualified leads (score≥4) | 840+   | —       |
| Estimated enrollments     | 40-50  | —       |
| Cost per enrollment       | $10.67 | —       |

---

## 🔧 Optimization Tasks

### Daily

- [ ] Check `npm run meta:status` (60-sec refresh)
- [ ] Monitor form completion rate
- [ ] Pause bottom 20% performers (by CPA)
- [ ] Check for creative fatigue (high frequency)

### Weekly

- [ ] Run `npm run meta:analyze` for detailed report
- [ ] Review audience performance
- [ ] Test new creative (3 new variations)
- [ ] Calculate actual CAC vs target ($10.67)
- [ ] Analyze qualified leads vs unqualified

### Bi-Weekly

- [ ] Expand budget on top 3 performing ad sets (+20%)
- [ ] Pause lowest performers (>$30 CPA)
- [ ] Create new lookalike audiences
- [ ] Test messaging variations
- [ ] Segment by course interest

### Monthly

- [ ] Full campaign performance review
- [ ] ROI calculation (enrollments × avg course value)
- [ ] Pre-qualification form analysis
- [ ] Lead quality scoring report
- [ ] Budget allocation for next month

---

## 🎯 Optimization Priority

### High Priority (Week 1-2)

1. **Pixel validation**: Ensure all events fire correctly
2. **Audience sizing**: Verify audiences are large enough
3. **Creative testing**: Test 3+ variations per audience
4. **Bid optimization**: Start with Lowest Cost strategy
5. **Daily monitoring**: 24/7 dashboard access

### Medium Priority (Week 3-4)

1. **Lookalike audiences**: Create from qualified leads
2. **Segmentation**: Separate by course and qualification level
3. **Landing page optimization**: Improve form completion rate
4. **Creative scaling**: Expand winning ads
5. **Budget reallocation**: Shift from low to high performers

### Low Priority (Month 2+)

1. **Advanced targeting**: Leverage pixel data for better targeting
2. **Conversion API**: Implement server-side tracking
3. **A/B testing**: Test landing page variants
4. **Attribution**: Connect to CRM for full journey tracking
5. **Predictive audiences**: Use ML for audience selection

---

## 📋 Documentation Requirements

- [ ] Setup guide completed: `docs/META_ADS_API_INTEGRATION.md`
- [ ] API credentials documented (secure location)
- [ ] Campaign structure documented
- [ ] Pixel implementation guide created
- [ ] Troubleshooting guide completed
- [ ] Team training completed
- [ ] Monitoring procedures documented

---

## 🔒 Security Checklist

- [ ] `.env` file not committed to git
- [ ] Access token not logged anywhere
- [ ] API credentials rotated every 90 days
- [ ] Only team leads have access to Meta Ads
- [ ] Read-only access for monitoring
- [ ] Audit log of all API calls
- [ ] HIPAA/privacy compliance verified

---

## 🎓 Team Training

- [ ] Technical team trained on monitoring scripts
- [ ] Marketing team trained on campaign management
- [ ] Analytics team trained on reporting
- [ ] Support team trained on troubleshooting
- [ ] Monthly syncs scheduled

---

## 🚨 Rollback Plan

If campaign performance is poor:

**Pause Threshold**: CPA > $30 for 3 days

1. Pause all low-performing ad sets
2. Review pre-qualification form scoring
3. Test new creative
4. Reduce audience size (more targeted)
5. Increase bid (if budget allows)
6. Alternative: Shift to Google Ads (proven channel)

---

## 📞 Escalation Matrix

| Issue                  | Owner             | Escalate To  | Timeline   |
| ---------------------- | ----------------- | ------------ | ---------- |
| Pixel not firing       | Technical Lead    | VP Marketing | 1 hour     |
| CPA > $30              | Marketing Manager | Director     | 6 hours    |
| Budget depleted        | Finance           | CFO          | 24 hours   |
| Form abandonment > 60% | Product Manager   | VP Product   | 24 hours   |
| API connection down    | Engineering       | CTO          | 15 minutes |

---

## ✅ Sign-Off

- [ ] Technical setup complete
- [ ] Campaign ready to launch
- [ ] Team trained
- [ ] Monitoring active
- [ ] Budget approved

**Launch Date**: **\*\***\_\_\_**\*\***  
**Launched By**: **\*\***\_\_\_**\*\***  
**Monitoring Owner**: **\*\***\_\_\_**\*\***

---

**Next Review**: 7 days after launch  
**Budget Checkpoint**: Every $100 spent or weekly (whichever first)
