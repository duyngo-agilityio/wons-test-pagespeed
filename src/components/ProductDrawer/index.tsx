'use client';

import { useCallback, useState, useTransition } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// Models
import { IProductDetail } from '@/models';

// components
import { BsPlus, Button, ProductForm } from '@/components';
import Tabs from '../Tabs';

// Mocks
import { productTabs } from '@/mocks';

// constants
import { MESSAGE_STATUS, SUCCESS_MESSAGES, RATING_PRODUCT } from '@/constants';

// hooks
import { useToast } from '@/hooks';

// actions
import { createProduct } from '@/actions';

// utils
import { handleUpdateImage } from '@/utils/formHandler';

const ProductDrawer = (): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = () => {
    setAvatarFile(undefined);
    setIsAvatarDirty(false);
    setIsDrawerOpen(false);
  };

  const handleFormSubmit = useCallback(
    async (formData: IProductDetail) => {
      formData.rating = RATING_PRODUCT;

      if (avatarFile && isAvatarDirty) {
        formData = (await handleUpdateImage(
          avatarFile,
          formData,
        )) as IProductDetail;
      }

      startTransition(async () => {
        const { error } = await createProduct({
          ...formData,
          title: `${formData.title}`,
        });

        if (error) {
          return showToast({
            description: error,
            status: MESSAGE_STATUS.ERROR,
          });
        } else {
          showToast({
            description: SUCCESS_MESSAGES.CREATE_CUSTOMER,
            status: MESSAGE_STATUS.SUCCESS,
          });
        }
      });

      if (!isPending) {
        setIsDrawerOpen(false);
        setAvatarFile(undefined);
        setIsAvatarDirty(false);
      }
    },
    [avatarFile, isAvatarDirty, isPending, showToast],
  );

  const handleAvatarChange = useCallback((avatarFile: File) => {
    setAvatarFile(avatarFile);
    setIsAvatarDirty(true);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center w-full mb-8">
      <Tabs
        tabs={productTabs}
        classNames={{
          base: 'inline-block',
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
        {isDrawerOpen && (
          <Drawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            direction="right"
            size={400}
            className="!w-full md:!w-[450px]"
          >
            <div className="p-8 bg-white dark:bg-gray-400 h-full max-w-full overflow-y-auto">
              <ProductForm
                onCloseDrawer={handleCloseDrawer}
                key={isDrawerOpen ? 'open' : 'closed'}
                onSubmit={handleFormSubmit}
                onAvatarChange={handleAvatarChange}
              />
            </div>
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default ProductDrawer;
