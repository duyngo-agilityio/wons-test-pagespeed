import { render } from '@testing-library/react';

// components
import Text from '@/components/common/Text';

describe('Text Component', () => {
  it('renders correctly with all custom props', () => {
    const component = render(
      <Text
        text="Fully Customized Text"
        size="xl"
        as="p"
        className="custom-class"
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
