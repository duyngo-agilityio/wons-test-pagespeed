import { render } from '@testing-library/react';

// Components
import CalendarEventForm from '../index';

describe('CalendarEventForm', () => {
  const mockDate = new Date(2024, 1, 1);
  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn();

  it('render successful', () => {
    const { container } = render(
      <CalendarEventForm
        eventTitle="example title"
        date={mockDate}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
      />,
    );

    // Match the snapshot
    expect(container).toMatchSnapshot();
  });
});
