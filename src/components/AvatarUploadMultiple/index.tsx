'use client';

import { ChangeEvent, MouseEvent, memo, useCallback, useState } from 'react';

// Icons
import { IoCamera, IoClose } from 'react-icons/io5';

// Components
import { Input, Button, Text, ImageFallback } from '@/components';
import { ERROR_MESSAGES } from '@/constants';

export interface IAvatarUploadMultipleProps {
  previewFiles?: string[];
  onFileChange: (files: File[]) => void;
}

const AvatarUploadMultiple = ({
  previewFiles = [],
  onFileChange,
}: IAvatarUploadMultipleProps) => {
  // const [payload, setPayload] = useState<File[]>([]);
  const [files, setFiles] = useState<string[]>(previewFiles);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isUploadDisabled = files?.length >= 2;

  const uploadMultipleFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return [];

      const values = Array.from(event.target.files);

      if (values.length > 2) {
        setErrorMessage(ERROR_MESSAGES.MAX_IMAGE);

        return;
      }

      setErrorMessage('');

      const newFiles: string[] = values.map((value) =>
        URL.createObjectURL(value),
      );

      setFiles(newFiles);

      onFileChange(values);
    },
    [onFileChange],
  );

  const clickInput = useCallback((event: MouseEvent<HTMLInputElement>) => {
    (event.target as HTMLInputElement).value = '';
  }, []);

  const deleteFile = useCallback(
    (indexFile: number) => {
      const updatedFiles = files.filter((_, index) => index !== indexFile);

      setFiles(updatedFiles);
    },
    [files],
  );

  return (
    <div className="flex flex-col items-center mt-5">
      <label
        htmlFor="file"
        className={`flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-all p-11 ${
          isUploadDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'hover:border-blue-500'
        }`}
      >
        <IoCamera size={24} className="text-blue-800/70" />
        <Text className="ml-2" text="Upload Image" />
      </label>

      <Input
        multiple
        id="file"
        type="file"
        aria-label="Upload Avatar"
        className="hidden"
        accept="image/*"
        onChange={uploadMultipleFile}
        disabled={isUploadDisabled}
        onClick={clickInput}
      />

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        {files?.map((file, index) => {
          const handleChangeDelete = () => {
            deleteFile(index);
          };

          return (
            <div key={`file_${index}`} className="relative w-24 h-24">
              <ImageFallback
                src={file}
                alt={`Uploaded image ${index + 1}`}
                width={96}
                height={96}
                className="rounded-md object-cover w-full h-full"
              />
              <Button
                className="absolute top-0 right-0 p-1 !border-none rounded-none !bg-transparent dark:!bg-transparent !text-pink-500"
                onClick={handleChangeDelete}
              >
                <IoClose size={16} />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(AvatarUploadMultiple);
