import { useState, useEffect, useCallback } from 'react'
import {
  CourseHeroV2,
  QuickFactsBar,
  CourseTabNav,
  AboutCourse,
  CourseLeader,
  IndustryQuote,
  WhyThisCourse,
  DegreeRoute,
  CurriculumOverview,
  PaymentPlan,
  ImpactStats,
  StudentTestimonials,
  ApplicationSteps,
  FAQAccordion,
  CareerOutcomes,
  ProgramDetails,
  MentorsGrid,
  AssessmentBreakdown,
  EquipmentFacilities,
  StudentPortfolio,
  StudentsInAction,
  AlumniStories,
  IndustryPartners,
  IndustryTrends,
  RelatedResources,
  FinalCTA,
  TrustBadges
} from '@/components/course/sections'
import HybridModelSection from '@/components/course/sections/HybridModelSection'
import DiplomaExclusiveSection from '@/components/course/sections/DiplomaExclusiveSection'
import InternshipProgram from '@/components/course/sections/InternshipProgram'
import IndustryValidation from '@/components/course/sections/IndustryValidation'
import MidPageCTA from '@/components/course/sections/MidPageCTA'
import StickyCourseCTA from '@/components/course/sections/StickyCourseCTA'
import { filmProductionData } from '@/data/course-page-data'
import { getDiplomaData } from '@/data/diploma-course-data'
import { getPlainTextFromRichText, ensureProtocol } from '@/utils'
import { getCoursePricing } from '@/utils/course-pricing'

type Props = {
  course: any
  courseAssets: any[]
  slug: string
  courseArticles?: any[]
}

// Sections that fetch from CMS
type CMSSectionKey =
  | 'testimonials'
  | 'mentors'
  | 'facilities'
  | 'leader'
  | 'industryQuote'
  | 'benefits'
  | 'semesters'
  | 'paymentPlans'
  | 'careers'
  | 'alumni'

type CMSSections = Partial<Record<CMSSectionKey, any[]>>

function useCMSSections(slug: string) {
  const [sections, setSections] = useState<CMSSections>({})
  const [loading, setLoading] = useState(true)

  const fetchSection = useCallback(
    async (section: CMSSectionKey) => {
      try {
        const res = await fetch(`/api/v3/course-sections?slug=${slug}&section=${section}`)
        if (res.ok) {
          const data = await res.json()
          return { section, items: data.items || [] }
        }
      } catch (error) {
        console.error(`Error fetching ${section}:`, error)
      }
      return { section, items: [] }
    },
    [slug]
  )

  useEffect(() => {
    if (!slug) return

    const sectionKeys: CMSSectionKey[] = [
      'testimonials',
      'mentors',
      'facilities',
      'leader',
      'industryQuote',
      'benefits',
      'semesters',
      'paymentPlans',
      'careers',
      'alumni'
    ]

    Promise.all(sectionKeys.map(fetchSection)).then((results) => {
      const sectionData: CMSSections = {}
      results.forEach(({ section, items }) => {
        if (items.length > 0) {
          sectionData[section] = items
        }
      })
      setSections(sectionData)
      setLoading(false)
    })
  }, [slug, fetchSection])

  return { sections, loading }
}

function useCMSFAQs(slug: string) {
  const [faqs, setFaqs] = useState<any[]>([])

  useEffect(() => {
    if (!slug) return

    fetch(`/api/v3/course-faqs?slug=${slug}`)
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data) => {
        if (data.items?.length > 0) {
          setFaqs(
            data.items.map((faq: any) => ({
              question: typeof faq.fields.question === 'string' ? faq.fields.question : '',
              answer: typeof faq.fields.answer === 'string' 
                ? faq.fields.answer 
                : getPlainTextFromRichText(faq.fields.answer) || ''
            }))
          )
        }
      })
      .catch(() => {})
  }, [slug])

  return faqs
}

// Build quick facts dynamically from CMS course data
function buildQuickFacts(course: any, slug: string) {
  const facts: { label: string; value: string }[] = []

  const duration = course.programType?.fields?.duration
  if (duration) {
    facts.push({ label: 'Duration', value: duration })
  }

  if (course.awardLevel) {
    facts.push({ label: 'Award Level', value: course.awardLevel })
  }

  if (course.intakeMonths) {
    facts.push({ label: 'Intakes', value: course.intakeMonths })
  }

  const deliveryMode = course.programType?.fields?.deliveryMode
  if (deliveryMode) {
    facts.push({ label: 'Delivery', value: deliveryMode })
  }

  if (course.tuitionFees) {
    facts.push({ label: 'Per Semester', value: course.tuitionFees })
  } else {
    const pricing = getCoursePricing(slug, course.awardLevel)
    if (pricing) {
      const formatted =
        pricing.currency === 'KES'
          ? `${Math.round(pricing.price / 1000)}K KES`
          : `${pricing.currency} ${pricing.price.toLocaleString()}`
      facts.push({ label: 'Per Semester', value: formatted })
    }
  }

  if (facts.length >= 3) {
    return facts
  }

  return filmProductionData.quickFacts
}

