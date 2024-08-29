'use client';
import { extendVariants, Input as NextUIInput } from '@nextui-org/react';

const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        inputWrapper: `bg-gray-50 dark:bg-gray-600`,
        input: [
          `!text-blue-800 dark:!text-white`,
          `placeholder-blue-800 dark:placeholder-white`,
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: 'h-auto px-1',
        input: 'text-tiny',
      },
      md: {
        inputWrapper: 'h-auto  px-3',
        input: 'text-small',
      },
      xl: {
        inputWrapper: 'h-14 min-h-14',
        input: 'text-medium',
      },
    },
    radius: {
      sm: {
        inputWrapper: 'rounded-1.25',
      },
    },
    border: {
      default: {
        inputWrapper: 'border: 1px solid',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
    radius: 'sm',
    border: 'default',
  },
});

export default Input;
