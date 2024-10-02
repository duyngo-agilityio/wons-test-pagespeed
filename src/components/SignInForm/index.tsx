'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Types
import { SignInFormData } from '@/types';

// Constants
import { ERROR_MESSAGES, MESSAGE_STATUS, ROUTES, REGEX } from '@/constants';

// Utils
import { clearErrorOnChange, isEnableSubmitButton } from '@/utils';

// Hooks
import { useToast } from '@/hooks';

// Icons
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

// Components
import { Button, Input } from '@/components';

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => Promise<void | string>;
}

// Zod schema for validation
const signInSchema = z.object({
  identifier: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED)
    .email(ERROR_MESSAGES.FIELD_INVALID('Email Address')),
  password: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED)
    .regex(REGEX.PASSWORD, ERROR_MESSAGES.GENERAL_INVALID_PASSWORD),
});

const REQUIRED_FIELDS = ['identifier', 'password'];

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showToast } = useToast();

  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  /**
   * Func handle sign in
   */
  const handleSignIn = async (formData: SignInFormData) => {
    startTransition(async () => {
      const res = await onSubmit(formData);

      if (typeof res === 'string') {
        return showToast({
          status: 'error',
          title: MESSAGE_STATUS.ERROR,
          description: res,
        });
      }

      router.push(ROUTES.DASHBOARD);
    });
  };

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );
  const isDisableSubmit = !enableSubmit;

  const handleToggleVisiblePassword = useCallback(
    () => setIsShowPassword(!isShowPassword),
    [isShowPassword],
  );

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="w-full">
      {/*Email*/}
      <Controller
        name="identifier"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Email Address"
            classNames={{ base: 'h-[74px]' }}
            type="email"
            isInvalid={!!error}
            errorMessage={error?.message}
            onChange={(e) => {
              onChange(e.target.value);

              // Clear error message on change
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      {/* Password Input */}
      <Controller
        name="password"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Password"
            type={isShowPassword ? 'text' : 'password'}
            endContent={
              isShowPassword ? (
                <IoMdEyeOff
                  className="w-5 h-5 cursor-pointer text-blue-800/50 dark:text-white/50"
                  onClick={handleToggleVisiblePassword}
                />
              ) : (
                <IoMdEye
                  className="w-5 h-5 cursor-pointer text-blue-800/50 dark:text-white/50"
                  onClick={handleToggleVisiblePassword}
                />
              )
            }
            isInvalid={!!error}
            errorMessage={error?.message}
            onChange={(e) => {
              onChange(e.target.value);

              // Clear error message on change
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      <Button
        type="submit"
        isLoading={isPending}
        isDisabled={isDisableSubmit}
        size="lg"
        color="primary"
        className="w-full mt-10"
      >
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;
