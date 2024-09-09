// Types
import { TToast } from '@/types';

// Components
import { Toast } from '@/components/common';

// Constants
import { MESSAGE_STATUS } from '@/constants';

interface IToastListProps {
  toasts: TToast[];
  onClose: (id: string) => void;
}

const ToastList = ({ toasts, onClose }: IToastListProps) => {
  return (
    <div className="fixed top-4 right-4">
      {toasts.map((toast) => {
        const {
          id = '',
          title = '',
          description = '',
          status = MESSAGE_STATUS.SUCCESS,
        } = toast || {};

        return (
          <Toast
            key={id}
            id={id}
            title={title}
            description={description}
            status={status}
            onClose={onClose}
          />
        );
      })}
    </div>
  );
};

export default ToastList;
