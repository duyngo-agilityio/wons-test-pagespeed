// Libs
import { useContext } from 'react';

// Contexts
import { ToastContext, TToastContext } from '@/contexts/ToastProvider';

export const useToast = (): TToastContext => useContext(ToastContext);
