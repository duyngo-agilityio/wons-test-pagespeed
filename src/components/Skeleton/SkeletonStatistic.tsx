import { Skeleton } from '@nextui-org/react';
const SkeletonStatistic = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12  rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-6 rounded w-1/4 mb-2" />
          <Skeleton className="h-4 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonStatistic;
