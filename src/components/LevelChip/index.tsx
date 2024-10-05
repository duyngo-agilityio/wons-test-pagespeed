// Libs
import { Chip } from '@nextui-org/react';

// Constants
import { Level } from '@/constants';

type TLevelCardProps = {
  level: Level;
};

const LevelChip = ({ level }: TLevelCardProps): JSX.Element => {
  const chipClasses = {
    high: {
      bg: 'bg-gray-200',
      color: 'text-white dark:text-gray-600',
    },
    medium: {
      bg: 'bg-blue-500',
      color: 'text-white dark:text-gray-600',
    },
    low: {
      bg: 'bg-pink-500',
      color: 'text-white dark:text-gray-600',
    },
  };

  return (
    <Chip
      classNames={{
        base: [
          'px-[22px] h-[45px] max-h-[45px] rounded-[22px]',
          `${chipClasses[level]?.bg}`,
        ],
        content: [
          'text-center text-md capitalize',
          `${chipClasses[level]?.color}`,
        ],
      }}
    >
      {level}
    </Chip>
  );
};

export default LevelChip;
