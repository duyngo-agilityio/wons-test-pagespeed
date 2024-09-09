'use client';

// Libs
import {
  ReactNode,
  useState,
  createContext,
  useCallback,
  useMemo,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

// Types
import { TToast } from '@/types';

// Components
import { ToastList } from '@/components';

export type TToastContext = {
  toasts: TToast[];
  showToast: (toast: Omit<TToast, 'id'>) => void;
  closeToast: (id: string) => void;
};

export const ToastContext = createContext({} as TToastContext);

interface IToastProviderProps {
  children: ReactNode;
}

const ToastProvider = ({ children }: IToastProviderProps): JSX.Element => {
  const [toasts, setToasts] = useState<TToast[]>([]);

  const showToast = useCallback(
    ({ title, description, status, duration = 5000 }: Omit<TToast, 'id'>) => {
      const id = uuidv4();

      setToasts((prevToasts) => [
        ...prevToasts,
        { id, title, description, status, duration },
      ]);

      setTimeout(() => {
        setToasts((prev) =>
          prev.filter((toast) => {
            const { id: toastId } = toast || {};

            return toastId !== id;
          }),
        );
      }, duration);
    },
    [],
  );

  const handleCloseToast = useCallback(
    (id: string) =>
      setToasts((prev) =>
        prev.filter((toast) => {
          const { id: toastId } = toast || {};

          return toastId !== id;
        }),
      ),
    [],
  );

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      closeToast: handleCloseToast,
    }),
    [handleCloseToast, showToast, toasts],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastList toasts={toasts} onClose={handleCloseToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
