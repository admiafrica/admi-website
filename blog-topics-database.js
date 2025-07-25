// Comprehensive topic database for creative and tech economy blog generation
const blogTopics = {
  // Creative Economy Topics - Based on Actual ADMI Courses
  creativeEconomy: [
    {
      topic: 'Start Your Graphic Design Career: From Beginner to Professional Designer',
      keywords: ['graphic design career', 'design courses', 'creative jobs', 'visual communication'],
      category: 'Graphic Design',
      difficulty: 'beginner',
      targetCourse: 'Graphic Design',
      careerPath: 'Graphic Designer, Brand Designer, Creative Director, Visual Communication Specialist'
    },
    {
      topic: "Film Production Career Guide: Break Into Kenya's Growing Movie Industry",
      keywords: ['film production career', 'cinematography', 'video editing', 'film school'],
      category: 'Film Production',
      difficulty: 'beginner',
      targetCourse: 'Film Production',
      careerPath: 'Director, Cinematographer, Video Editor, Producer, Camera Operator'
    },
    {
      topic: "Music Production Mastery: Launch Your Career in Africa's Music Scene",
      keywords: ['music production career', 'sound engineering', 'beat making', 'music industry'],
      category: 'Music Production',
      difficulty: 'beginner',
      targetCourse: 'Music Production',
      careerPath: 'Music Producer, Beat Maker, Recording Artist, Music Director'
    },
    {
      topic: 'Sound Engineering: Master Audio Production for Media and Music',
      keywords: ['sound engineering', 'audio production', 'mixing', 'sound design'],
      category: 'Sound Engineering',
      difficulty: 'intermediate',
      targetCourse: 'Sound Engineering',
      careerPath: 'Sound Engineer, Audio Technician, Live Sound Engineer, Studio Engineer'
    },
    {
      topic: 'Animation Career Path: Create Stories That Captivate Audiences',
      keywords: ['animation career', '2D animation', '3D modeling', 'storytelling'],
      category: 'Animation',
      difficulty: 'intermediate',
      targetCourse: 'Animation',
      careerPath: '2D Animator, 3D Artist, Character Designer, Storyboard Artist'
    },
    {
      topic: "Video Game Development: Build Your Future in Africa's Gaming Industry",
      keywords: ['game development', 'mobile games', 'game design', 'programming'],
      category: 'Video Game Development',
      difficulty: 'intermediate',
      targetCourse: 'Video Game Development',
      careerPath: 'Game Developer, Game Designer, Mobile App Developer, Interactive Media Designer'
    },
    {
      topic: 'Digital Marketing Specialist: High-Demand Career in the Digital Economy',
      keywords: ['digital marketing career', 'social media marketing', 'online advertising', 'SEO'],
      category: 'Digital Marketing',
      difficulty: 'beginner',
      targetCourse: 'Digital Marketing',
      careerPath: 'Digital Marketer, Social Media Manager, SEO Specialist, Content Manager'
    },
    {
      topic: "Photography Career Guide: Capture Kenya's Stories Through Your Lens",
      keywords: ['photography career', 'visual storytelling', 'commercial photography', 'photo editing'],
      category: 'Photography',
      difficulty: 'beginner',
      targetCourse: 'Photography',
      careerPath: 'Photographer, Photo Editor, Visual Content Creator, Event Photographer'
    },
    {
      topic: 'UI/UX Design: Shape the Future of Digital Experiences in Africa',
      keywords: ['UI UX design', 'user experience', 'app design', 'digital design'],
      category: 'UI/UX Design',
      difficulty: 'intermediate',
      targetCourse: 'UI/UX Design',
      careerPath: 'UI Designer, UX Designer, Product Designer, Digital Experience Designer'
    },
    {
      topic: 'Entertainment Business: Turn Your Creative Passion Into Profit',
      keywords: ['entertainment business', 'creative entrepreneurship', 'media business', 'entertainment industry'],
      category: 'Entertainment Business',
      difficulty: 'advanced',
      targetCourse: 'Entertainment Business',
      careerPath: 'Entertainment Manager, Creative Director, Media Entrepreneur, Content Producer'
    }
  ],

  // Creative Tech Economy Topics - Based on ADMI's Creative Technology Focus
  techEconomy: [
    {
      topic: 'Video Game Development: Building the Next Generation of African Games',
      keywords: ['video game development', 'game design', 'Unity', 'mobile games', 'African gaming'],
      category: 'Video Game Development',
      difficulty: 'intermediate',
      targetCourse: 'Video Game Development',
      careerPath: 'Game Developer, Game Designer, Mobile Game Developer, Interactive Media Designer'
    },
    {
      topic: 'Virtual Film Production: How Technology is Revolutionizing Filmmaking',
      keywords: ['virtual production', 'digital filmmaking', 'VFX', 'virtual sets', 'film technology'],
      category: 'Virtual Film Production',
      difficulty: 'advanced',
      targetCourse: 'Film Production',
      careerPath: 'Virtual Production Supervisor, VFX Artist, Digital Cinematographer, Film Tech Specialist'
    },
    {
      topic: 'AI in Film and Animation: The Future of Creative Content Production',
      keywords: ['AI filmmaking', 'AI animation', 'machine learning', 'automated editing', 'creative AI'],
      category: 'AI Film/Animation',
      difficulty: 'advanced',
      targetCourse: 'Animation',
      careerPath: 'AI Animation Specialist, Digital Content Creator, Tech-Creative Director, Motion Graphics Artist'
    },
    {
      topic: 'Motion Graphics and Visual Effects: Bringing Ideas to Life with Technology',
      keywords: ['motion graphics', 'VFX', 'After Effects', 'digital compositing', 'visual storytelling'],
      category: 'Motion Graphics & VFX',
      difficulty: 'intermediate',
      targetCourse: 'Animation',
      careerPath: 'Motion Graphics Designer, VFX Artist, Compositor, Digital Effects Specialist'
    },
    {
      topic: 'Interactive Media Design: Creating Immersive Digital Experiences',
      keywords: ['interactive media', 'digital installations', 'UX design', 'multimedia art', 'creative technology'],
      category: 'Interactive Media',
      difficulty: 'advanced',
      targetCourse: 'UI/UX Design',
      careerPath: 'Interactive Designer, Experience Designer, Digital Artist, Creative Technologist'
    },
    {
      topic: 'Digital Music Production: Technology Tools for Modern Music Creation',
      keywords: ['digital music production', 'DAW software', 'music technology', 'electronic music', 'sound design'],
      category: 'Digital Music Production',
      difficulty: 'intermediate',
      targetCourse: 'Music Production',
      careerPath: 'Digital Music Producer, Sound Designer, Audio Software Specialist, Electronic Music Artist'
    },
    {
      topic: 'Virtual Reality Content Creation: Building Immersive Experiences',
      keywords: ['VR content creation', 'virtual reality', '360 video', 'immersive media', 'VR storytelling'],
      category: 'VR Content Creation',
      difficulty: 'advanced',
      targetCourse: 'Video Game Development',
      careerPath: 'VR Developer, Immersive Media Creator, 360 Video Producer, VR Experience Designer'
    },
    {
      topic: 'Live Streaming Technology: Professional Broadcasting for Creative Content',
      keywords: [
        'live streaming',
        'broadcast technology',
        'streaming setup',
        'online content creation',
        'digital media'
      ],
      category: 'Live Streaming Tech',
      difficulty: 'intermediate',
      targetCourse: 'Film Production',
      careerPath: 'Live Stream Producer, Broadcast Technician, Digital Content Creator, Online Media Specialist'
    }
  ],

  // Digital Marketing & Media Topics - Educational Focus
  digitalMarketing: [
    {
      topic: 'Social Media Marketing Mastery: Grow Your Following from Zero',
      keywords: ['social media tutorial', 'Instagram marketing', 'content strategy', 'audience growth'],
      category: 'Social Media',
      difficulty: 'beginner'
    },
    {
      topic: 'SEO for Beginners: Rank #1 on Google in 90 Days',
      keywords: ['SEO tutorial', 'keyword research', 'Google ranking', 'website optimization'],
      category: 'SEO',
      difficulty: 'beginner'
    },
    {
      topic: 'Video Marketing Blueprint: Create Engaging Content That Converts',
      keywords: ['video marketing', 'YouTube tutorial', 'video editing', 'content creation'],
      category: 'Video Marketing',
      difficulty: 'intermediate'
    },
    {
      topic: 'Email Marketing That Works: Build and Monetize Your List',
      keywords: ['email marketing tutorial', 'email automation', 'list building', 'email campaigns'],
      category: 'Email Marketing',
      difficulty: 'beginner'
    },
    {
      topic: 'Graphic Design Fundamentals: Create Professional Visuals',
      keywords: ['graphic design tutorial', 'design principles', 'visual communication', 'branding'],
      category: 'Design',
      difficulty: 'beginner'
    },
    {
      topic: 'Digital Advertising Mastery: Facebook and Google Ads That Convert',
      keywords: ['Facebook ads', 'Google ads', 'digital advertising', 'ad optimization'],
      category: 'Advertising',
      difficulty: 'intermediate'
    }
  ],

  // Gaming & Interactive Media Topics
  gaming: [
    {
      topic: 'The Growing Gaming Industry in Africa: Opportunities and Challenges',
      keywords: ['gaming industry', 'African games', 'game development', 'mobile gaming'],
      category: 'Gaming',
      difficulty: 'intermediate'
    },
    {
      topic: 'Getting Started with Game Development: Tools and Technologies',
      keywords: ['game development', 'Unity', 'programming', 'indie games'],
      category: 'Game Development',
      difficulty: 'beginner'
    },
    {
      topic: 'Virtual Reality Applications Beyond Gaming',
      keywords: ['virtual reality', 'VR applications', 'education', 'training'],
      category: 'VR/AR',
      difficulty: 'advanced'
    },
    {
      topic: 'Monetization Strategies for Mobile Games',
      keywords: ['mobile games', 'monetization', 'in-app purchases', 'advertising'],
      category: 'Game Business',
      difficulty: 'intermediate'
    }
  ],

  // Education Technology Topics
  edtech: [
    {
      topic: 'The Future of Online Learning in Africa',
      keywords: ['online learning', 'education technology', 'digital skills', 'Africa'],
      category: 'EdTech',
      difficulty: 'intermediate'
    },
    {
      topic: 'Microlearning and Skill Development in the Digital Age',
      keywords: ['microlearning', 'skill development', 'continuous learning', 'digital education'],
      category: 'Learning',
      difficulty: 'beginner'
    },
    {
      topic: 'Building Interactive Educational Content',
      keywords: ['interactive content', 'educational design', 'engagement', 'learning tools'],
      category: 'Content Design',
      difficulty: 'intermediate'
    }
  ]
}

