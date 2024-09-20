'use server';

import { revalidateTag } from 'next/cache';

// Services
import { httpClient } from '@/services';

// Models
import { ICustomer } from '@/models';

// utils
import { formatErrorMessage } from '@/utils';

// Constants
import { API_PATH } from '@/constants';

export const createCustomer = async (formData: Partial<ICustomer>) => {
  try {
    const formattedData = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`,
    };

    await httpClient.postRequest({
      endpoint: API_PATH.CUSTOMERS,
      body: { data: formattedData },
    });

    revalidateTag(API_PATH.CUSTOMERS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
