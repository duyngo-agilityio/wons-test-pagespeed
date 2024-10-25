// APIs
import { uploadImage } from '@/api';

export const handleUpdateImage = async (
  avatarFile: File,
): Promise<{ url?: string; error?: string }> => {
  const uploadImageResponse = await uploadImage(avatarFile);

  if (uploadImageResponse?.downloadURL) {
    return { url: uploadImageResponse.downloadURL };
  } else {
    return { error: uploadImageResponse.error };
  }
};
