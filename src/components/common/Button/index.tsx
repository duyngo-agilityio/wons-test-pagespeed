'use client';

import { extendVariants, Button as ButtonNextUI } from '@nextui-org/react';

const Button = extendVariants(ButtonNextUI, {
  variants: {
    color: {
      default:
        'bg-blue-500/5 text-blue-800 border-transparent dark:bg-gray-400 dark:text-white dark:border-gray-400 hover:bg-blue-500 dark:hover:bg-white',
      primary:
        'bg-blue-500 border-transparent dark:bg-purple-600 text-white hover:bg-white hover:text-blue-500 dark:hover:text-purple-600',
      secondary:
        'bg-transparent text-blue-500 border-blue-500 dark:text-purple-600 dark:border-purple-600 hover:bg-blue-500 hover:text-white dark:hover:bg-white',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    isLoading: {
      true: 'cursor-not-allowed',
    },
    size: {
      xs: 'px-5 pb-2.5 pt-[11px] text-md rounded-[10px] border-[1px] h-auto min-w-max',
      sm: 'px-5 py-2.5 text-xl rounded-[10px] border-[1px] h-auto min-w-max',
      md: 'px-5 pt-3 pb-[14px] text-md rounded-[10px] border-[1px] h-auto min-w-max',
      lg: 'px-[30px] pt-[15px] pb-[14px] text-md rounded-[10px] border-[1px] h-auto min-w-max',
      xl: 'px-10 pt-[15px] pb-[14px] text-md rounded-[10px] border-[1px] h-auto min-w-max',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'xs',
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: 'default',
    },
  ],
});

export default Button;
