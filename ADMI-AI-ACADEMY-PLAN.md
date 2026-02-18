# ADMI AI Academy — Build Plan

> Internal working document for rebuilding the AI Academy (`ai.admi.africa`) from the existing branch, aligned with the ADMI design system and the same fork strategy used for ADMF.

---

## 1. Branch Review Summary

### What exists on `origin/ai-academy` (6 commits ahead of main)

| Area | Status | Notes |
|------|--------|-------|
| **Pages** | 5 pages | Homepage, About, Paths listing, Path detail `[slug]`, Enquiry/Contact |
| **Components** | 6 components | AiEnquiryForm, AiEnquiryPageContent, EmailCapture, FAQ, Features, PathOverview, Testimonials |
| **Learning Paths** | 3 paths | AI for Creatives, AI for Marketing, AI for Business Intelligence |
| **Layout** | Basic | Header (logo + 3 nav links), minimal footer (© only) |
| **Deployment** | Configured | AWS Amplify for `ai.admi.africa` subdomain, Brevo CRM, Meta/Google Ads |
| **Metadata/SEO** | Done | OG tags, Twitter cards, robots config |
| **Mobile** | Done | Responsive with burger menu, stacked CTAs |

### What needs fixing

| Issue | Severity | Detail |
|-------|----------|--------|
| **Mantine dependency** | **Critical** | Entire academy uses Mantine components. Must be **stripped out and replaced with plain HTML + Tailwind CSS** to match the main site's migration pattern |
| **Wrong colours** | High | Uses old `#BA2E36` → `#F60834` red gradients everywhere. Should use **Orange `#EF7B2E`** as primary |
| **No dark theme** | High | All pages are white/light backgrounds. AI Academy should feel dark, tech-forward (dark blue `#1a1a2e`) |
| **No distinct identity** | High | Looks like generic ADMI with red buttons. Needs its own orange-driven visual personality |
| **Placeholder testimonials** | Medium | Uses `randomuser.me` avatars and fictional quotes |
| **Minimal navigation** | Medium | Only 3 links, no proper mega-menu or CTA button in header |
| **No footer** | Medium | Just a single `©` line — needs full footer with links back to `admi.ac.ke` |
| **Old colour tokens** | Medium | Hardcoded hex values instead of Tailwind theme tokens |
| **Language inconsistencies** | Low | Uses "programs" (may be intentional for AI/tech audience), "mentors" instead of "faculty" |
| **Missing pages** | Low | No pricing, no individual module details, no blog/resources |
| **No WhatsApp CTA** | Low | Missing WhatsApp chat button that ADMI main site uses |

---

## 2. Colour Strategy (Orange Primary)

Following the same "sibling brand" approach as ADMF (which flipped to Teal):

| Role | ADMI (Main) | ADMF (Foundation) | **AI Academy** |
|------|-------------|-------------------|---------------|
| Primary | `#C1272D` Red | `#8EBFB0` Teal | **`#EF7B2E` Orange** |
| Primary Dark | `#922834` Maroon | `#002A23` Deep Green | **`#1a1a2e` Dark Blue** |
| Accent | `#EF7B2E` Orange | `#C1272D` Red | **`#8EBFB0` Teal** |
| Secondary | `#8EBFB0` Sage | `#D9DC5B` Olive Yellow | **`#D9DC5B` Olive Yellow** |
| Dark BG | `#0A0A0A` Near Black | `#002A23` Deep Green | **`#1a1a2e` Dark Blue** |
| Warm BG | `#F7F5F2` | `#F7F5F2` | **`#F7F5F2`** (keep) |
| CTA Gradient | Red → Orange | Teal → Green | **`#EF7B2E` → `#D9DC5B`** (orange → olive) |

### Tailwind Theme Extension

```js
// tailwind.config.js — extend for AI Academy
module.exports = {
  theme: {
    extend: {
      colors: {
        'ai-primary': '#EF7B2E',
        'ai-primary-hover': '#d96b1f',
        'ai-dark': '#1a1a2e',
        'ai-darker': '#0f0f1e',
        'ai-accent': '#8EBFB0',
        'ai-secondary': '#D9DC5B',
        'ai-warm': '#F7F5F2',
        'ai-muted': 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
}
```

### CSS Variables (in `globals.css` or academy-scoped stylesheet)

