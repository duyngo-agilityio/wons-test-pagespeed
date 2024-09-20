// APIs
import { getInvoices } from '../invoice';

// Mocks
import { MOCK_ERROR_RESPONSE, MOCK_INVOICES_RESPONSE } from '@/mocks';

// Services
import { httpClient } from '@/services';

// Constants
import { DEFAULT_PAGE, ERROR_MESSAGES, ORDER, PAGE_SIZE } from '@/constants';

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
});
