import { render, waitFor } from '@testing-library/react';

// Pages
import CustomerListPage from '../customers/page';

jest.mock('@/components', () => ({
  CustomerDrawerWrapper: () => (
    <div data-testid="customer-drawer">Customer Drawer</div>
  ),
  TableSkeleton: () => <div data-testid="table-skeleton">Table Skeleton</div>,
}));

jest.mock('@/ui', () => ({
  CustomerList: () => <div data-testid="customer-list">Customer List</div>,
}));

describe('CustomerListPage render', () => {
  it('should render and match with snapshot', async () => {
    const { container } = render(<CustomerListPage />);

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
