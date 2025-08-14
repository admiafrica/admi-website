# AWS Amplify Environment Variables Configuration

## Issue Resolution: Enquiry Form Server Configuration Error

**Date:** August 5, 2025  
**Issue:** Enquiry form working locally but failing in production with server configuration error  
**Root Cause:** Missing BREVO email service environment variables in production runtime

## Environment Variables Configuration

### AWS Amplify App Details

- **App ID:** `dlm0hjalapt7d`
- **App Name:** Website 3.0 (admi.africa)
- **Domain:** https://admi.africa
- **Repository:** https://github.com/admi-tech/admi-website

### All Required Environment Variables

The following environment variables are configured at **both App Level and Branch Level** for complete functionality:

#### **App-Level Environment Variables**

These are inherited by all branches unless overridden:

```bash
# Content Management (Contentful)
ADMI_CONTENTFUL_ACCESS_TOKEN=FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc
ADMI_CONTENTFUL_ENVIRONMENT=master
ADMI_CONTENTFUL_SPACE_ID=qtu3mga6n6gc
CONTENTFUL_ACCESS_TOKEN=FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-U3mhKrmNy028PP7NyzBWVCS-cloXq5bA6lv05YFhOEs
CONTENTFUL_PREVIEW_API_TOKEN=w-WBfKULL4gIvPboJ2y7ovf6_tMornHWLFulst4CF1A
CONTENTFUL_SPACE_ID=qtu3mga6n6gc

# Email Service (BREVO) - Required for Enquiry Form
BREVO_API_KEY=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
BREVO_LIST_ID=106

# YouTube Integration
ADMI_YOUTUBE_CHANNEL_HANDLE=@ADMIafrica
ADMI_YOUTUBE_CHANNEL_ID=UCqLmokG6Req2pHn2p7D8WZQ
YOUTUBE_API_KEY=AIzaSyAVZo0ViS2LyHUqt-4OfnaMivci7m3yQxg

# Authentication (Cognito)
COGNITO_CLIENT_ID=7323is1c5qfk5bcin5it4r75ov
COGNITO_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_okkRTu6kY

# Build Configuration
BUILD_ENV=production
CRON_SECRET=admi-cron-secret-2025

# External APIs
DATAFORSEO_LOGIN=wilfred@admi.africa
DATAFORSEO_PASSWORD=d2lsZnJlZEBhZG1pLmFmcmljYTo1NGE4MTkxYWUyYTc0MTQ3
FIRECRAWL_API_KEY=fc-58710d237c454f4eb781d197629b8e16
PERPLEXITY_API_KEY=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

# Analytics
GA4_PROPERTY_ID=250948607
GOOGLE_ANALYTICS_PROPERTY_ID=250948607
GOOGLE_APPLICATION_CREDENTIALS=./ga-service-account.json

# AI/OpenAI
NEXT_OPENAI_API_KEY=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

# AWS S3
S3_ARCHIVE_BUCKET=admi-media-archive-381492234121
S3_BUCKET_NAME=admi-media-archive-381492234121
S3_REGION=us-east-1

# Public/Frontend Variables
NEXT_PUBLIC_ADMI_GTM_ID=GTM-KPDDVWR
NEXT_PUBLIC_ADMI_SERVICES_API=https://admi.craydel.online
NEXT_PUBLIC_ADMI_YOUTUBE_CHANNEL_ID=UCqLmokG6Req2pHn2p7D8WZQ
NEXT_PUBLIC_CHATBOT_CLIENT_ID=https://chatbot.vumicentral.com
NEXT_PUBLIC_CHATBOT_TENANT_ID=admi.africa
NEXT_PUBLIC_COGNITO_CLIENT_ID=7323is1c5qfk5bcin5it4r75ov
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_okkRTu6kY
NEXT_PUBLIC_CRAYDEL_GTM_ID=GTM-KPDDVWR
NEXT_PUBLIC_SITE_DESCRIPTION=ADMI is a leading creative media and technology training institution, offering practical courses in Film & TV, Music, Animation, Gaming, Graphic Design, Digital Marketing and many more.
NEXT_PUBLIC_SITE_KEYWORDS=digital media, film school, animation school, music production, graphic design, digital marketing, Kenya, Africa
NEXT_PUBLIC_SITE_NAME=Africa Digital Media Institute
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyAVZo0ViS2LyHUqt-4OfnaMivci7m3yQxg
```

#### **Branch-Specific Environment Variables**

**Main Branch (Production):**

```bash
BREVO_API_KEY=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
BREVO_LIST_ID=106
NEXT_PUBLIC_ACCESS_TOKEN=2|M78tJR3aHFMnHuZSNl7ZHcS4arqkdoAUN9qx96hCc1e7c0dd
NEXT_PUBLIC_API_BASE_URL=https://admi.africa
```

**Staging Branch:**

