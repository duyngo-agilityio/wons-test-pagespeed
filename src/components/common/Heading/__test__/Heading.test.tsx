import { render } from '@testing-library/react';

//
import Heading from '../index';

describe('Heading Component', () => {
  it('renders correctly with all custom props', () => {
    const component = render(
      <Heading
        title="Fully Customized Heading"
        size="xl"
        as="h4"
        className="custom-class"
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
