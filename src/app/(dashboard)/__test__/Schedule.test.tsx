// Page
import SchedulePage from '../schedule/page';

jest.mock('@/layouts', () => ({
  DashBoardLayout: () => <div>DashBoardLayout</div>,
}));

describe('Schedule page', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(<SchedulePage />);

    expect(container).toMatchSnapshot();
  });
});
