// Constants
import { DEFAULT_PAGE, ERROR_MESSAGES, PAGE_SIZE } from '@/constants';

// Services
import { httpClient } from '@/services';
import { getCustomers } from '../customer';

// Mocks
import { MOCK_CUSTOMER_RESPONSE, MOCK_ERROR_RESPONSE } from '@/mocks';

describe('Customer APIs', () => {
  describe('getCustomers', () => {
    it('should get the customer list successfully', async () => {
      jest
        .spyOn(httpClient, 'getRequest')
        .mockResolvedValue(MOCK_CUSTOMER_RESPONSE);

      const res = await getCustomers({
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE[4],
      });

      expect(res).toEqual(MOCK_CUSTOMER_RESPONSE);
    });

    it('should get the customer list failed', async () => {
      jest
        .spyOn(httpClient, 'getRequest')
        .mockRejectedValue(MOCK_ERROR_RESPONSE);

      await expect(getCustomers()).rejects.toThrow(
        ERROR_MESSAGES.UNKNOWN_ERROR,
      );
    });
  });
});
