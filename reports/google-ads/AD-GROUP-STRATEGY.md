# Ad Group Strategy Analysis: Keep 1 vs. Create 5

**Current State:** All keywords in 1 ad group (GroupId=184381474250)  
**Question:** Do we need 5 separate ad groups by course?

---

## Analysis: 1 Ad Group vs. 5 Ad Groups

### KEEP 1 AD GROUP (Recommended for your situation)

**Pros:**
✅ Simpler to manage (196 keywords in 1 group vs. 40 in 5)
✅ Easier to monitor performance
✅ Faster to implement (no need to create new groups)
✅ Better for small keyword volumes
✅ Less fragmented reporting
✅ Same Quality Score threshold (won't split quality)

**Cons:**
❌ Can't customize ads per course
❌ All keywords compete for same ad copy
❌ Harder to track which course keywords perform best
❌ Lower quality score potential (mixed topics in one group)

**Quality Score Impact:** 4-5 (will stay ~same, maybe improve slightly)

---

### CREATE 5 AD GROUPS (Only needed if...)

**Pros:**
✅ Custom ad copy per course (shows "Enroll in Film Production")
✅ Better Quality Score per group (7-8 instead of 4-5)
✅ Track performance by course easily
✅ Can adjust bids per course independently
✅ Higher CTR (matching ad copy to keyword)

**Cons:**
❌ More management overhead
❌ Takes longer to implement
❌ Harder to monitor 5 groups simultaneously
❌ Ad copy needs to be created for each course
❌ More complex keyword organization

**Quality Score Potential:** 7-8 (better organization)

---

## RECOMMENDATION: Keep 1 Ad Group

**Why?** Your situation suggests 1 ad group is better:

1. **You only have 1 ad group currently** - No template exists for multi-group setup
2. **Small keyword count** - 89 keywords is manageable in 1 group
3. **Same landing pages likely** - All courses probably go to /courses
4. **Faster implementation** - Can start optimizing immediately
5. **No custom ad copy yet** - Not set up for per-course ads

---

## IMPLEMENTATION APPROACH: Keep 1 Ad Group

### Option A: Add All Keywords to Existing Group (Recommended)

**Steps:**
1. Keep GroupId=184381474250 as-is
2. Remove 66 non-performing keywords (same group)
3. Add 35 new keywords (same group)
4. Result: ~60 high-quality keywords in 1 optimized group

**Time:** 20 minutes
**Quality Score:** 4-5 → 6-7 (improvement from keyword quality)
**CPA Impact:** $32 → $18-24 expected

**Keyword Organization:** (internally, don't create separate groups)
```
GROUP: 184381474250 - Search - ADMI Diplomas
├─ Film Production keywords (7)
├─ Music Production keywords (7)
├─ Graphic Design keywords (6)
├─ Photography keywords (6)
├─ Animation keywords (6)
├─ General/Shared keywords (7)
└─ 15 existing performers (kept)

Total: ~60 keywords in 1 ad group
```

---

### Option B: Create 5 Ad Groups (Only if you have custom ads)

**When to use this:**
- You have 5 different landing pages (/film-production, /music-production, etc.)
- You have custom ad copy per course
- You want detailed per-course performance tracking
- You can manage 5 groups daily

**Setup would be:**
```
Campaign: Search - ADMI Diplomas
├─ Ad Group: Film Production - Tier 1 (7 keywords)
├─ Ad Group: Music Production - Tier 1 (7 keywords)
├─ Ad Group: Graphic Design - Tier 1 (6 keywords)
├─ Ad Group: Photography - Tier 1 (6 keywords)
└─ Ad Group: Animation - Tier 1 (6 keywords)

Total: 5 groups, ~32 keywords total
```

---

## DECISION MATRIX

| Factor | Keep 1 Group | Create 5 Groups |
|--------|---|---|
| Implementation time | 20 min | 45 min |
| Management complexity | Low | Medium |
| Quality Score potential | 6-7 | 7-8 |
| Custom ads per course | ❌ No | ✅ Yes |
| Better reporting | ❌ No | ✅ Yes |
| Recommended for current setup | ✅ YES | ❌ No |
| Need course-specific landing pages | ❌ No | ✅ Yes (5) |
| Can start immediately | ✅ Yes | ❌ Need ads first |

---

## CURRENT KEYWORD VOLUME

**Current:** 89 keywords in 1 group
- 196 clicks (but 0 conversions)
- All Broad match (not optimized)
- 15 performers, 74 dead weight

**After optimization:** 50-60 keywords in 1 group
- Higher intent (EXACT + PHRASE)
- Better Quality Score
- Less management burden

**This is ideal for 1 ad group** ✅

---

## MY RECOMMENDATION

### Go with: KEEP 1 AD GROUP

**Why:**
1. You're currently using 1 group successfully
2. Minimal setup change needed
3. Faster to implement (20 min vs 45 min)
4. Can still organize keywords conceptually
5. Quality Score will improve from better keywords
6. Can always split into 5 groups later if needed

**Implementation steps:**
```
Week 1:
1. Remove 66 non-performing keywords (Group 184381474250)
2. Add 35 new high-intent keywords (same group)
3. Update 15 existing keywords (same group)
4. Add 17 negative keywords (campaign level)

Result: 1 optimized ad group with 50-60 keywords
Expected CPA improvement: $32 → $18-24
```

**Future option (Week 3-4):**
```
If performance is good AND you create course-specific landing pages:
- Split into 5 ad groups
- Create custom ad copy per course
- Expected further CPA improvement: $18-24 → $14-16
```

---

## SIMPLIFIED INSTRUCTION

**For Google Ads implementation:**

Instead of organizing in separate ad groups, just:
1. Open Group 184381474250
2. Remove the 66 bad keywords
3. Add the 35 new keywords
4. **Note:** Keywords are organized logically by course in my list, but you're adding them all to the same group

**That's it!** 20 minutes total, and you're done.

---

## ACTION ITEMS

- [ ] Confirm: Keep 1 ad group (184381474250)?
- [ ] Start: Delete 66 non-performing keywords
- [ ] Next: Add 35 new keywords from copy-paste list
- [ ] Final: Add 17 negative keywords at campaign level

**Group to use:** 184381474250 (your existing group)
**Time required:** ~20 minutes
**Expected improvement:** $32 CPA → $18-24 CPA in 1-2 weeks
