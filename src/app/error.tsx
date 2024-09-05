'use client';

// Components
import { ErrorBoundary } from '@/components';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <ErrorBoundary error={error} reset={reset} />;
};

export default Error;
