// Mocks
import { MOCK_INVOICES, data as MOCK_CUSTOMERS } from '@/mocks';

// Components
import {
  InvoiceDetailsHeader,
  InvoiceDetailsBody,
  InvoiceDetailsFooter,
} from '@/ui/invoice-details';

const InvoiceDetailsSection = () => {
  return (
    <div className="max-w-[1440px] m-auto base:px-2 base:py-5 lg:p-7.5 bg-white dark:bg-gray-400 rounded-10">
      {/* Mock data */}
      <InvoiceDetailsHeader customer={MOCK_CUSTOMERS[0]} />
      <InvoiceDetailsBody data={MOCK_INVOICES} />
      <InvoiceDetailsFooter customer={MOCK_CUSTOMERS[0]} />
    </div>
  );
};

export default InvoiceDetailsSection;
