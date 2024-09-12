import { FunctionComponent } from 'react';
import { render, waitFor } from '@testing-library/react';

// api
import { getAllStatistics } from '@/api';

// components
import StatisticSection from '../index';

jest.mock('@/api', () => ({
  ...jest.requireActual('@/api'),
  getAllStatistics: jest.fn(),
}));

async function resolvedComponent(
  Component: FunctionComponent<unknown>,
  props: unknown,
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('StatisticSection component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all content with resolved data and match snapshot', async () => {
    (getAllStatistics as jest.Mock).mockResolvedValue({
      data: [
        {
          favoriteServices: 5,
          newSales: 10,
          newLeads: 15,
          referrals: 20,
        },
      ],
    });

    const StatisticSectionResolved = await resolvedComponent(
      StatisticSection,
      {},
    );
    const { container } = render(<StatisticSectionResolved />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should render NoProductAvailable when no data is available and match snapshot', async () => {
    (getAllStatistics as jest.Mock).mockResolvedValue({
      data: [],
    });

    const StatisticSectionResolved = await resolvedComponent(
      StatisticSection,
      {},
    );
    const { container } = render(<StatisticSectionResolved />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
