# Security Implementation for ADMI Website

## Overview

This document outlines the security measures implemented to protect the ADMI website from spam URLs, malicious crawlers, and other security threats, particularly those arising from the domain migration from `admi.ac.ke` to `admi.africa`.

## Problem Statement

After migrating from `admi.ac.ke` to `admi.africa`, spam URLs appeared in Google Search Console with patterns like:

- `https://admi.africa/?s=Nigeria%20Online%20Slots%20Platform:%20https://www.ak.bet/?&ch=150003`
- WordPress-style search parameters (`?s=`)
- Gambling and adult content parameters
- Suspicious referral links

## Security Measures Implemented

### 1. Middleware Protection (`middleware.ts`)

**Purpose**: Filter and block malicious requests at the edge before they reach the application.

**Features**:

- Blocks URLs containing spam keywords (casino, slots, betting, etc.)
- Blocks suspicious query parameters (`s=`, `ch=`, etc.)
- Removes unknown/unauthorized parameters
- Adds security headers to all responses
- Implements Content Security Policy (CSP)

**Blocked Content**:

- Gambling-related terms
- Adult content
- Pharmaceutical spam
- Financial scams
- Cryptocurrency spam
- WordPress-style parameters

### 2. Enhanced Robots.txt (`src/app/robots.ts`)

**Purpose**: Prevent spam crawlers and aggressive bots from indexing the site.

**Features**:

- Blocks specific spam URL patterns
- Rate limits aggressive crawlers
- Allows legitimate search engines (Google, Bing, DuckDuckGo)
- Blocks known spam bots (SemrushBot, AhrefsBot, etc.)

### 3. Custom 404 Page (`src/pages/404.tsx`)

**Purpose**: Provide a user-friendly experience for blocked/invalid URLs.

**Features**:

- Clean, branded 404 page
- Navigation back to legitimate content
- Analytics tracking for 404 errors
- SEO-friendly with noindex directive

### 4. Security Utilities (`src/utils/security.ts`)

**Purpose**: Centralized security validation and spam detection.

**Functions**:

- `isSpamURL()`: Detects spam content in URLs
- `hasSuspiciousPatterns()`: Identifies suspicious URL patterns
- `cleanURLParams()`: Sanitizes URL parameters
- `generateSecurityReport()`: Creates security incident reports

### 5. Security Reporting API (`src/pages/api/security/report.ts`)

**Purpose**: Log and monitor security incidents.

**Features**:

- Logs blocked requests
- Generates security reports
- Can integrate with external monitoring services
- Tracks incident severity levels

### 6. Next.js Configuration Updates (`next.config.mjs`)

**Purpose**: Handle redirects and add security headers at the server level.

**Features**:

- Redirects old domain (`admi.ac.ke`) to new domain (`admi.africa`)
- Blocks WordPress-related URLs
- Redirects spam parameters to 404
- Enhanced security headers

## Implementation Details

### Spam Detection Patterns

The system detects and blocks:

1. **Keyword-based spam**: casino, slots, betting, gambling, adult content
2. **Parameter-based spam**: WordPress search (`?s=`), channel parameters (`?ch=`)
3. **Domain-based spam**: `.bet`, `.casino`, `.porn` domains
4. **Pattern-based spam**: URLs with excessive encoding, suspicious referrals

### Allowed Parameters

Only these parameters are allowed through:

- UTM tracking: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- Analytics: `gclid`, `fbclid`
- Legitimate site functions: `ref`, `source`, `page`, `limit`, `category`, `search`, `q`, `slug`

### Security Headers

The following security headers are applied:

- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-XSS-Protection`: Enables XSS filtering
- `Strict-Transport-Security`: Enforces HTTPS
- `Content-Security-Policy`: Restricts resource loading
- `Referrer-Policy`: Controls referrer information

## Monitoring and Maintenance

### Google Search Console

1. **Monitor 404 errors**: Check for new spam URL patterns
2. **Review crawl errors**: Identify blocked legitimate content
3. **Update security rules**: Add new spam patterns as they appear

### Security Logs

The system logs:

- Blocked URLs with reasons
- Bot detection incidents
- Security report generation
- Rate limiting events

### Regular Updates

1. **Update spam keywords**: Add new spam terms as they emerge
2. **Review bot patterns**: Update bot detection rules
3. **Monitor false positives**: Ensure legitimate traffic isn't blocked
4. **Update CSP**: Adjust Content Security Policy as needed

## Testing

### Test Spam URLs

These URLs should be blocked:

- `/?s=casino`
- `/?ch=12345`
- `/courses?gambling=true`
- Any URL containing `.bet` or `.casino`

### Test Legitimate URLs

These URLs should work:

- `/?utm_source=google`
- `/courses?search=design`
- `/news?category=events`

## Environment Variables

Add these to your environment for enhanced security:

```env
# Security monitoring webhook (optional)
SECURITY_WEBHOOK_URL=https://your-monitoring-service.com/webhook

# Analytics endpoint for security reports (optional)
ANALYTICS_ENDPOINT=https://your-analytics-service.com/api
```

## Deployment Checklist

- [ ] Deploy middleware.ts
- [ ] Update robots.txt
- [ ] Deploy custom 404 page
- [ ] Update Next.js configuration
- [ ] Test spam URL blocking
- [ ] Test legitimate URL functionality
- [ ] Monitor Google Search Console
- [ ] Set up security monitoring alerts

## Support

For questions or issues with the security implementation, contact the development team or refer to the Next.js security documentation.
