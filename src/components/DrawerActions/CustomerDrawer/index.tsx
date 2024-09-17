'use client';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// icons
import { IoClose } from 'react-icons/io5';

// components
import { CustomerForm, Button } from '@/components';

interface CustomerDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const CustomerDrawer = ({
  isDrawerOpen,
  toggleDrawer,
}: CustomerDrawerProps): JSX.Element => {
  const handleFormSubmit = () => {
    // TODO: later
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={toggleDrawer}
      direction="right"
      size={400}
      className="!w-full md:!w-[400px]"
    >
      <div className="p-5 relative bg-white dark:bg-gray-400 h-full max-w-full">
        <Button
          onClick={toggleDrawer}
          className="absolute top-5 right-5 !bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
        >
          <IoClose size={20} />
        </Button>
        <CustomerForm onSubmit={handleFormSubmit} />
      </div>
    </Drawer>
  );
};

export default CustomerDrawer;
