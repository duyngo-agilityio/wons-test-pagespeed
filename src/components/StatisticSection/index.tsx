// icons
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { IoGameControllerSharp } from 'react-icons/io5';
import { MdWork } from 'react-icons/md';

// components
import { StatisticCard } from '@/components';

// models
import { IStatistic } from '@/models';

const StatisticSection = () => {
  const statisticData: IStatistic[] = [
    {
      value: '178+',
      label: 'Favorite Services',
      icon: <FaHeart className="h-6 w-6 text-blue-500" />,
      lightBgColor: 'bg-gray-50',
      darkBgColor: 'dark:bg-[#4a5463]',
    },
    {
      value: '20+',
      label: 'New Sales',
      icon: <IoGameControllerSharp className="h-6 w-6 text-teal-500" />,
      lightBgColor: 'bg-[#ceeeec]',
      darkBgColor: 'dark:bg-[#366263]',
    },
    {
      value: '190+',
      label: 'New Leads',
      icon: <FaShoppingBag className="h-6 w-6 text-pink-500" />,
      lightBgColor: 'bg-[#fff0f8]',
      darkBgColor: 'dark:bg-[#4a455c]',
    },
    {
      value: '12+',
      label: 'Referral',
      icon: <MdWork className="h-6 w-6 text-blue-500" />,
      lightBgColor: 'bg-gray-50',
      darkBgColor: 'dark:bg-[#4a5463]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {statisticData.map((stat, index) => (
        <StatisticCard
          key={index}
          statistic={stat.value}
          label={stat.label}
          icon={stat.icon}
          lightBgColor={stat.lightBgColor}
          darkBgColor={stat.darkBgColor}
        />
      ))}
    </div>
  );
};

export default StatisticSection;
