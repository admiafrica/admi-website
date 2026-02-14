import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        admiDarkOrange: '#BA2E36',
        admiShamrok: '#08F6CF',
        admiRed: '#F60834'
      },
      fontFamily: {
        nexa: ['var(--font-nexa)'],
        proxima: ['var(--font-proxima)'],
        fraunces: ['"Fraunces Variable"', 'Georgia', 'serif']
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
