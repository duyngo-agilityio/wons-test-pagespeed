import { uploadImage } from '@/api/image';
import { IProductDetail } from '@/models';

export const handleUpdateImage = async (
  avatarFile: File,
  formData: IProductDetail,
) => {
  const data = formData;
  try {
    const uploadImageResponse = await uploadImage(avatarFile);

    if (uploadImageResponse?.downloadURL) {
      data.imageUrl = uploadImageResponse.downloadURL;
    } else {
      return { error: uploadImageResponse.error };
    }
  } catch (error) {
    return error;
  }

  return data;
};
