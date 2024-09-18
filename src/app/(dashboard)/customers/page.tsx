import { Metadata } from 'next';
import { Suspense } from 'react';

// layouts
import { DashBoardLayout } from '@/layouts';

// uis
import { CustomerList } from '@/ui';

// components
import { CustomerDrawerWrapper, TableSkeleton } from '@/components';

// Constants
import { MAPPING_CUSTOMER_LIST_SKELETON } from '@/constants/skeleton';

export const metadata: Metadata = {
  title: 'Customer Directory - View All Customers',
  description:
    'Browse the list of all customers, including names, contact emails, and genders, phone numbers. Stay connected and access essential customers information.',
};

const CustomerListPage = (): JSX.Element => (
  <main>
    <DashBoardLayout
      title="Customer List"
      rightContent={<CustomerDrawerWrapper />}
    >
      <Suspense
        fallback={
          <TableSkeleton
            variant="primary"
            isStriped={false}
            columns={MAPPING_CUSTOMER_LIST_SKELETON}
          />
        }
      >
        <CustomerList />
      </Suspense>
    </DashBoardLayout>
  </main>
);

export default CustomerListPage;
