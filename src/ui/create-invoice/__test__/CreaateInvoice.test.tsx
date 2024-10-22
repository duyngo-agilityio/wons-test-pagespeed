import { render, waitFor } from '@testing-library/react';
import { FunctionComponent } from 'react';

// components
import CreateInvoice from '../index';

// apis
import { getCustomers, getProducts } from '@/api';

// mocks
import { mockProducts, CUSTOMER_MOCK } from '@/mocks';

jest.mock('@/api', () => ({
  ...jest.requireActual('@/api'),
  getProducts: jest.fn(),
  getCustomers: jest.fn(),
}));

async function resolvedComponent(
  Component: FunctionComponent<unknown>,
  props: unknown,
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}
describe('CreateInvoice Component Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render all content with resolved data and match snapshot', async () => {
    (getProducts as jest.Mock).mockResolvedValue({
      mockProducts,
    });

    (getCustomers as jest.Mock).mockResolvedValue({
      data: CUSTOMER_MOCK,
    });

    const CreateInvoiceResolved = await resolvedComponent(CreateInvoice, {});
    const { container } = render(<CreateInvoiceResolved />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should render content with empty', async () => {
    (getProducts as jest.Mock).mockResolvedValue({
      mockProducts: [],
    });

    (getCustomers as jest.Mock).mockResolvedValue({
      CUSTOMER_MOCK: [],
    });

    const CreateInvoiceResolved = await resolvedComponent(CreateInvoice, {});
    const { container } = render(<CreateInvoiceResolved />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
