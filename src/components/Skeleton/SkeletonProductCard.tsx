const SkeletonProductCard = () => {
  return (
    <div className="animate-pulse flex items-center space-x-4">
      <div className="bg-gray-200 dark:bg-gray-700 h-24 w-24 rounded-md" />

      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />

        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />

        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
