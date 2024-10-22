// Constants
import { PROCESS_ENV } from '@/constants';

// Types
import { UploadImageResponse } from '@/types';

export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const uploadImageRequest = await fetch(PROCESS_ENV.UPLOAD_URL, {
      headers: {
        'API-Key': PROCESS_ENV.UPLOAD_KEY,
      },
      method: 'POST',
      body: formData,
    });

    return await uploadImageRequest.json();
  } catch (error) {
    const message = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return { error: message };
  }
};
