import { notFound } from 'next/navigation';

// Utils
import { isAdmin } from '@/utils';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { EditInvoice } from '@/ui';

interface CustomersProps {
  searchParams: {
    id: number;
  };
}

const EditInvoicePage = async ({
  searchParams,
}: CustomersProps): Promise<JSX.Element> => {
  const isSuperAdmin = await isAdmin();

  const { id } = searchParams;

  if (!isSuperAdmin) notFound();

  return (
    <DashBoardLayout title="Edit Invoice">
      <EditInvoice id={id} />
    </DashBoardLayout>
  );
};

export default EditInvoicePage;
