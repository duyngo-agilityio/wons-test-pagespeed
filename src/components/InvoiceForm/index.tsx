'use client';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES, INVOICE_STATUS } from '@/constants';

// Models
import { IInvoice } from '@/models';

// Utils
import { isEnableSubmitButton } from '@/utils';

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
  id: z.string(),
  customer: z.string(),
  avatar: z.string(),
  status: z.string(),
  address: z.string(),
  date: z.string(),
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
        <Avatar className="w-[134px] h-[134px]" />
      </div>

      <div className="flex gap-[30px] mt-[30px]">
        {/*Email*/}
        <Controller
          name="id"
          control={control}
          render={() => (
            <Input label="Invoice Id" classNames={{ base: 'h-[74px]' }} />
          )}
        />

        <Controller
          name="date"
          control={control}
          render={() => <DatePicker label="Date" className="mt-1" />}
        />
      </div>

      <div className="flex gap-[30px]">
        <Controller
          name="customer"
          control={control}
          render={() => <Autocomplete label="Name" options={[]} />}
        />

        <Controller
          name="status"
          control={control}
          render={() => (
            <Autocomplete label="Status" options={INVOICE_STATUS} />
          )}
        />
      </div>

      <div className="flex gap-[30px] mt-[30px]">
        {/*Email*/}
        <Controller
          name="email"
          control={control}
          render={() => (
            <Input
              className="flex-1"
              label="Email"
              classNames={{ base: 'h-[74px]' }}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={() => <AddressInput className="flex-1" label="Address" />}
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
