// constants
import { TableLayout } from '@/layouts';

// uis
import ProductListClient from '../ProductListClient';

// utils
import { isAdmin, sortByTotalSaleDescending } from '@/utils';

// Mocks
import { MOCK_PRODUCTS_TOP_SELLING } from '@/mocks';

// types
import { TProductDataResponse } from '@/types';

const ProductList = async () => {
  const isSuperAdmin = await isAdmin();

  const sortProductsByTotalSale = (products: TProductDataResponse[]) => {
    if (!Array.isArray(products) || products.length === 0) return [];

    const productsWithTotalSale = products.map((product) => ({
      ...product,
      attributes: {
        ...product.attributes,
        totalSale: product.attributes.price * 5,
      },
    }));

    return sortByTotalSaleDescending(productsWithTotalSale);
  };

  return (
    <TableLayout title="Top Selling Products">
      <ProductListClient
        productList={sortProductsByTotalSale(MOCK_PRODUCTS_TOP_SELLING)}
        isReadOnly={!isSuperAdmin}
      />
    </TableLayout>
  );
};

export default ProductList;
