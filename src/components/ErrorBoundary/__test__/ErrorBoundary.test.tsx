// Components
import ErrorBoundary from '../index';

const mockProps = {
  error: new Error('Test Error'),
  reset: jest.fn(),
};

describe('ErrorBoundary Component', () => {
  it('Should render ErrorBoundary Component correctly', () => {
    const component = testLibJestUtils.render(<ErrorBoundary {...mockProps} />);

    expect(component).toMatchSnapshot();
  });

  it('renders error message and calls reset function when  button is clicked', () => {
    const { getByText } = testLibJestUtils.render(
      <ErrorBoundary {...mockProps} />,
    );

    const tryAgainButton = getByText('Try again');
    testLibJestUtils.fireEvent.click(tryAgainButton);

    expect(mockProps.reset).toHaveBeenCalled();
  });
});
