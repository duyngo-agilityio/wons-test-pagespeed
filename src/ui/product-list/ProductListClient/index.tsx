'use client';

import isEqual from 'react-fast-compare';
import { Key, memo, useCallback, useState, useTransition } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// Components
import {
  LoadingIndicator,
  ProductDetails,
  ProductForm,
  ProductTable,
} from '@/components';

// Types
import { TProductInvoiceResponse } from '@/types';

// Constants
import { MESSAGE_STATUS, SUCCESS_MESSAGES } from '@/constants';

// Utils
import { getDataByID, handleUpdateImage } from '@/utils';

// Models
import { IProductDetail } from '@/models';

// Hooks
import { useToast } from '@/hooks';

export type TProductListClientProps = {
  productList: TProductInvoiceResponse[];
  isReadOnly?: boolean;
  onEdit: (
    payload: Partial<IProductDetail>,
    id: number,
  ) => Promise<{
    success?: boolean;
    error?: string;
  }>;
  onDelete: (id: number) => Promise<{
    success?: boolean;
    error?: string;
  }>;
};

const ProductListClient = ({
  productList,
  isReadOnly = true,
  onDelete,
  onEdit,
}: TProductListClientProps) => {
  const [toggleProductDetails, setToggleProductDetails] =
    useState<boolean>(false);
  const [productDetailsByID, setProductDetailsByID] =
    useState<TProductInvoiceResponse>();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [toggleEditProduct, setToggleEditProduct] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Func
  const handleDelete = useCallback(
    async (id: number) => {
      setIsLoading(true);

      const res = await onDelete(id);

      setIsLoading(false);

      const { error } = res || {};

      showToast({
        description: error || SUCCESS_MESSAGES.DELETE_CUSTOMER,
        status: error ? MESSAGE_STATUS.ERROR : MESSAGE_STATUS.SUCCESS,
      });
    },
    [onDelete, showToast],
  );

  const handleCloseProductDetails = useCallback(
    () => setToggleProductDetails(false),
    [],
  );

  const handleOpenProductDetails = useCallback(
    (key: Key) => {
      const productByID = getDataByID<TProductInvoiceResponse>(
        productList,
        Number(key),
      );
      setProductDetailsByID(productByID);
      setToggleProductDetails(true);
    },
    [productList],
  );

  const handleOpenEditProduct = useCallback(
    (id: number) => {
      const productByID = getDataByID<TProductInvoiceResponse>(productList, id);
      const idProduct = productByID?.attributes?.product?.data?.id;

      setProductDetailsByID({
        ...productByID,
        attributes: {
          ...productByID.attributes,
          product: {
            data: {
              ...productByID?.attributes?.product?.data,
              attributes: {
                ...productByID?.attributes?.product?.data?.attributes,
                brand:
                  productByID?.attributes?.product?.data?.attributes?.brand?.toLowerCase(),
              },
            },
          },
        },
      });

      setIdProduct(idProduct);
      setToggleEditProduct(true);
    },
    [productList],
  );

  const handleCloseEditProduct = useCallback(() => {
    setToggleEditProduct(false);
    setProductDetailsByID(undefined);
  }, []);

  const handleAvatarChange = useCallback((avatarFile: File) => {
    setAvatarFile(avatarFile);
    setIsAvatarDirty(true);
  }, []);

  const handleEditProduct = useCallback(
    async (formData: IProductDetail) => {
      if (avatarFile && isAvatarDirty) {
        formData = (await handleUpdateImage(
          avatarFile,
          formData,
        )) as IProductDetail;
      }

      startTransition(async () => {
        const { error } = await onEdit(
          {
            ...formData,
            title: `${formData.title}`,
          },
          idProduct,
        );

        if (error) {
          showToast({
            description: error,
            status: MESSAGE_STATUS.ERROR,
          });

          return;
        } else {
          showToast({
            description: SUCCESS_MESSAGES.UPDATE_PRODUCT,
            status: MESSAGE_STATUS.SUCCESS,
          });
        }
      });

      setToggleEditProduct(false);
      setAvatarFile(undefined);
      setIsAvatarDirty(false);
    },
    [avatarFile, idProduct, isAvatarDirty, isPending, onEdit, showToast],
  );

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <ProductTable
        data={productList}
        isReadOnly={isReadOnly}
        onDelete={handleDelete}
        onEdit={handleOpenEditProduct}
        onRowAction={handleOpenProductDetails}
      />
      {productDetailsByID && toggleProductDetails && (
        <Drawer
          open={toggleProductDetails}
          onClose={handleCloseProductDetails}
          direction="right"
          className="base:!w-[302px] lg:!w-[369px] !max-w-[369px]"
        >
          <ProductDetails product={productDetailsByID} />
        </Drawer>
      )}
      {toggleEditProduct && (
        <Drawer
          open={toggleEditProduct}
          onClose={handleCloseEditProduct}
          direction="right"
          className="base:!w-[302px] lg:!w-[369px] !max-w-[369px]"
        >
          <div className="p-8 bg-white dark:bg-gray-400 h-full max-w-full overflow-y-auto">
            <ProductForm
              previewData={
                productDetailsByID?.attributes?.product?.data?.attributes
              }
              onAvatarChange={handleAvatarChange}
              onSubmit={handleEditProduct}
              onCloseDrawer={handleCloseEditProduct}
            />
          </div>
        </Drawer>
      )}
    </>
  );
};

export default memo(ProductListClient, isEqual);
