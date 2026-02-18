# Contentful Course Migration Scripts

## Overview

Scripts for setting up and migrating course-related content types in Contentful CMS. These scripts prepare Contentful for the enhanced course pages with student portfolios, payment plans, curriculum details, and more.

## Scripts

### 1. Inspection Scripts

#### `inspect-course-content-types.js`
**Purpose:** Inspect existing course-related content types in Contentful

```bash
npm run contentful:inspect-courses
```

**What it does:**
- Checks for 16 course-related content types
- Shows field definitions
- Counts entries for each content type
- Helps understand current Contentful structure

**When to use:**
- Before running migrations
- To verify content type structure
- To debug content type issues

---

### 2. Migration Scripts

#### `add-missing-course-fields.js`
**Purpose:** Add missing fields to existing content types

```bash
npm run contentful:add-course-fields
```

**What it does:**
- Adds `projectUrl` to **studentPortfolio** (for YouTube/Vimeo links) - **CRITICAL**
- Adds `projectTitle`, `cohort`, `description`, `thumbnail`, `displayOrder` to studentPortfolio
- Adds `program`, `cohort`, `currentRole`, `company`, `displayOrder` to testimonial
- Adds `specialization`, `industryExperience`, `linkedInUrl`, `displayOrder` to courseLeaderMentor
- Adds `category`, `displayOrder` to faq

**Safe to run multiple times** - skips fields that already exist

**When to use:**
- Before content team starts adding course content
- When student portfolio YouTube links are needed
- To enable proper content sorting with displayOrder

---

#### `create-new-content-types.js`
**Purpose:** Create new course-related content types

```bash
npm run contentful:create-course-types
```

**What it creates:**
1. **courseSemesters** - Semester-by-semester curriculum breakdown
2. **paymentPlans** - Payment options and installment plans
3. **courseFacilities** - Equipment and facilities showcases
4. **alumniStories** - Success stories from graduates
5. **industryPartners** - Companies and organizations partnerships
6. **industryQuote** - Quotes from industry professionals
7. **coursePhotos** - Photo galleries for courses
8. **careerOutcomes** - Career statistics and outcomes

**Safe to run multiple times** - skips content types that already exist

**When to use:**
- After running `add-missing-course-fields.js`
- Before content team starts populating course pages
- To enable rich course page content

---

### 3. Combined Workflow

#### Run Both Migrations Together
```bash
npm run contentful:setup-courses
```

This runs both scripts in sequence:
1. Adds missing fields to existing types
2. Creates new content types

**Recommended:** This is the preferred method for initial setup.

---

## Prerequisites

### Environment Variables Required

Create a `.env` file in the project root with:

```env
# Contentful Space
ADMI_CONTENTFUL_SPACE_ID=qtu3mga6n6gc

# Management Token (write access required)
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_here

# Environment (optional, defaults to 'master')
ADMI_CONTENTFUL_ENVIRONMENT=master
```

### Get Your Management Token

