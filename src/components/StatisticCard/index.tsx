import { memo } from 'react';

// components
import { Card, Text } from '@/components';

// themes
import { colors } from '@/themes';

interface StatisticCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  bgColor?: string;
}

const StatisticCard = ({ value, label, icon, bgColor }: StatisticCardProps) => {
  return (
    <Card className="p-6 m-2 bg-white shadow-lg rounded-lg">
      <div className="flex items-center">
        <div
          className="mr-4 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: bgColor || colors.gray[200],
            width: '63.38px',
            height: '63.38px',
          }}
        >
          {icon}
        </div>
        <div>
          <Text
            text={value}
            className={`font-bold text-[24.06px] text-[${colors.blue[400]}]`}
          />
          <Text
            text={String(label)}
            className={`font-normal text-[${colors.blue[400]}]`}
          />
        </div>
      </div>
    </Card>
  );
};

export default memo(StatisticCard);
