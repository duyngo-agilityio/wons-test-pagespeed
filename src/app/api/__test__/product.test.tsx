// api
import { getAllProducts } from '@/app/api';

// services
import { httpClient } from '@/services';

// mocks
import { mockProducts } from '@/mocks';

// constants
import { ERROR_MESSAGES } from '@/constants';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    getRequest: jest.fn(),
  },
}));

describe('getAllProducts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return top 2 products when API call is successful', async () => {
    const mockResponse = {
      data: [mockProducts[0], mockProducts[1], mockProducts[2]],
    };

    (httpClient.getRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAllProducts();

    expect(result.data).toHaveLength(2);

    expect(result.data[0].attributes.rating).toBeGreaterThanOrEqual(
      result.data[1].attributes.rating,
    );

    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array when no products are found', async () => {
    const mockResponse = {
      data: [],
    };

    (httpClient.getRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAllProducts();

    expect(result.data).toHaveLength(0);
    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the API call fails', async () => {
    const mockError = new Error('API Error');
    (httpClient.getRequest as jest.Mock).mockRejectedValue(mockError);

    await expect(getAllProducts()).rejects.toThrow(ERROR_MESSAGES.FETCH);
    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });
});
