import { ButtonProps } from '@nextui-org/react';

// Components
import { Button } from '@/components';

describe('Button', () => {
  const mockOnClick = jest.fn();
  const renderComponent = (props?: ButtonProps) =>
    testLibJestUtils.render(
      <Button onClick={mockOnClick} {...props}>
        Test
      </Button>,
    );

  afterEach(() => {
    mockOnClick.mockClear();
  });

  it('match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('calls click', () => {
    const { getByText } = renderComponent();

    testLibJestUtils.fireEvent.click(getByText('Test'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('not call click', () => {
    const { getByText } = renderComponent({
      isDisabled: true,
    });

    testLibJestUtils.fireEvent.click(getByText('Test'));

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
