'use client';

import isEqual from 'react-fast-compare';
import { memo } from 'react';

// Components
import ProductTable from '@/components/ProductTable';

// Types
import { TProductInvoiceResponse } from '@/types';

export type TCustomerListClientProps = {
  productList: TProductInvoiceResponse[];
  isReadOnly?: boolean;
};

const ProductListClient = ({
  productList,
  isReadOnly = true,
}: TCustomerListClientProps) => {
  // TODO: Handle later
  const handleDelete = () => {};

  // TODO: Handle later
  const handleEdit = () => {};

  return (
    <ProductTable
      data={productList}
      onDelete={handleDelete}
      onEdit={handleEdit}
      isReadOnly={isReadOnly}
    />
  );
};

export default memo(ProductListClient, isEqual);
