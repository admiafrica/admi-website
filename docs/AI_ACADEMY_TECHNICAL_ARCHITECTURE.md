# ADMI AI Academy - Technical Architecture & Application Structure

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 15 App Router                                          │
│  - Student Dashboard        - Course Player                      │
│  - Learning Paths          - Project Workspace                   │
│  - Career Hub              - Community                           │
│  - Admin Portal            - Analytics Dashboard                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER (Next.js)                         │
├─────────────────────────────────────────────────────────────────┤
│  /api/academy/*                                                  │
│  - Authentication          - Course Management                   │
│  - User Progress           - AI Personalization                  │
│  - Payment Processing      - Career Services                     │
│  - Analytics               - Community                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌───────────────────┬──────────────────────┬─────────────────────┐
│   DATA LAYER      │   CONTENT LAYER      │   AI/ML LAYER       │
├───────────────────┼──────────────────────┼─────────────────────┤
│ PostgreSQL/       │ Contentful CMS       │ OpenAI GPT-4        │
│ Supabase          │ - Course Content     │ - Personalization   │
│ - User Data       │ - Learning Modules   │ - Assessment        │
│ - Progress        │ - Projects           │ - Recommendations   │
│ - Transactions    │ - Resources          │ - Career Matching   │
└───────────────────┴──────────────────────┴─────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│ Vercel (Hosting)  │ AWS S3 (Storage)  │ Stripe (Payments)     │
│ SendGrid (Email)  │ Cloudflare (CDN)  │ Google Analytics      │
└─────────────────────────────────────────────────────────────────┘
```

## Application Structure

### Directory Structure

```
admi-website/
├── src/
│   ├── app/
│   │   ├── academy/
│   │   │   ├── page.tsx                    # Academy landing page
│   │   │   ├── layout.tsx                  # Academy layout wrapper
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx                # Student dashboard
│   │   │   │   └── components/
│   │   │   │       ├── ProgressOverview.tsx
│   │   │   │       ├── ActiveCourses.tsx
│   │   │   │       ├── RecommendedContent.tsx
│   │   │   │       └── AchievementsBadges.tsx
│   │   │   ├── paths/
│   │   │   │   ├── page.tsx                # All learning paths
│   │   │   │   ├── [pathId]/
│   │   │   │   │   ├── page.tsx            # Path details
│   │   │   │   │   └── enroll/
│   │   │   │   │       └── page.tsx        # Enrollment flow
│   │   │   │   └── components/
│   │   │   │       ├── PathCard.tsx
│   │   │   │       ├── PathTimeline.tsx
│   │   │   │       └── PathOutcomes.tsx
│   │   │   ├── courses/
│   │   │   │   ├── [courseId]/
│   │   │   │   │   ├── page.tsx            # Course overview
│   │   │   │   │   ├── learn/
│   │   │   │   │   │   ├── page.tsx        # Course player
│   │   │   │   │   │   └── [lessonId]/
│   │   │   │   │   │       └── page.tsx    # Lesson view
│   │   │   │   │   └── assignments/
│   │   │   │   │       ├── page.tsx        # Assignments list
│   │   │   │   │       └── [assignmentId]/
│   │   │   │   │           └── page.tsx    # Assignment details
│   │   │   │   └── components/
│   │   │   │       ├── CoursePlayer.tsx
│   │   │   │       ├── VideoPlayer.tsx
│   │   │   │       ├── LessonNavigation.tsx
│   │   │   │       ├── NotesPanel.tsx
│   │   │   │       └── ProgressTracker.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx                # Projects list
│   │   │   │   ├── [projectId]/
│   │   │   │   │   ├── page.tsx            # Project workspace
│   │   │   │   │   ├── submissions/
│   │   │   │   │   │   └── page.tsx        # Submit project
│   │   │   │   │   └── review/
│   │   │   │   │       └── page.tsx        # Project review
│   │   │   │   └── components/
│   │   │   │       ├── ProjectBrief.tsx
│   │   │   │       ├── FileUploader.tsx
│   │   │   │       ├── ProjectFeedback.tsx
│   │   │   │       └── PortfolioBuilder.tsx
│   │   │   ├── career/
│   │   │   │   ├── page.tsx                # Career hub
│   │   │   │   ├── portfolio/
│   │   │   │   │   ├── page.tsx            # Portfolio builder
│   │   │   │   │   └── [portfolioId]/
│   │   │   │   │       └── page.tsx        # Portfolio view
│   │   │   │   ├── jobs/
│   │   │   │   │   ├── page.tsx            # Job board
│   │   │   │   │   └── [jobId]/
│   │   │   │   │       └── page.tsx        # Job details
│   │   │   │   ├── mentorship/
│   │   │   │   │   └── page.tsx            # Mentor matching
│   │   │   │   └── components/
│   │   │   │       ├── ResumeAnalyzer.tsx
│   │   │   │       ├── JobRecommendations.tsx
│   │   │   │       ├── ApplicationTracker.tsx
│   │   │   │       └── InterviewPrep.tsx
│   │   │   ├── community/
│   │   │   │   ├── page.tsx                # Community home
│   │   │   │   ├── forums/
│   │   │   │   │   ├── page.tsx            # Forums list
│   │   │   │   │   └── [forumId]/
│   │   │   │   │       └── page.tsx        # Forum thread
│   │   │   │   ├── events/
│   │   │   │   │   ├── page.tsx            # Events calendar
│   │   │   │   │   └── [eventId]/
│   │   │   │   │       └── page.tsx        # Event details
│   │   │   │   └── components/
│   │   │   │       ├── DiscussionThread.tsx
│   │   │   │       ├── LiveSession.tsx
│   │   │   │       └── MemberDirectory.tsx
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx                # Admin dashboard
│   │   │   │   ├── courses/
│   │   │   │   │   └── page.tsx            # Course management
│   │   │   │   ├── students/
│   │   │   │   │   └── page.tsx            # Student management
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx            # Analytics dashboard
│   │   │   │   └── components/
│   │   │   │       ├── CourseEditor.tsx
│   │   │   │       ├── StudentTable.tsx
│   │   │   │       └── AnalyticsCharts.tsx
│   │   │   └── components/
│   │   │       ├── AcademyHeader.tsx
│   │   │       ├── AcademySidebar.tsx
│   │   │       ├── AIAssistant.tsx
│   │   │       └── NotificationCenter.tsx
│   │   └── api/
│   │       └── academy/
│   │           ├── auth/
│   │           │   ├── login/route.ts
│   │           │   ├── register/route.ts
│   │           │   └── session/route.ts
│   │           ├── users/
│   │           │   ├── [userId]/route.ts
│   │           │   └── [userId]/
│   │           │       ├── progress/route.ts
│   │           │       ├── certificates/route.ts
│   │           │       └── preferences/route.ts
│   │           ├── courses/
│   │           │   ├── route.ts             # List courses
│   │           │   └── [courseId]/
│   │           │       ├── route.ts         # Course details
│   │           │       ├── enroll/route.ts
│   │           │       ├── lessons/route.ts
│   │           │       └── progress/route.ts
│   │           ├── paths/
│   │           │   ├── route.ts
│   │           │   └── [pathId]/
│   │           │       ├── route.ts
│   │           │       └── recommend/route.ts
│   │           ├── assignments/
│   │           │   ├── [assignmentId]/
│   │           │   │   ├── route.ts
│   │           │   │   └── submit/route.ts
│   │           │   └── [assignmentId]/
│   │           │       └── grade/route.ts
│   │           ├── projects/
│   │           │   ├── route.ts
│   │           │   └── [projectId]/
│   │           │       ├── route.ts
│   │           │       ├── files/route.ts
│   │           │       └── feedback/route.ts
│   │           ├── ai/
│   │           │   ├── assess/route.ts      # Skill assessment
│   │           │   ├── recommend/route.ts   # Content recommendations
│   │           │   ├── analyze/route.ts     # Portfolio analysis
│   │           │   └── mentor/route.ts      # AI mentor chat
│   │           ├── career/
│   │           │   ├── jobs/route.ts
│   │           │   ├── portfolio/route.ts
│   │           │   ├── resume/route.ts
│   │           │   └── match/route.ts
│   │           ├── community/
│   │           │   ├── forums/route.ts
│   │           │   ├── events/route.ts
│   │           │   └── members/route.ts
│   │           ├── payments/
│   │           │   ├── checkout/route.ts
│   │           │   ├── webhook/route.ts
│   │           │   └── subscriptions/route.ts
│   │           └── analytics/
│   │               ├── engagement/route.ts
│   │               ├── progress/route.ts
│   │               └── outcomes/route.ts
│   ├── components/
│   │   └── academy/
│   │       ├── shared/
│   │       │   ├── Card.tsx
│   │       │   ├── Modal.tsx
│   │       │   ├── Button.tsx
│   │       │   └── Loading.tsx
│   │       ├── learning/
│   │       │   ├── VideoPlayer.tsx
│   │       │   ├── QuizWidget.tsx
│   │       │   ├── CodeEditor.tsx
│   │       │   └── ResourceList.tsx
│   │       ├── progress/
│   │       │   ├── ProgressBar.tsx
│   │       │   ├── StreakCounter.tsx
│   │       │   ├── XPTracker.tsx
│   │       │   └── Leaderboard.tsx
│   │       └── ai/
│   │           ├── AIAssistantChat.tsx
│   │           ├── SkillAssessment.tsx
│   │           ├── PersonalizedFeed.tsx
│   │           └── CareerInsights.tsx
│   ├── services/
│   │   └── academy/
│   │       ├── authService.ts
│   │       ├── courseService.ts
│   │       ├── progressService.ts
│   │       ├── aiService.ts
│   │       ├── paymentService.ts
│   │       ├── careerService.ts
│   │       └── analyticsService.ts
│   ├── hooks/
│   │   └── academy/
│   │       ├── useAuth.ts
│   │       ├── useCourse.ts
│   │       ├── useProgress.ts
│   │       ├── useAI.ts
│   │       └── useCareer.ts
│   ├── types/
│   │   └── academy/
│   │       ├── user.ts
│   │       ├── course.ts
│   │       ├── path.ts
│   │       ├── project.ts
│   │       ├── career.ts
│   │       └── analytics.ts
│   └── utils/
│       └── academy/
│           ├── validators.ts
│           ├── formatters.ts
│           ├── aiHelpers.ts
│           └── analyticsHelpers.ts
├── scripts/
│   └── academy/
│       ├── seed-courses.js
│       ├── migrate-users.js
│       ├── generate-certificates.js
│       └── analytics-reports.js
└── docs/
    └── academy/
        ├── AI_ACADEMY_PRD.md
        ├── API_DOCUMENTATION.md
        ├── DATABASE_SCHEMA.md
        └── DEPLOYMENT_GUIDE.md
```

## Core Models & Database Schema

### User Model

```typescript
interface AcademyUser {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: 'student' | 'instructor' | 'mentor' | 'admin'

  // Profile
  bio?: string
  profession?: string
  experience?: string
  goals?: string[]
  skills?: Skill[]

  // Progress
  enrolledPaths: EnrolledPath[]
  completedCourses: string[]
  certificates: Certificate[]
  xp: number
  level: number
  streak: number

  // Career
  portfolio?: Portfolio
  resume?: Resume
  careerPreferences?: CareerPreferences

  // Subscription
  subscriptionStatus: 'free' | 'active' | 'expired'
  subscriptionTier?: 'monthly' | 'annual'
  subscriptionEndsAt?: Date

  // Metadata
  createdAt: Date
  updatedAt: Date
  lastActiveAt: Date
}
```

### Learning Path Model

```typescript
interface LearningPath {
  id: string
  slug: string
  title: string
  description: string
  tagline: string

  // Content
  outcomes: string[]
  prerequisites: string[]
  targetPersonas: string[]
  duration: number // weeks
  estimatedHours: number

  // Structure
  modules: Module[]
  projects: Project[]
  assessments: Assessment[]

  // Pricing
  price: number
  currency: string
  subscriptionIncluded: boolean

  // Metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  tags: string[]
  instructors: Instructor[]
  enrollmentCount: number
  rating: number
  reviewCount: number

  // Status
  status: 'draft' | 'published' | 'archived'
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Course/Module Model

```typescript
interface Course {
  id: string
  pathId: string
  slug: string
  title: string
  description: string
  order: number

  // Content
  lessons: Lesson[]
  duration: number // minutes

  // Resources
  resources: Resource[]
  tools: Tool[]

  // Metadata
  createdAt: Date
  updatedAt: Date
}

interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  order: number

  // Content
  type: 'video' | 'reading' | 'interactive' | 'quiz'
  videoUrl?: string
  duration?: number
  content?: string // Markdown or HTML

  // Interactive elements
  quiz?: Quiz
  codeExercise?: CodeExercise

  // Metadata
  isFree: boolean // Preview lesson
  createdAt: Date
  updatedAt: Date
}
```

### Progress Tracking Model

```typescript
interface EnrolledPath {
  userId: string
  pathId: string

  // Status
  status: 'not_started' | 'in_progress' | 'completed'
  enrolledAt: Date
  startedAt?: Date
  completedAt?: Date

  // Progress
  currentCourseId?: string
  currentLessonId?: string
  overallProgress: number // 0-100

  // Performance
  coursesCompleted: number
  projectsCompleted: number
  quizzesPassed: number
  averageScore: number

  // Time tracking
  totalTimeSpent: number // minutes
  lastAccessedAt: Date
}

interface LessonProgress {
  userId: string
  lessonId: string

  // Status
  status: 'not_started' | 'in_progress' | 'completed'
  completedAt?: Date

  // Video tracking
  videoProgress?: number // seconds
  videoCompleted?: boolean

  // Notes
  notes?: string

  // Metadata
  timeSpent: number // minutes
  createdAt: Date
  updatedAt: Date
}
```

### Project Model

```typescript
interface Project {
  id: string
  pathId: string
  courseId?: string

  // Details
  title: string
  description: string
  brief: string // Full project brief
  order: number

  // Requirements
  objectives: string[]
  deliverables: string[]
  rubric: RubricCriteria[]
  estimatedHours: number

  // Resources
  templates: Resource[]
  examples: Resource[]
  tools: Tool[]

  // Metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isRequired: boolean
  createdAt: Date
  updatedAt: Date
}

interface ProjectSubmission {
  id: string
  projectId: string
  userId: string

  // Submission
  files: SubmissionFile[]
  description: string
  demoUrl?: string
  githubUrl?: string

  // Review
  status: 'submitted' | 'under_review' | 'approved' | 'needs_revision'
  score?: number
  feedback?: string
  reviewedBy?: string
  reviewedAt?: Date

  // Metadata
  submittedAt: Date
  updatedAt: Date
}
```

### Career Services Model

```typescript
interface Portfolio {
  userId: string

  // Profile
  headline: string
  summary: string
  skills: Skill[]

  // Content
  projects: PortfolioProject[]
  achievements: Achievement[]
  testimonials: Testimonial[]

  // Settings
  isPublic: boolean
  customUrl?: string
  theme: string

  // Analytics
  views: number
  lastViewedAt?: Date

  // Metadata
  createdAt: Date
  updatedAt: Date
}

interface JobMatch {
  id: string

  // Job details
  title: string
  company: string
  description: string
  requirements: string[]
  salary: SalaryRange
  location: string
  remote: boolean

  // AI matching
  matchScore: number // 0-100
  matchReasons: string[]
  missingSkills: string[]

  // Status
  source: 'partner' | 'scraped' | 'manual'
  postedAt: Date
  expiresAt?: Date

  // Metadata
  createdAt: Date
  updatedAt: Date
}

interface ApplicationTracker {
  userId: string
  jobId: string

  // Status
  status: 'interested' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted'
  appliedAt?: Date

  // Timeline
  timeline: ApplicationEvent[]

  // Notes
  notes?: string

  // Metadata
  createdAt: Date
  updatedAt: Date
}
```

### Analytics Model

```typescript
interface UserAnalytics {
  userId: string
  date: Date

  // Engagement
  sessionsCount: number
  totalTimeSpent: number // minutes
  lessonsCompleted: number
  quizzesTaken: number
  projectsWorkedOn: number

  // Community
  forumPosts: number
  comments: number
  upvotes: number

  // Learning metrics
  avgQuizScore: number
  streakDays: number
  xpGained: number
}

interface PathAnalytics {
  pathId: string
  date: Date

  // Enrollment
  newEnrollments: number
  activeStudents: number
  completions: number

  // Engagement
  avgCompletionTime: number // days
  avgProgress: number // percentage
  avgSessionTime: number // minutes

  // Performance
  avgQuizScore: number
  avgProjectScore: number
  dropoffPoints: LessonDropoff[]

  // Outcomes
  careerPlacements: number
  avgSalaryIncrease: number
  npsScore: number
}
```

## API Endpoints Reference

### Authentication

- `POST /api/academy/auth/register` - Register new user
- `POST /api/academy/auth/login` - Login user
- `GET /api/academy/auth/session` - Get current session
- `POST /api/academy/auth/logout` - Logout user
- `POST /api/academy/auth/reset-password` - Password reset

### Learning Paths

- `GET /api/academy/paths` - List all paths
- `GET /api/academy/paths/[pathId]` - Get path details
- `POST /api/academy/paths/[pathId]/enroll` - Enroll in path
- `GET /api/academy/paths/[pathId]/progress` - Get user's progress
- `POST /api/academy/paths/[pathId]/recommend` - Get AI recommendations

### Courses & Lessons

- `GET /api/academy/courses` - List courses
- `GET /api/academy/courses/[courseId]` - Get course details
- `GET /api/academy/courses/[courseId]/lessons` - Get lessons
- `GET /api/academy/courses/[courseId]/lessons/[lessonId]` - Get lesson content
- `POST /api/academy/courses/[courseId]/lessons/[lessonId]/complete` - Mark complete
- `PUT /api/academy/courses/[courseId]/lessons/[lessonId]/progress` - Update progress

### Projects

- `GET /api/academy/projects` - List projects
- `GET /api/academy/projects/[projectId]` - Get project details
- `POST /api/academy/projects/[projectId]/submit` - Submit project
- `GET /api/academy/projects/[projectId]/submissions` - Get submissions
- `PUT /api/academy/projects/[projectId]/submissions/[submissionId]` - Update submission

### AI Services

- `POST /api/academy/ai/assess` - Skill assessment
- `POST /api/academy/ai/recommend` - Content recommendations
- `POST /api/academy/ai/analyze` - Portfolio/resume analysis
- `POST /api/academy/ai/mentor` - AI mentor chat

### Career Services

- `GET /api/academy/career/jobs` - List job matches
- `GET /api/academy/career/jobs/[jobId]` - Job details
- `POST /api/academy/career/jobs/[jobId]/apply` - Track application
- `GET /api/academy/career/portfolio` - Get portfolio
- `PUT /api/academy/career/portfolio` - Update portfolio
- `POST /api/academy/career/resume/analyze` - Analyze resume

### Payments

- `POST /api/academy/payments/checkout` - Create checkout session
- `POST /api/academy/payments/webhook` - Stripe webhook
- `GET /api/academy/payments/subscriptions` - Get subscription status
- `POST /api/academy/payments/cancel` - Cancel subscription

## Technology Stack Details

### Frontend Technologies

- **Framework**: Next.js 15 with App Router
- **UI Library**: Mantine UI (already integrated)
- **State Management**: React Context + Custom hooks
- **Forms**: Mantine Forms (existing)
- **Animations**: Framer Motion (existing)
- **Video Player**: Video.js or Plyr
- **Code Editor**: Monaco Editor (VS Code engine)
- **Charts**: Recharts or Chart.js

### Backend Technologies

- **Runtime**: Node.js 20+
- **API**: Next.js API Routes (serverless)
- **Database**: PostgreSQL (via Supabase or AWS RDS)
- **ORM**: Prisma or Drizzle ORM
- **File Storage**: AWS S3 (existing setup)
- **CDN**: Cloudflare (existing)
- **Cache**: Redis (optional for session/cache)

### AI/ML Integration

- **Primary**: OpenAI GPT-4 API (existing)
- **Embeddings**: OpenAI text-embedding-3
- **Vector DB**: Pinecone or Supabase pgvector
- **Personalization**: Custom recommendation engine

### Payment Integration

- **Provider**: Stripe
- **Features**:
  - One-time payments
  - Subscriptions
  - Payment plans
  - Invoicing
  - Webhooks

### Analytics & Monitoring

- **Web Analytics**: Google Analytics 4 (existing)
- **Product Analytics**: Mixpanel or PostHog
- **Error Tracking**: Sentry
- **Performance**: Vercel Analytics
- **User Feedback**: Hotjar or FullStory

### Communication

- **Transactional Email**: SendGrid (existing)
- **Live Chat**: Intercom or Crisp
- **Video Calls**: Whereby or Daily.co
- **Notifications**: Push via Firebase or OneSignal

## Security Considerations

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Session management with secure cookies
- Password hashing with bcrypt
- Two-factor authentication (optional)

### Data Protection

- Encrypt sensitive data at rest
- HTTPS for all communications
- CORS policies
- Rate limiting on API endpoints
- Input validation and sanitization
- SQL injection prevention (ORM)

### Payment Security

- PCI DSS compliance (via Stripe)
- No credit card data stored
- Secure webhook signature verification
- Refund handling

### Content Protection

- DRM for video content (optional)
- Watermarking for downloadables
- Access control for premium content
- Prevent content scraping

## Performance Optimization

### Frontend

- Code splitting and lazy loading
- Image optimization with Next.js Image
- CDN for static assets
- Service worker for offline access
- Progressive Web App (PWA) support

### Backend

- Database query optimization
- Caching strategies (Redis)
- API response compression
- Connection pooling
- Serverless function optimization

### Content Delivery

- Video streaming optimization (HLS/DASH)
- Adaptive bitrate streaming
- Video compression and encoding
- Thumbnail generation
- CDN integration

## Deployment Strategy

### Environments

- **Development**: Local development
- **Staging**: Testing environment (staging branch)
- **Production**: Live environment (main branch)

### CI/CD Pipeline

1. Code push to GitHub
2. Automated tests (Jest, Playwright)
3. Build and type checking
4. Deploy to Vercel (preview/production)
5. Database migrations
6. Post-deployment smoke tests

### Monitoring & Alerts

- Uptime monitoring (99.9% SLA)
- Error rate tracking
- Performance metrics
- User feedback collection
- Automated alerts for critical issues

## Migration Strategy

### Phase 1: Foundation (Weeks 1-4)

- Set up database schema
- Implement authentication
- Build basic course structure
- Create admin dashboard

### Phase 2: Core Features (Weeks 5-8)

- Course player with video streaming
- Progress tracking
- Quiz and assessment system
- Project submission flow

### Phase 3: AI Features (Weeks 9-12)

- Skill assessment
- Content recommendations
- Career matching
- AI mentor chatbot

### Phase 4: Community & Career (Weeks 13-16)

- Forums and discussions
- Live events
- Portfolio builder
- Job board integration

### Phase 5: Launch & Optimize (Weeks 17-20)

- Beta testing with pilot cohort
- Performance optimization
- Bug fixes and refinements
- Marketing site integration
- Public launch
