// Constants
import { API_PATH } from '@/constants';
import { ICustomer } from '@/models';

// Services
import { httpClient } from '@/services';
import { StrapiModel, StrapiResponse } from '@/types';

// Utils
import { formatErrorMessage } from '@/utils';

export const getCustomers = async (): Promise<{
  error?: string;
  data?: StrapiModel<ICustomer>[];
}> => {
  try {
    const productsResponse = await httpClient.getRequest<
      StrapiResponse<StrapiModel<ICustomer>[]>
    >({
      endpoint: API_PATH.CUSTOMERS,
    });

    if (!productsResponse?.data?.length) {
      return { error: undefined, data: [] };
    }

    return { error: undefined, data: productsResponse.data };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
