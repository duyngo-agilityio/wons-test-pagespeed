// services
import { httpClient } from '@/services';

// utils
import { formatErrorMessage } from '@/utils';

// types
import { TInvoiceProductTable } from '@/types';

// mocks
import { MOCK_PRODUCTS_WITHOUT_ATTRIBUTES } from '@/mocks';

// actions
import { createInvoiceProducts, editInvoice } from '@/actions';

// Constants
import { InvoiceStatus } from '@/constants';

jest.mock('@/services', () => ({
  httpClient: {
    postRequest: jest.fn(),
    putRequest: jest.fn(),
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

describe('editInvoice', () => {
  const newData = { email: 'test@gmai.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update invoice', async () => {
    const MOCK_RESPONSE = {
      id: 4,
      attributes: {
        email: 'test@gmai.com',
        date: '2024-09-10',
        status: InvoiceStatus.COMPLETE,
        address: '1254 Xo Viet Nghe Tinh, Da Nang',
        isSelected: true,
        invoiceId: '871345',
        imageUrl: '',
      },
    };

    (httpClient.putRequest as jest.Mock).mockResolvedValue(MOCK_RESPONSE);

    await editInvoice(1, newData, []);

    expect(httpClient.putRequest).toHaveBeenCalledTimes(1);
  });

  it('should return an error with formatted message when editInvoice fails', async () => {
    const MOCK_ERROR = new Error('Request failed');
    const FORMATTED_ERROR_MESSAGE = 'Something went wrong.';

    (httpClient.putRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);

    (formatErrorMessage as jest.Mock).mockReturnValue(FORMATTED_ERROR_MESSAGE);

    const result = await editInvoice(1, newData, []);

    expect(result).toEqual({ error: FORMATTED_ERROR_MESSAGE });
    expect(httpClient.putRequest).toHaveBeenCalled();
    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
  });
});
