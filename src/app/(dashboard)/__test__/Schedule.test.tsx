// Page
import SchedulePage from '../schedule/page';

describe('Schedule page', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(<SchedulePage />);

    expect(container).toMatchSnapshot();
  });
});
