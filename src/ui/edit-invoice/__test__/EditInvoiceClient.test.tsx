// Mocks
import { MOCK_INVOICES_WITH_CUSTOMER } from '@/mocks';

// Actions
import EditInvoiceClient from '../EditInvoiceClient';
import { act } from 'react';

// jest.mock('@/actions', () => ({
//   ...jest.requireActual('@/actions'),
//   updateInvoice: jest.fn(),
// }));

const originalFetch = global.fetch;

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      redirected: false,
      statusText: 'OK',
      type: 'basic',
      url: '',
      clone: jest.fn(),
      body: null,
      bodyUsed: false,
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
      text: jest.fn(),
    } as Response),
  );
});

afterAll(() => {
  global.fetch = originalFetch;
});

describe('EditInvoiceClient section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockOnEditInvoice = jest.fn();

  const renderComponent = (props = {}) =>
    testLibJestUtils.render(
      <EditInvoiceClient
        invoice={{
          id: MOCK_INVOICES_WITH_CUSTOMER[0].id,
          ...MOCK_INVOICES_WITH_CUSTOMER[0].attributes,
          customerId:
            MOCK_INVOICES_WITH_CUSTOMER[0].attributes.customer.data.id.toString(),
        }}
        invoiceProducts={[]}
        customers={[]}
        products={[]}
        onEditInvoice={mockOnEditInvoice}
        {...props}
      />,
    );

  it('should match with snapshot', async () => {
    const { container } = renderComponent();

    await act(async () => {
      expect(container).toMatchSnapshot();
    });
  });
});
