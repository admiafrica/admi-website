import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/campaigns/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Brand colours (from Brand Book)
        'brand-red': '#C1272D',
        'brand-sage': '#8EBFB0',
        'brand-yellow': '#D9DC5B',
        'brand-orange': '#EF7B2E',
        'brand-maroon': '#922834',
        'brand-whatsapp': '#25D366',
        // Legacy alias
        'brand-teal': '#8EBFB0',
        // Semantic aliases
        primary: '#C1272D',
        'primary-hover': '#A32025',
        secondary: '#8EBFB0',
        // Surfaces
        'admi-black': '#0A0A0A',
        'admi-green': '#002A23',
        'admi-blue': '#1a1a2e',
        warm: '#f7f5f2',
        'card-dark': '#111111',
        // Neutrals
        muted: '#6B7280',
        'muted-light': '#9CA3AF',
        // Dividers
        'divider-light': '#E5E7EB',
        'divider-dark': '#2A2A2A',
        // Legacy aliases (keep for backwards compat)
        admiDarkOrange: '#C1272D',
        admiShamrok: '#8EBFB0',
        admiRed: '#C1272D'
      },
      fontFamily: {
        nexa: ['var(--font-nexa)'],
        proxima: ['var(--font-proxima)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        fraunces: ['"Fraunces Variable"', 'Georgia', 'serif']
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        pill: '100px'
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
        '5xl': '80px',
        '6xl': '100px'
      },
      screens: {
        xs: '480px'
      }
    }
  },
  corePlugins: {
    preflight: false
  }
}
export default config
