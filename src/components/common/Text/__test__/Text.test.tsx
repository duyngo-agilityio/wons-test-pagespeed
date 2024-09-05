import { render } from '@testing-library/react';

// components
import Text from '../index';

describe('Text Component', () => {
  it('renders correctly with all custom props', () => {
    const component = render(
      <Text className="text-[40px]">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
        veniam doloribus dicta fuga sed soluta blanditiis sequi porro corrupti
        voluptatum adipisci, dolorum, quae fugiat atque? Aliquid dolorum modi
        architecto sapiente!
      </Text>,
    );
    expect(component).toMatchSnapshot();
  });
});
