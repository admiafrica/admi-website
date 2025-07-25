# ADMI Website Scripts

This directory contains various utility scripts for managing the ADMI website.

## Directory Structure

### `/blog-generation`
Scripts for automated blog content generation using AI.

- **blog-scheduler.js** - Main scheduler for automated blog generation (daily/weekly)
- **blog-topics-database.js** - Database of blog topics organized by category
- **seo-rocket-blog-generator.js** - Core blog generation engine using Perplexity AI
- **demo-blog-generation.js** - Demo script to test blog generation

**Usage:**
```bash
# Generate daily batch (2 articles)
node scripts/blog-generation/blog-scheduler.js daily

# Generate weekly batch (7 articles)  
node scripts/blog-generation/blog-scheduler.js weekly

# Generate specific number of articles
node scripts/blog-generation/blog-scheduler.js batch 5

# View statistics
node scripts/blog-generation/blog-scheduler.js stats
```

### `/contentful`
Scripts for managing Contentful CMS content and relationships.

- **add-course-relationships.js** - Add relationships between courses and content
- **check-content-types.js** - Check available content types in Contentful
- **check-course-relationships.js** - Verify course relationships
- **create-course-relationships.js** - Create new course relationships

**Usage:**
```bash
# Check content types
node scripts/contentful/check-content-types.js

# Add course relationships
node scripts/contentful/add-course-relationships.js
```

### `/tests`
Test scripts for various functionality. These should NOT be run in production.

- **create-test-article.js** - Create test articles in Contentful
- **create-test-article-with-image.js** - Create test articles with images
- **delete-test-article.js** - Delete test articles
- **test-contentful-management.ts** - Test Contentful Management API
- **test-perplexity.js** - Test Perplexity AI integration

### `/setup`
Setup and configuration scripts.

- **setup-cron-jobs.sh** - Set up cron jobs for automated blog generation

**Usage:**
```bash
# Set up automated blog generation
chmod +x scripts/setup/setup-cron-jobs.sh
./scripts/setup/setup-cron-jobs.sh
```

## Environment Variables Required

All scripts require proper `.env` configuration with:

```env
# Contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token  
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
CONTENTFUL_ENVIRONMENT=master

# AI Services (for blog generation)
PERPLEXITY_API_KEY=your_perplexity_key
FIRECRAWL_API_KEY=your_firecrawl_key
DATAFORSEO_LOGIN=your_dataforseo_login
DATAFORSEO_PASSWORD=your_dataforseo_password
```

## Notes

- Test scripts should only be run in development environment
- Blog generation creates drafts in Contentful that need manual review
- Cron jobs run at 9 AM daily and 10 AM on Sundays
- Always backup Contentful data before running relationship scripts