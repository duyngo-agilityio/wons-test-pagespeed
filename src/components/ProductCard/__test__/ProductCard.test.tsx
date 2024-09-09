// components
import ProductCard from '../index';

describe('ProductCard component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = testLibJestUtils.render(
      <ProductCard
        url="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        alt="Shoe image"
        title="Web Development"
        price={87}
        rating={4}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
