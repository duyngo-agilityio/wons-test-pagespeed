'use client';
import { memo } from 'react';

// Libraries
import { Controller, useForm } from 'react-hook-form';
import isEqual from 'react-fast-compare';

// Utils
import { clearErrorOnChange } from '@/utils';

// Components
import { Input, AvatarUpload, Button } from '@/components';

// Constants
import { ERROR_MESSAGES } from '@/constants';

interface ProfileInfo {
  avatar: string;
  userName: string;
  role: string;
  fullName: string;
  email: string;
}

interface UserDetailFormProps {
  onCancel: () => void;
}

const UserDetailForm = ({ onCancel }: UserDetailFormProps) => {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useForm<ProfileInfo>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      avatar: '',
      userName: '',
      role: '',
      fullName: '',
      email: '',
    },
  });

  const handleFormSubmit = () => {
    return;
  };

  return (
    <form>
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
            value={value}
            error={error?.message}
            onChange={(e) => {
              onChange(e);

              // Clear error message on change
              clearErrorOnChange(name, errors, clearErrors);
            }}
            onFileChange={() => {}}
          />
        )}
      />

      <div className="w-[500px] flex flex-col gap-[20px_0]">
        <Controller
          name="userName"
          control={control}
          render={() => (
            <Input
              isDisabled
              label="User Name"
              classNames={{ base: 'h-[74px]' }}
              value={`Example Name`}
            />
          )}
        />

        <Controller
          name="role"
          control={control}
          render={() => (
            <Input
              isDisabled
              label="Role"
              classNames={{ base: 'h-[74px]' }}
              value={`Example Role`}
            />
          )}
        />

        <Controller
          name="fullName"
          control={control}
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
          }}
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
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
          }}
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

        <div className="self-end flex gap-[0_15px]">
          <Button
            className="min-w-[93px] !bg-white font-normal dark:!bg-white text-center !text-blue-500 dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] !rounded-[10px] font-DM-Sans text-[15px] font-normal leading-normal"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            color="primary"
            className="text-[15px] font-medium md:w-auto py-[10px] px-[25px] w-full mt-10 md:mt-0"
            onClick={handleFormSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default memo(UserDetailForm, isEqual);
