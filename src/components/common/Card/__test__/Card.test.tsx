// components
import Card from '../index';

describe('Card component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = testLibJestUtils.render(<Card />);
    expect(container).toMatchSnapshot();
  });
});
