# Google Ads Customer Match Upload Guide

## Overview
You have **428 enrolled customers** ready to upload. There are 2 methods to upload:

### Method 1: Google Ads UI (Recommended - Easiest)
### Method 2: Google Ads API (Automated)

---

## METHOD 1: Google Ads UI Upload (RECOMMENDED)

This is the simplest and most reliable method for your first Customer Match list.

### Step-by-Step Instructions:

#### 1. Access Audience Manager
- Log in to Google Ads: https://ads.google.com
- Click **Tools & Settings** (wrench icon in top right)
- Under "Shared Library", click **Audience Manager**

#### 2. Create Customer List
- Click the **+ (Plus)** button
- Select **Customer list**
- Choose **Upload a file**

#### 3. Upload Your CSV
- **File to upload**: `reports/google-ads/enrolled-customers-from-deals.csv`
- **List name**: `ADMI - Enrolled Customers (428)`
- **Description**: `Actual enrolled students from CRM Won/Enrolled stages (Sept 2024 - Sept 2025)`
- **Membership duration**: 540 days (maximum)
- **Upload key**: Select **Email and/or Phone**

#### 4. Configure Settings
- **Data upload consent**: ✅ Check the box confirming you have consent
- **Ad personalization**: Keep enabled (required for Similar Audiences)
- **Pre-hash**: Leave UNCHECKED (Google will hash the data)

#### 5. Map Columns
Google will auto-detect columns, verify:
- Email → Email
- Phone → Phone  
- First Name → First Name
- Last Name → Last Name
- Country → Country
- Zip → Zip Code

#### 6. Upload and Wait
- Click **Upload and create**
- Google will process the file (5-10 minutes)
- **Match processing**: 24-48 hours
- **Expected match rate**: 50-70% (214-300 matched users)

---

## METHOD 2: Google Ads API Upload (Advanced)

Use this if you want to automate uploads or need programmatic access.

### Prerequisites:
- ✅ Google Ads API access (you already have this)
- ✅ Developer token configured
- ✅ OAuth credentials set up

### API Upload Script:

I can create a Node.js script that:
1. Creates a new Customer Match list
2. Uploads the hashed customer data via API
3. Returns the list ID for targeting

**Advantages**:
- Automated, repeatable process
- Can update the list automatically
- No manual CSV upload needed

**Disadvantages**:
- More complex setup
- Requires additional API quota
- Same 24-48 hour match processing time

---

## RECOMMENDED APPROACH

### For Your First Upload: USE METHOD 1 (UI)

**Why?**
1. **Faster setup** - No additional code needed
2. **Visual feedback** - See match progress in real-time
3. **Error handling** - Google Ads UI shows detailed error messages
4. **Testing** - Verify data format before automating

### After Successful Upload: Consider METHOD 2 (API)

Once you confirm the CSV format works and see good match rates, you can automate future uploads using the API.

---

## AFTER UPLOAD: Next Steps

### 1. Monitor Match Status (24-48 hours)
- Go to **Audience Manager** → **Customer lists**
- Check **"ADMI - Enrolled Customers (428)"**
- Look for **"Match rate"** percentage
- **Minimum needed**: 1,000 matched users for Similar Audiences

### 2. Create Similar Audiences (Once Matched)
Click on your customer list, then:

#### Similar Audience 1% (Highest Quality)
- Name: `ADMI - Lookalike 1% (Enrolled)`
- Size: 1% of Kenya internet users
- Quality: Highest similarity to enrolled students
- Best for: High-intent search campaigns

#### Similar Audience 3% (Balanced)
- Name: `ADMI - Lookalike 3% (Enrolled)`
- Size: 3% of Kenya internet users  
- Quality: Good similarity
- Best for: Display and Performance Max campaigns

#### Similar Audience 5% (Broadest)
- Name: `ADMI - Lookalike 5% (Enrolled)`
- Size: 5% of Kenya internet users
- Quality: Moderate similarity
- Best for: Awareness campaigns

### 3. Build New Campaigns
Use these audiences in:
- **Search campaigns** - Target lookalikes + course keywords
- **Display campaigns** - Awareness to lookalike audiences
- **Performance Max** - Use customer list as "signal" audience
- **Remarketing** - Exclude enrolled customers from prospecting

---

## TROUBLESHOOTING

### Low Match Rate (<30%)?
- **Check data quality**: Verify emails are valid, not disposable
- **Phone format**: Ensure phones include country code (254...)
- **Wait longer**: Sometimes takes 3-4 days for full processing

### List Too Small (<1,000 matches)?
You have 428 customers, expecting 214-300 matches. If you need more:

**Option A**: Export older customers
- Modify script to include 2023, 2022 pipelines
- Target: 1,000+ enrolled customers

**Option B**: Include qualified leads
- Add the 188 qualified leads (score ≥70)
- Total: 428 + 188 = 616 contacts
- Expected matches: 308-432

**Option C**: Lower qualification threshold
- Export all contacts with score ≥50
- Larger list but lower quality

### Can't Create Similar Audiences?
- **Minimum requirement**: 1,000 matched users in source list
- **Solution**: Combine multiple customer lists
- **Alternative**: Use customer list directly (without Similar)

---

## FILE REFERENCE

### CSV File (For UI Upload)
**Path**: `reports/google-ads/enrolled-customers-from-deals.csv`

**Format**:
```csv
Email,Phone,First Name,Last Name,Country,Zip,Pipeline,Deal Stage,Deal Amount,Close Date
student@example.com,254712345678,John,Doe,KE,00100,May 2024 Pipeline,Won,98000,2024-05-15
```

**Columns for Google Ads**: Email, Phone, First Name, Last Name, Country, Zip

### Hashed JSON (For API Upload)
**Path**: `reports/google-ads/enrolled-customers-hashed.json`

**Format**: SHA256 hashed emails/phones with consent metadata

---

## IMMEDIATE ACTION

### Right Now:
1. Open Google Ads: https://ads.google.com
2. Navigate to Tools → Audience Manager
3. Click + → Customer list → Upload a file
4. Select: `reports/google-ads/enrolled-customers-from-deals.csv`
5. Name it: `ADMI - Enrolled Customers (428)`
6. Click Upload

### Tomorrow:
Check match status in Audience Manager

### In 2-3 Days:
- Verify match rate (target: 50-70%)
- Create Similar Audiences (1%, 3%, 5%)
- Start building campaigns with lookalike targeting

---

## Questions?
Let me know if you want me to:
- Create the API upload script (Method 2)
- Export additional customers to reach 1,000+ threshold
- Create campaign templates targeting these audiences
