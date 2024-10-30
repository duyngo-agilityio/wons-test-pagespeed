import { CUSTOMER_MOCK } from '@/mocks';
import CustomerDetails from '../index';
import { ICustomer } from '@/models';

describe('CustomerDetails', () => {
  const renderComponent = (
    props?: Record<string, boolean | ICustomer | undefined>,
  ) =>
    testLibJestUtils.render(
      <CustomerDetails customer={CUSTOMER_MOCK[0]} {...props} />,
    );
  it('should match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with loading', () => {
    const { container } = renderComponent({
      isLoading: true,
    });

    expect(container).toMatchSnapshot();
  });
});
