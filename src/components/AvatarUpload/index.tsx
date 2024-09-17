'use client';

import { ChangeEvent, useCallback, useState } from 'react';

// icons
import { IoCamera } from 'react-icons/io5';

import { Input } from '@/components';

import { Image } from '@nextui-org/react';

// constants
import { ERROR_MESSAGES, MAX_SIZE, REGEX } from '@/constants';

export type TUpdateProfileProps = {
  onFileChange: (file: File) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
};

const AvatarUpload = ({
  value,
  onChange,
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

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeFile(e);
    onChange(e);
  };

  return (
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
              className="text-blue-800/70 dark:text-white/70"
            />
          )}
        </div>
      </label>

      <Input
        type="file"
        id="file"
        className="hidden"
        accept="image/*"
        onChange={handleOnchange}
      />

      {errorMessage && (
        <p className="text-red-500 text-md mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default AvatarUpload;
