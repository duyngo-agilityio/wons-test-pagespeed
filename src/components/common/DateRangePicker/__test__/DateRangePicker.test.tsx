import { DateRangePickerProps } from '@nextui-org/react';
import { parseAbsoluteToLocal } from '@internationalized/date';

// Components
import DateRangePicker from '../index';

const mockOnClick = jest.fn();

describe('DateRangePicker', () => {
  const renderComponent = (props?: DateRangePickerProps) =>
    testLibJestUtils.render(
      <DateRangePicker
        onClick={mockOnClick}
        maxValue={parseAbsoluteToLocal('2024-09-07T18:45:22Z')}
        {...props}
      />,
    );

  afterEach(() => {
    mockOnClick.mockClear();
  });

  it('match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
