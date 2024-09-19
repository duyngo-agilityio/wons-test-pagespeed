// APIs
import { getInvoices } from '@/api';

// Constants
import { API_PATH } from '@/constants';

// Utils
import { InvoiceListClient } from '@/ui';

export type TInvoiceListProps = {
  sortOrder?: string;
  sortBy?: string;
  query?: string;
  page?: number;
};

const InvoiceList = async ({
  sortOrder,
  sortBy,
  query,
  page,
}: TInvoiceListProps): Promise<JSX.Element> => {
  const invoicesRes = await getInvoices({
    sortOrder,
    sortBy,
    query,
    page,
    nextOptions: { tags: [API_PATH.INVOICES] },
  });

  const { data: invoices = [], meta } = invoicesRes || {};
  const { pagination } = meta || {};
  const { pageCount = 0 } = pagination || {};

  return (
    <InvoiceListClient
      invoiceList={invoices}
      pageCount={pageCount}
      sortOrder={sortOrder}
    />
  );
};

export default InvoiceList;
