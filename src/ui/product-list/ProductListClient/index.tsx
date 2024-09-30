'use client';

import isEqual from 'react-fast-compare';
import { Key, memo, useCallback, useState, useTransition } from 'react';
import { UseFormReset } from 'react-hook-form';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// Components
import { ProductDetails, ProductForm, ProductTable } from '@/components';

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

export type TCustomerListClientProps = {
  productList: TProductInvoiceResponse[];
  isReadOnly?: boolean;
  onEdit: (
    payload: Partial<IProductDetail>,
    id: number,
  ) => Promise<
    | {
        success: boolean;
        error: undefined;
      }
    | {
        error: string;
        success: undefined;
      }
  >;
};

const ProductListClient = ({
  productList,
  isReadOnly = true,
  onEdit,
}: TCustomerListClientProps) => {
  const [toggleProductDetails, setToggleProductDetails] =
    useState<boolean>(false);
  const [productDetailsByID, setProductDetailsByID] =
    useState<TProductInvoiceResponse>();
  let formReset: UseFormReset<Partial<IProductDetail>> | null = null;
  const [avatarFile, setAvatarFile] = useState<File>();
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [toggleEditProduct, setToggleEditProduct] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  // TODO: Handle later
  const handleDelete = () => {};

  const handleCloseProductDetails = useCallback(
    () => setToggleProductDetails(false),
    [formReset],
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
    if (formReset) {
      formReset();
    }

    setToggleEditProduct(false);
    setProductDetailsByID(undefined);
  }, [formReset]);

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
          return showToast({
            description: error,
            status: MESSAGE_STATUS.ERROR,
          });
        } else {
          showToast({
            description: SUCCESS_MESSAGES.UPDATE_PRODUCT,
            status: MESSAGE_STATUS.SUCCESS,
          });
        }
      });

      if (!isPending) {
        setToggleEditProduct(false);
        setAvatarFile(undefined);
        setIsAvatarDirty(false);
      }
    },
    [avatarFile, idProduct, isAvatarDirty, isPending, onEdit, showToast],
  );

  return (
    <>
      <ProductTable
        data={productList}
        isReadOnly={isReadOnly}
        onDelete={handleDelete}
        onEdit={handleOpenEditProduct}
        onRowAction={handleOpenProductDetails}
      />
      {productDetailsByID && (
        <Drawer
          open={toggleProductDetails}
          onClose={handleCloseProductDetails}
          direction="right"
          className="base:!w-[302px] lg:!w-[369px] !max-w-[369px]"
        >
          <ProductDetails product={productDetailsByID} />
        </Drawer>
      )}

      {productDetailsByID && (
        <Drawer
          open={toggleEditProduct}
          onClose={handleCloseEditProduct}
          direction="right"
          className="base:!w-[302px] lg:!w-[369px] !max-w-[369px] px-7.5"
        >
          <ProductForm
            previewData={
              productDetailsByID?.attributes?.product?.data?.attributes
            }
            onAvatarChange={handleAvatarChange}
            onSubmit={handleEditProduct}
            setReset={(
              resetFn: UseFormReset<Partial<IProductDetail>> | null,
            ): void => {
              formReset = resetFn;
            }}
            onCloseDrawer={handleCloseEditProduct}
          />
        </Drawer>
      )}
    </>
  );
};

export default memo(ProductListClient, isEqual);
