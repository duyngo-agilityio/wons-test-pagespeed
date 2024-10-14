import { uploadImage } from '@/api/image';
import { IProductDetail } from '@/models';
import { IUserFormData } from '@/types';

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

export const handleUpdateImageProfile = async (
  avatarFile: File,
  formData: IUserFormData,
) => {
  const data = formData;
  try {
    const uploadImageResponse = await uploadImage(avatarFile);

    if (uploadImageResponse?.downloadURL) {
      data.avatar = uploadImageResponse.downloadURL;
    } else {
      return { error: uploadImageResponse.error };
    }
  } catch (error) {
    return error;
  }

  return data;
};
