// Constants
import { PAGE_TITLES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import Calendar from '@/ui/calendar';

const CalendarPage = () => {
  return (
    <DashBoardLayout title={PAGE_TITLES.CALENDAR}>
      {/* TODO: add suspense for Calendar */}
      <Calendar />
    </DashBoardLayout>
  );
};

export default CalendarPage;
