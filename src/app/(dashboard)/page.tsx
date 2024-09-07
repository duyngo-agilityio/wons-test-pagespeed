'use client';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Constants
import { PAGE_TITLES } from '@/constants';
import { DatePicker } from '@/components';
import { ReactNode } from 'react';
import { parseAbsoluteToLocal } from '@internationalized/date';

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
        // Simulate date, you can remove it
        rightContent={renderDate()}
      >
        {/* Simulate content, you can remove it when add new content */}
        <div className="bg-black/50 w-full h-screen" />
      </DashBoardLayout>
    </main>
  );
};

export default DashboardPage;
