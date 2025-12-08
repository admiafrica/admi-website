# Meta Ads API Credentials - Complete Setup Guide

**Goal:** Get 3 credentials to enable Meta Ads analysis  
**Time:** 15-20 minutes  
**Level:** Beginner-friendly

---

## What You Need (3 Items)

| Credential | Where to Find | Example |
|-----------|--------------|---------|
| **META_ACCESS_TOKEN** | Meta Business Manager | `EAABs78jk9X8BAOZCvH...` |
| **META_BUSINESS_ACCOUNT_ID** | Meta Business Manager | `9876543210` |
| **META_PIXEL_ID** | Meta Events Manager | `1234567890` |

---

## Step-by-Step Setup

### STEP 1: Go to Meta Developers (2 minutes)

1. Open: https://developers.facebook.com/
2. Click **"Get Started"** (top right)
3. Sign in with your Meta Business account (same as Facebook/Instagram)
   - If you don't have one, create at https://business.facebook.com/

---

### STEP 2: Create or Select a Business App (3 minutes)

**Option A: If you already have an app:**
1. Go to **My Apps** (top menu)
2. Select your existing app
3. Skip to STEP 3

**Option B: If you need a new app:**
1. Click **My Apps** → **Create App**
2. Choose **Business** as app type
3. Fill in:
   - App Name: `ADMI Marketing Analytics` (or any name)
   - App Purpose: `Analytics & Reporting`
   - App Contact Email: your email
4. Click **Create App**
5. Verify your email if prompted

---

### STEP 3: Get Your Access Token (3 minutes)

1. In your app, go to **Settings** → **Basic**
2. Copy your **App ID** (save this temporarily)
3. Copy your **App Secret** (save this - keep private!)
4. Go to **Settings** → **Roles** → **Test Users** (or **Admin Roles**)
5. Create a test user with email (or use your own)

**Now generate Access Token:**
1. In the left menu, click **Tools** → **Graph API Explorer**
2. At the top:
   - Select your **App** from dropdown
   - Select **User Token** (if not already selected)
   - Click **Generate Access Token**
3. Grant permissions when prompted
4. **Copy the token** that appears in the text field
   - Format: `EAABs78jk9X8BAOZCvH...` (long string)
5. **Save this token** - this is your `META_ACCESS_TOKEN`

---

### STEP 4: Get Your Business Account ID (2 minutes)

1. Go to https://business.facebook.com/
2. Click **Settings** (bottom left)
3. Click **Business Settings**
4. In left menu, go to **Info**
5. Look for **Business ID** or **Business Account ID**
6. **Copy it** - format: `9876543210` (10 digits)
7. **Save this** - this is your `META_BUSINESS_ACCOUNT_ID`

---

### STEP 5: Get Your Pixel ID (2 minutes)

1. Go to https://www.facebook.com/events_manager/
2. In the **Data Sources** section (left sidebar), click **Pixels**
3. If you don't see a pixel:
   - Click **Create Pixel**
   - Name: `ADMI Website Tracking`
   - Enter your website: `admi.africa`
   - Click **Create Pixel**
4. Click on your pixel name
5. Go to **Settings** tab
6. Look for **Pixel ID** at the top
7. **Copy it** - format: `1234567890` (10 digits)
8. **Save this** - this is your `META_PIXEL_ID`

---

## Add to Your .env File

Once you have all 3 credentials, add them to `.env`:

```bash
# Meta Ads API Configuration
META_ACCESS_TOKEN=EAABs78jk9X8BAOZCvH...
META_BUSINESS_ACCOUNT_ID=9876543210
META_PIXEL_ID=1234567890
```

**File location:** `/Users/wilfred/admi-website/.env`

---

## Verify It Works

Run this command to test:

```bash
node scripts/analytics/meta-ads-analyzer.js
```

**Expected output:**
```
✅ Step 1: Checking credentials...
✅ All credentials configured

✅ Step 2: Testing Meta API connection...
✅ Connection successful!
   User: [Your Name]

✅ Step 3: Fetching campaigns...
```

---

## Troubleshooting

### "Invalid access token"
- Token may have expired
- Generate a new one (STEP 3)
- Make sure you copied the full token (very long string)

### "Missing credentials"
- Double-check .env file has all 3 values
- No spaces before/after the values
- Restart your terminal after adding to .env

### "Business ID not found"
- Go to business.facebook.com
- Make sure you're in the right business account
- ID should be in Settings → Info

### "Pixel ID invalid"
- Go to events_manager
- Make sure pixel is installed on your website
- Copy the exact ID from Settings tab

---

## What Happens After?

Once working, the script will show:

📊 **Current Meta Ads Performance:**
- Number of campaigns
- Budget allocation
- Performance metrics
- Comparison with Google Ads

💡 **Recommendations:**
- Should you pause Meta Ads?
- How to reallocate budget
- Expected CPA improvements

---

## Important Notes

⚠️ **Keep these private:**
- `META_ACCESS_TOKEN` - Never share
- `META_BUSINESS_ACCOUNT_ID` - Don't post online
- Never commit .env to GitHub

✅ **Token expires:**
- Long-lived tokens expire after ~60 days
- You'll need to regenerate periodically
- Script will tell you if expired

✅ **Permissions needed:**
- Your user must have Admin role in Business Manager
- App must have "Ads Manager" permission added

---

## Quick Reference

| Item | Where | Format |
|------|-------|--------|
| Access Token | Graph API Explorer | EAABs... (very long) |
| Business ID | business.facebook.com/settings/info | 9876543210 |
| Pixel ID | events_manager/pixels | 1234567890 |

---

## Next Steps

1. ✅ Get 3 credentials (15-20 min)
2. ✅ Add to .env file
3. ✅ Run: `node scripts/analytics/meta-ads-analyzer.js`
4. ✅ Get analysis report
5. ✅ Make decisions based on recommendations

---

**Time to complete:** 15-20 minutes  
**Difficulty:** Easy  
**Support:** If stuck on any step, let me know the error message
