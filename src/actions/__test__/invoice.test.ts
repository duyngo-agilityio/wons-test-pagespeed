import { revalidateTag } from 'next/cache';

// services
import { httpClient } from '@/services/http-request';

// utils
import { formatErrorMessage } from '@/utils/messages';

// types
import { TInvoiceProductTable, InvoiceStatus } from '@/types/invoice';
import { Method } from '@/types/api';

// mocks
import { MOCK_INVOICES_WITH_CUSTOMER } from '@/mocks/invoice';
import { MOCK_PRODUCTS_WITHOUT_ATTRIBUTES } from '@/mocks/product';

// actions
import {
  createInvoice,
  createInvoiceProducts,
  deleteInvoice,
  deleteMultipleInvoice,
  editInvoice,
  updateInvoice,
  updateInvoiceProducts,
} from '@/actions/invoice';

// Constants
import { API_PATH } from '@/constants/apis';
import { MESSAGES } from '@/constants/messages';

jest.mock('@/services/http-request', () => ({
  httpClient: {
    genericRequest: jest.fn(),
  },
}));

jest.mock('@/utils/messages', () => ({
  formatErrorMessage: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

const { attributes } = MOCK_INVOICES_WITH_CUSTOMER[0];
const {
  customer,
  isSelected,
  imageUrl,
  status,
  address,
  date,
  email,
  invoiceId,
  invoice_products,
} = attributes;
const { id, attributes: attributesInvoiceProducts } = invoice_products.data[0];
const { price, quantity, product } = attributesInvoiceProducts;
const mockProducts = [
  {
    id,
    price,
    quantity,
    product: {
      data: { ...product.data, id: 1 },
    },
  },
];
const formData = {
  invoiceId,
  customerId: String(customer.data.id),
  imageUrl,
  status,
  address,
  isSelected,
  date,
  email,
};
const mockError = new Error(MESSAGES.ERROR.UNKNOWN_ERROR);

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
    (httpClient.genericRequest as jest.Mock).mockResolvedValue(MOCK_RESPONSE);

    const result = await createInvoiceProducts(PRODUCTS_MOCK);

    expect(httpClient.genericRequest).toHaveBeenCalledTimes(
      PRODUCTS_MOCK.length,
    );

    // Verify that the correct arguments are passed in the API call
    PRODUCTS_MOCK.forEach((product, index) => {
      expect(httpClient.genericRequest).toHaveBeenNthCalledWith(index + 1, {
        method: Method.Post,
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

    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);

    (formatErrorMessage as jest.Mock).mockReturnValue(FORMATTED_ERROR_MESSAGE);

    await expect(createInvoiceProducts(PRODUCTS_MOCK)).rejects.toThrow(
      FORMATTED_ERROR_MESSAGE,
    );

    expect(httpClient.genericRequest).toHaveBeenCalled();

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
  });
});

describe('update invoice products', () => {
  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      data: MOCK_INVOICES_WITH_CUSTOMER[0],
    });

    const result = await updateInvoiceProducts(mockProducts);

    expect(result).toEqual([MOCK_INVOICES_WITH_CUSTOMER[0].id]);
  });

  it('calls failed', async () => {
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(mockError);

    const result = updateInvoiceProducts(mockProducts);

    expect(result).rejects.toThrow(MESSAGES.ERROR.UNKNOWN_ERROR);
  });
});

describe('Create invoice', () => {
  it('calls success', async () => {
    // (createInvoiceProducts as jest.Mock).mockResolvedValue(mockProducts);
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      data: MOCK_INVOICES_WITH_CUSTOMER[0],
    });

    const result = await createInvoice(formData, mockProducts);

    expect(httpClient.genericRequest).toHaveBeenCalledTimes(2);
    expect(revalidateTag).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      data: MOCK_INVOICES_WITH_CUSTOMER[0],
    });
  });

  it('calls success with undefined', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      data: undefined,
    });

    const result = await createInvoice({}, []);

    expect(httpClient.genericRequest).toHaveBeenCalledTimes(1);
    expect(revalidateTag).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      data: {},
    });
  });

  it('calls failed', async () => {
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(mockError);

    const result = await createInvoice({}, []);

    expect(httpClient.genericRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      error: MESSAGES.ERROR.UNKNOWN_ERROR,
    });
  });
});

