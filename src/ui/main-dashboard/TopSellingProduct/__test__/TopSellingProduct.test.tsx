import { FunctionComponent } from 'react';
import { render, waitFor } from '@testing-library/react';

// components
import TopSellingProducts from '../index';

// apis
import { getAllProducts } from '@/api';

// mocks
import { mockProducts } from '@/mocks';

jest.mock('@/api', () => ({
  ...jest.requireActual('@/api'),
  getAllProducts: jest.fn(),
}));

async function resolvedComponent(
  Component: FunctionComponent<unknown>,
  props: unknown,
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('TopSellingProducts component', () => {
  it('renders correctly and matches snapshot', async () => {
    (getAllProducts as jest.Mock).mockResolvedValue({
      data: mockProducts,
    });

    const TopSellingProductsResolved = await resolvedComponent(
      TopSellingProducts,
      {},
    );
    const { container } = render(<TopSellingProductsResolved />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
