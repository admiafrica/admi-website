# Category Field Setup - Safe Implementation Guide

## Overview

This guide shows how to **safely** add category fields to Courses and Articles in Contentful, enabling category-based article filtering on course pages.

## ⚠️ Safety Features

All scripts are designed to be:

- ✅ **Non-destructive**: Won't break existing data
- ✅ **Backward compatible**: Existing code continues to work
- ✅ **Idempotent**: Can run multiple times safely
- ✅ **Reversible**: Changes can be undone
- ✅ **Optional fields**: No required fields that could break entries

## Step 1: Get Management Token

1. Go to [Contentful → Settings → API keys → Content management tokens](https://app.contentful.com/spaces/qtu3mga6n6gc/api/cma_tokens)
2. Click "Generate personal token"
3. Name it: "Category Field Setup"
4. Copy the token (you'll only see it once!)
5. Export it:

```bash
export CONTENTFUL_MANAGEMENT_TOKEN="your-token-here"
```

## Step 2: Add Category Field to Content Types

This adds an **optional** category field to the Course content type:

```bash
node scripts/contentful/add-category-fields.js
```

**What it does:**

- Adds `category` field to Course content type (optional, won't break anything)
- Verifies `category` field exists on Article content type
- Validates category values against predefined list

**Valid categories:**

- Animation
- Film Production
- Music Production
- Photography
- Sound Engineering
- Graphic Design
- UI/UX Design
- Video Game Development
- Digital Marketing
- Entertainment Business

**Safe because:**

- Field is optional (existing entries don't need it)
- Script can run multiple times
- No existing data is modified

## Step 3: Test with ONE Article

Before updating all articles, test with a single article:

```bash
# Find an article about music production
node scripts/contentful/set-article-category.js \
  "digital-music-production-technology-tools-for-modern-music-creation" \
  "Music Production"
```

**What it does:**

1. Finds the article by slug
2. Shows current values
3. **Asks for confirmation** before changing anything
4. Updates category field
5. Publishes the updated entry

**Safe because:**

- Shows preview before making changes
- Requires manual confirmation
- Only updates ONE article
- Can be reverted manually in Contentful UI

## Step 4: Verify the Change

### In Contentful UI:

1. Go to Content → Articles
2. Find your test article
3. Check that category is set correctly

### Via API:

```bash
curl "https://cdn.contentful.com/spaces/qtu3mga6n6gc/environments/master/entries?access_token=$ADMI_CONTENTFUL_ACCESS_TOKEN&content_type=article&fields.slug=digital-music-production-technology-tools-for-modern-music-creation" | jq '.items[0].fields.category'
```

Should return: `"Music Production"`

## Step 5: Update Code to Use Categories

After categories are set, update the course page to filter by category:

### Current (tag-based):

```typescript
// src/pages/courses/[slug].tsx line 303
const courseTagsParam = (data.fields.tags || []).join(',')
const articlesResponse = await fetch(
  `${baseUrl}/api/v3/course-articles?tags=${encodeURIComponent(courseTagsParam)}&limit=3`
)
```

### New (category-based):

```typescript
// Extract category from course name or use new category field
const courseCategory = data.fields.category || extractCategoryFromCourseName(data.fields.name)
const articlesResponse = await fetch(
  `${baseUrl}/api/v3/course-articles?category=${encodeURIComponent(courseCategory)}&limit=3`
)
```

## Step 6: Bulk Update Articles (Optional)

Once you've tested with one article and verified everything works, you can update more articles.

**Manual approach (safest):**

1. Go to Contentful UI
2. Bulk select articles by tag or search
3. Bulk edit → Set category

**Programmatic approach:**
Create a new script that:

1. Fetches all articles
2. Determines category from tags/title
3. Shows preview of all changes
4. Requires confirmation
5. Updates in batches

## Rollback Plan

If anything goes wrong:

### Option 1: Manual Rollback

1. Go to Contentful → Content → Entry
2. Click "..." → "Versions"
3. Restore previous version

### Option 2: Remove Field

```javascript
// Remove category field from content type
// (This won't delete the data, just hide the field)
```

## Testing Checklist

Before deploying to production:

- [ ] Management token works
- [ ] Category field added to Course content type
- [ ] Category field exists on Article content type
- [ ] Test article updated successfully
- [ ] Test article shows correct category in API response
- [ ] Course page code updated to use category
- [ ] Tested on staging environment
- [ ] Articles appear on correct course pages
- [ ] No 404 errors or crashes
- [ ] Old tag-based filtering still works as fallback

## FAQ

**Q: Will this break the site?**
A: No. The category field is optional, and existing code will continue to work.

**Q: What if a course doesn't have a category set?**
A: The code should fall back to tag-based filtering (existing behavior).

**Q: Can I undo changes?**
A: Yes. Either manually in Contentful UI or by restoring previous versions.

**Q: Do I need to update all courses/articles at once?**
A: No. You can update them gradually. The system works with mixed data.

**Q: What happens to existing "Resources" category?**
A: It remains valid. Articles can stay as "Resources" or use specific categories.

## Category Mapping Examples

| Course Name                      | Category               |
| -------------------------------- | ---------------------- |
| Animation - Nairobi              | Animation              |
| Film Production - Kisumu         | Film Production        |
| Music Production - Mombasa       | Music Production       |
| Photography - Eldoret            | Photography            |
| Sound Engineering - Nakuru       | Sound Engineering      |
| Graphic Design - Nairobi         | Graphic Design         |
| UI/UX Design - Kisumu            | UI/UX Design           |
| Video Game Development - Nairobi | Video Game Development |
| Digital Marketing - Mombasa      | Digital Marketing      |

## Next Steps

1. ✅ Get management token
2. ✅ Run add-category-fields.js
3. ✅ Test with one article
4. ✅ Verify in Contentful UI
5. ✅ Update course page code
6. ✅ Test on staging
7. ✅ Gradually update more articles
8. ✅ Deploy to production

## Support

If you encounter issues:

1. Check script output for error messages
2. Verify tokens are set correctly
3. Check Contentful UI for recent changes
4. Review version history for rollback options
