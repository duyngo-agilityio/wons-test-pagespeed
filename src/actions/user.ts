'use server';

// Libraries
import { revalidateTag } from 'next/cache';

// Constants
import { API_PATH } from '@/constants';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

// Types
import { UserProfileData } from '@/types';

export const updateUser = async (
  profileData: Partial<UserProfileData>,
  id: number,
) => {
  try {
    const formattedData = {
      avatar: profileData.imageUrl,
      fullName: profileData.fullName,
      email: profileData.email,
    };

    await httpClient.patchRequest({
      endpoint: `${API_PATH.USERS}/${id}`,
      body: { data: formattedData },
    });

    revalidateTag(API_PATH.USERS);
    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
