import { Suspense } from 'react';

// Constants
import { ROUTES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { InvoiceDetailsSection, InvoiceDetailsSkeleton } from '@/ui';

interface IInvoiceDetailsPageProps {
  params: { id: number };
}

const InvoiceDetailsPage = ({ params }: IInvoiceDetailsPageProps) => {
  const id: number = params.id;

  return (
    <main>
      <DashBoardLayout title="Invoice Details">
        <Suspense
          key={`${ROUTES.INVOICE}/${id}`}
          fallback={<InvoiceDetailsSkeleton />}
        >
          <InvoiceDetailsSection id={id} />
        </Suspense>
      </DashBoardLayout>
    </main>
  );
};

export default InvoiceDetailsPage;
