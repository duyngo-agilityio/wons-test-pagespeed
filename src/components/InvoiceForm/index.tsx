'use client';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES, INVOICE_STATUS } from '@/constants';

// Models
import { IInvoice, InvoiceStatus } from '@/models';

// Utils
import { clearErrorOnChange, isEnableSubmitButton } from '@/utils';

// Components
import {
  AddressInput,
  Autocomplete,
  Button,
  DatePicker,
  Input,
} from '@/components';

// Zod schema for validation
const invoiceSchema = z.object({
  id: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Id')),
  customer: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Name')),
  imageUrl: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Image')),
  status: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Status')),
  address: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Address')),
  date: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Date')),
  email: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Email'))
    .email(ERROR_MESSAGES.FIELD_INVALID('Email')),
});

const REQUIRED_FIELDS = [
  'id',
  'date',
  'customer',
  'email',
  'address',
  'status',
];

interface InvoiceFormProps {
  onSubmit: (data: Partial<IInvoice>) => void;
}

const InvoiceForm = ({ onSubmit }: InvoiceFormProps) => {
  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<Partial<IInvoice>>({
    resolver: zodResolver(invoiceSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      id: '',
      date: '',
      customer: '',
      email: '',
      address: '',
      status: InvoiceStatus.PENDING,
    },
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );
  const isDisableSubmit = !enableSubmit;

  const handleAddInvoice = (formData: Partial<IInvoice>) => {
    onSubmit(formData);
  };

  return (
    <form
      className=" w-full max-w-[700px] justify-center"
      onSubmit={handleSubmit(handleAddInvoice)}
    >
      <div className="flex justify-center mt-[21px]">
        {/** TODO: Update when UpdateLoadImage component ready */}
        <Avatar className="w-[134px] h-[134px]" />
      </div>

      <div className="flex gap-[30px] mt-[30px]">
        {/* Invoice Id s*/}
        <Controller
          name="id"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              label="Invoice Id"
              classNames={{ base: 'h-[74px]' }}
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

        {/* Date */}
        <Controller
          name="date"
          control={control}
          render={() => <DatePicker label="Date" className="mt-1" />}
        />
      </div>

      <div className="flex gap-[30px]">
        {/* Customer */}
        <Controller
          name="customer"
          control={control}
          render={({ field: { ...rest }, fieldState: { error } }) => (
            <Autocomplete
              isInvalid={!!error}
              errorMessage={error?.message}
              label="Name"
              options={[]}
              {...rest}
            />
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          render={({ field: { ...rest }, fieldState: { error } }) => (
            <Autocomplete
              isInvalid={!!error}
              errorMessage={error?.message}
              label="Status"
              options={INVOICE_STATUS}
              {...rest}
            />
          )}
        />
      </div>

      <div className="flex gap-[30px] mt-[30px]">
        {/*Email*/}
        <Controller
          name="email"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              className="flex-1"
              label="Email"
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

        {/* Address */}
        <Controller
          name="address"
          control={control}
          render={({ field: { ...rest }, fieldState: { error } }) => (
            <AddressInput
              isInvalid={!!error}
              errorMessage={error?.message}
              className="flex-1"
              label="Address"
              {...rest}
            />
          )}
        />
      </div>

      <div className="flex gap-[30px]">
        <Button
          type="submit"
          size="lg"
          color="secondary"
          className="w-full mt-10"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isDisabled={isDisableSubmit}
          size="lg"
          color="primary"
          className="w-full mt-10"
        >
          Create Invoice
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
