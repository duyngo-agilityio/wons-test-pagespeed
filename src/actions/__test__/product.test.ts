import { revalidateTag } from 'next/cache';

// Mocks
import { MOCK_INVOICE_PRODUCTS, MOCK_PRODUCTS_TOP_SELLING } from '@/mocks';

// Services
import { httpClient } from '@/services';

// Actions
import { createProduct, deleteProduct, updateProduct } from '../product';

// Constants
import { MESSAGES } from '@/constants';

// Utils
import { formatErrorMessage } from '@/utils';

jest.mock('@/services', () => ({
  httpClient: {
    getRequest: jest.fn(),
    genericRequest: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

const message = MESSAGES.ERROR.UNKNOWN_ERROR;
const errorMessage = new Error(message);

describe('Create product', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      success: true,
    });
    const result = await createProduct(MOCK_PRODUCTS_TOP_SELLING[0]);

    expect(revalidateTag).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
  });

  it('calls failed', async () => {
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(errorMessage);
    (formatErrorMessage as jest.Mock).mockReturnValue(message);

    const result = await createProduct(MOCK_PRODUCTS_TOP_SELLING[0]);

    expect(result).toEqual({ error: message });
  });
});

describe('Update product', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      success: true,
    });
    const result = await updateProduct(
      MOCK_PRODUCTS_TOP_SELLING[0],
      MOCK_PRODUCTS_TOP_SELLING[0].id,
    );

    expect(revalidateTag).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ success: true });
  });

  it('calls failed', async () => {
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(errorMessage);
    (formatErrorMessage as jest.Mock).mockReturnValue(message);

    const result = await updateProduct(
      MOCK_PRODUCTS_TOP_SELLING[0],
      MOCK_PRODUCTS_TOP_SELLING[0].id,
    );

    expect(result).toEqual({ error: message });
  });
});

describe('Delete product', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('calls success', async () => {
    (httpClient.getRequest as jest.Mock).mockResolvedValue({
      data: MOCK_INVOICE_PRODUCTS,
    });
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      success: true,
    });
    const result = await deleteProduct(MOCK_INVOICE_PRODUCTS[0].id);

    expect(revalidateTag).toHaveBeenCalledTimes(3);
    expect(result).toEqual({ success: true });
  });

  it('calls failed', async () => {
    (httpClient.getRequest as jest.Mock).mockRejectedValue(errorMessage);
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(errorMessage);
    (formatErrorMessage as jest.Mock).mockReturnValue(message);

    const result = await deleteProduct(MOCK_INVOICE_PRODUCTS[0].id);

    expect(result).toEqual({ error: message });
  });
});
