import { useMemo } from 'react';

import { Skeleton } from '@nextui-org/react';

const CalendarSkeleton = () => {
  const renderNextBackBtnSkeleton = useMemo(
    () => (
      <div className="flex gap-2">
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>
    ),
    [],
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="w-28 md:w-32 h-10 rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="w-7 md:w-14 h-10 rounded-md" />
          <Skeleton className="w-7 md:w-14  h-10 rounded-md" />
          <Skeleton className="w-7 md:w-14  h-10 rounded-md" />
        </div>
      </div>
      <div className="flex">
        <div className="hidden md:flex pr-[18px] md:pr-[28px] py-3 md:py-[32px] rounded-[5px] md:flex-col justify-between">
          <Skeleton className="w-[250px] h-[250px] rounded-lg mb-6" />
          <Skeleton className="w-[120px] h-10 rounded-md ml-16" />
        </div>
        <div className="flex flex-col w-full min-h-[530px] md:min-h-[700px] p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="w-[150px] md:w-24 h-10 rounded-md" />
            {renderNextBackBtnSkeleton}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4 flex-1">
            {/* Render skeletons for calendar days */}
            {Array.from({ length: 35 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSkeleton;
