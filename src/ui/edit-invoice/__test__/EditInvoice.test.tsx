import { render, waitFor } from '@testing-library/react';
import { FunctionComponent } from 'react';

// components

// apis
import { getCustomers, getInvoiceById, getProducts } from '@/api';

// mocks
import {
  MOCK_PRODUCTS_WITH_STRAPI_MODEL,
  CUSTOMER_MOCK,
  MOCK_INVOICES_WITH_CUSTOMER,
} from '@/mocks';
import { EditInvoice } from '@/ui';

jest.mock('@/api', () => ({
  ...jest.requireActual('@/api'),
  getProducts: jest.fn(),
  getCustomers: jest.fn(),
  getInvoiceById: jest.fn(),
}));

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

async function resolvedComponent<T>(Component: FunctionComponent<T>, props: T) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('EditInvoice Component Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all content with resolved data and match snapshot', async () => {
    (getProducts as jest.Mock).mockResolvedValue({
      data: MOCK_PRODUCTS_WITH_STRAPI_MODEL,
    });

    (getCustomers as jest.Mock).mockResolvedValue({
      data: CUSTOMER_MOCK,
    });

    (getInvoiceById as jest.Mock).mockResolvedValue({
      data: {
        ...MOCK_INVOICES_WITH_CUSTOMER[0],
        data: MOCK_INVOICES_WITH_CUSTOMER,
      },
    });

    const EditInvoiceResolved = await resolvedComponent(EditInvoice, {
      id: 1,
    });
    const { container } = render(<EditInvoiceResolved />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
