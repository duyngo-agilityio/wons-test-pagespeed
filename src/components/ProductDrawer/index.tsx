'use client';

import { UseFormReset } from 'react-hook-form';
import { useCallback, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// icons
import { GrPrevious } from 'react-icons/gr';

// Models
import { IProductDetail } from '@/models';

// components
import {
  BsPlus,
  Button,
  DateRangePicker,
  Heading,
  ProductForm,
} from '@/components';
import Tabs from '../Tabs';

// Constants
import { PAGE_TITLES } from '@/constants';

// Mocks
import { productTabs } from '@/mocks';

const ProductDrawer = (): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let formReset: UseFormReset<Partial<IProductDetail>> | null = null;

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = () => {
    if (formReset) {
      formReset();
    }
    setIsDrawerOpen(false);
  };

  const handleFormSubmit = () => {
    // TODO: later
  };

  const handleAvatarChange = () => {
    // TODO: later
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
        <Heading title={PAGE_TITLES.PRODUCT} />
        <DateRangePicker />
      </div>

      <div className="md:flex justify-between md:items-center mt-7 w-full">
        <Tabs
          tabs={productTabs}
          classNames={{
            cursor: 'bg-blue-500 dark:bg-purple-600',
            tabList: 'p-0 bg-white rounded-[10px] h-[40px] dark:bg-blue-400',
            tab: 'm-0 h-[40px] rounded-[10px]',
            tabContent: 'dark:text-white',
          }}
          className="p-0 rounded-[10px]"
        />
        <div>
          <Button
            color="primary"
            startContent={<BsPlus size={22} className="text-white" />}
            className="text-xl font-medium md:w-auto h-10 px-2.5 w-full mt-7 md:mt-0"
            onClick={handleOpenDrawer}
          >
            Add Product
          </Button>
          <Drawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            direction="right"
            size={400}
            className="!w-full md:!w-[450px]"
          >
            <div className="p-8 relative bg-white dark:bg-gray-400 h-full max-w-full">
              <Button
                onClick={handleCloseDrawer}
                className="absolute top-[6.6rem] right-[24rem] !bg-transparent dark:!bg-transparent text-gray-200 dark:text-gray-300 hover:!bg-transparent dark:hover:!bg-transparent"
              >
                <GrPrevious size={20} />
              </Button>
              <ProductForm
                onSubmit={handleFormSubmit}
                onAvatarChange={handleAvatarChange}
                setReset={(
                  resetFn: UseFormReset<Partial<IProductDetail>> | null,
                ): void => {
                  formReset = resetFn;
                }}
              />
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default ProductDrawer;