1. Go to [Contentful API Keys](https://app.contentful.com/spaces/qtu3mga6n6gc/api/keys)
2. Click **"Content management tokens"** tab
3. Generate a new personal access token
4. Copy and paste into `.env` file

⚠️ **IMPORTANT:** Management tokens have write access. Keep them secure!

---

## Workflow

### Initial Setup (One Time)

1. **Inspect current structure:**
   ```bash
   npm run contentful:inspect-courses
   ```

2. **Run migrations:**
   ```bash
   npm run contentful:setup-courses
   ```

3. **Verify in Contentful:**
   - Go to Content Model
   - Check that studentPortfolio has projectUrl field
   - Check that 8 new content types exist

4. **Notify content team:**
   - Share the [Content Team Guide](../../docs/CONTENT-TEAM-GUIDE-COURSE-SETUP.md)
   - Content team can now add course content

### Updating Existing Setup

If you need to add more fields later:

1. Edit the migration script (e.g., `add-missing-course-fields.js`)
2. Add the new field definition
3. Run the script again:
   ```bash
   npm run contentful:add-course-fields
   ```

Scripts are idempotent - they skip existing fields.

---

## Content Types Created

### Existing Types Enhanced
- ✅ **course** (13 entries) - No changes, already complete
- ✅ **courseBenefit** (71 entries) - No changes needed
- ✅ **courseLeaderMentor** (19 entries) - Added specialization, industryExperience, linkedInUrl, displayOrder
- ✅ **faq** (187 entries) - Added category, displayOrder
- ✅ **applicationProcess** (6 entries) - No changes needed
- ✅ **program** (4 entries) - No changes needed
- ✅ **studentPortfolio** (16 entries) - **Added projectUrl, projectTitle, cohort, description, thumbnail, displayOrder**
- ✅ **testimonial** (6 entries) - Added program, cohort, currentRole, company, displayOrder

### New Types Created
- 🆕 **courseSemesters** - Curriculum by semester
- 🆕 **paymentPlans** - Payment options
- 🆕 **courseFacilities** - Equipment showcases
- 🆕 **alumniStories** - Graduate success stories
- 🆕 **alumniStories** - Graduate success stories
- 🆕 **industryPartners** - Partner company logos
- 🆕 **industryQuote** - Industry expert quotes
- 🆕 **coursePhotos** - Course photo galleries
- 🆕 **careerOutcomes** - Employment statistics

---

## Troubleshooting

### Error: "CONTENTFUL_MANAGEMENT_TOKEN environment variable is required"

**Solution:** Add your management token to `.env` file

### Error: "Cannot read property 'fields' of null"

**Solution:** Content type doesn't exist. Check the content type ID.

### Error: "Version mismatch"

**Solution:** Content type was edited while script was running. Run script again.

### Script says "already exists" for everything

**Solution:** This is expected! Scripts are safe to run multiple times.

### Changes not visible in Contentful UI

**Solution:** 
1. Hard refresh browser (Cmd+Shift+R on Mac)
2. Check that script said "published"
3. Verify environment is correct (master vs. staging)

---

## Testing

### Test on Staging First

1. Switch environment:
   ```env
   ADMI_CONTENTFUL_ENVIRONMENT=staging
   ```

2. Run migrations on staging:
   ```bash
   npm run contentful:setup-courses
   ```

3. Test with content team on staging

4. Switch back to master and run again:
   ```env
   ADMI_CONTENTFUL_ENVIRONMENT=master
   ```

### Verify Migration Success

After running migrations:

1. **Check Contentful UI:**
   - Go to Content Model
   - Find studentPortfolio
   - Verify projectUrl field exists

2. **Check entries:**
   - Go to Content → studentPortfolio
   - Open an entry
   - Verify new fields are visible

3. **Test on website:**
   - Visit staging.admi.africa/courses/[course-slug]
   - Verify portfolio links display correctly

---

## Related Documentation

- [Course Page Content Guide](../../docs/COURSE-PAGE-CONTENT-GUIDE.md) - Complete content specifications
- [Content Team Guide](../../docs/CONTENT-TEAM-GUIDE-COURSE-SETUP.md) - How to add content
- [Contentful Course Types Current State](../../docs/CONTENTFUL-COURSE-TYPES-CURRENT-STATE.md) - Gap analysis

---

## Support

**Issues?** Check the troubleshooting section above or:
1. Run inspection script: `npm run contentful:inspect-courses`
2. Check Contentful Activity Log for API errors
3. Verify management token has write permissions
4. Contact development team

---

## Maintenance

### Adding New Content Types

1. Create new content type definition in `create-new-content-types.js`
2. Follow existing patterns (use displayField, validations, etc.)
3. Run script to create
4. Update this README

### Modifying Existing Types

⚠️ **Caution:** Modifying published content types with existing entries can be risky

**Safe operations:**
- Adding new optional fields ✅
- Adding new validations to empty fields ✅
- Changing field names/descriptions ✅

**Unsafe operations:**
- Removing required fields ❌
- Changing field types ❌
- Adding required fields without defaults ❌

Always test on staging first!
