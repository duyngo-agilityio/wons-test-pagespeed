import { revalidateTag } from 'next/cache';

// services
import { httpClient } from '@/services';

// utils
import { formatErrorMessage } from '@/utils';

// constants
import { API_PATH } from '@/constants';

// models
import { ICustomer } from '@/models';

// actions
import { createCustomer } from '@/actions/customer';

jest.mock('@/services', () => ({
  httpClient: {
    postRequest: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

describe('createCustomer', () => {
  const MOCK_API_PATH = API_PATH.CUSTOMERS;

  const CUSTOMER_FORM_DATA_MOCK: Partial<ICustomer> = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new customer successfully', async () => {
    (httpClient.postRequest as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        ...CUSTOMER_FORM_DATA_MOCK,
      },
    });

    const result = await createCustomer(CUSTOMER_FORM_DATA_MOCK);

    expect(httpClient.postRequest).toHaveBeenCalledWith({
      endpoint: MOCK_API_PATH,
      body: {
        data: {
          ...CUSTOMER_FORM_DATA_MOCK,
          fullName: `${CUSTOMER_FORM_DATA_MOCK.firstName} ${CUSTOMER_FORM_DATA_MOCK.lastName}`,
        },
      },
    });

    expect(revalidateTag).toHaveBeenCalledWith(MOCK_API_PATH);
    expect(result).toEqual({ success: true });
  });

  it('should return an error message when creating a customer fails', async () => {
    const MOCK_ERROR = new Error('Request failed');
    (httpClient.postRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await createCustomer(CUSTOMER_FORM_DATA_MOCK);

    expect(httpClient.postRequest).toHaveBeenCalledWith({
      endpoint: MOCK_API_PATH,
      body: {
        data: {
          ...CUSTOMER_FORM_DATA_MOCK,
          fullName: `${CUSTOMER_FORM_DATA_MOCK.firstName} ${CUSTOMER_FORM_DATA_MOCK.lastName}`,
        },
      },
    });

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
    expect(result).toEqual({ error: 'Something went wrong.' });
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
