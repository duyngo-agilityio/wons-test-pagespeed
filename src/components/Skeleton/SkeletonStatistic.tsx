const SkeletonStatistic = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div className="flex-1">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonStatistic;
