import { DatePickerProps } from '@nextui-org/react';

// Components
import DatePicker from '..';

describe('DatePicker component', () => {
  const renderComponent = (props?: DatePickerProps) =>
    testLibJestUtils.render(<DatePicker {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
