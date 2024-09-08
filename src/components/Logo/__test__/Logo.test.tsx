// Components
import Logo from '../index';

describe('Logo component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = testLibJestUtils.render(<Logo />);

    expect(container).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const { container } = testLibJestUtils.render(<Logo size="sm" />);

    expect(container).toMatchSnapshot();
  });
});
