'use client';

import { Input } from '@/components/common';

const Homepage = () => {
  return (
    <main className="container mx-auto bg-[#ffffff] p-10">
      <h1 className="text-lg font-semibold">This is homepage</h1>
      <Input
        label="Full Name"
        isInvalid
        errorMessage="Please enter full name"
      />
      <Input label="Full Name" className="py-10" />

      <Input color="secondary" size="sm" className="py-10" />
    </main>
  );
};

export default Homepage;
