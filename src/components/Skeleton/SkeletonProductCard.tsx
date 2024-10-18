import { Skeleton } from '@nextui-org/react';

const SkeletonProductCard = () => (
  <div className="animate-pulse flex items-center space-x-4">
    <Skeleton className=" h-24 w-24 rounded-md" />

    <div className="flex-1 space-y-4 py-1">
      <Skeleton className="h-4 rounded w-1/2" />

      <Skeleton className="h-4 rounded w-1/4" />

      <Skeleton className="h-4 rounded w-1/4" />
    </div>
  </div>
);

export default SkeletonProductCard;
