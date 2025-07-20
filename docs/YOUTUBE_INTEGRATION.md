# YouTube Integration for ADMI Website

This document outlines the YouTube integration system that dynamically pulls videos from ADMI's YouTube channel to enhance course pages and drive traffic/conversions.

## 🎯 Overview

The YouTube integration system automatically fetches videos from ADMI's YouTube channel and intelligently categorizes them by course type, creating dynamic video galleries that:

- **Drive Traffic**: Showcase student work and success stories
- **Increase Conversions**: Provide social proof and course previews
- **Improve SEO**: Add video-rich content to course pages
- **Enhance User Experience**: Offer engaging multimedia content

## 🏗️ Architecture

### Core Components

1. **YouTube API Utility** (`src/utils/youtube-api.ts`)

   - Fetches videos from ADMI channel
   - Categorizes videos by course keywords
   - Formats video data for display

2. **Video Gallery Page** (`src/pages/videos/index.tsx`)

   - Main video hub with search and filtering
   - Static generation with hourly revalidation
   - Category-based organization

3. **Course Video Section** (`src/components/course/CourseVideoSection.tsx`)

   - Enhanced course pages with related videos
   - Tabbed interface (Preview, Related, Insights)
   - Course-specific video filtering

4. **Video Showcase Component** (`src/components/home/VideoShowcase.tsx`)
   - Homepage video highlights
   - Featured student work and testimonials
   - Call-to-action integration

## 🔧 Setup Instructions

### 1. YouTube API Configuration

1. **Get YouTube API Key**:

   - Visit [Google Cloud Console](https://console.developers.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3
   - Create credentials (API Key)

2. **Configure Environment Variables**:

   ```bash
   # Add to .env.local
   YOUTUBE_API_KEY=your_youtube_api_key_here
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
   ADMI_YOUTUBE_CHANNEL_ID=UC_x5XG1OV2P6uZZ5FSM9Ttw
   ```

3. **Update Channel Configuration**:
   ```typescript
   // In src/utils/youtube-api.ts
   const ADMI_CHANNEL_CONFIG = {
     channelId: 'YOUR_ACTUAL_CHANNEL_ID',
     channelHandle: '@ADMIafrica',
     channelUrl: 'https://www.youtube.com/@ADMIafrica/'
   }
   ```

### 2. Course Keyword Mapping

Update course keywords in `src/utils/youtube-api.ts` to match your video content:

```typescript
const COURSE_KEYWORDS = {
  'film-and-television-production-diploma': ['film', 'television', 'tv', 'production', 'cinema'],
  'music-production-diploma': ['music', 'audio', 'sound', 'recording', 'studio']
  // Add more courses...
}
```

## 📊 Features

### 1. Dynamic Video Categorization

Videos are automatically categorized based on:

- **Course Keywords**: Title/description matching
- **Content Categories**: Student showcase, tutorials, tours
- **Engagement Metrics**: Views, likes, duration

### 2. Smart Course Integration

Each course page shows:

- **Main Course Video**: Contentful-hosted preview
- **Related YouTube Videos**: Auto-filtered by course keywords
- **Video Statistics**: Views, duration, engagement
- **Call-to-Actions**: Apply now, watch more, visit channel

### 3. SEO Optimization

- **Video Schema Markup**: Rich snippets for search results
- **Static Generation**: Fast loading with ISR
- **Meta Tags**: Video-specific SEO optimization
- **Sitemap Integration**: Video sitemap for Google

### 4. Performance Features

- **Caching**: 1-hour cache for API responses
- **Lazy Loading**: Images and videos load on demand
- **Error Handling**: Graceful fallbacks if API fails
- **Rate Limiting**: Respects YouTube API quotas

## 🎨 Usage Examples

### Adding Video Showcase to Homepage

```tsx
import { VideoShowcase } from '@/components/home/VideoShowcase'
import { fetchADMIChannelVideos } from '@/utils/youtube-api'

export async function getStaticProps() {
  const videos = await fetchADMIChannelVideos(6)

  return {
    props: { videos },
    revalidate: 3600 // 1 hour
  }
}

export default function HomePage({ videos }) {
  return (
    <div>
      <VideoShowcase videos={videos} title="Student Success Stories" maxVideos={6} />
    </div>
  )
}
```

### Course-Specific Video Integration

```tsx
import { CourseVideoSection } from '@/components/course/CourseVideoSection'

export default function CoursePage({ course, youtubeVideos }) {
  return (
    <div>
      <CourseVideoSection course={course} slug="film-production-diploma" youtubeVideos={youtubeVideos} />
    </div>
  )
}
```

## 📈 Conversion Strategy

### 1. Video-Driven Funnels

- **Awareness**: Campus tours and facility videos
- **Interest**: Course previews and curriculum overviews
- **Consideration**: Student testimonials and success stories
- **Decision**: Application process and career outcomes

### 2. Call-to-Action Placement

- **Video Overlays**: Apply now buttons on course previews
- **End Screens**: Custom CTAs directing to website
- **Descriptions**: Strategic links to course pages
- **Comments**: Engagement with prospective students

### 3. Social Proof Integration

- **Student Showcases**: Real project demonstrations
- **Alumni Success**: Career progression stories
- **Industry Recognition**: Awards and achievements
- **Facility Tours**: State-of-the-art equipment

## 🔍 Analytics & Tracking

### YouTube Analytics Integration

```typescript
// Track video engagement
const trackVideoView = (videoId: string, courseSlug: string) => {
  gtag('event', 'video_view', {
    video_id: videoId,
    course: courseSlug,
    source: 'course_page'
  })
}
```

### Conversion Tracking

- **Video Completion Rates**: Track engagement depth
- **Click-Through Rates**: Video to application flow
- **Course Interest**: Video views by course category
- **Geographic Data**: Regional engagement patterns

## 🚀 Future Enhancements

### Phase 2 Features

1. **Live Streaming Integration**

   - Virtual open houses
   - Live Q&A sessions
   - Real-time campus tours

2. **Interactive Video Features**

   - Embedded application forms
   - Video chapters with course modules
   - Interactive hotspots and CTAs

3. **Personalization**

   - Recommended videos based on browsing
   - Course-specific video journeys
   - Geographic content customization

4. **Advanced Analytics**
   - Heatmap analysis of video engagement
   - A/B testing for video thumbnails
   - Conversion attribution modeling

## 🛠️ Maintenance

### Regular Tasks

1. **Monthly**: Review and update course keywords
2. **Quarterly**: Analyze video performance metrics
3. **Bi-annually**: Audit and optimize video content
4. **Annually**: Review YouTube API usage and costs

### Monitoring

- **API Quota Usage**: Monitor YouTube API limits
- **Video Performance**: Track engagement metrics
- **Error Rates**: Monitor failed API calls
- **Conversion Impact**: Measure business outcomes

## 📞 Support

For technical issues or questions about the YouTube integration:

1. Check the error logs in `/api/youtube-videos`
2. Verify API key configuration
3. Review YouTube API quota usage
4. Test with sample video IDs

---

**Note**: This integration requires a valid YouTube Data API v3 key and proper configuration of the ADMI YouTube channel ID.
