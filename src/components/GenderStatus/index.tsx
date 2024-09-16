// Libs
import { Chip } from '@nextui-org/react';

type TGenderStatusProps = {
  gender: 'male' | 'female';
};

const GenderStatusComponent = ({ gender }: TGenderStatusProps): JSX.Element => {
  const chipClasses = {
    male: {
      bg: 'bg-teal-500/10 dark:bg-green-200',
      color: 'text-teal-500 dark:text-teal-300',
    },
    female: {
      bg: 'bg-pink-500/10 dark:bg-gray-900',
      color: 'text-pink-500',
    },
  };

  return (
    <Chip
      classNames={{
        base: ['w-[100px] px-2 rounded-[20px]', `${chipClasses[gender].bg}`],
        content: [
          'text-center text-md capitalize',
          `${chipClasses[gender].color}`,
        ],
      }}
    >
      {gender}
    </Chip>
  );
};

export default GenderStatusComponent;
