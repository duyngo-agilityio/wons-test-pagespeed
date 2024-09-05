'use client';

// Libs
import {
  extendVariants,
  InputProps,
  Input as NextUIInput,
} from '@nextui-org/react';

const CustomInput = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        inputWrapper: `bg-gray-50 dark:bg-gray-600`,
        input: [
          `!text-blue-800 dark:!text-white`,
          `placeholder-blue-800 dark:placeholder-white`,
        ],
        label:
          'group-data-[filled-within=true]:text-blue-800 dark:group-data-[filled-within=true]:text-white',
      },
    },

    size: {
      xs: {
        inputWrapper: 'h-auto px-1',
        input: 'text-tiny',
      },
      md: {
        inputWrapper: 'h-12.5 p-3.75',
        input: 'text-md',
        base: 'data-[has-label=true]:mt-[29px]',
        label: 'font-medium text-xl top-5',
      },
      // xl: {
      //   inputWrapper: 'h-14 min-h-14',
      //   input: 'text-medium',
      // },
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
    labelPlacement: 'outside',
    placeholder: ' ',
  },
});

const Input = ({ ...props }: InputProps): JSX.Element => {
  return (
    <CustomInput
      // classNames={{ innerWrapper: 'focus:border-red-500' }}
      {...props}
    />
  );
};

export default Input;
