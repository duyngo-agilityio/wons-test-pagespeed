// Constants
import { API_PATH } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { TProfileResponse } from '@/types';

// Utils
import { formatErrorMessage } from '@/utils';

export const getProfile = async (jwt: string): Promise<TProfileResponse> => {
  try {
    const data = await httpClient.getRequest<TProfileResponse>({
      endpoint: `${API_PATH.USERS}/me?populate=role`,
      configOptions: {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        cache: 'no-store',
      },
    });

    return data;
  } catch (error) {
    const message = formatErrorMessage(error);

    throw new Error(message);
  }
};
