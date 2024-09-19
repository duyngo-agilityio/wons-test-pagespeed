// UI
import InvoiceListActions from '../index';

describe('InvoiceListActions section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', () => {
    const { container } = testLibJestUtils.render(<InvoiceListActions />);

    expect(container).toMatchSnapshot();
  });
});
