// constants
import { API_PATH, ERROR_MESSAGES } from '@/constants';

// models
import { IProduct } from '@/models';

// types
import { StrapiModel, StrapiResponse } from '@/types/strapi';

// services
import { httpClient } from '@/services';

export const getAllProducts = async (): Promise<{
  data: StrapiModel<IProduct>[];
}> => {
  const url = `${API_PATH.PRODUCTS}?sort=rating:desc&pagination[limit]=2`;

  try {
    const productsResponse = await httpClient.getRequest<
      StrapiResponse<StrapiModel<IProduct>[]>
    >({
      endpoint: url,
    });

    if (!productsResponse?.data?.length) {
      return { data: [] };
    }

    return { data: productsResponse.data };
  } catch (error) {
    throw new Error(ERROR_MESSAGES.FETCH);
  }
};
