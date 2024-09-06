'use client';

// Libs
import { extendVariants, Spinner as SpinnerNextUI } from '@nextui-org/react';

const Spinner = extendVariants(SpinnerNextUI, {
  variants: {
    color: {
      primary: {
        circle1: 'border-b-blue-500',
        circle2: 'border-b-blue-500',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export default Spinner;
