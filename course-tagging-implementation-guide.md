# Course Tagging Implementation Guide

## 🎯 Overview

This guide shows how to implement dynamic course relationships for testimonials, reviews, and portfolios so they can be automatically displayed on relevant course pages.

## 📋 Current Status

### ✅ What Already Exists:

- **Course Content Type** with fields:
  - `studentPortfolio` (links to Student Portfolio entries)
  - `studentReviews` (links to Student Review entries)
- **Testimonial Content Type** (`testimonial`)
- **Student Review Content Type** (`studentReview`)
- **Student Portfolio Content Type** (`studentPortfolio`)

### ❌ What's Missing:

- **Reverse relationships** from testimonials/reviews/portfolios back to courses
- **Dynamic filtering** by course

## 🛠️ Implementation Steps

### Step 1: Update Content Types in Contentful

#### A. Add Fields to Testimonial Content Type:

1. Go to **Contentful → Content Model → Testimonial**
2. Click **Add Field**
3. Add these fields:

```
Field Name: Related Courses
Field ID: relatedCourses
Type: References (multiple entries)
→ Link to: Course
→ Required: No
→ Help text: "Select which courses this testimonial relates to"

Field Name: Course Category
Field ID: courseCategory
Type: Short text
→ Required: No
→ Help text: "E.g., design, film, music, tech"
```

#### B. Add Fields to Student Review Content Type:

1. Go to **Contentful → Content Model → Student Review**
2. Add these fields:

```
Field Name: Related Courses
Field ID: relatedCourses
Type: References (multiple entries)
→ Link to: Course
→ Required: No

Field Name: Graduation Year
Field ID: graduationYear
Type: Date and time
→ Required: No
→ Help text: "When did they complete the course?"
```

#### C. Add Fields to Student Portfolio Content Type:

1. Go to **Contentful → Content Model → Student Portfolio**
2. Add these fields:

```
Field Name: Related Courses
Field ID: relatedCourses
Type: References (multiple entries)
→ Link to: Course
→ Required: No

Field Name: Project Type
Field ID: projectType
Type: Short text
→ Required: No
→ Help text: "E.g., Final Project, Capstone, Personal Work"
```

### Step 2: Update Existing Content

1. **Go through existing entries** in each content type
2. **Tag them with relevant courses** using the new `relatedCourses` field
3. **Add graduation years** for student reviews
4. **Categorize projects** for portfolios

### Step 3: Implement Dynamic Fetching

The code files have been created for you:

- ✅ `src/utils/course-content-fetcher.ts` - Utility functions
- ✅ `src/hooks/useCourseContent.ts` - React hooks
- ✅ `src/components/course/DynamicCourseContent.tsx` - Display component

### Step 4: Add to Course Pages

Update your course page component (e.g., `src/pages/courses/[slug].tsx`):

```tsx
import { DynamicCourseContent } from '@/components/course/DynamicCourseContent'

export default function CoursePage({ course }) {
  return (
    <div>
      {/* Existing course content */}

      {/* Add dynamic course-related content */}
      <DynamicCourseContent courseSlug={course.fields.slug} courseName={course.fields.name} />
    </div>
  )
}
```

## 🚀 Usage Examples

### Basic Usage - All Content Types:

```tsx
import { useCourseContent } from '@/hooks/useCourseContent'

function CoursePage({ courseSlug }) {
  const { content, loading, hasTestimonials, hasReviews, hasPortfolios } = useCourseContent(courseSlug)

  return (
    <div>
      {hasTestimonials && <TestimonialsSection testimonials={content.testimonials} />}
      {hasReviews && <ReviewsSection reviews={content.studentReviews} />}
      {hasPortfolios && <PortfoliosSection portfolios={content.studentPortfolios} />}
    </div>
  )
}
```

### Testimonials Only:

```tsx
import { useCourseTestimonials } from '@/hooks/useCourseContent'

function CourseTestimonials({ courseSlug }) {
  const { testimonials, loading } = useCourseTestimonials(courseSlug, 4)

  if (loading || testimonials.length === 0) return null

  return (
    <section>
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.sys.id} data={testimonial} />
      ))}
    </section>
  )
}
```

### Server-Side Fetching (Next.js):

```tsx
import { getCourseTestimonials } from '@/utils/course-content-fetcher'

export async function getStaticProps({ params }) {
  const testimonials = await getCourseTestimonials(params.slug, 6)

  return {
    props: {
      testimonials
    },
    revalidate: 3600 // Revalidate every hour
  }
}
```

## 📊 Content Admin Workflow

### For Content Admins:

1. **Create testimonial/review/portfolio** as usual
2. **In the "Related Courses" field**, select which courses it relates to
3. **Save and publish** - content will automatically appear on those course pages
4. **No technical knowledge required** - just content management

### Content Organization:

- **General testimonials** → Don't tag with specific courses (appear site-wide)
- **Course-specific testimonials** → Tag with 1-2 relevant courses
- **Multi-course testimonials** → Tag with multiple courses if applicable

## 🎯 Dynamic Display Logic

### Course Page Display Rules:

- **Show testimonials** tagged with this course
- **Show student reviews** from graduates of this course
- **Show portfolios** from students of this course
- **Fallback gracefully** if no content is tagged

### Homepage Display:

- **Recent testimonials** across all courses
- **Featured portfolios** from various programs
- **Top-rated reviews** from recent graduates

## 🔧 Advanced Features

### Filtering by Graduation Year:

```tsx
// Get recent graduates (last 2 years)
const recentGrads = await getCourseStudentReviews(courseSlug, 6)
// Reviews are automatically ordered by graduation year (newest first)
```

### Category-Based Testimonials:

```tsx
// Get all design-related testimonials
const designTestimonials = await getTestimonialsByCategory('design', 8)
```

### Course Comparison:

```tsx
// Compare testimonials across similar courses
const graphicDesignContent = await getAllCourseRelatedContent('graphic-design-diploma')
const webDesignContent = await getAllCourseRelatedContent('web-development-certificate')
```

## 📈 Benefits

### For Marketing:

- **Automated social proof** on every course page
- **Course-specific testimonials** increase conversion
- **Fresh content** without manual updates

### For Content Management:

- **Tag once, display everywhere** relevant
- **Easy content organization** by course relationship
- **No technical updates** required for new content

### For Users:

- **Relevant testimonials** for courses they're interested in
- **Real student outcomes** for each program
- **Social proof** at the decision point

## 🎉 Result

Once implemented, every course page will automatically display:

- ✅ **Testimonials** from graduates of that specific course
- ✅ **Student reviews** with graduation years and detailed feedback
- ✅ **Student portfolios** showcasing work from that program
- ✅ **Dynamic updates** as new content is added to Contentful
- ✅ **Mobile-responsive** display with loading states

Content admins can simply tag testimonials, reviews, and portfolios with related courses, and they'll automatically appear on the relevant course pages!
