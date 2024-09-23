import { render, waitFor } from '@testing-library/react';
import { FunctionComponent } from 'react';

// components
import CustomerList from '../CustomerList';

// mocks
import { CUSTOMER_MOCK } from '@/mocks';

// apis
import { getCustomers } from '@/api';

jest.mock('@/api', () => ({
  ...jest.requireActual('@/api'),
  getCustomers: jest.fn(),
}));

async function resolvedComponent<T>(Component: FunctionComponent<T>, props: T) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('Customer List component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all content with resolved data and match snapshot', async () => {
    (getCustomers as jest.Mock).mockResolvedValue({
      data: CUSTOMER_MOCK,
    });
    const CustomerListResolved = await resolvedComponent(CustomerList, {});
    const { container } = render(<CustomerListResolved />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
