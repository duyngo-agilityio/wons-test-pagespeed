// Pages
import CustomerListPage from '../customers/page';
import { ISearchParams } from '@/types';

jest.mock('@/components', () => ({
  CustomerDrawerWrapper: () => (
    <div data-testid="customer-drawer">Customer Drawer</div>
  ),
  TableSkeleton: () => <div data-testid="table-skeleton">Table Skeleton</div>,
}));

jest.mock('@/ui', () => ({
  CustomerList: () => <div data-testid="customer-list">Customer List</div>,
}));

jest.mock('@/layouts', () => ({
  DashBoardLayout: () => <div>DashBoardLayout</div>,
}));

describe('CustomerListPage render', () => {
  it('should render and match with snapshot', async () => {
    const { container } = testLibJestUtils.render(
      <CustomerListPage searchParams={undefined as unknown as ISearchParams} />,
    );

    expect(container).toMatchSnapshot();
  });
});
