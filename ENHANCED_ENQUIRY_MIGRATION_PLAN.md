# Enhanced Enquiry Form Migration Plan

## Overview

Replace the basic `EnquiryForm` with the new `EnhancedEnquiryForm` that includes pre-qualification scoring and multi-step experience.

**Current State:**

- `/enquiry` page uses basic `EnquiryForm` component
- `/test-enhanced-enquiry` page showcases new `EnhancedEnquiryForm` component
- Test page has full layout with background decorations

**Target State:**

- `/enquiry` page uses enhanced form with new features
- Test page becomes reference/archived
- All leads captured with pre-qualification scoring

---

## Detailed Comparison

### Current Form (`EnquiryForm`)

**Fields:** Basic (5 fields)

- Email, First Name, Last Name, Phone, Course Name
- UTM tracking (5 params)

**Features:**

- Single-page form
- Basic validation
- Simple Brevo CRM integration (`/api/v3/push-lead`)
- Duplicate detection
- Basic error handling

**Data Flow:**

```
User fills form → Validation → POST /api/v3/push-lead → Brevo
```

---

### Enhanced Form (`EnhancedEnquiryForm`)

**Fields:** Pre-qualification (10 fields)

- Contact: Email, First Name, Last Name, Phone
- Course Selection: Course Name
- Pre-Qualification (6 fields):
  - Study Timeline (January/May/September/Researching)
  - Program Type (Full-time Diploma/Certificate/Weekend)
  - Investment Range (Under 100K to 500K+)
  - Career Goals (Career change/Skill upgrade/Personal interest/etc)
  - Experience Level (Beginner to Professional upgrade)
  - One additional field (TBD)
- UTM tracking (5 params)

**Features:**

- Multi-step form (Stepper component)
- Advanced validation per step
- **Lead Scoring Algorithm (0-20 points)**
- Pre-qualification questions
- Enhanced Brevo integration with:
  - Deal creation in appropriate pipeline
  - Hot lead email notifications
  - Lead categorization (Hot/Warm/Cold/Unqualified)
- UTM parameter tracking
- Better error handling and alerts

**Lead Scoring Breakdown:**

- Timeline: 0-5 points (January=5, May=4, September=3, Researching=1)
- Program Type: 0-4 points (Full-time Diploma=4, Certificate=3, Foundation=2, Weekend=1)
- Investment: 0-4 points (500K+=4, 300-500K=3, 100-300K=2, Under 100K=1)
- Career Goals: 0-4 points (Career change/Start business=4, Skill upgrade=3, Uni prep=2, Personal=1)
- Experience: 0-3 points (Professional upgrade=3, Intermediate/Some experience=2, Beginner=1)

**Categories:**

- 🔴 Hot Leads (15-20): January/May + Full-time + 300K+ + Career change
- 🟡 Warm Leads (10-14): September + Certificate + 100-300K + Skill upgrade
- 🔵 Cold Leads (5-9): Future + Weekend + Low budget + Personal interest
- ⚪ Unqualified (0-4): Just researching + No commitment

**Data Flow:**

```
Step 1: Basic contact info
    ↓
Step 2: Course selection
    ↓
Step 3: Pre-qualification questions
    ↓
Calculate lead score (0-20)
    ↓
POST /api/v3/push-enhanced-lead
    ↓
Brevo: Create deal in pipeline based on score
    ↓
Send hot lead notifications (if score >= 15)
    ↓
Track UTM parameters
```

---

## Migration Steps

### Phase 1: Preparation (Today)

- [x] Review new form in test page
- [x] Verify API endpoint exists (`/api/v3/push-enhanced-lead`)
- [x] Check Brevo pipeline configuration
- [x] Validate lead scoring algorithm
- [x] Review error handling

### Phase 2: Implementation (1-2 hours)

#### Step 1: Update `/enquiry.tsx` Layout

- Keep existing layout structure (title, background images, icons)
- Update form section to use `EnhancedEnquiryForm` instead of basic `EnquiryForm`
- Optional: Add test banner banner like test page (removable after validation)

**Changes:**

```tsx
// FROM:
import { EnquiryForm } from '@/components/forms'
;<EnquiryForm />

// TO:
import EnhancedEnquiryForm from '@/components/forms/EnhancedEnquiryForm'
;<EnhancedEnquiryForm />
```

