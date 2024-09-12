// Mocks
import { MOCK_INVOICES } from '@/mocks';

// Components
import RecentServicesTable from '../index';

describe('RecentServicesTable', () => {
  const renderComponent = () =>
    testLibJestUtils.render(<RecentServicesTable data={MOCK_INVOICES} />);

  it('match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
