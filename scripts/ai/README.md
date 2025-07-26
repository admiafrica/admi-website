# ADMI AI-Powered FAQ System

This system uses OpenAI Assistants with a comprehensive knowledge base to verify, improve, and generate accurate FAQs for ADMI courses in Contentful.

## Features

- **Knowledge Base Verification**: FAQs are verified against official ADMI course materials
- **Automated Generation**: Generate course-specific FAQs using AI
- **Content Optimization**: Improve existing FAQ content for accuracy and engagement
- **Contentful Integration**: Direct integration with your Contentful CMS

## Setup

### 1. Environment Variables
Add to your `.env` file:
```bash
OPENAI_API_KEY=your_openai_api_key_here
CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token
ADMI_CONTENTFUL_SPACE_ID=your_space_id
ADMI_CONTENTFUL_ENVIRONMENT=master
```

### 2. Install Dependencies
```bash
npm install openai
```

### 3. Setup AI Assistant
```bash
npm run faq:setup-assistant
```
This creates an OpenAI Assistant with ADMI's knowledge base and saves the configuration.

## Usage

### Generate Verified FAQs for a Course
```bash
# Preview FAQs (saves to file for review)
npm run faq:generate music-production-diploma

# Generate and automatically update Contentful
npm run faq:generate music-production-diploma -- --auto-update
```

### Verify Existing FAQs
```bash
# Analyze all existing FAQs for accuracy
npm run faq:verify-all
```

### Analyze Current FAQ Content
```bash
# Get insights on current FAQ quality and gaps
npm run faq:analyze
```

## How It Works

### 1. Knowledge Base
The AI Assistant is loaded with comprehensive ADMI information including:
- Course details (duration, fees, equipment, software)
- Career outcomes and salary ranges
- Admission requirements
- Facilities and industry partnerships
- Employment statistics

### 2. Verification Process
- Each FAQ is checked against the knowledge base
- Accuracy scores and specific corrections are provided
- Improved versions are suggested with reasoning

### 3. Generation Process
- Course-specific context is provided to the AI
- FAQs are generated focusing on prospective student concerns
- Content is optimized for conversion while maintaining accuracy

## Course Coverage

Currently configured for:
- Music Production Diploma
- Digital Marketing Certificate  
- Graphic Design Certificate
- Video Production Certificate
- (Easily extensible for other courses)

## FAQ Quality Standards

Generated FAQs focus on:
- **Accuracy**: All facts verified against knowledge base
- **Completeness**: Comprehensive answers addressing student concerns
- **Conversion**: Highlighting ADMI's unique value propositions
- **Specificity**: Concrete details (fees, equipment, career outcomes)
- **Relevance**: Decision-making factors for prospective students

## File Structure

```
scripts/ai/
├── README.md                           # This guide
├── assistant-faq-verification.js       # Setup assistant & verify FAQs
├── assistant-faq-manager.js           # Generate new verified FAQs
├── optimize-faqs.js                   # Analyze current FAQ quality
├── assistant-config.json              # Assistant configuration (auto-generated)
└── generated-faqs-[course].json       # Generated FAQ previews
```

## Example Workflow

1. **Initial Setup** (one-time):
   ```bash
   npm run faq:setup-assistant
   ```

2. **Generate FAQs for a new course**:
   ```bash
   npm run faq:generate sound-engineering-diploma
   # Review the generated FAQs in the JSON file
   npm run faq:generate sound-engineering-diploma -- --auto-update
   ```

3. **Verify existing content**:
   ```bash
   npm run faq:verify-all
   # Review verification results in faq-verification-results.json
   ```

4. **Regular optimization**:
   ```bash
   npm run faq:analyze
   # Get insights on content gaps and quality issues
   ```

## Benefits

- **Consistency**: All FAQs follow the same quality standards
- **Accuracy**: Content is verified against official materials
- **Efficiency**: Generate comprehensive FAQs in minutes vs hours
- **Optimization**: AI identifies and fills content gaps
- **Scalability**: Easy to add new courses and maintain existing content

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Ensure `OPENAI_API_KEY` is set in your environment
   - Verify the API key has sufficient credits

2. **Contentful Connection Error**
   - Check `CONTENTFUL_MANAGEMENT_TOKEN` and `ADMI_CONTENTFUL_SPACE_ID`
   - Ensure the token has write permissions

3. **Assistant Not Found**
   - Run `npm run faq:setup-assistant` to create the assistant
   - Check that `assistant-config.json` exists

### Rate Limiting
The scripts include appropriate delays to respect API rate limits. For large batches, the process may take several minutes.

## Future Enhancements

- **Automated Scheduling**: Regular FAQ updates based on course changes
- **Analytics Integration**: Track which FAQs are most viewed/helpful
- **Multi-language Support**: Generate FAQs in multiple languages
- **Student Feedback Integration**: Improve FAQs based on actual student questions