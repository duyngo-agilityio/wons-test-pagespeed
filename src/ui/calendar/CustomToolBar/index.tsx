'use client';

import { memo, useCallback } from 'react';
import { Navigate, ToolbarProps, Views } from 'react-big-calendar';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

import { Button, Text } from '@/components';

const CustomToolBar = ({ label, view, onView, onNavigate }: ToolbarProps) => {
  const handleViewDay = useCallback(() => onView(Views.DAY), [onView]);

  const handleViewWeek = useCallback(() => onView(Views.WEEK), [onView]);

  const handleViewMonth = useCallback(() => onView(Views.MONTH), [onView]);

  const handleBack = useCallback(
    () => onNavigate(Navigate.PREVIOUS),
    [onNavigate],
  );

  const handleNext = useCallback(() => onNavigate(Navigate.NEXT), [onNavigate]);

  return (
    <div>
      <div className="flex gap-5 absolute right-0 top-[-66px]">
        <Button
          color="primary"
          className={
            view === Views.DAY
              ? `bg-blue-500 `
              : `bg-blue-500/5 text-blue-800/70 dark:text-white dark:bg-purple-600/30`
          }
          onClick={handleViewDay}
        >
          Day
        </Button>
        <Button
          color="primary"
          onClick={handleViewWeek}
          className={
            view === Views.WEEK
              ? `bg-blue-500 `
              : `bg-blue-500/5 text-blue-800/70 dark:text-white dark:bg-purple-600/30`
          }
        >
          Week
        </Button>
        <Button
          color="primary"
          onClick={handleViewMonth}
          className={
            view === Views.MONTH
              ? `bg-blue-500`
              : `bg-blue-500/5 text-blue-800/70 dark:text-white dark:bg-purple-600/30`
          }
        >
          Month
        </Button>
      </div>
      <div className="flex pl-[15px] pr-[21px] py-[15px] rounded-tl-[10px] rounded-tr-[10px] bg-white justify-between dark:bg-gray-400">
        <div>
          <Text text={label} />
        </div>
        <div className="flex gap-[15px] justify-between">
          <FaCaretLeft
            onClick={handleBack}
            className="text-blue-800/50 cursor-pointer dark:text-white/50"
          />
          <FaCaretRight
            onClick={handleNext}
            className="text-blue-800/50 cursor-pointer dark:text-white/50"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(CustomToolBar);
