// APIs
import { getInvoiceProducts, getInvoices, getInvoiceById } from '../invoice';

// Mocks
import {
  MOCK_ERROR_RESPONSE,
  MOCK_INVOICES_RESPONSE,
  MOCK_INVOICES_WITH_CUSTOMER,
} from '@/mocks';

// Services
import { httpClient } from '@/services';

// Constants
import { DEFAULT_PAGE, MESSAGES, ORDER, PAGE_SIZE } from '@/constants';

// Utils
import { formatErrorMessage } from '@/utils';

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
  formatFilterIntervalDate: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    getRequest: jest.fn(),
  },
}));

describe('Invoice APIs', () => {
  describe('getInvoices', () => {
    it('should get the invoice list successfully', async () => {
      jest
        .spyOn(httpClient, 'getRequest')
        .mockResolvedValue(MOCK_INVOICES_RESPONSE);

      const res = await getInvoices({
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE[4],
      });

      expect(res).toEqual(MOCK_INVOICES_RESPONSE);
    });

    it('should get the invoice list successfully with search', async () => {
      jest
        .spyOn(httpClient, 'getRequest')
        .mockResolvedValue(MOCK_INVOICES_RESPONSE);

      const res = await getInvoices({
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE[10],
        query: 'Abcd',
        sortBy: 'fullName',
        sortOrder: ORDER.ASC,
      });

      expect(res).toEqual(MOCK_INVOICES_RESPONSE);
    });
  });

  it('should get the invoice list failed', async () => {
    jest.spyOn(httpClient, 'getRequest').mockRejectedValue(MOCK_ERROR_RESPONSE);

    await expect(getInvoices()).rejects.toThrow('');
  });
});

describe('getInvoiceById', () => {
  it('should get the invoice list successfully', async () => {
    jest
      .spyOn(httpClient, 'getRequest')
      .mockResolvedValue(MOCK_INVOICES_WITH_CUSTOMER[0]);

    const response = await getInvoiceById({
      id: 4,
    });

    expect(response).toEqual(MOCK_INVOICES_WITH_CUSTOMER[0]);
  });

  it('should get the invoice list failed', async () => {
    jest.spyOn(httpClient, 'getRequest').mockRejectedValue(MOCK_ERROR_RESPONSE);

    await expect(
      getInvoiceById({
        id: 4,
      }),
    ).rejects.toThrow('');
  });
});

describe('getInvoiceProducts', () => {
  it('should get the getInvoiceProducts successfully', async () => {
    jest
      .spyOn(httpClient, 'getRequest')
      .mockResolvedValue({ data: MOCK_INVOICES_RESPONSE });

    const response = await getInvoiceProducts({ sort: 'product.title' });

    expect(response).toEqual({ data: MOCK_INVOICES_RESPONSE });
  });

  it('should get the getInvoiceProducts undefined', async () => {
    jest.spyOn(httpClient, 'getRequest').mockResolvedValue({});

    const response = await getInvoiceProducts({});

    expect(response).toEqual({ data: [] });
  });

  it('should get the getInvoiceProducts failed', async () => {
    const MOCK_ERROR = new Error('Update failed');
    (httpClient.getRequest as jest.Mock).mockRejectedValue({
      error: MOCK_ERROR,
    });
    (formatErrorMessage as jest.Mock).mockReturnValue(
      MESSAGES.ERROR.UNKNOWN_ERROR,
    );

    const result = await getInvoiceProducts({});

    expect(formatErrorMessage).toHaveBeenCalledWith({
      error: MOCK_ERROR,
    });
    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});
