import localFont from 'next/font/local'

import { createTheme } from '@/lib/tw-mantine'

const createColorScale = (hex: string) => Array.from({ length: 10 }, () => hex)

// Import your fonts with optimized loading
export const nexaFont = localFont({
  src: [
    {
      path: '../assets/fonts/Nexa-ExtraLight.ttf',
      weight: '100',
      style: 'light'
    },
    {
      path: '../assets/fonts/Nexa-Regular.otf',
      weight: '400',
      style: 'regular'
    },
    {
      path: '../assets/fonts/Nexa-Heavy.ttf',
      weight: '900',
      style: 'bold'
    }
  ],
  variable: '--font-nexa',
  display: 'swap',
  preload: true
})

export const proximaNovaFont = localFont({
  src: [
    {
      path: '../assets/fonts/ProximaNova-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/ProximaNova-Semibold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../assets/fonts/ProximaNova-Thin.otf',
      weight: '100',
      style: 'normal'
    }
  ],
  variable: '--font-proxima',
  display: 'swap',
  preload: true
})

export const defaultTheme = createTheme({
  colors: {
    admiDarkOrange: createColorScale('#BA2E36'),
    admiShamrok: createColorScale('#08F6CF'),
    admiRed: createColorScale('#F60834'),
    admiOrangeLight: createColorScale('#F76335'),
    admiOrangeDark: createColorScale('#BD2D00')
  },
  primaryColor: 'admiDarkOrange'
})
