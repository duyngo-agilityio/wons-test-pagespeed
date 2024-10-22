// Pages
import SettingsPage from '../settings/page';

jest.mock('@/layouts', () => ({
  DashBoardLayout: () => <div>DashBoardLayout</div>,
}));

describe('Setting Page', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(<SettingsPage />);

    expect(container).toMatchSnapshot();
  });
});
