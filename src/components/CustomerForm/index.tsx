'use client';

import { useCallback, useMemo } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Controller, useForm, UseFormReset } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

// Utils
import {
  clearErrorOnChange,
  formatPhoneNumber,
  isEnableSubmitButton,
} from '@/utils';

// Components
import {
  Button,
  Heading,
  Input,
  AvatarUpload,
  AddressInput,
} from '@/components';

// Models
import { ICustomer } from '@/models';

// Zod schema for validation
const customerFormSchema = z.object({
  firstName: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('First Name')),
  lastName: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Last Name')),
  email: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Email Address'))
    .email(ERROR_MESSAGES.FIELD_INVALID('Email Address')),
  phone: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Phone Number'))
    .regex(REGEX.PHONE, ERROR_MESSAGES.INVALID_PHONE),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED('Gender') }),
  }),
  avatar: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Avatar')),
  address: z.string().optional(),
  job: z.string().optional(),
});

const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'phone',
  'email',
  'gender',
  'avatar',
];
const genders = [
  { key: 'male', label: 'Male' },
  { key: 'female', label: 'Female' },
];

export interface ICustomerFormProps {
  isDisabledField?: boolean;
  isEdit?: boolean;
  onAvatarChange: (file: File) => void;
  onSubmit: (data: ICustomer) => void;
  setReset: (reset: UseFormReset<Partial<ICustomer>>) => void;
  previewData?: ICustomer | null;
}

const CustomerForm = ({
  isDisabledField,
  isEdit,
  onAvatarChange,
  onSubmit,
  setReset,
  previewData,
}: ICustomerFormProps) => {
  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
    reset,
  } = useForm<Partial<ICustomer>>({
    resolver: zodResolver(customerFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: previewData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      job: '',
      gender: undefined,
      avatar: '',
    },
  });

  setReset(reset);

  const dirtyItems = Object.keys(dirtyFields);
  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );
  const isDisableSubmit = !enableSubmit;

  const handleAddCustomer = useCallback(
    async (formData: Partial<ICustomer>) => {
      onSubmit(formData as ICustomer);
      reset();
    },
    [onSubmit, reset],
  );

  return (
    <form
      className="w-full max-w-2xl mx-auto"
      onSubmit={handleSubmit(handleAddCustomer)}
    >
      <Heading title={isEdit ? 'Update Customer' : 'Add Customer'} />

      <div className="flex justify-center mt-[21px]">
        <Controller
          control={control}
          name="avatar"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <AvatarUpload
              value={value ?? ''}
              error={error?.message}
              onChange={(e) => {
                onChange(e);
                clearErrorOnChange(name, errors, clearErrors);
              }}
              onFileChange={onAvatarChange}
            />
          )}
        />
      </div>

      <Controller
        name="firstName"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="First Name"
            classNames={{ base: 'h-[71px]' }}
            isInvalid={!!error}
            errorMessage={error?.message}
            isDisabled={isDisabledField}
            onChange={(e) => {
              onChange(e.target.value);

              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      {/* Username */}
      <Controller
        name="lastName"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Last Name"
            classNames={{ base: 'h-[71px]' }}
            isInvalid={!!error}
            errorMessage={error?.message}
            isDisabled={isDisabledField}
            onChange={(e) => {
              onChange(e.target.value);

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
            isDisabled={isDisabledField}
            onChange={(e) => {
              onChange(e.target.value);

              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      {/* Password */}
      <Controller
        name="phone"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Phone Number"
            className="mb-12"
            type="text"
            isInvalid={!!error}
            errorMessage={error?.message}
            isDisabled={isDisabledField}
            onChange={(e) => {
              onChange(formatPhoneNumber(e.target.value));

              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      <Controller
        name="job"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Job"
            className="mb-12"
            isInvalid={!!error}
            errorMessage={error?.message}
            isDisabled={isDisabledField}
            onChange={(e) => {
              onChange(e.target.value);

              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <AddressInput
            isInvalid={!!error}
            errorMessage={error?.message}
            isDisabled={isDisabledField}
            className="flex-1"
            onChange={(e) => {
              onChange(e.target.value);

              // Clear error message on change
              clearErrorOnChange(name, errors, clearErrors);
            }}
            label="Address"
            {...rest}
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        render={({
          field: { name, onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col w-full h-[71px] mb-5">
            <Select
              name={name}
              id="gender"
              value={value || undefined}
              labelPlacement="outside"
              placeholder=" "
              label="Gender"
              className={`w-full ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
              classNames={{
                trigger: `w-full ${
                  error
                    ? 'bg-danger-50 hover:!bg-danger-200/50 focus:!bg-danger-200/50 dark:hover:!bg-gray-600'
                    : 'bg-gray-50 dark:bg-gray-600 hover:!bg-gray-200/50 dark:hover:!bg-gray-900 focus:bg-gray-50 dark:focus:bg-gray-600'
                } py-[26px] mt-5`,
                label: 'text-xl font-medium pb-1',
              }}
              isDisabled={isDisabledField}
              onChange={(e) => {
                onChange(e.target.value);
                clearErrorOnChange(name, errors, clearErrors);
              }}
              {...rest}
            >
              {genders.map((gender) => (
                <SelectItem key={gender.key} value={gender.key}>
                  {gender.label}
                </SelectItem>
              ))}
            </Select>

            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        )}
      />

      <Button
        type="submit"
        isLoading={isDisabledField}
        isDisabled={isDisableSubmit}
        size="lg"
        color="primary"
        className="w-full mt-8 text-xl font-medium cursor-pointer"
      >
        {isEdit ? 'Update Customer' : 'Add Customer'}
      </Button>
    </form>
  );
};

export default CustomerForm;
