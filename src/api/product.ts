// constants
import { API_PATH } from '@/constants';

// models
import { IProduct } from '@/models';

// types
import { StrapiModel, StrapiResponse } from '@/types/strapi';

// services
import { httpClient } from '@/services';

// utils
import { formatErrorMessage } from '@/utils';

export const getAllProducts = async (): Promise<{
  error?: string;
  data?: StrapiModel<IProduct>[];
}> => {
  const url = `${API_PATH.PRODUCTS}?sort=rating:desc&pagination[limit]=2`;

  try {
    const productsResponse = await httpClient.getRequest<
      StrapiResponse<StrapiModel<IProduct>[]>
    >({
      endpoint: url,
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
