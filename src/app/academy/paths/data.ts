export type Program = {
  slug: string
  title: string
  tagline: string
  description: string
  duration: string
  cadence: string
  outcome: string
  color: string
  highlight: string
  heroBullets: string[]
  idealFor: string[]
  outcomes: string[]
  projects: string[]
  curriculum: { title: string; points: string[] }[]
  support: string[]
  tools: string[]
  cohortDate: string
}

export const programs: Program[] = [
  {
    slug: 'ai-for-creatives',
    title: 'AI for Creative Professionals',
    tagline: 'Ship bold creative work faster without losing your voice.',
    description:
      'Studio-style labs for designers, editors, and creative leads who want to pair taste with AI speed. You will refactor your entire creative pipeline—from brief to delivery—with repeatable recipes.',
    duration: '10 weeks',
    cadence: '2x live studios weekly + office hours',
    outcome: 'Portfolio pieces + client-ready pitch deck',
    color: 'admiDarkOrange',
    highlight: 'Focus: concept-to-delivery with AI copilots',
    heroBullets: [
      'Build an AI-native creative workflow for ideation, editing, and review.',
      'Produce three portfolio pieces with documented prompt recipes.',
      'Present AI-assisted work confidently to clients and leadership.'
    ],
    idealFor: ['Designers & art directors', 'Content leads & creators', 'Video/audio editors modernizing pipelines'],
    outcomes: [
      'A portfolio set (brand campaign, video/audio/motion)',
      'A creative operating system with prompt packs and macros',
      'A stakeholder presentation showing ROI, safety, and quality controls'
    ],
    projects: [
      'AI-assisted brand kit and campaign with image/video variants',
      'Video or motion sequence with an AI edit and sound pipeline',
      'Client pitch with before/after samples and governance notes'
    ],
    curriculum: [
      {
        title: 'Foundations & safety for creative AI',
        points: [
          'Quality controls, model selection, and brand guardrails',
          'Prompt systems for ideation, storyboarding, and copy',
          'Versioning workflows that keep human taste in the loop'
        ]
      },
      {
        title: 'Production pipelines',
        points: [
          'Design, video, and audio toolchains with automation hooks',
          'Rapid editing patterns for cuts, captions, VO, and polish',
          'Feedback loops: peer studio critiques and review templates'
        ]
      },
      {
        title: 'Publishing & presentation',
        points: [
          'Packaging deliverables and maintaining consistency at scale',
          'Client/stakeholder narrative: ROI, compliance, and risks',
          'Personal playbook for ongoing experimentation'
        ]
      }
    ],
    support: [
      'Creative studio critiques every week',
      'Prompt library + pattern vault for common briefs',
      'Async feedback, office hours, and tooling setup support'
    ],
    tools: ['Gen design + video (Figma plugins, Firefly, Runway)', 'Audio + motion stacks', 'Review & QA automations'],
    cohortDate: 'Next start: Oct 7 (limited seats)'
  },
  {
    slug: 'ai-for-marketing',
    title: 'AI for Marketing Excellence',
    tagline: 'Automate campaigns, personalize at scale, and prove lift.',
    description:
      'For performance and lifecycle marketers who need repeatable, AI-powered campaigns. We build funnels, creative variants, and measurement dashboards that can be reused by your team.',
    duration: '12 weeks',
    cadence: '2x live labs weekly + async sprints',
    outcome: 'Campaign playbooks, dashboards, and automation maps',
    color: 'admiOrangeLight',
    highlight: 'Focus: revenue lift through reliable AI copilots',
    heroBullets: [
      'Design AI-assisted campaign production and QA flows.',
      'Ship a conversion lift experiment with clear attribution.',
      'Document playbooks your team can run without you.'
    ],
    idealFor: ['Performance & growth marketers', 'Lifecycle and CRM leads', 'Marketing ops & RevOps partners'],
    outcomes: [
      'Reusable AI playbooks for acquisition, nurture, and retention',
      'Attribution-ready dashboards with experiment tracking',
      'Automation maps that reduce manual work across channels'
    ],
    projects: [
      'Acquisition experiment with AI-generated creative variants',
      'Lifecycle journey revamp with personalization prompts',
      'Ops automation: reporting, QA, and campaign hygiene'
    ],
    curriculum: [
      {
        title: 'AI building blocks for marketing',
        points: [
          'Persona, messaging, and offer development with AI',
          'Creative systems: copy, visuals, and localization at scale',
          'Compliance, approvals, and QA for regulated channels'
        ]
      },
      {
        title: 'Execution & experimentation',
        points: [
          'Experiment design with AI-assisted research and sizing',
          'Landing page and email production pipelines',
          'Hands-on labs: paid ads, SEO, and CRM personalization'
        ]
      },
      {
        title: 'Measurement & automation',
        points: [
          'Attribution-ready dashboards and alerting',
          'Campaign ops automations (briefs, QA, reporting)',
          'Team enablement: playbooks, templates, and handover'
        ]
      }
    ],
    support: [
      'Weekly strategy reviews and office hours',
      'Template library for briefs, QA, and reporting',
      'Copy/creative critiques with practitioner feedback'
    ],
    tools: ['Ad creative + copy copilots', 'CRM and lifecycle automation tools', 'Analytics, tagging, and QA scripts'],
    cohortDate: 'Next start: Oct 21'
  },
  {
    slug: 'ai-for-business',
    title: 'AI for Business Intelligence',
    tagline: 'Turn data into faster decisions with AI copilots and automation.',
    description:
      'For analysts and operators who want to automate reporting, build decision tools, and unblock teams with data. You will prototype internal copilots with strong governance.',
    duration: '12 weeks',
    cadence: 'Weekly build sessions + project labs',
    outcome: 'Automation toolkit + internal BI copilots',
    color: 'admiOrangeDark',
    highlight: 'Focus: data products and decision support',
    heroBullets: [
      'Automate reporting and build proactive alerting.',
      'Prototype an internal BI copilot with safeguards.',
      'Deliver a decision-ready dashboard and stakeholder training.'
    ],
    idealFor: ['Business and data analysts', 'Ops leaders and PMs', 'Strategy teams enabling go-to-market'],
    outcomes: [
      'Automated reporting stack with governance and QA',
      'Decision-ready dashboards with clear narratives',
      'Internal copilot prototype with access controls'
    ],
    projects: [
      'Reporting automation with alerts and summaries',
      'Dashboard with guided analysis and recommendations',
      'Copilot prototype that answers stakeholder questions safely'
    ],
    curriculum: [
      {
        title: 'Data readiness & governance',
        points: [
          'Source mapping, access controls, and quality standards',
          'Prompting patterns for analytics and decision support',
          'Risk management: privacy, hallucinations, and oversight'
        ]
      },
      {
        title: 'Automation & dashboards',
        points: [
          'ETL/ELT accelerators, scheduling, and monitoring',
          'Narrative dashboards with insights, not just charts',
          'Alerting and anomaly detection with AI summarization'
        ]
      },
      {
        title: 'Copilot prototyping',
        points: [
          'Designing scoped copilots with clear guardrails',
          'User testing, onboarding, and enablement plans',
          'Measuring adoption, impact, and reliability'
        ]
      }
    ],
    support: [
      'Architecture reviews with practitioners',
      'Security and governance checklists',
      'Office hours for data modeling and automation challenges'
    ],
    tools: ['Notebook and SQL copilots', 'BI dashboards with AI summaries', 'Automation orchestrators and QA tools'],
    cohortDate: 'Next start: Nov 4'
  }
]
