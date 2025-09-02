/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // i18n configuration moved to app router implementation
  // See: https://nextjs.org/docs/app/building-your-application/routing/internationalization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.admi.africa',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Add image optimization settings
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Performance optimizations
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'INP'],
    gzipSize: true, // Show gzip sizes in build output
  },
  // Enable compression
  compress: true,
  // Optimize bundle analyzer
  poweredByHeader: false, // Remove X-Powered-By header
  // SWC minification is now default in Next.js 15
  async headers() {
    return [
      // Add specific headers for API JSON files
      {
        source: '/api/media-archive/:path*.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=*, geolocation=(self), interest-cohort=()',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
          },
          // Performance optimization headers
          {
            key: 'Accept-CH',
            value: 'DPR, Width, Viewport-Width',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding, Accept-CH',
          },
        ],
      },
      // Cache static assets
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect www subdomain to naked domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.admi.africa',
          },
        ],
        destination: 'https://admi.africa/:path*',
        permanent: true,
      },
      // Redirect old domain to new domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admi.ac.ke',
          },
        ],
        destination: 'https://admi.africa/:path*',
        permanent: true,
      },
      // Note: Removed 's' parameter blocking - can be legitimate search traffic
      // Block URLs with gambling/casino parameters
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'ch',
          },
        ],
        destination: '/404',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'one',
          },
        ],
        destination: '/404',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'suka',
          },
        ],
        destination: '/404',
        permanent: false,
      },
      // Note: Removed fbclid blocking - it's legitimate Facebook traffic
      // Block image optimization abuse
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'url',
            value: '/_next/static/media/.*',
          },
        ],
        destination: '/404',
        permanent: false,
      },
      // Redirect common WordPress URLs to appropriate pages
      {
        source: '/wp-admin/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/404',
        permanent: true,
      },
      // Redirect old course URLs if they exist
      {
        source: '/course/:slug',
        destination: '/courses/:slug',
        permanent: true,
      },
      // Redirect gaming URLs to video-game-development (gambling confusion)
      {
        source: '/courses/gaming-:location',
        destination: '/courses/video-game-development-:location',
        permanent: true,
      },
      // Redirect old news URLs if they exist
      {
        source: '/article/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
      // Redirect old videos URL to media-archive structure
      {
        source: '/videos',
        destination: '/media-archive/videos',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