describe('Edit Invoice', () => {
  const newData = { email: 'test@gmai.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const MOCK_RESPONSE = {
    id: 4,
    attributes: {
      email: 'test@gmai.com',
      date: '2024-09-10',
      status: InvoiceStatus.Complete,
      address: '1254 Xo Viet Nghe Tinh, Da Nang',
      isSelected: true,
      invoiceId: '871345',
      imageUrl: '',
    },
  };

  it('should successfully update invoice', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue(MOCK_RESPONSE);

    await editInvoice(1, newData, []);

    expect(httpClient.genericRequest).toHaveBeenCalledTimes(1);
  });

  it('should successfully update invoice', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue(MOCK_RESPONSE);

    await editInvoice(1, newData, mockProducts);

    expect(httpClient.genericRequest).toHaveBeenCalledTimes(2);
  });

  it('should return an error with formatted message when editInvoice fails', async () => {
    const MOCK_ERROR = new Error('Request failed');
    const FORMATTED_ERROR_MESSAGE = 'Something went wrong.';

    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);

    (formatErrorMessage as jest.Mock).mockReturnValue(FORMATTED_ERROR_MESSAGE);

    const result = await editInvoice(1, newData, []);

    expect(result).toEqual({ error: FORMATTED_ERROR_MESSAGE });
    expect(httpClient.genericRequest).toHaveBeenCalled();
    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
  });
});

describe('Update Invoice', () => {
  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue(
      MOCK_INVOICES_WITH_CUSTOMER[0],
    );

    await updateInvoice(MOCK_INVOICES_WITH_CUSTOMER[0].id, formData);

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Put,
      endpoint: `${API_PATH.INVOICES}/${MOCK_INVOICES_WITH_CUSTOMER[0].id}`,
      body: { data: formData },
    });
    expect(revalidateTag).toHaveBeenCalledTimes(2);
  });

  it('calls failed', async () => {
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(mockError);

    const result = await updateInvoice(
      MOCK_INVOICES_WITH_CUSTOMER[0].id,
      formData,
    );

    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});

describe('Delete Invoice', () => {
  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue(
      MOCK_INVOICES_WITH_CUSTOMER[0],
    );

    await deleteInvoice(
      Number(MOCK_INVOICES_WITH_CUSTOMER[0].attributes.invoiceId),
      [invoice_products.data[0].id],
    );

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Delete,
      endpoint: `${API_PATH.INVOICES}/${invoiceId}`,
    });
    expect(revalidateTag).toHaveBeenCalledTimes(2);
  });

  it('calls failed', async () => {
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(mockError);

    const result = await deleteInvoice(
      Number(MOCK_INVOICES_WITH_CUSTOMER[0].attributes.invoiceId),
      [invoice_products.data[0].id],
    );

    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});

describe('Delete multiple invoices', () => {
  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue(
      MOCK_INVOICES_WITH_CUSTOMER[0],
    );

    await deleteMultipleInvoice(
      [Number(MOCK_INVOICES_WITH_CUSTOMER[0].attributes.invoiceId)],
      [invoice_products.data[0].id],
    );

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Delete,
      endpoint: `${API_PATH.INVOICES}/${invoiceId}`,
    });
    expect(revalidateTag).toHaveBeenCalledTimes(2);
  });

  it('calls failed', async () => {
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(mockError);

    const result = await deleteMultipleInvoice(
      [Number(MOCK_INVOICES_WITH_CUSTOMER[0].attributes.invoiceId)],
      [invoice_products.data[0].id],
    );

    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});
