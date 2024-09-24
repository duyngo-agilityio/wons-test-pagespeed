// Constants
import { API_PATH, DEFAULT_PAGE, PAGE_SIZE } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { TCustomerListResponse } from '@/types';

// Utils
import { formatErrorMessage } from '@/utils';

type CustomerListConfigs = {
  id?: number;
  page?: number;
  pageSize?: number;
  cache?: RequestCache;
  nextOptions?: NextFetchRequestConfig;
};

export const getCustomers = async ({
  page = DEFAULT_PAGE,
  pageSize = PAGE_SIZE[10],
  cache,
  nextOptions,
}: CustomerListConfigs = {}): Promise<TCustomerListResponse> => {
  const pageValue = `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  const endpoint = `${API_PATH.CUSTOMERS}?${pageValue}`;

  try {
    const customerResponse = await httpClient.getRequest<TCustomerListResponse>(
      {
        endpoint,
        configOptions: {
          cache: cache ?? 'force-cache',
          next: nextOptions,
        },
      },
    );

    return customerResponse;
  } catch (error) {
    const message = formatErrorMessage(error);

    throw new Error(message);
  }
};

export const getCustomerById = async ({
  id,
  cache,
  nextOptions,
}: CustomerListConfigs) => {
  const endpoint = `${API_PATH.CUSTOMERS}/${id}`;

  try {
    const response = await httpClient.getRequest<TCustomerListResponse>({
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
