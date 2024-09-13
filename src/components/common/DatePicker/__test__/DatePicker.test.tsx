import { DatePickerProps } from '@nextui-org/react';
import { parseAbsoluteToLocal } from '@internationalized/date';

// Components
import DatePicker from '..';

describe('DatePicker component', () => {
  const renderComponent = (props?: DatePickerProps) =>
    testLibJestUtils.render(
      <DatePicker
        value={parseAbsoluteToLocal('2024-09-07T18:45:22Z')}
        {...props}
      />,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('should match with snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
