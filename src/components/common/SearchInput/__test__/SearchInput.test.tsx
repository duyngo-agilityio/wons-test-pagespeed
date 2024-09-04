// Components
import SearchInput from '../index';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: () => () => 'John Deo',
  })),
  usePathname: jest.fn(),
}));

describe('SearchInput', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(<SearchInput />);

    expect(container).toMatchSnapshot();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('calls change values', async () => {
    const { container, getByPlaceholderText } = testLibJestUtils.render(
      <SearchInput />,
    );

    testLibJestUtils.fireEvent.change(getByPlaceholderText('Search'), {
      target: {
        value: 'John Deo',
      },
    });

    // Wait for it to add the input value
    jest.advanceTimersByTime(2000);

    expect(container).toMatchSnapshot();
  });

  it('changes empty value', async () => {
    const { container, getByPlaceholderText } = testLibJestUtils.render(
      <SearchInput />,
    );

    testLibJestUtils.fireEvent.change(getByPlaceholderText('Search'), {
      target: {
        value: 'John Deo',
      },
    });
    testLibJestUtils.fireEvent.change(getByPlaceholderText('Search'), {
      target: {
        value: '',
      },
    });

    // Wait for it to add the input value
    jest.advanceTimersByTime(2000);

    expect(container).toMatchSnapshot();
  });
});
