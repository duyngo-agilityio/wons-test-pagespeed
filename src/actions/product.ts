'use server';

// constants
import { API_PATH } from '@/constants';

// models
import { IProductDetail } from '@/models';

// services
import { httpClient } from '@/services';

// utils
import { formatErrorMessage } from '@/utils';

export const createProduct = async (formData: Partial<IProductDetail>) => {
  try {
    const formattedData = {
      ...formData,
      title: `${formData.title}`,
    };

    await httpClient.postRequest({
      endpoint: API_PATH.PRODUCTS,
      body: { data: formattedData },
    });

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