```bash
BREVO_API_KEY=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
BREVO_LIST_ID=106
NEXT_PUBLIC_ACCESS_TOKEN=1|Xz5sbGAIw6IERd0ihF0hF0RLt2c4uFHoktDzowJYa7a21bad
NEXT_PUBLIC_API_BASE_URL=https://campaigns-staging.admi.africa
```

### Build Configuration

#### Local amplify.yml Build Spec

The `amplify.yml` file defines how environment variables are exported to the production runtime:

```yaml
frontend:
  phases:
    build:
      commands:
        - echo "NODE_ENV=production" >> .env.production
        - echo "ADMI_CONTENTFUL_SPACE_ID=$ADMI_CONTENTFUL_SPACE_ID" >> .env.production
        - echo "ADMI_CONTENTFUL_ACCESS_TOKEN=$ADMI_CONTENTFUL_ACCESS_TOKEN" >> .env.production
        - echo "ADMI_CONTENTFUL_ENVIRONMENT=$ADMI_CONTENTFUL_ENVIRONMENT" >> .env.production
        - echo "BREVO_API_KEY=$BREVO_API_KEY" >> .env.production
        - echo "BREVO_LIST_ID=$BREVO_LIST_ID" >> .env.production
        - npm run build
```

#### AWS Amplify Console Configuration

Environment variables are configured in the AWS Amplify console and automatically available during build time. However, they must be explicitly exported to `.env.production` to be available at runtime for Next.js API routes.

## Changes Made

### 1. Updated amplify.yml

**File:** `/Users/wilfred/admi-website/amplify.yml`

**Added lines 36-37:**

```yaml
- echo "BREVO_API_KEY=$BREVO_API_KEY" >> .env.production
- echo "BREVO_LIST_ID=$BREVO_LIST_ID" >> .env.production
```

### 2. Updated AWS Amplify App Configuration

**Command executed:**

```bash
AWS_PROFILE=admi-website aws amplify update-app --app-id dlm0hjalapt7d --build-spec "$(cat amplify.yml)"
```

**Result:** BuildSpec successfully updated with new environment variable exports

### 3. Updated Branch-Level Environment Variables

**Main Branch:**

```bash
AWS_PROFILE=admi-website aws amplify update-branch --app-id dlm0hjalapt7d --branch-name main --environment-variables "NEXT_PUBLIC_ACCESS_TOKEN=2|M78tJR3aHFMnHuZSNl7ZHcS4arqkdoAUN9qx96hCc1e7c0dd,NEXT_PUBLIC_API_BASE_URL=https://admi.africa,BREVO_API_KEY=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,BREVO_LIST_ID=106"
```

**Staging Branch:**

```bash
AWS_PROFILE=admi-website aws amplify update-branch --app-id dlm0hjalapt7d --branch-name staging --environment-variables "NEXT_PUBLIC_ACCESS_TOKEN=1|Xz5sbGAIw6IERd0ihF0hF0RLt2c4uFHoktDzowJYa7a21bad,NEXT_PUBLIC_API_BASE_URL=https://campaigns-staging.admi.africa,BREVO_API_KEY=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,BREVO_LIST_ID=106"
```

### 4. Triggered Deployments

**Main Branch:**

- Job #155: Currently running (previous deployment in progress)

**Staging Branch:**

- Job #254: Started deployment with updated BREVO variables

## Testing Verification

### Local Testing

- ✅ Form works at `http://localhost:3001/enquiry`
- ✅ All environment variables available via `.env.local`

### Production Testing (Post-Fix)

- 🔄 **Next deployment will include BREVO variables**
- 🔄 **Form should work at https://admi.africa/enquiry**

## Important Notes

### ⚠️ Security Considerations

1. **Never commit sensitive environment variables to repository**
2. **Keep AWS Amplify console environment variables secure**
3. **Rotate API keys regularly**

### 🔄 Deployment Process

1. Environment variables are set in AWS Amplify console
2. Build process reads variables from Amplify environment
3. Build spec exports required variables to `.env.production`
4. Next.js runtime accesses variables for API routes

### 🛠️ Troubleshooting Steps

If enquiry form still fails after deployment:

1. **Check build logs:**

   ```bash
   AWS_PROFILE=admi-website aws logs get-log-events --log-group-name "/aws/amplify/dlm0hjalapt7d" --log-stream-name "main/YYYY/MM/DD/[stream-id]"
   ```

2. **Verify environment variables in build:**

   - Check build logs for successful `.env.production` creation
   - Ensure BREVO variables are exported during build phase

3. **Test API endpoint directly:**
   ```bash
   curl -X POST https://admi.africa/api/enquiry \
        -H "Content-Type: application/json" \
        -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

## Next Steps

1. **Monitor next deployment** for successful inclusion of BREVO variables
2. **Test enquiry form** on production after deployment
3. **Verify email delivery** through BREVO dashboard
4. **Update this documentation** if additional variables are needed

---

**Last Updated:** August 5, 2025  
**Author:** Claude Code Assistant  
**AWS Profile:** admi-website  
**Environment:** Production (admi.africa)
