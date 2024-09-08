// Mocks
import { MOCK_RECENT_SERVICES } from '@/mocks';

// Components
import RecentServicesTable from '../index';

describe('RecentServicesTable', () => {
  const renderComponent = () =>
    testLibJestUtils.render(
      <RecentServicesTable data={MOCK_RECENT_SERVICES} />,
    );

  it('match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
