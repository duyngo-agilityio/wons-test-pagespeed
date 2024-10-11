import { uploadImage } from '@/api/image';
import { IProductDetail } from '@/models';
import { UserProfileData } from '@/types';

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
  formData: Partial<UserProfileData>,
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
