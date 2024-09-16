'use client';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from 'react-hook-form';

// icons
import { IoCamera } from 'react-icons/io5';

import { Input } from '@/components';

import { Image } from '@nextui-org/react';

// constants
import { ERROR_MESSAGES, MAX_SIZE, REGEX } from '@/constants';

// utils
import { clearErrorOnChange } from '@/utils';

// models
import { ICustomer, TInvoice } from '@/models';

export type TUpdateProfileProps = {
  control: Control<Partial<ICustomer | TInvoice>>;
  errors: FieldErrors<Partial<ICustomer | TInvoice>>;
  clearErrors: UseFormClearErrors<Partial<ICustomer | TInvoice>>;
  onFileChange: (file: File) => void;
};

const AvatarUpload = ({
  control,
  errors,
  clearErrors,
  onFileChange,
}: TUpdateProfileProps) => {
  const [previewURL, setPreviewURL] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = (e.target.files && e.target.files[0]) as File;

      if (!file) {
        return;
      }

      if (!REGEX.IMG.test(file.name)) {
        const error = ERROR_MESSAGES.UPLOAD_IMAGE;
        setErrorMessage(error);
        return;
      }

      if (file.size > MAX_SIZE) {
        const error = ERROR_MESSAGES.UPLOAD_IMAGE_SIZE;
        setErrorMessage(error);
        return;
      }

      setErrorMessage('');

      if (previewURL) {
        URL.revokeObjectURL(previewURL);
        setPreviewURL('');
      }

      const previewImage = URL.createObjectURL(file);
      setPreviewURL(previewImage);
      onFileChange(file);
    },
    [onFileChange, previewURL],
  );

  return (
    <Controller
      control={control}
      name="avatar"
      render={({ field: { name, value, onChange, ...rest } }) => (
        <div className="flex flex-col justify-center items-center my-20">
          <label
            htmlFor="file"
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            <div className="rounded-full w-32 h-32 bg-gray-50 dark:bg-gray-600 flex justify-center items-center">
              {previewURL || value ? (
                <Image
                  src={previewURL || value}
                  alt="Avatar"
                  width={128}
                  height={128}
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
              handleChangeFile(e);
              onChange(e);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />

          {errorMessage && (
            <p className="text-red-500 text-md mt-2">{errorMessage}</p>
          )}
        </div>
      )}
    />
  );
};

export default AvatarUpload;
