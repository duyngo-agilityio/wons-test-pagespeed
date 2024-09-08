'use client';

import { ReactNode } from 'react';
import { parseAbsoluteToLocal } from '@internationalized/date';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { RecentServicesSection } from '@/ui';

// Constants
import { PAGE_TITLES } from '@/constants';

// Components
import { DatePicker } from '@/components';

const DashboardPage = () => {
  const renderDate = (): ReactNode => (
    <div className="flex gap-4">
      <DatePicker
        granularity="day"
        defaultValue={parseAbsoluteToLocal('2024-09-07T18:45:22Z')}
      />
      <DatePicker
        granularity="day"
        defaultValue={parseAbsoluteToLocal('2024-09-14T18:45:22Z')}
      />
    </div>
  );

  return (
    <main>
      <DashBoardLayout
        title={PAGE_TITLES.DASHBOARD}
        rightContent={renderDate()}
      >
        <RecentServicesSection />
      </DashBoardLayout>
    </main>
  );
};

export default DashboardPage;
