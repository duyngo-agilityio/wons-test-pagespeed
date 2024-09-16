'use server';

// Constants
import { API_PATH } from '@/constants';

// Models
import { TInvoice } from '@/models';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

export const createInvoiceAction = async (formData: Partial<TInvoice>) => {
  try {
    await httpClient.postRequest({
      endpoint: API_PATH.INVOICES,
      body: { data: formData },
    });
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
