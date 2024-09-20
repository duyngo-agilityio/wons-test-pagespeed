// Pages
import InvoiceListPage from '@/app/(dashboard)/invoices/page';

// Types
import { ISearchParams } from '@/types';

jest.mock('@/components', () => ({
  TableSkeleton: () => <div>Table Skeleton</div>,
}));

jest.mock('@/ui', () => ({
  InvoiceListActions: () => <div>InvoiceListActions</div>,
  InvoiceList: () => <div>InvoiceList</div>,
}));

jest.mock('@/layouts', () => ({
  DashBoardLayout: () => <div>DashBoardLayout</div>,
}));

describe('CustomerListPage render', () => {
  it('should render and match with snapshot', async () => {
    const { container } = testLibJestUtils.render(
      <InvoiceListPage searchParams={undefined as unknown as ISearchParams} />,
    );

    expect(container).toMatchSnapshot();
  });
});
