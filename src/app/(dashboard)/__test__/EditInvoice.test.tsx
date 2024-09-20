import { render, waitFor } from '@testing-library/react';

import EditInvoicePage from '@/app/(dashboard)/edit-invoice/page';

jest.mock('@/ui', () => ({
  EditInvoice: () => <div data-testid="edit-invoice">Edit Invoice</div>,
}));

describe('Edit Invoice Page render', () => {
  it('should render and match with snapshot', async () => {
    const { container } = render(
      <EditInvoicePage
        searchParams={{
          id: 0,
        }}
      />,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
