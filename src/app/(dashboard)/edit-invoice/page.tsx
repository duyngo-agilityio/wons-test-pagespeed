// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { EditInvoice } from '@/ui';

interface CustomersProps {
  searchParams: {
    id: number;
  };
}

const EditInvoicePage = ({ searchParams }: CustomersProps) => {
  const { id } = searchParams;

  return (
    <DashBoardLayout title="Edit Invoice">
      <EditInvoice id={id} />
    </DashBoardLayout>
  );
};

export default EditInvoicePage;
