import { render } from '@testing-library/react';

// components
import Input from '../index';

describe('Input Component', () => {
  it('renders correctly with all custom props', () => {
    const component = render(
      <Input
        label="Input Label"
        name="inputName"
        labelPlacement={'outside'}
        placeholder="Input Placeholder"
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
