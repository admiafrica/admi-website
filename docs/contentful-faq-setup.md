# Contentful FAQ System Setup Guide

## Overview
This guide explains how to set up and manage course-specific FAQs through Contentful CMS to ensure each course displays only relevant FAQ content.

## Content Type Setup in Contentful

### 1. Create "Course FAQ" Content Type

**Content Type ID:** `courseFaq`

**Fields:**

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| Question | `question` | Short text | Yes | The FAQ question (max 255 characters) |
| Answer | `answer` | Long text | Yes | The detailed answer (supports rich text) |
| Category | `category` | Short text | Yes | FAQ category for grouping |
| Course Reference | `course` | Reference | Yes | Link to specific Course content type |
| Display Order | `displayOrder` | Number | No | Order for FAQ display (default: 0) |

**Available Categories:**
- General Information
- Admission Requirements
- Course Content & Structure
- Career Prospects
- Fees & Payment
- Accreditation & Recognition
- Student Support
- Technology Requirements
- International Students
- Graduate Outcomes

### 2. Update Course Content Type

Add a new field to the existing Course content type:

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| FAQs | `faqs` | References (many) | No | Links to Course FAQ entries |

**Reference Settings:**
- Content type: Course FAQ
- Allow multiple entries: Yes
- Appearance: References

## Content Management Workflow

### Creating Course-Specific FAQs

1. **Navigate to Content** in Contentful
2. **Click "Add entry"** and select "Course FAQ"
3. **Fill in the fields:**
   - **Question:** Write a clear, specific question
   - **Answer:** Provide a comprehensive answer
   - **Category:** Select appropriate category
   - **Course Reference:** Link to the specific course
   - **Display Order:** Set order (lower numbers appear first)
4. **Publish the entry**

### Linking FAQs to Courses

1. **Open the Course entry** you want to add FAQs to
2. **Find the "FAQs" field**
3. **Click "Link existing entries"**
4. **Select the relevant FAQ entries**
5. **Arrange them in desired order**
6. **Save and publish**

## Best Practices

### FAQ Content Guidelines

**Questions should be:**
- Specific to the course
- Clear and concise
- Written from student perspective
- Commonly asked by prospective students

**Answers should be:**
- Comprehensive but concise
- Accurate and up-to-date
- Include specific details (dates, fees, requirements)
- Use friendly, professional tone

### Category Usage

**General Information:**
- Course duration, format, schedule
- Recognition and accreditation
- General course overview

**Admission Requirements:**
- Entry requirements
- Application process
- Prerequisites
- Portfolio requirements

**Course Content & Structure:**
- Curriculum details
- Learning outcomes
- Assessment methods
- Practical components

**Career Prospects:**
- Job opportunities
- Industry connections
- Graduate outcomes
- Salary expectations

**Fees & Payment:**
- Tuition costs
- Payment plans
- Scholarships
- Additional costs

### Display Order Guidelines

Use these ranges for consistent ordering:

- **1-10:** Most important/frequently asked questions
- **11-20:** Course-specific content questions
- **21-30:** Administrative questions
- **31-40:** Technical requirements
- **41-50:** Less common questions

## Technical Implementation

### API Endpoints

The system uses these API endpoints:

- `GET /api/v3/course-faqs?slug={courseSlug}` - Get FAQs for specific course
- `GET /api/v3/course-faqs?courseId={courseId}` - Get FAQs by course ID
- `GET /api/v3/course-faqs` - Get all FAQs

### Fallback System

If no course-specific FAQs exist:
1. System checks for general FAQs linked to the course
2. Falls back to hardcoded general diploma FAQs
3. Shows appropriate message to users

### SEO Integration

Course FAQs automatically generate:
- FAQ schema markup for rich snippets
- Enhanced search visibility
- Improved page relevance

## Troubleshooting

### FAQs Not Displaying

**Check:**
1. FAQ entries are published in Contentful
2. Course reference is correctly set
3. Course has FAQs linked in the FAQs field
4. API endpoint is accessible

### Wrong FAQs Showing

**Verify:**
1. Course reference in FAQ entry
2. FAQ is linked to correct course
3. No duplicate FAQ entries
4. Display order is set correctly

### SEO Schema Issues

**Ensure:**
1. Question and answer fields are not empty
2. Content is properly formatted
3. No special characters causing JSON issues
4. FAQ entries are published

## Content Migration

### From Hardcoded to CMS

1. **Identify existing hardcoded FAQs** for each course
2. **Create Course FAQ entries** in Contentful
3. **Link FAQs to appropriate courses**
4. **Test display on course pages**
5. **Verify SEO schema generation**

### Quality Assurance

Before going live:
- [ ] All course-specific FAQs created
- [ ] FAQs properly categorized
- [ ] Display order set appropriately
- [ ] All FAQ entries published
- [ ] Course pages display correct FAQs
- [ ] SEO schema validates correctly
- [ ] Fallback system works for courses without FAQs

## Support

For technical issues with the FAQ system, contact the development team.
For content management questions, refer to Contentful documentation or contact the content team.
