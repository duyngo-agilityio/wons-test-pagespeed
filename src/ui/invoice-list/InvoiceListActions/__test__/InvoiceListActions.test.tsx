// UI
import InvoiceListActions from '../index';

describe('InvoiceListActions section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', async () => {
    const { container } = testLibJestUtils.render(await InvoiceListActions());

    expect(container).toMatchSnapshot();
  });
});
