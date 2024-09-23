// UI
import CustomerActions from '../CustomerActions';

describe('CustomerActions section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', async () => {
    const { container } = testLibJestUtils.render(await CustomerActions());

    expect(container).toMatchSnapshot();
  });
});
