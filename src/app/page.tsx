'use client';

import { Input } from '@/components/common';

const Homepage = () => {
  return (
    <main className="container mx-auto bg-white p-10">
      <h1 className="text-lg font-semibold">This is homepage</h1>
      <Input
        label="Full Name"
        isInvalid
        errorMessage="Please enter full name"
      />
    </main>
  );
};

export default Homepage;
