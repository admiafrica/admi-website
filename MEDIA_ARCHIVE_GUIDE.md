# ADMI Media Archive Guide

## S3 Bucket Structure

The media archive uses the S3 bucket: `admi-media-archive-381492234121`

### Security & CDN Configuration

- **CloudFront Distribution**: `d17qqznw1g499t.cloudfront.net` (Distribution ID: E393T67BBOZDBU)
- **Access Control**: Private S3 bucket with CloudFront-only access
- **Copyright Protection**: Audio download functionality disabled to protect copyrighted content
- **Streaming Support**: Optimized for audio/video streaming through CloudFront

### Folder Structure

```
s3://admi-media-archive-381492234121/
├── media-archive/
│   ├── images/
│   │   ├── album-name-1/
│   │   │   ├── metadata.json (optional)
│   │   │   ├── photo1.jpg
│   │   │   ├── photo2.jpg
│   │   │   └── ...
│   │   ├── album-name-2/
│   │   └── ...
│   └── audio/
│       ├── podcast-episode-1.mp3
│       ├── interview-with-expert.wav
│       ├── masterclass-audio.m4a
│       └── metadata/
│           ├── podcast-episode-1.json (optional)
│           ├── interview-with-expert.json
│           └── ...
```

## Adding Image Albums

### 1. Create Album Folder

Create a new folder under `media-archive/images/` with a descriptive name:

```bash
aws s3api put-object --bucket admi-media-archive-381492234121 --key media-archive/images/graduation-ceremony-2024/ --profile admi-website
```

### 2. Upload Images

Upload your images to the album folder:

```bash
aws s3 cp ./photo1.jpg s3://admi-media-archive-381492234121/media-archive/images/graduation-ceremony-2024/ --profile admi-website
aws s3 cp ./photo2.jpg s3://admi-media-archive-381492234121/media-archive/images/graduation-ceremony-2024/ --profile admi-website
```

### 3. Add Metadata (Optional)

Create a `metadata.json` file in the album folder:

```json
{
  "title": "Graduation Ceremony 2024",
  "description": "Photos from the ADMI graduation ceremony celebrating our Class of 2024",
  "date": "2024-12-15",
  "category": "Graduation",
  "photographer": "ADMI Media Team",
  "event": "ADMI Graduation 2024"
}
```

Upload the metadata:

```bash
aws s3 cp ./metadata.json s3://admi-media-archive-381492234121/media-archive/images/graduation-ceremony-2024/ --profile admi-website
```

## Adding Audio Content

### 1. Upload Audio File

Upload your audio file to the audio folder:

```bash
aws s3 cp ./podcast-episode-5.mp3 s3://admi-media-archive-381492234121/media-archive/audio/ --profile admi-website
```

### 2. Add Metadata (Optional)

Create a metadata JSON file in the `metadata/` folder:

```json
{
  "title": "Creative Media Industry Insights - Episode 5",
  "description": "Discussion with industry leaders about the future of creative media in Africa",
  "speaker": "Dr. Sarah Kamau & Industry Panel",
  "category": "Podcast",
  "duration": "35:45",
  "type": "Podcast",
  "date": "2024-12-01"
}
```

Upload the metadata (note: filename should match audio file without extension):

```bash
aws s3 cp ./podcast-episode-5.json s3://admi-media-archive-381492234121/media-archive/audio/metadata/ --profile admi-website
```

## Supported File Formats

### Images

- `.jpg`, `.jpeg`, `.png`, `.webp`

### Audio

- `.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`

## Auto-Discovery

The media archive system automatically:

- ✅ Discovers new albums when images are uploaded
- ✅ Counts images in each album
- ✅ Uses first image as album thumbnail
- ✅ Generates titles from folder names if no metadata
- ✅ Detects audio files and categorizes them
- ✅ Creates playable audio with download links

## Categories

### Image Categories

- Graduation, Workshops, Open Day, Classes, Exhibition, Facilities, Awards, Festival, Event

### Audio Categories

- **Educational**: Podcast, Interview, Tech Talk, Radio Show, Masterclass, Speech
- **Student Portfolio**: Music, Soundtrack, Student Work, Portfolio, Composition
- **General**: Recording, Audio

## Student Portfolio Audio

### Music Compositions

Student original music, beats, and compositions from courses like:

