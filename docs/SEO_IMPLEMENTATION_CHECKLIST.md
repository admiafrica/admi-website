# ADMI SEO Implementation Checklist

## 📋 Phase 1: Quick Wins (Week 1) - 2-3 hours
Essential updates with immediate SEO impact

- [ ] **Update article PageSEO to use tags**
  - File: `/src/pages/resources/[slug].tsx`
  - Change: Add article.tags to keywords parameter
  - Time: 30 minutes
  - Impact: +20-30% CTR
  - Status: ⏳ TODO

- [ ] **Add reading time calculation**
  - File: `/src/pages/resources/[slug].tsx`
  - Add: `calculateReadingTime(article.body)` helper
  - Display: Show as "X min read" near publication date
  - Time: 30 minutes
  - Impact: +15-20% CTR
  - Status: ⏳ TODO

- [ ] **Display article metadata component**
  - File: `/src/pages/resources/[slug].tsx`
  - Use: ArticleMetadata component (already created)
  - Shows: Author, date, category, tags
  - Time: 1 hour
  - Impact: +10-15% engagement
  - Status: ✅ Component created, need to integrate

---

## 🔗 Phase 2: Internal Linking (Week 2) - 4-5 hours
Improve crawlability and reduce bounce rate

- [ ] **Create Related Articles component**
  - File: Use `/src/components/articles/ArticleMetadata.tsx` (already created)
  - Shows: 3 articles matching current article's tags
  - Location: After article body in article page
  - Time: 1-2 hours
  - Impact: +30% time-on-site, -20% bounce
  - Status: ✅ Component created, need to integrate

- [ ] **Add breadcrumb schema markup**
  - File: `/src/pages/resources/[slug].tsx`
  - Schema: Home > Resources > [Category] > [Article]
  - Time: 1 hour
  - Impact: +5% CTR, better crawlability
  - Status: ⏳ TODO

- [ ] **Update article schema with reading time & word count**
  - File: Update `EducationalResourceSchema` props
  - Add: `readingTime`, `wordCount`, full `tags` array
  - Time: 1 hour
  - Impact: Better schema markup, SERP features
  - Status: ⏳ TODO

- [ ] **Integrate RelatedArticles in getServerSideProps**
  - File: `/src/pages/resources/[slug].tsx` (getServerSideProps section)
  - Action: Fetch 6 related articles by category
  - Pass to component: `relatedArticles` prop
  - Time: 1 hour
  - Status: ⏳ TODO

---

## 📍 Phase 3: New Entry Points (Week 3) - 5-6 hours
Create new indexed pages and improve discoverability

- [ ] **Create tag landing pages**
  - New file: `/src/pages/resources/tags/[tag].tsx`
  - Shows: All articles with that tag
  - Schema: TagPage with articleCount, description
  - Time: 2-3 hours
  - Impact: +20-30 new indexed pages
  - Status: ⏳ TODO

- [ ] **Optimize meta descriptions**
  - Where: Contentful article entries
  - Format: 150-160 chars, keyword first 100
  - Tool: Contentful bulk edit
  - Time: 1-2 hours
  - Impact: +5-10% CTR
  - Status: ⏳ TODO

- [ ] **Create article archive pages**
  - New files:
    - `/src/pages/resources/all` - All articles
    - `/src/pages/resources/archive/[year].tsx` - By year
    - `/src/pages/resources/category/[category].tsx` - By category
  - Time: 2-3 hours
  - Impact: Better UX, +150 pages indexed
  - Status: ⏳ TODO

---

## 🎓 Phase 4: Advanced Schema (Week 4) - 3-4 hours
Rich snippets and structured data enhancements

- [ ] **Add FAQ schema to How-To articles**
  - Identify: Articles with "How to" in title
  - Extract: Q&A sections automatically
  - File: Update article schema
  - Time: 2 hours
  - Impact: Eligible for FAQ rich results
  - Status: ⏳ TODO

- [ ] **Add video schema markup**
  - Where: Articles referencing YouTube videos
  - Schema: VideoObject with thumbnail, duration
  - File: Update article page schema
  - Time: 1 hour
  - Impact: Video snippets in SERP
  - Status: ⏳ TODO

- [ ] **Create schema validation**
  - Build tool: Add to build process
  - Check: Validate all schema markup
  - Report: Flag issues before deployment
  - Time: 1 hour
  - Status: ⏳ TODO

---

## 🧪 Testing & Validation Checklist

- [ ] **Run article SEO audit**
  ```bash
  node scripts/article-seo-audit.js
  ```
  - Verify: All metrics calculated correctly
  - Check: 120 articles audited
  - Status: ✅ Ran - Results in output

- [ ] **Validate schema markup**
  - Tools: 
    - Google Schema.org validator
    - Screaming Frog SEO Spider
    - Rich Results Test
  - Check: ArticleSchema, BreadcrumbSchema, FAQSchema
  - Status: ⏳ TODO

- [ ] **Test article pages locally**
  - Run: `npm run dev`
  - Check: Reading time displays
  - Check: Metadata displays
  - Check: Related articles show
  - Check: Breadcrumbs present
  - Status: ⏳ TODO

