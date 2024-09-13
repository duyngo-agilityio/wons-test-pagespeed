'use client';
import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// icons
import { IoClose } from 'react-icons/io5';

// components
import { CustomerForm, Button } from '@/components';

const CustomerDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsDrawerOpen(function (prevState) {
      return !prevState;
    });
  }

  const handleFormSubmit = () => {
    toggleDrawer();
  };

  return (
    <div className="">
      <Button color="secondary" onClick={toggleDrawer}>
        Add New
      </Button>

      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="right"
        size={400}
        className="custom-drawer"
      >
        <div className="p-5 relative bg-white dark:bg-gray-400">
          <Button
            onClick={toggleDrawer}
            className="absolute top-5 right-5 !bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
          >
            <IoClose size={20} />
          </Button>
          <CustomerForm onSubmit={handleFormSubmit} />
        </div>
      </Drawer>
    </div>
  );
};

export default CustomerDrawer;
