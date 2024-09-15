// APIs
import { getInvoices } from '@/api';

// Utils
import { InvoiceListClient } from '@/ui';

const InvoiceList = async (): Promise<JSX.Element> => {
  const invoicesRes = await getInvoices({});

  const { data: invoices } = invoicesRes || {};

  return <InvoiceListClient invoiceList={invoices} />;
};

export default InvoiceList;
