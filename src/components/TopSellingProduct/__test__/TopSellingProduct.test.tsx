import TopSellingProducts from '../index';

describe('TopSellingProducts component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = testLibJestUtils.render(<TopSellingProducts />);
    expect(container).toMatchSnapshot();
  });
});
