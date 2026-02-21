# ADMI Website - Claude Code Instructions

## Git Workflow (CRITICAL - MUST Follow)

**🚨 MANDATORY RULES:**

1. **NEVER push directly to `main` branch** - This is production and requires human approval
2. **ALWAYS push to `staging` branch only** - All changes go to staging first
3. **Production deploys require Pull Requests** - Create PR from staging → main after testing
4. **Wait for human confirmation** - Do not merge PRs without explicit user approval

### Required Deployment Process

```bash
# 1. ALWAYS work on staging branch
git checkout staging
git pull origin staging

# 2. Make changes and test locally
npm run type-check
npm run build

# 3. Commit and push to staging ONLY
git add -A
git commit -m "feat: description"
git push origin staging

# 4. Wait for staging deployment and testing
# Visit https://staging.admi.africa
# Verify changes work correctly
# Run any necessary validation scripts

# 5. After testing, create a Pull Request (NOT direct push)
# Go to GitHub and create PR: staging → main
# OR use GitHub CLI:
gh pr create --base main --head staging --title "Deploy: description" --body "Tested on staging"

# 6. Wait for human approval before merging
# The user will review and merge the PR
```

### ❌ FORBIDDEN Actions

- `git push origin main` - NEVER do this
- `git checkout main && git merge staging && git push` - NEVER do this
- Merging PRs without explicit user instruction

### ✅ ALLOWED Actions

- `git push origin staging` - Always allowed
- Creating Pull Requests - Always allowed
- Suggesting PR creation - Always allowed

---

## Project Overview

Next.js 15 marketing website for Africa Digital Media Institute (ADMI) with App Router, Mantine UI, Contentful CMS, and AWS Amplify deployment.

### Key Commands

```bash
npm run dev          # Development server (port 3000)
npm run build        # Production build
npm run type-check   # TypeScript validation
npm run lint         # ESLint
```

### Branch Strategy

- `staging` → https://staging.admi.africa (test here first)
- `main` → https://admi.africa (production - PR only)

### Important Paths

- Frontend: `src/app/` (App Router), `src/pages/` (legacy Pages Router)
- Components: `src/components/`
- Utils: `src/utils/`
- API Routes: `src/pages/api/`
- Scripts: `scripts/`
- Infrastructure: `infrastructure/`

See `.github/copilot-instructions.md` for full project documentation.

---

## Mobile Responsiveness Rules (MUST Follow)

All pages and components must render correctly on a 375px viewport. Follow these rules when writing or modifying any `.tsx` file.

### Font sizes — always mobile-first

Never use `text-[36px]` or larger without a responsive breakpoint. Always set the mobile size first:

```jsx
// GOOD
className="text-[24px] md:text-[42px]"
className="text-[28px] md:text-[52px]"

// BAD — will overflow or look massive on mobile
className="text-[42px]"
className="text-[52px]"
```

Size mapping:
| Desktop | Mobile base |
|---------|-------------|
| 36-42px | 24-26px |
| 44-52px | 26-28px |

### Max-width — don't constrain on mobile

Fixed `max-w` values above 400px can overflow on small screens. Use `md:` prefix:

```jsx
// GOOD
className="md:max-w-[620px]"

// BAD — 620px exceeds 375px viewport
className="max-w-[620px]"
```

### Stats bars / horizontal lists — grid on mobile

Never rely on `flex justify-around` for 3+ items on mobile. Use grid:

```jsx
// GOOD
className="grid grid-cols-2 gap-6 md:flex md:justify-around"

// BAD — overflows on mobile
className="flex justify-around"
```

Hide dividers on mobile: `className="hidden md:block"`

### Hero sections — responsive heights

Always provide a mobile height breakpoint:

```jsx
// GOOD
className="h-[420px] md:h-[520px]"

// BAD — too tall for mobile
className="h-[520px]"
```

### Flex layouts — prevent text overflow

Add `min-w-0` to flex children that contain text to allow shrinking:

```jsx
// GOOD
<div className="min-w-0 flex flex-col gap-6">

// BAD — text will overflow the flex container
<div className="flex flex-col gap-6">
```

### Two-column layouts — stack on mobile

Always use `flex-col` as base with `md:flex-row`:

```jsx
// GOOD
className="flex flex-col md:flex-row"

// BAD — side-by-side on mobile
className="flex flex-row"
```

### Use global CSS classes

Prefer global classes over inline equivalents:
- **Container:** `section-container` (gives `mx-auto max-w-[1280px] px-6 md:px-8`)
- **Vertical spacing:** `section-padding` (gives `py-16 md:py-20`)
- **Headings:** `section-heading` (gives `text-3xl md:text-[42px]` — already responsive)
- **Body text:** `section-subheading` (gives `text-[17px]` — already safe)
