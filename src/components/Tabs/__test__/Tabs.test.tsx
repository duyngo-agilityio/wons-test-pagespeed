// components
import Tabs from '../index';

// mocks
import { eventTabs } from '@/mocks';

describe('CustomTabs component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = testLibJestUtils.render(<Tabs tabs={eventTabs} />);
    expect(container).toMatchSnapshot();
  });
});
