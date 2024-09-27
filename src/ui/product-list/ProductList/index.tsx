// constants
import { TableLayout } from '@/layouts';

// uis
import ProductListClient from '../ProductListClient';

// utils
import { isAdmin, sortByTotalSaleDescending } from '@/utils';

// types
import {
  ISearchParams,
  TProductInvoiceListResponse,
  TProductInvoiceResponse,
} from '@/types';

// services
import { getInvoiceProducts } from '@/api';

type TProductListPageProps = {
  searchParams: ISearchParams;
};

const ProductList = async ({ searchParams }: TProductListPageProps) => {
  const result: TProductInvoiceListResponse = (await getInvoiceProducts({
    sort: searchParams.sortBy,
    filters: {},
  })) as TProductInvoiceListResponse;

  const isSuperAdmin = await isAdmin();

  const sortProductsByTotalSale = (products: TProductInvoiceResponse[]) => {
    if (!Array.isArray(products) || !products.length) return [];

    const productsWithTotalSale = products.map((product) => ({
      ...product,
      attributes: {
        ...product.attributes,
        totalSale: product.attributes.price * product.attributes.quantity,
      },
    }));

    return sortByTotalSaleDescending(productsWithTotalSale);
  };

  return (
    <TableLayout title="Top Selling Products">
      <ProductListClient
        productList={sortProductsByTotalSale(result.data)}
        isReadOnly={!isSuperAdmin}
      />
    </TableLayout>
  );
};

export default ProductList;
