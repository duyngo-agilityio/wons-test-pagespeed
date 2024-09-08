// Layouts
import { TableLayout } from '@/layouts';

// Mocks
import { MOCK_RECENT_SERVICES } from '@/mocks';

// Components
import { RecentServicesTable } from '@/components';

const RecentServicesSection = () => {
  return (
    <TableLayout>
      <RecentServicesTable data={MOCK_RECENT_SERVICES} />
    </TableLayout>
  );
};

export default RecentServicesSection;
