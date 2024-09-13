'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

// Utils
import { clearErrorOnChange, isEnableSubmitButton } from '@/utils';

// Components
import { Button, Heading, Input } from '@/components';
import { ICustomer } from '@/models';
import UpdateImage from '../AvatarUpload';

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
});

const REQUIRED_FIELDS = ['firstName', 'lastName', 'phone', 'email', 'gender'];
const genders = [
  { key: 'male', label: 'Male' },
  { key: 'female', label: 'Female' },
];

export interface ICustomerFormProps {
  isPending?: boolean;
  onSubmit: (data: ICustomer) => void;
}

const CustomerForm = ({ isPending = false, onSubmit }: ICustomerFormProps) => {
  const {
    control,
    formState: { dirtyFields, errors, isSubmitting },
    clearErrors,
    handleSubmit,
  } = useForm<ICustomer>({
    resolver: zodResolver(customerFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: undefined,
    },
  });

  const dirtyItems = Object.keys(dirtyFields);
  const isEnableSubmit = isEnableSubmitButton(
    REQUIRED_FIELDS,
    dirtyItems,
    errors,
  );

  const handleAddCustomer = (formData: ICustomer) => {
    return onSubmit(formData);
  };

  return (
    <form
      className="w-full max-w-2xl mx-auto"
      onSubmit={handleSubmit(handleAddCustomer)}
    >
      <Heading title="Add Customer" />

      <UpdateImage
        control={control}
        errors={errors}
        clearErrors={clearErrors}
      />

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
            type="text"
            isInvalid={!!error}
            errorMessage={error?.message}
            onChange={(e) => {
              onChange(e.target.value);

              clearErrorOnChange(name, errors, clearErrors);
            }}
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
        isLoading={isSubmitting}
        isDisabled={!isEnableSubmit || isPending || isSubmitting}
        size="lg"
        color="primary"
        className="w-full mt-8 text-xl font-medium cursor-pointer"
      >
        Add Customer
      </Button>
    </form>
  );
};

export default CustomerForm;
