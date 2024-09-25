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

  it('should match with snapshot', async () => {
    const { container } = renderComponent();

    await testLibJestUtils.waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it('open customer details drawer', async () => {
    const { container } = renderComponent();

    await testLibJestUtils.waitFor(() => {
      testLibJestUtils.fireEvent.click(
        container.querySelector('[data-key="1"]') as Element,
      );
    });

    // Await drawer appear
    await testLibJestUtils.waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
