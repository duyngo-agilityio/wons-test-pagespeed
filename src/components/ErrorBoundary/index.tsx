'use client';

import { useEffect } from 'react';

// Components
import { Button, Heading } from '@/components';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorBoundary = ({ error, reset }: ErrorProps) => {
  // Attempt to recover by trying to re-render the segment
  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center h-screen flex justify-center items-center flex-col">
      <Heading title="Something went wrong!" size="4xl" fontWeight="bold" />
      <Button onClick={handleReset} color="primary" className="mt-8">
        Try again
      </Button>
    </div>
  );
};

export default ErrorBoundary;
