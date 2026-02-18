# Design Homepage

You are a senior UI/UX designer and front-end engineer specializing in high-conversion educational institution websites. Design and implement a homepage for the ADMI website.

## Process

### 1. Gather Context
- Read `src/styles/globals.css` for global CSS classes (`section-padding`, `section-container`, `section-label-light`, `section-heading-light`, etc.)
- Read `src/styles/theme.ts` for font configuration (Nexa for headings, Proxima Nova for body)
- Check `src/pages/index.tsx` for the current homepage structure and `getStaticProps` data fetching
- Check `src/components/homepage/` for existing section components
- Read `src/layouts/v3/MainLayout.tsx` for the layout wrapper

### 2. Design System Rules
- **Fonts**: `font-nexa` for all headings (h1-h6), `font-proxima` for body text
- **Brand colors**: `#BA2E36` (primary red), `#08F6CF` (teal accent), `#F76335` (orange), `#0A3D3D` (dark teal), `#0A0A0A` (near-black)
- **Layout**: Full-bleed section backgrounds, boxed content via `section-container` class (`max-w-[1280px] mx-auto px-6 md:px-8`)
- **Spacing**: Use `section-padding` class for vertical rhythm (`py-16 md:py-20`)
- **Icons**: Use `@tabler/icons-react` (NOT lucide-react)
- **Images**: Use `next/image` with proper `sizes` and `alt` attributes
- **Links**: Use `next/link` for internal navigation
- **Accreditation**: Woolf University (EU) and TVETA Kenya only (no Pearson/BTEC)

### 3. Section Architecture
Each section should be its own component in `src/components/homepage/`. Typical homepage sections:
- **Hero** - Full-width with background image, headline, CTA
- **Stats Bar** - Key metrics (employment rate, alumni count, etc.)
- **Accreditation** - Trust badges (Woolf, TVETA)
- **Program Categories** - Cards for Diploma, Professional Certificate, Foundation Certificate
- **Why ADMI** - Benefit cards with icons
- **Student Showcase** - Portfolio/work samples
- **Degree Pathway** - Diploma to degree steps
- **Alumni Stories** - Graduate testimonials with photos
- **Industry Partners** - Employer logos/names
- **Events & Intakes** - Upcoming intake dates and open days
- **Testimonials** - Student quotes
- **Final CTA** - Application call-to-action

### 4. Implementation Rules
- Export each section as a default export from its own file
- Alternate light/dark section backgrounds for visual rhythm
- Use responsive design: mobile-first with `md:` and `lg:` breakpoints
- Ensure all interactive elements have proper ARIA attributes
- Keep component files focused and under 150 lines
- Use `as const` for static data arrays
- Build compiles with `npx next build` before finishing

### 5. If Using Pencil Design Tool
If a `.pen` design file exists:
- Use `get_editor_state` to find the active file
- Use `get_guidelines(topic="landing-page")` for design rules
- Use `get_style_guide_tags` then `get_style_guide` for visual inspiration
- Read design structure with `batch_get`
- Convert design nodes to React/Tailwind components
- Take screenshots with `get_screenshot` to verify visual accuracy

## Output
Create or update homepage section components and wire them into `src/pages/index.tsx`. Run `npx next build` to verify everything compiles.
