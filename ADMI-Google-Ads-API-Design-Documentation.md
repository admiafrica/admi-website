# ADMI Google Ads API Integration Design Documentation

**Document Version:** 1.0  
**Date:** November 4, 2025  
**Organization:** Africa Digital Media Institute (ADMI)  
**Website:** https://admi.africa  
**Contact:** admissions@admi.africa  

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
This document outlines the design and implementation of a Google Ads API integration tool for Africa Digital Media Institute (ADMI). The tool is designed to programmatically access and analyze ADMI's own Google Ads campaign data to optimize digital marketing performance and recover from a significant website traffic decline.

### 1.2 Business Context
ADMI experienced a 94.7% decline in website traffic from 2024 to 2025 (from 537,842 to 28,565 sessions). Analysis revealed that paid advertising traffic dropped by 99.4% (from 267,577 to 1,563 sessions), indicating that previously successful Google Ads campaigns were paused or removed. This tool will identify these campaigns and enable data-driven reactivation strategies.

### 1.3 Scope
- **Internal Use Only**: Tool accesses only ADMI's own Google Ads account (Customer ID: 392-935-5931)
- **Read-Only Operations**: No campaign modifications, only data retrieval and analysis
- **Historical Analysis**: Focus on 2024-2025 performance data
- **Recovery Optimization**: Identify paused campaigns for potential reactivation

---

## 2. SYSTEM ARCHITECTURE

### 2.1 Technology Stack
- **Runtime Environment**: Node.js 18+
- **Google Ads API Library**: google-ads-api (npm package)
- **Authentication**: OAuth 2.0 with refresh tokens
- **Data Storage**: JSON files for analysis results
- **Environment**: Local development environment

### 2.2 Authentication Flow
```
1. OAuth 2.0 Client Credentials (Web Application)
   - Client ID: Configured in Google Cloud Console
   - Client Secret: Securely stored in environment variables
   - Redirect URI: http://localhost:3000 (for local authorization)

2. Authorization Process
   - User authorizes application via Google OAuth consent screen
   - Authorization code exchanged for access and refresh tokens
   - Refresh token stored securely for ongoing API access

3. API Access
   - Developer Token: Required for Google Ads API access
   - Customer ID: 392-935-5931 (ADMI's Google Ads account)
   - Scopes: https://www.googleapis.com/auth/adwords (read-only)
```

### 2.3 Data Flow Architecture
```
[Google Ads Account] → [Google Ads API] → [ADMI Analysis Tool] → [JSON Reports]
                                              ↓
                                        [Recovery Recommendations]
```

---

## 3. FUNCTIONAL REQUIREMENTS

### 3.1 Core Functionality

#### 3.1.1 Campaign Status Analysis
- **Objective**: Retrieve current status of all campaigns (Enabled/Paused/Removed)
- **API Endpoint**: Campaign resource with status filtering
- **Output**: Categorized list of campaigns by status
- **Business Value**: Identify paused campaigns that can be reactivated immediately

#### 3.1.2 Historical Performance Analysis
- **Objective**: Analyze campaign performance data from 2024-2025
- **Metrics Retrieved**:
  - Impressions, Clicks, Cost
  - Conversions, Conversion Rate
  - Click-through Rate (CTR)
  - Cost Per Click (CPC)
- **Date Range**: January 1, 2024 - November 3, 2025
- **Business Value**: Identify top-performing campaigns for prioritized reactivation

#### 3.1.3 Campaign Matching
- **Objective**: Match Google Ads campaigns with GA4 traffic data
- **Target Campaigns** (identified from GA4 analysis):
  - "Creative Media and Tech" (10,475 sessions in 2024)
  - Campaign "1" (129,197 sessions - top performer)
  - "Digital Content Creation" (6,656 sessions)
  - "Data Analysis" (5,617 sessions)
- **Business Value**: Prioritize campaigns with proven traffic generation capability

### 3.2 Reporting and Analysis

#### 3.2.1 Recovery Recommendations
- **Immediate Actions**: List of paused campaigns ready for reactivation
- **Budget Recommendations**: Suggested daily budgets based on historical performance
- **Priority Ranking**: Campaigns ranked by historical ROI and traffic generation
- **Timeline Projections**: Expected traffic recovery timeline

#### 3.2.2 Data Export
- **Format**: JSON files with structured campaign data
- **Content**: Complete campaign analysis with performance metrics
- **Usage**: Internal review and strategic planning

---

## 4. TECHNICAL IMPLEMENTATION

### 4.1 Core Classes and Methods

#### 4.1.1 OAuthGoogleAdsAnalysis Class
```javascript
class OAuthGoogleAdsAnalysis {
  // Initialize Google Ads API client with OAuth credentials
  async initializeClient()
  
  // Test API connection and retrieve account information
  async testConnection()
  
  // Get current status of all campaigns
  async getCampaignStatus()
  
  // Retrieve historical performance data (2024-2025)
  async getHistoricalPerformance()
  
  // Generate recovery recommendations based on analysis
  generateRecoveryRecommendations()
  
  // Execute complete analysis workflow
  async runCompleteAnalysis()
}
```

