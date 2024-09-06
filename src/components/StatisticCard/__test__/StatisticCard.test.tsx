// components
import StatisticCard from '../index';

// icons
import { FaHeart } from 'react-icons/fa';

describe('Text Component', () => {
  it('renders correctly with all custom props', () => {
    const component = testLibJestUtils.render(
      <StatisticCard
        value="100+"
        label="Favorite Services"
        icon={<FaHeart className="h-8 w-8 text-blue-500" />}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
