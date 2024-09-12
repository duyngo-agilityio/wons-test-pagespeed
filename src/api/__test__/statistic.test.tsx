import { httpClient } from '@/services';
import { getAllStatistics } from '../statistic';

jest.mock('@/services', () => ({
  httpClient: {
    getRequest: jest.fn(),
  },
}));

describe('getAllStatistics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return statistics data when API call is successful', async () => {
    const mockStatisticsResponse = {
      data: [
        {
          attributes: {
            favoriteServices: 20,
            newSales: 178,
            newLeads: 40,
            referrals: 50,
          },
        },
      ],
    };

    (httpClient.getRequest as jest.Mock).mockResolvedValue(
      mockStatisticsResponse,
    );

    const result = await getAllStatistics();

    expect(result).toEqual({
      data: [
        {
          favoriteServices: 20,
          newSales: 178,
          newLeads: 40,
          referrals: 50,
        },
      ],
    });
  });

  it('should return an empty array when no data is available', async () => {
    const mockEmptyResponse = { data: [] };
    (httpClient.getRequest as jest.Mock).mockResolvedValue(mockEmptyResponse);

    const result = await getAllStatistics();

    expect(result).toEqual({ data: [] });
  });

  it('should throw an error when the API call fails', async () => {
    const mockError = new Error('API Error');
    (httpClient.getRequest as jest.Mock).mockRejectedValue(mockError);
    const result = await getAllStatistics();
    expect(result.error).toBeDefined();

    expect(httpClient.getRequest).toHaveBeenCalledTimes(1);
  });
});
