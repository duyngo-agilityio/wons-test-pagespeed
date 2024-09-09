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
  <Card className="p-2 sm:p-4 xl:p-8 2xl:p-10 m-2 bg-white shadow-lg rounded-10 dark:bg-gray-400 dark:shadow-none">
    <div className="flex items-center flex-wrap">
      <div
        className={`mr-2 sm:mr-4 rounded-full flex items-center justify-center w-[50px] sm:w-[63px] h-[50px] sm:h-[63px] min-w-[40px] sm:min-w-[50px] ${lightBgColor} ${darkBgColor}`}
        style={{
          width: '50px',
          height: '50px',
          minWidth: '40px',
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <Text
          text={statistic}
          className={`font-bold text-[14px] sm:text-[18px] lg:text-[24px] text-[${colors.blue[400]}] dark:text-gray-850 mb-2`}
        />
        <Text
          text={label}
          className={`font-normal text-blue-400 dark:text-gray-850`}
          size="xl"
        />
      </div>
    </div>
  </Card>
);

export default memo(StatisticCard);