#### 4.1.2 Key API Queries

**Campaign Status Query:**
```sql
SELECT 
  campaign.id,
  campaign.name,
  campaign.status,
  campaign.advertising_channel_type,
  campaign.start_date,
  campaign.end_date,
  campaign.budget.amount_micros
FROM campaign 
WHERE campaign.status IN ('ENABLED', 'PAUSED', 'REMOVED')
ORDER BY campaign.name
```

**Historical Performance Query:**
```sql
SELECT 
  campaign.id,
  campaign.name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  segments.date
FROM campaign 
WHERE segments.date BETWEEN '2024-01-01' AND '2025-11-03'
AND campaign.status != 'REMOVED'
ORDER BY metrics.cost_micros DESC
```

### 4.2 Security Considerations

#### 4.2.1 Credential Management
- **Environment Variables**: All sensitive credentials stored in .env file
- **No Hardcoding**: No API keys or tokens in source code
- **Local Storage**: Credentials remain on local development environment
- **Access Control**: Only authorized ADMI personnel have access

#### 4.2.2 Data Privacy
- **Own Data Only**: Tool accesses only ADMI's Google Ads account
- **No External Sharing**: Analysis results used internally only
- **Temporary Storage**: API responses stored temporarily for analysis
- **Secure Deletion**: Sensitive data removed after analysis completion

---

## 5. BUSINESS IMPACT AND JUSTIFICATION

### 5.1 Problem Statement
ADMI's website traffic declined 94.7% from 2024 to 2025, primarily due to a 99.4% drop in paid advertising traffic. This represents a loss of approximately 509,277 sessions and significant impact on student enrollment and revenue.

### 5.2 Solution Benefits
- **Immediate Recovery**: Identify and reactivate paused campaigns within 24-48 hours
- **Data-Driven Decisions**: Base reactivation strategy on historical performance data
- **Cost Optimization**: Prioritize campaigns with proven ROI
- **Traffic Restoration**: Expected recovery of 60-80% of 2024 traffic levels

### 5.3 Expected Outcomes
- **Week 1**: 500-800 daily sessions (vs. current 78 sessions)
- **Month 1**: 1,000+ daily sessions with optimized campaign performance
- **Month 3**: 1,500+ daily sessions with sustainable paid advertising strategy

### 5.4 ROI Justification
- **Investment**: Minimal development time and API usage costs
- **Return**: Restoration of student lead generation and enrollment pipeline
- **Risk Mitigation**: Prevent further enrollment decline and revenue loss

---

## 6. COMPLIANCE AND GOVERNANCE

### 6.1 Google Ads API Compliance
- **Terms of Service**: Full compliance with Google Ads API Terms of Service
- **Rate Limits**: Respect API rate limits and quotas
- **Data Usage**: Use data only for authorized business purposes
- **Account Access**: Access limited to own Google Ads account only

### 6.2 Data Governance
- **Purpose Limitation**: Data used only for campaign optimization
- **Retention Policy**: Analysis data retained only as long as needed
- **Access Control**: Limited to authorized ADMI marketing personnel
- **Audit Trail**: All API access logged for compliance review

### 6.3 Educational Institution Context
- **Legitimate Business Use**: Supporting educational mission through optimized marketing
- **Student Benefit**: Improved marketing efficiency benefits prospective students
- **Transparency**: Clear documentation of tool purpose and functionality
- **Accountability**: Regular review of tool usage and effectiveness

---

## 7. IMPLEMENTATION TIMELINE

### Phase 1: Setup and Authentication (Completed)
- ✅ Google Cloud Console project configuration
- ✅ OAuth 2.0 credentials setup
- ✅ Developer token application
- ✅ API client initialization

### Phase 2: Core Development (Completed)
- ✅ Campaign status analysis functionality
- ✅ Historical performance data retrieval
- ✅ Recovery recommendation engine
- ✅ JSON report generation

### Phase 3: Testing and Validation (Pending API Approval)
- ⏳ API connection testing with production account
- ⏳ Data accuracy validation
- ⏳ Recovery recommendation verification

### Phase 4: Production Deployment (Post-Approval)
- 📅 Campaign analysis execution
- 📅 Recovery strategy implementation
- 📅 Performance monitoring and optimization

---

## 8. CONCLUSION

This Google Ads API integration tool represents a critical component of ADMI's digital marketing recovery strategy. By providing programmatic access to campaign performance data, the tool enables data-driven decision making for campaign reactivation and optimization.

The tool's design prioritizes security, compliance, and business value while maintaining focus on ADMI's core educational mission. Upon Google's approval of Basic API access, this tool will provide immediate actionable insights to restore ADMI's digital marketing effectiveness and support continued student enrollment growth.

**Document Prepared By:** ADMI Technical Team  
**Review Date:** November 4, 2025  
**Next Review:** Post-Implementation (30 days after API approval)
