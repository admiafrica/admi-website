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
  FinalCTA
} from '@/components/course/sections'
import { filmProductionData } from '@/data/course-page-data'
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
              question: faq.fields.question,
              answer: faq.fields.answer
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

export default function CoursePageLayout({ course, slug }: Props) {
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
    quote: t.fields.quote,
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
    description: f.fields.description,
    image: f.fields.image?.fields?.file?.url ? ensureProtocol(f.fields.image.fields.file.url) : ''
  }))

  const leader = sections.leader?.[0]
    ? {
        name: sections.leader[0].fields.name,
        title: sections.leader[0].fields.role,
        bio: sections.leader[0].fields.bio,
        quote: sections.leader[0].fields.quote,
        image: sections.leader[0].fields.image?.fields?.file?.url
          ? ensureProtocol(sections.leader[0].fields.image.fields.file.url)
          : ''
      }
    : { name: '', title: '', bio: '', quote: '', image: '' }

  const industryQuote = sections.industryQuote?.[0]
    ? {
        quote: sections.industryQuote[0].fields.quote,
        author: sections.industryQuote[0].fields.author,
        role: `${sections.industryQuote[0].fields.role}, ${sections.industryQuote[0].fields.company}`
      }
    : { quote: '', author: '', role: '' }

  const benefits = (sections.benefits || []).map((b: any) => ({
    title: b.fields.title,
    description: b.fields.description,
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

  const careers =
    (sections.careers || []).length > 0
      ? (sections.careers || []).map((c: any) => ({
          title: c.fields.title,
          description: c.fields.description
        }))
      : cmsCareerOptions.map((opt) => ({ title: opt, description: '' }))

  const alumni = (sections.alumni || []).map((a: any) => ({
    name: a.fields.name,
    role: a.fields.role,
    company: a.fields.company,
    story: a.fields.story,
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

      <div className="bg-white">
        {activeTab === 'overview' && (
          <div className="animate-fade-in-up">
            {/* AboutCourse: always visible, uses CMS aboutTheCourse rich text */}
            <AboutCourse description={renderRichText(course.aboutTheCourse)} />

            {/* CourseLeader: hidden when no CMS data (component returns null) */}
            <CourseLeader leader={leader} />

            {/* IndustryQuote: hidden when no CMS data (component returns null) */}
            <IndustryQuote quote={industryQuote.quote} author={industryQuote.author} role={industryQuote.role} />

            {/* WhyThisCourse / Benefits: hidden when no CMS data */}
            <WhyThisCourse benefits={benefits} />

            {/* DegreeRoute: always visible (shared pathway for all courses) */}
            <DegreeRoute
              steps={filmProductionData.degreeSteps.map((step) => ({
                step: step.step,
                title: step.title,
                subtitle: step.description,
                color: step.step === 1 ? '#BA2E36' : step.step === 2 ? '#171717' : '#08F6CF'
              }))}
            />

            {/* CurriculumOverview: hidden when no CMS semesters */}
            <CurriculumOverview semesters={semesters} />

            {/* PaymentPlan: hidden when no CMS payment plans */}
            <PaymentPlan
              plan={{
                installments: paymentInstallments,
                totalPerSemester:
                  'Semester fees: KES 68,000 – 145,000 depending on program. Pay upfront and receive a 10% discount',
                discountMessage:
                  "Pay your full semester upfront and save 10% — that's KES 90,000 instead of KES 100,000"
              }}
            />

            {/* ImpactStats: always visible (ADMI-wide stats) */}
            <ImpactStats stats={filmProductionData.impactStats} />

            {/* StudentTestimonials: hidden when no CMS testimonials */}
            <StudentTestimonials testimonials={testimonials} />

            {/* ApplicationSteps: always visible (same process for all courses) */}
            <ApplicationSteps steps={filmProductionData.applicationSteps} />

            {/* FAQAccordion: CMS FAQs preferred, falls back to static data */}
            <FAQAccordion faqs={faqData} />

            {/* CareerOutcomes: hidden when no CMS careers or careerOptions */}
            <CareerOutcomes careers={careers} stats={careerStats} />
          </div>
        )}

        {activeTab === 'deep-dive' && (
          <div className="animate-fade-in-up">
            {/* ProgramDetails: always visible with CMS learning outcomes or fallback */}
            <ProgramDetails details={filmProductionData.programDetails} learningOutcomes={learningOutcomes} />

            {/* MentorsGrid: hidden when no CMS mentors */}
            <MentorsGrid mentors={mentors} />

            {/* AssessmentBreakdown: hidden when no CMS data (uses static methods shape) */}
            <AssessmentBreakdown
              methods={
                semesters.length > 0
                  ? filmProductionData.assessmentMethods.map((a) => ({
                      title: a.method,
                      percentage: `${a.percentage}%`,
                      description: a.description
                    }))
                  : []
              }
            />

            {/* EquipmentFacilities: hidden when no CMS facilities */}
            <EquipmentFacilities facilities={facilities} />

            {/* StudentPortfolio: hidden when no CMS portfolio items */}
            <StudentPortfolio items={[]} />

            {/* StudentsInAction: hidden when no CMS photos */}
            <StudentsInAction photos={[]} />

            {/* AlumniStories: hidden when no CMS alumni */}
            <AlumniStories stories={alumni} />

            {/* IndustryPartners: hidden when no CMS partners */}
            <IndustryPartners partners={[]} />

            {/* IndustryTrends: hidden when no CMS trends */}
            <IndustryTrends trends={[]} />

            {/* RelatedResources: hidden when no CMS resources */}
            <RelatedResources resources={[]} />
          </div>
        )}
      </div>

      {/* FinalCTA: always visible */}
      <FinalCTA courseName={safeString(course.name)} />
    </>
  )
}
