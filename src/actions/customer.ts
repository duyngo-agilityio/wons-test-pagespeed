'use server';

import { revalidateTag } from 'next/cache';

// Services
import { httpClient } from '@/services';

// Models
import { ICustomer } from '@/models';

// Utils
import { formatErrorMessage } from '@/utils';

// Constants
import { API_PATH, METHOD } from '@/constants';

// Types
import { TInvoiceListResponse } from '@/types';

export const createCustomer = async (formData: Partial<ICustomer>) => {
  try {
    const formattedData = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`,
    };

    await httpClient.genericRequest({
      method: METHOD.POST,
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

export const deleteCustomer = async (id: number) => {
  try {
    const response: TInvoiceListResponse = await httpClient.getRequest({
      endpoint: `${API_PATH.INVOICES}?filters[customer][$eq]=${id}`,
    });

    response?.data?.forEach(async (invoice) => {
      return await httpClient.genericRequest({
        method: METHOD.DELETE,
        endpoint: `${API_PATH.INVOICES}/${invoice.id}`,
      });
    });

    await httpClient.genericRequest({
      method: METHOD.DELETE,
      endpoint: `${API_PATH.CUSTOMERS}/${id}`,
    });

    revalidateTag(API_PATH.CUSTOMERS);
    revalidateTag(API_PATH.INVOICES);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};

export const updateCustomer = async (
  id: number,
  data: Partial<ICustomer>,
): Promise<{ error?: string }> => {
  try {
    await httpClient.genericRequest({
      method: METHOD.PUT,
      endpoint: `${API_PATH.CUSTOMERS}/${id}`,
      body: { data },
    });

    revalidateTag(API_PATH.CUSTOMERS);

    return { error: undefined };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
