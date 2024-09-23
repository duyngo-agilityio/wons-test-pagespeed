// Mocks
import { MOCK_CUSTOMERS_WITH_ATTRIBUTES } from '@/mocks';

// Components
import CustomerListClient, {
  TCustomerListClientProps,
} from '../CustomerListClient';

const mockShowToast = jest.fn();
jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useToast: () => ({ showToast: mockShowToast }),
}));

const mockReplace = jest.fn();
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ replace: mockReplace, push: mockPush })),
}));

describe('CustomerListClient section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props?: Partial<TCustomerListClientProps>) =>
    testLibJestUtils.render(
      <CustomerListClient
        customerList={MOCK_CUSTOMERS_WITH_ATTRIBUTES}
        pageCount={1}
        {...props}
      />,
    );

  it('should match with snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
