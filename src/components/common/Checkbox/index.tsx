'use client';

import { extendVariants, Checkbox as NextUICheckbox } from '@nextui-org/react';

// themes
import { fontSize } from '@/themes';

export const CustomCheckbox = extendVariants(NextUICheckbox, {
  variants: {
    color: {
      default: {
        wrapper: 'after:bg-[var(--after-bg-default)] text-white',
      },
      custom: {
        wrapper: 'text-white',
      },
    },
    size: {
      md: {
        label: 'text-sm',
      },
      lg: {
        label: 'text-base',
      },
    },
    radius: {
      sm: {
        wrapper: 'rounded-sm',
      },
      md: {
        wrapper: 'rounded-md',
      },
      lg: {
        wrapper: 'rounded-lg',
      },
    },
  },

  defaultVariants: {
    color: 'default',
    size: 'md',
    radius: 'sm',
  },
});

type CheckboxProps = {
  color?: 'default' | 'custom';
  colorValue?: string;
  afterBgColor?: string;
  size?: keyof typeof fontSize | 'md';
  radius?: 'sm' | 'md' | 'lg';
};

const Checkbox = ({
  size = 'md',
  color = 'default',
  colorValue,
  afterBgColor = '#1E90FF',
  radius = 'sm',
}: CheckboxProps) => {
  const variantProps =
    color === 'custom' && colorValue
      ? {
          color,
          style: {
            backgroundColor: colorValue,
            '--after-bg-default': afterBgColor,
          },
        }
      : { color, style: { '--after-bg-default': afterBgColor } };

  return (
    <CustomCheckbox
      {...variantProps}
      size={size}
      radius={radius}
      className="custom-checkbox"
    />
  );
};

export default Checkbox;
