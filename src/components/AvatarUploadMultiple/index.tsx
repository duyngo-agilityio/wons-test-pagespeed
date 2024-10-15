'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { IoCamera, IoClose } from 'react-icons/io5';
import { Input, Button, Text, ImageFallback } from '@/components';

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
  const [_, setFilesList] = useState<File[]>([]);

  const handleChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      // Reset error message
      setErrorMessage('');

      if (files.length > 2) {
        setErrorMessage(ERROR_MESSAGES.MAX_IMAGE);
        return;
      }

      // Array to hold valid files and preview URLs
      const validFiles: File[] = [];
      const newPreviewURLs: string[] = [];

      // Validate files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file name and size
        if (!REGEX.IMG.test(file.name)) {
          setErrorMessage(ERROR_MESSAGES.UPLOAD_IMAGE);
          return;
        }
        if (file.size > MAX_SIZE) {
          setErrorMessage(ERROR_MESSAGES.UPLOAD_IMAGE_SIZE);
          return;
        }

        // Add valid file
        validFiles.push(file);
        const previewImage = URL.createObjectURL(file);
        newPreviewURLs.push(previewImage);
      }

      // Use the callback version of setState to ensure we have the latest value
      setFilesList((prevFiles) => {
        const updatedFiles = [...prevFiles, ...validFiles];

        // Pass the updated files list to the parent component
        onFileChange(updatedFiles);

        return updatedFiles; // Update the filesList state
      });

      // Update preview URLs
      setPreviewURLs((prevURLs) => [...prevURLs, ...newPreviewURLs]);
    },
    [onFileChange], // Remove filesList from dependency array
  );

  const handleRemoveImage = (index: number) => {
    // Remove the image from previewURLs
    const updatedPreviews = previewURLs.filter((_, i) => i !== index);
    setPreviewURLs(updatedPreviews);

    // Also remove the corresponding file from filesList
    setFilesList((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      // Pass the updated files list to the parent component
      onFileChange(updatedFiles);
      return updatedFiles;
    });
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
            <ImageFallback
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
