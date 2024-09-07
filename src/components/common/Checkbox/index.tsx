'use client';

// Libs
import {
  extendVariants,
  Checkbox as NextUICheckbox,
  CheckboxProps as NextUICheckboxProps,
} from '@nextui-org/react';

export const Checkbox = extendVariants(NextUICheckbox, {
  variants: {
    color: {
      primary: {
        wrapper: [
          'after:bg-500 dark:after:bg-purple-600',
          'after:hover:bg-blue-500 dark:after:hover:bg-purple-600',
          'before:border-blue-800/30 dark:before:border-white/30',
        ],
        icon: 'text-white dark:text-gray-400',
      },
    },
    size: {
      md: {
        label: 'text-sm',
        wrapper: ['w-3.75 h-3.75', 'before:border'],
      },
      lg: {
        label: 'text-base',
        wrapper: ['w-5 h-5', 'before:border'],
      },
    },
    radius: {
      sm: {
        wrapper: ['rounded-sm', 'before:rounded-sm', 'after:rounded-sm'],
      },
    },
  },

  defaultVariants: {
    color: 'primary',
    size: 'md',
    radius: 'sm',
  },
});

export default Checkbox;
