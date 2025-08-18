import fs from 'fs'
import path from 'path'

export interface CachedVideo {
  id: string
  title: string
  description: string
  thumbnail: {
    default: string
    medium: string
    high: string
    maxres?: string
  }
  publishedAt: string
  duration: string
  viewCount: string
  likeCount: string
  channelTitle: string
  tags: string[]
  categoryId: string
}

export interface VideoCache {
  videos: CachedVideo[]
  lastUpdated: string
  totalVideos: number
  channelInfo: {
    title: string
    description: string
    subscriberCount: string
    videoCount: string
    viewCount: string
  }
}

// Use /tmp in serverless environments, data/ in development
const CACHE_FILE_PATH =
  process.env.NODE_ENV === 'production'
    ? path.join('/tmp', 'admi-videos-cache.json')
    : path.join(process.cwd(), 'data', 'admi-videos-cache.json')
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds (168 hours)

// Ensure cache directory exists
function ensureCacheDirectory() {
  const cacheDir = path.dirname(CACHE_FILE_PATH)
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
}

// Read cache from file
export function readVideoCache(): VideoCache | null {
  try {
    ensureCacheDirectory()

    if (!fs.existsSync(CACHE_FILE_PATH)) {
      console.log('📁 No cache file found')
      return null
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    const lastUpdated = new Date(cache.lastUpdated)
    const now = new Date()
    const timeDiff = now.getTime() - lastUpdated.getTime()

    if (timeDiff > CACHE_DURATION) {
      console.log('⏰ Cache expired, needs refresh')
      return null
    }

    console.log(`📚 Cache valid, ${cache.videos.length} videos loaded from cache`)
    return cache
  } catch (error) {
    console.error('❌ Error reading cache:', error)

    // Try committed cache file as backup
    try {
      const committedCachePath = path.join(process.cwd(), 'data', 'admi-videos-cache.json')
      if (fs.existsSync(committedCachePath)) {
        console.log('🔄 Fallback to committed cache file after error')
        const cacheData = fs.readFileSync(committedCachePath, 'utf-8')
        const cache: VideoCache = JSON.parse(cacheData)
        console.log(`✅ Committed cache fallback loaded with ${cache.videos?.length || 0} videos`)
        return cache
      }
    } catch (fallbackError) {
      console.error('❌ Error reading committed cache fallback:', fallbackError)
    }

    // Final fallback to production data
    console.log('🔄 Using production fallback data')
    return getProductionFallbackCache()
  }
}

// Fallback cache data for production when file system fails
export function getProductionFallbackCache(): VideoCache {
  return {
    videos: [
      {
        id: 'qBsl9gk9DWY',
        title: 'S2: EP23: Teaching Forces Me To Grow - This Is ADMI ft Hendrick Sam',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nBefore he ever stepped into a classroom, Hendrick Sam had already made his mark in the music industry. With credits alongside artists like Bensoul and Bien, he knows the creative process inside out. But for him, the real turning point came when he realized he could bridge the gap between technical knowledge and student u...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/qBsl9gk9DWY/default.jpg',
          medium: 'https://i.ytimg.com/vi/qBsl9gk9DWY/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/qBsl9gk9DWY/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/qBsl9gk9DWY/maxresdefault.jpg'
        },
        publishedAt: '2025-07-28T06:24:07Z',
        duration: '10:42',
        viewCount: '2',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['Hendrick Sam', 'ADMI', 'music production', 'sound design', 'Kenyan music'],
        categoryId: '27'
      },
      {
        id: 'RS9YVjK4-K4',
        title: 'S2: EP22: They Really Listen To You - This Is ADMI ft David Mutua',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nDavid Mutua is a second-semester graphic design student who found his creative voice at ADMI. From motion graphics to typography, he shares how new skills opened up ideas he never imagined himself exploring. The tools, the freedom, and the sense of connection on campus have made school feel less like a chore and more lik...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/RS9YVjK4-K4/default.jpg',
          medium: 'https://i.ytimg.com/vi/RS9YVjK4-K4/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/RS9YVjK4-K4/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/RS9YVjK4-K4/maxresdefault.jpg'
        },
        publishedAt: '2025-07-28T03:30:06Z',
        duration: '9:09',
        viewCount: '7',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['graphic design student', 'ADMI', 'student story', 'motion graphics', 'typography design'],
        categoryId: '27'
      },
      {
        id: '41MF6Vk0Ku0',
        title: "S2: EP20: You Don't Get a Do-Over - This Is ADMI ft Ciku Munuku",
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nWhat does it take to teach Gen Z with both truth and tenderness? In this interview, Ciku Munuku opens up about the lessons she's learned in the classroom, the hidden strength of today's youth, and why second chances matter. Her words are honest, rooted in experience, and deeply human.\n\nShe speaks of the young people she ...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/41MF6Vk0Ku0/default.jpg',
          medium: 'https://i.ytimg.com/vi/41MF6Vk0Ku0/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/41MF6Vk0Ku0/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/41MF6Vk0Ku0/maxresdefault.jpg'
        },
        publishedAt: '2025-07-25T03:30:06Z',
        duration: '10:20',
        viewCount: '6',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Gen Z education', 'teaching Gen Z', 'creative education', 'African creatives'],
        categoryId: '27'
      },
      {
        id: 'k-SHK2vr9so',
        title: 'S2: EP18: Equipped For The Workplace - This Is ADMI ft Ciku Munuku',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nCareer Launchpad was introduced in 2016 to meet a real need. Employers were clear. Many graduates had the right academic skills but lacked the personal attributes that make someone dependable, adaptable, and ready. This course was created to change that. From the first semester, students begin learning how to manage time...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/k-SHK2vr9so/default.jpg',
          medium: 'https://i.ytimg.com/vi/k-SHK2vr9so/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/k-SHK2vr9so/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/k-SHK2vr9so/maxresdefault.jpg'
        },
        publishedAt: '2025-07-24T03:30:06Z',
        duration: '8:07',
        viewCount: '6',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'Career Launchpad',
          'Soft skills training',
          'Job readiness',
          'Life skills for students',
          'Africa Digital Media Institute'
        ],
        categoryId: '27'
      },
      {
        id: '5_LiqRX1nuc',
        title: 'S2: EP17: We Are Competing Globally - This Is ADMI ft Benjamin Waithaka',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nBefore he ever animated a single scene, he was on his way to the military. But a chance encounter with early 3D software, a friend's recommendation, and a visit to a small studio changed everything. In this interview, he shares how animation became a path not just to skill but to purpose.\n\nNow a lecturer, he's committed ...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/5_LiqRX1nuc/default.jpg',
          medium: 'https://i.ytimg.com/vi/5_LiqRX1nuc/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/5_LiqRX1nuc/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/5_LiqRX1nuc/maxresdefault.jpg'
        },
        publishedAt: '2025-07-23T07:04:41Z',
        duration: '8:00',
        viewCount: '22',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'animation lecturer Kenya',
          '3D animation training',
          'animation teacher Nairobi',
          'how to learn animation',
          'African animation industry'
        ],
        categoryId: '27'
      },
      {
        id: 'jKEuD511UZs',
        title: 'S2: EP14: The World Wants More - This Is ADMI ft Sifa Mutonga',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nSifa Mutonga didn't expect to choose ADMI. Years ago, someone she met at a workshop mentioned it, but it wasn't her first option. When her dream school said no, she remembered that conversation and decided to give ADMI a chance. That decision changed everything.\n\nFrom the first report card, something shifted. For the fir...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/jKEuD511UZs/default.jpg',
          medium: 'https://i.ytimg.com/vi/jKEuD511UZs/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/jKEuD511UZs/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/jKEuD511UZs/maxresdefault.jpg'
        },
        publishedAt: '2025-07-22T03:30:06Z',
        duration: '10:02',
        viewCount: '81',
        likeCount: '7',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Sifa Mutonga', 'motion graphics', 'After Effects', 'Maya animation'],
        categoryId: '27'
      },
      {
        id: '3Viydzp_bSY',
        title: 'S2: EP13: Experience Over Everything - This Is ADMI ft Kennedy Wathome',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nIn this insightful conversation, Kennedy Wathome, a music production lecturer at ADMI, walks us through his unique approach to teaching. From day one, students are introduced to the fundamentals and gradually progress to complex, real-world projects. Whether it's producing an album or setting up a live gig, the curricul...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/3Viydzp_bSY/default.jpg',
          medium: 'https://i.ytimg.com/vi/3Viydzp_bSY/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/3Viydzp_bSY/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/3Viydzp_bSY/maxresdefault.jpg'
        },
        publishedAt: '2025-07-21T10:11:06Z',
        duration: '1:09',
        viewCount: '40',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Kennedy Wathome', 'music production', 'sound engineering', 'film school Kenya'],
        categoryId: '27'
      },
      {
        id: 'ExLQsU4Zt8A',
        title: 'S2: EP13: Experience Over Everything - This Is ADMI ft Kennedy Wathome',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nIn this insightful conversation, Kennedy Wathome, a music production lecturer at ADMI, walks us through his unique approach to teaching. From day one, students are introduced to the fundamentals and gradually progress to complex, real-world projects. Whether it's producing an album or setting up a live gig, the curricul...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/ExLQsU4Zt8A/default.jpg',
          medium: 'https://i.ytimg.com/vi/ExLQsU4Zt8A/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/ExLQsU4Zt8A/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/ExLQsU4Zt8A/maxresdefault.jpg'
        },
        publishedAt: '2025-07-21T07:58:36Z',
        duration: '6:02',
        viewCount: '17',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Kennedy Wathome', 'music production', 'sound engineering', 'film school Kenya'],
        categoryId: '27'
      },
      {
        id: 'c_9GCpdTsYI',
        title: 'S2: EP11: They Treat You Like Equals - This Is ADMI ft Arieh Aura',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nArieh Aura shares what it's really like to study multimedia at ADMI. From discovering the school during a high school expo to completing a professional certificate in graphic design, his journey is filled with growth, creativity, and community. He talks about the teachers who've made a lasting impact, especially Mr. Isaa...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/c_9GCpdTsYI/default.jpg',
          medium: 'https://i.ytimg.com/vi/c_9GCpdTsYI/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/c_9GCpdTsYI/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/c_9GCpdTsYI/maxresdefault.jpg'
        },
        publishedAt: '2025-07-18T06:55:41Z',
        duration: '6:21',
        viewCount: '15',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'multimedia', 'design school', 'animation', 'Nairobi creatives'],
        categoryId: '27'
      },
      {
        id: 'iIDpZcAvj08',
        title: 'S2: EP10: Lightning Round - This Is ADMI ft Manal Omayer',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nWelcome to "This Is ADMI",  your inside look into Africa Digital Media Institute.\n\nIn this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions. Meet our passionate faculty, hear directly from our Head of School, and walk alongside students as they pursue careers i...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/iIDpZcAvj08/default.jpg',
          medium: 'https://i.ytimg.com/vi/iIDpZcAvj08/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/iIDpZcAvj08/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/iIDpZcAvj08/maxresdefault.jpg'
        },
        publishedAt: '2025-07-18T03:30:06Z',
        duration: '2:37',
        viewCount: '12',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'admi',
          'africa digital media institute',
          'media school kenya',
          'film school nairobi',
          'animation school kenya'
        ],
        categoryId: '27'
      },
      {
        id: 'TEHFH57eDco',
        title: 'S2: EP8: Filmmaking in Cartoon Form - This Is ADMI ft Manal Omayer #shorts',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n------------------------------------------------------------------------------------------------- \n\nIn this video, ADMI animation lecturer Manal Omayer shares her inspiring journey from childhood sketches to teaching animation in Kenya. Discover how she transitioned from nearly pursuing law to studying animation abroad, and how that path led her to become a passionate educator at the Africa Digital Media Institute (A...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/TEHFH57eDco/default.jpg',
          medium: 'https://i.ytimg.com/vi/TEHFH57eDco/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/TEHFH57eDco/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/TEHFH57eDco/maxresdefault.jpg'
        },
        publishedAt: '2025-07-17T08:09:35Z',
        duration: '1:01',
        viewCount: '87',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['Manal Omayer', 'ADMI', 'Africa Digital Media Institute', 'animation lecturer', 'animation in Kenya'],
        categoryId: '27'
      },
      {
        id: 'M3Uku0CyvuU',
        title: 'S2: EP9: I Have To Learn The Student First - This Is ADMI ft Manal Omayer',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n------------------------------------------------------------------------------------------------- \n\nManal Omayer is a lecturer at ADMI and a practicing creative with experience in VR, animation, and conservation storytelling. In this conversation, she shares how she approaches teaching with empathy, adaptability, and a focus on practical skills. Her lessons are shaped by real-world projects and a commitment to making...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/M3Uku0CyvuU/default.jpg',
          medium: 'https://i.ytimg.com/vi/M3Uku0CyvuU/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/M3Uku0CyvuU/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/M3Uku0CyvuU/maxresdefault.jpg'
        },
        publishedAt: '2025-07-17T07:04:11Z',
        duration: '8:37',
        viewCount: '19',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['admi', 'africa digital media institute', 'manal omayer', 'admi lecturer', 'animation school kenya'],
        categoryId: '27'
      },
      {
        id: 'pYnt3JncUMQ',
        title: 'S2: EP8: Filmmaking in Cartoon Form - This Is ADMI ft Manal Omayer',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n------------------------------------------------------------------------------------------------- \n\nIn this video, ADMI animation lecturer Manal Omayer shares her inspiring journey from childhood sketches to teaching animation in Kenya. Discover how she transitioned from nearly pursuing law to studying animation abroad, and how that path led her to become a passionate educator at the Africa Digital Media Institute (A...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/pYnt3JncUMQ/default.jpg',
          medium: 'https://i.ytimg.com/vi/pYnt3JncUMQ/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/pYnt3JncUMQ/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/pYnt3JncUMQ/maxresdefault.jpg'
        },
        publishedAt: '2025-07-17T03:30:06Z',
        duration: '8:04',
        viewCount: '22',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['Manal Omayer', 'ADMI', 'Africa Digital Media Institute', 'animation lecturer', 'animation in Kenya'],
        categoryId: '27'
      },
      {
        id: 'Da-seoooJ-o',
        title: 'S2: EP7: Lightning Round - This Is ADMI ft Hussein Lorot #shorts',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nWelcome to "This Is ADMI",  your inside look into Africa Digital Media Institute.\n\nIn this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions. Meet our passionate faculty, hear directly from our Head of School, and walk alongside students as they pursue careers i...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/Da-seoooJ-o/default.jpg',
          medium: 'https://i.ytimg.com/vi/Da-seoooJ-o/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/Da-seoooJ-o/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/Da-seoooJ-o/maxresdefault.jpg'
        },
        publishedAt: '2025-07-16T07:36:33Z',
        duration: '2:58',
        viewCount: '68',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'admi',
          'africa digital media institute',
          'media school kenya',
          'film school nairobi',
          'animation school kenya'
        ],
        categoryId: '27'
      },
      {
        id: 'UQ8eX98fyFg',
        title: 'Parent Testimonial | PAD',
        description:
          'An ADMI parent shares how her son found purpose and growth after choosing to study Film & TV Production, a path that truly aligns with his passion.\n\n👏 To all the parents, guardians, and sponsors supporting creative dreams - we see you, and we appreciate you.\n\n📚 September Intake is ongoing \n👉 Learn more about Film & TV Production here: https://admi.africa/courses/film-and-television-production-diploma \n\n📞 Call/ WhatsApp us: +254 706 349 696 / +254 711 486 581\n📍 Visit us: Caxton House, 3rd Fl...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/UQ8eX98fyFg/default.jpg',
          medium: 'https://i.ytimg.com/vi/UQ8eX98fyFg/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/UQ8eX98fyFg/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/UQ8eX98fyFg/maxresdefault.jpg'
        },
        publishedAt: '2025-07-16T07:12:23Z',
        duration: '1:25',
        viewCount: '10',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['media school', 'admi kenya', 'admi africa', 'africa digital media', 'africa digital media institute'],
        categoryId: '27'
      },
      {
        id: 'nTevDWwW6Xk',
        title: 'Parents Appreciation Day | Highlights',
        description:
          "Our Parents Appreciation Day was a heartwarming reminder that behind every thriving creative is a strong support system. 💛\n\nFrom interactive sessions with our faculty to open conversations about creative career paths, parents, guardians, and sponsors gained a deeper understanding of their child's journey at ADMI - and we were reminded just how vital they are in shaping the future of the creative economy.\n\nTo every parent, guardian, and sponsor who showed up: thank you for your trust, belief, an...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/nTevDWwW6Xk/default.jpg',
          medium: 'https://i.ytimg.com/vi/nTevDWwW6Xk/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/nTevDWwW6Xk/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/nTevDWwW6Xk/maxresdefault.jpg'
        },
        publishedAt: '2025-07-16T07:11:57Z',
        duration: '1:18',
        viewCount: '17',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['media school', 'admi kenya', 'admi africa', 'africa digital media', 'africa digital media institute'],
        categoryId: '27'
      },
      {
        id: 'GQZlKPuCsNs',
        title: 'S2: EP7: Lightning Round - This Is ADMI ft Hussein Lorot',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nWelcome to "This Is ADMI",  your inside look into Africa Digital Media Institute.\n\nIn this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions. Meet our passionate faculty, hear directly from our Head of School, and walk alongside students as they pursue careers i...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/GQZlKPuCsNs/default.jpg',
          medium: 'https://i.ytimg.com/vi/GQZlKPuCsNs/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/GQZlKPuCsNs/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/GQZlKPuCsNs/maxresdefault.jpg'
        },
        publishedAt: '2025-07-16T07:01:51Z',
        duration: '3:05',
        viewCount: '3',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'admi',
          'africa digital media institute',
          'media school kenya',
          'film school nairobi',
          'animation school kenya'
        ],
        categoryId: '27'
      },
      {
        id: 'R5U3D59Gsls',
        title: 'S2: EP6: Why I Chose ADMI - This Is ADMI ft Hussein Lorot',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nHussein Lorot is a Film and TV student at ADMI. In this video, he shares his journey from discovering ADMI at a high school event to finding purpose and direction through film. He talks about the impact of learning from industry professionals, being part of a growing film culture on campus, and how cinematography transf...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/R5U3D59Gsls/default.jpg',
          medium: 'https://i.ytimg.com/vi/R5U3D59Gsls/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/R5U3D59Gsls/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/R5U3D59Gsls/maxresdefault.jpg'
        },
        publishedAt: '2025-07-16T03:30:06Z',
        duration: '10:51',
        viewCount: '14',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Africa Digital Media Institute', 'Film school Kenya', 'Film student Kenya', 'Cinematography'],
        categoryId: '27'
      },
      {
        id: 'X5BYKEJs6WY',
        title: "S2: EP5: Rayaan's ADMI Story - This Is ADMI ft Rayaan Mukhtar",
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nRayaan Mukhtar shares her journey as a 2D animation student at Africa Digital Media Institute (ADMI), where she found a space to explore her creativity and grow at her own pace. From her first drawing classes to exhibiting her work, each moment helped her build confidence and connect with the storyteller within. The envi...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/X5BYKEJs6WY/default.jpg',
          medium: 'https://i.ytimg.com/vi/X5BYKEJs6WY/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/X5BYKEJs6WY/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/X5BYKEJs6WY/maxresdefault.jpg'
        },
        publishedAt: '2025-07-15T07:03:36Z',
        duration: '10:44',
        viewCount: '34',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'Rayaan Mukhtar',
          'ADMI student story',
          '2D animation Kenya',
          'Africa Digital Media Institute',
          'Animation school Nairobi'
        ],
        categoryId: '27'
      },
      {
        id: 'p2zFeime0uA',
        title: 'S2: EP4: I Was The Quiet One - This Is ADMI ft Francis Simba',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nFrancis Simba was not always the person you see today. When he first arrived at ADMI, he was quiet and unsure of where he fit in. Coming from a background in business management, he didn't yet know that creative education would be the turning point in his journey. It was the photography course that first caught his atten...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/p2zFeime0uA/default.jpg',
          medium: 'https://i.ytimg.com/vi/p2zFeime0uA/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/p2zFeime0uA/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/p2zFeime0uA/maxresdefault.jpg'
        },
        publishedAt: '2025-07-15T03:30:06Z',
        duration: '11:25',
        viewCount: '22',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Student Voices', 'Creative Education', 'Growth Journey', 'Film School Africa'],
        categoryId: '27'
      },
      {
        id: 'nvklqos6uHQ',
        title: 'S2: EP3: The Art Outlives the Artist - This Is ADMI ft Karumba Ngatia #shorts',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nClean sound, professional gear, and industry-ready skills are just the surface. What really matters is what students do with them. In this video, Karumba Ngatia shares how ADMI trains creatives not just to use equipment, but to create work that has impact. Whether it's through a mic, a lens, or a brush, students are cha...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/nvklqos6uHQ/default.jpg',
          medium: 'https://i.ytimg.com/vi/nvklqos6uHQ/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/nvklqos6uHQ/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/nvklqos6uHQ/maxresdefault.jpg'
        },
        publishedAt: '2025-07-14T08:16:02Z',
        duration: '1:03',
        viewCount: '201',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Creative Education', 'Film School', 'Design Students', 'Karumba Ngatia'],
        categoryId: '27'
      },
      {
        id: 'FrFzS8ivnrY',
        title: 'S2: EP3: The Art Outlives the Artist - This Is ADMI ft Karumba Ngatia #shorts',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nClean sound, professional gear, and industry-ready skills are just the surface. What really matters is what students do with them. In this video, Karumba Ngatia shares how ADMI trains creatives not just to use equipment, but to create work that has impact. Whether it's through a mic, a lens, or a brush, students are cha...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/FrFzS8ivnrY/default.jpg',
          medium: 'https://i.ytimg.com/vi/FrFzS8ivnrY/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/FrFzS8ivnrY/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/FrFzS8ivnrY/maxresdefault.jpg'
        },
        publishedAt: '2025-07-14T08:15:26Z',
        duration: '1:30',
        viewCount: '176',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Creative Education', 'Film School', 'Design Students', 'Karumba Ngatia'],
        categoryId: '27'
      },
      {
        id: 'rTQh0QW666E',
        title: 'S2: EP2: The Mindset Behind Great Work - This Is ADMI ft Karumba Ngatia #shorts',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nAt ADMI, creative training begins with mindset. In this video, faculty member Karumba Ngatia shares how he teaches students to approach their work with full commitment. He encourages them to see their projects as bigger than themselves, as work that could create lasting impact. This mindset helps students give their hea...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/rTQh0QW666E/default.jpg',
          medium: 'https://i.ytimg.com/vi/rTQh0QW666E/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/rTQh0QW666E/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/rTQh0QW666E/maxresdefault.jpg'
        },
        publishedAt: '2025-07-14T08:12:03Z',
        duration: '1:44',
        viewCount: '174',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['Creative Learning', 'ADMI', 'Student Life', 'Growth Mindset', 'Creative Education'],
        categoryId: '27'
      },
      {
        id: 'fArow60sI0Y',
        title: 'S2: EP2: The Mindset Behind Great Work - This Is ADMI ft Karumba Ngatia #shorts',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nAt ADMI, creative training begins with mindset. In this video, faculty member Karumba Ngatia shares how he teaches students to approach their work with full commitment. He encourages them to see their projects as bigger than themselves, as work that could create lasting impact. This mindset helps students give their hea...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/fArow60sI0Y/default.jpg',
          medium: 'https://i.ytimg.com/vi/fArow60sI0Y/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/fArow60sI0Y/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/fArow60sI0Y/maxresdefault.jpg'
        },
        publishedAt: '2025-07-14T08:11:24Z',
        duration: '1:53',
        viewCount: '33',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['Creative Learning', 'ADMI', 'Student Life', 'Growth Mindset', 'Creative Education'],
        categoryId: '27'
      },
      {
        id: 'VlTCxCu8k2I',
        title: 'S2: EP2: The Mindset Behind Great Work - This Is ADMI ft Karumba Ngatia #shorts',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nAt ADMI, creative training begins with mindset. In this video, faculty member Karumba Ngatia shares how he teaches students to approach their work with full commitment. He encourages them to see their projects as bigger than themselves, as work that could create lasting impact. This mindset helps students give their hea...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/VlTCxCu8k2I/default.jpg',
          medium: 'https://i.ytimg.com/vi/VlTCxCu8k2I/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/VlTCxCu8k2I/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/VlTCxCu8k2I/maxresdefault.jpg'
        },
        publishedAt: '2025-07-14T08:10:46Z',
        duration: '1:08',
        viewCount: '81',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['Creative Learning', 'ADMI', 'Student Life', 'Growth Mindset', 'Creative Education'],
        categoryId: '27'
      },
      {
        id: 'XUCdu-OhgXA',
        title: 'S2: EP3: The Art Outlives the Artist - This Is ADMI ft Karumba Ngatia',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nClean sound, professional gear, and industry-ready skills are just the surface. What really matters is what students do with them. In this video, Karumba Ngatia shares how ADMI trains creatives not just to use equipment, but to create work that has impact. Whether it's through a mic, a lens, or a brush, students are cha...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/XUCdu-OhgXA/default.jpg',
          medium: 'https://i.ytimg.com/vi/XUCdu-OhgXA/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/XUCdu-OhgXA/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/XUCdu-OhgXA/maxresdefault.jpg'
        },
        publishedAt: '2025-07-14T07:00:06Z',
        duration: '8:06',
        viewCount: '24',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Creative Education', 'Film School', 'Design Students', 'Karumba Ngatia'],
        categoryId: '27'
      },
      {
        id: 'bocJvwl7Mwc',
        title: 'S2: EP2: The Mindset Behind Great Work - This Is ADMI ft Karumba Ngatia',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nAt ADMI, creative training begins with mindset. In this video, faculty member Karumba Ngatia shares how he teaches students to approach their work with full commitment. He encourages them to see their projects as bigger than themselves, as work that could create lasting impact. This mindset helps students give their hea...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/bocJvwl7Mwc/default.jpg',
          medium: 'https://i.ytimg.com/vi/bocJvwl7Mwc/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/bocJvwl7Mwc/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/bocJvwl7Mwc/maxresdefault.jpg'
        },
        publishedAt: '2025-07-14T03:30:06Z',
        duration: '8:35',
        viewCount: '15',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['Creative Learning', 'ADMI', 'Student Life', 'Growth Mindset', 'Creative Education'],
        categoryId: '27'
      },
      {
        id: 'lkFFp7HDkyk',
        title: 'S2: EP1: Introducing Karumba Ngatia - This Is ADMI ft Karumba Ngatia #shorts',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nIn this debut episode, we sit down with Karumba Ngatia, a faculty member at the Africa Digital Media Institute (ADMI), where he teaches in the departments of Sound Engineering and Film. Karumba is an educator and a working creative with a portfolio that includes commercial ads, film work recognized across the continent,...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/lkFFp7HDkyk/default.jpg',
          medium: 'https://i.ytimg.com/vi/lkFFp7HDkyk/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/lkFFp7HDkyk/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/lkFFp7HDkyk/maxresdefault.jpg'
        },
        publishedAt: '2025-07-11T09:07:50Z',
        duration: '1:26',
        viewCount: '17',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Africa Digital Media Institute', 'Karumba Ngatia', 'sound engineering', 'film production'],
        categoryId: '27'
      },
      {
        id: 'bNNPirGgQGY',
        title: 'S2: EP1: Introducing Karumba Ngatia - This Is ADMI ft Karumba Ngatia',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nIn this debut episode, we sit down with Karumba Ngatia, a faculty member at the Africa Digital Media Institute (ADMI), where he teaches in the departments of Sound Engineering and Film. Karumba is an educator and a working creative with a portfolio that includes commercial ads, film work recognized across the continent,...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/bNNPirGgQGY/default.jpg',
          medium: 'https://i.ytimg.com/vi/bNNPirGgQGY/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/bNNPirGgQGY/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/bNNPirGgQGY/maxresdefault.jpg'
        },
        publishedAt: '2025-07-11T06:00:06Z',
        duration: '8:25',
        viewCount: '23',
        likeCount: '5',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Africa Digital Media Institute', 'Karumba Ngatia', 'sound engineering', 'film production'],
        categoryId: '27'
      },
      {
        id: 'PS6apNT4Khk',
        title: 'S1:EP7: Lightning Round - This Is ADMI ft Carolyne Sila',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nWelcome to "This Is ADMI",  your inside look into Africa Digital Media Institute.\n\nIn this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions. Meet our passionate faculty, hear directly from our Head of School, and walk alongside students as they pursue careers i...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/PS6apNT4Khk/default.jpg',
          medium: 'https://i.ytimg.com/vi/PS6apNT4Khk/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/PS6apNT4Khk/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/PS6apNT4Khk/maxresdefault.jpg'
        },
        publishedAt: '2025-07-11T03:30:06Z',
        duration: '2:52',
        viewCount: '7',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'admi',
          'africa digital media institute',
          'media school kenya',
          'film school nairobi',
          'animation school kenya'
        ],
        categoryId: '27'
      },
      {
        id: '0oONdAw9s7s',
        title: 'S1:EP6: This Is Their Becoming - This Is ADMI ft Carolyne Sila',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nIn this final episode, Carolyne Sila, Head of School at ADMI, shares her personal experience working with young creatives and the parents who often do not know what to do with them. She reflects on the journey of helping students turn their passions into real careers and highlights the transformation that happens when t...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/0oONdAw9s7s/default.jpg',
          medium: 'https://i.ytimg.com/vi/0oONdAw9s7s/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/0oONdAw9s7s/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/0oONdAw9s7s/maxresdefault.jpg'
        },
        publishedAt: '2025-07-10T05:36:56Z',
        duration: '10:41',
        viewCount: '10',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'Africa Digital Media Institute',
          'Creative careers in Kenya',
          'ADMI Head of School',
          'Support for creative students',
          'Kenyan creative education'
        ],
        categoryId: '27'
      },
      {
        id: 'ag3aAxLoLV4',
        title: 'S1:EP5: Built For People Like You - This Is ADMI ft Carolyne Sila',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nOur Head of School Carolyne Sila discusses what makes ADMI a creative space where students can learn, grow, and belong. In this video, she shares how the campus culture is built to support all types of students by offering mentorship, access to resources, and a sense of community. Whether students are outgoing or reserv...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/ag3aAxLoLV4/default.jpg',
          medium: 'https://i.ytimg.com/vi/ag3aAxLoLV4/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/ag3aAxLoLV4/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/ag3aAxLoLV4/maxresdefault.jpg'
        },
        publishedAt: '2025-07-10T03:30:06Z',
        duration: '6:18',
        viewCount: '28',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['ADMI', 'Africa Digital Media Institute', 'Carolyne Sila', 'Creative education', 'Film school Kenya'],
        categoryId: '27'
      },
      {
        id: 'BE3aLEjFTuA',
        title: 'S1:EP4:  Students Earn While They Learn - This Is ADMI ft Carolyne Sila #shorts',
        description:
          'Email: info@admi.ac.ke\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n------------------------------------------------------------------------\n\nIn ADMI, students lead the way in every part of the experience. There are active clubs on campus including the Production Club, Music Club, Muslim Club, and Christian Club. Each club is student-led with support from a faculty patron. They organize regular meetings, plan events, and build community.\n\nStudents take on real work while still in scho...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/BE3aLEjFTuA/default.jpg',
          medium: 'https://i.ytimg.com/vi/BE3aLEjFTuA/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/BE3aLEjFTuA/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/BE3aLEjFTuA/maxresdefault.jpg'
        },
        publishedAt: '2025-07-09T10:33:00Z',
        duration: '1:38',
        viewCount: '103',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'ADMI',
          'creative education Kenya',
          'student-led production',
          'Nairobi media school',
          'film school Nairobi'
        ],
        categoryId: '27'
      },
      {
        id: 'W-UzKwQwYWQ',
        title: 'S1:EP4:  Students Earn While They Learn - This Is ADMI ft Carolyne Sila #shorts',
        description:
          'Email: info@admi.ac.ke\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n------------------------------------------------------------------------\n\nIn ADMI, students lead the way in every part of the experience. There are active clubs on campus including the Production Club, Music Club, Muslim Club, and Christian Club. Each club is student-led with support from a faculty patron. They organize regular meetings, plan events, and build community.\n\nStudents take on real work while still in scho...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/W-UzKwQwYWQ/default.jpg',
          medium: 'https://i.ytimg.com/vi/W-UzKwQwYWQ/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/W-UzKwQwYWQ/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/W-UzKwQwYWQ/maxresdefault.jpg'
        },
        publishedAt: '2025-07-09T10:32:11Z',
        duration: '1:17',
        viewCount: '193',
        likeCount: '4',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'ADMI',
          'creative education Kenya',
          'student-led production',
          'Nairobi media school',
          'film school Nairobi'
        ],
        categoryId: '27'
      },
      {
        id: '_QsgtJ4ggAA',
        title: 'S1:EP3: From Admission To Graduation - This Is ADMI ft Carolyne Sila #shorts',
        description:
          "Email: info@admi.ac.ke\nCall/ WhatsApp: (+254) 711 486 581\n------------------------------------------------------------------------\n\nAt ADMI, a student's journey is built to offer real industry exposure, continuous support, and practical learning from day one. It begins with a thorough orientation where students meet faculty, IT support, finance teams, counselors, and student services. They're introduced to tools like the learning management system and school email, and shown where to find help w...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/_QsgtJ4ggAA/default.jpg',
          medium: 'https://i.ytimg.com/vi/_QsgtJ4ggAA/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/_QsgtJ4ggAA/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/_QsgtJ4ggAA/maxresdefault.jpg'
        },
        publishedAt: '2025-07-09T09:45:36Z',
        duration: '1:18',
        viewCount: '80',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'ADMI student experience',
          'creative careers in Africa',
          'digital media school Kenya',
          'studying film in Kenya',
          'ADMI diploma programs'
        ],
        categoryId: '27'
      },
      {
        id: 'DCZahQd907E',
        title: 'S1:EP4:  Students Earn While They Learn - This Is ADMI ft Carolyne Sila',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n------------------------------------------------------------------------\n\nIn ADMI, students lead the way in every part of the experience. There are active clubs on campus including the Production Club, Music Club, Muslim Club, and Christian Club. Each club is student-led with support from a faculty patron. They organize regular meetings, plan events, and build community.\n\nStudents take on real work while still in sch...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/DCZahQd907E/default.jpg',
          medium: 'https://i.ytimg.com/vi/DCZahQd907E/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/DCZahQd907E/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/DCZahQd907E/maxresdefault.jpg'
        },
        publishedAt: '2025-07-09T07:31:21Z',
        duration: '7:39',
        viewCount: '23',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'ADMI',
          'creative education Kenya',
          'student-led production',
          'Nairobi media school',
          'film school Nairobi'
        ],
        categoryId: '27'
      },
      {
        id: '06YX4hgoPvc',
        title: 'S1:EP3: From Admission To Graduation - This Is ADMI ft Carolyne Sila',
        description:
          "Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nAt ADMI, a student's journey is built to offer real industry exposure, continuous support, and practical learning from day one. It begins with a thorough orientation where students meet faculty, IT support, finance teams, counselors, and student services. They're introduced to tools like the learning management system a...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/06YX4hgoPvc/default.jpg',
          medium: 'https://i.ytimg.com/vi/06YX4hgoPvc/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/06YX4hgoPvc/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/06YX4hgoPvc/maxresdefault.jpg'
        },
        publishedAt: '2025-07-09T03:30:06Z',
        duration: '5:25',
        viewCount: '23',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'ADMI student experience',
          'creative careers in Africa',
          'digital media school Kenya',
          'studying film in Kenya',
          'ADMI diploma programs'
        ],
        categoryId: '27'
      },
      {
        id: 'U88AEmh_nLU',
        title: 'S1:EP2: No Student Left Behind - This Is ADMI ft Carolyne Sila #shorts',
        description:
          'Email: info@admi.ac.ke\nCall/ WhatsApp: (+254) 711 486 581\n------------------------------------------------------------------------\n\nIn this episode, we expound on how students are supported throughout their academic and creative journey. At ADMI, learners are equipped with essential soft skills through the Career Launchpad program, where they practice communication, write professional emails, build strong CVs, and prepare for interviews. The program includes mock interviews with real HR professi...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/U88AEmh_nLU/default.jpg',
          medium: 'https://i.ytimg.com/vi/U88AEmh_nLU/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/U88AEmh_nLU/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/U88AEmh_nLU/maxresdefault.jpg'
        },
        publishedAt: '2025-07-08T12:37:43Z',
        duration: '1:48',
        viewCount: '26',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'Career Launchpad ADMI',
          'Creative education in Kenya',
          'Soft skills training',
          'Student mental health support',
          'Creative diploma programs'
        ],
        categoryId: '27'
      },
      {
        id: 'RjVGCwFZKTk',
        title: 'S1:EP2: No Student Left Behind - This Is ADMI ft Carolyne Sila #shorts',
        description:
          'Email: info@admi.ac.ke\nCall/ WhatsApp: (+254) 711 486 581\n------------------------------------------------------------------------\n\nIn this episode, we expound on how students are supported throughout their academic and creative journey. At ADMI, learners are equipped with essential soft skills through the Career Launchpad program, where they practice communication, write professional emails, build strong CVs, and prepare for interviews. The program includes mock interviews with real HR professi...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/RjVGCwFZKTk/default.jpg',
          medium: 'https://i.ytimg.com/vi/RjVGCwFZKTk/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/RjVGCwFZKTk/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/RjVGCwFZKTk/maxresdefault.jpg'
        },
        publishedAt: '2025-07-08T12:37:11Z',
        duration: '1:41',
        viewCount: '106',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'Career Launchpad ADMI',
          'Creative education in Kenya',
          'Soft skills training',
          'Student mental health support',
          'Creative diploma programs'
        ],
        categoryId: '27'
      },
      {
        id: 'ku1_jJLWy34',
        title: 'S1:EP2: No Student Left Behind - This Is ADMI ft Carolyne Sila',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\n\nIn this episode, we expound on how students are supported throughout their academic and creative journey. At ADMI, learners are equipped with essential soft skills through the Career Launchpad program, where they practice communication, write professional emails, build strong CVs, and prepare for interviews. The program...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/ku1_jJLWy34/default.jpg',
          medium: 'https://i.ytimg.com/vi/ku1_jJLWy34/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/ku1_jJLWy34/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/ku1_jJLWy34/maxresdefault.jpg'
        },
        publishedAt: '2025-07-08T09:10:05Z',
        duration: '8:34',
        viewCount: '27',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'Career Launchpad ADMI',
          'Creative education in Kenya',
          'Soft skills training',
          'Student mental health support',
          'Creative diploma programs'
        ],
        categoryId: '27'
      },
      {
        id: 'KfW53ZqYiwY',
        title: 'S1:EP1: Introducing ADMI - This Is ADMI ft Carolyne Sila #shorts',
        description:
          'Email: info@admi.ac.ke\nCall/ WhatsApp: (+254) 711 486 581\n\n----------------------------------------------------------------\nWelcome to "This Is ADMI",  your inside look into Africa Digital Media Institute.\n\nIn this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions. Meet our passionate faculty, hear directly from our Head of School, and walk alongside students as they pursue careers in film, animation, music production, design, and more....',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/KfW53ZqYiwY/default.jpg',
          medium: 'https://i.ytimg.com/vi/KfW53ZqYiwY/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/KfW53ZqYiwY/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/KfW53ZqYiwY/maxresdefault.jpg'
        },
        publishedAt: '2025-07-08T07:04:34Z',
        duration: '1:35',
        viewCount: '121',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'admi',
          'africa digital media institute',
          'media school kenya',
          'film school nairobi',
          'animation school kenya'
        ],
        categoryId: '27'
      },
      {
        id: '5QH2ZDL-6y0',
        title: 'S1:EP1: Introducing ADMI - This Is ADMI ft Carolyne Sila #shorts',
        description:
          'Email: info@admi.ac.ke\nCall/ WhatsApp: (+254) 711 486 581\n\n----------------------------------------------------------------\nWelcome to "This Is ADMI",  your inside look into Africa Digital Media Institute.\n\nIn this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions. Meet our passionate faculty, hear directly from our Head of School, and walk alongside students as they pursue careers in film, animation, music production, design, and more....',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/5QH2ZDL-6y0/default.jpg',
          medium: 'https://i.ytimg.com/vi/5QH2ZDL-6y0/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/5QH2ZDL-6y0/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/5QH2ZDL-6y0/maxresdefault.jpg'
        },
        publishedAt: '2025-07-08T07:03:49Z',
        duration: '1:54',
        viewCount: '5',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'admi',
          'africa digital media institute',
          'media school kenya',
          'film school nairobi',
          'animation school kenya'
        ],
        categoryId: '27'
      },
      {
        id: 'BPeOdWMajnk',
        title: 'S1:EP1: Introducing ADMI - This Is ADMI ft Carolyne Sila #shorts',
        description:
          'Email: info@admi.ac.ke\nCall/ WhatsApp: (+254) 711 486 581\n\n----------------------------------------------------------------\nWelcome to "This Is ADMI",  your inside look into Africa Digital Media Institute.\n\nIn this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions. Meet our passionate faculty, hear directly from our Head of School, and walk alongside students as they pursue careers in film, animation, music production, design, and more....',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/BPeOdWMajnk/default.jpg',
          medium: 'https://i.ytimg.com/vi/BPeOdWMajnk/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/BPeOdWMajnk/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/BPeOdWMajnk/maxresdefault.jpg'
        },
        publishedAt: '2025-07-08T07:03:16Z',
        duration: '1:53',
        viewCount: '105',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'admi',
          'africa digital media institute',
          'media school kenya',
          'film school nairobi',
          'animation school kenya'
        ],
        categoryId: '27'
      },
      {
        id: 'qWMS_rR3lEw',
        title: 'S1:EP1: Introducing ADMI - This Is ADMI ft Carolyne Sila',
        description:
          'Email: info@admi.africa\nCall/ WhatsApp: (+254) 711 486 581 / (+254) 706 349 696\n-------------------------------------------------------------------------------------------------\nWelcome to "This Is ADMI",  your inside look into Africa Digital Media Institute.\n\nIn this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions. Meet our passionate faculty, hear directly from our Head of School, and walk alongside students as they pursue careers i...',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/qWMS_rR3lEw/default.jpg',
          medium: 'https://i.ytimg.com/vi/qWMS_rR3lEw/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/qWMS_rR3lEw/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/qWMS_rR3lEw/maxresdefault.jpg'
        },
        publishedAt: '2025-07-08T05:00:06Z',
        duration: '13:03',
        viewCount: '45',
        likeCount: '3',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: [
          'admi',
          'africa digital media institute',
          'media school kenya',
          'film school nairobi',
          'animation school kenya'
        ],
        categoryId: '27'
      },
      {
        id: '_LbdGLAEsQc',
        title: 'The Future of Work and Digital Careers  - Preparing Your Child for a Tech-Driven Job Market',
        description: '',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/_LbdGLAEsQc/default.jpg',
          medium: 'https://i.ytimg.com/vi/_LbdGLAEsQc/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/_LbdGLAEsQc/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/_LbdGLAEsQc/maxresdefault.jpg'
        },
        publishedAt: '2025-06-10T07:31:14Z',
        duration: '57:04',
        viewCount: '20',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['media school', 'admi kenya', 'admi africa', 'africa digital media', 'africa digital media institute'],
        categoryId: '27'
      },
      {
        id: 'bV5oMyceEg4',
        title: 'Raising a Resilient and Mentally Strong Teen | Parent Webinar Series',
        description: '',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/bV5oMyceEg4/default.jpg',
          medium: 'https://i.ytimg.com/vi/bV5oMyceEg4/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/bV5oMyceEg4/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/bV5oMyceEg4/maxresdefault.jpg'
        },
        publishedAt: '2025-05-21T07:50:30Z',
        duration: '47:50',
        viewCount: '13',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['media school', 'admi kenya', 'admi africa', 'africa digital media', 'africa digital media institute'],
        categoryId: '27'
      },
      {
        id: 'hmC_wWGiQTk',
        title: 'Inside the SANAA Student Exhibition',
        description:
          '✨ Raw talent. Bold stories. Real reactions.\nFrom nerves to newfound confidence, from creative inspiration to artistic breakthroughs,  hear what our students and guests had to say about the magic of the recent SANAA Student Exhibition. \n\nThis is what happens when creativity meets courage.\n📽️ Watch the full video and experience the art, the energy, and the voices that brought it all to life.\n\n\n#SANAAStudentExhibition #ADMICreates #StudentShowcase #CreativeFutureStartsHere #MadeAtADMI',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/hmC_wWGiQTk/default.jpg',
          medium: 'https://i.ytimg.com/vi/hmC_wWGiQTk/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/hmC_wWGiQTk/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/hmC_wWGiQTk/maxresdefault.jpg'
        },
        publishedAt: '2025-05-20T09:05:14Z',
        duration: '3:54',
        viewCount: '80',
        likeCount: '3',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['media school', 'admi kenya', 'admi africa', 'africa digital media', 'africa digital media institute'],
        categoryId: '27'
      },
      {
        id: '384UobxSV9I',
        title: 'Sanaa Student Exhibition | Highlights',
        description:
          "✨ Where creativity meets opportunity!\n\nEvery year, ADMI's Student Exhibitions unite our vibrant community — from rising creative talent to leading industry partners — in a powerful celebration of digital innovation and artistic expression.\n\nThis year's #SanaaStudentExhibition was nothing short of extraordinary. Dive into the highlights and witness the energy, passion, and bold vision of Africa's next generation of creative leaders.\n\nAt ADMI, we don't just teach creativity — we build careers. Wit...",
        thumbnail: {
          default: 'https://i.ytimg.com/vi/384UobxSV9I/default.jpg',
          medium: 'https://i.ytimg.com/vi/384UobxSV9I/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/384UobxSV9I/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/384UobxSV9I/maxresdefault.jpg'
        },
        publishedAt: '2025-05-13T09:06:19Z',
        duration: '2:15',
        viewCount: '172',
        likeCount: '14',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['media school', 'admi kenya', 'admi africa', 'africa digital media', 'africa digital media institute'],
        categoryId: '27'
      },
      {
        id: 'dhQOeqSWTDE',
        title: 'Social Media & Content Creation for Teens – Opportunities and Risks | Parent Webinar Series',
        description: '',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/dhQOeqSWTDE/default.jpg',
          medium: 'https://i.ytimg.com/vi/dhQOeqSWTDE/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/dhQOeqSWTDE/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/dhQOeqSWTDE/maxresdefault.jpg'
        },
        publishedAt: '2025-05-09T08:18:58Z',
        duration: '51:18',
        viewCount: '37',
        likeCount: '2',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['media school', 'admi kenya', 'admi africa', 'africa digital media', 'africa digital media institute'],
        categoryId: '27'
      }
    ],
    lastUpdated: '2025-07-28T11:30:28.495Z',
    totalVideos: 49,
    channelInfo: {
      title: 'Africa Digital Media Institute - ADMI',
      description:
        "ADMI is a leading training institution focused on creative media and emerging technologies. Headquartered in Nairobi, Kenya, the world's Silicon Savannah, we exist to inspire Africa's digital generation to lead innovation in the entertainment and technology business globally",
      subscriberCount: '4050',
      videoCount: '593',
      viewCount: '10211977'
    }
  }
}

