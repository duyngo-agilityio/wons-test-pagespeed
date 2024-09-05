'use client';

// Libs
import Link from 'next/link';

// Constants
import { ROUTES } from '@/constants';

// components
import { Heading, Text, Button } from '@/components';

export default function NotFound() {
  return (
    <div className="text-center h-screen flex justify-center items-center flex-col">
      <Heading title="Not Found" fontWeight="bold" size="5xl" />
      <Text text="Could not find requested resource" className="mt-4" />
      <Link
        href={ROUTES.DASHBOARD}
        style={{ textDecoration: 'underline', textAlign: 'center' }}
      >
        <Button color="primary" className="mt-4">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
