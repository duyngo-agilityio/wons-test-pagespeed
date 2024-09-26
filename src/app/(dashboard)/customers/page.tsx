import { Metadata } from 'next';
import { Suspense } from 'react';

// layouts
import { DashBoardLayout } from '@/layouts';

// uis
import { CustomerActions, CustomerList } from '@/ui';

// components
import { TableSkeleton } from '@/components';

// constants
import { MAPPING_CUSTOMER_LIST_SKELETON } from '@/constants/skeleton';
import { DEFAULT_PAGE, PAGE_TITLES } from '@/constants';

// types
import { ISearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Customer Directory - View All Customers',
  description:
    'Browse the list of all customers, including names, contact emails, and genders, phone numbers. Stay connected and access essential customers information.',
};

type TInvoiceListPageProps = {
  searchParams: ISearchParams;
};

const CustomerListPage = ({
  searchParams,
}: TInvoiceListPageProps): JSX.Element => {
  const { page = DEFAULT_PAGE, order, sortBy } = searchParams || {};

  return (
    <main>
      {/* TODO: Update later, add suspense for CustomerDrawer */}
      <DashBoardLayout
        title={PAGE_TITLES.CUSTOMER}
        rightContent={<CustomerActions />}
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
          <CustomerList page={+page} order={order} sortBy={sortBy} />
        </Suspense>
      </DashBoardLayout>
    </main>
  );
};

export default CustomerListPage;
