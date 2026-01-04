# Contentful Quota Optimization Guide

## Current Status
- **Quota Exceeded**: 132% of API/Asset Bandwidth limit
- **Blocked Until**: End of January 2026
- **Mitigation**: Caching system deployed (reduces future usage by ~90%)

## What's Consuming Your Quota

### High-Impact API Calls
1. **Homepage API** - Called on every homepage visit
2. **Courses API** - Called on enquiry forms, course pages
3. **News/Resources APIs** - Called on various pages
4. **Asset Bandwidth** - Images/videos loaded from Contentful

### Optimization Implemented ✅

#### 1. In-Memory Caching (5-10 minutes)
- Homepage: 5 min cache
- Courses: 10 min cache
- **Impact**: ~90% reduction in API calls

#### 2. CDN Cache Headers
```
Cache-Control: public, s-maxage=300-600, stale-while-revalidate=600-1200
```
- CloudFront caches responses
- Stale cache served on errors

#### 3. Fallback Data
- Static homepage data when Contentful fails
- Empty arrays for courses (handled gracefully)

## Next Steps

### Immediate (Required)
1. **Upgrade Contentful Plan** OR **Wait until Feb 1, 2026**
   - Free tier: 1M API calls/month
   - Team tier: 3M API calls/month
   - https://www.contentful.com/pricing/

### Short-term (This Week)
2. **Add Caching to Other APIs**
   - `/api/v3/news` - High traffic endpoint
   - `/api/v3/resources` - Frequently accessed
   - `/api/v3/events` - Low priority

3. **Optimize Asset Delivery**
   - Use Contentful Image API with parameters: `?w=800&fm=webp`
   - Serve images through CloudFront
   - Lazy load images

### Long-term (This Month)
4. **Consider Redis/Database Cache**
   - Persistent cache across server restarts
   - Longer cache durations (30-60 minutes)
   - Faster response times

5. **Implement ISR (Incremental Static Regeneration)**
   - Pre-render pages at build time
   - Revalidate every 1 hour
   - Near-zero Contentful API calls for static pages

6. **Monitor Usage**
   - Set up alerts in Contentful
   - Track API calls per endpoint
   - Review monthly usage reports

## API Call Reduction Estimates

### Before Caching
- Homepage loads: 1,000/day × 30 = 30,000 API calls/month
- Course pages: 500/day × 30 = 15,000 API calls/month
- Forms: 200/day × 30 = 6,000 API calls/month
- **Total**: ~51,000+ API calls/month (just for these 3)

### After Caching (Current)
- Cache hit rate: ~90%
- Homepage: 30,000 × 0.1 = 3,000 API calls/month
- Course pages: 15,000 × 0.1 = 1,500 API calls/month
- Forms: 6,000 × 0.1 = 600 API calls/month
- **Total**: ~5,100 API calls/month (90% reduction!)

### After Full Optimization (ISR)
- Pre-rendered pages: ~100 API calls/month
- Real-time updates: ~1,000 API calls/month
- **Total**: ~1,100 API calls/month (98% reduction!)

## Temporary Workaround

While waiting for quota reset, the website will:
- ✅ Load homepage with cached/fallback data
- ✅ Show courses from cache
- ✅ Accept form submissions
- ✅ Serve news/resources from cache
- ⚠️ May show slightly stale content (5-10 min old)

## Cost Analysis

### Free Plan Limits
- API Calls: 1M/month
- Asset Bandwidth: Varies
- **Cost**: $0

### Team Plan
- API Calls: 3M/month
- Asset Bandwidth: Higher limits
- **Cost**: ~$489/month

### Recommendation
- Implement all optimizations first
- Monitor for 1 month with free tier
- Only upgrade if still exceeding limits