// Extract list items from Contentful rich text
function extractListFromRichText(richText: any): string[] {
  if (!richText?.content) return []
  return richText.content
    .map((block: any) => block.content?.map((content: any) => content.value).join(' '))
    .filter(Boolean)
}

export default function CoursePageLayout({ course, slug, courseArticles = [] }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'deep-dive'>('overview')
  const { sections } = useCMSSections(slug)
  const cmsFaqs = useCMSFAQs(slug)

  const renderRichText = (richText: any) => {
    if (!richText) return null
    if (typeof richText === 'string') return <p>{richText}</p>
    if (richText.content) {
      const allText = richText.content
        .filter((block: any) => block.nodeType === 'paragraph')
        .map((block: any) => block.content.map((span: any) => span.value).join(''))
        .join(' ')
      return allText ? <p>{allText}</p> : null
    }
    return null
  }

  const safeString = (val: any) => (typeof val === 'string' ? val : '')

  const safeProgramType = (pt: any) => {
    if (pt && pt.fields) return pt
    return undefined
  }

  // Hero subtitle: prefer CMS subtitle, fall back to description excerpt
  const heroSubtitle = course.subtitle || getPlainTextFromRichText(course.description, 200) || undefined

  // Quick facts from CMS fields
  const quickFacts = buildQuickFacts(course, slug)

  // Learning outcomes from CMS
  const cmsLearningOutcomes = extractListFromRichText(course.learningOutcomes)
  const learningOutcomes = cmsLearningOutcomes.length > 0 ? cmsLearningOutcomes : filmProductionData.learningOutcomes

  // Career options from CMS rich text
  const cmsCareerOptions = extractListFromRichText(course.careerOptions)

  // FAQs: prefer CMS, fall back to static
  const faqData = cmsFaqs.length > 0 ? cmsFaqs : filmProductionData.faqs

  // Check if this is a diploma course (Level 6 = Diploma, or name/slug contains "diploma")
  const isDiploma = 
    course.awardLevel?.toLowerCase() === 'level 6' || 
    course.name?.toLowerCase().includes('diploma') ||
    slug?.toLowerCase().includes('diploma')

  // Get diploma-specific data from mock data file
  const diplomaData = isDiploma ? getDiplomaData(slug) : null

  // Career stats (shared defaults)
  const careerStats = [
    { value: '85%', label: 'Employment Rate' },
    { value: '75K', label: 'Avg Starting Salary (KES/mo)' },
    { value: '500+', label: 'Employer Partners' }
  ]

  // --- CMS section data mappings ---
  // Each maps CMS entries to the props shape the component expects.
  // If no CMS data, we pass empty arrays / null so the component returns null.

  const testimonials = (sections.testimonials || []).map((t: any) => ({
    name: t.fields.name,
    role: t.fields.role,
    quote: typeof t.fields.quote === 'string' ? t.fields.quote : getPlainTextFromRichText(t.fields.quote) || '',
    program: safeString(course.name),
    type: (t.fields.role?.toLowerCase().includes('current') ? 'current' : 'alumni') as 'current' | 'alumni'
  }))

  const mentors = (sections.mentors || []).map((m: any) => ({
    name: m.fields.name,
    role: m.fields.role,
    specialization: m.fields.company,
    image: m.fields.image?.fields?.file?.url ? ensureProtocol(m.fields.image.fields.file.url) : ''
  }))

  const facilities = (sections.facilities || []).map((f: any) => ({
    title: f.fields.name,
    description: typeof f.fields.description === 'string' ? f.fields.description : getPlainTextFromRichText(f.fields.description) || '',
    image: f.fields.image?.fields?.file?.url ? ensureProtocol(f.fields.image.fields.file.url) : ''
  }))

  const leader = sections.leader?.[0]
    ? {
        name: sections.leader[0].fields.name,
        title: sections.leader[0].fields.role,
        bio: typeof sections.leader[0].fields.bio === 'string' ? sections.leader[0].fields.bio : getPlainTextFromRichText(sections.leader[0].fields.bio) || '',
        quote: typeof sections.leader[0].fields.quote === 'string' ? sections.leader[0].fields.quote : getPlainTextFromRichText(sections.leader[0].fields.quote) || '',
        image: sections.leader[0].fields.image?.fields?.file?.url
          ? ensureProtocol(sections.leader[0].fields.image.fields.file.url)
          : ''
      }
    : { name: '', title: '', bio: '', quote: '', image: '' }

  const industryQuote = sections.industryQuote?.[0]
    ? {
        quote: typeof sections.industryQuote[0].fields.quote === 'string' ? sections.industryQuote[0].fields.quote : getPlainTextFromRichText(sections.industryQuote[0].fields.quote) || '',
        author: sections.industryQuote[0].fields.author,
        role: `${sections.industryQuote[0].fields.role}, ${sections.industryQuote[0].fields.company}`
      }
    : { quote: '', author: '', role: '' }

  const benefits = (sections.benefits || []).map((b: any) => ({
    title: b.fields.title,
    description: typeof b.fields.description === 'string' ? b.fields.description : getPlainTextFromRichText(b.fields.description) || '',
    icon: b.fields.icon
  }))

  const semesters = (sections.semesters || []).map((s: any) => ({
    title: s.fields.title,
    modules: s.fields.modules || [],
    number: s.fields.semesterNumber
  }))

  const paymentInstallments = (sections.paymentPlans || []).map((p: any) => ({
    label: p.fields.title,
    percentage: p.fields.period,
    amount: p.fields.price,
    description: (p.fields.details || [])[0] || ''
  }))

  // Careers: CMS sections.careers > diplomaData.careers > cmsCareerOptions fallback
  const cmsCareers = (sections.careers || []).map((c: any) => ({
    title: c.fields.title,
    description: typeof c.fields.description === 'string' ? c.fields.description : getPlainTextFromRichText(c.fields.description) || ''
  }))
  const careers =
    cmsCareers.length > 0
      ? cmsCareers
      : diplomaData?.careers && diplomaData.careers.length > 0
        ? diplomaData.careers
        : cmsCareerOptions.map((opt) => ({ title: opt, description: '' }))

  const alumni = (sections.alumni || []).map((a: any) => ({
    name: a.fields.name,
    role: a.fields.role,
    company: a.fields.company,
    story: typeof a.fields.story === 'string' ? a.fields.story : getPlainTextFromRichText(a.fields.story) || '',
    imageUrl: a.fields.image?.fields?.file?.url
      ? ensureProtocol(a.fields.image.fields.file.url)
      : '/placeholder/alumni.jpg',
    graduationYear: a.fields.graduationYear
  }))

  return (
    <>
      <CourseHeroV2
        name={safeString(course.name)}
        coverImage={course.coverImage}
        programType={safeProgramType(course.programType)}
        awardLevel={safeString(course.awardLevel)}
        duration={course.programType?.fields?.duration}
        slug={slug}
        subtitle={heroSubtitle}
      />

      <QuickFactsBar facts={quickFacts} />

      <CourseTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="overflow-x-hidden bg-white">
        {activeTab === 'overview' && (
          <div className="animate-fade-in-up">
            {/* AboutCourse: always visible, uses CMS aboutTheCourse rich text */}
            <AboutCourse description={renderRichText(course.aboutTheCourse)} />

            {/* CareerOutcomes: show early to demonstrate value */}
            <CareerOutcomes careers={careers} stats={careerStats} />

            {/* Diploma-specific sections: Hybrid Model, Exclusives, Industry Validation */}
            {isDiploma && <HybridModelSection steps={diplomaData?.hybridSteps} testimonial={diplomaData?.hybridTestimonial} />}
            {isDiploma && <DiplomaExclusiveSection courseName={safeString(course.name)} exclusives={diplomaData?.diplomaExclusives} />}
            {isDiploma && <IndustryValidation quotes={diplomaData?.industryQuotes} companies={diplomaData?.hiringCompanies} />}

            {/* ApplicationSteps: show ease of application early */}
            <ApplicationSteps steps={filmProductionData.applicationSteps} />

            {/* PaymentPlan: show affordability */}
            <PaymentPlan
              plan={{
                installments: paymentInstallments,
                totalPerSemester:
                  'Semester fees: KES 68,000 – 145,000 depending on program. Pay upfront and receive a 10% discount',
                discountMessage:
                  "Pay your full semester upfront and save 10% — that's KES 90,000 instead of KES 100,000"
              }}
            />

            {/* StudentTestimonials: social proof BEFORE lead capture */}
            <StudentTestimonials testimonials={testimonials} />

            {/* MidPageCTA: capture mid-funnel leads with simplified form */}
            <MidPageCTA courseName={safeString(course.name)} courseSlug={slug} />

            {/* TrustBadges: reinforce credibility after form */}
            <TrustBadges />

            {/* ImpactStats: reinforce decision after form */}
            <ImpactStats stats={filmProductionData.impactStats} />

            {/* CurriculumOverview: what you'll learn */}
            <CurriculumOverview semesters={semesters} />

            {/* CourseLeader: hidden when no CMS data (component returns null) */}
            <CourseLeader leader={leader} />

            {/* IndustryQuote: hidden when no CMS data (component returns null) */}
            <IndustryQuote quote={industryQuote.quote} author={industryQuote.author} role={industryQuote.role} />

            {/* WhyThisCourse / Benefits: hidden when no CMS data */}
            <WhyThisCourse benefits={benefits} />

            {/* InternshipProgram: 5th semester value - for diplomas */}
            {isDiploma && <InternshipProgram stats={diplomaData?.internshipStats} steps={diplomaData?.internshipSteps} partners={diplomaData?.internshipPartners} stories={diplomaData?.internshipStories} />}

            {/* DegreeRoute: pathway to degree */}
            <DegreeRoute
              steps={filmProductionData.degreeSteps.map((step) => ({
                step: step.step,
                title: step.title,
                subtitle: step.description,
                color: step.step === 1 ? '#C1272D' : step.step === 2 ? '#171717' : '#8EBFB0'
              }))}
            />

            {/* FAQAccordion: CMS FAQs preferred, falls back to static data */}
            <FAQAccordion faqs={faqData} courseName={safeString(course.name)} />
          </div>
        )}

        {activeTab === 'deep-dive' && (
          <div className="animate-fade-in-up">
            {/* ProgramDetails: CMS or diploma data or fallback */}
            <ProgramDetails 
              details={diplomaData?.programDetails || filmProductionData.programDetails} 
              learningOutcomes={learningOutcomes.length > 0 ? learningOutcomes : (diplomaData?.learningOutcomes || [])} 
            />

            {/* MentorsGrid: CMS mentors or diploma data fallback */}
            <MentorsGrid 
              mentors={mentors.length > 0 ? mentors : (diplomaData?.mentors || []).map(m => ({
                name: m.name,
                role: m.role,
                specialization: m.company,
                image: m.imageUrl as string
              }))} 
            />

            {/* AssessmentBreakdown: diploma data or static fallback */}
            <AssessmentBreakdown
              methods={
                (diplomaData?.assessmentMethods || filmProductionData.assessmentMethods).map((a) => ({
                  title: a.method,
                  percentage: `${a.percentage}%`,
                  description: a.description
                }))
              }
            />

            {/* EquipmentFacilities: CMS facilities or diploma data fallback */}
            <EquipmentFacilities 
              facilities={facilities.length > 0 ? facilities : (diplomaData?.facilities || []).map(f => ({
                title: f.name,
                description: f.description,
                image: f.imageUrl as string
              }))} 
            />

            {/* StudentPortfolio: diploma data */}
            <StudentPortfolio items={diplomaData?.portfolioItems || []} />

            {/* StudentsInAction: diploma data with field mapping */}
            <StudentsInAction 
              photos={(diplomaData?.activityPhotos || []).map(p => ({
                caption: p.caption,
                image: p.imageUrl as string,
                videoUrl: p.videoUrl,
                aspectRatio: p.aspectRatio
              }))} 
            />

            {/* AlumniStories: CMS alumni or diploma data fallback */}
            <AlumniStories stories={alumni.length > 0 ? alumni : (diplomaData?.alumniStories || [])} />

            {/* IndustryPartners: diploma data with field mapping */}
            <IndustryPartners 
              partners={(diplomaData?.industryPartners || []).map(p => ({
                name: p.name,
                type: 'Industry Partner'
              }))} 
            />

            {/* IndustryTrends: diploma data */}
            <IndustryTrends trends={diplomaData?.industryTrends || []} />

            {/* RelatedResources: use courseArticles from CMS (already resolved by API) */}
            <RelatedResources 
              courseName={safeString(course.name)}
              resources={(courseArticles || []).slice(0, 6).map((article: any) => ({
                category: article.topic || article.category || 'Blog',
                title: article.title || '',
                description: article.summary || '',
                link: `/blog/${article.slug || ''}`,
                image: article.coverImage || ''
              }))} 
            />
          </div>
        )}
      </div>

      {/* FinalCTA: always visible */}
      <FinalCTA courseName={safeString(course.name)} />

      {/* StickyCourseCTA: appears on scroll with urgency messaging */}
      <StickyCourseCTA courseName={safeString(course.name)} courseSlug={slug} />
    </>
  )
}
