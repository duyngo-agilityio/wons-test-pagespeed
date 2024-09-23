import { Suspense } from 'react';

// Constants
import { DEFAULT_PAGE } from '@/constants';
import { MAPPING_INVOICE_LIST_SKELETON } from '@/constants/skeleton';

// Types
import { ISearchParams } from '@/types';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Sections
import { InvoiceListActions, InvoiceList } from '@/ui';

// Components
import { TableSkeleton } from '@/components';

export type TInvoiceListPageProps = {
  searchParams: ISearchParams;
};

const InvoiceListPage = ({
  searchParams,
}: TInvoiceListPageProps): JSX.Element => {
  const {
    order = '',
    sortBy = '',
    query = '',
    page = DEFAULT_PAGE,
  } = searchParams || {};

  return (
    <main>
      {/* TODO: Update later, add suspense for InvoiceListActions */}
      <DashBoardLayout
        title="Invoice List"
        rightContent={<InvoiceListActions />}
      >
        <Suspense
          key={order + sortBy + query + page}
          fallback={
            <TableSkeleton
              variant="primary"
              quantity={10}
              isStriped={false}
              columns={MAPPING_INVOICE_LIST_SKELETON}
            />
          }
        >
          <InvoiceList
            sortBy={sortBy}
            sortOrder={order}
            query={query}
            page={+page}
          />
        </Suspense>
      </DashBoardLayout>
    </main>
  );
};

export default InvoiceListPage;
