// services
import { httpClient } from '@/services';

// utils
import { formatErrorMessage } from '@/utils';

// types
import { TInvoiceProductTable } from '@/types';

// mocks
import { MOCK_PRODUCTS_WITHOUT_ATTRIBUTES } from '@/mocks';

// actions
import { createInvoiceProducts } from '@/actions';

jest.mock('@/services', () => ({
  httpClient: {
    postRequest: jest.fn(),
  },
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

describe('createInvoiceProducts', () => {
  const PRODUCTS_MOCK: TInvoiceProductTable[] =
    MOCK_PRODUCTS_WITHOUT_ATTRIBUTES.map((product, index) => ({
      product: {
        data: {
          id: index + 1,
          title: product.title,
          price: product.price,
          rating: product.rating,
          imageUrl: product.imageUrl,
        },
      },
      quantity: 2,
      price: product.price,
    }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create invoice products and return product ids', async () => {
    const MOCK_RESPONSE = { data: { id: 123 } };
    (httpClient.postRequest as jest.Mock).mockResolvedValue(MOCK_RESPONSE);

    const result = await createInvoiceProducts(PRODUCTS_MOCK);

    expect(httpClient.postRequest).toHaveBeenCalledTimes(PRODUCTS_MOCK.length);

    // Verify that the correct arguments are passed in the API call
    PRODUCTS_MOCK.forEach((product, index) => {
      expect(httpClient.postRequest).toHaveBeenNthCalledWith(index + 1, {
        endpoint: '/invoice-products', // Corrected endpoint
        body: {
          data: {
            price: product.price,
            quantity: Number(product.quantity),
            product: product.product.data.id,
          },
        },
      });
    });

    // Expect the returned result to match the mocked IDs
    expect(result).toEqual([123, 123, 123]);
  });

  it('should throw an error with formatted message when creating invoice products fails', async () => {
    const MOCK_ERROR = new Error('Request failed');
    const FORMATTED_ERROR_MESSAGE = 'Something went wrong.';

    (httpClient.postRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);

    (formatErrorMessage as jest.Mock).mockReturnValue(FORMATTED_ERROR_MESSAGE);

    await expect(createInvoiceProducts(PRODUCTS_MOCK)).rejects.toThrow(
      FORMATTED_ERROR_MESSAGE,
    );

    expect(httpClient.postRequest).toHaveBeenCalled();

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
  });
});
