import { ICustomer } from '@/models';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from 'react-hook-form';

// icons
import { IoCamera } from 'react-icons/io5';

// components
import { ImageFallback, Input } from '@/components';

// constants
import { MAX_SIZE, REGEX } from '@/constants';

// utils
import { clearErrorOnChange } from '@/utils';

export type TUpdateProfileProps = {
  control: Control<ICustomer>;
  errors: FieldErrors<ICustomer>;
  clearErrors: UseFormClearErrors<ICustomer>;
  className?: string;
};

const AvatarUpload = ({
  control,
  errors,
  clearErrors,
}: TUpdateProfileProps) => {
  const [previewURL, setPreviewURL] = useState<string>('');

  const handleChangeFile = useCallback(
    (onChange: (value: string) => void) =>
      async (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files && e.target.files[0]) as File;

        // Check if file is undefined or empty
        if (!file) {
          return;
        }

        // Check if file type is valid
        if (!REGEX.IMG.test(file.name)) {
          return onChange('Invalid file type');
        }

        // Check if file size is valid
        if (file.size > MAX_SIZE) {
          return onChange('File size exceeds the limit');
        }

        try {
          const previewImage = URL.createObjectURL(file);
          setPreviewURL(previewImage);
          onChange(file.toString());
        } catch (error) {
          onChange('Error uploading the file');
        }
      },
    [],
  );

  return (
    <Controller
      control={control}
      name="avatar"
      render={({
        field: { name, value, onChange, ...rest },
        fieldState: { error },
      }) => (
        <div className="flex justify-center items-center my-20">
          <label
            htmlFor="file"
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            <div className="rounded-full w-32 h-32 bg-gray-50 dark:bg-gray-600 flex justify-center items-center">
              {previewURL || value ? (
                <ImageFallback
                  src={previewURL || value}
                  alt="Avatar"
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <IoCamera
                  size={32}
                  className="text-[#4b4b66] dark:text-blue-500"
                />
              )}
            </div>
          </label>

          <Input
            type="file"
            id="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              handleChangeFile(onChange)(e);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />

          {error && (
            <p className="text-red-500 text-xs mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default AvatarUpload;
