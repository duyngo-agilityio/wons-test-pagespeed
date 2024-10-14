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
import { IUserFormData } from '@/types';
import { TUser } from '@/models';

export const updateUser = async (
  profileData: Omit<IUserFormData, 'role'>,
  id: number,
) => {
  try {
    await httpClient.putRequest<Omit<IUserFormData, 'role'>, TUser>({
      endpoint: `${API_PATH.USERS}/${id}`,
      body: profileData,
    });

    revalidateTag(API_PATH.USERS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
