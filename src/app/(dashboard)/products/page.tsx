import { Metadata } from 'next';
import { Suspense } from 'react';

// layouts
import { DashBoardLayout } from '@/layouts';

// uis
import { ProductActions } from '@/ui';

// components
import { TableSkeleton } from '@/components';

// constants
import { MAPPING_CUSTOMER_LIST_SKELETON } from '@/constants/skeleton';
import { DEFAULT_PAGE } from '@/constants';

// types
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
  searchParams,
}: TInvoiceListPageProps): JSX.Element => {
  const { page = DEFAULT_PAGE } = searchParams || {};

  return (
    <main>
      <DashBoardLayout
        title="Product Analytics"
        rightContent={<ProductActions />}
      >
        <Suspense
          key={page}
          fallback={
            <TableSkeleton
              variant="primary"
              isStriped={false}
              columns={MAPPING_CUSTOMER_LIST_SKELETON}
            />
          }
        >
          {/* TODO: Update later, add suspense for ProductList */}
        </Suspense>
      </DashBoardLayout>
    </main>
  );
};

export default ProductListPage;
