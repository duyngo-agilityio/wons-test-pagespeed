import { render } from '@testing-library/react';

// Mocks
import { MOCK_USERS } from '@/mocks';

// Components
import CalendarEventForm from '..';

describe('CalendarEventForm', () => {
  const mockDate = new Date(2024, 1, 1);
  const mockTimeRange = { start: '05:00am', end: '07:00am' };
  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn();

  it('render successful', () => {
    const { container } = render(
      <CalendarEventForm
        eventTitle="example title"
        date={mockDate}
        timeRange={mockTimeRange}
        user={MOCK_USERS[0]}
        previewData={null}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        repeatSetting="does not repeat"
      />,
    );

    // Check if the container is in the document
    expect(container).toBeInTheDocument();

    // Match the snapshot
    expect(container).toMatchSnapshot();
  });
});
