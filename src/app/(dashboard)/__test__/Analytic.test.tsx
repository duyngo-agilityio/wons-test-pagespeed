// Page
import AnalyticsPage from '../analytics/page';

describe('analytic page', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(<AnalyticsPage />);

    expect(container).toMatchSnapshot();
  });
});
