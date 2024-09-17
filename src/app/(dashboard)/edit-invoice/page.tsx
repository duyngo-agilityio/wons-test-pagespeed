import { EditInvoice } from '@/ui';

interface CustomersProps {
  searchParams: {
    id: number;
  };
}

const EditInvoicePage = ({ searchParams }: CustomersProps) => {
  const { id } = searchParams;

  return <EditInvoice id={id} />;
};

export default EditInvoicePage;
