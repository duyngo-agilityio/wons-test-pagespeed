jest.mock('@/components', () => ({
  TableSkeleton: () => <div>Table Skeleton</div>,
}));

jest.mock('@/layouts', () => ({
  DashBoardLayout: () => <div>DashBoardLayout</div>,
}));

// Pages
import InvoiceDetailsPage from '../invoices/[id]/page';

describe('InvoiceDetails', () => {
  it('should match sanpshot', () => {
    const { container } = testLibJestUtils.render(
      <InvoiceDetailsPage params={{ id: 10 }} />,
    );

    expect(container).toMatchSnapshot();
  });
});
