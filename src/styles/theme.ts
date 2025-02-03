import localFont from 'next/font/local';

import { createTheme } from '@mantine/core';

import { generateColors } from '@mantine/colors-generator';

// Import your fonts
export const nexaFont = localFont({
  src: [
    {
      path: '../assets/fonts/Nexa-ExtraLight.ttf',
      weight: '100',
      style: 'light',
    },
    {
      path: '../assets/fonts/Nexa-Regular.otf',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../assets/fonts/Nexa-Heavy.ttf',
      weight: '900',
      style: 'bold',
    },
  ],
  variable: '--font-nexa',
});

export const proximaNovaFont = localFont({
  src: [
    {
      path: '../assets/fonts/ProximaNova-Regular.otf',
      weight: '500',
      style: 'regular',
    },
    {
      path: '../assets/fonts/ProximaNova-Semibold.otf',
      weight: '800',
      style: 'bold',
    },
    {
      path: '../assets/fonts/ProximaNova-Thin.otf',
      weight: '100',
      style: 'semibold',
    },
  ],
  variable: '--font-proxima',
});

export const defaultTheme = createTheme({
  colors: {
    admiDarkOrange: generateColors('#BA2E36'),
    admiShamrok: generateColors('#08F6CF'),
    admiRed: generateColors('#F60834'),
    admiOrangeLight: generateColors('#F76335'),
    admiOrangeDark: generateColors('#BD2D00'),
  },
  primaryColor: 'admiDarkOrange',
});
