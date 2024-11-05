// api
import { getAllProducts, getProducts } from '../product';

// services
import { httpClient } from '@/services';

// mocks
import { MOCK_PRODUCTS_WITH_STRAPI_MODEL } from '@/mocks';

// Constants
import { LIMIT_NUMBERS } from '@/constants';

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
      data: [
        MOCK_PRODUCTS_WITH_STRAPI_MODEL[0],
        MOCK_PRODUCTS_WITH_STRAPI_MODEL[1],
      ],
    };

    (httpClient.getRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAllProducts({
      limitNumber: LIMIT_NUMBERS.TOP_SELLING_PRODUCTS,
    });

    expect(result.data).toHaveLength(2);

    expect(result.data?.[0]?.attributes.rating).toBeGreaterThanOrEqual(
      result.data?.[1]?.attributes.rating ?? 0,
    );

    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });

  it('should get the task list undefined', async () => {
    jest.spyOn(httpClient, 'getRequest').mockResolvedValue({});

    const response = await getAllProducts({
      limitNumber: LIMIT_NUMBERS.TOP_SELLING_PRODUCTS,
    });

    expect(response).toEqual({ data: [] });
  });

  it('should return an empty array when no products are found', async () => {
    const mockResponse = {
      data: [],
    };

    (httpClient.getRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAllProducts({
      limitNumber: LIMIT_NUMBERS.TOP_SELLING_PRODUCTS,
    });

    expect(result.data).toHaveLength(0);
    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });
  it('should return an error when the API call fails', async () => {
    const mockError = new Error('API Error');

    (httpClient.getRequest as jest.Mock).mockRejectedValue(mockError);

    const result = await getAllProducts({
      limitNumber: LIMIT_NUMBERS.TOP_SELLING_PRODUCTS,
    });

    expect(result.error).toBeDefined();

    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });
});

describe('getProducts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return top getProducts when API call is successful', async () => {
    const mockResponse = {
      data: [mockProducts[0], mockProducts[1]],
    };

    (httpClient.getRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getProducts();

    expect(result.data).toHaveLength(2);

    expect(result.data?.[0]?.attributes.rating).toBeGreaterThanOrEqual(
      result.data?.[1]?.attributes.rating ?? 0,
    );

    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });

  it('should get the task list undefined', async () => {
    jest.spyOn(httpClient, 'getRequest').mockResolvedValue({});

    const response = await getProducts();

    expect(response).toEqual({ data: [] });
  });

  it('should return an error when the API call fails', async () => {
    const mockError = new Error('API Error');

    (httpClient.getRequest as jest.Mock).mockRejectedValue(mockError);

    const result = await getProducts();

    expect(result.error).toBeDefined();

    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });
});
