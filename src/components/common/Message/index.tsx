interface NoProductAvailableProps {
  message?: string;
  className?: string;
}

const NoProductAvailable = ({
  message = 'No products available',
  className = '',
}: NoProductAvailableProps) => (
  <div className={`text-center text-gray-500 dark:text-gray-400 ${className}`}>
    {message}
  </div>
);

export default NoProductAvailable;
