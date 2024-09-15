// APIs
import { getInvoices } from '@/api';

// Utils
import { InvoiceListClient } from '@/ui';

export type TInvoiceListProps = {
  sortOrder?: string;
  sortBy?: string;
};

const InvoiceList = async ({
  sortOrder,
  sortBy,
}: TInvoiceListProps): Promise<JSX.Element> => {
  const invoicesRes = await getInvoices({
    sortOrder: sortOrder,
    sortBy: sortBy,
  });

  const { data: invoices } = invoicesRes || {};

  return <InvoiceListClient invoiceList={invoices} sortOrder={sortOrder} />;
};

export default InvoiceList;
