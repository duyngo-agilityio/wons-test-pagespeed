'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';

// Constants
import {
  ERROR_MESSAGES,
  INVOICE_STATUS,
  MESSAGE_STATUS,
  ROUTES,
  SUCCESS_MESSAGES,
} from '@/constants';

// Models
import { ICustomer, IProduct, TInvoice } from '@/models';

// Utils
import {
  clearErrorOnChange,
  convertToCalendarDate,
  currentDate,
  formatDateByISO,
  formatDateString,
  isEnableSubmitButton,
} from '@/utils';

// Types
import { TInvoiceFormData, TInvoiceProductTable } from '@/types';

// Components
import {
  AddressInput,
  Autocomplete,
  AvatarUpload,
  Button,
  DatePicker,
  Input,
  InvoiceProductTable,
} from '@/components';

// api
import { uploadImage } from '@/api/image';

// Hooks
import { useToast } from '@/hooks';

// Zod schema for validation
const invoiceSchema = z.object({
  invoiceId: z.string(),
  customer: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Name')),
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
  invoiceId: string;
  onSubmit: (
    data: Partial<TInvoice>,
    products: number[],
  ) => Promise<{
    error?: string;
    success?: boolean;
  }>;
  products: (IProduct & { id: number })[];
  customers: (ICustomer & { id: number })[];
  previewData?: TInvoice | null;
  previewInvoiceProducts?: TInvoiceProductTable[];
}

const InvoiceForm = ({
  invoiceId,
  products,
  customers,
  previewData = null,
  previewInvoiceProducts,
  onSubmit,
}: InvoiceFormProps) => {
  const [productsValues, setProductsValues] = useState<TInvoiceProductTable[]>(
    previewInvoiceProducts ?? [],
  );
  const [errorProducts, setErrorProducts] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File>();
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<TInvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: previewData || {
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

  const handleAddInvoice = async (formData: TInvoiceFormData) => {
    const hasEmptyField = productsValues.some((obj) =>
      Object.values(obj).some((value) => value === ''),
    );

    if (productsValues.length === 0 || hasEmptyField) {
      return setErrorProducts(ERROR_MESSAGES.FIELD_REQUIRED('Product'));
    }

    if (isAvatarDirty && avatarFile) {
      try {
        const formDataImage = new FormData();
        formDataImage.append('image', avatarFile);

        const imageUrl = await uploadImage(formDataImage);

        if (typeof imageUrl === 'string') {
          formData.imageUrl = imageUrl;

          const { date } = formData;

          const dateString = formatDateString(date);
          const formattedDate = formatDateByISO(dateString);

          const invoiceProduct = productsValues.map(
            ({ product }) => product.data.id,
          );

          startTransition(async () => {
            const { error } = await onSubmit(
              {
                ...formData,
                invoiceId,
                date: formattedDate,
              },
              invoiceProduct,
            );

            if (error) {
              return showToast({
                description: error,
                status: MESSAGE_STATUS.ERROR,
              });
            }

            return showToast({
              description: SUCCESS_MESSAGES.CREATE_INVOICE,
              status: MESSAGE_STATUS.SUCCESS,
            });
          });
        } else {
          return setErrorProducts(imageUrl.error);
        }
      } catch (error) {
        return setErrorProducts(error as string);
      }
    } else {
      if (!formData.imageUrl) {
        return setErrorProducts(ERROR_MESSAGES.FIELD_REQUIRED('Image'));
      }
    }
  };

  const handleAvatarChange = useCallback((avatarFile: File) => {
    setAvatarFile(avatarFile);
    setIsAvatarDirty(true);
  }, []);

  return (
    <form
      className=" w-full max-w-[700px] justify-center"
      onSubmit={handleSubmit(handleAddInvoice)}
    >
      <div className="flex justify-center mt-[21px]">
        <Controller
          control={control}
          name="imageUrl"
          render={({ field: { onChange, value, name } }) => {
            return (
              <AvatarUpload
                value={value}
                onChange={(e) => {
                  onChange(e);
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                onFileChange={handleAvatarChange}
              />
            );
          }}
        />
      </div>

      <div className="flex gap-[30px] mt-[30px]">
        {/* Invoice Id*/}
        <Controller
          name="invoiceId"
          control={control}
          render={() => (
            <Input
              isDisabled
              label="Invoice Id"
              classNames={{ base: 'h-[74px]' }}
              value={`#${invoiceId}`}
            />
          )}
        />

        {/* Date */}
        <Controller
          name="date"
          control={control}
          render={({
            field: { onChange, name, value },
            fieldState: { error },
          }) => (
            <DatePicker
              value={convertToCalendarDate(value as unknown as string)}
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
            field: { onChange, value, name, ...rest },
            fieldState: { error },
          }) => (
            <Autocomplete
              defaultSelectedKey={value}
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
            field: { onChange, value, name, ...rest },
            fieldState: { error },
          }) => (
            <Autocomplete
              defaultSelectedKey={value}
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
          <Link href={ROUTES.INVOICE}>Cancel</Link>
        </Button>
        <Button
          type="submit"
          isDisabled={isDisableSubmit}
          isLoading={isPending}
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
