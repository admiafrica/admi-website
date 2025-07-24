# SEO Rocket Blog Automation System

This system automatically generates 1000-word blog articles on creative and tech economy topics and saves them as drafts in Contentful for review and image addition.

## Features

- 🤖 **AI-Powered Content Generation**: Uses Perplexity AI for research and content creation
- 📊 **SEO Optimization**: Integrates with DataForSEO for keyword insights
- 🎯 **Topic Management**: Comprehensive database of creative and tech economy topics
- 📝 **Contentful Integration**: Saves articles as drafts with proper formatting
- 📅 **Automated Scheduling**: Daily, weekly, and batch generation options
- 📈 **Analytics & Logging**: Tracks generation statistics and errors

## Setup

1. **Environment Variables Required**:

   ```
   PERPLEXITY_API_KEY=your_perplexity_key
   FIRECRAWL_API_KEY=your_firecrawl_key (optional)
   DATAFORSEO_LOGIN=your_dataforseo_login (optional)
   DATAFORSEO_PASSWORD=your_dataforseo_password (optional)
   CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_token
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ENVIRONMENT=master
   ```

2. **Install Dependencies**:
   ```bash
   npm install axios contentful-management dotenv
   ```

## Usage

### Generate Single Article

```bash
node seo-rocket-blog-generator.js
```

### Scheduled Generation

#### Daily Generation (2 articles)

```bash
node blog-scheduler.js daily
```

#### Weekly Generation (7 articles)

```bash
node blog-scheduler.js weekly
```

#### Custom Batch Generation

```bash
node blog-scheduler.js batch 5  # Generate 5 articles
```

#### Category-Specific Generation

```bash
node blog-scheduler.js category creativeEconomy 3
node blog-scheduler.js category techEconomy 2
```

#### View Statistics

```bash
node blog-scheduler.js stats
```

## Available Topic Categories

1. **creativeEconomy**: Digital art, film, music, creative business
2. **techEconomy**: Fintech, web development, data science, cybersecurity
3. **digitalMarketing**: Social media, SEO, content marketing, influencer marketing
4. **gaming**: Game development, VR/AR, mobile games
5. **edtech**: Online learning, microlearning, educational content

## Article Structure

Each generated article includes:

- **1000 words** of high-quality content
- **SEO-optimized** titles and meta descriptions
- **Structured content** with H2/H3 headings
- **Rich text formatting** for Contentful
- **African context** and ADMI relevance
- **Actionable insights** and practical tips

## Workflow

1. **Topic Selection**: System rotates through categories for variety
2. **Research Phase**: Perplexity AI researches current trends and insights
3. **Content Generation**: AI creates comprehensive 1000-word article
4. **Contentful Integration**: Article saved as draft with proper formatting
5. **Manual Review**: Team reviews content and adds cover images
6. **Publication**: Approved articles are published

## Automation Setup

### Cron Jobs for Automated Generation

Add to crontab (`crontab -e`):

```bash
# Generate 2 articles daily at 9 AM
0 9 * * * cd /path/to/admi-website && node blog-scheduler.js daily >> logs/blog-generation.log 2>&1

# Generate 7 articles weekly on Sunday at 10 AM
0 10 * * 0 cd /path/to/admi-website && node blog-scheduler.js weekly >> logs/blog-generation.log 2>&1
```

### GitHub Actions (Optional)

Create `.github/workflows/blog-generation.yml`:

```yaml
name: Weekly Blog Generation
on:
  schedule:
    - cron: '0 10 * * 0' # Every Sunday at 10 AM
  workflow_dispatch: # Manual trigger

jobs:
  generate-blogs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: node blog-scheduler.js weekly
        env:
          PERPLEXITY_API_KEY: ${{ secrets.PERPLEXITY_API_KEY }}
          CONTENTFUL_MANAGEMENT_TOKEN: ${{ secrets.CONTENTFUL_MANAGEMENT_TOKEN }}
          CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID }}
```

## Monitoring & Maintenance

- **Log Files**: Check `blog-generation-log.json` for statistics and errors
- **Failed Generations**: Review error logs and retry if needed
- **Topic Refresh**: Update `blog-topics-database.js` with new topics periodically
- **Quality Control**: Regularly review generated content quality

## Customization

### Adding New Topics

Edit `blog-topics-database.js` to add new topics:

```javascript
newCategory: [
  {
    topic: 'Your New Topic',
    keywords: ['keyword1', 'keyword2'],
    category: 'Category Name',
    difficulty: 'beginner'
  }
]
```

### Adjusting Generation Settings

Modify `blog-scheduler.js`:

- Change `articlesPerBatch` for different batch sizes
- Update `categoryRotation` to include/exclude categories
- Adjust delay between generations (currently 30 seconds)

## Content Review Process

1. **Draft Review**: Check Contentful for new draft articles
2. **Content Quality**: Verify accuracy, tone, and ADMI relevance
3. **SEO Check**: Ensure keywords are naturally integrated
4. **Image Addition**: Add appropriate cover images
5. **Final Edit**: Make any necessary adjustments
6. **Publish**: Publish approved articles

## Troubleshooting

### Common Issues

1. **API Rate Limits**: Increase delays between generations
2. **Contentful Errors**: Check management token permissions
3. **Content Quality**: Adjust prompts in the generator
4. **Topic Repetition**: Update topic database or increase variety

### Error Handling

The system includes comprehensive error handling:

- API failures are logged and retried
- Failed generations don't stop the batch
- Detailed error logs help with debugging

## Performance Metrics

Track these metrics for optimization:

- Generation success rate
- Content quality scores
- SEO performance of published articles
- Time per generation
- Topic category performance

## Future Enhancements

- **Image Generation**: Auto-generate cover images using AI
- **Multi-language Support**: Generate content in multiple languages
- **Advanced SEO**: Real-time keyword trending integration
- **Content Optimization**: A/B testing for different content styles
- **Social Media Integration**: Auto-post summaries to social platforms
