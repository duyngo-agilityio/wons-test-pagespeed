'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import isEqual from 'react-fast-compare';
import { useRouter } from 'next/navigation';

// Constants
import {
  ERROR_MESSAGES,
  INVOICE_STATUS,
  MESSAGE_STATUS,
  ROUTES,
  SUCCESS_MESSAGES,
} from '@/constants';

// Models
import { ICustomer, IProduct, TInvoice, TInvoiceProduct } from '@/models';

// Utils
import {
  clearErrorOnChange,
  convertToCalendarDate,
  currentDate,
  formatDatePicker,
  getDirtyState,
  isEnableSubmitButton,
} from '@/utils';

// Types
import {
  StrapiModel,
  TInvoiceDetail,
  TInvoiceFormData,
  TInvoiceProductTable,
} from '@/types';

// Components
import {
  AddressInput,
  Autocomplete,
  AvatarUpload,
  Button,
  DatePicker,
  Input,
  InvoiceProductTable,
  LoadingIndicator,
} from '@/components';

// api
import { uploadImage } from '@/api/image';

// Hooks
import { useToast } from '@/hooks';
import {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from '@internationalized/date';

// Zod schema for validation
const invoiceSchema = z.object({
  invoiceId: z.string(),
  customerId: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Name')),
  status: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Status')),
  address: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Address')),
  date: z.any(),
  email: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Email'))
    .email(ERROR_MESSAGES.FIELD_INVALID('Email')),
  imageUrl: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED('Image')),
});

const REQUIRED_FIELDS = ['date', 'customerId', 'email', 'address', 'status'];

interface InvoiceFormProps {
  invoiceId: string;
  onSubmit: (
    data: Partial<TInvoice>,
    products: TInvoiceProduct<IProduct & { id: number }>[],
  ) => Promise<{
    error?: string;
    data?: StrapiModel<TInvoiceDetail>;
  }>;
  isEdit?: boolean;
  products: (IProduct & { id: number })[];
  customers: (ICustomer & { id: number })[];
  previewData?: (TInvoice & { id: number }) | null;
  previewInvoiceProducts?: TInvoiceProductTable[];
}

const InvoiceForm = ({
  invoiceId,
  products,
  customers,
  isEdit = false,
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
  const router = useRouter();

  const {
    control,
    formState: { dirtyFields, errors, defaultValues },
    watch,
    clearErrors,
    handleSubmit,
  } = useForm<TInvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: previewData || {
      imageUrl: '',
      invoiceId: '',
      date: '',
      customerId: undefined,
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

  const isDisableSubmit = !(
    enableSubmit ||
    !getDirtyState(defaultValues ?? {}, watch()) ||
    (!isEqual(previewInvoiceProducts, productsValues) && isEdit)
  );

  const handleSubmitButton = async (formData: TInvoiceFormData) => {
    const hasEmptyField = productsValues.some((obj) =>
      Object.values(obj).some((value) => value === ''),
    );

    if (productsValues.length === 0 || hasEmptyField) {
      return setErrorProducts(ERROR_MESSAGES.FIELD_REQUIRED('Product'));
    }

    if (isAvatarDirty && avatarFile) {
      try {
        const imageUrl = await uploadImage(avatarFile);

        if (imageUrl?.downloadURL) {
          formData.imageUrl = imageUrl.downloadURL;
        } else {
          return { error: imageUrl.error };
        }
      } catch (error) {
        return setErrorProducts(error as string);
      }
    } else {
      if (!formData.imageUrl) {
        return setErrorProducts(ERROR_MESSAGES.FIELD_REQUIRED('Image'));
      }
    }

    startTransition(async () => {
      const { error, data } = await onSubmit(
        {
          ...formData,
          customerId: formData.customerId.toString(),
          invoiceId,
        },
        productsValues,
      );

      if (error) {
        return showToast({
          description: error,
          status: MESSAGE_STATUS.ERROR,
        });
      }

      data && router.push(`${ROUTES.INVOICE}/${data.id}`);

      return showToast({
        description: previewData
          ? SUCCESS_MESSAGES.UPDATE_INVOICE
          : SUCCESS_MESSAGES.CREATE_INVOICE,
        status: MESSAGE_STATUS.SUCCESS,
      });
    });
  };

  const handleAvatarChange = useCallback((avatarFile: File) => {
    setAvatarFile(avatarFile);
    setIsAvatarDirty(true);
  }, []);

  return (
    <>
      {isPending && <LoadingIndicator />}
      <form
        className="w-full max-w-[700px] justify-center"
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        <div className="flex justify-center sm:mt-[21px]">
          <Controller
            control={control}
            name="imageUrl"
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
                onFileChange={handleAvatarChange}
              />
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-[30px] sm:mt-[30px]">
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
            }) => {
              const handleChange = (
                date: CalendarDate | CalendarDateTime | ZonedDateTime | null,
              ): void => {
                if (!date) {
                  return onChange?.('');
                }

                onChange?.(formatDatePicker(date));
              };

              return (
                <DatePicker
                  defaultValue={convertToCalendarDate(
                    value as unknown as string,
                  )}
                  onChange={(value) => {
                    handleChange(value);

                    // Clear error message on change
                    clearErrorOnChange(name, errors, clearErrors);
                  }}
                  minValue={currentDate}
                  label="Date"
                  isInvalid={!!error}
                  className="mt-1"
                  errorMessage={error?.message}
                />
              );
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row mt-8 sm:mt-0 gap-[30px]">
          {/* Customer */}
          <Controller
            name="customerId"
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

        <div className="flex flex-col sm:flex-row gap-[30px] mt-[30px]">
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
          <div className="mt-[30px] sm:mt-[17px]">
            <InvoiceProductTable
              products={products}
              productsValues={productsValues}
              errorProducts={errorProducts}
              setErrorProducts={setErrorProducts}
              setProductsValues={setProductsValues}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-[30px]">
          <Button
            as={Link}
            href={ROUTES.INVOICE}
            size="lg"
            color="secondary"
            className="w-full mt-10"
            aria-label="Cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isDisabled={isDisableSubmit}
            isLoading={isPending}
            size="lg"
            color="primary"
            className="w-full mt-[20px] sm:mt-10"
          >
            {isEdit ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default InvoiceForm;
