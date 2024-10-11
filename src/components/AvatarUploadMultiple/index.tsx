'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { IoCamera, IoClose } from 'react-icons/io5';
import { Input, Button, Text } from '@/components';
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

  const handleChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const validFiles: File[] = [];
      const newPreviewURLs: string[] = [];

      if (!files) {
        return;
      }

      // Reset error message for multiple files processing
      setErrorMessage('');

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

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

        // Add valid file to array
        validFiles.push(file);

        // Create preview URL for the valid file
        const previewImage = URL.createObjectURL(file);
        newPreviewURLs.push(previewImage);
      }

      // Update preview URLs (append new ones)
      setPreviewURLs((prev) => [...prev, ...newPreviewURLs]);

      // Ensure no error message after valid files
      setErrorMessage('');

      // Pass the valid files to onFileChange
      onFileChange(validFiles);
    },
    [onFileChange],
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
        onChange={handleChangeFiles}
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
