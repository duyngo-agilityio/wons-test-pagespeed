// Pages
import InvoiceDetailsPage from '../invoices/[id]/page';

jest.mock('@/layouts', () => ({
  DashBoardLayout: () => <div>DashBoardLayout</div>,
}));

describe('InvoiceDetails', () => {
  it('should match sanpshot', () => {
    const { container } = testLibJestUtils.render(
      <InvoiceDetailsPage params={{ id: 10 }} />,
    );

    expect(container).toMatchSnapshot();
  });
});
