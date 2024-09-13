// Mocks
import { MOCK_INVOICES } from '@/mocks';

// Services
import { httpClient } from '@/services';

// UI
import RecentServicesSection from '../index';

jest.mock('next/navigation', () => ({
  ...jest.requireActual,
  notFound: jest.fn().mockReturnValue('not found'),
}));

jest.mock('@/services', () => ({
  httpClient: {
    getRequest: jest.fn(),
  },
}));

describe('RecentServicesSection', () => {
  const renderUI = async () =>
    testLibJestUtils.render(
      await RecentServicesSection({
        searchParams: {
          sortBy: '',
          order: '',
        },
      }),
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    (httpClient.getRequest as jest.Mock).mockResolvedValue({
      data: MOCK_INVOICES,
    });

    const { container } = await renderUI();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with notFound', async () => {
    (httpClient.getRequest as jest.Mock).mockResolvedValue({ data: [] });

    await expect(renderUI()).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
