// Constants
import { FILTER_OPTIONS } from '@/constants';

// Components
import Filter from '../index';

describe('Filter component', () => {
  const renderComponent = () =>
    testLibJestUtils.render(<Filter title="Filter" items={FILTER_OPTIONS} />);

  it('should match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
