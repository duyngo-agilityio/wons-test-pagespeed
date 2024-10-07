// Page
import SchedulePage from '../schedule/page';

jest.mock('@/layouts', () => ({
  DashBoardLayout: () => <div>DashBoardLayout</div>,
}));

describe('Schedule page', () => {
  it('should match snapshot', async () => {
    const { container } = testLibJestUtils.render(
      await SchedulePage({ searchParams: {} }),
    );

    expect(container).toMatchSnapshot();
  });
});