```css
:root {
  --ai-primary: #EF7B2E;
  --ai-primary-dark: #1a1a2e;
  --ai-accent: #8EBFB0;
  --ai-secondary: #D9DC5B;
  --ai-dark-bg: #1a1a2e;
  --ai-darker-bg: #0f0f1e;
  --ai-warm-bg: #F7F5F2;
  --ai-text-on-dark: #FFFFFF;
  --ai-text-muted-on-dark: rgba(255, 255, 255, 0.7);
  --ai-gradient: linear-gradient(90deg, #EF7B2E, #D9DC5B);
}
```

---

## 3. Design Direction

### Visual Identity
- **Dark-first design** — dark blue (#1a1a2e) backgrounds with orange accents
- Think: code editor aesthetic, terminal vibes, neural network visualisations
- Cards on dark backgrounds with subtle borders and glows
- Orange gradient highlights on headings and CTAs
- Subtle grid/dot pattern overlays on hero sections
- Photography: students at screens, AI tools in action, hackathon energy

### Typography (keep consistent with ADMI family)
- Headings: Nexa (same as ADMI codebase)
- Body/UI: Proxima Nova
- Code snippets: monospace for AI/tech credibility

### Components — plain HTML + Tailwind
- Same corner radii: `rounded-lg` (8px buttons), `rounded-xl` (12px cards)
- Same grid: `max-w-7xl mx-auto` (1440px), same section-padding pattern
- All components built with semantic HTML elements + Tailwind utility classes
- **No Mantine, no component library** — just `<div>`, `<section>`, `<button>`, `<input>`, etc.

---

## 4. Implementation Phases

### Phase 0: Mantine Removal & Tailwind Migration (Priority: Critical)
> Goal: Strip all Mantine imports and rebuild every component with plain HTML + Tailwind CSS

This is the prerequisite for everything else. The existing branch imports heavily from `@mantine/core` and `@mantine/hooks` across all 16 files.

- [ ] **Audit all Mantine imports** across `src/app/academy/` (Container, Box, Button, Card, Title, Text, Stack, Group, SimpleGrid, Badge, ThemeIcon, Accordion, Drawer, Burger, TextInput, Select, Textarea, Avatar, Divider, List, Skeleton)
- [ ] **Replace layout primitives:**
  - `Container size="lg"` → `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`
  - `Stack gap="lg"` → `<div className="flex flex-col gap-6">`
  - `Group gap="md"` → `<div className="flex items-center gap-4">`
  - `SimpleGrid cols={{ base: 1, md: 2 }}` → `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">`
  - `Box component="section"` → `<section>`
- [ ] **Replace UI components:**
  - `Button variant="gradient"` → `<a className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-ai-primary to-ai-secondary text-white font-semibold rounded-lg">`
  - `Card withBorder` → `<div className="border border-white/10 rounded-xl p-6 shadow-sm">`
  - `Badge` → `<span className="inline-block px-3 py-1 text-xs font-semibold rounded-full">`
  - `Title order={1}` → `<h1 className="font-display text-4xl font-bold">`
  - `Text c="dimmed"` → `<p className="text-white/70">` (dark) or `<p className="text-gray-500">` (light)
  - `ThemeIcon` → `<div className="w-11 h-11 rounded-lg bg-ai-primary/10 flex items-center justify-center">`
  - `Accordion` → custom `<details>/<summary>` or headless disclosure component
  - `Drawer/Burger` → custom mobile menu with Tailwind transitions
- [ ] **Replace form components:**
  - `TextInput` → `<label>` + `<input className="w-full px-4 py-3 rounded-lg border ...">`
  - `Select` → `<label>` + `<select className="w-full px-4 py-3 rounded-lg border ...">`
  - `Textarea` → `<label>` + `<textarea className="w-full px-4 py-3 rounded-lg border ...">`
- [ ] **Remove `@mantine/core` and `@mantine/hooks` imports** from all academy files
- [ ] **Remove `useDisclosure` hook** — replace with `useState` for mobile menu toggle
- [ ] **Remove Mantine's `visibleFrom`/`hiddenFrom` props** — replace with Tailwind `hidden sm:block` / `block sm:hidden`
- [ ] Verify no Mantine provider/theme wrapping is needed for academy routes

**Files to rewrite (all 16):**
- `layout.tsx`, `layout-wrapper.tsx`, `page.tsx`
- `about/page.tsx`, `paths/page.tsx`, `paths/[slug]/page.tsx`
- `enquiry/page.tsx`, `contact/page.tsx`
- `components/AiEnquiryForm.tsx`, `AiEnquiryPageContent.tsx`, `EmailCapture.tsx`
- `components/Faq.tsx`, `Features.tsx`, `PathOverview.tsx`, `Testimonials.tsx`

### Phase 1: Foundation & Colour Migration (Priority: High)
> Goal: Establish the orange/dark-blue visual identity using Tailwind

- [ ] Add AI Academy colour tokens to `tailwind.config.js` (see section 2 above)
- [ ] Add CSS custom properties for the AI Academy palette in academy-scoped styles
- [ ] Replace all hardcoded `#BA2E36` / `#F76335` / `#F60834` with Tailwind theme classes (`bg-ai-primary`, `text-ai-primary`, etc.)
- [ ] Convert hero sections to dark backgrounds (`bg-ai-dark`)
- [ ] Update button gradients: `bg-gradient-to-r from-ai-primary to-ai-secondary`
- [ ] Update badges to use `bg-ai-primary/10 text-ai-primary` pattern

**Files to modify:**
- `tailwind.config.js` (or `tailwind.config.ts`)
- `src/app/academy/globals.css` or scoped styles
- All page and component files (colour class swaps)

### Phase 2: Navigation & Layout (Priority: High)
> Goal: Professional nav and footer matching ADMI family, built with Tailwind

- [ ] Redesign header: `<header>` with ADMI logo + "AI Academy" badge, `<nav>` with links, orange "Enrol" CTA `<a>`
- [ ] Mobile nav: hamburger button + off-canvas `<nav>` with Tailwind `translate-x` transitions
- [ ] Full footer: `<footer>` with 4-column `grid grid-cols-2 lg:grid-cols-4` layout, links back to `admi.ac.ke`
- [ ] WhatsApp floating button: fixed-position `<a>` with WhatsApp green

**Files to modify/create:**
- `src/app/academy/layout-wrapper.tsx` (major rewrite — plain HTML + Tailwind)
- `src/app/academy/components/AcademyFooter.tsx` (new — plain HTML + Tailwind)
- `src/app/academy/components/WhatsAppButton.tsx` (new or import from main)

### Phase 3: Homepage Redesign (Priority: High)
> Goal: Dark, cinematic hero with clear value proposition

- [ ] Dark hero `<section>` with `bg-ai-dark`, orange gradient text via `bg-clip-text text-transparent bg-gradient-to-r`, dot-grid background pattern
- [ ] Impact numbers strip: `grid grid-cols-2 md:grid-cols-4` stat cards
- [ ] Features section: dark background, `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` icon cards
- [ ] Learning paths preview: dark cards with coloured left borders
- [ ] Testimonials: `grid grid-cols-1 md:grid-cols-3` quote cards
- [ ] Partners/tools logo strip: `flex items-center gap-8` with grayscale filter
- [ ] CTA banner: "Next cohort starts [date]" — full-width gradient section
- [ ] FAQ section: `<details>/<summary>` elements with Tailwind styling
- [ ] Email capture: `<form>` with `<input>` + `<button>` inline

### Phase 4: Content & Pages (Priority: Medium)
> Goal: Flesh out all pages with proper content

- [ ] **Paths listing page** — dark card grid with filters by role/duration
- [ ] **Path detail pages** — curriculum breakdown, project examples, tools used, cohort dates
- [ ] **About page** — teaching model, faculty profiles, ADMI connection story
- [ ] **Enquiry/Contact** — form with proper dark theme styling (plain `<form>` + Tailwind)
- [ ] **Resources/Blog** — (optional) AI tips, student work, tool guides

### Phase 5: Learning Paths Content Update (Priority: Medium)
> Goal: Update the 3 paths with accurate, current content

Current paths to review and update:
1. **AI for Creative Professionals** — update tools (mention Claude, Midjourney, Runway, etc.)
2. **AI for Marketing Excellence** — update with current AI marketing tools
3. **AI for Business Intelligence** — update with current BI/analytics AI tools

For each path:
- [ ] Review and update curriculum content
- [ ] Update cohort dates (next intakes: May 2026, September 2026)
- [ ] Add pricing information
- [ ] Add real tool logos/icons
- [ ] Add "What you'll build" project gallery section

### Phase 6: Forms & CRM Integration (Priority: Medium)
> Goal: Proper lead capture with Brevo CRM using plain HTML forms

- [ ] Rebuild AiEnquiryForm as plain `<form>` with Tailwind-styled `<input>`/`<select>`/`<textarea>` elements
- [ ] Use React `useState` for form state (replace Mantine's `useForm`)
- [ ] Dark theme form styling: `bg-white/5 border-white/10 text-white placeholder:text-white/40`
- [ ] Ensure Brevo sync works with AI Academy-specific list
- [ ] Add UTM parameter tracking (already partially done)
- [ ] Add Meta Pixel / Google Ads conversion events
- [ ] Add WhatsApp as enquiry channel

### Phase 7: SEO & Performance (Priority: Low)
> Goal: Optimise for search and speed

- [ ] Structured data (Course schema, FAQ schema)
- [ ] Proper canonical URLs for `ai.admi.africa`
- [ ] Image optimisation (Next.js Image component, proper alt tags)
- [ ] Core Web Vitals audit
- [ ] Sitemap for the academy subdomain

### Phase 8: Deployment & DNS (Priority: Low)
> Goal: Live at ai.admi.africa

- [ ] Verify AWS Amplify branch config for `ai-academy`
- [ ] Configure `ai.admi.africa` subdomain DNS
- [ ] Set up SSL certificate
- [ ] Test redirects (root `/` → `/academy`)
- [ ] Verify analytics tracking end-to-end

---

## 5. Tone & Language Guide

| Element | ADMI (Main) | **AI Academy** |
|---------|-------------|---------------|
| Voice | Academic, aspirational | **Tech-forward, practical, results-oriented** |
| Spelling | British English ("programmes") | **Same — "programmes" for consistency** |
| Hero headline | "Shape Your Creative Future" | **"Build with AI. Create the Future."** |
| CTAs | Apply, Request Prospectus | **Enrol, Explore Courses, Build a Project, Talk to an Advisor** |
| Social proof | Student work, alumni careers | **Student projects, tools mastered, career outcomes** |
| Faculty | "Faculty" | **"Faculty" (keep consistent) — NOT "mentors"** |
| Programmes | "Programmes" (creative arts) | **"Programmes" or "Learning Paths"** |

---

## 6. Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js App Router (existing) | Already set up on the branch |
| UI Library | **None — plain HTML + Tailwind CSS** | Matches main site migration (commit `fca9823`), zero bundle overhead, full control |
| Styling | **Tailwind CSS utility classes + CSS custom properties** | No component library needed; Tailwind handles responsive, dark theme, animations |
| Form State | **React `useState` / native form handling** | No Mantine `useForm` — use controlled inputs or `FormData` |
| Mobile Menu | **`useState` + Tailwind transitions** | No Mantine `useDisclosure` / `Drawer` — custom off-canvas with `translate-x-full` |
| Accordion/FAQ | **`<details>/<summary>` or headless UI** | Native HTML disclosure, styled with Tailwind |
| Icons | **Tabler Icons (keep)** or Heroicons | Already imported, lightweight, tree-shakeable |
| CMS | Static data initially, Contentful later | Paths data is in `data.ts` — move to CMS later |
| Deployment | AWS Amplify (existing) | Already configured for `ai-academy` branch |
| CRM | Brevo (existing) | Already integrated with enquiry form |
| Analytics | Meta Pixel + Google Ads (existing) | Already configured |
| Domain | `ai.admi.africa` | Already planned in next.config.mjs |

---

## 7. File Structure (Target)

```
src/app/academy/
├── layout.tsx                    # Metadata + SEO (server component)
├── layout-wrapper.tsx            # Client layout (header, mobile menu, footer)
├── page.tsx                      # Homepage — plain HTML + Tailwind
├── about/
│   └── page.tsx                  # About the academy
├── paths/
│   ├── page.tsx                  # All paths listing
│   ├── data.ts                   # Path data (→ later CMS)
│   └── [slug]/
│       └── page.tsx              # Individual path detail
├── enquiry/
│   └── page.tsx                  # Enquiry form
├── contact/
│   └── page.tsx                  # Contact (redirects to enquiry)
├── components/
│   ├── AcademyFooter.tsx         # NEW: Full footer (plain HTML + Tailwind)
│   ├── AcademyHeader.tsx         # NEW: Header with mobile menu (plain HTML + Tailwind)
│   ├── AiEnquiryForm.tsx         # REWRITE: Plain <form> + Tailwind + useState
│   ├── AiEnquiryPageContent.tsx  # REWRITE: Plain HTML + Tailwind
│   ├── EmailCapture.tsx          # REWRITE: Plain <form> + Tailwind
│   ├── Faq.tsx                   # REWRITE: <details>/<summary> + Tailwind
│   ├── Features.tsx              # REWRITE: Grid of cards, plain HTML + Tailwind
│   ├── PathOverview.tsx          # REWRITE: Grid of cards, plain HTML + Tailwind
│   ├── Testimonials.tsx          # REWRITE: Grid of cards, plain HTML + Tailwind
│   └── WhatsAppButton.tsx        # NEW: Fixed-position <a> with Tailwind
└── resources/                    # FUTURE: Blog/resources section
    └── page.tsx
```

---

## 8. Mantine → Tailwind Cheat Sheet

Quick reference for the rewrite:

| Mantine | Tailwind Equivalent |
|---------|-------------------|
| `<Container size="lg">` | `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">` |
| `<Stack gap="lg">` | `<div class="flex flex-col gap-6">` |
| `<Group gap="md">` | `<div class="flex items-center gap-4">` |
| `<SimpleGrid cols={{ base:1, md:2 }}>` | `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">` |
| `<Box component="section">` | `<section>` |
| `<Title order={1}>` | `<h1 class="font-display text-4xl font-bold">` |
| `<Title order={2}>` | `<h2 class="font-display text-3xl font-bold">` |
| `<Text c="dimmed">` | `<p class="text-white/70">` (dark) / `<p class="text-gray-500">` (light) |
| `<Text size="lg">` | `<p class="text-lg">` |
| `<Text fw={700}>` | `<span class="font-bold">` |
| `<Button size="lg" radius="md" variant="gradient">` | `<a class="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-ai-primary to-ai-secondary rounded-lg hover:opacity-90 transition">` |
| `<Button variant="outline">` | `<a class="inline-flex items-center justify-center px-6 py-3 text-base font-semibold border-2 border-current rounded-lg hover:bg-white/5 transition">` |
| `<Card withBorder padding="xl" radius="md">` | `<div class="border border-white/10 rounded-xl p-6 shadow-sm">` |
| `<Badge variant="light" color="orange">` | `<span class="inline-block px-3 py-1 text-xs font-semibold bg-ai-primary/10 text-ai-primary rounded-full">` |
| `<ThemeIcon size={44} radius="md">` | `<div class="w-11 h-11 rounded-lg bg-ai-primary/10 text-ai-primary flex items-center justify-center">` |
| `<Avatar src={url} radius="xl">` | `<img class="w-10 h-10 rounded-full object-cover" src={url}>` |
| `<Divider />` | `<hr class="border-white/10">` |
| `<Accordion>` | `<details class="group border-b border-white/10">` + `<summary>` |
| `<Drawer>` | `<div class="fixed inset-0 z-50 translate-x-full transition-transform">` (toggled) |
| `<Burger>` | `<button class="sm:hidden">` with hamburger SVG |
| `<Skeleton>` | `<div class="animate-pulse bg-white/10 rounded-lg h-[60px]">` |
| `visibleFrom="sm"` | `hidden sm:block` |
| `hiddenFrom="sm"` | `block sm:hidden` |
| `<TextInput label="..." radius="md">` | `<label class="block text-sm font-medium mb-1">` + `<input class="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white">` |
| `<Select data={[...]}>` | `<select class="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white">` + `<option>` |
| `<Textarea minRows={3}>` | `<textarea rows={3} class="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white resize-y">` |
| `<List icon={...}>` | `<ul class="space-y-3">` + `<li class="flex items-start gap-3">` |
| `useDisclosure()` | `const [isOpen, setIsOpen] = useState(false)` |
| `useForm({})` | `const [formData, setFormData] = useState({...})` + custom validation |

---

## 9. Quick Wins (Can do immediately)

1. **Strip Mantine + Tailwind rewrite** — Start with `layout-wrapper.tsx` (header/nav), then cascade to pages
2. **Colour swap** — Apply `bg-ai-primary`, `text-ai-primary` classes instead of hardcoded reds
3. **Dark hero** — Convert homepage hero from light gradient to `bg-ai-dark` with Tailwind
4. **Update cohort dates** — Change "Oct 7", "Oct 21", "Nov 4" to May 2026 / September 2026
5. **Fix navigation** — Orange "Enrol" CTA link in header with Tailwind styling
6. **Add footer** — `<footer>` with `grid grid-cols-2 lg:grid-cols-4` layout

---

## 10. Design Reference

### Inspiration
- GitHub Copilot — dark UI, orange/blue accents, code aesthetic
- Coursera / Udacity — course card layouts, learning path structure
- Full Sail University — dark, cinematic, student work focus
- Vercel — clean dark UI, developer-friendly

### ADMI Design System Components to reuse (as Tailwind patterns)
- Buttons: `rounded-lg` (8px), swap fill colour to orange gradient
- Cards: `rounded-xl` (12px), dark variant with `border-white/10`
- Section Headers: same structure, dark background variant
- Form Inputs: dark-themed with `bg-white/5 border-white/20`
- Badges: Orange (primary), Dark, Teal (accent) — all via Tailwind classes

---

*Last updated: 17 February 2026*
*Status: Planning — awaiting approval to begin Phase 0 (Mantine removal)*
