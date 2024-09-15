// APIs
import { getInvoices } from '@/api';

// Utils
import { InvoiceListClient } from '@/ui';

export type TInvoiceListProps = {
  sortOrder?: string;
  sortBy?: string;
  query?: string;
};

const InvoiceList = async ({
  sortOrder,
  sortBy,
  query,
}: TInvoiceListProps): Promise<JSX.Element> => {
  const invoicesRes = await getInvoices({
    sortOrder,
    sortBy,
    query,
  });

  const { data: invoices } = invoicesRes || {};

  return <InvoiceListClient invoiceList={invoices} sortOrder={sortOrder} />;
};

export default InvoiceList;
