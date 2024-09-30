// constants
import { TableLayout } from '@/layouts';

// uis
import ProductListClient from '../ProductListClient';

// utils
import {
  aggregateProductQuantities,
  isAdmin,
  sortByTotalSaleDescending,
} from '@/utils';

// types
import {
  ISearchParams,
  TProductInvoiceListResponse,
  TProductInvoiceResponse,
} from '@/types';

// services
import { getInvoiceProducts } from '@/api';

// Constants
import { PAGE_SIZE } from '@/constants';

// Actions
import { updateProduct } from '@/actions';

type TProductListPageProps = {
  searchParams: ISearchParams;
};

const ProductList = async ({ searchParams }: TProductListPageProps) => {
  const { startTime = '', endTime = '' } = searchParams || {};

  const filters: Record<string, string> = {
    'createdAt[$gte]': startTime,
    'createdAt[$lte]': endTime,
  };

  const result: TProductInvoiceListResponse = (await getInvoiceProducts({
    sort: searchParams.sortBy,
    filters,
    pageSize: PAGE_SIZE[10],
  })) as TProductInvoiceListResponse;

  const isSuperAdmin = await isAdmin();

  const formattedProducts: TProductInvoiceResponse[] =
    aggregateProductQuantities(result.data);

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
        productList={sortProductsByTotalSale(formattedProducts)}
        isReadOnly={!isSuperAdmin}
        onEdit={updateProduct}
      />
    </TableLayout>
  );
};

export default ProductList;
