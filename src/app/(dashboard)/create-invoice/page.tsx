// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { CreateInvoice } from '@/ui';

const CreateInvoicePage = () => {
  return (
    <DashBoardLayout title="Create New Invoice">
      <CreateInvoice />
    </DashBoardLayout>
  );
};

export default CreateInvoicePage;
