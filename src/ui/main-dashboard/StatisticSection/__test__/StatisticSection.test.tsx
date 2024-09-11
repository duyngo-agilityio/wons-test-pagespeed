// components
import StatisticSection from '../index';

describe('StatisticSection component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = testLibJestUtils.render(<StatisticSection />);
    expect(container).toMatchSnapshot();
  });
});
