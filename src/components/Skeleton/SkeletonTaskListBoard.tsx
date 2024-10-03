import { Skeleton } from '@nextui-org/react';

const SkeletonTaskCard = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-400 p-[20px] rounded-5 shadow-md">
      <div className="flex flex-row items-center justify-between mb-[15px]">
        <Skeleton className="w-1/2 h-4 rounded" />
        <Skeleton className="w-[15px] h-4 rounded" />
      </div>
      <Skeleton className="h-6 rounded mt-2" />
      <Skeleton className="h-4 rounded mt-4" />
      <Skeleton className="h-36 rounded mt-4" />
    </div>
  );
};

const SkeletonColumn = () => {
  return (
    <div className="w-full md:w-1/4 p-4rounded-md shadow-lg space-y-4">
      <Skeleton className="h-6 rounded mb-4" />
      <SkeletonTaskCard />
      <SkeletonTaskCard />
      <SkeletonTaskCard />
    </div>
  );
};

const SkeletonTaskListBoard = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full h-full mt-8">
      <SkeletonColumn />
      <SkeletonColumn />
      <SkeletonColumn />
      <SkeletonColumn />
    </div>
  );
};

export default SkeletonTaskListBoard;
