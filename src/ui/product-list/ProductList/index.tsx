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

// Constants
import { API_PATH, PAGE_SIZE } from '@/constants';

// services
import { getInvoiceProducts, getProducts } from '@/api';

// Actions
import { updateProduct, deleteProduct } from '@/actions';

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
    nextOptions: { tags: [API_PATH.INVOICE_PRODUCTS] },
    pageSize: PAGE_SIZE[10],
  })) as TProductInvoiceListResponse;

  const { data: resultProducts = [] } = await getProducts();

  const invoiceProductIds = new Set(
    result.data.map((invoice) => invoice.attributes.product.data.id),
  );
  const productsNotInInvoice = resultProducts.filter(
    (product) => !invoiceProductIds.has(product.id),
  );

  const formatProduct = productsNotInInvoice.map((product) => {
    return {
      id: product.id,
      attributes: {
        price: 0,
        quantity: 0,
        product: { data: product },
      },
    };
  });

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
        productList={sortProductsByTotalSale(
          formatProduct.concat(formattedProducts) as TProductInvoiceResponse[],
        )}
        isReadOnly={!isSuperAdmin}
        onEdit={updateProduct}
        onDelete={deleteProduct}
      />
    </TableLayout>
  );
};

export default ProductList;
