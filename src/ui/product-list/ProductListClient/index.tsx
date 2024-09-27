'use client';

import isEqual from 'react-fast-compare';
import { Key, memo, useCallback, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// Components
import { ProductDetails, ProductTable } from '@/components';

// Types
import { TProductInvoiceResponse } from '@/types';

// Utils
import { getDataByID } from '@/utils';

export type TCustomerListClientProps = {
  productList: TProductInvoiceResponse[];
  isReadOnly?: boolean;
};

const ProductListClient = ({
  productList,
  isReadOnly = true,
}: TCustomerListClientProps) => {
  const [toggleProductDetails, setToggleProductDetails] =
    useState<boolean>(false);
  const [productDetailsByID, setProductDetailsByID] =
    useState<TProductInvoiceResponse>();

  // TODO: Handle later
  const handleDelete = () => {};

  // TODO: Handle later
  const handleEdit = () => {};

  const handleCloseProductDetails = useCallback(
    () => setToggleProductDetails(false),
    [setToggleProductDetails],
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

  return (
    <>
      <ProductTable
        data={productList}
        isReadOnly={isReadOnly}
        onDelete={handleDelete}
        onEdit={handleEdit}
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
    </>
  );
};

export default memo(ProductListClient, isEqual);
