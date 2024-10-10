'use client';
import { ChangeEvent, useCallback, useState } from 'react';

// icons
import { IoCamera, IoClose } from 'react-icons/io5';

import { Button, Input, Text } from '@/components';

import Image from 'next/image';

// constants
import { ERROR_MESSAGES, MAX_SIZE, REGEX } from '@/constants';

export type TAvatarUploadMultipleProps = {
  onFileChange: (files: File[]) => void;
  value?: string[];
  error?: string;
};

const AvatarUploadMultiple = ({
  value = [],
  error = '',
  onFileChange,
}: TAvatarUploadMultipleProps) => {
  const [previewURLs, setPreviewURLs] = useState<string[]>(value);
  const [errorMessage, setErrorMessage] = useState<string>(error);

  const handleChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      if (files.length > 2 || previewURLs.length + files.length > 2) {
        const error = ERROR_MESSAGES.MAX_IMAGE;
        setErrorMessage(error);
        return;
      }

      const validFiles: File[] = [];
      const newPreviews: string[] = [...previewURLs];

      files.forEach((file) => {
        if (!REGEX.IMG.test(file.name)) {
          setErrorMessage(ERROR_MESSAGES.UPLOAD_IMAGE);
        } else if (file.size > MAX_SIZE) {
          setErrorMessage(ERROR_MESSAGES.UPLOAD_IMAGE_SIZE);
        } else {
          validFiles.push(file);
          newPreviews.push(URL.createObjectURL(file));
        }
      });

      if (validFiles.length > 0) {
        setErrorMessage('');
        setPreviewURLs(newPreviews);
        onFileChange(validFiles);
      }
    },
    [onFileChange, previewURLs],
  );

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = previewURLs.filter((_, i) => i !== index);
    setPreviewURLs(updatedPreviews);
  };

  const isUploadDisabled = previewURLs.length >= 2;

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
        aria-label="Upload Avatar"
        type="file"
        id="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleChangeFile}
        disabled={isUploadDisabled}
      />

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        {previewURLs.map((url, index) => (
          <div key={index} className="relative w-24 h-24">
            <Image
              src={url}
              alt={`Uploaded image ${index + 1}`}
              width={96}
              height={96}
              className="rounded-md object-cover w-full h-full"
            />
            <Button
              className="absolute top-0 right-0 p-1 !border-none rounded-none !bg-transparent dark:!bg-transparent !text-pink-500"
              onClick={() => handleRemoveImage(index)}
            >
              <IoClose size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarUploadMultiple;
