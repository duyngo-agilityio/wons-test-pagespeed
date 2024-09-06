'use client';

import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Models
import { SignInFormData } from '@/models';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Utils
import { clearErrorOnChange, isEnableSubmitButton } from '@/utils';

// Components
import { Button, Input, Text, Checkbox } from '@/components';

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => void;
}

// Zod schema for validation
const signInSchema = z.object({
  identifier: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Email'))
    .email(ERROR_MESSAGES.FIELD_INVALID('Email')),
  password: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Password')),
});

const REQUIRED_FIELDS = ['identifier', 'password'];

const SignInForm = ({ onSubmit }: SignInFormProps) => {
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
   * Func handle login
   */
  const handleSignIn = async (formData: SignInFormData) => {
    onSubmit(formData);
  };

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );
  const isDisableSubmit = !enableSubmit;

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
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
            type="password"
            classNames={{
              inputWrapper: 'mt-6',
              base: 'data-[has-label=true]:mt-[20px] h-[64px]',
            }}
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

      <div className="flex justify-between mt-[25px]">
        <div className="flex items-center">
          <Checkbox />
          <Text
            text="Remember me"
            className="color-blue.900 text-[14.22px] leading-[18.51px]"
          />
        </div>
        <div>
          <Link
            href="#"
            className="text-[14.22px] leading-[18.51px] text-blue-500"
          >
            Reset Password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        isDisabled={isDisableSubmit}
        size="lg"
        color="primary"
        className="w-full mt-10"
      >
        Log in
      </Button>
    </form>
  );
};

export default SignInForm;
