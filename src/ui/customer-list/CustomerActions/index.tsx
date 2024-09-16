'use client';

// Libs
import { useCallback } from 'react';

// Components
import { Button, BsPlus } from '@/components';

const CustomerActions = (): JSX.Element => {
  // TODO:Update later
  const handleAddCustomer = useCallback(() => {}, []);

  return (
    <div className="mb-1 flex items-center gap-5 base:mt-10 md:mt-0 base:flex-col md:flex-row">
      <Button
        color="primary"
        startContent={<BsPlus size={22} className="text-white" />}
        className="text-xl font-medium base:w-full md:w-[122px] h-10 px-2.5 base:gap-2 md:gap-0.5"
        onClick={handleAddCustomer}
      >
        Add Customer
      </Button>
    </div>
  );
};

export default CustomerActions;
