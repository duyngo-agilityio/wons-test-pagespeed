'use client';
import { memo, useMemo, useTransition } from 'react';

// Libraries
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Utils
import {
  clearErrorOnChange,
  isEnableSubmitButton,
  getDirtyState,
} from '@/utils';

// Components
import { Input, AvatarUpload, Button } from '@/components';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Types
import { IUserFormData } from '@/types';

interface UserDetailFormProps {
  avatar: string;
  username: string;
  role: string;
  fullName: string;
  email: string;
  onAvatarChange: (file: File) => void;
  onSubmit: (formData: IUserFormData) => Promise<void>;
  onCancel: () => void;
}

const UserDetailForm = ({
  avatar = '',
  username = '',
  role = '',
  fullName = '',
  email = '',
  onAvatarChange,
  onSubmit,
  onCancel,
}: UserDetailFormProps) => {
  // Zod schema for validation
  const userDetailFormSchema = z.object({
    avatar: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED),
    username: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED),
    role: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED),
    fullName: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED),
    email: z
      .string()
      .nonempty(ERROR_MESSAGES.FIELD_REQUIRED)
      .email(ERROR_MESSAGES.FIELD_INVALID('Email')),
  });

  const [isPending, startTransition] = useTransition();

  const REQUIRED_FIELDS = ['avatar', 'fullName', 'email'];

  // Define config and props for useForm
  const {
    control,
    formState: { dirtyFields, errors, defaultValues },
    clearErrors,
    handleSubmit,
    watch,
  } = useForm<IUserFormData>({
    resolver: zodResolver(userDetailFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      avatar,
      username,
      role,
      fullName,
      email,
    },
  });

  // Checking to disable/enable submit button
  const previewData = {
    avatar,
    username,
    role,
    fullName,
    email,
  };

  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [REQUIRED_FIELDS, dirtyItems, errors],
  );

  const requiredField = REQUIRED_FIELDS.filter((field) => field !== 'avatar');

  const allFieldsFilled = requiredField.every((field) => {
    const isDirty = dirtyItems.includes(field);
    const hasError = errors[field as keyof IUserFormData];
    return isDirty && !hasError;
  });

  const isDisableSubmit = previewData
    ? !(enableSubmit || !getDirtyState(defaultValues ?? {}, watch()))
    : !allFieldsFilled;

  const handleFormSubmit = async (formData: IUserFormData) => {
    startTransition(async () => {
      onSubmit(formData);
    });

    onCancel();
  };

  return (
    <form
      className="p-[0_30px_0] w-full"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="m-[30px_0] w-full flex justify-between items-center">
        <Controller
          control={control}
          name="avatar"
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
          }}
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <AvatarUpload
              value={value ?? ''}
              error={error?.message}
              onChange={(e) => {
                onChange(e);

                // Clear error message on change
                clearErrorOnChange(name, errors, clearErrors);
              }}
              onFileChange={onAvatarChange}
            />
          )}
        />

        <div className="flex gap-[0_15px]">
          <Button
            className="min-w-[93px] !bg-white font-normal dark:!bg-white text-center !text-blue-500 dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] !rounded-[10px] font-DM-Sans text-[15px] font-normal leading-normal"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={isPending}
            color="primary"
            isDisabled={isDisableSubmit}
            className="text-[15px] font-medium md:w-auto py-[10px] px-[25px] w-full mt-10 md:mt-0"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[30px]">
        <Controller
          name="username"
          control={control}
          render={({ field: { value } }) => (
            <Input isDisabled label="User Name" value={value} />
          )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field: { value } }) => (
            <Input isDisabled label="Role" value={value} />
          )}
        />

        <Controller
          name="fullName"
          control={control}
          render={({
            field: { onChange, name, ...rest },
            fieldState: { error },
          }) => (
            <Input
              classNames={{
                inputWrapper: 'bg-gray-200/30',
              }}
              label="Full Name"
              type="text"
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

        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, name, ...rest },
            fieldState: { error },
          }) => (
            <Input
              classNames={{
                inputWrapper: 'bg-gray-200/30',
              }}
              label="Email"
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
      </div>
    </form>
  );
};

export default memo(UserDetailForm);
