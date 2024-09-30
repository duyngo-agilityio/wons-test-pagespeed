'use server';

import { revalidateTag } from 'next/cache';

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

export const updateProduct = async (
  formData: Partial<IProductDetail>,
  id: number,
) => {
  try {
    const formattedData = {
      ...formData,
      title: `${formData.title}`,
    };

    await httpClient.putRequest({
      endpoint: `${API_PATH.PRODUCTS}/${id}`,
      body: { data: formattedData },
    });

    revalidateTag(API_PATH.PRODUCTS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
