// UI
import RecentServicesSection from '../index';

describe('RecentServicesSection', () => {
  const renderUI = () => testLibJestUtils.render(<RecentServicesSection />);
  it('should match snapshot', () => {
    const { container } = renderUI();

    expect(container).toMatchSnapshot();
  });
});
