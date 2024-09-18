// Libs
import { memo } from 'react';

// Components
import { Spinner } from '@/components/common';

interface ILoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingIndicator = ({ size = 'lg' }: ILoadingIndicatorProps) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <Spinner size={size} />
  </div>
);

export default memo(LoadingIndicator);
