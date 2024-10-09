import { render } from '@testing-library/react';

// components
import Text from '../index';

describe('Text Component', () => {
  it('renders correctly with all custom props', () => {
    const component = render(
      <Text
        className="text-[40px]"
        text="Lorem, ipsum dolor sit amet consectetur adipisicing elit"
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
