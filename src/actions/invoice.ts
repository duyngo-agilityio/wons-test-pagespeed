'use server';

import { uploadImage } from '@/api/image';
// Constants
import { API_PATH } from '@/constants';

// Models
import { TInvoice } from '@/models';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

export const createInvoiceAction = async (
  formData: Partial<TInvoice> & { imageFile?: File },
) => {
  try {
    if (formData.imageFile) {
      const imageFormData = new FormData();
      imageFormData.append('file', formData.imageFile);

      const imageUrl = await uploadImage(imageFormData);

      if (typeof imageUrl === 'string') {
        formData.imageUrl = imageUrl;
      } else {
        return { error: imageUrl.error };
      }
    }

    await httpClient.postRequest({
      endpoint: API_PATH.INVOICES,
      body: { data: formData },
    });

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
