'use client';
import { ReactNode } from 'react';

// icons
import { FaSpinner } from 'react-icons/fa';

import {
  extendVariants,
  Button as ButtonNextUI,
  ButtonProps as NextUIButtonProps,
} from '@nextui-org/react';

const ButtonCustom = extendVariants(ButtonNextUI, {
  variants: {
    color: {
      default:
        ' border-transparent !bg-gray-50 dark:!bg-gray-600 text-blue-800 dark:text-white hover:!bg-gray-200/50 dark:hover:!bg-gray-900',

      primary:
        'bg-blue-500 border-transparent dark:bg-purple-600 text-white hover:bg-blue-100',
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

interface ButtonProps extends Omit<NextUIButtonProps, 'size'> {
  isLoading?: boolean;
  children?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Button = ({ isLoading = false, children, ...props }: ButtonProps) => {
  return (
    <ButtonCustom
      {...props}
      isLoading={undefined}
      disabled={isLoading || props.disabled}
    >
      <div className="flex items-center">
        {isLoading && <FaSpinner className="animate-spin mr-2" />}
        {children}
      </div>
    </ButtonCustom>
  );
};

export default Button;
