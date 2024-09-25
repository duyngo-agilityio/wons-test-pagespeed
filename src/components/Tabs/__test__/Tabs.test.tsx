// components
import Tabs from '../index';

// mocks
import { EVENT_TABS } from '@/mocks';

describe('CustomTabs component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = testLibJestUtils.render(<Tabs tabs={EVENT_TABS} />);
    expect(container).toMatchSnapshot();
  });
});
