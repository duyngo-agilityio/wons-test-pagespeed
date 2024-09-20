import { render, waitFor } from '@testing-library/react';

// Pages
import CreateInvoicePage from '@/app/(dashboard)/create-invoice/page';

jest.mock('@/ui', () => ({
  CreateInvoice: () => <div data-testid="create-invoice">Create Invoice</div>,
}));

describe('CreateInvoice Page render', () => {
  it('should render and match with snapshot', async () => {
    const { container } = render(<CreateInvoicePage />);

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