// Read cache from file regardless of expiration (for fallback)
export function readVideoCacheRaw(): VideoCache | null {
  try {
    ensureCacheDirectory()

    if (!fs.existsSync(CACHE_FILE_PATH)) {
      console.log('📁 No cache file found at', CACHE_FILE_PATH)

      // Try to read from committed cache file as backup
      const committedCachePath = path.join(process.cwd(), 'data', 'admi-videos-cache.json')
      if (fs.existsSync(committedCachePath)) {
        console.log('📚 Reading from committed cache file:', committedCachePath)
        const cacheData = fs.readFileSync(committedCachePath, 'utf-8')
        const cache: VideoCache = JSON.parse(cacheData)
        console.log(`✅ Committed cache loaded with ${cache.videos?.length || 0} videos`)
        return cache
      }

      // Fallback to production data
      console.log('🔄 Using production fallback for raw cache')
      return getProductionFallbackCache()
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    console.log(`📚 Raw cache read, ${cache.videos?.length || 0} videos loaded`)
    return cache
  } catch (error) {
    console.error('❌ Error reading raw cache:', error)

    // Try committed cache file as backup
    try {
      const committedCachePath = path.join(process.cwd(), 'data', 'admi-videos-cache.json')
      if (fs.existsSync(committedCachePath)) {
        console.log('🔄 Fallback to committed cache file after error')
        const cacheData = fs.readFileSync(committedCachePath, 'utf-8')
        const cache: VideoCache = JSON.parse(cacheData)
        console.log(`✅ Committed cache fallback loaded with ${cache.videos?.length || 0} videos`)
        return cache
      }
    } catch (fallbackError) {
      console.error('❌ Error reading committed cache fallback:', fallbackError)
    }

    // Final fallback to production data
    console.log('🔄 Using production fallback for raw cache (error)')
    return getProductionFallbackCache()
  }
}

// Write cache to file
export function writeVideoCache(cache: VideoCache): void {
  try {
    ensureCacheDirectory()

    const cacheData = JSON.stringify(cache, null, 2)
    fs.writeFileSync(CACHE_FILE_PATH, cacheData, 'utf-8')

    console.log(`💾 Cache saved with ${cache.videos.length} videos`)
  } catch (error) {
    console.error('❌ Error writing cache:', error)
  }
}

// Check if cache is valid
export function isCacheValid(): boolean {
  try {
    if (!fs.existsSync(CACHE_FILE_PATH)) {
      return false
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    const lastUpdated = new Date(cache.lastUpdated)
    const now = new Date()
    const timeDiff = now.getTime() - lastUpdated.getTime()

    return timeDiff <= CACHE_DURATION
  } catch (error) {
    console.error('❌ Error checking cache validity:', error)
    return false
  }
}

// Get cache stats
export function getCacheStats(): { exists: boolean; lastUpdated?: string; videoCount?: number; isValid?: boolean } {
  try {
    if (!fs.existsSync(CACHE_FILE_PATH)) {
      return { exists: false }
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    const lastUpdated = new Date(cache.lastUpdated)
    const now = new Date()
    const timeDiff = now.getTime() - lastUpdated.getTime()
    const isValid = timeDiff <= CACHE_DURATION

    return {
      exists: true,
      lastUpdated: cache.lastUpdated,
      videoCount: cache.videos.length,
      isValid
    }
  } catch (error) {
    console.error('❌ Error getting cache stats:', error)
    return { exists: false }
  }
}
