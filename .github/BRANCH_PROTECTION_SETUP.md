# Branch Protection Setup Guide

## 🎯 Branch Strategy

```
feature/xyz → staging → main → production
```

- **feature branches**: Development work
- **staging**: Testing and validation (auto-deploys to Amplify staging)
- **main**: Production-ready code (auto-deploys to Amplify production)

---

## 🔒 GitHub Branch Protection Rules

### Step 1: Protect `main` Branch

Go to: **Settings** → **Branches** → **Add branch protection rule**

**Branch name pattern**: `main`

**Enable these protections**:

✅ **Require a pull request before merging**

- Required approvals: 1 (or 0 if you're solo)
- Dismiss stale pull request approvals when new commits are pushed

✅ **Require status checks to pass before merging**

- Require branches to be up to date before merging
- Status checks:
  - `check-staging-merge` (from staging-to-main.yml workflow)
  - `build` (if you have CI/CD)

✅ **Require conversation resolution before merging**

✅ **Do not allow bypassing the above settings**

- Include administrators: ❌ (uncheck - allows emergency fixes)

✅ **Restrict who can push to matching branches**

- Leave empty to allow all with write access via PR only

✅ **Allow force pushes**

- ❌ Disabled (prevents history rewriting)

✅ **Allow deletions**

- ❌ Disabled (prevents accidental deletion)

---

### Step 2: Protect `staging` Branch

**Branch name pattern**: `staging`

**Enable these protections**:

✅ **Require a pull request before merging**

- Required approvals: 0 (for faster iteration)

✅ **Require status checks to pass before merging**

- Status checks:
  - `build` or `test` (if you have them)

✅ **Allow force pushes**

- ❌ Disabled

---

## 📋 Workflow Enforcement

### Current Workflow (To Be Changed)

```
❌ Direct commits to main
❌ Feature branches → main
```

### New Workflow (Protected)

```
✅ feature/conversion-tracking → staging (PR + merge)
✅ Test on staging deployment
✅ staging → main (PR only, enforced by GitHub Action)
✅ Auto-deploys to production
```

---

## 🚀 Development Process

### 1. Create Feature Branch

```bash
git checkout staging
git pull origin staging
git checkout -b feature/my-feature
```

### 2. Make Changes & Push

```bash
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

### 3. Create PR to Staging

```bash
# On GitHub:
# Base: staging ← Compare: feature/my-feature
# Create Pull Request
# Merge after review/tests pass
```

### 4. Test on Staging

```bash
# Wait for Amplify to deploy staging branch
# Test at: https://staging.admi.africa (or your staging URL)
# Verify features work correctly
```

### 5. Promote Staging to Main

```bash
git checkout staging
git pull origin staging
git checkout main
git pull origin main

# Create PR on GitHub:
# Base: main ← Compare: staging
# The GitHub Action will verify it's from staging
# Merge to deploy to production
```

---

## 🔧 Emergency Hotfix Process

For critical production fixes:

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix

# 2. Make fix and push
git add .
git commit -m "fix: critical production issue"
git push origin hotfix/critical-fix

# 3. Create PR to main (will be blocked by protection)
# Admin must:
# - Review the hotfix
# - Temporarily disable branch protection OR
# - Override the check (if admin exclusion is enabled)

# 4. After merging to main, backport to staging
git checkout staging
git merge main
git push origin staging
```

---

## 📊 Current Branch Status

Run this to see current state:

```bash
# Check what's in main but not staging
git log origin/staging..origin/main --oneline

# Check what's in staging but not main
git log origin/main..origin/staging --oneline
```

---

## 🔄 Sync Branches Now

### Option A: Make Staging Catch Up to Main (One-Time)

Since main is currently ahead, sync staging first:

```bash
git checkout staging
git pull origin staging
git merge origin/main -m "chore: sync staging with main commits"
git push origin staging
```

### Option B: Reset and Start Fresh (Nuclear Option)

```bash
# Backup current staging
git checkout staging
git branch staging-backup

# Reset staging to match main
git reset --hard origin/main
git push --force origin staging

# ⚠️ WARNING: This overwrites staging history
```

---

## ✅ Verification Steps

After setting up protections:

1. Try to push directly to main:

   ```bash
   git checkout main
   git commit --allow-empty -m "test"
   git push origin main
   # Should fail with: "protected branch hook declined"
   ```

2. Try to create PR from feature to main:

   ```
   # Should fail GitHub Action check
   # Error: "Pull requests to main must come from staging"
   ```

3. Create PR from staging to main:
   ```
   # Should pass GitHub Action check
   # ✅ Ready to merge
   ```

---

## 📚 Additional Resources

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions for Branch Protection](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request)
