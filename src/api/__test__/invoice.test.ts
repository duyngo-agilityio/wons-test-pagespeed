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
import {
  API_PATH,
  DEFAULT_PAGE,
  ERROR_MESSAGES,
  ORDER,
  PAGE_SIZE,
} from '@/constants';

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
        pageSize: PAGE_SIZE[4],
        query: 'Abcd',
        sortBy: 'fullName',
        sortOrder: ORDER.ASC,
      });

      expect(res).toEqual(MOCK_INVOICES_RESPONSE);
    });
  });

  it('should get the invoice list failed', async () => {
    jest.spyOn(httpClient, 'getRequest').mockRejectedValue(MOCK_ERROR_RESPONSE);

    await expect(getInvoices()).rejects.toThrow(ERROR_MESSAGES.UNKNOWN_ERROR);
  });

  describe('getInvoiceProducts', () => {
    it('should get the invoice products list successfully without filters or sort', async () => {
      const mockGetRequest = jest
        .spyOn(httpClient, 'getRequest')
        .mockResolvedValue(MOCK_INVOICES_RESPONSE);

      const res = await getInvoiceProducts({
        cache: 'default',
        filters: {},
      });

      expect(res).toEqual(MOCK_INVOICES_RESPONSE);
      expect(mockGetRequest).toHaveBeenCalledWith({
        endpoint: expect.stringContaining(`${API_PATH.INVOICE_PRODUCTS}`),
        configOptions: expect.objectContaining({ cache: 'default' }),
      });
    });

    it('should get the invoice products list successfully with filters and sort', async () => {
      const mockGetRequest = jest
        .spyOn(httpClient, 'getRequest')
        .mockResolvedValue(MOCK_INVOICES_RESPONSE);

      const filters = {
        dateFrom: '2023-01-01',
        dateTo: '2023-01-31',
      };

      const res = await getInvoiceProducts({
        cache: 'default',
        sort: 'productName:asc',
        filters,
      });

      expect(res).toEqual(MOCK_INVOICES_RESPONSE);
      expect(mockGetRequest).toHaveBeenCalledWith({
        endpoint: expect.stringContaining('&sort=productName:asc'),
        configOptions: expect.objectContaining({ cache: 'default' }),
      });
      expect(mockGetRequest).toHaveBeenCalledWith({
        endpoint: expect.stringContaining(
          `&filters[$and][0][undefined][undefined]=2023-01-01&&filters[$and][1][undefined][undefined]=2023-01-31`,
        ),
        configOptions: expect.objectContaining({ cache: 'default' }),
      });
    });

    it('should fail to get the invoice products list and throw an error', async () => {
      jest
        .spyOn(httpClient, 'getRequest')
        .mockRejectedValue(MOCK_ERROR_RESPONSE);

      const result = await getInvoiceProducts({
        cache: 'default',
        filters: {},
      });

      expect(result).toEqual(MOCK_ERROR_RESPONSE);
    });
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

    await expect(getInvoiceById({})).rejects.toThrow(
      ERROR_MESSAGES.UNKNOWN_ERROR,
    );
  });
});
