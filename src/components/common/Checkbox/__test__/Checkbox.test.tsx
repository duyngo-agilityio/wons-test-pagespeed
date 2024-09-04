import { render } from '@testing-library/react';

// components
import Checkbox from '../index';

describe('Checkbox component snapshot tests', () => {
  test('renders with default props', () => {
    const { container } = render(<Checkbox />);
    expect(container).toMatchSnapshot();
  });

  test('renders with custom color and afterBgColor', () => {
    const { container } = render(
      <Checkbox color="custom" afterBgColor="#ff6347" />,
    );

    const checkboxElement = container.firstChild;
    expect(checkboxElement).toMatchSnapshot;

    expect(container).toMatchSnapshot();
  });

  test('renders with default color and custom afterBgColor', () => {
    const { container } = render(<Checkbox afterBgColor="#32cd32" />);

    const checkboxElement = container.firstChild;
    expect(checkboxElement).toMatchSnapshot();

    expect(container).toMatchSnapshot();
  });
});
