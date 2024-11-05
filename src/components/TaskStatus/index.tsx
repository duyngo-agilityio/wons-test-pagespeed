// Libs
import { Chip } from '@nextui-org/react';
import { memo } from 'react';

// Types
import { TLabelStatus } from '@/types';

type TTaskStatusProps = {
  status: TLabelStatus;
};

const TaskStatusComponent = ({ status }: TTaskStatusProps): JSX.Element => {
  const chipClasses = {
    todo: {
      bg: 'bg-blue-500/10 dark:bg-purple-600/10',
      color: 'text-blue-500 dark:text-purple-600',
    },
    inProgress: {
      bg: 'bg-teal-500/10 dark:bg-green-200',
      color: 'text-teal-500 dark:text-teal-300',
    },
    inReview: {
      bg: 'bg-yellow-800/10 dark:bg-yellow-200/10',
      color: 'text-yellow-600 dark:text-yellow-300',
    },
    done: {
      bg: 'bg-pink-500/10',
      color: 'text-pink-500',
    },
    default: {
      bg: 'bg-gray-300',
      color: 'text-gray-700',
    },
  };

  return (
    <Chip
      classNames={{
        base: [
          'w-[100px] px-2 rounded-[20px]',
          chipClasses[status]?.bg || chipClasses.default.bg,
        ],
        content: [
          'text-center text-md capitalize',
          chipClasses[status]?.color || chipClasses.default.color,
        ],
      }}
    >
      {status}
    </Chip>
  );
};

export default memo(TaskStatusComponent);
