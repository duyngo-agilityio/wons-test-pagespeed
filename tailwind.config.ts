import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/react';

// Themes
import {
  borderRadius,
  fontSize,
  lineHeight,
  spacing,
} from './src/themes';
import {
  colors,
} from './src/themes/colors';

const { gray, blue, white } = colors;

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        base: '0px',
        xs: '375px',
      },
      fontFamily: {
        'dm-sans': ['var(--font-dm-sans)'],
      },

      borderRadius,
      colors,
      fontSize,
      lineHeight,
      spacing,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            background: gray[50],
            foreground: blue[800],
          },
          layout: {},
        },
        dark: {
          colors: {
            background: gray[600],
            foreground: white,
          },
          layout: {},
        },
      },
    }),
  ],
};
export default config;
