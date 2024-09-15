// Constants
import { API_PATH } from '@/constants';

// Models
import { IProduct, TInvoiceProduct } from '@/models';

// Types
import { StrapiModel, StrapiResponse, TInvoiceListResponse } from '@/types';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

interface IParameters {
  cache?: RequestCache;
  nextOptions?: NextFetchRequestConfig;
  sort?: string;
}

export const getInvoiceProducts = async ({
  cache,
  nextOptions,
  sort,
}: IParameters) => {
  const sortValue: string = sort ? `&sort=${sort}` : '';
  const endpoint: string = `${API_PATH.INVOICE_PRODUCTS}?populate=product&pagination[pageSize]=4${sortValue}`;

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

export const getInvoices = async ({ cache, nextOptions }: IParameters) => {
  const endpoint: string = `${API_PATH.INVOICES}?populate=customer`;

  try {
    const response = await httpClient.getRequest<TInvoiceListResponse>({
      endpoint,
      configOptions: {
        cache: cache ?? 'force-cache',
        next: nextOptions,
      },
    });

    return response;
  } catch (error) {
    const message = formatErrorMessage(error);

    throw new Error(message);
  }
};
