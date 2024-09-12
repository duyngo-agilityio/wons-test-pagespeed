// Constants
import { API_PATH } from '@/constants';

// Models
import { IProduct, TInvoiceProduct } from '@/models';

// Types
import { StrapiModel, StrapiResponse } from '@/types';

// Services
import { httpClient } from '@/services';

export const getInvoiceProducts = async (
  cache?: RequestCache,
  nextOptions?: NextFetchRequestConfig,
) => {
  const endpoint = `${API_PATH.INVOICE_PRODUCTS}?populate=product`;

  try {
    const response = await httpClient.getRequest<
      StrapiResponse<StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[]>
    >({
      endpoint: endpoint,
      configOptions: {
        cache: cache ?? 'force-cache',
        next: nextOptions,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
