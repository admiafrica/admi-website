# CMS Course Categorization Fixes Required

## Issue

Certificate courses are appearing under the "Diploma Certificate" section when they should be properly categorized.

## Required CMS Changes in Contentful

### Courses to Recategorize:

#### 1. Digital Content Creation Certificate

- **Current programType**: `Diploma Certificate` ❌
- **Required programType**: `Professional Certificate` ✅
- **Action**: Change the programType field in Contentful from "Diploma Certificate" to "Professional Certificate"

#### 2. Video Production Certificate (Professional)

- **Current programType**: `Certificate` ❌
- **Required programType**: `Professional Certificate` ✅
- **Action**: Change the programType field in Contentful from "Certificate" to "Professional Certificate"

#### 3. Video Game Development Certificate (Rubika)

- **Current programType**: `Diploma Certificate` ❌
- **Required**: Create new programType OR move to existing Rubika category
- **Action**: Either:
  - Option A: Create new programType "Video Game Development (Rubika)"
  - Option B: Change programType to existing "2D Animation Certificate (Rubika)" and rename that to "Rubika Programs"

## Correct Final Categorization Should Be:

### Foundation Certificates (✅ Correct)

- Multimedia Certificate
- Photography Certificate
- Music Production and Sound Engineering Certificate
- Drawing Fundamentals Certificate

### Professional Certificates (✅ Correct + Moves)

- Graphic Design Certificate
- Digital Marketing Certificate
- Data Analysis and Visualization Certificate
- Sports Business Certificate
- **Video Production Certificate** ← Move from "Certificate"
- **Digital Content Creation Certificate** ← Move from "Diploma Certificate"

### Diploma Certificates (✅ Correct)

- Music Production Diploma
- Animation & Motion Graphics Diploma
- Entertainment Business Diploma
- Film and Television Production Diploma
- Graphic Design Diploma
- Sound Engineering Diploma

### Rubika Programs (New Section)

- 2D Animation Certificate (Rubika)
- **Video Game Development Certificate (Rubika)** ← Move from "Diploma Certificate"

## Technical Implementation Status

✅ **Frontend fix applied** - Courses now display in correct categories via code mapping
⏳ **CMS changes needed** - Permanent fix requires the above Contentful updates

## Priority

🔴 **High** - This affects user experience and course discovery on the website

## Next Steps

1. Make the above programType changes in Contentful CMS
2. Test changes in staging environment
3. Remove frontend mapping code once CMS is corrected
4. Deploy to production
