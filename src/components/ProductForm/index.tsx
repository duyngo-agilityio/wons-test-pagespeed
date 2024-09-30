'use client';

import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { Select, SelectItem, Textarea } from '@nextui-org/react';
import { Controller, useForm, UseFormReset } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { BRANDS, ERROR_MESSAGES, REGEX } from '@/constants';

// Utils
import {
  clearErrorOnChange,
  formatPriceTyping,
  getDirtyState,
  isEnableSubmitButton,
} from '@/utils';

// Components
import {
  Button,
  Heading,
  Input,
  AvatarUpload,
  Checkbox,
  Text,
} from '@/components';

// Models
import { IProductDetail } from '@/models';

// icons
import { GrPrevious } from 'react-icons/gr';

// Zod schema for validation
const productFormSchema = z.object({
  title: z.string().nonempty(ERROR_MESSAGES.FIELD_REQUIRED),
  brand: z.enum(['apple', 'samsung', 'huawei', 'xioami', 'oppo', 'google'], {
    errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED }),
  }),
  imageUrl: z.string().nonempty({
    message: ERROR_MESSAGES.FIELD_REQUIRED,
  }),
  price: z.preprocess(
    (value) => {
      if (typeof value === 'string') {
        const numericValue = value.replace(REGEX.PRICE_PRODUCT, '');
        return parseFloat(numericValue);
      }
      return value;
    },
    z
      .number({ invalid_type_error: ERROR_MESSAGES.FIELD_INVALID('Price') })
      .min(0, ERROR_MESSAGES.FIELD_INVALID('Price'))
      .refine((val) => String(Math.floor(val)).length <= 9, {
        message: ERROR_MESSAGES.FIELD_INVALID('Price cannot exceed 7 digits'),
      }),
  ),
  description: z
    .string()
    .nonempty(ERROR_MESSAGES.FIELD_REQUIRED)
    .max(10000, ERROR_MESSAGES.FIELD_INVALID('Description')),
  negotiable: z.boolean(),
});

const REQUIRED_FIELDS = ['title', 'brand', 'imageUrl', 'description', 'price'];

export interface IProductFormProps {
  isDisabledField?: boolean;
  onAvatarChange: (file: File) => void;
  onSubmit: (data: IProductDetail) => void;
  setReset: (reset: UseFormReset<Partial<IProductDetail>>) => void;
  previewData?: IProductDetail | null;
  onCloseDrawer?: () => void;
}

const ProductForm = ({
  isDisabledField = false,
  onAvatarChange,
  onSubmit,
  setReset,
  previewData = null,
  onCloseDrawer,
}: IProductFormProps) => {
  const {
    control,
    formState: { dirtyFields, errors, defaultValues },
    clearErrors,
    handleSubmit,
    reset,
    watch,
    setError,
  } = useForm<Partial<IProductDetail>>({
    resolver: zodResolver(productFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: previewData || {
      title: '',
      brand: '',
      imageUrl: '',
      price: 0,
      description: '',
      negotiable: false,
    },
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (setReset) {
      setReset(reset);
    }
  }, [setReset, reset]);

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const isDisableSubmit = !(
    enableSubmit || !getDirtyState(defaultValues ?? {}, watch())
  );

  const saveData = useCallback(
    async (formData: Partial<IProductDetail>) => {
      if (!formData.imageUrl) {
        setError('imageUrl', {
          type: 'manual',
          message: ERROR_MESSAGES.FIELD_REQUIRED,
        });
        return;
      }

      startTransition(async () => {
        await onSubmit(formData as IProductDetail);
        reset();
      });
    },
    [onSubmit, reset, setError],
  );

  return (
    <form
      className="w-full max-w-2xl mx-auto mt-20"
      onSubmit={handleSubmit(saveData)}
    >
      <div className="flex items-center gap-5">
        <Button
          onClick={onCloseDrawer}
          className="!bg-transparent dark:!bg-transparent text-gray-200 dark:text-gray-300 hover:!bg-transparent dark:hover:!bg-transparent"
        >
          <GrPrevious size={20} />
        </Button>
        <Heading
          title={previewData ? 'Update Product' : 'Add a New Product'}
          className="text-center"
        />
      </div>

      <div className="flex justify-center mt-[21px]">
        <Controller
          control={control}
          name="imageUrl"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <AvatarUpload
              value={value ?? ''}
              error={error?.message}
              onChange={(e) => {
                onChange(e);
                clearErrors(name);
              }}
              onFileChange={onAvatarChange}
            />
          )}
        />
      </div>

      <Controller
        name="title"
        control={control}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            label="Product Name"
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

      <Controller
        name="brand"
        control={control}
        render={({
          field: { name, onChange, value, ...rest },
          fieldState: { error },
        }) => (
          <div className="flex flex-col w-full h-[71px] mb-5">
            <Select
              name={name}
              id="brand"
              defaultSelectedKeys={[value as string]}
              labelPlacement="outside"
              placeholder=" "
              label="Brand"
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
              {BRANDS.map((brand) => (
                <SelectItem key={brand.key} value={brand.key}>
                  {brand.label}
                </SelectItem>
              ))}
            </Select>

            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        )}
      />

      <div className="grid grid-cols-10 gap-4 pt-12">
        <div className="col-span-5">
          <Controller
            name="price"
            control={control}
            render={({
              field: { name, onChange, value, ...rest },
              fieldState: { error },
            }) => {
              const formattedValue = formatPriceTyping(
                value ? String(value) : '',
              );

              return (
                <Input
                  label="Price"
                  value={formattedValue}
                  classNames={{ base: 'h-[71px]' }}
                  isInvalid={!!error}
                  errorMessage={error?.message}
                  isDisabled={isDisabledField}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\$|,/g, '');
                    onChange(rawValue);
                    clearErrorOnChange(name, errors, clearErrors);
                  }}
                  {...rest}
                />
              );
            }}
          />
        </div>

        {/* Negotiable Checkbox */}
        <div className="col-span-5 flex items-center ml-4">
          <Controller
            name="negotiable"
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <Checkbox
                  aria-label="Negotiable"
                  value={value ? 'true' : 'false'}
                  onChange={onChange}
                  {...rest}
                  size="lg"
                />
                <Text
                  text="Negotiable"
                  className="ml-2 color-blue.900 !text-[14.22px] leading-[18.51px] font-normal"
                />
              </>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col pt-8">
        <label className="text-xl font-medium pb-2">Descriptions</label>
        <Controller
          name="description"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Textarea
              classNames={{
                input: '!text-blue-800/70 dark:!text-white/70',
                inputWrapper: [
                  'bg-gray-50 dark:bg-gray-600',
                  'hover:!bg-gray-200/50 dark:hover:!bg-gray-900',
                  'focus-within:!bg-gray-50 dark:focus-within:bg-gray-600',
                  'group-data-[focus=true]:!bg-gray-50 dark:group-data-[focus=true]:!bg-gray-600',
                ],
              }}
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
      </div>

      <Button
        type="submit"
        isLoading={isPending}
        isDisabled={isDisableSubmit || isPending}
        size="lg"
        color="primary"
        className="w-full mt-8 text-xl font-medium cursor-pointer"
      >
        Save Product
      </Button>
    </form>
  );
};

export default ProductForm;
