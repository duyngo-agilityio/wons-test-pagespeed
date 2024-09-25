import { UploadImageResponse } from '@/types';

export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const uploadImageRequest = await fetch(
      process.env.NEXT_PUBLIC_UPLOAD_URL || '',
      {
        headers: {
          'API-Key': process.env.NEXT_PUBLIC_UPLOAD_KEY || '',
        },
        method: 'POST',
        body: formData,
      },
    );

    return await uploadImageRequest.json();
  } catch (error) {
    const message = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return { error: message };
  }
};
