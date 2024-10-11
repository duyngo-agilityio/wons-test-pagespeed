// Libs
import { notFound } from 'next/navigation';

// Utils
import { isAdmin } from '@/utils';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { CreateInvoice } from '@/ui';

const CreateInvoicePage = async (): Promise<JSX.Element> => {
  const isSuperAdmin = await isAdmin();

  if (!isSuperAdmin) notFound();

  return (
    <DashBoardLayout title="Create New Invoice">
      <CreateInvoice />
    </DashBoardLayout>
  );
};

export default CreateInvoicePage;
