# 🚀 Google Ads API - Quick Start Guide

**Date:** November 24, 2025  
**Status:** ✅ API Access Granted - Ready to Analyze!

---

## ⚡ 5-Minute Setup

### Step 1: Install Required Dependencies

```bash
npm install google-auth-library open server-destroy
```

### Step 2: Set Up OAuth Credentials

You need to add 4 credentials to your `.env` file. Here's how to get them:

#### 2.1 Get Client ID & Client Secret

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create new)
3. Enable **Google Ads API**: APIs & Services → Library → Search "Google Ads API" → Enable
4. Create credentials:
   - Go to: APIs & Services → Credentials
   - Click: Create Credentials → OAuth 2.0 Client ID
   - Type: **Web application**
   - Redirect URI: `http://localhost:3000/oauth2callback`
   - Download/copy **Client ID** and **Client Secret**

#### 2.2 Get Developer Token

1. Go to [Google Ads](https://ads.google.com/)
2. Navigate: Tools → Setup → API Center
3. Copy your **Developer Token**
   - If not visible, request Basic access (usually approved instantly)

#### 2.3 Generate Refresh Token

Run this command:

```bash
npm run ads:oauth
```

This will:
- Open your browser
- Ask for Google authentication
- Generate a **Refresh Token**
- Display it in the terminal

### Step 3: Add Credentials to .env

Add these lines to your `.env` file:

```bash
# Google Ads API Credentials
GOOGLE_ADS_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=your_client_secret
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token_from_step_2.3
GOOGLE_ADS_CUSTOMER_ID=3929355931
```

### Step 4: Test Connection

```bash
npm run ads:test
```

Expected output:
```
✅ Successfully connected to Google Ads account!
📊 Account: [Your Account Name]
💰 Currency: USD
```

---

## 🎯 Run Your First Analysis

### Full Analysis (Recommended)

```bash
npm run ads:analyze
```

This will:
1. ✅ Check all campaign statuses (enabled/paused/removed)
2. ✅ Get 2024-2025 historical performance
3. ✅ Generate recovery recommendations
4. ✅ Export data to `reports/google-ads/`

**Duration:** 2-5 minutes depending on account size

---

## 📊 What You'll Get

### 1. Campaign Status Report
**File:** `reports/google-ads/campaign-status-[date].json`

Shows:
- **Enabled campaigns:** Currently running
- **Paused campaigns:** Can reactivate immediately ⚡
- **Removed campaigns:** Reference for recreating

### 2. Historical Performance
**File:** `reports/google-ads/historical-performance-[date].json`

Shows 2024 vs 2025:
- Sessions by campaign
- Cost per session
- Conversion rates
- Best performers

### 3. Recovery Recommendations
**File:** `reports/google-ads/recovery-recommendations-[date].json`

Prioritized action plan:
- Which campaigns to reactivate first
- Suggested budgets
- Expected traffic recovery timeline

---

## 🎬 Expected Results

Based on your GA4 data, you should find:

### Target Campaigns
1. **"Campaign 1"** - 129,197 sessions in 2024 (TOP PRIORITY!)
2. **"Creative Media and Tech"** - 10,475 sessions
3. **"Digital Content Creation"** - 6,656 sessions
4. **"Data Analysis"** - 5,617 sessions

### Key Metrics
- **2024 paid traffic:** 267,577 sessions
- **2025 paid traffic:** 1,563 sessions (99.4% drop)
- **Recovery potential:** ~250,000 sessions

---

## 🔧 Quick Commands Reference

```bash
# OAuth setup (one-time)
npm run ads:oauth

# Test connection
npm run ads:test

# Get campaign status only
npm run ads:status

# Get historical performance only
npm run ads:performance

# Full analysis (recommended)
npm run ads:analyze
```

---

## 🚨 Troubleshooting

### Error: "DEVELOPER_TOKEN_NOT_APPROVED"
**Fix:** 
1. Go to Google Ads → Tools → API Center
2. Request Basic access
3. Usually approved within minutes

### Error: "PERMISSION_DENIED"
**Fix:**
1. Verify customer ID: `3929355931`
2. Check your Google account has access to this Ads account
3. Ensure account is active

### Error: "Invalid refresh_token"
**Fix:**
1. Re-run: `npm run ads:oauth`
2. Update `.env` with new token
3. Test: `npm run ads:test`

---

## 📋 Next Steps After Analysis

### Week 1: Quick Wins
1. **Review reports** in `reports/google-ads/`
2. **Identify top 3 performers** from 2024
3. **Reactivate paused campaigns** (start with 50% of historical budget)
4. **Monitor daily** for first 3-5 days
5. **Target:** 500-800 daily sessions

### Week 2-4: Scale Up
1. **Analyze performance** of reactivated campaigns
2. **Scale successful campaigns** to full budget
3. **Add tier 2 campaigns** 
4. **Target:** 1,000+ daily sessions

### Month 2-3: Full Recovery
1. **Optimize based on data**
2. **Test new campaigns** for 2025 market
3. **Target:** 1,500+ daily sessions (sustained)

---

## 💡 Pro Tips

1. **Start Conservative:** Even with 2024 data, start with 50% budgets
2. **Monitor Closely:** First week needs daily attention
3. **Compare Against 2024:** Use historical data as benchmark
4. **Focus on Quality:** Track conversion rates, not just sessions
5. **Document Everything:** Keep notes on what works

---

## ✅ Ready to Start?

Run this now:

```bash
npm run ads:analyze
```

Time to recover that traffic! 🚀

---

**Need Help?**
- Check `scripts/analytics/google-ads-setup-guide.md` for detailed setup
- Review `ADMI-Google-Ads-API-Design-Documentation.md` for architecture
- Google Ads API docs: https://developers.google.com/google-ads/api
