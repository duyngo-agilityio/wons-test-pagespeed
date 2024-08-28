import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

/**
 * Each size will come with line height
 * Structure: sizeNaming: [fontSize, lineHeight]
 * Example : sm: [0.375rem, 0.625rem]
 * => fontSize: 0.375rem, lineHeight: 0.625rem
 */
export const fontSize: ResolvableTo<
  KeyValuePair<
    string,
    | string
    | [fontSize: string, lineHeight: string]
    | [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string;
          letterSpacing: string;
          fontWeight: string | number;
        }>,
      ]
  >
> = {
  '4xs': ['0.375rem', '0.625rem'], // fontSize: 6px, lineHeight: 10px
  '3xs': ['0.5rem', '0.625rem'], // fontSize: 8px, lineHeight: 10px
  '2xs': ['0.625rem', '0.813rem'], // fontSize: 10px, lineHeight: 13px
  xs: ['0.688rem', '0.938rem'], // fontSize: 11px, lineHeight: 15px
  sm: ['0.813rem', '1.063rem'], // fontSize: 13px, lineHeight: 17px
  md: ['0.875rem', '1.188rem'], // fontSize: 14px, lineHeight: 19px
  lg: ['0.938rem', '1.25rem'], // fontSize: 15px, lineHeight: 20px
  xl: ['1rem', '1.25rem'], // fontSize: 16px, lineHeight: 20px
  xxl: ['1.125rem', '1.438rem'], // fontSize: 18px, lineHeight: 23px
  '2xl': ['1.188rem', '1.5rem'], // fontSize: 19px, lineHeight: 24px
  '3xl': ['1.438rem', '1.875rem'], // fontSize: 23px, lineHeight: 30px
  '4xl': ['1.5rem', '1.938rem'], // fontSize: 24px, lineHeight: 31px
  '5xl': ['1.625rem', '2.063rem'], // fontSize: 26px, lineHeight: 33px
};

export const lineHeight = {
  '10': '0.625rem', // 10px
  '13': '0.813rem', // 13px
  '15': '0.938rem', // 15px
  '16': '1rem', // 16px
  '17': '1.063rem', // 17px
  '19': '1.188rem', // 19px
  '20': '1.25rem', // 20px
  '23': '1.438rem', // 23px
  '24': '1.5rem', // 24px
  '30': '1.875rem', // 30px
  '31': '1.938rem', // 31px
  '33': '2.063rem', // 33px
};
