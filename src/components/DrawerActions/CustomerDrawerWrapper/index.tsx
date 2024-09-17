'use client';
import { useState } from 'react';

// ui
import { CustomerActions } from '@/ui';

// components
import { CustomerDrawer } from '@/components';

const CustomerDrawerWrapper = (): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleAddCustomer = () => {
    // TODO: later
  };

  return (
    <div className="w-full flex justify-center md:justify-end">
      <CustomerActions
        onAddCustomer={handleAddCustomer}
        onToggleDrawer={toggleDrawer}
      />
      <CustomerDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default CustomerDrawerWrapper;
