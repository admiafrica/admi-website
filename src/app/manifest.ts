import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Africa Digital Media Institute',
    short_name: 'ADMI',
    description:
      'Africa Digital Media Institute - Empowering creative professionals through industry-relevant education and training in Nairobi, Kenya.',
    start_url: '/',
    display: 'standalone',
    background_color: '#002A23',
    theme_color: '#002A23',
    orientation: 'portrait',
    scope: '/',
    lang: 'en-KE',
    categories: ['education', 'business'],
    icons: [
      {
        src: '/favicon.icon',
        sizes: '16x16 32x32',
        type: 'image/x-icon'
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  }
}
