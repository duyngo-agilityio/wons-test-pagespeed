import { Suspense } from 'react';

// Constants
import { MAPPING_INVOICE_LIST_SKELETON } from '@/constants/skeleton';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Sections
import { InvoiceListActions, InvoiceList } from '@/ui';

// Components
import { TableSkeleton } from '@/components';

const InvoiceListPage = (): JSX.Element => (
  <main>
    <DashBoardLayout title="Invoice List" rightContent={<InvoiceListActions />}>
      <Suspense
        fallback={
          <TableSkeleton
            variant="primary"
            isStriped={false}
            columns={MAPPING_INVOICE_LIST_SKELETON}
          />
        }
      >
        <InvoiceList />
      </Suspense>
    </DashBoardLayout>
  </main>
);

export default InvoiceListPage;
