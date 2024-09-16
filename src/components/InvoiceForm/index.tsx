'use client';

import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES, INVOICE_STATUS } from '@/constants';

// Models
import { ICustomer, IProduct, TInvoice, TInvoiceProduct } from '@/models';

// Utils
import {
  clearErrorOnChange,
  currentDate,
  generateRandomID,
  isEnableSubmitButton,
} from '@/utils';

// Components
import {
  AddressInput,
  Autocomplete,
  Button,
  DatePicker,
  Input,
  InvoiceProductTable,
} from '@/components';

// Zod schema for validation
const invoiceSchema = z.object({
  customer: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Name')),
  // imageUrl: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Image')),
  status: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Status')),
  address: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Address')),
  date: z.any(),
  email: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Email'))
    .email(ERROR_MESSAGES.FIELD_INVALID('Email')),
});

const REQUIRED_FIELDS = ['date', 'customer', 'email', 'address', 'status'];

interface InvoiceFormProps {
  onSubmit: (data: Partial<TInvoice>) => void;
  products: (IProduct & { id: number })[];
  customers: (ICustomer & { id: number })[];
}

const InvoiceForm = ({ products, customers, onSubmit }: InvoiceFormProps) => {
  const [productsValues, setProductsValues] = useState<
    TInvoiceProduct<IProduct & { id: number }>[]
  >([]);
  const [errorProducts, setErrorProducts] = useState<string>('');

  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<Partial<TInvoice>>({
    resolver: zodResolver(invoiceSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      invoiceId: '',
      date: '',
      customer: '',
      email: '',
      address: '',
      status: undefined,
    },
  });

  const optionsCustomers = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.lastName,
  }));

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );
  const isDisableSubmit = !enableSubmit;

  const handleAddInvoice = (formData: Partial<TInvoice>) => {
    const hasEmptyField = productsValues.some((obj) =>
      Object.values(obj).some((value) => value === ''),
    );

    if (productsValues.length === 0 || hasEmptyField) {
      return setErrorProducts(ERROR_MESSAGES.FIELD_REQUIRED('Product'));
    }

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
          name="invoiceId"
          control={control}
          render={() => (
            <Input
              isDisabled
              label="Invoice Id"
              classNames={{ base: 'h-[74px]' }}
              value={`#${generateRandomID()}`}
            />
          )}
        />

        {/* Date */}
        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, name }, fieldState: { error } }) => (
            <DatePicker
              onChange={(value) => {
                onChange(value);

                // Clear error message on change
                clearErrorOnChange(name, errors, clearErrors);
              }}
              minValue={currentDate}
              label="Date"
              isInvalid={!!error}
              className="mt-1"
              errorMessage={error?.message}
            />
          )}
        />
      </div>

      <div className="flex gap-[30px]">
        {/* Customer */}
        <Controller
          name="customer"
          control={control}
          render={({
            field: { onChange, name, ...rest },
            fieldState: { error },
          }) => (
            <Autocomplete
              isInvalid={!!error}
              errorMessage={error?.message}
              onSelectionChange={(key) => {
                onChange(key);

                // Clear error message on change
                clearErrorOnChange(name, errors, clearErrors);
              }}
              label="Name"
              options={optionsCustomers}
              {...rest}
            />
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          render={({
            field: { onChange, name, ...rest },
            fieldState: { error },
          }) => (
            <Autocomplete
              isInvalid={!!error}
              errorMessage={error?.message}
              label="Status"
              onSelectionChange={(key) => {
                onChange(key);

                // Clear error message on change
                clearErrorOnChange(name, errors, clearErrors);
              }}
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
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <AddressInput
              isInvalid={!!error}
              errorMessage={error?.message}
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
      </div>

      <div>
        <div className="mt-[17px]">
          <InvoiceProductTable
            products={products}
            productsValues={productsValues}
            errorProducts={errorProducts}
            setErrorProducts={setErrorProducts}
            setProductsValues={setProductsValues}
          />
        </div>
      </div>

      <div className="flex gap-[30px]">
        <Button size="lg" color="secondary" className="w-full mt-10">
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