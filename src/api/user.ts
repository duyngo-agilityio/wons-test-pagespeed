import { httpClient } from '@/services';

export const getProfile = async (jwt: string) => {
  try {
    const data = await httpClient.getRequest({
      endpoint: 'users/me?populate*',
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