// Function to get a random topic from any category
function getRandomTopic() {
  const allCategories = Object.keys(blogTopics)
  const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)]
  const categoryTopics = blogTopics[randomCategory]
  const randomTopic = categoryTopics[Math.floor(Math.random() * categoryTopics.length)]

  return {
    ...randomTopic,
    categoryType: randomCategory
  }
}

// Function to get topics by category
function getTopicsByCategory(category) {
  return blogTopics[category] || []
}

// Function to get topics by difficulty
function getTopicsByDifficulty(difficulty) {
  const allTopics = []
  Object.values(blogTopics).forEach((categoryTopics) => {
    allTopics.push(...categoryTopics.filter((topic) => topic.difficulty === difficulty))
  })
  return allTopics
}

// Function to generate a content brief for a topic
function generateContentBrief(topic) {
  const sections = [
    'Success story hook',
    'Learning objectives',
    'Industry overview and demand',
    'Getting started basics',
    'Professional requirements',
    'Career opportunities',
    'ADMI course spotlight',
    'Enrollment call-to-action'
  ]

  return {
    title: topic.topic,
    targetWordCount: 1000,
    keywords: topic.keywords,
    category: topic.category,
    difficulty: topic.difficulty,
    targetCourse: topic.targetCourse,
    careerPath: topic.careerPath,
    suggestedSections: sections,
    seoTitle: `${topic.topic} | Start Your Career at ADMI`,
    metaDescription: `Launch your ${topic.category.toLowerCase()} career with ADMI's professional training. Learn industry skills and land high-paying jobs in Africa's creative economy.`
  }
}

module.exports = {
  blogTopics,
  getRandomTopic,
  getTopicsByCategory,
  getTopicsByDifficulty,
  generateContentBrief
}

// Export for ES6 modules as well
if (typeof module === 'undefined') {
  window.blogTopics = {
    blogTopics,
    getRandomTopic,
    getTopicsByCategory,
    getTopicsByDifficulty,
    generateContentBrief
  }
}
