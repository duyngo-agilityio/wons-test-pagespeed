// Libs
import { Chip } from '@nextui-org/react';

// Constants
import { LevelCard } from '@/constants';

type TLevelCardProps = {
  variant?: LevelCard;
};

const LevelCardComponent = ({
  variant = LevelCard.MEDIUM,
}: TLevelCardProps): JSX.Element => {
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
          `${chipClasses[variant]?.bg}`,
        ],
        content: [
          'text-center text-md capitalize',
          `${chipClasses[variant]?.color}`,
        ],
      }}
    >
      {variant}
    </Chip>
  );
};

export default LevelCardComponent;
