'use client';

import { Button, BsPlus } from '@/components';

interface CustomerActionsProps {
  onToggleDrawer: () => void;
}

const CustomerActions = ({
  onToggleDrawer,
}: CustomerActionsProps): JSX.Element => {
  const handleAddCustomerAndToggle = () => {
    onToggleDrawer();
  };

  return (
    <Button
      color="primary"
      startContent={<BsPlus size={22} className="text-white" />}
      className="text-xl font-medium md:w-auto h-10 px-2.5 w-full mt-10 md:mt-0"
      onClick={handleAddCustomerAndToggle}
    >
      Add Customer
    </Button>
  );
};

export default CustomerActions;
