// Components
import LoadingIndicator from '../index';

describe('LoadingIndicator component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', () => {
    const { container } = testLibJestUtils.render(<LoadingIndicator />);

    expect(container).toMatchSnapshot();
  });
});
