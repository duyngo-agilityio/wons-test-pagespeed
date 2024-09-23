// UI
import CustomerActions from '../CustomerActions';

describe('CustomerActions section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', () => {
    const { container } = testLibJestUtils.render(
      <CustomerActions onToggleDrawer={() => {}} />,
    );

    expect(container).toMatchSnapshot();
  });
});