- Music Production Certificate
- Sound Engineering Diploma
- Multimedia programs

### Film Soundtracks

Original scores and soundtracks for:

- Student film projects
- Animation soundtracks
- Game audio design
- Commercial soundtracks

### Student Podcasts

Student-produced podcast content from:

- Digital Marketing courses
- Communication programs
- Media studies projects

### Example Student Metadata

**Music Composition:**

```json
{
  "title": "Urban Dreams - Original Composition",
  "description": "An original hip-hop track exploring urban life themes",
  "student": "James Mwangi",
  "course": "Music Production Certificate",
  "category": "Music",
  "genre": "Hip-Hop",
  "duration": "3:45",
  "type": "Student Work",
  "date": "2024-11-20"
}
```

**Film Soundtrack:**

```json
{
  "title": "Short Film Score - 'Nairobi Nights'",
  "description": "Original soundtrack for student film project",
  "student": "Grace Wanjiku",
  "course": "Film Production Diploma",
  "category": "Soundtrack",
  "genre": "Cinematic",
  "duration": "8:30",
  "type": "Portfolio",
  "date": "2024-12-05"
}
```

**Student Podcast:**

```json
{
  "title": "Creative Minds Podcast - AI in Design",
  "description": "Student podcast on AI impact in graphic design",
  "student": "Digital Marketing Class 2024",
  "speaker": "Sarah Njeri & Alex Kipchoge",
  "course": "Digital Marketing Certificate",
  "category": "Podcast",
  "duration": "25:15",
  "type": "Student Work",
  "date": "2024-11-15"
}
```

## Example Commands

### Quick Image Album Upload

```bash
# Create album folder
aws s3api put-object --bucket admi-media-archive-381492234121 --key media-archive/images/animation-workshop-2024/ --profile admi-website

# Upload multiple images
aws s3 sync ./workshop-photos/ s3://admi-media-archive-381492234121/media-archive/images/animation-workshop-2024/ --profile admi-website

# Upload metadata
aws s3 cp ./metadata.json s3://admi-media-archive-381492234121/media-archive/images/animation-workshop-2024/ --profile admi-website
```

### Quick Audio Upload

```bash
# Upload audio file
aws s3 cp ./interview.mp3 s3://admi-media-archive-381492234121/media-archive/audio/ --profile admi-website

# Upload metadata
aws s3 cp ./interview.json s3://admi-media-archive-381492234121/media-archive/audio/metadata/ --profile admi-website
```

### Student Portfolio Upload Examples

**Upload Student Music:**

```bash
# Upload student composition
aws s3 cp ./student-beat-urban-dreams.mp3 s3://admi-media-archive-381492234121/media-archive/audio/ --profile admi-website

# Upload metadata (shows student info, course, genre)
aws s3 cp ./student-beat-urban-dreams.json s3://admi-media-archive-381492234121/media-archive/audio/metadata/ --profile admi-website
```

**Upload Film Soundtrack:**

```bash
# Upload soundtrack file
aws s3 cp ./film-score-nairobi-nights.wav s3://admi-media-archive-381492234121/media-archive/audio/ --profile admi-website

# Upload metadata (shows student, course, film project)
aws s3 cp ./film-score-nairobi-nights.json s3://admi-media-archive-381492234121/media-archive/audio/metadata/ --profile admi-website
```

**Upload Student Podcast:**

```bash
# Upload podcast episode
aws s3 cp ./student-podcast-ai-design.mp3 s3://admi-media-archive-381492234121/media-archive/audio/ --profile admi-website

# Upload metadata (shows class, speakers, course)
aws s3 cp ./student-podcast-ai-design.json s3://admi-media-archive-381492234121/media-archive/audio/metadata/ --profile admi-website
```

## Media Archive URLs

- **Main Archive**: `/media-archive`
- **Image Gallery**: `/media-archive/images`
- **Specific Album**: `/media-archive/images/album-name`
- **Audio Library**: `/media-archive/audio`
- **Video Gallery**: `/media-archive/videos` → redirects to `/videos` (YouTube)

## Notes

- The system refreshes automatically when new content is added
- Folder names become URL slugs (use hyphens, no spaces)
- Metadata is optional but recommended for better presentation
- Images are displayed in filename order within albums
- Audio files are sorted by upload date (newest first)
