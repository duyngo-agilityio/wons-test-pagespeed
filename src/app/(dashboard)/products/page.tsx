import { Metadata } from 'next';
import { Suspense } from 'react';

// Components
import { DateRangePicker, ProductDrawer, TableSkeleton } from '@/components';

// Constants
import { DEFAULT_PAGE, PAGE_TITLES } from '@/constants';
import { MAPPING_PRODUCT_SKELETON } from '@/constants/skeleton';

// Layouts
import { DashBoardLayout, TableLayout } from '@/layouts';

// UIs
import { ProductList } from '@/ui/product-list';

// Types
import { ISearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Product Directory - View All Products',
  description:
    'Browse the list of all products, including titles, contact price, and branch, description. Stay connected and access essential products information.',
};

type TInvoiceListPageProps = {
  searchParams: ISearchParams;
};

const ProductListPage = ({
  searchParams = {},
}: TInvoiceListPageProps): JSX.Element => {
  const { page = DEFAULT_PAGE, startTime = '', endTime = '' } = searchParams;

  return (
    <main>
      <DashBoardLayout
        title={PAGE_TITLES.PRODUCT}
        rightContent={<DateRangePicker />}
      >
        <ProductDrawer />
        <Suspense
          key={page + startTime + endTime}
          fallback={
            <TableLayout>
              <TableSkeleton columns={MAPPING_PRODUCT_SKELETON} />
            </TableLayout>
          }
        >
          <ProductList searchParams={searchParams} />
        </Suspense>
      </DashBoardLayout>
    </main>
  );
};

export default ProductListPage;
