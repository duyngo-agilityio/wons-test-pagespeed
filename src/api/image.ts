// Services
import { httpClient } from '@/services';

// utils
import { formatErrorMessage } from '@/utils';

export const uploadImage = async (
  image: FormData,
): Promise<string | { error: string }> => {
  try {
    const response = await httpClient.postRequest<
      FormData,
      { data: { url: string } }
    >({
      endpoint: `${process.env.NEXT_PUBLIC_UPLOAD_URL}?key=${process.env.NEXT_PUBLIC_UPLOAD_KEY}`,
      body: image,
      configOptions: {
        headers: {},
      },
    });

    return response.data.url;
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
