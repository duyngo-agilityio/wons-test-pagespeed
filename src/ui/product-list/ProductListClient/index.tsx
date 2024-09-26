'use client';

// Components
import ProductTable from '@/components/ProductTable';

// Types
import { TProductDataResponse } from '@/types';

export type TCustomerListClientProps = {
  productList: TProductDataResponse[];
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

export default ProductListClient;
