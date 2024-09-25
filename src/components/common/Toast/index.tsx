'use client';

// Libs
import { memo, useCallback } from 'react';

// Types
import { TToast } from '@/types';

// Constants
import { MESSAGE_STATUS } from '@/constants';

// Components
import { Button, IoIosClose } from '@/components';

type TToastProps = TToast & {
  onClose: (id: string) => void;
};

const Toast = ({
  id,
  title,
  description,
  status = MESSAGE_STATUS.SUCCESS,
  onClose,
}: TToastProps): JSX.Element => {
  const handleClose = useCallback(() => onClose(id), [id, onClose]);

  const getStatusColor = () => {
    switch (status) {
      case MESSAGE_STATUS.ERROR:
        return '!bg-red-600 dark:!bg-red-600  text-white';
      case MESSAGE_STATUS.SUCCESS:
        return '!bg-green-700 dark:!bg-green-700 text-white';
      default:
        return '!bg-green-700 dark:!bg-green-700 text-white';
    }
  };

  return (
    <div
      className={`min-w-[250px] base:max-w-[340px] lg:max-w-full shadow-lg rounded-lg p-2 lg:mb-2 flex justify-between items-start ${getStatusColor()}`}
    >
      <div>
        <h4 className="font-bold capitalize">{title}</h4>
        <p>{description}</p>
      </div>
      <Button
        isIconOnly
        className={`ml-2 p-0 hover:!bg-transparent dark:hover:!bg-transparent ${getStatusColor()}`}
        onClick={handleClose}
      >
        <IoIosClose
          className={`w-6 h-6 outline-0 text-white dark:text-blue ${getStatusColor()}`}
        />
      </Button>
    </div>
  );
};

export default memo(Toast);
