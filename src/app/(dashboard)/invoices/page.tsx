import { Suspense } from 'react';

// Constants
import { MAPPING_INVOICE_LIST_SKELETON } from '@/constants/skeleton';

// Types
import { ISearchParams } from '@/types';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Sections
import { InvoiceListActions, InvoiceList } from '@/ui';

// Components
import { TableSkeleton } from '@/components';

type TInvoiceListPageProps = {
  searchParams: ISearchParams;
};

const InvoiceListPage = ({
  searchParams,
}: TInvoiceListPageProps): JSX.Element => {
  const { order = '', sortBy = '' } = searchParams || {};

  return (
    <main>
      <DashBoardLayout
        title="Invoice List"
        rightContent={<InvoiceListActions />}
      >
        <Suspense
          key={order + sortBy}
          fallback={
            <TableSkeleton
              variant="primary"
              isStriped={false}
              columns={MAPPING_INVOICE_LIST_SKELETON}
            />
          }
        >
          <InvoiceList sortBy={sortBy} sortOrder={order} />
        </Suspense>
      </DashBoardLayout>
    </main>
  );
};

export default InvoiceListPage;
