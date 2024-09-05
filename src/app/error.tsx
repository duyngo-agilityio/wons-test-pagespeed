'use client';

// Components
import { ErrorBoundary } from '@/components';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => (
  <ErrorBoundary error={error} reset={reset} />
);

export default Error;
