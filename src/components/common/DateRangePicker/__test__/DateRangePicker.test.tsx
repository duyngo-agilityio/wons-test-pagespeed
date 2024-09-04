import { DateRangePickerProps } from '@nextui-org/react';

// Components
import DateRangePicker from '../index';

const mockOnClick = jest.fn();

describe('DateRangePicker', () => {
  const renderComponent = (props?: DateRangePickerProps) =>
    testLibJestUtils.render(
      <DateRangePicker onClick={mockOnClick} {...props} />,
    );

  afterEach(() => {
    mockOnClick.mockClear();
  });

  it('match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
