// Libs
import clsx from 'clsx';
import { useCallback } from 'react';

// Components
import { Button, FaStar } from '@/components';

export type TStartButtonProps = {
  id: number;
  isSelected: boolean;
  onClick: (id: number, isSelected: boolean) => void;
};

const StartButton = ({
  id,
  isSelected,
  onClick,
}: TStartButtonProps): JSX.Element => {
  const handleOnClick = useCallback(
    () => onClick(id, isSelected),
    [id, isSelected, onClick],
  );

  return (
    <Button
      isIconOnly
      className="!bg-transparent dark:!bg-transparent hover:!bg-transparent dark:hover:!bg-transparent"
      onClick={handleOnClick}
    >
      <FaStar
        className={clsx(
          'w-[17px] h-4',
          isSelected
            ? 'text-teal-500 dark:text-teal-300'
            : 'text-blue-800/30 dark:text-white/30',
        )}
      />
    </Button>
  );
};

export default StartButton;
