# Deployment Quick Start Guide

## TL;DR

✅ **Staging**: Auto-deploys on every push
❌ **Production**: Deploys daily at midnight EAT (or manual)

## Daily Workflow

```bash
# 1. Work on staging
git checkout staging
git add .
git commit -m "your changes"
git push origin staging
# ✅ Auto-deploys to staging

# 2. When ready for production
git checkout main
git merge staging
git push origin main
# ⏰ Will deploy at midnight (or trigger manual deploy)
```

## Manual Production Deploy

**Quick command:**
```bash
AWS_PROFILE=admi-website aws amplify start-job \
  --app-id dlm0hjalapt7d \
  --branch-name main \
  --job-type RELEASE \
  --region us-east-1
```

## Schedule

- **Daily at**: 00:00 EAT (midnight East Africa Time)
- **UTC time**: 21:00 UTC (previous day)
- **Automatic**: Yes, via Lambda + EventBridge

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Staging   │      │     Main     │      │ Production  │
│   Branch    │─────▶│    Branch    │─────▶│   Website   │
└─────────────┘      └──────────────┘      └─────────────┘
     AUTO                 SCHEDULED              LIVE
   (instant)            (midnight EAT)      (admi.africa)
```

## Key Points

1. ✅ **Staging is your sandbox** - push anytime, auto-deploys
2. ⏰ **Production updates once daily** - scheduled at midnight
3. 🚀 **Need urgent fix?** - Use manual deploy command
4. 📊 **Contentful API**: Down to 1,500 calls/month (from 45,000!)
5. 💰 **Cost**: $0 - stays in free tier

## Full Documentation

See [DEPLOYMENT-WORKFLOW.md](docs/DEPLOYMENT-WORKFLOW.md) for complete details.
