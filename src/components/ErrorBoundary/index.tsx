'use client';

import { useEffect } from 'react';
import { cn } from '@nextui-org/react';

// Components
import { Button, Heading } from '@/components';

interface ErrorProps {
  error: (Error & { digest?: string }) | string;
  reset?: () => void;
  className?: string;
}

const ErrorBoundary = ({ error, reset, className }: ErrorProps) => {
  // Attempt to recover by trying to re-render the segment
  const handleReset = () => {
    reset?.();
  };

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className={cn(
        'text-center h-screen flex justify-center items-center flex-col',
        className,
      )}
    >
      <Heading title="Something went wrong!" className="text-4xl" />
      <Button onClick={handleReset} color="primary" className="mt-8">
        Try again
      </Button>
    </div>
  );
};

export default ErrorBoundary;
