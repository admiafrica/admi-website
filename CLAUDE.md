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
