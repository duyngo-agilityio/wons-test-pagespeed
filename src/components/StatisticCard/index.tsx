import { memo } from 'react';

// components
import { Card, Text } from '@/components';

interface StatisticCardProps {
  statistic: string;
  label: string;
  icon: React.ReactNode;
  lightBgColor: string;
  darkBgColor: string;
}

const StatisticCard = ({
  statistic,
  label,
  icon,
  lightBgColor,
  darkBgColor,
}: StatisticCardProps) => (
  <Card className="p-2 sm:p-4 xl:p-8 2xl:py-10 2xl:px-6 m-2 bg-white rounded-10 dark:bg-gray-400">
    <div className="flex items-center flex-wrap">
      <div
        className={`mr-2 sm:mr-4 rounded-full flex items-center justify-center w-[50px] sm:w-[63px] h-[50px] sm:h-[63px] min-w-[40px] sm:min-w-[50px] ${lightBgColor} ${darkBgColor}`}
        style={{
          width: '60px',
          height: '60px',
          minWidth: '45px',
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <Text
          text={statistic}
          className="font-bold text-[14px] sm:text-[18px] lg:text-[16px] xl:text-[24.06px] !text-blue-400 dark:!text-gray-850 leading-[31.33px]"
        />
        <Text
          text={label}
          className="!text-blue-400 dark:!text-gray-850 w-full truncate overflow-hidden whitespace-nowrap !text-[15.02px] leading-[19.56px]"
        />
      </div>
    </div>
  </Card>
);

export default memo(StatisticCard);
