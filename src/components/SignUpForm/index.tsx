'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

// Utils
import { clearErrorOnChange, isEnableSubmitButton } from '@/utils';

// Components
import { Button, Input, Text, Checkbox } from '@/components';

interface ISignUpFormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface ISignUpFormProps {
  onSubmit: (data: ISignUpFormData) => void;
}

// Zod schema for validation
const signUpSchema = z.object({
  fullName: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Full Name')),
  username: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Username')),
  email: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Email'))
    .email(ERROR_MESSAGES.FIELD_INVALID('Email')),
  password: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Password'))
    .regex(REGEX.PASSWORD, ERROR_MESSAGES.INVALID_PASSWORD),
});

const REQUIRED_FIELDS = ['fullName', 'username', 'email', 'password'];

const SignUpForm = ({ onSubmit }: ISignUpFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<ISignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
    },
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);
  const isEnableSubmit =
    isChecked && isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors);

  const handleToggleVisiblePassword = useCallback(
    () => setIsShowPassword(!isShowPassword),
    [isShowPassword],
  );

  const handleCheckBoxChange = useCallback(
    () => setIsChecked(!isChecked),
    [isChecked],
  );

  const handleSignUp = (formData: ISignUpFormData) => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      {/* Full Name */}
      <Controller
        name="fullName"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Full Name"
            classNames={{ base: 'h-[71px]' }}
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

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Email Address"
            classNames={{ base: 'h-[71px]' }}
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

      {/* Username */}
      <Controller
        name="username"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Username"
            classNames={{ base: 'h-[71px]' }}
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

      {/* Password */}
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

      {/* Policy */}
      <div className="flex gap-0.5 items-start mt-6.25">
        <Checkbox
          onChange={handleCheckBoxChange}
          classNames={{ wrapper: 'mt-1' }}
        />

        <div>
          <Text
            text="By creating an account you agree to the"
            size="xl"
            className="color-blue.900 font-medium inline"
          />
          &nbsp;
          <Link href="#">
            <Text
              text="terms of use"
              size="xl"
              className="!text-blue-500 dark:!text-purple-600 font-medium inline hover:underline"
            />
          </Link>
          &nbsp;
          <Text
            text="and our"
            size="xl"
            className="color-blue-900 font-medium inline"
          />
          &nbsp;
          <Link href="#">
            <Text
              text="privacy policy."
              size="xl"
              className="!text-blue-500 dark:!text-purple-600 font-medium inline hover:underline"
            />
          </Link>
        </div>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        isDisabled={!isEnableSubmit}
        size="lg"
        color="primary"
        className="w-full mt-8 text-xl font-medium"
      >
        Create account
      </Button>

      <div className="flex justify-center items-center mt-7.5">
        <Text
          text="Already have an account?"
          size="xl"
          className="color-blue-900 font-medium inline"
        />
        &nbsp;
        <Link href="/sign-in">
          <Text
            text="Login"
            size="xl"
            className="!text-blue-500 dark:!text-purple-600 font-medium inline hover:underline"
          />
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
