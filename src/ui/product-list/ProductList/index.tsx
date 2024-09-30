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
  searchParams?: ISearchParams;
};

const ProductList = async ({ searchParams = {} }: TProductListPageProps) => {
  const {
    sortBy = '',
    order = '',
    startTime = '',
    endTime = '',
  } = searchParams;

  const filters: Record<string, string> = {
    'createdAt[$gte]': startTime,
    'createdAt[$lte]': endTime,
  };

  const result: TProductInvoiceListResponse = (await getInvoiceProducts({
    sort: sortBy
      ? `${sortBy === 'title' ? `product.${sortBy}` : sortBy}:${order}`
      : '',
    filters,
    pageSize: PAGE_SIZE[10],
  })) as TProductInvoiceListResponse;

  const isSuperAdmin = await isAdmin();

  // Aggregate and sort products by total sales
  const formattedProducts: TProductInvoiceResponse[] =
    aggregateProductQuantities(result.data);

  const sortProductsByTotalSale = (products: TProductInvoiceResponse[]) => {
    if (!Array.isArray(products) || !products.length) return [];

    const productsWithTotalSale = products.map((product) => ({
      ...product,
      attributes: {
        ...product.attributes,
        totalSale:
          product.attributes.product.data.attributes.price *
          product.attributes.quantity,
      },
    }));

    return sortByTotalSaleDescending(productsWithTotalSale);
  };

  return (
    <TableLayout title="Top Selling Products">
      <ProductListClient
        productList={sortProductsByTotalSale(formattedProducts)}
        order={order}
        isReadOnly={!isSuperAdmin}
        onEdit={updateProduct}
      />
    </TableLayout>
  );
};

export default ProductList;
