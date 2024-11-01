// Libs
import { fireEvent, screen } from '@testing-library/react';

import { CalendarProps } from '@nextui-org/react';

// Libraries
import { CalendarDate } from '@internationalized/date';

// Components
import { CustomCalendar } from '@/components/common';

describe('Calendar', () => {
  const onDateSelectMock = jest.fn();
  const todayDate = new CalendarDate(2024, 11, 1);

  const renderComponent = (props?: CalendarProps) =>
    testLibJestUtils.render(
      <CustomCalendar
        value={todayDate}
        onDateSelect={onDateSelectMock}
        {...props}
      />,
    );

  afterEach(() => {
    onDateSelectMock.mockClear();
  });

  it('render calendar correctly', () => {
    const { container } = renderComponent();

    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('date change successfully', async () => {
    renderComponent();

    const dateButton = await screen.findByLabelText(
      'Saturday, November 2, 2024',
    );

    fireEvent.click(dateButton);

    expect(onDateSelectMock).toHaveBeenCalled();
  });
});
