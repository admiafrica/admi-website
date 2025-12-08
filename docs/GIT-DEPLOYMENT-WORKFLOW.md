# Git Deployment Workflow

## Standard Workflow: Staging → Main → Production

Always push to staging **first** for testing before deploying to production.

### Step 1: Push to Staging (Testing)

```bash
./scripts/deploy/push-to-staging.sh "feat: add weekly monitoring system"
```

What this does:

- ✅ Commits all staged changes
- ✅ Pushes to `staging` branch
- ✅ Triggers Amplify staging build
- ✅ Deploys to staging environment

**Wait for staging to complete**: Check Amplify console or email notification

### Step 2: Test on Staging

Test all changes on staging environment:

- 🔗 **Staging URL**: https://staging.admi.africa
- 📊 **Amplify Console**: https://console.aws.amazon.com/amplify/home
- 📋 **Build Status**: Check email notifications
- 🧪 **Manual Testing**: Test features in staging environment

Commands for manual testing:

```bash
# Test locally (from project root)
npm run build
npm run dev

# Test specific features
npm run analytics:weekly-report
npm run faq:verify-all
npm run blog:stats
```

### Step 3: Merge to Main (Production)

Once staging is verified:

```bash
./scripts/deploy/merge-staging-to-main.sh
```

What this does:

- ✅ Fetches latest changes
- ✅ Checks out `main` branch
- ✅ Merges `staging` → `main`
- ✅ Pushes to main
- ✅ Triggers Amplify production build

**Wait for production build**: Monitor Amplify console

### Verification Checklist

Before running merge script, verify:

- ✅ Staging build completed without errors
- ✅ Staging deployment successful
- ✅ Manual testing passed on staging
- ✅ No new errors in logs
- ✅ Performance is acceptable
- ✅ All features work as expected

## Quick Reference

| Command                                         | Purpose                  | Target           |
| ----------------------------------------------- | ------------------------ | ---------------- |
| `./scripts/deploy/push-to-staging.sh "message"` | Push changes for testing | `staging` branch |
| `./scripts/deploy/merge-staging-to-main.sh`     | Merge after testing      | `main` branch    |
| `git status`                                    | Check current changes    | Local            |
| `git branch -a`                                 | List all branches        | Local + Remote   |
| `git log staging`                               | View staging commits     | `staging` branch |
| `git log main`                                  | View main commits        | `main` branch    |

## Branch Structure

```
main (production)
├── Amplify builds & deploys prod
├── Locked for manual merges only
└── Protected by GitHub branch rules

staging (testing)
├── Amplify builds & deploys staging
├── Where all features are tested first
└── Source for main branch

feature branches (optional)
├── For large features
├── Branch from staging
└── PR back to staging
```

## Amplify Deployment Flow

```
Push to staging branch
        ↓
Amplify detects push
        ↓
Amplify starts staging build
        ↓
Run media scripts + next build
        ↓
Deploy to staging.admi.africa
        ↓
(Manual testing here)
        ↓
Run merge-staging-to-main.sh
        ↓
Push to main branch
        ↓
Amplify detects push
        ↓
Amplify starts prod build
        ↓
Deploy to admi.africa (prod)
```

## Example Workflow

### Day 1: Push Weekly Monitoring Feature

```bash
# Make changes to code...
# Commit and push to staging for testing
./scripts/deploy/push-to-staging.sh "feat: add weekly organic traffic monitoring"

# Output:
# 🚀 Pushing to staging for testing...
# 📍 Current branch: main
# 📝 Committing changes...
# 📤 Pushing to staging branch...
# ✅ Successfully pushed to staging!
#
# Next steps:
#   1. Test on staging environment
#   2. Run: npm run build
#   3. Verify everything works
#   4. Then run: ./scripts/deploy/merge-staging-to-main.sh
```

### Day 2: After Testing (Merge to Production)

```bash
# Tested on staging and everything works
./scripts/deploy/merge-staging-to-main.sh

# Output:
# 🔀 Merging staging → main
# 📥 Fetching latest changes...
# 🔀 Checking out main...
# 🔀 Merging staging into main...
# 📤 Pushing to main...
# ✅ Successfully merged staging → main!
#
# 🎉 Deployment complete!
#
# 📊 Amplify will now build and deploy production
```

## Troubleshooting

### Merge Conflict?

```bash
# If merge has conflicts:
git status  # See what conflicts exist
# Fix conflicts in files
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Need to Revert?

```bash
# Revert last commit on main (before it's deployed)
git revert HEAD
git push origin main

# Or completely undo:
git reset --hard origin/main
git push --force-with-lease origin main  # ⚠️ Use carefully!
```

### Check What Changed?

```bash
# See commits between staging and main
git log main..staging

# See what files changed
git diff main staging --name-only

# See detailed diff
git diff main staging
```

## Best Practices

1. **Always test staging first** - Never push directly to main
2. **Wait for Amplify builds** - Don't assume builds succeeded; check email/console
3. **Use meaningful commit messages** - Describes what changed
4. **Small, frequent merges** - Easier to test and debug
5. **Keep staging clean** - Don't leave broken code on staging
6. **Document manual testing** - Note what was tested

## Environments

| Environment | Branch    | URL                 | Deploy Time     |
| ----------- | --------- | ------------------- | --------------- |
| Production  | `main`    | admi.africa         | Auto (5-10 min) |
| Staging     | `staging` | staging.admi.africa | Auto (5-10 min) |
| Local       | any       | localhost:3000      | Immediate       |

## Status Commands

```bash
# Check current branch
git branch

# Check remote branches
git branch -r

# See all commits on staging
git log staging --oneline

# See diff between staging and main
git diff main..staging --stat

# Check build status
aws amplify list-apps  # Shows all apps
aws amplify list-backend-deployments --app-id <app-id>
```

## Integrations

This workflow works with:

- ✅ GitHub Actions (CI/CD)
- ✅ AWS Amplify (Deployment)
- ✅ CloudWatch (Logging)
- ✅ SNS (Notifications)
- ✅ Lambda Functions (Serverless)

All changes automatically trigger Amplify builds via webhooks.
