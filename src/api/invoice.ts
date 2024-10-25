// Constants
import { API_PATH, DEFAULT_PAGE, PAGE_SIZE } from '@/constants';

// Types
import {
  TInvoiceDetailsResponse,
  TInvoiceListResponse,
  TInvoiceProductData,
  TRecentInvoiceProductResponse,
} from '@/types';

// Utils
import { formatFilterIntervalDate, formatErrorMessage } from '@/utils';

// Services
import { httpClient } from '@/services';

interface IParameters {
  cache?: RequestCache;
  sort?: string;
  filters?: Record<string, string>;
  pageSize?: number;
}

export const getInvoiceProducts = async ({
  cache,
  sort,
  filters,
  pageSize = PAGE_SIZE[4],
}: IParameters): Promise<{
  error?: string;
  data?: TInvoiceProductData;
}> => {
  const sortValue: string = sort ? `&sort=${sort}` : '';
  const filterQuery: string = formatFilterIntervalDate(
    filters as Record<string, string>,
  );
  const endpoint: string = `${API_PATH.INVOICE_PRODUCTS}?populate=product&pagination[page]=${DEFAULT_PAGE}&pagination[pageSize]=${pageSize}${sortValue}${filterQuery}`;

  try {
    const response = await httpClient.getRequest<TRecentInvoiceProductResponse>(
      {
        endpoint: endpoint,
        configOptions: {
          cache: cache,
          next: { tags: [API_PATH.INVOICE_PRODUCTS] },
        },
      },
    );

    return { data: response.data ?? [] };
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};

export type InvoiceListConfigs = {
  query?: string;
  sortOrder?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
  cache?: RequestCache;
  nextOptions?: NextFetchRequestConfig;
  id?: number;
};

export const getInvoices = async ({
  query,
  sortOrder,
  sortBy,
  page = DEFAULT_PAGE,
  pageSize = PAGE_SIZE[10],
  cache,
  nextOptions,
}: InvoiceListConfigs = {}): Promise<TInvoiceListResponse> => {
  const sortValue = sortBy ? `&sort=${sortBy}:${sortOrder}` : '';
  const searchBy = query
    ? `&filters[$or][0][customer][fullName][$containsi]=${query}&filters[$or][1][email][$containsi]=${query}`
    : '';
  const pageValue = `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  const endpoint: string = `${API_PATH.INVOICES}?populate=customer&populate=invoice_products${sortValue}${searchBy}${pageValue}`;

  try {
    const response = await httpClient.getRequest<TInvoiceListResponse>({
      endpoint,
      configOptions: {
        cache: cache,
        next: nextOptions,
      },
    });

    return response;
  } catch (error) {
    const message = formatErrorMessage(error);

    throw new Error(message);
  }
};

export const getInvoiceById = async ({
  id,
  cache,
  nextOptions,
}: InvoiceListConfigs) => {
  const endpoint = `${API_PATH.INVOICES}/${id}?populate=customer&populate=invoice_products&populate=invoice_products.product`;

  try {
    const response = await httpClient.getRequest<TInvoiceDetailsResponse>({
      endpoint,
      configOptions: {
        cache: cache,
        next: nextOptions,
      },
    });

    return response;
  } catch (error) {
    const message = formatErrorMessage(error);

    throw new Error(message);
  }
};
