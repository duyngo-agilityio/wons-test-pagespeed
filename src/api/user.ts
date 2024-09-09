// Constants
import { API_PATH } from '@/constants';

// Services
import { httpClient } from '@/services';

export const getProfile = async (jwt: string) => {
  try {
    const data = await httpClient.getRequest({
      endpoint: `${API_PATH.USERS}/me?populate*`,
      configOptions: {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        cache: 'no-store',
      },
    });

    return { data };
  } catch (error) {
    return error;
  }
};