- [ ] **Test tag landing pages**
  - URL: `/resources/tags/animation`
  - Check: Shows all animation articles
  - Check: Proper schema markup
  - Check: Pagination works (if >9 articles)
  - Status: ⏳ TODO

- [ ] **Submit to Google Search Console**
  - URL: `/resources/tags/[all-tags]`
  - Action: Request indexation
  - Monitor: Crawl stats, impressions
  - Status: ⏳ TODO

---

## 🚀 Deployment Checklist

Before deploying each phase:

- [ ] **Phase 1 Deployment**
  - Commits: Tags + reading time + metadata
  - Build: `npm run build` succeeds
  - Staging: Test on staging environment
  - Prod: Deploy to main via CI/CD
  - Timeline: After Week 1

- [ ] **Phase 2 Deployment**
  - Commits: Related articles + breadcrumbs
  - Build: `npm run build` succeeds
  - Staging: E2E test related articles
  - Prod: Deploy via CI/CD
  - Timeline: After Week 2

- [ ] **Phase 3 Deployment**
  - Commits: Tag pages + archive pages
  - Build: `npm run build` succeeds
  - Staging: Test all new routes
  - Prod: Deploy via CI/CD
  - Timeline: After Week 3

- [ ] **Phase 4 Deployment**
  - Commits: FAQ schema + video schema
  - Build: Schema validation passes
  - Staging: Validate markup
  - Prod: Deploy via CI/CD
  - Timeline: After Week 4

---

## 📊 Success Metrics to Track

### Week 1 (After Quick Wins)
- [ ] Keywords with tags showing in GSC
- [ ] Reading time visible on articles
- [ ] Metadata displayed on article pages

### Week 2 (After Internal Linking)
- [ ] Related articles showing below article body
- [ ] Breadcrumbs visible on all article pages
- [ ] Average session duration increased

### Week 3 (After New Entry Points)
- [ ] Tag pages indexed in Google Search Console
- [ ] Meta descriptions updated in SERPs
- [ ] Archive pages receiving impressions

### Week 4 (After Advanced Schema)
- [ ] FAQ snippets appearing in search results
- [ ] Video snippets for relevant articles
- [ ] Overall impressions increased

---

## 📈 Overall Success Metrics (60 days)

- [ ] Article impressions: 2,000 → 3,500/mo (+75%)
- [ ] CTR: 3% → 4.5% (+50%)
- [ ] Avg rank position: Top 20 → Top 15 (-5)
- [ ] Bounce rate: 60% → 48% (-20%)
- [ ] Time on page: 2:30 → 3:45 (+50%)
- [ ] New indexed pages: +30 (tag pages)

---

## 🔗 Related Documentation

- SEO_IMPROVEMENT_ROADMAP.md - Strategic overview
- ARTICLE_SEO_ACTION_PLAN.md - Detailed tactics
- ARTICLE_PAGE_IMPLEMENTATION.md - Code examples
- article-seo-audit.js - Audit script

---

## 📞 When You Get Stuck

1. **ArticleMetadata component not importing?**
   → Check file exists: `/src/components/articles/ArticleMetadata.tsx`
   → Verify imports in article page

2. **Reading time calculation not showing?**
   → Verify `calculateReadingTime()` helper is working
   → Check article body has content

3. **Related articles not showing?**
   → Verify `getServerSideProps` fetches related articles
   → Check articles have matching tags
   → Verify RelatedArticles component receives data

4. **Tag pages returning 404?**
   → Check file exists: `/src/pages/resources/tags/[tag].tsx`
   → Verify Contentful API fetch works
   → Test with direct URL

5. **Schema validation failing?**
   → Use: https://validator.schema.org/
   → Check all required fields present
   → Compare with examples in ArticleSchema.tsx

---

## 💾 Git Commit Messages

Use these messages when committing:

```bash
# Phase 1
git commit -m "feat: Add tags and reading time to article SEO"

# Phase 2
git commit -m "feat: Add related articles and breadcrumb navigation"

# Phase 3
git commit -m "feat: Create tag landing pages and article archives"

# Phase 4
git commit -m "feat: Add FAQ and video schema markup"
```

---

## ⏱️ Time Estimate Summary

| Phase | Tasks | Effort | Status |
|-------|-------|--------|--------|
| 1 | Keywords, reading time, metadata | 2-3 hrs | ⏳ TODO |
| 2 | Related articles, breadcrumbs, schema | 4-5 hrs | ⏳ TODO |
| 3 | Tag pages, metadata optimization, archives | 5-6 hrs | ⏳ TODO |
| 4 | FAQ schema, video schema, validation | 3-4 hrs | ⏳ TODO |
| **TOTAL** | **All phases** | **14-18 hrs** | ⏳ TODO |

**Total Investment**: ~18 hours of work
**Expected ROI**: +50-100% article traffic in 60 days

---

**Last Updated**: December 7, 2025
**Status**: Ready for implementation
**Next Step**: Start Phase 1 (Quick Wins)
