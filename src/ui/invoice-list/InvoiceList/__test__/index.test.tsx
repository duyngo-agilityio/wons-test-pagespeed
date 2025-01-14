// UI
import InvoiceList, { TInvoiceListProps } from '../index';

// Mocks
import { MOCK_INVOICES_RESPONSE } from '@/mocks/invoice';

// Types
import { TInvoiceListResponse } from '@/types/invoice';

// APIs
import { getInvoices } from '@/api/invoice';

jest.mock('@/api/invoice', () => ({
  ...jest.requireActual('@/api/invoice'),
  getInvoices: jest.fn(),
}));

describe('InvoiceList section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = async (props?: TInvoiceListProps) =>
    testLibJestUtils.render(await InvoiceList({ ...props }));

  it('should match with snapshot', async () => {
    (getInvoices as jest.MockedFn<typeof getInvoices>).mockResolvedValue(
      MOCK_INVOICES_RESPONSE,
    );
    const { container } = await renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with response is null when get invoice list', async () => {
    (getInvoices as jest.MockedFn<typeof getInvoices>).mockResolvedValue(
      null as unknown as TInvoiceListResponse,
    );
    const { container } = await renderComponent();

    expect(container).toMatchSnapshot();
  });
});