#### Step 2: Update Thank You Page (Optional)

- Keep existing thank you page as-is for now
- May need to add personalized thank you messages based on lead score later
- For now: generic "we'll reach out" message works for all scores

#### Step 3: Verify API Endpoints

- Ensure `/api/v3/push-enhanced-lead` exists and works
- Verify Brevo list and pipeline are configured
- Test hot lead email notifications
- Confirm UTM tracking is captured

#### Step 4: Testing Checklist

- [ ] Form validation works on all steps
- [ ] Lead score calculation is correct
- [ ] Data is sent to correct Brevo pipeline
- [ ] Hot leads (15+) trigger email notifications
- [ ] UTM parameters are tracked
- [ ] Duplicate detection works
- [ ] Error messages display properly
- [ ] Mobile responsive design works
- [ ] Phone validation accepts international formats

### Phase 3: Launch (30 mins)

#### Step 1: Update Production Page

```bash
# Replace form in /enquiry page
npm run build
git add -A
git commit -m "feat: replace enquiry form with enhanced pre-qualification form

- Implemented multi-step form with validation
- Added lead scoring algorithm (0-20 points)
- Integrated enhanced Brevo CRM with deal pipeline
- Added hot lead notifications for high-quality leads
- Maintained existing layout and design
- All UTM tracking preserved"

git push origin dev
```

#### Step 2: Verify in Staging

- Test form end-to-end
- Check Brevo dashboard for incoming leads
- Verify score calculations
- Confirm hot lead emails sent

#### Step 3: Merge to Production

```bash
git checkout staging
git merge dev
git push origin staging
```

### Phase 4: Cleanup (After 1 week validation)

- Archive test page (move to `/archive/test-enhanced-enquiry.tsx`)
- Remove test banner if added to main form
- Update documentation
- Monitor Brevo data quality and conversion rates

---

## Risk Assessment

### Low Risk Items

- ✅ Form layout (same structure as test page)
- ✅ Lead scoring logic (already validated in test page)
- ✅ API integration (endpoint exists)

### Medium Risk Items

- ⚠️ Brevo pipeline configuration (needs verification)
- ⚠️ Hot lead email notifications (template/recipient verification)
- ⚠️ Performance (multi-step form has more validations)

### Mitigation

- Keep old form data in test page for fallback
- Set up monitoring on Brevo lead pipeline
- Create support process for manually scoring leads if algorithm fails

---

## Success Metrics

After migration, track:

1. **Form Completion Rate**: % of starts that submit
2. **Lead Score Distribution**: Breakdown of Hot/Warm/Cold/Unqualified
3. **Conversion Rate**: Hot leads to applications (target: 10%+ vs current 0.2%)
4. **Form Drop-off**: Where users abandon multi-step form
5. **Response Time**: Server response time for lead scoring

---

## Rollback Plan

If issues occur:

1. Revert `/enquiry.tsx` to use basic `EnquiryForm`
2. Keep test page running during validation period
3. Switch back to simple form in `/api/v3/push-lead` endpoint
4. Maintain Brevo contact data (no data loss)

**Rollback Command:**

```bash
git revert <commit-hash>
git push origin dev
git push origin staging
```

---

## Files Affected

### Modified

- `/src/pages/enquiry.tsx` - Update form component

### Created (If Needed)

- `/src/pages/enquiry-enhanced-success.tsx` - Optional personalized thank you page

### Existing (No Changes)

- `/src/pages/enquiry-thank-you.tsx` - Current thank you page
- `/src/pages/test-enhanced-enquiry.tsx` - Archived (reference only)
- `/src/components/forms/EnhancedEnquiryForm.tsx` - Already complete
- `/src/api/v3/push-enhanced-lead.ts` - Already exists

---

## Next Steps

1. **Immediate**: Review this plan and approve
2. **Today**: Execute Phase 2 (Implementation)
3. **Tomorrow**: Phase 3 (Launch & Testing)
4. **Week 1**: Monitor metrics
5. **Week 2**: Final cleanup

**Questions:**

- Should we keep test page visible or archive it?
- Do you want a personalized thank you message based on lead score?
- Should hot leads get auto-reply with next steps?
- Any additional pre-qualification fields needed?
