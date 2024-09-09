import { memo } from 'react';

// components
import { Card, Text } from '@/components';

// themes
import { colors } from '@/themes';

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
  <Card className="p-4 sm:p-6 m-2 bg-white shadow-lg rounded-10 dark:bg-gray-800 dark:shadow-none">
    <div className="flex items-center flex-wrap">
      <div
        className={`mr-4 rounded-full flex items-center justify-center w-[63px] h-[63px] min-w-[50px] ${lightBgColor} ${darkBgColor}`}
        style={{
          width: '63px',
          height: '63px',
          minWidth: '50px',
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <Text
          text={statistic}
          className={`font-bold text-[18px] sm:text-[24px] text-[${colors.blue[400]}] dark:text-gray-850 truncate`}
        />
        <Text
          text={label}
          className={`font-normal text-[16px] sm:text-[20px] text-blue-400 dark:text-gray-850  truncate`}
        />
      </div>
    </div>
  </Card>
);

export default memo(StatisticCard);
